/// <reference path="../../idl/IAFXInstruction.ts" />
/// <reference path="../Effect.ts" />

/// <reference path="Instruction.ts" />
/// <reference path="IdInstruction.ts" />
/// <reference path="VariableInstruction.ts" />
/// <reference path="IntInstruction.ts" />
/// <reference path="IdExprInstruction.ts" />

module akra.fx.instructions {

	export class VariableTypeInstruction extends Instruction implements IAFXVariableTypeInstruction {
		private _pSubType: IAFXTypeInstruction = null;
		private _pUsageList: string[] = null;

		private _sName: string = "";
		private _bIsWritable: boolean = null;
		private _bIsReadable: boolean = null;

		private _bUsedForWrite: boolean = false;
		private _bUsedForRead: boolean = false;

		private _sHash: string = "";
		private _sStrongHash: string = "";
		private _bIsArray: boolean = false;
		private _bIsPointer: boolean = false;
		private _bIsStrictPointer: boolean = false;
		private _bIsPointIndex: boolean = null;
		private _bIsUniform: boolean = null;
		private _bIsGlobal: boolean = null;
		private _bIsConst: boolean = null;
		private _bIsShared: boolean = null;
		private _bIsForeign: boolean = null;
		private _iLength: uint = Instruction.UNDEFINE_LENGTH;
		private _isNeedToUpdateLength: boolean = false;

		private _bIsFromVariableDecl: boolean = null;
		private _bIsFromTypeDecl: boolean = null;
		private _bIsField: boolean = false;

		private _pArrayIndexExpr: IAFXExprInstruction = null;
		private _pArrayElementType: IAFXVariableTypeInstruction = null;

		private _pFieldDeclMap: IAFXVariableDeclMap = null;
		private _pFieldDeclBySemanticMap: IAFXVariableDeclMap = null;
		private _pFieldIdMap: IAFXIdExprMap = null;
		private _pUsedFieldMap: IAFXVarUsedModeMap = null;

		private _pVideoBuffer: IAFXVariableDeclInstruction = null;
		private _pMainPointIndex: IAFXVariableDeclInstruction = null;
		private _pUpPointIndex: IAFXVariableDeclInstruction = null;
		private _pDownPointIndex: IAFXVariableDeclInstruction = null;
		private _nPointDim: uint = 0;
		private _pPointerList: IAFXVariableDeclInstruction[] = null;
		private _iPadding: uint = Instruction.UNDEFINE_PADDING;

		private _pSubDeclList: IAFXVariableDeclInstruction[] = null;
		private _pAttrOffset: IAFXVariableDeclInstruction = null;

		private _bUnverifiable: boolean = false;
		private _bCollapsed: boolean = false;

		constructor() {
			super();
			this._pInstructionList = null;
			this._eInstructionType = EAFXInstructionTypes.k_VariableTypeInstruction;
		}

		_toFinalCode(): string {
			var sCode: string = "";
			if (!isNull(this._pUsageList)) {
				if (!this.isShared()) {
					for (var i: uint = 0; i < this._pUsageList.length; i++) {
						sCode += this._pUsageList[i] + " ";
					}
				}
			}

			sCode += this.getSubType()._toFinalCode();

			return sCode;
		}

		_toDeclString(): string {
			return this.getSubType()._toDeclString();
		}

		_isBuiltIn(): boolean {
			return false;
		}

		_setBuiltIn(isBuiltIn: boolean): void {
		}

		_setCollapsed(bValue: boolean): void {
			this._bCollapsed = bValue;
		}

		_isCollapsed(): boolean {
			return this._bCollapsed;
		}

		//-----------------------------------------------------------------//
		//----------------------------SIMPLE TESTS-------------------------//
		//-----------------------------------------------------------------//

		_isBase(): boolean {
			return this.getSubType()._isBase() && this._bIsArray === false;
		}

		_isArray(): boolean {
			return this._bIsArray ||
				(this.getSubType()._isArray());
		}

		_isNotBaseArray(): boolean {
			return this._bIsArray || (this.getSubType()._isNotBaseArray());
		}

		_isComplex(): boolean {
			return this.getSubType()._isComplex();
		}

		_isEqual(pType: IAFXTypeInstruction): boolean {
			if (this._isUnverifiable()) {
				return true;
			}

			if (this._isNotBaseArray() && pType._isNotBaseArray() &&
				(this._getLength() !== pType._getLength() ||
				this._getLength() === Instruction.UNDEFINE_LENGTH ||
				pType._getLength() === Instruction.UNDEFINE_LENGTH)) {
				return false;
			}

			if (this._getHash() !== pType._getHash()) {
				return false;
			}

			return true;
		}

		_isStrongEqual(pType: IAFXTypeInstruction): boolean {
			if (!this._isEqual(pType) || this._getStrongHash() !== pType._getStrongHash()) {
				return false;
			}

			return true;
		}

		_isSampler(): boolean {
			return this.getSubType()._isSampler();
		}

		_isSamplerCube(): boolean {
			return this.getSubType()._isSamplerCube();
		}

		_isSampler2D(): boolean {
			return this.getSubType()._isSampler2D();
		}

		_isWritable(): boolean {
			if (!isNull(this._bIsWritable)) {
				return this._bIsWritable;
			}

			if ((this._isArray() && !this._isBase()) ||
				this.isForeign() || this.isUniform()) {
					this._bIsWritable = false;
			}
			else {
				this._bIsWritable = this.getSubType()._isWritable();
			}

			return this._bIsWritable;
		}

		_isReadable(): boolean {
			if (!isNull(this._bIsReadable)) {
				return this._bIsReadable;
			}

			if (this.hasUsage("out")) {
				this._bIsReadable = false;
			}
			else {
				this._bIsReadable = this.getSubType()._isReadable();
			}

			return this._bIsReadable;
		}

		_containArray(): boolean {
			return this.getSubType()._containArray();
		}

		_containSampler(): boolean {
			return this.getSubType()._containSampler();
		}

		_containPointer(): boolean {
			return this.getSubType()._containPointer();
		}

		_containComplexType(): boolean {
			return this.getSubType()._containComplexType();
		}

		_isPointer(): boolean {
			return this._bIsPointer ||
				(this.getSubType()._getInstructionType() === EAFXInstructionTypes.k_VariableTypeInstruction &&
				(<IAFXVariableTypeInstruction>this.getSubType())._isPointer());
		}

		_isStrictPointer(): boolean {
			return this._bIsStrictPointer ||
				(this.getSubType()._getInstructionType() === EAFXInstructionTypes.k_VariableTypeInstruction &&
				(<IAFXVariableTypeInstruction>this.getSubType())._isStrictPointer());
		}

		_isPointIndex(): boolean {
			if (isNull(this._bIsPointIndex)) {
				this._bIsPointIndex = this._isStrongEqual(Effect.getSystemType("ptr"));
			}

			return this._bIsPointIndex;
		}

		_isFromVariableDecl(): boolean {
			if (!isNull(this._bIsFromVariableDecl)) {
				return this._bIsFromVariableDecl;
			}

			if (isNull(this._getParent())) {
				this._bIsFromVariableDecl = false;
			}
			else {
				var eParentType: EAFXInstructionTypes = this._getParent()._getInstructionType();

				if (eParentType === EAFXInstructionTypes.k_VariableDeclInstruction) {
					this._bIsFromVariableDecl = true;
				}
				else if (eParentType === EAFXInstructionTypes.k_VariableTypeInstruction) {
					this._bIsFromVariableDecl = (<IAFXVariableTypeInstruction>this._getParent())._isFromVariableDecl();
				}
				else {
					this._bIsFromVariableDecl = false;
				}
			}

			return this._bIsFromVariableDecl;
		}

		_isFromTypeDecl(): boolean {
			if (!isNull(this._bIsFromTypeDecl)) {
				return this._bIsFromTypeDecl;
			}

			if (isNull(this._getParent())) {
				this._bIsFromTypeDecl = false;
			}
			else {
				var eParentType: EAFXInstructionTypes = this._getParent()._getInstructionType();

				if (eParentType === EAFXInstructionTypes.k_TypeDeclInstruction) {
					this._bIsFromTypeDecl = true;
				}
				else if (eParentType === EAFXInstructionTypes.k_VariableTypeInstruction) {
					this._bIsFromTypeDecl = (<IAFXVariableTypeInstruction>this._getParent())._isFromVariableDecl();
				}
				else {
					this._bIsFromTypeDecl = false;
				}
			}

			return this._bIsFromTypeDecl;
		}

		isUniform(): boolean {
			if (isNull(this._bIsUniform)) {
				this._bIsUniform = this.hasUsage("uniform");
			}

			return this._bIsUniform;
		}

		isGlobal(): boolean {
			if (isNull(this._bIsGlobal)) {
				this._bIsGlobal = this._getScope() === 0;
			}

			return this._bIsGlobal;
		}

		_isConst(): boolean {
			if (isNull(this._bIsConst)) {
				this._bIsConst = this.hasUsage("const");
			}

			return this._bIsConst;
		}

		isShared(): boolean {
			if (isNull(this._bIsShared)) {
				this._bIsShared = this.hasUsage("shared");
			}

			return this._bIsShared;
		}

		isForeign(): boolean {
			if (isNull(this._bIsForeign)) {
				this._bIsForeign = this.hasUsage("foreign");
			}

			return this._bIsForeign;
		}

		_isTypeOfField(): boolean {
			if (isNull(this._getParent())) {
				return false;
			}

			if (this._getParent()._getInstructionType() === EAFXInstructionTypes.k_VariableDeclInstruction) {
				var pParentDecl: IAFXVariableDeclInstruction = <IAFXVariableDeclInstruction>this._getParent();
				return pParentDecl.isField();
			}

			return false;
		}

		_isUnverifiable(): boolean {
			return this._bUnverifiable;
		}

		//-----------------------------------------------------------------//
		//----------------------------SET TYPE INFO------------------------//
		//-----------------------------------------------------------------//

		_setName(sName: string): void {
			this._sName = sName;
		}

		_canWrite(isWritable: boolean): void {
			this._bIsWritable = isWritable;
		}

		_canRead(isReadable: boolean): void {
			this._bIsReadable = isReadable;
		}

		//-----------------------------------------------------------------//
		//----------------------------INIT API-----------------------------//
		//-----------------------------------------------------------------//
		setPadding(iPadding: uint): void {
			this._iPadding = iPadding;
		}

		pushType(pType: IAFXTypeInstruction): void {
			var eType: EAFXInstructionTypes = pType._getInstructionType();

			if (eType === EAFXInstructionTypes.k_SystemTypeInstruction ||
				eType === EAFXInstructionTypes.k_ComplexTypeInstruction) {
				this._pSubType = pType;
			}
			else {
				var pVarType: IAFXVariableTypeInstruction = <IAFXVariableTypeInstruction>pType;
				if (!pVarType._isNotBaseArray() && !pVarType._isPointer()) {
					var pUsageList: string[] = pVarType.getUsageList();
					if (!isNull(pUsageList)) {
						for (var i: uint = 0; i < pUsageList.length; i++) {
							this.addUsage(pUsageList[i]);
						}
					}

					this._pSubType = pVarType.getSubType();
				}
				else {
					this._pSubType = pType;
				}
			}

		}

		addUsage(sUsage: string): void {
			if (isNull(this._pUsageList)) {
				this._pUsageList = [];
			}

			if (!this.hasUsage(sUsage)) {
				this._pUsageList.push(sUsage);
			}
		}

		addArrayIndex(pExpr: IAFXExprInstruction): void {
			//TODO: add support for v[][10]

			this._pArrayElementType = new VariableTypeInstruction();
			this._pArrayElementType.pushType(this.getSubType());
			if (!isNull(this._pUsageList)) {
				for (var i: uint = 0; i < this._pUsageList.length; i++) {
					this._pArrayElementType.addUsage(this._pUsageList[i]);
				}
			}
			this._pArrayElementType._setParent(this);

			this._pArrayIndexExpr = pExpr;

			this._iLength = this._pArrayIndexExpr.evaluate() ? this._pArrayIndexExpr.getEvalValue() : Instruction.UNDEFINE_LENGTH;

			this._bIsArray = true;

			if (this._iLength === Instruction.UNDEFINE_LENGTH) {
				this._isNeedToUpdateLength = true;
			}
		}

		addPointIndex(isStrict: boolean = true): void {
			this._nPointDim++;
			this._bIsPointer = true;
			if (isStrict) {
				this._bIsStrictPointer = true;
			}
		}

		setVideoBuffer(pBuffer: IAFXVariableDeclInstruction): void {
			if (this._isPointIndex()) {
				(<IAFXVariableDeclInstruction>this._getParent()._getParent()).getType().setVideoBuffer(pBuffer);
				return;
			}

			this._pVideoBuffer = pBuffer;

			if (!this._isComplex()) {
				return;
			}

			var pFieldNameList: string[] = this._getFieldNameList();

			for (var i: uint = 0; i < pFieldNameList.length; i++) {
				var pFieldType: IAFXVariableTypeInstruction = this._getFieldType(pFieldNameList[i]);

				if (pFieldType._isPointer()) {
					pFieldType.setVideoBuffer(pBuffer);
				}
			}
		}

		initializePointers(): void {
			this._pPointerList = [];
			var pDownPointer: IAFXVariableDeclInstruction = this._getParentVarDecl();

			for (var i: uint = 0; i < this.getPointDim(); i++) {
				var pPointer: IAFXVariableDeclInstruction = new VariableDeclInstruction();
				var pPointerType: IAFXVariableTypeInstruction = new VariableTypeInstruction();
				var pPointerId: IAFXIdInstruction = new IdInstruction();

				pPointer._push(pPointerType, true);
				pPointer._push(pPointerId, true);

				pPointerType.pushType(Effect.getSystemType("ptr"));
				pPointerId.setName(Instruction.UNDEFINE_NAME);
				pPointerId.setName(this._getParentVarDecl().getName() + "_pointer_" + i.toString());

				if (i > 0) {
					(this._pPointerList[i - 1].getType())._setUpDownPointers(pPointer, pDownPointer);
					pDownPointer = this._pPointerList[i - 1];
				}
				else {
					pPointerType._setUpDownPointers(null, pDownPointer);
				}

				pPointer._setParent(this._getParentVarDecl());
				this._pPointerList.push(pPointer);
			}

			this._pPointerList[this._pPointerList.length - 1].getType()._setUpDownPointers(null, pDownPointer);
			this._pUpPointIndex = this._pPointerList[0];
			this._pMainPointIndex = this._pPointerList[this._pPointerList.length - 1];
		}

		_setPointerToStrict(): void {
			this._bIsStrictPointer = true;
		}

		_addPointIndexInDepth(): void {
			if (!this._isComplex()) {
				return;
			}

			var pFieldNameList: string[] = this._getFieldNameList();

			for (var i: uint = 0; i < pFieldNameList.length; i++) {
				var pFieldType: IAFXVariableTypeInstruction = this._getFieldType(pFieldNameList[i]);
				if (!pFieldType._isPointer()) {
					pFieldType.addPointIndex(false);
					pFieldType._setVideoBufferInDepth();
				}
			}
		}

		_setVideoBufferInDepth(): void {
			if (this._isPointer()) {
				this.setVideoBuffer(Effect.createVideoBufferVariable());
			}
			else if (this._isComplex() && this._containPointer()) {
				var pFieldNameList: string[] = this._getFieldNameList();

				for (var i: uint = 0; i < pFieldNameList.length; i++) {
					var pFieldType: IAFXVariableTypeInstruction = this._getFieldType(pFieldNameList[i]);

					pFieldType._setVideoBufferInDepth();
				}
			}
		}

		_markAsUnverifiable(isUnverifiable: boolean): void {
			this._bUnverifiable = true;
		}

		_addAttrOffset(pOffset: IAFXVariableDeclInstruction): void {
			this._pAttrOffset = pOffset;
		}


		//-----------------------------------------------------------------//
		//----------------------------GET TYPE INFO------------------------//
		//-----------------------------------------------------------------//	

		_getName(): string {
			return this._sName;
		}

		_getRealName(): string {
			return this._getBaseType()._getRealName();
		}

		_getHash(): string {
			if (this._sHash === "") {
				this.calcHash();
			}

			return this._sHash;
		}

		_getStrongHash(): string {
			if (this._sStrongHash === "") {
				this.calcStrongHash();
			}

			return this._sStrongHash;
		}

		_getSize(): uint {
			if (this._isPointer() || this._isPointIndex()) {
				return 1;
			}

			if (this._bIsArray) {
				var iSize: uint = this._pArrayElementType._getSize();
				if (this._iLength === Instruction.UNDEFINE_LENGTH ||
					iSize === Instruction.UNDEFINE_SIZE) {
					return Instruction.UNDEFINE_SIZE;
				}
				else {
					return iSize * this._iLength;
				}
			}
			else {
				return this.getSubType()._getSize();
			}
		}

		_getBaseType(): IAFXTypeInstruction {
			return this.getSubType()._getBaseType();
		}

		_getLength(): uint {
			if (!this._isNotBaseArray()) {
				this._iLength = 0;
				return 0;
			}

			if (this._isNotBaseArray() && !this._bIsArray) {
				this._iLength = this.getSubType()._getLength();
			}
			else if (this._iLength === Instruction.UNDEFINE_LENGTH || this._isNeedToUpdateLength) {
				var isEval: boolean = this._pArrayIndexExpr.evaluate();

				if (isEval) {
					var iValue: uint = <uint>this._pArrayIndexExpr.getEvalValue();
					this._iLength = isNumber(iValue) ? iValue : Instruction.UNDEFINE_LENGTH;
				}
			}

			return this._iLength;
		}

		getPadding(): uint {
			return this._isPointIndex() ? this._getDownPointer().getType().getPadding() : this._iPadding;
		}

		_getArrayElementType(): IAFXVariableTypeInstruction {
			if (this._isUnverifiable()) {
				return this;
			}

			if (!this._isArray()) {
				return null;
			}

			if (isNull(this._pArrayElementType)) {
				this._pArrayElementType = new VariableTypeInstruction();
				this._pArrayElementType.pushType(this.getSubType()._getArrayElementType());
				if (!isNull(this._pUsageList)) {
					for (var i: uint = 0; i < this._pUsageList.length; i++) {
						this._pArrayElementType.addUsage(this._pUsageList[i]);
					}
				}
				this._pArrayElementType._setParent(this);
			}

			return this._pArrayElementType;
		}

		_getTypeDecl(): IAFXTypeDeclInstruction {
			if (!this._isFromTypeDecl()) {
				return null;
			}

			var eParentType: EAFXInstructionTypes = this._getParent()._getInstructionType();

			if (eParentType === EAFXInstructionTypes.k_TypeDeclInstruction) {
				return <IAFXTypeDeclInstruction>this._getParent();
			}
			else {
				return (<IAFXTypeInstruction>this._getParent())._getTypeDecl();
			}
		}

		_hasField(sFieldName: string): boolean {
			return this._isUnverifiable() ? true : this.getSubType()._hasField(sFieldName);
		}

		_hasFieldWithSematic(sSemantic: string): boolean {
			if (!this._isComplex()) {
				return false;
			}

			return this.getSubType()._hasFieldWithSematic(sSemantic);
		}

		_hasAllUniqueSemantics(): boolean {
			if (!this._isComplex()) {
				return false;
			}

			return this.getSubType()._hasAllUniqueSemantics();
		}

		_hasFieldWithoutSemantic(): boolean {
			if (!this._isComplex()) {
				return false;
			}

			return this.getSubType()._hasFieldWithoutSemantic();
		}

		_getField(sFieldName: string): IAFXVariableDeclInstruction {
			if (!this._hasField(sFieldName)) {
				return null;
			}

			if (isNull(this._pFieldDeclMap)) {
				this._pFieldDeclMap = <IAFXVariableDeclMap>{};
			}

			if (isDef(this._pFieldDeclMap[sFieldName])) {
				return this._pFieldDeclMap[sFieldName];
			}

			var pField: IAFXVariableDeclInstruction = new VariableDeclInstruction();

			if (!this._isUnverifiable()) {
				var pSubField: IAFXVariableDeclInstruction = this.getSubType()._getField(sFieldName);

				var pFieldType: IAFXVariableTypeInstruction = new VariableTypeInstruction();
				pFieldType.pushType(pSubField.getType());
				// if(!this._isBase()){
				pFieldType.setPadding(pSubField.getType().getPadding());
				// }
				pField._push(pFieldType, true);
				pField._push(pSubField.getNameId(), false);
				pField.setSemantic(pSubField.getSemantic());
			}
			else {
				var pFieldName: IAFXIdInstruction = new IdInstruction();

				pFieldName.setName(sFieldName);
				pFieldName.setRealName(sFieldName);

				pField._push(this, false);
				pField._push(pFieldName, true);
			}

			pField._setParent(this);

			this._pFieldDeclMap[sFieldName] = pField;

			return pField;
		}

		_getFieldBySemantic(sSemantic: string): IAFXVariableDeclInstruction {
			if (this._hasFieldWithSematic(sSemantic)) {
				return null;
			}

			if (isNull(this._pFieldDeclBySemanticMap)) {
				this._pFieldDeclBySemanticMap = <IAFXVariableDeclMap>{};
			}

			if (isDef(this._pFieldDeclBySemanticMap[sSemantic])) {
				return this._pFieldDeclBySemanticMap[sSemantic];
			}

			var pField: IAFXVariableDeclInstruction = new VariableDeclInstruction();
			var pSubField: IAFXVariableDeclInstruction = this.getSubType()._getFieldBySemantic(sSemantic);

			var pFieldType: IAFXVariableTypeInstruction = new VariableTypeInstruction();
			pFieldType.pushType(pSubField.getType());
			// if(!this._isBase()){
			pFieldType.setPadding(pSubField.getType().getPadding());
			// }
			pField._push(pFieldType, true);
			pField._push(pSubField.getNameId(), false);


			pField._setParent(this);

			this._pFieldDeclBySemanticMap[sSemantic] = pField;

			return pField;
		}

		_getFieldType(sFieldName: string): IAFXVariableTypeInstruction {
			return <IAFXVariableTypeInstruction>this._getField(sFieldName).getType();
		}

		_getFieldNameList(): string[] {
			return this.getSubType()._getFieldNameList();
		}


		getUsageList(): string[] {
			return this._pUsageList;
		}

		getSubType(): IAFXTypeInstruction {
			return this._pSubType;
		}

		hasUsage(sUsageName: string): boolean {
			if (isNull(this._pUsageList)) {
				return false;
			}

			for (var i: uint = 0; i < this._pUsageList.length; i++) {
				if (this._pUsageList[i] === sUsageName) {
					return true;
				}
			}

			if (!isNull(this.getSubType()) && this.getSubType()._getInstructionType() === EAFXInstructionTypes.k_VariableTypeInstruction) {
				return (<IAFXVariableTypeInstruction>this.getSubType()).hasUsage(sUsageName);
			}

			return false;
		}

		hasVideoBuffer(): boolean {
			return !isNull(this.getVideoBuffer());
		}

		getPointDim(): uint {
			return this._nPointDim ||
				((this.getSubType()._getInstructionType() === EAFXInstructionTypes.k_VariableTypeInstruction) ?
				(<IAFXVariableTypeInstruction>this.getSubType()).getPointDim() : 0);
		}

		getPointer(): IAFXVariableDeclInstruction {
			if (!this._isFromVariableDecl() ||
				!(this._isPointer() || this._isPointIndex()) || !this.hasVideoBuffer()) {
				return null;
			}

			if (!isNull(this._pUpPointIndex)) {
				return this._pUpPointIndex;
			}

			if (this._isPointIndex()) {
				return null;
			}

			this.initializePointers();

			return this._pUpPointIndex;
		}

		getVideoBuffer(): IAFXVariableDeclInstruction {
			if (this._isPointIndex()) {
				return (<IAFXVariableDeclInstruction>this._getParent()._getParent()).getType().getVideoBuffer();
			}

			return this._pVideoBuffer;
		}

		getFieldExpr(sFieldName: string): IAFXIdExprInstruction {
			if (!this._hasField(sFieldName)) {
				return null;
			}
			var pField: IAFXVariableDeclInstruction = this._getField(sFieldName);
			var pExpr: IAFXIdExprInstruction = new IdExprInstruction();
			pExpr._push(pField.getNameId(), false);
			pExpr.setType(pField.getType());

			return pExpr;
		}

		getFieldIfExist(sFieldName: string): IAFXVariableDeclInstruction {
			if (isNull(this._pFieldDeclMap) && isDef(this._pFieldDeclMap[sFieldName])) {
				return this._pFieldDeclMap[sFieldName];
			}
			else {
				return null;
			}
		}

		getSubVarDecls(): IAFXVariableDeclInstruction[] {
			if (!this.canHaveSubDecls()) {
				return null;
			}

			if (isNull(this._pSubDeclList)) {
				this.generateSubDeclList();
			}
			return this._pSubDeclList;
		}

		_getFullName(): string {
			if (!this._isFromVariableDecl()) {
				return "Not from variable decl";
			}

			var eParentType: EAFXInstructionTypes = this._getParent()._getInstructionType();

			if (eParentType === EAFXInstructionTypes.k_VariableDeclInstruction) {
				return (<IAFXVariableDeclInstruction>this._getParent())._getFullName();
			}
			else {
				return (<IAFXVariableTypeInstruction>this._getParent())._getFullName();
			}
		}

		_getVarDeclName(): string {
			if (!this._isFromVariableDecl()) {
				return "";
			}

			var eParentType: EAFXInstructionTypes = this._getParent()._getInstructionType();

			if (eParentType === EAFXInstructionTypes.k_VariableDeclInstruction) {
				return (<IAFXVariableDeclInstruction>this._getParent()).getName();
			}
			else {
				return (<IAFXVariableTypeInstruction>this._getParent())._getVarDeclName();
			}
		}

		_getTypeDeclName(): string {
			if (!this._isFromVariableDecl()) {
				return "";
			}

			var eParentType: EAFXInstructionTypes = this._getParent()._getInstructionType();

			if (eParentType === EAFXInstructionTypes.k_VariableDeclInstruction) {
				return (<IAFXTypeDeclInstruction>this._getParent()).getName();
			}
			else {
				return (<IAFXVariableTypeInstruction>this._getParent())._getTypeDeclName();
			}
		}

		_getParentVarDecl(): IAFXVariableDeclInstruction {
			if (!this._isFromVariableDecl()) {
				return null;
			}

			var eParentType: EAFXInstructionTypes = this._getParent()._getInstructionType();

			if (eParentType === EAFXInstructionTypes.k_VariableDeclInstruction) {
				return <IAFXVariableDeclInstruction>this._getParent();
			}
			else {
				return (<IAFXVariableTypeInstruction>this._getParent())._getParentVarDecl();
			}
		}

		_getParentContainer(): IAFXVariableDeclInstruction {
			if (!this._isFromVariableDecl() || !this._isTypeOfField()) {
				return null;
			}

			var pContainerType: IAFXVariableTypeInstruction = <IAFXVariableTypeInstruction>this._getParentVarDecl()._getParent();
			if (!pContainerType._isFromVariableDecl()) {
				return null;
			}

			return pContainerType._getParentVarDecl();
		}

		_getMainVariable(): IAFXVariableDeclInstruction {
			if (!this._isFromVariableDecl()) {
				return null;
			}

			if (this._isTypeOfField()) {
				return (<IAFXVariableTypeInstruction>this._getParent()._getParent())._getMainVariable();
			}
			else {
				return (<IAFXVariableDeclInstruction>this._getParentVarDecl());
			}
		}

		_getMainPointer(): IAFXVariableDeclInstruction {
			if (isNull(this._pMainPointIndex)) {
				if (isNull(this.getPointer())) {
					this._pMainPointIndex = this._getParentVarDecl()
				}
				else {
					this._pMainPointIndex = this._getUpPointer().getType()._getMainPointer();
				}
			}

			return this._pMainPointIndex;
		}

		_getUpPointer(): IAFXVariableDeclInstruction {
			return this._pUpPointIndex;
		}

		_getDownPointer(): IAFXVariableDeclInstruction {
			return this._pDownPointIndex;
		}

		_getAttrOffset(): IAFXVariableDeclInstruction {
			return this._pAttrOffset;
		}

		//-----------------------------------------------------------------//
		//----------------------------SYSTEM-------------------------------//
		//-----------------------------------------------------------------//		

		wrap(): IAFXVariableTypeInstruction {
			var pCloneType: IAFXVariableTypeInstruction = new VariableTypeInstruction();
			pCloneType.pushType(this);

			return pCloneType;
		}

		_clone(pRelationMap: IAFXInstructionMap = <IAFXInstructionMap>{}): IAFXVariableTypeInstruction {
			if (isDef(pRelationMap[this._getInstructionID()])) {
				return <IAFXVariableTypeInstruction>pRelationMap[this._getInstructionID()];
			}

			if (this._pParentInstruction === null ||
				!isDef(pRelationMap[this._pParentInstruction._getInstructionID()]) ||
				pRelationMap[this._pParentInstruction._getInstructionID()] === this._pParentInstruction) {
				//pRelationMap[this._getInstructionID()] = this;
				return this;
			}

			var pClone: IAFXVariableTypeInstruction = <IAFXVariableTypeInstruction>super._clone(pRelationMap);

			pClone.pushType(this._pSubType._clone(pRelationMap));
			if (!isNull(this._pUsageList)) {
				for (var i: uint = 0; i < this._pUsageList.length; i++) {
					pClone.addUsage(this._pUsageList[i]);
				}
			}

			pClone._canWrite(this._bIsWritable);
			pClone._canRead(this._bIsReadable);
			pClone._setCloneHash(this._sHash, this._sStrongHash);
			pClone.setPadding(this.getPadding());

			if (this._bIsArray) {
				this._setCloneArrayIndex(this._pArrayElementType._clone(pRelationMap),
					this._pArrayIndexExpr._clone(pRelationMap),
					this._iLength);
			}

			if (this._bIsPointer) {
				var pClonePointerList: IAFXVariableDeclInstruction[] = null;
				if (!isNull(this._pPointerList)) {
					pClonePointerList = new Array(this._pPointerList.length);
					var pDownPointer: IAFXVariableDeclInstruction = pClone._getParentVarDecl();

					for (var i: uint = 0; i < this._pPointerList.length; i++) {
						pClonePointerList[i] = this._pPointerList[i]._clone(pRelationMap);

						if (i > 0) {
							(pClonePointerList[i - 1].getType())._setUpDownPointers(pClonePointerList[i], pDownPointer);
							pDownPointer = pClonePointerList[i - 1];
						}
						else {
							pClonePointerList[0].getType()._setUpDownPointers(null, pDownPointer);
						}
					}

					pClonePointerList[pClonePointerList.length - 1].getType()._setUpDownPointers(null, pDownPointer);
				}

				this._setClonePointeIndexes(this.getPointDim(), pClonePointerList);
			}

			if (!isNull(this._pFieldDeclMap)) {
				var sFieldName: string = "";
				var pCloneFieldMap: IAFXVariableDeclMap = <IAFXVariableDeclMap>{};

				for (sFieldName in this._pFieldDeclMap) {
					pCloneFieldMap[sFieldName] = this._pFieldDeclMap[sFieldName]._clone(pRelationMap);
				}

				this._setCloneFields(pCloneFieldMap);
			}

			return pClone;
		}

		_blend(pType: IAFXVariableTypeInstruction, eMode: EAFXBlendMode): IAFXVariableTypeInstruction {
			if (this === pType) {
				return this;
			}

			if (eMode === EAFXBlendMode.k_Global) {
				return null;
			}

			if (this._isComplex() !== pType._isComplex() ||
				(this._isNotBaseArray() !== pType._isNotBaseArray()) ||
				(this._isPointer() !== pType._isPointer())) {
				return null;
			}

			if (this._isNotBaseArray() || this._getLength() === Instruction.UNDEFINE_LENGTH ||
				this._getLength() !== pType._getLength()) {
				return null;
			}

			var pBlendBaseType: IAFXTypeInstruction = this._getBaseType()._blend(pType._getBaseType(), eMode);
			if (isNull(pBlendBaseType)) {
				return null;
			}

			var pBlendType: IAFXVariableTypeInstruction = new VariableTypeInstruction();
			pBlendType.pushType(pBlendBaseType);

			if (this._isNotBaseArray()) {
				var iLength: uint = this._getLength();
				var pLengthExpr: IntInstruction = new IntInstruction();
				pLengthExpr.setValue(iLength);
				pBlendType.addArrayIndex(pLengthExpr);
			}

			return pBlendType;

		}

		_setCloneHash(sHash: string, sStrongHash: string): void {
			this._sHash = sHash;
			this._sStrongHash = sStrongHash;
		}

		_setCloneArrayIndex(pElementType: IAFXVariableTypeInstruction,
			pIndexExpr: IAFXExprInstruction, iLength: uint): void {
			this._bIsArray = true;
			this._pArrayElementType = pElementType;
			this._pArrayIndexExpr = pIndexExpr;
			this._iLength = iLength;
		}

		_setClonePointeIndexes(nDim: uint, pPointerList: IAFXVariableDeclInstruction[]): void {
			this._bIsPointer = true;
			this._nPointDim = nDim;
			this._pPointerList = pPointerList;
			if (!isNull(this._pPointerList)) {
				this._pUpPointIndex = this._pPointerList[0];
			}
		}

		_setCloneFields(pFieldMap: IAFXVariableDeclMap): void {
			this._pFieldDeclMap = pFieldMap;
		}

		_setUpDownPointers(pUpPointIndex: IAFXVariableDeclInstruction,
			pDownPointIndex: IAFXVariableDeclInstruction): void {
			this._pUpPointIndex = pUpPointIndex;
			this._pDownPointIndex = pDownPointIndex;
		}

		private calcHash(): void {
			var sHash: string = this.getSubType()._getHash();

			if (this._bIsArray) {
				sHash += "[";

				var iLength: uint = this._getLength();

				if (iLength === Instruction.UNDEFINE_LENGTH) {
					sHash += "undef"
				}
				else {
					sHash += iLength.toString();
				}

				sHash += "]";
			}

			this._sHash = sHash;
		}

		private calcStrongHash(): void {
			var sStrongHash: string = this.getSubType()._getStrongHash();

			if (this._bIsArray) {
				sStrongHash += "[";

				var iLength: uint = this._getLength();

				if (iLength === Instruction.UNDEFINE_LENGTH) {
					sStrongHash += "undef"
				}
				else {
					sStrongHash += iLength.toString();
				}

				sStrongHash += "]";
			}
			if (this._isPointer()) {
				for (var i: uint = 0; i < this.getPointDim(); i++) {
					sStrongHash = "@" + sStrongHash;
				}
			}


			this._sStrongHash = sStrongHash;
		}

		private generateSubDeclList(): void {
			if (!this.canHaveSubDecls()) {
				return;
			}

			var pDeclList: IAFXVariableDeclInstruction[] = [];
			var i: uint = 0;

			if (!isNull(this._pAttrOffset)) {
				pDeclList.push(this._pAttrOffset);
			}

			if (this._isPointer()) {

				if (isNull(this._getUpPointer())) {
					this.initializePointers();
				}

				for (i = 0; i < this._pPointerList.length; i++) {
					pDeclList.push(this._pPointerList[i]);
				}
			}

			if (this._isComplex()) {
				var pFieldNameList: string[] = this._getFieldNameList();

				for (i = 0; i < pFieldNameList.length; i++) {
					var pField: IAFXVariableDeclInstruction = this._getField(pFieldNameList[i]);
					var pFieldSubDeclList: IAFXVariableDeclInstruction[] = pField.getSubVarDecls();

					if (!isNull(pFieldSubDeclList)) {
						for (var j: uint = 0; j < pFieldSubDeclList.length; j++) {
							pDeclList.push(pFieldSubDeclList[j]);
						}
					}
				}
			}

			this._pSubDeclList = pDeclList;
		}

		private canHaveSubDecls(): boolean {
			return this._isComplex() || this._isPointer() || !isNull(this._pAttrOffset);
		}
	}
}
