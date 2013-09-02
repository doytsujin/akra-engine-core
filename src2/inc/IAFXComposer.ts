#ifndef IAFXCOMPOSER_TS
#define IAFXCOMPOSER_TS

#ifdef AFX_ENABLE_TEXT_EFFECTS
#include "IParser.ts"
#endif

#define ALL_PASSES 0xffffff
#define ANY_PASS 0xfffffa
#define ANY_SHIFT 0xfffffb
#define DEFAULT_SHIFT 0xfffffc

#include "IEngine.ts"
#include "IAFXComponent.ts"
#include "IEffect.ts"
#include "IAFXComponentBlend.ts"
#include "IAFXPassInputBlend.ts"
#include "IBufferMap.ts"
#include "ISurfaceMaterial.ts"
#include "IRID.ts"

module akra {

	export interface IAFXComposer {
		getComponentByName(sComponentName: string): IAFXComponent;
		getEngine(): IEngine;

		//API for Effect-resource
		
		getComponentCountForEffect(pEffectResource: IEffect): uint;
		getTotalPassesForEffect(pEffectResource: IEffect): uint;
		addComponentToEffect(pEffectResource: IEffect, 
							 pComponent: IAFXComponent, iShift: int, iPass: uint): bool;
		removeComponentFromEffect(pEffectResource: IEffect, 
								  pComponent: IAFXComponent, iShift: int, iPass: uint): bool;
		hasComponentForEffect(pEffectResource:IEffect, 
							  pComponent: IAFXComponent, iShift: int, iPass: uint): bool;

		activateEffectResource(pEffectResource: IEffect, iShift: int): bool;
		deactivateEffectResource(pEffectResource: IEffect): bool; 

		getPassInputBlendForEffect(pEffectResource: IEffect, iPass: uint): IAFXPassInputBlend;
		//API for RenderTechnique
		getMinShiftForOwnTechniqueBlend(pRenderTechnique: IRenderTechnique): int;

		getTotalPassesForTechnique(pRenderTechnique: IRenderTechnique): uint;
		
		addOwnComponentToTechnique(pRenderTechnique: IRenderTechnique, 
								   pComponent: IAFXComponent, iShift: int, iPass: uint): bool;
		removeOwnComponentToTechnique(pRenderTechnique: IRenderTechnique, 
									  pComponent: IAFXComponent, iShift: int, iPass: uint): bool;
		hasOwnComponentInTechnique(pRenderTechnique: IRenderTechnique, 
								   pComponent: IAFXComponent, iShift: int, iPass: uint): bool;

		prepareTechniqueBlend(pRenderTechnique: IRenderTechnique): bool;

		markTechniqueAsNeedUpdate(pRenderTechnique: IRenderTechnique): void;

		getPassInputBlendForTechnique(pRenderTechnique: IRenderTechnique, iPass: uint): IAFXPassInputBlend;

		//API for render
		
		applyBufferMap(pBufferMap: IBufferMap): bool;
		applySurfaceMaterial(pSurfaceMaterial: ISurfaceMaterial): bool;

		_calcRenderID(pSceneObject: ISceneObject, pRenderable: IRenderableObject, bCreateIfNotExists?: bool): int;

		_getRenderableByRid(iRid: int): IRenderableObject;
		_getObjectByRid(iRid: int): ISceneObject;

		_setCurrentSceneObject(pSceneObject: ISceneObject): void;
		_setCurrentViewport(pViewport: IViewport): void;
		_setCurrentRenderableObject(pRenderable: IRenderableObject): void;

		_getCurrentSceneObject(): ISceneObject;
		_getCurrentViewport(): IViewport;
		_getCurrentRenderableObject(): IRenderableObject;

		_setDefaultCurrentState(): void;

		renderTechniquePass(pRenderTechnique: IRenderTechnique, iPass: uint): void;

		//API for load components/AFXEffects
		
#ifdef AFX_ENABLE_TEXT_EFFECTS
		_loadEffectFromSyntaxTree(pTree: IParseTree, sFileName: string): bool;
#endif
		_loadEffectFromBinary(pData: Uint8Array, sFileName: string): bool;
	}
}

#endif