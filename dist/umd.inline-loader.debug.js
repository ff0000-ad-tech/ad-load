(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("window"));
	else if(typeof define === 'function' && define.amd)
		define(["window"], factory);
	else if(typeof exports === 'object')
		exports["inlineLoader"] = factory(require("window"));
	else
		root["inlineLoader"] = factory(root["window"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _adGlobal = __webpack_require__(1);

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var mix = function mix(superclass) {
  return new MixinBuilder(superclass);
};

var MixinBuilder =
/*#__PURE__*/
function () {
  function MixinBuilder(superclass) {
    this.superclass = superclass;
  }

  var _proto = MixinBuilder.prototype;

  _proto["with"] = function _with() {
    for (var _len = arguments.length, mixins = new Array(_len), _key = 0; _key < _len; _key++) {
      mixins[_key] = arguments[_key];
    }

    return mixins.reduce(function (c, mixin) {
      return mixin(c);
    }, this.superclass);
  };

  return MixinBuilder;
}();

var LoaderBase =
/*#__PURE__*/
function () {
  function LoaderBase() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};
    var L = this;

    L.onComplete = arg.onComplete || function () {};

    L.onFail = arg.onFail || function () {};

    L.onProgress = arg.onProgress || function () {};

    L.name = arg.name || '';
    L.scope = arg.scope || L;
    L.dataRaw;
    L.cacheBuster = arg.cacheBuster || false;
    L._failCalled = false;
  }

  var _proto2 = LoaderBase.prototype;

  _proto2._handleFail = function _handleFail() {
    var L = this; // console.log( 'LoaderBase._handleFail()' )

    if (!L._failCalled) {
      L._failCalled = true;
      L.onFail.call(L.scope, L);
      console.log('Loader "' + L.name + '" Fail:', L.url);
    }
  };

  return LoaderBase;
}();
/**
 * @class LoaderUtils
 * @desc Various single use utilities for file names & paths, and query manipulations.
 * <codeblock>
 * import { LoaderUtils } from 'ad-load'
 * </codeblock>
 */

/**
 * @memberOf LoaderUtils
 * @method getFileName
 * @param {string} url
 * 		A full file path including the file name
 * @returns {string}
 * 		Strips a file path and extension to return the file name
 */


function getFileName(url) {
  var extension = url.lastIndexOf(".");
  var directory = url.lastIndexOf("/") + 1;
  if (directory > extension) extension = undefined;
  return url.substring(directory, extension);
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

  var _index = url.indexOf("?");

  if (_index > -1) {
    url = url.substr(0, _index);
  }

  var _split = url.match(/[^\\]*\.(\w+)$/);

  var _base64 = url.match(/(?:(?:image)|(?:font))\/(jpeg|jpg|png|gif|svg|ttf|woff)/);

  var _type = _split ? _split[1] : _base64 ? _base64[1] : "unknown";

  return _type;
}

var LoaderSourceMixin = function LoaderSourceMixin(superclass) {
  return (
    /*#__PURE__*/
    function (_superclass) {
      _inheritsLoose(_class, _superclass);

      function _class() {
        var _this;

        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        _this = _superclass.call.apply(_superclass, [this].concat(args)) || this;
        var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

        var L = _assertThisInitialized(_this);

        L.url = (0, _adGlobal.matchProtocolTo)(arguments[0] || '');

        if (arg.platformGetUrl) {
          L.platformGetUrl = arg.platformGetUrl;
          L.url = arg.platformGetUrl(L.url);
        }

        L.fileName = arg.id === undefined ? getFileName(L.url) : arg.id;
        L.fileType = arg.fileType || getFileType(L.url);
        return _this;
      }

      return _class;
    }(superclass)
  );
};
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


var InlineLoader =
/*#__PURE__*/
function (_mix$with) {
  _inheritsLoose(InlineLoader, _mix$with);

  function InlineLoader() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return _mix$with.call.apply(_mix$with, [this].concat(args)) || this;
  }
  /**
   * @memberOf InlineLoader
   * @method load
   * @desc
   * 	Starts the load process.
   */


  var _proto3 = InlineLoader.prototype;

  _proto3.load = function load() {
    var I = this;
    var elem;

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
  };

  _proto3._createCssLink = function _createCssLink() {
    var elem = document.createElement('link');
    elem.rel = 'stylesheet';
    elem.type = 'text/css';
    return elem;
  };

  _proto3._createHtmlLink = function _createHtmlLink() {
    var elem = document.createElement('link');
    elem.rel = 'import'; // elem.async = ''

    return elem;
  };

  _proto3._createScript = function _createScript() {
    var elem = document.createElement('script');
    elem.type = 'text/javascript';
    return elem;
  };

  _proto3._handleComplete = function _handleComplete(event) {
    var I = this; // console.log('InlineLoader "' + I.name + '" is Complete')

    I.dataRaw = event.target;
    I.onComplete.call(I.scope, I);
  };

  return InlineLoader;
}(mix(LoaderBase)["with"](LoaderSourceMixin));

var _default = InlineLoader;
exports["default"] = _default;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});