#ifndef PACKERFORMAT_TS
#define PACKERFORMAT_TS

#include "IPackerFormat.ts"

module akra.io {
	var pCommonTemplate: IPackerTemplate = null;

	export function getPackerTemplate(): IPackerTemplate {
		return pCommonTemplate;
	}

	class PackerTemplate {
		protected _pData: IPackerFormat = {};
		protected _nTypes: uint = 0;
		protected _pNum2Tpl: StringMap = {};
		protected _pTpl2Num: IntMap = {};

		constructor (pData?: IPackerFormat) {
			if (isDef(pData)) {
				this.set(pData);
			}
		}

		getType(iType: int): string {
			debug_assert(isDef(this._pNum2Tpl[iType]), "unknown type detected: " + iType);
			return this._pNum2Tpl[iType];
		}

		getTypeId(sType: string): int {
			debug_assert(isDef(this._pTpl2Num[sType]), "unknown type detected: " + sType);
			return this._pTpl2Num[sType];
		}

		set(pFormat: IPackerFormat): void {
			var iType: int;

		    for (var i in pTemplate) {
		        this._pData[i] = pTemplate[i];
		        
		        iType = this._nTypes ++;

		        this._pNum2Tpl[iType] = i;
		        this._pTpl2Num[i] = iType;
		    }
		}

		detectType(pObject: any): string {
			return PackerTemplate.getClass(pObject);
		}

		resolveType(sType: string): string {
			var pTemplates: IPackerFormat = this._pData;
			var pProperties: IPackerCodec;
			var sProperties: string;
			 
			
			while (isString(sProperties = pTemplates[sType])) {
		        sType = sProperties;
		    }

			debug_assert(!isString(sProperties), "cannot resolve type: " + sType);

		    return sType;
		}

		properties(sType): IPackerCodec {
			var pProperties: any = this._pData[sType];

			if (isString(pProperties)) {
				return this.properties(this.resolveType(sType));
			}

		    return <IPackerCodec>pProperties;
		}

		data(): IPackerFormat {
			return this._pData;
		}

		static getClass(pObj: any): string {
			 if (pObj && 
			 	isObject(pObj) &&
		        Object.prototype.toString.call(pObj) !== "[object Array]" && 
		        isDefAndNotNull(pObj.constructor) && pObj != this.window) {

		        var arr: string[] = pObj.constructor.toString().match(/function\s*(\w+)/);
		        
		        if (!isNull(arr) && arr.length == 2) {
		            return arr[1];
		        }
		    }

		    var sType: string = typeof pObj;

		    return sType[0].toUpperCase() + sType.substr(1);
		}
	}

	pCommonTemplate = new PackerTemplate;

	pCommonTemplate.set({
		"Float32Array": {
			write	: function (pData) { this.float32Array(pData); },
			read	: function () { return this.float32Array(); }
		},
		"Float64Array": {
			write	: function (pData) { this.float64Array(pData); },
			read	: function () { return this.float64Array(); }
		},
		
		"Int32Array":  {
			write	: function (pData) { this.int32Array(pData); },
			read	: function () { return this.int32Array(); }
		},
		"Int16Array": {
			write	: function (pData) { this.int16Array(pData); },
			read	: function () { return this.int16Array(); }
		},
		"Int8Array"	: {
			write	: function (pData) { this.int8Array(pData); },
			read	: function () { return this.int8Array(); }
		},

		"Uint32Array": {
			write	: function (pData) { this.uint32Array(pData); },
			read	: function () { return this.uint32Array(); }
		},
		"Uint16Array": {
			write	: function (pData) { this.uint16Array(pData); },
			read	: function () { return this.uint16Array(); }
		},
		"Uint8Array" : {
			write	: function (pData) { this.uint8Array(pData); },
			read	: function () { return this.uint8Array(); }
		},

		"String": {
			write	: function (str) { this.string(str); },
			read	: function () { return this.string(); }
		},

		//float
		"Float64": {
			write	: function (val) { this.float64(val); },
			read	: function () { return this.float64(); }
		},
		"Float32": {
			write	: function (val) { this.float32(val); },
			read	: function () { return this.float32(); }
		},


		//int
		"Int32"	: {
			write	: function (val) { this.int32(val); },
			read	: function () { return this.int32(); }
		},
		"Int16"	: {
			write	: function (val) { this.int16(val); },
			read	: function () { return this.int16(); }
		},
		"Int8"	: {
			write	: function (val) { this.int8(val); },
			read	: function () { return this.int8(); }
		},

		//uint
		"Uint32": {
			write	: function (val) { this.uint32(val); },
			read	: function () { return this.uint32(); }
		},
		"Uint16": {
			write	: function (val) { this.uint16(val); },
			read	: function () { return this.uint16(); }
		},
		"Uint8"	: {
			write	: function (val) { this.uint8(val); },
			read	: function () { return this.uint8(); }
		},

		"Boolean": {
			write	: function (b) { this.bool(b); },
			read	: function () { return this.bool(); }
		},

		"Object": {
			write: function (object) {
				if (object instanceof Array) {
					this.bool(true); 	//is array
					this.uint32(object.length);

					for (var i = 0; i < object.length; ++ i) {
						this.write(object[i]);
					}
				}
				else {
					this.bool(false); 	//is not array
					this.stringArray(Object.keys(object));

					for (var key in object) {
						this.write(object[key]);	
					}
				}
			},
			read: function (object) {
				var is_array = this.bool();
				var keys;
				var n;

				if (is_array) {
					n = this.uint32();
					object = object || new Array(n);

					for (var i = 0; i < n; ++ i) {
						object[i] = this.read();	
					}
				}
				else {
					object = object || {};
					keys = this.stringArray();

					for (var i = 0; i < keys.length; ++ i) {
						object[keys[i]] = this.read();
					}
				}

				return object;
			}
		},

		"Function": {
			write: function (fn) {
				this.string(fn.toString());
			},
			read: function () {
				var str = this.string();
				eval("var fn = " + str + ";");
				return fn;
			}
		},
		"MathType": {
			members: {
				"pData": "Float32Array"	
			}
		},
		"Mat4": "MathType",
		"Vec4": "MathType",
		"Vec3": "MathType",
		"Vec2": "MathType",
		"Quat4": "MathType",
		
		"Number": "Float32",
		"Float"	: "Float32",
		"Int"	: "Int32",
		"Uint"	: "Uint32",
		"Array"	: "Object"
	});
}

#endif
