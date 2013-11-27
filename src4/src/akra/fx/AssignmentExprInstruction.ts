/// <reference path="ExprInstruction.ts" />


module akra.fx {

    /**
     * Represent someExpr = += -= /= *= %= someExpr
     * (=|+=|-=|*=|/=|%=) Instruction Instruction
     */
    export class AssignmentExprInstruction extends ExprInstruction {
        constructor() {
            super();
            this._pInstructionList = [null, null];
            this._eInstructionType = EAFXInstructionTypes.k_AssignmentExprInstruction;
        }

        toFinalCode(): string {
            var sCode: string = "";
            sCode += this.getInstructions()[0].toFinalCode();
            sCode += this.getOperator();
            sCode += this.getInstructions()[1].toFinalCode();
            return sCode;
        }

        addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap,
            eUsedMode: EVarUsedMode = EVarUsedMode.k_Undefined): void {
            var sOperator: string = this.getOperator();
            var pSubExprLeft: IAFXExprInstruction = <IAFXExprInstruction>this.getInstructions()[0];
            var pSubExprRight: IAFXExprInstruction = <IAFXExprInstruction>this.getInstructions()[1];

            if (eUsedMode === EVarUsedMode.k_Read || sOperator !== "=") {
                pSubExprLeft.addUsedData(pUsedDataCollector, EVarUsedMode.k_ReadWrite);
            }
            else {
                pSubExprLeft.addUsedData(pUsedDataCollector, EVarUsedMode.k_Write);
            }

            pSubExprRight.addUsedData(pUsedDataCollector, EVarUsedMode.k_Read);
        }
    }
}
