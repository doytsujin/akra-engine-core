#ifndef ENGINE_TS
#define ENGINE_TS

#include "common.ts"

#include "IEngine.ts"
#include "ISceneManager.ts"
#include "IParticleManager.ts"
#include "IResourcePoolManager.ts"
#include "IRenderer.ts"
#include "IUtilTimer.ts"
#include "IScene3d.ts"

#include "pool/ResourcePoolManager.ts"
#include "scene/SceneManager.ts"
#include "util/UtilTimer.ts"

//include sub creation classes.

#include "render/RenderDataCollection.ts"
#include "model/Mesh.ts"
#include "util/BufferMap.ts"
#include "animation/AnimationController.ts"
#include "model/Skeleton.ts"
#include "util/DepsManager.ts"

#ifdef WEBGL
#include "webgl/WebGLRenderer.ts"
#endif

module akra.core {
	export class Engine implements IEngine {

		private _pResourceManager: IResourcePoolManager;
		private _pSceneManager: ISceneManager;
		private _pParticleManager: IParticleManager;
		private _pRenderer: IRenderer;

		/** stop render loop?*/
		private _pTimer: IUtilTimer;
		private _iAppPausedCount: int = 0;


		/** is paused? */
		private _isActive: bool = false;
		/** frame rendering sync / render next frame? */
		private _isFrameMoving: bool = true;
		/** is all needed files loaded */
		private _isDepsLoaded: bool = false;



		constructor (pOptions: IEngineOptions = null) {
			//== Depends Managment ====================================
			
			var pDeps: IDependens = Engine.DEPS;
			var sDepsRoot: string = Engine.DEPS_ROOT;
			var pDepsManager: IDepsManager = util.createDepsManager(this);

			//read options 
			if (!isNull(pOptions)) {
				sDepsRoot = pOptions.depsRoot || Engine.DEPS_ROOT;
				//default deps has higher priority!
				if (isDefAndNotNull(pOptions.deps)) {
					pDeps.files = pDeps.files.concat(pOptions.deps.files || []);
				}
			}

			//get loaded signal
			this.connect(pDepsManager, SIGNAL(loaded), SLOT(_depsLoaded));

			//load depends!
			if (!pDepsManager.load(pDeps, sDepsRoot)) {
				CRITICAL("load dependencies are not started.");
			}

			//===========================================================

			this._pResourceManager = new pool.ResourcePoolManager(this);
			this._pSceneManager = new scene.SceneManager(this);
			this._pParticleManager = null;

#ifdef WEBGL
			this._pRenderer = new webgl.WebGLRenderer(this);
#else
			CRITICAL("render system not specified");
#endif


			if (!this._pResourceManager.initialize()) {
				debug_error('cannot initialize ResourcePoolManager');
			}

			if (!this._pSceneManager.initialize()) {
				debug_error("cannot initialize SceneManager");
			}

			this._pTimer = util.UtilTimer.start();
			this.pause(false);
		}

		inline getScene(): IScene3d {
			return this._pSceneManager.getScene3D(0);
		}

		inline getSceneManager(): ISceneManager {
			return this._pSceneManager;
		}

		inline getParticleManager(): IParticleManager {
			return null;
		}


		inline getResourceManager(): IResourcePoolManager {
			return this._pResourceManager;
		}

		inline getRenderer(): IRenderer {
			return this._pRenderer;
		}
	
		inline isActive(): bool {
			return this._isActive;
		}

		exec(bValue: bool = true): void {
			var pRenderer: IRenderer = this._pRenderer;
			var pEngine: Engine = this;
			// var pCanvas: HTMLCanvasElement = null;

#if WEBGL
			// pCanvas = (<IWebGLRenderer>pRenderer).getHTMLCanvas();
#endif			

			ASSERT(!isNull(pRenderer));

	        pRenderer._initRenderTargets();

	        // Infinite loop, until broken out of by frame listeners
	        // or break out by calling queueEndRendering()
	        bValue? this.active(): this.inactive();
	        

	        function render(iTime: uint): void { 
#ifdef DEBUG
				if (pRenderer.isValid()) {
					ERROR(pRenderer.getError());
				}
#endif
	        	if (!pEngine.isActive()) {
	                return;
	            }

	            if (!pEngine.renderFrame()) {
	                debug_error("Engine::exec() error.");
	                return;
	            }

	            requestAnimationFrame(render/*, pCanvas*/); 
	        } 

	        render(0);
		}

		inline getTimer(): IUtilTimer { return this._pTimer; }

		renderFrame(): bool {
		    var fElapsedAppTime: float 	= this._pTimer.elapsedTime;

		    if (0. == fElapsedAppTime && this._isFrameMoving) {
		        return true;
		    }

		    // FrameMove (animate) the scene
		    if (this._isFrameMoving) {
		    	this._pSceneManager.update();
		    }

	        // Render the scene as normal
	    	this.frameStarted();
		    this._pRenderer._updateAllRenderTargets();
		    this.frameEnded();

			return true;
		}

		play(): bool {
			if (!this.isActive()) { 
				this._iAppPausedCount = 0;
				this.active();

				if (this._isFrameMoving) {
		            this._pTimer.start();
		        }
	        }

	        return this.isActive();
		}

		pause(isPause: bool = false): bool {
			this._iAppPausedCount += ( isPause ? +1 : -1 );
		   (this._iAppPausedCount ? this.inactive() : this.active());

		    // Handle the first pause request (of many, nestable pause requests)
		    if (isPause && ( 1 == this._iAppPausedCount )) {
		        // Stop the scene from animating
		        if (this._isFrameMoving) {
		            this._pTimer.stop();
		        }
		    }

		    if (0 == this._iAppPausedCount) {
		        // Restart the timers
		        if (this._isFrameMoving) {
		            this._pTimer.start();
		        }
		    }

		    return !this.isActive();
		}

		inline createMesh(sName: string = null, eOptions: int = 0, pDataBuffer: IRenderDataCollection = null): IMesh {
			return model.createMesh(this, sName, eOptions, pDataBuffer);
		}

		inline createRenderDataCollection(iOptions: int = 0): IRenderDataCollection {
			return render.createRenderDataCollection(this, iOptions);
		}

		inline createBufferMap(): IBufferMap {
			return util.createBufferMap(this);
		}

		inline createAnimationController(iOptions: int = 0): IAnimationController {
			return animation.createController(this, iOptions);
		}

		_depsLoaded(pLoader: IDepsManager): void {
			this._isDepsLoaded = true;
		}

		static DEPS_ROOT: string = "src2/data/";
		static DEPS: IDependens = 
#ifdef DEBUG
			{
				files: [ 
					"grammars/HLSL.gr" 
				],
				deps: {
						files: [
							"effects/SystemEffects.afx",
						    "effects/Plane.afx",
						    "effects/mesh.afx",
						    "effects/mesh_geometry.afx",
						    "effects/mesh_texture.afx",
						    "effects/TextureToScreen.afx",
						    "effects/prepare_shadows.afx",
						    "effects/prepareDeferredShading.afx",
						    "effects/deferredShading.afx",
						    "effects/apply_lights_and_shadows.afx",
						    "effects/fxaa.afx",
						    "effects/skybox.afx"
						]
					}
			};
#else 
		null;
#endif			

		BEGIN_EVENT_TABLE(Engine);
			BROADCAST(frameStarted, VOID);
			BROADCAST(frameEnded, VOID);
			
			signal inactive(): void {
				this._isActive = false;
				EMIT_BROADCAST(inactive, _VOID);
			}

			signal active(): void {
				this._isActive = true;
				EMIT_BROADCAST(active, _VOID);
			}
			
			// BROADCAST(inactive, VOID);
			// BROADCAST(active, VOID);
		END_EVENT_TABLE();

	}

}

module akra {
	createEngine = function (pOptions?: IEngineOptions): IEngine {
		return new core.Engine(pOptions);
	}
}

/*
		private initDefaultStates(): bool {
			this.pRenderState = {
		        mesh            : {
		            isSkinning : false
		        },
		        isAdvancedIndex : false,
		        lights          : {
		            omni : 0,
		            project : 0,
		            omniShadows : 0,
		            projectShadows : 0
		        }
		    };

			return true;
		}
 */

#endif