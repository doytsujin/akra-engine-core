/**
 * @file
 * @author Igor Karateev
 * @brief файл содержит класс Mat4
 * Матрицы хранятся по столбцам, как в openGL
 */

/**
 * @important Если внезапно задумаем перейти обратно на 
 * хранение данных в матрицах по строкам, как собственно и было в начале,
 * то необходимо раскомментить definы и переписать метод set, 
 * так как он ложит по столбцам
 */

// Define(_11, __[0]);
// Define(_12, __[1]);
// Define(_13, __[2]);
// Define(_14, __[3]);
// Define(_21, __[4]);
// Define(_22, __[5]);
// Define(_23, __[6]);
// Define(_24, __[7]);
// Define(_31, __[8]);
// Define(_32, __[9]);
// Define(_33, __[10]);
// Define(_34, __[11]);
// Define(_41, __[12]);
// Define(_42, __[13]);
// Define(_43, __[14]);
// Define(_44, __[15]);

Define(_11, __[0]);
Define(_12, __[4]);
Define(_13, __[8]);
Define(_14, __[12]);
Define(_21, __[1]);
Define(_22, __[5]);
Define(_23, __[9]);
Define(_24, __[13]);
Define(_31, __[2]);
Define(_32, __[6]);
Define(_33, __[10]);
Define(_34, __[14]);
Define(_41, __[3]);
Define(_42, __[7]);
Define(_43, __[11]);
Define(_44, __[15]);

Define(Matrix4, Mat4);

function Mat4(){
    //'use strict';

    var m4fMat;

    if(this === window || this === window.AKRA){
        m4fMat = Mat4._pStorage[Mat4._iIndex++];
        if(Mat4._iIndex == Mat4._nStorageSize){
            Mat4._iIndex = 0;
        }

        //clear
        if(arguments.length == 0){
            // var pData = m4fMat.pData;
            // pData._11 = pData._12 = pData._13 = pData._14 = 
            // pData._21 = pData._22 = pData._23 = pData._24 = 
            // pData._31 = pData._32 = pData._33 = pData._34 = 
            // pData._41 = pData._42 = pData._43 = pData._44 = 0;
            return m4fMat;
        }
    }
    else if (arguments.length === 2 && arguments[1] === true) {
        //использует существующий Float32Array вместо своего
        this.pData = arguments[0];
        return this;
    }
    else{
        this.pData = new Float32Array(16);
        m4fMat = this;
    }

    var nArgumentsLength = arguments.length;
    if(nArgumentsLength == 1){
        return m4fMat.set(arguments[0]);
    }
    else if(nArgumentsLength == 4){
        return m4fMat.set(arguments[0],arguments[1],arguments[2],arguments[3]);    
    }
    else if(nArgumentsLength == 16){
        return m4fMat.set(arguments[0],arguments[1],arguments[2],arguments[3],
                    arguments[4],arguments[5],arguments[6],arguments[7],
                    arguments[8],arguments[9],arguments[10],arguments[11],
                    arguments[12],arguments[13],arguments[14],arguments[15]);    
    }
    else{
        return m4fMat;
    }
}

/*
 * Mat4.set
 * Copies the values of one Mat4 to another
 *
 * Params:
 * mat - Mat4 containing values to copy
 * dest - Mat4 receiving copied values
 *
 * Returns:
 * dest
 */

Mat4.prototype.set = function() {
    //'use strict';//some bugs in chrome
    var pData = this.pData;

    var nArgumentsLength = arguments.length;
    if(nArgumentsLength == 0){
        pData._11 = pData._12 = pData._13 = pData._14 = 0;
        pData._21 = pData._22 = pData._23 = pData._24 = 0;
        pData._31 = pData._32 = pData._33 = pData._34 = 0;
        pData._41 = pData._42 = pData._43 = pData._44 = 0;
    }
    if(nArgumentsLength == 1){
        if(typeof(arguments[0]) == "number"){
            var nValue = arguments[0];
            pData._11 = nValue;
            pData._12 = 0;
            pData._13 = 0;
            pData._14 = 0;

            pData._21 = 0;
            pData._22 = nValue;
            pData._23 = 0;
            pData._24 = 0;

            pData._31 = 0;
            pData._32 = 0;
            pData._33 = nValue;
            pData._34 = 0;

            pData._41 = 0;
            pData._42 = 0;
            pData._43 = 0;
            pData._44 = nValue
        }
        else if(arguments[0] instanceof Mat4){
            var pElements = arguments[0].pData;

            pData._11 = pElements._11;
            pData._12 = pElements._12;
            pData._13 = pElements._13;
            pData._14 = pElements._14;

            pData._21 = pElements._21;
            pData._22 = pElements._22;
            pData._23 = pElements._23;
            pData._24 = pElements._24;

            pData._31 = pElements._31;
            pData._32 = pElements._32;
            pData._33 = pElements._33;
            pData._34 = pElements._34;

            pData._41 = pElements._41;
            pData._42 = pElements._42;
            pData._43 = pElements._43;
            pData._44 = pElements._44;
        }
        else if(arguments[0] instanceof Vec4){
            var pElements = arguments[0].pData;
            //ложим диагональ
            pData._11 = pElements.X;
            pData._12 = 0;
            pData._13 = 0;
            pData._14 = 0;

            pData._21 = 0;
            pData._22 = pElements.Y;
            pData._23 = 0;
            pData._24 = 0;

            pData._31 = 0;
            pData._32 = 0;
            pData._33 = pElements.Z;
            pData._34 = 0;

            pData._41 = 0;
            pData._42 = 0;
            pData._43 = 0;
            pData._44 = pElements.W;    
        }
        else{
            var pElements = arguments[0];

            if(pElements.length == 4){
                //ложим диагональ
                pData._11 = pElements.X;
                pData._12 = 0;
                pData._13 = 0;
                pData._14 = 0;

                pData._21 = 0;
                pData._22 = pElements.Y;
                pData._23 = 0;
                pData._24 = 0;

                pData._31 = 0;
                pData._32 = 0;
                pData._33 = pElements.Z;
                pData._34 = 0;

                pData._41 = 0;
                pData._42 = 0;
                pData._43 = 0;
                pData._44 = pElements.W;
            }
            else{
                pData._11 = pElements._11;
                pData._12 = pElements._12;
                pData._13 = pElements._13;
                pData._14 = pElements._14;

                pData._21 = pElements._21;
                pData._22 = pElements._22;
                pData._23 = pElements._23;
                pData._24 = pElements._24;

                pData._31 = pElements._31;
                pData._32 = pElements._32;
                pData._33 = pElements._33;
                pData._34 = pElements._34;

                pData._41 = pElements._41;
                pData._42 = pElements._42;
                pData._43 = pElements._43;
                pData._44 = pElements._44;
            }
        }
    }
    else if(nArgumentsLength == 4){
        if(typeof(arguments[0]) == "number"){
            //ложим диагональ
            pData._11 = arguments.X;
            pData._12 = 0;
            pData._13 = 0;
            pData._14 = 0;

            pData._21 = 0;
            pData._22 = arguments.Y;
            pData._23 = 0;
            pData._24 = 0;

            pData._31 = 0;
            pData._32 = 0;
            pData._33 = arguments.Z;
            pData._34 = 0;

            pData._41 = 0;
            pData._42 = 0;
            pData._43 = 0;
            pData._44 = arguments.W;
        }
        else{
            var pData1,pData2,pData3,pData4;

            if(arguments[0] instanceof Vec4){
                pData1 = arguments[0].pData;
                pData2 = arguments[1].pData;
                pData3 = arguments[2].pData;
                pData4 = arguments[3].pData;
            }
            else{
                pData1 = arguments[0];
                pData2 = arguments[1];
                pData3 = arguments[2];
                pData4 = arguments[3];
            }

            pData._11 = pData1.X;
            pData._12 = pData2.X;
            pData._13 = pData3.X;
            pData._14 = pData4.X;

            pData._21 = pData1.Y;
            pData._22 = pData2.Y;
            pData._23 = pData3.Y;
            pData._24 = pData4.Y;

            pData._31 = pData1.Z;
            pData._32 = pData2.Z;
            pData._33 = pData3.Z;
            pData._34 = pData4.Z;

            pData._41 = pData1.W;
            pData._42 = pData2.W;
            pData._43 = pData3.W;
            pData._44 = pData4.W;
        }
    }
    else if(nArgumentsLength == 16){
        pData._11 = arguments._11;
        pData._12 = arguments._12;
        pData._13 = arguments._13;
        pData._14 = arguments._14;

        pData._21 = arguments._21;
        pData._22 = arguments._22;
        pData._23 = arguments._23;
        pData._24 = arguments._24;

        pData._31 = arguments._31;
        pData._32 = arguments._32;
        pData._33 = arguments._33;
        pData._34 = arguments._34;

        pData._41 = arguments._41;
        pData._42 = arguments._42;
        pData._43 = arguments._43;
        pData._44 = arguments._44;
    }

    return this;
};

/*
 * Mat4.identity
 * Sets a Mat4 to an identity matrix
 *
 * Params:
 * dest - Mat4 to set
 *
 * Returns:
 * dest
 */

Mat4.prototype.identity = function() {
    'use strict';
    var pData = this.pData;

    pData._11 = 1;
    pData._12 = 0;
    pData._13 = 0;
    pData._14 = 0;

    pData._21 = 0;
    pData._22 = 1;
    pData._23 = 0;
    pData._24 = 0;

    pData._31 = 0;
    pData._32 = 0;
    pData._33 = 1;
    pData._34 = 0;

    pData._41 = 0;
    pData._42 = 0;
    pData._43 = 0;
    pData._44 = 1;

    return this;
};

/*
 * Mat4.transpose
 * Transposes a Mat4 (flips the values over the diagonal)
 *
 * Params:
 * mat - Mat4 to transpose
 * dest - Optional, Mat4 receiving transposed values. If not specified result is written to mat
 *
 * Returns:
 * dest is specified, mat otherwise
 */

Mat4.prototype.transpose = function(m4fDestination) {
    'use strict';
    
    var pData = this.pData;

    if(!m4fDestination){
        var a12 = pData._12, a13 = pData._13, a14 = pData._14;
        var a23 = pData._23, a24 = pData._24;
        var a34 = pData._34;

        pData._12 = pData._21;
        pData._13 = pData._31;
        pData._14 = pData._41;

        pData._21 = a12;
        pData._23 = pData._32;
        pData._24 = pData._42;

        pData._31 = a13;
        pData._32 = a23;
        pData._34 = pData._43;

        pData._41 = a14;
        pData._42 = a24;
        pData._43 = a34;

        return this;
    }

    var pDataDestination = m4fDestination.pData;

    pDataDestination._11 = pData._11;
    pDataDestination._12 = pData._21;
    pDataDestination._13 = pData._31;
    pDataDestination._14 = pData._41;

    pDataDestination._21 = pData._12;
    pDataDestination._22 = pData._22;
    pDataDestination._23 = pData._32;
    pDataDestination._24 = pData._42;

    pDataDestination._31 = pData._13;
    pDataDestination._32 = pData._23;
    pDataDestination._33 = pData._33;
    pDataDestination._34 = pData._43;

    pDataDestination._41 = pData._14;
    pDataDestination._42 = pData._24;
    pDataDestination._43 = pData._34;
    pDataDestination._44 = pData._44;

    return m4fDestination;
};

/*
 * Mat4.determinant
 * Calculates the determinant of a Mat4
 *
 * Params:
 * mat - Mat4 to calculate determinant of
 *
 * Returns:
 * determinant of mat
 */

Mat4.prototype.determinant = function() {
    'use strict';
    // Cache the matrix values (makes for huge speed increases!)
    // 
    var pData = this.pData; 
    var a11 = pData._11, a12 = pData._12, a13 = pData._13, a14 = pData._14;
    var a21 = pData._21, a22 = pData._22, a23 = pData._23, a24 = pData._24;
    var a31 = pData._31, a32 = pData._32, a33 = pData._33, a34 = pData._34;
    var a41 = pData._41, a42 = pData._42, a43 = pData._43, a44 = pData._44;

    return  a41 * a32 * a23 * a14 - a31 * a42 * a23 * a14 - a41 * a22 * a33 * a14 + a21 * a42 * a33 * a14 +
        a31 * a22 * a43 * a14 - a21 * a32 * a43 * a14 - a41 * a32 * a13 * a24 + a31 * a42 * a13 * a24 +
        a41 * a12 * a33 * a24 - a11 * a42 * a33 * a24 - a31 * a12 * a43 * a24 + a11 * a32 * a43 * a24 +
        a41 * a22 * a13 * a34 - a21 * a42 * a13 * a34 - a41 * a12 * a23 * a34 + a11 * a42 * a23 * a34 +
        a21 * a12 * a43 * a34 - a11 * a22 * a43 * a34 - a31 * a22 * a13 * a44 + a21 * a32 * a13 * a44 +
        a31 * a12 * a23 * a44 - a11 * a32 * a23 * a44 - a21 * a12 * a33 * a44 + a11 * a22 * a33 * a44;
};

/*
 * Mat4.inverse
 * Calculates the inverse matrix of a Mat4
 *
 * Params:
 * mat - Mat4 to calculate inverse of
 * dest - Optional, Mat4 receiving inverse matrix. If not specified result is written to mat
 *
 * Returns:
 * dest is specified, mat otherwise
 */

Mat4.prototype.inverse = function(m4fDestination) {
    'use strict';
    if(!m4fDestination){
        m4fDestination = this;
    }

    var pData = this.pData;
    var pDataDestination = m4fDestination.pData;

    // Cache the matrix values (makes for huge speed increases!)
    var a11 = pData._11, a12 = pData._12, a13 = pData._13, a14 = pData._14;
    var a21 = pData._21, a22 = pData._22, a23 = pData._23, a24 = pData._24;
    var a31 = pData._31, a32 = pData._32, a33 = pData._33, a34 = pData._34;
    var a41 = pData._41, a42 = pData._42, a43 = pData._43, a44 = pData._44;

    var b00 = a11 * a22 - a12 * a21;
    var b01 = a11 * a23 - a13 * a21;
    var b02 = a11 * a24 - a14 * a21;
    var b03 = a12 * a23 - a13 * a22;
    var b04 = a12 * a24 - a14 * a22;
    var b05 = a13 * a24 - a14 * a23;
    var b06 = a31 * a42 - a32 * a41;
    var b07 = a31 * a43 - a33 * a41;
    var b08 = a31 * a44 - a34 * a41;
    var b09 = a32 * a43 - a33 * a42;
    var b10 = a32 * a44 - a34 * a42;
    var b11 = a33 * a44 - a34 * a43;

    var fDeterminant = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if(fDeterminant == 0){
        debug_assert(0,"обращение матрицы с нулевым детеминантом:\n" 
                        + this.toString());

        return m4fDestination.set(1); //чтоб все не навернулось
    }

    var fInverseDeterminant = 1/fDeterminant;

    pDataDestination._11 = (a22 * b11 - a23 * b10 + a24 * b09) * fInverseDeterminant;
    pDataDestination._12 = (-a12 * b11 + a13 * b10 - a14 * b09) * fInverseDeterminant;
    pDataDestination._13 = (a42 * b05 - a43 * b04 + a44 * b03) * fInverseDeterminant;
    pDataDestination._14 = (-a32 * b05 + a33 * b04 - a34 * b03) * fInverseDeterminant;

    pDataDestination._21 = (-a21 * b11 + a23 * b08 - a24 * b07) * fInverseDeterminant;
    pDataDestination._22 = (a11 * b11 - a13 * b08 + a14 * b07) * fInverseDeterminant;
    pDataDestination._23 = (-a41 * b05 + a43 * b02 - a44 * b01) * fInverseDeterminant;
    pDataDestination._24 = (a31 * b05 - a33 * b02 + a34 * b01) * fInverseDeterminant;

    pDataDestination._31 = (a21 * b10 - a22 * b08 + a24 * b06) * fInverseDeterminant;
    pDataDestination._32 = (-a11 * b10 + a12 * b08 - a14 * b06) * fInverseDeterminant;
    pDataDestination._33 = (a41 * b04 - a42 * b02 + a44 * b00) * fInverseDeterminant;
    pDataDestination._34 = (-a31 * b04 + a32 * b02 - a34 * b00) * fInverseDeterminant;

    pDataDestination._41 = (-a21 * b09 + a22 * b07 - a23 * b06) * fInverseDeterminant;
    pDataDestination._42 = (a11 * b09 - a12 * b07 + a13 * b06) * fInverseDeterminant;
    pDataDestination._43 = (-a41 * b03 + a42 * b01 - a43 * b00) * fInverseDeterminant;
    pDataDestination._44 = (a31 * b03 - a32 * b01 + a33 * b00) * fInverseDeterminant;

    return m4fDestination;
};

/**
 * pInput - Vec3, Vec4, Mat4
 * pDestination - respectivetly
 * если pDestination не подано, то 
 * если происходит умножение на матрицу, то умножается сама матрица, а
 * для векторов создаются новые
 */

Mat4.prototype.multiply = function(pInput,pDestination) {
    'use strict';
    
    var pData1 = this.pData;
    var pData2 = pInput.pData;

    if(pData2.length == 3){
        //матрица поворота умножается на вектор (блок 3x3)
        if(!pDestination){
            pDestination = new Vec3();
        }
        var pDataDestination = pDestination.pData;

        var x = pData2.X, y = pData2.Y, z = pData2.Z;

        pDataDestination.X = pData1._11 * x + pData1._12 *y + pData1._13 * z;
        pDataDestination.Y = pData1._21 * x + pData1._22 *y + pData1._23 * z;
        pDataDestination.Z = pData1._31 * x + pData1._32 *y + pData1._33 * z;
    }
    else if(pData2.length == 4){
        //матрица умножается на вектор
        if(!pDestination){
            pDestination = new Vec4();
        }
        var pDataDestination = pDestination.pData;

        var x = pData2.X, y = pData2.Y, z = pData2.Z, w = pData2.W;

        pDataDestination.X = pData1._11 * x + pData1._12 * y + pData1._13 * z + pData1._14 * w;
        pDataDestination.Y = pData1._21 * x + pData1._22 * y + pData1._23 * z + pData1._24 * w;
        pDataDestination.Z = pData1._31 * x + pData1._32 * y + pData1._33 * z + pData1._34 * w;
        pDataDestination.W = pData1._41 * x + pData1._42 * y + pData1._43 * z + pData1._44 * w;
    }
    else{
        //перемножаем две матрицы
        if(!pDestination){
            pDestination = this;
        }
        var pDataDestination = pDestination.pData;

        //кешируем значения матриц для ускорения
        
        var a11 = pData1._11, a12 = pData1._12, a13 = pData1._13, a14 = pData1._14;        
        var a21 = pData1._21, a22 = pData1._22, a23 = pData1._23, a24 = pData1._24;
        var a31 = pData1._31, a32 = pData1._32, a33 = pData1._33, a34 = pData1._34;
        var a41 = pData1._41, a42 = pData1._42, a43 = pData1._43, a44 = pData1._44;

        var b11 = pData2._11, b12 = pData2._12, b13 = pData2._13, b14 = pData2._14;        
        var b21 = pData2._21, b22 = pData2._22, b23 = pData2._23, b24 = pData2._24;
        var b31 = pData2._31, b32 = pData2._32, b33 = pData2._33, b34 = pData2._34;
        var b41 = pData2._41, b42 = pData2._42, b43 = pData2._43, b44 = pData2._44;

        pDataDestination._11 = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        pDataDestination._12 = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        pDataDestination._13 = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        pDataDestination._14 = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

        pDataDestination._21 = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        pDataDestination._22 = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        pDataDestination._23 = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        pDataDestination._24 = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

        pDataDestination._31 = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        pDataDestination._32 = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        pDataDestination._33 = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        pDataDestination._34 = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

        pDataDestination._41 = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        pDataDestination._42 = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        pDataDestination._43 = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        pDataDestination._44 = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
    }

    return pDestination;
};

Mat4.prototype.toString = function() {
    'use strict';
    var pData = this.pData;

    return '['  + pData._11 + ", " + pData._12 + ', ' + pData._13 + ', ' + pData._14 + ',\n' 
                + pData._21 + ", " + pData._22 + ', ' + pData._23 + ', ' + pData._24 + ',\n'
                + pData._31 + ", " + pData._32 + ', ' + pData._33 + ', ' + pData._34 + ',\n'
                + pData._41 + ", " + pData._42 + ', ' + pData._43 + ', ' + pData._44 + ']';
};


Mat4.prototype.isEqual = function(m4fMat,fEps) {
    'use strict';

    fEps = ifndef(fEps,0);

    var pData1 = this.pData;
    var pData2 = m4fMat.pData;

    if(fEps == 0){
        if(    pData1._11 != pData2._11 
            || pData1._12 != pData2._12
            || pData1._13 != pData2._13
            || pData1._14 != pData2._14
            || pData1._21 != pData2._21 
            || pData1._22 != pData2._22
            || pData1._23 != pData2._23
            || pData1._24 != pData2._24
            || pData1._31 != pData2._31 
            || pData1._32 != pData2._32
            || pData1._33 != pData2._33
            || pData1._34 != pData2._34
            || pData1._41 != pData2._41 
            || pData1._42 != pData2._42
            || pData1._43 != pData2._43
            || pData1._44 != pData2._44){

            return false;
        }
    }
    else{
        if(    Math.abs(pData1._11 - pData2._11) > fEps
            || Math.abs(pData1._12 - pData2._12) > fEps
            || Math.abs(pData1._13 - pData2._13) > fEps
            || Math.abs(pData1._14 - pData2._14) > fEps
            || Math.abs(pData1._21 - pData2._21) > fEps
            || Math.abs(pData1._22 - pData2._22) > fEps
            || Math.abs(pData1._23 - pData2._23) > fEps
            || Math.abs(pData1._24 - pData2._24) > fEps
            || Math.abs(pData1._31 - pData2._31) > fEps
            || Math.abs(pData1._32 - pData2._32) > fEps
            || Math.abs(pData1._33 - pData2._33) > fEps
            || Math.abs(pData1._34 - pData2._34) > fEps
            || Math.abs(pData1._41 - pData2._41) > fEps
            || Math.abs(pData1._42 - pData2._42) > fEps
            || Math.abs(pData1._43 - pData2._43) > fEps
            || Math.abs(pData1._44 - pData2._44) > fEps){

            return false;
        }
    }
    return true;
};

/*
 * Mat4.toRotationMat
 * Copies the upper 3x3 elements of a Mat4 into another Mat4
 *
 * Params:
 * mat - Mat4 containing values to copy
 * dest - Optional, Mat4 receiving copied values
 *
 * Returns:
 * dest is specified, a new Mat4 otherwise
 */

Mat4.prototype.toRotationMatrix = function(m4fDestination) {
    'use strict';
    if(!m4fDestination){
        m4fDestination = new Mat4();
    }

    var pData = this.pData;
    var pDataDestination = m4fDestination.pData;

    pDataDestination._11 = pData._11;
    pDataDestination._12 = pData._12;
    pDataDestination._13 = pData._13;
    pDataDestination._14 = 0;

    pDataDestination._21 = pData._21;
    pDataDestination._22 = pData._22;
    pDataDestination._23 = pData._23;
    pDataDestination._24 = 0;

    pDataDestination._31 = pData._31;
    pDataDestination._32 = pData._32;
    pDataDestination._33 = pData._33;
    pDataDestination._34 = 0;

    pDataDestination._41 = 0;
    pDataDestination._42 = 0;
    pDataDestination._43 = 0;
    pDataDestination._44 = 1;

    return m4fDestination;
};

/*
 * Mat4.toMat3
 * Copies the upper 3x3 elements of a Mat4 into a Mat3
 *
 * Params:
 * mat - Mat4 containing values to copy
 * dest - Optional, Mat3 receiving copied values
 *
 * Returns:
 * dest is specified, a new Mat3 otherwise
 */

Mat4.prototype.toMat3 = function(m3fDestination) {
    'use strict';
    if(!m3fDestination){
        m3fDestination = new Mat3();
    }

    var pData = this.pData;
    var pDataDestination = m3fDestination.pData;

    pDataDestination.a11 = pData._11;
    pDataDestination.a12 = pData._12;
    pDataDestination.a13 = pData._13;

    pDataDestination.a21 = pData._21;
    pDataDestination.a22 = pData._22;
    pDataDestination.a23 = pData._23;

    pDataDestination.a31 = pData._31;
    pDataDestination.a32 = pData._32;
    pDataDestination.a33 = pData._33;

    return m3fDestination;
};




/*
 * Mat4.translate
 * Translates a matrix by the given vector
 *
 * Params:
 * vec - Vec3 specifying the translation
 * dest - Optional, Mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 *
 * матрица сдвига умножается справа, то есть currentMatrix * translateMatrix
 */

Mat4.prototype.translateRight = function(v3fVec,m4fDestination) {
    'use strict';

    var pData1 = this.pData;
    var pData2 = v3fVec.pData;

    var x = pData2.X, y = pData2.Y, z = pData2.Z;

    if(!m4fDestination){
        pData1._14 = pData1._11 * x + pData1._12 * y + pData1._13 * z + pData1._14;
        pData1._24 = pData1._21 * x + pData1._22 * y + pData1._23 * z + pData1._24;
        pData1._34 = pData1._31 * x + pData1._32 * y + pData1._33 * z + pData1._34;
        pData1._44 = pData1._41 * x + pData1._42 * y + pData1._43 * z + pData1._44;
        //строго говоря последнюю строчку умножать не обязательно, так как она должна быть -> 0 0 0 1
        return this;
    }

    var pDataDestination = m4fDestination.pData;

    //кешируем матрицу вращений
    var a11 = pData1._11, a12 = pData1._12, a13 = pData1._13;
    var a21 = pData1._11, a22 = pData1._22, a23 = pData1._23;
    var a31 = pData1._11, a32 = pData1._32, a33 = pData1._33;
    var a41 = pData1._11, a42 = pData1._42, a43 = pData1._43;

    pDataDestination._11 = a11;
    pDataDestination._12 = a12;
    pDataDestination._13 = a13;
    pDataDestination._14 = a11 * x + a12 * y + a13 * z + pData1._14;

    pDataDestination._21 = a21;
    pDataDestination._22 = a22;
    pDataDestination._23 = a23;
    pDataDestination._24 = a21 * x + a22 * y + a23 * z + pData1._24;

    pDataDestination._31 = a31;
    pDataDestination._32 = a32;
    pDataDestination._33 = a33;
    pDataDestination._34 = a31 * x + a32 * y + a33 * z + pData1._34;

    pDataDestination._41 = a41;
    pDataDestination._42 = a42;
    pDataDestination._43 = a43;
    pDataDestination._44 = a41 * x + a42 * y + a43 * z + pData1._44;

    return m4fDestination;
};

/**
 * матрица сдвига умножается слева, то есть translateMatrix * currentMatrix
 */

Mat4.prototype.translateLeft = function(v3fVec,m4fDestination) {
    'use strict';

    var pData1 = this.pData;
    var pData2 = v3fVec.pData;

    var x = pData2.X, y = pData2.Y, z = pData2.Z;

    if(!m4fDestination){
        pData1._14 = x + pData1._14;
        pData1._24 = y + pData1._24;
        pData1._34 = z + pData1._34;
        return this;
    }

    var pDataDestination = m4fDestination.pData;


    pDataDestination._11 = pData1._11;
    pDataDestination._12 = pData1._12;
    pDataDestination._13 = pData1._13;
    pDataDestination._14 = x + pData1._14;

    pDataDestination._21 = pData1._21;
    pDataDestination._22 = pData1._22;
    pDataDestination._23 = pData1._23;
    pDataDestination._24 = y + pData1._24;

    pDataDestination._31 = pData1._31;
    pDataDestination._32 = pData1._32;
    pDataDestination._33 = pData1._33;
    pDataDestination._34 = z + pData1._34;

    pDataDestination._41 = pData1._41;
    pDataDestination._42 = pData1._42;
    pDataDestination._43 = pData1._43;
    pDataDestination._44 = pData1._44;

    return m4fDestination;
};

/*
 * Mat4.scale
 * Scales a matrix by the given vector
 *
 * Params:
 * mat - Mat4 to scale
 * vec - Vec3 specifying the scale for each axis
 * dest - Optional, Mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 *
 * матрица скейла умножается справа, то есть currentMatrix * scaleMatrix
 */

Mat4.prototype.scaleRight = function(v3fVec,m4fDestination) {
    'use strict';
    
    var pData1 = this.pData;
    var pData2 = v3fVec.pData;

    var x = pData2.X, y = pData2.Y, z = pData2.Z;

    if(!m4fDestination){
        pData1._11 *= x;
        pData1._12 *= y;
        pData1._13 *= z;

        pData1._21 *= x;
        pData1._22 *= y;
        pData1._23 *= z;

        pData1._31 *= x;
        pData1._32 *= y;
        pData1._33 *= z;

        //скейлить эти компоненты необязательно, так как там должны лежать нули
        pData1._41 *= x;
        pData1._42 *= y;
        pData1._43 *= z;

        return this;
    }

    var pDataDestination = m4fDestination.pData;

    pDataDestination._11 = pData1._11 * x;
    pDataDestination._12 = pData1._12 * y;
    pDataDestination._13 = pData1._13 * z;
    pDataDestination._14 = pData1._14;

    pDataDestination._21 = pData1._21 * x;
    pDataDestination._22 = pData1._22 * y;
    pDataDestination._23 = pData1._23 * z;
    pDataDestination._24 = pData1._24;

    pDataDestination._31 = pData1._31 * x;
    pDataDestination._32 = pData1._32 * y;
    pDataDestination._33 = pData1._33 * z;
    pDataDestination._34 = pData1._34;

    //скейлить эти компоненты необязательно, так как там должны лежать нули
    pDataDestination._41 = pData1._41 * x;
    pDataDestination._42 = pData1._42 * y;
    pDataDestination._43 = pData1._43 * z;
    pDataDestination._44 = pData1._44;

    return m4fDestination;
};

/**
 * матрица скейла умножается слева, то есть scaleMatrix * currentMatrix
 */
Mat4.prototype.scaleLeft = function(v3fVec,m4fDestination) {
    'use strict';
    
    var pData1 = this.pData;
    var pData2 = v3fVec.pData;

    var x = pData2.X, y = pData2.Y, z = pData2.Z;

    if(!m4fDestination){
        pData1._11 *= x;
        pData1._12 *= x;
        pData1._13 *= x;
        pData1._14 *= x;

        pData1._21 *= y;
        pData1._22 *= y;
        pData1._23 *= y;
        pData1._24 *= y;

        pData1._31 *= z;
        pData1._32 *= z;
        pData1._33 *= z;
        pData1._34 *= z;

        return this;
    }

    var pDataDestination = m4fDestination.pData;

    pDataDestination._11 = pData1._11 * x;
    pDataDestination._12 = pData1._12 * x;
    pDataDestination._13 = pData1._13 * x;
    pDataDestination._14 = pData1._14 * x;

    pDataDestination._21 = pData1._21 * y;
    pDataDestination._22 = pData1._22 * y;
    pDataDestination._23 = pData1._23 * y;
    pDataDestination._24 = pData1._24 * y;

    pDataDestination._31 = pData1._31 * z;
    pDataDestination._32 = pData1._32 * z;
    pDataDestination._33 = pData1._33 * z;
    pDataDestination._34 = pData1._34 * z;

    pDataDestination._41 = pData1._41;
    pDataDestination._42 = pData1._42;
    pDataDestination._43 = pData1._43;
    pDataDestination._44 = pData1._44;    

    return m4fDestination;
};

/*
 * Mat4.rotate
 * Rotates a matrix by the given angle around the specified axis
 * If rotating around a primary axis (X,Y,Z) one of the specialized rotation functions should be used instead for performance
 *
 * Params:
 * mat - Mat4 to rotate
 * angle - angle (in radians) to rotate
 * axis - Vec3 representing the axis to rotate around 
 * dest - Optional, Mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 *
 * матрица вращения умножается справа, то есть currentMatrix * rotationMatrix
 */

Mat4.prototype.rotateRight = function(fAngle,v3fAxis,m4fDestination) {
    'use strict';
    
    var pData1 = this.pData;
    var pData2 = v3fAxis.pData;

    var x = pData2.X, y = pData2.Y, z = pData2.Z;
    var fLength = Math.sqrt(x*x + y*y + z*z);
    if(fLength){
        x = x/fLength;
        y = y/fLength;
        z = z/fLength;
    }
    else{
        debug_assert(fLength,"попытка вращения вокруг оси нулевой длины. Угол " + fAngle + ". Ось " + v3fAxis.toString());
        return this;
    }

    var a11 = pData1._11, a12 = pData1._12, a13 = pData1._13;
    var a21 = pData1._21, a22 = pData1._22, a23 = pData1._23;
    var a31 = pData1._31, a32 = pData1._32, a33 = pData1._33;

    var fSin = Math.sin(fAngle);
    var fCos = Math.cos(fAngle);
    var fTmp = 1 - fCos;

    //build Rotation matrix
    
    var b11 = fCos + fTmp * x * x, b12 = fTmp * x * y - fSin * z, b13 = fTmp * x * z + fSin * y;
    var b21 = fTmp * y * z + fSin * z, b22 = fCos + fTmp * y * y, b23 = fTmp * y * z - fSin * x;
    var b31 = fTmp * z * x - fSin * y, b32 = fTmp * z * y + fSin * x, b33 = fCos + fTmp * z * z;

    if(!m4fDestination){
        pData1._11 = a11 * b11 + a12 * b21 + a13 * b31;
        pData1._12 = a11 * b12 + a12 * b22 + a13 * b32;
        pData1._13 = a11 * b13 + a12 * b23 + a13 * b33;

        pData1._21 = a21 * b11 + a22 * b21 + a23 * b31;
        pData1._22 = a21 * b12 + a22 * b22 + a23 * b32;
        pData1._23 = a21 * b13 + a22 * b23 + a23 * b33;

        pData1._31 = a31 * b11 + a32 * b21 + a33 * b31;
        pData1._32 = a31 * b12 + a32 * b22 + a33 * b32;
        pData1._33 = a31 * b13 + a32 * b23 + a33 * b33;

        return this;
    }

    var pDataDestination = m4fDestination.pData;

    pDataDestination._11 = a11 * b11 + a12 * b21 + a13 * b31;
    pDataDestination._12 = a11 * b12 + a12 * b22 + a13 * b32;
    pDataDestination._13 = a11 * b13 + a12 * b23 + a13 * b33;
    pDataDestination._14 = pData1._14;

    pDataDestination._21 = a21 * b11 + a22 * b21 + a23 * b31;
    pDataDestination._22 = a21 * b12 + a22 * b22 + a23 * b32;
    pDataDestination._23 = a21 * b13 + a22 * b23 + a23 * b33;
    pDataDestination._24 = pData1._24;

    pDataDestination._31 = a31 * b11 + a32 * b21 + a33 * b31;
    pDataDestination._32 = a31 * b12 + a32 * b22 + a33 * b32;
    pDataDestination._33 = a31 * b13 + a32 * b23 + a33 * b33;
    pDataDestination._34 = pData1._34;

    pDataDestination._41 = pData1._41;
    pDataDestination._42 = pData1._42;
    pDataDestination._43 = pData1._43;
    pDataDestination._44 = pData1._44;

    return m4fDestination;
};

/**
 * матрица поворота умножается слева, то есть rotationMatrix * currentMatrix
 */

Mat4.prototype.rotateLeft = function(fAngle,v3fAxis,m4fDestination) {
    'use strict';
    
    var pData1 = this.pData;
    var pData2 = v3fAxis.pData;

    var x = pData2.X, y = pData2.Y, z = pData2.Z;
    var fLength = Math.sqrt(x*x + y*y + z*z);
    if(fLength){
        x = x/fLength;
        y = y/fLength;
        z = z/fLength;
    }
    else{
        debug_assert(fLength,"попытка вращения вокруг оси нулевой длины. Угол " + fAngle + ". Ось " + v3fAxis.toString());
        return this;
    }

    var a11 = pData1._11, a12 = pData1._12, a13 = pData1._13, a14 = pData1._14;
    var a21 = pData1._21, a22 = pData1._22, a23 = pData1._23, a24 = pData1._24;
    var a31 = pData1._31, a32 = pData1._32, a33 = pData1._33, a34 = pData1._34;

    var fSin = Math.sin(fAngle);
    var fCos = Math.cos(fAngle);
    var fTmp = 1 - fCos;

    //build Rotation matrix
    
    var b11 = fCos + fTmp * x * x, b12 = fTmp * x * y - fSin * z, b13 = fTmp * x * z + fSin * y;
    var b21 = fTmp * y * z + fSin * z, b22 = fCos + fTmp * y * y, b23 = fTmp * y * z - fSin * x;
    var b31 = fTmp * z * x - fSin * y, b32 = fTmp * z * y + fSin * x, b33 = fCos + fTmp * z * z;

    if(!m4fDestination){
        pData1._11 = b11 * a11 + b12 * a21 + b13 * a31;
        pData1._12 = b11 * a12 + b12 * a22 + b13 * a32;
        pData1._13 = b11 * a13 + b12 * a23 + b13 * a33;
        pData1._14 = b11 * a14 + b12 * a24 + b13 * a34;

        pData1._21 = b21 * a11 + b22 * a21 + b23 * a31;
        pData1._22 = b21 * a12 + b22 * a22 + b23 * a32;
        pData1._23 = b21 * a13 + b22 * a23 + b23 * a33;
        pData1._24 = b21 * a14 + b22 * a24 + b23 * a34;

        pData1._31 = b31 * a11 + b32 * a21 + b33 * a31;
        pData1._32 = b31 * a12 + b32 * a22 + b33 * a32;
        pData1._33 = b31 * a13 + b32 * a23 + b33 * a33;
        pData1._34 = b31 * a14 + b32 * a24 + b33 * a34;

        return this;
    }

    var pDataDestination = m4fDestination.pData;

    pDataDestination._11 = b11 * a11 + b12 * a21 + b13 * a31;
    pDataDestination._12 = b11 * a12 + b12 * a22 + b13 * a32;
    pDataDestination._13 = b11 * a13 + b12 * a23 + b13 * a33;
    pDataDestination._14 = b11 * a14 + b12 * a24 + b13 * a34;

    pDataDestination._21 = b21 * a11 + b22 * a21 + b23 * a31;
    pDataDestination._22 = b21 * a12 + b22 * a22 + b23 * a32;
    pDataDestination._23 = b21 * a13 + b22 * a23 + b23 * a33;
    pDataDestination._24 = b21 * a14 + b22 * a24 + b23 * a34;

    pDataDestination._31 = b31 * a11 + b32 * a21 + b33 * a31;
    pDataDestination._32 = b31 * a12 + b32 * a22 + b33 * a32;
    pDataDestination._33 = b31 * a13 + b32 * a23 + b33 * a33;
    pDataDestination._34 = b31 * a14 + b32 * a24 + b33 * a34;

    pDataDestination._41 = pData1._41;
    pDataDestination._42 = pData1._42;
    pDataDestination._43 = pData1._43;
    pDataDestination._44 = pData1._44;

    return m4fDestination;
};

/*
 * Mat4.rotateX
 * Rotates a matrix by the given angle around the X axis
 *
 * Params:
 * mat - Mat4 to rotate
 * angle - angle (in radians) to rotate
 * dest - Optional, Mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 *
 * матрица вращения умножается справа, то есть currentMatrix * rotationMatrix
 */

Mat4.prototype.rotateXRight = function(fAngle,m4fDestination) {
    'use strict';
    
    var pData = this.pData;

    var fSin = Math.sin(fAngle);
    var fCos = Math.cos(fAngle);

    var a12 = pData._12, a13 = pData._13;
    var a22 = pData._22, a23 = pData._23;
    var a32 = pData._32, a33 = pData._33;

    if(!m4fDestination){
        pData._12 =  a12 * fCos + a13 * fSin;
        pData._13 = -a12 * fSin + a13 * fCos;

        pData._22 =  a22 * fCos + a23 * fSin;
        pData._23 = -a22 * fSin + a23 * fCos;

        pData._32 =  a32 * fCos + a33 * fSin;
        pData._33 = -a32 * fSin + a33 * fCos;

        return this;
    }

    var pDataDestination = m4fDestination.pData;

    pDataDestination._11 = pData._11;
    pDataDestination._12 =  a12 * fCos + a13 * fSin;
    pDataDestination._13 = -a12 * fSin + a13 * fCos;
    pDataDestination._14 = pData._14;

    pDataDestination._21 = pData._21;
    pDataDestination._22 =  a22 * fCos + a23 * fSin;
    pDataDestination._23 = -a22 * fSin + a23 * fCos;
    pDataDestination._24 = pData._24;

    pDataDestination._31 = pData._21;
    pDataDestination._32 =  a32 * fCos + a33 * fSin;
    pDataDestination._33 = -a32 * fSin + a33 * fCos;
    pDataDestination._34 = pData._34;

    pDataDestination._41 = pData._41;
    pDataDestination._42 = pData._42;
    pDataDestination._43 = pData._43;
    pDataDestination._44 = pData._44;

    return m4fDestination;
};

/**
 * матрица поворота умножается слева, то есть rotationMatrix * currentMatrix
 */

Mat4.prototype.rotateXLeft = function(fAngle,m4fDestination) {
    'use strict';
    
    var pData = this.pData;

    var fSin = Math.sin(fAngle);
    var fCos = Math.cos(fAngle);

    var a21 = pData._21, a22 = pData._22, a23 = pData._23, a24 = pData._24;
    var a31 = pData._31, a32 = pData._32, a33 = pData._33, a34 = pData._34;

    if(!m4fDestination){

        pData._21 = fCos * a21 - fSin * a31;
        pData._22 = fCos * a22 - fSin * a32;
        pData._23 = fCos * a23 - fSin * a33;
        pData._24 = fCos * a24 - fSin * a34;

        pData._31 = fSin * a21 + fCos * a31;
        pData._32 = fSin * a22 + fCos * a32;
        pData._33 = fSin * a23 + fCos * a33;
        pData._34 = fSin * a24 + fCos * a34;        

        return this;
    }

    var pDataDestination = m4fDestination.pData;

    pDataDestination._11 = pData._11;
    pDataDestination._12 = pData._12;
    pDataDestination._13 = pData._13;
    pDataDestination._14 = pData._14;

    pDataDestination._21 = fCos * a21 - fSin * a31;
    pDataDestination._22 = fCos * a22 - fSin * a32;
    pDataDestination._23 = fCos * a23 - fSin * a33;
    pDataDestination._24 = fCos * a24 - fSin * a34;

    pDataDestination._31 = fSin * a21 + fCos * a31;
    pDataDestination._32 = fSin * a22 + fCos * a32;
    pDataDestination._33 = fSin * a23 + fCos * a33;
    pDataDestination._34 = fSin * a24 + fCos * a34;  

    pDataDestination._41 = pData._41;
    pDataDestination._42 = pData._42;
    pDataDestination._43 = pData._43;
    pDataDestination._44 = pData._44;

    return m4fDestination;
};

/*
 * Mat4.rotateY
 * Rotates a matrix by the given angle around the Y axis
 *
 * Params:
 * mat - Mat4 to rotate
 * angle - angle (in radians) to rotate
 * dest - Optional, Mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 *
 * матрица вращения умножается справа, то есть currentMatrix * rotationMatrix
 */

Mat4.prototype.rotateYRight = function(fAngle,m4fDestination) {
    'use strict';
    
    var pData = this.pData;

    var fSin = Math.sin(fAngle);
    var fCos = Math.cos(fAngle);

    var a11 = pData._11, a13 = pData._13;
    var a21 = pData._21, a23 = pData._23;
    var a31 = pData._31, a33 = pData._33;

    if(!m4fDestination){

        pData._11 = a11 * fCos - a13 * fSin;
        pData._13 = a11 * fSin + a13 * fCos;

        pData._21 = a21 * fCos - a23 * fSin;
        pData._23 = a21 * fSin + a23 * fCos;

        pData._31 = a31 * fCos - a33 * fSin;
        pData._33 = a31 * fSin + a33 * fCos;

        return this;
    }

    var pDataDestination = m4fDestination.pData;

    pDataDestination._11 = a11 * fCos - a13 * fSin;
    pDataDestination._12 = pData._12;
    pDataDestination._13 = a11 * fSin + a13 * fCos;
    pDataDestination._14 = pData._14;

    pDataDestination._21 = a21 * fCos - a23 * fSin;
    pDataDestination._22 = pData._22;
    pDataDestination._23 = a21 * fSin + a23 * fCos;
    pDataDestination._24 = pData._24;

    pDataDestination._31 = a31 * fCos - a33 * fSin;
    pDataDestination._32 = pData._32;
    pDataDestination._33 = a31 * fSin + a33 * fCos;
    pDataDestination._34 = pData._34;

    pDataDestination._41 = pData._41;
    pDataDestination._42 = pData._42;
    pDataDestination._43 = pData._43;
    pDataDestination._44 = pData._44;

    return m4fDestination;
};

/**
 * матрица поворота умножается слева, то есть rotationMatrix * currentMatrix
 */

Mat4.prototype.rotateYLeft = function(fAngle,m4fDestination) {
    'use strict';
    var pData = this.pData;

    var fSin = Math.sin(fAngle);
    var fCos = Math.cos(fAngle);

    var a11 = pData._11, a12 = pData._12, a13 = pData._13, a14 = pData._14;    
    var a31 = pData._31, a32 = pData._32, a33 = pData._33, a34 = pData._34;

    if(!m4fDestination){

        pData._11 = fCos * a11 + fSin * a31;
        pData._12 = fCos * a12 + fSin * a32;
        pData._13 = fCos * a13 + fSin * a33;
        pData._14 = fCos * a14 + fSin * a34;

        pData._31 = -fSin * a11 + fCos * a31;
        pData._32 = -fSin * a12 + fCos * a32;
        pData._33 = -fSin * a13 + fCos * a33;
        pData._34 = -fSin * a14 + fCos * a34;
        return this;
    }

    var pDataDestination = m4fDestination;

    pDataDestination._11 = fCos * a11 + fSin * a31;
    pDataDestination._12 = fCos * a12 + fSin * a32;
    pDataDestination._13 = fCos * a13 + fSin * a33;
    pDataDestination._13 = fCos * a14 + fSin * a34;

    pDataDestination._21 = pData._21;
    pDataDestination._22 = pData._22;
    pDataDestination._23 = pData._23;
    pDataDestination._24 = pData._24;

    pDataDestination._31 = -fSin * a11 + fCos * a31;
    pDataDestination._32 = -fSin * a12 + fCos * a32;
    pDataDestination._33 = -fSin * a13 + fCos * a33;
    pDataDestination._33 = -fSin * a14 + fCos * a34;

    pDataDestination._41 = pData._41;
    pDataDestination._42 = pData._42;
    pDataDestination._43 = pData._43;
    pDataDestination._44 = pData._44;

    return m4fDestination;
};

/*
 * Mat4.rotateZ
 * Rotates a matrix by the given angle around the Z axis
 *
 * Params:
 * mat - Mat4 to rotate
 * angle - angle (in radians) to rotate
 * dest - Optional, Mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 *
 * матрица вращения умножается справа, то есть currentMatrix * rotationMatrix
 */

Mat4.prototype.rotateZRight = function(fAngle,m4fDestination) {
    'use strict';
    
    var pData = this.pData;

    var fSin = Math.sin(fAngle);
    var fCos = Math.cos(fAngle);

    var a11 = pData._11, a12 = pData._12;
    var a21 = pData._21, a22 = pData._22;
    var a31 = pData._31, a32 = pData._32;

    if(!m4fDestination){

        pData._11 = a11 * fCos + a12 * fSin;
        pData._12 = -a11 * fSin + a12 * fCos;

        pData._21 = a21 * fCos + a22 * fSin;
        pData._22 = -a21 * fSin + a22 * fCos;

        pData._31 = a31 * fCos + a32 * fSin;
        pData._32 = -a31 * fSin + a32 * fCos;

        return this;
    }

    var pDataDestination = m4fDestination.pData;

    pDataDestination._11 = a11 * fCos + a12 * fSin;
    pDataDestination._12 = -a11 * fSin + a12 * fCos;    
    pDataDestination._13 = pData._13;
    pDataDestination._14 = pData._14;

    pDataDestination._21 = a21 * fCos + a22 * fSin;
    pDataDestination._22 = -a21 * fSin + a22 * fCos;
    pDataDestination._23 = pData._23;
    pDataDestination._24 = pData._24;

    pDataDestination._31 = a31 * fCos + a32 * fSin;
    pDataDestination._32 = -a31 * fSin + a32 * fCos;
    pDataDestination._33 = pData._33;
    pDataDestination._34 = pData._34;

    pDataDestination._41 = pData._41;
    pDataDestination._42 = pData._42;
    pDataDestination._43 = pData._43;
    pDataDestination._44 = pData._44;

    return m4fDestination;
};

/**
 * матрица поворота умножается слева, то есть rotationMatrix * currentMatrix
 */

Mat4.prototype.rotateZLeft = function(fAngle,m4fDestination) {
    'use strict';
    
    var pData = this.pData;

    var fSin = Math.sin(fAngle);
    var fCos = Math.cos(fAngle);

    var a11 = pData._11, a12 = pData._12, a13 = pData._13, a14 = pData._14;
    var a21 = pData._21, a22 = pData._22, a23 = pData._23, a24 = pData._24;

    if(!m4fDestination){

        pData._11 = fCos * a11 - fSin * a21;
        pData._12 = fCos * a12 - fSin * a22;
        pData._13 = fCos * a13 - fSin * a23;
        pData._14 = fCos * a14 - fSin * a24;

        pData._21 = fSin * a11 + fCos * a21;
        pData._22 = fSin * a12 + fCos * a22;
        pData._23 = fSin * a13 + fCos * a23;
        pData._24 = fSin * a14 + fCos * a24;

        return this;
    }

    var pDataDestination = m4fDestination.pData;

    pDataDestination._11 = fCos * a11 - fSin * a21;
    pDataDestination._12 = fCos * a12 - fSin * a22;
    pDataDestination._13 = fCos * a13 - fSin * a23;
    pDataDestination._14 = fCos * a14 - fSin * a24;

    pDataDestination._21 = fSin * a11 + fCos * a21;
    pDataDestination._22 = fSin * a12 + fCos * a22;
    pDataDestination._23 = fSin * a13 + fCos * a23;
    pDataDestination._24 = fSin * a14 + fCos * a24;

    pDataDestination._31 = pData._31;
    pDataDestination._32 = pData._32;
    pDataDestination._33 = pData._33;
    pDataDestination._34 = pData._34;

    pDataDestination._41 = pData._41;
    pDataDestination._42 = pData._42;
    pDataDestination._43 = pData._43;
    pDataDestination._44 = pData._44;

    return m4fDestination;
};

Mat4.prototype.row = function(iRow) {
    'use strict';

    var pData = this.pData;
    switch(iRow){
        case 1 : 
            return new Vec4(pData._11,pData._12,pData._13,pData._14);
        case 2 :
            return new Vec4(pData._21,pData._22,pData._23,pData._24);
        case 3 : 
            return new Vec4(pData._31,pData._32,pData._33,pData._34);
        case 4 :
            return new Vec4(pData._41,pData._42,pData._43,pData._44);
    }
};

Mat4.prototype.column = function(iColumn) {
    'use strict';
    var pData = this.pData;
    switch(iColumn){
        case 1 : 
            return new Vec4(pData._11,pData._21,pData._31,pData._41);
        case 2 :
            return new Vec4(pData._12,pData._22,pData._32,pData._42);
        case 3 : 
            return new Vec4(pData._13,pData._23,pData._33,pData._43);
        case 4 :
            return new Vec4(pData._14,pData._24,pData._34,pData._44);
    }
};

Mat4.prototype.toQuat4 = function(q4fDestination) {
    'use strict';
    
    if(!q4fDestination){
        q4fDestination = new Quat4();
    }

    var pData = this.pData;
    var pDataDestination = q4fDestination.pData;

    var a11 = pData._11, a12 = pData._12, a13 = pData._13;
    var a21 = pData._21, a22 = pData._22, a23 = pData._23;
    var a31 = pData._31, a32 = pData._32, a33 = pData._33;

    var x2 = ((a11 - a22 - a33) + 1)/4; //x^2
    var y2 = ((a22 - a11 - a33) + 1)/4; //y^2
    var z2 = ((a33 - a11 - a22) + 1)/4; //z^2
    var w2 = ((a11 + a22 + a33) + 1)/4; //w^2

    var fMax = Math.max(x2,Math.max(y2,Math.max(z2,w2)));

    if(fMax == x2){
        var x = Math.sqrt(x2); //максимальная компонента берется положительной

        pDataDestination.X = x;
        pDataDestination.Y = (a21 + a12)/4/x;
        pDataDestination.Z = (a31 + a13)/4/x;
        pDataDestination.W = (a32 - a23)/4/x;
    }
    else if(fMax == y2){
        var y = Math.sqrt(y2); //максимальная компонента берется положительной

        pDataDestination.X = (a21 + a12)/4/y;
        pDataDestination.Y = y;
        pDataDestination.Z = (a32 + a23)/4/y;
        pDataDestination.W = (a13 - a31)/4/y;
    }
    else if(fMax == z2){
        var z = Math.sqrt(z2); //максимальная компонента берется положительной

        pDataDestination.X = (a31 + a13)/4/z;
        pDataDestination.Y = (a32 + a23)/4/z;
        pDataDestination.Z = z;
        pDataDestination.W = (a21 - a12)/4/z;
    }
    else{
        var w = Math.sqrt(w2); //максимальная компонента берется положительной

        pDataDestination.X = (a32 - a23)/4/w;
        pDataDestination.Y = (a13 - a31)/4/w;
        pDataDestination.Z = (a21 - a12)/4/w;
        pDataDestination.W = w;
    }

    return q4fDestination;
};

Mat4.prototype.setTranslation = function(v3fVec) {
    var pData1 = this.pData;
    var pData2 = v3fVec.pData;

    pData1._14 = pData2.X;
    pData1._24 = pData2.Y;
    pData1._34 = pData2.Z;

    return this;
};

Mat4.prototype.set3x3 = function(pMatrix) {
    'use strict';

    var pData = this.pData;
    var pData2 = pMatrix.pData;

    if(pData2.length == 9){
        //input 3x3 matrix
        pData._11 = pData2.a11;
        pData._12 = pData2.a12;
        pData._13 = pData2.a13;

        pData._21 = pData2.a21;
        pData._22 = pData2.a22;
        pData._23 = pData2.a23;

        pData._31 = pData2.a31;
        pData._32 = pData2.a32;
        pData._33 = pData2.a33;
    }
    else{
        //input 4x4 matrix
        pData._11 = pData2._11;
        pData._12 = pData2._12;
        pData._13 = pData2._13;

        pData._21 = pData2._21;
        pData._22 = pData2._22;
        pData._23 = pData2._23;

        pData._31 = pData2._31;
        pData._32 = pData2._32;
        pData._33 = pData2._33;
    }

    return this;
};

Mat4.prototype.toInverseMat3 = function(m3fDestination) {
    'use strict';
    if(!m3fDestination){
        m3fDestination = new Mat3();
    }

    var pData = this.pData;
    var pDataDestination = m3fDestination.pData;

    var a11 = pData._11, a12 = pData._12, a13 = pData._13;
    var a21 = pData._21, a22 = pData._22, a23 = pData._23;
    var a31 = pData._31, a32 = pData._32, a33 = pData._33;

    var A11 = a22 * a33 - a23 * a32;
    var A12 = a21 * a33 - a23 * a31;
    var A13 = a21 * a32 - a22 * a31;

    var A21 = a12 * a33 - a13 * a32;
    var A22 = a11 * a33 - a13 * a31;
    var A23 = a11 * a32 - a12 * a31;

    var A31 = a12 * a23 - a13 * a22;
    var A32 = a11 * a23 - a13 * a21;
    var A33 = a11 * a22 - a12 * a21;

    var fDeterminant = a11*A11 - a12 * A12 + a13 * A13;

    if(fDeterminant == 0){
        debug_assert(0,"обращение матрицы с нулевым детеминантом:\n" 
                        + this.toString());

        return m3fDestination.set(1); //чтобы все не навернулось
    }

    var fInverseDeterminant = 1./fDeterminant;

    pDataDestination.a11 = A11 * fInverseDeterminant;
    pDataDestination.a12 = -A21 * fInverseDeterminant;
    pDataDestination.a13 = A31 * fInverseDeterminant;

    pDataDestination.a21 = -A12 * fInverseDeterminant;
    pDataDestination.a22 = A22 * fInverseDeterminant;
    pDataDestination.a23 = -A32 * fInverseDeterminant;

    pDataDestination.a31 = A13 * fInverseDeterminant;
    pDataDestination.a32 = -A23 * fInverseDeterminant;
    pDataDestination.a33 = A33 * fInverseDeterminant;

    return m3fDestination;
};

/**
 * позволяет умножить матрицу (и только матрицу) слева, то есть
 * resultMatrix = m4fMat * currentMatrix;
 */
Mat4.prototype.multiplyLeft = function(m4fMat,m4fDestination){
    'use strict';
    return m4fMat.multiply(this,m4fDestination || this);
};

Mat4.prototype.decompose = function(q4fRotation,v3fScale,v3fTranslation) {
    'use strict';
    
    var pData = this.pData;

    //изначально предполагаем, что порядок умножения был rot * scale
    var m3fRotScale = this.toMat3(Mat3());
    var m3fRotScaleTransposed = m3fRotScale.transpose(Mat3());
    var isRotScale = true; 

    //понадобятся если порядок умножения был другим
    var m3fScaleRot, m3fScaleRotTransposed;

    //было отражение или нет
    var scaleSign = (m3fRotScale.determinant() >= 0) ? 1 : -1;

    //first variant rot * scale
    // (rot * scale)T * (rot * scale) = 
    // scaleT * rotT * rot * scale = scaleT *rot^-1 * rot * scale = 
    // scaleT * scale
    var m3fResult = m3fRotScaleTransposed.multiply(m3fRotScale);
    if(!m3fResult.isDiagonal(1e-6)){
        //предположение было неверным

        //просто переобозначения чтобы не было путаницы
        m3fScaleRot = m3fRotScale;
        m3fScaleRotTransposed = m3fRotScaleTransposed;

        //second variant scale * rot
        // (scale * rot) * (scale * rot)T = 
        // scale * rot * rotT * scaleT = scale *rot * rot^-1 * scaleT = 
        // scale * scaleT

        m3fResult = m3fScaleRot.multiply(m3fScaleRotTransposed);
    }

    var pResultData = m3fResult.pData;
    var x = pResultData.a11;
    var y = pResultData.a22 * scaleSign; //если было отражение, считается что оно было по y
    var z = pResultData.a33;

    v3fScale.set(x,y,z);
    var m3fInverseScale = Mat3(1/x,1/y,1/z);
    var m3fRot;


    if(isRotScale){
        m3fRot = m3fRotScale.multiply(m3fInverseScale);
        v3fTranslation.set(pData._14,pData._24,pData._34);
    }
    else{
        m3fRot = m3fInverseScale.multiply(m3fScaleRot);
        v3fTranslation.set(pData._14/x,pData._24/y,pData._34/z);
    }

    debug_assert(isRotScale,"порядок умножения scale rot в данный момент не поддерживается");

    m3fRot.toQuat4(q4fRotation);
};

/**
 * проверяет диагональная ли матрица с определенной точностью
 */
Mat4.prototype.isDiagonal = function(fEps) {
    'use strict'; 
    fEps = ifndef(fEps,0);
    var pData = this.pData;

    if(fEps == 0){
        if(    pData._12 != 0 || pData._13 != 0 || pData._14 != 0 
            || pData._21 != 0 || pData._23 != 0 || pData._24 != 0
            || pData._31 != 0 || pData._32 != 0 || pData._34 != 0
            || pData._41 != 0 || pData._42 != 0 || pData._43 != 0){

            return false;
        }
    }
    else{
        if(    Math.abs(pData._12) > fEps || Math.abs(pData._13) > fEps || Math.abs(pData._14) > fEps
            || Math.abs(pData._21) > fEps || Math.abs(pData._23) > fEps || Math.abs(pData._24) > fEps
            || Math.abs(pData._31) > fEps || Math.abs(pData._32) > fEps || Math.abs(pData._34) > fEps
            || Math.abs(pData._41) > fEps || Math.abs(pData._42) > fEps || Math.abs(pData._43) > fEps){

            return false;
        }
    }
    return true;
};

/*
 * Mat4.frustum
 * Generates a frustum matrix with the given bounds
 *
 * Params:
 * left, right - scalar, left and right bounds of the frustum
 * bottom, top - scalar, bottom and top bounds of the frustum
 * near, far - scalar, near and far bounds of the frustum
 * dest - Optional, Mat4 frustum matrix will be written into
 *
 * Returns:
 * dest if specified, a new Mat4 otherwise
 */
Mat4.frustum = function (fLeft, fRight, fBottom, fTop, fNear,fFar, m4fDestination) {
    'use strict';
    if(!m4fDestination){
        m4fDestination = new Mat4();
    }

    var pDataDestination = m4fDestination.pData;

    var fRL = fRight - fLeft;
    var fTB = fTop - fBottom;
    var fFN = fFar - fNear;

    pDataDestination._11 = 2*fNear/fRL;
    pDataDestination._12 = 0;
    pDataDestination._13 = (fRight + fLeft)/fRL;
    pDataDestination._14 = 0;

    pDataDestination._21 = 0;
    pDataDestination._22 = 2*fNear/fTB;
    pDataDestination._23 = (fTop + fBottom)/fTB;
    pDataDestination._24 = 0;

    pDataDestination._31 = 0;
    pDataDestination._32 = 0;
    pDataDestination._33 = -(fFar + fNear)/fFN;
    pDataDestination._34 = -2*fFar*fNear/fFN;

    pDataDestination._41 = 0;
    pDataDestination._42 = 0;
    pDataDestination._43 = -1;
    pDataDestination._44 = 0;

    return m4fDestination;
};

/*
 * Mat4.perspective
 * Generates a perspective projection matrix with the given bounds
 *
 * Params:
 * fFOVy - scalar, vertical field of view in radians
 * aspect - scalar, aspect ratio. typically viewport width/height
 * near, far - scalar, near and far bounds of the frustum
 * dest - Optional, Mat4 frustum matrix will be written into
 *
 * Returns:
 * dest if specified, a new Mat4 otherwise
 */
Mat4.perspective = function (fFOVy, fAspect, fNear, fFar, m4fDestination) {
    'use strict';
    var fTop = fNear * Math.tan(fFOVy/2.);
    var fRight = fTop * fAspect;
    return Mat4.frustum(-fRight, fRight, -fTop, fTop, fNear, fFar, m4fDestination);
};

/*
 * Mat4.ortho
 * Generates a orthogonal projection matrix with the given bounds
 *
 * Params:
 * left, right - scalar, left and right bounds of the frustum
 * bottom, top - scalar, bottom and top bounds of the frustum
 * near, far - scalar, near and far bounds of the frustum
 * dest - Optional, Mat4 frustum matrix will be written into
 *
 * Returns:
 * dest if specified, a new Mat4 otherwise
 */
Mat4.orthogonalProjectionAsymmetric = function (fLeft, fRight, fBottom, fTop, fNear, fFar, m4fDestination) {
    'use strict';
    if(!m4fDestination){
        m4fDestination = new Mat4();
    }

    var pDataDestination = m4fDestination.pData;

    var fRL = fRight - fLeft;
    var fTB = fTop - fBottom;
    var fFN = fFar - fNear;

    pDataDestination._11 = 2./fRL;
    pDataDestination._12 = 0;
    pDataDestination._13 = 0;
    pDataDestination._14 = -(fRight + fLeft)/fRL;

    pDataDestination._21 = 0;
    pDataDestination._22 = 2./fTB;
    pDataDestination._23 = 0;
    pDataDestination._24 = -(fTop + fBottom)/fTB;

    pDataDestination._31 = 0;
    pDataDestination._32 = 0;
    pDataDestination._33 = -2/fFN;
    pDataDestination._34 = -(fFar + fNear)/fFN;

    pDataDestination._41 = 0;
    pDataDestination._42 = 0;
    pDataDestination._43 = 0;
    pDataDestination._44 = 1;

    return m4fDestination;
};

Mat4.orthogonalProjection = function(fWidth, fHeight, fNear, fFar, m4fDestination){
    var fRight = fWidth/2;
    var fTop = fHeight/2;
    return Mat4.orthogonalProjectionAsymmetric(-fRight,fRight,-fTop,fTop,fNear,fFar,m4fDestination);
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * Params:
 * eye - Vec3, position of the viewer
 * center - Vec3, point the viewer is looking at
 * up - Vec3 pointing "up"
 * dest - Optional, Mat4 frustum matrix will be written into
 *
 * Returns:
 * dest if specified, a new Mat4 otherwise
 *
 */
Mat4.lookAt = function (v3fEye, v3fCenter, v3fUp, m4fDestination) {
    'use strict';
    if(!m4fDestination){
        m4fDestination = new Mat4(1);
    }

    var pData1 = v3fEye.pData;
    var pData2 = v3fCenter.pData;
    var pData3 = v3fUp.pData;

    var fEyeX = pData1.X, fEyeY = pData1.Y, fEyeZ = pData1.Z;
    var fCenterX = pData2.X, fCenterY = pData2.Y, fCenterZ = pData2.Z;
    var fUpX = pData3.X, fUpY = pData3.Y, fUpZ = pData3.Z;

    if(fEyeX == fCenterX && fEyeY == fCenterY && fEyeZ == fCenterZ){
        return m4fDestination;
    }

    var fXNewX, fXNewY, fXNewZ, fYNewX, fYNewY, fYNewZ, fZNewX, fZNewY, fZNewZ;

    //ось Z направлена на наблюдателя
    fZNewX = fEyeX - fCenterX;
    fZNewY = fEyeY - fCenterY;
    fZNewZ = fEyeZ - fCenterZ;

    var fLength = Math.sqrt(fZNewX * fZNewX + fZNewY * fZNewY + fZNewZ * fZNewZ);
    
    //новая ось Z
    fZNewX = fZNewX/fLength;
    fZNewY = fZNewY/fLength;
    fZNewZ = fZNewZ/fLength;

    //новая ось X
    fXNewX = fUpY * fZNewZ - fUpZ * fZNewY;
    fXNewY = fUpZ * fZNewX - fUpX * fZNewZ;
    fXNewZ = fUpX * fZNewY - fUpY * fZNewX;

    fLength = Math.sqrt(fXNewX * fXNewX + fXNewY * fXNewY + fXNewZ * fXNewZ);
    if(fLength){
        fXNewX = fXNewX/fLength;
        fXNewY = fXNewY/fLength;
        fXNewZ = fXNewZ/fLength;
    }
    
    //новая ось Y
    
    fYNewX = fZNewY * fXNewZ - fZNewZ * fXNewY;
    fYNewY = fZNewZ * fXNewX - fZNewX * fXNewZ;
    fYNewZ = fZNewX * fXNewY - fZNewY * fXNewX;

    //нормировать ненужно, так как было векторное умножение двух ортонормированных векторов

    //положение камеры в новых осях
    var fEyeNewX = fEyeX * fXNewX + fEyeY * fXNewY + fEyeZ * fXNewZ;
    var fEyeNewY = fEyeX * fYNewX + fEyeY * fYNewY + fEyeZ * fYNewZ;
    var fEyeNewZ = fEyeX * fZNewX + fEyeY * fZNewY + fEyeZ * fZNewZ;

    var pDataDestination = m4fDestination.pData;

    //почему новый базис записывается по строкам?
    //это сзязано с тем, что это получающаяся матрица - 
    //это viewMatrix камеры, а на эту матрицу умножается при рендеринге, то есть
    //модель должна испытать преобразования противоположные тем, которые испытывает камера
    //то есть вращение в другую сторону(базис по строкам) и сдвиг в противоположную сторону

    pDataDestination._11 = fXNewX;
    pDataDestination._12 = fXNewY;
    pDataDestination._13 = fXNewZ;
    pDataDestination._14 = -fEyeNewX; //отъезжаем в позицию камеры

    pDataDestination._21 = fYNewX;
    pDataDestination._22 = fYNewY;
    pDataDestination._23 = fYNewZ;
    pDataDestination._24 = -fEyeNewY; //отъезжаем в позицию камеры

    pDataDestination._31 = fZNewX;
    pDataDestination._32 = fZNewY;
    pDataDestination._33 = fZNewZ;
    pDataDestination._34 = -fEyeNewZ; //отъезжаем в позицию камеры

    pDataDestination._41 = 0;
    pDataDestination._42 = 0;
    pDataDestination._43 = 0;
    pDataDestination._44 = 1;

    return m4fDestination;
};

Mat4.prototype.translate = Mat4.prototype.translateLeft;
Mat4.prototype.scale = Mat4.prototype.scaleLeft;
Mat4.prototype.rotate = Mat4.prototype.rotateLeft;
Mat4.prototype.rotateX = Mat4.prototype.rotateXLeft;
Mat4.prototype.rotateY = Mat4.prototype.rotateYLeft;
Mat4.prototype.rotateZ = Mat4.prototype.rotateZLeft;
Mat4.prototype.mult = Mat4.prototype.multiply;
Mat4.prototype.multLeft = Mat4.prototype.multiplyLeft;
Mat4.prototype.toSource = Mat4.prototype.toString;

Mat4.matrixPerspectiveFovRH = Mat4.perspective;

a.allocateStorage(Mat4,100);