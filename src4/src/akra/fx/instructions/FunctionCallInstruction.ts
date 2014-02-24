/// <reference path="ExprInstruction.ts" />

module akra.fx.instructions {

	/**
	 * Respresnt func(arg1,..., argn)
	 * EMPTY_OPERATOR IdExprInstruction ExprInstruction ... ExprInstruction 
	 */
	export class FunctionCallInstruction extends ExprInstruction {
		constructor() {
			super();
			this._pInstructionList = [null];
			this._eInstructionType = EAFXInstructionTypes.k_FunctionCallInstruction;
		}

		_toFinalCode(): string {
			var sCode: string = "";

			sCode += this._getInstructions()[0]._toFinalCode();
			sCode += "(";
			for (var i: uint = 1; i < this._nInstructions; i++) {
				sCode += this._getInstructions()[i]._toFinalCode();
				if (i !== this._nInstructions - 1) {
					sCode += ","
				}
			}
			sCode += ")"

			return sCode;
		}

		getFunction(): IAFXFunctionDeclInstruction {
			return <IAFXFunctionDeclInstruction>(<IAFXIdExprInstruction>this._pInstructionList[0]).getType()._getParent()._getParent();
		}

		addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap,
			eUsedMode: EVarUsedMode = EVarUsedMode.k_Undefined): void {
			var pExprList: IAFXExprInstruction[] = <IAFXExprInstruction[]>this._getInstructions();
			var pFunction: IAFXFunctionDeclInstruction = this.getFunction();
			var pArguments: IAFXVariableDeclInstruction[] = <IAFXVariableDeclInstruction[]>pFunction.getArguments();

			pExprList[0].addUsedData(pUsedDataCollector, eUsedMode);

			for (var i: uint = 0; i < pArguments.length; i++) {
				if (pArguments[i].getType().hasUsage("out")) {
					pExprList[i + 1].addUsedData(pUsedDataCollector, EVarUsedMode.k_Write);
				}
				else if (pArguments[i].getType().hasUsage("inout")) {
					pExprList[i + 1].addUsedData(pUsedDataCollector, EVarUsedMode.k_ReadWrite);
				}
				else {
					pExprList[i + 1].addUsedData(pUsedDataCollector, EVarUsedMode.k_Read);
				}
			}
		}
	}
}

