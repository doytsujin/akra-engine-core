/// <reference path="../../idl/ILightPoint.ts" />
/// <reference path="../SceneObject.ts" />
/// <reference path="../../math/math.ts" />

module akra.scene.light {

	export class LightPoint extends SceneNode implements ILightPoint {
		protected _isShadowCaster: boolean = false;
		protected _isEnabled: boolean = true;
		protected _iMaxShadowResolution: uint = 256;
		// protected _pLightParameters: ILightParameters = new LightParameters;
		protected _eLightType: ELightTypes;

		//optimized camera frustum for better shadow casting
		protected _pOptimizedCameraFrustum: IFrustum = new geometry.Frustum();

		get lightType(): ELightTypes {
			return this._eLightType;
		}

		constructor(pScene: IScene3d, eType: ELightTypes = ELightTypes.UNKNOWN) {
			super(pScene, EEntityTypes.LIGHT);

			this._eLightType = eType;
		}

		get enabled(): boolean {
			return this._isEnabled;
		}

		set enabled(bValue: boolean) {
			this._isEnabled = bValue;
		}

		get params(): ILightParameters {
			// return this._pLightParameters;
			return null;
		}

		get isShadowCaster(): boolean {
			return this._isShadowCaster;
		}

		set isShadowCaster(bValue: boolean) {
			this._isShadowCaster = bValue;
		}

		get lightingDistance(): float {
			return -1.;
		}

		set lightingDistance(fDistance: float) {
		}

		get optimizedCameraFrustum(): IFrustum {
			return this._pOptimizedCameraFrustum;
		}

		create(isShadowCaster: boolean = true, iMaxShadowResolution: int = 256): boolean {
			var isOk: boolean = super.create();

			//есть тени от источника или нет
			this._isShadowCaster = isShadowCaster;
			//мкасимальный размер shadow текстуры
			this._iMaxShadowResolution = iMaxShadowResolution;

			return isOk;
		}

		_prepareForLighting(pCamera: ICamera): boolean {
			debug.warn("pure virtual method");
			return false;
		}

		_calculateShadows(): void {
			debug.critical("NOT IMPLEMENTED!");
		}

		static isLightPoint(pNode: IEntity) {
			return pNode.type === EEntityTypes.LIGHT;
		}
	}
}
