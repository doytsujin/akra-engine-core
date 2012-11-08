#ifndef IMAT4_TS
#define IMAT4_TS

/**
 * @important Если внезапно задумаем перейти обратно на 
 * хранение данных в матрицах по строкам, как собственно и было в начале,
 * то необходимо раскомментить definы и переписать метод set, 
 * так как он ложит по столбцам
 */

// #define __11 0
// #define __12 1
// #define __13 2
// #define __14 3
// #define __21 4
// #define __22 5
// #define __23 6
// #define __24 7
// #define __31 8
// #define __32 9
// #define __33 10
// #define __34 11
// #define __41 12
// #define __42 13
// #define __43 14
// #define __44 15

#define __11 0
#define __12 4
#define __13 8
#define __14 12
#define __21 1
#define __22 5
#define __23 9
#define __24 13
#define __31 2
#define __32 6
#define __33 10
#define __34 14
#define __41 3
#define __42 7
#define __43 11
#define __44 15

module akra {

	IFACE(IVec3);
	IFACE(IVec4);
	IFACE(IMat3);
	IFACE(IQuat4);

	export interface IMat4 {
		data: Float32Array;

		set(): IMat4;
		set(fValue: float): IMat4;
		set(v4fVec: IVec4): IMat4;
		set(m3fMat: IMat3, v3fTranslation?: IVec3): IMat4;
		set(m4fMat: IMat4): IMat4;
		set(pArray: float[]): IMat4;
		set(fValue1: float, fValue2: float,
			fValue3: float, fValue4: float): IMat4;
		set(v4fVec1: IVec4, v4fVec2: IVec4,
			v4fVec3: IVec4, v4fVec4: IVec4): IMat4;
		set(pArray1: float[], pArray2: float[],
			pArray3: float[], pArray4: float[]): IMat4;
		set(fValue1: float, fValue2: float, fValue3: float, fValue4: float,
			fValue5: float, fValue6: float, fValue7: float, fValue8: float,
			fValue9: float, fValue10: float, fValue11: float, fValue12: float,
			fValue13: float, fValue14: float, fValue15: float, fValue16: float): IMat4;

		identity(): IMat4;

		add(m4fMat: IMat4, m4fDestination?: IMat4): IMat4;
		subtract(m4fMat: IMat4, m4fDestination?: IMat4): IMat4;
		multiply(m4fMat: IMat4, m4fDestination?: IMat4): IMat4;
		multiplyLeft(m4fMat: IMat4, m4fDestination?: IMat4): IMat4;
		multiplyVec4(v4fVec: IVec4, v4fDestination?: IVec4): IVec4;

		transpose(m4fDestination?: IMat4): IMat4;
		determinant(): float;
		inverse(m4fDestination?: IMat4): IMat4;

		isEqual(m4fMat: IMat4, fEps?: float): bool;
		isDiagonal(fEps?: float): bool;

		toMat3(m3fDestination?: IMat3): IMat3;
		toQuat4(q4fDestination?: IQuat4): IQuat4;
		toRotationMatrix(m4fDestination?: IMat4): IMat4;
		toString(): string;

		rotateRight(fAngle: float, v3fAxis: IVec3, m4fDestination?: IMat4): IMat4;
		rotateLeft(fAngle: float, v3fAxis: IVec3, m4fDestination?: IMat4): IMat4;

		toInverseMat3(m3fDestination: IMat3): IMat3;

		// rotateXRight(fAngle: float, m4fDestination?: IMat4): IMat4;
		// rotateXLeft(fAngle: float, m4fDestination?: IMat4): IMat4;
		// rotateYRight(fAngle: float, m4fDestination?: IMat4): IMat4;
		// rotateYLeft(fAngle: float, m4fDestination?: IMat4): IMat4;
		// rotateZRight(fAngle: float, m4fDestination?: IMat4): IMat4;
		// rotateZLeft(fAngle: float, m4fDestination?: IMat4): IMat4;

		setTranslation(v3fTranslation: IVec3): IMat4;
		getTranslation(v3fTranslation?: IVec3): IVec3;
		
		// translateRight(v3fTranslation: IVec3, m4fDestination?: IMat4): IMat4;
		// translateLeft(v3fTranslation: IVec3, m4fDestination?: IMat4): IMat4;

		scaleRight(v3fScale: IVec3, m4fDestination?: IMat4): IMat4;
		scaleLeft(v3fScale: IVec3, m4fDestination?: IMat4): IMat4;

		// decompose(q4fRotation: IQuat4, v3fScale: IVec3, v3fTranslation: IVec3): void;



	};
};

#endif