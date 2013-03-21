#ifndef AFXMAKER_TS
#define AFXMAKER_TS

#include "IAFXMaker.ts"
#include "IAFXComposer.ts"
#include "util/unique.ts"
#include "IResourcePoolManager.ts"
#include "PassInputBlend.ts"

#include "IShaderInput.ts"

module akra.fx {

	export interface IUniformTypeMap {
		[name: string]: EAFXShaderVariableType;
	}

	export class Maker implements IAFXMaker {
		UNIQUE();

		private _pComposer: IAFXComposer = null;
		private _pShaderProgram: IShaderProgram = null;

		private _pRealUniformNameList: string[] = null;
		private _pRealAttrNameList: string[] = null;

		// is really exists uniform & attr?
		private _pUniformExistMap: BoolMap = <BoolMap>{};
		private _pAttrExistMap: BoolMap = <BoolMap>{};

		private _pRealUniformLengthMap: IntMap = <IntMap>{};
		private _pRealUniformTypeMap: IUniformTypeMap = <IUniformTypeMap>{};

		//For fast set uniforms
		private _pRealUnifromFromInput: string[] = null; /* without sampler array */
		private _pRealSampleArraysFromInput: string[] = null; /* only sampler arrays */
		private _pRealSamplersFromInput: string[] = null;
		private _pRealSamplersNames: string[] = null;
		private _isUsedZero2D: bool = false;
		private _isUsedZeroCube: bool = false;

		//For fast set offsets
		private _pAttrContainer: AttributeBlendContainer = null;
		// private _pRealOffsetsFromFlows: string[] = null;
		// private _pDefaultOffsets: uint[] = null;
		// private _pRealOffsetKeys: string[] = null;

		//for fast set buffers slots
		private _pRealAttrSlotFromFlows: string[] = null;
		private _pRealAttrIsIndexData: bool[] = null; 

		//for fast set buffers vertex textures
		private _pBufferSamplersFromFlows: string[] = null;

		//стек объектов храняих все юниформы и аттрибуты
		private _pDataPoolArray: util.ObjectArray = new util.ObjectArray();

		inline isArray(sName: string) {
			return this.getLength(sName) > 0;
		}

		inline getType(sName: string): EAFXShaderVariableType {
			return this._pRealUniformTypeMap[sName];
		}

		inline getLength(sName: string): uint {
			return this._pRealUniformLengthMap[sName];
		}

		setUniform(sName: string, pValue: any): void {
			var eType: EAFXShaderVariableType = this.getType(sName);
			var iLength: int = this.getLength(sName);

			if (iLength > 0) {
				this.applyUnifromArray(sName, eType, pValue);
			}
			else {
				this.applyUniform(sName, eType, pValue);
			}
		}

		private applyUnifromArray(sName: string, eType: EAFXShaderVariableType, pValue: any): void {
			switch (eType) {
		        case EAFXShaderVariableType.k_Float:
		        	this._pShaderProgram.setFloat32Array(sName, pValue);
		        	break;
		        case EAFXShaderVariableType.k_Int:
		        	this._pShaderProgram.setInt32Array(sName, pValue);
		        	break;
		        // case EAFXShaderVariableType.k_Bool:
		        // 	this._pShaderProgram.setBoolArray(sName, pValue);
		        // 	break;

		        case EAFXShaderVariableType.k_Float2:
		        	this._pShaderProgram.setVec2Array(sName, pValue);
		        	break;
		        case EAFXShaderVariableType.k_Int2:
		        	this._pShaderProgram.setVec2iArray(sName, pValue);
		        	break;
		        // case EAFXShaderVariableType.k_Bool2:
		        // 	this._pShaderProgram.setBool2Array(sName, pValue);
		        // 	break;

		        case EAFXShaderVariableType.k_Float3:
		        	this._pShaderProgram.setVec3Array(sName, pValue);
		        	break;
		        case EAFXShaderVariableType.k_Int3:
		        	this._pShaderProgram.setVec3iArray(sName, pValue);
		        	break;
		        // case EAFXShaderVariableType.k_Bool3:
		        // 	this._pShaderProgram.setBool3Array(sName, pValue);
		        // 	break;

		        case EAFXShaderVariableType.k_Float4:
		        	this._pShaderProgram.setVec4Array(sName, pValue);
		        	break;
		        case EAFXShaderVariableType.k_Int4:
		        	this._pShaderProgram.setVec4iArray(sName, pValue);
		        	break;
		        // case EAFXShaderVariableType.k_Bool4:
		        // 	this._pShaderProgram.setBool4Array(sName, pValue);
		        // 	break;

		        // case EAFXShaderVariableType.k_Float2x2:
		        // 	this._pShaderProgram.setMat2Array(sName, pValue);
		        // 	break;
		        case EAFXShaderVariableType.k_Float3x3:
		        	this._pShaderProgram.setMat3Array(sName, pValue);
		        	break;
		        case EAFXShaderVariableType.k_Float4x4:
		        	this._pShaderProgram.setMat4Array(sName, pValue);
		        	break;

		        case EAFXShaderVariableType.k_Sampler2D:
		        	this._pShaderProgram.setSamplerArray(sName, pValue);
		        	break;
		        case EAFXShaderVariableType.k_SamplerCUBE:
		        	this._pShaderProgram.setSamplerArray(sName, pValue);
		        	break;
		        default:
		        	CRITICAL("Wrong uniform array type (" + eType + ") with name " + sName);
			}
		}

		private applyUniform(sName: string, eType: EAFXShaderVariableType, pValue: any): void {
			switch (eType) {
		        case EAFXShaderVariableType.k_Float:
		        	this._pShaderProgram.setFloat(sName, pValue);
		        	break;
		        case EAFXShaderVariableType.k_Int:
		        	this._pShaderProgram.setInt(sName, pValue);
		        	break;
		        // case EAFXShaderVariableType.k_Bool:
		        // 	this._pShaderProgram.setBool(sName, pValue);
		        // 	break;

		        case EAFXShaderVariableType.k_Float2:
		        	this._pShaderProgram.setVec2(sName, pValue);
		        	break;
		        case EAFXShaderVariableType.k_Int2:
		        	this._pShaderProgram.setVec2i(sName, pValue);
		        	break;
		        // case EAFXShaderVariableType.k_Bool2:
		        // 	this._pShaderProgram.setBool2(sName, pValue);
		        // 	break;

		        case EAFXShaderVariableType.k_Float3:
		        	this._pShaderProgram.setVec3(sName, pValue);
		        	break;
		        case EAFXShaderVariableType.k_Int3:
		        	this._pShaderProgram.setVec3i(sName, pValue);
		        	break;
		        // case EAFXShaderVariableType.k_Bool3:
		        // 	this._pShaderProgram.setBool3(sName, pValue);
		        // 	break;

		        case EAFXShaderVariableType.k_Float4:
		        	this._pShaderProgram.setVec4(sName, pValue);
		        	break;
		        case EAFXShaderVariableType.k_Int4:
		        	this._pShaderProgram.setVec4i(sName, pValue);
		        	break;
		        // case EAFXShaderVariableType.k_Bool4:
		        // 	this._pShaderProgram.setBool4(sName, pValue);
		        // 	break;

		        // case EAFXShaderVariableType.k_Float2x2:
		        // 	this._pShaderProgram.setMat2(sName, pValue);
		        // 	break;
		        case EAFXShaderVariableType.k_Float3x3:
		        	this._pShaderProgram.setMat3(sName, pValue);
		        	break;
		        case EAFXShaderVariableType.k_Float4x4:
		        	this._pShaderProgram.setMat4(sName, pValue);
		        	break;

		        case EAFXShaderVariableType.k_Sampler2D:
		        	this._pShaderProgram.setSampler(sName, pValue);
		        	break;
		        case EAFXShaderVariableType.k_SamplerCUBE:
		        	this._pShaderProgram.setSampler(sName, pValue);
		        	break;
		        case EAFXShaderVariableType.k_SamplerVertexTexture:
		        	this._pShaderProgram.setVertexBuffer(sName, pValue);
		        	break;
		        default:
		        	CRITICAL("Wrong uniform type (" + eType + ") with name " + sName);
			}
		}

		inline get shaderProgram(): IShaderProgram {
			return this._pShaderProgram;
		}

		inline get attributeSemantics(): string[] {
			return this._pRealAttrSlotFromFlows;
		}

		inline get attributeNames(): string[] {
			return this._pRealAttrNameList;
		}


		constructor(pComposer: IAFXComposer){
			this._pComposer = pComposer;
		}

		_create(sVertex: string, sPixel: string): bool {
			var pRmgr: IResourcePoolManager = this._pComposer.getEngine().getResourceManager();

			var pProgram: IShaderProgram = pRmgr.createShaderProgram(".shader-prorgam-" + this.getGuid().toString());

			if(!pProgram.create(sVertex, sPixel)){
				return false;
			}

			this._pRealUniformNameList = pProgram._getActiveUniformNames();
        	this._pRealAttrNameList = pProgram._getActiveAttributeNames();
			this._pShaderProgram = pProgram; 

			for (var i: int = 0; i < this._pRealUniformNameList.length; i++) {
				this._pUniformExistMap[this._pRealUniformNameList[i]] = true;
			}

			for (var i: int = 0; i < this._pRealAttrNameList.length; i++) {
				this._pAttrExistMap[this._pRealAttrNameList[i]] = true;
			}

			return true;
		}

		inline _getShaderInput(): IShaderInput {
			return this._pDataPoolArray.length > 0? this._pDataPoolArray.pop(): this._createDataPool();
		}

		inline _releaseShaderInput(pPool: IShaderInput): void {
			this._pDataPoolArray.push(pPool);
		}

		inline isUniformExists(sName: string): bool {
			return this._pUniformExistMap[sName];
		}

		inline isAttrExists(sName: string): bool {
			return this._pAttrExistMap[sName];
		}


		_createDataPool(): IShaderInput {
			var pInput: IShaderInput = {};

			//assume, that attr & uniform never have same names!!!

			for (var i: int = 0; i < this._pRealUniformNameList.length; i++) {
				var sName: string = this._pRealUniformNameList[i];
				pInput[sName] = null;

				var eType: EAFXShaderVariableType = this._pRealUniformTypeMap[sName];
				var iLength: uint = this._pRealUniformLengthMap[sName];

				if ((eType === EAFXShaderVariableType.k_Sampler2D ||
					 eType === EAFXShaderVariableType.k_SamplerCUBE)){

					if(iLength > 0){
						pInput[sName] = new Array(iLength);

						for(var j: uint = 0; j < iLength; j++){
							pInput[sName][j] = createSamplerState();
						}
					}
					else {
						pInput[sName] = createSamplerState();
					}
					
				}
			}

			for (var i: int = 0; i < this._pRealAttrNameList.length; i++) {
				var sName: string = this._pRealAttrNameList[i];
				pInput[sName] = null;
			}

			return pInput;
		}

		_initInput(pPassInput: IAFXPassInputBlend, pBlend: SamplerBlender, pAttrs: AttributeBlendContainer): bool {
			var pUniformKeys: string[] = pPassInput.uniformKeys;

			this._pRealUnifromFromInput = [];
			this._pRealSampleArraysFromInput = [];

			for(var i: uint = 0; i < pUniformKeys.length; i++){
				var sName: string = pUniformKeys[i];

				if(this.isUniformExists(sName)){
					var eType: EAFXShaderVariableType =  pPassInput._getUniformType(sName);
					var iLength: uint = pPassInput._getUnifromLength(sName);
					
					this._pRealUniformTypeMap[sName] = eType;
					this._pRealUniformLengthMap[sName] = iLength;

					if (iLength > 0 && 
						(eType === EAFXShaderVariableType.k_Sampler2D || eType === EAFXShaderVariableType.k_SamplerCUBE)){

						this._pRealSampleArraysFromInput.push(sName);
					}
					else {
						this._pRealUnifromFromInput.push(sName);
					}
				}
				else {
					this._pUniformExistMap[sName] = false;
				}
			}

			this._pRealSamplersFromInput = [];
			var iTotalSamplerSlots: uint = pBlend.totalActiveSlots;

			for(var i: uint = 0; i < iTotalSamplerSlots; i++){
				if(i === ZERO_SLOT) {
					this._isUsedZero2D = this.isUniformExists("as0");
					this._isUsedZeroCube = this.isUniformExists("asc0");
					continue;
				}

				var pSamplers: util.ObjectArray = pBlend.getSamplersBySlot(i);
				var sRealSamplerName: string = "as" + i.toString();

				if(this.isUniformExists(sRealSamplerName)){
					var pSampler: IAFXVariableDeclInstruction = pBlend.getSamplersBySlot(i).value(0);
					var sSampler: string = pSampler.getRealName();

					this._pRealUnifromFromInput.push(sSampler);
					this._pRealSamplersNames.push(sRealSamplerName);

					this._pRealUniformTypeMap[sRealSamplerName] = pSampler.getType().isSampler2D() ?
																 		EAFXShaderVariableType.k_Sampler2D :
																 		EAFXShaderVariableType.k_SamplerCUBE;
					this._pRealUniformLengthMap[sRealSamplerName] = 0;


				}
				else {
					this._pUniformExistMap[sRealSamplerName] = false;
				}
			}


			this._pRealAttrSlotFromFlows = [];
			this._pRealAttrIsIndexData = [];
			this._pBufferSamplersFromFlows = [];

			var iTotalAttrSlots: uint = pAttrs.totalSlots;
			var pSemantics: string[] = pAttrs.semantics;
			
			var nPreparedAttrs: int = -1;
			var nPreparedBuffers: int = -1;

			var pSemanticsBySlot: StringMap = <StringMap>{};

			for(var i: uint = 0; i < pSemantics.length; i++){
				var sSemantic: string = pSemantics[i];
				var iSlot: uint = pAttrs.getSlotBySemantic(sSemantic);
				if(iSlot === -1){
					continue;
				}

				var iBufferSlot: uint = pAttrs.getBufferSlotBySemantic(sSemantic);

				if(iSlot > nPreparedAttrs){
					var sAttrName: string = "aa" + iSlot.toString();
					
					if(this.isAttrExists(sAttrName)){
						this._pRealAttrSlotFromFlows.push(sSemantic);
						
						if(pAttrs.getType(sSemantic).isComplex()){
							this._pRealAttrIsIndexData.push(true);
						}
						else {
							this._pRealAttrIsIndexData.push(false);
						}

						pSemanticsBySlot[iSlot] = sSemantic;
					}
					else {
						this._pRealAttrSlotFromFlows.push(null);
						this._pAttrExistMap[sAttrName] = false;
						pSemanticsBySlot[iSlot] = null;
					}

					nPreparedAttrs++;
				}

				if(iBufferSlot > nPreparedBuffers){
					var sBufferName: string = "abs" + iBufferSlot.toString();
					
					if(this.isUniformExists(sBufferName)){
						this._pBufferSamplersFromFlows.push(sSemantic);
						this._pRealUniformTypeMap[sBufferName] = EAFXShaderVariableType.k_SamplerVertexTexture;
					}
					else {
						this._pUniformExistMap[sBufferName] = false;
					}
					
					nPreparedBuffers++;
				}

				//Offsets

			}

			// this._pRealOffsetsFromFlows = [];
			// this._pDefaultOffsets = [];
			// this._pRealOffsetKeys = [];

			// var pOffsetKeys: string[] = pAttrs.offsetKeys;

			// for(var i:uint = 0; i < pOffsetKeys.length; i++) {
			// 	var sName: string = pOffsetKeys[i];
			// 	var iOffsetSlot: uint = pAttrs.getSlotByOffset(sName);
			// 	var sFlowSemantic: string = pSemanticsBySlot[iOffsetSlot];

			// 	if(isNull(sFlowSemantic)){
			// 		continue;
			// 	}

			// 	this._pRealOffsetsFromFlows.push(sFlowSemantic);
			// 	this._pRealOffsetKeys.push(sName);
			// 	this._pDefaultOffsets.push(pAttrs.getOffsetDefault(sName));
			// }
			this._pAttrContainer = pAttrs;

			return true;
		}

		_make(pPassInput: IAFXPassInputBlend, pBufferMap: util.BufferMap): IShaderInput {
			var pUniforms: Object = pPassInput.uniforms;
			var pTextures: Object = pPassInput.textures
			var pSamplers: IAFXSamplerStateMap = pPassInput.samplers;
			var pSamplerArrays: IAFXSamplerStateListMap = pPassInput.samplerArrays;

			var pInput: IShaderInput = this._getShaderInput();

			for(var i: uint = 0; i < this._pRealUnifromFromInput.length; i++){
				var sName: string = this._pRealUnifromFromInput[i];
				pInput[sName] = pUniforms[sName];
			}

			for(var i: uint = 0; i < this._pRealSamplersFromInput.length; i++){
				var sRealName: string = this._pRealSamplersNames[i];
				var sName: string = this._pRealSamplersFromInput[i];
				var pState: IAFXSamplerState = pPassInput._getSamplerState(sName);
				var pTexture: ITexture = pPassInput._getTextureForSamplerState(pState);

				this.setSamplerState(pInput[sName], pTexture, pState);
			}

			for(var i: uint = 0; i < this._pRealSampleArraysFromInput.length; i++){
				var sName: string = this._pRealSampleArraysFromInput[i];
				var iLength: uint = this._pRealUniformLengthMap[sName];
				var pSamplerStates: IAFXSamplerState[] = pSamplerArrays[sName];
				var pInputStates: IAFXSamplerState[] = pInput[sName];

				for(var j: uint = 0; j < iLength; j++){
					var pTexture: ITexture = pPassInput._getTextureForSamplerState(pSamplerStates[j]);
					this.setSamplerState(pInputStates[j], pTexture, pSamplerStates[j]);
				}
			}

			var iBufferSlot: uint = 0;

			for(var i: uint = 0; i < this._pRealAttrSlotFromFlows.length; i++){
				var sSemantic: string = this._pRealAttrSlotFromFlows[i];

				if(isNull(sSemantic)){
					continue;
				}

				var isIndex: bool = this._pRealAttrIsIndexData[i];
				var pFlow: IDataFlow = isIndex ? pBufferMap.findFlow(sSemantic) : pBufferMap.getFlow(sSemantic, true);

				var sBufferFlowSemantic: string = this._pBufferSamplersFromFlows[iBufferSlot];

				if(sBufferFlowSemantic === sSemantic){
					var sBufferName: string = "abs" + iBufferSlot.toString();
					pInput[sBufferName] = pFlow.data.buffer;
					iBufferSlot++;
				}

				var sAttrName: string = "aa" + i.toString();
				pInput[sAttrName] = pFlow;


				var pOffsetVars: IAFXVariableDeclInstruction[] = this._pAttrContainer.getOffsetVarsBySemantic(sSemantic);
				if(!isNull(pOffsetVars)){
					var pVertexDecl: IVertexDeclaration = pFlow.data.getVertexDeclaration();

					for(var j: uint = 0; j < pOffsetVars.length; j++){
						var sOffsetSemantic: string = pOffsetVars[j].getSemantic();
						var sOffsetName: string = pOffsetVars[j].getRealName();

						if(this.isUniformExists(sOffsetName)){
							var pElement: IVertexElement = pVertexDecl.findElement(sOffsetSemantic);
						
							if(isNull(pElement)){
								pInput[sOffsetName] = this._pAttrContainer.getOffsetDefault(sOffsetName);
							}
							else {
								pInput[sOffsetName] = pElement.offset;
							}

							//TODO: 
							this._pRealUniformTypeMap[sOffsetName] = EAFXShaderVariableType.k_Float;
						}
						else {
							this._pUniformExistMap[sOffsetName] = null;
						}
					}
				}
			}



			return pInput;
		}

		private setSamplerState(pOut: IAFXSamplerState, pTexture: ITexture, pFrom: IAFXSamplerState): void {
			pOut.texture = pTexture;
			pOut.wrap_s = pFrom.wrap_s;
			pOut.wrap_t = pFrom.wrap_t;
			pOut.mag_filter = pFrom.mag_filter;
			pOut.min_filter = pFrom.min_filter;
		}

	} 
}

#endif