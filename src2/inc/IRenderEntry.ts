#ifndef IRENDERENTRY_TS
#define IRENDERENTRY_TS

module akra {
	IFACE(IShaderInput);

    export interface IRenderEntry {
    	viewport: IViewport;
    	renderTarget: IRenderTarget;
		maker: IAFXMaker;
		input: IShaderInput;
		bufferMap: IBufferMap;

		clear(): void;
    }
}

#endif
