/// <reference path="../../../build/akra.d.ts" />

/// <reference path="IUIComponent.ts" />

module akra {
	export interface IUIRenderTargetStats extends IUIComponent {
		getTarget(): IRenderTarget;
		setTarget(pTarget: IRenderTarget): void;
	}
}

