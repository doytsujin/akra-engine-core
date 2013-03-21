#ifndef WEBGLRENDERER_TS
#define WEBGLRENDERER_TS

#include "WebGL.ts"
#include "render/Renderer.ts"
#include "WebGLCanvas.ts"
#include "render/Viewport.ts"
#include "WebGLShaderProgram.ts"
#include "IShaderInput.ts"

#define WEBGL_MAX_FRAMEBUFFER_NUM 32

module akra.webgl {
	export class WebGLRenderer extends render.Renderer {
		private _pCanvas: HTMLCanvasElement;

		private _pWebGLContext: WebGLRenderingContext;
		private _pWebGLFramebufferList: WebGLFramebuffer[];

		private _pDefaultCanvas: ICanvas3d;

		//real context, if debug context used
		private _pWebGLInternalContext: WebGLRenderingContext = null;

		private _nActiveAttributes: uint = 0;
		private _iSlot: int = 0;

		constructor (pEngine: IEngine);
		constructor (pEngine: IEngine, sCanvas: string);
		constructor (pEngine: IEngine, pCanvas: HTMLCanvasElement);
		constructor (pEngine: IEngine, pCanvas?: any) {
			super(pEngine);

			if (isDef(pCanvas)) {
				
				//get HTMLCanvasElement by id
				if (isString(pCanvas)) {
					this._pCanvas = <HTMLCanvasElement>document.getElementById(pCanvas);
				}
				else {
					this._pCanvas = <HTMLCanvasElement>pCanvas;
				}
			}
			else {
				this._pCanvas = <HTMLCanvasElement>document.createElement('canvas');
			}

			this._pWebGLContext = createContext(this._pCanvas);

			this._pWebGLFramebufferList = new Array(WEBGL_MAX_FRAMEBUFFER_NUM);


			for (var i: int = 0; i < this._pWebGLFramebufferList.length; ++ i) {
				this._pWebGLFramebufferList[i] = this._pWebGLContext.createFramebuffer();
			}

			this._pDefaultCanvas = new WebGLCanvas(this);
			this.attachRenderTarget(this._pDefaultCanvas);
		}

		debug(bValue: bool = true, useApiTrace: bool = false): bool {
			var pWebGLInternalContext: WebGLRenderingContext = this._pWebGLContext;

			if (bValue) {
				if (isDef((<any>window).WebGLDebugUtils) && !isNull(pWebGLInternalContext)) {
		            
		            this._pWebGLContext = WebGLDebugUtils.makeDebugContext(pWebGLInternalContext, 
		                (err: int, funcName: string, args: IArguments): void => {
		                    throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
		                },
		                useApiTrace? 
		                (funcName: string, args: IArguments): void => {   
		                   LOG("gl." + funcName + "(" + WebGLDebugUtils.glFunctionArgsToString(funcName, args) + ")");   
		                }: null);

		            this._pWebGLInternalContext = pWebGLInternalContext;
		            
		            return true;
		        }
	        }
	        else if (this.isDebug()) {
	        	this._pWebGLContext = this._pWebGLInternalContext;
	        	this._pWebGLInternalContext = null;

	        	return true;
	        }

			return false;
		}

		_beginRender(): void {

		}

		_renderEntry(pEntry: IRenderEntry): void {
			var pViewport: render.Viewport = <render.Viewport>pEntry.viewport;
			var pRenderTarget: IRenderTarget = (<render.Viewport>pViewport).getTarget();
			var pInput: IShaderInput = pEntry.input;
			var pMaker: fx.Maker = <fx.Maker>pEntry.maker;

			(<any>pRenderTarget)._bind();
			var pWebGLProgram: WebGLShaderProgram = <WebGLShaderProgram>(pMaker).shaderProgram;

			this.useWebGLProgram(pWebGLProgram.getWebGLProgram());

			this.enableWebGLVertexAttribs(pWebGLProgram.totalAttributes);

			var pAttribLocations: IntMap = pWebGLProgram._getActiveAttribLocations();
			var pAttributeSemantics: string[] = pMaker.attributeSemantics;
			var pAttributeNames: string[] = pMaker.attributeNames;

			var nPreparedBuffers: uint = 0;
			for(var i: uint = 0; i < pAttributeNames.length; i++){
				var sAttrName: string = pAttributeNames[i];
				var sAttrSemantic: string = pAttributeSemantics[i];

				if(isNull(sAttrSemantic)){
					continue;
				}

				var iLoc: int = pAttribLocations[sAttrName];
				var pFlow: IDataFlow = pInput[sAttrName];
				var pData: data.VertexData = null;
				var sSemantics: string = null;
				
				if (pFlow.type === EDataFlowTypes.MAPPABLE) {
					pData = <data.VertexData>pFlow.mapper.data;
					sSemantics = pFlow.mapper.semantics;
				}
				else {
					pData = <data.VertexData>pFlow.data;
					sSemantics = sAttrSemantic;
				}

				var pDecl: data.VertexDeclaration = <data.VertexDeclaration>pData.getVertexDeclaration();
				var pVertexElement: data.VertexElement = <data.VertexElement>pDecl.findElement(sSemantics);
				this._pWebGLContext.vertexAttribPointer(iLoc,
                                    pVertexElement.count,
                                    pVertexElement.type,
                                    false,
                                    pData.stride,
                                    pVertexElement.offset);
			}

			var pUniforms: WebGLUniformLocationMap = pWebGLProgram.getWebGLUniformLocations();

			for (var sUniformName in pUniforms) {
				var pValue: any = pInput[sUniformName];
				pMaker.setUniform(sUniformName, pValue);
			}

		}

		_endRender(): void {

		}
		
		isDebug(): bool {
			return !isNull(this._pWebGLInternalContext);
		}

		inline getHTMLCanvas(): HTMLCanvasElement {
			return this._pCanvas;
		}

		inline getWebGLContext(): WebGLRenderingContext {
			return this._pWebGLContext;
		}


		/** Buffer Objects. */
		inline bindWebGLBuffer(eTarget: uint, pBuffer: WebGLBuffer): void {
			this._pWebGLContext.bindBuffer(eTarget, pBuffer);
		}

		inline createWebGLBuffer(): WebGLBuffer {
			return this._pWebGLContext.createBuffer();
		}

		inline deleteWebGLBuffer(pBuffer: WebGLBuffer): void {
			this._pWebGLContext.deleteBuffer(pBuffer);
		}
		
		/** Texture Objects. */
		inline bindWebGLTexture(eTarget: uint, pTexture: WebGLTexture): void {
			this._pWebGLContext.bindTexture(eTarget, pTexture);
		}

		inline activateWebGLTexture(iSlot: int = this.getNextTextureSlot()): void {
			this._pWebGLContext.activeTexture(iSlot);
		}

		inline getNextTextureSlot(): int {
			return this._iSlot === 15? this._iSlot = 0: this._iSlot ++ ;
		}

		inline getTextureSlot(): int {
			return this._iSlot - 1;
		}

		inline createWebGLTexture(): WebGLTexture {
			return this._pWebGLContext.createTexture();
		}

		inline deleteWebGLTexture(pTexture: WebGLTexture): void {
			this._pWebGLContext.deleteTexture(pTexture);
		}

		/** Framebuffer Objects */
		inline createWebGLFramebuffer(): WebGLFramebuffer {
			
			if (this._pWebGLFramebufferList.length === 0) {
				CRITICAL("WebGL framebuffer limit exidit");
			}

			return this._pWebGLFramebufferList.pop();
		}

		inline bindWebGLFramebuffer(eTarget: uint, pBuffer: WebGLFramebuffer): void {
			this._pWebGLContext.bindFramebuffer(eTarget, pBuffer);
		}

		inline deleteWebGLFramebuffer(pBuffer: WebGLFramebuffer): void {
			this._pWebGLFramebufferList.push(pBuffer);
		}

		/** Renderbuffer Objects */
		inline createWebGLRenderbuffer(): WebGLRenderbuffer {
			return this._pWebGLContext.createRenderbuffer();
		}

		inline bindWebGLRenderbuffer(eTarget: uint, pBuffer: WebGLRenderbuffer): void {
			this._pWebGLContext.bindRenderbuffer(eTarget, pBuffer);
		}

		inline deleteWebGLRenderbuffer(pBuffer: WebGLRenderbuffer): void {
			this._pWebGLContext.deleteRenderbuffer(pBuffer);
		}


		inline createWebGLProgram(): WebGLProgram {
			return this._pWebGLContext.createProgram();
		}

		inline deleteWebGLProgram(pProgram: WebGLProgram): void {
			this._pWebGLContext.deleteProgram(pProgram);
		}

		inline useWebGLProgram(pProgram: WebGLProgram): void {
			this._pWebGLContext.useProgram(pProgram);
		}

		enableWebGLVertexAttribs(iTotal: uint): void {
			if (this._nActiveAttributes > iTotal) {
				for (var i: int = iTotal; i < this._nActiveAttributes; i++) {
					this._pWebGLContext.disableVertexAttribArray(i);
				}
			}
			else {
				for (var i: int = this._nActiveAttributes; i < iTotal; i++) {
					this._pWebGLContext.enableVertexAttribArray(i);
				}
			}

			this._nActiveAttributes = iTotal;
		}

		disableAllWebGLVertexAttribs(): void {
			var i:uint = 0;
			for(i = 0; i < this._nActiveAttributes; i++) {
				this._pWebGLContext.disableVertexAttribArray(i);	
			}

			this._nActiveAttributes = 0;		
		}

		getDefaultCanvas(): ICanvas3d {
			return this._pDefaultCanvas;
		}
	}
}

#endif