/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var TEXT = 10;
var BINARY = 11;

function loadEffectFile(sSource, iType) {
    if (iType === TEXT) {
        a.EffectParser.parse(sSource);
        var pTree = a.EffectParser.pSyntaxTree;
        var pTable = a.EffectParser.pSymbolTable;
        if (pRootNode instanceof a.EffectParser.Node) {
            var pEffect = new Effect();
            pEffect.analyze(pRootNode);
            return pEffect;
        }
        return pRootNode;
    }
    else {
        //TODO
        //load from binary
    }
}
;
//Define(VARDECL, "VariableDecl");
//Define(TYPEDECL, "TypeDecl");
//Define(STRUCTDECL, "VarStructDecl");
//Define(FUNCDECL, "FunctionDecl");
//Define(TECHDECL, "TechniqueDecl");
//Define(USAGES, "Usages");
//Define(TYPE, "Type");
//Define(VARIABLE, "Variable");
var VARIABLEDECL = "VariableDecl";
var TYPEDECL = "TypeDecl";
var VARSTRUCTDECL = "VarStructDecl";
var FUNCTIONDECL = "FunctionDecl";
var TECHIQUEDECL = "TechniqueDecl";
var USAGE = "Usages";
var TYPE = "EffectType";
var VARIABLE = "EffectVariable";
var SEMANTIC = "Semantic";
var ANNOTATION = "Annotation";
var INITIALIZER = "Initializer";
var CONST = "const";
var ROW_MAJOR = "row_major";
var COLUMN_MAJOR = "column_major";
var UNIFORM = "uniform";
var STATIC = "static";
var SHARED = "shared";
var EXTERN = "extern";
var INLINE = "inline";

var T_KW_STATIC = "static"
var T_KW_UNIFORM = "uniform"
var T_KW_EXTERN = "extern"
var T_KW_VOLATILE = "volatile"
var T_KW_INLINE = "inline"
var T_KW_SHARED = "shared"
var T_KW_CONST = "const"
var T_KW_ROW_MAJOR = "row_major"
var T_KW_COLUMN_MAJOR = "column_major"
var T_KW_TYPEDEF = "typedef"
var T_KW_STRUCT = "struct"
var T_KW_VOID = "void"
var T_KW_BOOL = "bool"
var T_KW_INT = "int"
var T_KW_HALF = "half"
var T_KW_FLOAT = "float"
var T_KW_DOUBLE = "double"
var T_KW_VECTOR = "vector"
var T_KW_MATRIX = "matrix"
var T_KW_STRING = "string"
var T_KW_TEXTURE = "texture"
var T_KW_TEXTURE1D = "texture1D"
var T_KW_TEXTURE2D = "texture2D"
var T_KW_TEXTURE3D = "texture3D"
var T_KW_TEXTURECUBE = "texturecube"
var T_KW_SAMPLER = "sampler"
var T_KW_SAMPLER1D = "sampler1D"
var T_KW_SAMPLER2D = "sampler2D"
var T_KW_SAMPLER3D = "sampler3D"
var T_KW_SAMPLERCUBE = "samplercube"
var T_KW_PIXELSHADER = "pixelshader"
var T_KW_VERTEXSHADER = "vertexshader"
var T_KW_PIXELFRAGMENT = "pixelfragment"
var T_KW_VERTEXFRAGMENT = "vertexfragment"
var T_KW_STATEBLOCK = "stateblock"
var T_KW_STATEBLOCK_STATE = "stateblock_state"
var T_KW_COMPILE_FRAGMENT = "compile_fragment"
var T_KW_REGISTER = "register"
var T_KW_COMPILE = "compile"
var T_KW_SAMPLER_STATE = "sampler_state"

var SIMPLEEXPR = "SimpleExpr";
var CONSTANTEXPR = "ConstantExpr";
var COMPLEXEXPR = "ComplexExpr";
var OBJECTEXPR = "ObjectExpr";
var PRIMARYEXPR = "PrimaryExpr";
var POSTFIXEXPR = "PostfixExpr";
var UNARYEXPR = "UnaryExpr";
var CASTEXPR = "CastExpr";
var MULEXPR = "MulExpr";
var ADDEXPR = "AddExpr";
var RELATIONALEXPR = "RelationalExpr";
var EQUALITYEXPR = "EqualityExpr";
var ANDEXPR = "AndExpr";
var OREXPR = "OrExpr";
var CONDITIONALEXPR = "ConditionalExpr";
var ASSIGNMENTEXPR = "AssignmentExpr";
var BASETYPE = "BaseType";

var STMTBLOCK = "StmtBlock";

var CONSTTYPEDIM = "ConstTypeDim";
var SCALARTYPE = "ScalarType";
var VECTORTYPE = "VectorType";
var MATRIXTYPE = "MatrixType";
var OBJECTTYPE = "ObjectType";

var T_NON_TYPE_ID = "T_NON_TYPE_ID";
var T_TYPE_ID = "T_TYPE_ID";
var T_STRING = "T_STRING";
var T_FLOAT = "T_FLOAT";
var T_UINT = "T_UINT";
var T_KW_TRUE = "T_KW_TRUE";
var T_KW_FALSE = "T_KW_FALSE";

var GLOBAL = 0;

var STRUCT = 10;

var PROGRAM = "Program"
var DECLS = "Decls"
var DECL = "Decl"
var USEDECL = "UseDecl"
var USAGES = "Usages"
var USAGE = "Usage"
var CONSTUSAGES = "ConstUsages"
var CONSTUSAGE = "ConstUsage"
var USAGETYPE = "UsageType"
var USAGESTRUCTDECL = "UsageStructDecl"
var TYPEDECL = "TypeDecl"
var TYPEDEFS = "TypeDefs"
var TYPE = "Type"
var CONSTTYPE = "ConstType"
var CONSTTYPEDIM = "ConstTypeDim"
var BASETYPE = "BaseType"
var SCALARTYPE = "ScalarType"
var VECTORTYPE = "VectorType"
var MATRIXTYPE = "MatrixType"
var OBJECTTYPE = "ObjectType"
var STRUCT = "Struct"
var STRUCTDECL = "StructDecl"
var CONSTSTRUCTDECL = "ConstStructDecl"
var STRUCTBEGIN = "StructBegin"
var STRUCTDECLS = "StructDecls"
var STRUCTEND = "StructEnd"
var SEMANTIC = "Semantic"
var SEMANTICS = "Semantics"
var SEMANTICSOPT = "SemanticsOpt"
var REGISTER = "Register"
var ANNOTATION = "Annotation"
var ANNOTATIONOPT = "AnnotationOpt"
var ANNOTATIONBEGIN = "AnnotationBegin"
var ANNOTATIONDECLS = "AnnotationDecls"
var ANNOTATIONEND = "AnnotationEnd"
var INITIALIZER = "Initializer"
var INITIALIZEROPT = "InitializerOpt"
var VARIABLEDECL = "VariableDecl"
var VARSTRUCTDECL = "VarStructDecl"
var VARIABLES = "Variables"
var VARIABLE = "Variable"
var VARIABLEDIM = "VariableDim"
var FUNCTIONDECL = "FunctionDecl"
var FUNCTIONDEF = "FunctionDef"
var PARAMLIST = "ParamList"
var PARAMLISTBEGIN = "ParamListBegin"
var PARAMLISTEND = "ParamListEnd"
var PARAMETERDECLS = "ParameterDecls"
var PARAMETERDECL = "ParameterDecl"
var PARAMUSAGETYPE = "ParamUsageType"
var PARAMUSAGES = "ParamUsages"
var PARAMUSAGE = "ParamUsage"
var TECHNIQUEDECL = "TechniqueDecl"
var TECHNIQUEBODY = "TechniqueBody"
var TECHNIQUEBEGIN = "TechniqueBegin"
var TECHNIQUEEND = "TechniqueEnd"
var PASSDECLS = "PassDecls"
var PASSDECL = "PassDecl"
var STATEBLOCK = "StateBlock"
var STATEBLOCKBEGIN = "StateBlockBegin"
var STATEBLOCKEND = "StateBlockEnd"
var STATES = "States"
var STATE = "State"
var STATEINDEX = "StateIndex"
var STATEEXPRBEGIN = "StateExprBegin"
var STATEEXPREND = "StateExprEnd"
var STMTBLOCK = "StmtBlock"
var STMTBLOCKBEGIN = "StmtBlockBegin"
var STMTBLOCKEND = "StmtBlockEnd"
var STMTS = "Stmts"
var SIMPLESTMT = "SimpleStmt"
var NONIFSTMT = "NonIfStmt"
var STMT = "Stmt"
var FOR = "For"
var FORINIT = "ForInit"
var FORCOND = "ForCond"
var FORSTEP = "ForStep"
var DWORDEXPR = "DwordExpr"
var STATEEXPR = "StateExpr"
var SIMPLEEXPR = "SimpleExpr"
var COMPLEXEXPR = "ComplexExpr"
var OBJECTEXPR = "ObjectExpr"
var PRIMARYEXPR = "PrimaryExpr"
var POSTFIXEXPR = "PostfixExpr"
var UNARYEXPR = "UnaryExpr"
var CASTEXPR = "CastExpr"
var MULEXPR = "MulExpr"
var ADDEXPR = "AddExpr"
var RELATIONALEXPR = "RelationalExpr"
var EQUALITYEXPR = "EqualityExpr"
var ANDEXPR = "AndExpr"
var OREXPR = "OrExpr"
var CONDITIONALEXPR = "ConditionalExpr"
var ASSIGNMENTEXPR = "AssignmentExpr"
var ARGUMENTS = "Arguments"
var ARGUMENTSOPT = "ArgumentsOpt"
var INITEXPR = "InitExpr"
var INITEXPRS = "InitExprs"
var CONSTANTEXPR = "ConstantExpr"
var EXPR = "Expr"
var DWORD = "Dword"
var DWORDID = "DwordId"
var ID = "Id"
var IDOPT = "IdOpt"
var TARGET = "Target"
var UINT = "Uint"
var FLOAT = "Float"
var STRINGS = "Strings"
var STRING = "String"
var TYPEID = "TypeId"
var NONTYPEID = "NonTypeId"
var T_KW_FOR = "for"
var T_KW_RETURN = "return"
var T_KW_DO = "do"
var T_KW_DISCARD = "discard"
var T_KW_WHILE = "while"
var T_KW_IF = "if"
var T_KW_ELSE = "else"
var FROMEXPR = "FromExpr";
var MEMEXPR = "MemExpr";
var T_KW_USE = "use"
var T_KW_STRICT = "strict"
var IMPORTDECL = "ImportDecl";
var PROVIDEDECL = "ProvideDecl";
var STATEIF = "StateIf";
var STATESWITCH = "StateSwitch";
var CASESTATE = "CaseState";
var DEFAULTSTATE = "DefaultState";
var PASSSTATE = "PassState";

var SYSTEMVAR = "engine";
/**
 * Type for system(defined in js) variables, only for pass
 * @type {Int}
 */
var UNDEFINEDTYPE = 7;


var VERTEXUSAGE = 1;
var FRAGMENTUSAGE = 2;
var STRUCTUSAGE = 3;
var LOCALUSAGE = 4;
var PARAMETRUSAGE = 5;
var VERTEXUSAGEPARAM = 6;
var GLOBALUSAGE = 7;
var NOTUSAGE = -1;

var ERRORBADFUNCTION = 147;
var SHADEROUT = "Out";


function GLSLExpr(sTemplate) {
    this.pArgs = {};
    this.pExpr = [];
    var pObj = sTemplate.split(/(\$\d+)/);
    for (var i = 0; i < pObj.length; i++) {
        if (pObj[i]) {
            if (pObj[i][0] !== '$') {
                this.pExpr.push(pObj[i]);
            }
            else {
                this.pExpr.push(null);
                this.pArgs[this.pExpr.length - 1] = pObj[i].substr(1) - 1;
            }
        }
    }
}
GLSLExpr.prototype.toGLSL = function (pArguments) {
    var i = 0, j;
    var pExpr = this.pExpr;
    var pArgs = this.pArgs;
    var pRes = [];
    for (i = 0; i < pExpr.length; i++) {
        if (pExpr[i] === null) {
            if (pArgs[i] === undefined) {
                error("Bad translate expr");
                return;
            }
            if (!pArguments[pArgs[i]]) {
                console.log(this, pArguments, pArguments[pArgs[i]], pArguments[1], pArgs[i], i);
                error("bad translation pArguments");
                return;
            }
            pRes.push("(");
            for (j = 0; j < pArguments[pArgs[i]].length; j++) {
                pRes.push(pArguments[pArgs[i]][j]);
            }
            pRes.push(")");
        }
        else {
            pRes.push(pExpr[i]);
        }
    }
    return pRes;
};

function VariableType() {
    /**
     * @type EffectType
     */
    this.pEffectType = null;
    /**
     *
     * @type {Boolean}
     * @private
     */
    this._isBase = false;
    /**
     *
     * @type {String}
     */
    this.sSemantic = null;
    /**
     * @type {Int[]}
     */
    this.pUsages = null;
    this.pUsagesName = null;
    this.isMixible = false;
    this.isVSInput = false;
    this.isFSInput = false;
}
VariableType.prototype.setUsage = function (sValue) {
    if (!this.pUsages) {
        this.pUsages = [];
    }
    if (!this.pUsagesName) {
        this.pUsagesName = {};
    }
    this.pUsages.push(sValue);
    if (this.pUsagesName[sValue] === null) {
        error("same usage 2 times");
        return;
    }
    this.pUsagesName[sValue] = null;
};
VariableType.prototype.setType = function (pType) {
    if (pType instanceof VariableType) {
        this.pEffectType = pType.pEffectType;
        this._isBase = pType._isBase;
        this.sSemantic = pType.sSemantic;
        this.pUsages = pType.pUsages;
    }
    else {
        this.pEffectType = pType;
        if (pType.isBase()) {
            this._isBase = true;
        }
    }
};
VariableType.prototype.toCode = function () {
    //TODO: to string
};
VariableType.prototype.isStruct = function () {
    if (this.pEffectType && this.pEffectType.isStruct) {
        return true;
    }
    return false;
};
VariableType.prototype.isBase = function () {
    return this._isBase;
};
VariableType.prototype.isVoid = function () {
    if (this.pEffectType.sName === "void") {
        return true;
    }
    return false;
};
VariableType.prototype.checkMe = function () {
    //TODO: add valid tests for variabletype
    var i;
    for (i = 0; i < arguments.length; i++) {
        switch (arguments[i]) {
            case NOTUSAGE:
                break;
            case VERTEXUSAGE:
                if (this.isStruct() && this.pEffectType.checkMe(VERTEXUSAGE)) {
                    continue;
                }
                if (this.isBase() && this.sSemantic === "POSITION") {
                    continue;
                }
                return false;
            case FRAGMENTUSAGE:
                if (this.isStruct() && this.pEffectType.checkMe(FRAGMENTUSAGE)) {
                    continue;
                }
                if (this.isBase() && this.sSemantic === "COLOR") {
                    continue;
                }
                return false;
            case STRUCTUSAGE:
                if (this.pUsages) {
                    return false;
                }
                break;
            case VERTEXUSAGEPARAM:
                if (!this.pEffectType.checkMe(VERTEXUSAGEPARAM)) {
                    return false;
                }
                break;
            case PARAMETRUSAGE:
                break;
            case LOCALUSAGE:
                if (this.pUsagesName["uniform"] === null ||
                    this.pUsagesName["global"] === null) {
                    return false;
                }
                break;
            case GLOBALUSAGE:
                break;
            default:
                warning("Unknown usage for check");
                break;
        }
    }
    return true;
};
VariableType.prototype.isEqual = function (pType) {
    if (pType instanceof VariableType) {
        if (this.pEffectType === pType.pEffectType) {
            return true;
        }
        return false;
    }
    if (this.pEffectType.isEqual(pType)) {
        return true;
    }
    return false;
};
VariableType.prototype.isType = function (pEffectType) {
    if (this.pEffectType === pEffectType) {
        return true;
    }
    return false;
};
VariableType.prototype.cloneMe = function () {
    var pType = new VariableType();
    pType.pEffectType = this.pEffectType;
    pType._isBase = this._isBase;
    pType.sSemantic = this.sSemantic;
    pType.pUsages = this.pUsages;
    pType.isVSInput = this.isVSInput;
    return pType;
};
VariableType.prototype.toStr = function () {
    var sRes = "";
    var i;
    for (i = 0; this.pUsages && i < this.pUsages.length; i++) {
        sRes += this.pUsages[i] + ":";
    }
    sRes += this.pEffectType.sName;
    return sRes;
};
VariableType.prototype.isSampler = function () {
    return this.pEffectType.isSampler();
};
VariableType.prototype.isConst = function () {
    if (this.pUsagesName && this.pUsagesName["const"] === null) {
        return true;
    }
    return false;
};
VariableType.prototype.setMixible = function () {
    if (!this.pEffectType || this.isMixible) {
        return;
    }
    this.isMixible = true;
    this.pEffectType.setMixible();
};
VariableType.prototype.setVSInput = function () {
    this.isVSInput = true;
    this.pEffectType.setVSInput();
};
VariableType.prototype.setFSInput = function () {
    this.isFSInput = true;
    this.pEffectType.setFSInput();
};

function EffectType(sName, sRealName, isBase, iSize) {
    /**
     * @type {String}
     */
    this.sName = sName || null;
    /**
     * @type {String}
     */
    this.sRealName = sRealName || null;
    /**
     * @type {EffectStruct}
     */
    this.pDesc = null;
    /**
     * @type {Boolean}
     */
    this.isStruct = false;
    /**
     * @type {Boolean}
     */
    this.isAnalyzed = false;
    /**
     * @type {Boolean}
     */
    this._isBase = isBase || false;
    /**
     * Size of type
     * @type {Int}
     */
    this.iSize = iSize || 0;
    this.isMixible = false;
    this.isVSInput = false;
    this.isFSInput = false;
}
EffectType.prototype.isEqual = function (pType) {
    if (pType instanceof VariableType) {
        if (pType.pEffectType === this) {
            return true;
        }
        return false;
    }
    if (pType === this) {
        return true;
    }
    return false;
};
EffectType.prototype.isConst = function () {
    return true;
};
EffectType.prototype.isSampler = function () {
    if (this.sName === "sampler" || this.sName === "sampler1D" || this.sName === "sampler2D" ||
        this.sName === "sampler3D" || this.sName === "samplercube") {
        return true;
    }
    return false;
};
EffectType.prototype.fromStruct = function (pStruct) {
    this.sName = pStruct.sName;
    this.pDesc = pStruct;
    this.isStruct = true;
};
EffectType.prototype.toStr = function () {
    return this.sName;
};
EffectType.prototype.isBase = function () {
    return this._isBase;
};
EffectType.prototype.toCode = function () {
    //TODO: to string
};
EffectType.prototype.hasSemantic = function (sSemantic) {
    return this.pDesc.hasSemantic(sSemantic) || false;
};
EffectType.prototype.hasEmptySemantic = function () {
    return this.pDesc.hasEmptySemantic();
};
EffectType.prototype.hasMultipleSemantic = function () {
    return this.pDesc.hasMultipleSemantic();
}
EffectType.prototype.hasComplexType = function () {
    return this.pDesc.hasComplexType();
};
EffectType.prototype.checkMe = function () {
    var i, j;
    if (!this.isAnalyzed) {
        this.pDesc.analyzeSemantics();
        this.isAnalyzed = true;
    }
    for (i = 0; i < arguments.length; i++) {
        switch (arguments[i]) {
            case VERTEXUSAGE:
                if (!this.hasSemantic("POSITION") || this.hasEmptySemantic() || this.hasMultipleSemantic() ||
                    this.hasComplexType()) {
                    return false;
                }
                break;
            case FRAGMENTUSAGE:
                if (this.pDesc.pOrders.length !== 1 || !this.hasSemantic("COLOR")) {
                    return false;
                }
                break;
            case VERTEXUSAGEPARAM:
                if (this.hasEmptySemantic() || this.hasMultipleSemantic()) {
                    return false;
                }
                if (this.hasComplexType()) {
                    for (j = 0; j < this.pDesc.pOrders.length; j++) {
                        if (!this.pDesc.pOrders[j].pType.checkMe(VERTEXUSAGEPARAM)) {
                            return false;
                        }
                    }
                }
                break;
            default:
                warning("Unknown usage for check");
                break;
        }
    }
    return true;
};
EffectType.prototype.setMixible = function () {
    if (!this.pDesc || this.isMixible) {
        return;
    }
    this.isMixible = true;
    this.pDesc.setMixible();
};
EffectType.prototype.setVSInput = function () {
    this.isVSInput = true;
};
EffectType.prototype.setFSInput = function () {
    this.isFSInput = true;
};

function EffectStruct() {
    /**
     *
     * @type {EffectVariable[]}
     */
    this.pOrders = null;
    /**
     * Pars VariableName -> EffectVariable
     * @type {Object}
     */
    this.pFields = null;
    /**
     *
     * @type {String}
     */
    this.sName = null;
    /**
     * Pairs Semantic -> EffectVariable
     * @type {Object}
     * @private
     */
    this._pSemantics = null;
    /**
     *
     * @type {Boolean}
     * @private
     */
    this._hasMultipleSemantic = false;
    /**
     *
     * @type {Boolean}
     * @private
     */
    this._hasEmptySemantic = false;
    /**
     *
     * @type {Boolean}
     * @private
     */
    this._hasComplexType = false;
    /**
     *
     * @type {Boolean}
     */
    this.isAnalyzed = false;
    /**
     * Are this struct mixible or not
     * @type {Boolean}
     */
    this.isMixible = false;
}
EffectStruct.prototype.toCode = function () {
    //TODO: to string
};
EffectStruct.prototype.checkMe = function () {
    return true;
};
EffectStruct.prototype.hasField = function (sName) {
    return this.pFields[sName] || false;
};
EffectStruct.prototype.analyzeSemantics = function () {
    if (this.isAnalyzed) {
        return;
    }
    var i;
    var pSemantics = {};
    var pOrders = this.pOrders;
    for (i = 0; i < pOrders.length; i++) {
        if (!pOrders[i].sSemantic) {
            this._hasEmptySemantic = true;
            continue;
        }
        if (!pOrders[i].pType.isBase()) {
            this._hasComplexType = true;
        }
        if (pSemantics[pOrders[i].sSemantic]) {
            this._hasMultipleSemantic = true;
            continue;
        }
        pSemantics[pOrders[i].sSemantic] = pOrders[i];
    }
    this._pSemantics = pSemantics;
    this.isAnalyzed = true;
};
EffectStruct.prototype.hasSemantic = function (sSemantic) {
    if (this._pSemantics) {
        return this._pSemantics[sSemantic];
    }
    var pOrders = this.pOrders;
    var i;
    for (i = 0; i < pOrders.length; i++) {
        if (pOrders[i].sSemantic === sSemantic) {
            return pOrders[i];
        }
    }
    return false;
};
EffectStruct.prototype.hasEmptySemantic = function () {
    if (this._pSemantics) {
        return this._hasEmptySemantic;
    }
    var pOrders = this.pOrders;
    var i;
    for (i = 0; i < pOrders.length; i++) {
        if (!pOrders[i].sSemantic) {
            return true;
        }
    }
    return false;
};
EffectStruct.prototype.hasMultipleSemantic = function () {
    if (this._pSemantics) {
        return this._hasMultipleSemantic;
    }
    var i, j;
    var pOrders = this.pOrders;
    for (i = 0; i < pOrders.length; i++) {
        for (j = i + 1; j < pOrders.length; j++) {
            if (pOrders[j].sSemantic = pOrders[i].sSemantic) {
                return true;
            }
        }
    }
    return false;
};
EffectStruct.prototype.hasComplexType = function () {
    if (this._pSemantics) {
        return this._hasComplexType;
    }
    var pOrders = this.pOrders;
    var i;
    for (i = 0; i < pOrders.length; i++) {
        if (!pOrders[i].pType.isBase()) {
            return true;
        }
    }
    return false;
};
EffectStruct.prototype.setMixible = function () {
    if (this.isMixible) {
        return;
    }
    if (!this.isAnalyzed) {
        this.analyzeSemantics();
    }
    if (this.hasEmptySemantic() || this.hasMultipleSemantic()) {
        error("you are bad man(woman).");
        return;
    }
    var pOrders = this.pOrders;
    var i;
    for (i = 0; i < pOrders.length; i++) {
        pOrders[i].setMixible();
    }
    this.isMixible = true;
};

function EffectPointer(pVar, nDim) {
    this.pVar = pVar || null;
    this.sRealName = null;
    this.nDim = nDim || 0;
}

function EffectBuffer() {
    this.pRealBuffer = null;
    /**
     * Pointer for real code
     * @type {Object}
     */
    this.pSampler = null;
    /**
     * Pointer for real code
     * @type {Object}
     */
    this.pHeader = null;
    this.isUniform = false;
    this.id = EffectBuffer.nCount++;
}
EffectBuffer.nCount = 0;

function EffectVariable() {
    /**
     *
     * @type {VariableType}
     */
    this.pType = null;
    /**
     *
     * @type {String}
     */
    this.sName = null;
    /**
     *
     * @type {String}
     */
    this.sRealName = null;
    /**
     *
     * @type {String}
     */
    this.sSemantic = null;
    /**
     * Pairs: VariableName -> Value
     * @type {Objects}
     */
    this.pAnnotation = null;
    /**
     * Code of init expr
     * @type {Array}
     */
    this.pInitializer = null;
    /**
     * For uniforms
     * @type {Object}
     */
    this.pDefaultValue = null;
    /**
     *
     * @type {Boolean}
     */
    this.isArray = false;
    /**
     *
     * @type {Int}
     */
    this.iLength = 1;
    /**
     *
     * @type {Boolean}
     */
    this.isPointer = false;
    /**
     * Dimensional of pointer
     * @type {Int}
     */
    this.nDim = 0;
    /**
     * What buffer is used
     * @type {Object}
     */
    this.pBuffer = null;
    /**
     * @type {EffectVariable[]}
     */
    this.pPointers = null;
    /**
     * Id of scope where variable has definition
     * @type {Int}
     */
    this.iScope = 0;
    this._isConstInit = null;
    this.pTexture = null;
    this.pStates = null;
    this.isSampler = null;
    this.isParametr = false;
    this.isUniform = false;
    this.isGlobal = false;
    this.isMixible = false;
    this.isVSInput = false;
    this.isFSInput = false;
}
EffectVariable.prototype.isInput = function () {
    if (this.pType.pUsagesName &&
        (this.pType.pUsagesName["in"] === null || this.pType.pUsagesName["inout"] === null)) {
        return true;
    }
    return false;
};
EffectVariable.prototype.isOutput = function () {
    if (this.pType.pUsagesName &&
        (this.pType.pUsagesName["out"] === null || this.pType.pUsagesName["inout"] === null)) {
        return true;
    }
    return false;
};
EffectVariable.prototype.isConst = function () {
    return this.pType.isConst();
};
EffectVariable.prototype.isConstInit = function () {
    if (!this.pInitializer) {
        this._isConstInit = null;
        return null;
    }
    if (this._isConstInit !== null) {
        return this._isConstInit;
    }
    var i;
    for (i = 0; i < this.pInitializer.length; i++) {
        if (typeof(this.pInitializer[i]) === "object" && !this.pInitializer[i].isConst()) {
            this._isConstInit = false;
            return false;
        }
    }
    this._isConstInit = true;
    return true;
};
EffectVariable.prototype.setType = function (pType) {
    this.pType = pType;
    if (pType.pUsagesName) {
        this.isUniform = (pType.pUsagesName["uniform"] === null) ? true : false;
        this.isGlobal = (pType.pUsagesName["global"] === null) ? true : false;
    }
};
EffectVariable.prototype.addAnnotation = function (pAnnotation) {
    this.pAnnotation = pAnnotation;
};
EffectVariable.prototype.addSemantic = function (sSemantic) {
    this.sSemantic = sSemantic;
};
EffectVariable.prototype.addInitializer = function (pInit) {
    this.pInitializer = pInit;
};
EffectVariable.prototype.toCode = function () {
    //TODO: to string
};
EffectVariable.prototype.checkMe = function () {
    //TODO: many and many tests for varaibles
    return true;
};
EffectVariable.prototype.cloneMe = function () {
    var pVar = new EffectVariable();
    pVar.pType = this.pType.cloneMe();
    pVar.sName = this.sName;
    pVar.sRealName = this.sRealName;
    pVar.sSemantic = this.sSemantic;
    pVar.isArray = this.isArray;
    pVar.iLength = this.iLength;
    pVar.isPointer = this.isPointer;
    pVar.nDim = this.nDim;
    return pVar;
};
EffectVariable.prototype.setTexture = function (pTex) {
    this.pTexture = pTex;
    this.isSampler = true;
};
EffectVariable.prototype.setState = function (eState, eValue) {
    if (!this.pStates) {
        this.pStates = {};
        this.isSampler = true;
    }
    if (this.pStates[eState]) {
        error("Bad 197");
        return;
    }
    this.pStates[eState] = eValue;
};
EffectVariable.prototype.setMixible = function () {
    if (this.isUniform || this.isMixible) {
        return;
    }
    this.isMixible = true;
    this.pType.setMixible();
};
EffectVariable.prototype.setVSInput = function () {
    this.isVSInput = true;
    this.pType.setVSInput();
};
EffectVariable.prototype.setFSInput = function () {
    this.isFSInput = true;
    this.pType.setFSInput();
};

function EffectBaseFunction() {
    var pFunction;
    if (arguments.length === 1) {
        pFunction = arguments[0];
    }
    /**
     *
     * @type {String}
     */
    this.sName = null;
    this.sRealName = null;
    this.pFunction = pFunction || null;
    this.sSementic = pFunction ? pFunction.sSemantic : null;
    this.pReturnType = pFunction ? pFunction.pReturnType : null;
    this.pGlobalVariables = pFunction ? pFunction.pGlobalVariables : null;
    this.pUniforms = pFunction ? pFunction.pUniforms : null;
    this.pMainInputVar = pFunction ? pFunction.pMainInputVar : null;
    /**
     * Code of function
     * @type {Object[]}
     */
    this.pImplement = null;
    this.iScope = 0;
    /**
     * Global variables used in function
     * Pairs: FunctionHash -> EffectFunction
     * @type {Object}
     */
    this.pFunctions = null;
}
EffectBaseFunction.prototype.addGlobalVariable = function (pVar) {
    if (!this.pGlobalVariables) {
        this.pGlobalVariables = {};
    }
    if (this.pUniforms && this.pUniforms[pVar.sName]) {
        delete this.pUniforms[pVar.sName];
    }
    this.pGlobalVariables[pVar.sName] = pVar;
};
EffectBaseFunction.prototype.addUniform = function (pVar) {
    if (!this.pUniforms) {
        this.pUniforms = {};
    }
    if (this.pGlobalVariables && this.pGlobalVariables[pVar.sName]) {
        return;
    }
    this.pUniforms[pVar.sName] = pVar;
};
EffectBaseFunction.prototype.addFunction = function (pFunc) {
    if (!this.pFunctions) {
        this.pFunctions = {};
    }
    this.pFunctions[pFunc.sHash] = pFunc;
};
EffectBaseFunction.prototype.hasImplementation = function () {
    return this.pImplement ? true : false;
};
EffectBaseFunction.prototype.setName = function (sName) {
    this.sName = sName;
};
EffectBaseFunction.prototype.addSemantic = function (sSemantic) {
    this.sSementic = sSemantic;
    this.pReturnType.sSemantic = sSemantic;
};
EffectBaseFunction.prototype.setImplement = function (pImplement) {
    this.pImplement = pImplement;
};

function EffectFunction(sName, pGLSLExpr, pTypes) {
    A_CLASS;
    this.sName = sName || null;
    /**
     * For builtin fucntions
     * @type {GLSLExpr}
     */
    this.pGLSLExpr = pGLSLExpr || null;
    /**
     * Pairs: ParamName -> EffectVariable
     * @type {Object}
     */
    this.pParameters = null;
    /**
     * Minimum number of parameters
     * @type {Int}
     */
    this.nParamsNeeded = 0;
    /**
     * @type {EffectVariable[]}
     */
    this.pParamOrders = null;
    /**
     * Hash code for function(for fast search)
     * @type {String}
     */
    this.sHash = null;
    //restrictions for function
    /**
     * may use like constant expression
     * @type {Boolean}
     */
    this.isConstant = true;
    /**
     * may use only in fragment shader
     * @type {Boolean}
     */
    this.isOnlyFragment = false;
    /**
     * may use only in vertex shader
     * @type {Boolean}
     */
    this.isOnlyVertex = false;
    /**
     * may use only if in program there are buffer
     * @type {Boolean}
     */
    this.isBufferNeed = false;
    /**
     * may be used like fragment shader(there is in pass decl)
     * @type {Boolean}
     */
    this.isFragmentShader = false;
    /**
     * may use like vertex shader(there is in pass decl)
     * @type {Boolean}
     */
    this.isVertexShader = false;
    /**
     *
     * @type {EffectVertex}
     */
    this.pShader = null;
    /**
     * Pairs: Name of variable -> fields of struct
     * @type {Object}
     */
    this.pStructTable = null;
    /**
     * System function or not
     * @type {Boolean}
     */
    this.isSystem = pGLSLExpr ? true : false;
    /**
     * Types of parameters
     * @type {EffectType[]}
     */
    this.pTypes = pTypes || null;
}
EXTENDS(EffectFunction, EffectBaseFunction);
EffectFunction.prototype.isConst = function () {
    return this.isConstant;
};
EffectFunction.prototype.calcHash = function () {
    var sHash = "";
    sHash += this.sName;
    var i;
    if (!this.pTypes) {
        for (i = 0; this.pParamOrders ? i < this.pParamOrders.length : false; i++) {
            sHash += "!" + this.pParamOrders[i].pType.toStr();
        }
    }
    else {
        for (i = 0; i < this.pTypes.length; i++) {
            sHash += "!" + this.pTypes[i].sName;
        }
    }
    sHash += "-->" + this.pReturnType.toStr();
    return sHash;
};
EffectFunction.prototype.hash = function () {
    if (!this.sHash) {
        this.sHash = this.calcHash();
    }
    return this.sHash;
};
EffectFunction.prototype.addParameter = function (pVar) {
    if (!this.pParameters) {
        this.pParameters = {};
    }
    if (!this.pParamOrders) {
        this.pParamOrders = [];
    }
    if (this.pParameters[pVar.sName]) {
        error("So so bad. try to this parametr");
        return;
    }
    this.pParamOrders.push(pVar);
    this.pParameters[pVar.sName] = pVar;
    pVar.isParametr = true;
    if (pVar.isUniform) {
        pVar.isUniform = true;
        this.addUniform(pVar);
    }
    if (!pVar.pInitializer) {
        this.nParamsNeeded = this.pParamOrders.length;
    }
};
EffectFunction.prototype.checkMe = function () {
    var i, j, k;
    var pType;
    var pVar;
    var pSemantics;
    var isOne = false;
    for (i = 0; i < arguments.length; i++) {
        switch (arguments[i]) {
            case VERTEXUSAGE:
                if (!this.pReturnType.checkMe(VERTEXUSAGE)) {
                    return false;
                }
                pSemantics = {};
                for (j = 0; j < this.pParamOrders.length; j++) {
                    pVar = this.pParamOrders[j];
                    pType = pVar.pType;
                    if (pType.pUsagesName && pType.pUsagesName["uniform"] === null) {
                        continue;
                    }
                    if (isOne === true) {
                        return false;
                    }
                    if (isOne === undefined) {
                        if (pVar.sSemantic === null) {
                            isOne = true;
                        }
                        else {
                            isOne = false;
                        }
                    }
                    if (pType.isBase()) {
                        isOne = false;
                        if (pVar.sSemantic === null) {
                            return false;
                        }
                        if (pSemantics[pVar.sSemantic] === null) {
                            return false;
                        }
                        pSemantics[pVar.sSemantic] = null;
                        continue;
                    }
                    if (!pType.checkMe(VERTEXUSAGEPARAM)) {
                        return false;
                    }
                    for (k = 0; k < pType.pEffectType.pDesc.pOrders.length; k++) {
                        pVar = pType.pEffectType.pDesc.pOrders[k];
                        if (pSemantics[pVar.sSemantic] === null) {
                            return false;
                        }
                        pSemantics[pVar.sSemantic] = null;
                    }
                }
                break;
            case FRAGMENTUSAGE:
                if (this.pReturnType.checkMe(FRAGMENTUSAGE)) {
                    return true;
                }
                break;
            default:
                warning("Unknown usage for check");
                return true;
        }
    }
    return true;
};

function EffectVertex(pFunction) {
    A_CLASS;
    /**
     *
     * @type {EffectVariable[]}
     * @private
     */
    this._pVaryings = [];
    /**
     * Pairs: Semantic -> EffectVariable
     * @type {Object}
     * @private
     */
    this._pVaryingsSemantics = {};
    /**
     * @type {Array}
     * @private
     */
    this._pAttributes = [];
    this._pAttrSemantics = {};
    /**
     *
     * @type {EffectVariable}
     */
    this.pReturnVariable = null;
    this.pTwin = null;
    this.isLocalOut = false;
}
EXTENDS(EffectVertex, EffectBaseFunction);
EffectVertex.prototype.addVarying = function (pVar) {
    if (this._pVaryingsSemantics[pVar.sSemantic]) {
        error("don`t do so bad things");
    }
    var pNewVar = pVar.cloneMe();
    this._pVaryingsSemantics[pNewVar.sSemantic] = pNewVar;
    this._pVaryings.push(pNewVar);
};
EffectVertex.prototype.createReturnVar = function (pType) {
    this.pReturnVariable = new EffectVariable();
    this.pReturnVariable.sName = SHADEROUT;
    this.pReturnVariable.pType = pType.cloneMe();
};
EffectVertex.prototype.addAttribute = function (pVar) {
    var pAttr;
    if (!pVar.isVSInput) {
        pAttr = pVar.cloneMe();
        pAttr.sName = pAttr.sSemantic;
        this._pAttributes.push(pAttr);
        this._pAttrSemantics[pAttr.sSemantic] = pAttr;
        return;
    }
    var i;
    var pVars = pVar.pType.pEffectType.pDesc.pOrders;
    for (i = 0; i < pVars.length; i++) {
        pAttr = pVars[i].cloneMe();
        pAttr.sName = pAttr.sSemantic;
        this._pAttributes.push(pAttr);
        this._pAttrSemantics[pAttr.sSemantic] = pAttr;
    }
};
EffectVertex.prototype.createTwinIn = function () {
    if (!this.pMainInputVar) {
        error("Twin available only for Vertex Shader with Struct Attrib");
        return;
    }
    this.pTwin = this.pMainInputVar.cloneMe();
    this.pTwin.sName = this.pTwin.sName + "_clone";
};

function EffectFragment(pFunction) {
    A_CLASS;
    /**
     * @type {Object[]}
     * @private
     */
    this._pCode = [];
    /**
     *
     * @type {EffectVariable[]}
     * @private
     */
    this._pVaryings = [];
    /**
     * Pairs: Semantic -> EffectVariable
     * @type {Object}
     * @private
     */
    this._pVaryingsSemantics = {};
    /**
     *
     * @type {EffectVariable}
     */
    this.pReturnVariable = null;
    this.pTwin = null;
    this.isLocalOut = false;
}
EXTENDS(EffectFragment, EffectBaseFunction);
EffectFragment.prototype.createTwinIn = function () {
    if (!this.pMainInputVar) {
        error("Twin available only for Vertex Shader with Struct Attrib");
        return;
    }
    this.pTwin = this.pMainInputVar.cloneMe();
    this.pTwin.sName = this.pTwin.sName + "_clone";
};
EffectFragment.prototype.addVarying = function (pVar) {
    var pVary;
    if (!pVar.isFSInput) {
        pVary = pVar.cloneMe();
        pVary.sName = pVary.sSemantic;
        this._pVaryings.push(pVary);
        this._pVaryingsSemantics[pVary.sSemantic] = pVary;
        return;
    }
    var i;
    var pVars = pVar.pType.pEffectType.pDesc.pOrders;
    for (i = 0; i < pVars.length; i++) {
        pVary = pVars[i].cloneMe();
        pVary.sName = pVary.sSemantic;
        this._pVaryings.push(pVary);
        this._pVaryingsSemantics[pVary.sSemantic] = pVary;
    }
};

function EffectTechnique() {
    /**
     *
     * @type {EffectPasse[]}
     */
    this.pPasses = [];
    /**
     * Pairs: PassName -> EffectPass
     * @type {Object}
     */
    this.pPassesNames = {};
    /**
     * Is technique is posteffect or effect
     * @type {Boolean}
     */
    this.isPostEffect = false;
    /**
     * Annotations for technique
     * @type {Object}
     */
    this.pAnnotation = null;
    /**
     * @type {String}
     */
    this.sName = "";
    /**
     *
     * @type {String}
     */
    this.sRealName = "";
}
EffectTechnique.prototype.addPass = function (pPass) {
    this.pPasses.push(pPass);
    if (this.pPassesNames[pPass.sName]) {
        warning("You tru add pass with the same name. It sounds not good(");
    }
    this.pPassesNames[pPass.sName] = pPass;
};
EffectTechnique.prototype.setName = function (sName) {
    this.sName = sName;
};
EffectTechnique.prototype.addSemantic = function (sSemantic) {
    sSemantic = sSemantic.toUpperCase();
    if (sSemantic === "POSTEFFECT") {
        this.isPostEffect = true;
    }
    else if (sSemantic === "EFFECT") {
        this.isPostEffect = false;
    }
    else {
        error("bad 301");
        return;
    }
};
EffectTechnique.prototype.addAnnotation = function (pAnnotation) {
    this.pAnnotation = pAnnotation;
};

function EffectPass() {
    /**
     *
     * @type {String}
     */
    this.sVertex = "";
    /**
     *
     * @type {String}
     */
    this.sFragment = "";
    /**
     * Pairse: eState -> StateValue
     * @type {Object}
     */
    this.pStates = {};
    /**
     * @type {EffectVertex}
     */
    this.pVertexFunc = null;
    /**
     *
     * @type {EffectFragment}
     */
    this.pFragmentFunc = null;
    /**
     *
     * @type {String}
     */
    this.sName = "";
    /**
     *
     * @type {String}
     */
    this.sRealName = "";
    this.pAnnotation = null;
    this.sJSCode = "";
    this.pJSStates = null;
    this.pGlobalVariables = null;
    this.isComplex = false;
    this.pGlobalValues = null;
    this.pFuncHash = null;
    this.pCode = [];
}
EffectPass.prototype.setVertexShader = function (pParam) {
    if (typeof(pParam) === "string") {
        this.sVertexName = pParam;
    }
    else {
        this.pVertexFunc = pParam;
    }
};
EffectPass.prototype.setFragmentShader = function (pParam) {
    if (typeof(pParam) === "string") {
        this.sFragmentName = pParam;
    }
    else {
        this.pFragmentFunc = pParam;
    }
};
EffectPass.prototype.setJSVertexShader = function (pFunc) {
    if (!this.pFuncHash) {
        this.pFuncHash = {};
    }
    this.pFuncHash[pFunc.hash()] = pFunc;
    this.pushCode("this.sVertex=\"" + pFunc.hash() + "\";");
};
EffectPass.prototype.setJSFragmentShader = function (pFunc) {
    if (!this.pFuncHash) {
        this.pFuncHash = {};
    }
    this.pFuncHash[pFunc.hash()] = pFunc;
    this.pushCode("this.sFragment=\"" + pFunc.hash() + "\";");
};
EffectPass.prototype.addGlobalVariable = function (pVar) {
    if (!this.pGlobalVariables) {
        this.pGlobalVariables = {};
    }
    this.pGlobalVariables[pVar.sName] = pVar;
};
EffectPass.prototype.finalize = function () {
    if (this.sJSCode !== "") {
        this.pCode.push(this.sJSCode);
    }
    if (!this.isComplex) {
        this.prepare();
        return;
    }
    this.sJSCode = "";
};
EffectPass.prototype.prepare = function () {
    'use strict'
    this.pStates = {};
    this.sFragment = null;
    this.sVertex = null;
    eval(this.sJSCode);
    if (this.sVertex !== null) {
        this.pVertexFunc = this.pFuncHash[this.sVertex];
    }
    else {
        this.pVertexFunc = null;
    }
    if (this.sFragment !== null) {
        this.pFragmentFunc = this.pFuncHash[this.sFragment];
    }
    else {
        this.pFragmentFunc = null;
    }

};
EffectPass.prototype.setState = function (eState, eValue) {
    this.pStates[eState] = eValue;
};
EffectPass.prototype.setJSState = function (eState, eValue) {
    this.pushCode("this.pStates[" + eState + "]=" + eValue + ";");
};
EffectPass.prototype.addAnnotation = function (pAnnotation) {
    this.pAnnotation = pAnnotation;
};
EffectPass.prototype.setName = function (sName) {
    this.sName = sName;
};
EffectPass.prototype.checkMe = function () {
//    if (!(this.pFragmentFunc && this.pVertexFunc)) {
//        return false;
//    }
//    if (this.pFragmentFunc.pParamOrders.length !== 1) {
//        return false;
//    }
//    if (!this.pFragmentFunc.pParamOrders[0].pType.isEqual(this.pVertexFunc.pReturnType)) {
//        return false;
//    }
    //TODO: some not trivial checks
    return true;
};
EffectPass.prototype.pushCode = function (pCodePart) {
    if (typeof(pCodePart) === "string") {
        this.sJSCode += pCodePart;
        return;
    }
    if (this.sJSCode !== "") {
        this.pCode.push(this.sJSCode);
        this.sJSCode = "";
    }
    this.pCode.push(pCodePart);
};

/**
 * Block of code
 * @constructor
 */
function EffectBlock(eType) {
    Enum([
             DEFAULT = 1,
             MEMREAD = 2
         ], EFFECTBLOCK, a.Effect.Code);
    this.eType = eType || a.Effect.Code.DEFAULT;
    this._pCode = null;
    this._pVar = null;
}
EffectBlock.prototype.toCode = function () {
    return this._pCode;
};

function Effect() {
    Enum([
             DEFAULT = 0,
             NOTTRANSLATE,
             PARAMSTART,
             PARAM,
             UNNAME
         ], PARSINGPROPERTY, a.Effect.Var);
    Enum([
             DEFAULT = 0,
             FUNCTION,
             VERTEX,
             FRAGMENT
         ], ANALYZEDPROPERTY, a.Effect.Func);

    this.pParams = {};
    this.pTechiques = {};
    this.pFuctions = {};
    this.pPasses = {};
    this.nStep = 0;

    this.pVariables = {};
    this.pAnnotations = [];
    this._effectJS = {};
    this._effectJS_Constants = {};
    this._pConstants = {};

    this._isFuncParam = false;
    this._isLocal = false;

    this._pParseTree = null;

    this._pCurrentType = null;

    this._pTypeTable = {};
    this._pVariables = {};
    this._pCurrentAnnotation = null;
    this._pCurrentStructFields = null;
    this._pCurrentStructOrders = null;

    this._pCurrentVar = null;
    this._isCodeWrite = false;
    this._pCodeStack = [];
    this._pCode = null;
    this._sCode = "";

    this._iScope = 0;
    this._nScope = 0;
    this._pScopeStack = [];
    this._ppScopes = {};
    this._pCurrentScope = null;

    this._isAnnotation = false;
    this._isStruct = false;
    this._isFunction = false;
    this._isToJS = false;

    this._pFunctionTableByHash = {};
    this._pFunctionTableByName = {};
    this._pFunctionBlackList = {};
    this._pShaders = {};

    this.nCurrentDecl = 0;

    this._isVertex = false;
    this._isFragment = false;

    this._isSampler = false;

    this._pCurrentFunction = null;
    this._sVarName = null;
    this._sLastFullName = null;
    this._pVarNameStack = null;
    this._isNewName = false;
    this._isNewComplexName = false;
    this._isTypeAnalayzed = false;
    this._pExprType = null;

    this._nAddr = 0;

    this._isStrictMode = false;
    this._isWriteVar = false;
    this._pCurrentPass = null;
    this._pVarPropertyStack = null;

    /**
     * Arrays of variables that need to reRead from memory after stmt.
     * @type {Array}
     * @private
     */
    this._pMemReadVars = null;
    /**
     * Some parsing property of current analyzed variable
     * 0 - Don`t unname, and full translate
     * 1 - Don`t translate
     * 2 - Translate as attribute
     * 3 - full unname
     * @type {Number}
     * @private
     */
    this._eVarProperty = a.Effect.Var.DEFAULT;
    this._eFuncProperty = a.Effect.Var.DEFAULT;
    this._pLastVar = null;

    STATIC(pBaseFunctionsHash, {});
    STATIC(pBaseFunctionsName, {});
    STATIC(pBaseTypes, {
        "void"         : new EffectType("void", "void", true, 1),
        "float"        : new EffectType("float", "float", true, 1),
        "int"          : new EffectType("int", "int", true, 1),
        "bool"         : new EffectType("bool", "bool", true, 1),
        "float2"       : new EffectType("float2", "vec2", true, 2),
        "float3"       : new EffectType("float3", "vec3", true, 3),
        "float4"       : new EffectType("float4", "vec4", true, 4),
        "float2x2"     : new EffectType("float2x2", "mat2", true, 4),
        "float3x3"     : new EffectType("float3x3", "mat3", true, 9),
        "float4x4"     : new EffectType("float4x4", "mat4", true, 16),
        "string"       : new EffectType("string", "string", true, 1),
        "texture"      : new EffectType("texture", "texture", true, 1),
        "sampler"      : new EffectType("sampler", "sampler", true, 1),
        "ptr"          : new EffectType("ptr", "float", true, 1),
        "video_buffer" : new EffectType("video_buffer", "video_buffer", true, 1)
    });
    STATIC(pVectorSuffix, {
        "x"    : null,
        "y"    : null,
        "z"    : null,
        "w"    : null,
        "xy"   : null,
        "xz"   : null,
        "xw"   : null,
        "yx"   : null,
        "yz"   : null,
        "yw"   : null,
        "zx"   : null,
        "zy"   : null,
        "zw"   : null,
        "wx"   : null,
        "wy"   : null,
        "wz"   : null,
        "xyz"  : null,
        "xyw"  : null,
        "xzy"  : null,
        "xzw"  : null,
        "xwy"  : null,
        "xwz"  : null,
        "yxz"  : null,
        "yxw"  : null,
        "yzx"  : null,
        "yzw"  : null,
        "ywx"  : null,
        "ywz"  : null,
        "zxy"  : null,
        "zxw"  : null,
        "zyx"  : null,
        "zyw"  : null,
        "zwx"  : null,
        "zwy"  : null,
        "wxy"  : null,
        "wxz"  : null,
        "wyx"  : null,
        "wyz"  : null,
        "wzx"  : null,
        "wzy"  : null,
        "xyzw" : null,
        "xywz" : null,
        "xzyw" : null,
        "xzwy" : null,
        "xwyz" : null,
        "xwzy" : null,
        "yxzw" : null,
        "yxwz" : null,
        "yzxw" : null,
        "yzwx" : null,
        "ywxz" : null,
        "ywzx" : null,
        "zxyw" : null,
        "zxwy" : null,
        "zyxw" : null,
        "zywx" : null,
        "zwxy" : null,
        "zwyx" : null,
        "wxyz" : null,
        "wxzy" : null,
        "wyxz" : null,
        "wyzx" : null,
        "wzxy" : null,
        "wzyx" : null,
        "s"    : null,
        "t"    : null,
        "st"   : null,
        "ts"   : null,
        "p"    : null,
        "q"    : null,
        "pq"   : null,
        "qp"   : null,
        "r"    : null,
        "g"    : null,
        "b"    : null,
        "a"    : null,
        "rg"   : null,
        "rb"   : null,
        "ra"   : null,
        "gr"   : null,
        "gb"   : null,
        "ga"   : null,
        "br"   : null,
        "bg"   : null,
        "ba"   : null,
        "ar"   : null,
        "ag"   : null,
        "ab"   : null,
        "rgb"  : null,
        "rga"  : null,
        "rbg"  : null,
        "rba"  : null,
        "rag"  : null,
        "rab"  : null,
        "grb"  : null,
        "gra"  : null,
        "gbr"  : null,
        "gba"  : null,
        "gar"  : null,
        "gab"  : null,
        "brg"  : null,
        "bra"  : null,
        "bgr"  : null,
        "bga"  : null,
        "bar"  : null,
        "bag"  : null,
        "arg"  : null,
        "arb"  : null,
        "agr"  : null,
        "agb"  : null,
        "abr"  : null,
        "abg"  : null,
        "rgba" : null,
        "rgab" : null,
        "rbga" : null,
        "rbag" : null,
        "ragb" : null,
        "rabg" : null,
        "grba" : null,
        "grab" : null,
        "gbra" : null,
        "gbar" : null,
        "garb" : null,
        "gabr" : null,
        "brga" : null,
        "brag" : null,
        "bgra" : null,
        "bgar" : null,
        "barg" : null,
        "bagr" : null,
        "argb" : null,
        "arbg" : null,
        "agrb" : null,
        "agbr" : null,
        "abrg" : null,
        "abgr" : null
    });
    this._addSystemFunction("dot", "float", [null, null], ["float", "float2", "float3", "float4"], "dot($1,$2)");
    this._addSystemFunction("mul", null, [null, null], ["float", "int", "float2", "float3", "float4"], "$1*$2");
    this._addSystemFunction("tex2D", "float4", ["sampler", "float2"], null, "texture2D($1,$2)");
}
/**
 * Add system function
 * @tparam {String} sName
 * @tparam {EffectType} pReturn
 * @tparam {Array[EffectType]} pParams
 * @private
 */
Effect.prototype._addSystemFunction = function (sName, pReturn, pParamsType, pTemplate, pGLSL) {
    var pGLSLExpr = typeof(pGLSL) === "string" ? new GLSLExpr(pGLSL) : pGLSL;
    if (!this.constructor.pBaseFunctionsName[sName]) {
        this.constructor.pBaseFunctionsName[sName] = [];
    }
    var i, j;
    var pFunc;
    var pTypes;
    var sHash;
    if (pTemplate) {
        for (i = 0; i < pTemplate.length; i++) {
            pTypes = [];
            for (j = 0; j < pParamsType.length; j++) {
                if (pParamsType[j] === null) {
                    pTypes.push(this.constructor.pBaseTypes[pTemplate[i]]);
                }
                else {
                    pTypes.push(this.constructor.pBaseTypes[pParamsType[j]]);
                }
            }
            pFunc = new EffectFunction(sName, pGLSLExpr, pTypes);
            pFunc.pReturnType = pReturn ? this.constructor.pBaseTypes[pReturn] : this.constructor.pBaseTypes[pTemplate[i]];
            sHash = pFunc.calcHash();
            if (this.constructor.pBaseFunctionsHash[sHash]) {
                error("bad 193");
                return;
            }
            this.constructor.pBaseFunctionsHash[sHash] = pFunc;
            this.constructor.pBaseFunctionsName[sName].push(pFunc);
        }
        return;
    }
    if (!pReturn) {
        error("bad 194");
        return;
    }
    pTypes = [];
    for (j = 0; j < pParamsType.length; j++) {
        if (pParamsType[j] === null) {
            error("bad 195");
            return;
        }
        else {
            pTypes.push(this.constructor.pBaseTypes[pParamsType[j]]);
        }
    }
    pFunc = new EffectFunction(sName, pGLSLExpr, pTypes);
    pFunc.pReturnType = this.constructor.pBaseTypes[pReturn];
    sHash = pFunc.calcHash();
    if (this.constructor.pBaseFunctionsHash[sHash]) {
        error("bad 196");
        return;
    }
    this.constructor.pBaseFunctionsHash[sHash] = pFunc;
    this.constructor.pBaseFunctionsName[sName].push(pFunc);
    return;
};
/**
 * Very important function. Calculate some hlsl code.
 * Work only with const and literal objects.
 * @tparam Array pVal List of some hlsl instructions.
 */
Effect.prototype.evalHLSL = function (pCode) {
//    if(this._isToJS){
//        //TODO:Translate to JS some const hlsl expressions
//    }
//    if(this._isCodeWrite){
//
//    }
    if (!pCode) {
        return null;
    }
    if (pCode.length === 1) {
        if (typeof(pCode[0]) === "string") {
            return pCode[0];
        }
    }
    console.log("Need to eval this code: ", pCode);
};

Effect.prototype.newCode = function (isShader) {
    this._isCodeWrite = true;
    this._pCode = [];
    this._pCodeShader = (isShader || this._pCodeShader) ? [] : null;
    this._pCodeStack.push([this._pCode, this._pCodeShader]);
};
Effect.prototype.endCode = function () {
    this._pCodeStack.pop();
    var iLen = this._pCodeStack.length - 1;
    if (iLen < 0) {
        this._isCodeWrite = false;
        this._pCode = null;
        this._pCodeShader = null;
        return;
    }
    this._pCode = this._pCodeStack[iLen][0] || null;
    this._pCodeShader = this._pCodeStack[iLen][1] || null;
};
Effect.prototype.pushCode = function (pObj) {
    if (!this._isCodeWrite) {
        warning("Pause???");
        return;
    }
    if (this._pCode) {
        this._pCode.push(pObj);
    }
    else {
        warning("Do you really want it?");
    }
};
Effect.prototype.newMemRead = function () {
    this._pMemReadVars = [];
};
Effect.prototype.endMemRead = function () {
    this._pMemReadVars = null;
};
Effect.prototype.newSampler = function () {
    this._isSampler = true;
};
Effect.prototype.endSampler = function () {
    this._isSampler = false;
};
Effect.prototype.newVarName = function () {
    this._isNewName = true;
    if (!this._pVarNameStack) {
        this._pVarNameStack = [];
    }
    if (!this._pVarPropertyStack) {
        this._pVarPropertyStack = [];
    }
    this._pVarNameStack.push(this._sVarName);
    this._pVarPropertyStack.push(this._eVarProperty);
    this._sVarName = "";
    this._eVarProperty = 0;
};
Effect.prototype.endVarName = function () {
    this._isNewName = false;
    this._sLastFullName = this._sVarName;
    this._sVarName = this._pVarNameStack.pop();
    this._eVarProperty = this._pVarPropertyStack.pop() || a.Effect.Var.DEFAULT;
};
Effect.prototype.newAddr = function () {
    this._nAddr = 0;
};
Effect.prototype.endAddr = function () {
    this._nAddr = 0;
};
Effect.prototype.newScope = function () {
    this._pScopeStack.push(this._nScope);
    this._iScope = this._nScope;
    this._nScope++;
    this._pCurrentScope = null;
};
Effect.prototype.endScope = function () {
    if (this._pCurrentScope && this._pCurrentScope.isStrict) {
        this._isStrictMode = false;
    }
    this._pScopeStack.pop();
    this._iScope = this._pScopeStack[this._pScopeStack.length - 1];
    if (this._iScope === undefined) {
        this._iScope = -1;
    }
    this._pCurrentScope = this._ppScopes[this._iScope] || null;
};
Effect.prototype.newAnnotation = function () {
    this._isAnnotation = true;
    this._pCurrentAnnotation = {};
};
Effect.prototype.endAnnotation = function () {
    this._isAnnotation = false;
    this._pCurrentAnnotation = null;
};
Effect.prototype.newStruct = function () {
    this._isStruct = true;
    this._pCurrentStructFields = {};
    this._pCurrentStructOrders = [];
};
Effect.prototype.endStruct = function () {
    this._isStruct = false;
    this._pCurrentStructFields = null;
    this._pCurrentStructOrders = null;
};
Effect.prototype.newFunction = function () {
    this._isFunction = true;
};
Effect.prototype.endFunction = function () {
    this._isFunction = false;
    this._isVertex = false;
    this._isFragment = false;
};

Effect.prototype.addVariable = function (pVar, isParams) {
    isParams = isParams || false;
    function fnExtractStruct(sName, pStruct, pTable, iDepth, me) {
        var pOrders = pStruct.pOrders;
        var sNewName;
        var pPointers;
        var pBuffer;
        var isPointer;

        for (var i = 0; i < pOrders.length; i++) {
            sNewName = sName + "." + pOrders[i].sName;
            pBuffer = null;
            pPointers = null;
            isPointer = false;
            if (pOrders[i].isPointer) {
                pPointers = [];
                for (var j = 0; j < pOrders[i].nDim; j++) {
                    pPointers.push(new EffectPointer(pVar, j));
                }
                if (isParams) {
                    pBuffer = new EffectBuffer();
                }
                isPointer = true;
            }
            else {
                if (!me._isStrictMode && isParams && iDepth === 0) {
                    isPointer = undefined;
                    pPointers = [];
                    pPointers.push(new EffectPointer(pVar, 0));
                    pBuffer = new EffectBuffer();
                }
            }

            if (pTable[sNewName]) {
                error("good bad and ugly)");
                return;
            }
            pTable[sNewName] = {
                "pPointers" : pPointers,
                "iScope"    : me._iScope,
                "isPointer" : isPointer,
                "pBuffer"   : pBuffer,
                "pType"     : pOrders[i].pType,
                "isArray"   : pOrders[i].isArray,
                "sName"     : pOrders[i].isMixible ? pOrders[i].sSemantic : pOrders[i].sName
            };
            if (!pOrders[i].pType.isBase()) {
                iDepth++;
                fnExtractStruct(sNewName, pOrders[i].pType.pEffectType.pDesc, pTable, iDepth, me);
            }
        }
    }

    if (this._hasVariableDecl(pVar.sName)) {
        error("Ohhh! You try to redeclarate varibale!");
        return;
    }
    if (!this._pCurrentScope) {
        this._pCurrentScope = {};
        this._ppScopes[this._iScope] = this._pCurrentScope;
    }
    if (!this._pCurrentScope.pVariableTable) {
        this._pCurrentScope.pVariableTable = {};
    }
    this._pCurrentScope.pVariableTable[pVar.sName] = pVar;
    pVar.iScope = this._iScope;
    if (isParams) {
        pVar.isParametr = true;
    }
    if (pVar.pType.isEqual(this.hasType("video_buffer"))) {
        if (this._iScope !== GLOBAL && !(isParams && pVar.isUniform)) {
            error("You can not declarate video buffer here");
            return;
        }
        pVar.pBuffer = new EffectBuffer();
        pVar.pBuffer.isUniform = true;
        this.addBuffer(pVar);
    }
    if (pVar.isPointer) {
        pVar.pPointers = [];
        for (var i = 0; i < pVar.nDim; i++) {
            pVar.pPointers.push(new EffectPointer(pVar, i));
        }
    }
    if (!pVar.pType.isBase()) {
        if (!this._pCurrentScope.pStructTable) {
            this._pCurrentScope.pStructTable = {};
        }
        fnExtractStruct(pVar.sName, pVar.pType.pEffectType.pDesc, this._pCurrentScope.pStructTable, 0, this);
    }
};
Effect.prototype.addBuffer = function (pVar) {
    //TODO: may be
    warning("addBuffer ---> May be I should not be here");
};
Effect.prototype.hasVariable = function (sName) {
    var ppScopes = this._ppScopes;
    var pScopeStack = this._pScopeStack;
    var i;
    for (i = pScopeStack.length - 1; i >= 0; i--) {
        if (ppScopes[pScopeStack[i]] && ppScopes[pScopeStack[i]].pVariableTable &&
            ppScopes[pScopeStack[i]].pVariableTable[sName]) {
            return ppScopes[pScopeStack[i]].pVariableTable[sName];
        }
    }
    return false;
};
Effect.prototype.hasComplexVariable = function (sName) {
    var ppScopes = this._ppScopes;
    var pScopeStack = this._pScopeStack;
    var i;
    for (i = pScopeStack.length - 1; i >= 0; i--) {
        if (ppScopes[pScopeStack[i]] && ppScopes[pScopeStack[i]].pStructTable &&
            ppScopes[pScopeStack[i]].pStructTable[sName]) {
            return ppScopes[pScopeStack[i]].pStructTable[sName];
        }
    }
    return false;
};
Effect.prototype._hasVariableDecl = function (sName) {
    var pScope = this._pCurrentScope;
    if (pScope && pScope.pVariableTable && pScope.pVariableTable[sName]) {
        return pScope.pVariableTable[sName];
    }
    return false;
};
Effect.prototype.addType = function (pType) {
    if (!this._pCurrentScope) {
        this._pCurrentScope = {};
        this._ppScopes[this._iScope] = this._pCurrentScope;
    }
    if (!this._pCurrentScope.pTypeTable) {
        this._pCurrentScope.pTypeTable = {};
    }
    if (this._hasTypeDecl(pType.sName)) {
        error("Ohhh! You try to redifenition type((!");
        return;
    }
    this._pCurrentScope.pTypeTable[pType.sName] = pType;
};
Effect.prototype.hasType = function (sTypeName) {
    var pType = this.isBaseType(sTypeName);
    if (pType) {
        return pType;
    }
    var ppScopes = this._ppScopes;
    var pScopeStack = this._pScopeStack;
    var i;
    for (i = pScopeStack.length - 1; i >= 0; i--) {
        if (ppScopes[pScopeStack[i]] && ppScopes[pScopeStack[i]].pTypeTable &&
            ppScopes[pScopeStack[i]].pTypeTable[sTypeName]) {
            return ppScopes[pScopeStack[i]].pTypeTable[sTypeName];
        }
    }
    return false;
};
Effect.prototype._hasTypeDecl = function (sTypeName) {
    var pType = this.isBaseType(sTypeName);
    if (pType) {
        return pType;
    }
    var pScope = this._pCurrentScope;
    if (pScope && pScope.pTypeTable && pScope.pTypeTable[sTypeName]) {
        return pScope.pTypeTable[sTypeName];
    }
    return false;
};
Effect.prototype.isBaseType = function (sTypeName) {
    return this.constructor.pBaseTypes[sTypeName] || false;
};
Effect.prototype.addFunction = function (pFunction) {
    var sHash = pFunction.hash();
    var pFunc = this._hasFunctionDecl(sHash);
    if (pFunc && pFunc.isSystem) {
        error("Do not even think///^^^^-->");
        return;
    }
    if (pFunc) {
        warning("It`s seen bad. You try to redeclarate function");
        if (pFunction.hasImplementation() && pFunc.hasImplementation()) {
            error("You should not try to redefinition function");
            return;
        }
        else if (pFunction.hasImplementation()) {
            pFunc.pImplement = pFunction.pImplement;
            return;
        }
    }
    this._pFunctionTableByHash[sHash] = pFunction;
    if (!this._pFunctionTableByName[pFunction.sName]) {
        this._pFunctionTableByName[pFunction.sName] = [];
    }
    this._pFunctionTableByName[pFunction.sName].push(pFunction);

};
Effect.prototype.hasFunction = function (sFuncName) {
    return this._pFunctionTableByName[sFuncName] || false;
};
Effect.prototype._hasFunctionDecl = function (sFuncHash) {
    return this.isBaseFunction(sFuncHash) || this._pFunctionTableByHash[sFuncHash] || false;
};
Effect.prototype.isBaseFunction = function (sFuncHash) {
    return this.constructor.pBaseFunctionsHash[sFuncHash] || false;
};
Effect.prototype.findBaseFunction = function (sName, pParams) {
    //Try find in built-in functions
    var pFunctions = this.constructor.pBaseFunctionsName[sName];
    var pFunc = null;
    var i, j;

    if (!pFunctions) {
        return null;
    }

    for (i = 0; i < pFunctions.length; i++) {
        if (pFunctions[i].pTypes.length === pParams.length) {
            for (j = 0; j < pParams.length; j++) {
                if (pFunctions[i].pTypes.isEqual(pParams[j])) {
                    if (!pFunc) {
                        pFunc = pFunctions[i];
                        return pFunc;
                    }
                }
                else {
                    break;
                }
            }
        }
    }
    return pFunc;
};
Effect.prototype.findFunction = function (sName, pParams) {
    var pFunctions = this._pFunctionTableByName[sName];
    var pFunc = null;
    var i, j;
    if (pFunctions) {
        if (pParams === null) {
            //Find function for pass
            if (pFunctions.length > 1) {
                error("Now so states are not support");
                return;
            }
            return pFunctions[0];
        }
        for (i = 0; i < pFunctions.length; i++) {
            if (pFunctions[i].nParamsNeeded === pParams.length) {
                if (pParams.length === 0) {
                    if (!pFunc) {
                        pFunc = pFunctions[i];
                    }
                    else {
                        error("I can`t choose function");
                        return;
                    }
                    continue;
                }
                for (j = 0; j < pParams.length; j++) {
                    if (pFunctions[i].pParamOrders[j].pType.isEqual(pParams[j])) {
                        if (!pFunc) {
                            pFunc = pFunctions[i];
                        }
                        else {
                            error("I can`t choose function");
                            return;
                        }
                    }
                    else {
                        break;
                    }
                }
            }
        }
        if (pFunc) {
            return pFunc;
        }
    }
    //Try to find buil-in function
    pFunctions = this.constructor.pBaseFunctionsName[sName];
    if (!pFunctions) {
        return null;
    }
    for (i = 0; i < pFunctions.length; i++) {
        if (pFunctions[i].pTypes.length === pParams.length) {
            for (j = 0; j < pParams.length; j++) {
                if (pFunctions[i].pTypes[j].isEqual(pParams[j])) {
                    if (!pFunc) {
                        pFunc = pFunctions[i];
                        return pFunc;
                    }
                }
                else {
                    break;
                }
            }
        }
    }
    return null;
};
Effect.prototype.setBadFunction = function (pFunction) {
    this._pFunctionTableByHash[pFunction.hash()] = null;
    this._pFunctionBlackList[pFunction.hash()] = pFunction;
    var pTable = this._pFunctionTableByName[pFunction.sName];
    var i;
    if (pTable.length === 1) {
        this._pFunctionTableByName[pFunction.sName] = null;
        return;
    }
    for (i = 0; i < pTable.length; i++) {
        if (pTable[i] === pFunction) {
            this._pFunctionTableByName.splice(i, 1);
            return;
        }
    }
};
Effect.prototype.convertType = function (pNode) {
    var pType;
    var pChildren = pNode.pChildren;
    if (pNode.sName === T_TYPE_ID) {
        pType = this.hasType(pNode.sValue);
        if (!pType) {
            error("bad 116");
            return;
        }
        return pType;
    }
    if (pNode.sName === T_KW_VOID) {
        pType = this.hasType(pNode.sValue);
        return pType;
    }
    if (pNode.sName === SCALARTYPE || pNode.sName === OBJECTTYPE) {
        pType = this.hasType(pChildren[pChildren.length - 1].sValue);
        if (!pType) {
            error("Something going wrong with type names(");
            return;
        }
        return pType;
    }
    if (pNode.sName === MATRIXTYPE || pNode.sName === VECTORTYPE) {
        if (pChildren.length === 1) {
            pType = this.hasType(pChildren[0].sValue);
            return pType;
        }
        var sTypeName;
        if (pNode.sName === MATRIXTYPE) {
            sTypeName = "matrix";
            sTypeName += "<" + this.convertType(pChildren[5]).toCode();
            this.newCode();
            sTypeName += "," + this.evalHLSL(this.analyzeExpr(pChildren[3]));
            this.endCode();
            this.newCode();
            sTypeName += "," + this.evalHLSL(this.analyzeExpr(pChildren[1]));
            this.endCode();
            sTypeName += ">";
        }
        else {
            sTypeName = "vector";
            sTypeName += "<" + this.convertType(pChildren[3]).toCode();
            this.newCode();
            sTypeName += "," + this.evalHLSL(this.analyzeExpr(pChildren[1]));
            this.endCode();
            sTypeName += ">";
        }
        pType = this.hasType(sTypeName);
        return pType;
    }
    if (pNode.sName === BASETYPE || pNode.sName === TYPE) {
        return this.convertType(pChildren[0]);
    }
    return pType;
};
Effect.prototype.addConstant = function (pVar) {
    if (!this._pConstants) {
        this._pConstants = {};
    }
    this._pConstants[pVar.sName] = pVar;
};

Effect.prototype.analyze = function (pTree) {
    if (!pTree) {
        warning("Wrong argument! You must put an object of parse tree class!");
        return false;
    }
//    try {
    var pRoot = pTree.pRoot;
    var i;
    this._pParseTree = pTree;
    var time = a.now();
    this.newScope();
//        for (i = 0; i < pRoot.pChildren.length; i++) {
//            this.analyzeDecl(pRoot.pChildren[i]);
//        }
    this.firstStep();
    this.analyzeTypes();
    this.preAnalyzeFunctions();
    this.preAnalyzeVariables();
    this.preAnalyzeTechniques();
    this.secondStep();
    this.analyzeEffect();
    this.checkEffect();
    this.endScope(1);
    console.log(a.now() - time);
    return true;
//    }
//    catch (e) {
//        console.error(e);
//        return false;
//    }
};
Effect.prototype.firstStep = function () {
    this.nStep = 1;
};
Effect.prototype.secondStep = function () {
    this.nStep = 2;
};
/**
 * Analyze type declarations
 */
Effect.prototype.analyzeTypes = function () {
    var pChildren = this._pParseTree.pRoot.pChildren;
    var i;
    this.nCurrentDecl = 0;
    for (i = pChildren.length - 1; i >= 0; i--) {
        if (pChildren[i].sName === TYPEDECL) {
            this.nCurrentDecl++;
            this.analyzeTypeDecl(pChildren[i]);
        }
    }
};
/**
 * Analyze function definitions
 */
Effect.prototype.preAnalyzeFunctions = function () {
    var pChildren = this._pParseTree.pRoot.pChildren;
    var i;
    this.nCurrentDecl = 0;
    for (i = pChildren.length - 1; i >= 0; i--) {
        if (pChildren[i].sName === FUNCTIONDECL) {
            this.nCurrentDecl++;
            this.analyzeFunctionDecl(pChildren[i]);
        }
    }
};
Effect.prototype.preAnalyzeVariables = function () {
    var pChildren = this._pParseTree.pRoot.pChildren;
    var i;
    this.nCurrentDecl = 0;
    for (i = pChildren.length - 1; i >= 0; i--) {
        if (pChildren[i].sName === VARIABLEDECL) {
            this.nCurrentDecl++;
            this.analyzeVariableDecl(pChildren[i]);
        }
        if (pChildren[i].sName === VARSTRUCTDECL) {
            this.nCurrentDecl++;
            this.analyzeVarStructDecl(pChildren[i]);
        }
    }
};

/**
 * Analyze techniques
 */
Effect.prototype.preAnalyzeTechniques = function () {
    var pChildren = this._pParseTree.pRoot.pChildren;
    var i;
    this.nCurrentDecl = 0;
    for (i = pChildren.length - 1; i >= 0; i--) {
        if (pChildren[i].sName === TECHIQUEDECL) {
            this.nCurrentDecl++;
            this.analyzeTechniqueDecl(pChildren[i]);
        }
    }
};
/**
 * Analyze all (not analyzed yet) effect-file instructions(without technique statements)
 */
Effect.prototype.analyzeEffect = function () {
    var pChildren = this._pParseTree.pRoot.pChildren;
    var i;
    this.nCurrentDecl = 0;
    for (i = pChildren.length - 1; i >= 0; i--) {
        this.nCurrentDecl++;
        this.analyzeDecl(pChildren[i]);
    }
};
/**
 * Check effect after analyze for correctness of all instructions
 */
Effect.prototype.checkEffect = function () {

};
Effect.prototype.analyzeDecl = function (pNode) {
    if (pNode.pAnalyzed !== undefined) {
        return;
    }
    switch (pNode.sName) {
        case VARIABLEDECL:
            this.analyzeVariableDecl(pNode);
            break;
        case TYPEDECL:
            this.analyzeTypeDecl(pNode);
            break;
        case FUNCTIONDECL:
            this.analyzeFunctionDecl(pNode);
            break;
        case VARSTRUCTDECL:
            this.analyzeVarStructDecl(pNode);
            break;
        case TECHIQUEDECL:
            this.analyzeTechniqueDecl(pNode);
            break;
        case USEDECL:
            this.analyzeUseDecl(pNode);
            break;
        case PROVIDEDECL:
            this.analyzeProvideDecl(pNode);
            break;
        case IMPORTDECL:
            this.analyzeImportDecl(pNode);
            break;
    }
};
Effect.prototype.analyzeUseDecl = function (pNode) {
    var pChildren = pNode.pChildren;
    if (pChildren[0].sValue === T_KW_STRICT) {
        if (!this._isStrictMode) {
            this._pCurrentScope.isStrict = true;
            this._isStrictMode = true;
        }
    }
};
Effect.prototype.analyzeVariableDecl = function (pNode) {
    var pChildren = pNode.pChildren;
    var i;
    var pVar;
    var pType = new VariableType();
    this.analyzeUsageType(pChildren[pChildren.length - 1], pType);
    if (pType.isEqual(this.hasType("video_buffer")) && this._iScope !== GLOBAL) {
        error("Declarations of video buffer are available only in Global scope");
        return;
    }
    var isSampler = false;
    if (pType.pEffectType.isSampler()) {
        isSampler = true;
        this.newSampler();
        if (this._iScope !== GLOBAL) {
            error("Only global samplers support");
            return;
        }
    }
    if (!pType.checkMe(this._isStruct ? STRUCTUSAGE : -1, this._isLocal ? LOCALUSAGE : -1)) {
        error("You sucks. 1");
        return;
    }
    this._pCurrentType = pType;
    for (i = pChildren.length - 2; i >= 1; i--) {
        if (pChildren[i].sName === VARIABLE) {
            pVar = this.analyzeVariable(pChildren[i]);
            pVar.setType(pType);
            this.addVariableDecl(pVar);
        }
    }
    this._pCurrentType = null;
    if (isSampler) {
        this.endSampler();
    }
    pNode.pAnalyzed = true;
};
Effect.prototype.analyzeUsageType = function (pNode, pType) {
    pType = pType || new VariableType();
    var pChildren = pNode.pChildren;
    var i;
    for (i = pChildren.length - 1; i >= 0; i--) {
        if (pChildren[i].sName === TYPE) {
            pType.setType(this.convertType(pChildren[i]));
        }
        if (pChildren[i].sName === USAGE) {
            pType.setUsage(pChildren[i].pChildren[0].sValue);
        }
    }
    return pType;
};
Effect.prototype.analyzeVariable = function (pNode, pVar) {
    var pChildren = pNode.pChildren;
    if (this._isAnnotation || this._iScope > GLOBAL) {
        if (pChildren.length > 2) {
            error("Bad syntax! Bad variable declaration in annotation or local scope!");
            return;
        }
        if (pChildren.length === 2 && pChildren[0].sName !== INITIALIZER) {
            error("Bad syntax! Bad variable declaration in annotation or local scope! Second must be Initializer.");
            return;
        }
    }
    if (this._isStruct) {
        if (pChildren.length > 2) {
            error("Bad syntax! Bad variable declaration in struct scope!");
            return;
        }
        if (pChildren.length === 2 && pChildren[0].sName !== SEMANTIC) {
            error("Bad syntax! Bad variable declaration in struct scope! Second must be Semantic");
            return;
        }
    }
    pVar = pVar || new EffectVariable();
    this._pCurrentVar = pVar;
    this.analyzeVariableDim(pChildren[pChildren.length - 1], pVar);
    var i;
    var pResult = null;
    for (i = pChildren.length - 2; i >= 0; i--) {
        if (pChildren[i].sName === ANNOTATION) {
            pResult = this.analyzeAnnotation(pChildren[i], pVar);
        }
        else if (pChildren[i].sName === SEMANTIC) {
            pResult = this.analyzeSemantic(pChildren[i], pVar);
        }
        else if (pChildren[i].sName === INITIALIZER) {
            pResult = this.analyzeInitializer(pChildren[i], pVar);
        }
    }
    return pVar;
};
Effect.prototype.addVariableDecl = function (pVar) {
    if (!pVar.checkMe()) {
        error("You sucks 2");
        return;
    }

    if (this._isAnnotation) {
        pVar.pDefaultValue = this.evalHLSL(pVar.pInitializer);
        this._pCurrentAnnotation[pVar.sName] = pVar.sValue;
        return true;
    }
    if (this._isStruct) {
        this._pCurrentStructFields[pVar.sName] = pVar;
        this._pCurrentStructOrders.push(pVar);
        return true;
    }
    if (this._iScope === GLOBAL) {
        if (pVar.isConstInit() === false) {
            error("Don`t do this, bad boy");
            return;
        }
        pVar.pDefaultValue = this.evalHLSL(pVar.pInitializer);
        if (pVar.isConst() && pVar.isConstInit()) {
            this.addConstant(pVar);
        }
    }
    if (pVar.sName === SHADEROUT && this._eFuncProperty === a.Effect.Func.VERTEX) {
        if (!pVar.pType.isEqual(this._pCurrentFunction.pReturnType)) {
            error("Type of 'Out' variable are incorrect");
            return;
        }
        this.addVariable(this._pCurrentFunction.pReturnVariable);
    }
    else {
        this.addVariable(pVar);
        if (this._isCodeWrite) {
            this.pushCode(pVar.pType);
            this.pushCode(pVar);
            if (pVar.pInitializer) {
                this.pushCode("=");
                var i;
                var pCode = pVar.pInitializer;
                for (i = 0; pCode && i < pCode.length; i++) {
                    this.pushCode(pCode[i]);
                }
            }
            this.pushCode(";");
        }
    }
};
Effect.prototype.analyzeVariableDim = function (pNode, pVar) {
    pVar = pVar || new EffectVariable();
    var pChildren = pNode.pChildren;
    var pCode;
    if (pChildren.length === 1) {
        pVar.sName = pChildren[0].sValue;
        return pVar;
    }
    if (pChildren.length === 3) {
        if (!this._isStruct) {
            error("For variables this are not good");
            return;
        }
        pVar.isPointer = true;
        pVar.nDim++;
    }
    else if (pChildren.length === 4 && pChildren[0].sName === FROMEXPR) {
        pVar.isPointer = true;
        pVar.nDim++;
        pVar.pBuffer = this.analyzeFromExpr(pChildren[0]);
    }
    else {
        if (!pVar.isArray) {
            pVar.isArray = true;
        }
        else {
            error("Sorry but glsl does not support multidimensional arrays!");
            return;
        }
        this.newCode();
        this.analyzeExpr(pChildren[pChildren.length - 3]);
        pCode = this._pCode;
        this.endCode();
        pVar.iLength = this.evalHLSL(pCode);
    }
    this.analyzeVariableDim(pChildren[pChildren.length - 1], pVar);
    return pVar;
};
Effect.prototype.analyzeFromExpr = function (pNode) {
    var pChildren = pNode.pChildren;
    var pMem;
    if (pChildren[1].sName === T_NON_TYPE_ID) {
        pMem = this.hasVariable(pChildren[1].sValue);
        if (!pMem) {
            error("bad 1");
            return;
        }
        if (!pMem.pBuffer) {
            error("bad 2");
        }
        pMem = pMem.pBuffer;
    }
    else {
        pMem = this.analyzeMemExpr(pChildren[1]);
    }
    this._pExprType = this.hasType("video_buffer");
    return pMem;
};
Effect.prototype.analyzeMemExpr = function (pNode) {
    var pChildren = pNode.pChildren;
    var pMem;
    var pVar;
    if (pChildren[0].sName === T_NON_TYPE_ID) {
        pMem = this.hasVariable(pChildren[1].sValue);
        if (!pMem) {
            error("bad 3");
            return;
        }
        pMem = pMem.pBuffer;
    }
    else {
        this._isCodeWrite = false;
        this.analyzeExpr(pChildren[0]);
        this._isCodeWrite = true;

        if (this._sLastFullName.search(".") !== -1) {
            pVar = this.hasComplexVariable(this._sLastFullName);
        }
        else {
            pVar = this.hasVariable(this._sLastFullName);
        }
        if (!pVar) {
            error("Unknown variable 101");
            return;
        }
        if (!pVar.pBuffer) {
            error("Varibale has no buffer");
            return;
        }
        pMem = pVar.pBuffer;
    }
    if (!pMem) {
        error("Oh-oh, don`t cool enough");
    }
    this._pExprType = this.hasType("video_buffer");
    return pMem;
};
Effect.prototype.analyzeAnnotation = function (pNode, pObj) {
    this.newAnnotation();
    var pChildren = pNode.pChildren;
    var i;
    for (i = pChildren.length - 1; i >= 0; i--) {
        if (pChildren[i].sName === VARIABLEDECL) {
            this.analyzeVariableDecl(pChildren[i]);
        }
    }
    pObj.addAnnotation(this._pCurrentAnnotation);
    this.endAnnotation();
    return pObj;
};
Effect.prototype.analyzeSemantic = function (pNode, pObj) {
    pObj.addSemantic(pNode.pChildren[0].sValue);
    return pObj;
};
Effect.prototype.analyzeInitializer = function (pNode, pVar) {
    pVar = pVar || new EffectVariable();
    var pChildren = pNode.pChildren;
    var pInit;
    this.newCode();
    if (pChildren[pChildren.length - 2].sValue === "{") {
        var i;
        var iLength = pVar.iLength * this._pCurrentType.pEffectType.iSize;
        if ((pChildren.length - 3) !== iLength * 2 - 1 &&
            !((pChildren.length - 3) === iLength * 2 && pChildren[1].sValue === ",")) {
            error("Bad constructor");
        }
        for (i = pChildren.length - 3; i >= 1; i--) {
            if (pChildren[i].sName === INITEXPR) {
                this.analyzeInitExpr(pChildren[i]);
            }
        }
    }
    else {
        this.analyzeExpr(pNode.pChildren[0]);
    }
    pInit = this._pCode;
    this.endCode();
    pVar.addInitializer(pInit);
    return pVar;
};
Effect.prototype.analyzeInitExpr = function (pNode) {
    var pChildren = pNode.pChildren;

    if (pChildren[pChildren.length - 1].sValue === "{") {
        var i;
        for (i = pChildren.length - 2; i >= 1; i--) {
            if (pChildren[i].sName === INITEXPR) {
                this.analyzeInitExpr(pChildren[i]);
            }
        }
    }
    else {
        this.analyzeExpr(pChildren[0]);
    }
};
/**
 * Translate HLSL into GLSL (without real names of varibles)
 * @tparam Object pNode
 * @tparam Array pOut
 * @treturn Array Array of glsl commands. Or return false.
 * @private
 */
Effect.prototype.analyzeExpr = function (pNode) {
    //'use strict';
    var pChildren = pNode.pChildren;
    var pRes;
    var pVar;
    var pType, pType1, pType2;
    var sName = pNode.sName;
    var pFunction = this._pCurrentFunction;
    var pFunc;
    var i, j;
    var isNewVar = false;
    var isComplexVar = false;
    var sTypeName;
    var pCodeFragment;
    var isWriteMode = false;
    var pCode, pCodeShader;
    var isFlag = false; //temp flag
    var pTemp = null; //some temp obj for anything

    switch (sName) {
        case OBJECTEXPR:
            if (pChildren[pChildren.length - 1].sValue === T_KW_STATEBLOCK_STATE) {
                //ObjectExpr : T_KW_STATEBLOCK_STATE StateBlock
                error("I don`t know what is this");
                return;
            }
            if (pChildren[pChildren.length - 1].sValue === T_KW_COMPILE_FRAGMENT) {
                //ObjectExpr : T_KW_COMPILE_FRAGMENT Target NonTypeId '(' ArgumentsOpt ')'
                error("Frog sucks");
                return;
            }
            if (pChildren[pChildren.length - 1].sValue === T_KW_COMPILE) {
                //ObjectExpr : T_KW_COMPILE Target NonTypeId '(' ArgumentsOpt ')'
                pFunc = this.findFunction(pChildren[pChildren.length - 3].sValue, null);
                if (!pFunc) {
                    error("yo, error");
                    return;
                }
                //this.pushCode(pChildren[2].sValue);
                if (pChildren.length > 5) {
                    //TODO: add support for these constructions
                    error("Sorry but we now don`t support this constructions");
                    return;
                }
                return pFunc;
            }
            else {
                //ObjectExpr : T_KW_SAMPLER_STATE StateBlock
                this.analyzeStateBlock(pChildren[0]);
                this._pExprType = null;
            }
            break;

        case COMPLEXEXPR:
            if (this._nAddr > 0 &&
                pChildren.length !== 3 &&
                (pChildren[1].sName !== POSTFIXEXPR || pChildren[1].sName !== PRIMARYEXPR ||
                 pChildren[1].sName !== COMPLEXEXPR)) {
                error("Bad for dog 2");
                break;
            }
            if (pChildren.length === 1) {
                //ComplexExpr : ObjectExpr
                this.analyzeExpr(pChildren[pChildren.length - 1]);
                break;
            }
            if (!(pChildren.length === 3 &&
                  (pChildren[1].sName === POSTFIXEXPR || pChildren[1].sName === COMPLEXEXPR ||
                   pChildren[1].sValue !== undefined))) {
                this._isNewComplexName = false;
            }
            if (pChildren.length === 3 && pChildren[2].sValue === "(") {
                //ComplexExpr : '(' Expr ')'
                this.pushCode("(");
                this.analyzeExpr(pChildren[1]);
                this.pushCode(")");
                break;
            }
            if (pChildren[pChildren.length - 1].sName === T_NON_TYPE_ID) {
                //ComplexExpr : NonTypeId '(' ArgumentsOpt ')'
                var pTypes = [];
                var pArguments = [];
                var pCandidates;
                isFlag = null;
                for (i = pChildren.length - 3; i >= 1; i--) {
                    if (pChildren[i].sValue !== ",") {
                        this.newCode();
                        if (this._eFuncProperty === a.Effect.Func.VERTEX) {
                            if (!pFunction.isLocalOut) {
                                isFlag = false;
                            }
                        }
                        this.analyzeExpr(pChildren[i]);
                        if (this._eFuncProperty === a.Effect.Func.VERTEX) {
                            if (pFunction.isLocalOut && isFlag === false) {
                                isFlag = true;
                                pFunction.isLocalOut = false;
                                if (!pCandidates) {
                                    pCandidates = [];
                                }
                                pCandidates.push(i);
                            }
                        }
                        pTypes.push(this._pExprType);
                        pArguments.push(this._pCode);
                        this.endCode();
                    }
                }
                pFunc = this.findFunction(pChildren[pChildren.length - 1].sValue, pTypes);
                if (!pFunc) {
                    error("bad 108");
                    return;
                }
                pType1 = pFunc.pReturnType;
                for (i = 0; pCandidates && i < pCandidates.length; i++) {
                    pVar = pFunc.pParamOrders[pCandidates[i]];
                    if (pVar.isInput() || (!pVar.isInput && !pVar.isOutput())) {
                        pFunction.isLocalOut = true;
                        break;
                    }
                }
                if (pFunc.isSystem) {
                    pCodeFragment = pFunc.pGLSLExpr.toGLSL(pArguments);
                    for (i = 0; i < pCodeFragment.length; i++) {
                        this.pushCode(pCodeFragment[i]);
                    }
                }
                else {
                    this.pushCode(pFunc);
                    this.pushCode("(");
                    for (i = 0; i < pArguments.length; i++) {
                        for (j = 0; j < pArguments[i].length; j++) {
                            this.pushCode(pArguments[i][j]);
                        }
                        if (i != pArguments.length - 1) {
                            this.pushCode(",")
                        }
                    }
                    this.pushCode(")");
                    if (this._eFuncProperty === a.Effect.Func.FUNCTION ||
                        ((this._eFuncProperty === a.Effect.Func.VERTEX ||
                          this._eFuncProperty === a.Effect.Func.FRAGMENT) &&
                         pFunction.pFunction.pImplement === null)) {
                        pFunction.addFunction(pFunc);
                        if (!pFunc.isConstant) {
                            pFunction.isConstant = false;
                        }
                    }
                }
                this._pExprType = pType1;
                break;

            }
            else if (pChildren[pChildren.length - 1].sName === T_TYPE_ID) {
                //ComplexExpr : TypeId '(' ArgumentsOpt ')'
                pType1 = this.hasType(pChildren[pChildren.length - 1].sValue);
                this.pushCode(pType1);
            }
            else if (pChildren[pChildren.length - 1].sName === BASETYPE) {
                //ComplexExpr : BaseType '(' ArgumentsOpt ')'
                pType1 = this.convertType(pChildren[pChildren.length - 1]);
                this.pushCode(pType1);
            }
            this.pushCode("(");

            for (i = pChildren.length - 3; i >= 1; i--) {
                if (pChildren[i].sValue === ",") {
                    this.pushCode(",");
                }
                else {
                    this.analyzeExpr(pChildren[i]);
                }
            }
            this.pushCode(")");
            this._pExprType = pType1;
            break;

        case PRIMARYEXPR:
            if (pChildren.length === 1) {
                this.analyzeExpr(pChildren[pChildren.length - 1]);
                break;
            }
            if (this._isNewName) {
                error("something going wrong. maybe you use @some.any but correct - @(some.any)");
                return;
            }
            var isNewAddr = false;
            if (this._nAddr === 0) {
                this._isCodeWrite = false;
                this.newAddr();
                isNewAddr = true;
            }
            this._nAddr++;
            this.analyzeExpr(pChildren[0]);

            if (isNewAddr) {
                this._isCodeWrite = true;
                var pRes;
                if (this._sLastFullName.search('.') !== -1) {
                    pRes = this.hasComplexVariable(this._sLastFullName);
                }
                else {
                    pRes = this.hasVariable(this._sLastFullName);
                }
                if (!pRes) {
                    error("oh-ah");
                    break;
                }
                if (!pRes.pBuffer) {
                    error("Previously you must to definite buffer for variable");
                    return;
                }
                if (pRes.isPointer === false) {
                    error("only for index");
                    return;
                }
                if (pRes.isPointer === undefined) {
                    pRes.isPointer = true;
                }
                this._pLastVar = pRes;
                if (this._isWriteVar) {
                    this._pMemReadVars.push(pRes);
                }
                pRes = pRes.pPointers[this._nAddr - 1];
                if (!pRes) {
                    error("@@@@ - why are you do this");
                    break;
                }
                this.pushCode(pRes);
                this.endAddr();
            }
            this._pExprType = this.hasType("ptr");
            break;

        case POSTFIXEXPR:
            if (this._nAddr > 0 && (pChildren.length === 2 || pChildren[0].sValue === "]")) {
                error("Bad for dog");
                break;
            }
            if ((pChildren[pChildren.length - 1].sName === PRIMARYEXPR && pChildren.length !== 2) ||
                pChildren[pChildren.length - 1].sName === OBJECTEXPR) {
                error("Unssuported construction");
                return;
            }
            if (pChildren.length === 2 && pChildren[1].sName === PRIMARYEXPR) {

                this.analyzeExpr(pChildren[pChildren.length - 1]);

                this._pMemReadVars.push(this._pLastVar);
                console.log("i`m here", this._pLastVar,this._pMemReadVars);
                this.pushCode(pChildren[0].sValue);
                this._pExprType = this.hasType("ptr");
                return;
            }
            isNewVar = false;
            isComplexVar = false;
            isFlag = false;
            if (!this._isNewComplexName) {
                pTemp = pChildren[pChildren.length - 1];
                while (true) {
                    if (pTemp.sName === COMPLEXEXPR) {
                        isFlag = true;
                        break;
                    }
                    if (pTemp.sValue !== undefined) {
                        break;
                    }
                    pTemp = pTemp.pChildren[pTemp.pChildren.length - 1];
                }
            }
            if (isFlag) {
                this._isNewComplexName = true;
                isComplexVar = true;
                isFlag = false;
                if (this._isNewName && this._sVarName !== "") {
                    console.log(pNode, this._isNewName);
                    error("you are very unlucky or stupid. You can choose)");
                    return;
                }
            }
            else {
                if (!this._isNewName) {
                    isNewVar = true;
                    this.newVarName();
                    if (this._eFuncProperty === a.Effect.Func.VERTEX ||
                        this._eFuncProperty === a.Effect.Func.FRAGMENT) {
                        this.newCode();
                    }
                }
            }
            this.analyzeExpr(pChildren[pChildren.length - 1]);
            if (isComplexVar) {
                if (this._isNewComplexName) {
                    isNewVar = true;
                    this.newVarName();
                    if (this._eFuncProperty === a.Effect.Func.VERTEX ||
                        this._eFuncProperty === a.Effect.Func.FRAGMENT) {
                        this.newCode();
                    }
                    this._sVarName = this._sLastFullName;
                    this._isTypeAnalayzed = false;
                }
                else {
                    this._isTypeAnalayzed = true;
                }
                this._isNewComplexName = false;
            }
            pType1 = this._pExprType;
            if (pChildren.length === 2) {
                this.pushCode(pChildren[0].sValue);
            }
            else if (pChildren[pChildren.length - 2].sValue === ".") {
                if (!isComplexVar || isNewVar) {
                    this._sVarName += ".";
                }
                this.pushCode(".");
                this.analyzeExpr(pChildren[pChildren.length - 3]);
                pType1 = this._pExprType;
                if (pChildren.length === 4) {
                    if (!isNewVar) {
                        error("not this way");
                        return;
                    }
                    pVar = this.hasComplexVariable(this._sVarName);
                    if (!pVar) {
                        error("bad 50");
                        return;
                    }
                    if (pVar.isPointer === false) {
                        error("bad 51");
                        return;
                    }
                    if(pVar.isPointer === undefined){
                        pVar.isPointer = true;
                    }
                    this._pMemReadVars.push(pVar);
                    if (isNewVar) {
                        this.endVarName();
                        if (this._eFuncProperty === a.Effect.Func.VERTEX ||
                            this._eFuncProperty === a.Effect.Func.FRAGMENT) {
                            this.endCode();
                        }
                        isNewVar = false;
                    }
                    if (isComplexVar) {
                        this._isTypeAnalayzed = false;
                        isComplexVar = false;
                    }
                    var pMem = this.analyzeFromExpr(pChildren[0]);
                    if (!pMem) {
                        error("bad 49");
                        return;
                    }
                    if (this._eFuncProperty === a.Effect.Func.FUNCTION && !pMem.isUniform) {
                        throw ERRORBADFUNCTION;
                    }
                    if (this._iScope !== pVar.iScope) {
                        error("bad 52");
                        return;
                    }
                    pVar.pBuffer = pMem;
                }
            }
            else if (pChildren[0].sValue === "]") {
                pVar = this._pLastVar;
                this.newVarName();
                this.pushCode("[");
                this.analyzeExpr(pChildren[1]);
                if (!this._pExprType.isEqual(this.hasType("int"))) {
                    error("bad 107");
                    return;
                }
                this.pushCode("]");
                this.endVarName();
                if (pType1 !== UNDEFINEDTYPE && pType1.isBase()) {
                    if (pType1.isEqual(this.hasType("float4x4"))) {
                        pType1 = this.hasType("float4");
                    }
                    else if (pType1.isEqual(this.hasType("float3x3"))) {
                        pType1 = this.hasType("float3");
                    }
                    else if (pType1.isEqual(this.hasType("float2x2"))) {
                        pType1 = this.hasType("float2");
                    }
                    else if (pType1.isEqual(this.hasType("float4")) ||
                             pType1.isEqual(this.hasType("float3")) ||
                             pType1.isEqual(this.hasType("float2"))) {
                        pType1 = this.hasType("float");
                    }
                    else if (pType1.isEqual(this.hasType("int4x4"))) {
                        pType1 = this.hasType("int4");
                    }
                    else if (pType1.isEqual(this.hasType("int3x3"))) {
                        pType1 = this.hasType("int3");
                    }
                    else if (pType1.isEqual(this.hasType("int2x2"))) {
                        pType1 = this.hasType("int2");
                    }
                    else if (pType1.isEqual(this.hasType("int4")) ||
                             pType1.isEqual(this.hasType("int3")) ||
                             pType1.isEqual(this.hasType("int2"))) {
                        pType1 = this.hasType("int");
                    }
                    else if (pType1.isEqual(this.hasType("bool4x4"))) {
                        pType1 = this.hasType("bool4");
                    }
                    else if (pType1.isEqual(this.hasType("bool3x3"))) {
                        pType1 = this.hasType("bool3");
                    }
                    else if (pType1.isEqual(this.hasType("bool2x2"))) {
                        pType1 = this.hasType("bool2");
                    }
                    else if (pType1.isEqual(this.hasType("bool4")) ||
                             pType1.isEqual(this.hasType("bool3")) ||
                             pType1.isEqual(this.hasType("bool2"))) {
                        pType1 = this.hasType("bool");
                    }
                    else {
                        error("it`s not an array");
                        return;
                    }
                }
                else if (pType1 !== UNDEFINEDTYPE) {
                    if (!pVar || !pVar.isArray) {
                        error("[] - only for arrays");
                        return;
                    }
                }
            }
            if (isNewVar) {
                if (this._eFuncProperty === a.Effect.Func.VERTEX ||
                    this._eFuncProperty === a.Effect.Func.FRAGMENT) {
                    pCode = this._pCode;
                    this.endCode();
                    isFlag = false;
                    if (this._eVarProperty === a.Effect.Var.PARAM || this._eVarProperty === a.Effect.Var.PARAMSTART) {
                        if (pType1.isBase()) {
                            for (i = 1; pCode && i < pCode.length; i++) {
                                if (isFlag === true) {
                                    this.pushCode(pCode[i]);
                                }
                                else {
                                    if (pCode[i] === ".") {
                                        isFlag = true;
                                    }
                                }
                            }
                        }
                        else {
                            for (i = 0; pCode && i < pCode.length; i++) {
                                if (pCode[i] === this._pCurrentFunction.pMainInputVar) {
                                    if (this._isCodeWrite) {
                                        if (!this._pCurrentFunction.pTwin) {
                                            this._pCurrentFunction.createTwinIn();
                                        }
                                        this.pushCode(this._pCurrentFunction.pTwin);
                                    }
                                }
                                else {
                                    this.pushCode(pCode[i]);
                                }
                            }
                        }
                        this._eVarProperty = a.Effect.Var.DEFAULT;
                    }
                    else {
                        for (i = 0; pCode && i < pCode.length; i++) {
                            this.pushCode(pCode[i]);
                        }
                    }
                }
                this.endVarName();
            }
            if (isComplexVar) {
                this._isTypeAnalayzed = false;
            }
            this._pExprType = pType1;
            break;

        case UNARYEXPR:
            if (pChildren.length === 1) {
                this.analyzeExpr(pChildren[pChildren.length - 1]);
                break;
            }
            this.pushCode(pChildren[pChildren.length - 1].sValue);
            this.analyzeExpr(pChildren[0]);
            if (!this._pExprType.isBase()) {
                error("bad 106");
                return;
            }
            break;

        case CASTEXPR:
            if (pChildren.length === 1) {
                this.analyzeExpr(pChildren[pChildren.length - 1]);
                break;
            }
            this.pushCode("(");
            this.analyzeConstTypeDim(pChildren[2]);
            //Set this._pExprType in function above
            pType = this._pExprType;
            this.pushCode("(");
            this.analyzeExpr(pChildren[0]);
            this.pushCode(")");
            this.pushCode(")");
            this._pExprType = pType;
            break;

        case CONDITIONALEXPR:
            this.analyzeExpr(pChildren[pChildren.length - 1]);
            if (!this._pExprType.isEqual(this.hasType("bool"))) {
                error("bad 105");
                return;
            }
            if (pChildren.length === 1) {
                break;
            }
            else {
                this.pushCode("?");
                this.analyzeExpr(pChildren[2]);
                pType1 = this._pExprType;
                this.pushCode(":");
                this.analyzeExpr(pChildren[0]);
                pType2 = this._pExprType;
                if (!pType1.isEqual(pType2)) {
                    error("104");
                    return;
                }
                this._pExprType = pType1;
            }
            break;

        case MULEXPR:
        case ADDEXPR:
        case RELATIONALEXPR:
        case EQUALITYEXPR:
        case ANDEXPR:
        case OREXPR:
            if (this._isWriteVar === true) {
                error("you are doing so bad and ugly things(");
                return;
            }
            this.analyzeExpr(pChildren[pChildren.length - 1]);
            pType1 = this._pExprType;
            if (pChildren.length === 1) {
                break;
            }
            else {
                this.pushCode(" " + pChildren[1].sValue + " ");
                this.analyzeExpr(pChildren[0]);
                pType2 = this._pExprType;
            }
            if (sName === OREXPR || sName === ANDEXPR) {
                pType = this.hasType("bool");
                if (pType1 !== UNDEFINEDTYPE && pType2 !== UNDEFINEDTYPE &&
                    !(pType1.isEqual(pType) && pType2.isEqual(pType))) {
                    error("bad 101");
                    return;
                }
                this._pExprType = pType;
            }
            else if (sName === EQUALITYEXPR || sName === RELATIONALEXPR) {
                if (pType1 !== UNDEFINEDTYPE && pType2 !== UNDEFINEDTYPE && !pType1.isEqual(pType2)) {
                    error("bad 102");
                    return;
                }
                this._pExprType = this.hasType("bool");
            }
            else if (sName === ADDEXPR) {
                if (!(pType1.isBase() && pType2.isBase())) {
                    error("bad 103");
                    return;
                }
                this._pExprType = pType1;
            }
            break;
        case ASSIGNMENTEXPR:
            if (this._isWriteVar === false) {
                this._isWriteVar = true;
                isWriteMode = true;
            }
            this.analyzeExpr(pChildren[pChildren.length - 1]);
            if (isWriteMode) {
                isWriteMode = false;
                this._isWriteVar = false;
            }
            pType1 = this._pExprType;
            this.pushCode(pChildren[1].sValue);
            this.analyzeExpr(pChildren[0]);
            pType2 = this._pExprType;
            if (sName === ASSIGNMENTEXPR && pChildren.length === 3) {
//                if (!pType1.isEqual(pType2)) {
//                    console.log(pNode);
//                    error("Bad 191");
//                    return;
//                }
                this._pExprType = pType1;
            }
            break;

        case T_NON_TYPE_ID:
            if (this._eVarProperty === a.Effect.Var.NOTTRANSLATE) {
                this.pushCode(pNode.sValue);
                return;
            }
            pType = this._pExprType ? (this._pExprType.pEffectType ? this._pExprType.pEffectType : this._pExprType) : null;
            if (this._isTypeAnalayzed) {
                //Проверяем тип
                if (pType.isBase()) {
                    if (
                        this.constructor.pVectorSuffix[pNode.sValue] === null &&
                        (
                            pType.sName === "float2" ||
                            pType.sName === "float3" ||
                            pType.sName === "float4" ||
                            pType.sName === "int2" ||
                            pType.sName === "int3" ||
                            pType.sName === "int4"
                            )
                        ) {
                        var sTypeName = "";
                        if (pType.sName === "float2" ||
                            pType.sName === "float3" ||
                            pType.sName === "float4") {
                            sTypeName = "float";
                        }
                        else {
                            sTypeName = "int";
                        }
                        sTypeName += pNode.sValue.length === 1 ? "" : pNode.sValue.length;
                        this._pExprType = this.hasType(sTypeName);
                        pRes = pNode.sValue;
                    }
                }
                else {
                    pVar = pType.pDesc.hasField(pNode.sValue);
                    if (!pVar) {
                        error("Return type is not enough cool for you.");
                        return;
                    }
                    this._pLastVar = pVar;
                    this._pExprType = pVar.pType;
                    if (pVar.isMixible) {
                        if (this._eVarProperty === a.Effect.Var.PARAMSTART) {
                            if (this._eFuncProperty === a.Effect.Func.VERTEX) {
                                pRes = pFunction._pAttrSemantics[pVar.sSemantic];
                            }
                            else if (this._eFuncProperty === a.Effect.Func.FRAGMENT) {
                                pRes = pFunction._pVaryingsSemantics[pVar.sSemantic];
                            }
                            this._eVarProperty = a.Effect.Var.PARAM;
                        }
                        else {
                            pRes = pVar.sSemantic;
                        }
                    }
                    else {
                        pRes = pNode.sValue;
                    }
                }
            }
            else if ((this._sVarName === "" && this._isNewName) || !this._isNewName) {
                isNewVar = false;
                if (!this._isNewName) {
                    this.newVarName();
                    isNewVar = true;
                }
                if (this._sVarName && this._sVarName.length > 0) {
                    error("Oh-no");
                    return;
                }

                this._sVarName = pNode.sValue;
                if (this._sVarName === SYSTEMVAR) {
                    if (!this._pCurrentPass) {
                        error("'engine' variable available only in pass");
                        return;
                    }
                    this._eVarProperty = a.Effect.Var.NOTTRANSLATE;
                    pRes = this._sVarName;
                    this._pExprType = UNDEFINEDTYPE;
                }
                else {
                    pRes = this.hasVariable(this._sVarName);
                    if (!pRes) {
                        console.log(this, this._sVarName);
                        error("not good for you");
                        return;
                    }
                    this._pLastVar = pRes;
                    if (this._isWriteVar === true) {
                        if (pRes.isUniform) {
                            error("don`t even try to do this, bitch.1");
                            return;
                        }
                        if (pRes.isConst()) {
                            error("don`t even try to do this, bitch.2");
                            return;
                        }
                        if (pRes.isParametr && pFunction && (pFunction.isVertexShader || pFunction.isFragmentShader)) {
                            error("don`t even try to do this, bitch.3");
                            return;
                        }
                        if (pFunction && pFunction.iScope === pRes.iScope && (pRes.isInput() && !pRes.isOutput())) {
                            error("don`t even try to do this, bitch.3");
                        }
                    }
                    else if (this._isWriteVar === false) {
                        if (pFunction && pFunction.iScope === pRes.iScope && (pRes.isOutput() && !pRes.isInput())) {
                            error("don`t even try to do this, bitch.4");
                            return;
                        }

                    }
                    if (this._eFuncProperty === a.Effect.Func.VERTEX &&
                        pRes === pFunction.pReturnVariable && isNewVar && this._isWriteVar !== null) {
                        pFunction.isLocalOut = true;
                    }
                    if (this._pCurrentPass) {
                        this._pCurrentPass.addGlobalVariable(pRes);
                        this.pushCode("this.pGlobalValues.");
                    }
                    if (this._eFuncProperty === a.Effect.Func.VERTEX && pRes.isVSInput) {
                        this._eVarProperty = a.Effect.Var.PARAMSTART;
                        this._pExprType = pRes.pType;
                        if (isNewVar) {
                            this.endVarName();
                            isNewVar = false;
                            if (!pFunction.pTwin) {
                                pFunction.createTwinIn();
                            }
                            this._eVarProperty = a.Effect.Var.DEFAULT;
                            this.pushCode(pFunction.pTwin);
                            break;
                        }
                    }
                    if (this._eFuncProperty === a.Effect.Func.FRAGMENT && pRes.isFSInput) {
                        this._eVarProperty = a.Effect.Var.PARAMSTART;
                        this._pExprType = pRes.pType;
                        if (isNewVar) {
                            this.endVarName();
                            isNewVar = false;
                            if (!pFunction.pTwin) {
                                pFunction.createTwinIn();
                            }
                            this._eVarProperty = a.Effect.Var.DEFAULT;
                            this.pushCode(pFunction.pTwin);
                            break;
                        }
                    }

                    if (pFunction && !pRes.isConst()) {
                        if (pRes.iScope === GLOBAL &&
                            (this._eFuncProperty === a.Effect.Func.FUNCTION ||
                             ((this._eFuncProperty === a.Effect.Func.VERTEX ||
                               this._eFuncProperty === a.Effect.Func.FRAGMENT) &&
                              pFunction.pFunction.pImplement === null))) {
                            if (this._isWriteVar === true) {
                                pFunction.addGlobalVariable(pRes);
                            }
                            else {
                                pFunction.addUniform(pRes);
                            }
                        }
                        pFunction.isConstant = false;
                    }
                    this._pExprType = pRes.pType;
                    if (isNewVar) {
                        this.endVarName();
                        isNewVar = false;
                    }
                }
            }
            else {
                if (
                    this.constructor.pVectorSuffix[pNode.sValue] === null &&
                    (
                        pType.sName === "float2" ||
                        pType.sName === "float3" ||
                        pType.sName === "float4" ||
                        pType.sName === "int2" ||
                        pType.sName === "int3" ||
                        pType.sName === "int4"
                        )
                    ) {
                    pRes = pNode.sValue;
                    sTypeName = "";
                    if (pType.sName === "float2" ||
                        pType.sName === "float3" ||
                        pType.sName === "float4") {
                        sTypeName = "float";
                    }
                    else {
                        sTypeName = "int";
                    }
                    sTypeName += pNode.sValue.length === 1 ? "" : pNode.sValue.length;
                    this._pExprType = this.hasType(sTypeName);
                }
                else {
                    this._sVarName += pNode.sValue;
                    pRes = this.hasComplexVariable(this._sVarName);
                    if (!pRes) {
                        error("Not this variable " + this._sVarName);
                        return;
                    }
                    this._pLastVar = pRes;
                    pRes.isUsed = true;
                    this._pExprType = pRes.pType;

                    if (this._eVarProperty === a.Effect.Var.PARAMSTART) {
                        if (this._eFuncProperty === a.Effect.Func.VERTEX) {
                            pRes = pFunction._pAttrSemantics[pRes.sName];
                        }
                        else if (this._eFuncProperty === a.Effect.Func.FRAGMENT) {
                            pRes = pFunction._pVaryingsSemantics[pRes.sName];
                        }
                        this._eVarProperty = a.Effect.Var.PARAM;
                        pRes.isUsed = true;
                        this._pExprType = pRes.pType;
                    }
                    else {
                        pRes = pRes.sName;
                    }
                }
            }
            if (!pRes) {
                error("Unknown ID: " + pNode.sValue);
                return;
            }
            this.pushCode(pRes);
            break;

        case T_STRING:
        case T_UINT:
        case T_FLOAT:
        case T_KW_TRUE:
        case T_KW_FALSE:
            this.pushCode(pNode.sValue);
            if (sName === T_STRING) {
                this._pExprType = this.hasType("string");
            }
            else if (sName === T_UINT) {
                this._pExprType = this.hasType("int");
            }
            else if (sName === T_FLOAT) {
                this._pExprType = this.hasType("float");
            }
            else {
                this._pExprType = this.hasType("bool");
            }
            break;
        case MEMEXPR:
            return this.analyzeMemExpr(pNode);
    }
};
Effect.prototype.analyzeConstTypeDim = function (pNode) {
    var pChildren = pNode.pChildren;
    var pType;
    //GLSL compatibility
    if (pChildren.length > 1) {
        error("Bad type casting");
        return;
    }
    pType = this.convertType(pChildren[0]);
    if (!this.isBaseType(pType.sName)) {
        error("Don`t suppot so typecasting in webgl");
        return;
    }
    this.pushCode(pType);
    this._pExprType = pType;
};
Effect.prototype.analyzeTypeDecl = function (pNode) {
    var pChildren = pNode.pChildren;
    var pType = new EffectType();
    if (pChildren.length === 2) {
        //TypeDecl : StructDecl ';'
        pType.fromStruct(this.analyzeStructDecl(pChildren[1]));
    }
    this.addType(pType);
    pNode.pAnalyzed = pType;
};
Effect.prototype.analyzeStructDecl = function (pNode, pStruct) {
    pStruct = pStruct || new EffectStruct();
    var pChildren = pNode.pChildren;
    pStruct.sName = pChildren[pChildren.length - 2].sValue;
    if (this.hasType(pStruct.sName)) {
        error("Very bad... You try to redefinition type(");
        return;
    }
    this.newStruct();
    var i;
    for (i = pChildren.length - 4; i >= 1; i--) {
        if (pChildren[i].sName === VARIABLEDECL) {
            this.analyzeVariableDecl(pChildren[i]);
        }
    }
    pStruct.pFields = this._pCurrentStructFields;
    pStruct.pOrders = this._pCurrentStructOrders;
    this.endStruct();
    return pStruct;
};

Effect.prototype.analyzeFunctionDecl = function (pNode) {
    var pChildren = pNode.pChildren;
//    this.newFunction();
    var pFunction;
    if (this.nStep === 1) {
        var hasDecl = false;
        pFunction = this.analyzeFunctionDef(pChildren[pChildren.length - 1]);

        if (pChildren[pChildren.length - 2].sValue !== ";") {
            hasDecl = true;
        }
        else {
            pNode.pAnalyzed = pFunction;
        }
        var pFunc = this._hasFunctionDecl(pFunction.hash());

        if (pFunc !== false && pFunc.hasImplementation() && hasDecl) {
            error("You try to redifinition function! Not good!");
            return;
        }
        if (pFunc === false) {
            this.addFunction(pFunction);
        }
    }
    else {
        pFunction = this.analyzeFunctionDef(pChildren[pChildren.length - 1]);
        var pType = pFunction.pReturnType;
        var pEffectType = pType.pEffectType;
        this._eFuncProperty = a.Effect.Func.FUNCTION;
        this._pCurrentFunction = pFunction;
        this.newScope();
        pFunction.iScope = this._iScope;
        var i;
        for (i in pFunction.pParameters) {
            this.addVariable(pFunction.pParameters[i], true);
        }
        if (pChildren.length === 3) {
            this.analyzeAnnotation(pChildren[1], pFunction);
        }
        try {
            this.newCode();
            this.analyzeStmtBlock(pChildren[0]);
            pFunction.setImplement(this._pCode);
            this.endCode();
        }
        catch (e) {
            if (e === ERRORBADFUNCTION) {
                console.log(e);
                pFunction.pImplement = null;
                this.setBadFunction(pFunction);
            }
            else {
                throw e;
            }
        }
        if (pFunction.isVertexShader) {
            if (!pFunction.checkMe(VERTEXUSAGE)) {
                error("Vertex is not vertex enough");
            }

            this._eFuncProperty = a.Effect.Func.VERTEX;
            pFunction.pShader = new EffectVertex(pFunction);
            this._pCurrentFunction = pFunction.pShader;
            for (i = 0; i < pFunction.pParamOrders.length; i++) {
                if (pFunction.pParamOrders[i].isUniform === false) {
                    pFunction.pShader.addAttribute(pFunction.pParamOrders[i]);
                }
            }
            //Add Varyings
            if (pType.isStruct()) {
                var pVars = pEffectType.pDesc.pOrders;
                for (i = 0; i < pVars.length; i++) {
                    if (pVars[i].sSemantic !== "POSITION" && pVars[i].sSemantic !== "PSIZE") {
                        pFunction.pShader.addVarying(pVars[i]);
                    }
                }
                pFunction.pShader.createReturnVar(pFunction.pReturnType);
            }
            this.newCode();
            this.analyzeStmtBlock(pChildren[0]);
            pFunction.pShader.setImplement(this._pCode);
            this.endCode();
            if (this._pShaders[pFunction.hash()]) {
                error("Blyat`");
                return;
            }
            this._pShaders[pFunction.hash()] = pFunction.pShader;
        }
        else if (pFunction.isFragmentShader) {
            if (!pFunction.checkMe(FRAGMENTUSAGE)) {
                error("Pixel is not pixel enough");
            }

            this._eFuncProperty = a.Effect.Func.FRAGMENT;
            pFunction.pShader = new EffectFragment(pFunction);
            this._pCurrentFunction = pFunction.pShader;
            for (i = 0; i < pFunction.pParamOrders.length; i++) {
                if (pFunction.pParamOrders[i].isUniform === false) {
                    pFunction.pShader.addVarying(pFunction.pParamOrders[i]);
                }
            }
            this.newCode();
            this.analyzeStmtBlock(pChildren[0]);
            pFunction.pShader.setImplement(this._pCode);
            this.endCode();
            if (this._pShaders[pFunction.hash()]) {
                error("Blyat` 2");
                return;
            }
            this._pShaders[pFunction.hash()] = pFunction.pShader;
        }
        this.endScope();
        this._eVarProperty = a.Effect.Func.DEFAULT;
        this._pCurrentFunction = null;
    }
//    this.endFunction();
};
Effect.prototype.analyzeFunctionDef = function (pNode, pFunction) {
    if (pNode.pAnalyzed !== undefined) {
        return pNode.pAnalyzed;
    }
    pFunction = pFunction || new EffectFunction();
    var pChildren = pNode.pChildren;
    pFunction.pReturnType = this.analyzeUsageType(pChildren[pChildren.length - 1]);
    pFunction.setName(pChildren[pChildren.length - 2].sValue);
    if (pChildren[0].sName === SEMANTIC) {
        pFunction.addSemantic(pChildren[0].pChildren[0].sValue);
        this.analyzeParamList(pChildren[1], pFunction);
    }
    else {
        this.analyzeParamList(pChildren[0], pFunction);
    }
    pFunction.calcHash();
    pNode.pAnalyzed = pFunction;
    return pFunction;
};
Effect.prototype.analyzeStmtBlock = function (pNode) {
    var pChildren = pNode.pChildren;
    var i;
    this.newScope();
    this.pushCode("{");
    for (i = pChildren.length - 2; i >= 1; i--) {
        this.analyzeStmt(pChildren[i]);
    }
    this.pushCode("}");
    this.endScope();
};
Effect.prototype.analyzeStmt = function (pNode) {
    var pChildren = pNode.pChildren;
    if (pChildren.length === 1) {
        this.analyzeSimpleStmt(pChildren[0]);
    }
    else if (pChildren[pChildren.length - 1].sName === T_KW_WHILE) {
        //Stmt : T_KW_WHILE '(' Expr ')' Stmt
        this.pushCode("while");
        this.pushCode("(");
        this.analyzeExpr(pChildren[2]);
        this.pushCode(")");
        this.analyzeStmt(pChildren[0]);
    }
    else if (pChildren[pChildren.length - 1].sName === T_KW_FOR) {
        //Stmt : For '(' ForInit ForCond ForStep ')' Stmt
        this.pushCode("for");
        this.pushCode("(");
        this.newScope();
        this.analyzeForInit(pChildren[4]);
        this.analyzeForCond(pChildren[3]);
        this.analyzeForStep(pChildren[2]);
        this.pushCode(")");
        this.analyzeStmt(pChildren[0]);
        this.endScope();
    }
    else if (pChildren[pChildren.length - 1].sName === T_KW_IF && pChildren.length === 5) {
        //Stmt : T_KW_IF '(' Expr ')' Stmt
        this.pushCode("if");
        this.pushCode("(");
        this.analyzeExpr(pChildren[2]);
        this.pushCode(")");
        this.analyzeStmt(pChildren[0]);
    }
    else {
        //Stmt : T_KW_IF '(' Expr ')' NonIfStmt T_KW_ELSE Stmt
        this.pushCode("if");
        this.pushCode("(");
        this.analyzeExpr(pChildren[4]);
        this.pushCode(")");
        this.analyzeNonIfStmt(pChildren[2]);
        this.pushCode("else");
        this.analyzeStmt(pChildren[0]);
    }
};
Effect.prototype.analyzeForInit = function (pNode) {
    pNode = pNode.pChildren[pNode.pChildren.length - 1];
    var pChildren = pNode.pChildren;
    if (pNode.sName !== VARIABLEDECL) {
        error("Sorry but webgl support only for-init-statement with variableDecl");
        return;
    }
    if (pChildren.length > 3) {
        error("Sorry but webgl support only for-init-statement with variableDecl");
        return;
    }
    this.analyzeVariableDecl(pNode);
};
Effect.prototype.analyzeForCond = function (pNode) {
    pNode = pNode.pChildren[pNode.pChildren.length - 1];
    if (pNode.sName !== RELATIONALEXPR || pNode.sName !== EQUALITYEXPR) {
        error("Something going wrong...in for cond");
        return;
    }
    this.analyzeExpr(pNode);
};
Effect.prototype.analyzeForStep = function (pNode) {
    if (pNode.pChildren) {
        pNode = pNode.pChildren[pNode.pChildren.length - 1];
    }
    if (pNode.sName !== POSTFIXEXPR || pNode.sName !== ASSIGNMENTEXPR) {
        error("Something going wrong... in for step");
        return;
    }
    this.analyzeExpr(pNode);
};
Effect.prototype.analyzeNonIfStmt = function (pNode) {
    var pChildren = pNode.pChildren;
    var i;
    if (pChildren.length === 1) {
        this.analyzeSimpleStmt(pChildren[0]);
    }
    else if (pChildren[pChildren.length - 1].sName === T_KW_WHILE) {
        //Stmt : T_KW_WHILE '(' Expr ')' Stmt
        this.pushCode("while");
        this.pushCode("(");
        this.analyzeExpr(pChildren[2]);
        this.pushCode(")");
        this.analyzeNonIfStmt(pChildren[0]);
    }
    else if (pChildren[pChildren.length - 1].sName === T_KW_FOR) {
        //Stmt : For '(' ForInit ForCond ForStep ')' Stmt
        this.pushCode("for");
        this.pushCode("(");
        this.newScope();
        this.analyzeForInit(pChildren[4]);
        this.analyzeForCond(pChildren[3]);
        this.analyzeForStep(pChildren[2]);
        this.pushCode(")");
        this.analyzeNonIfStmt(pChildren[0]);
        this.endScope();
    }
};
Effect.prototype.analyzeSimpleStmt = function (pNode) {
    var pChildren = pNode.pChildren;
    var pFunction = this._pCurrentFunction;
    var pCode;
    var i;
    this.newMemRead();
    if (pChildren[pChildren.length - 1].sValue === ";") {
        //SimpleStmt : ';' --AN
        return;
    }
    else if (pChildren[pChildren.length - 1].sValue === T_KW_RETURN && pChildren.length === 2) {
        //SimpleStmt : T_KW_RETURN ';'
//        if (this._pCodeVertex || this._pCodeFragment) {
//            error("So sad, but you can`t do this with us.");
//            return;
//        }
        if (!pFunction.pReturnType.isVoid() && pFunction instanceof EffectFunction) {
            if (pFunction.isVertexShader || pFunction.isFragmentShader) {
                throw ERRORBADFUNCTION;
            }
            else {
                error("It`s not JS, baby.");
                return;
            }
        }
        this.pushCode("return");
        this.pushCode(";");
    }
    else if (pChildren[pChildren.length - 1].sValue === T_KW_RETURN && pChildren.length === 3) {
        //SimpleStmt : T_KW_RETURN Expr ';'
        if (this._eFuncProperty === a.Effect.Func.FUNCTION) {
            this.pushCode("return");
            this.analyzeExpr(pChildren[1]);
            this.pushCode(";");
        }
        else if (this._eFuncProperty === a.Effect.Func.VERTEX) {
            if (pFunction.pReturnType.isBase()) {
                this.pushCode(pFunction.pReturnVariable);
                this.pushCode(".");
                this.pushCode(pFunction.sSementic);
                this.pushCode("=");
                this.analyzeExpr(pChildren[1]);
                this.pushCode(";");
                this.pushCode("return;");
            }
            else {
                var isWriteVar;
                this.pushCode("return;");
                this.newCode();
                isWriteVar = this._isWriteVar;
                this._isWriteVar = null;
                this.analyzeExpr(pChildren[1]);
                this._isWriteVar = isWriteVar;
                pCode = this._pCode;
                this.endCode();
                var isFlag = false;
                for (i = 0; i < pCode.length; i++) {
                    if (typeof(pCode[i]) !== "string") {
                        if (isFlag) {
                            error("This retur isn`t cool enough to work in vs");
                            return;
                        }
                        if (pCode[i] === pFunction.pReturnVariable) {
                            isFlag = true;
                        }
                        else {
                            error("On no, but you must to return 'Out'");
                            return;
                        }
                    }
                }
            }
        }
        else if (this._eFuncProperty === a.Effect.Func.FRAGMENT) {
            this.pushCode("gl_FragColor=(");
            this.analyzeExpr(pChildren[1]);
            if (!this._pExprType.isEqual(this.hasType("float4"))) {
                error("For fragment shader return type must be float4");
                return;
            }
            this.pushCode(");");
            this.pushCode("return;");
        }
        else {
            error("I don`t now how i get here");
            return;
        }
    }
    else if (pChildren[pChildren.length - 1].sName === T_KW_DO) {
        //SimpleStmt : T_KW_DO Stmt T_KW_WHILE '(' Expr ')' ';'
        this.pushCode("do");
        this.analyzeStmt(pChildren[5]);
        this.pushCode("while");
        this.pushCode("(");
        this.analyzeExpr(pChildren[2]);
        this.pushCode(")");
        this.pushCode(";");
    }
    else if (pChildren[pChildren.length - 1].sName === STATEBLOCK) {
        //SimpleStmt : StmtBlock
        this.analyzeStmtBlock(pChildren[pChildren.length - 1]);
    }
    else if (pChildren[pChildren.length - 1].sName === T_KW_DISCARD) {
        //SimpleStmt : T_KW_DISCARD ';'
        this.pushCode("discard");
        this.pushCode(";");
    }
    else if (pChildren[pChildren.length - 1].sName === TYPEDECL) {
        //SimpleStmt : TypeDecl
        this.analyzeTypeDecl(pChildren[0]);
    }
    else if (pChildren[pChildren.length - 1].sName === VARIABLEDECL) {
        //SimpleStmt : VariableDecl
        this.analyzeVariableDecl(pChildren[0]);
    }
    else if (pChildren[pChildren.length - 1].sName === VARSTRUCTDECL) {
        //SimpleStmt : VarStructDecl
        this.analyzeVarStructDecl(pChildren[0]);
    }
    else {
        //SimpleStmt : Expr ';'
        this.analyzeExpr(pChildren[pChildren.length - 1]);
        this.pushCode(";");
    }
    if (this._pMemReadVars.length) {
        //TODO: add memread blocks
        console.log("MemRead vars", this._pMemReadVars, this._pCurrentFunction);
    }
    this.endMemRead();
};

Effect.prototype.analyzeParamList = function (pNode, pFunction) {
    var pChildren = pNode.pChildren;
    var i;
    var pVar;
    pFunction.pParameters = {};
    for (i = pChildren.length - 2; i >= 1; i--) {
        if (pChildren[i].sName === PARAMETERDECL) {
            pVar = this.analyzeParameterDecl(pChildren[i]);
            if (!pVar.checkMe()) {
                error("You sucks 2");
                return;
            }
            pFunction.addParameter(pVar);
        }
    }
    return pFunction;
};
Effect.prototype.analyzeParameterDecl = function (pNode) {
    var pChildren = pNode.pChildren;
    var pVar = new EffectVariable();
    pVar.setType(this.analyzeParamUsageType(pChildren[1]));
    if (!pVar.pType.checkMe(PARAMETRUSAGE)) {
        error("You sucks 2");
        return;
    }
    pVar = this.analyzeVariable(pChildren[0], pVar);
    return pVar;
};
Effect.prototype.analyzeParamUsageType = function (pNode, pType) {
    pType = pType || new VariableType();
    var pChildren = pNode.pChildren;
    var i;
    for (i = pChildren.length - 1; i >= 0; i--) {
        if (pChildren[i].sName === TYPE) {
            pType.setType(this.convertType(pChildren[i]));
        }
        if (pChildren[i].sName === PARAMUSAGE) {
            pType.setUsage(pChildren[i].pChildren[0].sValue);
        }
    }
    return pType;
};
Effect.prototype.analyzeVarStructDecl = function (pNode) {
    var pChildren = pNode.pChildren;
    var i;
    var pVar;
    var pType = this.analyzeUsageStructDecl(pChildren[pChildren.length - 1]);
    this._pCurrentType = pType;
    for (i = pChildren.length - 2; i >= 0; i--) {
        if (pChildren[i].sName === VARIABLE) {
            pVar = this.analyzeVariable(pChildren[i]);
            pVar.setType(pType);
            this.addVariableDecl(pVar);
        }
    }
    this._pCurrentType = null;
    pNode.pAnalyzed = true;
};
Effect.prototype.analyzeUsageStructDecl = function (pNode, pType) {
    pType = pType || new VariableType();
    var pChildren = pNode.pChildren;
    var i;
    for (i = pChildren.length - 1; i >= 1; i--) {
        pType.setUsage(pChildren[i].pChildren[0].sValue);
    }
    var pEffectType = new EffectType();
    pEffectType.fromStruct(this.analyzeStructDecl(pChildren[0]));
    this.addType(pEffectType);
    pType.setType(pEffectType);

    return pType;
};
Effect.prototype.analyzeTechniqueDecl = function (pNode) {
    var pChildren = pNode.pChildren;
    var i = 0;
    var pTech = new EffectTechnique();
    pTech.setName(this.analyzeComplexName(pChildren[pChildren.length - 2]));
    for (i = pChildren.length - 3; i >= 0; i--) {
        if (pChildren[i].sName === ANNOTATION) {
            this.analyzeAnnotation(pChildren[i], pTech);
        }
        else if (pChildren[i].sName === SEMANTIC) {
            this.analyzeSemantic(pChildren[i], pTech);
        }
        else {
            this.analyzeTechniqueBody(pChildren[i], pTech);
        }
    }
    this.addTechnique(pTech);
    pNode.pAnalyzed = pTech;
    return pTech;
};
Effect.prototype.addTechnique = function (pTechnique) {
    this.pTechiques[pTechnique.sName] = pTechnique;
};
Effect.prototype.analyzeTechniqueBody = function (pNode, pTechnique) {
    var pChildren = pNode.pChildren;
    var i;
    var pPass;
    for (i = pChildren.length - 2; i >= 1; i--) {
        pPass = this.analyzePassDecl(pChildren[i]);
        if (!pPass) {
            continue;
        }
        if (!pPass.checkMe()) {
            error("something bad with your pass");
        }
        pTechnique.addPass(pPass);
    }
    return pTechnique;
};
Effect.prototype.analyzePassDecl = function (pNode, pPass) {
    var pChildren = pNode.pChildren;
    var i = 0;
    if (pChildren.length === 1) {
        if (pChildren[0].sName === IMPORTDECL) {
            this.analyzeImportDecl(pChildren[0]);
        }
        return;
    }
    pPass = pPass || new EffectPass();
    if (pChildren[pChildren.length - 2].sName === T_NON_TYPE_ID ||
        pChildren[pChildren.length - 2].sName === T_TYPE_ID) {
        pPass.setName(pChildren[pChildren.length - 2].sValue);
    }
    if (pChildren[1].sName === ANNOTATION) {
        this.analyzeAnnotation(pChildren[1], pPass);
    }
    this._pCurrentPass = pPass;
    this.analyzePassStateBlock(pChildren[0], pPass);
    this._pCurrentPass = null;
    pPass.finalize();
    return pPass;
};
Effect.prototype.analyzePassStateBlock = function (pNode, pPass) {
    var pChildren = pNode.pChildren;
    var i;
    if (pPass.isComplex) {
        pPass.pushCode("{");
    }
    for (i = pChildren.length - 2; i >= 1; i--) {
        this.analyzePassState(pChildren[i], pPass);
    }
    if (pPass.isComplex) {
        pPass.pushCode("}");
    }
};
Effect.prototype.analyzePassState = function (pNode, pPass) {
    var pChildren = pNode.pChildren;
    var i;
    var eState = null;
    if (pChildren.length === 1) {
        if (pChildren[0].sName === STATEIF) {
            this.analyzeStateIf(pChildren[0], pPass);
        }
        else {
            this.analyzeStateSwitch(pChildren[0], pPass)
        }
        return;
    }
    if (pChildren[pChildren.length - 2].sName === STATEINDEX) {
        error("don`t very bad for state");
        return;
    }
    var pStateExpr = pChildren[pChildren.length - 3];
    var pExpr = pStateExpr.pChildren[pStateExpr.pChildren.length - 1];
    var sType = pChildren[pChildren.length - 1].sValue.toUpperCase();
    var isVertex = false;
    var isPixel = false;

    switch (sType) {
        case 'ZENABLE':
            eState = a.renderStateType.ZENABLE;
            break;
        case 'ZWRITEENABLE':
            eState = a.renderStateType.ZWRITEENABLE;
            break;
        case 'SRCBLEND':
            eState = a.renderStateType.SRCBLEND;
            break;
        case 'DESTBLEND':
            eState = a.renderStateType.DESTBLEND;
            break;
        case 'CULLMODE':
            eState = a.renderStateType.CULLMODE;
            break;
        case 'ZFUNC':
            eState = a.renderStateType.ZFUNC;
            break;
        case 'DITHERENABLE':
            eState = a.renderStateType.DITHERENABLE;
            break;
        case 'ALPHABLENDENABLE':
            eState = a.renderStateType.ALPHABLENDENABLE;
            break;
        case 'ALPHATESTENABLE':
            eState = a.renderStateType.ALPHATESTENABLE;
            break;
        case 'VERTEXSHADER':
            isVertex = true;
            break;
        case 'PIXELSHADER' :
            isPixel = true;
            break;
        default:
            error('Unsupported render state type used: ' + sType + '. WebGl...');
            eState = null;
            return pPass;
    }
    if (isVertex || isPixel) {
        if (pExpr.sName !== OBJECTEXPR) {
            error("Bad compile state. I don`t know what bad, but something exactly going wrong.");
            return;
        }
        var pFunc = this.analyzeExpr(pExpr);
        var pParam;
        var isInput = undefined;
        if (isVertex) {
            pPass.setJSVertexShader(pFunc);
            pFunc.isVertexShader = true;
            for (i = 0; i < pFunc.pParamOrders.length; i++) {
                pParam = pFunc.pParamOrders[i];
                if (pParam.isUniform === false) {
                    pParam.setMixible();
                }
                if (!pParam.sSemantic && pParam.isUniform === false) {
                    if (isInput === false) {
                        error("You cannot use attribute in struct and attrib as paramters");
                        return;
                    }
                    isInput = true;
                    pParam.setVSInput();
                    pFunc.pMainInputVar = pParam;
                    continue;
                }
                if (pParam.sSemantic && pParam.isUniform === false) {
                    if (isInput === true) {
                        error("You cannot use attribute in struct and attrib as paramters");
                        return;
                    }
                    isInput = false;
                    continue;
                }
            }
            if (pFunc.pReturnType.pEffectType.pDesc) {
                pFunc.pReturnType.setMixible();
            }
        }
        else {
            pPass.setJSFragmentShader(pFunc);
            pFunc.isFragmentShader = true;
            for (i = 0; i < pFunc.pParamOrders.length; i++) {
                pParam = pFunc.pParamOrders[i];
                if (pParam.isUniform === false) {
                    pParam.setMixible();
                    if (isInput === true) {
                        error("You should put all varyings in one struct");
                        return;
                    }
                    isInput = true;
                    pParam.setFSInput();
                    pFunc.pMainInputVar = pParam;
                }
            }
        }
        return pPass;
    }
    if (pExpr.sValue === "{" || pExpr.sValue === "<" ||
        pExpr.sValue === undefined) {
        error("Too difficult for webgl");
    }
    var sValue = pExpr.sValue.toUpperCase();
    var eValue;
    //function fnRenderStateValueFromString(eState, sValue) {
    switch (eState) {
        case a.renderStateType.ALPHABLENDENABLE:
        case a.renderStateType.ALPHATESTENABLE:
            warning('ALPHABLENDENABLE/ALPHATESTENABLE not supported in WebGL.');
        case a.renderStateType.DITHERENABLE:
        case a.renderStateType.ZENABLE:
        case a.renderStateType.ZWRITEENABLE:
            switch (sValue) {
                case 'TRUE':
                    eValue = true;
                    break;
                case 'FALSE':
                    eValue = false;
                    break;
                default:
                    error('Unsupported render state ALPHABLENDENABLE/ZENABLE/ZWRITEENABLE/DITHERENABLE value used: '
                              + sValue + '.');
                    eValue = null;
            }
            break;
        case a.renderStateType.SRCBLEND:
        case a.renderStateType.DESTBLEND:
            switch (sValue) {
                case 'ZERO':
                    eValue = a.BLEND.ZERO;
                    break;
                case 'ONE':
                    eValue = a.BLEND.ONE;
                    break;
                case 'SRCCOLOR':
                    eValue = a.BLEND.SRCCOLOR;
                    break;
                case 'INVSRCCOLOR':
                    eValue = a.BLEND.INVSRCCOLOR;
                    break;
                case 'SRCALPHA':
                    eValue = a.BLEND.SRCALPHA;
                    break;
                case 'INVSRCALPHA':
                    eValue = a.BLEND.INVSRCALPHA;
                    break;
                case 'DESTALPHA':
                    eValue = a.BLEND.DESTALPHA;
                    break;
                case 'INVDESTALPHA':
                    eValue = a.BLEND.INVDESTALPHA;
                    break;
                case 'DESTCOLOR':
                    eValue = a.BLEND.DESTCOLOR;
                    break;
                case 'INVDESTCOLOR':
                    eValue = a.BLEND.INVDESTCOLOR;
                    break;
                case 'SRCALPHASAT':
                    eValue = a.BLEND.SRCALPHASAT;
                    break;
                default:
                    error('Unsupported render state SRCBLEND/DESTBLEND value used: ' + sValue + '.');
                    eValue = null;
            }
            break;
        case a.renderStateType.CULLMODE:
            switch (sValue) {
                case 'NONE':
                    eValue = a.CULLMODE.NONE;
                    break;
                case 'CW':
                    eValue = a.CULLMODE.CW;
                    break;
                case 'CCW':
                    eValue = a.CULLMODE.CCW;
                    break;
                case 'FRONT_AND_BACK':
                    eValue = a.CULLMODE.FRONT_AND_BACK;
                    break;
                default:
                    error('Unsupported render state SRCBLEND/DESTBLEND value used: ' + sValue + '.');
                    eValue = null;
            }
            break;
        case a.renderStateType.ZFUNC:
            switch (sValue) {
                case 'NEVER':
                    eValue = a.CMPFUNC.NEVER;
                    break;
                case 'LESS':
                    eValue = a.CMPFUNC.LESS;
                    break;
                case 'EQUAL':
                    eValue = a.CMPFUNC.EQUAL;
                    break;
                case 'LESSEQUAL':
                    eValue = a.CMPFUNC.LESSEQUAL;
                    break;
                case 'GREATER':
                    eValue = a.CMPFUNC.GREATER;
                    break;
                case 'NOTEQUAL':
                    eValue = a.CMPFUNC.NOTEQUAL;
                    break;
                case 'GREATEREQUAL':
                    eValue = a.CMPFUNC.GREATEREQUAL;
                    break;
                case 'ALWAYS':
                    eValue = a.CMPFUNC.ALWAYS;
                    break;
                default:
                    error('Unsupported render state ZFUNC value used: ' +
                          sValue + '.');
                    eValue = null;
            }
            break;
    }

    pPass.setJSState(eState, eValue);
    return pPass;
};
Effect.prototype.analyzeStateIf = function (pNode, pPass) {
    var pChildren = pNode.pChildren;
    var pCode;
    var i;
    pPass.isComplex = true;
    pPass.pushCode("if(");
    this.newCode();
    this.analyzeExpr(pChildren[4]);
    pCode = this._pCode;
    this.endCode();
    for (i = 0; i < pCode.length; i++) {
        pPass.pushCode(pCode[i]);
    }
    pPass.pushCode(")");
    this.analyzePassStateBlock(pChildren[2], pPass);
    pPass.pushCode("else");
    if (pChildren[0].sName === STATEIF) {
        this.analyzeStateIf(pChildren[0], pPass);
    }
    else {
        this.analyzePassStateBlock(pChildren[0], pPass);
    }
};
Effect.prototype.analyzeStateSwitch = function (pNode, pPass) {
    var pChildren = pNode.pChildren;
    var pCode;
    var i;
    pPass.isComplex = true;
    pPass.pushCode("switch(");
    this.newCode();
    this.analyzeExpr(pNode);
    pCode = this._pCode;
    this.endCode();
    for (i = 0; i < pCode.length; i++) {
        pPass.pushCode(pCode[i]);
    }
    pPass.pushCode(")");
    this.analyzeCaseBlock(pChildren[0], pPass);
};
Effect.prototype.analyzeCaseBlock = function (pNode, pPass) {
    var pChildren = pNode.pChildren;
    var i;
    pPass.pushCode("{");
    for (i = 0; i < pChildren.length; i++) {
        if (pChildren[i].sName === CASESTATE) {
            this.analyzeCaseState(pChildren[i], pPass);
        }
        else {
            this.analyzeDefaultState(pChildren[i], pPass);
        }
    }
    pPass.pushCode("}");
};
Effect.prototype.analyzeCaseState = function (pNode, pPass) {
    var pChildren = pNode.pChildren;
    var pCode;
    var i;
    pPass.pushCode("case ");
    this.newCode();
    this.analyzeExpr(pChildren[pChildren.length - 2]);
    pCode = this._pCode;
    this.endCode();
    for (i = 0; i < pCode.length; i++) {
        pPass.pushCode(pCode[i]);
    }
    pPass.pushCode(":");
    for (i = pChildren.length - 4; i >= 0; i--) {
        if (pChildren[i].sName === PASSSTATE) {
            this.analyzePassState(pChildren[i], pPass);
        }
        else {
            pPass.pushCode(pChildren[i].sValue);
        }
    }
};
Effect.prototype.analyzeDefaultState = function (pNode, pPass) {
    var pChildren = pNode.pChildren;
    var i;
    pPass.pushCode("default:");
    for (i = pChildren.length - 3; i >= 0; i--) {
        if (pChildren[i].sName === PASSSTATE) {
            this.analyzePassState(pChildren[i], pPass);
        }
        else {
            pPass.pushCode(pChildren[i].sValue);
        }
    }
};
Effect.prototype.analyzeStateBlock = function (pNode, pVar) {
    var pChildren = pNode.pChildren;
    var i;
    for (i = pChildren.length - 2; i >= 1; i--) {
        this.analyzeState(pChildren[i], pVar);
    }
};
Effect.prototype.analyzeState = function (pNode, pPass) {
    var pChildren = pNode.pChildren;
    var i;
    var eState = null;
    if (pChildren[pChildren.length - 2].sName === STATEINDEX) {
        error("don`t very bad for state");
        return;
    }
    var pStateExpr = pChildren[pChildren.length - 3];
    var pExpr = pStateExpr.pChildren[pStateExpr.pChildren.length - 1];
    var sType = pChildren[pChildren.length - 1].sValue.toUpperCase();
    var isTexture = false;
    switch (sType) {
        case "TEXTURE" :
            isTexture = true;
            break;
        case "ADDRESSU":
            eState = "ADDRESSU";
            break;
        case "ADDRESSV":
            eState = "ADDRESSV";
            break;
        case "ADDRESSW":
            eState = "ADDRESSW";
            break;
        case "BORDERCOLOR":
            eState = "BORDERCOLOR";
            break;
        case "MAGFILTER":
            eState = "MAGFILTER";
            break;
        case "MAXANISOTROPY":
            eState = "MAXANISOTROPY";
            break;
        case "MAXMIPLEVEL":
            eState = "MAXMIPLEVEL";
            break;
        case "MINFILTER":
            eState = "MINFILTER";
            break;
        case "MIPFILTER":
            eState = "MIPFILTER";
            break;
        case "MIPMAPLODBIAS":
            eState = "MIPMAPLODBIAS";
            break;
        default:
            error("Oh no, but it is error " + sType);
            return;
    }
    if (isTexture) {
        var pTexture;
        if (pExpr.sValue === "{" || pExpr.sValue === undefined ||
            pStateExpr.pChildren[1].sName !== T_NON_TYPE_ID) {
            error("Wrong wrong");
            return;
        }
        pTexture = this.hasVariable(pStateExpr.pChildren[1].sValue);
        if (!pTexture) {
            console.log(pStateExpr);
            error("bad with texture name");
            return;
        }
        this._pCurrentVar.setTexture(pTexture);
        return;
    }
    //TODO: add sampler valid tests
    this._pCurrentVar.setState(eState, pExpr.sValue);
    return;
};
Effect.prototype.analyzeComplexName = function (pNode) {
    var pChildren = pNode.pChildren;
    var sName = "";
    var i;
    for (i = 0; i < pChildren.length; i++) {
        if (pChildren[i].sValue === undefined) {
            error("something are very bad with you 10");
            return;
        }
        sName += pChildren[i].sValue;
    }
    return sName;
};
Effect.prototype.analyzeImportDecl = function (pNode) {
    //TODO: analyzeImportDecl
    error("analyzeImportDecl---> TODO me, please");
    return;
};
Effect.prototype.analyzeProvideDecl = function (pNode) {
    //TODO: analyzeProvideDecl
    error("analyzeProvideDecl---> TODO me, please");
    return;
};