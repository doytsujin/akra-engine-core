/// <reference path="ExprInstruction.ts" />

module akra.fx.instructions {

    /**
     * Represent + - ! ++ -- expr
     * (+|-|!|++|--|) Instruction
     */
    export class UnaryExprInstruction extends ExprInstruction {
        constructor() {
            super();
            this._pInstructionList = [null];
            this._eInstructionType = EAFXInstructionTypes.k_UnaryExprInstruction;
        }

        _toFinalCode(): string {
            var sCode: string = "";
            sCode += this._getOperator();
            sCode += this._getInstructions()[0]._toFinalCode();
            return sCode;
        }

        addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap,
            eUsedMode: EVarUsedMode = EVarUsedMode.k_Undefined): void {
            if (this._getOperator() === "++" || this._getOperator() === "--") {
                (<IAFXExprInstruction>this._getInstructions()[0]).addUsedData(pUsedDataCollector, EVarUsedMode.k_ReadWrite);
            }
            else {
                (<IAFXExprInstruction>this._getInstructions()[0]).addUsedData(pUsedDataCollector, EVarUsedMode.k_Read);
            }
        }

        isConst(): boolean {
            return (<IAFXExprInstruction>this._getInstructions()[0]).isConst();
        }

        evaluate(): boolean {
            var sOperator: string = this._getOperator();
            var pExpr: IAFXExprInstruction = <IAFXExprInstruction>this._getInstructions()[0];

            if (!pExpr.evaluate()) {
                return;
            }

            var pRes: any = null;

            try {
                pRes = pExpr.getEvalValue();
                switch (sOperator) {
                    case "+":
                        pRes = +pRes;
                        break;
                    case "-":
                        pRes = -pRes;
                        break;
                    case "!":
                        pRes = !pRes;
                        break;
                    case "++":
                        pRes = ++pRes;
                        break;
                    case "--":
                        pRes = --pRes;
                        break;
                }
            }
            catch (e) {
                return false;
            }

            this._pLastEvalResult = pRes;
            return true;
        }
    }
}
