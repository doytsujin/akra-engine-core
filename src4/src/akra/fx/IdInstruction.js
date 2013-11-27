var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var akra;
(function (akra) {
    /// <reference path="../idl/IAFXInstruction.ts" />
    /// <reference path="Instruction.ts" />
    (function (fx) {
        var IdInstruction = (function (_super) {
            __extends(IdInstruction, _super);
            /**
            * EMPTY_OPERATOR EMPTY_ARGUMENTS
            */
            function IdInstruction() {
                _super.call(this);
                this._isForVarying = false;
                this._sName = "";
                this._sRealName = "";
                this._eInstructionType = akra.EAFXInstructionTypes.k_IdInstruction;
            }
            IdInstruction.prototype.isVisible = function () {
                return this.getParent().isVisible();
            };

            IdInstruction.prototype.getName = function () {
                return this._sName;
            };

            IdInstruction.prototype.getRealName = function () {
                if (this._isForVarying) {
                    return "V_" + this._sRealName;
                } else {
                    return this._sRealName;
                }
            };

            IdInstruction.prototype.setName = function (sName) {
                this._sName = sName;
                this._sRealName = sName;
            };

            IdInstruction.prototype.setRealName = function (sRealName) {
                this._sRealName = sRealName;
            };

            IdInstruction.prototype._markAsVarying = function (bValue) {
                this._isForVarying = bValue;
            };

            IdInstruction.prototype.toString = function () {
                return this._sRealName;
            };

            IdInstruction.prototype.toFinalCode = function () {
                return this.getRealName();
            };

            IdInstruction.prototype.clone = function (pRelationMap) {
                var pClonedInstruction = (_super.prototype.clone.call(this, pRelationMap));
                pClonedInstruction.setName(this._sName);
                pClonedInstruction.setRealName(this._sRealName);
                return pClonedInstruction;
            };
            return IdInstruction;
        })(fx.Instruction);
        fx.IdInstruction = IdInstruction;
    })(akra.fx || (akra.fx = {}));
    var fx = akra.fx;
})(akra || (akra = {}));
