#ifndef UIANIMATIONGRAPH_TS
#define UIANIMATIONGRAPH_TS

#include "IAnimationController.ts"
#include "IUIAnimationGraph.ts"
#include "IUIAnimationNode.ts"
#include "IUtilTimer.ts"
#include "../graph/Graph.ts"
#include "Controls.ts"

#include "animation/Animation.ts"

module akra.ui.animation {
	export class Graph extends graph.Graph implements IUIAnimationGraph {
		private _pSelectedNode: IUIAnimationNode = null;
		private _pAnimationController: IAnimationController = null;
		private _pTimer: IUtilTimer = null;

		constructor (parent) {
			super(parent, EUIGraphTypes.ANIMATION);
		}

		setTimer(pTimer: IUtilTimer): void {
			this._pTimer = pTimer;
		}

		getController(): IAnimationController {
			return this._pAnimationController;
		}

		private selectNode(pNode: IUIAnimationNode, bPlay: bool = true): void {
			// if (this._pSelectedNode === pNode) {
			// 	return;
			// }

			// if (!isNull(this._pSelectedNode)) {
			// 	this._pSelectedNode._selected(false);
			// }

			// if (!isNull(pNode)) {
			// 	pNode._selected(true);
			// }

			// if (bPlay && !isNull(this._pTimer)) {
			// 	this._pAnimationController.play(pNode.animation, this._pTimer.appTime);
			// }
		}
		
		addAnimation(pAnimation: IAnimationBase): void {
			this._pAnimationController.addAnimation(pAnimation);
		}
		
		removeAnimation(pAnimation: IAnimationBase): void;
		removeAnimation(sAnimation: string): void;
		removeAnimation(iAnimation: int): void;
		removeAnimation(animation): void {
			this._pAnimationController.removeAnimation(<int>animation);
		}

		findNodeByAnimation(sName: string): IUIAnimationNode;
		findNodeByAnimation(pAnimation: IAnimationBase): IUIAnimationNode;
		findNodeByAnimation(animation): IUIAnimationNode {
			// var sName: string = !isString(animation)? (<IAnimationBase>animation).name: <string>animation;
			// var pNodes: IUIAnimationNode[] = <IUIAnimationNode[]>this.nodes;

			// for (var i: int = 0; i < pNodes.length; i ++) {
			// 	var pAnim: IAnimationBase = pNodes[i].animation;

			// 	if (!isNull(pAnim) && pAnim.name === sName) {
			// 		return pNodes[i];
			// 	}
			// }

			return null;
		}

		createNodeByController(pController: IAnimationController): void {
			// var pNode: IUIAnimationNode = null;

			// for (var i: int = 0; i < pController.totalAnimations; ++ i) {
			// 	var pAnimation: IAnimationBase = pController.getAnimation(i);
			// 	pNode = this.createNodeByAnimation(pAnimation);
			// }

			return;
		}

		createNodeByAnimation(pAnimation: IAnimationBase): IUIAnimationNode {
			// var pNode: IUIAnimationNode = this.findNodeByAnimation(pAnimation.name);
			// var pSubNode: IUIAnimationNode;
			// var pBlend: IUIAnimationBlender;
			// var pPlayer: IUIAnimationPlayer;
			// var pMaskNode: IUIAnimationNode;
			
			// var pSubAnimation: IAnimationBase;
			// var n: int = 0;
			// var pMask: FloatMap = null;

			// if (!isNull(pNode)) {
			// 	return pNode;
			// }

			// if (akra.animation.isAnimation(pAnimation)) {
			// 	pNode = (<ui.animation.Controls>this.parent).createData();
			// 	pNode.animation = pAnimation;
			// }
			// else {
			// 	CRITICAL("AHTUNG!!!");
			// }
			return null;
		}

		capture(pController: IAnimationController): bool {
			this._pAnimationController = pController;
			
			this.connect(pController, SIGNAL(play), SLOT(onControllerPlay));
			this.createNodeByController(pController);
			return true;
		}

		private onControllerPlay(pAnimation: IAnimationBase): void {
			// var pNode: IUIAnimationNode = this.findNodeByAnimation(pAnimation.name);
			// this.selectNode(pNode);
		}
	}

	register("AnimationGraph", Graph);
}

#endif
