#ifndef IANIMATIONCONTROLLER_TS
#define IANIMATIONCONTROLLER_TS

#include "IUnique.ts"

module akra {
	IFACE(IAnimationBase);
	IFACE(IEngine);
	IFACE(ISceneNode);

	export interface IAnimationController extends IUnique {
		readonly totalAnimations: int;
		readonly active: IAnimationBase;

		setOptions(eOptions): void;
		addAnimation(pAnimation: IAnimationBase): bool;

		removeAnimation(pAnimation: string): bool;
		removeAnimation(pAnimation: int): bool;
		removeAnimation(pAnimation: IAnimationBase): bool;

		findAnimation(pAnimation: string): IAnimationBase;
		findAnimation(pAnimation: int): IAnimationBase;
		findAnimation(pAnimation: IAnimationBase): IAnimationBase;

		getAnimation(iAnim: int): IAnimationBase;

		setAnimation(iAnimation: int, pAnimation: IAnimationBase): void;
		attach(pTarget: ISceneNode): void;

		play(pAnimation: string, fRealTime: float): bool;
		play(pAnimation: int, fRealTime: float): bool;
		play(pAnimation: IAnimationBase, fRealTime: float): bool;

		update(fTime: float): void;

		toString(bFullInfo?: bool);
	}
}

#endif