/// <reference path="../idl/AIParser.ts" />

import logger = require("logger");
import parser = require("parser");
import symbols = require("parser/symbols");

import END_SYMBOL = symbols.END_SYMBOL;
import UNKNOWN_TOKEN = symbols.UNKNOWN_TOKEN;
import EOF = symbols.EOF;

import T_STRING = symbols.T_STRING;
import T_FLOAT = symbols.T_FLOAT;
import T_UINT = symbols.T_UINT;

import T_TYPE_ID = symbols.T_TYPE_ID;
import T_NON_TYPE_ID = symbols.T_NON_TYPE_ID;

/** @const */
var LEXER_UNKNOWN_TOKEN = 2101;
/** @const */
var LEXER_BAD_TOKEN = 2102;

logger.registerCode(LEXER_UNKNOWN_TOKEN, "Unknown token: {tokenValue}");
logger.registerCode(LEXER_BAD_TOKEN, "Bad token: {tokenValue}");


//#define END_POSITION "END"
//#define T_EMPTY "EMPTY"
//#define UNKNOWN_TOKEN "UNNOWN"
//#define START_SYMBOL "S"
//#define UNUSED_SYMBOL "##"
//#define END_SYMBOL "$"
//#define LEXER_RULES "--LEXER--"
//#define FLAG_RULE_CREATE_NODE "--AN"
//#define FLAG_RULE_NOT_CREATE_NODE "--NN"
//#define FLAG_RULE_FUNCTION "--F"
//#define EOF "EOF"
//#define T_STRING "T_STRING"
//#define T_FLOAT "T_FLOAT"
//#define T_UINT "T_UINT"
//#define T_TYPE_ID "T_TYPE_ID"
//#define T_NON_TYPE_ID "T_NON_TYPE_ID"

//logger

interface AIOperation {
    type: AEOperationType;
    rule?: AIRule;
    index?: uint;
}



//interface AIStateMap {
//    [index: string]: AIState;
//}



class Lexer implements AILexer {
    private _iLineNumber: uint;
    private _iColumnNumber: uint;
    private _sSource: string;
    private _iIndex: uint;
    private _pParser: AIParser;
    private _pPunctuatorsMap: AIMap<string>;
    private _pKeywordsMap: AIMap<string>;
    private _pPunctuatorsFirstSymbols: AIMap<boolean>;

    constructor(pParser: AIParser) {
        this._iLineNumber = 0;
        this._iColumnNumber = 0;
        this._sSource = "";
        this._iIndex = 0;
        this._pParser = pParser;
        this._pPunctuatorsMap = <AIMap<string>>{};
        this._pKeywordsMap = <AIMap<string>>{};
        this._pPunctuatorsFirstSymbols = <AIMap<boolean>>{};
    }

    addPunctuator(sValue: string, sName?: string): string {
        if (sName === undefined && sValue.length === 1) {
            sName = "T_PUNCTUATOR_" + sValue.charCodeAt(0);

        }
        this._pPunctuatorsMap[sValue] = sName;
        this._pPunctuatorsFirstSymbols[sValue[0]] = true;
        return sName;
    }

    addKeyword(sValue: string, sName: string): string {
        this._pKeywordsMap[sValue] = sName;
        return sName;
    }

    getTerminalValueByName(sName: string): string {
        var sValue: string = null;

        for (sValue in this._pPunctuatorsMap) {
            if (this._pPunctuatorsMap[sValue] === sName) {
                return sValue;
            }
        }

        for (sValue in this._pKeywordsMap) {
            if (this._pKeywordsMap[sValue] === sName) {
                return sValue;
            }
        }

        return sName;
    }

    init(sSource: string): void {
        this._sSource = sSource;
        this._iLineNumber = 0;
        this._iColumnNumber = 0;
        this._iIndex = 0;
    }

    getNextToken(): AIToken {
        var ch: string = this.currentChar();
        if (!ch) {
            return <AIToken>{
                name: END_SYMBOL,
                value: END_SYMBOL,
                start: this._iColumnNumber,
                end: this._iColumnNumber,
                line: this._iLineNumber
            };
        }
        var eType: AETokenType = this.identityTokenType();
        var pToken: AIToken;
        switch (eType) {
            case AETokenType.k_NumericLiteral:
                pToken = this.scanNumber();
                break;
            case AETokenType.k_CommentLiteral:
                this.scanComment();
                pToken = this.getNextToken();
                break;
            case AETokenType.k_StringLiteral:
                pToken = this.scanString();
                break;
            case AETokenType.k_PunctuatorLiteral:
                pToken = this.scanPunctuator();
                break;
            case AETokenType.k_IdentifierLiteral:
                pToken = this.scanIdentifier();
                break;
            case AETokenType.k_WhitespaceLiteral:
                this.scanWhiteSpace();
                pToken = this.getNextToken();
                break;
            default:
                this._error(LEXER_UNKNOWN_TOKEN,
                    <AIToken>{
                        name: UNKNOWN_TOKEN,
                        value: ch + this._sSource[this._iIndex + 1],
                        start: this._iColumnNumber,
                        end: this._iColumnNumber + 1,
                        line: this._iLineNumber
                    });
        }
        return pToken;
    }

    _getIndex(): uint {
        return this._iIndex;
    }

    _setSource(sSource: string): void {
        this._sSource = sSource;
    }

    _setIndex(iIndex: uint): void {
        this._iIndex = iIndex;
    }

    private _error(eCode: uint, pToken: AIToken): void {
        var pLocation: AISourceLocation = <AISourceLocation>{
            file: this._pParser.getParseFileName(),
            line: this._iLineNumber
        };
        var pInfo: Object = {
            tokenValue: pToken.value,
            tokenType: pToken.type
        };

        var pLogEntity: AILoggerEntity = <AILoggerEntity>{ code: eCode, info: pInfo, location: pLocation };

        logger["error"](pLogEntity);

        throw new Error(eCode.toString());
    }

    private identityTokenType(): AETokenType {
        if (this.isIdentifierStart()) {
            return AETokenType.k_IdentifierLiteral;
        }
        if (this.isWhiteSpaceStart()) {
            return AETokenType.k_WhitespaceLiteral;
        }
        if (this.isStringStart()) {
            return AETokenType.k_StringLiteral;
        }
        if (this.isCommentStart()) {
            return AETokenType.k_CommentLiteral;
        }
        if (this.isNumberStart()) {
            return AETokenType.k_NumericLiteral;
        }
        if (this.isPunctuatorStart()) {
            return AETokenType.k_PunctuatorLiteral;
        }
        return AETokenType.k_Unknown;
    }

    private isNumberStart(): boolean {
        var ch: string = this.currentChar();

        if ((ch >= '0') && (ch <= '9')) {
            return true;
        }

        var ch1: string = this.nextChar();
        if (ch === "." && (ch1 >= '0') && (ch1 <= '9')) {
            return true;
        }

        return false;
    }

    private isCommentStart(): boolean {
        var ch: string = this.currentChar();
        var ch1: string = this.nextChar();

        if (ch === "/" && (ch1 === "/" || ch1 === "*")) {
            return true;
        }

        return false;
    }

    private isStringStart(): boolean {
        var ch: string = this.currentChar();
        if (ch === "\"" || ch === "'") {
            return true;
        }
        return false;
    }

    private isPunctuatorStart(): boolean {
        var ch: string = this.currentChar();
        if (this._pPunctuatorsFirstSymbols[ch]) {
            return true;
        }
        return false;
    }

    private isWhiteSpaceStart(): boolean {
        var ch: string = this.currentChar();
        if (ch === ' ' || ch === '\n' || ch === '\r' || ch === '\t') {
            return true;
        }
        return false;
    }

    private isIdentifierStart(): boolean {
        var ch: string = this.currentChar();
        if ((ch === '_') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
            return true;
        }
        return false;
    }

    private isLineTerminator(sSymbol: string): boolean {
        return (sSymbol === '\n' || sSymbol === '\r' || sSymbol === '\u2028' || sSymbol === '\u2029');
    }

    private isWhiteSpace(sSymbol: string): boolean {
        return (sSymbol === ' ') || (sSymbol === '\t');
    }

    private isKeyword(sValue: string): boolean {
        return !!(this._pKeywordsMap[sValue]);
    }

    private isPunctuator(sValue: string): boolean {
        return !!(this._pPunctuatorsMap[sValue]);
    }

    private nextChar(): string {
        return this._sSource[this._iIndex + 1];
    }

    private currentChar(): string {
        return this._sSource[<number>this._iIndex];
    }

    private readNextChar(): string {
        this._iIndex++;
        this._iColumnNumber++;
        return this._sSource[<number>this._iIndex];
    }

    private scanString(): AIToken {
        var chFirst: string = this.currentChar();
        var sValue: string = chFirst;
        var ch: string = null;
        var chPrevious: string = chFirst;
        var isGoodFinish: boolean = false;
        var iStart: uint = this._iColumnNumber;

        while (true) {
            ch = this.readNextChar();
            if (!ch) {
                break;
            }
            sValue += ch;
            if (ch === chFirst && chPrevious !== '\\') {
                isGoodFinish = true;
                this.readNextChar();
                break;
            }
            chPrevious = ch;
        }

        if (isGoodFinish) {
            return <AIToken>{
                name: T_STRING,
                value: sValue,
                start: iStart,
                end: this._iColumnNumber - 1,
                line: this._iLineNumber
            };
        }
        else {
            if (!ch) {
                ch = EOF;
            }
            sValue += ch;

            this._error(LEXER_BAD_TOKEN, <AIToken> {
                type: AETokenType.k_StringLiteral,
                value: sValue,
                start: iStart,
                end: this._iColumnNumber,
                line: this._iLineNumber
            });
            return null;
        }
    }

    private scanPunctuator(): AIToken {
        var sValue: string = this.currentChar();
        var ch: string;
        var iStart: uint = this._iColumnNumber;

        while (true) {
            ch = this.readNextChar();
            if (ch) {
                sValue += ch;
                this._iColumnNumber++;
                if (!this.isPunctuator(sValue)) {
                    sValue = sValue.slice(0, sValue.length - 1);
                    break;
                }
            }
            else {
                break;
            }
        }

        return <AIToken>{
            name: this._pPunctuatorsMap[sValue],
            value: sValue,
            start: iStart,
            end: this._iColumnNumber - 1,
            line: this._iLineNumber
        };
    }

    private scanNumber(): AIToken {
        var ch: string = this.currentChar();
        var sValue: string = "";
        var isFloat: boolean = false;
        var chPrevious: string = ch;
        var isGoodFinish: boolean = false;
        var iStart: uint = this._iColumnNumber;
        var isE: boolean = false;

        if (ch === '.') {
            sValue += 0;
            isFloat = true;
        }

        sValue += ch;

        while (true) {
            ch = this.readNextChar();
            if (ch === '.') {
                if (isFloat) {
                    break;
                }
                else {
                    isFloat = true;
                }
            }
            else if (ch === 'e') {
                if (isE) {
                    break;
                }
                else {
                    isE = true;
                }
            }
            else if (((ch === '+' || ch === '-') && chPrevious === 'e')) {
                sValue += ch;
                chPrevious = ch;
                continue;
            }
            else if (ch === 'f' && isFloat) {
                ch = this.readNextChar();
                if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
                    break;
                }
                isGoodFinish = true;
                break;
            }
            else if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
                break;
            }
            else if (!((ch >= '0') && (ch <= '9')) || !ch) {
                if ((isE && chPrevious !== '+' && chPrevious !== '-' && chPrevious !== 'e') || !isE) {
                    isGoodFinish = true;
                }
                break;
            }
            sValue += ch;
            chPrevious = ch;
        }

        if (isGoodFinish) {
            var sName = isFloat ? T_FLOAT : T_UINT;
            return {
                name: sName,
                value: sValue,
                start: iStart,
                end: this._iColumnNumber - 1,
                line: this._iLineNumber
            };
        }
        else {
            if (!ch) {
                ch = EOF;
            }
            sValue += ch;
            this._error(LEXER_BAD_TOKEN, <AIToken> {
                type: AETokenType.k_NumericLiteral,
                value: sValue,
                start: iStart,
                end: this._iColumnNumber,
                line: this._iLineNumber
            });
            return null;
        }
    }

    private scanIdentifier(): AIToken {
        var ch: string = this.currentChar();
        var sValue: string = ch;
        var iStart: uint = this._iColumnNumber;
        var isGoodFinish: boolean = false;

        while (true) {
            ch = this.readNextChar();
            if (!ch) {
                isGoodFinish = true;
                break;
            }
            if (!((ch === '_') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9'))) {
                isGoodFinish = true;
                break;
            }
            sValue += ch;
        }

        if (isGoodFinish) {
            if (this.isKeyword(sValue)) {
                return <AIToken>{
                    name: this._pKeywordsMap[sValue],
                    value: sValue,
                    start: iStart,
                    end: this._iColumnNumber - 1,
                    line: this._iLineNumber
                };
            }
            else {
                var sName = this._pParser.isTypeId(sValue) ? T_TYPE_ID : T_NON_TYPE_ID;
                return <AIToken> {
                    name: sName,
                    value: sValue,
                    start: iStart,
                    end: this._iColumnNumber - 1,
                    line: this._iLineNumber
                };
            }
        }
        else {
            if (!ch) {
                ch = EOF;
            }
            sValue += ch;
            this._error(LEXER_BAD_TOKEN, <AIToken> {
                type: AETokenType.k_IdentifierLiteral,
                value: sValue,
                start: iStart,
                end: this._iColumnNumber,
                line: this._iLineNumber
            });
            return null;
        }
    }

    private scanWhiteSpace(): boolean {
        var ch: string = this.currentChar();

        while (true) {
            if (!ch) {
                break;
            }
            if (this.isLineTerminator(ch)) {
                if (ch === "\r" && this.nextChar() === "\n") {
                    this._iLineNumber--;
                }
                this._iLineNumber++;
                ch = this.readNextChar();
                this._iColumnNumber = 0;
                continue;
            }
            else if (ch === '\t') {
                this._iColumnNumber += 3;
            }
            else if (ch !== ' ') {
                break;
            }
            ch = this.readNextChar();
        }

        return true;
    }

    private scanComment(): boolean {
        var sValue: string = this.currentChar();
        var ch: string = this.readNextChar();
        sValue += ch;

        if (ch === '/') {
            //Line Comment
            while (true) {
                ch = this.readNextChar();
                if (!ch) {
                    break;
                }
                if (this.isLineTerminator(ch)) {
                    if (ch === "\r" && this.nextChar() === "\n") {
                        this._iLineNumber--;
                    }
                    this._iLineNumber++;
                    this.readNextChar();
                    this._iColumnNumber = 0;
                    break;
                }
                sValue += ch;
            }

            return true;
        }
        else {
            //Multiline Comment
            var chPrevious: string = ch;
            var isGoodFinish: boolean = false;
            var iStart: uint = this._iColumnNumber;

            while (true) {
                ch = this.readNextChar();
                if (!ch) {
                    break;
                }
                sValue += ch;
                if (ch === '/' && chPrevious === '*') {
                    isGoodFinish = true;
                    this.readNextChar();
                    break;
                }
                if (this.isLineTerminator(ch)) {
                    if (ch === "\r" && this.nextChar() === "\n") {
                        this._iLineNumber--;
                    }
                    this._iLineNumber++;
                    this._iColumnNumber = -1;
                }
                chPrevious = ch;
            }

            if (isGoodFinish) {
                return true;
            }
            else {
                if (!ch) {
                    ch = EOF;
                }
                sValue += ch;
                this._error(LEXER_BAD_TOKEN, <AIToken> {
                    type: AETokenType.k_CommentLiteral,
                    value: sValue,
                    start: iStart,
                    end: this._iColumnNumber,
                    line: this._iLineNumber
                });

            }

        }
    }
}


export = Lexer;