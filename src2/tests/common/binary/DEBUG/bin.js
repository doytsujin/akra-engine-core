


/*---------------------------------------------
 * assembled at: Thu Jul 11 2013 15:09:35 GMT+0400 (Московское время (зима))
 * directory: tests/common/binary/DEBUG/
 * file: tests/common/binary/bin.ts
 * name: bin
 *--------------------------------------------*/


var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// @data: data
/// @DATA: {data}|location()
// #define CRYPTO_API 1
// #define GUI 1
// #define WEBGL_DEBUG 1
// #define DETAILED_LOG 1
//trace all render entry
// #define __VIEW_INTERNALS__ 1
var akra;
(function (akra) {
    (function (ELogLevel) {
        ELogLevel._map = [];
        ELogLevel.NONE = 0x0000;
        ELogLevel.LOG = 0x0001;
        ELogLevel.INFORMATION = 0x0002;
        ELogLevel.WARNING = 0x0004;
        ELogLevel.ERROR = 0x0008;
        ELogLevel.CRITICAL = 0x0010;
        ELogLevel.ALL = 0x001F;
    })(akra.ELogLevel || (akra.ELogLevel = {}));
    var ELogLevel = akra.ELogLevel;
})(akra || (akra = {}));
/*I ## */
/*I ## */
/*I ## */
/*I ## */
var akra;
(function (akra) {
    var p = document.getElementsByTagName("script");
    /**@const*/ akra.DATA = (akra.DATA || ((p[p.length - 1]).getAttribute("data")) || data) + "/";
    akra.DEBUG = true;
    akra.logger;
    akra.typeOf;
    akra.typeOf = function typeOf(x) {
        var s = typeof x;
        if (s === "object") {
            if (x) {
                if (x instanceof Array) {
                    return 'array';
                } else if (x instanceof Object) {
                    return s;
                }
                var sClassName = Object.prototype.toString.call(x);
                if (sClassName == '[object Window]') {
                    return 'object';
                }
                if ((sClassName == '[object Array]' || typeof x.length == 'number' && typeof x.splice != 'undefined' && typeof x.propertyIsEnumerable != 'undefined' && !x.propertyIsEnumerable('splice'))) {
                    return 'array';
                }
                if ((sClassName == '[object Function]' || typeof x.call != 'undefined' && typeof x.propertyIsEnumerable != 'undefined' && !x.propertyIsEnumerable('call'))) {
                    return 'function';
                }
            } else {
                return 'null';
            }
        } else if (s == 'function' && typeof x.call == 'undefined') {
            return 'object';
        }
        return s;
    };
    /** @inline */
    akra.isDef = /** @inline */function (x) {
        return x !== undefined;
    };
    /** @inline */
    akra.isEmpty = /** @inline */function (x) {
        return x.length == 0;
    };
    // Note that undefined == null.
    /** @inline */
    akra.isDefAndNotNull = /** @inline */function (x) {
        return x != null;
    };
    /** @inline */
    akra.isNull = /** @inline */function (x) {
        return x === null;
    };
    /** @inline */
    akra.isBoolean = /** @inline */function (x) {
        return typeof x === "boolean";
    };
    /** @inline */
    akra.isString = /** @inline */function (x) {
        return typeof x === "string";
    };
    /** @inline */
    akra.isNumber = /** @inline */function (x) {
        return typeof x === "number";
    };
    /** @inline */
    akra.isFloat = akra.isNumber;
    /** @inline */
    akra.isInt = akra.isNumber;
    /** @inline */
    akra.isFunction = /** @inline */function (x) {
        return akra.typeOf(x) === "function";
    };
    /** @inline */
    akra.isObject = function (x) {
        var type = akra.typeOf(x);
        return type == "object" || type == "array" || type == "function";
    };
    akra.isArrayBuffer = /** @inline */function (x) {
        return x instanceof ArrayBuffer;
    };
    akra.isTypedArray = /** @inline */function (x) {
        return x !== null && typeof x === "object" && typeof x.byteOffset === "number";
    };
    akra.isBlob = /** @inline */function (x) {
        return x instanceof Blob;
    };
    /** @inline */
    akra.isArray = function (x) {
        return akra.typeOf(x) == "array";
    };
    ;
    // if (!isDef(console.assert)) {
    //     console.assert = function (isOK?: bool, ...pParams: any[]): void {
    //         if (!isOK) {
    //             trace('---------------------------');
    //             trace.apply(null, pParams);
    //             throw new Error("[assertion failed]");
    //         }
    //     }
    // }
    // export var trace = console.log.bind(console);
    // export var assert = console.assert.bind(console);
    // export var warning = console.warn.bind(console);
    // export var error = console.error.bind(console);
    // export var debug_print = (pArg:any, ...pParams: any[]): void => {
    //         trace.apply(null, arguments);
    // }
    // export var debug_assert = (isOK: bool, ...pParams: any[]): void => {
    //         assert.apply(null, arguments);
    // }
    // export var debug_warning = (pArg:any, ...pParams: any[]): void => {
    //         warning.apply(null, arguments);
    // }
    // export var debug_error = (pArg:any, ...pParams: any[]): void => {
    //         error.apply(null, arguments);
    // }
    function genArray(pType, nSize) {
        var tmp = new Array(nSize);
        for(var i = 0; i < nSize; ++i) {
            tmp[i] = (pType ? new pType() : null);
        }
        return tmp;
    }
    akra.genArray = genArray;
    /**@const*/ akra.INVALID_INDEX = 0xffff;
    // (-2147483646);
    /**@const*/ akra.MIN_INT32 = 0xffffffff;
    // ( 2147483647);
    /**@const*/ akra.MAX_INT32 = 0x7fffffff;
    // (-32768);
    /**@const*/ akra.MIN_INT16 = 0xffff;
    // ( 32767);
    /**@const*/ akra.MAX_INT16 = 0x7fff;
    // (-128);
    /**@const*/ akra.MIN_INT8 = 0xff;
    // ( 127);
    /**@const*/ akra.MAX_INT8 = 0x7f;
    /**@const*/ akra.MIN_UINT32 = 0;
    /**@const*/ akra.MAX_UINT32 = 0xffffffff;
    /**@const*/ akra.MIN_UINT16 = 0;
    /**@const*/ akra.MAX_UINT16 = 0xffff;
    /**@const*/ akra.MIN_UINT8 = 0;
    /**@const*/ akra.MAX_UINT8 = 0xff;
    /**@const*/ akra.SIZE_FLOAT64 = 8;
    /**@const*/ akra.SIZE_REAL64 = 8;
    /**@const*/ akra.SIZE_FLOAT32 = 4;
    /**@const*/ akra.SIZE_REAL32 = 4;
    /**@const*/ akra.SIZE_INT32 = 4;
    /**@const*/ akra.SIZE_UINT32 = 4;
    /**@const*/ akra.SIZE_INT16 = 2;
    /**@const*/ akra.SIZE_UINT16 = 2;
    /**@const*/ akra.SIZE_INT8 = 1;
    /**@const*/ akra.SIZE_UINT8 = 1;
    /**@const*/ akra.SIZE_BYTE = 1;
    /**@const*/ akra.SIZE_UBYTE = 1;
    //1.7976931348623157e+308
    /**@const*/ akra.MAX_FLOAT64 = Number.MAX_VALUE;
    //-1.7976931348623157e+308
    /**@const*/ akra.MIN_FLOAT64 = -Number.MAX_VALUE;
    //5e-324
    /**@const*/ akra.TINY_FLOAT64 = Number.MIN_VALUE;
    //    export const MAX_REAL64: number = Number.MAX_VALUE;   //1.7976931348623157e+308
    //    export const MIN_REAL64: number = -Number.MAX_VALUE;  //-1.7976931348623157e+308
    //    export const TINY_REAL64: number = Number.MIN_VALUE;  //5e-324
    //3.4e38
    /**@const*/ akra.MAX_FLOAT32 = 3.4e38;
    //-3.4e38
    /**@const*/ akra.MIN_FLOAT32 = -3.4e38;
    //1.5e-45
    /**@const*/ akra.TINY_FLOAT32 = 1.5e-45;
    //    export const MAX_REAL32: number = 3.4e38;     //3.4e38
    //    export const MIN_REAL32: number = -3.4e38;    //-3.4e38
    //    export const TINY_REAL32: number = 1.5e-45;   //1.5e-45
    /**@const*/ akra.DEFAULT_MATERIAL_NAME = "default";
    (function (EDataTypes) {
        EDataTypes._map = [];
        EDataTypes.BYTE = 0x1400;
        EDataTypes.UNSIGNED_BYTE = 0x1401;
        EDataTypes.SHORT = 0x1402;
        EDataTypes.UNSIGNED_SHORT = 0x1403;
        EDataTypes.INT = 0x1404;
        EDataTypes.UNSIGNED_INT = 0x1405;
        EDataTypes.FLOAT = 0x1406;
    })(akra.EDataTypes || (akra.EDataTypes = {}));
    var EDataTypes = akra.EDataTypes;
    ;
    (function (EDataTypeSizes) {
        EDataTypeSizes._map = [];
        EDataTypeSizes.BYTES_PER_BYTE = 1;
        EDataTypeSizes.BYTES_PER_UNSIGNED_BYTE = 1;
        EDataTypeSizes.BYTES_PER_UBYTE = 1;
        EDataTypeSizes.BYTES_PER_SHORT = 2;
        EDataTypeSizes.BYTES_PER_UNSIGNED_SHORT = 2;
        EDataTypeSizes.BYTES_PER_USHORT = 2;
        EDataTypeSizes.BYTES_PER_INT = 4;
        EDataTypeSizes.BYTES_PER_UNSIGNED_INT = 4;
        EDataTypeSizes.BYTES_PER_UINT = 4;
        EDataTypeSizes.BYTES_PER_FLOAT = 4;
    })(akra.EDataTypeSizes || (akra.EDataTypeSizes = {}));
    var EDataTypeSizes = akra.EDataTypeSizes;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
        function getTypeSize(eType) {
        switch(eType) {
            case EDataTypes.BYTE:
            case EDataTypes.UNSIGNED_BYTE:
                return 1;
            case EDataTypes.SHORT:
            case EDataTypes.UNSIGNED_SHORT:
                //case EImageTypes.UNSIGNED_SHORT_4_4_4_4:
                //case EImageTypes.UNSIGNED_SHORT_5_5_5_1:
                //case EImageTypes.UNSIGNED_SHORT_5_6_5:
                return 2;
            case EDataTypes.INT:
            case EDataTypes.UNSIGNED_INT:
            case EDataTypes.FLOAT:
                return 4;
            default:
 {
                    akra.logger.setSourceLocation("common.ts", 425);
                    akra.logger.error('unknown data/image type used');
                }
                ;
        }
    }
    akra.getTypeSize = getTypeSize;
    akra.sid = /** @inline */function () {
        return (++akra.sid._iTotal);
    };
    akra.sid._iTotal = 0;
    /** @inline */function now() {
        return Date.now();
    }
    akra.now = now;
    /** @inline */function memcpy(pDst, iDstOffset, pSrc, iSrcOffset, nLength) {
        var dstU8 = new Uint8Array(pDst, iDstOffset, nLength);
        var srcU8 = new Uint8Array(pSrc, iSrcOffset, nLength);
        dstU8.set(srcU8);
    }
    akra.memcpy = memcpy;
    ;
    //export function
    (window).URL = (window).URL ? (window).URL : (window).webkitURL ? (window).webkitURL : null;
    (window).BlobBuilder = (window).WebKitBlobBuilder || (window).MozBlobBuilder || (window).BlobBuilder;
    (window).requestFileSystem = (window).requestFileSystem || (window).webkitRequestFileSystem;
    (window).requestAnimationFrame = (window).requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame;
    (window).WebSocket = (window).WebSocket || (window).MozWebSocket;
    // (<any>window).storageInfo = (<any>window).storageInfo || (<any>window).webkitPersistentStorage ;
    (window).storageInfo = (window).storageInfo || (window).webkitTemporaryStorage;
    (navigator).gamepads = (navigator).gamepads || (navigator).webkitGamepads;
    (navigator).getGamepads = (navigator).getGamepads || (navigator).webkitGetGamepads;
    Worker.prototype.postMessage = (Worker).prototype.webkitPostMessage || Worker.prototype.postMessage;
})(akra || (akra = {}));
;
function utf8_encode(argString) {
    // Encodes an ISO-8859-1 string to UTF-8
    //
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/utf8_encode
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: sowberry
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +   improved by: Yves Sucaet
    // +   bugfixed by: Onno Marsman
    // +   bugfixed by: Ulrich
    // +   bugfixed by: Rafal Kukawski
    // *     example 1: utf8_encode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'
    if (argString === null || typeof argString === "undefined") {
        return "";
    }
    // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var string = (argString + "");
    var utftext = "", start, end, stringl = 0;
    start = end = 0;
    stringl = string.length;
    for(var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;
        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }
    if (end > start) {
        utftext += string.slice(start, stringl);
    }
    return utftext;
}
function utf8_decode(str_data) {
    // http://kevin.vanzonneveld.net
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Norman "zEh" Fuchs
    // +   bugfixed by: hitwork
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: utf8_decode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'
        var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;
    str_data += "";
    while(i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if (c1 > 191 && c1 < 224) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return tmp_arr.join("");
}
var akra;
(function (akra) {
    (function (libs) {
        /**
        * Encodes an ISO-8859-1 string to UTF-8
        * @treturn String
        */
        String.prototype.toUTF8 = function () {
            return utf8_encode(this);
        };
        /**
        * Converts a UTF-8 encoded string to ISO-8859-1
        * @treturn String
        */
        String.prototype.fromUTF8 = function () {
            return utf8_decode(this);
        };
        String.prototype.replaceAt = function (n, chr) {
            return this.substr(0, n) + chr + this.substr(n + chr.length);
        };
        Object.defineProperty(Array.prototype, 'first', {
            enumerable: false,
            configurable: true,
            get: function () {
                return this[0];
            }
        });
        Object.defineProperty(Array.prototype, 'last', {
            enumerable: false,
            configurable: true,
            get: function () {
                return this[this.length - 1];
            }
        });
        Object.defineProperty(Array.prototype, 'el', {
            enumerable: false,
            configurable: true,
            value: function (i) {
                i = i || 0;
                return this[i < 0 ? this.length + i : i];
            }
        });
        Object.defineProperty(Array.prototype, 'clear', {
            enumerable: false,
            configurable: true,
            value: function () {
                this.length = 0;
            }
        });
        Object.defineProperty(Array.prototype, 'swap', {
            enumerable: false,
            configurable: true,
            value: function (i, j) {
                if (i < this.length && j < this.length) {
                    var t = this[i];
                    this[i] = this[j];
                    this[j] = t;
                }
            }
        });
        Object.defineProperty(Array.prototype, 'insert', {
            enumerable: false,
            configurable: true,
            value: function (pElement) {
                if (typeof pElement.length === 'number') {
                    for(var i = 0, n = pElement.length; i < n; ++i) {
                        this.push(pElement[i]);
                    }
                    ;
                } else {
                    this.push(pElement);
                }
                return this;
            }
        });
        Number.prototype.toHex = function (iLength) {
            var sValue = this.toString(16);
            for(var i = 0; i < iLength - sValue.length; ++i) {
                sValue = '0' + sValue;
            }
            return sValue;
        };
        Number.prototype.printBinary = function (isPretty) {
            if (typeof isPretty === "undefined") { isPretty = true; }
            var res = "";
            for(var i = 0; i < 32; ++i) {
                if (i && (i % 4) == 0 && isPretty) {
                    res = ' ' + res;
                }
                (this >> i & 0x1 ? res = '1' + res : res = '0' + res);
            }
            return res;
        };
    })(akra.libs || (akra.libs = {}));
    var libs = akra.libs;
})(akra || (akra = {}));
var akra;
(function (akra) {
    /**
    * FLAG(x)
    * Сдвиг единицы на @a x позиций влево.
    */
    /**
    * TEST_BIT(value, bit)
    * Проверка того что у @a value бит под номером @a bit равен единице.
    */
    /**
    * TEST_ALL(value, set)
    * Проверка того что у @a value равны единице все биты,
    * которые равны единице у @a set.
    */
    /**
    * TEST_ANY(value, set)
    * Проверка того что у @a value равны единице хотя бы какие то из битов,
    * которые равны единице у @a set.
    */
    /**
    * SET_BIT(value, bit)
    * Выставляет бит под номером @a bit у числа @a value равным единице
    */
    /**
    * CLEAR_BIT(value, bit)
    * Выставляет бит под номером @a bit у числа @a value равным нулю
    */
    /**
    * SET_ALL(value, set)
    * Выставляет все биты у числа @a value равными единице,
    * которые равны единице у числа @a set
    */
    /**
    * CLEAR_ALL(value, set)
    * Выставляет все биты у числа @a value равными нулю,
    * которые равны единице у числа @a set
    */
    //#define SET_ALL(value, set, setting) (setting ? SET_ALL(value, set) : CLEAR_ALL(value, set))
    (function (bf) {
        /**
        * Сдвиг единицы на @a x позиций влево.
        * @inline
        */
        bf.flag = /** @inline */function (x) {
            return (1 << (x));
        };
        /**
        * Проверка того что у @a value бит под номером @a bit равен единице.
        * @inline
        */
        bf.testBit = /** @inline */function (value, bit) {
            return ((value & ((1 << (bit)))) != 0);
        };
        /**
        * Проверка того что у @a value равны единице все биты,
        * которые равны единице у @a set.
        * @inline
        */
        bf.testAll = /** @inline */function (value, set) {
            return (((value) & (set)) == (set));
        };
        /**
        * Проверка того что у @a value равны единице хотя бы какие то из битов,
        * которые равны единице у @a set.
        * @inline
        */
        bf.testAny = /** @inline */function (value, set) {
            return (((value) & (set)) != 0);
        };
        /**
        * Выставляет бит под номером @a bit у числа @a value равным единице
        * @inline
        */
        bf.setBit = /** @inline */function (value, bit, setting) {
            if (typeof setting === "undefined") { setting = true; }
            return (setting ? ((value) |= ((1 << ((bit))))) : (((value) &= ~((1 << ((bit)))))));
        };
        /**
        *
        * @inline
        */
        bf.clearBit = /** @inline */function (value, bit) {
            return ((value) &= ~((1 << ((bit)))));
        };
        /**
        * Выставляет бит под номером @a bit у числа @a value равным нулю
        * @inline
        */
        bf.setAll = /** @inline */function (value, set, setting) {
            if (typeof setting === "undefined") { setting = true; }
            return (setting ? ((value) |= (set)) : ((value) &= ~(set)));
        };
        /**
        * Выставляет все биты у числа @a value равными единице,
        * которые равны единице у числа @a set
        * @inline
        */
        bf.clearAll = /** @inline */function (value, set) {
            return ((value) &= ~(set));
        };
        /**
        * Выставляет все биты у числа @a value равными нулю,
        * которые равны единице у числа @a set
        * @inline
        */
        bf.equal = function (value, src) {
            value = src;
        };
        /**
        * Прирасваивает числу @a value число @a src
        * @inline
        */
        bf.isEqual = /** @inline */function (value, src) {
            return value == src;
        };
        /**
        * Если число @a value равно числу @a src возвращается true
        * @inline
        */
        bf.isNotEqaul = /** @inline */function (value, src) {
            return value != src;
        };
        /**
        * Прирасваивает числу @a value число @a src
        * @inline
        */
        bf.set = function (value, src) {
            value = src;
        };
        /**
        * Обнуляет число @a value
        * @inline
        */
        bf.clear = function (value) {
            value = 0;
        };
        /**
        * Выставляет все биты у числа @a value равными единице,
        * которые равны единице у числа @a src
        * @inline
        */
        bf.setFlags = /** @inline */function (value, src) {
            return (value |= src);
        };
        /**
        * Выставляет все биты у числа @a value равными нулю,
        * которые равны единице у числа @a src
        * @inline
        */
        bf.clearFlags = /** @inline */function (value, src) {
            return value &= ~src;
        };
        /**
        * Проверяет равно ли число @a value нулю. Если равно возвращает true.
        * Если не равно возвращает false.
        * @inline
        */
        bf.isEmpty = /** @inline */function (value) {
            return (value == 0);
        };
        /**
        * Возвращает общее количество бит числа @a value.
        * На самом деле возвращает всегда 32.
        * @inline
        */
        bf.totalBits = /** @inline */function (value) {
            return 32;
        };
        /**
        * Возвращает общее количество ненулевых бит числа @a value.
        * @inline
        */
        bf.totalSet = function (value) {
            var count = 0;
            var total = (32);
            for(var i = total; i; --i) {
                count += (value & 1);
                value >>= 1;
            }
            return (count);
        };
        /**
        * Convert N bit colour channel value to P bits. It fills P bits with the
        * bit pattern repeated. (this is /((1<<n)-1) in fixed point)
        */
        /** @inline */function fixedToFixed(value, n, p) {
            if (n > p) {
                // Less bits required than available; this is easy
                value >>= n - p;
            } else if (n < p) {
                // More bits required than are there, do the fill
                // Use old fashioned division, probably better than a loop
                if (value == 0) {
                    value = 0;
                } else if (value == ((1) << n) - 1) {
                    value = (1 << p) - 1;
                } else {
                    value = value * (1 << p) / ((1 << n) - 1);
                }
            }
            return value;
        }
        bf.fixedToFixed = fixedToFixed;
        /**
        * Convert floating point colour channel value between 0.0 and 1.0 (otherwise clamped)
        * to integer of a certain number of bits. Works for any value of bits between 0 and 31.
        */
        /** @inline */function floatToFixed(value, bits) {
            if (value <= 0.0) {
                return 0;
            } else if (value >= 1.0) {
                return (1 << bits) - 1;
            } else {
                return (value * (1 << bits));
            }
        }
        bf.floatToFixed = floatToFixed;
        /**
        * Fixed point to float
        */
        /** @inline */function fixedToFloat(value, bits) {
            return (value & ((1 << bits) - 1)) / ((1 << bits) - 1);
        }
        bf.fixedToFloat = fixedToFloat;
        /**
        * Write a n*8 bits integer value to memory in native endian.
        */
        /** @inline */function intWrite(pDest, n, value) {
            switch(n) {
                case 1:
                    pDest[0] = value;
                    break;
                case 2:
                    pDest[1] = ((value >> 8) & 0xFF);
                    pDest[0] = (value & 0xFF);
                    break;
                case 3:
                    pDest[2] = ((value >> 16) & 0xFF);
                    pDest[1] = ((value >> 8) & 0xFF);
                    pDest[0] = (value & 0xFF);
                    break;
                case 4:
                    pDest[3] = ((value >> 24) & 0xFF);
                    pDest[2] = ((value >> 16) & 0xFF);
                    pDest[1] = ((value >> 8) & 0xFF);
                    pDest[0] = (value & 0xFF);
                    break;
            }
        }
        bf.intWrite = intWrite;
        /**
        * Read a n*8 bits integer value to memory in native endian.
        */
        /** @inline */function intRead(pSrc, n) {
            switch(n) {
                case 1:
                    return pSrc[0];
                case 2:
                    return pSrc[0] | pSrc[1] << 8;
                case 3:
                    return pSrc[0] | pSrc[1] << 8 | pSrc[2] << 16;
                case 4:
                    return (pSrc[0]) | (pSrc[1] << 8) | (pSrc[2] << 16) | (pSrc[3] << 24);
            }
            return 0;
        }
        bf.intRead = intRead;
                //float32/uint32 union
        var _u32 = new Uint32Array(1);
        var _f32 = new Float32Array(_u32.buffer);
        /** @inline */function floatToHalf(f) {
            _f32[0] = f;
            return floatToHalfI(_u32[0]);
        }
        bf.floatToHalf = floatToHalf;
        /** @inline */function floatToHalfI(i) {
            var s = (i >> 16) & 0x00008000;
            var e = ((i >> 23) & 0x000000ff) - (127 - 15);
            var m = i & 0x007fffff;
            if (e <= 0) {
                if (e < -10) {
                    return 0;
                }
                m = (m | 0x00800000) >> (1 - e);
                return (s | (m >> 13));
            } else if (e == 0xff - (127 - 15)) {
                // Inf
                if (m == 0) {
                    return (s | 0x7c00);
                } else// NAN
                 {
                    m >>= 13;
                    return (s | 0x7c00 | m | (m == 0));
                }
            } else {
                // Overflow
                if (e > 30) {
                    return (s | 0x7c00);
                }
                return (s | (e << 10) | (m >> 13));
            }
        }
        bf.floatToHalfI = floatToHalfI;
        /**
        * Convert a float16 (NV_half_float) to a float32
        * Courtesy of OpenEXR
        */
        /** @inline */function halfToFloat(y) {
            _u32[0] = /*not inlined, because supportes only single statement functions(cur. st. count: 8)*/halfToFloatI(y);
            return _f32[0];
        }
        bf.halfToFloat = halfToFloat;
        /** Converts a half in uint16 format to a float
        in uint32 format
        */
        /** @inline */function halfToFloatI(y) {
            var s = (y >> 15) & 0x00000001;
            var e = (y >> 10) & 0x0000001f;
            var m = y & 0x000003ff;
            if (e == 0) {
                // Plus or minus zero
                if (m == 0) {
                    return s << 31;
                } else// Denormalized number -- renormalize it
                 {
                    while(!(m & 0x00000400)) {
                        m <<= 1;
                        e -= 1;
                    }
                    e += 1;
                    m &= ~0x00000400;
                }
            } else if (e == 31) {
                //Inf
                if (m == 0) {
                    return (s << 31) | 0x7f800000;
                } else//NaN
                 {
                    return (s << 31) | 0x7f800000 | (m << 13);
                }
            }
            e = e + (127 - 15);
            m = m << 13;
            return (s << 31) | (e << 23) | m;
        }
        bf.halfToFloatI = halfToFloatI;
    })(akra.bf || (akra.bf = {}));
    var bf = akra.bf;
})(akra || (akra = {}));
var akra;
(function (akra) {
    // #include "Singleton.ts"
    (function (util) {
        /* extends Singleton*/
        var Logger = (function () {
            function Logger() {
                //super();
                this._eUnknownCode = 0;
                this._sUnknownMessage = "Unknown code";
                this._eLogLevel = akra.ELogLevel.ALL;
                this._pGeneralRoutineMap = {};
                this._pCurrentSourceLocation = {
                    file: "",
                    line: 0
                };
                this._pLastLogEntity = {
                    code: this._eUnknownCode,
                    location: this._pCurrentSourceLocation,
                    message: this._sUnknownMessage,
                    info: null
                };
                this._pCodeFamilyMap = {};
                this._pCodeFamilyList = [];
                this._pCodeInfoMap = {};
                this._pCodeFamilyRoutineDMap = {};
                this._nFamilyGenerator = 0;
            }
            Logger._sDefaultFamilyName = "CodeFamily";
            Logger.prototype.init = function () {
                //TODO: Load file
                return true;
            };
            Logger.prototype.setLogLevel = function (eLevel) {
                this._eLogLevel = eLevel;
            };
            Logger.prototype.getLogLevel = function () {
                return this._eLogLevel;
            };
            Logger.prototype.registerCode = function (eCode, sMessage) {
                if (typeof sMessage === "undefined") { sMessage = this._sUnknownMessage; }
                if (((((this)._pCodeInfoMap[(eCode)]) !== undefined))) {
                    return false;
                }
                var sFamilyName = this.getFamilyName(eCode);
                if (((sFamilyName) === null)) {
                    return false;
                }
                var pCodeInfo = {
                    code: eCode,
                    message: sMessage,
                    familyName: sFamilyName
                };
                this._pCodeInfoMap[eCode] = pCodeInfo;
                return true;
            };
            Logger.prototype.setUnknownCode = function (eCode, sMessage) {
                this._eUnknownCode = eCode;
                this._sUnknownMessage = sMessage;
            };
            Logger.prototype.registerCodeFamily = function (eCodeMin, eCodeMax, sFamilyName) {
                if (!((sFamilyName) !== undefined)) {
                    sFamilyName = this.generateFamilyName();
                }
                if (((((this)._pCodeFamilyMap[(sFamilyName)]) !== undefined))) {
                    return false;
                }
                if (!this.isValidCodeInterval(eCodeMin, eCodeMax)) {
                    return false;
                }
                var pCodeFamily = {
                    familyName: sFamilyName,
                    codeMin: eCodeMin,
                    codeMax: eCodeMax
                };
                this._pCodeFamilyMap[sFamilyName] = pCodeFamily;
                this._pCodeFamilyList.push(pCodeFamily);
                return true;
            };
            Logger.prototype.getFamilyName = function (eCode) {
                var i = 0;
                var pCodeFamilyList = this._pCodeFamilyList;
                var pCodeFamily;
                for(i = 0; i < pCodeFamilyList.length; i++) {
                    pCodeFamily = pCodeFamilyList[i];
                    if (pCodeFamily.codeMin <= eCode && pCodeFamily.codeMax >= eCode) {
                        return pCodeFamily.familyName;
                    }
                }
                return null;
            };
            Logger.prototype.setCodeFamilyRoutine = function () {
                var sFamilyName = null;
                var fnLogRoutine = null;
                var eLevel = akra.ELogLevel.LOG;
                if ((typeof (arguments[0]) === "number")) {
                    sFamilyName = this.getFamilyName(arguments[0]);
                    fnLogRoutine = arguments[1];
                    eLevel = arguments[2];
                    if (((sFamilyName) === null)) {
                        return false;
                    }
                } else if ((typeof (arguments[0]) === "string")) {
                    sFamilyName = arguments[0];
                    fnLogRoutine = arguments[1];
                    eLevel = arguments[2];
                }
                if (!((((this)._pCodeFamilyMap[(sFamilyName)]) !== undefined))) {
                    return false;
                }
                var pCodeFamilyRoutineMap = this._pCodeFamilyRoutineDMap[sFamilyName];
                if (!((pCodeFamilyRoutineMap) !== undefined)) {
                    pCodeFamilyRoutineMap = this._pCodeFamilyRoutineDMap[sFamilyName] = {};
                }
                if (((((eLevel) & (/*checked (origin: akra)>>*/akra.ELogLevel.LOG)) == (/*checked (origin: akra)>>*/akra.ELogLevel.LOG)))) {
                    pCodeFamilyRoutineMap[akra.ELogLevel.LOG] = fnLogRoutine;
                }
                if (((((eLevel) & (/*checked (origin: akra)>>*/akra.ELogLevel.INFORMATION)) == (/*checked (origin: akra)>>*/akra.ELogLevel.INFORMATION)))) {
                    pCodeFamilyRoutineMap[akra.ELogLevel.INFORMATION] = fnLogRoutine;
                }
                if (((((eLevel) & (/*checked (origin: akra)>>*/akra.ELogLevel.WARNING)) == (/*checked (origin: akra)>>*/akra.ELogLevel.WARNING)))) {
                    pCodeFamilyRoutineMap[akra.ELogLevel.WARNING] = fnLogRoutine;
                }
                if (((((eLevel) & (/*checked (origin: akra)>>*/akra.ELogLevel.ERROR)) == (/*checked (origin: akra)>>*/akra.ELogLevel.ERROR)))) {
                    pCodeFamilyRoutineMap[akra.ELogLevel.ERROR] = fnLogRoutine;
                }
                if (((((eLevel) & (/*checked (origin: akra)>>*/akra.ELogLevel.CRITICAL)) == (/*checked (origin: akra)>>*/akra.ELogLevel.CRITICAL)))) {
                    pCodeFamilyRoutineMap[akra.ELogLevel.CRITICAL] = fnLogRoutine;
                }
                return true;
            };
            Logger.prototype.setLogRoutine = function (fnLogRoutine, eLevel) {
                if (((((eLevel) & (/*checked (origin: akra)>>*/akra.ELogLevel.LOG)) == (/*checked (origin: akra)>>*/akra.ELogLevel.LOG)))) {
                    this._pGeneralRoutineMap[akra.ELogLevel.LOG] = fnLogRoutine;
                }
                if (((((eLevel) & (/*checked (origin: akra)>>*/akra.ELogLevel.INFORMATION)) == (/*checked (origin: akra)>>*/akra.ELogLevel.INFORMATION)))) {
                    this._pGeneralRoutineMap[akra.ELogLevel.INFORMATION] = fnLogRoutine;
                }
                if (((((eLevel) & (/*checked (origin: akra)>>*/akra.ELogLevel.WARNING)) == (/*checked (origin: akra)>>*/akra.ELogLevel.WARNING)))) {
                    this._pGeneralRoutineMap[akra.ELogLevel.WARNING] = fnLogRoutine;
                }
                if (((((eLevel) & (/*checked (origin: akra)>>*/akra.ELogLevel.ERROR)) == (/*checked (origin: akra)>>*/akra.ELogLevel.ERROR)))) {
                    this._pGeneralRoutineMap[akra.ELogLevel.ERROR] = fnLogRoutine;
                }
                if (((((eLevel) & (/*checked (origin: akra)>>*/akra.ELogLevel.CRITICAL)) == (/*checked (origin: akra)>>*/akra.ELogLevel.CRITICAL)))) {
                    this._pGeneralRoutineMap[akra.ELogLevel.CRITICAL] = fnLogRoutine;
                }
            };
            Logger.prototype.setSourceLocation = function () {
                var sFile;
                var iLine;
                if (arguments.length === 2) {
                    sFile = arguments[0];
                    iLine = arguments[1];
                } else {
                    if (((arguments[0]) !== undefined) && !(((arguments[0]) === null))) {
                        sFile = arguments[0].file;
                        iLine = arguments[0].line;
                    } else {
                        sFile = "";
                        iLine = 0;
                    }
                }
                this._pCurrentSourceLocation.file = sFile;
                this._pCurrentSourceLocation.line = iLine;
            };
            Logger.prototype.log = function () {
                var pArgs = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    pArgs[_i] = arguments[_i + 0];
                }
                if (!((((this._eLogLevel) & (/*checked (origin: akra)>>*/akra.ELogLevel.LOG)) == (/*checked (origin: akra)>>*/akra.ELogLevel.LOG)))) {
                    return;
                }
                var fnLogRoutine = this._pGeneralRoutineMap[akra.ELogLevel.LOG];
                if (!((fnLogRoutine) !== undefined)) {
                    return;
                }
                var pLogEntity = this._pLastLogEntity;
                pLogEntity.code = this._eUnknownCode;
                pLogEntity.location = this._pCurrentSourceLocation;
                pLogEntity.info = pArgs;
                pLogEntity.message = this._sUnknownMessage;
                fnLogRoutine.call(null, pLogEntity);
            };
            Logger.prototype.info = function () {
                if (!((((this._eLogLevel) & (/*checked (origin: akra)>>*/akra.ELogLevel.INFORMATION)) == (/*checked (origin: akra)>>*/akra.ELogLevel.INFORMATION)))) {
                    return;
                }
                var pLogEntity;
                var fnLogRoutine;
                pLogEntity = this.prepareLogEntity.apply(this, arguments);
                fnLogRoutine = this.getCodeRoutineFunc(pLogEntity.code, akra.ELogLevel.INFORMATION);
                if (((fnLogRoutine) === null)) {
                    return;
                }
                fnLogRoutine.call(null, pLogEntity);
            };
            Logger.prototype.warning = function () {
                if (!((((this._eLogLevel) & (/*checked (origin: akra)>>*/akra.ELogLevel.WARNING)) == (/*checked (origin: akra)>>*/akra.ELogLevel.WARNING)))) {
                    return;
                }
                var pLogEntity;
                var fnLogRoutine;
                pLogEntity = this.prepareLogEntity.apply(this, arguments);
                fnLogRoutine = this.getCodeRoutineFunc(pLogEntity.code, akra.ELogLevel.WARNING);
                if (((fnLogRoutine) === null)) {
                    return;
                }
                fnLogRoutine.call(null, pLogEntity);
            };
            Logger.prototype.error = function () {
                if (!((((this._eLogLevel) & (/*checked (origin: akra)>>*/akra.ELogLevel.ERROR)) == (/*checked (origin: akra)>>*/akra.ELogLevel.ERROR)))) {
                    return;
                }
                var pLogEntity;
                var fnLogRoutine;
                pLogEntity = this.prepareLogEntity.apply(this, arguments);
                fnLogRoutine = this.getCodeRoutineFunc(pLogEntity.code, akra.ELogLevel.ERROR);
                if (((fnLogRoutine) === null)) {
                    return;
                }
                fnLogRoutine.call(null, pLogEntity);
            };
            Logger.prototype.criticalError = function () {
                var pLogEntity;
                var fnLogRoutine;
                pLogEntity = this.prepareLogEntity.apply(this, arguments);
                fnLogRoutine = this.getCodeRoutineFunc(pLogEntity.code, akra.ELogLevel.CRITICAL);
                var sSystemMessage = "A Critical error has occured! Code: " + pLogEntity.code.toString();
                if (((((this._eLogLevel) & (/*checked (origin: akra)>>*/akra.ELogLevel.CRITICAL)) == (/*checked (origin: akra)>>*/akra.ELogLevel.CRITICAL))) && !((fnLogRoutine) === null)) {
                    fnLogRoutine.call(null, pLogEntity);
                }
                alert(sSystemMessage);
                throw new Error(sSystemMessage);
            };
            Logger.prototype.assert = function () {
                var bCondition = arguments[0];
                if (!bCondition) {
                    var pLogEntity;
                    var fnLogRoutine;
                    var pArgs = [];
                    for(var i = 1; i < arguments.length; i++) {
                        pArgs[i - 1] = arguments[i];
                    }
                    pLogEntity = this.prepareLogEntity.apply(this, pArgs);
                    fnLogRoutine = this.getCodeRoutineFunc(pLogEntity.code, akra.ELogLevel.CRITICAL);
                    var sSystemMessage = "A error has occured! Code: " + pLogEntity.code.toString() + "\n Accept to exit, refuse to continue.";
                    if (((((this._eLogLevel) & (/*checked (origin: akra)>>*/akra.ELogLevel.CRITICAL)) == (/*checked (origin: akra)>>*/akra.ELogLevel.CRITICAL))) && !((fnLogRoutine) === null)) {
                        fnLogRoutine.call(null, pLogEntity);
                    }
                    if (confirm(sSystemMessage)) {
                        throw new Error(sSystemMessage);
                    }
                }
            };
            Logger.prototype.generateFamilyName = function () {
                var sSuffix = (this._nFamilyGenerator++);
                var sName = Logger._sDefaultFamilyName + sSuffix;
                if (((((this)._pCodeFamilyMap[(sName)]) !== undefined))) {
                    return this.generateFamilyName();
                } else {
                    return sName;
                }
            };
            Logger.prototype.isValidCodeInterval = function (eCodeMin, eCodeMax) {
                if (eCodeMin > eCodeMax) {
                    return false;
                }
                var i = 0;
                var pCodeFamilyList = this._pCodeFamilyList;
                var pCodeFamily;
                for(i = 0; i < pCodeFamilyList.length; i++) {
                    pCodeFamily = pCodeFamilyList[i];
                    if ((pCodeFamily.codeMin <= eCodeMin && pCodeFamily.codeMax >= eCodeMin) || (pCodeFamily.codeMin <= eCodeMax && pCodeFamily.codeMax >= eCodeMax)) {
                        return false;
                    }
                }
                return true;
            };
            Logger.prototype.isUsedFamilyName = /** @inline */function (sFamilyName) {
                return ((this._pCodeFamilyMap[sFamilyName]) !== undefined);
            };
            Logger.prototype.isUsedCode = /** @inline */function (eCode) {
                return ((this._pCodeInfoMap[eCode]) !== undefined);
            };
            Logger.prototype.isLogEntity = function (pObj) {
                if (akra.isObject(pObj) && ((pObj.code) !== undefined) && ((pObj.location) !== undefined)) {
                    return true;
                }
                return false;
            };
            Logger.prototype.isLogCode = /** @inline */function (eCode) {
                return (typeof (eCode) === "number");
            };
            Logger.prototype.prepareLogEntity = function () {
                var eCode = this._eUnknownCode;
                var sMessage = this._sUnknownMessage;
                var pInfo = null;
                if (arguments.length === 1 && this.isLogEntity(arguments[0])) {
                    var pEntity = arguments[0];
                    eCode = pEntity.code;
                    pInfo = pEntity.info;
                    this.setSourceLocation(pEntity.location);
                    if (!((pEntity.message) !== undefined)) {
                        var pCodeInfo = this._pCodeInfoMap[eCode];
                        if (((pCodeInfo) !== undefined)) {
                            sMessage = pCodeInfo.message;
                        }
                    }
                } else {
                    if (((typeof ((arguments[0])) === "number"))) {
                        eCode = arguments[0];
                        if (arguments.length > 1) {
                            pInfo = new Array(arguments.length - 1);
                            var i = 0;
                            for(i = 0; i < pInfo.length; i++) {
                                pInfo[i] = arguments[i + 1];
                            }
                        }
                    } else {
                        eCode = this._eUnknownCode;
                        // if(arguments.length > 0){
                        pInfo = new Array(arguments.length);
                        var i = 0;
                        for(i = 0; i < pInfo.length; i++) {
                            pInfo[i] = arguments[i];
                        }
                        // }
                        // else {
                        //     pInfo = null;
                        // }
                                            }
                    var pCodeInfo = this._pCodeInfoMap[eCode];
                    if (((pCodeInfo) !== undefined)) {
                        sMessage = pCodeInfo.message;
                    }
                }
                var pLogEntity = this._pLastLogEntity;
                pLogEntity.code = eCode;
                pLogEntity.location = this._pCurrentSourceLocation;
                pLogEntity.message = sMessage;
                pLogEntity.info = pInfo;
                return pLogEntity;
            };
            Logger.prototype.getCodeRoutineFunc = function (eCode, eLevel) {
                var pCodeInfo = this._pCodeInfoMap[eCode];
                var fnLogRoutine;
                if (!((pCodeInfo) !== undefined)) {
                    fnLogRoutine = this._pGeneralRoutineMap[eLevel];
                    return ((fnLogRoutine) !== undefined) ? fnLogRoutine : null;
                }
                var pCodeFamilyRoutineMap = this._pCodeFamilyRoutineDMap[pCodeInfo.familyName];
                if (!((pCodeFamilyRoutineMap) !== undefined) || !((pCodeFamilyRoutineMap[eLevel]) !== undefined)) {
                    fnLogRoutine = this._pGeneralRoutineMap[eLevel];
                    return ((fnLogRoutine) !== undefined) ? fnLogRoutine : null;
                }
                fnLogRoutine = pCodeFamilyRoutineMap[eLevel];
                return fnLogRoutine;
            };
            return Logger;
        })();
        util.Logger = Logger;        
    })(akra.util || (akra.util = {}));
    var util = akra.util;
})(akra || (akra = {}));
var akra;
(function (akra) {
    (function (util) {
        util.logger = new util.Logger();
        util.logger.init();
        util.logger.setUnknownCode(0, "Unknown code.");
        util.logger.setLogLevel(akra.ELogLevel.ALL);
        //Default code families
        util.logger.registerCodeFamily(0, 100, "SystemCodes");
        util.logger.registerCodeFamily(2000, 2199, "ParserSyntaxErrors");
        util.logger.registerCodeFamily(2200, 2500, "EffectSyntaxErrors");
        //Default log routines
        function sourceLocationToString(pLocation) {
            var pDate = new Date();
            var sTime = pDate.getHours() + ":" + pDate.getMinutes() + "." + pDate.getSeconds();
            var sLocation = "[" + pLocation.file + ":" + pLocation.line.toString() + " " + sTime + "]: ";
            return sLocation;
        }
        function logRoutine(pLogEntity) {
            var pArgs = pLogEntity.info;
            pArgs.unshift(sourceLocationToString(pLogEntity.location));
            console["log"].apply(console, pArgs);
        }
        function warningRoutine(pLogEntity) {
            var pArgs = pLogEntity.info;
            pArgs.unshift("Code: " + pLogEntity.code.toString());
            pArgs.unshift(sourceLocationToString(pLogEntity.location));
            console["warn"].apply(console, pArgs);
        }
        function errorRoutine(pLogEntity) {
            var pArgs = pLogEntity.info;
            pArgs.unshift(pLogEntity.message);
            pArgs.unshift("Error code: " + pLogEntity.code.toString() + ".");
            pArgs.unshift(sourceLocationToString(pLogEntity.location));
            console["error"].apply(console, pArgs);
        }
        util.logger.setLogRoutine(logRoutine, akra.ELogLevel.LOG | akra.ELogLevel.INFORMATION);
        util.logger.setLogRoutine(warningRoutine, akra.ELogLevel.WARNING);
        util.logger.setLogRoutine(errorRoutine, akra.ELogLevel.ERROR | akra.ELogLevel.CRITICAL);
    })(akra.util || (akra.util = {}));
    var util = akra.util;
})(akra || (akra = {}));
var akra;
(function (akra) {
    akra.logger = akra.util.logger;
})(akra || (akra = {}));
var akra;
(function (akra) {
    (function (util) {
        window.prompt = function (message, defaul) {
            console.warn("prompt > " + message);
            return null;
        };
        /*window.alert = function(message?: string): void {
        console.warn("alert > " + message);
        }*/
        window.confirm = function (message) {
            console.warn("confirm > " + message);
            return false;
        };
        var pTestCondList = [];
        var pTestList = [];
        var isPassed;
        var pTest = null;
        var iBegin;
        function addCond(pCond) {
            pTestCondList.unshift(pCond);
        }
        var TestCond = (function () {
            function TestCond(sDescription) {
                this.sDescription = sDescription;
            }
            TestCond.prototype.toString = function () {
                return this.sDescription;
            };
            TestCond.prototype.verify = function (pArgv) {
                return false;
            };
            Object.defineProperty(TestCond.prototype, "description", {
                get: function () {
                    return this.sDescription;
                },
                enumerable: true,
                configurable: true
            });
            return TestCond;
        })();        
        var ArrayCond = (function (_super) {
            __extends(ArrayCond, _super);
            function ArrayCond(sDescription, pArr) {
                        _super.call(this, sDescription);
                this._pArr = pArr;
            }
            ArrayCond.prototype.verify = function (pArgv) {
                var pArr = pArgv[0];
                if (pArr.length != this._pArr.length) {
                    return false;
                }
                for(var i = 0; i < pArr.length; ++i) {
                    if (pArr[i] != this._pArr[i]) {
                        return false;
                    }
                }
                ;
                return true;
            };
            return ArrayCond;
        })(TestCond);        
        var ValueCond = (function (_super) {
            __extends(ValueCond, _super);
            function ValueCond(sDescription, pValue, isNegate) {
                if (typeof isNegate === "undefined") { isNegate = false; }
                        _super.call(this, sDescription);
                this._pValue = pValue;
                this._isNegate = isNegate;
            }
            ValueCond.prototype.verify = function (pArgv) {
                var bResult = pArgv[0] === this._pValue;
                // console.warn(">", pArgv[0], "!==", this._pValue);
                return this._isNegate ? !bResult : bResult;
            };
            return ValueCond;
        })(TestCond);        
        // function output(sText: string): void {
        // 	document.body.innerHTML += sText;
        // }
        function output(sText) {
            var pElement = document.createElement("div");
            pElement.innerHTML = sText;
            document.body.appendChild(pElement);
        }
        function check() {
            var pArgv = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                pArgv[_i] = arguments[_i + 0];
            }
            var pTest = pTestCondList.pop();
            var bResult;
            if (!pTest) {
                console.log(((new Error())).stack);
                console.warn("chech() without condition...");
                return;
            }
            bResult = pTest.verify(pArgv);
            isPassed = isPassed && bResult;
            if (bResult) {
                output("<pre style=\"margin: 0; margin-left: 20px;\"><span style=\"color: green;\"><b>[ PASSED ]</b></span> " + pTest.toString() + "</pre>");
            } else {
                output("<pre style=\"margin: 0; margin-left: 20px;\"><span style=\"color: red;\"><b>[ FAILED ]</b></span> " + pTest.toString() + "</pre>");
            }
        }
        util.check = check;
        function failed(e) {
            if (((e) !== undefined)) {
                printError(e.message, (e).stack);
            }
            var iTotal = pTestCondList.length;
            for(var i = 0; i < iTotal; ++i) {
                check(false);
            }
            isPassed = false;
            pTest = null;
            printResults();
            run();
        }
        util.failed = failed;
        function shouldBeTrue(sDescription) {
            addCond(new ValueCond(sDescription, true));
        }
        util.shouldBeTrue = shouldBeTrue;
        function shouldBeFalse(sDescription) {
            addCond(new ValueCond(sDescription, false));
        }
        util.shouldBeFalse = shouldBeFalse;
        function shouldBeArray(sDescription, pArr) {
            addCond(new ArrayCond(sDescription, pArr));
        }
        util.shouldBeArray = shouldBeArray;
        function shouldBe(sDescription, pValue) {
            addCond(new ValueCond(sDescription, pValue));
        }
        util.shouldBe = shouldBe;
        function shouldBeNotNull(sDescription) {
            addCond(new ValueCond(sDescription, null, true));
        }
        util.shouldBeNotNull = shouldBeNotNull;
                        function test(manifest, fnWrapper, isAsync) {
            if (typeof isAsync === "undefined") { isAsync = false; }
            var pManifest;
            if ((typeof (manifest) === "string")) {
                pManifest = {
                    name: arguments[0],
                    description: null,
                    entry: fnWrapper
                };
            } else {
                pManifest = arguments[0];
                pManifest.entry = fnWrapper;
            }
            pManifest.async = isAsync;
            pTestList.unshift(pManifest);
        }
        util.test = test;
        function printInfo() {
            output("<h4 style=\"font-family: monospace;\">" + pTest.name || "" + "</h4>");
        }
        function printResults() {
            output("<pre style=\"margin-left: 20px;\">" + "<hr align=\"left\" style=\"border: 0; background-color: gray; height: 1px; width: 500px;\"/><span style=\"color: gray;\">total time: " + ((Date.now()) - iBegin) + " msec" + "</span>" + "<br /><b>" + (isPassed ? "<span style=\"color: green\">TEST PASSED</span>" : "<span style=\"color: red\">TEST FAILED</span>") + "</b>" + "</pre>");
        }
        function printError(message, stack) {
            message = "<b>" + message + "</b>";
            if (((stack) !== undefined)) {
                message += "\n" + stack;
            }
            output("<pre style=\"margin-left: 20px;\">" + "<span style=\"color: red; background-color: rgba(255, 0, 0, .1);\">" + message + "</span>" + "</pre>");
        }
        function asyncTest(manifest, fnWrapper) {
            test(manifest, fnWrapper, true);
        }
        util.asyncTest = asyncTest;
        function run() {
            //если вдруг остались тесты.
            if (pTestCondList.length) {
                failed();
            }
            //если предыдущий тест был асинхронным, значит он кончился и надо распечатать результаты
            if (!((pTest) === null) && pTest.async == true) {
                printResults();
            }
            while(pTestList.length) {
                //начинаем новый тест
                pTest = pTestList.pop();
                iBegin = (Date.now());
                isPassed = true;
                printInfo();
                //start test
                try  {
                    pTest.entry();
                } catch (e) {
                    failed(e);
                    return;
                }
                if (!pTest.async) {
                    printResults();
                    pTest = null;
                } else {
                    return;
                }
            }
            ;
        }
        util.run = run;
        window.onload = function () {
            run();
        };
    })(akra.util || (akra.util = {}));
    var util = akra.util;
})(akra || (akra = {}));
var test = akra.util.test;
var asyncTest = akra.util.asyncTest;
var failed = akra.util.failed;
var run = akra.util.run;
var shouldBe = akra.util.shouldBe;
var shouldBeArray = akra.util.shouldBeArray;
var shouldBeTrue = akra.util.shouldBeTrue;
var shouldBeFalse = akra.util.shouldBeFalse;
var shouldBeNotNull = akra.util.shouldBeNotNull;
var check = akra.util.check;
var ok = check;
var akra;
(function (akra) {
    /**
    * Usage:
    * var br = new Binreader(data); type of data is ArrayBuffer
    * var string = bw.string();
    * var array = bw.stringArray()
    * var value = bw.uint8()
    * var value = bw.uint16()
    * var value = bw.uint32()
    * var array = bw.uint8Array()
    * var array = bw.uint16Array()
    * var array = bw.uint32Array()
    * var value = bw.int8()
    * var value = bw.int16()
    * var value = bw.int32()
    * var array = bw.int8Array()
    * var array = bw.int16Array()
    * var array = bw.int32Array()
    * var value = bw.float64()
    * var value = bw.float32()
    * var array = bw.float32Array()
    * var array = bw.float64Array()
    */
    /**
    * Работает заебись, докуменитировать лень.
    */
    (function (io) {
        var BinReader = (function () {
            function BinReader(pBuffer, iByteOffset, iByteLength) {
                if (!((iByteOffset) !== undefined)) {
                    iByteOffset = 0;
                }
                if (!((iByteLength) !== undefined)) {
                    iByteLength = pBuffer.byteLength;
                }
                this._pDataView = new DataView(((pBuffer) instanceof ArrayBuffer) ? (pBuffer) : (pBuffer).data(), iByteOffset, iByteLength);
                this._iPosition = 0;
            }
            BinReader.prototype.string = function (sDefault) {
                if (typeof sDefault === "undefined") { sDefault = null; }
                var iStringLength = this.uint32();
                var iBitesToAdd;
                if (iStringLength == akra.MAX_INT32) {
                    return sDefault;
                }
                iBitesToAdd = (4 - (iStringLength % 4) == 4) ? 0 : (4 - (iStringLength % 4));
                iStringLength += iBitesToAdd;
                //Проверка на возможный выход за пределы массива.
                 {
                    akra.logger.setSourceLocation("io/BinReader.ts", 66);
                    akra.logger.assert(this._iPosition + iStringLength - 1 < this._pDataView.byteLength, "Выход за пределы массива");
                }
                ;
                var pBuffer = new Uint8Array(iStringLength);
                for(var i = 0; i < iStringLength; i++) {
                    pBuffer[i] = this._pDataView.getUint8(this._iPosition + i);
                }
                this._iPosition += iStringLength;
                var sString = "", charCode, code;
                for(var n = 0; n < pBuffer.length; ++n) {
                    code = pBuffer[n];
                    if (code == 0) {
                        break;
                    }
                    charCode = String.fromCharCode(code);
                    sString = sString + charCode;
                }
                sString = sString.fromUTF8();
                /*sString.substr(0, iStringLength);//sString;//*/
                return sString;
            };
            BinReader.prototype.uint32 = function () {
                var i = this._pDataView.getUint32(this._iPosition, true);
                this._iPosition += 4;
                // LOG("uint32:", i);
                return i;
            };
            BinReader.prototype.uint16 = function () {
                var i = this._pDataView.getUint16(this._iPosition, true);
                this._iPosition += 4;
                return i;
            };
            BinReader.prototype.uint8 = function () {
                var i = this._pDataView.getUint8(this._iPosition);
                this._iPosition += 4;
                return i;
            };
            BinReader.prototype.bool = /** @inline */function () {
                return this.uint8() > 0;
            };
            BinReader.prototype.int32 = function () {
                var i = this._pDataView.getInt32(this._iPosition, true);
                this._iPosition += 4;
                return i;
            };
            BinReader.prototype.int16 = function () {
                var i = this._pDataView.getInt16(this._iPosition, true);
                this._iPosition += 4;
                return i;
            };
            BinReader.prototype.int8 = function () {
                var i = this._pDataView.getInt8(this._iPosition);
                this._iPosition += 4;
                return i;
            };
            BinReader.prototype.float64 = function () {
                var f = this._pDataView.getFloat64(this._iPosition, true);
                this._iPosition += 8;
                return f;
            };
            BinReader.prototype.float32 = function () {
                var f = this._pDataView.getFloat32(this._iPosition, true);
                this._iPosition += 4;
                // LOG("float32:", f);
                return f;
            };
            BinReader.prototype.stringArray = function () {
                var iLength = this.uint32();
                if (iLength == akra.MAX_INT32) {
                    return null;
                }
                var pArray = new Array(iLength);
                for(var i = 0; i < iLength; i++) {
                    pArray[i] = this.string();
                }
                return pArray;
            };
            BinReader.prototype.uint32Array = /** @inline */function () {
                return this.uintXArray(32);
            };
            BinReader.prototype.uint16Array = /** @inline */function () {
                return this.uintXArray(16);
            };
            BinReader.prototype.uint8Array = /** @inline */function () {
                return this.uintXArray(8);
            };
            BinReader.prototype.int32Array = /** @inline */function () {
                return this.intXArray(32);
            };
            BinReader.prototype.int16Array = /** @inline */function () {
                return this.intXArray(16);
            };
            BinReader.prototype.int8Array = /** @inline */function () {
                return this.intXArray(8);
            };
            BinReader.prototype.float64Array = /** @inline */function () {
                return this.floatXArray(64);
            };
            BinReader.prototype.float32Array = /** @inline */function () {
                return this.floatXArray(32);
            };
            BinReader.prototype.uintXArray = function (iX) {
                var iLength = this.uint32();
                if (iLength == akra.MAX_INT32) {
                    return null;
                }
                var iBytes = iX / 8;
                var pArray;
                switch(iBytes) {
                    case 1:
                        pArray = new Uint8Array(iLength);
                        for(var i = 0; i < iLength; i++) {
                            pArray[i] = this._pDataView.getUint8(this._iPosition + i * iBytes);
                        }
                        break;
                    case 2:
                        pArray = new Uint16Array(iLength);
                        for(var i = 0; i < iLength; i++) {
                            pArray[i] = this._pDataView.getUint16(this._iPosition + i * iBytes, true);
                        }
                        break;
                    case 4:
                        pArray = new Uint32Array(iLength);
                        for(var i = 0; i < iLength; i++) {
                            pArray[i] = this._pDataView.getUint32(this._iPosition + i * iBytes, true);
                        }
                        break;
                    default:
 {
                            akra.logger.setSourceLocation("io/BinReader.ts", 233);
                            akra.logger.error("unsupported array length detected: " + iBytes);
                        }
                        ;
                }
                var iByteLength = iBytes * iLength;
                iByteLength += -iByteLength & 3;
                this._iPosition += iByteLength;
                return pArray;
            };
            BinReader.prototype.intXArray = function (iX) {
                var iLength = this.uint32();
                if (iLength == akra.MAX_INT32) {
                    return null;
                }
                var iBytes = iX / 8;
                var pArray;
                switch(iBytes) {
                    case 1:
                        pArray = new Int8Array(iLength);
                        for(var i = 0; i < iLength; i++) {
                            pArray[i] = this._pDataView.getInt8(this._iPosition + i * iBytes);
                        }
                        break;
                    case 2:
                        pArray = new Int16Array(iLength);
                        for(var i = 0; i < iLength; i++) {
                            pArray[i] = this._pDataView.getInt16(this._iPosition + i * iBytes, true);
                        }
                        break;
                    case 4:
                        pArray = new Int32Array(iLength);
                        for(var i = 0; i < iLength; i++) {
                            pArray[i] = this._pDataView.getInt32(this._iPosition + i * iBytes, true);
                        }
                        break;
                    default:
 {
                            akra.logger.setSourceLocation("io/BinReader.ts", 280);
                            akra.logger.error("unsupported array length detected: " + iBytes);
                        }
                        ;
                }
                var iByteLength = iBytes * iLength;
                iByteLength += -iByteLength & 3;
                this._iPosition += iByteLength;
                return pArray;
            };
            BinReader.prototype.floatXArray = function (iX) {
                var iLength = this.uint32();
                if (iLength == akra.MAX_INT32) {
                    return null;
                }
                var iBytes = iX / 8;
                var pArray;
                switch(iBytes) {
                    case 4:
                        pArray = new Float32Array(iLength);
                        for(var i = 0; i < iLength; i++) {
                            pArray[i] = this._pDataView.getFloat32(this._iPosition + i * iBytes, true);
                        }
                        break;
                    case 8:
                        pArray = new Float64Array(iLength);
                        for(var i = 0; i < iLength; i++) {
                            pArray[i] = this._pDataView.getFloat64(this._iPosition + i * iBytes, true);
                        }
                        break;
                    default:
 {
                            akra.logger.setSourceLocation("io/BinReader.ts", 319);
                            akra.logger.error("unsupported array length detected: " + iBytes);
                        }
                        ;
                }
                var iByteLength = iBytes * iLength;
                iByteLength += -iByteLength & 3;
                this._iPosition += iByteLength;
                return pArray;
            };
            return BinReader;
        })();
        io.BinReader = BinReader;        
    })(akra.io || (akra.io = {}));
    var io = akra.io;
})(akra || (akra = {}));
var akra;
(function (akra) {
    /**
    * Как исполльзовать:
    * var bw = new BinWriter();      //создаем экземпляр класса
    *                        STRING
    * bw.string("abc");              //запигшет строку
    * bw.stringArray(["abc", "abc"]) //запишет массив строк
    *                        UINT
    * bw.uint8(1)             //варовняет до 4 байт uint и запишет
    * bw.uint16(1)            //варовняет до 4 байт uint и запишет
    * bw.uint32(1)            //запишет uint32
    * bw.uint8Array([1, 2])   //запишет массив uint8 где каждое число будет занимать
    *                         //1 байт и выровняет общую длинну массива до 4
    * bw.uint16Array([1, 2])  //запишет массив uint16 где каждое число будет занимать
    *                         //2 байта и выровняет общую длинну массива до 4
    * bw.uint32Array([1, 2])  //запишет массив uint32 где каждое число будет занимать
    *                         //4 байта
    *                        INT
    * bw.int8(1)              //варовняет до 4 байт int и запишет
    * bw.int16(1)             //варовняет до 4 байт int и запишет
    * bw.int32(1)             //запишет int32
    * bw.int8Array([1, 2])    //запишет массив int8 где каждое число будет занимать
    *                         //1 байт и выровняет общую длинну массива до 4
    * bw.int16Array([1, 2])   //запишет массив int16 где каждое число будет занимать
    *                         //2 байта и выровняет общую длинну массива до 4
    * bw.int32Array([1, 2])   //запишет массив int32 где каждое число будет занимать
    *                         //4 байта
    *                         FLOAT
    * bw.float64(1.1)             //запишет float64
    * bw.float32(1.1)             //запишет float32
    * bw.float32Array([1.2, 2.3]) //запишет массив float32
    * bw.float64Array([1.2, 2.3]) //запишет массив float64
    *
    * bw.data()             //возвратит массив типа ArrayBuffer где бедет лежать все записанные данные
    * bw.dataAsString()     //соберет все данные в строку и вернет
    * bw.dataAsUint8Array() //соберет все данные в массив Uint8 и вернет
    */
    (function (io) {
        var BinWriter = (function () {
            function BinWriter() {
                /**
                * Двумерный массив куда заносятся данные.
                * @private
                * @type Uint8Array[]
                */
                /**@protected*/ this._pArrData = [];
                /**
                * Счетчик общего количества байт.
                * @private
                * @type int
                */
                /**@protected*/ this._iCountData = 0;
            }
            Object.defineProperty(BinWriter.prototype, "byteLength", {
                get: /** @inline */function () {
                    return this._iCountData;
                },
                enumerable: true,
                configurable: true
            });
            BinWriter.prototype.string = /******************************************************************************/
            /*                                 string                                     */
            /******************************************************************************/
            /**
            * @property string(str)
            * Запись строки. Перед строкой записывается длинна строки в тип uint32. Если
            * передано null или undefined то длинна строки записывается как 0xffffffff.
            * Это сделано для того что при дальнейшем считывании такая строка будет
            * возвращена как null.
            * @memberof BinWriter
            * @tparam String str строка. Все не строковые типы преобразуются к строке.
            */
            function (str) {
                if (!((str) != null)) {
                    ((this).uintX((/*checked (origin: akra)>>*/akra.MAX_UINT32), 32));
                    return;
                }
                str = String(str);
                // LOG("string: ", str);
                var sUTF8String = str.toUTF8();
                var iStrLen = sUTF8String.length;
                var arrUTF8string = BinWriter.rawStringToBuffer(sUTF8String);
 {
                    akra.logger.setSourceLocation("io/BinWriter.ts", 92);
                    akra.logger.assert(iStrLen <= Math.pow(2, 32) - 1, "Это значение не влезет в тип string");
                }
                ;
                ((this).uintX((iStrLen), 32));
                var iBitesToAdd = (4 - (iStrLen % 4) == 4) ? 0 : (4 - (iStrLen % 4));
                this._pArrData[this._pArrData.length] = arrUTF8string;
                this._iCountData += (iStrLen + iBitesToAdd);
                //trace('string', str);
                            };
            BinWriter.prototype.uintX = /******************************************************************************/
            /*                                   uintX                                    */
            /******************************************************************************/
            /**
            * @property uintX(iValue, iX)
            * Запись числа типа uint(8, 16, 32). Если число занимает меньше 4 байт то оно
            * выравнивается до 4 байт. Если передан null то число принимается равным 0.
            * Если передано любое другое не числовое значение то выводится ошибка.
            * @memberof BinWriter
            * @tparam uint iValue число.
            * @tparam int iX - 8, 16, 32 количество бит.
            */
            function (iValue, iX) {
                if (((iValue) === null)) {
                    iValue = 0;
                }
                // LOG("uint" + iX + ": ", iValue);
                 {
                    akra.logger.setSourceLocation("io/BinWriter.ts", 124);
                    akra.logger.assert((typeof (iValue) === "number"), "Не является числом: " + iValue);
                }
                ;
                ;
 {
                    akra.logger.setSourceLocation("io/BinWriter.ts", 126);
                    akra.logger.assert(0 <= iValue && iValue <= Math.pow(2, iX), "Это значение не влезет в тип uint" + iX);
                }
                ;
                var arrTmpBuf = null;
                switch(iX) {
                    case 8:
                        arrTmpBuf = new Uint8Array(4);
                        arrTmpBuf[0] = iValue;
                        break;
                    case 16:
                        arrTmpBuf = new Uint16Array(2);
                        arrTmpBuf[0] = iValue;
                        break;
                    case 32:
                        arrTmpBuf = new Uint32Array(1);
                        arrTmpBuf[0] = iValue;
                        break;
                    default:
 {
                            akra.logger.setSourceLocation("io/BinWriter.ts", 143);
                            akra.logger.error("Передано недопустимое значение длинны. Допустимые значения 8, 16, 32.");
                        }
                        ;
                        break;
                }
                //trace('uint' + iX, iValue);
                //if(iX == 8)
                //  this._pArrData[this._pArrData.length] = arrTmpBuf;
                //else
                this._pArrData[this._pArrData.length] = new Uint8Array(arrTmpBuf.buffer);
                this._iCountData += 4;
            };
            BinWriter.prototype.uint8 = /**
            * @property uint8(iValue)
            * Запись числа типа uint8. Оно выравнивается до 4 байт. Если передан null то
            * число принимается равным 0. Если передано любое другое не числовое значение
            * то выводится ошибка.
            * Сокращенная запись функции uintX(iValue, 8).
            * @memberof BinWriter
            * @tparam uint iValue число.
            */
            /** @inline */function (iValue) {
                this.uintX(iValue, 8);
            };
            BinWriter.prototype.uint16 = /**
            * @property uint16(iValue)
            * Запись числа типа uint16. Оно выравнивается до 4 байт. Если передан null то
            * число принимается равным 0. Если передано любое другое не числовое значение
            * то выводится ошибка.
            * Сокращенная запись функции uintX(iValue, 16).
            * @memberof BinWriter
            * @tparam uint iValue число.
            */
            /** @inline */function (iValue) {
                this.uintX(iValue, 16);
            };
            BinWriter.prototype.uint32 = /**
            * @property uint32(iValue)
            * Запись числа типа uint8. Если передан null то число принимается равным 0.
            * Если передано любое другое не числовое значение то выводится ошибка.
            * Сокращенная запись функции uintX(iValue, 32).
            * @memberof BinWriter
            * @tparam uint iValue число.
            */
            /** @inline */function (iValue) {
                this.uintX(iValue, 32);
            };
            BinWriter.prototype.bool = /**
            * @property bool(bValue)
            * Запись числа типа bool. В зависимости от bValue записывается либо 1 либо ноль.
            * Если передано любое другое не числовое значение то выводится ошибка.
            * Сокращенная запись функции uintX(bValue? 1: 0, 8).
            * @memberof BinWriter
            * @tparam bool bValue число.
            */
            /** @inline */function (bValue) {
                // LOG(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>> BOOL >>> ");
                this.uintX(bValue ? 1 : 0, 8);
            };
            BinWriter.prototype.writeArrayElementUintX = /******************************************************************************/
            /*                       writeArrayElementUintX                               */
            /******************************************************************************/
            /**
            * @property writeArrayElementUintX(iValue, iX)
            * Запись числа типа uint(8, 16, 32). Используется для записи элементов массивов.
            * В отличии от uintX число не выравнивается до 4 байт, а записывается ровно
            * столько байт сколько передано во втором параметре в функцию. Вторым
            * параметром передается колчиество бит а не байт. Если передан null то число
            * принимается равным 0. Если передано любое другое не числовое значение то
            * выводится ошибка.
            * @memberof BinWriter
            * @tparam uint iValue число.
            * @tparam int iX - 8, 16, 32 количество бит.
            */
            function (iValue, iX) {
                if (((iValue) === null)) {
                    iValue = 0;
                }
                // LOG("array uint", iX, ": ", iValue);
                 {
                    akra.logger.setSourceLocation("io/BinWriter.ts", 229);
                    akra.logger.assert((typeof (iValue) === "number"), "Не является числом: " + iValue);
                }
                ;
 {
                    akra.logger.setSourceLocation("io/BinWriter.ts", 230);
                    akra.logger.assert(0 <= iValue && iValue <= Math.pow(2, iX), "Это значение не влезет в тип uint" + iX);
                }
                ;
                var arrTmpBuf = null;
                switch(iX) {
                    case /* WARNING Только private и записи масивов. Нет выравнивания на 4, оно ложится на функцию записи массива.*/
                    8:
                        arrTmpBuf = new Uint8Array(1);
                        arrTmpBuf[0] = iValue;
                        break;
                        /* WARNING Только private и записи масивов. Нет выравнивания на 4, оно ложится на функцию записи массива.*/
                                            case 16:
                        arrTmpBuf = new Uint16Array(1);
                        arrTmpBuf[0] = iValue;
                        break;
                    case 32:
                        arrTmpBuf = new Uint32Array(1);
                        arrTmpBuf[0] = iValue;
                        break;
                    default:
 {
                            akra.logger.setSourceLocation("io/BinWriter.ts", 248);
                            akra.logger.error("Передано недопустимое значение длинны. Допустимые значения 8, 16, 32.");
                        }
                        ;
                        break;
                }
                if (iX == 8) {
                    this._pArrData[this._pArrData.length] = arrTmpBuf;
                } else {
                    this._pArrData[this._pArrData.length] = new Uint8Array(arrTmpBuf.buffer);
                }
                this._iCountData += (iX / 8);
            };
            BinWriter.prototype.intX = /******************************************************************************/
            /*                                    intX                                    */
            /******************************************************************************/
            /**
            * @property intX(iValue, iX)
            * Запись числа типа int(8, 16, 32). Если число занимает меньше 4 байт то оно
            * выравнивается до 4 байт. Если передан null то число принимается равным 0.
            * Если передано любое другое не числовое значение то выводится ошибка.
            * @memberof BinWriter
            * @tparam int iValue число.
            * @tparam int iX - 8, 16, 32 количество бит.
            */
            function (iValue, iX) {
                if (((iValue) === null)) {
                    iValue = 0;
                }
                // LOG("int", iX, ": ", iValue);
                 {
                    akra.logger.setSourceLocation("io/BinWriter.ts", 282);
                    akra.logger.assert((typeof (iValue) === "number"), "Не является числом: " + iValue);
                }
                ;
 {
                    akra.logger.setSourceLocation("io/BinWriter.ts", 284);
                    akra.logger.assert(-Math.pow(2, iX - 1) <= iValue && iValue <= Math.pow(2, iX - 1) - 1, "Это значение не влезет в тип int" + iX);
                }
                ;
                var arrTmpBuf = null;
                switch(iX) {
                    case 8:
                        arrTmpBuf = new Int8Array(4);
                        arrTmpBuf[0] = iValue;
                        break;
                    case 16:
                        arrTmpBuf = new Int16Array(2);
                        arrTmpBuf[0] = iValue;
                        break;
                    case 32:
                        arrTmpBuf = new Int32Array(1);
                        arrTmpBuf[0] = iValue;
                        break;
                    default:
 {
                            akra.logger.setSourceLocation("io/BinWriter.ts", 302);
                            akra.logger.error("Передано недопустимое значение длинны. Допустимые значения 8, 16, 32.");
                        }
                        ;
                        break;
                }
                //trace('int' + iX, iValue);
                this._pArrData[this._pArrData.length] = new Uint8Array(arrTmpBuf.buffer);
                this._iCountData += 4;
            };
            BinWriter.prototype.int8 = /**
            * @property int8(iValue)
            * Запись числа типа int8. Оно выравнивается до 4 байт. Если передан null то
            * число принимается равным 0. Если передано любое другое не числовое значение
            * то выводится ошибка.
            * Сокращенная запись функции intX(iValue, 8).
            * @memberof BinWriter
            * @tparam uint iValue число.
            */
            /** @inline */function (iValue) {
                this.intX(iValue, 8);
            };
            BinWriter.prototype.int16 = /**
            * @property int16(iValue)
            * Запись числа типа uint16. Оно выравнивается до 4 байт. Если передан null то
            * число принимается равным 0. Если передано любое другое не числовое значение
            * то выводится ошибка.
            * Сокращенная запись функции intX(iValue, 16).
            * @memberof BinWriter
            * @tparam int iValue число.
            */
            /** @inline */function (iValue) {
                this.intX(iValue, 16);
            };
            BinWriter.prototype.int32 = /**
            * @property uint32(iValue)
            * Запись числа типа uint8. Если передан null то число принимается равным 0.
            * Если передано любое другое не числовое значение то выводится ошибка.
            * Сокращенная запись функции intX(iValue, 32).
            * @memberof BinWriter
            * @tparam int iValue число.
            */
            /** @inline */function (iValue) {
                this.intX(iValue, 32);
            };
            BinWriter.prototype.writeArrayElementIntX = /******************************************************************************/
            /*                          writeArrayElementIntX                            */
            /******************************************************************************/
            /**
            * @property writeArrayElementIntX(iValue, iX)
            * Запись числа типа int(8, 16, 32). Используется для записи элементов массивов.
            * В отличии от intX число не выравнивается до 4 байт, а записывается ровно
            * столько байт сколько передано во втором параметре в функцию. Вторым
            * параметром передается колчиество бит а не байт. Если передан null то число
            * принимается равным 0. Если передано любое другое не числовое значение то
            * выводится ошибка.
            * @memberof BinWriter
            * @tparam int iValue число.
            * @tparam int iX - 8, 16, 32 количество бит.
            */
            function (iValue, iX) {
                if (((iValue) === null)) {
                    iValue = 0;
                }
                // LOG("array int", iX, ": ", iValue);
                 {
                    akra.logger.setSourceLocation("io/BinWriter.ts", 371);
                    akra.logger.assert((typeof (iValue) === "number"), "Не является числом: " + iValue);
                }
                ;
 {
                    akra.logger.setSourceLocation("io/BinWriter.ts", 373);
                    akra.logger.assert(-Math.pow(2, iX - 1) <= iValue && iValue <= Math.pow(2, iX - 1) - 1, "Это значение не влезет в тип int" + iX);
                }
                ;
                var arrTmpBuf = null;
                switch(iX) {
                    case /* WARNING Только private и записи масивов. Нет выравнивания на 4, оно ложится на функцию записи массива.*/
                    8:
                        arrTmpBuf = new Int8Array(1);
                        arrTmpBuf[0] = iValue;
                        break;
                        /* WARNING Только private и записи масивов. Нет выравнивания на 4, оно ложится на функцию записи массива.*/
                                            case 16:
                        arrTmpBuf = new Int16Array(1);
                        arrTmpBuf[0] = iValue;
                        break;
                    case 32:
                        arrTmpBuf = new Int32Array(1);
                        arrTmpBuf[0] = iValue;
                        break;
                    default:
 {
                            akra.logger.setSourceLocation("io/BinWriter.ts", 391);
                            akra.logger.error("Передано недопустимое значение длинны. Допустимые значения 8, 16, 32.");
                        }
                        ;
                        break;
                }
                this._pArrData[this._pArrData.length] = new Uint8Array(arrTmpBuf.buffer);
                this._iCountData += (iX / 8);
            };
            BinWriter.prototype.floatX = /******************************************************************************/
            /*                                  floatX                                    */
            /******************************************************************************/
            /**
            * @property floatX(fValue, iX)
            * Запись числа типа float(32, 64). выравнивания не происходит т.к. они уже
            * выравнены до 4. Если передан null то число принимается равным 0.
            * Если передано любое другое не числовое значение то выводится ошибка.
            * @memberof BinWriter
            * @tparam float fValue число.
            * @tparam int iX - 32, 64 количество бит.
            */
            function (fValue, iX) {
                if (((fValue) === null)) {
                    fValue = 0;
                }
 {
                    akra.logger.setSourceLocation("io/BinWriter.ts", 416);
                    akra.logger.assert((typeof (fValue) === "number"), "Не является числом: " + fValue);
                }
                ;
                //debug_assert(typeof(fValue) == 'number', "Не является числом");
                // LOG("float", iX, ": ", fValue);
                var arrTmpBuf = null;
                switch(iX) {
                    case 32:
                        arrTmpBuf = new Float32Array(1);
                        arrTmpBuf[0] = fValue;
                        break;
                    case 64:
                        arrTmpBuf = new Float64Array(1);
                        arrTmpBuf[0] = fValue;
                        break;
                    default:
 {
                            akra.logger.setSourceLocation("io/BinWriter.ts", 433);
                            akra.logger.error("Передано недопустимое значение длинны. Допустимые значения 32, 64.");
                        }
                        ;
                        break;
                }
                //trace('float' + iX, fValue);
                this._pArrData[this._pArrData.length] = new Uint8Array(arrTmpBuf.buffer);
                this._iCountData += (iX / 8);
            };
            BinWriter.prototype.float32 = /**
            * @property float32(fValue)
            * Запись числа типа float32. Если передан null то число принимается равным 0.
            * Если передано любое другое не числовое значение то выводится ошибка.
            * Сокращенная запись функции floatX(fValue, 32).
            * @memberof BinWriter
            * @tparam float fValue число.
            */
            /** @inline */function (fValue) {
                this.floatX(fValue, 32);
            };
            BinWriter.prototype.float64 = /**
            * @property float64(fValue)
            * Запись числа типа float64. Если передан null то число принимается равным 0.
            * Если передано любое другое не числовое значение то выводится ошибка.
            * Сокращенная запись функции floatX(fValue, 64).
            * @memberof BinWriter
            * @tparam float fValue число.
            */
            /** @inline */function (fValue) {
                this.floatX(fValue, 64);
            };
            BinWriter.prototype.stringArray = /******************************************************************************/
            /*                             stringArray                                    */
            /******************************************************************************/
            /**
            * @property stringArray(arrString)
            * Записывает массив строк использую дял каждого элемента функцию this.string
            * Да начала записи элементов записывает общее количество элементов как число
            * uint32. Если в качестве параметра функции передано null или undefined
            * то количество элементов записывается равным 0xffffffff.
            * @memberof BinWriter
            * @tparam Array arrString массив строк.
            */
            function (arrString) {
                if (!((arrString) != null)) {
                    ((this).uintX((0xffffffff), 32));
                    return;
                }
                ((this).uintX((arrString.length), 32));
                for(var i = 0; i < arrString.length; i++) {
                    this.string(arrString[i]);
                }
            };
            BinWriter.prototype.uintXArray = /******************************************************************************/
            /*                             uintXArray                                     */
            /******************************************************************************/
            /**
            * @property uintXArray(arrUint, iX)
            * Записывает массив чисел uint(8, 16, 32) использую для каждого элемента функцию
            *  writeArrayElementUintX. До начала записи элементов записывает общее
            *  количество элементов как число uint32. Если в качестве параметра функции
            * передано null или undefined то количество элементов записывается
            * равным 0xffffffff. Общее количество байт в массиве выравнивается к 4.
            * Все массивы приводятся к нужному типу Uint(iX)Array.
            * @memberof BinWriter
            * @tparam Uint(iX)Array arrUint массив uint(iX).
            * @tparam int iX размер элемента в битах (8, 16, 32).
            */
            function (arrUint, iX) {
                if (!((arrUint) != null)) {
                    ((this).uintX((0xffffffff), 32));
                    return;
                }
                var iUintArrLength = arrUint.byteLength;
                var iBitesToAdd;
                var arrTmpUint = null;
                switch(iX) {
                    case 8:
                        iBitesToAdd = (4 - (iUintArrLength % 4) == 4) ? 0 : (4 - (iUintArrLength % 4));
                        if (iBitesToAdd > 0 || !(arrUint instanceof Uint8Array)) {
                            arrTmpUint = new Uint8Array(iUintArrLength + iBitesToAdd);
                            (arrTmpUint).set(arrUint);
                        } else {
                            arrTmpUint = arrUint;
                        }
                        break;
                    case 16:
                        iUintArrLength /= 2;
                        iBitesToAdd = (2 - (iUintArrLength % 2) == 2) ? 0 : (2 - (iUintArrLength % 2));
                        if (iBitesToAdd > 0 || !(arrUint instanceof Uint16Array)) {
                            arrTmpUint = new Uint16Array(iUintArrLength + iBitesToAdd);
                            (arrTmpUint).set(arrUint);
                        } else {
                            arrTmpUint = arrUint;
                        }
                        break;
                    case 32:
                        iUintArrLength /= 4;
                        if (!(arrUint instanceof Uint32Array)) {
                            arrTmpUint = new Uint32Array(arrUint);
                        } else {
                            arrTmpUint = arrUint;
                        }
                        break;
                }
                ((this).uintX((iUintArrLength), 32));
                for(var i = 0, n = arrTmpUint.byteLength / (iX / 8); i < n; i++) {
                    this.writeArrayElementUintX(arrTmpUint[i], iX);
                }
            };
            BinWriter.prototype.uint8Array = /**
            * @property uint8Array(arrUint)
            * Запись массива типа Uint8Array. До начала записи элементов записывает общее
            * количество элементов как число uint32. Если в качестве параметра функции
            * передано null или undefined то количество элементов записывается
            * равным 0xffffffff. Общее количество байт в массиве выравнивается до 4.
            * Сокращенная запись функции uintXArray(arrUint, 8).
            * @memberof BinWriter
            * @tparam Uint8Array arrUint массив uint8.
            */
            /** @inline */function (arrUint) {
                this.uintXArray(arrUint, 8);
            };
            BinWriter.prototype.uint16Array = /**
            * @property uint16Array(arrUint)
            * Запись массива типа Uint16Array. До начала записи элементов записывает общее
            * количество элементов как число uint32. Если в качестве параметра функции
            * передано null или undefined то количество элементов записывается
            * равным 0xffffffff. Общее количество байт в массиве выравнивается до 4.
            * Сокращенная запись функции uintXArray(arrUint, 16).
            * @memberof BinWriter
            * @tparam Uint16Array arrUint массив uint16.
            */
            /** @inline */function (arrUint) {
                this.uintXArray(arrUint, 16);
            };
            BinWriter.prototype.uint32Array = /**
            * @property uint32Array(arrUint)
            * Запись массива типа Uint32Array. До начала записи элементов записывает общее
            * количество элементов как число uint32. Если в качестве параметра функции
            * передано null или undefined то количество элементов записывается
            * равным 0xffffffff.
            * Сокращенная запись функции uintXArray(arrUint, 32).
            * @memberof BinWriter
            * @tparam Uint32Array arrUint массив uint32.
            */
            /** @inline */function (arrUint) {
                this.uintXArray(arrUint, 32);
            };
            BinWriter.prototype.intXArray = /******************************************************************************/
            /*                               intXArray                                    */
            /******************************************************************************/
            /**
            * @property intXArray(arrInt, iX)
            * Записывает массив чисел int(8, 16, 32) использую для каждого элемента функцию
            *  writeArrayElementIntX. До начала записи элементов записывает общее
            *  количество элементов как число int32. Если в качестве параметра функции
            * передано null или undefined то количество элементов записывается
            * равным 0xffffffff. Общее количество байт в массиве выравнивается к 4.
            * Все массивы приводятся к нужному типу Int(iX)Array.
            * @memberof BinWriter
            * @tparam Int(iX)Array arrUint массив int(iX).
            * @tparam int iX размер элемента в битах (8, 16, 32).
            */
            function (arrInt, iX) {
                if (!((arrInt) != null)) {
                    ((this).uintX((0xffffffff), 32));
                    return;
                }
                var iIntArrLength = 0;
                var iBitesToAdd = 0;
                var arrTmpInt = null;
                switch(iX) {
                    case 8:
                        iIntArrLength = (arrInt).length;
                        iBitesToAdd = (4 - (iIntArrLength % 4) == 4) ? 0 : (4 - (iIntArrLength % 4));
                        if (iBitesToAdd > 0 || !(arrInt instanceof Int8Array)) {
                            arrTmpInt = new Int8Array(iIntArrLength + iBitesToAdd);
                            (arrTmpInt).set(arrInt);
                        } else {
                            arrTmpInt = arrInt;
                        }
                        break;
                    case 16:
                        iIntArrLength = (arrInt).length;
                        iBitesToAdd = (2 - (iIntArrLength % 2) == 2) ? 0 : (2 - (iIntArrLength % 2));
                        if (iBitesToAdd > 0 || !(arrInt instanceof Int16Array)) {
                            arrTmpInt = new Int16Array(iIntArrLength + iBitesToAdd);
                            (arrTmpInt).set(arrInt);
                        } else {
                            arrTmpInt = arrInt;
                        }
                        break;
                    case 32:
                        iIntArrLength = (arrInt).length;
                        if (!(arrInt instanceof Int32Array)) {
                            arrTmpInt = new Int32Array(arrInt);
                        } else {
                            arrTmpInt = arrInt;
                        }
                        break;
                }
                ((this).uintX((iIntArrLength), 32));
                for(var i = 0, n = arrTmpInt.byteLength / (iX / 8); i < n; i++) {
                    this.writeArrayElementIntX(arrTmpInt[i], iX);
                }
            };
            BinWriter.prototype.int8Array = /**
            * @property int8Array(arrInt)
            * Запись массива типа Int8Array. До начала записи элементов записывает общее
            * количество элементов как число uint32. Если в качестве параметра функции
            * передано null или undefined то количество элементов записывается
            * равным 0xffffffff. Общее количество байт в массиве выравнивается до 4.
            * Сокращенная запись функции intXArray(arrInt, 8).
            * @memberof BinWriter
            * @tparam Int8Array arrInt массив int8.
            */
            /** @inline */function (arrInt) {
                this.intXArray(arrInt, 8);
            };
            BinWriter.prototype.int16Array = /**
            * @property int16Array(arrInt)
            * Запись массива типа Int16Array. До начала записи элементов записывает общее
            * количество элементов как число uint32. Если в качестве параметра функции
            * передано null или undefined то количество элементов записывается
            * равным 0xffffffff. Общее количество байт в массиве выравнивается до 4.
            * Сокращенная запись функции intXArray(arrInt, 16).
            * @memberof BinWriter
            * @tparam Int16Array arrInt массив int16.
            */
            /** @inline */function (arrInt) {
                this.intXArray(arrInt, 16);
            };
            BinWriter.prototype.int32Array = /**
            * @property int32Array(arrInt)
            * Запись массива типа Int32Array. До начала записи элементов записывает общее
            * количество элементов как число uint32. Если в качестве параметра функции
            * передано null или undefined то количество элементов записывается
            * равным 0xffffffff.
            * Сокращенная запись функции intXArray(arrInt, 32).
            * @memberof BinWriter
            * @tparam Int32Array arrInt массив int32.
            */
            /** @inline */function (arrInt) {
                this.intXArray(arrInt, 32);
            };
            BinWriter.prototype.floatXArray = /******************************************************************************/
            /*                              floatXArray                                   */
            /******************************************************************************/
            /**
            * @property floatXArray(arrFloat, iX)
            * Записывает массив чисел float(32, 64) использую для каждого элемента функцию
            *  floatX. До начала записи элементов записывает общее
            *  количество элементов как число int32. Если в качестве параметра функции
            * передано null или undefined то количество элементов записывается
            * равным 0xffffffff.
            * Все массивы приводятся к нужному типу Float(iX)Array.
            * @memberof BinWriter
            * @tparam Float(iX)Array arrFloat массив float(iX).
            * @tparam int iX размер элемента в битах (32, 64).
            */
            function (arrFloat, iX) {
                if (!((arrFloat) != null)) {
                    ((this).uintX((0xffffffff), 32));
                    return;
                }
                switch(iX) {
                    case 32:
                        if (!(arrFloat instanceof Float32Array)) {
                            arrFloat = new Float32Array(arrFloat);
                        }
                        break;
                    case 64:
                        if (!(arrFloat instanceof Float64Array)) {
                            arrFloat = new Float64Array(arrFloat);
                        }
                        break;
                }
                var iFloatArrLength = arrFloat.byteLength / (iX / 8);
                ((this).uintX((iFloatArrLength), 32));
                //Поэлементно записываем массив
                for(var i = 0, n = iFloatArrLength; i < n; i++) {
                    this.floatX(arrFloat[i], iX);
                }
            };
            BinWriter.prototype.float32Array = /**
            * @property float32Array(arrFloat)
            * Запись массива типа Float32Array. До начала записи элементов записывает общее
            * количество элементов как число uint32. Если в качестве параметра функции
            * передано null или undefined то количество элементов записывается
            * равным 0xffffffff.
            * Все переданные массивы приводятся к типу Float32Array.
            * Сокращенная запись функции floatXArray(arrFloat, 32).
            * @memberof BinWriter
            * @tparam Float32Array arrFloat массив float32.
            */
            /** @inline */function (arrFloat) {
                this.floatXArray(arrFloat, 32);
            };
            BinWriter.prototype.float64Array = /**
            * @property float64Array(arrFloat)
            * Запись массива типа Float64Array. До начала записи элементов записывает общее
            * количество элементов как число uint32. Если в качестве параметра функции
            * передано null или undefined то количество элементов записывается
            * равным 0xffffffff.
            * Все переданные массивы приводятся к типу Float64Array.
            * Сокращенная запись функции floatXArray(arrFloat, 64).
            * @memberof BinWriter
            * @tparam Float64Array arrFloat массив float64.
            */
            /** @inline */function (arrFloat) {
                this.floatXArray(arrFloat, 64);
            };
            BinWriter.prototype.data = /**
            * @property data()
            * Берет все данные из массива _pArrData и записывает их в массив
            * типа ArrayBuffer.
            * @memberof BinWriter
            * @treturn ArrayBuffer.
            */
            /** @inline */function () {
                return this.dataAsUint8Array().buffer;
            };
            BinWriter.prototype.dataAsString = /**
            * @property data()
            * Берет все данные из массива _pArrData и записывает их в строку.
            * @memberof BinWriter
            * @treturn String.
            */
            function () {
                var tmpArrBuffer = this.dataAsUint8Array();
                var sString = "";
                for(var n = 0; n < tmpArrBuffer.length; ++n) {
                    var charCode = String.fromCharCode(tmpArrBuffer[n]);
                    sString = sString + charCode;
                }
                return sString;
            };
            BinWriter.prototype.dataAsUint8Array = /**
            * @property toUint8Array()
            * Берет все данные из массива _pArrData и вернет Uint8Array.
            * @memberof BinWriter
            * @treturn Uint8Array.
            */
            function () {
                var arrUint8 = new Uint8Array(this._iCountData);
                for(var i = 0, k = 0; i < this._pArrData.length; i++) {
                    for(var n = 0; n < this._pArrData[i].length; n++) {
                        arrUint8[k++] = this._pArrData[i][n];
                    }
                }
                return arrUint8;
            };
            BinWriter.rawStringToBuffer = /**
            * @property rawStringToBuffer()
            * Берет строку и преобразует ее в массив Uint8Array.
            * @memberof BinWriter
            * @treturn Uint8Array.
            */
            function rawStringToBuffer(str) {
                var idx;
                var len = str.length;
                var iBitesToAdd = (4 - (len % 4) == 4) ? 0 : (4 - (len % 4));
                var arr = new Array(len + iBitesToAdd);
                for(idx = 0; idx < len; ++idx) {
                    /* & 0xFF;*/
                    arr[idx] = str.charCodeAt(idx);
                }
                return new Uint8Array(arr);
            };
            return BinWriter;
        })();
        io.BinWriter = BinWriter;        
    })(akra.io || (akra.io = {}));
    var io = akra.io;
})(akra || (akra = {}));
var akra;
(function (akra) {
    (function (io) {
        var pCommonTemplate = null;
        function getPackerTemplate() {
            return pCommonTemplate;
        }
        io.getPackerTemplate = getPackerTemplate;
        var PackerTemplate = (function () {
            function PackerTemplate(pData) {
                /**@protected*/ this._pData = {};
                /**@protected*/ this._nTypes = 0;
                /**@protected*/ this._pNum2Tpl = {};
                /**@protected*/ this._pTpl2Num = {};
                if (((pData) !== undefined)) {
                    this.set(pData);
                }
            }
            PackerTemplate.prototype.getType = function (iType) {
 {
                    akra.logger.setSourceLocation("PackerFormat.ts", 26);
                    akra.logger.assert(((this._pNum2Tpl[iType]) !== undefined), "unknown type detected: " + iType);
                }
                ;
                return this._pNum2Tpl[iType];
            };
            PackerTemplate.prototype.getTypeId = function (sType) {
 {
                    akra.logger.setSourceLocation("PackerFormat.ts", 31);
                    akra.logger.assert(((this._pTpl2Num[sType]) !== undefined), "unknown type detected: " + sType);
                }
                ;
                return this._pTpl2Num[sType];
            };
            PackerTemplate.prototype.set = function (pFormat) {
                var iType;
                for(var i in pFormat) {
                    this._pData[i] = pFormat[i];
                    iType = this._nTypes++;
                    this._pNum2Tpl[iType] = i;
                    this._pTpl2Num[i] = iType;
                }
            };
            PackerTemplate.prototype.detectType = function (pObject) {
                return PackerTemplate.getClass(pObject);
            };
            PackerTemplate.prototype.resolveType = function (sType) {
                var pTemplates = this._pData;
                var pProperties;
                var sProperties;
                while((typeof (sProperties = pTemplates[sType]) === "string")) {
                    sType = sProperties;
                }
 {
                    akra.logger.setSourceLocation("PackerFormat.ts", 62);
                    akra.logger.assert(!(typeof (sProperties) === "string"), "cannot resolve type: " + sType);
                }
                ;
                return sType;
            };
            PackerTemplate.prototype.properties = function (sType) {
                var pProperties = this._pData[sType];
                if ((typeof (pProperties) === "string")) {
                    return this.properties(this.resolveType(sType));
                }
                return pProperties;
            };
            PackerTemplate.prototype.data = function () {
                return this._pData;
            };
            PackerTemplate.getClass = function getClass(pObj) {
                if (pObj && akra.isObject(pObj) && Object.prototype.toString.call(pObj) !== "[object Array]" && ((pObj.constructor) != null) && pObj != this.window) {
                    var arr = pObj.constructor.toString().match(/function\s*(\w+)/);
                    if (!((arr) === null) && arr.length == 2) {
                        return arr[1];
                    }
                }
                var sType = typeof pObj;
                return sType[0].toUpperCase() + sType.substr(1);
            };
            return PackerTemplate;
        })();
        io.PackerTemplate = PackerTemplate;        
        pCommonTemplate = new PackerTemplate();
        pCommonTemplate.set({
            "Float32Array": {
                write: function (pData) {
                    this.float32Array(pData);
                },
                read: function () {
                    return this.float32Array();
                }
            },
            "Float64Array": {
                write: function (pData) {
                    this.float64Array(pData);
                },
                read: function () {
                    return this.float64Array();
                }
            },
            "Int32Array": {
                write: function (pData) {
                    this.int32Array(pData);
                },
                read: function () {
                    return this.int32Array();
                }
            },
            "Int16Array": {
                write: function (pData) {
                    this.int16Array(pData);
                },
                read: function () {
                    return this.int16Array();
                }
            },
            "Int8Array": {
                write: function (pData) {
                    this.int8Array(pData);
                },
                read: function () {
                    return this.int8Array();
                }
            },
            "Uint32Array": {
                write: function (pData) {
                    this.uint32Array(pData);
                },
                read: function () {
                    return this.uint32Array();
                }
            },
            "Uint16Array": {
                write: function (pData) {
                    this.uint16Array(pData);
                },
                read: function () {
                    return this.uint16Array();
                }
            },
            "Uint8Array": {
                write: function (pData) {
                    this.uint8Array(pData);
                },
                read: function () {
                    return this.uint8Array();
                }
            },
            "String": {
                write: function (str) {
                    this.string(str);
                },
                read: function () {
                    return this.string();
                }
            },
            "Float64": //float
            {
                write: function (val) {
                    this.float64(val);
                },
                read: function () {
                    return this.float64();
                }
            },
            "Float32": {
                write: function (val) {
                    this.float32(val);
                },
                read: function () {
                    return this.float32();
                }
            },
            "Int32": //int
            {
                write: function (val) {
                    this.int32(val);
                },
                read: function () {
                    return this.int32();
                }
            },
            "Int16": {
                write: function (val) {
                    this.int16(val);
                },
                read: function () {
                    return this.int16();
                }
            },
            "Int8": {
                write: function (val) {
                    this.int8(val);
                },
                read: function () {
                    return this.int8();
                }
            },
            "Uint32": //uint
            {
                write: function (val) {
                    this.uint32(val);
                },
                read: function () {
                    return this.uint32();
                }
            },
            "Uint16": {
                write: function (val) {
                    this.uint16(val);
                },
                read: function () {
                    return this.uint16();
                }
            },
            "Uint8": {
                write: function (val) {
                    this.uint8(val);
                },
                read: function () {
                    return this.uint8();
                }
            },
            "Boolean": {
                write: function (b) {
                    this.bool(b);
                },
                read: function () {
                    return this.bool();
                }
            },
            "Object": {
                write: function (object) {
                    if (akra.isArray(object)) {
                        /*is array*/
                        this.bool(true);
                        this.uint32((object).length);
                        for(var i = 0; i < (object).length; ++i) {
                            this.write((object)[i]);
                        }
                    } else {
                        /*is not array*/
                        this.bool(false);
                        this.stringArray(Object.keys(object));
                        for(var key in object) {
                            this.write(object[key]);
                        }
                    }
                },
                read: function (object) {
                    var isArray = this.bool();
                    var keys;
                    var n;
                    if (isArray) {
                        n = this.uint32();
                        object = object || new Array(n);
                        for(var i = 0; i < n; ++i) {
                            object[i] = this.read();
                        }
                    } else {
                        object = object || {};
                        keys = this.stringArray();
                        for(var i = 0; i < keys.length; ++i) {
                            object[keys[i]] = this.read();
                        }
                    }
                    return object;
                }
            },
            "Function": {
                write: function (fn) {
                    var sFunc = String(fn.valueOf());
                    var sBody = sFunc.substr(sFunc.indexOf("{") + 1, sFunc.lastIndexOf("}") - sFunc.indexOf("{") - 1);
                    var pArgs = sFunc.substr(sFunc.indexOf("(") + 1, sFunc.indexOf(")") - sFunc.indexOf("(") - 1).match(/[$A-Z_][0-9A-Z_$]*/gi);
                    //var sName: string = null;
                    //var pMatches: string[] = sFunc.match(/(function\s+)([_$a-zA-Z][_$a-zA-Z0-9]*)(?=\s*\()/gi);
                    // if (isDefAndNotNull(pMatches) && pMatches.length > 2) {
                    // 	sName = pMatches[2];
                    // }
                    //this.string(sName);
                    this.stringArray(pArgs);
                    this.string(sBody);
                },
                read: function () {
                    return new Function(this.stringArray(), this.string());
                }
            },
            "Number": "Float32",
            "Float": "Float32",
            "Int": "Int32",
            "Uint": "Uint32",
            "Array": "Object"
        });
    })(akra.io || (akra.io = {}));
    var io = akra.io;
})(akra || (akra = {}));
var akra;
(function (akra) {
    (function (io) {
        var Packer = (function (_super) {
            __extends(Packer, _super);
            function Packer() {
                _super.apply(this, arguments);

                /**@protected*/ this._pHashTable = {};
                /**@protected*/ this._pTemplate = io.getPackerTemplate();
            }
            Object.defineProperty(Packer.prototype, "template", {
                get: /** @inline */function () {
                    return this._pTemplate;
                },
                enumerable: true,
                configurable: true
            });
            Packer.prototype.memof = function (pObject, iAddr, sType) {
                var pTable = this._pHashTable;
                var pCell = pTable[sType];
                if (!((pCell) !== undefined)) {
                    pCell = pTable[sType] = [];
                }
                pCell.push(pObject, iAddr);
            };
            Packer.prototype.addr = function (pObject, sType) {
                var pTable = this._pHashTable;
                var iAddr;
                var pCell = pTable[sType];
                if (((pCell) !== undefined)) {
                    for(var i = 0, n = pCell.length / 2; i < n; ++i) {
                        var j = 2 * i;
                        if (pCell[j] === pObject) {
                            return pCell[j + 1];
                        }
                    }
                }
                return -1;
            };
            Packer.prototype.nullPtr = /** @inline */function () {
                return ((this).uintX((/*checked (origin: akra)>>*/akra.MAX_UINT32), 32));
            };
            Packer.prototype.rollback = function (n) {
                if (typeof n === "undefined") { n = 1; }
                if (n === -1) {
                    n = this._pArrData.length;
                }
                var pRollback = new Array(n);
                var iRollbackLength = 0;
                for(var i = 0; i < n; ++i) {
                    pRollback[i] = this._pArrData.pop();
                    iRollbackLength += pRollback[i].byteLength;
                }
                this._iCountData -= iRollbackLength;
                return pRollback;
            };
            Packer.prototype.append = function (pData) {
                if (akra.isArray(pData)) {
                    for(var i = 0; i < (pData).length; ++i) {
                        this._pArrData.push((pData)[i]);
                        this._iCountData += (pData)[i].byteLength;
                    }
                } else {
                    if (((pData) instanceof ArrayBuffer)) {
                        pData = new Uint8Array(pData);
                    }
                    this._pArrData.push(pData);
                    this._iCountData += (pData).byteLength;
                }
            };
            Packer.prototype.writeData = function (pObject, sType) {
                var pTemplate = ((this)._pTemplate);
                var pProperties = pTemplate.properties(sType);
                var fnWriter = null;
                fnWriter = pProperties.write;
                if (!((fnWriter) === null)) {
                    if (fnWriter.call(this, pObject) === false) {
 {
                            akra.logger.setSourceLocation("io/Packer.ts", 112);
                            akra.logger.error("cannot write type: " + sType);
                        }
                        ;
                    }
                    return true;
                }
 {
                    akra.logger.setSourceLocation("io/Packer.ts", 118);
                    akra.logger.assert(((pProperties) != null), "unknown object <" + sType + "> type cannot be writed");
                }
                ;
                return true;
            };
            Packer.prototype.write = function (pObject, sType) {
                if (typeof sType === "undefined") { sType = null; }
                var pProperties;
                var iAddr, iType;
                var pTemplate = ((this)._pTemplate);
                if (((sType) === null)) {
                    sType = pTemplate.detectType(pObject);
                }
                pProperties = pTemplate.properties(sType);
                iType = pTemplate.getTypeId(sType);
                if (((pObject) === null) || !((pObject) !== undefined) || !((iType) !== undefined)) {
                    this.nullPtr();
                    return false;
                }
                iAddr = this.addr(pObject, sType);
                if (iAddr < 0) {
                    iAddr = ((this)._iCountData) + 4 + 4;
                    ((this).uintX((iAddr), 32));
                    ((this).uintX((iType), 32));
                    if (this.writeData(pObject, sType)) {
                        this.memof(pObject, iAddr, sType);
                    } else {
                        this.rollback(2);
                        this.nullPtr();
                    }
                } else {
                    ((this).uintX((iAddr), 32));
                    ((this).uintX((iType), 32));
                }
                return true;
            };
            return Packer;
        })(io.BinWriter);        
        function dump(pObject) {
            var pPacker = new Packer();
            pPacker.write(pObject);
            return pPacker.data();
        }
        io.dump = dump;
    })(akra.io || (akra.io = {}));
    var io = akra.io;
})(akra || (akra = {}));
var akra;
(function (akra) {
    (function (io) {
        var UnPacker = (function (_super) {
            __extends(UnPacker, _super);
            function UnPacker() {
                _super.apply(this, arguments);

                /**@protected*/ this._pHashTable = {};
                /**@protected*/ this._pTemplate = io.getPackerTemplate();
                /**@protected*/ this._pPositions = [];
            }
            Object.defineProperty(UnPacker.prototype, "template", {
                get: /** @inline */function () {
                    return this._pTemplate;
                },
                enumerable: true,
                configurable: true
            });
            UnPacker.prototype.pushPosition = /** @inline */function (iPosition) {
                this._pPositions.push(this._iPosition);
                this._iPosition = iPosition;
            };
            UnPacker.prototype.popPosition = /** @inline */function () {
                this._iPosition = this._pPositions.pop();
            };
            UnPacker.prototype.memof = function (pObject, iAddr) {
                this._pHashTable[iAddr] = pObject;
            };
            UnPacker.prototype.memread = function (iAddr) {
                return this._pHashTable[iAddr] || null;
            };
            UnPacker.prototype.readPtr = function (iAddr, sType, pObject) {
                if (typeof pObject === "undefined") { pObject = null; }
                if (iAddr === akra.MAX_UINT32) {
                    return null;
                }
                var pTmp = this.memread(iAddr);
                var isReadNext = false;
                var fnReader = null;
                var pTemplate = ((this)._pTemplate);
                var pProperties;
                if (((pTmp) != null)) {
                    return pTmp;
                }
                if (iAddr === this._iPosition) {
                    isReadNext = true;
                } else {
                    //set new position
                    this.pushPosition(iAddr);
                }
                pProperties = pTemplate.properties(sType);
 {
                    akra.logger.setSourceLocation("io/UnPacker.ts", 67);
                    akra.logger.assert(((pProperties) != null), "unknown object <" + sType + "> type cannot be readed");
                }
                ;
                fnReader = pProperties.read;
                //read primal type
                if (((fnReader) != null)) {
                    pTmp = fnReader.call(this, pObject);
                    this.memof(pTmp, iAddr);
                    //restore prev. position
                    if (!isReadNext) {
                        this.popPosition();
                    }
                    return pTmp;
                }
 {
                    akra.logger.setSourceLocation("io/UnPacker.ts", 84);
                    akra.logger.criticalError("unhandled case!");
                }
                ;
                return null;
            };
            UnPacker.prototype.read = function () {
                var iAddr = this.uint32();
                if (iAddr === akra.MAX_UINT32) {
                    return null;
                }
                var iType = this.uint32();
                var sType = ((this)._pTemplate).getType(iType);
                return this.readPtr(iAddr, sType);
            };
            return UnPacker;
        })(io.BinReader);        
        function undump(pBuffer) {
            if (!((pBuffer) != null)) {
                return null;
            }
            return (new UnPacker(pBuffer)).read();
        }
        io.undump = undump;
    })(akra.io || (akra.io = {}));
    var io = akra.io;
})(akra || (akra = {}));
var akra;
(function (akra) {
    test("Bin Reader/Writer tests", /** @inline */function () {
        var pWriter = new akra.io.BinWriter();
        var i8a = new Int8Array([
            -1, 
            -2, 
            -3, 
            -4, 
            -5, 
            -6, 
            -7, 
            -8, 
            0, 
            8, 
            7, 
            6, 
            5, 
            4, 
            3, 
            2, 
            1
        ]);
        var i16a = new Int16Array([
            -1, 
            -2, 
            -3, 
            -4, 
            -5, 
            -6, 
            -7, 
            -8, 
            0, 
            8, 
            7, 
            6, 
            5, 
            4, 
            3, 
            2, 
            1
        ]);
        var i32a = new Int32Array([
            -1, 
            -2, 
            -3, 
            -4, 
            -5, 
            -6, 
            -7, 
            -8, 
            0, 
            8, 
            7, 
            6, 
            5, 
            4, 
            3, 
            2, 
            1
        ]);
        var ui8a = new Uint8Array([
            8, 
            7, 
            6, 
            5, 
            4, 
            3, 
            2, 
            1, 
            0
        ]);
        var ui16a = new Uint16Array([
            8, 
            7, 
            6, 
            5, 
            4, 
            3, 
            2, 
            1, 
            0
        ]);
        var ui32a = new Uint32Array([
            8, 
            7, 
            6, 
            5, 
            4, 
            3, 
            2, 
            1, 
            0
        ]);
        var f32a = new Float32Array([
            -50, 
            -100, 
            -150
        ]);
        var f64a = new Float64Array([
            100, 
            200, 
            300
        ]);
        var sa = [
            "word 1", 
            "word 2", 
            "word 3"
        ];
        shouldBeTrue("Is bool: TRUE");
        shouldBeFalse("Is bool: FALSE");
        shouldBe("Is uint: 8", 8);
        shouldBe("Is uint: 16", 16);
        shouldBe("Is uint: 32", 32);
        shouldBe("Is int: -8", -8);
        shouldBe("Is int: -16", -16);
        shouldBe("Is int: -32", -32);
        shouldBe("Is float: 128", 128);
        shouldBe("Is float: 256", 256);
        shouldBe("Is string: \"en/english\"", "en/english");
        shouldBe("Is string: \"ru/русский\"", "ru/русский");
        shouldBeArray("Is int8Array: [-1, -2, -3, -4, -5, -6, -7, -8, 0, 8, 7, 6, 5, 4, 3, 2, 1]", i8a);
        shouldBeArray("Is int16Array: [-1, -2, -3, -4, -5, -6, -7, -8, 0, 8, 7, 6, 5, 4, 3, 2, 1]", i16a);
        shouldBeArray("Is int32Array: [-1, -2, -3, -4, -5, -6, -7, -8, 0, 8, 7, 6, 5, 4, 3, 2, 1]", i32a);
        shouldBeArray("Is Uint8Array: [8, 7, 6, 5, 4, 3, 2, 1, 0]", ui8a);
        shouldBeArray("Is Uint16Array: [8, 7, 6, 5, 4, 3, 2, 1, 0]", ui16a);
        shouldBeArray("Is Uint32Array: [8, 7, 6, 5, 4, 3, 2, 1, 0]", ui32a);
        shouldBeArray("Is float32Array: [-50, -100, -150]", f32a);
        shouldBeArray("Is float64Array: [100, 200, 300]", f64a);
        shouldBeArray("Is stringArray: [\"word 1\", \"word 2\", \"word 3\"]", sa);
        pWriter.bool(true);
        pWriter.bool(false);
        pWriter.uint8(8);
        pWriter.uint16(16);
        pWriter.uint32(32);
        pWriter.int8(-8);
        pWriter.int16(-16);
        pWriter.int32(-32);
        pWriter.float32(128);
        pWriter.float64(256);
        pWriter.string("en/english");
        pWriter.string("ru/русский");
        pWriter.int8Array(i8a);
        pWriter.int16Array(i16a);
        pWriter.int32Array(i32a);
        pWriter.uint8Array(ui8a);
        pWriter.uint16Array(ui16a);
        pWriter.uint32Array(ui32a);
        pWriter.float32Array(f32a);
        pWriter.float64Array(f64a);
        pWriter.stringArray(sa);
        //===========================
        var pReader = new akra.io.BinReader(pWriter);
        check((pReader.uint8() > 0));
        check((pReader.uint8() > 0));
        check(pReader.uint8());
        check(pReader.uint16());
        check(pReader.uint32());
        check(pReader.int8());
        check(pReader.int16());
        check(pReader.int32());
        check(pReader.float32());
        check(pReader.float64());
        check(pReader.string());
        check(pReader.string());
        check((pReader.intXArray(8)));
        check((pReader.intXArray(16)));
        check((pReader.intXArray(32)));
        check((pReader.uintXArray(8)));
        check((pReader.uintXArray(16)));
        check((pReader.uintXArray(32)));
        check((pReader.floatXArray(32)));
        check((pReader.floatXArray(64)));
        check(pReader.stringArray());
    });
    test("Packer/Unpacker tests", /** @inline */function () {
        var f32a = new Float32Array([
            4, 
            3, 
            2, 
            1
        ]);
        var fnNoName = function (b, c, a) {
            return Math.pow((b + a) * c, 2);
        };
        var pSub = {
            name: "sub",
            a: [
                1, 
                2, 
                3, 
                4, 
                5
            ],
            fa: f32a,
            fn: fnNoName
        };
        var pObject = {
            value: [
                pSub, 
                pSub
            ]
        };
        shouldBeArray("Must be " + f32a.toString(), f32a);
        shouldBeTrue("Function packing");
        shouldBeTrue("Object with circular links");
        check(akra.io.undump(akra.io.dump(f32a)));
        check((akra.io.undump(akra.io.dump(fnNoName)))(10, 20, 30) == fnNoName(10, 20, 30));
        var pCopy = akra.io.undump(akra.io.dump(pObject));
        check(pCopy.value[0] === pCopy.value[1] && pCopy.value[0].fn(10, 20, 30) == fnNoName(10, 20, 30));
    });
})(akra || (akra = {}));
