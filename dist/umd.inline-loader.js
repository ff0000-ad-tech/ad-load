(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("window"));
	else if(typeof define === 'function' && define.amd)
		define(["window"], factory);
	else if(typeof exports === 'object')
		exports["inlineLoader"] = factory(require("window"));
	else
		root["inlineLoader"] = factory(root["window"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixin_MixinBuilder_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixin_LoaderBase_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixin_LoaderSource_js__ = __webpack_require__(4);
/**
 * @class InlineLoader
 * @param {string} target
 * 	load target
 * @param {object} arg
 * 	Object with any of the following optional parameters for customizing the load routine.
 * @property {string} name
 * @property {boolean} cacheBuster
 * @property {function} onComplete
 * @property {function} onProgress
 * @property {function} onFail
 * @property {string} fileType
 * 	Manually assign the file type, eg: <code>css</code>, <code>script</code>, <code>html</code>
 * @desc
 * This class is designed to handle a single load a file inlined by writing it to the head
 */




class Blank {}

class InlineLoader extends Object(__WEBPACK_IMPORTED_MODULE_0__mixin_MixinBuilder_js__["a" /* mix */])(Blank).with(__WEBPACK_IMPORTED_MODULE_1__mixin_LoaderBase_js__["a" /* LoaderBase */], __WEBPACK_IMPORTED_MODULE_2__mixin_LoaderSource_js__["a" /* LoaderSource */]) {
  constructor(...args) {
    super(...args);
  }
  /**
   * @memberOf InlineLoader
   * @method load
   * @desc
   * 	Starts the load process.
   */


  load() {
    const I = this;
    let elem;

    if (I.fileType == 'css') {
      elem = I._createCssLink();
    } else if (I.fileType == 'html') {
      elem = I._createHtmlLink();
    } else {
      elem = I._createScript();
    }

    elem.charset = 'utf-8';
    elem.onload = I._handleComplete.bind(I);
    elem.onerror = I._handleFail;
    I.fileType == 'css' || I.fileType == 'html' ? elem.href = this.url : elem.src = I.url;
    document.getElementsByTagName('head')[0].appendChild(elem);
  }

  _createCssLink() {
    let elem = document.createElement('link');
    elem.rel = 'stylesheet';
    elem.type = 'text/css';
    return elem;
  }

  _createHtmlLink() {
    let elem = document.createElement('link');
    elem.rel = 'import'; // elem.async = ''

    return elem;
  }

  _createScript() {
    let elem = document.createElement('script');
    elem.type = 'text/javascript';
    return elem;
  }

  _handleComplete(event) {
    const I = this; // console.log('InlineLoader "' + I.name + '" is Complete')

    I.dataRaw = event.target;
    I.onComplete.call(I.scope, I);
  }

}
/* harmony export (immutable) */ __webpack_exports__["default"] = InlineLoader;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mix; });
let mix = superclass => new MixinBuilder(superclass);

class MixinBuilder {
  constructor(superclass) {
    this.superclass = superclass;
  }

  with(...mixins) {
    return mixins.reduce((c, mixin) => mixin(c), this.superclass);
  }

}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const LoaderBase = superclass => class extends superclass {
  constructor(...args) {
    super(...args);
    const arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};
    const L = this;

    L.onComplete = arg.onComplete || function () {};

    L.onFail = arg.onFail || function () {};

    L.onProgress = arg.onProgress || function () {};

    L.name = arg.name || '';
    L.scope = arg.scope || L;
    L.dataRaw;
    L.cacheBuster = arg.cacheBuster || false;
    L._failCalled = false;
  }

  _handleFail() {
    const L = this; // console.log( 'LoaderBase._handleFail()' )

    if (!L._failCalled) {
      L._failCalled = true;
      L.onFail.call(L.scope, L);
    }
  }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = LoaderBase;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LoaderUtils_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ad_global__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ad_global___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ad_global__);


const LoaderSource = superclass => class extends superclass {
  constructor(...args) {
    super(...args);
    const arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};
    const L = this;
    L.url = Object(__WEBPACK_IMPORTED_MODULE_1_ad_global__["matchProtocolTo"])(arguments[0] || '');

    if (arg.platformGetUrl) {
      L.platformGetUrl = arg.platformGetUrl;
      L.url = arg.platformGetUrl(L.url);
    }

    L.fileName = arg.id === undefined ? __WEBPACK_IMPORTED_MODULE_0__LoaderUtils_js__["a" /* getFileName */](L.url) : arg.id;
    L.fileType = arg.fileType || __WEBPACK_IMPORTED_MODULE_0__LoaderUtils_js__["b" /* getFileType */](L.url);
  }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = LoaderSource;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createXMLHttpRequest */
/* harmony export (immutable) */ __webpack_exports__["a"] = getFileName;
/* unused harmony export getFontName */
/* harmony export (immutable) */ __webpack_exports__["b"] = getFileType;
/* unused harmony export getFullUrl */
/* unused harmony export getUrlPrepend */
/* unused harmony export getParamsFromData */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ad_global__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ad_global___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ad_global__);
/**
 * @class LoaderUtils
 * @desc Various single use utilities for file names & paths, and query manipulations.
 * <codeblock>
 * import { LoaderUtils } from 'ad-load'
 * </codeblock>
 */

/**
 * @memberOf LoaderUtils
 * @method createXMLHttpRequest
 * @return {XMLHttpRequest}
 */

function createXMLHttpRequest() {
  try {
    return new XMLHttpRequest();
  } catch (e) {}

  try {
    return new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {}

  return null;
}
/**
 * @memberOf LoaderUtils
 * @method getFileName
 * @param {string} url
 * 		A full file path including the file name
 * @returns {string}
 * 		Strips a file path and extension to return the file name
 */

function getFileName(url) {
  let extension = url.lastIndexOf(".");
  let directory = url.lastIndexOf("/") + 1;
  if (directory > extension) extension = undefined;
  return url.substring(directory, extension);
}
/**
 * @memberOf LoaderUtils
 * @method getFontName
 * @param {string} url
 * 		A full file path including the file name
 * @returns {string}
 * 		Strips a file path and extension to return the file name
 */

function getFontName(url) {
  return url.substring(url.lastIndexOf("/") + 1, url.indexOf("."));
}
/**
 * @memberOf LoaderUtils
 * @method getFileType
 * @param {string} url
 * 		A full file path including the file name
 * @returns {string}
 * 		Determines the file type and returns that
 */

function getFileType(url) {
  url = url || "";

  const _index = url.indexOf("?");

  if (_index > -1) {
    url = url.substr(0, _index);
  }

  const _split = url.match(/[^\\]*\.(\w+)$/);

  const _base64 = url.match(/(?:(?:image)|(?:font))\/(jpeg|jpg|png|gif|svg|ttf|woff)/);

  const _type = _split ? _split[1] : _base64 ? _base64[1] : "unknown";

  return _type;
}
/**
 * @memberOf LoaderUtils
 * @method getFullUrl
 * @param {string} prepend
 * 		The file path
 * @param {string} file
 * 		The file name with extension
 * @param {function} platformGetUrl
 * 		Optional platform specific url formatter
 * @returns {string}
 * 		Determines the full url path to a file by either matching the protocol or
 * 		utilizing a platform tool, such as DoubleClick's <code>Enabler.getUrl</code>
 */

function getFullUrl(prepend, file, platformGetUrl) {
  const _prepend = getUrlPrepend(prepend);

  let _url = Object(__WEBPACK_IMPORTED_MODULE_0_ad_global__["matchProtocolTo"])(_prepend + _file);

  if (platformGetUrl) {
    _url = platformGetUrl(_url);
  }

  return url;
}
/**
 * @memberOf LoaderUtils
 * @method getUrlPrepend
 * @param {string} path
 * 		A full file path including the file name
 * @returns {string}
 * 		Removes the file name and extension to retun only the path
 */

function getUrlPrepend(path) {
  return path ? path.replace(/\/?$/, "/") : "";
}
/**
 * @memberOf LoaderUtils
 * @method getParamsFromData
 * @param {string|object} query
 * 		A query string or object of key/value pairs
 * @returns {string}
 * 		Formats a query string and returns it
 */

function getParamsFromData(query) {
  if (typeof query === "string") {
    /*
     * TODO - check the string is formatted correctly?
     */
    return query;
  } else {
    let queryString = "";

    for (let prop in query) {
      queryString += prop + "=" + query[prop] + "&";
    }

    return queryString.substr(0, queryString.length - 1);
  }
}

/***/ })
/******/ ]);
});    queryString += prop + "=" + query[prop] + "&";
    }

    return queryString.substr(0, queryString.length - 1);
  }
}

/***/ })
/******/ ]);
});