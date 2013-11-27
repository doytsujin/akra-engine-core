/// <reference path="../idl/AIAFXMaker.ts" />
/// <reference path="../idl/AIAFXComposer.ts" />
/// <reference path="../idl/AIResourcePoolManager.ts" />
/// <reference path="../idl/AIShaderInput.ts" />
/// <reference path="../idl/AIShaderProgram.ts" />

//define PROFILE_MAKER

import config = require("config");
import webgl = require("webgl");
import logger = require("logger");
import render = require("render");
import debug = require("debug");
import math = require("math");

import Instruction = require("fx/Instruction");
import VariableContainer = require("fx/VariableContainer");

import ObjectArray = require("util/ObjectArray");
import SamplerBlender = require("fx/SamplerBlender");

import Vec2 = math.Vec2;
import Vec3 = math.Vec3;
import Vec4 = math.Vec4;
import Mat3 = math.Mat3;
import Mat4 = math.Mat4;

interface AIUniformTypeMap {
    [name: string]: AEAFXShaderVariableType;
}

// interface AIUniformStructInfo {{
// 	name: string;
// 	shaderName: string;
// 	type: AEAFXShaderVariableType;
// 	length: uint;
// }

interface AIUniformStructInfo {
    name: string;
    isComplex: boolean;
    isArray: boolean;
    index: int;

    fields: AIUniformStructInfo[];
    shaderVarInfo: AIShaderUniformInfo;
}

interface AIShaderUniformInfo {
    name: string;
    location: uint;
    webGLLocation: WebGLUniformLocation;
    type: AEAFXShaderVariableType;
    length: uint;
    applyFunction: Function;
    defaultValue: any;
}

interface AIShaderAttrOffsetInfo {
    semantic: string;
    shaderVarInfo: AIShaderUniformInfo;
    defaultValue: float;
}

interface AIShaderAttrInfo extends AIAFXBaseAttrInfo {
    name: string;
    location: uint;
    semantic: string;
    isMappable: boolean;
    isComplex: boolean;
    vertexTextureInfo: AIShaderUniformInfo;
    offsets: AIShaderAttrOffsetInfo[];
}

interface AIShaderUniformInfoMap {
    [name: string]: AIShaderUniformInfo;
}

interface AIShaderAttrInfoMap {
    [name: string]: AIShaderAttrInfo;
}

interface AIUniformStructInfoMap {
    [name: string]: AIUniformStructInfo;
}


interface AIInputUniformInfo {
    name: string;
    nameIndex: uint;
    isComplex: boolean;
    isCollapsedArray: boolean;
    shaderVarInfo: AIShaderUniformInfo;
    structVarInfo: AIUniformStructInfo;
}


function createShaderUniformInfo(sName: string, iLocation: uint, pWebGLLocation: WebGLUniformLocation = null): AIShaderUniformInfo {
    return <AIShaderUniformInfo>{
        name: sName,
        location: iLocation,
        webGLLocation: pWebGLLocation,
        type: AEAFXShaderVariableType.k_NotVar,
        length: 0,

        applyFunction: null,
        defaultValue: null
    };
}



function createShaderAttrInfo(sName: string, iLocation: uint): AIShaderAttrInfo {
    return <AIShaderAttrInfo>{
        name: sName,
        location: iLocation,
        semantic: "",
        isMappable: false,
        isComplex: false,
        vertexTextureInfo: null,
        offsets: null
    };
}

function createShaderAttrOffsetInfo(sSemantic: string, pShaderUniformInfo: AIShaderUniformInfo, fDefault: float): AIShaderAttrOffsetInfo {
    return <AIShaderAttrOffsetInfo>{
        semantic: sSemantic,
        shaderVarInfo: pShaderUniformInfo,
        defaultValue: fDefault
    };
}

function createInputUniformInfo(sName: string, iNameIndex: uint, pShaderUniformInfo: AIShaderUniformInfo, isComplex: boolean): AIInputUniformInfo {
    return <AIInputUniformInfo>{
        name: sName,
        nameIndex: iNameIndex,
        isComplex: isComplex,
        isCollapsedArray: false,
        shaderVarInfo: pShaderUniformInfo,
        structVarInfo: null
    };
}

// function createUniformStructFieldInfo(sName: string, sShaderName: string, 
// 							  eType: AEAFXShaderVariableType, iLength: uint): AIUniformStructInfo {
// 	return <AIUniformStructInfo>{
// 		name: sName,
// 		shaderName: sShaderName,
// 		type: eType,
// 		length: iLength
// 	};
// }

function createUniformStructFieldInfo(sName: string, isComplex: boolean, isArray: boolean): AIUniformStructInfo {
    return <AIUniformStructInfo>{
        name: sName,
        isComplex: isComplex,
        isArray: isArray,
        index: -1,

        fields: null,
        shaderVarInfo: null
    };
}


class Maker implements AIAFXMaker {
    //UNIQUE();

    private _pComposer: AIAFXComposer = null;
    private _pPassBlend: AIAFXPassBlend = null;

    private _pShaderProgram: AIShaderProgram = null;

    private _pRealUniformNameList: string[] = null;
    private _pRealAttrNameList: string[] = null;

    // is really exists uniform & attr?
    private _pUniformExistMap: AIMap<boolean> = <AIMap<boolean>>{};
    private _pAttrExistMap: AIMap<boolean> = <AIMap<boolean>>{};

    private _isUsedZero2D: boolean = false;
    private _isUsedZeroCube: boolean = false;

    // private _pAttrContainer: AttributeBlendContainer = null;
    //стек объектов храняих все юниформы и аттрибуты
    private _pDataPoolArray: AIObjectArray<AIShaderInput> = new ObjectArray<AIShaderInput>();


    private _pShaderUniformInfoMap: AIShaderUniformInfoMap = null;
    private _pShaderAttrInfoMap: AIShaderAttrInfoMap = null;

    private _pShaderUniformInfoList: AIShaderUniformInfo[] = null;
    private _pShaderAttrInfoList: AIShaderAttrInfo[] = null;

    private _pInputUniformInfoList: AIInputUniformInfo[] = null;
    private _pInputSamplerInfoList: AIInputUniformInfo[] = null;
    private _pInputSamplerArrayInfoList: AIInputUniformInfo[] = null;

    private _pUnifromInfoForStructFieldMap: AIUniformStructInfoMap = null;

    isArray(sName: string) {
        return this.getLength(sName) > 0;
    }

    getType(sName: string): AEAFXShaderVariableType {
        return this._pShaderUniformInfoMap[sName].type;
    }

    getLength(sName: string): uint {
        return this._pShaderUniformInfoMap[sName].length;
    }

    get shaderProgram(): AIShaderProgram {
        return this._pShaderProgram;
    }

    get attributeInfo(): AIAFXBaseAttrInfo[] {
        return <AIAFXBaseAttrInfo[]>this._pShaderAttrInfoList;
    }

    get uniformNames(): string[] {
        return this._pRealUniformNameList;
    }


    constructor(pComposer: AIAFXComposer, pPassBlend: AIAFXPassBlend) {
        this._pComposer = pComposer;
        this._pPassBlend = pPassBlend;
    }

    _create(sVertex: string, sPixel: string): boolean {
        var pRmgr: AIResourcePoolManager = this._pComposer.getEngine().getResourceManager();
        // logger.log(this, sVertex, sPixel);
        var pProgram: AIShaderProgram = pRmgr.createShaderProgram(".shader-prorgam-" + this.getGuid().toString());



        if (!pProgram.create(sVertex, sPixel)) {
            return false;
        }

        this._pRealUniformNameList = pProgram._getActiveUniformNames();
        this._pRealAttrNameList = pProgram._getActiveAttributeNames();

        this._pShaderUniformInfoList = new Array(this._pRealUniformNameList.length);
        this._pShaderAttrInfoList = new Array(this._pRealAttrNameList.length);

        this._pShaderUniformInfoMap = <AIShaderUniformInfoMap>{};
        this._pShaderAttrInfoMap = <AIShaderAttrInfoMap>{};

        this._pShaderProgram = pProgram;

        for (var i: int = 0; i < this._pRealUniformNameList.length; i++) {
            var sUniformName: string = this._pRealUniformNameList[i];
            var pUniformInfo: AIShaderUniformInfo;

            if (has("WEBGL")) {
                pUniformInfo = createShaderUniformInfo(sUniformName, i, (<webgl.WebGLShaderProgram>pProgram).getWebGLUniformLocation(sUniformName));
            }
            else {
                pUniformInfo = createShaderUniformInfo(sUniformName, i);
            }

            this._pUniformExistMap[sUniformName] = true;
            this._pShaderUniformInfoList[i] = pUniformInfo;
            this._pShaderUniformInfoMap[sUniformName] = pUniformInfo;
        }



        for (var i: int = 0; i < this._pRealAttrNameList.length; i++) {
            var sAttrName: string = this._pRealAttrNameList[i];
            var pAttrInfo: AIShaderAttrInfo = createShaderAttrInfo(sAttrName, i);

            this._pAttrExistMap[sAttrName] = true;
            this._pShaderAttrInfoList[i] = pAttrInfo;
            this._pShaderAttrInfoMap[sAttrName] = pAttrInfo;
        }

        this._pUnifromInfoForStructFieldMap = <AIUniformStructInfoMap>{};

        this["sVertex"] = sVertex;
        this["sPixel"] = sPixel;

        // logger.log(sVertex, sPixel);

        return true;
    }

    _getShaderInput(): AIShaderInput {
        return this._pDataPoolArray.length > 0 ? this._pDataPoolArray.pop() : this._createDataPool();
    }

    _releaseShaderInput(pPool: AIShaderInput): void {
        this._pDataPoolArray.push(pPool);
    }

    isUniformExists(sName: string): boolean {
        return this._pUniformExistMap[sName] ? true : this._pUniformExistMap[sName] = false;
    }

    isAttrExists(sName: string): boolean {
        return this._pAttrExistMap[sName] ? true : this._pAttrExistMap[sName] = false;
    }


    _createDataPool(): AIShaderInput {
        var pInput: AIShaderInput = {
            uniforms: <{ [index: uint]: any; }>{},
            attrs: <{ [index: uint]: any; }>{},
            renderStates: render.createRenderStateMap()
        };

        //assume, that attr & uniform never have same names!!!

        for (var i: int = 0; i < this._pShaderUniformInfoList.length; i++) {
            var pUniformInfo: AIShaderUniformInfo = this._pShaderUniformInfoList[i];

            pInput.uniforms[i] = null;

            if ((pUniformInfo.type === AEAFXShaderVariableType.k_Sampler2D ||
                pUniformInfo.type === AEAFXShaderVariableType.k_SamplerCUBE)) {

                if (pUniformInfo.length > 0) {
                    pInput.uniforms[i] = new Array(pUniformInfo.length);

                    for (var j: uint = 0; j < pUniformInfo.length; j++) {
                        pInput.uniforms[i][j] = render.createSamplerState();
                    }
                }
                else {
                    pInput.uniforms[i] = render.createSamplerState();
                }

            }
        }

        for (var i: int = 0; i < this._pShaderAttrInfoList.length; i++) {
            pInput.attrs[i] = null;
        }

        return pInput;
    }

    setUniform(iLocation: uint, pValue: any): void {
        if (this._pShaderUniformInfoList[iLocation].type !== AEAFXShaderVariableType.k_NotVar) {
            if (has("WEBGL")) {
                this._pShaderUniformInfoList[iLocation].applyFunction.call(this._pShaderProgram,
                    this._pShaderUniformInfoList[iLocation].webGLLocation,
                    pValue || this._pShaderUniformInfoList[iLocation].defaultValue);
            }
            else {
                this._pShaderUniformInfoList[iLocation].applyFunction.call(this._pShaderProgram,
                    this._pShaderUniformInfoList[iLocation].name,
                    pValue || this._pShaderUniformInfoList[iLocation].defaultValue);
            }
        }
    }

    _initInput(pPassInput: AIAFXPassInputBlend, pBlend: SamplerBlender, pAttrs: AIAFXAttributeBlendContainer): boolean {
        /* Initialize info about uniform variables(not samplers and video buffers) */
        var pUniformKeys: uint[] = pPassInput.uniformKeys;
        this._pInputUniformInfoList = [];

        for (var i: uint = 0; i < pUniformKeys.length; i++) {
            var iNameIndex: uint = pUniformKeys[i];
            var sName: string = pPassInput._getUniformVarNameByIndex(iNameIndex);
            var eType: AEAFXShaderVariableType = pPassInput._getUniformType(iNameIndex);
            var iLength: uint = pPassInput._getUniformLength(iNameIndex);
            var isArray: boolean = (iLength > 0);

            var pInputUniformInfo: AIInputUniformInfo = null;

            if (eType === AEAFXShaderVariableType.k_Complex) {
                var pStructInfo: AIUniformStructInfo = this.expandStructUniforms(pPassInput._getUniformVar(iNameIndex));
                if (!isNull(pStructInfo)) {
                    pInputUniformInfo = createInputUniformInfo(sName, iNameIndex, null, true);
                    pInputUniformInfo.structVarInfo = pStructInfo;
                    this._pInputUniformInfoList.push(pInputUniformInfo);
                }
            }
            else {
                var sShaderName: string = isArray ? (sName + "[0]") : sName;

                if (!this.isUniformExists(sShaderName)) {
                    continue;
                }

                var pShaderUniformInfo: AIShaderUniformInfo = this._pShaderUniformInfoMap[sShaderName];

                pShaderUniformInfo.type = eType;
                pShaderUniformInfo.length = iLength;

                pInputUniformInfo = createInputUniformInfo(sName, iNameIndex, pShaderUniformInfo, false);
                this._pInputUniformInfoList.push(pInputUniformInfo);
            }
        }

        /* Initialize info about samplers*/
        var iTotalSamplerSlots: uint = pBlend.totalActiveSlots;
        this._pInputSamplerInfoList = [];

        for (var i: uint = 0; i < iTotalSamplerSlots; i++) {
            var pShaderUniformInfo: AIShaderUniformInfo = null;
            var pInputUniformInfo: AIInputUniformInfo = null;

            if (i === SamplerBlender.ZERO_SLOT) {
                this._isUsedZero2D = this.isUniformExists("as0");
                this._isUsedZeroCube = this.isUniformExists("asc0");

                if (this._isUsedZero2D) {
                    pShaderUniformInfo = this._pShaderUniformInfoMap["as0"];

                    pShaderUniformInfo.type = AEAFXShaderVariableType.k_Int;
                    pShaderUniformInfo.length = 0;
                }

                if (this._isUsedZeroCube) {
                    pShaderUniformInfo = this._pShaderUniformInfoMap["asc0"];

                    pShaderUniformInfo.type = AEAFXShaderVariableType.k_Int;
                    pShaderUniformInfo.length = 0;
                }

                continue;
            }

            var sRealSamplerName: string = "as" + i.toString();

            if (!this.isUniformExists(sRealSamplerName)) {
                continue;
            }

            var pSampler: AIAFXVariableDeclInstruction = pBlend.getSamplersBySlot(i).value(0);
            var sSampler: string = pSampler.getSemantic() || pSampler.getName();
            var iNameIndex: uint = pPassInput._getUniformVarNameIndex(sSampler);
            var eType: AEAFXShaderVariableType = pSampler.getType().isSampler2D() ?
                AEAFXShaderVariableType.k_Sampler2D :
                AEAFXShaderVariableType.k_SamplerCUBE;

            pShaderUniformInfo = this._pShaderUniformInfoMap[sRealSamplerName];

            pShaderUniformInfo.type = eType;
            pShaderUniformInfo.length = 0;

            pInputUniformInfo = createInputUniformInfo(sSampler, iNameIndex, pShaderUniformInfo, false);
            pInputUniformInfo.isCollapsedArray = (pSampler.getType().getLength() > 0);

            this._pInputSamplerInfoList.push(pInputUniformInfo);
        }


        /* Initialize info about array of samplers */
        var pSamplerArrayKeys: uint[] = pPassInput.samplerArrayKeys;
        this._pInputSamplerArrayInfoList = [];

        for (var i: uint = 0; i < pSamplerArrayKeys.length; i++) {
            var iNameIndex: uint = pSamplerArrayKeys[i];
            var sName: string = pPassInput._getUniformVarNameByIndex(iNameIndex);
            var eType: AEAFXShaderVariableType = pPassInput._getUniformType(iNameIndex);
            var iLength: uint = pPassInput._getUniformLength(iNameIndex);
            var sShaderName: string = sName + "[0]";
            var pInputUniformInfo: AIInputUniformInfo = null;

            if (!this.isUniformExists(sShaderName)) {
                continue;
            }

            var pShaderUniformInfo: AIShaderUniformInfo = this._pShaderUniformInfoMap[sShaderName];

            pShaderUniformInfo.type = eType;
            pShaderUniformInfo.length = iLength;

            pInputUniformInfo = createInputUniformInfo(sName, iNameIndex, pShaderUniformInfo, false);

            this._pInputSamplerArrayInfoList.push(pInputUniformInfo);
        }

        var pAttrInfoList: AIAFXVariableBlendInfo[] = pAttrs.attrsInfo;

        var nPreparedAttrs: int = -1;
        var nPreparedBuffers: int = -1;

        for (var i: uint = 0; i < pAttrInfoList.length; i++) {
            var iSemanticIndex: uint = i;
            var pAttrInfo: AIAFXVariableBlendInfo = pAttrInfoList[iSemanticIndex];
            var sSemantic: string = pAttrInfo.name;
            var iSlot: uint = pAttrs.getSlotBySemanticIndex(iSemanticIndex);

            if (iSlot === -1) {
                continue;
            }

            var iBufferSlot: uint = pAttrs.getBufferSlotBySemanticIndex(iSemanticIndex);

            // is it not initied attr?
            if (iSlot > nPreparedAttrs) {
                var sAttrName: string = "aa" + iSlot.toString();
                var sBufferName: string = "abs" + iBufferSlot.toString();

                if (!this.isAttrExists(sAttrName)) {
                    continue;
                }

                var pShaderAttrInfo: AIShaderAttrInfo = this._pShaderAttrInfoMap[sAttrName];
                var isMappable: boolean = iBufferSlot >= 0;
                var pVertexTextureInfo: AIShaderUniformInfo = isMappable ? this._pShaderUniformInfoMap[sBufferName] : null;
                var isComplex: boolean = pAttrs.getTypeBySemanticIndex(iSemanticIndex).isComplex();

                // need to init buffer
                if (iBufferSlot > nPreparedBuffers) {
                    if (!this.isUniformExists(sBufferName)) {
                        debug.error("This erroer must not be happen");
                        continue;
                    }

                    pVertexTextureInfo.type = AEAFXShaderVariableType.k_SamplerVertexTexture;
                    pVertexTextureInfo.length = 0;
                }

                pShaderAttrInfo.semantic = sSemantic;
                pShaderAttrInfo.isMappable = isMappable;
                pShaderAttrInfo.isComplex = isComplex;
                pShaderAttrInfo.vertexTextureInfo = pVertexTextureInfo;

                nPreparedAttrs++;
            }

            //add offset uniforms
            var pOffsetVars: AIAFXVariableDeclInstruction[] = pAttrs.getOffsetVarsBySemantic(sSemantic);

            if (!isNull(pOffsetVars)) {
                var pShaderAttrInfo: AIShaderAttrInfo = this._pShaderAttrInfoList[iSlot];
                var pOffsetInfoList: AIShaderAttrOffsetInfo[] = pShaderAttrInfo.offsets || new Array();

                for (var j: uint = 0; j < pOffsetVars.length; j++) {
                    var sOffsetSemantic: string = pOffsetVars[j].getSemantic();
                    var sOffsetName: string = pOffsetVars[j].getRealName();

                    if (this.isUniformExists(sOffsetName)) {
                        var pOffsetUniformInfo: AIShaderUniformInfo = this._pShaderUniformInfoMap[sOffsetName];
                        var fDefaultValue: float = pAttrs.getOffsetDefault(sOffsetName);

                        pOffsetUniformInfo.type = AEAFXShaderVariableType.k_Float;
                        pOffsetUniformInfo.length = 0;

                        pOffsetInfoList.push(createShaderAttrOffsetInfo(sOffsetSemantic, pOffsetUniformInfo, fDefaultValue));
                    }
                }

                pShaderAttrInfo.offsets = pOffsetInfoList;
            }

        }

        /* Prepare funtions to set uniform value in real shader progrham */
        for (var i: uint = 0; i < this._pShaderUniformInfoList.length; i++) {
            this.prepareApplyFunctionForUniform(this._pShaderUniformInfoList[i]);
        }

        return true;
    }

    //if(has("PROFILE_MAKE")) {

    private _pMakeTime: float[] = [0., 0., 0., 0., 0.];
    private _iCount: uint = 0;

    //}

    _make(pPassInput: AIAFXPassInputBlend, pBufferMap: AIBufferMap): AIShaderInput {

        if (has("PROFILE_MAKE")) {
            var tStartTime: float = (<any>window).performance.now();
            var tEndTime: float = 0.;
        }

        var pUniforms: any = pPassInput.uniforms;
        var pTextures: any = pPassInput.textures
			var pSamplers: AIAFXSamplerStateMap = pPassInput.samplers;
        var pPassInputRenderStates: AIMap<AERenderStateValues> = pPassInput.renderStates;
        var pSamplerArrays: AIAFXSamplerStateListMap = pPassInput.samplerArrays;

        var pInput: AIShaderInput = this._getShaderInput();

        for (var i: uint = 0; i < this._pInputUniformInfoList.length; i++) {
            var pInfo: AIInputUniformInfo = this._pInputUniformInfoList[i];

            if (pInfo.isComplex) {
                this.applyStructUniform(pInfo.structVarInfo, pUniforms[pInfo.nameIndex], pInput);
            }
            else {
                pInput.uniforms[pInfo.shaderVarInfo.location] = pUniforms[pInfo.nameIndex];
            }
        }

        if (has("PROFILE_MAKE")) {
            tEndTime = (<any>window).performance.now();
            this._pMakeTime[0] += tEndTime - tStartTime;
            tStartTime = tEndTime;
        }

        for (var i: uint = 0; i < this._pInputSamplerInfoList.length; i++) {
            var pInfo: AIInputUniformInfo = this._pInputSamplerInfoList[i];

            var pState: AIAFXSamplerState = null;
            var pTexture: AITexture = null;

            if (pInfo.isCollapsedArray) {
                pState = pSamplerArrays[pInfo.nameIndex][0];
            }
            else {
                pState = pPassInput._getSamplerState(pInfo.nameIndex);
            }

            pTexture = pPassInput._getTextureForSamplerState(pState);

            this.setSamplerState(pInput.uniforms[pInfo.shaderVarInfo.location], pTexture, pState);
        }

        if (has("PROFILE_MAKE")) {
            tEndTime = (<any>window).performance.now();
            this._pMakeTime[1] += tEndTime - tStartTime;
            tStartTime = tEndTime;
        }

        for (var i: uint = 0; i < this._pInputSamplerArrayInfoList.length; i++) {
            var pInfo: AIInputUniformInfo = this._pInputSamplerArrayInfoList[i];

            var pSamplerStates: AIAFXSamplerState[] = pSamplerArrays[pInfo.nameIndex];
            var pInputStates: AIAFXSamplerState[] = pInput.uniforms[pInfo.shaderVarInfo.location];

            for (var j: uint = 0; j < pInfo.shaderVarInfo.length; j++) {
                var pTexture: AITexture = pPassInput._getTextureForSamplerState(pSamplerStates[j]);
                this.setSamplerState(pInputStates[j], pTexture, pSamplerStates[j]);
            }
        }

        if (has("PROFILE_MAKE")) {
            tEndTime = (<any>window).performance.now();
            this._pMakeTime[2] += tEndTime - tStartTime;
            tStartTime = tEndTime;
        }

        for (var i: uint = 0; i < this._pShaderAttrInfoList.length; i++) {
            var pAttrInfo: AIShaderAttrInfo = this._pShaderAttrInfoList[i];
            var pFlow: AIDataFlow = pAttrInfo.isComplex ?
                pBufferMap.findFlow(pAttrInfo.semantic) || pBufferMap.getFlowBySemantic(pAttrInfo.semantic) :
                pBufferMap.getFlowBySemantic(pAttrInfo.semantic);
            // pBufferMap.findFlow(pAttrInfo.semantic) || pBufferMap.getFlow(pAttrInfo.semantic, true): 
            // pBufferMap.getFlow(pAttrInfo.semantic, true);

            pInput.attrs[pAttrInfo.location] = pFlow;

            if (pAttrInfo.isMappable) {
                pInput.uniforms[pAttrInfo.vertexTextureInfo.location] = pFlow.data.buffer;

                if (!isNull(pAttrInfo.offsets)) {
                    var pVertexDecl: AIVertexDeclaration = pFlow.data.getVertexDeclaration();

                    for (var j: uint = 0; j < pAttrInfo.offsets.length; j++) {
                        var pOffsetInfo: AIShaderAttrOffsetInfo = pAttrInfo.offsets[j];
                        var pElement: AIVertexElement = pVertexDecl.findElement(pOffsetInfo.semantic);

                        if (isNull(pElement)) {
                            pInput.uniforms[pOffsetInfo.shaderVarInfo.location] = pOffsetInfo.defaultValue;
                        }
                        else {
                            pInput.uniforms[pOffsetInfo.shaderVarInfo.location] = pElement.offset / 4.; /* offset in float */
                        }
                    }
                }
            }

        }

        if (has("PROFILE_MAKE")) {
            tEndTime = (<any>window).performance.now();
            this._pMakeTime[3] += tEndTime - tStartTime;
            tStartTime = tEndTime;
        }

        if (this._isUsedZero2D) {
            pInput.uniforms[this._pShaderUniformInfoMap["as0"].location] = 19;
        }

        if (this._isUsedZeroCube) {
            pInput.uniforms[this._pShaderUniformInfoMap["asc0"].location] = 19;
        }

        render.mergeRenderStateMap(pPassInputRenderStates, this._pPassBlend._getRenderStates(), pInput.renderStates);

        if (has("PROFILE_MAKE")) {
            tEndTime = (<any>window).performance.now();
            this._pMakeTime[4] += tEndTime - tStartTime;
            tStartTime = tEndTime;

            if (this._iCount % (100 * 300) === 0) {
                logger.log("----------------")
				logger.log("uniforms: ", this._pMakeTime[0])
				logger.log("samplers: ", this._pMakeTime[1])
				logger.log("sampler arrays: ", this._pMakeTime[2])
				logger.log("attrs: ", this._pMakeTime[3])
				logger.log("states: ", this._pMakeTime[4])
				logger.log("----------------")
				this._pMakeTime[0] = 0.;
                this._pMakeTime[1] = 0.;
                this._pMakeTime[2] = 0.;
                this._pMakeTime[3] = 0.;
                this._pMakeTime[4] = 0.;
                this._iCount = 0;
            }

            this._iCount++;
        }
        return pInput;
    }

    private prepareApplyFunctionForUniform(pUniform: AIShaderUniformInfo): void {
        if (pUniform.type !== AEAFXShaderVariableType.k_NotVar) {
            pUniform.applyFunction = this.getUniformApplyFunction(pUniform.type, (pUniform.length > 0));
            pUniform.defaultValue = this.getUnifromDefaultValue(pUniform.type, (pUniform.length > 0));
        }
    }

    private getUniformApplyFunction(eType: AEAFXShaderVariableType, isArray: boolean): Function {
        if (has("WEBGL")) {
            var pProgram: WebGLShaderProgram = <WebGLShaderProgram>this._pShaderProgram;
            if (isArray) {
                switch (eType) {
                    case AEAFXShaderVariableType.k_Float:
                        return pProgram._setFloat32Array;
                    case AEAFXShaderVariableType.k_Int:
                        return pProgram._setInt32Array;
                    case AEAFXShaderVariableType.k_Bool:
                        return pProgram._setInt32Array;

                    case AEAFXShaderVariableType.k_Float2:
                        return pProgram._setVec2Array;
                    case AEAFXShaderVariableType.k_Int2:
                        return pProgram._setVec2iArray;
                    // case AEAFXShaderVariableType.k_Bool2:
                    // 	return pProgram._setBool2Array;

                    case AEAFXShaderVariableType.k_Float3:
                        return pProgram._setVec3Array;
                    case AEAFXShaderVariableType.k_Int3:
                        return pProgram._setVec3iArray;
                    // case AEAFXShaderVariableType.k_Bool3:
                    // 	return pProgram._setBool3Array;

                    case AEAFXShaderVariableType.k_Float4:
                        return pProgram._setVec4Array;
                    case AEAFXShaderVariableType.k_Int4:
                        return pProgram._setVec4iArray;
                    // case AEAFXShaderVariableType.k_Bool4:
                    // 	return pProgram._setBool4Array;

                    // case AEAFXShaderVariableType.k_Float2x2:
                    // 	return pProgram._setMat2Array;
                    case AEAFXShaderVariableType.k_Float3x3:
                        return pProgram._setMat3Array;
                    case AEAFXShaderVariableType.k_Float4x4:
                        return pProgram._setMat4Array;

                    case AEAFXShaderVariableType.k_Sampler2D:
                        return pProgram._setSamplerArray;
                    case AEAFXShaderVariableType.k_SamplerCUBE:
                        return pProgram._setSamplerArray;
                    default:
                        logger.critical("Wrong uniform array type (" + eType + ")");
                }
            }
            else {
                switch (eType) {
                    case AEAFXShaderVariableType.k_Float:
                        return pProgram._setFloat;
                    case AEAFXShaderVariableType.k_Int:
                        return pProgram._setInt;
                    case AEAFXShaderVariableType.k_Bool:
                        return pProgram._setInt;

                    case AEAFXShaderVariableType.k_Float2:
                        return pProgram._setVec2;
                    case AEAFXShaderVariableType.k_Int2:
                        return pProgram._setVec2i;
                    // case AEAFXShaderVariableType.k_Bool2:
                    // 	return pProgram._setBool2

                    case AEAFXShaderVariableType.k_Float3:
                        return pProgram._setVec3;
                    case AEAFXShaderVariableType.k_Int3:
                        return pProgram._setVec3i;
                    // case AEAFXShaderVariableType.k_Bool3:
                    // 	return pProgram._setBool3

                    case AEAFXShaderVariableType.k_Float4:
                        return pProgram._setVec4;
                    case AEAFXShaderVariableType.k_Int4:
                        return pProgram._setVec4i;
                    // case AEAFXShaderVariableType.k_Bool4:
                    // 	return pProgram._setBool4

                    // case AEAFXShaderVariableType.k_Float2x2:
                    // 	return pProgram._setMat2
                    case AEAFXShaderVariableType.k_Float3x3:
                        return pProgram._setMat3;
                    case AEAFXShaderVariableType.k_Float4x4:
                        return pProgram._setMat4;

                    case AEAFXShaderVariableType.k_Sampler2D:
                        return pProgram._setSampler;
                    case AEAFXShaderVariableType.k_SamplerCUBE:
                        return pProgram._setSampler;
                    case AEAFXShaderVariableType.k_SamplerVertexTexture:
                        return pProgram._setVertexBuffer;
                    default:
                        logger.critical("Wrong uniform type (" + eType + ")");
                }
            }

        }
        else {
            if (isArray) {
                switch (eType) {
                    case AEAFXShaderVariableType.k_Float:
                        return this._pShaderProgram.setFloat32Array;
                    case AEAFXShaderVariableType.k_Int:
                        return this._pShaderProgram.setInt32Array;
                    // case AEAFXShaderVariableType.k_Bool:
                    // 	return this._pShaderProgram.setBoolArray;

                    case AEAFXShaderVariableType.k_Float2:
                        return this._pShaderProgram.setVec2Array;
                    case AEAFXShaderVariableType.k_Int2:
                        return this._pShaderProgram.setVec2iArray;
                    // case AEAFXShaderVariableType.k_Bool2:
                    // 	return this._pShaderProgram.setBool2Array;

                    case AEAFXShaderVariableType.k_Float3:
                        return this._pShaderProgram.setVec3Array;
                    case AEAFXShaderVariableType.k_Int3:
                        return this._pShaderProgram.setVec3iArray;
                    // case AEAFXShaderVariableType.k_Bool3:
                    // 	return this._pShaderProgram.setBool3Array;

                    case AEAFXShaderVariableType.k_Float4:
                        return this._pShaderProgram.setVec4Array;
                    case AEAFXShaderVariableType.k_Int4:
                        return this._pShaderProgram.setVec4iArray;
                    // case AEAFXShaderVariableType.k_Bool4:
                    // 	return this._pShaderProgram.setBool4Array;

                    // case AEAFXShaderVariableType.k_Float2x2:
                    // 	return this._pShaderProgram.setMat2Array;
                    case AEAFXShaderVariableType.k_Float3x3:
                        return this._pShaderProgram.setMat3Array;
                    case AEAFXShaderVariableType.k_Float4x4:
                        return this._pShaderProgram.setMat4Array;

                    case AEAFXShaderVariableType.k_Sampler2D:
                        return this._pShaderProgram.setSamplerArray;
                    case AEAFXShaderVariableType.k_SamplerCUBE:
                        return this._pShaderProgram.setSamplerArray;
                    default:
                        logger.critical("Wrong uniform array type (" + eType + ")");
                }
            }
            else {
                switch (eType) {
                    case AEAFXShaderVariableType.k_Float:
                        return this._pShaderProgram.setFloat;
                    case AEAFXShaderVariableType.k_Int:
                        return this._pShaderProgram.setInt;
                    case AEAFXShaderVariableType.k_Bool:
                        return this._pShaderProgram.setInt;

                    case AEAFXShaderVariableType.k_Float2:
                        return this._pShaderProgram.setVec2;
                    case AEAFXShaderVariableType.k_Int2:
                        return this._pShaderProgram.setVec2i;
                    // case AEAFXShaderVariableType.k_Bool2:
                    // 	return this._pShaderProgram.setBool2

                    case AEAFXShaderVariableType.k_Float3:
                        return this._pShaderProgram.setVec3;
                    case AEAFXShaderVariableType.k_Int3:
                        return this._pShaderProgram.setVec3i;
                    // case AEAFXShaderVariableType.k_Bool3:
                    // 	return this._pShaderProgram.setBool3

                    case AEAFXShaderVariableType.k_Float4:
                        return this._pShaderProgram.setVec4;
                    case AEAFXShaderVariableType.k_Int4:
                        return this._pShaderProgram.setVec4i;
                    // case AEAFXShaderVariableType.k_Bool4:
                    // 	return this._pShaderProgram.setBool4

                    // case AEAFXShaderVariableType.k_Float2x2:
                    // 	return this._pShaderProgram.setMat2
                    case AEAFXShaderVariableType.k_Float3x3:
                        return this._pShaderProgram.setMat3;
                    case AEAFXShaderVariableType.k_Float4x4:
                        return this._pShaderProgram.setMat4;

                    case AEAFXShaderVariableType.k_Sampler2D:
                        return this._pShaderProgram.setSampler;
                    case AEAFXShaderVariableType.k_SamplerCUBE:
                        return this._pShaderProgram.setSampler;
                    case AEAFXShaderVariableType.k_SamplerVertexTexture:
                        return this._pShaderProgram.setVertexBuffer;
                    default:
                        logger.critical("Wrong uniform type (" + eType + ")");
                }
            }
        }
    }

    private getUnifromDefaultValue(eType: AEAFXShaderVariableType, isArray: boolean): any {
        if (isArray) {
            return null;
        }
        else {
            switch (eType) {
                case AEAFXShaderVariableType.k_Float:
                    return 0.;
                case AEAFXShaderVariableType.k_Int:
                    return 0;
                case AEAFXShaderVariableType.k_Bool:
                    return 0;

                case AEAFXShaderVariableType.k_Float2:
                    return new Vec2(0);
                case AEAFXShaderVariableType.k_Int2:
                    return new Vec2(0);
                case AEAFXShaderVariableType.k_Bool2:
                    return new Vec2(0);

                case AEAFXShaderVariableType.k_Float3:
                    return new Vec3(0);
                case AEAFXShaderVariableType.k_Int3:
                    return new Vec3(0);
                case AEAFXShaderVariableType.k_Bool3:
                    return new Vec3(0);

                case AEAFXShaderVariableType.k_Float4:
                    return new Vec4(0);
                case AEAFXShaderVariableType.k_Int4:
                    return new Vec4(0);
                case AEAFXShaderVariableType.k_Bool4:
                    return new Vec4(0);

                // case AEAFXShaderVariableType.k_Float2x2:
                // 	return new Mat2(0);
                case AEAFXShaderVariableType.k_Float3x3:
                    return new Mat3(0);
                case AEAFXShaderVariableType.k_Float4x4:
                    return new Mat4(0);

                case AEAFXShaderVariableType.k_Sampler2D:
                    return null;
                case AEAFXShaderVariableType.k_SamplerCUBE:
                    return null;
                case AEAFXShaderVariableType.k_SamplerVertexTexture:
                    return null;
                default:
                    logger.critical("Wrong uniform type (" + eType + ")");
            }
        }
    }

    private setSamplerState(pOut: AIAFXSamplerState, pTexture: AITexture, pFrom: AIAFXSamplerState): void {
        pOut.texture = pTexture;
        pOut.wrap_s = pFrom.wrap_s;
        pOut.wrap_t = pFrom.wrap_t;
        pOut.mag_filter = pFrom.mag_filter;
        pOut.min_filter = pFrom.min_filter;
    }

    private expandStructUniforms(pVariable: AIAFXVariableDeclInstruction, sPrevName: string = ""): AIUniformStructInfo {
        var sRealName: string = pVariable.getRealName();

        if (sPrevName !== "") {
            sPrevName += "." + sRealName;
        }
        else {
            if (!this._pPassBlend._hasUniformWithName(sRealName)) {
                return null;
            }

            sPrevName = sRealName;
        }

        var pVarType: AIAFXVariableTypeInstruction = pVariable.getType();
        var pFieldNameList: string[] = pVarType.getFieldNameList();
        var isArray: boolean = pVarType.isNotBaseArray();
        var iLength: uint = isArray ? pVarType.getLength() : 1;

        if (isArray && (iLength === Instruction.UNDEFINE_LENGTH || iLength === 0)) {
            logger.warn("Length of struct '" + sRealName + "' can not be undefined");
            return null;
        }

        var pStructInfo: AIUniformStructInfo = createUniformStructFieldInfo(sRealName, true, isArray);
        pStructInfo.fields = new Array();

        var sFieldPrevName: string = "";
        var pFieldInfoList: AIUniformStructInfo[] = null;

        for (var i: uint = 0; i < iLength; i++) {
            if (isArray) {
                pFieldInfoList = new Array();
                sFieldPrevName = sPrevName + "[" + i + "]";
            }
            else {
                pFieldInfoList = pStructInfo.fields;
                sFieldPrevName = sPrevName;
            }

            for (var j: uint = 0; j < pFieldNameList.length; j++) {
                var sFieldName: string = pFieldNameList[j];
                var pField: AIAFXVariableDeclInstruction = pVarType.getField(sFieldName);
                var pFieldInfo: AIUniformStructInfo = null;

                if (pField.getType().isComplex()) {
                    pFieldInfo = this.expandStructUniforms(pField, sFieldPrevName);
                }
                else {
                    var sFieldRealName: string = sFieldPrevName + "." + pField.getRealName();
                    var eFieldType: AEAFXShaderVariableType = VariableContainer.getVariableType(pField);
                    var iFieldLength: uint = pField.getType().getLength();
                    var isFieldArray: boolean = pField.getType().isNotBaseArray();
                    var sFieldShaderName: string = sFieldRealName;

                    if (isFieldArray) {
                        sFieldShaderName += "[0]";
                    }

                    if (!this.isUniformExists(sFieldShaderName)) {
                        continue;
                    }

                    var pShaderUniformInfo: AIShaderUniformInfo = this._pShaderUniformInfoMap[sFieldShaderName];
                    pShaderUniformInfo.type = eFieldType;
                    pShaderUniformInfo.length = iFieldLength;

                    pFieldInfo = createUniformStructFieldInfo(pField.getRealName(), false, isFieldArray);
                    pFieldInfo.shaderVarInfo = pShaderUniformInfo;
                }

                if (!isNull(pFieldInfo)) {
                    pFieldInfoList.push(pFieldInfo);
                }
            }

            if (isArray && pFieldInfoList.length > 0) {
                var pArrayElementInfo: AIUniformStructInfo = createUniformStructFieldInfo(sRealName, true, false);
                pArrayElementInfo.index = i;
                pArrayElementInfo.fields = pFieldInfoList;

                pStructInfo.fields.push(pArrayElementInfo);
            }
        }

        if (pStructInfo.fields.length > 0) {
            return pStructInfo;
        }
        else {
            return null;
        }
    }

    private applyStructUniform(pStructInfo: AIUniformStructInfo, pValue: any, pInput: AIShaderInput): void {
        if (!isDefAndNotNull(pValue)) {
            return;
        }

        if (pStructInfo.isArray) {
            for (var i: uint = 0; i < pStructInfo.fields.length; i++) {
                var pFieldInfo: AIUniformStructInfo = pStructInfo.fields[i];
                if (isDef(pValue[pFieldInfo.index])) {
                    this.applyStructUniform(pFieldInfo, pValue[pFieldInfo.index], pInput);
                }
            }
        }
        else {
            for (var i: uint = 0; i < pStructInfo.fields.length; i++) {
                var pFieldInfo: AIUniformStructInfo = pStructInfo.fields[i];
                var pFieldValue: any = pValue[pFieldInfo.name];

                if (isDef(pFieldValue)) {
                    if (pFieldInfo.isComplex) {
                        this.applyStructUniform(pFieldInfo, pFieldValue, pInput);
                    }
                    else {
                        pInput.uniforms[pFieldInfo.shaderVarInfo.location] = pFieldValue;
                    }
                }
            }
        }
    }

    private applyUnifromArray(sName: string, eType: AEAFXShaderVariableType, pValue: any): void {
        switch (eType) {
            case AEAFXShaderVariableType.k_Float:
                this._pShaderProgram.setFloat32Array(sName, pValue);
                break;
            case AEAFXShaderVariableType.k_Int:
                this._pShaderProgram.setInt32Array(sName, pValue);
                break;
            // case AEAFXShaderVariableType.k_Bool:
            // 	this._pShaderProgram.setBoolArray(sName, pValue);
            // 	break;

            case AEAFXShaderVariableType.k_Float2:
                this._pShaderProgram.setVec2Array(sName, pValue);
                break;
            case AEAFXShaderVariableType.k_Int2:
                this._pShaderProgram.setVec2iArray(sName, pValue);
                break;
            // case AEAFXShaderVariableType.k_Bool2:
            // 	this._pShaderProgram.setBool2Array(sName, pValue);
            // 	break;

            case AEAFXShaderVariableType.k_Float3:
                this._pShaderProgram.setVec3Array(sName, pValue);
                break;
            case AEAFXShaderVariableType.k_Int3:
                this._pShaderProgram.setVec3iArray(sName, pValue);
                break;
            // case AEAFXShaderVariableType.k_Bool3:
            // 	this._pShaderProgram.setBool3Array(sName, pValue);
            // 	break;

            case AEAFXShaderVariableType.k_Float4:
                this._pShaderProgram.setVec4Array(sName, pValue);
                break;
            case AEAFXShaderVariableType.k_Int4:
                this._pShaderProgram.setVec4iArray(sName, pValue);
                break;
            // case AEAFXShaderVariableType.k_Bool4:
            // 	this._pShaderProgram.setBool4Array(sName, pValue);
            // 	break;

            // case AEAFXShaderVariableType.k_Float2x2:
            // 	this._pShaderProgram.setMat2Array(sName, pValue);
            // 	break;
            case AEAFXShaderVariableType.k_Float3x3:
                this._pShaderProgram.setMat3Array(sName, pValue);
                break;
            case AEAFXShaderVariableType.k_Float4x4:
                this._pShaderProgram.setMat4Array(sName, pValue);
                break;

            case AEAFXShaderVariableType.k_Sampler2D:
                this._pShaderProgram.setSamplerArray(sName, pValue);
                break;
            case AEAFXShaderVariableType.k_SamplerCUBE:
                this._pShaderProgram.setSamplerArray(sName, pValue);
                break;

            default:
                logger.critical("Wrong uniform array type (" + eType + ") with name " + sName);
        }
    }

    private applyUniform(sName: string, eType: AEAFXShaderVariableType, pValue: any): void {
        switch (eType) {
            case AEAFXShaderVariableType.k_Float:
                this._pShaderProgram.setFloat(sName, pValue || 0.);
                break;
            case AEAFXShaderVariableType.k_Int:
                this._pShaderProgram.setInt(sName, pValue || 0);
                break;
            case AEAFXShaderVariableType.k_Bool:
                this._pShaderProgram.setInt(sName, pValue ? 1 : 0);
                break;

            case AEAFXShaderVariableType.k_Float2:
                this._pShaderProgram.setVec2(sName, pValue || Vec2.temp(0));
                break;
            case AEAFXShaderVariableType.k_Int2:
                this._pShaderProgram.setVec2i(sName, pValue || Vec2.temp(0));
                break;
            // case AEAFXShaderVariableType.k_Bool2:
            // 	this._pShaderProgram.setBool2(sName, pValue);
            // 	break;

            case AEAFXShaderVariableType.k_Float3:
                this._pShaderProgram.setVec3(sName, pValue || Vec3.temp(0));
                break;
            case AEAFXShaderVariableType.k_Int3:
                this._pShaderProgram.setVec3i(sName, pValue || Vec3.temp(0));
                break;
            // case AEAFXShaderVariableType.k_Bool3:
            // 	this._pShaderProgram.setBool3(sName, pValue);
            // 	break;

            case AEAFXShaderVariableType.k_Float4:
                this._pShaderProgram.setVec4(sName, pValue || Vec4.temp(0));
                break;
            case AEAFXShaderVariableType.k_Int4:
                this._pShaderProgram.setVec4i(sName, pValue || Vec4.temp(0));
                break;
            // case AEAFXShaderVariableType.k_Bool4:
            // 	this._pShaderProgram.setBool4(sName, pValue);
            // 	break;

            // case AEAFXShaderVariableType.k_Float2x2:
            // 	this._pShaderProgram.setMat2(sName, pValue);
            // 	break;
            case AEAFXShaderVariableType.k_Float3x3:
                this._pShaderProgram.setMat3(sName, pValue || Mat3.temp(0));
                break;
            case AEAFXShaderVariableType.k_Float4x4:
                this._pShaderProgram.setMat4(sName, pValue || Mat4.temp(0));
                break;

            case AEAFXShaderVariableType.k_Sampler2D:
                this._pShaderProgram.setSampler(sName, pValue);
                break;
            case AEAFXShaderVariableType.k_SamplerCUBE:
                this._pShaderProgram.setSampler(sName, pValue);
                break;
            case AEAFXShaderVariableType.k_SamplerVertexTexture:
                this._pShaderProgram.setVertexBuffer(sName, pValue);
                break;
            default:
                logger.critical("Wrong uniform type (" + eType + ") with name " + sName);
        }
    }
}


export = Maker;