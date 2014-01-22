/// <reference path="idl/EDataTypes.ts" />
/// <reference path="idl/IEngine.ts" />
/// <reference path="core/Engine.ts" />

module akra {
	export function createEngine(): akra.IEngine {
		return new core.Engine;
	}
}

