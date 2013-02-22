#ifndef IAFXINSTRUCTION_TS
#define IAFXINSTRUCTION_TS

#include "common.ts"
#include "IParser.ts"

module akra {

    export enum EAFXInstructionTypes {
        k_Instruction = 0,
        k_InstructionCollector,
        k_SimpleInstruction,
        k_VariableTypeInstruction,
        k_SystemTypeInstruction,
        k_ComplexTypeInstruction,
        k_TypedInstruction,
        k_DeclInstruction,
        k_IntInstruction,
        k_FloatInstruction,
        k_BoolInstruction,
        k_StringInstruction,
        k_IdInstruction,
        k_KeywordInstruction,
        k_TypeDeclInstruction,
        k_VariableDeclInstruction,
        k_AnnotationInstruction,
        k_UsageTypeInstruction,
        k_BaseTypeInstruction,
        k_StructDeclInstruction,
        k_StructFieldsInstruction,
        k_ExprInstruction,
        k_IdExprInstruction,
        k_ArithmeticExprInstruction,
        k_AssignmentExprInstruction,
        k_RelationalExprInstruction,
        k_LogicalExprInstruction,
        k_ConditionalExprInstruction,
        k_CastExprInstruction,
        k_UnaryExprInstruction,
        k_PostfixIndexInstruction,
        k_PostfixPointInstruction,
        k_PostfixArithmeticInstruction,
        k_PrimaryExprInstruction,
        k_ComplexExprInstruction,
        k_FunctionCallInstruction,
        k_SystemCallInstruction,
        k_ConstructorCallInstruction,
        k_CompileExprInstruction,
        k_SamplerStateBlockInstruction,
        k_SamplerStateInstruction,
        k_MemExprInstruction,
        k_FunctionDeclInstruction,
        k_ShaderFunctionInstruction,
        k_SystemFunctionInstruction,
        k_FunctionDefInstruction,
        k_StmtInstruction,
        k_StmtBlockInstruction,
        k_ExprStmtInstruction,
        k_BreakStmtInstruction,
        k_WhileStmtInstruction,
        k_ForStmtInstruction,
        k_IfStmtInstruction,
        k_DeclStmtInstruction,
        k_ReturnStmtInstruction,
        k_SemicolonStmtInstruction,
        k_TechniqueInstruction
    }

    export enum EFunctionType{
        k_Vertex,
        k_Pixel,
        k_Fragment = k_Pixel,
        k_Function
    }

    export enum ECheckStage {
        CODE_TARGET_SUPPORT, /* Отсутсвуют конструкции не поддерживаемые языком назначения (GLSL) */ 
        SELF_CONTAINED /* Код замкнут, нет не определенных функций, пассов, техник. Нет мертвых функций. */
        // VALIDATION  /* Код не содерит синтаксиески неправильных выражений, то что не исчерпывается */ 
    }

    export enum EVarUsedMode {
        k_Read,
        k_Write,
        k_ReadWrite,
        k_Undefined,
        k_Default = k_ReadWrite
    }
	
    export interface IAFXInstructionStateMap extends StringMap{
	}

	export interface IAFXInstructionRoutine {
		(): void;
	}

    export interface IAFXInstructionError {
        code: uint;
        info: any;
    }

    export interface IAFXInstructionMap {
        [index: uint]: IAFXInstruction;
    }

    export interface IAFXIdExprMap {
        [index: string]: IAFXIdExprInstruction;
    }

    export interface IAFXVariableTypeMap {
        [index: string]: IAFXVariableTypeInstruction;
    }

    export interface IAFXTypeMap {
        [index: string]: IAFXTypeInstruction;
    }

    export interface IAFXVariableDeclMap {
        [index: string]: IAFXVariableDeclInstruction;
    }

    export interface IAFXVarUsedModeMap {
        [index: string]: EVarUsedMode;
    }

    export interface IAFXFunctionDeclMap {
        [index: string]: IAFXFunctionDeclInstruction;
        [index: uint]: IAFXFunctionDeclInstruction;
    }

	/**
	 * All opertion are represented by: 
	 * operator : arg1 ... argn
	 * Operator and instructions may be empty.
	 */
	export interface IAFXInstruction {
        setParent(pParent: IAFXInstruction): void;
        getParent(): IAFXInstruction;

        setOperator(sOperator: string): void;
        getOperator(): string;

        setInstructions(pInstructionList: IAFXInstruction[]): void;
        getInstructions(): IAFXInstruction[];

        _getInstructionType(): EAFXInstructionTypes;
        _getInstructionID(): uint;
        _getScope(): uint;
        _setScope(iScope: uint): void;

        check(eStage: ECheckStage): bool;
        getLastError(): IAFXInstructionError;
        setError(eCode: uint, pInfo: any): void;

    	// /**
    	//  * Contain states of instruction
    	//  */
    	// stateMap: IAFXInstructionStateMap;

    	push(pInstruction: IAFXInstruction, isSetParent?: bool): void;

    	// changeState(sStateName: string, sValue: string): void;
    	// changeState(iStateIndex: int, sValue: string): void;

    	// stateChange(): void;
    	// isStateChange(): bool;

    	addRoutine(fnRoutine: IAFXInstructionRoutine, iPriority?: uint);
    	toString(): string;
        clone(pRelationMap?: IAFXInstructionMap): IAFXInstruction;
    }

    export interface IAFXSimpleInstruction extends IAFXInstruction {
        setValue(sValue: string): void;
        isValue(sValue: string): bool;
    }

    export interface IAFXTypeInstruction extends IAFXInstruction {
        /**
         * Simple tests
         */
        isBase(): bool;
        isArray(): bool;
        isNotBaseArray(): bool;
        isComplex(): bool;
        isEqual(pType: IAFXTypeInstruction): bool;
        isConst(): bool;

        isWritable(): bool;
        isReadable(): bool;

        /**
         * Set private params
         */
        setName(sName: string): void;
        _canWrite(isWritable: bool): void;
        _canRead(isReadable: bool): void;

        // markAsUsed(): void;
        
        /**
         * get type info
         */
        getName(): string;
        getHash(): string;
        getStrongHash(): string;
        getSize(): uint;
        getBaseType(): IAFXTypeInstruction;
        getLength(): uint;
        getArrayElementType(): IAFXTypeInstruction;

        // Fields

        hasField(sFieldName: string): bool;
        hasFieldWithSematic(sSemantic: string);
        hasAllUniqueSemantics(): bool;
        hasFieldWithoutSemantic(): bool;
        
        getField(sFieldName: string): IAFXVariableDeclInstruction;
        getFieldType(sFieldName: string): IAFXVariableTypeInstruction;
        getFieldNameList(): string[];

        /**
         * System
         */
        clone(pRelationMap?: IAFXInstructionMap): IAFXTypeInstruction;
    }

    export interface IAFXVariableTypeInstruction extends IAFXTypeInstruction {       
        /**
         * Simple tests
         */
        isPointer(): bool;
        isStrictPointer(): bool;
        isPointIndex(): bool;

        isFromVariableDecl(): bool;
        isFromTypeDecl(): bool;

        _containArray(): bool;
        _containSampler(): bool;
        _containPointer(): bool;

        _isTypeOfField(): bool;

        /**
         * set type info
         */
        _markUsedForWrite(): bool;
        _markUsedForRead(): bool;
        _goodForRead(): bool;

        _markAsField(): void;

        /**
         * init api
         */
        pushType(pType: IAFXTypeInstruction): void;
        addUsage(sUsage: string): void;
        addArrayIndex(pExpr: IAFXExprInstruction): void;
        addPointIndex(isStrict?:bool): void;
        setVideoBuffer(pBuffer: IAFXVariableDeclInstruction): void;
        initializePointers(): void;

        _setPointerToStrict(): void;
        _addPointIndexInDepth(): void;
        _setVideoBufferInDepth(): void;

        /**
         * Type info
         */
        getUsageList(): string[];
        getSubType(): IAFXTypeInstruction;

        hasUsage(sUsageName: string): bool;
        hasVideoBuffer(): bool;

        getPointDim(): uint;
        getPointer(): IAFXVariableDeclInstruction;
        getVideoBuffer():IAFXVariableDeclInstruction;
        getFieldExpr(sFieldName: string): IAFXIdExprInstruction;

        _getVarDeclName(): string;
        _getTypeDeclName(): string;

        /**
         * System
         */
        wrap(): IAFXVariableTypeInstruction;
        clone(pRelationMap?: IAFXInstructionMap): IAFXVariableTypeInstruction;
        blend(pVariableType?: IAFXVariableTypeInstruction): IAFXVariableTypeInstruction;

        _setCloneHash(sHash: string, sStrongHash: string): void;
        _setCloneArrayIndex(pElementType: IAFXVariableTypeInstruction, 
                            pIndexExpr: IAFXExprInstruction, iLength: uint): void;
        _setClonePointeIndexes(nDim: uint, pPointerList: IAFXVariableDeclInstruction[]): void;
        _setCloneFields(pFieldMap: IAFXVariableDeclMap): void;      

        _setNextPointer(pPointer: IAFXVariableDeclInstruction): void; 
    }

    export interface IAFXTypedInstruction extends IAFXInstruction{
        getType(): IAFXTypeInstruction;
        setType(pType: IAFXTypeInstruction): void;

        clone(pRelationMap?: IAFXInstructionMap): IAFXTypedInstruction;
    }

    export interface IAFXDeclInstruction extends IAFXTypedInstruction {
        setSemantic(sSemantic: string);
        setAnnotation(pAnnotation: IAFXAnnotationInstruction): void;
        getName(): string;
        getNameId(): IAFXIdInstruction;
        getSemantic(): string;

        _isForAll(): bool;
        _isForPixel(): bool;
        _isForVertex(): bool;

        _setForAll(canUse: bool): void;
        _setForPixel(canUse: bool): void;
        _setForVertex(canUse: bool): void;

        clone(pRelationMap?: IAFXInstructionMap): IAFXDeclInstruction;
    }

    export interface IAFXTypeDeclInstruction extends IAFXDeclInstruction {
        clone(pRelationMap?: IAFXInstructionMap): IAFXTypeDeclInstruction;
    }

    export interface IAFXVariableDeclInstruction extends IAFXDeclInstruction {
        hasInitializer(): bool;
        getInitializeExpr(): IAFXExprInstruction;

        getType(): IAFXVariableTypeInstruction;
        setType(pType: IAFXVariableTypeInstruction): void;

        isUniform(): bool;
        isField(): bool;

        setName(sName: string):void;

        clone(pRelationMap?: IAFXInstructionMap): IAFXVariableDeclInstruction;
    }

    export interface IAFXFunctionDeclInstruction extends IAFXDeclInstruction {
        //getNameId(): IAFXIdInstruction;
        hasImplementation(): bool;
        getArguments(): IAFXTypedInstruction[];
        getNumNeededArguments(): uint;
        getReturnType(): IAFXVariableTypeInstruction;

        // closeArguments(pArguments: IAFXInstruction[]): IAFXTypedInstruction[];
        setFunctionDef(pFunctionDef: IAFXDeclInstruction): void;
        setImplementation(pImplementation: IAFXStmtInstruction): void;

        clone(pRelationMap?: IAFXInstructionMap): IAFXFunctionDeclInstruction;

        addUsedVariableType(pType: IAFXVariableTypeInstruction, eUsedMode: EVarUsedMode): bool;
        
        _addOutVariable(pVariable: IAFXVariableDeclInstruction): bool;
        _getOutVariable(): IAFXVariableDeclInstruction;

        _markUsedAs(eUsedType: EFunctionType): void;
        _isUsedAs(eUsedType: EFunctionType): bool;
        _isUsedAsFunction(): bool;
        _isUsedAsVertex(): bool;
        _isUsedAsPixel(): bool;
        _isUsed(): bool;
        _markUsedInVertex(): void;
        _markUsedInPixel(): void;
        _isUsedInVertex(): bool;
        _isUsedInPixel(): bool;
        _checkVertexUsage(): bool;
        _checkPixelUsage(): bool;

        _checkDefenitionForVertexUsage(): bool;
        _checkDefenitionForPixelUsage(): bool;

        _canUsedAsFunction(): bool;
        _notCanUsedAsFunction(): void;

        _addUsedFunction(pFunction: IAFXFunctionDeclInstruction): bool;
        _getUsedFunctionList(): IAFXFunctionDeclInstruction[];
        _addUsedVariable(pVariable: IAFXVariableDeclInstruction): void;
        
        _isBlackListFunction(): bool;
        _addToBlackList(): void;
        _getStringDef(): string;

        _convertToVertexShader(): IAFXFunctionDeclInstruction;
        _convertToPixelShader(): IAFXFunctionDeclInstruction;
    }


    export interface IAFXStructDeclInstruction extends IAFXInstruction {
        //id: IAFXIdInstruction
        //structFields: IAFXStructInstruction
    }

    // export interface IAFXBaseTypeInstruction extends IAFXInstruction {
    //     //id: IAFXIdInstruction
    //     //...
    // }

    export interface IAFXIdInstruction extends IAFXInstruction {
        getName(): string;
        getRealName(): string;

        setName(sName: string): void;
        setRealName(sName: string): void;

        clone(pRelationMap?: IAFXInstructionMap): IAFXIdInstruction;
    }

    export interface IAFXKeywordInstruction extends IAFXInstruction {
        setValue(sValue: string): void;
        isValue(sTestValue: string): bool;
    }


    export interface IAFXExprInstruction extends IAFXTypedInstruction {
        evaluate(): bool;
        simplify(): bool;
        getEvalValue(): any;
        isConst(): bool;
        getType(): IAFXVariableTypeInstruction;
        
        clone(pRelationMap?: IAFXInstructionMap): IAFXExprInstruction;
    }

    export interface IAFXIdExprInstruction extends IAFXExprInstruction {
        clone(pRelationMap?: IAFXInstructionMap): IAFXIdExprInstruction;
    }

    export interface IAFXLiteralInstruction extends IAFXExprInstruction {
        setValue(pValue: any): void;
        clone(pRelationMap?: IAFXInstructionMap): IAFXLiteralInstruction;
    }

    export interface IAFXAnnotationInstruction extends IAFXInstruction{

    }

    export interface IAFXStmtInstruction extends IAFXInstruction{
        
    }

    export interface IAFXTechniqueInstruction extends IAFXDeclInstruction{
        addPass(): void;

        setName(sName: string, isComplexName: bool): void;
        getName(): string;
        hasComplexName(): bool;

        getSharedVariables(): IAFXVariableDeclInstruction[];

        _setParseNode(pNode: IParseNode): void;
        _getParseNode(): IParseNode;
    }

}

#endif