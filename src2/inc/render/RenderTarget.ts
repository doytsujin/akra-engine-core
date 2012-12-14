#ifndef RENDERTARGET_TS
#define RENDERTARGET_TS

#include "IRenderTarget.ts"

#include "util/FrameStat.ts"
#include "core/pool/resources/DepthBuffer.ts"

/* Define the number of priority groups for the render system's render targets. */
#ifndef NUM_RENDERTARGET_GROUPS
	#define NUM_RENDERTARGET_GROUPS 10
	#define DEFAULT_RT_GROUP 4
	#define REND_TO_TEX_RT_GROUP 2
#endif

module akra.render {

	export class RenderTarget implements IRenderTarget {
		protected _sName: string;
		
		protected _iPriority: uint = DEFAULT_RT_GROUP;
		
		protected _iWidth: uint;
		protected _iHeight: uint;

		protected _iColorDepth: int;
		protected _pDepthBuffer: IDepthBuffer = null;

		protected _pFrameStats: IFrameStat;

		protected _pTimer: IUtilTimer;
		protected _fLastSecond: uint;
		protected _fLastTime: uint;
		protected _iFrameCount: uint;

		protected _isActive: bool = true;
		protected _isAutoUpdate: bool = true;

		protected _bHwGamma: bool = false;

		protected _pViewportList: IViewport[];

		protected updateImpl(): void;

		inline get name(): string { return this._sName; }
		inline set name(sName: string) { this._sName = sName; }

		inline get width(): uint { return this._iWidth; }
		inline get height(): uint { return this._iHeight; }
		inline get colorDepth(): int { return this._iColorDepth; }

		inline get totalViewports(): uint { return this._pViewportList.length; }


		constructor () {
			this._pTimer = pEngine.getTimer();

			this.resetStatistics();
		}

		destroy(): void {
			var pViewport: IViewport;
			
			for (var i in this._pViewportList) {
				pViewport = this._pViewportList[i];
				this.viewportRemoved(pViewport)
				pViewport.destroy();
			}

			this.detachDepthBuffer();

			debug_print("RenderTarget '%s'\n Average FPS: %s\n Best FPS: %s\n Worst FPS: %s", 
				this._sName, 
				this._pFrameStats.fps.avg, 
				this._pFrameStats.fps.best,
				this._pFrameStats.fps.worst);
		}

		getDepthBuffer(): IDepthBuffer { 
			return this._pDepthBuffer; 
		}
		
		attachDepthBuffer(pBuffer: IDepthBuffer): bool {
			var isOk: bool = false;

			if ((isOk = pBuffer.isCompatible(this))) {
				this.detachDepthBuffer();
				this._pDepthBuffer = pBuffer;
				this._pDepthBuffer._notifyRenderTargetAttached(this);
			}

			return isOk;
		}

		detachDepthBuffer(): void {
			if (this._pDepthBuffer) {
				this._pDepthBuffer._notifyRenderTargetDetached( this );
				this._pDepthBuffer = null;
			}
		}

		_detachDepthBuffer(): void {
			this._pDepthBuffer = null;
		}

		updateImpl(): void {
			this._beginUpdate();
			this._updateAutoUpdatedViewports(true);
			this._endUpdate();
		}

		_beginUpdate(): void {
			this.preUpdate();

			this._pFrameStats.polygonsCount = 0;
		}

		_updateAutoUpdatedViewports(bUpdateStatistics: bool): void {
	        var pViewport: IViewport;

	        for (var i in this._pViewportList) {
				pViewport = this._pViewportList[i];

				if(pViewport.isAutoUpdated()) {
					this._updateViewport(pViewport, bUpdateStatistics);
				}
			}
		}

		_endUpdate(): void {
			this.postUpdate();
			this.updateStats();
		}

		_updateViewport(iZIndex: int, bUpdateStatistics: bool = true): void;
		_updateViewport(pViewportPtr: IViewport, bUpdateStatistics: bool = true): void;
		_updateViewport(pViewportPtr: any, bUpdateStatistics: bool = true): void {
			var pViewport: IViewport;
			var iZIndex: int

			if (isNumber(arguments[0])) {
				iZIndex = <int>arguments[0];
				pViewport = this._pViewportList[iZIndex];

				ASSERT (isDefAndNotNull(pViewport), "No viewport with given z-index : %s", iZIndex, 
					"RenderTarget::_updateViewport");
			}
			else {
				pViewport = <IViewport>arguments[0];
			}

			ASSERT(viewport->getTarget() == this &&
				"RenderTarget::_updateViewport the requested viewport is "
				"not bound to the rendertarget!");

			this.viewportPreUpdate(pViewport);

			pViewport.update();

			if (bUpdateStatistics) {
				this._pFrameStats.polygonsCount += pViewport._getNumRenderedPolygons();
			}

			this.viewportPostUpdate(pViewport);
		}

		addViewport(pCamera: ICamera, iZIndex: int = 0, fLeft: float = 0., fTop: float = 0., fWidth: float = 1., fHeight: float = 1.): IViewport {
			var pViewport: IViewport = this._pViewportList[iZIndex];

			if (isDefAndNotNull(pViewport)) {
				CRITICAL("Can't create another viewport for %s with Z-index %s 
					because a viewport exists with this Z-Order already.", this._sName, iZIndex, "RenderTarget::addViewport");
			}

			pViewport = new Viewport(pCamera, this, fLeft, fTop, fWidth, fHeight, iZIndex);

			this._pViewportList[iZIndex] = pViewport;

			this.viewportAdded(pViewport);

			return pViewport;
		}


		removeViewport(iZIndex: int): void {
			var pViewport: IViewport = this._pViewportList[iZIndex];

			if (isDefAndNotNull(pViewport)) {
				this.viewportRemoved(pViewport);

				this._pViewportList.splice(iZIndex, 1);
				pViewport = null;
			}
		}

		removeAllViewports(): void {
			var pViewport: IViewport;
			
			for (var i in this._pViewportList) {
				pViewport = this._pViewportList[i];
	            fireViewportRemoved(pViewport);
	        }

        	mViewportList.clear();
		}

		inline getStatistics(): IFrameStat {
			return this._pFrameStats;
		}

		inline getLastFPS(): float {
			return this._pFrameStats.fps.last;
		}

		inline getAverageFPS(): float {
			return this._pFrameStats.fps.avg;
		}

		inline getBestFPS(): float {
			return this._pFrameStats.fps.best;
		}

		inline getWorstFPS(): float {
			return this._pFrameStats.fps.worst;
		}

		inline getPolygonCount(): uint {
			return this._pFrameStats.polygonsCount;
		}

		inline getBestFrameTime(): float {
			return this._pFrameStats.time.best;
		}

		inline getWorstFrameTime(): float {
			return this._pFrameStats.time.worst;
		}

		resetStatistics(): void {
			var pStats: IFrameStat = this._pFrameStats;
			pStats.fps.avg = 0.;
			pStats.fps.best = 0.;
			pStats.fps.last = 0.;
			pStats.fps.worst = 999.;

			pStats.polygonsCount = 0;

			pStats.time.best = 9999999;
			pStats.time.worst = 0;

			//FIXME: get right time!!!
			this._iLastTime = this._pTimer.appTime;
			this._iLastSecond = this._iLastTime;
			this._iFrameCount = 0;
		}

		updateStats(): void {
			this._iFrameCount ++;

			var fThisTime: float = this._pTimer.appTime;

			var fFrameTime: float = fThisTime - this._fLastTime;

			this._fLastTime = fThisTime;

			this._pFrameStats.time.best = math.min(this._pFrameStats.time.best, fFrameTime);
			this._pFrameStats.time.worst = math.min(this._pFrameStats.time.worst, fFrameTime);

			if (fThisTime - this._fLastTime > 1) {
				this._pFrameStats.fps.last = <float>this._iFrameCount / <float>(fThisTime - this._fLastSecond);

				if (this._pFrameStats.fps.avg == 0.) {
					this._pFrameStats.fps.avg = this._pFrameStats.fps.last;
				}
				else {
					this._pFrameStats.fps.avg = (this._pFrameStats.fps.avg + this._pFrameStats.fps.last) / 2.;

					this._pFrameStats.fps.best = math.max(this._pFrameStats.fps.best, this._pFrameStats.fps.last);
					this._pFrameStats.fps.worst = math.max(this._pFrameStats.fps.worst, this._pFrameStats.fps.last);

					this._fLastSecond = fThisTime;
					this._iFrameCount = 0;
				}
			}
		}

		getViewport(iIndex: uint): IViewport {
			ASSERT(iIndex < this._pViewportList.length, "Index out of bounds");

			for (var i in this._pViewportList) {
				if (iIndex --) {
					continue;
				}

				return this._pViewportList[i]; 
			}

			return null;
		}

		getViewportByZIndex(iZIndex: int): IViewport {
			var pViewport: IViewport = this._pViewportList[iZIndex];
			
			ASSERT(isDefAndNotNull(pViewport), "No viewport with given z-index : "
				+ String(iZIndex), "RenderTarget::getViewportByZIndex");

			return pViewport;
		}

		inline hasViewportByZIndex(iZIndex: int): bool {
			return isDefAndNotNull(this._pViewportList[iZIndex]);
		}

		inline isActive(): bool {
			return this._isActive;
		}

		setActive(bValue: bool = true): void {
			this._isActive = bValue;
		}

		_notifyCameraRemoved(pCamera: ICamera): void {
			var isRemoved: bool = false;
			for (var i in this._pViewportList) {
				var pViewport: IViewport = this._pViewportList[i];

				if (pViewport.getCamera() === pCamera) {
					pViewport.setCamera(null);
					isRemoved = true;
				}
			}

			if (isRemoved) {
				cameraRemoved(pCamera);
			}
		}

		inline setAutoUpdare(bValue: bool = true): void {
			this._isAutoUpdate = bValue;
		}

		inline isAutoUpdated(): bool {
			return this._isAutoUpdate;
		}

		inline isPrimary(): bool {
			// RenderWindow will override and return true for the primary window
			return false;
		}

		update(): void {
			this.updateImpl();
		}

		readPixels(ppDest?: IPixelBox, eFramebuffer?: EFramebuffer): IPixelBox {
			return null;
		}

		protected updateImpl(): void {}

		BEGIN_EVENT_TABLE(RenderTarget);
			BROADCAST(preUpdate, VOID);
			BROADCAST(viewportPreUpdate, CALL(pViewport: IViewport));
			BROADCAST(viewportPostUpdate, CALL(pViewport: IViewport));
			BROADCAST(viewportAdded, CALL(pViewport: IViewport));
			BROADCAST(viewportRemoved, CALL(pViewport: IViewport));
			BROADCAST(postUpdate, VOID)

			BROADCAST(cameraRemoved, CALL(pCamera: ICamera));
		END_EVENT_TABLE();
	} 
}

#endif