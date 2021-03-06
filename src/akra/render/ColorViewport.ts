/// <reference path="Viewport.ts" />
/// <reference path="../idl/IObjectArray.ts" />
/// <reference path="../idl/IRenderTexture.ts" />

module akra.render {

	var DEFAULT_COLORPICKER_NAME = ".color-picker";

	var pPixel: IPixelBox = new pixelUtil.PixelBox(new geometry.Box(0, 0, 1, 1), EPixelFormats.BYTE_RGBA, new Uint8Array(4));

	export class ColorViewport extends Viewport implements IViewport {
		protected _pGuidToColorMap: IMap<int> = <any>{};
		protected _pColorToSceneObjectMap: ISceneObject[] = new Array(256);
		protected _pColorToRenderableMap: IRenderableObject[] = new Array(256);

		getGuidToColorMap(): IMap<int> {
			return this._pGuidToColorMap;
		}

		getType(): EViewportTypes {
			return EViewportTypes.COLORVIEWPORT;
		}

		constructor(pCamera: ICamera, fLeft: float = 0., fTop: float = 0., fWidth: float = 1., fHeight: float = 1., iZIndex: int = 0){
			super(pCamera, DEFAULT_COLORPICKER_NAME, fLeft, fTop, fWidth, fHeight, iZIndex);
		}

		_updateImpl(): void {
			var pVisibleObjects: IObjectArray<ISceneObject> = this.getCamera().display();
			var pRenderable: IRenderableObject;
			
			for (var i: int = 0; i < pVisibleObjects.getLength(); ++ i){
				pVisibleObjects.value(i).prepareForRender(this);
			}

			
			for (var i: int = 0; i < 256; ++ i) {
				this._pColorToSceneObjectMap[i] = null;
				this._pColorToRenderableMap[i] = null;
			}

			for (var g in this._pGuidToColorMap) {
				this._pGuidToColorMap[g] = 0;	
			}

			var r = 1;
			var s = 1;

			for (var i: int = 0; i < pVisibleObjects.getLength(); ++ i) {
				var pSceneObject: ISceneObject = pVisibleObjects.value(i);
				
				this._pGuidToColorMap[pSceneObject.guid] = s;
				this._pColorToSceneObjectMap[s] = pSceneObject;
				s ++;
				
				for (var j: int = 0; j < pSceneObject.getTotalRenderable(); j++) {
					pRenderable = pSceneObject.getRenderable(j);
					
					if (!isNull(pRenderable) && !pRenderable.isFrozen()) {

						this._pGuidToColorMap[pRenderable.guid] = r;
						this._pColorToRenderableMap[r] = pRenderable;
						r ++;

						this.prepareRenderableForPicking(pRenderable);
						pRenderable.render(this, this._csDefaultRenderMethod, pSceneObject);
					}
				}
			}

			// this._pCamera = pOldCamera;
		}

		pick(x: uint = 0, y: uint = 0): IRIDPair {
			var pTarget: IRenderTarget = this.getTarget();

			if (pTarget instanceof RenderTexture) {
				var pPixelBuffer: IPixelBuffer = (<IRenderTexture>pTarget).getPixelBuffer();
				x = math.round(x);
				y = math.round(y);

				pPixel.left = x;
				pPixel.right = x + 1;
				pPixel.top = y;
				pPixel.bottom = y + 1;

				if (pPixelBuffer.readPixels(pPixel)) {
					console.log(pPixel.data[0], pPixel.data[1], pPixel.data[2], pPixel.data[3]);
					return {
						object: this._pColorToSceneObjectMap[pPixel.data[0]] || null,
						renderable: this._pColorToRenderableMap[pPixel.data[1]] || null
					};
				}
			}

			return null;
		}
		
		protected _onRender(pTechnique: IRenderTechnique, iPass: uint, pRenderable: IRenderableObject, pSceneObject: ISceneObject): void {
			var pPass: IRenderPass = pTechnique.getPass(iPass);

			pPass.setUniform("RENDERABLE_ID", this.getGuidToColorMap()[pRenderable.guid]);
			pPass.setUniform("OPTIMIZED_PROJ_MATRIX", this.getCamera().getProjectionMatrix());
			//pPass.setUniform("color", util.colorToVec4(util.randomColor(true)));

			if (!isNull(pSceneObject)) {
				pPass.setUniform("SCENE_OBJECT_ID", this.getGuidToColorMap()[pSceneObject.guid]);
			}

			super._onRender(pTechnique, iPass, pRenderable, pSceneObject);
		}	

		private prepareRenderableForPicking(pRenderable: IRenderableObject): void {
			var pRenderTechnique: IRenderTechnique = pRenderable.getTechnique(this._csDefaultRenderMethod);

			if(!isNull(pRenderTechnique)) {
				return;
			}


			var pRmgr: IResourcePoolManager = this.getTarget().getRenderer().getEngine().getResourceManager();
			var pMethodPool: IResourcePool<IRenderMethod> = pRmgr.getRenderMethodPool();
			var pMethod: IRenderMethod = <IRenderMethod>pMethodPool.findResource(".method-color-picker");
			
			if (isNull(pMethod)) {
				pMethod = pRmgr.createRenderMethod(".method-color-picker");
				pMethod.setEffect(pRmgr.createEffect(".effect-color-picker"));
				pMethod.getEffect().addComponent("akra.system.colorPicker");
			}

			pRenderable.addRenderMethod(pMethod, this._csDefaultRenderMethod);
		}
	}
}

