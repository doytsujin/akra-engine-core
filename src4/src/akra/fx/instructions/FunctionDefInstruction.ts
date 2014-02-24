/// <reference path="../../idl/EEffectErrors.ts" />

/// <reference path="DeclInstruction.ts" />
/// <reference path="../Effect.ts" />

module akra.fx.instructions {

    /**
     * Represent type func(...args)[:Semantic]
     * EMPTY_OPERTOR VariableTypeInstruction IdInstruction VarDeclInstruction ... VarDeclInstruction
     */
    export class FunctionDefInstruction extends DeclInstruction {
        private _pParameterList: IAFXVariableDeclInstruction[] = null;
        private _pParamListForShaderCompile: IAFXVariableDeclInstruction[] = null;
        private _pParamListForShaderInput: IAFXVariableDeclInstruction[] = null;
        private _isComplexShaderInput: boolean = false;

        private _pReturnType: IAFXVariableTypeInstruction = null;
        private _pFunctionName: IAFXIdInstruction = null;
        private _nParamsNeeded: uint = 0;
        private _sDefinition: string = "";
        private _isAnalyzedForVertexUsage: boolean = false;
        private _isAnalyzedForPixelUsage: boolean = false;
        private _bCanUsedAsFunction: boolean = true;

        private _bShaderDef: boolean = false;

        //private _sHash: string = "";

        constructor() {
            super();
            this._pInstructionList = null;
            this._pParameterList = [];
            this._eInstructionType = EAFXInstructionTypes.k_FunctionDefInstruction;
        }

        _toFinalCode(): string {
            var sCode: string = "";

            if (!this.isShaderDef()) {

                sCode += this._pReturnType._toFinalCode();
                sCode += " " + this._pFunctionName._toFinalCode();
                sCode += "(";

                for (var i: uint = 0; i < this._pParameterList.length; i++) {
                    sCode += this._pParameterList[i]._toFinalCode();

                    if (i !== this._pParameterList.length - 1) {
                        sCode += ",";
                    }
                }

                sCode += ")";
            }
            else {
                sCode = "void " + this._pFunctionName._toFinalCode() + "()";
            }

            return sCode;
        }

        setType(pType: IAFXTypeInstruction): void {
            this.setReturnType(<IAFXVariableTypeInstruction>pType);
        }

        getType(): IAFXTypeInstruction {
            return <IAFXTypeInstruction>this.getReturnType();
        }

        setReturnType(pReturnType: IAFXVariableTypeInstruction): boolean {
            this._pReturnType = pReturnType;
            pReturnType._setParent(this);
            return true;
        }
        getReturnType(): IAFXVariableTypeInstruction {
            return this._pReturnType;
        }

        setFunctionName(pNameId: IAFXIdInstruction): boolean {
            this._pFunctionName = pNameId;
            pNameId._setParent(this);
            return true;
        }

        getName(): string {
            return this._pFunctionName.getName();
        }

        getRealName(): string {
            return this._pFunctionName.getRealName();
        }

        getNameId(): IAFXIdInstruction {
            return this._pFunctionName;
        }

        getArguments(): IAFXVariableDeclInstruction[] {
            return this._pParameterList;
        }

        getNumNeededArguments(): uint {
            return this._nParamsNeeded;
        }

        markAsShaderDef(isShaderDef: boolean): void {
            this._bShaderDef = isShaderDef;
        }

        isShaderDef(): boolean {
            return this._bShaderDef;
        }

        addParameter(pParameter: IAFXVariableDeclInstruction, isStrictModeOn?: boolean): boolean {
            if (this._pParameterList.length > this._nParamsNeeded &&
                !pParameter.hasInitializer()) {

                this._setError(EEffectErrors.BAD_FUNCTION_PARAMETER_DEFENITION_NEED_DEFAULT,
                    {
                        funcName: this._pFunctionName.getName(),
                        varName: pParameter.getName()
                    });
                return false;
            }

            var pParameterType: IAFXVariableTypeInstruction = pParameter.getType();

            if (pParameterType._isPointer() || pParameterType._containPointer()) {
                if (pParameterType.hasUsage("uniform") ||
                    pParameterType.hasUsage("out") ||
                    pParameterType.hasUsage("inout")) {

                    this._setError(EEffectErrors.BAD_FUNCTION_PARAMETER_USAGE,
                        {
                            funcName: this._pFunctionName.getName(),
                            varName: pParameter.getName()
                        });
                    return false;
                }

                this._isAnalyzedForVertexUsage = false;
                this._isAnalyzedForPixelUsage = true;

                this._setForPixel(false);
                this._bCanUsedAsFunction = false;
                pParameterType._setVideoBufferInDepth();
            }
            else if (!isStrictModeOn) {

                if (pParameterType._isComplex() &&
                    !pParameterType._hasFieldWithoutSemantic() &&
                    pParameterType._hasAllUniqueSemantics()) {

                    if (pParameter.getSemantic() === "" &&
                        pParameterType._hasAllUniqueSemantics() &&
                        !pParameterType._hasFieldWithoutSemantic()) {

                        pParameterType._addPointIndexInDepth();
                    }
                    else {
                        pParameterType.addPointIndex(false);
                        pParameterType._setVideoBufferInDepth();
                    }
                }
                else if (pParameter.getSemantic() !== "") {
                    pParameterType.addPointIndex(false);
                    pParameterType._setVideoBufferInDepth();
                }
            }

            this._pParameterList.push(pParameter);
            pParameter._setParent(this);

            if (!pParameter.hasInitializer()) {
                this._nParamsNeeded++;
            }

            return true;
        }

        getParameListForShaderInput(): IAFXVariableDeclInstruction[] {
            return this._pParamListForShaderInput;
        }

        isComplexShaderInput(): boolean {
            return this._isComplexShaderInput;
        }

        _clone(pRelationMap: IAFXInstructionMap = <IAFXInstructionMap>{}): FunctionDefInstruction {
            var pClone: FunctionDefInstruction = <FunctionDefInstruction>super._clone(pRelationMap);

            pClone.setFunctionName(<IAFXIdInstruction>this._pFunctionName._clone(pRelationMap));
            pClone.setReturnType(<IAFXVariableTypeInstruction>this.getReturnType()._clone(pRelationMap));

            for (var i: uint = 0; i < this._pParameterList.length; i++) {
                pClone.addParameter(this._pParameterList[i]._clone(pRelationMap));
            }

            var pShaderParams: IAFXVariableDeclInstruction[] = [];
            for (var i: uint = 0; i < this._pParamListForShaderInput.length; i++) {
                pShaderParams.push(this._pParamListForShaderInput[i]._clone(pRelationMap));
            }

            pClone._setShaderParams(pShaderParams, this._isComplexShaderInput);
            pClone._setAnalyzedInfo(this._isAnalyzedForVertexUsage,
                this._isAnalyzedForPixelUsage,
                this._bCanUsedAsFunction);

            return pClone;
        }

        _setShaderParams(pParamList: IAFXVariableDeclInstruction[], isComplexInput: boolean): void {
            this._pParamListForShaderInput = pParamList;
            this._isComplexShaderInput = isComplexInput;
        }

        _setAnalyzedInfo(isAnalyzedForVertexUsage: boolean,
            isAnalyzedForPixelUsage: boolean,
            bCanUsedAsFunction: boolean): void {
            this._isAnalyzedForVertexUsage = isAnalyzedForVertexUsage;
            this._isAnalyzedForPixelUsage = isAnalyzedForPixelUsage;
            this._bCanUsedAsFunction = bCanUsedAsFunction;
        }

        _getStringDef(): string {
            if (this._sDefinition === "") {
                this._sDefinition = this._pReturnType._getHash() + " " + this.getName() + "(";

                for (var i: uint = 0; i < this._pParameterList.length; i++) {
                    this._sDefinition += this._pParameterList[i].getType()._getHash() + ",";
                }

                this._sDefinition += ")";
            }

            return this._sDefinition;
        }

        _canUsedAsFunction(): boolean {
            return this._bCanUsedAsFunction;
        }

        _checkForVertexUsage(): boolean {
            if (this._isAnalyzedForVertexUsage) {
                return this._isForVertex();
            }

            this._isAnalyzedForVertexUsage = true;

            var isGood: boolean = true;

            isGood = this.checkReturnTypeForVertexUsage();
            if (!isGood) {
                this._setForVertex(false);
                return false;
            }

            isGood = this.checkArgumentsForVertexUsage();
            if (!isGood) {
                this._setForVertex(false);
                return false;
            }

            this._setForVertex(true);

            return true;
        }

        _checkForPixelUsage(): boolean {
            if (this._isAnalyzedForPixelUsage) {
                return this._isForPixel();
            }

            this._isAnalyzedForPixelUsage = true;

            var isGood: boolean = true;

            isGood = this.checkReturnTypeForPixelUsage();
            if (!isGood) {
                this._setForPixel(false);
                return false;
            }

            isGood = this.checkArgumentsForPixelUsage();
            if (!isGood) {
                this._setForPixel(false);
                return false;
            }

            this._setForPixel(true);

            return true;
        }

        private checkReturnTypeForVertexUsage(): boolean {
            var pReturnType: IAFXVariableTypeInstruction = this._pReturnType;
            var isGood: boolean = true;

            if (pReturnType._isEqual(Effect.getSystemType("void"))) {
                return true;
            }

            if (pReturnType._isComplex()) {
                isGood = !pReturnType._hasFieldWithoutSemantic();
                if (!isGood) {
                    return false;
                }

                isGood = pReturnType._hasAllUniqueSemantics();
                if (!isGood) {
                    return false;
                }

                // isGood = pReturnType._hasFieldWithSematic("POSITION");
                // if(!isGood){
                // 	return false;
                // }

                isGood = !pReturnType._containSampler();
                if (!isGood) {
                    return false;
                }

                isGood = !pReturnType._containPointer() && !pReturnType._isPointer();
                if (!isGood) {
                    return false;
                }

                isGood = !pReturnType._containComplexType();
                if (!isGood) {
                    return false;
                }

                return true;
            }
            else {
                isGood = pReturnType._isEqual(Effect.getSystemType("float4"));
                if (!isGood) {
                    return false;
                }

                isGood = (this.getSemantic() === "POSITION");
                if (!isGood) {
                    return false;
                }

                return true;
            }
        }

        private checkReturnTypeForPixelUsage(): boolean {
            var pReturnType: IAFXVariableTypeInstruction = this._pReturnType;
            var isGood: boolean = true;

            if (pReturnType._isEqual(Effect.getSystemType("void"))) {
                return true;
            }

            isGood = pReturnType._isBase();
            if (!isGood) {
                return false;
            }

            isGood = pReturnType._isEqual(Effect.getSystemType("float4"));
            if (!isGood) {
                return false;
            }

            isGood = this.getSemantic() === "COLOR";
            if (!isGood) {
                return false;
            }

            return true;
        }

        private checkArgumentsForVertexUsage(): boolean {
            var pArguments: IAFXVariableDeclInstruction[] = this._pParameterList;
            var isAttributeByStruct: boolean = false;
            var isAttributeByParams: boolean = false;
            var isStartAnalyze: boolean = false;

            this._pParamListForShaderInput = [];
            this._pParamListForShaderCompile = [];

            for (var i: uint = 0; i < pArguments.length; i++) {
                var pParam: IAFXVariableDeclInstruction = pArguments[i];

                if (pParam.isUniform()) {
                    this._pParamListForShaderCompile.push(pParam);
                    continue;
                }

                if (!isStartAnalyze) {
                    if (pParam.getSemantic() === "") {
                        if (pParam.getType()._isBase() ||
                            pParam.getType()._hasFieldWithoutSemantic() ||
                            !pParam.getType()._hasAllUniqueSemantics()) {
                            return false;
                        }

                        isAttributeByStruct = true;
                    }
                    else if (pParam.getSemantic() !== "") {
                        if (pParam.getType()._isComplex() &&
                            (pParam.getType()._hasFieldWithoutSemantic() ||
                            !pParam.getType()._hasAllUniqueSemantics())) {
                            return false;
                        }

                        isAttributeByParams = true;
                    }

                    isStartAnalyze = true;
                }
                else if (isAttributeByStruct) {
                    return false;
                }
                else if (isAttributeByParams) {
                    if (pParam.getSemantic() === "") {
                        return false;
                    }

                    if (pParam.getType()._isComplex() &&
                        (pParam.getType()._hasFieldWithoutSemantic() ||
                        !pParam.getType()._hasAllUniqueSemantics())) {
                        return false;
                    }
                }

                this._pParamListForShaderInput.push(pParam);
            }

            if (isAttributeByStruct) {
                this._isComplexShaderInput = true;
            }

            return true;
        }

        private checkArgumentsForPixelUsage(): boolean {
            var pArguments: IAFXVariableDeclInstruction[] = this._pParameterList;
            var isVaryingsByStruct: boolean = false;
            var isVaryingsByParams: boolean = false;
            var isStartAnalyze: boolean = false;

            this._pParamListForShaderInput = [];
            this._pParamListForShaderCompile = [];

            for (var i: uint = 0; i < pArguments.length; i++) {
                var pParam: IAFXVariableDeclInstruction = pArguments[i];

                if (pParam.isUniform()) {
                    this._pParamListForShaderCompile.push(pParam);
                    continue;
                }

                if (!isStartAnalyze) {
                    if (pParam.getSemantic() === "") {
                        if (pParam.getType()._isBase() ||
                            pParam.getType()._hasFieldWithoutSemantic() ||
                            !pParam.getType()._hasAllUniqueSemantics() ||
                            pParam.getType()._containSampler() ||
                            pParam.getType()._containPointer() ||
                            pParam.getType()._isPointer()) {
                            return false;
                        }

                        isVaryingsByStruct = true;
                    }
                    else if (pParam.getSemantic() !== "") {
                        if (pParam.getType()._isStrictPointer() ||
                            pParam.getType()._containPointer() ||
                            pParam.getType()._containSampler() ||
                            Effect.isSamplerType(pParam.getType())) {
                            //LOG(2, pParam.getType()._isPointer(),
                            //    pParam.getType()._containPointer(),
                            //    pParam.getType()._containSampler(),
                            //    Effect.isSamplerType(pParam.getType()));
                            return false;
                        }

                        if (pParam.getType()._isComplex() &&
                            (pParam.getType()._hasFieldWithoutSemantic() ||
                            !pParam.getType()._hasAllUniqueSemantics())) {
                            return false;
                        }

                        isVaryingsByParams = true;
                    }

                    isStartAnalyze = true;
                }
                else if (isVaryingsByStruct) {
                    return false;
                }
                else if (isVaryingsByParams) {
                    if (pParam.getSemantic() === "") {
                        return false;
                    }

                    if (pParam.getType()._isStrictPointer() ||
                        pParam.getType()._containPointer() ||
                        pParam.getType()._containSampler() ||
                        Effect.isSamplerType(pParam.getType())) {
                        return false;
                    }

                    if (pParam.getType()._isComplex() &&
                        (pParam.getType()._hasFieldWithoutSemantic() ||
                        !pParam.getType()._hasAllUniqueSemantics())) {
                        return false;
                    }
                }

                this._pParamListForShaderInput.push(pParam);
            }

            if (isVaryingsByStruct) {
                this._isComplexShaderInput = true;
            }

            return true;
        }
        // _getHash(): string {
        // 	if(this._sHash === "") {
        // 		this.calcHash();
        // 	}

        // 	return this._sHash;
        // }

        // private calcHash(): void {
        // 	var sHash: string = "";
        // 	sHash = this._pFunctionName._getName();
        // 	sHash += "(";

        // 	for(var i: uint = 0; i < this._pParameterList.length; i++){
        // 		sHash += this._pParameterList[i]
        // 	}

        // }
    }
}