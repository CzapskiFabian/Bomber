module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 147);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(24);
var hide = __webpack_require__(12);
var redefine = __webpack_require__(13);
var ctx = __webpack_require__(19);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(57)('wks');
var uid = __webpack_require__(35);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(108);
var toPrimitive = __webpack_require__(25);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(27);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(26);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var S2Point_1 = __webpack_require__(22);
var decimal_1 = __webpack_require__(23);
var S2Metric_1 = __webpack_require__(361);
exports.S2Metric = S2Metric_1.S2Metric;
var Long = __webpack_require__(49);
var S2 = (function () {
    function S2() {
    }
    S2.IEEEremainder = function (_f1, _f2) {
        var f1 = S2.toDecimal(_f1);
        var f2 = S2.toDecimal(_f2);
        var r = f1.mod(f2);
        if (r.isNaN() || r.eq(f2) || r.lessThanOrEqualTo(f2.abs().dividedBy(2))) {
            return r;
        }
        else {
            return (f1.gte(0) ? S2.toDecimal(1) : S2.toDecimal(-1)).times(r.minus(f2));
        }
    };
    /**
     * Return true if the given point is approximately unit length (this is mainly
     * useful for assertions).
     */
    S2.isUnitLength = function (p) {
        return p.norm2().minus(1).abs().lte(1e-15);
    };
    /**
     * If v is non-zero, return an integer {@code exp} such that
     * {@code (0.5 <= |v|*2^(-exp) < 1)}. If v is zero, return 0.
     *
     * <p>Note that this arguably a bad definition of exponent because it makes
     * {@code exp(9) == 4}. In decimal this would be like saying that the
     * exponent of 1234 is 4, when in scientific 'exponent' notation 1234 is
     * {@code 1.234 x 10^3}.
     *
     * TODO(dbeaumont): Replace this with "DoubleUtils.getExponent(v) - 1" ?
     */
    S2.exp = function (v /*double*/) {
        if (v == 0) {
            return 0;
        }
        // IT should always be ((int)log(2,v))+1;
        var start = Math.floor(Math.log(v) / Math.log(2));
        for (var i = start; i < start + 10; i++) {
            var curVal = Math.abs(v) * Math.pow(2, -i);
            if (curVal >= 0.5 && curVal < 1) {
                return i;
            }
        }
        throw new Error('method not written yet');
        // return (int)((S2.EXPONENT_MASK & bits) >> S2.EXPONENT_SHIFT) - 1022;
    };
    /**
     * Return a vector "c" that is orthogonal to the given unit-length vectors "a"
     * and "b". This function is similar to a.CrossProd(b) except that it does a
     * better job of ensuring orthogonality when "a" is nearly parallel to "b",
     * and it returns a non-zero result even when a == b or a == -b.
     *
     *  It satisfies the following properties (RCP == RobustCrossProd):
     *
     *  (1) RCP(a,b) != 0 for all a, b (2) RCP(b,a) == -RCP(a,b) unless a == b or
     * a == -b (3) RCP(-a,b) == -RCP(a,b) unless a == b or a == -b (4) RCP(a,-b)
     * == -RCP(a,b) unless a == b or a == -b
     */
    S2.robustCrossProd = function (a, b) {
        // The direction of a.CrossProd(b) becomes unstable as (a + b) or (a - b)
        // approaches zero. This leads to situations where a.CrossProd(b) is not
        // very orthogonal to "a" and/or "b". We could fix this using Gram-Schmidt,
        // but we also want b.RobustCrossProd(a) == -b.RobustCrossProd(a).
        //
        // The easiest fix is to just compute the cross product of (b+a) and (b-a).
        // Given that "a" and "b" are unit-length, this has good orthogonality to
        // "a" and "b" even if they differ only in the lowest bit of one component.
        // assert (isUnitLength(a) && isUnitLength(b));
        var x = S2Point_1.S2Point.crossProd(S2Point_1.S2Point.add(b, a), S2Point_1.S2Point.sub(b, a));
        if (!x.equals(new S2Point_1.S2Point(0, 0, 0))) {
            return x;
        }
        // The only result that makes sense mathematically is to return zero, but
        // we find it more convenient to return an arbitrary orthogonal vector.
        return a.ortho();
    };
    /**
     * Return the area of triangle ABC. The method used is about twice as
     * expensive as Girard's formula, but it is numerically stable for both large
     * and very small triangles. The points do not need to be normalized. The area
     * is always positive.
     *
     *  The triangle area is undefined if it contains two antipodal points, and
     * becomes numerically unstable as the length of any edge approaches 180
     * degrees.
     */
    S2.area = function (a, b, c) {
        // This method is based on l'Huilier's theorem,
        //
        // tan(E/4) = sqrt(tan(s/2) tan((s-a)/2) tan((s-b)/2) tan((s-c)/2))
        //
        // where E is the spherical excess of the triangle (i.e. its area),
        // a, b, c, are the side lengths, and
        // s is the semiperimeter (a + b + c) / 2 .
        //
        // The only significant source of error using l'Huilier's method is the
        // cancellation error of the terms (s-a), (s-b), (s-c). This leads to a
        // *relative* error of about 1e-16 * s / min(s-a, s-b, s-c). This compares
        // to a relative error of about 1e-15 / E using Girard's formula, where E is
        // the true area of the triangle. Girard's formula can be even worse than
        // this for very small triangles, e.g. a triangle with a true area of 1e-30
        // might evaluate to 1e-5.
        //
        // So, we prefer l'Huilier's formula unless dmin < s * (0.1 * E), where
        // dmin = min(s-a, s-b, s-c). This basically includes all triangles
        // except for extremely long and skinny ones.
        //
        // Since we don't know E, we would like a conservative upper bound on
        // the triangle area in terms of s and dmin. It's possible to show that
        // E <= k1 * s * sqrt(s * dmin), where k1 = 2*sqrt(3)/Pi (about 1).
        // Using this, it's easy to show that we should always use l'Huilier's
        // method if dmin >= k2 * s^5, where k2 is about 1e-2. Furthermore,
        // if dmin < k2 * s^5, the triangle area is at most k3 * s^4, where
        // k3 is about 0.1. Since the best case error using Girard's formula
        // is about 1e-15, this means that we shouldn't even consider it unless
        // s >= 3e-4 or so.
        // We use volatile doubles to force the compiler to truncate all of these
        // quantities to 64 bits. Otherwise it may compute a value of dmin > 0
        // simply because it chose to spill one of the intermediate values to
        // memory but not one of the others.
        var sa = b.angle(c);
        var sb = c.angle(a);
        var sc = a.angle(b);
        var s = sa.plus(sb).plus(sc).times(0.5);
        // 0.5 * (sa + sb + sc);
        if (s.gte(3e-4)) {
            // Consider whether Girard's formula might be more accurate.
            var s2 = s.pow(2);
            var dmin = s.minus(decimal_1.Decimal.max(sa, sb, sc));
            if (dmin.lt(s2.pow(2).times(s).times(1e-2))) {
                // This triangle is skinny enough to consider Girard's formula.
                var area = S2.girardArea(a, b, c);
                if (dmin.lt(s.times(area.times(0.1)))) {
                    return area;
                }
            }
        }
        // Use l'Huilier's formula.
        return S2.toDecimal(4)
            .times(decimal_1.Decimal.atan(decimal_1.Decimal.sqrt(decimal_1.Decimal.max(0.0, decimal_1.Decimal.tan(s.times(0.5))
            .times(decimal_1.Decimal.tan(s.minus(sa).times(0.5)))
            .times(decimal_1.Decimal.tan(s.minus(sb).times(0.5)))
            .times(decimal_1.Decimal.tan(s.minus(sc).times(0.5)))))));
    };
    /**
     * Return the area of the triangle computed using Girard's formula. This is
     * slightly faster than the Area() method above is not accurate for very small
     * triangles.
     */
    S2.girardArea = function (a, b, c) {
        // This is equivalent to the usual Girard's formula but is slightly
        // more accurate, faster to compute, and handles a == b == c without
        // a special case.
        var ab = S2Point_1.S2Point.crossProd(a, b);
        var bc = S2Point_1.S2Point.crossProd(b, c);
        var ac = S2Point_1.S2Point.crossProd(a, c);
        return decimal_1.Decimal.max(0, ab.angle(ac)
            .minus(ab.angle(bc))
            .plus(bc.angle(ac)));
    };
    S2.toDecimal = function (value) {
        if (typeof (value) === 'number' || typeof (value) === 'string') {
            return new decimal_1.Decimal(value);
        }
        return value;
    };
    /**
     * Return true if the points A, B, C are strictly counterclockwise. Return
     * false if the points are clockwise or colinear (i.e. if they are all
     * contained on some great circle).
     *
     *  Due to numerical errors, situations may arise that are mathematically
     * impossible, e.g. ABC may be considered strictly CCW while BCA is not.
     * However, the implementation guarantees the following:
     *
     *  If SimpleCCW(a,b,c), then !SimpleCCW(c,b,a) for all a,b,c.
     *
     * In other words, ABC and CBA are guaranteed not to be both CCW
     */
    S2.simpleCCW = function (a, b, c) {
        // We compute the signed volume of the parallelepiped ABC. The usual
        // formula for this is (AxB).C, but we compute it here using (CxA).B
        // in order to ensure that ABC and CBA are not both CCW. This follows
        // from the following identities (which are true numerically, not just
        // mathematically):
        //
        // (1) x.CrossProd(y) == -(y.CrossProd(x))
        // (2) (-x).DotProd(y) == -(x.DotProd(y))
        return S2Point_1.S2Point.crossProd(c, a).dotProd(b).gt(0);
    };
    /**
     *
     * Return true if edge AB crosses CD at a point that is interior to both
     * edges. Properties:
     *
     *  (1) SimpleCrossing(b,a,c,d) == SimpleCrossing(a,b,c,d) (2)
     * SimpleCrossing(c,d,a,b) == SimpleCrossing(a,b,c,d)
     */
    S2.simpleCrossing = function (a, b, c, d) {
        // We compute SimpleCCW() for triangles ACB, CBD, BDA, and DAC. All
        // of these triangles need to have the same orientation (CW or CCW)
        // for an intersection to exist. Note that this is slightly more
        // restrictive than the corresponding definition for planar edges,
        // since we need to exclude pairs of line segments that would
        // otherwise "intersect" by crossing two antipodal points.
        var ab = S2Point_1.S2Point.crossProd(a, b);
        var cd = S2Point_1.S2Point.crossProd(c, d);
        var acb = ab.dotProd(c).neg();
        var cbd = cd.dotProd(b).neg();
        var bda = ab.dotProd(d);
        var dac = cd.dotProd(a);
        return (acb.times(cbd).gt(0)) && (cbd.times(bda).gt(0)) && (bda.times(dac).gt(0));
    };
    S2.M_PI = Math.PI;
    S2.M_1_PI = 1.0 / Math.PI;
    S2.M_PI_2 = Math.PI / 2.0;
    S2.M_PI_4 = Math.PI / 4.0;
    S2.M_SQRT2 = Math.sqrt(2);
    S2.M_E = Math.E;
    // the axis directions are reversed).
    S2.SWAP_MASK = 0x01;
    S2.INVERT_MASK = 0x02;
    // Number of bits in the mantissa of a double.
    S2.EXPONENT_SHIFT = 52;
    // Mask to extract the exponent from a double.
    S2.EXPONENT_MASK = Long.fromString('0x7ff0000000000000', true, 16);
    /** Mapping from cell orientation + Hilbert traversal to IJ-index. */
    S2.POS_TO_ORIENTATION = [S2.SWAP_MASK, 0, 0, S2.INVERT_MASK + S2.SWAP_MASK];
    S2.POS_TO_IJ = [
        // 0 1 2 3
        [0, 1, 3, 2],
        [0, 2, 3, 1],
        [3, 2, 0, 1],
        [3, 1, 0, 2],
    ];
    S2.MAX_LEVEL = 30;
    S2.Metric = S2Metric_1.S2Metric;
    return S2;
}());
exports.S2 = S2;
//# sourceMappingURL=S2.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(34);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var has = __webpack_require__(15);
var SRC = __webpack_require__(35)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(24).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(26);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(50);
var defined = __webpack_require__(26);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(51);
var createDesc = __webpack_require__(34);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(25);
var has = __webpack_require__(15);
var IE8_DOM_DEFINE = __webpack_require__(108);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(15);
var toObject = __webpack_require__(9);
var IE_PROTO = __webpack_require__(79)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(11);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright 2006 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var R2Vector_1 = __webpack_require__(54);
var Decimal = __webpack_require__(144);
var S2_1 = __webpack_require__(10);
///re
/**
 * An S2Point represents a point on the unit sphere as a 3D vector. Usually
 * points are normalized to be unit length, but some methods do not require
 * this.
 *
 */
var S2Point = (function () {
    function S2Point(x, y, z) {
        this.x = new Decimal(x);
        this.y = new Decimal(y);
        this.z = new Decimal(z);
        // this.y = typeof(y) === 'number'?new decimal.Decimal(y):y as decimal.Decimal;
        // this.z = typeof(z) === 'number'?new decimal.Decimal(z):z as decimal.Decimal;
    }
    S2Point.minus = function (p1, p2) {
        return S2Point.sub(p1, p2);
    };
    S2Point.neg = function (p) {
        return new S2Point(p.x.negated(), p.y.negated(), p.z.negated());
    };
    S2Point.prototype.norm2 = function () {
        return this.x.pow(2).plus(this.y.pow(2)).plus(this.z.pow(2));
    };
    S2Point.prototype.norm = function () {
        return this.norm2().sqrt();
    };
    S2Point.crossProd = function (p1, p2) {
        return new S2Point(p1.y.times(p2.z).minus(p1.z.times(p2.y)), p1.z.times(p2.x).minus(p1.x.times(p2.z)), 
        // p1.z * p2.x - p1.x * p2.z,
        p1.x.times(p2.y).minus(p1.y.times(p2.x)));
    };
    S2Point.add = function (p1, p2) {
        return new S2Point(p1.x.add(p2.x), p1.y.add(p2.y), p1.z.add(p2.z));
    };
    S2Point.sub = function (p1, p2) {
        return new S2Point(p1.x.sub(p2.x), p1.y.sub(p2.y), p1.z.sub(p2.z));
    };
    S2Point.prototype.dotProd = function (that) {
        return this.x.times(that.x).plus(this.y.times(that.y)).plus(this.z.times(that.z));
    };
    S2Point.mul = function (p, m) {
        var mD = new Decimal(m);
        return new S2Point(mD.times(p.x), mD.times(p.y), mD.times(p.z));
    };
    S2Point.div = function (p, m) {
        return new S2Point(p.x.div(m), p.y.div(m), p.z.div(m));
    };
    /** return a vector orthogonal to this one */
    S2Point.prototype.ortho = function () {
        var k = this.largestAbsComponent();
        var temp;
        if (k == 1) {
            temp = new S2Point(1, 0, 0);
        }
        else if (k == 2) {
            temp = new S2Point(0, 1, 0);
        }
        else {
            temp = new S2Point(0, 0, 1);
        }
        return S2Point.normalize(S2Point.crossProd(this, temp));
    };
    /** Return the index of the largest component fabs */
    S2Point.prototype.largestAbsComponent = function () {
        var temp = S2Point.fabs(this);
        if (temp.x.greaterThan(temp.y)) {
            if (temp.x.greaterThan(temp.z)) {
                return 0;
            }
            else {
                return 2;
            }
        }
        else {
            if (temp.y.greaterThan(temp.z)) {
                return 1;
            }
            else {
                return 2;
            }
        }
    };
    S2Point.fabs = function (p) {
        return new S2Point(p.x.abs(), p.y.abs(), p.z.abs());
    };
    S2Point.normalize = function (p) {
        var norm = p.norm();
        if (!norm.eq(0)) {
            norm = S2_1.S2.toDecimal(1).dividedBy(norm);
        }
        return S2Point.mul(p, norm);
    };
    S2Point.prototype.axis = function (axis) {
        return (axis == 0) ? this.x : (axis == 1) ? this.y : this.z;
    };
    /** Return the angle between two vectors in radians */
    S2Point.prototype.angle = function (va) {
        return Decimal.atan2(S2Point.crossProd(this, va).norm(), this.dotProd(va));
    };
    /**
     * Compare two vectors, return true if all their components are within a
     * difference of margin.
     */
    S2Point.prototype.aequal = function (that, margin) {
        return this.x.minus(that.x).abs().lessThan(margin) &&
            this.y.minus(that.y).abs().lessThan(margin) &&
            this.z.minus(that.z).abs().lessThan(margin);
    };
    S2Point.prototype.equals = function (that) {
        if (!(that instanceof S2Point)) {
            return false;
        }
        return this.x.eq(that.x) && this.y.eq(that.y) && this.z.eq(that.z);
    };
    S2Point.prototype.lessThan = function (vb) {
        if (this.x.lt(vb.x)) {
            return true;
        }
        if (vb.x.lt(this.x)) {
            return false;
        }
        if (this.y.lt(vb.y)) {
            return true;
        }
        if (vb.y.lt(this.y)) {
            return false;
        }
        if (this.z.lt(vb.z)) {
            return true;
        }
        return false;
    };
    S2Point.prototype.compareTo = function (other) {
        return (this.lessThan(other) ? -1 : (this.equals(other) ? 0 : 1));
    };
    S2Point.prototype.toFace = function () {
        var face = this.largestAbsComponent();
        if (this.axis(face).lt(0)) {
            face += 3;
        }
        return face;
    };
    S2Point.prototype.toR2Vector = function (face) {
        if (face === void 0) { face = this.toFace(); }
        var u;
        var v;
        switch (face) {
            case 0:
                u = this.y.div(this.x);
                v = this.z.div(this.x);
                break;
            case 1:
                u = this.x.neg().div(this.y);
                v = this.z.div(this.y);
                break;
            case 2:
                u = this.x.neg().div(this.z);
                v = this.y.neg().div(this.z);
                break;
            case 3:
                u = this.z.div(this.x);
                v = this.y.div(this.x);
                break;
            case 4:
                u = this.z.div(this.y);
                v = this.x.neg().div(this.y);
                break;
            case 5:
                u = this.y.neg().div(this.z);
                v = this.x.neg().div(this.z);
                break;
            default:
                throw new Error('Invalid face');
        }
        return new R2Vector_1.R2Vector(u, v);
    };
    S2Point.prototype.toString = function () {
        return "Point(" + this.x.toNumber() + ", " + this.y.toNumber() + ", " + this.z.toNumber() + ")";
    };
    return S2Point;
}());
exports.S2Point = S2Point;
//# sourceMappingURL=S2Point.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(360);
exports.Decimal = __webpack_require__(144);
//# sourceMappingURL=decimal.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.4' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(24);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(19);
var IObject = __webpack_require__(50);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var asc = __webpack_require__(96);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(6)) {
  var LIBRARY = __webpack_require__(36);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(67);
  var $buffer = __webpack_require__(102);
  var ctx = __webpack_require__(19);
  var anInstance = __webpack_require__(42);
  var propertyDesc = __webpack_require__(34);
  var hide = __webpack_require__(12);
  var redefineAll = __webpack_require__(44);
  var toInteger = __webpack_require__(27);
  var toLength = __webpack_require__(8);
  var toIndex = __webpack_require__(134);
  var toAbsoluteIndex = __webpack_require__(38);
  var toPrimitive = __webpack_require__(25);
  var has = __webpack_require__(15);
  var classof = __webpack_require__(52);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(9);
  var isArrayIter = __webpack_require__(93);
  var create = __webpack_require__(39);
  var getPrototypeOf = __webpack_require__(18);
  var gOPN = __webpack_require__(40).f;
  var getIterFn = __webpack_require__(95);
  var uid = __webpack_require__(35);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(29);
  var createArrayIncludes = __webpack_require__(58);
  var speciesConstructor = __webpack_require__(65);
  var ArrayIterators = __webpack_require__(98);
  var Iterators = __webpack_require__(47);
  var $iterDetect = __webpack_require__(62);
  var setSpecies = __webpack_require__(41);
  var arrayFill = __webpack_require__(97);
  var arrayCopyWithin = __webpack_require__(124);
  var $DP = __webpack_require__(7);
  var $GOPD = __webpack_require__(17);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(129);
var $export = __webpack_require__(0);
var shared = __webpack_require__(57)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(132))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(35)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(15);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(12)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(110);
var enumBugKeys = __webpack_require__(80);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(27);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(111);
var enumBugKeys = __webpack_require__(80);
var IE_PROTO = __webpack_require__(79)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(77)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(81).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(110);
var hiddenKeys = __webpack_require__(80).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var dP = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(19);
var call = __webpack_require__(122);
var isArrayIter = __webpack_require__(93);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(8);
var getIterFn = __webpack_require__(95);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(13);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(15);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(26);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(83);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>
 Copyright 2009 The Closure Library Authors. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS-IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/long.js for details
 */
(function(global, factory) {

    /* AMD */ if (true)
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    /* CommonJS */ else if (typeof require === 'function' && typeof module === "object" && module && module["exports"])
        module["exports"] = factory();
    /* Global */ else
        (global["dcodeIO"] = global["dcodeIO"] || {})["Long"] = factory();

})(this, function() {
    "use strict";

    /**
     * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
     *  See the from* functions below for more convenient ways of constructing Longs.
     * @exports Long
     * @class A Long class for representing a 64 bit two's-complement integer value.
     * @param {number} low The low (signed) 32 bits of the long
     * @param {number} high The high (signed) 32 bits of the long
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @constructor
     */
    function Long(low, high, unsigned) {

        /**
         * The low 32 bits as a signed value.
         * @type {number}
         */
        this.low = low | 0;

        /**
         * The high 32 bits as a signed value.
         * @type {number}
         */
        this.high = high | 0;

        /**
         * Whether unsigned or not.
         * @type {boolean}
         */
        this.unsigned = !!unsigned;
    }

    // The internal representation of a long is the two given signed, 32-bit values.
    // We use 32-bit pieces because these are the size of integers on which
    // Javascript performs bit-operations.  For operations like addition and
    // multiplication, we split each number into 16 bit pieces, which can easily be
    // multiplied within Javascript's floating-point representation without overflow
    // or change in sign.
    //
    // In the algorithms below, we frequently reduce the negative case to the
    // positive case by negating the input(s) and then post-processing the result.
    // Note that we must ALWAYS check specially whether those values are MIN_VALUE
    // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
    // a positive number, it overflows back into a negative).  Not handling this
    // case would often result in infinite recursion.
    //
    // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
    // methods on which they depend.

    /**
     * An indicator used to reliably determine if an object is a Long or not.
     * @type {boolean}
     * @const
     * @private
     */
    Long.prototype.__isLong__;

    Object.defineProperty(Long.prototype, "__isLong__", {
        value: true,
        enumerable: false,
        configurable: false
    });

    /**
     * @function
     * @param {*} obj Object
     * @returns {boolean}
     * @inner
     */
    function isLong(obj) {
        return (obj && obj["__isLong__"]) === true;
    }

    /**
     * Tests if the specified object is a Long.
     * @function
     * @param {*} obj Object
     * @returns {boolean}
     */
    Long.isLong = isLong;

    /**
     * A cache of the Long representations of small integer values.
     * @type {!Object}
     * @inner
     */
    var INT_CACHE = {};

    /**
     * A cache of the Long representations of small unsigned integer values.
     * @type {!Object}
     * @inner
     */
    var UINT_CACHE = {};

    /**
     * @param {number} value
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */
    function fromInt(value, unsigned) {
        var obj, cachedObj, cache;
        if (unsigned) {
            value >>>= 0;
            if (cache = (0 <= value && value < 256)) {
                cachedObj = UINT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
            if (cache)
                UINT_CACHE[value] = obj;
            return obj;
        } else {
            value |= 0;
            if (cache = (-128 <= value && value < 128)) {
                cachedObj = INT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = fromBits(value, value < 0 ? -1 : 0, false);
            if (cache)
                INT_CACHE[value] = obj;
            return obj;
        }
    }

    /**
     * Returns a Long representing the given 32 bit integer value.
     * @function
     * @param {number} value The 32 bit integer in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     */
    Long.fromInt = fromInt;

    /**
     * @param {number} value
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */
    function fromNumber(value, unsigned) {
        if (isNaN(value) || !isFinite(value))
            return unsigned ? UZERO : ZERO;
        if (unsigned) {
            if (value < 0)
                return UZERO;
            if (value >= TWO_PWR_64_DBL)
                return MAX_UNSIGNED_VALUE;
        } else {
            if (value <= -TWO_PWR_63_DBL)
                return MIN_VALUE;
            if (value + 1 >= TWO_PWR_63_DBL)
                return MAX_VALUE;
        }
        if (value < 0)
            return fromNumber(-value, unsigned).neg();
        return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
    }

    /**
     * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
     * @function
     * @param {number} value The number in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     */
    Long.fromNumber = fromNumber;

    /**
     * @param {number} lowBits
     * @param {number} highBits
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */
    function fromBits(lowBits, highBits, unsigned) {
        return new Long(lowBits, highBits, unsigned);
    }

    /**
     * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
     *  assumed to use 32 bits.
     * @function
     * @param {number} lowBits The low 32 bits
     * @param {number} highBits The high 32 bits
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     */
    Long.fromBits = fromBits;

    /**
     * @function
     * @param {number} base
     * @param {number} exponent
     * @returns {number}
     * @inner
     */
    var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

    /**
     * @param {string} str
     * @param {(boolean|number)=} unsigned
     * @param {number=} radix
     * @returns {!Long}
     * @inner
     */
    function fromString(str, unsigned, radix) {
        if (str.length === 0)
            throw Error('empty string');
        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
            return ZERO;
        if (typeof unsigned === 'number') {
            // For goog.math.long compatibility
            radix = unsigned,
            unsigned = false;
        } else {
            unsigned = !! unsigned;
        }
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');

        var p;
        if ((p = str.indexOf('-')) > 0)
            throw Error('interior hyphen');
        else if (p === 0) {
            return fromString(str.substring(1), unsigned, radix).neg();
        }

        // Do several (8) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = fromNumber(pow_dbl(radix, 8));

        var result = ZERO;
        for (var i = 0; i < str.length; i += 8) {
            var size = Math.min(8, str.length - i),
                value = parseInt(str.substring(i, i + size), radix);
            if (size < 8) {
                var power = fromNumber(pow_dbl(radix, size));
                result = result.mul(power).add(fromNumber(value));
            } else {
                result = result.mul(radixToPower);
                result = result.add(fromNumber(value));
            }
        }
        result.unsigned = unsigned;
        return result;
    }

    /**
     * Returns a Long representation of the given string, written using the specified radix.
     * @function
     * @param {string} str The textual representation of the Long
     * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
     * @returns {!Long} The corresponding Long value
     */
    Long.fromString = fromString;

    /**
     * @function
     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
     * @returns {!Long}
     * @inner
     */
    function fromValue(val) {
        if (val /* is compatible */ instanceof Long)
            return val;
        if (typeof val === 'number')
            return fromNumber(val);
        if (typeof val === 'string')
            return fromString(val);
        // Throws for non-objects, converts non-instanceof Long:
        return fromBits(val.low, val.high, val.unsigned);
    }

    /**
     * Converts the specified value to a Long.
     * @function
     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
     * @returns {!Long}
     */
    Long.fromValue = fromValue;

    // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
    // no runtime penalty for these.

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_16_DBL = 1 << 16;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_24_DBL = 1 << 24;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

    /**
     * @type {!Long}
     * @const
     * @inner
     */
    var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

    /**
     * @type {!Long}
     * @inner
     */
    var ZERO = fromInt(0);

    /**
     * Signed zero.
     * @type {!Long}
     */
    Long.ZERO = ZERO;

    /**
     * @type {!Long}
     * @inner
     */
    var UZERO = fromInt(0, true);

    /**
     * Unsigned zero.
     * @type {!Long}
     */
    Long.UZERO = UZERO;

    /**
     * @type {!Long}
     * @inner
     */
    var ONE = fromInt(1);

    /**
     * Signed one.
     * @type {!Long}
     */
    Long.ONE = ONE;

    /**
     * @type {!Long}
     * @inner
     */
    var UONE = fromInt(1, true);

    /**
     * Unsigned one.
     * @type {!Long}
     */
    Long.UONE = UONE;

    /**
     * @type {!Long}
     * @inner
     */
    var NEG_ONE = fromInt(-1);

    /**
     * Signed negative one.
     * @type {!Long}
     */
    Long.NEG_ONE = NEG_ONE;

    /**
     * @type {!Long}
     * @inner
     */
    var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

    /**
     * Maximum signed value.
     * @type {!Long}
     */
    Long.MAX_VALUE = MAX_VALUE;

    /**
     * @type {!Long}
     * @inner
     */
    var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

    /**
     * Maximum unsigned value.
     * @type {!Long}
     */
    Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

    /**
     * @type {!Long}
     * @inner
     */
    var MIN_VALUE = fromBits(0, 0x80000000|0, false);

    /**
     * Minimum signed value.
     * @type {!Long}
     */
    Long.MIN_VALUE = MIN_VALUE;

    /**
     * @alias Long.prototype
     * @inner
     */
    var LongPrototype = Long.prototype;

    /**
     * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
     * @returns {number}
     */
    LongPrototype.toInt = function toInt() {
        return this.unsigned ? this.low >>> 0 : this.low;
    };

    /**
     * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
     * @returns {number}
     */
    LongPrototype.toNumber = function toNumber() {
        if (this.unsigned)
            return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
    };

    /**
     * Converts the Long to a string written in the specified radix.
     * @param {number=} radix Radix (2-36), defaults to 10
     * @returns {string}
     * @override
     * @throws {RangeError} If `radix` is out of range
     */
    LongPrototype.toString = function toString(radix) {
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');
        if (this.isZero())
            return '0';
        if (this.isNegative()) { // Unsigned Longs are never negative
            if (this.eq(MIN_VALUE)) {
                // We need to change the Long value before it can be negated, so we remove
                // the bottom-most digit in this base and then recurse to do the rest.
                var radixLong = fromNumber(radix),
                    div = this.div(radixLong),
                    rem1 = div.mul(radixLong).sub(this);
                return div.toString(radix) + rem1.toInt().toString(radix);
            } else
                return '-' + this.neg().toString(radix);
        }

        // Do several (6) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
            rem = this;
        var result = '';
        while (true) {
            var remDiv = rem.div(radixToPower),
                intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
                digits = intval.toString(radix);
            rem = remDiv;
            if (rem.isZero())
                return digits + result;
            else {
                while (digits.length < 6)
                    digits = '0' + digits;
                result = '' + digits + result;
            }
        }
    };

    /**
     * Gets the high 32 bits as a signed integer.
     * @returns {number} Signed high bits
     */
    LongPrototype.getHighBits = function getHighBits() {
        return this.high;
    };

    /**
     * Gets the high 32 bits as an unsigned integer.
     * @returns {number} Unsigned high bits
     */
    LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
        return this.high >>> 0;
    };

    /**
     * Gets the low 32 bits as a signed integer.
     * @returns {number} Signed low bits
     */
    LongPrototype.getLowBits = function getLowBits() {
        return this.low;
    };

    /**
     * Gets the low 32 bits as an unsigned integer.
     * @returns {number} Unsigned low bits
     */
    LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
        return this.low >>> 0;
    };

    /**
     * Gets the number of bits needed to represent the absolute value of this Long.
     * @returns {number}
     */
    LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
        if (this.isNegative()) // Unsigned Longs are never negative
            return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        var val = this.high != 0 ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--)
            if ((val & (1 << bit)) != 0)
                break;
        return this.high != 0 ? bit + 33 : bit + 1;
    };

    /**
     * Tests if this Long's value equals zero.
     * @returns {boolean}
     */
    LongPrototype.isZero = function isZero() {
        return this.high === 0 && this.low === 0;
    };

    /**
     * Tests if this Long's value is negative.
     * @returns {boolean}
     */
    LongPrototype.isNegative = function isNegative() {
        return !this.unsigned && this.high < 0;
    };

    /**
     * Tests if this Long's value is positive.
     * @returns {boolean}
     */
    LongPrototype.isPositive = function isPositive() {
        return this.unsigned || this.high >= 0;
    };

    /**
     * Tests if this Long's value is odd.
     * @returns {boolean}
     */
    LongPrototype.isOdd = function isOdd() {
        return (this.low & 1) === 1;
    };

    /**
     * Tests if this Long's value is even.
     * @returns {boolean}
     */
    LongPrototype.isEven = function isEven() {
        return (this.low & 1) === 0;
    };

    /**
     * Tests if this Long's value equals the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.equals = function equals(other) {
        if (!isLong(other))
            other = fromValue(other);
        if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
            return false;
        return this.high === other.high && this.low === other.low;
    };

    /**
     * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.eq = LongPrototype.equals;

    /**
     * Tests if this Long's value differs from the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.notEquals = function notEquals(other) {
        return !this.eq(/* validates */ other);
    };

    /**
     * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.neq = LongPrototype.notEquals;

    /**
     * Tests if this Long's value is less than the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.lessThan = function lessThan(other) {
        return this.comp(/* validates */ other) < 0;
    };

    /**
     * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.lt = LongPrototype.lessThan;

    /**
     * Tests if this Long's value is less than or equal the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
        return this.comp(/* validates */ other) <= 0;
    };

    /**
     * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.lte = LongPrototype.lessThanOrEqual;

    /**
     * Tests if this Long's value is greater than the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.greaterThan = function greaterThan(other) {
        return this.comp(/* validates */ other) > 0;
    };

    /**
     * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.gt = LongPrototype.greaterThan;

    /**
     * Tests if this Long's value is greater than or equal the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
        return this.comp(/* validates */ other) >= 0;
    };

    /**
     * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.gte = LongPrototype.greaterThanOrEqual;

    /**
     * Compares this Long's value with the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
     *  if the given one is greater
     */
    LongPrototype.compare = function compare(other) {
        if (!isLong(other))
            other = fromValue(other);
        if (this.eq(other))
            return 0;
        var thisNeg = this.isNegative(),
            otherNeg = other.isNegative();
        if (thisNeg && !otherNeg)
            return -1;
        if (!thisNeg && otherNeg)
            return 1;
        // At this point the sign bits are the same
        if (!this.unsigned)
            return this.sub(other).isNegative() ? -1 : 1;
        // Both are positive if at least one is unsigned
        return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
    };

    /**
     * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
     *  if the given one is greater
     */
    LongPrototype.comp = LongPrototype.compare;

    /**
     * Negates this Long's value.
     * @returns {!Long} Negated Long
     */
    LongPrototype.negate = function negate() {
        if (!this.unsigned && this.eq(MIN_VALUE))
            return MIN_VALUE;
        return this.not().add(ONE);
    };

    /**
     * Negates this Long's value. This is an alias of {@link Long#negate}.
     * @function
     * @returns {!Long} Negated Long
     */
    LongPrototype.neg = LongPrototype.negate;

    /**
     * Returns the sum of this and the specified Long.
     * @param {!Long|number|string} addend Addend
     * @returns {!Long} Sum
     */
    LongPrototype.add = function add(addend) {
        if (!isLong(addend))
            addend = fromValue(addend);

        // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = addend.high >>> 16;
        var b32 = addend.high & 0xFFFF;
        var b16 = addend.low >>> 16;
        var b00 = addend.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 + b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };

    /**
     * Returns the difference of this and the specified Long.
     * @param {!Long|number|string} subtrahend Subtrahend
     * @returns {!Long} Difference
     */
    LongPrototype.subtract = function subtract(subtrahend) {
        if (!isLong(subtrahend))
            subtrahend = fromValue(subtrahend);
        return this.add(subtrahend.neg());
    };

    /**
     * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
     * @function
     * @param {!Long|number|string} subtrahend Subtrahend
     * @returns {!Long} Difference
     */
    LongPrototype.sub = LongPrototype.subtract;

    /**
     * Returns the product of this and the specified Long.
     * @param {!Long|number|string} multiplier Multiplier
     * @returns {!Long} Product
     */
    LongPrototype.multiply = function multiply(multiplier) {
        if (this.isZero())
            return ZERO;
        if (!isLong(multiplier))
            multiplier = fromValue(multiplier);
        if (multiplier.isZero())
            return ZERO;
        if (this.eq(MIN_VALUE))
            return multiplier.isOdd() ? MIN_VALUE : ZERO;
        if (multiplier.eq(MIN_VALUE))
            return this.isOdd() ? MIN_VALUE : ZERO;

        if (this.isNegative()) {
            if (multiplier.isNegative())
                return this.neg().mul(multiplier.neg());
            else
                return this.neg().mul(multiplier).neg();
        } else if (multiplier.isNegative())
            return this.mul(multiplier.neg()).neg();

        // If both longs are small, use float multiplication
        if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
            return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

        // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
        // We can skip products that would overflow.

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = multiplier.high >>> 16;
        var b32 = multiplier.high & 0xFFFF;
        var b16 = multiplier.low >>> 16;
        var b00 = multiplier.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };

    /**
     * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
     * @function
     * @param {!Long|number|string} multiplier Multiplier
     * @returns {!Long} Product
     */
    LongPrototype.mul = LongPrototype.multiply;

    /**
     * Returns this Long divided by the specified. The result is signed if this Long is signed or
     *  unsigned if this Long is unsigned.
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Quotient
     */
    LongPrototype.divide = function divide(divisor) {
        if (!isLong(divisor))
            divisor = fromValue(divisor);
        if (divisor.isZero())
            throw Error('division by zero');
        if (this.isZero())
            return this.unsigned ? UZERO : ZERO;
        var approx, rem, res;
        if (!this.unsigned) {
            // This section is only relevant for signed longs and is derived from the
            // closure library as a whole.
            if (this.eq(MIN_VALUE)) {
                if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                    return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
                else if (divisor.eq(MIN_VALUE))
                    return ONE;
                else {
                    // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                    var halfThis = this.shr(1);
                    approx = halfThis.div(divisor).shl(1);
                    if (approx.eq(ZERO)) {
                        return divisor.isNegative() ? ONE : NEG_ONE;
                    } else {
                        rem = this.sub(divisor.mul(approx));
                        res = approx.add(rem.div(divisor));
                        return res;
                    }
                }
            } else if (divisor.eq(MIN_VALUE))
                return this.unsigned ? UZERO : ZERO;
            if (this.isNegative()) {
                if (divisor.isNegative())
                    return this.neg().div(divisor.neg());
                return this.neg().div(divisor).neg();
            } else if (divisor.isNegative())
                return this.div(divisor.neg()).neg();
            res = ZERO;
        } else {
            // The algorithm below has not been made for unsigned longs. It's therefore
            // required to take special care of the MSB prior to running it.
            if (!divisor.unsigned)
                divisor = divisor.toUnsigned();
            if (divisor.gt(this))
                return UZERO;
            if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
                return UONE;
            res = UZERO;
        }

        // Repeat the following until the remainder is less than other:  find a
        // floating-point that approximates remainder / other *from below*, add this
        // into the result, and subtract it from the remainder.  It is critical that
        // the approximate value is less than or equal to the real value so that the
        // remainder never becomes negative.
        rem = this;
        while (rem.gte(divisor)) {
            // Approximate the result of division. This may be a little greater or
            // smaller than the actual value.
            approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

            // We will tweak the approximate result by changing it in the 48-th digit or
            // the smallest non-fractional digit, whichever is larger.
            var log2 = Math.ceil(Math.log(approx) / Math.LN2),
                delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

            // Decrease the approximation until it is smaller than the remainder.  Note
            // that if it is too large, the product overflows and is negative.
                approxRes = fromNumber(approx),
                approxRem = approxRes.mul(divisor);
            while (approxRem.isNegative() || approxRem.gt(rem)) {
                approx -= delta;
                approxRes = fromNumber(approx, this.unsigned);
                approxRem = approxRes.mul(divisor);
            }

            // We know the answer can't be zero... and actually, zero would cause
            // infinite recursion since we would make no progress.
            if (approxRes.isZero())
                approxRes = ONE;

            res = res.add(approxRes);
            rem = rem.sub(approxRem);
        }
        return res;
    };

    /**
     * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
     * @function
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Quotient
     */
    LongPrototype.div = LongPrototype.divide;

    /**
     * Returns this Long modulo the specified.
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Remainder
     */
    LongPrototype.modulo = function modulo(divisor) {
        if (!isLong(divisor))
            divisor = fromValue(divisor);
        return this.sub(this.div(divisor).mul(divisor));
    };

    /**
     * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
     * @function
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Remainder
     */
    LongPrototype.mod = LongPrototype.modulo;

    /**
     * Returns the bitwise NOT of this Long.
     * @returns {!Long}
     */
    LongPrototype.not = function not() {
        return fromBits(~this.low, ~this.high, this.unsigned);
    };

    /**
     * Returns the bitwise AND of this Long and the specified.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     */
    LongPrototype.and = function and(other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
    };

    /**
     * Returns the bitwise OR of this Long and the specified.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     */
    LongPrototype.or = function or(other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
    };

    /**
     * Returns the bitwise XOR of this Long and the given one.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     */
    LongPrototype.xor = function xor(other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
    };

    /**
     * Returns this Long with bits shifted to the left by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shiftLeft = function shiftLeft(numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
        else
            return fromBits(0, this.low << (numBits - 32), this.unsigned);
    };

    /**
     * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shl = LongPrototype.shiftLeft;

    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shiftRight = function shiftRight(numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
        else
            return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
    };

    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shr = LongPrototype.shiftRight;

    /**
     * Returns this Long with bits logically shifted to the right by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        numBits &= 63;
        if (numBits === 0)
            return this;
        else {
            var high = this.high;
            if (numBits < 32) {
                var low = this.low;
                return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
            } else if (numBits === 32)
                return fromBits(high, 0, this.unsigned);
            else
                return fromBits(high >>> (numBits - 32), 0, this.unsigned);
        }
    };

    /**
     * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shru = LongPrototype.shiftRightUnsigned;

    /**
     * Converts this Long to signed.
     * @returns {!Long} Signed long
     */
    LongPrototype.toSigned = function toSigned() {
        if (!this.unsigned)
            return this;
        return fromBits(this.low, this.high, false);
    };

    /**
     * Converts this Long to unsigned.
     * @returns {!Long} Unsigned long
     */
    LongPrototype.toUnsigned = function toUnsigned() {
        if (this.unsigned)
            return this;
        return fromBits(this.low, this.high, true);
    };

    /**
     * Converts this Long to its byte representation.
     * @param {boolean=} le Whether little or big endian, defaults to big endian
     * @returns {!Array.<number>} Byte representation
     */
    LongPrototype.toBytes = function(le) {
        return le ? this.toBytesLE() : this.toBytesBE();
    }

    /**
     * Converts this Long to its little endian byte representation.
     * @returns {!Array.<number>} Little endian byte representation
     */
    LongPrototype.toBytesLE = function() {
        var hi = this.high,
            lo = this.low;
        return [
             lo         & 0xff,
            (lo >>>  8) & 0xff,
            (lo >>> 16) & 0xff,
            (lo >>> 24) & 0xff,
             hi         & 0xff,
            (hi >>>  8) & 0xff,
            (hi >>> 16) & 0xff,
            (hi >>> 24) & 0xff
        ];
    }

    /**
     * Converts this Long to its big endian byte representation.
     * @returns {!Array.<number>} Big endian byte representation
     */
    LongPrototype.toBytesBE = function() {
        var hi = this.high,
            lo = this.low;
        return [
            (hi >>> 24) & 0xff,
            (hi >>> 16) & 0xff,
            (hi >>>  8) & 0xff,
             hi         & 0xff,
            (lo >>> 24) & 0xff,
            (lo >>> 16) & 0xff,
            (lo >>>  8) & 0xff,
             lo         & 0xff
        ];
    }

    return Long;
});


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(20);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(20);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright 2005 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var S2_1 = __webpack_require__(10);
var S2Point_1 = __webpack_require__(22);
var S1Angle_1 = __webpack_require__(55);
var S2LatLngRect_1 = __webpack_require__(72);
var S2LatLng_1 = __webpack_require__(56);
var R1Interval_1 = __webpack_require__(74);
var S1Interval_1 = __webpack_require__(73);
var Long = __webpack_require__(49);
var decimal_1 = __webpack_require__(23);
/**
 * This class represents a spherical cap, i.e. a portion of a sphere cut off by
 * a plane. The cap is defined by its axis and height. This representation has
 * good numerical accuracy for very small caps (unlike the (axis,
 * min-distance-from-origin) representation), and is also efficient for
 * containment tests (unlike the (axis, angle) representation).
 *
 * Here are some useful relationships between the cap height (h), the cap
 * opening angle (theta), the maximum chord length from the cap's center (d),
 * and the radius of cap's base (a). All formulas assume a unit radius.
 *
 * h = 1 - cos(theta) = 2 sin^2(theta/2) d^2 = 2 h = a^2 + h^2
 *
 */
var S2Cap = (function () {
    /**
     * Create a cap given its axis and the cap height, i.e. the maximum projected
     * distance along the cap axis from the cap center. 'axis' should be a
     * unit-length vector.
     */
    function S2Cap(axis, _height) {
        this.axis = axis;
        this.height = S2_1.S2.toDecimal(_height);
        // assert (isValid());
    }
    /**
     * Create a cap given its axis and the cap opening angle, i.e. maximum angle
     * between the axis and a point on the cap. 'axis' should be a unit-length
     * vector, and 'angle' should be between 0 and 180 degrees.
     */
    S2Cap.fromAxisAngle = function (axis, angle) {
        // The height of the cap can be computed as 1-cos(angle), but this isn't
        // very accurate for angles close to zero (where cos(angle) is almost 1).
        // Computing it as 2*(sin(angle/2)**2) gives much better precision.
        // assert (S2.isUnitLength(axis));
        var d = angle.radians.times(0.5).sin();
        // ecimal.sin(0.5 * angle.radians.times(0.5));
        return new S2Cap(axis, d.pow(2).times(2));
    };
    /**
     * Create a cap given its axis and its area in steradians. 'axis' should be a
     * unit-length vector, and 'area' should be between 0 and 4 * M_PI.
     */
    S2Cap.fromAxisArea = function (axis, _area) {
        var area = S2_1.S2.toDecimal(_area);
        // assert (S2.isUnitLength(axis));
        return new S2Cap(axis, area.dividedBy(S2_1.S2.toDecimal(2).times(S2_1.S2.M_PI)));
    };
    /** Return an empty cap, i.e. a cap that contains no points. */
    S2Cap.empty = function () {
        return new S2Cap(new S2Point_1.S2Point(1, 0, 0), -1);
    };
    /** Return a full cap, i.e. a cap that contains all points. */
    S2Cap.full = function () {
        return new S2Cap(new S2Point_1.S2Point(1, 0, 0), 2);
    };
    S2Cap.prototype.getCapBound = function () {
        return this;
    };
    S2Cap.prototype.area = function () {
        return decimal_1.Decimal.max(0, this.height)
            .times(S2_1.S2.M_PI)
            .times(2);
        // return 2 * S2.M_PI * Math.max(0.0, this.height);
    };
    /**
     * Return the cap opening angle in radians, or a negative number for empty
     * caps.
     */
    S2Cap.prototype.angle = function () {
        // This could also be computed as acos(1 - height_), but the following
        // formula is much more accurate when the cap height is small. It
        // follows from the relationship h = 1 - cos(theta) = 2 sin^2(theta/2).
        if (this.isEmpty()) {
            return new S1Angle_1.S1Angle(-1);
        }
        return new S1Angle_1.S1Angle(decimal_1.Decimal.asin(this.height.times(0.5).sqrt())
            .times(2));
    };
    /**
     * We allow negative heights (to represent empty caps) but not heights greater
     * than 2.
     */
    S2Cap.prototype.isValid = function () {
        return S2_1.S2.isUnitLength(this.axis) && this.height.lte(2);
    };
    /** Return true if the cap is empty, i.e. it contains no points. */
    S2Cap.prototype.isEmpty = function () {
        return this.height.lt(0);
    };
    /** Return true if the cap is full, i.e. it contains all points. */
    S2Cap.prototype.isFull = function () {
        return this.height.gte(2);
    };
    /**
     * Return the complement of the interior of the cap. A cap and its complement
     * have the same boundary but do not share any interior points. The complement
     * operator is not a bijection, since the complement of a singleton cap
     * (containing a single point) is the same as the complement of an empty cap.
     */
    S2Cap.prototype.complement = function () {
        // The complement of a full cap is an empty cap, not a singleton.
        // Also make sure that the complement of an empty cap has height 2.
        var cHeight = this.isFull() ? -1 : decimal_1.Decimal.max(this.height, 0).neg().plus(2);
        return new S2Cap(S2Point_1.S2Point.neg(this.axis), cHeight);
    };
    /**
     * Return true if and only if this cap contains the given other cap (in a set
     * containment sense, e.g. every cap contains the empty cap).
     */
    S2Cap.prototype.containsCap = function (other) {
        if (this.isFull() || other.isEmpty()) {
            return true;
        }
        return this.angle().radians.gte(this.axis.angle(other.axis).plus(other.angle().radians));
    };
    /**
     * Return true if and only if the interior of this cap intersects the given
     * other cap. (This relationship is not symmetric, since only the interior of
     * this cap is used.)
     */
    S2Cap.prototype.interiorIntersects = function (other) {
        // Interior(X) intersects Y if and only if Complement(Interior(X))
        // does not contain Y.
        return !this.complement().containsCap(other);
    };
    /**
     * Return true if and only if the given point is contained in the interior of
     * the region (i.e. the region excluding its boundary). 'p' should be a
     * unit-length vector.
     */
    S2Cap.prototype.interiorContains = function (p) {
        // assert (S2.isUnitLength(p));
        return this.isFull() || S2Point_1.S2Point.sub(this.axis, p).norm2().lt(this.height.times(2));
    };
    /**
     * Increase the cap height if necessary to include the given point. If the cap
     * is empty the axis is set to the given point, but otherwise it is left
     * unchanged. 'p' should be a unit-length vector.
     */
    S2Cap.prototype.addPoint = function (p) {
        // Compute the squared chord length, then convert it into a height.
        // assert (S2.isUnitLength(p));
        if (this.isEmpty()) {
            return new S2Cap(p, 0);
        }
        else {
            // To make sure that the resulting cap actually includes this point,
            // we need to round up the distance calculation. That is, after
            // calling cap.AddPoint(p), cap.Contains(p) should be true.
            var dist2 = S2Point_1.S2Point.sub(this.axis, p).norm2();
            var newHeight = decimal_1.Decimal.max(this.height, S2Cap.ROUND_UP.times(0.5).times(dist2));
            return new S2Cap(this.axis, newHeight);
        }
    };
    // Increase the cap height if necessary to include "other". If the current
    // cap is empty it is set to the given other cap.
    S2Cap.prototype.addCap = function (other) {
        if (this.isEmpty()) {
            return new S2Cap(other.axis, other.height);
        }
        else {
            // See comments for FromAxisAngle() and AddPoint(). This could be
            // optimized by doing the calculation in terms of cap heights rather
            // than cap opening angles.
            var angle = this.axis.angle(other.axis).plus(other.angle().radians);
            if (angle.gte(S2_1.S2.M_PI)) {
                return new S2Cap(this.axis, 2); //Full cap
            }
            else {
                var d = angle.times(0.5).sin();
                var newHeight = decimal_1.Decimal.max(this.height, S2Cap.ROUND_UP.times(2).times(d.pow(2)));
                return new S2Cap(this.axis, newHeight);
            }
        }
    };
    // //////////////////////////////////////////////////////////////////////
    // S2Region interface (see {@code S2Region} for details):
    S2Cap.prototype.getRectBound = function () {
        if (this.isEmpty()) {
            return S2LatLngRect_1.S2LatLngRect.empty();
        }
        // Convert the axis to a (lat,lng) pair, and compute the cap angle.
        var axisLatLng = S2LatLng_1.S2LatLng.fromPoint(this.axis);
        var capAngle = this.angle().radians;
        var allLongitudes = false;
        var lat = Array(2);
        var lng = Array(2);
        lng[0] = S2_1.S2.toDecimal(-S2_1.S2.M_PI);
        lng[1] = S2_1.S2.toDecimal(S2_1.S2.M_PI);
        // Check whether cap includes the south pole.
        lat[0] = axisLatLng.latRadians.minus(capAngle);
        if (lat[0].lte(-S2_1.S2.M_PI_2)) {
            lat[0] = S2_1.S2.toDecimal(-S2_1.S2.M_PI_2);
            allLongitudes = true;
        }
        // Check whether cap includes the north pole.
        lat[1] = axisLatLng.latRadians.plus(capAngle);
        if (lat[1].gte(S2_1.S2.M_PI_2)) {
            lat[1] = S2_1.S2.toDecimal(S2_1.S2.M_PI_2);
            allLongitudes = true;
        }
        if (!allLongitudes) {
            // Compute the range of longitudes covered by the cap. We use the law
            // of sines for spherical triangles. Consider the triangle ABC where
            // A is the north pole, B is the center of the cap, and C is the point
            // of tangency between the cap boundary and a line of longitude. Then
            // C is a right angle, and letting a,b,c denote the sides opposite A,B,C,
            // we have sin(a)/sin(A) = sin(c)/sin(C), or sin(A) = sin(a)/sin(c).
            // Here "a" is the cap angle, and "c" is the colatitude (90 degrees
            // minus the latitude). This formula also works for negative latitudes.
            //
            // The formula for sin(a) follows from the relationship h = 1 - cos(a).
            // double sinA = Math.sqrt(this.height * (2 - this.height));
            // double sinC = Math.cos(axisLatLng.lat().radians());
            var sinA = this.height.times(this.height.neg().plus(2)).sqrt();
            var sinC = axisLatLng.latRadians.cos();
            if (sinA.lte(sinC)) {
                var angleA = decimal_1.Decimal.asin(sinA.dividedBy(sinC));
                lng[0] = S2_1.S2.IEEEremainder(axisLatLng.lngRadians.minus(angleA), 2 * S2_1.S2.M_PI);
                lng[1] = S2_1.S2.IEEEremainder(axisLatLng.lngRadians.plus(angleA), 2 * S2_1.S2.M_PI);
            }
        }
        return new S2LatLngRect_1.S2LatLngRect(new R1Interval_1.R1Interval(lat[0], lat[1]), new S1Interval_1.S1Interval(lng[0], lng[1]));
    };
    S2Cap.prototype.containsC = function (cell) {
        // If the cap does not contain all cell vertices, return false.
        // We check the vertices before taking the Complement() because we can't
        // accurately represent the complement of a very small cap (a height
        // of 2-epsilon is rounded off to 2).
        var vertices = new Array(4);
        for (var k = 0; k < 4; ++k) {
            vertices[k] = cell.getVertex(k);
            if (!this.contains(vertices[k])) {
                return false;
            }
        }
        // Otherwise, return true if the complement of the cap does not intersect
        // the cell. (This test is slightly conservative, because technically we
        // want Complement().InteriorIntersects() here.)
        return !this.complement().intersects(cell, vertices);
    };
    // public mayIntersectC(cell:S2Cell):boolean {
    //   const toRet = this._mayIntersectC(cell);
    //   console.log("intersects? ",toRet, cell.id.pos().toString(16), cell.level);
    //   return toRet;
    // }
    S2Cap.prototype.mayIntersectC = function (cell) {
        // If the cap contains any cell vertex, return true.
        var vertices = new Array(4);
        for (var k = 0; k < 4; ++k) {
            vertices[k] = cell.getVertex(k);
            if (this.contains(vertices[k])) {
                return true;
            }
        }
        return this.intersects(cell, vertices);
    };
    /**
     * Return true if the cap intersects 'cell', given that the cap vertices have
     * alrady been checked.
     */
    S2Cap.prototype.intersects = function (cell, vertices) {
        // Return true if this cap intersects any point of 'cell' excluding its
        // vertices (which are assumed to already have been checked).
        // If the cap is a hemisphere or larger, the cell and the complement of the
        // cap are both convex. Therefore since no vertex of the cell is contained,
        // no other interior point of the cell is contained either.
        if (this.height.gte(1)) {
            return false;
        }
        // We need to check for empty caps due to the axis check just below.
        if (this.isEmpty()) {
            return false;
        }
        // Optimization: return true if the cell contains the cap axis. (This
        // allows half of the edge checks below to be skipped.)
        if (cell.contains(this.axis)) {
            return true;
        }
        // At this point we know that the cell does not contain the cap axis,
        // and the cap does not contain any cell vertex. The only way that they
        // can intersect is if the cap intersects the interior of some edge.
        var sin2Angle = this.height.times(this.height.neg().plus(2)); // sin^2(capAngle)
        // if (cell.id.pos().toString(16) === '77c040000000000') {
        //   console.log("DIOCAN");
        // }
        for (var k = 0; k < 4; ++k) {
            var edge = cell.getEdgeRaw(k);
            var dot = this.axis.dotProd(edge);
            if (dot.gt(0)) {
                // The axis is in the interior half-space defined by the edge. We don't
                // need to consider these edges, since if the cap intersects this edge
                // then it also intersects the edge on the opposite side of the cell
                // (because we know the axis is not contained with the cell).
                continue;
            }
            // The Norm2() factor is necessary because "edge" is not normalized.
            if (dot.pow(2).gt(sin2Angle.times(edge.norm2()))) {
                // if (cell.id.pos().toString(16) === '77c040000000000') {
                //   console.log("DIOCaAN", k, dot.toString(), sin2Angle.toString(), sin2Angle.times(edge.norm2()).toString());
                // }
                return false; // Entire cap is on the exterior side of this edge.
            }
            // Otherwise, the great circle containing this edge intersects
            // the interior of the cap. We just need to check whether the point
            // of closest approach occurs between the two edge endpoints.
            var dir = S2Point_1.S2Point.crossProd(edge, this.axis);
            if (dir.dotProd(vertices[k]).lt(0)
                && dir.dotProd(vertices[(k + 1) & 3]).gt(0)) {
                return true;
            }
        }
        return false;
    };
    S2Cap.prototype.contains = function (p) {
        // The point 'p' should be a unit-length vector.
        // assert (S2.isUnitLength(p));
        return S2Point_1.S2Point.sub(this.axis, p).norm2().lte(this.height.times(2));
    };
    //
    // /** Return true if two caps are identical. */
    // public equals(that:Object ):boolean  {
    //
    //   if (!(that instanceof S2Cap)) {
    //     return false;
    //   }
    //
    //   S2Cap other = (S2Cap) that;
    //   return (this.axis.equals(other.axis) && this.height == other.height)
    //       || (isEmpty() && other.isEmpty()) || (isFull() && other.isFull());
    //
    // }
    //
    // @Override
    // public int hashCode() {
    //   if (isFull()) {
    //     return 17;
    //   } else if (isEmpty()) {
    //     return 37;
    //   }
    //   int result = 17;
    //   result = 37 * result + this.axis.hashCode();
    //   long heightBits = Double.doubleToLongBits(this.height);
    //   result = 37 * result + (int) ((heightBits >>> 32) ^ heightBits);
    //   return result;
    // }
    // /////////////////////////////////////////////////////////////////////
    // The following static methods are convenience functions for assertions
    // and testing purposes only.
    /**
     * Return true if the cap axis and height differ by at most "max_error" from
     * the given cap "other".
     */
    S2Cap.prototype.approxEquals = function (other, maxError) {
        if (maxError === void 0) { maxError = 1e-14; }
        return (this.axis.aequal(other.axis, maxError) && this.height.minus(other.height).lte(maxError))
            || (this.isEmpty() && other.height.lte(maxError))
            || (other.isEmpty() && this.height.lte(maxError))
            || (this.isFull() && other.height.gte(2 - maxError))
            || (other.isFull() && this.height.gte(2 - maxError));
    };
    S2Cap.prototype.toString = function () {
        return "[Point = " + this.axis.toString() + " Height = " + this.height.toString() + "]";
    };
    S2Cap.prototype.toGEOJSON = function () {
        return this.getRectBound().toGEOJSON();
    };
    /**
     * Multiply a positive number by this constant to ensure that the result of a
     * floating point operation is at least as large as the true
     * infinite-precision result.
     */
    S2Cap.ROUND_UP = S2_1.S2.toDecimal(1).dividedBy(new Long(1).shiftLeft(52).toString()).plus(1);
    return S2Cap;
}());
exports.S2Cap = S2Cap;
//# sourceMappingURL=S2Cap.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var S2Point_1 = __webpack_require__(22);
var decimal_1 = __webpack_require__(23);
var S2_1 = __webpack_require__(10);
/**
 * R2Vector represents a vector in the two-dimensional space. It defines the
 * basic geometrical operations for 2D vectors, e.g. cross product, addition,
 * norm, comparison etc.
 *
 */
var R2Vector = (function () {
    function R2Vector(_x, _y) {
        this._x = new decimal_1.Decimal(_x);
        this._y = new decimal_1.Decimal(_y);
        // this._x = new Decimal(_x) as decimal.Decimal;
        // this._y = new Decimal(_y) as decimal.Decimal;
    }
    Object.defineProperty(R2Vector.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(R2Vector.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    R2Vector.prototype.get = function (index) {
        if (index > 1) {
            throw new Error("Index out fo bounds error " + index);
        }
        return index == 0 ? this._x : this._y;
    };
    R2Vector.fromPointFace = function (p, face) {
        return p.toR2Vector(face);
    };
    R2Vector.add = function (p1, p2) {
        return new R2Vector(p1._x.plus(p2._x), p1._y.plus(p2._y));
    };
    R2Vector.mul = function (p, _m) {
        var m = new decimal_1.Decimal(_m);
        return new R2Vector(m.times(p._x), m.times(p._y));
    };
    R2Vector.prototype.norm2 = function () {
        return this.x.pow(2).plus(this.y.pow(2));
    };
    R2Vector.dotProd = function (p1, p2) {
        return p1.x.times(p2.x).plus(p1.y.times(p2.y));
    };
    R2Vector.prototype.dotProd = function (that) {
        return R2Vector.dotProd(this, that);
    };
    R2Vector.prototype.crossProd = function (that) {
        return this.x.times(that.y).minus(this.y.times(that.x));
    };
    R2Vector.prototype.lessThan = function (vb) {
        if (this.x.lt(vb.x)) {
            return true;
        }
        if (vb.x.lt(this.x)) {
            return false;
        }
        if (this.y.lt(vb.y)) {
            return true;
        }
        return false;
    };
    //
    // @Override
    // public boolean equals(Object that) {
    //   if (!(that instanceof R2Vector)) {
    //     return false;
    //   }
    //   R2Vector thatPoint = (R2Vector) that;
    //   return this.x == thatPoint.x && this.y == thatPoint.y;
    // }
    // /**
    //  * Calcualates hashcode based on stored coordinates. Since we want +0.0 and
    //  * -0.0 to be treated the same, we ignore the sign of the coordinates.
    //  */
    // @Override
    // public int hashCode() {
    //   long value = 17;
    //   value += 37 * value + Double.doubleToLongBits(Math.abs(x));
    //   value += 37 * value + Double.doubleToLongBits(Math.abs(y));
    //   return (int) (value ^ (value >>> 32));
    // }
    //
    R2Vector.fromSTVector = function (stVector) {
        return new R2Vector(R2Vector.singleStTOUV(stVector.x), R2Vector.singleStTOUV(stVector.y));
    };
    // from S2Projections.stToUV (QUADRATIC)
    R2Vector.singleStTOUV = function (_s) {
        var s = S2_1.S2.toDecimal(_s);
        if (s.gte(0)) {
            return S2_1.S2.toDecimal(1)
                .dividedBy(3)
                .times(s.plus(1).pow(2).minus(1));
        }
        else {
            return S2_1.S2.toDecimal(1)
                .dividedBy(3)
                .times(S2_1.S2.toDecimal(1)
                .minus(S2_1.S2.toDecimal(1).minus(s).pow(2)));
        }
    };
    R2Vector.singleUVToST = function (_x) {
        var x = S2_1.S2.toDecimal(_x);
        if (x.gte(0)) {
            return decimal_1.Decimal.sqrt(x.times(3).plus(1)).minus(1);
        }
        else {
            return S2_1.S2.toDecimal(1)
                .minus(decimal_1.Decimal.sqrt(S2_1.S2.toDecimal(1).minus(x.times(3))));
        }
    };
    /**
     * To be used only if this vector is representing uv.
     * @param face
     * @returns {S2Point}
     */
    R2Vector.prototype.toPoint = function (face) {
        switch (face) {
            case 0:
                return new S2Point_1.S2Point(1, this.x, this.y);
            case 1:
                return new S2Point_1.S2Point(this.x.neg(), 1, this.y);
            case 2:
                return new S2Point_1.S2Point(this.x.neg(), this.y.neg(), 1);
            case 3:
                return new S2Point_1.S2Point(-1, this.y.neg(), this.x.neg());
            case 4:
                return new S2Point_1.S2Point(this.y, -1, this.x.neg());
            default:
                return new S2Point_1.S2Point(this.y, this.x, -1);
        }
    };
    R2Vector.prototype.toSt = function (which) {
        return which == 0 ? R2Vector.singleUVToST(this.x) : R2Vector.singleUVToST(this.y);
    };
    R2Vector.prototype.toString = function () {
        return "(" + this.x.toString() + ", " + this.y.toString() + ")";
    };
    return R2Vector;
}());
exports.R2Vector = R2Vector;
//# sourceMappingURL=R2Vector.js.map

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var decimal_1 = __webpack_require__(23);
var S2_1 = __webpack_require__(10);
var S1Angle = (function () {
    function S1Angle(radians) {
        this.radians = new decimal_1.Decimal(radians);
    }
    S1Angle.prototype.degrees = function () {
        return S2_1.S2.toDecimal(this.radians).times((180 / Math.PI));
    };
    //
    // public long e5() {
    //   return Math.round(degrees() * 1e5);
    // }
    //
    // public long e6() {
    //   return Math.round(degrees() * 1e6);
    // }
    //
    // public long e7() {
    //   return Math.round(degrees() * 1e7);
    // }
    /**
     * Return the angle between two points, which is also equal to the distance
     * between these points on the unit sphere. The points do not need to be
     * normalized.
     */
    S1Angle.fromPoints = function (x, y) {
        return new S1Angle(x.angle(y));
    };
    S1Angle.prototype.lessThan = function (that) {
        return this.radians.lt(that.radians);
    };
    S1Angle.prototype.greaterThan = function (that) {
        return this.radians.gt(that.radians);
    };
    S1Angle.prototype.lessOrEquals = function (that) {
        return this.radians.lte(that.radians);
    };
    S1Angle.prototype.greaterOrEquals = function (that) {
        return this.radians.gte(that.radians);
    };
    S1Angle.max = function (left, right) {
        return right.greaterThan(left) ? right : left;
    };
    S1Angle.min = function (left, right) {
        return right.greaterThan(left) ? left : right;
    };
    S1Angle.degrees = function (degrees) {
        var d = new decimal_1.Decimal(degrees);
        return new S1Angle(d.times(Math.PI / 180));
    };
    //
    // public static S1Angle e5(long e5) {
    //   return degrees(e5 * 1e-5);
    // }
    //
    // public static S1Angle e6(long e6) {
    //   // Multiplying by 1e-6 isn't quite as accurate as dividing by 1e6,
    //   // but it's about 10 times faster and more than accurate enough.
    //   return degrees(e6 * 1e-6);
    // }
    //
    // public static S1Angle e7(long e7) {
    //   return degrees(e7 * 1e-7);
    // }
    /**
     * Writes the angle in degrees with a "d" suffix, e.g. "17.3745d". By default
     * 6 digits are printed; this can be changed using setprecision(). Up to 17
     * digits are required to distinguish one angle from another.
     */
    S1Angle.prototype.toString = function () {
        return this.degrees() + "d";
    };
    S1Angle.prototype.compareTo = function (that) {
        return this.radians < that.radians ? -1 : this.radians > that.radians ? 1 : 0;
    };
    return S1Angle;
}());
exports.S1Angle = S1Angle;
//# sourceMappingURL=S1Angle.js.map

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright 2005 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var S1Angle_1 = __webpack_require__(55);
var S2Point_1 = __webpack_require__(22);
var S2_1 = __webpack_require__(10);
var decimal_1 = __webpack_require__(23);
/**
 * This class represents a point on the unit sphere as a pair of
 * latitude-longitude coordinates. Like the rest of the "geometry" package, the
 * intent is to represent spherical geometry as a mathematical abstraction, so
 * functions that are specifically related to the Earth's geometry (e.g.
 * easting/northing conversions) should be put elsewhere.
 *
 */
var S2LatLng = (function () {
    function S2LatLng(latRadians, lngRadians) {
        this.latRadians = S2_1.S2.toDecimal(latRadians);
        this.lngRadians = S2_1.S2.toDecimal(lngRadians);
    }
    Object.defineProperty(S2LatLng.prototype, "latDegrees", {
        get: function () {
            return new S1Angle_1.S1Angle(this.latRadians).degrees();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(S2LatLng.prototype, "lngDegrees", {
        get: function () {
            return new S1Angle_1.S1Angle(this.lngRadians).degrees();
        },
        enumerable: true,
        configurable: true
    });
    // Clamps the latitude to the range [-90, 90] degrees, and adds or subtracts
    // a multiple of 360 degrees to the longitude if necessary to reduce it to
    // the range [-180, 180].
    /** Convert an S2LatLng to the equivalent unit-length vector (S2Point). */
    S2LatLng.prototype.toPoint = function () {
        var phi = this.latRadians;
        var theta = this.lngRadians;
        var cosphi = decimal_1.Decimal.cos(phi);
        return new S2Point_1.S2Point(decimal_1.Decimal.cos(theta).times(cosphi), decimal_1.Decimal.sin(theta).times(cosphi), decimal_1.Decimal.sin(phi));
    };
    /**
     * Returns a new S2LatLng based on this instance for which {@link #isValid()}
     * will be {@code true}.
     * <ul>
     * <li>Latitude is clipped to the range {@code [-90, 90]}
     * <li>Longitude is normalized to be in the range {@code [-180, 180]}
     * </ul>
     * <p>If the current point is valid then the returned point will have the same
     * coordinates.
     */
    S2LatLng.prototype.normalized = function () {
        // drem(x, 2 * S2.M_PI) reduces its argument to the range
        // [-S2.M_PI, S2.M_PI] inclusive, which is what we want here.
        return new S2LatLng(decimal_1.Decimal.max(-S2_1.S2.M_PI_2, decimal_1.Decimal.min(S2_1.S2.M_PI_2, this.latRadians)), S2_1.S2.IEEEremainder(this.lngRadians, S2_1.S2.toDecimal(2).times(S2_1.S2.M_PI)));
        // return new S2LatLng(Math.max(-S2.M_PI_2, Math.min(S2.M_PI_2, this.latRadians)),
        //     S2.IEEEremainder(this.lngRadians, 2 * S2.M_PI));
    };
    S2LatLng.fromDegrees = function (latDegrees, lngDegrees) {
        return new S2LatLng(S1Angle_1.S1Angle.degrees(latDegrees).radians, S1Angle_1.S1Angle.degrees(lngDegrees).radians);
    };
    S2LatLng.fromPoint = function (p) {
        return new S2LatLng(S2LatLng.latitude(p).radians, S2LatLng.longitude(p).radians);
    };
    /**
     * Return true if the latitude is between -90 and 90 degrees inclusive and the
     * longitude is between -180 and 180 degrees inclusive.
     */
    S2LatLng.prototype.isValid = function () {
        return this.latRadians.abs().lte(S2_1.S2.M_PI_2) &&
            this.lngRadians.abs().lte(S2_1.S2.M_PI);
    };
    /**
     * Scales this point by the given scaling factor.
     * Note that there is no guarantee that the new point will be <em>valid</em>.
     */
    S2LatLng.prototype.mul = function (m) {
        return new S2LatLng(this.latRadians.times(m), this.lngRadians.times(m));
    };
    S2LatLng.latitude = function (p) {
        // We use atan2 rather than asin because the input vector is not necessarily
        // unit length, and atan2 is much more accurate than asin near the poles.
        return new S1Angle_1.S1Angle(decimal_1.Decimal.atan2(p.z, p.x.pow(2)
            .plus(p.y.pow(2))
            .sqrt()));
    };
    S2LatLng.longitude = function (p) {
        // Note that atan2(0, 0) is defined to be zero.
        return new S1Angle_1.S1Angle(decimal_1.Decimal.atan2(p.y, p.x));
    };
    S2LatLng.prototype.equals = function (other) {
        return other.latRadians === this.latRadians && other.lngRadians === this.lngRadians;
    };
    S2LatLng.prototype.pointAtDistance = function (_distanceInKm, _bearingRadians) {
        var distanceInM = S2_1.S2.toDecimal(_distanceInKm).times(1000);
        var distanceToRadius = distanceInM.dividedBy(S2LatLng.EARTH_RADIUS_METERS);
        var bearingRadians = S2_1.S2.toDecimal(_bearingRadians);
        this.latRadians.sin();
        distanceToRadius.cos();
        var newLat = this.latRadians.sin()
            .times(distanceToRadius.cos())
            .plus(this.latRadians.cos()
            .times(distanceToRadius.sin())
            .times(bearingRadians.cos())).asin();
        var newLng = this.lngRadians
            .plus(decimal_1.Decimal.atan2(bearingRadians.sin()
            .times(distanceToRadius.sin())
            .times(this.latRadians.cos()), distanceToRadius.cos()
            .minus(this.latRadians.sin().times(newLat.sin()))));
        return new S2LatLng(newLat, newLng);
    };
    /**
     * Generates n LatLngs given a distance in km and the number of points wanted.
     * Generated points will be returned in a Clockwise order starting from North.
     * @param _distanceInKm
     * @param nPoints
     * @returns {S2LatLng[]}
     */
    S2LatLng.prototype.pointsAtDistance = function (_distanceInKm, nPoints) {
        var _this = this;
        if (nPoints === void 0) { nPoints = 4; }
        return Array.apply(null, new Array(nPoints)) // create an array filled of undefined!
            .map(function (p, idx) {
            return S2_1.S2.toDecimal(360).dividedBy(nPoints).times(idx);
        })
            .map(function (bearingDegree) { return S1Angle_1.S1Angle.degrees(bearingDegree).radians; })
            .map(function (bearingRadians) { return _this.pointAtDistance(_distanceInKm, bearingRadians); });
    };
    S2LatLng.prototype.getEarthDistance = function (other) {
        return this.getDistance(other).radians.times(S2LatLng.EARTH_RADIUS_METERS);
    };
    S2LatLng.prototype.getDistance = function (other) {
        // This implements the Haversine formula, which is numerically stable for
        // small distances but only gets about 8 digits of precision for very large
        // distances (e.g. antipodal points). Note that 8 digits is still accurate
        // to within about 10cm for a sphere the size of the Earth.
        //
        // This could be fixed with another sin() and cos() below, but at that point
        // you might as well just convert both arguments to S2Points and compute the
        // distance that way (which gives about 15 digits of accuracy for all
        // distances).
        var dLat = other.latRadians.minus(this.latRadians).times(0.5).sin();
        var dLng = other.lngRadians.minus(this.lngRadians).times(0.5).sin();
        var x = dLat.pow(2)
            .plus(dLng.pow(2)
            .times(this.latRadians.cos())
            .times(other.latRadians.cos()));
        // double x = dlat * dlat + dlng * dlng * Math.cos(lat1) * Math.cos(lat2);
        return new S1Angle_1.S1Angle(S2_1.S2.toDecimal(2)
            .times(decimal_1.Decimal.atan2(x.sqrt(), decimal_1.Decimal.max(0, x.neg().plus(1))
            .sqrt())));
        // Return the distance (measured along the surface of the sphere) to the
        // given S2LatLng. This is mathematically equivalent to:
        //
        // S1Angle::FromRadians(ToPoint().Angle(o.ToPoint())
        //
        // but this implementation is slightly more efficient.
    };
    S2LatLng.prototype.toString = function () {
        return "(" + this.latRadians + ", " + this.lngRadians + ")";
    };
    S2LatLng.prototype.toStringDegrees = function () {
        return "(" + this.latDegrees + ", " + this.lngDegrees + ")";
    };
    S2LatLng.prototype.toGEOJSON = function () {
        return {
            type: 'Feature',
            geometry: {
                type: "Point",
                coordinates: [this.lngDegrees.toNumber(), this.latDegrees.toNumber()]
            },
            properties: {}
        };
    };
    /**
     * Approximate "effective" radius of the Earth in meters.
     */
    S2LatLng.EARTH_RADIUS_METERS = 6367000.0;
    /** The center point the lat/lng coordinate system. */
    S2LatLng.CENTER = new S2LatLng(0.0, 0.0);
    return S2LatLng;
}());
exports.S2LatLng = S2LatLng;
//# sourceMappingURL=S2LatLng.js.map

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(16);
var toLength = __webpack_require__(8);
var toAbsoluteIndex = __webpack_require__(38);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 59 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(20);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(20);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(12);
var redefine = __webpack_require__(13);
var fails = __webpack_require__(3);
var defined = __webpack_require__(26);
var wks = __webpack_require__(5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(11);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var redefineAll = __webpack_require__(44);
var meta = __webpack_require__(32);
var forOf = __webpack_require__(43);
var anInstance = __webpack_require__(42);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(62);
var setToStringTag = __webpack_require__(45);
var inheritIfRequired = __webpack_require__(84);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var uid = __webpack_require__(35);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(36) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(2)[K];
});


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(11);
var ctx = __webpack_require__(19);
var forOf = __webpack_require__(43);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var S2Cap_1 = __webpack_require__(53);
__export(__webpack_require__(105));
__export(__webpack_require__(106));
__export(__webpack_require__(74));
__export(__webpack_require__(54));
__export(__webpack_require__(55));
__export(__webpack_require__(73));
__export(__webpack_require__(10));
__export(__webpack_require__(53));
__export(__webpack_require__(107));
__export(__webpack_require__(75));
__export(__webpack_require__(145));
// export * from './S2EdgeIndex';
// export * from './S2EdgeUtil';
__export(__webpack_require__(56));
__export(__webpack_require__(72));
// export * from './S2Loop';
__export(__webpack_require__(22));
__export(__webpack_require__(76));
__export(__webpack_require__(363));
var Utils = (function () {
    function Utils() {
    }
    /**
     * Calculates a region covering a circle
     * NOTE: The current implementation uses S2Cap while S2Loop would be better (S2Loop is not implemented yet)
     * @param center
     * @param radiusInKM
     * @param points the number of points to calculate. The higher the better precision
     * @returns {S2Region}
     */
    Utils.calcRegionFromCenterRadius = function (center, radiusInKM, points) {
        if (points === void 0) { points = 16; }
        var pointsAtDistance = center.pointsAtDistance(radiusInKM, points);
        var s2Cap = S2Cap_1.S2Cap.empty().addPoint(center.toPoint());
        // It would be probably enough to add one of the points/2 pair of opposite points in the circle such
        // as (0, points/2). but since this is just a temporary solution lets stick with this as it
        // will come handy when implementing S2Loop.
        pointsAtDistance
            .map(function (p) { return p.toPoint(); })
            .forEach(function (p) {
            s2Cap = s2Cap.addPoint(p);
        });
        return s2Cap;
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=export.js.map

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var S1Interval_1 = __webpack_require__(73);
var R1Interval_1 = __webpack_require__(74);
var S2LatLng_1 = __webpack_require__(56);
var S2_1 = __webpack_require__(10);
var S2Point_1 = __webpack_require__(22);
var S1Angle_1 = __webpack_require__(55);
var S2EdgeUtil_1 = __webpack_require__(362);
var S2Cap_1 = __webpack_require__(53);
var decimal_1 = __webpack_require__(23);
var S2LatLngRect = (function () {
    function S2LatLngRect(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
    S2LatLngRect.fromLatLng = function (lo, hi) {
        return new S2LatLngRect(new R1Interval_1.R1Interval(lo.latRadians, hi.latRadians), new S1Interval_1.S1Interval(lo.lngRadians, hi.lngRadians));
    };
    /** The canonical empty rectangle */
    S2LatLngRect.empty = function () {
        return new S2LatLngRect(R1Interval_1.R1Interval.empty(), S1Interval_1.S1Interval.empty());
    };
    /** The canonical full rectangle. */
    S2LatLngRect.full = function () {
        return new S2LatLngRect(S2LatLngRect.fullLat(), S1Interval_1.S1Interval.full());
    };
    /** The full allowable range of latitudes. */
    S2LatLngRect.fullLat = function () {
        return new R1Interval_1.R1Interval(-S2_1.S2.M_PI_2, S2_1.S2.M_PI_2);
    };
    /**
     * Construct a rectangle from a center point (in lat-lng space) and size in
     * each dimension. If size.lng is greater than 360 degrees it is clamped,
     * and latitudes greater than +/- 90 degrees are also clamped. So for example,
     * FromCenterSize((80,170),(20,20)) -> (lo=(60,150),hi=(90,-170)).
     */
    S2LatLngRect.fromCenterSize = function (center, size) {
        return S2LatLngRect.fromPoint(center).expanded(size.mul(0.5));
    };
    /** Convenience method to construct a rectangle containing a single point. */
    S2LatLngRect.fromPoint = function (p) {
        // assert (p.isValid());
        return S2LatLngRect.fromLatLng(p, p);
    };
    /**
     * Convenience method to construct the minimal bounding rectangle containing
     * the two given points. This is equivalent to starting with an empty
     * rectangle and calling AddPoint() twice. Note that it is different than the
     * S2LatLngRect(lo, hi) constructor, where the first point is always used as
     * the lower-left corner of the resulting rectangle.
     */
    S2LatLngRect.fromPointPair = function (p1, p2) {
        // assert (p1.isValid() && p2.isValid());
        return new S2LatLngRect(R1Interval_1.R1Interval.fromPointPair(p1.latRadians, p2
            .latRadians), S1Interval_1.S1Interval.fromPointPair(p1.lngRadians, p2.lngRadians));
    };
    /**
     * Return a latitude-longitude rectangle that contains the edge from "a" to
     * "b". Both points must be unit-length. Note that the bounding rectangle of
     * an edge can be larger than the bounding rectangle of its endpoints.
     */
    S2LatLngRect.fromEdge = function (a, b) {
        // assert (S2.isUnitLength(a) && S2.isUnitLength(b));
        var r = S2LatLngRect.fromPointPair(S2LatLng_1.S2LatLng.fromPoint(a), S2LatLng_1.S2LatLng.fromPoint(b));
        // Check whether the min/max latitude occurs in the edge interior.
        // We find the normal to the plane containing AB, and then a vector "dir" in
        // this plane that also passes through the equator. We use RobustCrossProd
        // to ensure that the edge normal is accurate even when the two points are
        // very close together.
        var ab = S2_1.S2.robustCrossProd(a, b);
        var dir = S2Point_1.S2Point.crossProd(ab, new S2Point_1.S2Point(0, 0, 1));
        var da = dir.dotProd(a);
        var db = dir.dotProd(b);
        if (da.times(db).gte(0)) {
            // Minimum and maximum latitude are attained at the vertices.
            return r;
        }
        // Minimum/maximum latitude occurs in the edge interior. This affects the
        // latitude bounds but not the longitude bounds.
        var absLat = decimal_1.Decimal.acos(ab.z.dividedBy(ab.norm()).abs());
        if (da.lt(0)) {
            return new S2LatLngRect(new R1Interval_1.R1Interval(r.lat.lo, absLat), r.lng);
        }
        else {
            return new S2LatLngRect(new R1Interval_1.R1Interval(-absLat, r.lat.hi), r.lng);
        }
    };
    /**
     * Return true if the rectangle is valid, which essentially just means that
     * the latitude bounds do not exceed Pi/2 in absolute value and the longitude
     * bounds do not exceed Pi in absolute value.
     *
     */
    S2LatLngRect.prototype.isValid = function () {
        // The lat/lng ranges must either be both empty or both non-empty.
        return (this.lat.lo.abs().lte(S2_1.S2.M_PI_2) && this.lat.hi.abs().lte(S2_1.S2.M_PI_2)
            && this.lng.isValid() && this.lat.isEmpty() == this.lng.isEmpty());
    };
    S2LatLngRect.prototype.lo = function () {
        return new S2LatLng_1.S2LatLng(this.lat.lo, this.lng.lo);
    };
    S2LatLngRect.prototype.hi = function () {
        return new S2LatLng_1.S2LatLng(this.lat.hi, this.lng.hi);
    };
    /**
     * Return true if the rectangle is empty, i.e. it contains no points at all.
     */
    S2LatLngRect.prototype.isEmpty = function () {
        return this.lat.isEmpty();
    };
    // Return true if the rectangle is full, i.e. it contains all points.
    S2LatLngRect.prototype.isFull = function () {
        // console.log(this.lat.toString());
        // console.log(S2LatLngRect.fullLat().toString());
        return this.lat.equals(S2LatLngRect.fullLat()) && this.lng.isFull();
    };
    /**
     * Return true if lng_.lo() > lng_.hi(), i.e. the rectangle crosses the 180
     * degree latitude line.
     */
    S2LatLngRect.prototype.isInverted = function () {
        return this.lng.isInverted();
    };
    /** Return the k-th vertex of the rectangle (k = 0,1,2,3) in CCW order. */
    S2LatLngRect.prototype.getVertex = function (k) {
        // Return the points in CCW order (SW, SE, NE, NW).
        switch (k) {
            case 0:
                return this.lo();
            case 1:
                return new S2LatLng_1.S2LatLng(this.lat.lo, this.lng.hi);
            case 2:
                return this.hi();
            case 3:
                return new S2LatLng_1.S2LatLng(this.lat.hi, this.lng.lo);
            default:
                throw new Error("Invalid vertex index.");
        }
    };
    /**
     * Return the center of the rectangle in latitude-longitude space (in general
     * this is not the center of the region on the sphere).
     */
    S2LatLngRect.prototype.getCenter = function () {
        return new S2LatLng_1.S2LatLng(this.lat.getCenter(), this.lng.getCenter());
    };
    /**
     * Return the minimum distance (measured along the surface of the sphere)
     * from a given point to the rectangle (both its boundary and its interior).
     * The latLng must be valid.
     */
    S2LatLngRect.prototype.getDistanceLL = function (p) {
        // The algorithm here is the same as in getDistance(S2LagLngRect), only
        // with simplified calculations.
        var a = this;
        if (a.isEmpty()) {
            throw new Error();
        }
        if (!p.isValid()) {
            throw new Error('point is not valid');
        }
        if (a.lng.contains(p.lngRadians)) {
            return new S1Angle_1.S1Angle(decimal_1.Decimal.max(0.0, decimal_1.Decimal.max(p.latRadians.minus(a.lat.hi), a.lat.lo.minus(p.latRadians))));
        }
        var interval = new S1Interval_1.S1Interval(a.lng.hi, a.lng.complement().getCenter());
        var aLng = a.lng.lo;
        if (interval.contains(p.lngRadians)) {
            aLng = a.lng.hi;
        }
        var lo = new S2LatLng_1.S2LatLng(a.lat.lo, aLng).toPoint();
        var hi = new S2LatLng_1.S2LatLng(a.lat.hi, aLng).toPoint();
        var loCrossHi = new S2LatLng_1.S2LatLng(0, aLng.minus(S2_1.S2.M_PI_2)).normalized().toPoint();
        return S2EdgeUtil_1.S2EdgeUtil.getDistance(p.toPoint(), lo, hi, loCrossHi);
    };
    /**
     * Return the minimum distance (measured along the surface of the sphere) to
     * the given S2LatLngRect. Both S2LatLngRects must be non-empty.
     */
    S2LatLngRect.prototype.getDistanceLLR = function (other) {
        var a = this;
        var b = other;
        if (a.isEmpty()) {
            throw new Error();
        }
        if (b.isEmpty()) {
            throw new Error();
        }
        // First, handle the trivial cases where the longitude intervals overlap.
        if (a.lng.intersects(b.lng)) {
            if (a.lat.intersects(b.lat)) {
                return new S1Angle_1.S1Angle(0); // Intersection between a and b.
            }
            // We found an overlap in the longitude interval, but not in the latitude
            // interval. This means the shortest path travels along some line of
            // longitude connecting the high-latitude of the lower rect with the
            // low-latitude of the higher rect.
            var lo = void 0, hi = void 0;
            if (a.lat.lo.gt(b.lat.hi)) {
                lo = b.lat.hi;
                hi = a.lat.lo;
            }
            else {
                lo = a.lat.hi;
                hi = b.lat.lo;
            }
            return new S1Angle_1.S1Angle(hi.radians().minus(lo.radians()));
        }
        // The longitude intervals don't overlap. In this case, the closest points
        // occur somewhere on the pair of longitudinal edges which are nearest in
        // longitude-space.
        var aLng, bLng;
        var loHi = S1Interval_1.S1Interval.fromPointPair(a.lng.lo, b.lng.hi);
        var hiLo = S1Interval_1.S1Interval.fromPointPair(a.lng.hi, b.lng.lo);
        if (loHi.getLength().lt(hiLo.getLength())) {
            aLng = a.lng.lo;
            bLng = b.lng.hi;
        }
        else {
            aLng = a.lng.hi;
            bLng = b.lng.lo;
        }
        // The shortest distance between the two longitudinal segments will include
        // at least one segment endpoint. We could probably narrow this down further
        // to a single point-edge distance by comparing the relative latitudes of the
        // endpoints, but for the sake of clarity, we'll do all four point-edge
        // distance tests.
        var aLo = new S2LatLng_1.S2LatLng(a.lat.lo, aLng).toPoint();
        var aHi = new S2LatLng_1.S2LatLng(a.lat.hi, aLng).toPoint();
        var aLoCrossHi = new S2LatLng_1.S2LatLng(0, aLng.radians().minus(S2_1.S2.M_PI_2)).normalized().toPoint();
        var bLo = new S2LatLng_1.S2LatLng(b.lat.lo, bLng).toPoint();
        var bHi = new S2LatLng_1.S2LatLng(b.lat.hi, bLng).toPoint();
        var bLoCrossHi = new S2LatLng_1.S2LatLng(0, bLng.radians().minus(S2_1.S2.M_PI_2)).normalized().toPoint();
        return S1Angle_1.S1Angle.min(S2EdgeUtil_1.S2EdgeUtil.getDistance(aLo, bLo, bHi, bLoCrossHi), S1Angle_1.S1Angle.min(S2EdgeUtil_1.S2EdgeUtil.getDistance(aHi, bLo, bHi, bLoCrossHi), S1Angle_1.S1Angle.min(S2EdgeUtil_1.S2EdgeUtil.getDistance(bLo, aLo, aHi, aLoCrossHi), S2EdgeUtil_1.S2EdgeUtil.getDistance(bHi, aLo, aHi, aLoCrossHi))));
    };
    /**
     * Return the width and height of this rectangle in latitude-longitude space.
     * Empty rectangles have a negative width and height.
     */
    S2LatLngRect.prototype.getSize = function () {
        return new S2LatLng_1.S2LatLng(this.lat.getLength(), this.lng.getLength());
    };
    /**
     * More efficient version of Contains() that accepts a S2LatLng rather than an
     * S2Point.
     */
    S2LatLngRect.prototype.containsLL = function (ll) {
        // assert (ll.isValid());
        return (this.lat.contains(ll.latRadians) && this.lng.contains(ll.lngRadians));
    };
    /**
     * Return true if and only if the given point is contained in the interior of
     * the region (i.e. the region excluding its boundary). The point 'p' does not
     * need to be normalized.
     */
    S2LatLngRect.prototype.interiorContainsP = function (p) {
        return this.interiorContainsLL(S2LatLng_1.S2LatLng.fromPoint(p));
    };
    /**
     * More efficient version of InteriorContains() that accepts a S2LatLng rather
     * than an S2Point.
     */
    S2LatLngRect.prototype.interiorContainsLL = function (ll) {
        // assert (ll.isValid());
        return (this.lat.interiorContains(ll.latRadians) && this.lng
            .interiorContains(ll.lngRadians));
    };
    /**
     * Return true if and only if the rectangle contains the given other
     * rectangle.
     */
    S2LatLngRect.prototype.containsLLR = function (other) {
        return this.lat.containsI(other.lat) && this.lng.containsI(other.lng);
    };
    /**
     * Return true if and only if the interior of this rectangle contains all
     * points of the given other rectangle (including its boundary).
     */
    S2LatLngRect.prototype.interiorContainsLLR = function (other) {
        return (this.lat.interiorContainsI(other.lat) && this.lng
            .interiorContainsI(other.lng));
    };
    /** Return true if this rectangle and the given other rectangle have any
     points in common. */
    S2LatLngRect.prototype.intersectsLLR = function (other) {
        return this.lat.intersects(other.lat) && this.lng.intersects(other.lng);
    };
    /**
     * Returns true if this rectangle intersects the given cell. (This is an exact
     * test and may be fairly expensive, see also MayIntersect below.)
     */
    S2LatLngRect.prototype.intersects = function (cell) {
        // First we eliminate the cases where one region completely contains the
        // other. Once these are disposed of, then the regions will intersect
        // if and only if their boundaries intersect.
        if (this.isEmpty()) {
            return false;
        }
        if (this.containsP(cell.getCenter())) {
            return true;
        }
        if (cell.contains(this.getCenter().toPoint())) {
            return true;
        }
        // Quick rejection test (not required for correctness).
        if (!this.intersectsLLR(cell.getRectBound())) {
            return false;
        }
        // Now check whether the boundaries intersect. Unfortunately, a
        // latitude-longitude rectangle does not have straight edges -- two edges
        // are curved, and at least one of them is concave.
        // Precompute the cell vertices as points and latitude-longitudes.
        var cellV = new Array(4);
        var cellLl = new Array(4);
        for (var i = 0; i < 4; ++i) {
            cellV[i] = cell.getVertex(i); // Must be normalized.
            cellLl[i] = S2LatLng_1.S2LatLng.fromPoint(cellV[i]);
            if (this.containsLL(cellLl[i])) {
                return true; // Quick acceptance test.
            }
        }
        for (var i = 0; i < 4; ++i) {
            var edgeLng = S1Interval_1.S1Interval.fromPointPair(cellLl[i].lngRadians, cellLl[(i + 1) & 3].lngRadians);
            if (!this.lng.intersects(edgeLng)) {
                continue;
            }
            var a = cellV[i];
            var b = cellV[(i + 1) & 3];
            if (edgeLng.contains(this.lng.lo)) {
                if (S2LatLngRect.intersectsLngEdge(a, b, this.lat, this.lng.lo)) {
                    return true;
                }
            }
            if (edgeLng.contains(this.lng.hi)) {
                if (S2LatLngRect.intersectsLngEdge(a, b, this.lat, this.lng.hi)) {
                    return true;
                }
            }
            if (S2LatLngRect.intersectsLatEdge(a, b, this.lat.lo, this.lng)) {
                return true;
            }
            if (S2LatLngRect.intersectsLatEdge(a, b, this.lat.hi, this.lng)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Return true if and only if the interior of this rectangle intersects any
     * point (including the boundary) of the given other rectangle.
     */
    S2LatLngRect.prototype.interiorIntersects = function (other) {
        return (this.lat.interiorIntersects(other.lat) && this.lng
            .interiorIntersects(other.lng));
    };
    S2LatLngRect.prototype.addPoint = function (p) {
        return this.addPointLL(S2LatLng_1.S2LatLng.fromPoint(p));
    };
    // Increase the size of the bounding rectangle to include the given point.
    // The rectangle is expanded by the minimum amount possible.
    S2LatLngRect.prototype.addPointLL = function (ll) {
        var newLat = this.lat.addPoint(ll.latRadians);
        var newLng = this.lng.addPoint(ll.lngRadians);
        return new S2LatLngRect(newLat, newLng);
    };
    /**
     * Return a rectangle that contains all points whose latitude distance from
     * this rectangle is at most margin.lat, and whose longitude distance from
     * this rectangle is at most margin.lng. In particular, latitudes are
     * clamped while longitudes are wrapped. Note that any expansion of an empty
     * interval remains empty, and both components of the given margin must be
     * non-negative.
     *
     * NOTE: If you are trying to grow a rectangle by a certain *distance* on the
     * sphere (e.g. 5km), use the ConvolveWithCap() method instead.
     */
    S2LatLngRect.prototype.expanded = function (margin) {
        // assert (margin.latRadians >= 0 && margin.lngRadians >= 0);
        if (this.isEmpty()) {
            return this;
        }
        return new S2LatLngRect(this.lat
            .expanded(margin.latRadians)
            .intersection(S2LatLngRect.fullLat()), this.lng.expanded(margin.lngRadians));
    };
    /**
     * Return the smallest rectangle containing the union of this rectangle and
     * the given rectangle.
     */
    S2LatLngRect.prototype.union = function (other) {
        return new S2LatLngRect(this.lat.union(other.lat), this.lng.union(other.lng));
    };
    /**
     * Return the smallest rectangle containing the intersection of this rectangle
     * and the given rectangle. Note that the region of intersection may consist
     * of two disjoint rectangles, in which case a single rectangle spanning both
     * of them is returned.
     */
    S2LatLngRect.prototype.intersection = function (other) {
        var intersectLat = this.lat.intersection(other.lat);
        var intersectLng = this.lng.intersection(other.lng);
        if (intersectLat.isEmpty() || intersectLng.isEmpty()) {
            // The lat/lng ranges must either be both empty or both non-empty.
            return S2LatLngRect.empty();
        }
        return new S2LatLngRect(intersectLat, intersectLng);
    };
    //
    // /**
    //  * Return a rectangle that contains the convolution of this rectangle with a
    //  * cap of the given angle. This expands the rectangle by a fixed distance (as
    //  * opposed to growing the rectangle in latitude-longitude space). The returned
    //  * rectangle includes all points whose minimum distance to the original
    //  * rectangle is at most the given angle.
    //  */
    // public S2LatLngRect convolveWithCap(/*S1Angle*/ angle) {
    //   // The most straightforward approach is to build a cap centered on each
    //   // vertex and take the union of all the bounding rectangles (including the
    //   // original rectangle; this is necessary for very large rectangles).
    //
    //   // Optimization: convert the angle to a height exactly once.
    //   S2Cap cap = S2Cap.fromAxisAngle(new S2Point(1, 0, 0), angle);
    //
    //   S2LatLngRect r = this;
    //   for (int k = 0; k < 4; ++k) {
    //     S2Cap vertexCap = S2Cap.fromAxisHeight(getVertex(k).toPoint(), cap
    //         .height());
    //     r = r.union(vertexCap.getRectBound());
    //   }
    //   return r;
    // }
    /** Return the surface area of this rectangle on the unit sphere. */
    S2LatLngRect.prototype.area = function () {
        if (this.isEmpty()) {
            return S2_1.S2.toDecimal(0);
        }
        // This is the size difference of the two spherical caps, multiplied by
        // the longitude ratio.
        //TODO: check if this.lat.hi & this.lat.lo is radians. 
        return this.lng.getLength().times(decimal_1.Decimal.sin(this.lat.hi).minus(decimal_1.Decimal.sin(this.lat.lo)).abs());
    };
    /** Return true if two rectangles contains the same set of points. */
    S2LatLngRect.prototype.equals = function (that) {
        if (!(that instanceof S2LatLngRect)) {
            return false;
        }
        return this.lat.equals(that.lat) && this.lng.equals(that.lng);
    };
    /**
     * Return true if the latitude and longitude intervals of the two rectangles
     * are the same up to the given tolerance (see r1interval.h and s1interval.h
     * for details).
     */
    S2LatLngRect.prototype.approxEquals = function (other, maxError) {
        if (maxError === void 0) { maxError = 1e-15; }
        return (this.lat.approxEquals(other.lat, maxError) && this.lng.approxEquals(other.lng, maxError));
    };
    // //////////////////////////////////////////////////////////////////////
    // S2Region interface (see {@code S2Region} for details):
    S2LatLngRect.prototype.clone = function () {
        return new S2LatLngRect(this.lat, this.lng);
    };
    S2LatLngRect.prototype.getCapBound = function () {
        // We consider two possible bounding caps, one whose axis passes
        // through the center of the lat-long rectangle and one whose axis
        // is the north or south pole. We return the smaller of the two caps.
        if (this.isEmpty()) {
            return S2Cap_1.S2Cap.empty();
        }
        var poleZ, poleAngle;
        if (this.lat.lo.plus(this.lat.hi).lt(0)) {
            // South pole axis yields smaller cap.
            poleZ = -1;
            poleAngle = this.lat.hi.plus(S2_1.S2.M_PI_2);
        }
        else {
            poleZ = 1;
            poleAngle = this.lat.lo.neg().plus(S2_1.S2.M_PI_2);
        }
        var poleCap = S2Cap_1.S2Cap.fromAxisAngle(new S2Point_1.S2Point(0, 0, poleZ), new S1Angle_1.S1Angle(poleAngle));
        // For bounding rectangles that span 180 degrees or less in longitude, the
        // maximum cap size is achieved at one of the rectangle vertices. For
        // rectangles that are larger than 180 degrees, we punt and always return a
        // bounding cap centered at one of the two poles.
        var lngSpan = this.lng.hi.minus(this.lng.lo);
        if (S2_1.S2.IEEEremainder(lngSpan, 2 * S2_1.S2.M_PI).gte(0)) {
            if (lngSpan.lt(2 * S2_1.S2.M_PI)) {
                var midCap = S2Cap_1.S2Cap.fromAxisAngle(this.getCenter().toPoint(), new S1Angle_1.S1Angle(0));
                for (var k = 0; k < 4; ++k) {
                    midCap = midCap.addPoint(this.getVertex(k).toPoint());
                }
                if (midCap.height.lt(poleCap.height)) {
                    return midCap;
                }
            }
        }
        return poleCap;
    };
    S2LatLngRect.prototype.getRectBound = function () {
        return this;
    };
    S2LatLngRect.prototype.containsC = function (cell) {
        // A latitude-longitude rectangle contains a cell if and only if it contains
        // the cell's bounding rectangle. (This is an exact test.)
        return this.containsLLR(cell.getRectBound());
    };
    /**
     * This test is cheap but is NOT exact. Use Intersects() if you want a more
     * accurate and more expensive test. Note that when this method is used by an
     * S2RegionCoverer, the accuracy isn't all that important since if a cell may
     * intersect the region then it is subdivided, and the accuracy of this method
     * goes up as the cells get smaller.
     */
    S2LatLngRect.prototype.mayIntersectC = function (cell) {
        // This test is cheap but is NOT exact (see s2latlngrect.h).
        return this.intersectsLLR(cell.getRectBound());
    };
    /** The point 'p' does not need to be normalized. */
    S2LatLngRect.prototype.containsP = function (p) {
        return this.containsLL(S2LatLng_1.S2LatLng.fromPoint(p));
    };
    /**
     * Return true if the edge AB intersects the given edge of constant longitude.
     */
    S2LatLngRect.intersectsLngEdge = function (a, b, lat, lng) {
        // Return true if the segment AB intersects the given edge of constant
        // longitude. The nice thing about edges of constant longitude is that
        // they are straight lines on the sphere (geodesics).
        return S2_1.S2.simpleCrossing(a, b, new S2LatLng_1.S2LatLng(lat.lo, lng)
            .toPoint(), new S2LatLng_1.S2LatLng(lat.hi, lng).toPoint());
    };
    /**
     * Return true if the edge AB intersects the given edge of constant latitude.
     */
    S2LatLngRect.intersectsLatEdge = function (a, b, lat, lng) {
        // Return true if the segment AB intersects the given edge of constant
        // latitude. Unfortunately, lines of constant latitude are curves on
        // the sphere. They can intersect a straight edge in 0, 1, or 2 points.
        // assert (S2.isUnitLength(a) && S2.isUnitLength(b));
        // First, compute the normal to the plane AB that points vaguely north.
        var z = S2Point_1.S2Point.normalize(S2_1.S2.robustCrossProd(a, b));
        if (z.z.lt(0)) {
            z = S2Point_1.S2Point.neg(z);
        }
        // Extend this to an orthonormal frame (x,y,z) where x is the direction
        // where the great circle through AB achieves its maximium latitude.
        var y = S2Point_1.S2Point.normalize(S2_1.S2.robustCrossProd(z, new S2Point_1.S2Point(0, 0, 1)));
        var x = S2Point_1.S2Point.crossProd(y, z);
        // assert (S2.isUnitLength(x) && x.z >= 0);
        // Compute the angle "theta" from the x-axis (in the x-y plane defined
        // above) where the great circle intersects the given line of latitude.
        var sinLat = decimal_1.Decimal.sin(lat);
        if (sinLat.abs().gte(x.z)) {
            return false; // The great circle does not reach the given latitude.
        }
        // assert (x.z > 0);
        var cosTheta = sinLat.dividedBy(x.z);
        var sinTheta = cosTheta.pow(2).neg().plus(1).sqrt(); // Math.sqrt(1 - cosTheta * cosTheta);
        var theta = decimal_1.Decimal.atan2(sinTheta, cosTheta);
        // Math.atan2(sinTheta, cosTheta);
        // The candidate intersection points are located +/- theta in the x-y
        // plane. For an intersection to be valid, we need to check that the
        // intersection point is contained in the interior of the edge AB and
        // also that it is contained within the given longitude interval "lng".
        // Compute the range of theta values spanned by the edge AB.
        var abTheta = S1Interval_1.S1Interval.fromPointPair(decimal_1.Decimal.atan2(a.dotProd(y), a.dotProd(x)), decimal_1.Decimal.atan2(b.dotProd(y), b.dotProd(x)));
        if (abTheta.contains(theta)) {
            // Check if the intersection point is also in the given "lng" interval.
            var isect = S2Point_1.S2Point.add(S2Point_1.S2Point.mul(x, cosTheta), S2Point_1.S2Point.mul(y, sinTheta));
            if (lng.contains(decimal_1.Decimal.atan2(isect.y, isect.x))) {
                return true;
            }
        }
        if (abTheta.contains(theta.neg())) {
            // Check if the intersection point is also in the given "lng" interval.
            var intersection = S2Point_1.S2Point.sub(S2Point_1.S2Point.mul(x, cosTheta), S2Point_1.S2Point.mul(y, sinTheta));
            if (lng.contains(decimal_1.Decimal.atan2(intersection.y, intersection.x))) {
                return true;
            }
        }
        return false;
    };
    S2LatLngRect.prototype.allVertex = function () {
        return [
            this.getVertex(0),
            this.getVertex(1),
            this.getVertex(2),
            this.getVertex(3)
        ];
    };
    S2LatLngRect.prototype.toGEOJSON = function () {
        return {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [this.allVertex().concat(this.getVertex(0)).map(function (v) { return [parseFloat(v.lngDegrees.toFixed(5)), parseFloat(v.latDegrees.toFixed(5))]; })],
            },
            properties: {}
        };
    };
    S2LatLngRect.prototype.toString = function () {
        return "[Lo=" + this.lo().toString() + ", Hi=" + this.hi().toString() + "]";
    };
    return S2LatLngRect;
}());
exports.S2LatLngRect = S2LatLngRect;
//# sourceMappingURL=S2LatLngRect.js.map

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Interval_1 = __webpack_require__(105);
var S2_1 = __webpack_require__(10);
var S1Interval = (function (_super) {
    __extends(S1Interval, _super);
    function S1Interval(lo, hi, checked) {
        if (checked === void 0) { checked = false; }
        _super.call(this, lo, hi);
        if (!checked) {
            if (this.lo.eq(-S2_1.S2.M_PI) && !this.hi.eq(S2_1.S2.M_PI)) {
                this.lo = S2_1.S2.toDecimal(S2_1.S2.M_PI);
            }
            if (this.hi.eq(-S2_1.S2.M_PI) && !this.lo.eq(S2_1.S2.M_PI)) {
                this.hi = S2_1.S2.toDecimal(S2_1.S2.M_PI);
            }
        }
    }
    /**
     * An interval is valid if neither bound exceeds Pi in absolute value, and the
     * value -Pi appears only in the Empty() and Full() intervals.
     */
    S1Interval.prototype.isValid = function () {
        return this.lo.abs().lte(S2_1.S2.M_PI) && this.hi.abs().lte(S2_1.S2.M_PI)
            && !(this.lo.eq(-S2_1.S2.M_PI) && !this.hi.eq(S2_1.S2.M_PI))
            && !(this.hi.eq(-S2_1.S2.M_PI) && !this.lo.eq(S2_1.S2.M_PI));
        // return (Math.abs(this.lo) <= S2.M_PI && Math.abs(this.hi) <= S2.M_PI
        // && !(this.lo == -S2.M_PI && this.hi != S2.M_PI) && !(this.hi == -S2.M_PI && this.lo != S2.M_PI));
    };
    /** Return true if the interval contains all points on the unit circle. */
    S1Interval.prototype.isFull = function () {
        // console.log(this.hi.minus(this.lo).eq(2 * S2.M_PI));
        return this.hi.minus(this.lo).eq(2 * S2_1.S2.M_PI);
    };
    /** Return true if the interval is empty, i.e. it contains no points. */
    S1Interval.prototype.isEmpty = function () {
        return this.lo.minus(this.hi).eq(2 * S2_1.S2.M_PI);
    };
    /* Return true if this.lo > this.hi. (This is true for empty intervals.) */
    S1Interval.prototype.isInverted = function () {
        return this.lo.gt(this.hi);
    };
    /**
     * Return the midpoint of the interval. For full and empty intervals, the
     * result is arbitrary.
     */
    S1Interval.prototype.getCenter = function () {
        var center = this.lo.plus(this.hi).dividedBy(2);
        // let center = 0.5 * (this.lo + this.hi);
        if (!this.isInverted()) {
            return center;
        }
        // Return the center in the range (-Pi, Pi].
        return (center.lte(0)) ? (center.plus(S2_1.S2.M_PI)) : (center.minus(S2_1.S2.M_PI));
    };
    /**
     * Return the length of the interval. The length of an empty interval is
     * negative.
     */
    S1Interval.prototype.getLength = function () {
        var length = this.hi.minus(this.lo);
        if (length.gte(0)) {
            return length;
        }
        length = length.plus(2 * S2_1.S2.M_PI);
        // Empty intervals have a negative length.
        return (length.gt(0)) ? length : S2_1.S2.toDecimal(-1);
    };
    /**
     * Return the complement of the interior of the interval. An interval and its
     * complement have the same boundary but do not share any interior values. The
     * complement operator is not a bijection, since the complement of a singleton
     * interval (containing a single value) is the same as the complement of an
     * empty interval.
     */
    S1Interval.prototype.complement = function () {
        if (this.lo.eq(this.hi)) {
            return S1Interval.full(); // Singleton.
        }
        return new S1Interval(this.hi, this.lo, true); // Handles
        // empty and
        // full.
    };
    /** Return true if the interval (which is closed) contains the point 'p'. */
    S1Interval.prototype.contains = function (_p) {
        var p = S2_1.S2.toDecimal(_p);
        // Works for empty, full, and singleton intervals.
        // assert (Math.abs(p) <= S2.M_PI);
        if (p.eq(-S2_1.S2.M_PI)) {
            p = S2_1.S2.toDecimal(S2_1.S2.M_PI);
        }
        return this.fastContains(p);
    };
    /**
     * Return true if the interval (which is closed) contains the point 'p'. Skips
     * the normalization of 'p' from -Pi to Pi.
     *
     */
    S1Interval.prototype.fastContains = function (_p) {
        var p = S2_1.S2.toDecimal(_p);
        if (this.isInverted()) {
            return (p.gte(this.lo) || p.lte(this.hi)) && !this.isEmpty();
        }
        else {
            return p.gte(this.lo) && p.lte(this.hi);
        }
    };
    /** Return true if the interior of the interval contains the point 'p'. */
    S1Interval.prototype.interiorContains = function (_p) {
        // Works for empty, full, and singleton intervals.
        // assert (Math.abs(p) <= S2.M_PI);
        var p = S2_1.S2.toDecimal(_p);
        if (p.eq(-S2_1.S2.M_PI)) {
            p = S2_1.S2.toDecimal(S2_1.S2.M_PI);
        }
        if (this.isInverted()) {
            return p.gt(this.lo) || p.lt(this.hi);
        }
        else {
            return (p.gt(this.lo) && p.lt(this.hi)) || this.isFull();
        }
    };
    /**
     * Return true if the interval contains the given interval 'y'. Works for
     * empty, full, and singleton intervals.
     */
    S1Interval.prototype.containsI = function (y) {
        // It might be helpful to compare the structure of these tests to
        // the simpler Contains(number) method above.
        if (this.isInverted()) {
            if (y.isInverted()) {
                return y.lo.gte(this.lo) && y.hi.lte(this.hi);
            }
            return (y.lo.gte(this.lo) || y.hi.lte(this.hi)) && !this.isEmpty();
        }
        else {
            if (y.isInverted()) {
                return this.isFull() || y.isEmpty();
            }
            return y.lo.gte(this.lo) && y.hi.lte(this.hi);
        }
    };
    /**
     * Returns true if the interior of this interval contains the entire interval
     * 'y'. Note that x.InteriorContains(x) is true only when x is the empty or
     * full interval, and x.InteriorContains(S1Interval(p,p)) is equivalent to
     * x.InteriorContains(p).
     */
    S1Interval.prototype.interiorContainsI = function (y) {
        if (this.isInverted()) {
            if (!y.isInverted()) {
                return this.lo.gt(this.lo) || y.hi.lt(this.hi);
            }
            return (y.lo.gt(this.lo) && y.hi.lt(this.hi)) || y.isEmpty();
        }
        else {
            if (y.isInverted()) {
                return this.isFull() || y.isEmpty();
            }
            return (y.lo.gt(this.lo) && y.hi.lt(this.hi)) || this.isFull();
        }
    };
    /**
     * Return true if the two intervals contain any points in common. Note that
     * the point +/-Pi has two representations, so the intervals [-Pi,-3] and
     * [2,Pi] intersect, for example.
     */
    S1Interval.prototype.intersects = function (y) {
        if (this.isEmpty() || y.isEmpty()) {
            return false;
        }
        if (this.isInverted()) {
            // Every non-empty inverted interval contains Pi.
            return y.isInverted() || y.lo.lte(this.hi) || y.hi.gte(this.lo);
        }
        else {
            if (y.isInverted()) {
                return y.lo.lte(this.hi) || y.hi.gte(this.lo);
            }
            return y.lo.lte(this.hi) && y.hi.gte(this.lo);
        }
    };
    /**
     * Return true if the interior of this interval contains any point of the
     * interval 'y' (including its boundary). Works for empty, full, and singleton
     * intervals.
     */
    S1Interval.prototype.interiorIntersects = function (y) {
        if (this.isEmpty() || y.isEmpty() || this.lo.eq(this.hi)) {
            return false;
        }
        if (this.isInverted()) {
            return y.isInverted() || y.lo.lt(this.hi) || y.hi.gt(this.lo);
        }
        else {
            if (y.isInverted()) {
                return y.lo.lt(this.hi) || y.hi.gt(this.lo);
            }
            return (y.lo.lt(this.hi) && y.hi.gt(this.lo)) || this.isFull();
        }
    };
    /**
     * Expand the interval by the minimum amount necessary so that it contains the
     * given point "p" (an angle in the range [-Pi, Pi]).
     */
    S1Interval.prototype.addPoint = function (_p) {
        var p = S2_1.S2.toDecimal(_p);
        // assert (Math.abs(p) <= S2.M_PI);
        if (p.eq(-S2_1.S2.M_PI)) {
            p = S2_1.S2.toDecimal(S2_1.S2.M_PI);
        }
        if (this.fastContains(p)) {
            return new S1Interval(this.lo, this.hi);
        }
        if (this.isEmpty()) {
            return S1Interval.fromPoint(p);
        }
        else {
            // Compute distance from p to each endpoint.
            var dlo = S1Interval.positiveDistance(p, this.lo);
            var dhi = S1Interval.positiveDistance(this.hi, p);
            if (dlo.lt(dhi)) {
                return new S1Interval(p, this.hi);
            }
            else {
                return new S1Interval(this.lo, p);
            }
        }
    };
    /**
     * Return an interval that contains all points within a distance "radius" of
     * a point in this interval. Note that the expansion of an empty interval is
     * always empty. The radius must be non-negative.
     */
    S1Interval.prototype.expanded = function (_radius) {
        var radius = S2_1.S2.toDecimal(_radius);
        // assert (radius >= 0);
        if (this.isEmpty()) {
            return this;
        }
        // Check whether this interval will be full after expansion, allowing
        // for a 1-bit rounding error when computing each endpoint.
        if (this.getLength().plus(radius.times(2)).gte(2 * S2_1.S2.M_PI - 1e-15)) {
            return S1Interval.full();
        }
        // NOTE(dbeaumont): Should this remainder be 2 * M_PI or just M_PI ??
        var lo = S2_1.S2.IEEEremainder(this.lo.minus(radius), 2 * S2_1.S2.M_PI);
        var hi = S2_1.S2.IEEEremainder(this.hi.plus(radius), 2 * S2_1.S2.M_PI);
        if (lo.eq(-S2_1.S2.M_PI)) {
            lo = S2_1.S2.toDecimal(S2_1.S2.M_PI);
        }
        return new S1Interval(lo, hi);
    };
    /**
     * Return the smallest interval that contains this interval and the given
     * interval "y".
     */
    S1Interval.prototype.union = function (y) {
        // The y.is_full() case is handled correctly in all cases by the code
        // below, but can follow three separate code paths depending on whether
        // this interval is inverted, is non-inverted but contains Pi, or neither.
        if (y.isEmpty()) {
            return this;
        }
        if (this.fastContains(y.lo)) {
            if (this.fastContains(y.hi)) {
                // Either this interval contains y, or the union of the two
                // intervals is the Full() interval.
                if (this.containsI(y)) {
                    return this; // is_full() code path
                }
                return S1Interval.full();
            }
            return new S1Interval(this.lo, this.hi, true);
        }
        if (this.fastContains(y.hi)) {
            return new S1Interval(y.lo, this.hi, true);
        }
        // This interval contains neither endpoint of y. This means that either y
        // contains all of this interval, or the two intervals are disjoint.
        if (this.isEmpty() || y.fastContains(this.lo)) {
            return y;
        }
        // Check which pair of endpoints are closer together.
        var dlo = S1Interval.positiveDistance(y.hi, this.lo);
        var dhi = S1Interval.positiveDistance(this.hi, y.lo);
        if (dlo < dhi) {
            return new S1Interval(y.lo, this.hi, true);
        }
        else {
            return new S1Interval(this.lo, y.hi, true);
        }
    };
    /**
     * Return the smallest interval that contains the intersection of this
     * interval with "y". Note that the region of intersection may consist of two
     * disjoint intervals.
     */
    S1Interval.prototype.intersection = function (y) {
        // The y.is_full() case is handled correctly in all cases by the code
        // below, but can follow three separate code paths depending on whether
        // this interval is inverted, is non-inverted but contains Pi, or neither.
        if (y.isEmpty()) {
            return S1Interval.empty();
        }
        if (this.fastContains(y.lo)) {
            if (this.fastContains(y.hi)) {
                // Either this interval contains y, or the region of intersection
                // consists of two disjoint subintervals. In either case, we want
                // to return the shorter of the two original intervals.
                if (y.getLength().lt(this.getLength())) {
                    return y; // is_full() code path
                }
                return this;
            }
            return new S1Interval(y.lo, this.hi, true);
        }
        if (this.fastContains(y.hi)) {
            return new S1Interval(this.lo, y.hi, true);
        }
        // This interval contains neither endpoint of y. This means that either y
        // contains all of this interval, or the two intervals are disjoint.
        if (y.fastContains(this.lo)) {
            return this; // is_empty() okay here
        }
        // assert (!intersects(y));
        return S1Interval.empty();
    };
    /**
     * Return true if the length of the symmetric difference between the two
     * intervals is at most the given tolerance.
     */
    S1Interval.prototype.approxEquals = function (y, maxError) {
        if (maxError === void 0) { maxError = 1e-9; }
        if (this.isEmpty()) {
            return y.getLength().lte(maxError);
        }
        if (y.isEmpty()) {
            return this.getLength().lte(maxError);
        }
        return S2_1.S2.IEEEremainder(y.lo.minus(this.lo), 2 * S2_1.S2.M_PI).abs()
            .plus(S2_1.S2.IEEEremainder(y.hi.minus(this.hi), 2 * S2_1.S2.M_PI).abs())
            .lte(maxError);
    };
    S1Interval.empty = function () {
        return new S1Interval(S2_1.S2.M_PI, -S2_1.S2.M_PI, true);
    };
    S1Interval.full = function () {
        return new S1Interval(-S2_1.S2.M_PI, S2_1.S2.M_PI, true);
    };
    S1Interval.fromPoint = function (_p) {
        var p = S2_1.S2.toDecimal(_p);
        if (p.eq(-S2_1.S2.M_PI)) {
            p = S2_1.S2.toDecimal(S2_1.S2.M_PI);
        }
        return new S1Interval(p, p, true);
    };
    /**
     * Convenience method to construct the minimal interval containing the two
     * given points. This is equivalent to starting with an empty interval and
     * calling AddPoint() twice, but it is more efficient.
     */
    S1Interval.fromPointPair = function (_p1, _p2) {
        // assert (Math.abs(p1) <= S2.M_PI && Math.abs(p2) <= S2.M_PI);
        var p1 = S2_1.S2.toDecimal(_p1);
        var p2 = S2_1.S2.toDecimal(_p2);
        if (p1.eq(-S2_1.S2.M_PI)) {
            p1 = S2_1.S2.toDecimal(S2_1.S2.M_PI);
        }
        if (p2.eq(-S2_1.S2.M_PI)) {
            p2 = S2_1.S2.toDecimal(S2_1.S2.M_PI);
        }
        if (S1Interval.positiveDistance(p1, p2).lte(S2_1.S2.M_PI)) {
            return new S1Interval(p1, p2, true);
        }
        else {
            return new S1Interval(p2, p1, true);
        }
    };
    /**
     * Compute the distance from "a" to "b" in the range [0, 2*Pi). This is
     * equivalent to (drem(b - a - S2.M_PI, 2 * S2.M_PI) + S2.M_PI), except that
     * it is more numerically stable (it does not lose precision for very small
     * positive distances).
     */
    S1Interval.positiveDistance = function (_a, _b) {
        var a = S2_1.S2.toDecimal(_a);
        var b = S2_1.S2.toDecimal(_b);
        var d = b.minus(a);
        if (d.gte(0)) {
            return d;
        }
        // We want to ensure that if b == Pi and a == (-Pi + eps),
        // the return result is approximately 2*Pi and not zero.
        return b.plus(S2_1.S2.M_PI).minus(a.minus(S2_1.S2.M_PI));
    };
    return S1Interval;
}(Interval_1.Interval));
exports.S1Interval = S1Interval;
//# sourceMappingURL=S1Interval.js.map

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Interval_1 = __webpack_require__(105);
var S2_1 = __webpack_require__(10);
var decimal_1 = __webpack_require__(23);
/**
 * An R1Interval represents a closed interval on a unit circle (also known as a
 * 1-dimensional sphere). It is capable of representing the empty interval
 * (containing no points), the full interval (containing all points), and
 * zero-length intervals (containing a single point).
 *
 *  Points are represented by the angle they make with the positive x-axis in
 * the range [-Pi, Pi]. An interval is represented by its lower and upper bounds
 * (both inclusive, since the interval is closed). The lower bound may be
 * greater than the upper bound, in which case the interval is "inverted" (i.e.
 * it passes through the point (-1, 0)).
 *
 *  Note that the point (-1, 0) has two valid representations, Pi and -Pi. The
 * normalized representation of this point internally is Pi, so that endpoints
 * of normal intervals are in the range (-Pi, Pi]. However, we take advantage of
 * the point -Pi to construct two special intervals: the Full() interval is
 * [-Pi, Pi], and the Empty() interval is [Pi, -Pi].
 *
 */
var R1Interval = (function (_super) {
    __extends(R1Interval, _super);
    function R1Interval() {
        _super.apply(this, arguments);
    }
    /** Return true if the interval is empty, i.e. it contains no points. */
    R1Interval.prototype.isEmpty = function () {
        return this.lo.gt(this.hi);
    };
    R1Interval.prototype.getCenter = function () {
        return this.lo.plus(this.hi).dividedBy(2);
    };
    R1Interval.prototype.getLength = function () {
        return this.hi.minus(this.lo);
    };
    R1Interval.prototype.contains = function (_p) {
        var p = S2_1.S2.toDecimal(_p);
        return p.gte(this.lo) && p.lte(this.hi);
    };
    /** Return true if the interior of the interval contains the point 'p'. */
    R1Interval.prototype.interiorContains = function (_p) {
        var p = S2_1.S2.toDecimal(_p);
        return p.gt(this.lo) && p.lt(this.hi);
    };
    /**
     * Return true if the interval contains the given interval 'y'. Works for
     * empty, full, and singleton intervals.
     */
    R1Interval.prototype.containsI = function (y) {
        if (y.isEmpty()) {
            return true;
        }
        return y.lo.gte(this.lo) && y.hi.lte(this.hi);
    };
    R1Interval.prototype.interiorContainsI = function (y) {
        if (y.isEmpty()) {
            return true;
        }
        return y.lo.gt(this.lo) && y.hi.lt(this.hi);
    };
    /**
     * Return true if this interval intersects the given interval, i.e. if they
     * have any points in common.
     */
    R1Interval.prototype.intersects = function (y) {
        if (this.lo.lte(y.lo)) {
            return y.lo.lte(this.hi) && y.lo.lte(y.hi);
        }
        else {
            return this.lo.lte(y.hi) && this.lo.lte(this.hi);
        }
    };
    /**
     * Return true if the interior of this interval intersects any point of the
     * given interval (including its boundary).
     */
    R1Interval.prototype.interiorIntersects = function (y) {
        return y.lo.lt(this.hi) && this.lo.lt(y.hi) && this.lo.lt(this.hi) && y.lo.lte(y.hi);
    };
    /** Expand the interval so that it contains the given point "p". */
    R1Interval.prototype.addPoint = function (_p) {
        var p = S2_1.S2.toDecimal(_p);
        if (this.isEmpty()) {
            return R1Interval.fromPoint(p);
        }
        else if (p.lt(this.lo)) {
            return new R1Interval(p, this.hi);
        }
        else if (p.gt(this.hi)) {
            return new R1Interval(this.lo, p);
        }
        else {
            return new R1Interval(this.lo, this.hi);
        }
    };
    /**
     * Return an interval that contains all points with a distance "radius" of a
     * point in this interval. Note that the expansion of an empty interval is
     * always empty.
     */
    R1Interval.prototype.expanded = function (_radius) {
        var radius = S2_1.S2.toDecimal(_radius);
        // assert (radius >= 0);
        if (this.isEmpty()) {
            return this;
        }
        return new R1Interval(this.lo.minus(radius), this.hi.plus(radius));
    };
    /**
     * Return the smallest interval that contains this interval and the given
     * interval "y".
     */
    R1Interval.prototype.union = function (y) {
        if (this.isEmpty()) {
            return y;
        }
        if (y.isEmpty()) {
            return this;
        }
        return new R1Interval(decimal_1.Decimal.min(this.lo, y.lo), decimal_1.Decimal.max(this.hi, y.hi));
    };
    /**
     * Return the intersection of this interval with the given interval. Empty
     * intervals do not need to be special-cased.
     */
    R1Interval.prototype.intersection = function (y) {
        return new R1Interval(decimal_1.Decimal.max(this.lo, y.lo), decimal_1.Decimal.min(this.hi, y.hi));
    };
    /**
     * Return true if the length of the symmetric difference between the two
     * intervals is at most the given tolerance.
     */
    R1Interval.prototype.approxEquals = function (y, maxError) {
        if (maxError === void 0) { maxError = 1e-15; }
        if (this.isEmpty()) {
            return y.getLength().lte(maxError);
        }
        if (y.isEmpty()) {
            return this.getLength().lte(maxError);
        }
        return y.lo.minus(this.lo).abs()
            .plus(y.hi.minus(this.hi).abs())
            .lte(maxError);
    };
    R1Interval.empty = function () {
        return new R1Interval(1, 0);
    };
    R1Interval.fromPoint = function (p) {
        return new R1Interval(p, p);
    };
    /**
     * Convenience method to construct the minimal interval containing the two
     * given points. This is equivalent to starting with an empty interval and
     * calling AddPoint() twice, but it is more efficient.
     */
    R1Interval.fromPointPair = function (_p1, _p2) {
        var p1 = S2_1.S2.toDecimal(_p1);
        var p2 = S2_1.S2.toDecimal(_p2);
        if (p1.lte(p2)) {
            return new R1Interval(p1, p2);
        }
        else {
            return new R1Interval(p2, p1);
        }
    };
    return R1Interval;
}(Interval_1.Interval));
exports.R1Interval = R1Interval;
//# sourceMappingURL=R1Interval.js.map

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright 2005 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//const Long = require("long");
var Long = __webpack_require__(49);
var S2Point_1 = __webpack_require__(22);
var R2Vector_1 = __webpack_require__(54);
var S2_1 = __webpack_require__(10);
var MutableInteger_1 = __webpack_require__(106);
var S2LatLng_1 = __webpack_require__(56);
var decimal_1 = __webpack_require__(23);
var parseHex = function parseHex(str) {
    return Long.fromString(str, false, 16);
};
/**
 * An S2CellId is a 64-bit unsigned integer that uniquely identifies a cell in
 * the S2 cell decomposition. It has the following format:
 *
 * <pre>
 * id = [face][face_pos]
 * </pre>
 *
 * face: a 3-bit number (range 0..5) encoding the cube face.
 *
 * face_pos: a 61-bit number encoding the position of the center of this cell
 * along the Hilbert curve over this face (see the Wiki pages for details).
 *
 * Sequentially increasing cell ids follow a continuous space-filling curve over
 * the entire sphere. They have the following properties:
 *  - The id of a cell at level k consists of a 3-bit face number followed by k
 * bit pairs that recursively select one of the four children of each cell. The
 * next bit is always 1, and all other bits are 0. Therefore, the level of a
 * cell is determined by the position of its lowest-numbered bit that is turned
 * on (for a cell at level k, this position is 2 * (MAX_LEVEL - k).)
 *  - The id of a parent cell is at the midpoint of the range of ids spanned by
 * its children (or by its descendants at any level).
 *
 * Leaf cells are often used to represent points on the unit sphere, and this
 * class provides methods for converting directly between these two
 * representations. For cells that represent 2D regions rather than discrete
 * point, it is better to use the S2Cell class.
 *
 *
 */
var S2CellId = (function () {
    function S2CellId(id) {
        if (typeof (id) === 'string') {
            this.id = Long.fromString(id);
        }
        else {
            this.id = id;
        }
    }
    Object.defineProperty(S2CellId.prototype, "face", {
        /** Which cube face this cell belongs to, in the range 0..5. */
        get: function () {
            return this.id.shiftRightUnsigned(S2CellId.POS_BITS).toInt();
        },
        enumerable: true,
        configurable: true
    });
    /** Return the lowest-numbered bit that is on for cells at the given level. */
    S2CellId.prototype.lowestOnBit = function () {
        return this.id.and(this.id.negate());
    };
    /** The default constructor returns an invalid cell id. */
    S2CellId.none = function () {
        return new S2CellId(new Long(0));
    };
    /**
     * Returns an invalid cell id guaranteed to be larger than any valid cell id.
     * Useful for creating indexes.
     */
    S2CellId.sentinel = function () {
        return new S2CellId(S2CellId.MAX_UNSIGNED); // -1
    };
    S2CellId.prototype.getBits1 = function (i, j, k, bits) {
        var nbits = (k == 7) ? (S2CellId.MAX_LEVEL - 7 * S2CellId.LOOKUP_BITS) : S2CellId.LOOKUP_BITS;
        bits += (this.id
            .shiftRightUnsigned((k * 2 * S2CellId.LOOKUP_BITS + 1))
            .getLowBitsUnsigned()
            & ((1 << (2 * nbits)) - 1)) << 2;
        /*
         * System.out.println("id is: " + id_); System.out.println("bits is " +
         * bits); System.out.println("lookup_ij[bits] is " + lookup_ij[bits]);
         */
        bits = S2CellId.LOOKUP_IJ[bits];
        i.val = i.val + ((bits >> (S2CellId.LOOKUP_BITS + 2)) << (k * S2CellId.LOOKUP_BITS));
        // i.setValue(i.intValue() + ((bits >> (LOOKUP_BITS + 2)) << (k * LOOKUP_BITS)));
        /*
         * System.out.println("left is " + ((bits >> 2) & ((1 << kLookupBits) -
         * 1))); System.out.println("right is " + (k * kLookupBits));
         * System.out.println("j is: " + j.intValue()); System.out.println("addition
         * is: " + ((((bits >> 2) & ((1 << kLookupBits) - 1))) << (k *
         * kLookupBits)));
         */
        j.val = j.val + ((((bits >> 2) & ((1 << S2CellId.LOOKUP_BITS) - 1))) << (k * S2CellId.LOOKUP_BITS));
        bits &= (S2_1.S2.SWAP_MASK | S2_1.S2.INVERT_MASK);
        return bits;
    };
    /**
     * Convert (face, si, ti) coordinates (see s2.h) to a direction vector (not
     * necessarily unit length).
     */
    S2CellId.prototype.faceSiTiToXYZ = function (face, si, ti) {
        // console.log('faceSiTiToXYZ', si, ti);
        var kScale = S2_1.S2.toDecimal(1).dividedBy(S2CellId.MAX_SIZE);
        var uvVector = R2Vector_1.R2Vector.fromSTVector(new R2Vector_1.R2Vector(kScale.times(si), kScale.times(ti)));
        // console.log(uvVector.toString(), uvVector.x.toString());
        return uvVector.toPoint(face);
    };
    S2CellId.lowestOnBitForLevel = function (level) {
        return new Long(1).shiftLeft(2 * (S2CellId.MAX_LEVEL - level));
    };
    /**
     * Return the (face, i, j) coordinates for the leaf cell corresponding to this
     * cell id. Since cells are represented by the Hilbert curve position at the
     * center of the cell, the returned (i,j) for non-leaf cells will be a leaf
     * cell adjacent to the cell center. If "orientation" is non-NULL, also return
     * the Hilbert curve orientation for the current cell.
     */
    S2CellId.prototype.toFaceIJOrientation = function (pi, pj, orientation) {
        // System.out.println("Entering toFaceIjorientation");
        var face = this.face;
        var bits = (face & S2_1.S2.SWAP_MASK);
        // System.out.println("face = " + face + " bits = " + bits);
        // Each iteration maps 8 bits of the Hilbert curve position into
        // 4 bits of "i" and "j". The lookup table transforms a key of the
        // form "ppppppppoo" to a value of the form "iiiijjjjoo", where the
        // letters [ijpo] represents bits of "i", "j", the Hilbert curve
        // position, and the Hilbert curve orientation respectively.
        //
        // On the first iteration we need to be careful to clear out the bits
        // representing the cube face.
        for (var k = 7; k >= 0; --k) {
            bits = this.getBits1(pi, pj, k, bits);
        }
        if (orientation != null) {
            // The position of a non-leaf cell at level "n" consists of a prefix of
            // 2*n bits that identifies the cell, followed by a suffix of
            // 2*(MAX_LEVEL-n)+1 bits of the form 10*. If n==MAX_LEVEL, the suffix is
            // just "1" and has no effect. Otherwise, it consists of "10", followed
            // by (MAX_LEVEL-n-1) repetitions of "00", followed by "0". The "10" has
            // no effect, while each occurrence of "00" has the effect of reversing
            // the kSwapMask bit.
            // assert (S2.POS_TO_ORIENTATION[2] == 0);
            // assert (S2.POS_TO_ORIENTATION[0] == S2.SWAP_MASK);
            if ((Long.fromString('0x1111111111111110', true, 16).and(this.lowestOnBit()).notEquals(0))) {
                bits ^= S2_1.S2.SWAP_MASK;
            }
            orientation.val = bits;
        }
        return face;
    };
    /**
     * Return true if this is a leaf cell (more efficient than checking whether
     * level() == MAX_LEVEL).
     */
    S2CellId.prototype.isLeaf = function () {
        return this.id.and(1).getLowBits() != 0;
    };
    /**
     * Return the cell at the previous level or at the given level (which must be
     * less than or equal to the current level).
     */
    S2CellId.prototype.parentL = function (level) {
        // assert (isValid() && level >= 0 && level <= this.level());
        var newLsb = S2CellId.lowestOnBitForLevel(level);
        return new S2CellId(this.id.and(newLsb.negate()).or(newLsb));
        // return new S2CellId((id & -newLsb) | newLsb);
    };
    S2CellId.prototype.parent = function () {
        // assert (isValid() && level() > 0);
        var newLsb = this.lowestOnBit().shiftLeft(2);
        // return new S2CellId((id & -newLsb) | newLsb);
        return new S2CellId(this.id.and(newLsb.negate()).or(newLsb));
    };
    /**
     * Return a cell given its face (range 0..5), 61-bit Hilbert curve position
     * within that face, and level (range 0..MAX_LEVEL). The given position will
     * be modified to correspond to the Hilbert curve position at the center of
     * the returned cell. This is a static function rather than a constructor in
     * order to give names to the arguments.
     */
    S2CellId.fromFacePosLevel = function (face, pos, level) {
        // equivalent to pos | 1
        return new S2CellId(new Long(face)
            .shiftLeft(S2CellId.POS_BITS)
            .add(pos.or(1))).parentL(level);
        // return new S2CellId((((long) face) << POS_BITS) + (pos | 1)).parent(level);
    };
    // /**
    //  * Return the leaf cell containing the given point (a direction vector, not
    //  * necessarily unit length).
    //  */
    S2CellId.fromPoint = function (p) {
        var face = p.toFace();
        var uv = p.toR2Vector(face);
        var i = S2CellId.stToIJ(uv.toSt(0));
        var j = S2CellId.stToIJ(uv.toSt(1));
        return S2CellId.fromFaceIJ(face, i, j);
    };
    //
    //
    // /** Return the leaf cell containing the given S2LatLng. */
    // public static S2CellId fromLatLng(S2LatLng ll) {
    //   return fromPoint(ll.toPoint());
    // }
    S2CellId.prototype.toPoint = function () {
        return S2Point_1.S2Point.normalize(this.toPointRaw());
    };
    /**
     * Return the direction vector corresponding to the center of the given cell.
     * The vector returned by ToPointRaw is not necessarily unit length.
     */
    S2CellId.prototype.toPointRaw = function () {
        // First we compute the discrete (i,j) coordinates of a leaf cell contained
        // within the given cell. Given that cells are represented by the Hilbert
        // curve position corresponding at their center, it turns out that the cell
        // returned by ToFaceIJOrientation is always one of two leaf cells closest
        // to the center of the cell (unless the given cell is a leaf cell itself,
        // in which case there is only one possibility).
        //
        // Given a cell of size s >= 2 (i.e. not a leaf cell), and letting (imin,
        // jmin) be the coordinates of its lower left-hand corner, the leaf cell
        // returned by ToFaceIJOrientation() is either (imin + s/2, jmin + s/2)
        // (imin + s/2 - 1, jmin + s/2 - 1). We can distinguish these two cases by
        // looking at the low bit of "i" or "j". In the first case the low bit is
        // zero, unless s == 2 (i.e. the level just above leaf cells) in which case
        // the low bit is one.
        //
        // The following calculation converts (i,j) to the (si,ti) coordinates of
        // the cell center. (We need to multiply the coordinates by a factor of 2
        // so that the center of leaf cells can be represented exactly.)
        var i = new MutableInteger_1.MutableInteger(0);
        var j = new MutableInteger_1.MutableInteger(0);
        var face = this.toFaceIJOrientation(i, j, null);
        // System.out.println("i= " + i.intValue() + " j = " + j.intValue());
        // let delta = isLeaf() ? 1 : (((i.intValue() ^ (((int) id) >>> 2)) & 1) != 0) ? 2 : 0;
        var delta = this.isLeaf()
            ? 1 :
            ((((new Long(i.val).getLowBits() ^ ((this.id.getLowBits()) >>> 2)) & 1) != 0)
                ? 2 : 0);
        // let delta = this.isLeaf() ? 1 : new Long(i.val).and(this.id.getLowBits() >>> 2).and(1).notEquals(1) ? 2 : 0
        // ((i.val ? (((int)id) >>> 2))  & 1  ))
        var si = new Long((i.val << 1) + delta - S2CellId.MAX_SIZE).getLowBits();
        var ti = new Long((j.val << 1) + delta - S2CellId.MAX_SIZE).getLowBits();
        return this.faceSiTiToXYZ(face, si, ti);
    };
    /** Return the S2LatLng corresponding to the center of the given cell. */
    S2CellId.prototype.toLatLng = function () {
        return S2LatLng_1.S2LatLng.fromPoint(this.toPointRaw());
    };
    /** Return true if id() represents a valid cell. */
    S2CellId.prototype.isValid = function () {
        return this.face < S2CellId.NUM_FACES && ((this.lowestOnBit().and(Long.fromString('0x1555555555555555', false, 16)).notEquals(0)));
        // return this.face() < NUM_FACES && ((lowestOnBit() & (0x1555555555555555L)) != 0);
    };
    /**
     * The position of the cell center along the Hilbert curve over this face, in
     * the range 0..(2**kPosBits-1).
     */
    S2CellId.prototype.pos = function () {
        return this.id.and(S2CellId.MAX_UNSIGNED.shiftRightUnsigned(S2CellId.FACE_BITS));
        // return (id & (-1L >>> FACE_BITS));
    };
    /** Return the subdivision level of the cell (range 0..MAX_LEVEL). */
    S2CellId.prototype.level = function () {
        // Fast path for leaf cells.
        if (this.isLeaf()) {
            return S2CellId.MAX_LEVEL;
        }
        var x = this.id.getLowBits();
        var level = -1;
        if (x != 0) {
            level += 16;
        }
        else {
            x = this.id.shiftRightUnsigned(32).getLowBits();
        }
        // We only need to look at even-numbered bits to determine the
        // level of a valid cell id.
        x &= -x; // Get lowest bit.
        if ((x & 0x00005555) != 0) {
            level += 8;
        }
        if ((x & 0x00550055) != 0) {
            level += 4;
        }
        if ((x & 0x05050505) != 0) {
            level += 2;
        }
        if ((x & 0x11111111) != 0) {
            level += 1;
        }
        // assert (level >= 0 && level <= MAX_LEVEL);
        return level;
    };
    /**
     * Return true if this is a top-level face cell (more efficient than checking
     * whether level() == 0).
     */
    S2CellId.prototype.isFace = function () {
        return this.level() === 0;
        // return (id & (lowestOnBitForLevel(0) - 1)) == 0;
    };
    /**
     * Return the child position (0..3) of this cell's ancestor at the given
     * level, relative to its parent. The argument should be in the range
     * 1..MAX_LEVEL. For example, child_position(1) returns the position of this
     * cell's level-1 ancestor within its top-level face cell.
     */
    S2CellId.prototype.childPosition = function (level) {
        return this.id.shiftRight((2 * (S2CellId.MAX_LEVEL - level) + 1)).and(3).getLowBits();
        // return (int) (id >>> (2 * (MAX_LEVEL - level) + 1)) & 3;
    };
    // Methods that return the range of cell ids that are contained
    // within this cell (including itself). The range is *inclusive*
    // (i.e. test using >= and <=) and the return values of both
    // methods are valid leaf cell ids.
    //
    // These methods should not be used for iteration. If you want to
    // iterate through all the leaf cells, call child_begin(MAX_LEVEL) and
    // child_end(MAX_LEVEL) instead.
    //
    // It would in fact be error-prone to define a range_end() method,
    // because (range_max().id() + 1) is not always a valid cell id, and the
    // iterator would need to be tested using "<" rather that the usual "!=".
    S2CellId.prototype.rangeMin = function () {
        return new S2CellId(this.id.sub(this.lowestOnBit().sub(1)));
        // return new S2CellId(id - (lowestOnBit() - 1));
    };
    S2CellId.prototype.rangeMax = function () {
        return new S2CellId(this.id.add(this.lowestOnBit().sub(1)));
        // return new S2CellId(id + (lowestOnBit() - 1));
    };
    //
    //
    /** Return true if the given cell is contained within this one. */
    S2CellId.prototype.contains = function (other) {
        // assert (isValid() && other.isValid());
        return other.greaterOrEquals(this.rangeMin()) && other.lessOrEquals(this.rangeMax());
    };
    /** Return true if the given cell intersects this one. */
    S2CellId.prototype.intersects = function (other) {
        // assert (isValid() && other.isValid());
        return other.rangeMin().lessOrEquals(this.rangeMax())
            && other.rangeMax().greaterOrEquals(this.rangeMin());
    };
    S2CellId.prototype.childBegin = function () {
        // assert (isValid() && level() < MAX_LEVEL);
        var oldLsb = this.lowestOnBit();
        return new S2CellId(this.id.sub(oldLsb).add(oldLsb.shiftRight(2)));
        // return new S2CellId(id - oldLsb + (oldLsb >>> 2));
    };
    S2CellId.prototype.childBeginL = function (level) {
        // assert (isValid() && level >= this.level() && level <= MAX_LEVEL);
        return new S2CellId(this.id.sub(this.lowestOnBit()).add(S2CellId.lowestOnBitForLevel(level)));
        // return new S2CellId(id - lowestOnBit() + lowestOnBitForLevel(level));
    };
    S2CellId.prototype.childEnd = function () {
        // assert (isValid() && level() < MAX_LEVEL);
        var oldLsb = this.lowestOnBit();
        return new S2CellId(this.id.add(oldLsb).add(oldLsb.shiftRightUnsigned(2)));
        // return new S2CellId(id + oldLsb + (oldLsb >>> 2));
    };
    S2CellId.prototype.childEndL = function (level) {
        // assert (isValid() && level >= this.level() && level <= MAX_LEVEL);
        return new S2CellId(this.id.add(this.lowestOnBit()).add(S2CellId.lowestOnBitForLevel(level)));
        // return new S2CellId(id + lowestOnBit() + lowestOnBitForLevel(level));
    };
    //
    // Iterator-style methods for traversing the immediate children of a cell or
    // all of the children at a given level (greater than or equal to the current
    // level). Note that the end value is exclusive, just like standard STL
    // iterators, and may not even be a valid cell id. You should iterate using
    // code like this:
    //
    // for(S2CellId c = id.childBegin(); !c.equals(id.childEnd()); c = c.next())
    // ...
    //
    // The convention for advancing the iterator is "c = c.next()", so be sure
    // to use 'equals()' in the loop guard, or compare 64-bit cell id's,
    // rather than "c != id.childEnd()".
    /**
     * Return the next cell at the same level along the Hilbert curve. Works
     * correctly when advancing from one face to the next, but does *not* wrap
     * around from the last face to the first or vice versa.
     */
    S2CellId.prototype.next = function () {
        return new S2CellId(this.id.add(this.lowestOnBit().shiftLeft(1)));
        // return new S2CellId(id + (lowestOnBit() << 1));
    };
    /**
     * Return the previous cell at the same level along the Hilbert curve. Works
     * correctly when advancing from one face to the next, but does *not* wrap
     * around from the last face to the first or vice versa.
     */
    S2CellId.prototype.prev = function () {
        return new S2CellId(this.id.sub(this.lowestOnBit().shiftLeft(1)));
        // return new S2CellId(id - (lowestOnBit() << 1));
    };
    /**
     * Like next(), but wraps around from the last face to the first and vice
     * versa. Should *not* be used for iteration in conjunction with
     * child_begin(), child_end(), Begin(), or End().
     */
    S2CellId.prototype.nextWrap = function () {
        var n = this.next();
        if (S2CellId.unsignedLongLessThan(n.id, S2CellId.WRAP_OFFSET)) {
            return n;
        }
        return new S2CellId(n.id.sub(S2CellId.WRAP_OFFSET));
        // return new S2CellId(n.id - WRAP_OFFSET);
    };
    /**
     * Like prev(), but wraps around from the last face to the first and vice
     * versa. Should *not* be used for iteration in conjunction with
     * child_begin(), child_end(), Begin(), or End().
     */
    S2CellId.prototype.prevWrap = function () {
        var p = this.prev();
        if (p.id.lessThan(S2CellId.WRAP_OFFSET)) {
            return p;
        }
        return new S2CellId(p.id.add(S2CellId.WRAP_OFFSET));
    };
    S2CellId.begin = function (level) {
        return S2CellId.fromFacePosLevel(0, new Long(0), 0).childBeginL(level);
    };
    S2CellId.end = function (level) {
        return S2CellId.fromFacePosLevel(5, new Long(0), 0).childEndL(level);
    };
    /**
     * Decodes the cell id from a compact text string suitable for display or
     * indexing. Cells at lower levels (i.e. larger cells) are encoded into
     * fewer characters. The maximum token length is 16.
     *
     * @param token the token to decode
     * @return the S2CellId for that token
     * @throws NumberFormatException if the token is not formatted correctly
     */
    S2CellId.fromToken = function (token) {
        if (token == null) {
            throw new Error("Null string in S2CellId.fromToken");
        }
        if (token.length == 0) {
            throw new Error("Empty string in S2CellId.fromToken");
        }
        if (token.length > 16 || "X" == token) {
            return S2CellId.none();
        }
        var value = new Long(0);
        for (var pos = 0; pos < 16; pos++) {
            var digit = new Long(0);
            if (pos < token.length) {
                digit = Long.fromString(token[pos], true, 16);
                if (digit.equals(-1)) {
                    throw new Error(token);
                }
                if (S2CellId.overflowInParse(value, digit.toNumber())) {
                    throw new Error("Too large for unsigned long: " + token);
                }
            }
            value = value.mul(16).add(digit);
        }
        return new S2CellId(value);
    };
    /**
     * Encodes the cell id to compact text strings suitable for display or indexing.
     * Cells at lower levels (i.e. larger cells) are encoded into fewer characters.
     * The maximum token length is 16.
     *
     * Simple implementation: convert the id to hex and strip trailing zeros. We
     * could use base-32 or base-64, but assuming the cells used for indexing
     * regions are at least 100 meters across (level 16 or less), the savings
     * would be at most 3 bytes (9 bytes hex vs. 6 bytes base-64).
     *
     * @return the encoded cell id
     */
    S2CellId.prototype.toToken = function () {
        if (this.id.equals(0)) {
            return "X";
        }
        var hex = this.id.toUnsigned().toString(16);
        // Long.toHexString(id).toLowerCase(Locale.ENGLISH);
        var sb = '';
        for (var i = hex.length; i < 16; i++) {
            sb += '0';
        }
        sb += hex;
        // sb.append(hex);
        for (var len = 16; len > 0; len--) {
            if (sb[len - 1] != '0') {
                return sb.substring(0, len);
            }
        }
        throw new Error("Shouldn't make it here");
    };
    /**
     * Returns true if (current * radix) + digit is a number too large to be
     * represented by an unsigned long.  This is useful for detecting overflow
     * while parsing a string representation of a number.
     * Does not verify whether supplied radix is valid, passing an invalid radix
     * will give undefined results or an ArrayIndexOutOfBoundsException.
     */
    S2CellId.overflowInParse = function (current, digit, radix) {
        if (radix === void 0) { radix = 10; }
        if (current.greaterThanOrEqual(0)) {
            if (current.lessThan(S2CellId.maxValueDivs[radix])) {
                return false;
            }
            if (current.greaterThan(S2CellId.maxValueDivs[radix])) {
                return true;
            }
            // current == maxValueDivs[radix]
            return (digit > S2CellId.maxValueMods[radix]);
        }
        // current < 0: high bit is set
        return true;
    };
    /**
     * Return the four cells that are adjacent across the cell's four edges.
     * Neighbors are returned in the order defined by S2Cell::GetEdge. All
     * neighbors are guaranteed to be distinct.
     */
    S2CellId.prototype.getEdgeNeighbors = function () {
        var i = new MutableInteger_1.MutableInteger(0);
        var j = new MutableInteger_1.MutableInteger(0);
        var level = this.level();
        var size = 1 << (S2CellId.MAX_LEVEL - level);
        var face = this.toFaceIJOrientation(i, j, null);
        var neighbors = [];
        // Edges 0, 1, 2, 3 are in the S, E, N, W directions.
        neighbors.push(S2CellId.fromFaceIJSame(face, i.val, j.val - size, j.val - size >= 0).parentL(level));
        neighbors.push(S2CellId.fromFaceIJSame(face, i.val + size, j.val, i.val + size < S2CellId.MAX_SIZE).parentL(level));
        neighbors.push(S2CellId.fromFaceIJSame(face, i.val, j.val + size, j.val + size < S2CellId.MAX_SIZE).parentL(level));
        neighbors.push(S2CellId.fromFaceIJSame(face, i.val - size, j.val, i.val - size >= 0).parentL(level));
        // neighbors[0] = fromFaceIJSame(face, i.intValue(), j.intValue() - size,
        //     j.intValue() - size >= 0).parent(level);
        // neighbors[1] = fromFaceIJSame(face, i.intValue() + size, j.intValue(),
        //     i.intValue() + size < MAX_SIZE).parent(level);
        // neighbors[2] = fromFaceIJSame(face, i.intValue(), j.intValue() + size,
        //     j.intValue() + size < MAX_SIZE).parent(level);
        // neighbors[3] = fromFaceIJSame(face, i.intValue() - size, j.intValue(),
        //     i.intValue() - size >= 0).parent(level);
        return neighbors;
    };
    /**
     * Return the neighbors of closest vertex to this cell at the given level, by
     * appending them to "output". Normally there are four neighbors, but the
     * closest vertex may only have three neighbors if it is one of the 8 cube
     * vertices.
     *
     * Requires: level < this.evel(), so that we can determine which vertex is
     * closest (in particular, level == MAX_LEVEL is not allowed).
     */
    S2CellId.prototype.getVertexNeighbors = function (level) {
        // "level" must be strictly less than this cell's level so that we can
        // determine which vertex this cell is closest to.
        // assert (level < this.level());
        var i = new MutableInteger_1.MutableInteger(0);
        var j = new MutableInteger_1.MutableInteger(0);
        var face = this.toFaceIJOrientation(i, j, null);
        // Determine the i- and j-offsets to the closest neighboring cell in each
        // direction. This involves looking at the next bit of "i" and "j" to
        // determine which quadrant of this->parent(level) this cell lies in.
        var halfsize = 1 << (S2CellId.MAX_LEVEL - (level + 1));
        var size = halfsize << 1;
        var isame, jsame;
        var ioffset, joffset;
        if ((i.val & halfsize) != 0) {
            ioffset = size;
            isame = (i.val + size) < S2CellId.MAX_SIZE;
        }
        else {
            ioffset = -size;
            isame = (i.val - size) >= 0;
        }
        if ((j.val & halfsize) != 0) {
            joffset = size;
            jsame = (j.val + size) < S2CellId.MAX_SIZE;
        }
        else {
            joffset = -size;
            jsame = (j.val - size) >= 0;
        }
        var toRet = [];
        toRet.push(this.parentL(level));
        toRet.push(S2CellId
            .fromFaceIJSame(face, i.val + ioffset, j.val, isame)
            .parentL(level));
        // output
        //     .add(fromFaceIJSame(face, i.intValue() + ioffset, j.intValue(), isame)
        //         .parent(level));
        toRet.push(S2CellId
            .fromFaceIJSame(face, i.val, j.val + joffset, jsame)
            .parentL(level));
        // output
        //     .add(fromFaceIJSame(face, i.intValue(), j.intValue() + joffset, jsame)
        //         .parent(level));
        // If i- and j- edge neighbors are *both* on a different face, then this
        // vertex only has three neighbors (it is one of the 8 cube vertices).
        if (isame || jsame) {
            toRet.push(S2CellId.fromFaceIJSame(face, i.val + ioffset, j.val + joffset, isame && jsame).parentL(level));
        }
        return toRet;
    };
    /**
     * Append all neighbors of this cell at the given level to "output". Two cells
     * X and Y are neighbors if their boundaries intersect but their interiors do
     * not. In particular, two cells that intersect at a single point are
     * neighbors.
     *
     * Requires: nbr_level >= this->level(). Note that for cells adjacent to a
     * face vertex, the same neighbor may be appended more than once.
     */
    S2CellId.prototype.getAllNeighbors = function (nbrLevel) {
        var i = new MutableInteger_1.MutableInteger(0);
        var j = new MutableInteger_1.MutableInteger(0);
        var face = this.toFaceIJOrientation(i, j, null);
        // Find the coordinates of the lower left-hand leaf cell. We need to
        // normalize (i,j) to a known position within the cell because nbr_level
        // may be larger than this cell's level.
        var size = 1 << (S2CellId.MAX_LEVEL - this.level());
        i.val = i.val & -size;
        j.val = j.val & -size;
        var nbrSize = 1 << (S2CellId.MAX_LEVEL - nbrLevel);
        // assert (nbrSize <= size);
        var output = [];
        // We compute the N-S, E-W, and diagonal neighbors in one pass.
        // The loop test is at the end of the loop to avoid 32-bit overflow.
        for (var k = -nbrSize;; k += nbrSize) {
            var sameFace = void 0;
            if (k < 0) {
                sameFace = (j.val + k >= 0);
            }
            else if (k >= size) {
                sameFace = (j.val + k < S2CellId.MAX_SIZE);
            }
            else {
                sameFace = true;
                // North and South neighbors.
                output.push(S2CellId.fromFaceIJSame(face, i.val + k, j.val - nbrSize, j.val - size >= 0).parentL(nbrLevel));
                output.push(S2CellId.fromFaceIJSame(face, i.val + k, j.val + size, j.val + size < S2CellId.MAX_SIZE).parentL(nbrLevel));
            }
            // East, West, and Diagonal neighbors.
            output.push(S2CellId.fromFaceIJSame(face, i.val - nbrSize, j.val + k, sameFace && i.val - size >= 0).parentL(nbrLevel));
            output.push(S2CellId.fromFaceIJSame(face, i.val + size, j.val + k, sameFace && i.val + size < S2CellId.MAX_SIZE).parentL(nbrLevel));
            if (k >= size) {
                break;
            }
        }
        return output;
    };
    // ///////////////////////////////////////////////////////////////////
    // Low-level methods.
    /**
     * Return a leaf cell given its cube face (range 0..5) and i- and
     * j-coordinates (see s2.h).
     */
    S2CellId.fromFaceIJ = function (face, i, j) {
        // Optimization notes:
        // - Non-overlapping bit fields can be combined with either "+" or "|".
        // Generally "+" seems to produce better code, but not always.
        // gcc doesn't have very good code generation for 64-bit operations.
        // We optimize this by computing the result as two 32-bit integers
        // and combining them at the end. Declaring the result as an array
        // rather than local variables helps the compiler to do a better job
        // of register allocation as well. Note that the two 32-bits halves
        // get shifted one bit to the left when they are combined.
        var faceL = new Long(face);
        var n = [new Long(0), faceL.shiftLeft(S2CellId.POS_BITS - 33)];
        // Alternating faces have opposite Hilbert curve orientations; this
        // is necessary in order for all faces to have a right-handed
        // coordinate system.
        var bits = faceL.and(S2CellId.SWAP_MASK);
        // Each iteration maps 4 bits of "i" and "j" into 8 bits of the Hilbert
        // curve position. The lookup table transforms a 10-bit key of the form
        // "iiiijjjjoo" to a 10-bit value of the form "ppppppppoo", where the
        // letters [ijpo] denote bits of "i", "j", Hilbert curve position, and
        // Hilbert curve orientation respectively.
        for (var k = 7; k >= 0; --k) {
            bits = S2CellId.getBits(n, i, j, k, bits);
        }
        // S2CellId s = new S2CellId((((n[1] << 32) + n[0]) << 1) + 1);
        return new S2CellId(n[1].shiftLeft(32)
            .add(n[0])
            .shiftLeft(1)
            .add(1));
    };
    S2CellId.getBits = function (n, i, j, k, bits) {
        var mask = new Long(1).shiftLeft(S2CellId.LOOKUP_BITS).sub(1);
        bits = bits.add(new Long(i)
            .shiftRight(k * S2CellId.LOOKUP_BITS)
            .and(mask)
            .shiftLeft(S2CellId.LOOKUP_BITS + 2));
        // bits += (((i >> (k * LOOKUP_BITS)) & mask) << (LOOKUP_BITS + 2));
        bits = bits.add(new Long(j)
            .shiftRight(k * S2CellId.LOOKUP_BITS)
            .and(mask)
            .shiftLeft(2));
        // bits += (((j >> (k * LOOKUP_BITS)) & mask) << 2);
        bits = S2CellId.LOOKUP_POS[bits.toNumber()];
        n[k >> 2] = n[k >> 2].or(bits.shiftRight(2).shiftLeft((k & 3) * 2 * S2CellId.LOOKUP_BITS));
        // n[k >> 2] |= ((((long) bits) >> 2) << ((k & 3) * 2 * LOOKUP_BITS));
        return bits.and(S2CellId.SWAP_MASK | S2CellId.INVERT_MASK);
    };
    /**
     * Return the i- or j-index of the leaf cell containing the given s- or
     * t-value.
     */
    S2CellId.stToIJ = function (_s) {
        // Converting from floating-point to integers via static_cast is very slow
        // on Intel processors because it requires changing the rounding mode.
        // Rounding to the nearest integer using FastIntRound() is much faster.
        var s = S2_1.S2.toDecimal(_s);
        var m = S2_1.S2.toDecimal(S2CellId.MAX_SIZE).dividedBy(2); // scaling multiplier
        return decimal_1.Decimal.max(0, decimal_1.Decimal.min(m.times(2).minus(1), decimal_1.Decimal.round(m.times(s).plus(m.minus(0.5))))).toNumber();
        // return Math.max(0,  Math.min(2 * m - 1, Math.round(m * s + (m - 0.5))));
        // return (int) Math.max(0, Math.min(2 * m - 1, Math.round(m * s + (m - 0.5))));
    };
    /**
     * Given (i, j) coordinates that may be out of bounds, normalize them by
     * returning the corresponding neighbor cell on an adjacent face.
     */
    S2CellId.fromFaceIJWrap = function (face, i, j) {
        // Convert i and j to the coordinates of a leaf cell just beyond the
        // boundary of this face. This prevents 32-bit overflow in the case
        // of finding the neighbors of a face cell, and also means that we
        // don't need to worry about the distinction between (s,t) and (u,v).
        i = Math.max(-1, Math.min(S2CellId.MAX_SIZE, i));
        j = Math.max(-1, Math.min(S2CellId.MAX_SIZE, j));
        // Find the (s,t) coordinates corresponding to (i,j). At least one
        // of these coordinates will be just outside the range [0, 1].
        var kScale = S2_1.S2.toDecimal(1.0).dividedBy(S2CellId.MAX_SIZE);
        var s = kScale.times(new Long(i).shiftLeft(1).add(1).sub(S2CellId.MAX_SIZE).toInt());
        var t = kScale.times(new Long(j).shiftLeft(1).add(1).sub(S2CellId.MAX_SIZE).toInt());
        // Find the leaf cell coordinates on the adjacent face, and convert
        // them to a cell id at the appropriate level.
        var p = new R2Vector_1.R2Vector(s, t).toPoint(face);
        face = p.toFace();
        // face = S2Projections.xyzToFace(p);
        var st = p.toR2Vector(face);
        // R2Vector st = S2Projections.validFaceXyzToUv(face, p);
        return S2CellId.fromFaceIJ(face, S2CellId.stToIJ(st.x), S2CellId.stToIJ(st.y));
    };
    /**
     * Public helper function that calls FromFaceIJ if sameFace is true, or
     * FromFaceIJWrap if sameFace is false.
     */
    S2CellId.fromFaceIJSame = function (face, i, j, sameFace) {
        if (sameFace) {
            return S2CellId.fromFaceIJ(face, i, j);
        }
        else {
            return S2CellId.fromFaceIJWrap(face, i, j);
        }
    };
    /**
     * Returns true if x1 < x2, when both values are treated as unsigned.
     */
    S2CellId.unsignedLongLessThan = function (x1, x2) {
        return x1.toUnsigned().lessThan(x2.toUnsigned());
        // return (x1 + Long.MIN_VALUE) < (x2 + Long.MIN_VALUE);
    };
    /**
     * Returns true if x1 > x2, when both values are treated as unsigned.
     */
    S2CellId.unsignedLongGreaterThan = function (x1, x2) {
        return x1.toUnsigned().greaterThan(x2.toUnsigned());
        // return (x1 + Long.MIN_VALUE) > (x2 + Long.MIN_VALUE);
    };
    S2CellId.prototype.lessThan = function (x) {
        return S2CellId.unsignedLongLessThan(this.id, x.id);
    };
    S2CellId.prototype.greaterThan = function (x) {
        return S2CellId.unsignedLongGreaterThan(this.id, x.id);
    };
    S2CellId.prototype.lessOrEquals = function (x) {
        return S2CellId.unsignedLongLessThan(this.id, x.id) || this.id.equals(x.id);
    };
    S2CellId.prototype.greaterOrEquals = function (x) {
        return S2CellId.unsignedLongGreaterThan(this.id, x.id) || this.id.equals(x.id);
    };
    S2CellId.prototype.toString = function () {
        return "(face=" + this.face + ", pos=" + this.pos().toString(16) + ", level="
            + this.level() + ")";
    };
    S2CellId.prototype.compareTo = function (that) {
        return S2CellId.unsignedLongLessThan(this.id, that.id) ? -1 :
            S2CellId.unsignedLongGreaterThan(this.id, that.id) ? 1 : 0;
    };
    S2CellId.prototype.equals = function (that) {
        return this.compareTo(that) === 0;
    };
    /**
     * Returns the position of the id within the given list or a negative value with
     * the position of the index wher eit should be entered if the id was present
     */
    S2CellId.binarySearch = function (ids, _id, low) {
        if (low === void 0) { low = 0; }
        var id;
        if (_id instanceof S2CellId) {
            id = _id;
        }
        else if (_id instanceof Long) {
            id = new S2CellId(_id);
        }
        var high = ids.length - 1;
        while (low <= high) {
            var mid = (low + high) >>> 1;
            var midVal = ids[mid];
            var cmp = midVal.compareTo(id);
            if (cmp < 0)
                low = mid + 1;
            else if (cmp > 0)
                high = mid - 1;
            else
                return mid; // key found
        }
        return -(low + 1); // key not found
    };
    S2CellId.indexedBinarySearch = function (ids, id, low) {
        if (low === void 0) { low = 0; }
        var toRet = this.binarySearch(ids, id, low);
        if (toRet >= 0) {
            return toRet;
        }
        else {
            return -(toRet + 1);
        }
    };
    // Although only 60 bits are needed to represent the index of a leaf
    // cell, we need an extra bit in order to represent the position of
    // the center of the leaf cell along the Hilbert curve.
    S2CellId.FACE_BITS = 3;
    S2CellId.NUM_FACES = 6;
    S2CellId.MAX_LEVEL = 30; // Valid levels: 0..MAX_LEVEL
    S2CellId.POS_BITS = 2 * S2CellId.MAX_LEVEL + 1;
    S2CellId.MAX_SIZE = 1 << S2CellId.MAX_LEVEL;
    //
    // calculated as 0xffffffffffffffff / radix
    S2CellId.maxValueDivs = [new Long(0), new Long(0),
        parseHex('9223372036854775807'), parseHex('6148914691236517205'), parseHex('4611686018427387903'),
        parseHex('3689348814741910323'), parseHex('3074457345618258602'), parseHex('2635249153387078802'),
        parseHex('2305843009213693951'), parseHex('2049638230412172401'), parseHex('1844674407370955161'),
        parseHex('1676976733973595601'), parseHex('1537228672809129301'), parseHex('1418980313362273201'),
        parseHex('1317624576693539401'), parseHex('1229782938247303441'), parseHex('1152921504606846975'),
        parseHex('1085102592571150095'), parseHex('1024819115206086200'), parseHex('970881267037344821'),
        parseHex('922337203685477580'), parseHex('878416384462359600'), parseHex('838488366986797800'),
        parseHex('802032351030850070'), parseHex('768614336404564650'), parseHex('737869762948382064'),
        parseHex('709490156681136600'), parseHex('683212743470724133'), parseHex('658812288346769700'),
        parseHex('636094623231363848'), parseHex('614891469123651720'), parseHex('595056260442243600'),
        parseHex('576460752303423487'), parseHex('558992244657865200'), parseHex('542551296285575047'),
        parseHex('527049830677415760'), parseHex('512409557603043100')]; // 35-36
    // calculated as 0xffffffffffffffff % radix
    S2CellId.maxValueMods = [0, 0,
        1, 0, 3, 0, 3, 1, 7, 6, 5, 4, 3, 2, 1, 0, 15, 0, 15, 16, 15, 15,
        15, 5, 15, 15, 15, 24, 15, 23, 15, 15, 31, 15, 17, 15, 15]; // 22-36
    // Constant related to unsigned long's
    // '18446744073709551615'
    // Long.fromString('0xffffffffffffffff', true, 16).toString()
    // new Decimal(2).pow(64).sub(1);
    S2CellId.MAX_UNSIGNED = Long.fromString('0xffffffffffffffff', true, 16);
    // The following lookup tables are used to convert efficiently between an
    // (i,j) cell index and the corresponding position along the Hilbert curve.
    // "lookup_pos" maps 4 bits of "i", 4 bits of "j", and 2 bits representing the
    // orientation of the current cell into 8 bits representing the order in which
    // that subcell is visited by the Hilbert curve, plus 2 bits indicating the
    // new orientation of the Hilbert curve within that subcell. (Cell
    // orientations are represented as combination of kSwapMask and kInvertMask.)
    //
    // "lookup_ij" is an inverted table used for mapping in the opposite
    // direction.
    //
    // We also experimented with looking up 16 bits at a time (14 bits of position
    // plus 2 of orientation) but found that smaller lookup tables gave better
    // performance. (2KB fits easily in the primary cache.)
    // Values for these constants are *declared* in the *.h file. Even though
    // the declaration specifies a value for the constant, that declaration
    // is not a *definition* of storage for the value. Because the values are
    // supplied in the declaration, we don't need the values here. Failing to
    // define storage causes link errors for any code that tries to take the
    // address of one of these values.
    S2CellId.LOOKUP_BITS = 4;
    S2CellId.SWAP_MASK = 0x01;
    S2CellId.INVERT_MASK = 0x02;
    S2CellId.LOOKUP_POS = [];
    S2CellId.LOOKUP_IJ = [];
    /**
     * This is the offset required to wrap around from the beginning of the
     * Hilbert curve to the end or vice versa; see next_wrap() and prev_wrap().
     */
    S2CellId.WRAP_OFFSET = new Long(S2CellId.NUM_FACES).shiftLeft(S2CellId.POS_BITS);
    return S2CellId;
}());
exports.S2CellId = S2CellId;
function initLookupCell(level, i, j, origOrientation, pos, orientation) {
    if (level == S2CellId.LOOKUP_BITS) {
        var ij = (i << S2CellId.LOOKUP_BITS) + j;
        S2CellId.LOOKUP_POS[(ij << 2) + origOrientation] = pos.shiftLeft(2).add(orientation);
        S2CellId.LOOKUP_IJ[pos.shiftLeft(2).add(origOrientation).toNumber()] = (ij << 2) + orientation;
    }
    else {
        level++;
        i <<= 1;
        j <<= 1;
        pos = pos.shiftLeft(2);
        // Initialize each sub-cell recursively.
        for (var subPos = 0; subPos < 4; subPos++) {
            var ij = S2_1.S2.POS_TO_IJ[orientation][subPos];
            var orientationMask = S2_1.S2.POS_TO_ORIENTATION[subPos];
            initLookupCell(level, i + (ij >>> 1), j + (ij & 1), origOrientation, pos.add(subPos), orientation ^ orientationMask);
        }
    }
}
initLookupCell(0, 0, 0, 0, new Long(0), 0);
initLookupCell(0, 0, 0, S2_1.S2.SWAP_MASK, new Long(0), S2_1.S2.SWAP_MASK);
initLookupCell(0, 0, 0, S2_1.S2.INVERT_MASK, new Long(0), S2_1.S2.INVERT_MASK);
initLookupCell(0, 0, 0, S2_1.S2.SWAP_MASK | S2_1.S2.INVERT_MASK, new Long(0), S2_1.S2.SWAP_MASK | S2_1.S2.INVERT_MASK);
//# sourceMappingURL=S2CellId.js.map

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright 2005 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This class specifies the details of how the cube faces are projected onto the
 * unit sphere. This includes getting the face ordering and orientation correct
 * so that sequentially increasing cell ids follow a continuous space-filling
 * curve over the entire sphere, and defining the transformation from cell-space
 * to cube-space (see s2.h) in order to make the cells more uniform in size.
 *
 *
 *  We have implemented three different projections from cell-space (s,t) to
 * cube-space (u,v): linear, quadratic, and tangent. They have the following
 * tradeoffs:
 *
 *  Linear - This is the fastest transformation, but also produces the least
 * uniform cell sizes. Cell areas vary by a factor of about 5.2, with the
 * largest cells at the center of each face and the smallest cells in the
 * corners.
 *
 *  Tangent - Transforming the coordinates via atan() makes the cell sizes more
 * uniform. The areas vary by a maximum ratio of 1.4 as opposed to a maximum
 * ratio of 5.2. However, each call to atan() is about as expensive as all of
 * the other calculations combined when converting from points to cell ids, i.e.
 * it reduces performance by a factor of 3.
 *
 *  Quadratic - This is an approximation of the tangent projection that is much
 * faster and produces cells that are almost as uniform in size. It is about 3
 * times faster than the tangent projection for converting cell ids to points,
 * and 2 times faster for converting points to cell ids. Cell areas vary by a
 * maximum ratio of about 2.1.
 *
 *  Here is a table comparing the cell uniformity using each projection. "Area
 * ratio" is the maximum ratio over all subdivision levels of the largest cell
 * area to the smallest cell area at that level, "edge ratio" is the maximum
 * ratio of the longest edge of any cell to the shortest edge of any cell at the
 * same level, and "diag ratio" is the ratio of the longest diagonal of any cell
 * to the shortest diagonal of any cell at the same level. "ToPoint" and
 * "FromPoint" are the times in microseconds required to convert cell ids to and
 * from points (unit vectors) respectively.
 *
 *  Area Edge Diag ToPoint FromPoint Ratio Ratio Ratio (microseconds)
 * ------------------------------------------------------- Linear: 5.200 2.117
 * 2.959 0.103 0.123 Tangent: 1.414 1.414 1.704 0.290 0.306 Quadratic: 2.082
 * 1.802 1.932 0.116 0.161
 *
 *  The worst-case cell aspect ratios are about the same with all three
 * projections. The maximum ratio of the longest edge to the shortest edge
 * within the same cell is about 1.4 and the maximum ratio of the diagonals
 * within the same cell is about 1.7.
 *
 * This data was produced using s2cell_unittest and s2cellid_unittest.
 *
 */
var S2_1 = __webpack_require__(10);
var S2Point_1 = __webpack_require__(22);
var R2Vector_1 = __webpack_require__(54);
(function (Projections) {
    Projections[Projections["S2_LINEAR_PROJECTION"] = 0] = "S2_LINEAR_PROJECTION";
    Projections[Projections["S2_TAN_PROJECTION"] = 1] = "S2_TAN_PROJECTION";
    Projections[Projections["S2_QUADRATIC_PROJECTION"] = 2] = "S2_QUADRATIC_PROJECTION";
})(exports.Projections || (exports.Projections = {}));
var Projections = exports.Projections;
var S2Projections = (function () {
    function S2Projections() {
    }
    S2Projections.getUNorm = function (face, u) {
        switch (face) {
            case 0:
                return new S2Point_1.S2Point(u, -1, 0);
            case 1:
                return new S2Point_1.S2Point(1, u, 0);
            case 2:
                return new S2Point_1.S2Point(1, 0, u);
            case 3:
                return new S2Point_1.S2Point(-u, 0, 1);
            case 4:
                return new S2Point_1.S2Point(0, -u, 1);
            default:
                return new S2Point_1.S2Point(0, -1, -u);
        }
    };
    S2Projections.getVNorm = function (face, v) {
        switch (face) {
            case 0:
                return new S2Point_1.S2Point(-v, 0, 1);
            case 1:
                return new S2Point_1.S2Point(0, -v, 1);
            case 2:
                return new S2Point_1.S2Point(0, -1, -v);
            case 3:
                return new S2Point_1.S2Point(v, -1, 0);
            case 4:
                return new S2Point_1.S2Point(1, v, 0);
            default:
                return new S2Point_1.S2Point(1, 0, v);
        }
    };
    S2Projections.getUAxis = function (face) {
        switch (face) {
            case 0:
                return new S2Point_1.S2Point(0, 1, 0);
            case 1:
                return new S2Point_1.S2Point(-1, 0, 0);
            case 2:
                return new S2Point_1.S2Point(-1, 0, 0);
            case 3:
                return new S2Point_1.S2Point(0, 0, -1);
            case 4:
                return new S2Point_1.S2Point(0, 0, -1);
            default:
                return new S2Point_1.S2Point(0, 1, 0);
        }
    };
    S2Projections.getVAxis = function (face) {
        switch (face) {
            case 0:
                return new S2Point_1.S2Point(0, 0, 1);
            case 1:
                return new S2Point_1.S2Point(0, 0, 1);
            case 2:
                return new S2Point_1.S2Point(0, -1, 0);
            case 3:
                return new S2Point_1.S2Point(0, -1, 0);
            case 4:
                return new S2Point_1.S2Point(1, 0, 0);
            default:
                return new S2Point_1.S2Point(1, 0, 0);
        }
    };
    S2Projections.faceUvToXyz = function (face, u, v) {
        return new R2Vector_1.R2Vector(u, v).toPoint(face);
    };
    S2Projections.MIN_WIDTH = new S2_1.S2Metric(1, S2_1.S2.M_SQRT2 / 3);
    S2Projections.AVG_AREA = new S2_1.S2Metric(2, S2_1.S2.M_PI / 6); // 0.524)
    return S2Projections;
}());
exports.S2Projections = S2Projections;
//# sourceMappingURL=S2Projections.js.map

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(24);
var LIBRARY = __webpack_require__(36);
var wksExt = __webpack_require__(109);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(57)('keys');
var uid = __webpack_require__(35);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 80 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(19)(Function.call, __webpack_require__(17).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(82).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(27);
var defined = __webpack_require__(26);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 86 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 87 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(27);
var defined = __webpack_require__(26);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(36);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var hide = __webpack_require__(12);
var Iterators = __webpack_require__(47);
var $iterCreate = __webpack_require__(90);
var setToStringTag = __webpack_require__(45);
var getPrototypeOf = __webpack_require__(18);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(39);
var descriptor = __webpack_require__(34);
var setToStringTag = __webpack_require__(45);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(12)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(61);
var defined = __webpack_require__(26);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(47);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(34);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(52);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(47);
module.exports = __webpack_require__(24).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(240);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(38);
var toLength = __webpack_require__(8);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(33);
var step = __webpack_require__(125);
var Iterators = __webpack_require__(47);
var toIObject = __webpack_require__(16);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(89)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(19);
var invoke = __webpack_require__(115);
var html = __webpack_require__(81);
var cel = __webpack_require__(77);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(20)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(99).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(20)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(11);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(6);
var LIBRARY = __webpack_require__(36);
var $typed = __webpack_require__(67);
var hide = __webpack_require__(12);
var redefineAll = __webpack_require__(44);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(42);
var toInteger = __webpack_require__(27);
var toLength = __webpack_require__(8);
var toIndex = __webpack_require__(134);
var gOPN = __webpack_require__(40).f;
var dP = __webpack_require__(7).f;
var arrayFill = __webpack_require__(97);
var setToStringTag = __webpack_require__(45);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2010-2013 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var nodes2ts_1 = __webpack_require__(71);
var S2Manager = (function () {
    function S2Manager() {
    }
    S2Manager.generateGeohash = function (geoPoint) {
        var latLng = nodes2ts_1.S2LatLng.fromDegrees(geoPoint.latitude, geoPoint.longitude);
        var cell = nodes2ts_1.S2Cell.fromLatLng(latLng);
        var cellId = cell.id;
        return cellId.id;
    };
    S2Manager.generateHashKey = function (geohash, hashKeyLength) {
        if (geohash.lessThan(0)) {
            // Counteract "-" at beginning of geohash.
            hashKeyLength++;
        }
        var geohashString = geohash.toString(10);
        var denominator = Math.pow(10, geohashString.length - hashKeyLength);
        return geohash.divide(denominator);
    };
    return S2Manager;
}());
exports.S2Manager = S2Manager;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var S2_1 = __webpack_require__(10);
var Interval = (function () {
    function Interval(lo, hi) {
        this.lo = S2_1.S2.toDecimal(lo);
        this.hi = S2_1.S2.toDecimal(hi);
    }
    Interval.prototype.toString = function () {
        return "[" + this.lo.toString() + ", " + this.hi.toString() + "]";
    };
    /**
     * Return true if two intervals contains the same set of points.
     */
    Interval.prototype.equals = function (that) {
        if (typeof (that) === typeof (this)) {
            return this.lo.eq(that.lo) && this.hi.eq(that.hi);
        }
        return false;
    };
    return Interval;
}());
exports.Interval = Interval;
//# sourceMappingURL=Interval.js.map

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var MutableInteger = (function () {
    function MutableInteger(val) {
        this.val = val;
    }
    return MutableInteger;
}());
exports.MutableInteger = MutableInteger;
//# sourceMappingURL=MutableInteger.js.map

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Long = __webpack_require__(49);
var decimal_1 = __webpack_require__(23);
var S2CellId_1 = __webpack_require__(75);
var S2Point_1 = __webpack_require__(22);
var S2LatLng_1 = __webpack_require__(56);
var S2Projections_1 = __webpack_require__(76);
var R2Vector_1 = __webpack_require__(54);
var MutableInteger_1 = __webpack_require__(106);
var S2_1 = __webpack_require__(10);
var S2LatLngRect_1 = __webpack_require__(72);
var R1Interval_1 = __webpack_require__(74);
var S1Interval_1 = __webpack_require__(73);
var S2Cap_1 = __webpack_require__(53);
var S2Cell = (function () {
    function S2Cell(cellID) {
        this.cellID = cellID;
        this._uv = [];
        this._uv.push([]);
        this._uv.push([]);
        this.init(cellID);
    }
    Object.defineProperty(S2Cell.prototype, "id", {
        get: function () {
            return this.cellID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(S2Cell.prototype, "face", {
        get: function () {
            return this._face;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(S2Cell.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(S2Cell.prototype, "orientation", {
        get: function () {
            return this._orientation;
        },
        enumerable: true,
        configurable: true
    });
    // This is a static method in order to provide named parameters.
    S2Cell.fromFacePosLevel = function (face, pos, level) {
        return new S2Cell(S2CellId_1.S2CellId.fromFacePosLevel(face, new Long(pos), level));
    };
    // Convenience methods.
    S2Cell.fromPoint = function (p) {
        return new S2Cell(S2CellId_1.S2CellId.fromPoint(p));
    };
    S2Cell.fromLatLng = function (ll) {
        return new S2Cell(S2CellId_1.S2CellId.fromPoint(ll.toPoint()));
    };
    S2Cell.prototype.isLeaf = function () {
        return this.level == S2CellId_1.S2CellId.MAX_LEVEL;
    };
    S2Cell.prototype.getVertex = function (k) {
        return S2Point_1.S2Point.normalize(this.getVertexRaw(k));
    };
    /**
     * Return the k-th vertex of the cell (k = 0,1,2,3). Vertices are returned in
     * CCW order. The points returned by GetVertexRaw are not necessarily unit
     * length.
     */
    S2Cell.prototype.getVertexRaw = function (k) {
        // Vertices are returned in the order SW, SE, NE, NW.
        return new R2Vector_1.R2Vector(this._uv[0][(k >> 1) ^ (k & 1)], this._uv[1][k >> 1])
            .toPoint(this.face);
        // return S2Projections.faceUvToXyz(this.face, );
    };
    S2Cell.prototype.getEdge = function (k) {
        return S2Point_1.S2Point.normalize(this.getEdgeRaw(k));
    };
    S2Cell.prototype.getEdgeRaw = function (k) {
        switch (k) {
            case 0:
                return S2Projections_1.S2Projections.getVNorm(this.face, this._uv[1][0]); // South
            case 1:
                return S2Projections_1.S2Projections.getUNorm(this.face, this._uv[0][1]); // East
            case 2:
                return S2Point_1.S2Point.neg(S2Projections_1.S2Projections.getVNorm(this.face, this._uv[1][1])); // North
            default:
                return S2Point_1.S2Point.neg(S2Projections_1.S2Projections.getUNorm(this.face, this._uv[0][0])); // West
        }
    };
    /**
     * Return the inward-facing normal of the great circle passing through the
     * edge from vertex k to vertex k+1 (mod 4). The normals returned by
     * GetEdgeRaw are not necessarily unit length.
     *
     *  If this is not a leaf cell, set children[0..3] to the four children of
     * this cell (in traversal order) and return true. Otherwise returns false.
     * This method is equivalent to the following:
     *
     *  for (pos=0, id=child_begin(); id != child_end(); id = id.next(), ++pos)
     * children[i] = S2Cell(id);
     *
     * except that it is more than two times faster.
     */
    S2Cell.prototype.subdivide = function () {
        // This function is equivalent to just iterating over the child cell ids
        // and calling the S2Cell constructor, but it is about 2.5 times faster.
        if (this.isLeaf()) {
            return null;
        }
        // Compute the cell midpoint in uv-space.
        // const uvMid = this.getCenterUV();
        var children = new Array(4);
        // Create four children with the appropriate bounds.
        var id = this.cellID.childBegin();
        for (var pos = 0; pos < 4; ++pos, id = id.next()) {
            children[pos] = new S2Cell(id);
        }
        return children;
    };
    /**
     * Return the direction vector corresponding to the center in (s,t)-space of
     * the given cell. This is the point at which the cell is divided into four
     * subcells; it is not necessarily the centroid of the cell in (u,v)-space or
     * (x,y,z)-space. The point returned by GetCenterRaw is not necessarily unit
     * length.
     */
    S2Cell.prototype.getCenter = function () {
        return S2Point_1.S2Point.normalize(this.getCenterRaw());
    };
    S2Cell.prototype.getCenterRaw = function () {
        return this.cellID.toPointRaw();
    };
    /**
     * Return the center of the cell in (u,v) coordinates (see {@code
     * S2Projections}). Note that the center of the cell is defined as the point
     * at which it is recursively subdivided into four children; in general, it is
     * not at the midpoint of the (u,v) rectangle covered by the cell
     */
    S2Cell.prototype.getCenterUV = function () {
        var i = new MutableInteger_1.MutableInteger(0);
        var j = new MutableInteger_1.MutableInteger(0);
        this.cellID.toFaceIJOrientation(i, j, null);
        var cellSize = 1 << (S2CellId_1.S2CellId.MAX_LEVEL - this.level);
        // TODO(dbeaumont): Figure out a better naming of the variables here (and elsewhere).
        var si = (i.val & -cellSize) * 2 + cellSize - S2Cell.MAX_CELL_SIZE;
        var x = R2Vector_1.R2Vector.singleStTOUV(S2_1.S2.toDecimal(1).dividedBy(S2Cell.MAX_CELL_SIZE).times(si));
        // let x = S2Projections.stToUV((1.0 / S2Cell.MAX_CELL_SIZE) * si);
        var sj = (j.val & -cellSize) * 2 + cellSize - S2Cell.MAX_CELL_SIZE;
        var y = R2Vector_1.R2Vector.singleStTOUV(S2_1.S2.toDecimal(1).dividedBy(S2Cell.MAX_CELL_SIZE).times(sj));
        // double y = S2Projections.stToUV((1.0 / S2Cell.MAX_CELL_SIZE) * sj);
        return new R2Vector_1.R2Vector(x, y);
    };
    /**
     * Return the average area of cells at this level. This is accurate to within
     * a factor of 1.7 (for S2_QUADRATIC_PROJECTION) and is extremely cheap to
     * compute.
     */
    S2Cell.averageArea = function (level) {
        return S2Projections_1.S2Projections.AVG_AREA.getValue(level);
    };
    /**
     * Return the average area of cells at this level. This is accurate to within
     * a factor of 1.7 (for S2_QUADRATIC_PROJECTION) and is extremely cheap to
     * compute.
     */
    S2Cell.prototype.averageArea = function () {
        return S2Projections_1.S2Projections.AVG_AREA.getValue(this.level);
    };
    /**
     * Return the approximate area of this cell. This method is accurate to within
     * 3% percent for all cell sizes and accurate to within 0.1% for cells at
     * level 5 or higher (i.e. 300km square or smaller). It is moderately cheap to
     * compute.
     */
    S2Cell.prototype.approxArea = function () {
        // All cells at the first two levels have the same area.
        if (this.level < 2) {
            return this.averageArea();
        }
        // First, compute the approximate area of the cell when projected
        // perpendicular to its normal. The cross product of its diagonals gives
        // the normal, and the length of the normal is twice the projected area.
        var flatArea = S2Point_1.S2Point.crossProd(S2Point_1.S2Point.sub(this.getVertex(2), this.getVertex(0)), S2Point_1.S2Point.sub(this.getVertex(3), this.getVertex(1))).norm().times(0.5);
        // double flatArea = 0.5 * S2Point.crossProd(
        //         S2Point.sub(getVertex(2), getVertex(0)), S2Point.sub(getVertex(3), getVertex(1))).norm();
        // Now, compensate for the curvature of the cell surface by pretending
        // that the cell is shaped like a spherical cap. The ratio of the
        // area of a spherical cap to the area of its projected disc turns out
        // to be 2 / (1 + sqrt(1 - r*r)) where "r" is the radius of the disc.
        // For example, when r=0 the ratio is 1, and when r=1 the ratio is 2.
        // Here we set Pi*r*r == flat_area to find the equivalent disc.
        return flatArea
            .times(2)
            .dividedBy(decimal_1.Decimal.min(flatArea.times(S2_1.S2.M_1_PI), 1)
            .neg()
            .plus(1)
            .sqrt()
            .plus(1)).toNumber();
    };
    //
    // /**
    //  * Return the area of this cell as accurately as possible. This method is more
    //  * expensive but it is accurate to 6 digits of precision even for leaf cells
    //  * (whose area is approximately 1e-18).
    //  */
    S2Cell.prototype.exactArea = function () {
        var v0 = this.getVertex(0);
        var v1 = this.getVertex(1);
        var v2 = this.getVertex(2);
        var v3 = this.getVertex(3);
        return S2_1.S2.area(v0, v1, v2).plus(S2_1.S2.area(v0, v2, v3));
    };
    // //////////////////////////////////////////////////////////////////////
    // S2Region interface (see {@code S2Region} for details):
    S2Cell.prototype.getCapBound = function () {
        // Use the cell center in (u,v)-space as the cap axis. This vector is
        // very close to GetCenter() and faster to compute. Neither one of these
        // vectors yields the bounding cap with minimal surface area, but they
        // are both pretty close.
        //
        // It's possible to show that the two vertices that are furthest from
        // the (u,v)-origin never determine the maximum cap size (this is a
        // possible future optimization).
        var u = this._uv[0][0].plus(this._uv[0][1]).times(0.5);
        var v = this._uv[1][0].plus(this._uv[1][1]).times(0.5);
        var cap = new S2Cap_1.S2Cap(S2Point_1.S2Point.normalize(S2Projections_1.S2Projections.faceUvToXyz(this.face, u, v)), 0);
        for (var k = 0; k < 4; ++k) {
            cap = cap.addPoint(this.getVertex(k));
        }
        return cap;
    };
    // 35.26 degrees
    S2Cell.prototype.getRectBound = function () {
        if (this.level > 0) {
            // Except for cells at level 0, the latitude and longitude extremes are
            // attained at the vertices. Furthermore, the latitude range is
            // determined by one pair of diagonally opposite vertices and the
            // longitude range is determined by the other pair.
            //
            // We first determine which corner (i,j) of the cell has the largest
            // absolute latitude. To maximize latitude, we want to find the point in
            // the cell that has the largest absolute z-coordinate and the smallest
            // absolute x- and y-coordinates. To do this we look at each coordinate
            // (u and v), and determine whether we want to minimize or maximize that
            // coordinate based on the axis direction and the cell's (u,v) quadrant.
            var u = this._uv[0][0].plus(this._uv[0][1]);
            var v = this._uv[1][0].plus(this._uv[1][1]);
            var i = S2Projections_1.S2Projections.getUAxis(this.face).z.eq(0) ? (u.lt(0) ? 1 : 0) : (u.gt(0) ? 1 : 0);
            var j = S2Projections_1.S2Projections.getVAxis(this.face).z.eq(0) ? (v.lt(0) ? 1 : 0) : (v.gt(0) ? 1 : 0);
            var lat = R1Interval_1.R1Interval.fromPointPair(this.getLatitude(i, j), this.getLatitude(1 - i, 1 - j));
            lat = lat.expanded(S2Cell.MAX_ERROR).intersection(S2LatLngRect_1.S2LatLngRect.fullLat());
            if (lat.lo.eq(-S2_1.S2.M_PI_2) || lat.hi.eq(S2_1.S2.M_PI_2)) {
                return new S2LatLngRect_1.S2LatLngRect(lat, S1Interval_1.S1Interval.full());
            }
            var lng = S1Interval_1.S1Interval.fromPointPair(this.getLongitude(i, 1 - j), this.getLongitude(1 - i, j));
            return new S2LatLngRect_1.S2LatLngRect(lat, lng.expanded(S2Cell.MAX_ERROR));
        }
        // The face centers are the +X, +Y, +Z, -X, -Y, -Z axes in that order.
        // assert (S2Projections.getNorm(face).get(face % 3) == ((face < 3) ? 1 : -1));
        switch (this.face) {
            case 0:
                return new S2LatLngRect_1.S2LatLngRect(new R1Interval_1.R1Interval(-S2_1.S2.M_PI_4, S2_1.S2.M_PI_4), new S1Interval_1.S1Interval(-S2_1.S2.M_PI_4, S2_1.S2.M_PI_4));
            case 1:
                return new S2LatLngRect_1.S2LatLngRect(new R1Interval_1.R1Interval(-S2_1.S2.M_PI_4, S2_1.S2.M_PI_4), new S1Interval_1.S1Interval(S2_1.S2.M_PI_4, 3 * S2_1.S2.M_PI_4));
            case 2:
                return new S2LatLngRect_1.S2LatLngRect(new R1Interval_1.R1Interval(S2Cell.POLE_MIN_LAT, S2_1.S2.M_PI_2), new S1Interval_1.S1Interval(-S2_1.S2.M_PI, S2_1.S2.M_PI));
            case 3:
                return new S2LatLngRect_1.S2LatLngRect(new R1Interval_1.R1Interval(-S2_1.S2.M_PI_4, S2_1.S2.M_PI_4), new S1Interval_1.S1Interval(3 * S2_1.S2.M_PI_4, -3 * S2_1.S2.M_PI_4));
            case 4:
                return new S2LatLngRect_1.S2LatLngRect(new R1Interval_1.R1Interval(-S2_1.S2.M_PI_4, S2_1.S2.M_PI_4), new S1Interval_1.S1Interval(-3 * S2_1.S2.M_PI_4, -S2_1.S2.M_PI_4));
            default:
                return new S2LatLngRect_1.S2LatLngRect(new R1Interval_1.R1Interval(-S2_1.S2.M_PI_2, -S2Cell.POLE_MIN_LAT), new S1Interval_1.S1Interval(-S2_1.S2.M_PI, S2_1.S2.M_PI));
        }
    };
    S2Cell.prototype.mayIntersect = function (cell) {
        return this.cellID.intersects(cell.cellID);
    };
    S2Cell.prototype.contains = function (p) {
        // We can't just call XYZtoFaceUV, because for points that lie on the
        // boundary between two faces (i.e. u or v is +1/-1) we need to return
        // true for both adjacent cells.
        var uvPoint = p.toR2Vector(this.face);
        // S2Projections.faceXyzToUv(this.face, p);
        if (uvPoint == null) {
            return false;
        }
        return (uvPoint.x.gte(this._uv[0][0]) && uvPoint.x.lte(this._uv[0][1])
            && uvPoint.y.gte(this._uv[1][0]) && uvPoint.y.lte(this._uv[1][1]));
    };
    // The point 'p' does not need to be normalized.
    S2Cell.prototype.containsC = function (cell) {
        return this.cellID.contains(cell.cellID);
    };
    S2Cell.prototype.init = function (id) {
        this.cellID = id;
        var ij = [];
        var mOrientation = new MutableInteger_1.MutableInteger(0);
        for (var d = 0; d < 2; ++d) {
            ij[d] = new MutableInteger_1.MutableInteger(0);
        }
        this._face = id.toFaceIJOrientation(ij[0], ij[1], mOrientation);
        this._orientation = mOrientation.val; // Compress int to a byte.
        this._level = id.level();
        var cellSize = 1 << (S2CellId_1.S2CellId.MAX_LEVEL - this.level);
        for (var d = 0; d < 2; ++d) {
            // Compute the cell bounds in scaled (i,j) coordinates.
            var sijLo = (ij[d].val & -cellSize) * 2 - S2Cell.MAX_CELL_SIZE;
            var sijHi = sijLo + cellSize * 2;
            var s = S2_1.S2.toDecimal(1).dividedBy(S2Cell.MAX_CELL_SIZE);
            this._uv[d][0] = R2Vector_1.R2Vector.singleStTOUV(s.times(sijLo));
            //S2Projections.stToUV((1.0 / S2Cell.MAX_CELL_SIZE) * sijLo);
            this._uv[d][1] = R2Vector_1.R2Vector.singleStTOUV(s.times(sijHi));
        }
    };
    // Internal method that does the actual work in the constructors.
    S2Cell.prototype.getLatitude = function (i, j) {
        var p = S2Projections_1.S2Projections.faceUvToXyz(this.face, this._uv[0][i], this._uv[1][j]);
        return decimal_1.Decimal.atan2(p.z, p.x.pow(2).plus(p.y.pow(2))
            .sqrt());
        // return Math.atan2(p.z, Math.sqrt(p.x * p.x + p.y * p.y));
    };
    S2Cell.prototype.getLongitude = function (i, j) {
        var p = S2Projections_1.S2Projections.faceUvToXyz(this.face, this._uv[0][i], this._uv[1][j]);
        return decimal_1.Decimal.atan2(p.y, p.x);
        // Math.atan2(p.y, p.x);
    };
    // Return the latitude or longitude of the cell vertex given by (i,j),
    // where "i" and "j" are either 0 or 1.
    S2Cell.prototype.toString = function () {
        return "[" + this._face + ", " + this._level + ", " + this._orientation + ", " + this.cellID.toToken() + "]";
    };
    S2Cell.prototype.toGEOJSON = function () {
        var coords = [this.getVertex(0), this.getVertex(1), this.getVertex(2), this.getVertex(3), this.getVertex(0)]
            .map(function (v) { return S2LatLng_1.S2LatLng.fromPoint(v); })
            .map(function (v) { return ([v.lngDegrees.toNumber(), v.latDegrees.toNumber()]); });
        // const rectJSON = this.getRectBound().toGEOJSON();
        return {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [coords]
            },
            properties: {},
            title: "Cell: " + this.id.toToken() + " lvl: " + this.level
        };
        // rectJSON.title = `Cell: ${this.id.toToken()}`;
        // return rectJSON;
    };
    S2Cell.MAX_CELL_SIZE = 1 << S2CellId_1.S2CellId.MAX_LEVEL;
    // We grow the bounds slightly to make sure that the bounding rectangle
    // also contains the normalized versions of the vertices. Note that the
    // maximum result magnitude is Pi, with a floating-point exponent of 1.
    // Therefore adding or subtracting 2**-51 will always change the result.
    S2Cell.MAX_ERROR = S2_1.S2.toDecimal(1.0).dividedBy(S2_1.S2.toDecimal(new Long(1).shiftLeft(51).toString()));
    // The 4 cells around the equator extend to +/-45 degrees latitude at the
    // midpoints of their top and bottom edges. The two cells covering the
    // poles extend down to +/-35.26 degrees at their vertices.
    // adding kMaxError (as opposed to the C version) because of asin and atan2
    // roundoff errors
    S2Cell.POLE_MIN_LAT = decimal_1.Decimal.asin(S2_1.S2.toDecimal(1.0).dividedBy(3).sqrt()).minus(S2Cell.MAX_ERROR);
    return S2Cell;
}());
exports.S2Cell = S2Cell;
//# sourceMappingURL=S2Cell.js.map

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(77)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(15);
var toIObject = __webpack_require__(16);
var arrayIndexOf = __webpack_require__(58)(false);
var IE_PROTO = __webpack_require__(79)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(37);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(16);
var gOPN = __webpack_require__(40).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(37);
var gOPS = __webpack_require__(59);
var pIE = __webpack_require__(51);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(50);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(11);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(115);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 115 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(46).trim;
var ws = __webpack_require__(83);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(46).trim;

module.exports = 1 / $parseFloat(__webpack_require__(83) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(20);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 120 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(86);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(11);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(50);
var toLength = __webpack_require__(8);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(38);
var toLength = __webpack_require__(8);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(6) && /./g.flags != 'g') __webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(63)
});


/***/ }),
/* 127 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(101);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(130);
var validate = __webpack_require__(48);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(66)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(7).f;
var create = __webpack_require__(39);
var redefineAll = __webpack_require__(44);
var ctx = __webpack_require__(19);
var anInstance = __webpack_require__(42);
var forOf = __webpack_require__(43);
var $iterDefine = __webpack_require__(89);
var step = __webpack_require__(125);
var setSpecies = __webpack_require__(41);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(32).fastKey;
var validate = __webpack_require__(48);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(130);
var validate = __webpack_require__(48);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(66)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(29)(0);
var redefine = __webpack_require__(13);
var meta = __webpack_require__(32);
var assign = __webpack_require__(113);
var weak = __webpack_require__(133);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var validate = __webpack_require__(48);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(66)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(44);
var getWeak = __webpack_require__(32).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(42);
var forOf = __webpack_require__(43);
var createArrayMethod = __webpack_require__(29);
var $has = __webpack_require__(15);
var validate = __webpack_require__(48);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(27);
var toLength = __webpack_require__(8);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(40);
var gOPS = __webpack_require__(59);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(60);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(8);
var ctx = __webpack_require__(19);
var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(8);
var repeat = __webpack_require__(85);
var defined = __webpack_require__(26);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(37);
var toIObject = __webpack_require__(16);
var isEnum = __webpack_require__(51).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(52);
var from = __webpack_require__(140);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(43);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 141 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.

var rb = __webpack_require__(355).randomBytes;

function rng() {
  return rb(16);
}

module.exports = rng;


/***/ }),
/* 143 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! decimal.js v6.0.0 https://github.com/MikeMcl/decimal.js/LICENCE */
;(function (globalScope) {
  'use strict';


  /*
   *  decimal.js v6.0.0
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2016 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Expat Licence
   */


  // -----------------------------------  EDITABLE DEFAULTS  ------------------------------------ //


    // The maximum exponent magnitude.
    // The limit on the value of `toExpNeg`, `toExpPos`, `minE` and `maxE`.
  var EXP_LIMIT = 9e15,                      // 0 to 9e15

    // The limit on the value of `precision`, and on the value of the first argument to
    // `toDecimalPlaces`, `toExponential`, `toFixed`, `toPrecision` and `toSignificantDigits`.
    MAX_DIGITS = 1e9,                        // 0 to 1e9

    // Base conversion alphabet.
    NUMERALS = '0123456789abcdef',

    // The natural logarithm of 10 (1025 digits).
    LN10 = '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',

    // Pi (1025 digits).
    PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',


    // The initial configuration properties of the Decimal constructor.
    Decimal = {

      // These values must be integers within the stated ranges (inclusive).
      // Most of these values can be changed at run-time using `Decimal.config`.

      // The maximum number of significant digits of the result of a calculation or base conversion.
      // E.g. `Decimal.config({ precision: 20 });`
      precision: 20,                         // 1 to MAX_DIGITS

      // The rounding mode used when rounding to `precision`.
      //
      // ROUND_UP         0 Away from zero.
      // ROUND_DOWN       1 Towards zero.
      // ROUND_CEIL       2 Towards +Infinity.
      // ROUND_FLOOR      3 Towards -Infinity.
      // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
      // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
      // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
      // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
      // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
      //
      // E.g.
      // `Decimal.rounding = 4;`
      // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
      rounding: 4,                           // 0 to 8

      // The modulo mode used when calculating the modulus: a mod n.
      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
      // The remainder (r) is calculated as: r = a - n * q.
      //
      // UP         0 The remainder is positive if the dividend is negative, else is negative.
      // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
      // FLOOR      3 The remainder has the same sign as the divisor (Python %).
      // HALF_EVEN  6 The IEEE 754 remainder function.
      // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
      //
      // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
      // division (9) are commonly used for the modulus operation. The other rounding modes can also
      // be used, but they may not give useful results.
      modulo: 1,                             // 0 to 9

      // The exponent value at and beneath which `toString` returns exponential notation.
      // JavaScript numbers: -7
      toExpNeg: -7,                          // 0 to -EXP_LIMIT

      // The exponent value at and above which `toString` returns exponential notation.
      // JavaScript numbers: 21
      toExpPos:  21,                         // 0 to EXP_LIMIT

      // The minimum exponent value, beneath which underflow to zero occurs.
      // JavaScript numbers: -324  (5e-324)
      minE: -EXP_LIMIT,                      // -1 to -EXP_LIMIT

      // The maximum exponent value, above which overflow to Infinity occurs.
      // JavaScript numbers: 308  (1.7976931348623157e+308)
      maxE: EXP_LIMIT,                       // 1 to EXP_LIMIT

      // Whether to use cryptographically-secure random number generation, if available.
      crypto: void 0                         // true/false/undefined
    },


  // ----------------------------------- END OF EDITABLE DEFAULTS ------------------------------- //


    inexact, noConflict, quadrant,
    cryptoObject = typeof crypto != 'undefined' ? crypto : null,
    external = true,

    decimalError = '[DecimalError] ',
    invalidArgument = decimalError + 'Invalid argument: ',
    precisionLimitExceeded = decimalError + 'Precision limit exceeded',

    mathfloor = Math.floor,
    mathpow = Math.pow,

    isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
    isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
    isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
    isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,

    BASE = 1e7,
    LOG_BASE = 7,
    MAX_SAFE_INTEGER = 9007199254740991,

    LN10_PRECISION = LN10.length - 1,
    PI_PRECISION = PI.length - 1,

    // Decimal.prototype object
    P = {};


  // Decimal prototype methods


  /*
   *  absoluteValue             abs
   *  ceil
   *  comparedTo                cmp
   *  cosine                    cos
   *  cubeRoot                  cbrt
   *  decimalPlaces             dp
   *  dividedBy                 div
   *  dividedToIntegerBy        divToInt
   *  equals                    eq
   *  floor
   *  greaterThan               gt
   *  greaterThanOrEqualTo      gte
   *  hyperbolicCosine          cosh
   *  hyperbolicSine            sinh
   *  hyperbolicTangent         tanh
   *  inverseCosine             acos
   *  inverseHyperbolicCosine   acosh
   *  inverseHyperbolicSine     asinh
   *  inverseHyperbolicTangent  atanh
   *  inverseSine               asin
   *  inverseTangent            atan
   *  isFinite
   *  isInteger                 isInt
   *  isNaN
   *  isNegative                isNeg
   *  isPositive                isPos
   *  isZero
   *  lessThan                  lt
   *  lessThanOrEqualTo         lte
   *  logarithm                 log
   *  [maximum]                 [max]
   *  [minimum]                 [min]
   *  minus                     sub
   *  modulo                    mod
   *  naturalExponential        exp
   *  naturalLogarithm          ln
   *  negated                   neg
   *  plus                      add
   *  precision                 sd
   *  round
   *  sine                      sin
   *  squareRoot                sqrt
   *  tangent                   tan
   *  times                     mul
   *  toBinary
   *  toDecimalPlaces           toDP
   *  toExponential
   *  toFixed
   *  toFraction
   *  toHexadecimal             toHex
   *  toNearest
   *  toNumber
   *  toOctal
   *  toPower                   pow
   *  toPrecision
   *  toSignificantDigits       toSD
   *  toString
   *  truncated                 trunc
   *  valueOf                   toJSON
   */


  /*
   * Return a new Decimal whose value is the absolute value of this Decimal.
   *
   */
  P.absoluteValue = P.abs = function () {
    var x = new this.constructor(this);
    if (x.s < 0) x.s = 1;
    return finalise(x);
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
   * direction of positive Infinity.
   *
   */
  P.ceil = function () {
    return finalise(new this.constructor(this), this.e + 1, 2);
  };


  /*
   * Return
   *   1    if the value of this Decimal is greater than the value of `y`,
   *  -1    if the value of this Decimal is less than the value of `y`,
   *   0    if they have the same value,
   *   NaN  if the value of either Decimal is NaN.
   *
   */
  P.comparedTo = P.cmp = function (y) {
    var i, j, xdL, ydL,
      x = this,
      xd = x.d,
      yd = (y = new x.constructor(y)).d,
      xs = x.s,
      ys = y.s;

    // Either NaN or ±Infinity?
    if (!xd || !yd) {
      return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
    }

    // Either zero?
    if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;

    // Signs differ?
    if (xs !== ys) return xs;

    // Compare exponents.
    if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;

    xdL = xd.length;
    ydL = yd.length;

    // Compare digit by digit.
    for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
      if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
    }

    // Compare lengths.
    return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
  };


  /*
   * Return a new Decimal whose value is the cosine of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * cos(0)         = 1
   * cos(-0)        = 1
   * cos(Infinity)  = NaN
   * cos(-Infinity) = NaN
   * cos(NaN)       = NaN
   *
   */
  P.cosine = P.cos = function () {
    var pr, rm,
      x = this,
      Ctor = x.constructor;

    if (!x.d) return new Ctor(NaN);

    // cos(0) = cos(-0) = 1
    if (!x.d[0]) return new Ctor(1);

    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
    Ctor.rounding = 1;

    x = cosine(Ctor, toLessThanHalfPi(Ctor, x));

    Ctor.precision = pr;
    Ctor.rounding = rm;

    return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
  };


  /*
   *
   * Return a new Decimal whose value is the cube root of the value of this Decimal, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   *  cbrt(0)  =  0
   *  cbrt(-0) = -0
   *  cbrt(1)  =  1
   *  cbrt(-1) = -1
   *  cbrt(N)  =  N
   *  cbrt(-I) = -I
   *  cbrt(I)  =  I
   *
   * Math.cbrt(x) = (x < 0 ? -Math.pow(-x, 1/3) : Math.pow(x, 1/3))
   *
   */
  P.cubeRoot = P.cbrt = function () {
    var e, m, n, r, rep, s, sd, t, t3, t3plusx,
      x = this,
      Ctor = x.constructor;

    if (!x.isFinite() || x.isZero()) return new Ctor(x);
    external = false;

    // Initial estimate.
    s = x.s * Math.pow(x.s * x, 1 / 3);

     // Math.cbrt underflow/overflow?
     // Pass x to Math.pow as integer, then adjust the exponent of the result.
    if (!s || Math.abs(s) == 1 / 0) {
      n = digitsToString(x.d);
      e = x.e;

      // Adjust n exponent so it is a multiple of 3 away from x exponent.
      if (s = (e - n.length + 1) % 3) n += (s == 1 || s == -2 ? '0' : '00');
      s = Math.pow(n, 1 / 3);

      // Rarely, e may be one less than the result exponent value.
      e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));

      if (s == 1 / 0) {
        n = '5e' + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf('e') + 1) + e;
      }

      r = new Ctor(n);
      r.s = x.s;
    } else {
      r = new Ctor(s.toString());
    }

    sd = (e = Ctor.precision) + 3;

    // Halley's method.
    // TODO? Compare Newton's method.
    for (;;) {
      t = r;
      t3 = t.times(t).times(t);
      t3plusx = t3.plus(x);
      r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);

      // TODO? Replace with for-loop and checkRoundingDigits.
      if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
        n = n.slice(sd - 3, sd + 1);

        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or 4999
        // , i.e. approaching a rounding boundary, continue the iteration.
        if (n == '9999' || !rep && n == '4999') {

          // On the first iteration only, check to see if rounding up gives the exact result as the
          // nines may infinitely repeat.
          if (!rep) {
            finalise(t, e + 1, 0);

            if (t.times(t).times(t).eq(x)) {
              r = t;
              break;
            }
          }

          sd += 4;
          rep = 1;
        } else {

          // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
          // If not, then there are further digits and m will be truthy.
          if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

            // Truncate to the first rounding digit.
            finalise(r, e + 1, 1);
            m = !r.times(r).times(r).eq(x);
          }

          break;
        }
      }
    }

    external = true;

    return finalise(r, e, Ctor.rounding, m);
  };


  /*
   * Return the number of decimal places of the value of this Decimal.
   *
   */
  P.decimalPlaces = P.dp = function () {
    var w,
      d = this.d,
      n = NaN;

    if (d) {
      w = d.length - 1;
      n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;

      // Subtract the number of trailing zeros of the last word.
      w = d[w];
      if (w) for (; w % 10 == 0; w /= 10) n--;
      if (n < 0) n = 0;
    }

    return n;
  };


  /*
   *  n / 0 = I
   *  n / N = N
   *  n / I = 0
   *  0 / n = 0
   *  0 / 0 = N
   *  0 / N = N
   *  0 / I = 0
   *  N / n = N
   *  N / 0 = N
   *  N / N = N
   *  N / I = N
   *  I / n = I
   *  I / 0 = I
   *  I / N = N
   *  I / I = N
   *
   * Return a new Decimal whose value is the value of this Decimal divided by `y`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   */
  P.dividedBy = P.div = function (y) {
    return divide(this, new this.constructor(y));
  };


  /*
   * Return a new Decimal whose value is the integer part of dividing the value of this Decimal
   * by the value of `y`, rounded to `precision` significant digits using rounding mode `rounding`.
   *
   */
  P.dividedToIntegerBy = P.divToInt = function (y) {
    var x = this,
      Ctor = x.constructor;
    return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
  };


  /*
   * Return true if the value of this Decimal is equal to the value of `y`, otherwise return false.
   *
   */
  P.equals = P.eq = function (y) {
    return this.cmp(y) === 0;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
   * direction of negative Infinity.
   *
   */
  P.floor = function () {
    return finalise(new this.constructor(this), this.e + 1, 3);
  };


  /*
   * Return true if the value of this Decimal is greater than the value of `y`, otherwise return
   * false.
   *
   */
  P.greaterThan = P.gt = function (y) {
    return this.cmp(y) > 0;
  };


  /*
   * Return true if the value of this Decimal is greater than or equal to the value of `y`,
   * otherwise return false.
   *
   */
  P.greaterThanOrEqualTo = P.gte = function (y) {
    var k = this.cmp(y);
    return k == 1 || k === 0;
  };


  /*
   * Return a new Decimal whose value is the hyperbolic cosine of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [1, Infinity]
   *
   * cosh(x) = 1 + x^2/2! + x^4/4! + x^6/6! + ...
   *
   * cosh(0)         = 1
   * cosh(-0)        = 1
   * cosh(Infinity)  = Infinity
   * cosh(-Infinity) = Infinity
   * cosh(NaN)       = NaN
   *
   *  x        time taken (ms)   result
   * 1000      9                 9.8503555700852349694e+433
   * 10000     25                4.4034091128314607936e+4342
   * 100000    171               1.4033316802130615897e+43429
   * 1000000   3817              1.5166076984010437725e+434294
   * 10000000  abandoned after 2 minute wait
   *
   * TODO? Compare performance of cosh(x) = 0.5 * (exp(x) + exp(-x))
   *
   */
  P.hyperbolicCosine = P.cosh = function () {
    var k, n, pr, rm, len,
      x = this,
      Ctor = x.constructor,
      one = new Ctor(1);

    if (!x.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
    if (x.isZero()) return one;

    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
    Ctor.rounding = 1;
    len = x.d.length;

    // Argument reduction: cos(4x) = 1 - 8cos^2(x) + 8cos^4(x) + 1
    // i.e. cos(x) = 1 - cos^2(x/4)(8 - 8cos^2(x/4))

    // Estimate the optimum number of times to use the argument reduction.
    // TODO? Estimation reused from cosine() and may not be optimal here.
    if (len < 32) {
      k = Math.ceil(len / 3);
      n = Math.pow(4, -k).toString();
    } else {
      k = 16;
      n = '2.3283064365386962890625e-10';
    }

    x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);

    // Reverse argument reduction
    var cosh2_x,
      i = k,
      d8 = new Ctor(8);
    for (; i--;) {
      cosh2_x = x.times(x);
      x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
    }

    return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
  };


  /*
   * Return a new Decimal whose value is the hyperbolic sine of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * sinh(x) = x + x^3/3! + x^5/5! + x^7/7! + ...
   *
   * sinh(0)         = 0
   * sinh(-0)        = -0
   * sinh(Infinity)  = Infinity
   * sinh(-Infinity) = -Infinity
   * sinh(NaN)       = NaN
   *
   * x        time taken (ms)
   * 10       2 ms
   * 100      5 ms
   * 1000     14 ms
   * 10000    82 ms
   * 100000   886 ms            1.4033316802130615897e+43429
   * 200000   2613 ms
   * 300000   5407 ms
   * 400000   8824 ms
   * 500000   13026 ms          8.7080643612718084129e+217146
   * 1000000  48543 ms
   *
   * TODO? Compare performance of sinh(x) = 0.5 * (exp(x) - exp(-x))
   *
   */
  P.hyperbolicSine = P.sinh = function () {
    var k, pr, rm, len,
      x = this,
      Ctor = x.constructor;

    if (!x.isFinite() || x.isZero()) return new Ctor(x);

    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
    Ctor.rounding = 1;
    len = x.d.length;

    if (len < 3) {
      x = taylorSeries(Ctor, 2, x, x, true);
    } else {

      // Alternative argument reduction: sinh(3x) = sinh(x)(3 + 4sinh^2(x))
      // i.e. sinh(x) = sinh(x/3)(3 + 4sinh^2(x/3))
      // 3 multiplications and 1 addition

      // Argument reduction: sinh(5x) = sinh(x)(5 + sinh^2(x)(20 + 16sinh^2(x)))
      // i.e. sinh(x) = sinh(x/5)(5 + sinh^2(x/5)(20 + 16sinh^2(x/5)))
      // 4 multiplications and 2 additions

      // Estimate the optimum number of times to use the argument reduction.
      k = 1.4 * Math.sqrt(len);
      k = k > 16 ? 16 : k | 0;

      x = x.times(Math.pow(5, -k));

      x = taylorSeries(Ctor, 2, x, x, true);

      // Reverse argument reduction
      var sinh2_x,
        d5 = new Ctor(5),
        d16 = new Ctor(16),
        d20 = new Ctor(20);
      for (; k--;) {
        sinh2_x = x.times(x);
        x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
      }
    }

    Ctor.precision = pr;
    Ctor.rounding = rm;

    return finalise(x, pr, rm, true);
  };


  /*
   * Return a new Decimal whose value is the hyperbolic tangent of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * tanh(x) = sinh(x) / cosh(x)
   *
   * tanh(0)         = 0
   * tanh(-0)        = -0
   * tanh(Infinity)  = 1
   * tanh(-Infinity) = -1
   * tanh(NaN)       = NaN
   *
   */
  P.hyperbolicTangent = P.tanh = function () {
    var pr, rm,
      x = this,
      Ctor = x.constructor;

    if (!x.isFinite()) return new Ctor(x.s);
    if (x.isZero()) return new Ctor(x);

    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 7;
    Ctor.rounding = 1;

    return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
  };


  /*
   * Return a new Decimal whose value is the arccosine (inverse cosine) in radians of the value of
   * this Decimal.
   *
   * Domain: [-1, 1]
   * Range: [0, pi]
   *
   * acos(x) = pi/2 - asin(x)
   *
   * acos(0)       = pi/2
   * acos(-0)      = pi/2
   * acos(1)       = 0
   * acos(-1)      = pi
   * acos(1/2)     = pi/3
   * acos(-1/2)    = 2*pi/3
   * acos(|x| > 1) = NaN
   * acos(NaN)     = NaN
   *
   */
  P.inverseCosine = P.acos = function () {
    var halfPi,
      x = this,
      Ctor = x.constructor,
      k = x.abs().cmp(1),
      pr = Ctor.precision,
      rm = Ctor.rounding;

    if (k !== -1) {
      return k === 0
        // |x| is 1
        ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0)
        // |x| > 1 or x is NaN
        : new Ctor(NaN);
    }

    if (x.isZero()) return getPi(Ctor, pr + 4, rm).times(0.5);

    // TODO? Special case acos(0.5) = pi/3 and acos(-0.5) = 2*pi/3

    Ctor.precision = pr + 6;
    Ctor.rounding = 1;

    x = x.asin();
    halfPi = getPi(Ctor, pr + 4, rm).times(0.5);

    Ctor.precision = pr;
    Ctor.rounding = rm;

    return halfPi.minus(x);
  };


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic cosine in radians of the
   * value of this Decimal.
   *
   * Domain: [1, Infinity]
   * Range: [0, Infinity]
   *
   * acosh(x) = ln(x + sqrt(x^2 - 1))
   *
   * acosh(x < 1)     = NaN
   * acosh(NaN)       = NaN
   * acosh(Infinity)  = Infinity
   * acosh(-Infinity) = NaN
   * acosh(0)         = NaN
   * acosh(-0)        = NaN
   * acosh(1)         = 0
   * acosh(-1)        = NaN
   *
   */
  P.inverseHyperbolicCosine = P.acosh = function () {
    var pr, rm,
      x = this,
      Ctor = x.constructor;

    if (x.lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
    if (!x.isFinite()) return new Ctor(x);

    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
    Ctor.rounding = 1;
    external = false;

    x = x.times(x).minus(1).sqrt().plus(x);

    external = true;
    Ctor.precision = pr;
    Ctor.rounding = rm;

    return x.ln();
  };


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic sine in radians of the value
   * of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * asinh(x) = ln(x + sqrt(x^2 + 1))
   *
   * asinh(NaN)       = NaN
   * asinh(Infinity)  = Infinity
   * asinh(-Infinity) = -Infinity
   * asinh(0)         = 0
   * asinh(-0)        = -0
   *
   */
  P.inverseHyperbolicSine = P.asinh = function () {
    var pr, rm,
      x = this,
      Ctor = x.constructor;

    if (!x.isFinite() || x.isZero()) return new Ctor(x);

    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
    Ctor.rounding = 1;
    external = false;

    x = x.times(x).plus(1).sqrt().plus(x);

    external = true;
    Ctor.precision = pr;
    Ctor.rounding = rm;

    return x.ln();
  };


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic tangent in radians of the
   * value of this Decimal.
   *
   * Domain: [-1, 1]
   * Range: [-Infinity, Infinity]
   *
   * atanh(x) = 0.5 * ln((1 + x) / (1 - x))
   *
   * atanh(|x| > 1)   = NaN
   * atanh(NaN)       = NaN
   * atanh(Infinity)  = NaN
   * atanh(-Infinity) = NaN
   * atanh(0)         = 0
   * atanh(-0)        = -0
   * atanh(1)         = Infinity
   * atanh(-1)        = -Infinity
   *
   */
  P.inverseHyperbolicTangent = P.atanh = function () {
    var pr, rm, wpr, xsd,
      x = this,
      Ctor = x.constructor;

    if (!x.isFinite()) return new Ctor(NaN);
    if (x.e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);

    pr = Ctor.precision;
    rm = Ctor.rounding;
    xsd = x.sd();

    if (Math.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);

    Ctor.precision = wpr = xsd - x.e;

    x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);

    Ctor.precision = pr + 4;
    Ctor.rounding = 1;

    x = x.ln();

    Ctor.precision = pr;
    Ctor.rounding = rm;

    return x.times(0.5);
  };


  /*
   * Return a new Decimal whose value is the arcsine (inverse sine) in radians of the value of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi/2, pi/2]
   *
   * asin(x) = 2*atan(x/(1 + sqrt(1 - x^2)))
   *
   * asin(0)       = 0
   * asin(-0)      = -0
   * asin(1/2)     = pi/6
   * asin(-1/2)    = -pi/6
   * asin(1)       = pi/2
   * asin(-1)      = -pi/2
   * asin(|x| > 1) = NaN
   * asin(NaN)     = NaN
   *
   * TODO? Compare performance of Taylor series.
   *
   */
  P.inverseSine = P.asin = function () {
    var halfPi, k,
      pr, rm,
      x = this,
      Ctor = x.constructor;

    if (x.isZero()) return new Ctor(x);

    k = x.abs().cmp(1);
    pr = Ctor.precision;
    rm = Ctor.rounding;

    if (k !== -1) {

      // |x| is 1
      if (k === 0) {
        halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
        halfPi.s = x.s;
        return halfPi;
      }

      // |x| > 1 or x is NaN
      return new Ctor(NaN);
    }

    // TODO? Special case asin(1/2) = pi/6 and asin(-1/2) = -pi/6

    Ctor.precision = pr + 6;
    Ctor.rounding = 1;

    x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();

    Ctor.precision = pr;
    Ctor.rounding = rm;

    return x.times(2);
  };


  /*
   * Return a new Decimal whose value is the arctangent (inverse tangent) in radians of the value
   * of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi/2, pi/2]
   *
   * atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
   *
   * atan(0)         = 0
   * atan(-0)        = -0
   * atan(1)         = pi/4
   * atan(-1)        = -pi/4
   * atan(Infinity)  = pi/2
   * atan(-Infinity) = -pi/2
   * atan(NaN)       = NaN
   *
   */
  P.inverseTangent = P.atan = function () {
    var i, j, k, n, px, t, r, wpr, x2,
      x = this,
      Ctor = x.constructor,
      pr = Ctor.precision,
      rm = Ctor.rounding;

    if (!x.isFinite()) {
      if (!x.s) return new Ctor(NaN);
      if (pr + 4 <= PI_PRECISION) {
        r = getPi(Ctor, pr + 4, rm).times(0.5);
        r.s = x.s;
        return r;
      }
    } else if (x.isZero()) {
      return new Ctor(x);
    } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
      r = getPi(Ctor, pr + 4, rm).times(0.25);
      r.s = x.s;
      return r;
    }

    Ctor.precision = wpr = pr + 10;
    Ctor.rounding = 1;

    // TODO? if (x >= 1 && pr <= PI_PRECISION) atan(x) = halfPi * x.s - atan(1 / x);

    // Argument reduction
    // Ensure |x| < 0.42
    // atan(x) = 2 * atan(x / (1 + sqrt(1 + x^2)))

    k = Math.min(28, wpr / LOG_BASE + 2 | 0);

    for (i = k; i; --i) x = x.div(x.times(x).plus(1).sqrt().plus(1));

    external = false;

    j = Math.ceil(wpr / LOG_BASE);
    n = 1;
    x2 = x.times(x);
    r = new Ctor(x);
    px = x;

    // atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
    for (; i !== -1;) {
      px = px.times(x2);
      t = r.minus(px.div(n += 2));

      px = px.times(x2);
      r = t.plus(px.div(n += 2));

      if (r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--;);
    }

    if (k) r = r.times(2 << (k - 1));

    external = true;

    return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
  };


  /*
   * Return true if the value of this Decimal is a finite number, otherwise return false.
   *
   */
  P.isFinite = function () {
    return !!this.d;
  };


  /*
   * Return true if the value of this Decimal is an integer, otherwise return false.
   *
   */
  P.isInteger = P.isInt = function () {
    return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
  };


  /*
   * Return true if the value of this Decimal is NaN, otherwise return false.
   *
   */
  P.isNaN = function () {
    return !this.s;
  };


  /*
   * Return true if the value of this Decimal is negative, otherwise return false.
   *
   */
  P.isNegative = P.isNeg = function () {
    return this.s < 0;
  };


  /*
   * Return true if the value of this Decimal is positive, otherwise return false.
   *
   */
  P.isPositive = P.isPos = function () {
    return this.s > 0;
  };


  /*
   * Return true if the value of this Decimal is 0 or -0, otherwise return false.
   *
   */
  P.isZero = function () {
    return !!this.d && this.d[0] === 0;
  };


  /*
   * Return true if the value of this Decimal is less than `y`, otherwise return false.
   *
   */
  P.lessThan = P.lt = function (y) {
    return this.cmp(y) < 0;
  };


  /*
   * Return true if the value of this Decimal is less than or equal to `y`, otherwise return false.
   *
   */
  P.lessThanOrEqualTo = P.lte = function (y) {
    return this.cmp(y) < 1;
  };


  /*
   * Return the logarithm of the value of this Decimal to the specified base, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * If no base is specified, return log[10](arg).
   *
   * log[base](arg) = ln(arg) / ln(base)
   *
   * The result will always be correctly rounded if the base of the log is 10, and 'almost always'
   * otherwise:
   *
   * Depending on the rounding mode, the result may be incorrectly rounded if the first fifteen
   * rounding digits are [49]99999999999999 or [50]00000000000000. In that case, the maximum error
   * between the result and the correctly rounded result will be one ulp (unit in the last place).
   *
   * log[-b](a)       = NaN
   * log[0](a)        = NaN
   * log[1](a)        = NaN
   * log[NaN](a)      = NaN
   * log[Infinity](a) = NaN
   * log[b](0)        = -Infinity
   * log[b](-0)       = -Infinity
   * log[b](-a)       = NaN
   * log[b](1)        = 0
   * log[b](Infinity) = Infinity
   * log[b](NaN)      = NaN
   *
   * [base] {number|string|Decimal} The base of the logarithm.
   *
   */
  P.logarithm = P.log = function (base) {
    var isBase10, d, denominator, k, inf, num, sd, r,
      arg = this,
      Ctor = arg.constructor,
      pr = Ctor.precision,
      rm = Ctor.rounding,
      guard = 5;

    // Default base is 10.
    if (base == null) {
      base = new Ctor(10);
      isBase10 = true;
    } else {
      base = new Ctor(base);
      d = base.d;

      // Return NaN if base is negative, or non-finite, or is 0 or 1.
      if (base.s < 0 || !d || !d[0] || base.eq(1)) return new Ctor(NaN);

      isBase10 = base.eq(10);
    }

    d = arg.d;

    // Is arg negative, non-finite, 0 or 1?
    if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
      return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
    }

    // The result will have a non-terminating decimal expansion if base is 10 and arg is not an
    // integer power of 10.
    if (isBase10) {
      if (d.length > 1) {
        inf = true;
      } else {
        for (k = d[0]; k % 10 === 0;) k /= 10;
        inf = k !== 1;
      }
    }

    external = false;
    sd = pr + guard;
    num = naturalLogarithm(arg, sd);
    denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);

    // The result will have 5 rounding digits.
    r = divide(num, denominator, sd, 1);

    // If at a rounding boundary, i.e. the result's rounding digits are [49]9999 or [50]0000,
    // calculate 10 further digits.
    //
    // If the result is known to have an infinite decimal expansion, repeat this until it is clear
    // that the result is above or below the boundary. Otherwise, if after calculating the 10
    // further digits, the last 14 are nines, round up and assume the result is exact.
    // Also assume the result is exact if the last 14 are zero.
    //
    // Example of a result that will be incorrectly rounded:
    // log[1048576](4503599627370502) = 2.60000000000000009610279511444746...
    // The above result correctly rounded using ROUND_CEIL to 1 decimal place should be 2.7, but it
    // will be given as 2.6 as there are 15 zeros immediately after the requested decimal place, so
    // the exact result would be assumed to be 2.6, which rounded using ROUND_CEIL to 1 decimal
    // place is still 2.6.
    if (checkRoundingDigits(r.d, k = pr, rm)) {

      do {
        sd += 10;
        num = naturalLogarithm(arg, sd);
        denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
        r = divide(num, denominator, sd, 1);

        if (!inf) {

          // Check for 14 nines from the 2nd rounding digit, as the first may be 4.
          if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
            r = finalise(r, pr + 1, 0);
          }

          break;
        }
      } while (checkRoundingDigits(r.d, k += 10, rm));
    }

    external = true;

    return finalise(r, pr, rm);
  };


  /*
   * Return a new Decimal whose value is the maximum of the arguments and the value of this Decimal.
   *
   * arguments {number|string|Decimal}
   *
  P.max = function () {
    Array.prototype.push.call(arguments, this);
    return maxOrMin(this.constructor, arguments, 'lt');
  };
   */


  /*
   * Return a new Decimal whose value is the minimum of the arguments and the value of this Decimal.
   *
   * arguments {number|string|Decimal}
   *
  P.min = function () {
    Array.prototype.push.call(arguments, this);
    return maxOrMin(this.constructor, arguments, 'gt');
  };
   */


  /*
   *  n - 0 = n
   *  n - N = N
   *  n - I = -I
   *  0 - n = -n
   *  0 - 0 = 0
   *  0 - N = N
   *  0 - I = -I
   *  N - n = N
   *  N - 0 = N
   *  N - N = N
   *  N - I = N
   *  I - n = I
   *  I - 0 = I
   *  I - N = N
   *  I - I = N
   *
   * Return a new Decimal whose value is the value of this Decimal minus `y`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */
  P.minus = P.sub = function (y) {
    var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd,
      x = this,
      Ctor = x.constructor;

    y = new Ctor(y);

    // If either is not finite...
    if (!x.d || !y.d) {

      // Return NaN if either is NaN.
      if (!x.s || !y.s) y = new Ctor(NaN);

      // Return y negated if x is finite and y is ±Infinity.
      else if (x.d) y.s = -y.s;

      // Return x if y is finite and x is ±Infinity.
      // Return x if both are ±Infinity with different signs.
      // Return NaN if both are ±Infinity with the same sign.
      else y = new Ctor(y.d || x.s !== y.s ? x : NaN);

      return y;
    }

    // If signs differ...
    if (x.s != y.s) {
      y.s = -y.s;
      return x.plus(y);
    }

    xd = x.d;
    yd = y.d;
    pr = Ctor.precision;
    rm = Ctor.rounding;

    // If either is zero...
    if (!xd[0] || !yd[0]) {

      // Return y negated if x is zero and y is non-zero.
      if (yd[0]) y.s = -y.s;

      // Return x if y is zero and x is non-zero.
      else if (xd[0]) y = new Ctor(x);

      // Return zero if both are zero.
      // From IEEE 754 (2008) 6.3: 0 - 0 = -0 - -0 = -0 when rounding to -Infinity.
      else return new Ctor(rm === 3 ? -0 : 0);

      return external ? finalise(y, pr, rm) : y;
    }

    // x and y are finite, non-zero numbers with the same sign.

    // Calculate base 1e7 exponents.
    e = mathfloor(y.e / LOG_BASE);
    xe = mathfloor(x.e / LOG_BASE);

    xd = xd.slice();
    k = xe - e;

    // If base 1e7 exponents differ...
    if (k) {
      xLTy = k < 0;

      if (xLTy) {
        d = xd;
        k = -k;
        len = yd.length;
      } else {
        d = yd;
        e = xe;
        len = xd.length;
      }

      // Numbers with massively different exponents would result in a very high number of
      // zeros needing to be prepended, but this can be avoided while still ensuring correct
      // rounding by limiting the number of zeros to `Math.ceil(pr / LOG_BASE) + 2`.
      i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;

      if (k > i) {
        k = i;
        d.length = 1;
      }

      // Prepend zeros to equalise exponents.
      d.reverse();
      for (i = k; i--;) d.push(0);
      d.reverse();

    // Base 1e7 exponents equal.
    } else {

      // Check digits to determine which is the bigger number.

      i = xd.length;
      len = yd.length;
      xLTy = i < len;
      if (xLTy) len = i;

      for (i = 0; i < len; i++) {
        if (xd[i] != yd[i]) {
          xLTy = xd[i] < yd[i];
          break;
        }
      }

      k = 0;
    }

    if (xLTy) {
      d = xd;
      xd = yd;
      yd = d;
      y.s = -y.s;
    }

    len = xd.length;

    // Append zeros to `xd` if shorter.
    // Don't add zeros to `yd` if shorter as subtraction only needs to start at `yd` length.
    for (i = yd.length - len; i > 0; --i) xd[len++] = 0;

    // Subtract yd from xd.
    for (i = yd.length; i > k;) {

      if (xd[--i] < yd[i]) {
        for (j = i; j && xd[--j] === 0;) xd[j] = BASE - 1;
        --xd[j];
        xd[i] += BASE;
      }

      xd[i] -= yd[i];
    }

    // Remove trailing zeros.
    for (; xd[--len] === 0;) xd.pop();

    // Remove leading zeros and adjust exponent accordingly.
    for (; xd[0] === 0; xd.shift()) --e;

    // Zero?
    if (!xd[0]) return new Ctor(rm === 3 ? -0 : 0);

    y.d = xd;
    y.e = getBase10Exponent(xd, e);

    return external ? finalise(y, pr, rm) : y;
  };


  /*
   *   n % 0 =  N
   *   n % N =  N
   *   n % I =  n
   *   0 % n =  0
   *  -0 % n = -0
   *   0 % 0 =  N
   *   0 % N =  N
   *   0 % I =  0
   *   N % n =  N
   *   N % 0 =  N
   *   N % N =  N
   *   N % I =  N
   *   I % n =  N
   *   I % 0 =  N
   *   I % N =  N
   *   I % I =  N
   *
   * Return a new Decimal whose value is the value of this Decimal modulo `y`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * The result depends on the modulo mode.
   *
   */
  P.modulo = P.mod = function (y) {
    var q,
      x = this,
      Ctor = x.constructor;

    y = new Ctor(y);

    // Return NaN if x is ±Infinity or NaN, or y is NaN or ±0.
    if (!x.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN);

    // Return x if y is ±Infinity or x is ±0.
    if (!y.d || x.d && !x.d[0]) {
      return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
    }

    // Prevent rounding of intermediate calculations.
    external = false;

    if (Ctor.modulo == 9) {

      // Euclidian division: q = sign(y) * floor(x / abs(y))
      // result = x - q * y    where  0 <= result < abs(y)
      q = divide(x, y.abs(), 0, 3, 1);
      q.s *= y.s;
    } else {
      q = divide(x, y, 0, Ctor.modulo, 1);
    }

    q = q.times(y);

    external = true;

    return x.minus(q);
  };


  /*
   * Return a new Decimal whose value is the natural exponential of the value of this Decimal,
   * i.e. the base e raised to the power the value of this Decimal, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */
  P.naturalExponential = P.exp = function () {
    return naturalExponential(this);
  };


  /*
   * Return a new Decimal whose value is the natural logarithm of the value of this Decimal,
   * rounded to `precision` significant digits using rounding mode `rounding`.
   *
   */
  P.naturalLogarithm = P.ln = function () {
    return naturalLogarithm(this);
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal negated, i.e. as if multiplied by
   * -1.
   *
   */
  P.negated = P.neg = function () {
    var x = new this.constructor(this);
    x.s = -x.s;
    return finalise(x);
  };


  /*
   *  n + 0 = n
   *  n + N = N
   *  n + I = I
   *  0 + n = n
   *  0 + 0 = 0
   *  0 + N = N
   *  0 + I = I
   *  N + n = N
   *  N + 0 = N
   *  N + N = N
   *  N + I = N
   *  I + n = I
   *  I + 0 = I
   *  I + N = N
   *  I + I = I
   *
   * Return a new Decimal whose value is the value of this Decimal plus `y`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */
  P.plus = P.add = function (y) {
    var carry, d, e, i, k, len, pr, rm, xd, yd,
      x = this,
      Ctor = x.constructor;

    y = new Ctor(y);

    // If either is not finite...
    if (!x.d || !y.d) {

      // Return NaN if either is NaN.
      if (!x.s || !y.s) y = new Ctor(NaN);

      // Return x if y is finite and x is ±Infinity.
      // Return x if both are ±Infinity with the same sign.
      // Return NaN if both are ±Infinity with different signs.
      // Return y if x is finite and y is ±Infinity.
      else if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);

      return y;
    }

     // If signs differ...
    if (x.s != y.s) {
      y.s = -y.s;
      return x.minus(y);
    }

    xd = x.d;
    yd = y.d;
    pr = Ctor.precision;
    rm = Ctor.rounding;

    // If either is zero...
    if (!xd[0] || !yd[0]) {

      // Return x if y is zero.
      // Return y if y is non-zero.
      if (!yd[0]) y = new Ctor(x);

      return external ? finalise(y, pr, rm) : y;
    }

    // x and y are finite, non-zero numbers with the same sign.

    // Calculate base 1e7 exponents.
    k = mathfloor(x.e / LOG_BASE);
    e = mathfloor(y.e / LOG_BASE);

    xd = xd.slice();
    i = k - e;

    // If base 1e7 exponents differ...
    if (i) {

      if (i < 0) {
        d = xd;
        i = -i;
        len = yd.length;
      } else {
        d = yd;
        e = k;
        len = xd.length;
      }

      // Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
      k = Math.ceil(pr / LOG_BASE);
      len = k > len ? k + 1 : len + 1;

      if (i > len) {
        i = len;
        d.length = 1;
      }

      // Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
      d.reverse();
      for (; i--;) d.push(0);
      d.reverse();
    }

    len = xd.length;
    i = yd.length;

    // If yd is longer than xd, swap xd and yd so xd points to the longer array.
    if (len - i < 0) {
      i = len;
      d = yd;
      yd = xd;
      xd = d;
    }

    // Only start adding at yd.length - 1 as the further digits of xd can be left as they are.
    for (carry = 0; i;) {
      carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
      xd[i] %= BASE;
    }

    if (carry) {
      xd.unshift(carry);
      ++e;
    }

    // Remove trailing zeros.
    // No need to check for zero, as +x + +y != 0 && -x + -y != 0
    for (len = xd.length; xd[--len] == 0;) xd.pop();

    y.d = xd;
    y.e = getBase10Exponent(xd, e);

    return external ? finalise(y, pr, rm) : y;
  };


  /*
   * Return the number of significant digits of the value of this Decimal.
   *
   * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
   *
   */
  P.precision = P.sd = function (z) {
    var k,
      x = this;

    if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);

    if (x.d) {
      k = getPrecision(x.d);
      if (z && x.e + 1 > k) k = x.e + 1;
    } else {
      k = NaN;
    }

    return k;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number using
   * rounding mode `rounding`.
   *
   */
  P.round = function () {
    var x = this,
      Ctor = x.constructor;

    return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
  };


  /*
   * Return a new Decimal whose value is the sine of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * sin(x) = x - x^3/3! + x^5/5! - ...
   *
   * sin(0)         = 0
   * sin(-0)        = -0
   * sin(Infinity)  = NaN
   * sin(-Infinity) = NaN
   * sin(NaN)       = NaN
   *
   */
  P.sine = P.sin = function () {
    var pr, rm,
      x = this,
      Ctor = x.constructor;

    if (!x.isFinite()) return new Ctor(NaN);
    if (x.isZero()) return new Ctor(x);

    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
    Ctor.rounding = 1;

    x = sine(Ctor, toLessThanHalfPi(Ctor, x));

    Ctor.precision = pr;
    Ctor.rounding = rm;

    return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
  };


  /*
   * Return a new Decimal whose value is the square root of this Decimal, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   *  sqrt(-n) =  N
   *  sqrt(N)  =  N
   *  sqrt(-I) =  N
   *  sqrt(I)  =  I
   *  sqrt(0)  =  0
   *  sqrt(-0) = -0
   *
   */
  P.squareRoot = P.sqrt = function () {
    var m, n, sd, r, rep, t,
      x = this,
      d = x.d,
      e = x.e,
      s = x.s,
      Ctor = x.constructor;

    // Negative/NaN/Infinity/zero?
    if (s !== 1 || !d || !d[0]) {
      return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
    }

    external = false;

    // Initial estimate.
    s = Math.sqrt(+x);

    // Math.sqrt underflow/overflow?
    // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
    if (s == 0 || s == 1 / 0) {
      n = digitsToString(d);

      if ((n.length + e) % 2 == 0) n += '0';
      s = Math.sqrt(n);
      e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);

      if (s == 1 / 0) {
        n = '1e' + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf('e') + 1) + e;
      }

      r = new Ctor(n);
    } else {
      r = new Ctor(s.toString());
    }

    sd = (e = Ctor.precision) + 3;

    // Newton-Raphson iteration.
    for (;;) {
      t = r;
      r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);

      // TODO? Replace with for-loop and checkRoundingDigits.
      if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
        n = n.slice(sd - 3, sd + 1);

        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
        // 4999, i.e. approaching a rounding boundary, continue the iteration.
        if (n == '9999' || !rep && n == '4999') {

          // On the first iteration only, check to see if rounding up gives the exact result as the
          // nines may infinitely repeat.
          if (!rep) {
            finalise(t, e + 1, 0);

            if (t.times(t).eq(x)) {
              r = t;
              break;
            }
          }

          sd += 4;
          rep = 1;
        } else {

          // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
          // If not, then there are further digits and m will be truthy.
          if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

            // Truncate to the first rounding digit.
            finalise(r, e + 1, 1);
            m = !r.times(r).eq(x);
          }

          break;
        }
      }
    }

    external = true;

    return finalise(r, e, Ctor.rounding, m);
  };


  /*
   * Return a new Decimal whose value is the tangent of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * tan(0)         = 0
   * tan(-0)        = -0
   * tan(Infinity)  = NaN
   * tan(-Infinity) = NaN
   * tan(NaN)       = NaN
   *
   */
  P.tangent = P.tan = function () {
    var pr, rm,
      x = this,
      Ctor = x.constructor;

    if (!x.isFinite()) return new Ctor(NaN);
    if (x.isZero()) return new Ctor(x);

    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 10;
    Ctor.rounding = 1;

    x = x.sin();
    x.s = 1;
    x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);

    Ctor.precision = pr;
    Ctor.rounding = rm;

    return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
  };


  /*
   *  n * 0 = 0
   *  n * N = N
   *  n * I = I
   *  0 * n = 0
   *  0 * 0 = 0
   *  0 * N = N
   *  0 * I = N
   *  N * n = N
   *  N * 0 = N
   *  N * N = N
   *  N * I = N
   *  I * n = I
   *  I * 0 = N
   *  I * N = N
   *  I * I = I
   *
   * Return a new Decimal whose value is this Decimal times `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   */
  P.times = P.mul = function (y) {
    var carry, e, i, k, r, rL, t, xdL, ydL,
      x = this,
      Ctor = x.constructor,
      xd = x.d,
      yd = (y = new Ctor(y)).d;

    y.s *= x.s;

     // If either is NaN, ±Infinity or ±0...
    if (!xd || !xd[0] || !yd || !yd[0]) {

      return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd

        // Return NaN if either is NaN.
        // Return NaN if x is ±0 and y is ±Infinity, or y is ±0 and x is ±Infinity.
        ? NaN

        // Return ±Infinity if either is ±Infinity.
        // Return ±0 if either is ±0.
        : !xd || !yd ? y.s / 0 : y.s * 0);
    }

    e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
    xdL = xd.length;
    ydL = yd.length;

    // Ensure xd points to the longer array.
    if (xdL < ydL) {
      r = xd;
      xd = yd;
      yd = r;
      rL = xdL;
      xdL = ydL;
      ydL = rL;
    }

    // Initialise the result array with zeros.
    r = [];
    rL = xdL + ydL;
    for (i = rL; i--;) r.push(0);

    // Multiply!
    for (i = ydL; --i >= 0;) {
      carry = 0;
      for (k = xdL + i; k > i;) {
        t = r[k] + yd[i] * xd[k - i - 1] + carry;
        r[k--] = t % BASE | 0;
        carry = t / BASE | 0;
      }

      r[k] = (r[k] + carry) % BASE | 0;
    }

    // Remove trailing zeros.
    for (; !r[--rL];) r.pop();

    if (carry) ++e;
    else r.shift();

    // Remove trailing zeros.
    for (i = r.length; !r[--i];) r.pop();

    y.d = r;
    y.e = getBase10Exponent(r, e);

    return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
  };


  /*
   * Return a string representing the value of this Decimal in base 2, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toBinary = function (sd, rm) {
    return toStringBinary(this, 2, sd, rm);
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `dp`
   * decimal places using rounding mode `rm` or `rounding` if `rm` is omitted.
   *
   * If `dp` is omitted, return a new Decimal whose value is the value of this Decimal.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toDecimalPlaces = P.toDP = function (dp, rm) {
    var x = this,
      Ctor = x.constructor;

    x = new Ctor(x);
    if (dp === void 0) return x;

    checkInt32(dp, 0, MAX_DIGITS);

    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);

    return finalise(x, dp + x.e + 1, rm);
  };


  /*
   * Return a string representing the value of this Decimal in exponential notation rounded to
   * `dp` fixed decimal places using rounding mode `rounding`.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toExponential = function (dp, rm) {
    var str,
      x = this,
      Ctor = x.constructor;

    if (dp === void 0) {
      str = finiteToString(x, true);
    } else {
      checkInt32(dp, 0, MAX_DIGITS);

      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);

      x = finalise(new Ctor(x), dp + 1, rm);
      str = finiteToString(x, true, dp + 1);
    }

    return x.isNeg() && !x.isZero() ? '-' + str : str;
  };


  /*
   * Return a string representing the value of this Decimal in normal (fixed-point) notation to
   * `dp` fixed decimal places and rounded using rounding mode `rm` or `rounding` if `rm` is
   * omitted.
   *
   * As with JavaScript numbers, (-0).toFixed(0) is '0', but e.g. (-0.00001).toFixed(0) is '-0'.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
   * (-0).toFixed(3) is '0.000'.
   * (-0.5).toFixed(0) is '-0'.
   *
   */
  P.toFixed = function (dp, rm) {
    var str, y,
      x = this,
      Ctor = x.constructor;

    if (dp === void 0) {
      str = finiteToString(x);
    } else {
      checkInt32(dp, 0, MAX_DIGITS);

      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);

      y = finalise(new Ctor(x), dp + x.e + 1, rm);
      str = finiteToString(y, false, dp + y.e + 1);
    }

    // To determine whether to add the minus sign look at the value before it was rounded,
    // i.e. look at `x` rather than `y`.
    return x.isNeg() && !x.isZero() ? '-' + str : str;
  };


  /*
   * Return an array representing the value of this Decimal as a simple fraction with an integer
   * numerator and an integer denominator.
   *
   * The denominator will be a positive non-zero value less than or equal to the specified maximum
   * denominator. If a maximum denominator is not specified, the denominator will be the lowest
   * value necessary to represent the number exactly.
   *
   * [maxD] {number|string|Decimal} Maximum denominator. Integer >= 1 and < Infinity.
   *
   */
  P.toFraction = function (maxD) {
    var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r,
      x = this,
      xd = x.d,
      Ctor = x.constructor;

    if (!xd) return new Ctor(x);

    n1 = d0 = new Ctor(1);
    d1 = n0 = new Ctor(0);

    d = new Ctor(d1);
    e = d.e = getPrecision(xd) - x.e - 1;
    k = e % LOG_BASE;
    d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);

    if (maxD == null) {

      // d is 10**e, the minimum max-denominator needed.
      maxD = e > 0 ? d : n1;
    } else {
      n = new Ctor(maxD);
      if (!n.isInt() || n.lt(n1)) throw Error(invalidArgument + n);
      maxD = n.gt(d) ? (e > 0 ? d : n1) : n;
    }

    external = false;
    n = new Ctor(digitsToString(xd));
    pr = Ctor.precision;
    Ctor.precision = e = xd.length * LOG_BASE * 2;

    for (;;)  {
      q = divide(n, d, 0, 1, 1);
      d2 = d0.plus(q.times(d1));
      if (d2.cmp(maxD) == 1) break;
      d0 = d1;
      d1 = d2;
      d2 = n1;
      n1 = n0.plus(q.times(d2));
      n0 = d2;
      d2 = d;
      d = n.minus(q.times(d2));
      n = d2;
    }

    d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
    n0 = n0.plus(d2.times(n1));
    d0 = d0.plus(d2.times(d1));
    n0.s = n1.s = x.s;

    // Determine which fraction is closer to x, n0/d0 or n1/d1?
    r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1
        ? [n1, d1] : [n0, d0];

    Ctor.precision = pr;
    external = true;

    return r;
  };


  /*
   * Return a string representing the value of this Decimal in base 16, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toHexadecimal = P.toHex = function (sd, rm) {
    return toStringBinary(this, 16, sd, rm);
  };



  /*
   * Returns a new Decimal whose value is the nearest multiple of the magnitude of `y` to the value
   * of this Decimal.
   *
   * If the value of this Decimal is equidistant from two multiples of `y`, the rounding mode `rm`,
   * or `Decimal.rounding` if `rm` is omitted, determines the direction of the nearest multiple.
   *
   * In the context of this method, rounding mode 4 (ROUND_HALF_UP) is the same as rounding mode 0
   * (ROUND_UP), and so on.
   *
   * The return value will always have the same sign as this Decimal, unless either this Decimal
   * or `y` is NaN, in which case the return value will be also be NaN.
   *
   * The return value is not affected by the value of `precision`.
   *
   * y {number|string|Decimal} The magnitude to round to a multiple of.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * 'toNearest() rounding mode not an integer: {rm}'
   * 'toNearest() rounding mode out of range: {rm}'
   *
   */
  P.toNearest = function (y, rm) {
    var x = this,
      Ctor = x.constructor;

    x = new Ctor(x);

    if (y == null) {

      // If x is not finite, return x.
      if (!x.d) return x;

      y = new Ctor(1);
      rm = Ctor.rounding;
    } else {
      y = new Ctor(y);
      if (rm !== void 0) checkInt32(rm, 0, 8);

      // If x is not finite, return x if y is not NaN, else NaN.
      if (!x.d) return y.s ? x : y;

      // If y is not finite, return Infinity with the sign of x if y is Infinity, else NaN.
      if (!y.d) {
        if (y.s) y.s = x.s;
        return y;
      }
    }

    // If y is not zero, calculate the nearest multiple of y to x.
    if (y.d[0]) {
      external = false;
      if (rm < 4) rm = [4, 5, 7, 8][rm];
      x = divide(x, y, 0, rm, 1).times(y);
      external = true;
      finalise(x);

    // If y is zero, return zero with the sign of x.
    } else {
      y.s = x.s;
      x = y;
    }

    return x;
  };


  /*
   * Return the value of this Decimal converted to a number primitive.
   * Zero keeps its sign.
   *
   */
  P.toNumber = function () {
    return +this;
  };


  /*
   * Return a string representing the value of this Decimal in base 8, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toOctal = function (sd, rm) {
    return toStringBinary(this, 8, sd, rm);
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal raised to the power `y`, rounded
   * to `precision` significant digits using rounding mode `rounding`.
   *
   * ECMAScript compliant.
   *
   *   pow(x, NaN)                           = NaN
   *   pow(x, ±0)                            = 1

   *   pow(NaN, non-zero)                    = NaN
   *   pow(abs(x) > 1, +Infinity)            = +Infinity
   *   pow(abs(x) > 1, -Infinity)            = +0
   *   pow(abs(x) == 1, ±Infinity)           = NaN
   *   pow(abs(x) < 1, +Infinity)            = +0
   *   pow(abs(x) < 1, -Infinity)            = +Infinity
   *   pow(+Infinity, y > 0)                 = +Infinity
   *   pow(+Infinity, y < 0)                 = +0
   *   pow(-Infinity, odd integer > 0)       = -Infinity
   *   pow(-Infinity, even integer > 0)      = +Infinity
   *   pow(-Infinity, odd integer < 0)       = -0
   *   pow(-Infinity, even integer < 0)      = +0
   *   pow(+0, y > 0)                        = +0
   *   pow(+0, y < 0)                        = +Infinity
   *   pow(-0, odd integer > 0)              = -0
   *   pow(-0, even integer > 0)             = +0
   *   pow(-0, odd integer < 0)              = -Infinity
   *   pow(-0, even integer < 0)             = +Infinity
   *   pow(finite x < 0, finite non-integer) = NaN
   *
   * For non-integer or very large exponents pow(x, y) is calculated using
   *
   *   x^y = exp(y*ln(x))
   *
   * Assuming the first 15 rounding digits are each equally likely to be any digit 0-9, the
   * probability of an incorrectly rounded result
   * P([49]9{14} | [50]0{14}) = 2 * 0.2 * 10^-14 = 4e-15 = 1/2.5e+14
   * i.e. 1 in 250,000,000,000,000
   *
   * If a result is incorrectly rounded the maximum error will be 1 ulp (unit in last place).
   *
   * y {number|string|Decimal} The power to which to raise this Decimal.
   *
   */
  P.toPower = P.pow = function (y) {
    var e, k, pr, r, rm, sign, yIsInt,
      x = this,
      Ctor = x.constructor,
      yn = +(y = new Ctor(y));

    // Either ±Infinity, NaN or ±0?
    if (!x.d || !y.d || !x.d[0] || !y.d[0]) return  new Ctor(mathpow(+x, yn));

    x = new Ctor(x);

    if (x.eq(1)) return x;

    pr = Ctor.precision;
    rm = Ctor.rounding;

    if (y.eq(1)) return finalise(x, pr, rm);

    e = mathfloor(y.e / LOG_BASE);
    k = y.d.length - 1;
    yIsInt = e >= k;
    sign = x.s;

    if (!yIsInt) {
      if (sign < 0) return new Ctor(NaN);

    // If y is a small integer use the 'exponentiation by squaring' algorithm.
    } else if ((k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
      r = intPow(Ctor, x, k, pr);
      return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
    }

    // Result is negative if x is negative and the last digit of integer y is odd.
    sign = sign < 0 && y.d[Math.max(e, k)] & 1 ? -1 : 1;

    // Estimate result exponent.
    // x^y = 10^e,  where e = y * log10(x)
    // log10(x) = log10(x_significand) + x_exponent
    // log10(x_significand) = ln(x_significand) / ln(10)
    k = mathpow(+x, yn);
    e = k == 0 || !isFinite(k)
      ? mathfloor(yn * (Math.log('0.' + digitsToString(x.d)) / Math.LN10 + x.e + 1))
      : new Ctor(k + '').e;

    // Estimate may be incorrect e.g. x: 0.999999999999999999, y: 2.29, e: 0, r.e: -1.

    // Overflow/underflow?
    if (e > Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? sign / 0 : 0);

    external = false;
    Ctor.rounding = x.s = 1;

    // Estimate the extra guard digits needed to ensure five correct rounding digits from
    // naturalLogarithm(x). Example of failure without these extra digits (precision: 10):
    // new Decimal(2.32456).pow('2087987436534566.46411')
    // should be 1.162377823e+764914905173815, but is 1.162355823e+764914905173815
    k = Math.min(12, (e + '').length);

    // r = x^y = exp(y*ln(x))
    r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);

    // Truncate to the required precision plus five rounding digits.
    r = finalise(r, pr + 5, 1);

    // If the rounding digits are [49]9999 or [50]0000 increase the precision by 10 and recalculate
    // the result.
    if (checkRoundingDigits(r.d, pr, rm)) {
      e = pr + 10;

      // Truncate to the increased precision plus five rounding digits.
      r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);

      // Check for 14 nines from the 2nd rounding digit (the first rounding digit may be 4 or 9).
      if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
        r = finalise(r, pr + 1, 0);
      }
    }

    r.s = sign;
    external = true;
    Ctor.rounding = rm;

    return finalise(r, pr, rm);
  };


  /*
   * Return a string representing the value of this Decimal rounded to `sd` significant digits
   * using rounding mode `rounding`.
   *
   * Return exponential notation if `sd` is less than the number of digits necessary to represent
   * the integer part of the value in normal notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toPrecision = function (sd, rm) {
    var str,
      x = this,
      Ctor = x.constructor;

    if (sd === void 0) {
      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
    } else {
      checkInt32(sd, 1, MAX_DIGITS);

      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);

      x = finalise(new Ctor(x), sd, rm);
      str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
    }

    return x.isNeg() && !x.isZero() ? '-' + str : str;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `sd`
   * significant digits using rounding mode `rm`, or to `precision` and `rounding` respectively if
   * omitted.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * 'toSD() digits out of range: {sd}'
   * 'toSD() digits not an integer: {sd}'
   * 'toSD() rounding mode not an integer: {rm}'
   * 'toSD() rounding mode out of range: {rm}'
   *
   */
  P.toSignificantDigits = P.toSD = function (sd, rm) {
    var x = this,
      Ctor = x.constructor;

    if (sd === void 0) {
      sd = Ctor.precision;
      rm = Ctor.rounding;
    } else {
      checkInt32(sd, 1, MAX_DIGITS);

      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);
    }

    return finalise(new Ctor(x), sd, rm);
  };


  /*
   * Return a string representing the value of this Decimal.
   *
   * Return exponential notation if this Decimal has a positive exponent equal to or greater than
   * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
   *
   */
  P.toString = function () {
    var x = this,
      Ctor = x.constructor,
      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);

    return x.isNeg() && !x.isZero() ? '-' + str : str;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal truncated to a whole number.
   *
   */
  P.truncated = P.trunc = function () {
    return finalise(new this.constructor(this), this.e + 1, 1);
  };


  /*
   * Return a string representing the value of this Decimal.
   * Unlike `toString`, negative zero will include the minus sign.
   *
   */
  P.valueOf = P.toJSON = function () {
    var x = this,
      Ctor = x.constructor,
      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);

    return x.isNeg() ? '-' + str : str;
  };


  /*
  // Add aliases to match BigDecimal method names.
  // P.add = P.plus;
  P.subtract = P.minus;
  P.multiply = P.times;
  P.divide = P.div;
  P.remainder = P.mod;
  P.compareTo = P.cmp;
  P.negate = P.neg;
   */


  // Helper functions for Decimal.prototype (P) and/or Decimal methods, and their callers.


  /*
   *  digitsToString           P.cubeRoot, P.logarithm, P.squareRoot, P.toFraction, P.toPower,
   *                           finiteToString, naturalExponential, naturalLogarithm
   *  checkInt32               P.toDecimalPlaces, P.toExponential, P.toFixed, P.toNearest,
   *                           P.toPrecision, P.toSignificantDigits, toStringBinary, random
   *  checkRoundingDigits      P.logarithm, P.toPower, naturalExponential, naturalLogarithm
   *  convertBase              toStringBinary, parseOther
   *  cos                      P.cos
   *  divide                   P.atanh, P.cubeRoot, P.dividedBy, P.dividedToIntegerBy,
   *                           P.logarithm, P.modulo, P.squareRoot, P.tan, P.tanh, P.toFraction,
   *                           P.toNearest, toStringBinary, naturalExponential, naturalLogarithm,
   *                           taylorSeries, atan2, parseOther
   *  finalise                 P.absoluteValue, P.atan, P.atanh, P.ceil, P.cos, P.cosh,
   *                           P.cubeRoot, P.dividedToIntegerBy, P.floor, P.logarithm, P.minus,
   *                           P.modulo, P.negated, P.plus, P.round, P.sin, P.sinh, P.squareRoot,
   *                           P.tan, P.times, P.toDecimalPlaces, P.toExponential, P.toFixed,
   *                           P.toNearest, P.toPower, P.toPrecision, P.toSignificantDigits,
   *                           P.truncated, divide, getLn10, getPi, naturalExponential,
   *                           naturalLogarithm, ceil, floor, round, trunc
   *  finiteToString           P.toExponential, P.toFixed, P.toPrecision, P.toString, P.valueOf,
   *                           toStringBinary
   *  getBase10Exponent        P.minus, P.plus, P.times, parseOther
   *  getLn10                  P.logarithm, naturalLogarithm
   *  getPi                    P.acos, P.asin, P.atan, toLessThanHalfPi, atan2
   *  getPrecision             P.precision, P.toFraction
   *  getZeroString            digitsToString, finiteToString
   *  intPow                   P.toPower, parseOther
   *  isOdd                    toLessThanHalfPi
   *  maxOrMin                 max, min
   *  naturalExponential       P.naturalExponential, P.toPower
   *  naturalLogarithm         P.acosh, P.asinh, P.atanh, P.logarithm, P.naturalLogarithm,
   *                           P.toPower, naturalExponential
   *  nonFiniteToString        finiteToString, toStringBinary
   *  parseDecimal             Decimal
   *  parseOther               Decimal
   *  sin                      P.sin
   *  taylorSeries             P.cosh, P.sinh, cos, sin
   *  toLessThanHalfPi         P.cos, P.sin
   *  toStringBinary           P.toBinary, P.toHexadecimal, P.toOctal
   *  truncate                 intPow
   *
   *  Throws:                  P.logarithm, P.precision, P.toFraction, checkInt32, getLn10, getPi,
   *                           naturalLogarithm, config, parseOther, random, Decimal
   */


  function digitsToString(d) {
    var i, k, ws,
      indexOfLastWord = d.length - 1,
      str = '',
      w = d[0];

    if (indexOfLastWord > 0) {
      str += w;
      for (i = 1; i < indexOfLastWord; i++) {
        ws = d[i] + '';
        k = LOG_BASE - ws.length;
        if (k) str += getZeroString(k);
        str += ws;
      }

      w = d[i];
      ws = w + '';
      k = LOG_BASE - ws.length;
      if (k) str += getZeroString(k);
    } else if (w === 0) {
      return '0';
    }

    // Remove trailing zeros of last w.
    for (; w % 10 === 0;) w /= 10;

    return str + w;
  }


  function checkInt32(i, min, max) {
    if (i !== ~~i || i < min || i > max) {
      throw Error(invalidArgument + i);
    }
  }


  /*
   * Check 5 rounding digits if `repeating` is null, 4 otherwise.
   * `repeating == null` if caller is `log` or `pow`,
   * `repeating != null` if caller is `naturalLogarithm` or `naturalExponential`.
   */
  function checkRoundingDigits(d, i, rm, repeating) {
    var di, k, r, rd;

    // Get the length of the first word of the array d.
    for (k = d[0]; k >= 10; k /= 10) --i;

    // Is the rounding digit in the first word of d?
    if (--i < 0) {
      i += LOG_BASE;
      di = 0;
    } else {
      di = Math.ceil((i + 1) / LOG_BASE);
      i %= LOG_BASE;
    }

    // i is the index (0 - 6) of the rounding digit.
    // E.g. if within the word 3487563 the first rounding digit is 5,
    // then i = 4, k = 1000, rd = 3487563 % 1000 = 563
    k = mathpow(10, LOG_BASE - i);
    rd = d[di] % k | 0;

    if (repeating == null) {
      if (i < 3) {
        if (i == 0) rd = rd / 100 | 0;
        else if (i == 1) rd = rd / 10 | 0;
        r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 50000 || rd == 0;
      } else {
        r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) &&
          (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 ||
            (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
      }
    } else {
      if (i < 4) {
        if (i == 0) rd = rd / 1000 | 0;
        else if (i == 1) rd = rd / 100 | 0;
        else if (i == 2) rd = rd / 10 | 0;
        r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
      } else {
        r = ((repeating || rm < 4) && rd + 1 == k ||
        (!repeating && rm > 3) && rd + 1 == k / 2) &&
          (d[di + 1] / k / 1000 | 0) == mathpow(10, i - 3) - 1;
      }
    }

    return r;
  }


  // Convert string of `baseIn` to an array of numbers of `baseOut`.
  // Eg. convertBase('255', 10, 16) returns [15, 15].
  // Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
  function convertBase(str, baseIn, baseOut) {
    var j,
      arr = [0],
      arrL,
      i = 0,
      strL = str.length;

    for (; i < strL;) {
      for (arrL = arr.length; arrL--;) arr[arrL] *= baseIn;
      arr[0] += NUMERALS.indexOf(str.charAt(i++));
      for (j = 0; j < arr.length; j++) {
        if (arr[j] > baseOut - 1) {
          if (arr[j + 1] === void 0) arr[j + 1] = 0;
          arr[j + 1] += arr[j] / baseOut | 0;
          arr[j] %= baseOut;
        }
      }
    }

    return arr.reverse();
  }


  /*
   * cos(x) = 1 - x^2/2! + x^4/4! - ...
   * |x| < pi/2
   *
   */
  function cosine(Ctor, x) {
    var k, y,
      len = x.d.length;

    // Argument reduction: cos(4x) = 8*(cos^4(x) - cos^2(x)) + 1
    // i.e. cos(x) = 8*(cos^4(x/4) - cos^2(x/4)) + 1

    // Estimate the optimum number of times to use the argument reduction.
    if (len < 32) {
      k = Math.ceil(len / 3);
      y = Math.pow(4, -k).toString();
    } else {
      k = 16;
      y = '2.3283064365386962890625e-10';
    }

    Ctor.precision += k;

    x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));

    // Reverse argument reduction
    for (var i = k; i--;) {
      var cos2x = x.times(x);
      x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
    }

    Ctor.precision -= k;

    return x;
  }


  /*
   * Perform division in the specified base.
   */
  var divide = (function () {

    // Assumes non-zero x and k, and hence non-zero result.
    function multiplyInteger(x, k, base) {
      var temp,
        carry = 0,
        i = x.length;

      for (x = x.slice(); i--;) {
        temp = x[i] * k + carry;
        x[i] = temp % base | 0;
        carry = temp / base | 0;
      }

      if (carry) x.unshift(carry);

      return x;
    }

    function compare(a, b, aL, bL) {
      var i, r;

      if (aL != bL) {
        r = aL > bL ? 1 : -1;
      } else {
        for (i = r = 0; i < aL; i++) {
          if (a[i] != b[i]) {
            r = a[i] > b[i] ? 1 : -1;
            break;
          }
        }
      }

      return r;
    }

    function subtract(a, b, aL, base) {
      var i = 0;

      // Subtract b from a.
      for (; aL--;) {
        a[aL] -= i;
        i = a[aL] < b[aL] ? 1 : 0;
        a[aL] = i * base + a[aL] - b[aL];
      }

      // Remove leading zeros.
      for (; !a[0] && a.length > 1;) a.shift();
    }

    return function (x, y, pr, rm, dp, base) {
      var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0,
        yL, yz,
        Ctor = x.constructor,
        sign = x.s == y.s ? 1 : -1,
        xd = x.d,
        yd = y.d;

      // Either NaN, Infinity or 0?
      if (!xd || !xd[0] || !yd || !yd[0]) {

        return new Ctor(// Return NaN if either NaN, or both Infinity or 0.
          !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN :

          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          xd && xd[0] == 0 || !yd ? sign * 0 : sign / 0);
      }

      if (base) {
        logBase = 1;
        e = x.e - y.e;
      } else {
        base = BASE;
        logBase = LOG_BASE;
        e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
      }

      yL = yd.length;
      xL = xd.length;
      q = new Ctor(sign);
      qd = q.d = [];

      // Result exponent may be one less than e.
      // The digit array of a Decimal from toStringBinary may have trailing zeros.
      for (i = 0; yd[i] == (xd[i] || 0); i++);

      if (yd[i] > (xd[i] || 0)) e--;

      if (pr == null) {
        sd = pr = Ctor.precision;
        rm = Ctor.rounding;
      } else if (dp) {
        sd = pr + (x.e - y.e) + 1;
      } else {
        sd = pr;
      }

      if (sd < 0) {
        qd.push(1);
        more = true;
      } else {

        // Convert precision in number of base 10 digits to base 1e7 digits.
        sd = sd / logBase + 2 | 0;
        i = 0;

        // divisor < 1e7
        if (yL == 1) {
          k = 0;
          yd = yd[0];
          sd++;

          // k is the carry.
          for (; (i < xL || k) && sd--; i++) {
            t = k * base + (xd[i] || 0);
            qd[i] = t / yd | 0;
            k = t % yd | 0;
          }

          more = k || i < xL;

        // divisor >= 1e7
        } else {

          // Normalise xd and yd so highest order digit of yd is >= base/2
          k = base / (yd[0] + 1) | 0;

          if (k > 1) {
            yd = multiplyInteger(yd, k, base);
            xd = multiplyInteger(xd, k, base);
            yL = yd.length;
            xL = xd.length;
          }

          xi = yL;
          rem = xd.slice(0, yL);
          remL = rem.length;

          // Add zeros to make remainder as long as divisor.
          for (; remL < yL;) rem[remL++] = 0;

          yz = yd.slice();
          yz.unshift(0);
          yd0 = yd[0];

          if (yd[1] >= base / 2) ++yd0;

          do {
            k = 0;

            // Compare divisor and remainder.
            cmp = compare(yd, rem, yL, remL);

            // If divisor < remainder.
            if (cmp < 0) {

              // Calculate trial digit, k.
              rem0 = rem[0];
              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

              // k will be how many times the divisor goes into the current remainder.
              k = rem0 / yd0 | 0;

              //  Algorithm:
              //  1. product = divisor * trial digit (k)
              //  2. if product > remainder: product -= divisor, k--
              //  3. remainder -= product
              //  4. if product was < remainder at 2:
              //    5. compare new remainder and divisor
              //    6. If remainder > divisor: remainder -= divisor, k++

              if (k > 1) {
                if (k >= base) k = base - 1;

                // product = divisor * trial digit.
                prod = multiplyInteger(yd, k, base);
                prodL = prod.length;
                remL = rem.length;

                // Compare product and remainder.
                cmp = compare(prod, rem, prodL, remL);

                // product > remainder.
                if (cmp == 1) {
                  k--;

                  // Subtract divisor from product.
                  subtract(prod, yL < prodL ? yz : yd, prodL, base);
                }
              } else {

                // cmp is -1.
                // If k is 0, there is no need to compare yd and rem again below, so change cmp to 1
                // to avoid it. If k is 1 there is a need to compare yd and rem again below.
                if (k == 0) cmp = k = 1;
                prod = yd.slice();
              }

              prodL = prod.length;
              if (prodL < remL) prod.unshift(0);

              // Subtract product from remainder.
              subtract(rem, prod, remL, base);

              // If product was < previous remainder.
              if (cmp == -1) {
                remL = rem.length;

                // Compare divisor and new remainder.
                cmp = compare(yd, rem, yL, remL);

                // If divisor < new remainder, subtract divisor from remainder.
                if (cmp < 1) {
                  k++;

                  // Subtract divisor from remainder.
                  subtract(rem, yL < remL ? yz : yd, remL, base);
                }
              }

              remL = rem.length;
            } else if (cmp === 0) {
              k++;
              rem = [0];
            }    // if cmp === 1, k will be 0

            // Add the next digit, k, to the result array.
            qd[i++] = k;

            // Update the remainder.
            if (cmp && rem[0]) {
              rem[remL++] = xd[xi] || 0;
            } else {
              rem = [xd[xi]];
              remL = 1;
            }

          } while ((xi++ < xL || rem[0] !== void 0) && sd--);

          more = rem[0] !== void 0;
        }

        // Leading zero?
        if (!qd[0]) qd.shift();
      }

      // logBase is 1 when divide is being used for base conversion.
      if (logBase == 1) {
        q.e = e;
        inexact = more;
      } else {

        // To calculate q.e, first get the number of digits of qd[0].
        for (i = 1, k = qd[0]; k >= 10; k /= 10) i++;
        q.e = i + e * logBase - 1;

        finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
      }

      return q;
    };
  })();


  /*
   * Round `x` to `sd` significant digits using rounding mode `rm`.
   * Check for over/under-flow.
   */
   function finalise(x, sd, rm, isTruncated) {
    var digits, i, j, k, rd, roundUp, w, xd, xdi,
      Ctor = x.constructor;

    // Don't round if sd is null or undefined.
    out: if (sd != null) {
      xd = x.d;

      // Infinity/NaN.
      if (!xd) return x;

      // rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
      // w: the word of xd containing rd, a base 1e7 number.
      // xdi: the index of w within xd.
      // digits: the number of digits of w.
      // i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
      // they had leading zeros)
      // j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).

      // Get the length of the first word of the digits array xd.
      for (digits = 1, k = xd[0]; k >= 10; k /= 10) digits++;
      i = sd - digits;

      // Is the rounding digit in the first word of xd?
      if (i < 0) {
        i += LOG_BASE;
        j = sd;
        w = xd[xdi = 0];

        // Get the rounding digit at index j of w.
        rd = w / mathpow(10, digits - j - 1) % 10 | 0;
      } else {
        xdi = Math.ceil((i + 1) / LOG_BASE);
        k = xd.length;
        if (xdi >= k) {
          if (isTruncated) {

            // Needed by `naturalExponential`, `naturalLogarithm` and `squareRoot`.
            for (; k++ <= xdi;) xd.push(0);
            w = rd = 0;
            digits = 1;
            i %= LOG_BASE;
            j = i - LOG_BASE + 1;
          } else {
            break out;
          }
        } else {
          w = k = xd[xdi];

          // Get the number of digits of w.
          for (digits = 1; k >= 10; k /= 10) digits++;

          // Get the index of rd within w.
          i %= LOG_BASE;

          // Get the index of rd within w, adjusted for leading zeros.
          // The number of leading zeros of w is given by LOG_BASE - digits.
          j = i - LOG_BASE + digits;

          // Get the rounding digit at index j of w.
          rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
        }
      }

      // Are there any non-zero digits after the rounding digit?
      isTruncated = isTruncated || sd < 0 ||
        xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));

      // The expression `w % mathpow(10, digits - j - 1)` returns all the digits of w to the right
      // of the digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression
      // will give 714.

      roundUp = rm < 4
        ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
        : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 &&

          // Check whether the digit to the left of the rounding digit is odd.
          ((i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10) & 1 ||
            rm == (x.s < 0 ? 8 : 7));

      if (sd < 1 || !xd[0]) {
        xd.length = 0;
        if (roundUp) {

          // Convert sd to decimal places.
          sd -= x.e + 1;

          // 1, 0.1, 0.01, 0.001, 0.0001 etc.
          xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
          x.e = -sd || 0;
        } else {

          // Zero.
          xd[0] = x.e = 0;
        }

        return x;
      }

      // Remove excess digits.
      if (i == 0) {
        xd.length = xdi;
        k = 1;
        xdi--;
      } else {
        xd.length = xdi + 1;
        k = mathpow(10, LOG_BASE - i);

        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
        // j > 0 means i > number of leading zeros of w.
        xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
      }

      if (roundUp) {
        for (;;) {

          // Is the digit to be rounded up in the first word of xd?
          if (xdi == 0) {

            // i will be the length of xd[0] before k is added.
            for (i = 1, j = xd[0]; j >= 10; j /= 10) i++;
            j = xd[0] += k;
            for (k = 1; j >= 10; j /= 10) k++;

            // if i != k the length has increased.
            if (i != k) {
              x.e++;
              if (xd[0] == BASE) xd[0] = 1;
            }

            break;
          } else {
            xd[xdi] += k;
            if (xd[xdi] != BASE) break;
            xd[xdi--] = 0;
            k = 1;
          }
        }
      }

      // Remove trailing zeros.
      for (i = xd.length; xd[--i] === 0;) xd.pop();
    }

    if (external) {

      // Overflow?
      if (x.e > Ctor.maxE) {

        // Infinity.
        x.d = null;
        x.e = NaN;

      // Underflow?
      } else if (x.e < Ctor.minE) {

        // Zero.
        x.e = 0;
        x.d = [0];
        // Ctor.underflow = true;
      } // else Ctor.underflow = false;
    }

    return x;
  }


  function finiteToString(x, isExp, sd) {
    if (!x.isFinite()) return nonFiniteToString(x);
    var k,
      e = x.e,
      str = digitsToString(x.d),
      len = str.length;

    if (isExp) {
      if (sd && (k = sd - len) > 0) {
        str = str.charAt(0) + '.' + str.slice(1) + getZeroString(k);
      } else if (len > 1) {
        str = str.charAt(0) + '.' + str.slice(1);
      }

      str = str + (x.e < 0 ? 'e' : 'e+') + x.e;
    } else if (e < 0) {
      str = '0.' + getZeroString(-e - 1) + str;
      if (sd && (k = sd - len) > 0) str += getZeroString(k);
    } else if (e >= len) {
      str += getZeroString(e + 1 - len);
      if (sd && (k = sd - e - 1) > 0) str = str + '.' + getZeroString(k);
    } else {
      if ((k = e + 1) < len) str = str.slice(0, k) + '.' + str.slice(k);
      if (sd && (k = sd - len) > 0) {
        if (e + 1 === len) str += '.';
        str += getZeroString(k);
      }
    }

    return str;
  }


  // Calculate the base 10 exponent from the base 1e7 exponent.
  function getBase10Exponent(digits, e) {

    // First get the number of digits of the first word of the digits array.
    for (var i = 1, w = digits[0]; w >= 10; w /= 10) i++;
    return i + e * LOG_BASE - 1;
  }


   function getLn10(Ctor, sd, pr) {
    if (sd > LN10_PRECISION) {

      // Reset global state in case the exception is caught.
      external = true;
      if (pr) Ctor.precision = pr;
      throw Error(precisionLimitExceeded);
    }
    return finalise(new Ctor(LN10), sd, 1, true);
  }


  function getPi(Ctor, sd, rm) {
    if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
    return finalise(new Ctor(PI), sd, rm, true);
  }


  function getPrecision(digits) {
    var w = digits.length - 1,
      len = w * LOG_BASE + 1;

    w = digits[w];

    // If non-zero...
    if (w) {

      // Subtract the number of trailing zeros of the last word.
      for (; w % 10 == 0; w /= 10) len--;

      // Add the number of digits of the first word.
      for (w = digits[0]; w >= 10; w /= 10) len++;
    }

    return len;
  }


  function getZeroString(k) {
    var zs = '';
    for (; k--;) zs += '0';
    return zs;
  }


  /*
   * Return a new Decimal whose value is the value of Decimal `x` to the power `n`, where `n` is an
   * integer of type number.
   *
   * Implements 'exponentiation by squaring'. Called by `pow` and `parseOther`.
   *
   */
  function intPow(Ctor, x, n, pr) {
    var isTruncated,
      r = new Ctor(1),

      // Max n of 9007199254740991 takes 53 loop iterations.
      // Maximum digits array length; leaves [28, 34] guard digits.
      k = Math.ceil(pr / LOG_BASE + 4);

    external = false;

    for (;;) {
      if (n % 2) {
        r = r.times(x);
        if (truncate(r.d, k)) isTruncated = true;
      }

      n = mathfloor(n / 2);
      if (n === 0) {

        // To ensure correct rounding when r.d is truncated, increment the last word if it is zero.
        n = r.d.length - 1;
        if (isTruncated && r.d[n] === 0) ++r.d[n];
        break;
      }

      x = x.times(x);
      truncate(x.d, k);
    }

    external = true;

    return r;
  }


  function isOdd(n) {
    return n.d[n.d.length - 1] & 1;
  }


  /*
   * Handle `max` and `min`. `ltgt` is 'lt' or 'gt'.
   */
  function maxOrMin(Ctor, args, ltgt) {
    var y,
      x = new Ctor(args[0]),
      i = 0;

    for (; ++i < args.length;) {
      y = new Ctor(args[i]);
      if (!y.s) {
        x = y;
        break;
      } else if (x[ltgt](y)) {
        x = y;
      }
    }

    return x;
  }


  /*
   * Return a new Decimal whose value is the natural exponential of `x` rounded to `sd` significant
   * digits.
   *
   * Taylor/Maclaurin series.
   *
   * exp(x) = x^0/0! + x^1/1! + x^2/2! + x^3/3! + ...
   *
   * Argument reduction:
   *   Repeat x = x / 32, k += 5, until |x| < 0.1
   *   exp(x) = exp(x / 2^k)^(2^k)
   *
   * Previously, the argument was initially reduced by
   * exp(x) = exp(r) * 10^k  where r = x - k * ln10, k = floor(x / ln10)
   * to first put r in the range [0, ln10], before dividing by 32 until |x| < 0.1, but this was
   * found to be slower than just dividing repeatedly by 32 as above.
   *
   * Max integer argument: exp('20723265836946413') = 6.3e+9000000000000000
   * Min integer argument: exp('-20723265836946411') = 1.2e-9000000000000000
   * (Math object integer min/max: Math.exp(709) = 8.2e+307, Math.exp(-745) = 5e-324)
   *
   *  exp(Infinity)  = Infinity
   *  exp(-Infinity) = 0
   *  exp(NaN)       = NaN
   *  exp(±0)        = 1
   *
   *  exp(x) is non-terminating for any finite, non-zero x.
   *
   *  The result will always be correctly rounded.
   *
   */
  function naturalExponential(x, sd) {
    var denominator, guard, j, pow, sum, t, wpr,
      rep = 0,
      i = 0,
      k = 0,
      Ctor = x.constructor,
      rm = Ctor.rounding,
      pr = Ctor.precision;

    // 0/NaN/Infinity?
    if (!x.d || !x.d[0] || x.e > 17) {

      return new Ctor(x.d
        ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0
        : x.s ? x.s < 0 ? 0 : x : 0 / 0);
    }

    if (sd == null) {
      external = false;
      wpr = pr;
    } else {
      wpr = sd;
    }

    t = new Ctor(0.03125);

    // while abs(x) >= 0.1
    while (x.e > -2) {

      // x = x / 2^5
      x = x.times(t);
      k += 5;
    }

    // Use 2 * log10(2^k) + 5 (empirically derived) to estimate the increase in precision
    // necessary to ensure the first 4 rounding digits are correct.
    guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
    wpr += guard;
    denominator = pow = sum = new Ctor(1);
    Ctor.precision = wpr;

    for (;;) {
      pow = finalise(pow.times(x), wpr, 1);
      denominator = denominator.times(++i);
      t = sum.plus(divide(pow, denominator, wpr, 1));

      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
        j = k;
        while (j--) sum = finalise(sum.times(sum), wpr, 1);

        // Check to see if the first 4 rounding digits are [49]999.
        // If so, repeat the summation with a higher precision, otherwise
        // e.g. with precision: 18, rounding: 1
        // exp(18.404272462595034083567793919843761) = 98372560.1229999999 (should be 98372560.123)
        // `wpr - guard` is the index of first rounding digit.
        if (sd == null) {

          if (rep < 3 && checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
            Ctor.precision = wpr += 10;
            denominator = pow = t = new Ctor(1);
            i = 0;
            rep++;
          } else {
            return finalise(sum, Ctor.precision = pr, rm, external = true);
          }
        } else {
          Ctor.precision = pr;
          return sum;
        }
      }

      sum = t;
    }
  }


  /*
   * Return a new Decimal whose value is the natural logarithm of `x` rounded to `sd` significant
   * digits.
   *
   *  ln(-n)        = NaN
   *  ln(0)         = -Infinity
   *  ln(-0)        = -Infinity
   *  ln(1)         = 0
   *  ln(Infinity)  = Infinity
   *  ln(-Infinity) = NaN
   *  ln(NaN)       = NaN
   *
   *  ln(n) (n != 1) is non-terminating.
   *
   */
  function naturalLogarithm(y, sd) {
    var c, c0, denominator, e, numerator, rep, sum, t, wpr, x1, x2,
      n = 1,
      guard = 10,
      x = y,
      xd = x.d,
      Ctor = x.constructor,
      rm = Ctor.rounding,
      pr = Ctor.precision;

    // Is x negative or Infinity, NaN, 0 or 1?
    if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
      return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
    }

    if (sd == null) {
      external = false;
      wpr = pr;
    } else {
      wpr = sd;
    }

    Ctor.precision = wpr += guard;
    c = digitsToString(xd);
    c0 = c.charAt(0);

    if (Math.abs(e = x.e) < 1.5e15) {

      // Argument reduction.
      // The series converges faster the closer the argument is to 1, so using
      // ln(a^b) = b * ln(a),   ln(a) = ln(a^b) / b
      // multiply the argument by itself until the leading digits of the significand are 7, 8, 9,
      // 10, 11, 12 or 13, recording the number of multiplications so the sum of the series can
      // later be divided by this number, then separate out the power of 10 using
      // ln(a*10^b) = ln(a) + b*ln(10).

      // max n is 21 (gives 0.9, 1.0 or 1.1) (9e15 / 21 = 4.2e14).
      //while (c0 < 9 && c0 != 1 || c0 == 1 && c.charAt(1) > 1) {
      // max n is 6 (gives 0.7 - 1.3)
      while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
        x = x.times(y);
        c = digitsToString(x.d);
        c0 = c.charAt(0);
        n++;
      }

      e = x.e;

      if (c0 > 1) {
        x = new Ctor('0.' + c);
        e++;
      } else {
        x = new Ctor(c0 + '.' + c.slice(1));
      }
    } else {

      // The argument reduction method above may result in overflow if the argument y is a massive
      // number with exponent >= 1500000000000000 (9e15 / 6 = 1.5e15), so instead recall this
      // function using ln(x*10^e) = ln(x) + e*ln(10).
      t = getLn10(Ctor, wpr + 2, pr).times(e + '');
      x = naturalLogarithm(new Ctor(c0 + '.' + c.slice(1)), wpr - guard).plus(t);
      Ctor.precision = pr;

      return sd == null ? finalise(x, pr, rm, external = true) : x;
    }

    // x1 is x reduced to a value near 1.
    x1 = x;

    // Taylor series.
    // ln(y) = ln((1 + x)/(1 - x)) = 2(x + x^3/3 + x^5/5 + x^7/7 + ...)
    // where x = (y - 1)/(y + 1)    (|x| < 1)
    sum = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
    x2 = finalise(x.times(x), wpr, 1);
    denominator = 3;

    for (;;) {
      numerator = finalise(numerator.times(x2), wpr, 1);
      t = sum.plus(divide(numerator, new Ctor(denominator), wpr, 1));

      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
        sum = sum.times(2);

        // Reverse the argument reduction. Check that e is not 0 because, besides preventing an
        // unnecessary calculation, -0 + 0 = +0 and to ensure correct rounding -0 needs to stay -0.
        if (e !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ''));
        sum = divide(sum, new Ctor(n), wpr, 1);

        // Is rm > 3 and the first 4 rounding digits 4999, or rm < 4 (or the summation has
        // been repeated previously) and the first 4 rounding digits 9999?
        // If so, restart the summation with a higher precision, otherwise
        // e.g. with precision: 12, rounding: 1
        // ln(135520028.6126091714265381533) = 18.7246299999 when it should be 18.72463.
        // `wpr - guard` is the index of first rounding digit.
        if (sd == null) {
          if (checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
            Ctor.precision = wpr += guard;
            t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
            x2 = finalise(x.times(x), wpr, 1);
            denominator = rep = 1;
          } else {
            return finalise(sum, Ctor.precision = pr, rm, external = true);
          }
        } else {
          Ctor.precision = pr;
          return sum;
        }
      }

      sum = t;
      denominator += 2;
    }
  }


  // ±Infinity, NaN.
  function nonFiniteToString(x) {
    // Unsigned.
    return String(x.s * x.s / 0);
  }


  /*
   * Parse the value of a new Decimal `x` from string `str`.
   */
  function parseDecimal(x, str) {
    var e, i, len;

    // Decimal point?
    if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

    // Exponential form?
    if ((i = str.search(/e/i)) > 0) {

      // Determine exponent.
      if (e < 0) e = i;
      e += +str.slice(i + 1);
      str = str.substring(0, i);
    } else if (e < 0) {

      // Integer.
      e = str.length;
    }

    // Determine leading zeros.
    for (i = 0; str.charCodeAt(i) === 48; i++);

    // Determine trailing zeros.
    for (len = str.length; str.charCodeAt(len - 1) === 48; --len);
    str = str.slice(i, len);

    if (str) {
      len -= i;
      x.e = e = e - i - 1;
      x.d = [];

      // Transform base

      // e is the base 10 exponent.
      // i is where to slice str to get the first word of the digits array.
      i = (e + 1) % LOG_BASE;
      if (e < 0) i += LOG_BASE;

      if (i < len) {
        if (i) x.d.push(+str.slice(0, i));
        for (len -= LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE));
        str = str.slice(i);
        i = LOG_BASE - str.length;
      } else {
        i -= len;
      }

      for (; i--;) str += '0';
      x.d.push(+str);

      if (external) {

        // Overflow?
        if (x.e > x.constructor.maxE) {

          // Infinity.
          x.d = null;
          x.e = NaN;

        // Underflow?
        } else if (x.e < x.constructor.minE) {

          // Zero.
          x.e = 0;
          x.d = [0];
          // x.constructor.underflow = true;
        } // else x.constructor.underflow = false;
      }
    } else {

      // Zero.
      x.e = 0;
      x.d = [0];
    }

    return x;
  }


  /*
   * Parse the value of a new Decimal `x` from a string `str`, which is not a decimal value.
   */
  function parseOther(x, str) {
    var base, Ctor, divisor, i, isFloat, len, p, xd, xe;

    if (str === 'Infinity' || str === 'NaN') {
      if (!+str) x.s = NaN;
      x.e = NaN;
      x.d = null;
      return x;
    }

    if (isHex.test(str))  {
      base = 16;
      str = str.toLowerCase();
    } else if (isBinary.test(str))  {
      base = 2;
    } else if (isOctal.test(str))  {
      base = 8;
    } else {
      throw Error(invalidArgument + str);
    }

    // Is there a binary exponent part?
    i = str.search(/p/i);

    if (i > 0) {
      p = +str.slice(i + 1);
      str = str.substring(2, i);
    } else {
      str = str.slice(2);
    }

    // Convert `str` as an integer then divide the result by `base` raised to a power such that the
    // fraction part will be restored.
    i = str.indexOf('.');
    isFloat = i >= 0;
    Ctor = x.constructor;

    if (isFloat) {
      str = str.replace('.', '');
      len = str.length;
      i = len - i;

      // log[10](16) = 1.2041... , log[10](88) = 1.9444....
      divisor = intPow(Ctor, new Ctor(base), i, i * 2);
    }

    xd = convertBase(str, base, BASE);
    xe = xd.length - 1;

    // Remove trailing zeros.
    for (i = xe; xd[i] === 0; --i) xd.pop();
    if (i < 0) return new Ctor(x.s * 0);
    x.e = getBase10Exponent(xd, xe);
    x.d = xd;
    external = false;

    // At what precision to perform the division to ensure exact conversion?
    // maxDecimalIntegerPartDigitCount = ceil(log[10](b) * otherBaseIntegerPartDigitCount)
    // log[10](2) = 0.30103, log[10](8) = 0.90309, log[10](16) = 1.20412
    // E.g. ceil(1.2 * 3) = 4, so up to 4 decimal digits are needed to represent 3 hex int digits.
    // maxDecimalFractionPartDigitCount = {Hex:4|Oct:3|Bin:1} * otherBaseFractionPartDigitCount
    // Therefore using 4 * the number of digits of str will always be enough.
    if (isFloat) x = divide(x, divisor, len * 4);

    // Multiply by the binary exponent part if present.
    if (p) x = x.times(Math.abs(p) < 54 ? Math.pow(2, p) : Decimal.pow(2, p));
    external = true;

    return x;
  }


  /*
   * sin(x) = x - x^3/3! + x^5/5! - ...
   * |x| < pi/2
   *
   */
  function sine(Ctor, x) {
    var k,
      len = x.d.length;

    if (len < 3) return taylorSeries(Ctor, 2, x, x);

    // Argument reduction: sin(5x) = 16*sin^5(x) - 20*sin^3(x) + 5*sin(x)
    // i.e. sin(x) = 16*sin^5(x/5) - 20*sin^3(x/5) + 5*sin(x/5)
    // and  sin(x) = sin(x/5)(5 + sin^2(x/5)(16sin^2(x/5) - 20))

    // Estimate the optimum number of times to use the argument reduction.
    k = 1.4 * Math.sqrt(len);
    k = k > 16 ? 16 : k | 0;

    // Max k before Math.pow precision loss is 22
    x = x.times(Math.pow(5, -k));
    x = taylorSeries(Ctor, 2, x, x);

    // Reverse argument reduction
    var sin2_x,
      d5 = new Ctor(5),
      d16 = new Ctor(16),
      d20 = new Ctor(20);
    for (; k--;) {
      sin2_x = x.times(x);
      x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
    }

    return x;
  }


  // Calculate Taylor series for `cos`, `cosh`, `sin` and `sinh`.
  function taylorSeries(Ctor, n, x, y, isHyperbolic) {
    var j, t, u, x2,
      i = 1,
      pr = Ctor.precision,
      k = Math.ceil(pr / LOG_BASE);

    external = false;
    x2 = x.times(x);
    u = new Ctor(y);

    for (;;) {
      t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
      u = isHyperbolic ? y.plus(t) : y.minus(t);
      y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
      t = u.plus(y);

      if (t.d[k] !== void 0) {
        for (j = k; t.d[j] === u.d[j] && j--;);
        if (j == -1) break;
      }

      j = u;
      u = y;
      y = t;
      t = j;
      i++;
    }

    external = true;
    t.d.length = k + 1;

    return t;
  }


  // Return the absolute value of `x` reduced to less than or equal to half pi.
  function toLessThanHalfPi(Ctor, x) {
    var t,
      isNeg = x.s < 0,
      pi = getPi(Ctor, Ctor.precision, 1),
      halfPi = pi.times(0.5);

    x = x.abs();

    if (x.lte(halfPi)) {
      quadrant = isNeg ? 4 : 1;
      return x;
    }

    t = x.divToInt(pi);

    if (t.isZero()) {
      quadrant = isNeg ? 3 : 2;
    } else {
      x = x.minus(t.times(pi));

      // 0 <= x < pi
      if (x.lte(halfPi)) {
        quadrant = isOdd(t) ? (isNeg ? 2 : 3) : (isNeg ? 4 : 1);
        return x;
      }

      quadrant = isOdd(t) ? (isNeg ? 1 : 4) : (isNeg ? 3 : 2);
    }

    return x.minus(pi).abs();
  }


  /*
   * Return the value of Decimal `x` as a string in base `baseOut`.
   *
   * If the optional `sd` argument is present include a binary exponent suffix.
   */
  function toStringBinary(x, baseOut, sd, rm) {
    var base, e, i, k, len, roundUp, str, xd, y,
      Ctor = x.constructor,
      isExp = sd !== void 0;

    if (isExp) {
      checkInt32(sd, 1, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);
    } else {
      sd = Ctor.precision;
      rm = Ctor.rounding;
    }

    if (!x.isFinite()) {
      str = nonFiniteToString(x);
    } else {
      str = finiteToString(x);
      i = str.indexOf('.');

      // Use exponential notation according to `toExpPos` and `toExpNeg`? No, but if required:
      // maxBinaryExponent = floor((decimalExponent + 1) * log[2](10))
      // minBinaryExponent = floor(decimalExponent * log[2](10))
      // log[2](10) = 3.321928094887362347870319429489390175864

      if (isExp) {
        base = 2;
        if (baseOut == 16) {
          sd = sd * 4 - 3;
        } else if (baseOut == 8) {
          sd = sd * 3 - 2;
        }
      } else {
        base = baseOut;
      }

      // Convert the number as an integer then divide the result by its base raised to a power such
      // that the fraction part will be restored.

      // Non-integer.
      if (i >= 0) {
        str = str.replace('.', '');
        y = new Ctor(1);
        y.e = str.length - i;
        y.d = convertBase(finiteToString(y), 10, base);
        y.e = y.d.length;
      }

      xd = convertBase(str, 10, base);
      e = len = xd.length;

      // Remove trailing zeros.
      for (; xd[--len] == 0;) xd.pop();

      if (!xd[0]) {
        str = isExp ? '0p+0' : '0';
      } else {
        if (i < 0) {
          e--;
        } else {
          x = new Ctor(x);
          x.d = xd;
          x.e = e;
          x = divide(x, y, sd, rm, 0, base);
          xd = x.d;
          e = x.e;
          roundUp = inexact;
        }

        // The rounding digit, i.e. the digit after the digit that may be rounded up.
        i = xd[sd];
        k = base / 2;
        roundUp = roundUp || xd[sd + 1] !== void 0;

        roundUp = rm < 4
          ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2))
          : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 ||
            rm === (x.s < 0 ? 8 : 7));

        xd.length = sd;

        if (roundUp) {

          // Rounding up may mean the previous digit has to be rounded up and so on.
          for (; ++xd[--sd] > base - 1;) {
            xd[sd] = 0;
            if (!sd) {
              ++e;
              xd.unshift(1);
            }
          }
        }

        // Determine trailing zeros.
        for (len = xd.length; !xd[len - 1]; --len);

        // E.g. [4, 11, 15] becomes 4bf.
        for (i = 0, str = ''; i < len; i++) str += NUMERALS.charAt(xd[i]);

        // Add binary exponent suffix?
        if (isExp) {
          if (len > 1) {
            if (baseOut == 16 || baseOut == 8) {
              i = baseOut == 16 ? 4 : 3;
              for (--len; len % i; len++) str += '0';
              xd = convertBase(str, base, baseOut);
              for (len = xd.length; !xd[len - 1]; --len);

              // xd[0] will always be be 1
              for (i = 1, str = '1.'; i < len; i++) str += NUMERALS.charAt(xd[i]);
            } else {
              str = str.charAt(0) + '.' + str.slice(1);
            }
          }

          str =  str + (e < 0 ? 'p' : 'p+') + e;
        } else if (e < 0) {
          for (; ++e;) str = '0' + str;
          str = '0.' + str;
        } else {
          if (++e > len) for (e -= len; e-- ;) str += '0';
          else if (e < len) str = str.slice(0, e) + '.' + str.slice(e);
        }
      }

      str = (baseOut == 16 ? '0x' : baseOut == 2 ? '0b' : baseOut == 8 ? '0o' : '') + str;
    }

    return x.s < 0 ? '-' + str : str;
  }


  // Does not strip trailing zeros.
  function truncate(arr, len) {
    if (arr.length > len) {
      arr.length = len;
      return true;
    }
  }


  // Decimal methods


  /*
   *  abs
   *  acos
   *  acosh
   *  add
   *  asin
   *  asinh
   *  atan
   *  atanh
   *  atan2
   *  cbrt
   *  ceil
   *  clone
   *  config
   *  cos
   *  cosh
   *  div
   *  exp
   *  floor
   *  hypot
   *  ln
   *  log
   *  log2
   *  log10
   *  max
   *  min
   *  mod
   *  mul
   *  pow
   *  random
   *  round
   *  sign
   *  sin
   *  sinh
   *  sqrt
   *  sub
   *  tan
   *  tanh
   *  trunc
   */


  /*
   * Return a new Decimal whose value is the absolute value of `x`.
   *
   * x {number|string|Decimal}
   *
   */
  function abs(x) {
    return new this(x).abs();
  }


  /*
   * Return a new Decimal whose value is the arccosine in radians of `x`.
   *
   * x {number|string|Decimal}
   *
   */
  function acos(x) {
    return new this(x).acos();
  }


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic cosine of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function acosh(x) {
    return new this(x).acosh();
  }


  /*
   * Return a new Decimal whose value is the sum of `x` and `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */
  function add(x, y) {
    return new this(x).plus(y);
  }


  /*
   * Return a new Decimal whose value is the arcsine in radians of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function asin(x) {
    return new this(x).asin();
  }


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic sine of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function asinh(x) {
    return new this(x).asinh();
  }


  /*
   * Return a new Decimal whose value is the arctangent in radians of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function atan(x) {
    return new this(x).atan();
  }


  /*
   * Return a new Decimal whose value is the inverse of the hyperbolic tangent of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function atanh(x) {
    return new this(x).atanh();
  }


  /*
   * Return a new Decimal whose value is the arctangent in radians of `y/x` in the range -pi to pi
   * (inclusive), rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi, pi]
   *
   * y {number|string|Decimal} The y-coordinate.
   * x {number|string|Decimal} The x-coordinate.
   *
   * atan2(±0, -0)               = ±pi
   * atan2(±0, +0)               = ±0
   * atan2(±0, -x)               = ±pi for x > 0
   * atan2(±0, x)                = ±0 for x > 0
   * atan2(-y, ±0)               = -pi/2 for y > 0
   * atan2(y, ±0)                = pi/2 for y > 0
   * atan2(±y, -Infinity)        = ±pi for finite y > 0
   * atan2(±y, +Infinity)        = ±0 for finite y > 0
   * atan2(±Infinity, x)         = ±pi/2 for finite x
   * atan2(±Infinity, -Infinity) = ±3*pi/4
   * atan2(±Infinity, +Infinity) = ±pi/4
   * atan2(NaN, x) = NaN
   * atan2(y, NaN) = NaN
   *
   */
  function atan2(y, x) {
    y = new this(y);
    x = new this(x);
    var r,
      pr = this.precision,
      rm = this.rounding,
      wpr = pr + 4;

    // Either NaN
    if (!y.s || !x.s) {
      r = new this(NaN);

    // Both ±Infinity
    } else if (!y.d && !x.d) {
      r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
      r.s = y.s;

    // x is ±Infinity or y is ±0
    } else if (!x.d || y.isZero()) {
      r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
      r.s = y.s;

    // y is ±Infinity or x is ±0
    } else if (!y.d || x.isZero()) {
      r = getPi(this, wpr, 1).times(0.5);
      r.s = y.s;

    // Both non-zero and finite
    } else if (x.s < 0) {
      this.precision = wpr;
      this.rounding = 1;
      r = this.atan(divide(y, x, wpr, 1));
      x = getPi(this, wpr, 1);
      this.precision = pr;
      this.rounding = rm;
      r = y.s < 0 ? r.minus(x) : r.plus(x);
    } else {
      r = this.atan(divide(y, x, wpr, 1));
    }

    return r;
  }


  /*
   * Return a new Decimal whose value is the cube root of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function cbrt(x) {
    return new this(x).cbrt();
  }


  /*
   * Return a new Decimal whose value is `x` rounded to an integer using `ROUND_CEIL`.
   *
   * x {number|string|Decimal}
   *
   */
  function ceil(x) {
    return finalise(x = new this(x), x.e + 1, 2);
  }


  /*
   * Configure global settings for a Decimal constructor.
   *
   * `obj` is an object with one or more of the following properties,
   *
   *   precision  {number}
   *   rounding   {number}
   *   toExpNeg   {number}
   *   toExpPos   {number}
   *   maxE       {number}
   *   minE       {number}
   *   modulo     {number}
   *   crypto     {boolean|number|undefined}
   *
   * E.g. Decimal.config({ precision: 20, rounding: 4 })
   *
   */
  function config(obj) {
    if (!obj || typeof obj !== 'object') throw Error(decimalError + 'Object expected');
    var i, p, v,
      ps = [
        'precision', 1, MAX_DIGITS,
        'rounding', 0, 8,
        'toExpNeg', -EXP_LIMIT, 0,
        'toExpPos', 0, EXP_LIMIT,
        'maxE', 0, EXP_LIMIT,
        'minE', -EXP_LIMIT, 0,
        'modulo', 0, 9
      ];

    for (i = 0; i < ps.length; i += 3) {
      if ((v = obj[p = ps[i]]) !== void 0) {
        if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
        else throw Error(invalidArgument + p + ': ' + v);
      }
    }

    if (obj.hasOwnProperty(p = 'crypto')) {
      if ((v = obj[p]) === void 0) {
        this[p] = v;
      } else if (v === true || v === false || v === 0 || v === 1) {
        this[p] = !!(v && cryptoObject &&
            (cryptoObject.getRandomValues || cryptoObject.randomBytes));
      } else {
        throw Error(invalidArgument + p + ': ' + v);
      }
    }

    return this;
  }


  /*
   * Return a new Decimal whose value is the cosine of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function cos(x) {
    return new this(x).cos();
  }


  /*
   * Return a new Decimal whose value is the hyperbolic cosine of `x`, rounded to precision
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function cosh(x) {
    return new this(x).cosh();
  }


  /*
   * Create and return a Decimal constructor with the same configuration properties as this Decimal
   * constructor.
   *
   */
  function clone(obj) {
    var i, p, ps;

    /*
     * The Decimal constructor and exported function.
     * Return a new Decimal instance.
     *
     * v {number|string|Decimal} A numeric value.
     *
     */
    function Decimal(v) {
      var e, i, t,
        x = this;

      // Decimal called without new.
      if (!(x instanceof Decimal)) return new Decimal(v);

      // Retain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
      // which points to Object.
      x.constructor = Decimal;

      // Duplicate.
      if (v instanceof Decimal) {
        x.s = v.s;
        x.e = v.e;
        x.d = (v = v.d) ? v.slice() : v;
        return;
      }

      t = typeof v;

      if (t === 'number') {
        if (v === 0) {
          x.s = 1 / v < 0 ? -1 : 1;
          x.e = 0;
          x.d = [0];
          return;
        }

        if (v < 0) {
          v = -v;
          x.s = -1;
        } else {
          x.s = 1;
        }

        // Fast path for small integers.
        if (v === ~~v && v < 1e7) {
          for (e = 0, i = v; i >= 10; i /= 10) e++;
          x.e = e;
          x.d = [v];
          return;

        // Infinity, NaN.
        } else if (v * 0 !== 0) {
          if (!v) x.s = NaN;
          x.e = NaN;
          x.d = null;
          return;
        }

        return parseDecimal(x, v.toString());

      } else if (t !== 'string') {
        throw Error(invalidArgument + v);
      }

      // Minus sign?
      if (v.charCodeAt(0) === 45) {
        v = v.slice(1);
        x.s = -1;
      } else {
        x.s = 1;
      }

      return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
    }

    Decimal.prototype = P;

    Decimal.ROUND_UP = 0;
    Decimal.ROUND_DOWN = 1;
    Decimal.ROUND_CEIL = 2;
    Decimal.ROUND_FLOOR = 3;
    Decimal.ROUND_HALF_UP = 4;
    Decimal.ROUND_HALF_DOWN = 5;
    Decimal.ROUND_HALF_EVEN = 6;
    Decimal.ROUND_HALF_CEIL = 7;
    Decimal.ROUND_HALF_FLOOR = 8;
    Decimal.EUCLID = 9;

    Decimal.config = config;
    Decimal.clone = clone;

    Decimal.abs = abs;
    Decimal.acos = acos;
    Decimal.acosh = acosh;        // ES6
    Decimal.add = add;
    Decimal.asin = asin;
    Decimal.asinh = asinh;        // ES6
    Decimal.atan = atan;
    Decimal.atanh = atanh;        // ES6
    Decimal.atan2 = atan2;
    Decimal.cbrt = cbrt;          // ES6
    Decimal.ceil = ceil;
    Decimal.cos = cos;
    Decimal.cosh = cosh;          // ES6
    Decimal.div = div;
    Decimal.exp = exp;
    Decimal.floor = floor;
    Decimal.hypot = hypot;        // ES6
    Decimal.ln = ln;
    Decimal.log = log;
    Decimal.log10 = log10;        // ES6
    Decimal.log2 = log2;          // ES6
    Decimal.max = max;
    Decimal.min = min;
    Decimal.mod = mod;
    Decimal.mul = mul;
    Decimal.pow = pow;
    Decimal.random = random;
    Decimal.round = round;
    Decimal.sign = sign;          // ES6
    Decimal.sin = sin;
    Decimal.sinh = sinh;          // ES6
    Decimal.sqrt = sqrt;
    Decimal.sub = sub;
    Decimal.tan = tan;
    Decimal.tanh = tanh;          // ES6
    Decimal.trunc = trunc;        // ES6

    if (obj === void 0) obj = {};
    if (obj) {
      ps = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'maxE', 'minE', 'modulo', 'crypto'];
      for (i = 0; i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
    }

    Decimal.config(obj);

    return Decimal;
  }


  /*
   * Return a new Decimal whose value is `x` divided by `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */
  function div(x, y) {
    return new this(x).div(y);
  }


  /*
   * Return a new Decimal whose value is the natural exponential of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} The power to which to raise the base of the natural log.
   *
   */
  function exp(x) {
    return new this(x).exp();
  }


  /*
   * Return a new Decimal whose value is `x` round to an integer using `ROUND_FLOOR`.
   *
   * x {number|string|Decimal}
   *
   */
  function floor(x) {
    return finalise(x = new this(x), x.e + 1, 3);
  }


  /*
   * Return a new Decimal whose value is the square root of the sum of the squares of the arguments,
   * rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * hypot(a, b, ...) = sqrt(a^2 + b^2 + ...)
   *
   */
  function hypot() {
    var i, n,
      t = new this(0);

    external = false;

    for (i = 0; i < arguments.length;) {
      n = new this(arguments[i++]);
      if (!n.d) {
        if (n.s) {
          external = true;
          return new this(1 / 0);
        }
        t = n;
      } else if (t.d) {
        t = t.plus(n.times(n));
      }
    }

    external = true;

    return t.sqrt();
  }


  /*
   * Return a new Decimal whose value is the natural logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function ln(x) {
    return new this(x).ln();
  }


  /*
   * Return a new Decimal whose value is the log of `x` to the base `y`, or to base 10 if no base
   * is specified, rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * log[y](x)
   *
   * x {number|string|Decimal} The argument of the logarithm.
   * y {number|string|Decimal} The base of the logarithm.
   *
   */
  function log(x, y) {
    return new this(x).log(y);
  }


  /*
   * Return a new Decimal whose value is the base 2 logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function log2(x) {
    return new this(x).log(2);
  }


  /*
   * Return a new Decimal whose value is the base 10 logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function log10(x) {
    return new this(x).log(10);
  }


  /*
   * Return a new Decimal whose value is the maximum of the arguments.
   *
   * arguments {number|string|Decimal}
   *
   */
  function max() {
    return maxOrMin(this, arguments, 'lt');
  }


  /*
   * Return a new Decimal whose value is the minimum of the arguments.
   *
   * arguments {number|string|Decimal}
   *
   */
  function min() {
    return maxOrMin(this, arguments, 'gt');
  }


  /*
   * Return a new Decimal whose value is `x` modulo `y`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */
  function mod(x, y) {
    return new this(x).mod(y);
  }


  /*
   * Return a new Decimal whose value is `x` multiplied by `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */
  function mul(x, y) {
    return new this(x).mul(y);
  }


  /*
   * Return a new Decimal whose value is `x` raised to the power `y`, rounded to precision
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} The base.
   * y {number|string|Decimal} The exponent.
   *
   */
  function pow(x, y) {
    return new this(x).pow(y);
  }


  /*
   * Returns a new Decimal with a random value equal to or greater than 0 and less than 1, and with
   * `sd`, or `Decimal.precision` if `sd` is omitted, significant digits (or less if trailing zeros
   * are produced).
   *
   * [sd] {number} Significant digits. Integer, 0 to MAX_DIGITS inclusive.
   *
   */
  function random(sd) {
    var d, e, k, n,
      i = 0,
      r = new this(1),
      rd = [];

    if (sd === void 0) sd = this.precision;
    else checkInt32(sd, 1, MAX_DIGITS);

    k = Math.ceil(sd / LOG_BASE);

    if (this.crypto === false) {
      for (; i < k;) rd[i++] = Math.random() * 1e7 | 0;

    // Browsers supporting crypto.getRandomValues.
    } else if (cryptoObject && cryptoObject.getRandomValues) {
      d = cryptoObject.getRandomValues(new Uint32Array(k));

      for (; i < k;) {
        n = d[i];

        // 0 <= n < 4294967296
        // Probability n >= 4.29e9, is 4967296 / 4294967296 = 0.00116 (1 in 865).
        if (n >= 4.29e9) {
          d[i] = cryptoObject.getRandomValues(new Uint32Array(1))[0];
        } else {

          // 0 <= n <= 4289999999
          // 0 <= (n % 1e7) <= 9999999
          rd[i++] = n % 1e7;
        }
      }

    // Node.js supporting crypto.randomBytes.
    } else if (cryptoObject && cryptoObject.randomBytes) {

      // buffer
      d = cryptoObject.randomBytes(k *= 4);

      for (; i < k;) {

        // 0 <= n < 2147483648
        n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 0x7f) << 24);

        // Probability n >= 2.14e9, is 7483648 / 2147483648 = 0.0035 (1 in 286).
        if (n >= 2.14e9) {
          cryptoObject.randomBytes(4).copy(d, i);
        } else {

          // 0 <= n <= 2139999999
          // 0 <= (n % 1e7) <= 9999999
          rd.push(n % 1e7);
          i += 4;
        }
      }

      i = k / 4;
    } else if (this.crypto) {
      throw Error(decimalError + 'crypto unavailable');
    } else {
      for (; i < k;) rd[i++] = Math.random() * 1e7 | 0;
    }

    k = rd[--i];
    sd %= LOG_BASE;

    // Convert trailing digits to zeros according to sd.
    if (k && sd) {
      n = mathpow(10, LOG_BASE - sd);
      rd[i] = (k / n | 0) * n;
    }

    // Remove trailing words which are zero.
    for (; rd[i] === 0; i--) rd.pop();

    // Zero?
    if (i < 0) {
      e = 0;
      rd = [0];
    } else {
      e = -1;

      // Remove leading words which are zero and adjust exponent accordingly.
      for (; rd[0] === 0; e -= LOG_BASE) rd.shift();

      // Count the digits of the first word of rd to determine leading zeros.
      for (k = 1, n = rd[0]; n >= 10; n /= 10) k++;

      // Adjust the exponent for leading zeros of the first word of rd.
      if (k < LOG_BASE) e -= LOG_BASE - k;
    }

    r.e = e;
    r.d = rd;

    return r;
  }


  /*
   * Return a new Decimal whose value is `x` rounded to an integer using rounding mode `rounding`.
   *
   * To emulate `Math.round`, set rounding to 7 (ROUND_HALF_CEIL).
   *
   * x {number|string|Decimal}
   *
   */
  function round(x) {
    return finalise(x = new this(x), x.e + 1, this.rounding);
  }


  /*
   * Return
   *   1    if x > 0,
   *  -1    if x < 0,
   *   0    if x is 0,
   *  -0    if x is -0,
   *   NaN  otherwise
   *
   */
  function sign(x) {
    x = new this(x);
    return x.d ? (x.d[0] ? x.s : 0 * x.s) : x.s || NaN;
  }


  /*
   * Return a new Decimal whose value is the sine of `x`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function sin(x) {
    return new this(x).sin();
  }


  /*
   * Return a new Decimal whose value is the hyperbolic sine of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function sinh(x) {
    return new this(x).sinh();
  }


  /*
   * Return a new Decimal whose value is the square root of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */
  function sqrt(x) {
    return new this(x).sqrt();
  }


  /*
   * Return a new Decimal whose value is `x` minus `y`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */
  function sub(x, y) {
    return new this(x).sub(y);
  }


  /*
   * Return a new Decimal whose value is the tangent of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function tan(x) {
    return new this(x).tan();
  }


  /*
   * Return a new Decimal whose value is the hyperbolic tangent of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */
  function tanh(x) {
    return new this(x).tanh();
  }


  /*
   * Return a new Decimal whose value is `x` truncated to an integer.
   *
   * x {number|string|Decimal}
   *
   */
  function trunc(x) {
    return finalise(x = new this(x), x.e + 1, 1);
  }


  // Create and configure initial Decimal constructor.
  Decimal = clone(Decimal);

  // Create the internal constants from their string values.
  LN10 = new Decimal(LN10);
  PI = new Decimal(PI);


  // Export.


  // AMD.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return Decimal;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

  // Node and other environments that support module.exports.
  } else if (typeof module != 'undefined' && module.exports) {
    module.exports = Decimal;

    if (!cryptoObject) {
      try {
        cryptoObject = require('cry' + 'pto');
      } catch (e) {
        // Ignore.
      }
    }

  // Browser.
  } else {
    if (!globalScope) {
      globalScope = typeof self != 'undefined' && self && self.self == self
        ? self : Function('return this')();
    }

    noConflict = globalScope.Decimal;
    Decimal.noConflict = function () {
      globalScope.Decimal = noConflict;
      return Decimal;
    };

    globalScope.Decimal = Decimal;
  }
})(this);


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2005 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Long = __webpack_require__(49);
var S2CellId_1 = __webpack_require__(75);
var S2Cell_1 = __webpack_require__(107);
var S2Projections_1 = __webpack_require__(76);
var S2LatLngRect_1 = __webpack_require__(72);
var S2Point_1 = __webpack_require__(22);
var S2_1 = __webpack_require__(10);
var S2Cap_1 = __webpack_require__(53);
/**
 * An S2CellUnion is a region consisting of cells of various sizes. Typically a
 * cell union is used to approximate some other shape. There is a tradeoff
 * between the accuracy of the approximation and how many cells are used. Unlike
 * polygons, cells have a fixed hierarchical structure. This makes them more
 * suitable for optimizations based on preprocessing.
 *
 */
var S2CellUnion = (function () {
    function S2CellUnion() {
        /** The CellIds that form the Union */
        this.cellIds = [];
    }
    S2CellUnion.prototype.S2CellUnion = function () {
    };
    /**
     * Populates a cell union with the given S2CellIds or 64-bit cells ids, and
     * then calls Normalize(). The InitSwap() version takes ownership of the
     * vector data without copying and clears the given vector. These methods may
     * be called multiple times.
     */
    S2CellUnion.prototype.initFromIds = function (cellIds) {
        this.initRawIds(cellIds);
        this.normalize();
    };
    S2CellUnion.prototype.initSwap = function (cellIds) {
        this.initRawSwap(cellIds);
        this.normalize();
    };
    S2CellUnion.prototype.initRawCellIds = function (cellIds) {
        this.cellIds = cellIds;
    };
    S2CellUnion.prototype.initRawIds = function (cellIds) {
        var size = cellIds.length;
        this.cellIds = [];
        for (var i = 0; i < size; i++) {
            this.cellIds.push(new S2CellId_1.S2CellId(cellIds[i]));
        }
    };
    /**
     * Like Init(), but does not call Normalize(). The cell union *must* be
     * normalized before doing any calculations with it, so it is the caller's
     * responsibility to make sure that the input is normalized. This method is
     * useful when converting cell unions to another representation and back.
     * These methods may be called multiple times.
     */
    S2CellUnion.prototype.initRawSwap = function (cellIds) {
        this.cellIds = [].concat(cellIds);
    };
    S2CellUnion.prototype.size = function () {
        return this.cellIds.length;
    };
    /** Convenience methods for accessing the individual cell ids. */
    S2CellUnion.prototype.cellId = function (i) {
        return this.cellIds[i];
    };
    S2CellUnion.prototype.getCellIds = function () {
        return this.cellIds;
    };
    /**
     * Replaces "output" with an expanded version of the cell union where any
     * cells whose level is less than "min_level" or where (level - min_level) is
     * not a multiple of "level_mod" are replaced by their children, until either
     * both of these conditions are satisfied or the maximum level is reached.
     *
     *  This method allows a covering generated by S2RegionCoverer using
     * min_level() or level_mod() constraints to be stored as a normalized cell
     * union (which allows various geometric computations to be done) and then
     * converted back to the original list of cell ids that satisfies the desired
     * constraints.
     */
    S2CellUnion.prototype.denormalize = function (minLevel, levelMod) {
        // assert (minLevel >= 0 && minLevel <= S2CellId.MAX_LEVEL);
        // assert (levelMod >= 1 && levelMod <= 3);
        var output = [];
        for (var i = 0; i < this.cellIds.length; i++) {
            var id = this.cellIds[i];
            var level = id.level();
            var newLevel = Math.max(minLevel, level);
            if (levelMod > 1) {
                // Round up so that (new_level - min_level) is a multiple of level_mod.
                // (Note that S2CellId::kMaxLevel is a multiple of 1, 2, and 3.)
                newLevel += (S2CellId_1.S2CellId.MAX_LEVEL - (newLevel - minLevel)) % levelMod;
                newLevel = Math.min(S2CellId_1.S2CellId.MAX_LEVEL, newLevel);
            }
            if (newLevel == level) {
                output.push(id);
            }
            else {
                var end = id.childEndL(newLevel);
                for (var iid = id.childBeginL(newLevel); !iid.equals(end); iid = iid.next()) {
                    output.push(iid);
                }
            }
        }
        return output;
    };
    /**
     * If there are more than "excess" elements of the cell_ids() vector that are
     * allocated but unused, reallocate the array to eliminate the excess space.
     * This reduces memory usage when many cell unions need to be held in memory
     * at once.
     */
    S2CellUnion.prototype.pack = function () {
        throw new Error('useless');
        // this.cellIds.trimToSize();
    };
    S2CellUnion.prototype.containsC = function (cell) {
        return this.containsCell(cell);
    };
    S2CellUnion.prototype.mayIntersectC = function (cell) {
        return this.mayIntersectCell(cell);
    };
    /**
     * Return true if the cell union contains the given cell id. Containment is
     * defined with respect to regions, e.g. a cell contains its 4 children. This
     * is a fast operation (logarithmic in the size of the cell union).
     */
    S2CellUnion.prototype.contains = function (id) {
        // This function requires that Normalize has been called first.
        //
        // This is an exact test. Each cell occupies a linear span of the S2
        // space-filling curve, and the cell id is simply the position at the center
        // of this span. The cell union ids are sorted in increasing order along
        // the space-filling curve. So we simply find the pair of cell ids that
        // surround the given cell id (using binary search). There is containment
        // if and only if one of these two cell ids contains this cell.
        var pos = S2CellId_1.S2CellId.binarySearch(this.cellIds, id.id);
        if (pos < 0) {
            pos = -pos - 1;
        }
        if (pos < this.cellIds.length && this.cellIds[pos].rangeMin().lessOrEquals(id)) {
            return true;
        }
        return pos != 0 && this.cellIds[pos - 1].rangeMax().greaterOrEquals(id);
    };
    /**
     * Return true if the cell union intersects the given cell id. This is a fast
     * operation (logarithmic in the size of the cell union).
     */
    S2CellUnion.prototype.intersects = function (id) {
        // This function requires that Normalize has been called first.
        // This is an exact test; see the comments for Contains() above.
        var pos = S2CellId_1.S2CellId.binarySearch(this.cellIds, id.id);
        if (pos < 0) {
            pos = -pos - 1;
        }
        if (pos < this.cellIds.length && this.cellIds[pos].rangeMin().lessOrEquals(id.rangeMax())) {
            return true;
        }
        return pos != 0 && this.cellIds[pos - 1].rangeMax().greaterOrEquals(id.rangeMin());
    };
    S2CellUnion.prototype.containsUnion = function (that) {
        // A divide-and-conquer or alternating-skip-search approach
        // may be significantly faster in both the average and worst case.
        for (var i = 0; i < that.cellIds.length; i++) {
            if (!this.contains(that.cellIds[i])) {
                return false;
            }
        }
        return true;
    };
    /** This is a fast operation (logarithmic in the size of the cell union). */
    S2CellUnion.prototype.containsCell = function (cell) {
        return this.contains(cell.id);
    };
    /**
     * Return true if this cell union contain/intersects the given other cell
     * union.
     */
    S2CellUnion.prototype.intersectsUnion = function (that) {
        // A divide-and-conquer or alternating-skip-search approach
        // may be significantly faster in both the average and worst case.
        for (var i = 0; i < that.cellIds.length; i++) {
            if (!this.intersects(that.cellIds[i])) {
                return false;
            }
        }
        return true;
    };
    S2CellUnion.prototype.getUnion = function (x, y) {
        // assert (x != this && y != this);
        this.cellIds = [].concat(x.cellIds).concat(y.cellIds);
        this.normalize();
    };
    /**
     * Specialized version of GetIntersection() that gets the intersection of a
     * cell union with the given cell id. This can be useful for "splitting" a
     * cell union into chunks.
     */
    S2CellUnion.prototype.getIntersection = function (x, id) {
        // assert (x != this);
        this.cellIds = [];
        if (x.contains(id)) {
            this.cellIds.push(id);
        }
        else {
            var pos = S2CellId_1.S2CellId.binarySearch(x.cellIds, id.rangeMin().id);
            if (pos < 0) {
                pos = -pos - 1;
            }
            var idmax = id.rangeMax();
            var size = x.cellIds.length;
            while (pos < size && x.cellIds[pos].lessOrEquals(idmax)) {
                this.cellIds.push(x.cellIds[(pos++)]);
            }
        }
    };
    /**
     * Initialize this cell union to the union or intersection of the two given
     * cell unions. Requires: x != this and y != this.
     */
    S2CellUnion.prototype.getIntersectionUU = function (x, y) {
        // assert (x != this && y != this);
        // This is a fairly efficient calculation that uses binary search to skip
        // over sections of both input vectors. It takes constant time if all the
        // cells of "x" come before or after all the cells of "y" in S2CellId order.
        this.cellIds = [];
        var i = 0;
        var j = 0;
        while (i < x.cellIds.length && j < y.cellIds.length) {
            var imin = x.cellId(i).rangeMin();
            var jmin = y.cellId(j).rangeMin();
            if (imin.greaterThan(jmin)) {
                // Either j->contains(*i) or the two cells are disjoint.
                if (x.cellId(i).lessOrEquals(y.cellId(j).rangeMax())) {
                    this.cellIds.push(x.cellId(i++));
                }
                else {
                    // Advance "j" to the first cell possibly contained by *i.
                    j = S2CellId_1.S2CellId.indexedBinarySearch(y.cellIds, imin, j + 1);
                    // The previous cell *(j-1) may now contain *i.
                    if (x.cellId(i).lessOrEquals(y.cellId(j - 1).rangeMax())) {
                        --j;
                    }
                }
            }
            else if (jmin.greaterThan(imin)) {
                // Identical to the code above with "i" and "j" reversed.
                if (y.cellId(j).lessOrEquals(x.cellId(i).rangeMax())) {
                    this.cellIds.push(y.cellId(j++));
                }
                else {
                    i = S2CellId_1.S2CellId.indexedBinarySearch(x.cellIds, jmin, i + 1);
                    if (y.cellId(j).lessOrEquals(x.cellId(i - 1).rangeMax())) {
                        --i;
                    }
                }
            }
            else {
                // "i" and "j" have the same range_min(), so one contains the other.
                if (x.cellId(i).lessThan(y.cellId(j))) {
                    this.cellIds.push(x.cellId(i++));
                }
                else {
                    this.cellIds.push(y.cellId(j++));
                }
            }
        }
        // The output is generated in sorted order, and there should not be any
        // cells that can be merged (provided that both inputs were normalized).
        // assert (!normalize());
    };
    /**
     * Expands the cell union such that it contains all cells of the given level
     * that are adjacent to any cell of the original union. Two cells are defined
     * as adjacent if their boundaries have any points in common, i.e. most cells
     * have 8 adjacent cells (not counting the cell itself).
     *
     *  Note that the size of the output is exponential in "level". For example,
     * if level == 20 and the input has a cell at level 10, there will be on the
     * order of 4000 adjacent cells in the output. For most applications the
     * Expand(min_fraction, min_distance) method below is easier to use.
     */
    S2CellUnion.prototype.expand = function (level) {
        var output = [];
        var levelLsb = S2CellId_1.S2CellId.lowestOnBitForLevel(level);
        var i = this.size() - 1;
        do {
            var id = this.cellId(i);
            if (id.lowestOnBit().lessThan(levelLsb)) {
                id = id.parentL(level);
                // Optimization: skip over any cells contained by this one. This is
                // especially important when very small regions are being expanded.
                while (i > 0 && id.contains(this.cellId(i - 1))) {
                    --i;
                }
            }
            output.push(id);
            output = output.concat(id.getAllNeighbors(level));
        } while (--i >= 0);
        this.initSwap(output);
    };
    /**
     * Expand the cell union such that it contains all points whose distance to
     * the cell union is at most minRadius, but do not use cells that are more
     * than maxLevelDiff levels higher than the largest cell in the input. The
     * second parameter controls the tradeoff between accuracy and output size
     * when a large region is being expanded by a small amount (e.g. expanding
     * Canada by 1km).
     *
     *  For example, if maxLevelDiff == 4, the region will always be expanded by
     * approximately 1/16 the width of its largest cell. Note that in the worst
     * case, the number of cells in the output can be up to 4 * (1 + 2 **
     * maxLevelDiff) times larger than the number of cells in the input.
     */
    S2CellUnion.prototype.expandA = function (minRadius, maxLevelDiff) {
        var minLevel = S2CellId_1.S2CellId.MAX_LEVEL;
        for (var i = 0; i < this.cellIds.length; i++) {
            var id = this.cellId(i);
            minLevel = Math.min(minLevel, id.level());
        }
        // Find the maximum level such that all cells are at least "min_radius"
        // wide.
        var radiusLevel = S2Projections_1.S2Projections.MIN_WIDTH.getMaxLevel(minRadius.radians);
        if (radiusLevel == 0 && minRadius.radians.gt(S2Projections_1.S2Projections.MIN_WIDTH.getValue(0))) {
            // The requested expansion is greater than the width of a face cell.
            // The easiest way to handle this is to expand twice.
            this.expand(0);
        }
        this.expand(Math.min(minLevel + maxLevelDiff, radiusLevel));
    };
    S2CellUnion.prototype.getCapBound = function () {
        // Compute the approximate centroid of the region. This won't produce the
        // bounding cap of minimal area, but it should be close enough.
        if (this.cellIds.length == 0) {
            return S2Cap_1.S2Cap.empty();
        }
        var centroid = new S2Point_1.S2Point(0, 0, 0);
        this.cellIds.forEach(function (id) {
            var area = S2Cell_1.S2Cell.averageArea(id.level());
            centroid = S2Point_1.S2Point.add(centroid, S2Point_1.S2Point.mul(id.toPoint(), area));
        });
        if (centroid.equals(new S2Point_1.S2Point(0, 0, 0))) {
            centroid = new S2Point_1.S2Point(1, 0, 0);
        }
        else {
            centroid = S2Point_1.S2Point.normalize(centroid);
        }
        // Use the centroid as the cap axis, and expand the cap angle so that it
        // contains the bounding caps of all the individual cells. Note that it is
        // *not* sufficient to just bound all the cell vertices because the bounding
        // cap may be concave (i.e. cover more than one hemisphere).
        var cap = new S2Cap_1.S2Cap(centroid, 0);
        this.cellIds.forEach(function (id) {
            cap = cap.addCap(new S2Cell_1.S2Cell(id).getCapBound());
        });
        return cap;
    };
    S2CellUnion.prototype.getRectBound = function () {
        var bound = S2LatLngRect_1.S2LatLngRect.empty();
        this.cellIds.forEach(function (id) {
            bound = bound.union(new S2Cell_1.S2Cell(id).getRectBound());
        });
        return bound;
    };
    /** This is a fast operation (logarithmic in the size of the cell union). */
    S2CellUnion.prototype.mayIntersectCell = function (cell) {
        return this.intersects(cell.id);
    };
    /**
     * The point 'p' does not need to be normalized. This is a fast operation
     * (logarithmic in the size of the cell union).
     */
    S2CellUnion.prototype.containsPoint = function (p) {
        return this.contains(S2CellId_1.S2CellId.fromPoint(p));
    };
    /**
     * The number of leaf cells covered by the union.
     * This will be no more than 6*2^60 for the whole sphere.
     *
     * @return the number of leaf cells covered by the union
     */
    S2CellUnion.prototype.leafCellsCovered = function () {
        var numLeaves = new Long(0);
        this.cellIds.forEach(function (id) {
            var invertedLevel = S2CellId_1.S2CellId.MAX_LEVEL - id.level();
            numLeaves = numLeaves
                .add(new Long(1).shiftLeft(invertedLevel << 1));
        });
        return numLeaves;
    };
    /**
     * Approximate this cell union's area by summing the average area of
     * each contained cell's average area, using {@link S2Cell#averageArea()}.
     * This is equivalent to the number of leaves covered, multiplied by
     * the average area of a leaf.
     * Note that {@link S2Cell#averageArea()} does not take into account
     * distortion of cell, and thus may be off by up to a factor of 1.7.
     * NOTE: Since this is proportional to LeafCellsCovered(), it is
     * always better to use the other function if all you care about is
     * the relative average area between objects.
     *
     * @return the sum of the average area of each contained cell's average area
     */
    S2CellUnion.prototype.averageBasedArea = function () {
        return S2_1.S2.toDecimal(this.leafCellsCovered().toString()).times(S2Projections_1.S2Projections.AVG_AREA.getValue(S2CellId_1.S2CellId.MAX_LEVEL)).toNumber();
    };
    /**
     * Calculates this cell union's area by summing the approximate area for each
     * contained cell, using {@link S2Cell#approxArea()}.
     *
     * @return approximate area of the cell union
     */
    S2CellUnion.prototype.approxArea = function () {
        var area = S2_1.S2.toDecimal(0);
        this.cellIds.forEach(function (id) {
            area = area.plus(new S2Cell_1.S2Cell(id).approxArea());
        });
        return area.toNumber();
    };
    /**
     * Calculates this cell union's area by summing the exact area for each
     * contained cell, using the {@link S2Cell#exactArea()}.
     *
     * @return the exact area of the cell union
     */
    S2CellUnion.prototype.exactArea = function () {
        var area = S2_1.S2.toDecimal(0);
        this.cellIds.forEach(function (id) {
            area = area.plus(new S2Cell_1.S2Cell(id).exactArea());
        });
        return area.toNumber();
    };
    /**
     * Normalizes the cell union by discarding cells that are contained by other
     * cells, replacing groups of 4 child cells by their parent cell whenever
     * possible, and sorting all the cell ids in increasing order. Returns true if
     * the number of cells was reduced.
     *
     *  This method *must* be called before doing any calculations on the cell
     * union, such as Intersects() or Contains().
     *
     * @return true if the normalize operation had any effect on the cell union,
     *         false if the union was already normalized
     */
    S2CellUnion.prototype.normalize = function () {
        // Optimize the representation by looking for cases where all subcells
        // of a parent cell are present.
        var output = [];
        // ArrayList<S2CellId> output = new ArrayList<>(this.cellIds.size());
        // output.ensureCapacity(this.cellIds.size());
        this.cellIds.sort(function (a, b) { return a.compareTo(b); });
        // Collections.sort(this.cellIds);
        this.cellIds.forEach(function (id) {
            var size = output.length;
            // Check whether this cell is contained by the previous cell.
            if (output.length !== 0 && output[size - 1].contains(id)) {
                return;
            }
            // Discard any previous cells contained by this cell.
            while (output.length !== 0 && id.contains(output[output.length - 1])) {
                output.splice(output.length - 1, 1);
            }
            // Check whether the last 3 elements of "output" plus "id" can be
            // collapsed into a single parent cell.
            while (output.length >= 3) {
                size = output.length;
                // A necessary (but not sufficient) condition is that the XOR of the
                // four cells must be zero. This is also very fast to test.
                if ((output[size - 3].id.and(output[size - 2].id).and(output[size - 1].id)).notEquals(id.id)) {
                    break;
                }
                // Now we do a slightly more expensive but exact test. First, compute a
                // mask that blocks out the two bits that encode the child position of
                // "id" with respect to its parent, then check that the other three
                // children all agree with "mask.
                var mask = id.lowestOnBit().shiftLeft(1);
                mask = mask.add(mask.shiftLeft(1)).not();
                // mask = ~(mask + (mask << 1));
                var idMasked = id.id.and(mask);
                if ((output[size - 3].id.and(mask)).notEquals(idMasked)
                    || (output[size - 2].id.and(mask)).notEquals(idMasked)
                    || (output[size - 1].id.and(mask)).notEquals(idMasked) || id.isFace()) {
                    break;
                }
                // Replace four children by their parent cell.
                output.splice(size - 3);
                // output.remove(size - 1);
                // output.remove(size - 2);
                // output.remove(size - 3);
                id = id.parent();
            }
            output.push(id);
        });
        if (output.length < this.size()) {
            this.initRawSwap(output);
            return true;
        }
        return false;
    };
    return S2CellUnion;
}());
exports.S2CellUnion = S2CellUnion;
//# sourceMappingURL=S2CellUnion.js.map

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nodes2ts_1 = __webpack_require__(71);
var GeoDataManagerConfiguration = (function () {
    function GeoDataManagerConfiguration(dynamoDBClient, tableName) {
        this.consistentRead = false;
        this.hashKeyAttributeName = "hashKey";
        this.rangeKeyAttributeName = "rangeKey";
        this.geohashAttributeName = "geohash";
        this.geoJsonAttributeName = "geoJson";
        this.geohashIndexName = "geohash-index";
        this.hashKeyLength = 2;
        /**
         * The order of the GeoJSON coordinate pair in data.
         * Use false [lat, lon] for compatibility with the Java library https://github.com/awslabs/dynamodb-geo
         * Use true [lon, lat] for GeoJSON standard compliance. (default)
         *
         * Note that this value should match the state of your existing data - if you change it you must update your database manually
         *
         * @type {boolean}
         */
        this.longitudeFirst = true;
        this.dynamoDBClient = dynamoDBClient;
        this.tableName = tableName;
        this.S2RegionCoverer = nodes2ts_1.S2RegionCoverer;
    }
    return GeoDataManagerConfiguration;
}());
// Public constants
GeoDataManagerConfiguration.MERGE_THRESHOLD = 2;
exports.GeoDataManagerConfiguration = GeoDataManagerConfiguration;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(148);
module.exports = __webpack_require__(350);


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(149);

__webpack_require__(346);

__webpack_require__(347);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(150);
__webpack_require__(152);
__webpack_require__(153);
__webpack_require__(154);
__webpack_require__(155);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(160);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(98);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(126);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(129);
__webpack_require__(131);
__webpack_require__(132);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(328);
__webpack_require__(329);
__webpack_require__(330);
__webpack_require__(331);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(334);
__webpack_require__(335);
__webpack_require__(336);
__webpack_require__(337);
__webpack_require__(338);
__webpack_require__(339);
__webpack_require__(340);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(344);
__webpack_require__(345);
module.exports = __webpack_require__(24);


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(15);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var META = __webpack_require__(32).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(57);
var setToStringTag = __webpack_require__(45);
var uid = __webpack_require__(35);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(109);
var wksDefine = __webpack_require__(78);
var enumKeys = __webpack_require__(151);
var isArray = __webpack_require__(60);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(25);
var createDesc = __webpack_require__(34);
var _create = __webpack_require__(39);
var gOPNExt = __webpack_require__(112);
var $GOPD = __webpack_require__(17);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(37);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(40).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(51).f = $propertyIsEnumerable;
  __webpack_require__(59).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(36)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(37);
var gOPS = __webpack_require__(59);
var pIE = __webpack_require__(51);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(39) });


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperties: __webpack_require__(111) });


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(16);
var $getOwnPropertyDescriptor = __webpack_require__(17).f;

__webpack_require__(28)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(9);
var $getPrototypeOf = __webpack_require__(18);

__webpack_require__(28)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9);
var $keys = __webpack_require__(37);

__webpack_require__(28)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(28)('getOwnPropertyNames', function () {
  return __webpack_require__(112).f;
});


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(32).onFreeze;

__webpack_require__(28)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(32).onFreeze;

__webpack_require__(28)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(32).onFreeze;

__webpack_require__(28)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(28)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(28)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(28)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(113) });


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(167) });


/***/ }),
/* 167 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(82).set });


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(52);
var test = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(13)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(114) });


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(18);
var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(7).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(116);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(117);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var has = __webpack_require__(15);
var cof = __webpack_require__(20);
var inheritIfRequired = __webpack_require__(84);
var toPrimitive = __webpack_require__(25);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(40).f;
var gOPD = __webpack_require__(17).f;
var dP = __webpack_require__(7).f;
var $trim = __webpack_require__(46).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(39)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(13)(global, NUMBER, $Number);
}


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(27);
var aNumberValue = __webpack_require__(118);
var repeat = __webpack_require__(85);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(118);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(119) });


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(119);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(117);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(116);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(120);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(86);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(87);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(121) });


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(120) });


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(86) });


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(87);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(87);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(38);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(16);
var toLength = __webpack_require__(8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(46)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(88)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(89)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(88)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(91);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(92)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(91);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(92)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(85)
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(91);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(92)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(14)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(14)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(14)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(14)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(14)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(14)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(14)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(14)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(14)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(14)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(14)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(14)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(14)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(25);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(229);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(13)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(12)(proto, TO_PRIMITIVE, __webpack_require__(232));


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(25);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(60) });


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(19);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var call = __webpack_require__(122);
var isArrayIter = __webpack_require__(93);
var toLength = __webpack_require__(8);
var createProperty = __webpack_require__(94);
var getIterFn = __webpack_require__(95);

$export($export.S + $export.F * !__webpack_require__(62)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(94);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(16);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(50) != Object || !__webpack_require__(21)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(81);
var cof = __webpack_require__(20);
var toAbsoluteIndex = __webpack_require__(38);
var toLength = __webpack_require__(8);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(11);
var toObject = __webpack_require__(9);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(21)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(29)(0);
var STRICT = __webpack_require__(21)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(60);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(29)(1);

$export($export.P + $export.F * !__webpack_require__(21)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(29)(2);

$export($export.P + $export.F * !__webpack_require__(21)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(29)(3);

$export($export.P + $export.F * !__webpack_require__(21)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(29)(4);

$export($export.P + $export.F * !__webpack_require__(21)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(123);

$export($export.P + $export.F * !__webpack_require__(21)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(123);

$export($export.P + $export.F * !__webpack_require__(21)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(58)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(21)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(16);
var toInteger = __webpack_require__(27);
var toLength = __webpack_require__(8);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(21)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(124) });

__webpack_require__(33)('copyWithin');


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(97) });

__webpack_require__(33)('fill');


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(29)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(33)(KEY);


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(29)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(33)(KEY);


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41)('Array');


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(84);
var dP = __webpack_require__(7).f;
var gOPN = __webpack_require__(40).f;
var isRegExp = __webpack_require__(61);
var $flags = __webpack_require__(63);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(13)(global, 'RegExp', $RegExp);
}

__webpack_require__(41)('RegExp');


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(126);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(63);
var DESCRIPTORS = __webpack_require__(6);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(13)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(64)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(64)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(64)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(64)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(61);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(36);
var global = __webpack_require__(2);
var ctx = __webpack_require__(19);
var classof = __webpack_require__(52);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(11);
var anInstance = __webpack_require__(42);
var forOf = __webpack_require__(43);
var speciesConstructor = __webpack_require__(65);
var task = __webpack_require__(99).set;
var microtask = __webpack_require__(100)();
var newPromiseCapabilityModule = __webpack_require__(101);
var perform = __webpack_require__(127);
var promiseResolve = __webpack_require__(128);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(44)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(45)($Promise, PROMISE);
__webpack_require__(41)(PROMISE);
Wrapper = __webpack_require__(24)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(62)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(133);
var validate = __webpack_require__(48);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(66)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(67);
var buffer = __webpack_require__(102);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(38);
var toLength = __webpack_require__(8);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(65);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(41)(ARRAY_BUFFER);


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(67).ABV, {
  DataView: __webpack_require__(102).DataView
});


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(11);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(39);
var aFunction = __webpack_require__(11);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(114);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(7);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(25);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(17).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(90)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(17);
var getPrototypeOf = __webpack_require__(18);
var has = __webpack_require__(15);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(17);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(18);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(135) });


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(7);
var gOPD = __webpack_require__(17);
var getPrototypeOf = __webpack_require__(18);
var has = __webpack_require__(15);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(34);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(82);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(58)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(33)('includes');


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(136);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var aFunction = __webpack_require__(11);
var arraySpeciesCreate = __webpack_require__(96);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(33)('flatMap');


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(136);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var toInteger = __webpack_require__(27);
var arraySpeciesCreate = __webpack_require__(96);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(33)('flatten');


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(88)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(137);
var userAgent = __webpack_require__(103);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(137);
var userAgent = __webpack_require__(103);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(46)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(46)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(26);
var toLength = __webpack_require__(8);
var isRegExp = __webpack_require__(61);
var getFlags = __webpack_require__(63);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(90)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(78)('asyncIterator');


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(78)('observable');


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(135);
var toIObject = __webpack_require__(16);
var gOPD = __webpack_require__(17);
var createProperty = __webpack_require__(94);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(138)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(138)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(11);
var $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(6) && $export($export.P + __webpack_require__(68), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(11);
var $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(6) && $export($export.P + __webpack_require__(68), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(25);
var getPrototypeOf = __webpack_require__(18);
var getOwnPropertyDescriptor = __webpack_require__(17).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(68), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(25);
var getPrototypeOf = __webpack_require__(18);
var getOwnPropertyDescriptor = __webpack_require__(17).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(68), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(139)('Map') });


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(139)('Set') });


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(69)('Map');


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(69)('Set');


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(69)('WeakMap');


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(69)('WeakSet');


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(70)('Map');


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(70)('Set');


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(70)('WeakMap');


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(70)('WeakSet');


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(20);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(141);
var fround = __webpack_require__(121);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(141) });


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(24);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(65);
var promiseResolve = __webpack_require__(128);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(101);
var perform = __webpack_require__(127);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(18);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(131);
var from = __webpack_require__(140);
var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(18);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(18);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(11);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(100)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(20)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(24);
var microtask = __webpack_require__(100)();
var OBSERVABLE = __webpack_require__(5)('observable');
var aFunction = __webpack_require__(11);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(42);
var redefineAll = __webpack_require__(44);
var hide = __webpack_require__(12);
var forOf = __webpack_require__(43);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(41)('Observable');


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(103);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(99);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(98);
var getKeys = __webpack_require__(37);
var redefine = __webpack_require__(13);
var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var Iterators = __webpack_require__(47);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 346 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(348);
module.exports = __webpack_require__(24).RegExp.escape;


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(349)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 349 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _awsSdk = __webpack_require__(351);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _config = __webpack_require__(352);

var _config2 = _interopRequireDefault(_config);

var _uuid = __webpack_require__(353);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ddbGeo = __webpack_require__(357);

_awsSdk2.default.config.update({ region: 'eu-central-1' });

/*eslint-disable */
exports.handler = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event, context) {
        var ddb, ddbGeoConfig, myGeoTableManager;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        ddb = new _awsSdk2.default.DynamoDB();
                        ddbGeoConfig = new ddbGeo.GeoDataManagerConfiguration(ddb, _config2.default.tableName);

                        ddbGeoConfig.longitudeFirst = true;
                        myGeoTableManager = new ddbGeo.GeoDataManager(ddbGeoConfig);


                        myGeoTableManager.putPoint({
                            RangeKeyValue: { S: _uuid2.default.v1() },
                            GeoPoint: {
                                latitude: event.coordinates.latitude,
                                longitude: event.coordinates.longitude
                            },
                            PutItemInput: {
                                Item: {
                                    username: { S: event.username },
                                    content: { S: event.content }
                                }
                            }
                        }).promise().then(function () {
                            context.succeed({
                                statusCode: '200',
                                headers: { 'Content-Type': 'application/json' }
                            });
                        });

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/***/ }),
/* 351 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var environmentConfigs = {
  dev: {
    env: 'dev',
    tableName: 'TestTable'
  },
  preprod: {
    env: 'preprod',
    tableName: process.env.TABLE_NAME
  }
};
var targetEnvironment = process.env.ENVIRONMENT || 'dev';
var config = environmentConfigs[targetEnvironment];

module.exports = config;

/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(354);
var v4 = __webpack_require__(356);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(142);
var bytesToUuid = __webpack_require__(143);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),
/* 355 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(142);
var bytesToUuid = __webpack_require__(143);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GeoDataManager_1 = __webpack_require__(358);
exports.GeoDataManager = GeoDataManager_1.GeoDataManager;
var GeoDataManagerConfiguration_1 = __webpack_require__(146);
exports.GeoDataManagerConfiguration = GeoDataManagerConfiguration_1.GeoDataManagerConfiguration;
var GeoTableUtil_1 = __webpack_require__(367);
exports.GeoTableUtil = GeoTableUtil_1.GeoTableUtil;


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2010-2013 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var DynamoDBManager_1 = __webpack_require__(359);
var S2Manager_1 = __webpack_require__(104);
var S2Util_1 = __webpack_require__(364);
var nodes2ts_1 = __webpack_require__(71);
var Covering_1 = __webpack_require__(365);
/**
 * <p>
 * Manager to hangle geo spatial data in Amazon DynamoDB tables. All service calls made using this client are blocking,
 * and will not return until the service call completes.
 * </p>
 * <p>
 * This class is designed to be thread safe; however, once constructed GeoDataManagerConfiguration should not be
 * modified. Modifying GeoDataManagerConfiguration may cause unspecified behaviors.
 * </p>
 * */
var GeoDataManager = (function () {
    /**
     * <p>
     * Construct and configure GeoDataManager using GeoDataManagerConfiguration.
     * </p>
     * <b>Sample usage:</b>
     *
     * <pre>
     * AmazonDynamoDBClient ddb = new AmazonDynamoDBClient(new ClasspathPropertiesFileCredentialsProvider());
     * Region usWest2 = Region.getRegion(Regions.US_WEST_2);
     * ddb.setRegion(usWest2);
     *
     * ClientConfiguration clientConfiguration = new ClientConfiguration().withMaxErrorRetry(5);
     * ddb.setConfiguration(clientConfiguration);
     *
     * GeoDataManagerConfiguration config = new GeoDataManagerConfiguration(ddb, &quot;geo-table&quot;);
     * GeoDataManager geoDataManager = new GeoDataManager(config);
     * </pre>
     *
     * @param config
     *            Container for the configuration parameters for GeoDataManager.
     */
    function GeoDataManager(config) {
        this.config = config;
        this.dynamoDBManager = new DynamoDBManager_1.DynamoDBManager(this.config);
    }
    /**
     * <p>
     * Return GeoDataManagerConfiguration. The returned GeoDataManagerConfiguration should not be modified.
     * </p>
     *
     * @return
     *         GeoDataManagerConfiguration that is used to configure this GeoDataManager.
     */
    GeoDataManager.prototype.getGeoDataManagerConfiguration = function () {
        return this.config;
    };
    /**
     * <p>
     * Put a point into the Amazon DynamoDB table. Once put, you cannot update attributes specified in
     * GeoDataManagerConfiguration: hash key, range key, geohash and geoJson. If you want to update these columns, you
     * need to insert a new record and delete the old record.
     * </p>
     * <b>Sample usage:</b>
     *
     * <pre>
     * GeoPoint geoPoint = new GeoPoint(47.5, -122.3);
     * AttributeValue rangeKeyValue = new AttributeValue().withS(&quot;a6feb446-c7f2-4b48-9b3a-0f87744a5047&quot;);
     * AttributeValue titleValue = new AttributeValue().withS(&quot;Original title&quot;);
     *
     * PutPointRequest putPointRequest = new PutPointRequest(geoPoint, rangeKeyValue);
     * putPointRequest.getPutItemRequest().getItem().put(&quot;title&quot;, titleValue);
     *
     * PutPointResult putPointResult = geoDataManager.putPoint(putPointRequest);
     * </pre>
     *
     * @param putPointInput
     *            Container for the necessary parameters to execute put point request.
     *
     * @return Result of put point request.
     */
    GeoDataManager.prototype.putPoint = function (putPointInput) {
        return this.dynamoDBManager.putPoint(putPointInput);
    };
    /**
     * <p>
     * Put a list of points into the Amazon DynamoDB table. Once put, you cannot update attributes specified in
     * GeoDataManagerConfiguration: hash key, range key, geohash and geoJson. If you want to update these columns, you
     * need to insert a new record and delete the old record.
     * </p>
     * <b>Sample usage:</b>
     *
     * <pre>
     * GeoPoint geoPoint = new GeoPoint(47.5, -122.3);
     * AttributeValue rangeKeyValue = new AttributeValue().withS(&quot;a6feb446-c7f2-4b48-9b3a-0f87744a5047&quot;);
     * AttributeValue titleValue = new AttributeValue().withS(&quot;Original title&quot;);
     *
     * PutPointRequest putPointRequest = new PutPointRequest(geoPoint, rangeKeyValue);
     * putPointRequest.getPutItemRequest().getItem().put(&quot;title&quot;, titleValue);
     * List<PutPointRequest> putPointRequests = new ArrayList<PutPointRequest>();
     * putPointRequests.add(putPointRequest);
     * BatchWritePointResult batchWritePointResult = geoDataManager.batchWritePoints(putPointRequests);
     * </pre>
     *
     * @param putPointInputs
     *            Container for the necessary parameters to execute put point request.
     *
     * @return Result of batch put point request.
     */
    GeoDataManager.prototype.batchWritePoints = function (putPointInputs) {
        return this.dynamoDBManager.batchWritePoints(putPointInputs);
    };
    /**
     * <p>
     * Get a point from the Amazon DynamoDB table.
     * </p>
     * <b>Sample usage:</b>
     *
     * <pre>
     * GeoPoint geoPoint = new GeoPoint(47.5, -122.3);
     * AttributeValue rangeKeyValue = new AttributeValue().withS(&quot;a6feb446-c7f2-4b48-9b3a-0f87744a5047&quot;);
     *
     * GetPointRequest getPointRequest = new GetPointRequest(geoPoint, rangeKeyValue);
     * GetPointResult getPointResult = geoIndexManager.getPoint(getPointRequest);
     *
     * System.out.println(&quot;item: &quot; + getPointResult.getGetItemResult().getItem());
     * </pre>
     *
     * @param getPointInput
     *            Container for the necessary parameters to execute get point request.
     *
     * @return Result of get point request.
     * */
    GeoDataManager.prototype.getPoint = function (getPointInput) {
        return this.dynamoDBManager.getPoint(getPointInput);
    };
    /**
     * <p>
     * Query a rectangular area constructed by two points and return all points within the area. Two points need to
     * construct a rectangle from minimum and maximum latitudes and longitudes. If minPoint.getLongitude() >
     * maxPoint.getLongitude(), the rectangle spans the 180 degree longitude line.
     * </p>
     * <b>Sample usage:</b>
     *
     * <pre>
     * GeoPoint minPoint = new GeoPoint(45.5, -124.3);
     * GeoPoint maxPoint = new GeoPoint(49.5, -120.3);
     *
     * QueryRectangleRequest queryRectangleRequest = new QueryRectangleRequest(minPoint, maxPoint);
     * QueryRectangleResult queryRectangleResult = geoIndexManager.queryRectangle(queryRectangleRequest);
     *
     * for (Map&lt;String, AttributeValue&gt; item : queryRectangleResult.getItem()) {
       * 	System.out.println(&quot;item: &quot; + item);
       * }
     * </pre>
     *
     * @param queryRectangleInput
     *            Container for the necessary parameters to execute rectangle query request.
     *
     * @return Result of rectangle query request.
     */
    GeoDataManager.prototype.queryRectangle = function (queryRectangleInput) {
        var _this = this;
        var latLngRect = S2Util_1.S2Util.latLngRectFromQueryRectangleInput(queryRectangleInput);
        var covering = new Covering_1.Covering(new this.config.S2RegionCoverer().getCoveringCells(latLngRect));
        return this.dispatchQueries(covering, queryRectangleInput)
            .then(function (results) { return _this.filterByRectangle(results, queryRectangleInput); });
    };
    /**
     * <p>
     * Query a circular area constructed by a center point and its radius.
     * </p>
     * <b>Sample usage:</b>
     *
     * <pre>
     * GeoPoint centerPoint = new GeoPoint(47.5, -122.3);
     *
     * QueryRadiusRequest queryRadiusRequest = new QueryRadiusRequest(centerPoint, 100);
     * QueryRadiusResult queryRadiusResult = geoIndexManager.queryRadius(queryRadiusRequest);
     *
     * for (Map&lt;String, AttributeValue&gt; item : queryRadiusResult.getItem()) {
       * 	System.out.println(&quot;item: &quot; + item);
       * }
     * </pre>
     *
     * @param queryRadiusInput
     *            Container for the necessary parameters to execute radius query request.
     *
     * @return Result of radius query request.
     * */
    GeoDataManager.prototype.queryRadius = function (queryRadiusInput) {
        var _this = this;
        var latLngRect = S2Util_1.S2Util.getBoundingLatLngRectFromQueryRadiusInput(queryRadiusInput);
        var covering = new Covering_1.Covering(new this.config.S2RegionCoverer().getCoveringCells(latLngRect));
        return this.dispatchQueries(covering, queryRadiusInput)
            .then(function (results) { return _this.filterByRadius(results, queryRadiusInput); });
    };
    /**
     * <p>
     * Update a point data in Amazon DynamoDB table. You cannot update attributes specified in
     * GeoDataManagerConfiguration: hash key, range key, geohash and geoJson. If you want to update these columns, you
     * need to insert a new record and delete the old record.
     * </p>
     * <b>Sample usage:</b>
     *
     * <pre>
     * GeoPoint geoPoint = new GeoPoint(47.5, -122.3);
     *
     * String rangeKey = &quot;a6feb446-c7f2-4b48-9b3a-0f87744a5047&quot;;
     * AttributeValue rangeKeyValue = new AttributeValue().withS(rangeKey);
     *
     * UpdatePointRequest updatePointRequest = new UpdatePointRequest(geoPoint, rangeKeyValue);
     *
     * AttributeValue titleValue = new AttributeValue().withS(&quot;Updated title.&quot;);
     * AttributeValueUpdate titleValueUpdate = new AttributeValueUpdate().withAction(AttributeAction.PUT)
     *    .withValue(titleValue);
     * updatePointRequest.getUpdateItemRequest().getAttributeUpdates().put(&quot;title&quot;, titleValueUpdate);
     *
     * UpdatePointResult updatePointResult = geoIndexManager.updatePoint(updatePointRequest);
     * </pre>
     *
     * @param updatePointInput
     *            Container for the necessary parameters to execute update point request.
     *
     * @return Result of update point request.
     */
    GeoDataManager.prototype.updatePoint = function (updatePointInput) {
        return this.dynamoDBManager.updatePoint(updatePointInput);
    };
    /**
     * <p>
     * Delete a point from the Amazon DynamoDB table.
     * </p>
     * <b>Sample usage:</b>
     *
     * <pre>
     * GeoPoint geoPoint = new GeoPoint(47.5, -122.3);
     *
     * String rangeKey = &quot;a6feb446-c7f2-4b48-9b3a-0f87744a5047&quot;;
     * AttributeValue rangeKeyValue = new AttributeValue().withS(rangeKey);
     *
     * DeletePointRequest deletePointRequest = new DeletePointRequest(geoPoint, rangeKeyValue);
     * DeletePointResult deletePointResult = geoIndexManager.deletePoint(deletePointRequest);
     * </pre>
     *
     * @param deletePointInput
     *            Container for the necessary parameters to execute delete point request.
     *
     * @return Result of delete point request.
     */
    GeoDataManager.prototype.deletePoint = function (deletePointInput) {
        return this.dynamoDBManager.deletePoint(deletePointInput);
    };
    /**
     * Query Amazon DynamoDB in parallel and filter the result.
     *
     * @param covering
     *            A list of geohash ranges that will be used to query Amazon DynamoDB.
     *
     * @param geoQueryInput
     *            The rectangle area that will be used as a reference point for precise filtering.
     *
     * @return Aggregated and filtered items returned from Amazon DynamoDB.
     */
    GeoDataManager.prototype.dispatchQueries = function (covering, geoQueryInput) {
        var _this = this;
        var promises = covering.getGeoHashRanges(this.config.hashKeyLength).map(function (range) {
            var hashKey = S2Manager_1.S2Manager.generateHashKey(range.rangeMin, _this.config.hashKeyLength);
            return _this.dynamoDBManager.queryGeohash(geoQueryInput.QueryInput, hashKey, range);
        });
        return Promise.all(promises).then(function (results) {
            var mergedResults = [];
            results.forEach(function (queryOutputs) { return queryOutputs.forEach(function (queryOutput) { return mergedResults.push.apply(mergedResults, queryOutput.Items); }); });
            return mergedResults;
        });
    };
    /**
     * Filter out any points outside of the queried area from the input list.
     *
     * @param list
     * @param geoQueryInput
     * @returns DynamoDB.ItemList
     */
    GeoDataManager.prototype.filterByRadius = function (list, geoQueryInput) {
        var _this = this;
        var centerLatLng = null;
        var radiusInMeter = 0;
        var centerPoint = geoQueryInput.CenterPoint;
        centerLatLng = nodes2ts_1.S2LatLng.fromDegrees(centerPoint.latitude, centerPoint.longitude);
        radiusInMeter = geoQueryInput.RadiusInMeter;
        return list.filter(function (item) {
            var geoJson = item[_this.config.geoJsonAttributeName].S;
            var coordinates = JSON.parse(geoJson).coordinates;
            var longitude = coordinates[_this.config.longitudeFirst ? 0 : 1];
            var latitude = coordinates[_this.config.longitudeFirst ? 1 : 0];
            var latLng = nodes2ts_1.S2LatLng.fromDegrees(latitude, longitude);
            return centerLatLng.getEarthDistance(latLng).toNumber() <= radiusInMeter;
        });
    };
    /**
     * Filter out any points outside of the queried area from the input list.
     *
     * @param list
     * @param geoQueryInput
     * @returns DynamoDB.ItemList
     */
    GeoDataManager.prototype.filterByRectangle = function (list, geoQueryInput) {
        var _this = this;
        var latLngRect = S2Util_1.S2Util.latLngRectFromQueryRectangleInput(geoQueryInput);
        return list.filter(function (item) {
            var geoJson = item[_this.config.geoJsonAttributeName].S;
            var coordinates = JSON.parse(geoJson).coordinates;
            var longitude = coordinates[_this.config.longitudeFirst ? 0 : 1];
            var latitude = coordinates[_this.config.longitudeFirst ? 1 : 0];
            var latLng = nodes2ts_1.S2LatLng.fromDegrees(latitude, longitude);
            return latLngRect.containsLL(latLng);
        });
    };
    return GeoDataManager;
}());
exports.GeoDataManager = GeoDataManager;


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2010-2013 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var S2Manager_1 = __webpack_require__(104);
var DynamoDBManager = (function () {
    function DynamoDBManager(config) {
        this.config = config;
    }
    /**
     * Query Amazon DynamoDB
     *
     * @param queryInput
     * @param hashKey
     *            Hash key for the query request.
     *
     * @param range
     *            The range of geohashs to query.
     *
     * @return The query result.
     */
    DynamoDBManager.prototype.queryGeohash = function (queryInput, hashKey, range) {
        var _this = this;
        var queryOutputs = [];
        var nextQuery = function (lastEvaluatedKey) {
            if (lastEvaluatedKey === void 0) { lastEvaluatedKey = null; }
            var keyConditions = {};
            keyConditions[_this.config.hashKeyAttributeName] = {
                ComparisonOperator: "EQ",
                AttributeValueList: [{ N: hashKey.toString(10) }]
            };
            var minRange = { N: range.rangeMin.toString(10) };
            var maxRange = { N: range.rangeMax.toString(10) };
            keyConditions[_this.config.geohashAttributeName] = {
                ComparisonOperator: "BETWEEN",
                AttributeValueList: [minRange, maxRange]
            };
            var defaults = {
                TableName: _this.config.tableName,
                KeyConditions: keyConditions,
                IndexName: _this.config.geohashIndexName,
                ConsistentRead: _this.config.consistentRead,
                ReturnConsumedCapacity: "TOTAL",
                ExclusiveStartKey: lastEvaluatedKey
            };
            return _this.config.dynamoDBClient.query(__assign({}, defaults, queryInput)).promise()
                .then(function (queryOutput) {
                queryOutputs.push(queryOutput);
                if (queryOutput.LastEvaluatedKey) {
                    return nextQuery(queryOutput.LastEvaluatedKey);
                }
            });
        };
        return nextQuery().then(function () { return queryOutputs; });
    };
    DynamoDBManager.prototype.getPoint = function (getPointInput) {
        var geohash = S2Manager_1.S2Manager.generateGeohash(getPointInput.GeoPoint);
        var hashKey = S2Manager_1.S2Manager.generateHashKey(geohash, this.config.hashKeyLength);
        var getItemInput = getPointInput.GetItemInput;
        getItemInput.TableName = this.config.tableName;
        getItemInput.Key = (_a = {},
            _a[this.config.hashKeyAttributeName] = { N: hashKey.toString(10) },
            _a[this.config.rangeKeyAttributeName] = getPointInput.RangeKeyValue,
            _a);
        return this.config.dynamoDBClient.getItem(getItemInput);
        var _a;
    };
    DynamoDBManager.prototype.putPoint = function (putPointInput) {
        var geohash = S2Manager_1.S2Manager.generateGeohash(putPointInput.GeoPoint);
        var hashKey = S2Manager_1.S2Manager.generateHashKey(geohash, this.config.hashKeyLength);
        var putItemInput = {
            TableName: this.config.tableName,
            Item: putPointInput.PutItemInput.Item || {}
        };
        putItemInput.Item[this.config.hashKeyAttributeName] = { N: hashKey.toString(10) };
        putItemInput.Item[this.config.rangeKeyAttributeName] = putPointInput.RangeKeyValue;
        putItemInput.Item[this.config.geohashAttributeName] = { N: geohash.toString(10) };
        putItemInput.Item[this.config.geoJsonAttributeName] = {
            S: JSON.stringify({
                type: 'POINT',
                coordinates: (this.config.longitudeFirst ?
                    [putPointInput.GeoPoint.longitude, putPointInput.GeoPoint.latitude] :
                    [putPointInput.GeoPoint.latitude, putPointInput.GeoPoint.longitude])
            })
        };
        return this.config.dynamoDBClient.putItem(putItemInput);
    };
    DynamoDBManager.prototype.batchWritePoints = function (putPointInputs) {
        var _this = this;
        var writeInputs = [];
        putPointInputs.forEach(function (putPointInput) {
            var geohash = S2Manager_1.S2Manager.generateGeohash(putPointInput.GeoPoint);
            var hashKey = S2Manager_1.S2Manager.generateHashKey(geohash, _this.config.hashKeyLength);
            var putItemInput = putPointInput.PutItemInput;
            var putRequest = {
                Item: putItemInput.Item || {}
            };
            putRequest.Item[_this.config.hashKeyAttributeName] = { N: hashKey.toString(10) };
            putRequest.Item[_this.config.rangeKeyAttributeName] = putPointInput.RangeKeyValue;
            putRequest.Item[_this.config.geohashAttributeName] = { N: geohash.toString(10) };
            putRequest.Item[_this.config.geoJsonAttributeName] = {
                S: JSON.stringify({
                    type: 'POINT',
                    coordinates: (_this.config.longitudeFirst ?
                        [putPointInput.GeoPoint.longitude, putPointInput.GeoPoint.latitude] :
                        [putPointInput.GeoPoint.latitude, putPointInput.GeoPoint.longitude])
                })
            };
            writeInputs.push({ PutRequest: putRequest });
        });
        return this.config.dynamoDBClient.batchWriteItem({
            RequestItems: (_a = {},
                _a[this.config.tableName] = writeInputs,
                _a)
        });
        var _a;
    };
    DynamoDBManager.prototype.updatePoint = function (updatePointInput) {
        var geohash = S2Manager_1.S2Manager.generateGeohash(updatePointInput.GeoPoint);
        var hashKey = S2Manager_1.S2Manager.generateHashKey(geohash, this.config.hashKeyLength);
        updatePointInput.UpdateItemInput.TableName = this.config.tableName;
        if (!updatePointInput.UpdateItemInput.Key) {
            updatePointInput.UpdateItemInput.Key = {};
        }
        updatePointInput.UpdateItemInput.Key[this.config.hashKeyAttributeName] = { N: hashKey.toString(10) };
        updatePointInput.UpdateItemInput.Key[this.config.rangeKeyAttributeName] = updatePointInput.RangeKeyValue;
        // Geohash and geoJson cannot be updated.
        if (updatePointInput.UpdateItemInput.AttributeUpdates) {
            delete updatePointInput.UpdateItemInput.AttributeUpdates[this.config.geohashAttributeName];
            delete updatePointInput.UpdateItemInput.AttributeUpdates[this.config.geoJsonAttributeName];
        }
        return this.config.dynamoDBClient.updateItem(updatePointInput.UpdateItemInput);
    };
    DynamoDBManager.prototype.deletePoint = function (deletePointInput) {
        var geohash = S2Manager_1.S2Manager.generateGeohash(deletePointInput.GeoPoint);
        var hashKey = S2Manager_1.S2Manager.generateHashKey(geohash, this.config.hashKeyLength);
        return this.config.dynamoDBClient.deleteItem(__assign({}, deletePointInput.DeleteItemInput, { TableName: this.config.tableName, Key: (_a = {},
                _a[this.config.hashKeyAttributeName] = { N: hashKey.toString(10) },
                _a[this.config.rangeKeyAttributeName] = deletePointInput.RangeKeyValue,
                _a) }));
        var _a;
    };
    return DynamoDBManager;
}());
exports.DynamoDBManager = DynamoDBManager;


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//# sourceMappingURL=decimal_augmentation.js.map

/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var S2_1 = __webpack_require__(10);
/**
 * Defines an area or a length cell metric.
 */
var S2Metric = (function () {
    /**
     * Defines a cell metric of the given dimension (1 == length, 2 == area).
     */
    function S2Metric(_dim, _deriv) {
        this._dim = S2_1.S2.toDecimal(_dim).toNumber();
        this._deriv = S2_1.S2.toDecimal(_deriv);
    }
    S2Metric.prototype.deriv = function () {
        return this._deriv;
    };
    S2Metric.prototype.dim = function () {
        return this._dim;
    };
    /** Return the value of a metric for cells at the given level. */
    S2Metric.prototype.getValue = function (level) {
        return 0;
        // return StrictMath.scalb(deriv, dim * (1 - level));
    };
    /**
     * Return the level at which the metric has approximately the given value.
     * For example, S2::kAvgEdge.GetClosestLevel(0.1) returns the level at which
     * the average cell edge length is approximately 0.1. The return value is
     * always a valid level.
     */
    S2Metric.prototype.getClosestLevel = function (/*double*/ value) {
        return this.getMinLevel(S2_1.S2.M_SQRT2 * value);
    };
    /**
     * Return the minimum level such that the metric is at most the given value,
     * or S2CellId::kMaxLevel if there is no such level. For example,
     * S2::kMaxDiag.GetMinLevel(0.1) returns the minimum level such that all
     * cell diagonal lengths are 0.1 or smaller. The return value is always a
     * valid level.
     */
    S2Metric.prototype.getMinLevel = function (value /*double*/) {
        if (value <= 0) {
            return S2_1.S2.MAX_LEVEL;
        }
        // This code is equivalent to computing a floating-point "level"
        // value and rounding up.
        var exponent = S2_1.S2.exp(value / ((1 << this.dim()) * this.deriv().toNumber()));
        var level = Math.max(0, Math.min(S2_1.S2.MAX_LEVEL, -((exponent - 1) >> (this.dim() - 1))));
        // assert (level == S2CellId.MAX_LEVEL || getValue(level) <= value);
        // assert (level == 0 || getValue(level - 1) > value);
        return level;
    };
    /**
     * Return the maximum level such that the metric is at least the given
     * value, or zero if there is no such level. For example,
     * S2.kMinWidth.GetMaxLevel(0.1) returns the maximum level such that all
     * cells have a minimum width of 0.1 or larger. The return value is always a
     * valid level.
     */
    S2Metric.prototype.getMaxLevel = function (_value /*double*/) {
        var value = S2_1.S2.toDecimal(_value).toNumber();
        if (value <= 0) {
            return S2_1.S2.MAX_LEVEL;
        }
        // This code is equivalent to computing a floating-point "level"
        // value and rounding down.
        var exponent = S2_1.S2.exp((1 << this.dim()) * this.deriv().toNumber() / value);
        var level = Math.max(0, Math.min(S2_1.S2.MAX_LEVEL, ((exponent - 1) >> (this.dim() - 1))));
        // assert (level == 0 || getValue(level) >= value);
        // assert (level == S2CellId.MAX_LEVEL || getValue(level + 1) < value);
        return level;
    };
    return S2Metric;
}());
exports.S2Metric = S2Metric;
//# sourceMappingURL=S2Metric.js.map

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright 2006 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var S2Point_1 = __webpack_require__(22);
var S2_1 = __webpack_require__(10);
var S1Angle_1 = __webpack_require__(55);
var decimal_1 = __webpack_require__(23);
/**
 * This class contains various utility functions related to edges. It collects
 * together common code that is needed to implement polygonal geometry such as
 * polylines, loops, and general polygons.
 *
 */
var S2EdgeUtil = (function () {
    function S2EdgeUtil() {
    }
    //   /**
    //    * IEEE floating-point operations have a maximum error of 0.5 ULPS (units in
    //    * the last place). For double-precision numbers, this works out to 2**-53
    //    * (about 1.11e-16) times the magnitude of the result. It is possible to
    //    * analyze the calculation done by getIntersection() and work out the
    //    * worst-case rounding error. I have done a rough version of this, and my
    //    * estimate is that the worst case distance from the intersection point X to
    //    * the great circle through (a0, a1) is about 12 ULPS, or about 1.3e-15. This
    //    * needs to be increased by a factor of (1/0.866) to account for the
    //    * edgeSpliceFraction() in S2PolygonBuilder. Note that the maximum error
    //    * measured by the unittest in 1,000,000 trials is less than 3e-16.
    //    */
    //   public static final S1Angle DEFAULT_INTERSECTION_TOLERANCE = S1Angle.radians(1.5e-15);
    //
    //   /**
    //    * This class allows a vertex chain v0, v1, v2, ... to be efficiently tested
    //    * for intersection with a given fixed edge AB.
    //    */
    //   public static class EdgeCrosser {
    //   // The fields below are all constant.
    //
    //   private final S2Point a;
    //   private final S2Point b;
    //   private final S2Point aCrossB;
    //
    //   // The fields below are updated for each vertex in the chain.
    //
    //   // Previous vertex in the vertex chain.
    //   private S2Point c;
    //   // The orientation of the triangle ACB.
    //   private int acb;
    //
    //   /**
    //    * AB is the given fixed edge, and C is the first vertex of the vertex
    //    * chain. All parameters must point to fixed storage that persists for the
    //    * lifetime of the EdgeCrosser object.
    //    */
    //   public EdgeCrosser(S2Point a, S2Point b, S2Point c) {
    //   this.a = a;
    //   this.b = b;
    //   this.aCrossB = S2Point.crossProd(a, b);
    //   restartAt(c);
    // }
    //
    // /**
    //  * Call this function when your chain 'jumps' to a new place.
    //  */
    // public void restartAt(S2Point c) {
    //   this.c = c;
    //   this.acb = -S2.robustCCW(this.a, this.b, c, this.aCrossB);
    // }
    //
    // /**
    //  * This method is equivalent to calling the S2EdgeUtil.robustCrossing()
    //  * function (defined below) on the edges AB and CD. It returns +1 if there
    //  * is a crossing, -1 if there is no crossing, and 0 if two points from
    //  * different edges are the same. Returns 0 or -1 if either edge is
    //  * degenerate. As a side effect, it saves vertex D to be used as the next
    //  * vertex C.
    //  */
    // public int robustCrossing(S2Point d) {
    //   // For there to be an edge crossing, the triangles ACB, CBD, BDA, DAC must
    //   // all be oriented the same way (CW or CCW). We keep the orientation
    //   // of ACB as part of our state. When each new point D arrives, we
    //   // compute the orientation of BDA and check whether it matches ACB.
    //   // This checks whether the points C and D are on opposite sides of the
    //   // great circle through AB.
    //
    //   // Recall that robustCCW is invariant with respect to rotating its
    //   // arguments, i.e. ABC has the same orientation as BDA.
    //   int bda = S2.robustCCW(this.a, this.b, d, this.aCrossB);
    //   int result;
    //
    //   if (bda == -this.acb && bda != 0) {
    //     // Most common case -- triangles have opposite orientations.
    //     result = -1;
    //   } else if ((bda & this.acb) == 0) {
    //     // At least one value is zero -- two vertices are identical.
    //     result = 0;
    //   } else {
    //     // assert (bda == acb && bda != 0);
    //     result = robustCrossingInternal(d); // Slow path.
    //   }
    //   // Now save the current vertex D as the next vertex C, and also save the
    //   // orientation of the new triangle ACB (which is opposite to the current
    //   // triangle BDA).
    //   this.c = d;
    //   this.acb = -bda;
    //   return result;
    // }
    //
    // /**
    //  * This method is equivalent to the S2EdgeUtil.edgeOrVertexCrossing() method
    //  * defined below. It is similar to robustCrossing, but handles cases where
    //  * two vertices are identical in a way that makes it easy to implement
    //  * point-in-polygon containment tests.
    //  */
    // public boolean edgeOrVertexCrossing(S2Point d) {
    //   // We need to copy c since it is clobbered by robustCrossing().
    //   S2Point c2 = new S2Point(this.c.get(0), this.c.get(1), this.c.get(2));
    //
    //   int crossing = robustCrossing(d);
    //   if (crossing < 0) {
    //     return false;
    //   }
    //   if (crossing > 0) {
    //     return true;
    //   }
    //
    //   return vertexCrossing(this.a, this.b, c2, d);
    // }
    //
    // /**
    //  * This function handles the "slow path" of robustCrossing().
    //  */
    // private int robustCrossingInternal(S2Point d) {
    //   // ACB and BDA have the appropriate orientations, so now we check the
    //   // triangles CBD and DAC.
    //   S2Point cCrossD = S2Point.crossProd(this.c, d);
    //   int cbd = -S2.robustCCW(this.c, d, this.b, cCrossD);
    //   if (cbd != this.acb) {
    //     return -1;
    //   }
    //
    //   int dac = S2.robustCCW(this.c, d, this.a, cCrossD);
    //   return (dac == this.acb) ? 1 : -1;
    // }
    // }
    //
    // /**
    //  * This class computes a bounding rectangle that contains all edges defined by
    //  * a vertex chain v0, v1, v2, ... All vertices must be unit length. Note that
    //  * the bounding rectangle of an edge can be larger than the bounding rectangle
    //  * of its endpoints, e.g. consider an edge that passes through the north pole.
    //  */
    // public static class RectBounder {
    //   // The previous vertex in the chain.
    //   private S2Point a;
    //
    //   // The corresponding latitude-longitude.
    //   private S2LatLng aLatLng;
    //
    //   // The current bounding rectangle.
    //   private S2LatLngRect bound;
    //
    //   public RectBounder() {
    //     this.bound = S2LatLngRect.empty();
    //   }
    //
    //   /**
    //    * This method is called to add each vertex to the chain. 'b' must point to
    //    * fixed storage that persists for the lifetime of the RectBounder.
    //    */
    //   public void addPoint(S2Point b) {
    //   // assert (S2.isUnitLength(b));
    //
    //   S2LatLng bLatLng = new S2LatLng(b);
    //
    //   if (this.bound.isEmpty()) {
    //   this.bound = this.bound.addPoint(bLatLng);
    // } else {
    //   // We can't just call bound.addPoint(bLatLng) here, since we need to
    //   // ensure that all the longitudes between "a" and "b" are included.
    //   this.bound = this.bound.union(S2LatLngRect.fromPointPair(this.aLatLng, bLatLng));
    //
    //   // Check whether the min/max latitude occurs in the edge interior.
    //   // We find the normal to the plane containing AB, and then a vector
    //   // "dir" in this plane that also passes through the equator. We use
    //   // RobustCrossProd to ensure that the edge normal is accurate even
    //   // when the two points are very close together.
    //   S2Point aCrossB = S2.robustCrossProd(this.a, b);
    //   S2Point dir = S2Point.crossProd(aCrossB, new S2Point(0, 0, 1));
    //   double da = dir.dotProd(this.a);
    //   double db = dir.dotProd(b);
    //
    //   if (da * db < 0) {
    //     // Minimum/maximum latitude occurs in the edge interior. This affects
    //     // the latitude bounds but not the longitude bounds.
    //     double absLat = Math.acos(Math.abs(aCrossB.get(2) / aCrossB.norm()));
    //     R1Interval lat = this.bound.lat();
    //     if (da < 0) {
    //       // It's possible that absLat < lat.lo() due to numerical errors.
    //       lat = new R1Interval(lat.lo(), Math.max(absLat, this.bound.lat().hi()));
    //     } else {
    //       lat = new R1Interval(Math.min(-absLat, this.bound.lat().lo()), lat.hi());
    //     }
    //     this.bound = new S2LatLngRect(lat, this.bound.lng());
    //   }
    // }
    // this.a = b;
    // this.aLatLng = bLatLng;
    // }
    //
    // /**
    //  * Return the bounding rectangle of the edge chain that connects the
    //  * vertices defined so far.
    //  */
    // public S2LatLngRect getBound() {
    //   return this.bound;
    // }
    //
    // }
    //
    // /**
    //  * The purpose of this class is to find edges that intersect a given XYZ
    //  * bounding box. It can be used as an efficient rejection test when attempting to
    //  * find edges that intersect a given region. It accepts a vertex chain v0, v1,
    //  * v2, ... and returns a boolean value indicating whether each edge intersects
    //  * the specified bounding box.
    //  *
    //  * We use XYZ intervals instead of something like longitude intervals because
    //  * it is cheap to collect from S2Point lists and any slicing strategy should
    //  * give essentially equivalent results.  See S2Loop for an example of use.
    //  */
    // public static class XYZPruner {
    //   private S2Point lastVertex;
    //
    //   // The region to be tested against.
    //   private boolean boundSet;
    //   private double xmin;
    //   private double ymin;
    //   private double zmin;
    //   private double xmax;
    //   private double ymax;
    //   private double zmax;
    //   private double maxDeformation;
    //
    //   public XYZPruner() {
    //     this.boundSet = false;
    //   }
    //
    //   /**
    //    * Accumulate a bounding rectangle from provided edges.
    //    *
    //    * @param from start of edge
    //    * @param to end of edge.
    //    */
    //   public void addEdgeToBounds(S2Point from, S2Point to) {
    //   if (!this.boundSet) {
    //   this.boundSet = true;
    //   this.xmin = this.xmax = from.x;
    //   this.ymin = this.ymax = from.y;
    //   this.zmin = this.zmax = from.z;
    // }
    // this.xmin = Math.min(this.xmin, Math.min(to.x, from.x));
    // this.ymin = Math.min(this.ymin, Math.min(to.y, from.y));
    // this.zmin = Math.min(this.zmin, Math.min(to.z, from.z));
    // this.xmax = Math.max(this.xmax, Math.max(to.x, from.x));
    // this.ymax = Math.max(this.ymax, Math.max(to.y, from.y));
    // this.zmax = Math.max(this.zmax, Math.max(to.z, from.z));
    //
    // // Because our arcs are really geodesics on the surface of the earth
    // // an edge can have intermediate points outside the xyz bounds implicit
    // // in the end points.  Based on the length of the arc we compute a
    // // generous bound for the maximum amount of deformation.  For small edges
    // // it will be very small but for some large arcs (ie. from (1N,90W) to
    // // (1N,90E) the path can be wildly deformed.  I did a bunch of
    // // experiments with geodesics to get safe bounds for the deformation.
    // double approxArcLen =
    //     Math.abs(from.x - to.x) + Math.abs(from.y - to.y) + Math.abs(from.z - to.z);
    // if (approxArcLen < 0.025) { // less than 2 degrees
    //   this.maxDeformation = Math.max(this.maxDeformation, approxArcLen * 0.0025);
    // } else if (approxArcLen < 1.0) { // less than 90 degrees
    //   this.maxDeformation = Math.max(this.maxDeformation, approxArcLen * 0.11);
    // } else {
    //   this.maxDeformation = approxArcLen * 0.5;
    // }
    // }
    //
    // public void setFirstIntersectPoint(S2Point v0) {
    //   this.xmin = this.xmin - this.maxDeformation;
    //   this.ymin = this.ymin - this.maxDeformation;
    //   this.zmin = this.zmin - this.maxDeformation;
    //   this.xmax = this.xmax + this.maxDeformation;
    //   this.ymax = this.ymax + this.maxDeformation;
    //   this.zmax = this.zmax + this.maxDeformation;
    //   this.lastVertex = v0;
    // }
    //
    // /**
    //  * Returns true if the edge going from the last point to this point passes
    //  * through the pruner bounding box, otherwise returns false.  So the
    //  * method returns false if we are certain there is no intersection, but it
    //  * may return true when there turns out to be no intersection.
    //  */
    // public boolean intersects(S2Point v1) {
    //   boolean result = true;
    //
    //   if ((v1.x < this.xmin && this.lastVertex.x < this.xmin) || (v1.x > this.xmax && this.lastVertex.x > this.xmax)) {
    //     result = false;
    //   } else if ((v1.y < this.ymin && this.lastVertex.y < this.ymin) || (v1.y > this.ymax && this.lastVertex.y > this.ymax)) {
    //     result = false;
    //   } else if ((v1.z < this.zmin && this.lastVertex.z < this.zmin) || (v1.z > this.zmax && this.lastVertex.z > this.zmax)) {
    //     result = false;
    //   }
    //
    //   this.lastVertex = v1;
    //   return result;
    // }
    // }
    //
    // /**
    //  * The purpose of this class is to find edges that intersect a given longitude
    //  * interval. It can be used as an efficient rejection test when attempting to
    //  * find edges that intersect a given region. It accepts a vertex chain v0, v1,
    //  * v2, ... and returns a boolean value indicating whether each edge intersects
    //  * the specified longitude interval.
    //  *
    //  * This class is not currently used as the XYZPruner is preferred for
    //  * S2Loop, but this should be usable in similar circumstances.  Be wary
    //  * of the cost of atan2() in conversions from S2Point to longitude!
    //  */
    // public static class LongitudePruner {
    //   // The interval to be tested against.
    //   private S1Interval interval;
    //
    //   // The longitude of the next v0.
    //   private double lng0;
    //
    //   /**
    //    *'interval' is the longitude interval to be tested against, and 'v0' is
    //    * the first vertex of edge chain.
    //    */
    //   public LongitudePruner(S1Interval interval, S2Point v0) {
    //   this.interval = interval;
    //   this.lng0 = S2LatLng.longitude(v0).radians();
    // }
    //
    // /**
    //  * Returns true if the edge (v0, v1) intersects the given longitude
    //  * interval, and then saves 'v1' to be used as the next 'v0'.
    //  */
    // public boolean intersects(S2Point v1) {
    //   double lng1 = S2LatLng.longitude(v1).radians();
    //   boolean result = this.interval.intersects(S1Interval.fromPointPair(this.lng0, lng1));
    //   this.lng0 = lng1;
    //   return result;
    // }
    // }
    //
    // /**
    //  * A wedge relation's test method accepts two edge chains A=(a0,a1,a2) and
    //  * B=(b0,b1,b2) where a1==b1, and returns either -1, 0, or 1 to indicate the
    //  * relationship between the region to the left of A and the region to the left
    //  * of B. Wedge relations are used to determine the local relationship between
    //  * two polygons that share a common vertex.
    //  *
    //  *  All wedge relations require that a0 != a2 and b0 != b2. Other degenerate
    //  * cases (such as a0 == b2) are handled as expected. The parameter "ab1"
    //  * denotes the common vertex a1 == b1.
    //  */
    // public interface WedgeRelation {
    //   int test(S2Point a0, S2Point ab1, S2Point a2, S2Point b0, S2Point b2);
    // }
    //
    // public static class WedgeContains implements WedgeRelation {
    //   /**
    //    * Given two edge chains (see WedgeRelation above), this function returns +1
    //    * if the region to the left of A contains the region to the left of B, and
    //    * 0 otherwise.
    //    */
    //   @Override
    //   public int test(S2Point a0, S2Point ab1, S2Point a2, S2Point b0, S2Point b2) {
    //   // For A to contain B (where each loop interior is defined to be its left
    //   // side), the CCW edge order around ab1 must be a2 b2 b0 a0. We split
    //   // this test into two parts that test three vertices each.
    //   return S2.orderedCCW(a2, b2, b0, ab1) && S2.orderedCCW(b0, a0, a2, ab1) ? 1 : 0;
    // }
    // }
    //
    // public static class WedgeIntersects implements WedgeRelation {
    //   /**
    //    * Given two edge chains (see WedgeRelation above), this function returns -1
    //    * if the region to the left of A intersects the region to the left of B,
    //    * and 0 otherwise. Note that regions are defined such that points along a
    //    * boundary are contained by one side or the other, not both. So for
    //    * example, if A,B,C are distinct points ordered CCW around a vertex O, then
    //    * the wedges BOA, AOC, and COB do not intersect.
    //    */
    //   @Override
    //   public int test(S2Point a0, S2Point ab1, S2Point a2, S2Point b0, S2Point b2) {
    //   // For A not to intersect B (where each loop interior is defined to be
    //   // its left side), the CCW edge order around ab1 must be a0 b2 b0 a2.
    //   // Note that it's important to write these conditions as negatives
    //   // (!OrderedCCW(a,b,c,o) rather than Ordered(c,b,a,o)) to get correct
    //   // results when two vertices are the same.
    //   return (S2.orderedCCW(a0, b2, b0, ab1) && S2.orderedCCW(b0, a2, a0, ab1) ? 0 : -1);
    // }
    // }
    //
    // public static class WedgeContainsOrIntersects implements WedgeRelation {
    //   /**
    //    * Given two edge chains (see WedgeRelation above), this function returns +1
    //    * if A contains B, 0 if A and B are disjoint, and -1 if A intersects but
    //    * does not contain B.
    //    */
    //   @Override
    //   public int test(S2Point a0, S2Point ab1, S2Point a2, S2Point b0, S2Point b2) {
    //   // This is similar to WedgeContainsOrCrosses, except that we want to
    //   // distinguish cases (1) [A contains B], (3) [A and B are disjoint],
    //   // and (2,4,5,6) [A intersects but does not contain B].
    //
    //   if (S2.orderedCCW(a0, a2, b2, ab1)) {
    //   // We are in case 1, 5, or 6, or case 2 if a2 == b2.
    //   return S2.orderedCCW(b2, b0, a0, ab1) ? 1 : -1; // Case 1 vs. 2,5,6.
    // }
    // // We are in cases 2, 3, or 4.
    // if (!S2.orderedCCW(a2, b0, b2, ab1)) {
    //   return 0; // Case 3.
    // }
    //
    // // We are in case 2 or 4, or case 3 if a2 == b0.
    // return (a2.equals(b0)) ? 0 : -1; // Case 3 vs. 2,4.
    // }
    // }
    //
    // public static class WedgeContainsOrCrosses implements WedgeRelation {
    //   /**
    //    * Given two edge chains (see WedgeRelation above), this function returns +1
    //    * if A contains B, 0 if B contains A or the two wedges do not intersect,
    //    * and -1 if the edge chains A and B cross each other (i.e. if A intersects
    //    * both the interior and exterior of the region to the left of B). In
    //    * degenerate cases where more than one of these conditions is satisfied,
    //    * the maximum possible result is returned. For example, if A == B then the
    //    * result is +1.
    //    */
    //   @Override
    //   public int test(S2Point a0, S2Point ab1, S2Point a2, S2Point b0, S2Point b2) {
    //   // There are 6 possible edge orderings at a shared vertex (all
    //   // of these orderings are circular, i.e. abcd == bcda):
    //   //
    //   // (1) a2 b2 b0 a0: A contains B
    //   // (2) a2 a0 b0 b2: B contains A
    //   // (3) a2 a0 b2 b0: A and B are disjoint
    //   // (4) a2 b0 a0 b2: A and B intersect in one wedge
    //   // (5) a2 b2 a0 b0: A and B intersect in one wedge
    //   // (6) a2 b0 b2 a0: A and B intersect in two wedges
    //   //
    //   // In cases (4-6), the boundaries of A and B cross (i.e. the boundary
    //   // of A intersects the interior and exterior of B and vice versa).
    //   // Thus we want to distinguish cases (1), (2-3), and (4-6).
    //   //
    //   // Note that the vertices may satisfy more than one of the edge
    //   // orderings above if two or more vertices are the same. The tests
    //   // below are written so that we take the most favorable
    //   // interpretation, i.e. preferring (1) over (2-3) over (4-6). In
    //   // particular note that if orderedCCW(a,b,c,o) returns true, it may be
    //   // possible that orderedCCW(c,b,a,o) is also true (if a == b or b == c).
    //
    //   if (S2.orderedCCW(a0, a2, b2, ab1)) {
    //   // The cases with this vertex ordering are 1, 5, and 6,
    //   // although case 2 is also possible if a2 == b2.
    //   if (S2.orderedCCW(b2, b0, a0, ab1)) {
    //   return 1; // Case 1 (A contains B)
    // }
    //
    // // We are in case 5 or 6, or case 2 if a2 == b2.
    // return (a2.equals(b2)) ? 0 : -1; // Case 2 vs. 5,6.
    // }
    // // We are in case 2, 3, or 4.
    // return S2.orderedCCW(a0, b0, a2, ab1) ? 0 : -1; // Case 2,3 vs. 4.
    // }
    // }
    //
    // /**
    //  * Return true if edge AB crosses CD at a point that is interior to both
    //  * edges. Properties:
    //  *
    //  *  (1) simpleCrossing(b,a,c,d) == simpleCrossing(a,b,c,d) (2)
    //  * simpleCrossing(c,d,a,b) == simpleCrossing(a,b,c,d)
    //  */
    // public static boolean simpleCrossing(S2Point a, S2Point b, S2Point c, S2Point d) {
    //   // We compute simpleCCW() for triangles ACB, CBD, BDA, and DAC. All
    //   // of these triangles need to have the same orientation (CW or CCW)
    //   // for an intersection to exist. Note that this is slightly more
    //   // restrictive than the corresponding definition for planar edges,
    //   // since we need to exclude pairs of line segments that would
    //   // otherwise "intersect" by crossing two antipodal points.
    //
    //   S2Point ab = S2Point.crossProd(a, b);
    //   double acb = -(ab.dotProd(c));
    //   double bda = ab.dotProd(d);
    //   if (acb * bda <= 0) {
    //     return false;
    //   }
    //
    //   S2Point cd = S2Point.crossProd(c, d);
    //   double cbd = -(cd.dotProd(b));
    //   double dac = cd.dotProd(a);
    //   return (acb * cbd > 0) && (acb * dac > 0);
    // }
    //
    // /**
    //  * Like SimpleCrossing, except that points that lie exactly on a line are
    //  * arbitrarily classified as being on one side or the other (according to the
    //  * rules of S2.robustCCW). It returns +1 if there is a crossing, -1 if there
    //  * is no crossing, and 0 if any two vertices from different edges are the
    //  * same. Returns 0 or -1 if either edge is degenerate. Properties of
    //  * robustCrossing:
    //  *
    //  *  (1) robustCrossing(b,a,c,d) == robustCrossing(a,b,c,d) (2)
    //  * robustCrossing(c,d,a,b) == robustCrossing(a,b,c,d) (3)
    //  * robustCrossing(a,b,c,d) == 0 if a==c, a==d, b==c, b==d (3)
    //  * robustCrossing(a,b,c,d) <= 0 if a==b or c==d
    //  *
    //  *  Note that if you want to check an edge against a *chain* of other edges,
    //  * it is much more efficient to use an EdgeCrosser (above).
    //  */
    // public static int robustCrossing(S2Point a, S2Point b, S2Point c, S2Point d) {
    //   // For there to be a crossing, the triangles ACB, CBD, BDA, DAC must
    //   // all have the same orientation (clockwise or counterclockwise).
    //   //
    //   // First we compute the orientation of ACB and BDA. We permute the
    //   // arguments to robustCCW so that we can reuse the cross-product of A and B.
    //   // Recall that when the arguments to robustCCW are permuted, the sign of the
    //   // result changes according to the sign of the permutation. Thus ACB and
    //   // ABC are oppositely oriented, while BDA and ABD are the same.
    //   S2Point aCrossB = S2Point.crossProd(a, b);
    //   int acb = -S2.robustCCW(a, b, c, aCrossB);
    //   int bda = S2.robustCCW(a, b, d, aCrossB);
    //
    //   // If any two vertices are the same, the result is degenerate.
    //   if ((bda & acb) == 0) {
    //     return 0;
    //   }
    //
    //   // If ABC and BDA have opposite orientations (the most common case),
    //   // there is no crossing.
    //   if (bda != acb) {
    //     return -1;
    //   }
    //
    //   // Otherwise we compute the orientations of CBD and DAC, and check whether
    //   // their orientations are compatible with the other two triangles.
    //   S2Point cCrossD = S2Point.crossProd(c, d);
    //   int cbd = -S2.robustCCW(c, d, b, cCrossD);
    //   if (cbd != acb) {
    //     return -1;
    //   }
    //
    //   int dac = S2.robustCCW(c, d, a, cCrossD);
    //   return (dac == acb) ? 1 : -1;
    // }
    //
    // /**
    //  * Given two edges AB and CD where at least two vertices are identical (i.e.
    //  * robustCrossing(a,b,c,d) == 0), this function defines whether the two edges
    //  * "cross" in a such a way that point-in-polygon containment tests can be
    //  * implemented by counting the number of edge crossings. The basic rule is
    //  * that a "crossing" occurs if AB is encountered after CD during a CCW sweep
    //  * around the shared vertex starting from a fixed reference point.
    //  *
    //  *  Note that according to this rule, if AB crosses CD then in general CD does
    //  * not cross AB. However, this leads to the correct result when counting
    //  * polygon edge crossings. For example, suppose that A,B,C are three
    //  * consecutive vertices of a CCW polygon. If we now consider the edge
    //  * crossings of a segment BP as P sweeps around B, the crossing number changes
    //  * parity exactly when BP crosses BA or BC.
    //  *
    //  *  Useful properties of VertexCrossing (VC):
    //  *
    //  *  (1) VC(a,a,c,d) == VC(a,b,c,c) == false (2) VC(a,b,a,b) == VC(a,b,b,a) ==
    //  * true (3) VC(a,b,c,d) == VC(a,b,d,c) == VC(b,a,c,d) == VC(b,a,d,c) (3) If
    //  * exactly one of a,b equals one of c,d, then exactly one of VC(a,b,c,d) and
    //  * VC(c,d,a,b) is true
    //  *
    //  * It is an error to call this method with 4 distinct vertices.
    //  */
    // public static boolean vertexCrossing(S2Point a, S2Point b, S2Point c, S2Point d) {
    //   // If A == B or C == D there is no intersection. We need to check this
    //   // case first in case 3 or more input points are identical.
    //   if (a.equals(b) || c.equals(d)) {
    //     return false;
    //   }
    //
    //   // If any other pair of vertices is equal, there is a crossing if and only
    //   // if orderedCCW() indicates that the edge AB is further CCW around the
    //   // shared vertex than the edge CD.
    //   if (a.equals(d)) {
    //     return S2.orderedCCW(S2.ortho(a), c, b, a);
    //   }
    //   if (b.equals(c)) {
    //     return S2.orderedCCW(S2.ortho(b), d, a, b);
    //   }
    //   if (a.equals(c)) {
    //     return S2.orderedCCW(S2.ortho(a), d, b, a);
    //   }
    //   if (b.equals(d)) {
    //     return S2.orderedCCW(S2.ortho(b), c, a, b);
    //   }
    //
    //   // assert (false);
    //   return false;
    // }
    //
    // /**
    //  * A convenience function that calls robustCrossing() to handle cases where
    //  * all four vertices are distinct, and VertexCrossing() to handle cases where
    //  * two or more vertices are the same. This defines a crossing function such
    //  * that point-in-polygon containment tests can be implemented by simply
    //  * counting edge crossings.
    //  */
    // public static boolean edgeOrVertexCrossing(S2Point a, S2Point b, S2Point c, S2Point d) {
    //   int crossing = robustCrossing(a, b, c, d);
    //   if (crossing < 0) {
    //     return false;
    //   }
    //   if (crossing > 0) {
    //     return true;
    //   }
    //   return vertexCrossing(a, b, c, d);
    // }
    //
    // static class CloserResult {
    //   private double dmin2;
    //   private S2Point vmin;
    //
    //   public double getDmin2() {
    //   return this.dmin2;
    // }
    //
    //   public S2Point getVmin() {
    //   return this.vmin;
    // }
    //
    //   public CloserResult(double dmin2, S2Point vmin) {
    //   this.dmin2 = dmin2;
    //   this.vmin = vmin;
    // }
    //
    // public void replaceIfCloser(S2Point x, S2Point y) {
    //   // If the squared distance from x to y is less than dmin2, then replace
    //   // vmin by y and update dmin2 accordingly.
    //   double d2 = S2Point.minus(x, y).norm2();
    //   if (d2 < this.dmin2 || (d2 == this.dmin2 && y.lessThan(this.vmin))) {
    //     this.dmin2 = d2;
    //     this.vmin = y;
    //   }
    // }
    // }
    //
    // /*
    //  * Given two edges AB and CD such that robustCrossing() is true, return their
    //  * intersection point. Useful properties of getIntersection (GI):
    //  *
    //  * (1) GI(b,a,c,d) == GI(a,b,d,c) == GI(a,b,c,d) (2) GI(c,d,a,b) ==
    //  * GI(a,b,c,d)
    //  *
    //  * The returned intersection point X is guaranteed to be close to the edges AB
    //  * and CD, but if the edges intersect at a very small angle then X may not be
    //  * close to the true mathematical intersection point P. See the description of
    //  * "DEFAULT_INTERSECTION_TOLERANCE" below for details.
    //  */
    // public static S2Point getIntersection(S2Point a0, S2Point a1, S2Point b0, S2Point b1) {
    //   Preconditions.checkArgument(robustCrossing(a0, a1, b0, b1) > 0,
    //       "Input edges a0a1 and b0b1 muct have a true robustCrossing.");
    //
    //   // We use robustCrossProd() to get accurate results even when two endpoints
    //   // are close together, or when the two line segments are nearly parallel.
    //   S2Point aNorm = S2Point.normalize(S2.robustCrossProd(a0, a1));
    //   S2Point bNorm = S2Point.normalize(S2.robustCrossProd(b0, b1));
    //   S2Point x = S2Point.normalize(S2.robustCrossProd(aNorm, bNorm));
    //
    //   // Make sure the intersection point is on the correct side of the sphere.
    //   // Since all vertices are unit length, and edges are less than 180 degrees,
    //   // (a0 + a1) and (b0 + b1) both have positive dot product with the
    //   // intersection point. We use the sum of all vertices to make sure that the
    //   // result is unchanged when the edges are reversed or exchanged.
    //   if (x.dotProd(S2Point.add(S2Point.add(a0, a1), S2Point.add(b0, b1))) < 0) {
    //     x = S2Point.neg(x);
    //   }
    //
    //   // The calculation above is sufficient to ensure that "x" is within
    //   // DEFAULT_INTERSECTION_TOLERANCE of the great circles through (a0,a1) and
    //   // (b0,b1).
    //   // However, if these two great circles are very close to parallel, it is
    //   // possible that "x" does not lie between the endpoints of the given line
    //   // segments. In other words, "x" might be on the great circle through
    //   // (a0,a1) but outside the range covered by (a0,a1). In this case we do
    //   // additional clipping to ensure that it does.
    //
    //   if (S2.orderedCCW(a0, x, a1, aNorm) && S2.orderedCCW(b0, x, b1, bNorm)) {
    //     return x;
    //   }
    //
    //   // Find the acceptable endpoint closest to x and return it. An endpoint is
    //   // acceptable if it lies between the endpoints of the other line segment.
    //   CloserResult r = new CloserResult(10, x);
    //   if (S2.orderedCCW(b0, a0, b1, bNorm)) {
    //     r.replaceIfCloser(x, a0);
    //   }
    //   if (S2.orderedCCW(b0, a1, b1, bNorm)) {
    //     r.replaceIfCloser(x, a1);
    //   }
    //   if (S2.orderedCCW(a0, b0, a1, aNorm)) {
    //     r.replaceIfCloser(x, b0);
    //   }
    //   if (S2.orderedCCW(a0, b1, a1, aNorm)) {
    //     r.replaceIfCloser(x, b1);
    //   }
    //   return r.getVmin();
    // }
    //
    // /**
    //  * Given a point X and an edge AB, return the distance ratio AX / (AX + BX).
    //  * If X happens to be on the line segment AB, this is the fraction "t" such
    //  * that X == Interpolate(A, B, t). Requires that A and B are distinct.
    //  */
    // public static double getDistanceFraction(S2Point x, S2Point a0, S2Point a1) {
    //   Preconditions.checkArgument(!a0.equals(a1));
    //   double d0 = x.angle(a0);
    //   double d1 = x.angle(a1);
    //   return d0 / (d0 + d1);
    // }
    //
    // /**
    //  * Return the minimum distance from X to any point on the edge AB. The result
    //  * is very accurate for small distances but may have some numerical error if
    //  * the distance is large (approximately Pi/2 or greater). The case A == B is
    //  * handled correctly. Note: x, a and b must be of unit length. Throws
    //  * IllegalArgumentException if this is not the case.
    //  */
    // public static getDistance(x:S2Point , a:S2Point , b:S2Point ):S1Angle  {
    //   return this.getDistance(x, a, b, S2.robustCrossProd(a, b));
    // }
    /**
     * A slightly more efficient version of getDistance() where the cross product
     * of the two endpoints has been precomputed. The cross product does not need
     * to be normalized, but should be computed using S2.robustCrossProd() for the
     * most accurate results.
     */
    S2EdgeUtil.getDistance = function (x, a, b, aCrossB) {
        // Preconditions.checkArgument(S2.isUnitLength(x));
        // Preconditions.checkArgument(S2.isUnitLength(a));
        // Preconditions.checkArgument(S2.isUnitLength(b));
        if (aCrossB === void 0) { aCrossB = S2_1.S2.robustCrossProd(a, b); }
        // There are three cases. If X is located in the spherical wedge defined by
        // A, B, and the axis A x B, then the closest point is on the segment AB.
        // Otherwise the closest point is either A or B; the dividing line between
        // these two cases is the great circle passing through (A x B) and the
        // midpoint of AB.
        if (S2_1.S2.simpleCCW(aCrossB, a, x) && S2_1.S2.simpleCCW(x, b, aCrossB)) {
            // The closest point to X lies on the segment AB. We compute the distance
            // to the corresponding great circle. The result is accurate for small
            // distances but not necessarily for large distances (approaching Pi/2).
            var sinDist = x.dotProd(aCrossB).abs().dividedBy(aCrossB.norm());
            return new S1Angle_1.S1Angle(decimal_1.Decimal.asin(decimal_1.Decimal.min(1.0, sinDist)));
        }
        // Otherwise, the closest point is either A or B. The cheapest method is
        // just to compute the minimum of the two linear (as opposed to spherical)
        // distances and convert the result to an angle. Again, this method is
        // accurate for small but not large distances (approaching Pi).
        var linearDist2 = decimal_1.Decimal.min(S2Point_1.S2Point.minus(x, a).norm2(), S2Point_1.S2Point.minus(x, b).norm2());
        return new S1Angle_1.S1Angle(decimal_1.Decimal.asin(decimal_1.Decimal.min(1.0, linearDist2.sqrt().times(0.5))).times(2));
    };
    return S2EdgeUtil;
}());
exports.S2EdgeUtil = S2EdgeUtil;
//# sourceMappingURL=S2EdgeUtil.js.map

/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright 2005 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var S2Cell_1 = __webpack_require__(107);
var S2CellId_1 = __webpack_require__(75);
var S2CellUnion_1 = __webpack_require__(145);
var S2Projections_1 = __webpack_require__(76);
var decimal_1 = __webpack_require__(23);
/**
 * An S2RegionCoverer is a class that allows arbitrary regions to be
 * approximated as unions of cells (S2CellUnion). This is useful for
 * implementing various sorts of search and precomputation operations.
 *
 * Typical usage: {@code S2RegionCoverer coverer; coverer.setMaxCells(5); S2Cap
 * cap = S2Cap.fromAxisAngle(...); S2CellUnion covering;
 * coverer.getCovering(cap, covering); * }
 *
 * This yields a cell union of at most 5 cells that is guaranteed to cover the
 * given cap (a disc-shaped region on the sphere).
 *
 *  The approximation algorithm is not optimal but does a pretty good job in
 * practice. The output does not always use the maximum number of cells allowed,
 * both because this would not always yield a better approximation, and because
 * max_cells() is a limit on how much work is done exploring the possible
 * covering as well as a limit on the final output size.
 *
 *  One can also generate interior coverings, which are sets of cells which are
 * entirely contained within a region. Interior coverings can be empty, even for
 * non-empty regions, if there are no cells that satisfy the provided
 * constraints and are contained by the region. Note that for performance
 * reasons, it is wise to specify a max_level when computing interior coverings
 * - otherwise for regions with small or zero area, the algorithm may spend a
 * lot of time subdividing cells all the way to leaf level to try to find
 * contained cells.
 *
 *  This class is thread-unsafe. Simultaneous calls to any of the getCovering
 * methods will conflict and produce unpredictable results.
 *
 */
var S2RegionCoverer = (function () {
    /**
     * Default constructor, sets all fields to default values.
     */
    function S2RegionCoverer() {
        this.minLevel = 0;
        this.maxLevel = S2CellId_1.S2CellId.MAX_LEVEL;
        this.levelMod = 1;
        this.maxCells = S2RegionCoverer.DEFAULT_MAX_CELLS;
        this.region = null;
        this.result = [];
        this.candidateQueue = new PriorityQueue();
    }
    // Set the minimum and maximum cell level to be used. The default is to use
    // all cell levels. Requires: max_level() >= min_level().
    //
    // To find the cell level corresponding to a given physical distance, use
    // the S2Cell metrics defined in s2.h. For example, to find the cell
    // level that corresponds to an average edge length of 10km, use:
    //
    // int level = S2::kAvgEdge.GetClosestLevel(
    // geostore::S2Earth::KmToRadians(length_km));
    //
    // Note: min_level() takes priority over max_cells(), i.e. cells below the
    // given level will never be used even if this causes a large number of
    // cells to be returned.
    /**
     * Sets the minimum level to be used.
     */
    S2RegionCoverer.prototype.setMinLevel = function (minLevel) {
        // assert (minLevel >= 0 && minLevel <= S2CellId.MAX_LEVEL);
        this.minLevel = Math.max(0, Math.min(S2CellId_1.S2CellId.MAX_LEVEL, minLevel));
        return this;
    };
    /**
     * Sets the maximum level to be used.
     */
    S2RegionCoverer.prototype.setMaxLevel = function (maxLevel) {
        // assert (maxLevel >= 0 && maxLevel <= S2CellId.MAX_LEVEL);
        this.maxLevel = Math.max(0, Math.min(S2CellId_1.S2CellId.MAX_LEVEL, maxLevel));
        return this;
    };
    /**
     * If specified, then only cells where (level - min_level) is a multiple of
     * "level_mod" will be used (default 1). This effectively allows the branching
     * factor of the S2CellId hierarchy to be increased. Currently the only
     * parameter values allowed are 1, 2, or 3, corresponding to branching factors
     * of 4, 16, and 64 respectively.
     */
    S2RegionCoverer.prototype.setLevelMod = function (levelMod) {
        // assert (levelMod >= 1 && levelMod <= 3);
        this.levelMod = Math.max(1, Math.min(3, levelMod));
        return this;
    };
    /**
     * Sets the maximum desired number of cells in the approximation (defaults to
     * kDefaultMaxCells). Note the following:
     *
     * <ul>
     * <li>For any setting of max_cells(), up to 6 cells may be returned if that
     * is the minimum number of cells required (e.g. if the region intersects all
     * six face cells). Up to 3 cells may be returned even for very tiny convex
     * regions if they happen to be located at the intersection of three cube
     * faces.
     *
     * <li>For any setting of max_cells(), an arbitrary number of cells may be
     * returned if min_level() is too high for the region being approximated.
     *
     * <li>If max_cells() is less than 4, the area of the covering may be
     * arbitrarily large compared to the area of the original region even if the
     * region is convex (e.g. an S2Cap or S2LatLngRect).
     * </ul>
     *
     * Accuracy is measured by dividing the area of the covering by the area of
     * the original region. The following table shows the median and worst case
     * values for this area ratio on a test case consisting of 100,000 spherical
     * caps of random size (generated using s2regioncoverer_unittest):
     *
     * <pre>
     * max_cells: 3 4 5 6 8 12 20 100 1000
     * median ratio: 5.33 3.32 2.73 2.34 1.98 1.66 1.42 1.11 1.01
     * worst case: 215518 14.41 9.72 5.26 3.91 2.75 1.92 1.20 1.02
     * </pre>
     */
    S2RegionCoverer.prototype.setMaxCells = function (maxCells) {
        this.maxCells = maxCells;
        return this;
    };
    /**
     * Computes a list of cell ids that covers the given region and satisfies the
     * various restrictions specified above.
     *
     * @param region The region to cover
     * @param covering The list filled in by this method
     */
    S2RegionCoverer.prototype.getCoveringCells = function (region) {
        // Rather than just returning the raw list of cell ids generated by
        // GetCoveringInternal(), we construct a cell union and then denormalize it.
        // This has the effect of replacing four child cells with their parent
        // whenever this does not violate the covering parameters specified
        // (min_level, level_mod, etc). This strategy significantly reduces the
        // number of cells returned in many cases, and it is cheap compared to
        // computing the covering in the first place.
        var tmp = this.getCoveringUnion(region);
        return tmp.denormalize(this.minLevel, this.levelMod);
    };
    /**
     * Computes a list of cell ids that is contained within the given region and
     * satisfies the various restrictions specified above.
     *
     * @param region The region to fill
     * @param interior The list filled in by this method
     */
    S2RegionCoverer.prototype.getInteriorCoveringCells = function (region) {
        var tmp = this.getInteriorCoveringUnion(region);
        return tmp.denormalize(this.minLevel, this.levelMod);
    };
    /**
     * Return a normalized cell union that covers the given region and satisfies
     * the restrictions *EXCEPT* for min_level() and level_mod(). These criteria
     * cannot be satisfied using a cell union because cell unions are
     * automatically normalized by replacing four child cells with their parent
     * whenever possible. (Note that the list of cell ids passed to the cell union
     * constructor does in fact satisfy all the given restrictions.)
     */
    S2RegionCoverer.prototype.getCoveringUnion = function (region, covering) {
        if (covering === void 0) { covering = new S2CellUnion_1.S2CellUnion(); }
        this.interiorCovering = false;
        this.getCoveringInternal(region);
        covering.initSwap(this.result);
        return covering;
    };
    /**
     * Return a normalized cell union that is contained within the given region
     * and satisfies the restrictions *EXCEPT* for min_level() and level_mod().
     */
    S2RegionCoverer.prototype.getInteriorCoveringUnion = function (region, covering) {
        if (covering === void 0) { covering = new S2CellUnion_1.S2CellUnion(); }
        this.interiorCovering = true;
        this.getCoveringInternal(region);
        covering.initSwap(this.result);
        return covering;
    };
    // /**
    //  * Given a connected region and a starting point, return a set of cells at the
    //  * given level that cover the region.
    //  */
    // public static getSimpleCovering(
    //     region:S2Region , start:S2Point , level:number):S2CellId[] {
    //   S2RegionCoverer.floodFill(region, S2CellId.fromPoint(start).parentL(level));
    // }
    /**
     * If the cell intersects the given region, return a new candidate with no
     * children, otherwise return null. Also marks the candidate as "terminal" if
     * it should not be expanded further.
     */
    S2RegionCoverer.prototype.newCandidate = function (cell) {
        if (!this.region.mayIntersectC(cell)) {
            // console.log("NOT INTERSECTING",this.region);
            return null;
        }
        var isTerminal = false;
        if (cell.level >= this.minLevel) {
            if (this.interiorCovering) {
                if (this.region.containsC(cell)) {
                    isTerminal = true;
                }
                else if (cell.level + this.levelMod > this.maxLevel) {
                    return null;
                }
            }
            else {
                if (cell.level + this.levelMod > this.maxLevel || this.region.containsC(cell)) {
                    isTerminal = true;
                }
            }
        }
        var candidate = new Candidate();
        candidate.cell = cell;
        candidate.isTerminal = isTerminal;
        candidate.numChildren = 0;
        if (!isTerminal) {
            candidate.children = Array.apply(null, new Array(1 << this.maxChildrenShift()));
        }
        this.candidatesCreatedCounter++;
        return candidate;
    };
    /** Return the log base 2 of the maximum number of children of a candidate. */
    S2RegionCoverer.prototype.maxChildrenShift = function () {
        return 2 * this.levelMod;
    };
    /**
     * Process a candidate by either adding it to the result list or expanding its
     * children and inserting it into the priority queue. Passing an argument of
     * NULL does nothing.
     */
    S2RegionCoverer.prototype.addCandidate = function (candidate) {
        if (candidate == null) {
            return;
        }
        if (candidate.isTerminal) {
            this.result.push(candidate.cell.id);
            return;
        }
        // assert (candidate.numChildren == 0);
        // Expand one level at a time until we hit min_level_ to ensure that
        // we don't skip over it.
        var numLevels = (candidate.cell.level < this.minLevel) ? 1 : this.levelMod;
        var numTerminals = this.expandChildren(candidate, candidate.cell, numLevels);
        if (candidate.numChildren == 0) {
        }
        else if (!this.interiorCovering && numTerminals == 1 << this.maxChildrenShift()
            && candidate.cell.level >= this.minLevel) {
            // Optimization: add the parent cell rather than all of its children.
            // We can't do this for interior coverings, since the children just
            // intersect the region, but may not be contained by it - we need to
            // subdivide them further.
            candidate.isTerminal = true;
            this.addCandidate(candidate);
        }
        else {
            // We negate the priority so that smaller absolute priorities are returned
            // first. The heuristic is designed to refine the largest cells first,
            // since those are where we have the largest potential gain. Among cells
            // at the same level, we prefer the cells with the smallest number of
            // intersecting children. Finally, we prefer cells that have the smallest
            // number of children that cannot be refined any further.
            var priority = -((((candidate.cell.level << this.maxChildrenShift()) + candidate.numChildren)
                << this.maxChildrenShift()) + numTerminals);
            this.candidateQueue.add(new QueueEntry(priority, candidate));
        }
    };
    /**
     * Populate the children of "candidate" by expanding the given number of
     * levels from the given cell. Returns the number of children that were marked
     * "terminal".
     */
    S2RegionCoverer.prototype.expandChildren = function (candidate, cell, numLevels) {
        numLevels--;
        var childCells = cell.subdivide();
        var numTerminals = 0;
        for (var i = 0; i < 4; ++i) {
            if (numLevels > 0) {
                if (this.region.mayIntersectC(childCells[i])) {
                    numTerminals += this.expandChildren(candidate, childCells[i], numLevels);
                }
                continue;
            }
            var child = this.newCandidate(childCells[i]);
            if (child != null) {
                candidate.children[candidate.numChildren++] = child;
                if (child.isTerminal) {
                    ++numTerminals;
                }
            }
        }
        return numTerminals;
    };
    /** Computes a set of initial candidates that cover the given region. */
    S2RegionCoverer.prototype.getInitialCandidates = function () {
        // Optimization: if at least 4 cells are desired (the normal case),
        // start with a 4-cell covering of the region's bounding cap. This
        // lets us skip quite a few levels of refinement when the region to
        // be covered is relatively small.
        if (this.maxCells >= 4) {
            // Find the maximum level such that the bounding cap contains at most one
            // cell vertex at that level.
            var cap = this.region.getCapBound();
            var level = decimal_1.Decimal.min(S2Projections_1.S2Projections.MIN_WIDTH.getMaxLevel(cap.angle().radians.times(2)), decimal_1.Decimal.min(this.maxLevel, S2CellId_1.S2CellId.MAX_LEVEL - 1)).toNumber();
            if (this.levelMod > 1 && level > this.minLevel) {
                level -= (level - this.minLevel) % this.levelMod;
            }
            // We don't bother trying to optimize the level == 0 case, since more than
            // four face cells may be required.
            if (level > 0) {
                // Find the leaf cell containing the cap axis, and determine which
                // subcell of the parent cell contains it.
                // ArrayList<S2CellId> base = new ArrayList<>(4);
                var id = S2CellId_1.S2CellId.fromPoint(cap.axis);
                var base = id.getVertexNeighbors(level);
                for (var i = 0; i < base.length; ++i) {
                    this.addCandidate(this.newCandidate(new S2Cell_1.S2Cell(base[i])));
                }
                return;
            }
        }
        // Default: start with all six cube faces.
        for (var face = 0; face < 6; ++face) {
            this.addCandidate(this.newCandidate(S2RegionCoverer.FACE_CELLS[face]));
        }
    };
    /** Generates a covering and stores it in result. */
    S2RegionCoverer.prototype.getCoveringInternal = function (region) {
        // Strategy: Start with the 6 faces of the cube. Discard any
        // that do not intersect the shape. Then repeatedly choose the
        // largest cell that intersects the shape and subdivide it.
        //
        // result contains the cells that will be part of the output, while the
        // priority queue contains cells that we may still subdivide further. Cells
        // that are entirely contained within the region are immediately added to
        // the output, while cells that do not intersect the region are immediately
        // discarded.
        // Therefore pq_ only contains cells that partially intersect the region.
        // Candidates are prioritized first according to cell size (larger cells
        // first), then by the number of intersecting children they have (fewest
        // children first), and then by the number of fully contained children
        // (fewest children first).
        if (!(this.candidateQueue.size() == 0 && this.result.length == 0)) {
            throw new Error('preconditions are not satisfied');
        }
        // Preconditions.checkState(this.candidateQueue.isEmpty() && this.result.isEmpty());
        this.region = region;
        this.candidatesCreatedCounter = 0;
        this.getInitialCandidates();
        while (this.candidateQueue.size() !== 0 && (!this.interiorCovering || this.result.length < this.maxCells)) {
            var candidate = this.candidateQueue.poll().candidate;
            // logger.info("Pop: " + candidate.cell.id());
            if (candidate.cell.level < this.minLevel || candidate.numChildren == 1
                || this.result.length + (this.interiorCovering ? 0 : this.candidateQueue.size()) + candidate.numChildren
                    <= this.maxCells) {
                // Expand this candidate into its children.
                for (var i = 0; i < candidate.numChildren; ++i) {
                    this.addCandidate(candidate.children[i]);
                }
            }
            else if (this.interiorCovering) {
            }
            else {
                candidate.isTerminal = true;
                this.addCandidate(candidate);
            }
        }
        this.candidateQueue.clear();
        this.region = null;
    };
    /**
     * By default, the covering uses at most 8 cells at any level. This gives a
     * reasonable tradeoff between the number of cells used and the accuracy of
     * the approximation (see table below).
     */
    S2RegionCoverer.DEFAULT_MAX_CELLS = 8;
    S2RegionCoverer.FACE_CELLS = new Array(6).map(function (face) { return S2Cell_1.S2Cell.fromFacePosLevel(face, 0, 0); });
    return S2RegionCoverer;
}());
exports.S2RegionCoverer = S2RegionCoverer;
var Candidate = (function () {
    function Candidate() {
    }
    // elements.
    Candidate.prototype.toString = function () {
        return "isTermina: " + this.isTerminal + " - Cell: " + this.cell.toString();
    };
    return Candidate;
}());
var PriorityQueue = (function () {
    function PriorityQueue() {
        this.clear();
    }
    PriorityQueue.prototype.add = function (item) {
        this.items.push(item);
        this.items.sort(function (a, b) { return a.compare(b); });
    };
    PriorityQueue.prototype.clear = function () {
        this.items = [];
    };
    PriorityQueue.prototype.size = function () {
        return this.items.length;
    };
    PriorityQueue.prototype.poll = function () {
        return this.items.splice(0, 1)[0];
    };
    return PriorityQueue;
}());
var QueueEntry = (function () {
    function QueueEntry(id, candidate) {
        this.id = id;
        this.candidate = candidate;
    }
    QueueEntry.prototype.compare = function (other) {
        return this.id < other.id ? 1 : (this.id > other.id ? -1 : 0);
    };
    return QueueEntry;
}());
//# sourceMappingURL=S2RegionCoverer.js.map

/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nodes2ts_1 = __webpack_require__(71);
var S2Util = (function () {
    function S2Util() {
    }
    S2Util.latLngRectFromQueryRectangleInput = function (geoQueryRequest) {
        var queryRectangleRequest = geoQueryRequest;
        var minPoint = queryRectangleRequest.MinPoint;
        var maxPoint = queryRectangleRequest.MaxPoint;
        var latLngRect = null;
        if (minPoint != null && maxPoint != null) {
            var minLatLng = nodes2ts_1.S2LatLng.fromDegrees(minPoint.latitude, minPoint.longitude);
            var maxLatLng = nodes2ts_1.S2LatLng.fromDegrees(maxPoint.latitude, maxPoint.longitude);
            latLngRect = nodes2ts_1.S2LatLngRect.fromLatLng(minLatLng, maxLatLng);
        }
        return latLngRect;
    };
    S2Util.getBoundingLatLngRectFromQueryRadiusInput = function (geoQueryRequest) {
        var centerPoint = geoQueryRequest.CenterPoint;
        var radiusInMeter = geoQueryRequest.RadiusInMeter;
        var centerLatLng = nodes2ts_1.S2LatLng.fromDegrees(centerPoint.latitude, centerPoint.longitude);
        var latReferenceUnit = centerPoint.latitude > 0.0 ? -1.0 : 1.0;
        var latReferenceLatLng = nodes2ts_1.S2LatLng.fromDegrees(centerPoint.latitude + latReferenceUnit, centerPoint.longitude);
        var lngReferenceUnit = centerPoint.longitude > 0.0 ? -1.0 : 1.0;
        var lngReferenceLatLng = nodes2ts_1.S2LatLng.fromDegrees(centerPoint.latitude, centerPoint.longitude
            + lngReferenceUnit);
        var latForRadius = radiusInMeter / centerLatLng.getEarthDistance(latReferenceLatLng).toNumber();
        var lngForRadius = radiusInMeter / centerLatLng.getEarthDistance(lngReferenceLatLng).toNumber();
        var minLatLng = nodes2ts_1.S2LatLng.fromDegrees(centerPoint.latitude - latForRadius, centerPoint.longitude - lngForRadius);
        var maxLatLng = nodes2ts_1.S2LatLng.fromDegrees(centerPoint.latitude + latForRadius, centerPoint.longitude + lngForRadius);
        return nodes2ts_1.S2LatLngRect.fromLatLng(minLatLng, maxLatLng);
    };
    return S2Util;
}());
exports.S2Util = S2Util;


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GeohashRange_1 = __webpack_require__(366);
var Covering = (function () {
    function Covering(cellIds) {
        this.cellIds = cellIds;
    }
    Covering.prototype.getGeoHashRanges = function (hashKeyLength) {
        var ranges = [];
        this.cellIds.forEach(function (outerRange) {
            var hashRange = new GeohashRange_1.GeohashRange(outerRange.rangeMin().id, outerRange.rangeMax().id);
            ranges.push.apply(ranges, hashRange.trySplit(hashKeyLength));
        });
        return ranges;
    };
    Covering.prototype.getNumberOfCells = function () {
        return this.cellIds.length;
    };
    return Covering;
}());
exports.Covering = Covering;


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GeoDataManagerConfiguration_1 = __webpack_require__(146);
var S2Manager_1 = __webpack_require__(104);
var Long = __webpack_require__(49);
var GeohashRange = (function () {
    function GeohashRange(min, max) {
        this.rangeMin = min instanceof Long ? min : Long.fromNumber(min);
        this.rangeMax = max instanceof Long ? max : Long.fromNumber(max);
    }
    GeohashRange.prototype.tryMerge = function (range) {
        if (range.rangeMin.subtract(this.rangeMax).lessThanOrEqual(GeoDataManagerConfiguration_1.GeoDataManagerConfiguration.MERGE_THRESHOLD)
            && range.rangeMin.greaterThan(this.rangeMax)) {
            this.rangeMax = range.rangeMax;
            return true;
        }
        if (this.rangeMin.subtract(range.rangeMax).lessThanOrEqual(GeoDataManagerConfiguration_1.GeoDataManagerConfiguration.MERGE_THRESHOLD)
            && this.rangeMin.greaterThan(range.rangeMax)) {
            this.rangeMin = range.rangeMin;
            return true;
        }
        return false;
    };
    /*
     * Try to split the range to multiple ranges based on the hash key.
     *
     * e.g., for the following range:
     *
     * min: 123456789
     * max: 125678912
     *
     * when the hash key length is 3, we want to split the range to:
     *
     * 1
     * min: 123456789
     * max: 123999999
     *
     * 2
     * min: 124000000
     * max: 124999999
     *
     * 3
     * min: 125000000
     * max: 125678912
     *
     * For this range:
     *
     * min: -125678912
     * max: -123456789
     *
     * we want:
     *
     * 1
     * min: -125678912
     * max: -125000000
     *
     * 2
     * min: -124999999
     * max: -124000000
     *
     * 3
     * min: -123999999
     * max: -123456789
     */
    GeohashRange.prototype.trySplit = function (hashKeyLength) {
        var result = [];
        var minHashKey = S2Manager_1.S2Manager.generateHashKey(this.rangeMin, hashKeyLength);
        var maxHashKey = S2Manager_1.S2Manager.generateHashKey(this.rangeMax, hashKeyLength);
        var denominator = Math.pow(10, this.rangeMin.toString().length - minHashKey.toString().length);
        if (minHashKey.equals(maxHashKey)) {
            result.push(this);
        }
        else {
            for (var l = minHashKey; l.lessThanOrEqual(maxHashKey); l = l.add(1)) {
                if (l.greaterThan(0)) {
                    result.push(new GeohashRange(l.equals(minHashKey) ? this.rangeMin : l.multiply(denominator), l.equals(maxHashKey) ? this.rangeMax : l.add(1).multiply(denominator).subtract(1)));
                }
                else {
                    result.push(new GeohashRange(l.equals(minHashKey) ? this.rangeMin : l.subtract(1).multiply(denominator).add(1), l.equals(maxHashKey) ? this.rangeMax : l.multiply(denominator)));
                }
            }
        }
        return result;
    };
    return GeohashRange;
}());
exports.GeohashRange = GeohashRange;


/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2010-2013 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Utility class.
 * */
var GeoTableUtil = (function () {
    function GeoTableUtil() {
    }
    /**
     * <p>
     * Construct a create table request object based on GeoDataManagerConfiguration. The users can update any aspect of
     * the request and call it.
     * </p>
     * Example:
     *
     * <pre>
     * AmazonDynamoDBClient ddb = new AmazonDynamoDBClient(new ClasspathPropertiesFileCredentialsProvider());
     * Region usWest2 = Region.getRegion(Regions.US_WEST_2);
     * ddb.setRegion(usWest2);
     *
     * CreateTableRequest createTableRequest = GeoTableUtil.getCreateTableRequest(config);
     * CreateTableResult createTableResult = ddb.createTable(createTableRequest);
     * </pre>
     *
     * @return Generated create table request.
     */
    GeoTableUtil.getCreateTableRequest = function (config) {
        return {
            TableName: config.tableName,
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 5
            },
            KeySchema: [
                {
                    KeyType: "HASH",
                    AttributeName: config.hashKeyAttributeName
                },
                {
                    KeyType: "RANGE",
                    AttributeName: config.rangeKeyAttributeName
                }
            ],
            AttributeDefinitions: [
                { AttributeName: config.hashKeyAttributeName, AttributeType: 'N' },
                { AttributeName: config.rangeKeyAttributeName, AttributeType: 'S' },
                { AttributeName: config.geohashAttributeName, AttributeType: 'N' }
            ],
            LocalSecondaryIndexes: [
                {
                    IndexName: config.geohashIndexName,
                    KeySchema: [
                        {
                            KeyType: 'HASH',
                            AttributeName: config.hashKeyAttributeName
                        },
                        {
                            KeyType: 'RANGE',
                            AttributeName: config.geohashAttributeName
                        }
                    ],
                    Projection: {
                        ProjectionType: 'ALL'
                    }
                }
            ]
        };
    };
    return GeoTableUtil;
}());
exports.GeoTableUtil = GeoTableUtil;


/***/ })
/******/ ]);