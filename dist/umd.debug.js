(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("window"));
	else if(typeof define === 'function' && define.amd)
		define(["window"], factory);
	else if(typeof exports === 'object')
		exports["adLoad"] = factory(require("window"));
	else
		root["adLoad"] = factory(root["window"]);
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
exports.setTicker = setTicker;
exports.LoaderUtils = exports.InlineLoader = exports.ImageLoader = exports.FontLoader = exports.DataLoader = exports["default"] = void 0;

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

var LoaderBase = function LoaderBase(superclass) {
  return (
    /*#__PURE__*/
    function (_superclass) {
      _inheritsLoose(_class, _superclass);

      function _class() {
        var _this;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        _this = _superclass.call.apply(_superclass, [this].concat(args)) || this;
        var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

        var L = _assertThisInitialized(_this);

        L.onComplete = arg.onComplete || function () {};

        L.onFail = arg.onFail || function () {};

        L.onProgress = arg.onProgress || function () {};

        L.name = arg.name || '';
        L.scope = arg.scope || L;
        L.dataRaw;
        L.cacheBuster = arg.cacheBuster || false;
        L._failCalled = false;
        return _this;
      }

      var _proto2 = _class.prototype;

      _proto2._handleFail = function _handleFail() {
        var L = this; // console.log( 'LoaderBase._handleFail()' )

        if (!L._failCalled) {
          L._failCalled = true;
          L.onFail.call(L.scope, L);
          console.log('Loader "' + L.name + '" Fail:', L.url);
        }
      };

      return _class;
    }(superclass)
  );
};
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

  console.warn("XMLHttpRequest not supported");
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
  var extension = url.lastIndexOf(".");
  var directory = url.lastIndexOf("/") + 1;
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

  var _index = url.indexOf("?");

  if (_index > -1) {
    url = url.substr(0, _index);
  }

  var _split = url.match(/[^\\]*\.(\w+)$/);

  var _base64 = url.match(/(?:(?:image)|(?:font))\/(jpeg|jpg|png|gif|svg|ttf|woff)/);

  var _type = _split ? _split[1] : _base64 ? _base64[1] : "unknown";

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
  var _prepend = getUrlPrepend(prepend);

  var _url = (0, _adGlobal.matchProtocolTo)(_prepend + _file);

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
    var queryString = "";

    for (var prop in query) {
      console.log("      prop =", prop);
      queryString += prop + "=" + query[prop] + "&";
    }

    return queryString.substr(0, queryString.length - 1);
  }
}

var LoaderUtils =
/*#__PURE__*/
Object.freeze({
  __proto__: null,
  createXMLHttpRequest: createXMLHttpRequest,
  getFileName: getFileName,
  getFontName: getFontName,
  getFileType: getFileType,
  getFullUrl: getFullUrl,
  getUrlPrepend: getUrlPrepend,
  getParamsFromData: getParamsFromData
});
exports.LoaderUtils = LoaderUtils;

var LoaderSource = function LoaderSource(superclass) {
  return (
    /*#__PURE__*/
    function (_superclass2) {
      _inheritsLoose(_class2, _superclass2);

      function _class2() {
        var _this2;

        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        _this2 = _superclass2.call.apply(_superclass2, [this].concat(args)) || this;
        var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

        var L = _assertThisInitialized(_this2);

        L.url = (0, _adGlobal.matchProtocolTo)(arguments[0] || '');

        if (arg.platformGetUrl) {
          L.platformGetUrl = arg.platformGetUrl;
          L.url = arg.platformGetUrl(L.url);
        }

        L.fileName = arg.id === undefined ? getFileName(L.url) : arg.id;
        L.fileType = arg.fileType || getFileType(L.url);
        return _this2;
      }

      return _class2;
    }(superclass)
  );
};

var LoaderTicker = function LoaderTicker(superclass) {
  return (
    /*#__PURE__*/
    function (_superclass3) {
      _inheritsLoose(_class3, _superclass3);

      function _class3() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return _superclass3.call.apply(_superclass3, [this].concat(args)) || this;
      }

      var _proto3 = _class3.prototype;

      _proto3._setTicker = function _setTicker(args) {
        var L = this;
        setTicker({
          content: args.content,
          css: args.css,
          width: args.width,
          font: args.font,
          handleFail: L._handleFail.bind(L),
          handleTickerComplete: L._handleTickerComplete.bind(L)
        });
      };

      _proto3._removeTickerNode = function _removeTickerNode(node) {
        node.parentNode.removeChild(node);
      };

      return _class3;
    }(superclass)
  );
};

function setTicker(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      content = _ref.content,
      css = _ref.css,
      width = _ref.width,
      font = _ref.font,
      handleFail = _ref.handleFail,
      handleTickerComplete = _ref.handleTickerComplete;

  var node = document.createElement('div');
  node.innerHTML = content;
  node.style.cssText = css || '';
  document.body.appendChild(node);

  var _width = width != undefined ? width : node.offsetWidth;

  node.style.fontFamily = font || '';

  var _timeOut = setTimeout(function () {
    clearInterval(_interval);
    handleFail && handleFail();
  }, 5000);

  var _interval = setInterval(function () {
    if (node.offsetWidth != _width) {
      clearTimeout(_timeOut);
      clearInterval(_interval);
      handleTickerComplete && handleTickerComplete(node);
    }
  }, 10);
}
/**
 * @class ImageLoader
 * @param {string} target
 * 	load target
 * @param {object} arg
 * 	Object with any of the following optional parameters for customizing the load routine.
 * @property {string} name
 * @property {boolean} cacheBuster
 * @property {boolean} renderOnly
 * 	used when only needing to render, such as writing into the DOM as markup <svg>
 * @property {string} crossOrigin
 * @property {function} onComplete
 * @property {function} onProgress
 * @property {function} onFail
 * @property {string} fileType
 * 	Manually assign the file type, eg: <code>truetype</code> or <code>woff</code>
 * @desc
 * This class is designed to handle a single load of a font by assigning it to a generated stylesheet
 */


var Blank = function Blank() {};

var ImageLoader =
/*#__PURE__*/
function (_mix$with) {
  _inheritsLoose(ImageLoader, _mix$with);

  function ImageLoader() {
    var _this3;

    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    _this3 = _mix$with.call.apply(_mix$with, [this].concat(args)) || this;
    var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {}; // used when only needing to render, such as writing into the DOM as markup <svg>

    _this3.renderOnly = !!arg.renderOnly;
    _this3.crossOrigin = arg.crossOrigin;
    return _this3;
  }
  /**
   * @memberOf ImageLoader
   * @method load
   * @desc
   * 	Starts the load process.
   */


  var _proto4 = ImageLoader.prototype;

  _proto4.load = function load() {
    var I = this;

    if (I.renderOnly) {
      I._setTicker({
        content: I.url,
        width: 0
      });
    } else {
      var img = new Image();
      img.id = I.fileName;
      img.crossOrigin = I.crossOrigin;
      img.onload = I._handleComplete.bind(I);
      img.onerror = I._handleFail;
      img.src = I.url;
    }
  };

  _proto4._handleComplete = function _handleComplete(event) {
    var I = this; // console.log('ImageLoader "' + I.name + '" is Complete')

    I.dataRaw = event.target;
    I.onComplete.call(I.scope, I);
  };

  return ImageLoader;
}(mix(Blank)["with"](LoaderBase, LoaderSource, LoaderTicker));
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


exports.ImageLoader = ImageLoader;

var Blank$1 = function Blank$1() {};

var InlineLoader =
/*#__PURE__*/
function (_mix$with2) {
  _inheritsLoose(InlineLoader, _mix$with2);

  function InlineLoader() {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return _mix$with2.call.apply(_mix$with2, [this].concat(args)) || this;
  }
  /**
   * @memberOf InlineLoader
   * @method load
   * @desc
   * 	Starts the load process.
   */


  var _proto5 = InlineLoader.prototype;

  _proto5.load = function load() {
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

  _proto5._createCssLink = function _createCssLink() {
    var elem = document.createElement('link');
    elem.rel = 'stylesheet';
    elem.type = 'text/css';
    return elem;
  };

  _proto5._createHtmlLink = function _createHtmlLink() {
    var elem = document.createElement('link');
    elem.rel = 'import'; // elem.async = ''

    return elem;
  };

  _proto5._createScript = function _createScript() {
    var elem = document.createElement('script');
    elem.type = 'text/javascript';
    return elem;
  };

  _proto5._handleComplete = function _handleComplete(event) {
    var I = this; // console.log('InlineLoader "' + I.name + '" is Complete')

    I.dataRaw = event.target;
    I.onComplete.call(I.scope, I);
  };

  return InlineLoader;
}(mix(Blank$1)["with"](LoaderBase, LoaderSource));
/**
 * @class DataLoader
 * @param {string} target
 * 	load target
 * @param {object} arg
 * 	Object with any of the following optional parameters for customizing the load routine.
 * @property {string} query
 * @property {string} name
 * @property {boolean} cacheBuster
 * @property {string} method
 * 	"POST" or "GET"
 * @property {object} scope
 * @property {function} onComplete
 * @property {function} onProgress
 * @property {function} onFail
 * @property {function} platformGetUrl
 * 	A callback method to wrap the url, such as DoubleClick's <code>Enabler.getUrl</code>.
 * @property {string} fileType
 * 	Manually assign the file type, eg: <code>json</code>, <code>xml</code>, <code>bin</code>.
 * @desc
 * This class is designed to handle a single load via XMLHttpRequest
 */


exports.InlineLoader = InlineLoader;

var Blank$2 = function Blank$2() {};

var DataLoader =
/*#__PURE__*/
function (_mix$with3) {
  _inheritsLoose(DataLoader, _mix$with3);

  function DataLoader() {
    var _this4;

    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    _this4 = _mix$with3.call.apply(_mix$with3, [this].concat(args)) || this;
    var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

    var D = _assertThisInitialized(_this4);

    D.method = (arg.method || 'get').toLowerCase();
    D.query = arg.query || null;
    D.responseType = arg.responseType || null;
    return _this4;
  }
  /**
   * @memberOf DataLoader
   * @method load
   * @desc
   * 	Starts the load process.
   * @example
   * // Single load
   * var dataLoader = new DataLoader('data.json', {
   * 	name: 'my-data=loader',
   * 	cacheBuster: true,
   * 	onComplete: handleComplete,
   * 	onFail: handleFail
   * })
   * dataLoader.load()
   *
   * function handleComplete(target) {
   * 	var loadedContent = target.dataRaw
   * }
   * function handleFail(error) {
   * 	// error handle
   * }
   */


  var _proto6 = DataLoader.prototype;

  _proto6.load = function load() {
    var D = this; // console.log('DataLoader "' + D.name + '" requesting:\n\t->', D.url)

    var queryString = null;
    var isPost = D.method === 'post';
    D.req = createXMLHttpRequest();
    if (D.responseType != undefined) D.req.responseType = D.responseType;
    var url = D.url;

    if (D.query) {
      queryString = getParamsFromData(D.query);

      if (!isPost) {
        url += '?' + queryString;
        queryString = null;
      }
    }

    if (D.cacheBuster) {
      url += D.query && !isPost ? '&' : '?';
      url += 'cb=' + new Date().getTime();
    }

    D.req.onreadystatechange = D._handleStateChange.bind(D);
    D.req.open(D.method, url, true); // Set Mime Type
    // NOTE: responseType has to be set AFTER the XmlHttpRequest.open() is called because IE is terrible

    switch (D.fileType) {
      case 'xml':
        if (D.req.overrideMimeType) D.req.overrideMimeType('text/xml');
        break;

      case 'json':
        if (D.req.overrideMimeType) D.req.overrideMimeType('application/json');
        break;

      case 'fba':
      case 'bin':
      case 'binary':
        D.responseType = D.req.responseType = 'arraybuffer'; //D.req.overrideMimeType( 'text/plain charset=x-user-defined' )

        break;
    }

    if (D.method === 'post') {
      D.req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }

    D.req.send(queryString);
  };

  _proto6._handleStateChange = function _handleStateChange(target) {
    var D = this;

    switch (D.req.readyState) {
      case 3:
        if (this.req.status == 200) {
          D.dataRaw = D.responseType ? D.req.response : D.req.responseText;

          D._handleProgress(D);
        }

        break;

      case 4:
        if (D.req.status == 200) {
          D.dataRaw = D.responseType ? D.req.response : D.req.responseText;

          D._handleComplete(D);
        } else {
          D._handleFail({
            target: target
          });
        }

        break;
    }
  };

  _proto6._handleProgress = function _handleProgress() {
    var D = this;
    D.onProgress.call(D.scope, D);
  };

  _proto6._handleComplete = function _handleComplete() {
    var D = this; // console.log('DataLoader "' + D.name + '" is Complete')

    D.onComplete.call(D.scope, D);
  };

  return DataLoader;
}(mix(Blank$2)["with"](LoaderBase, LoaderSource));
/**
 * @class FontLoader
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
 * 	Manually assign the file type, eg: <code>truetype</code> or <code>woff</code>
 * @desc
 * This class is designed to handle a single load of a font by assigning it to a generated stylesheet
 */


exports.DataLoader = DataLoader;

var Blank$3 = function Blank$3() {};

var FontLoader =
/*#__PURE__*/
function (_mix$with4) {
  _inheritsLoose(FontLoader, _mix$with4);

  function FontLoader() {
    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }

    return _mix$with4.call.apply(_mix$with4, [this].concat(args)) || this;
  }
  /**
   * @memberOf FontLoader
   * @method load
   * @desc
   * 	Starts the load process.
   */


  var _proto7 = FontLoader.prototype;

  _proto7.load = function load() {
    var F = this; // console.log('FontLoader "' + F.name + '" requesting:\n\t->', F.url)

    F.fileName = F.fileName.split('.')[0];
    var format = 'truetype';

    if (F.fileType.match(/woff/)) {
      format = F.fileType;
    }

    var assembledFontRule = "@font-face { font-family: '" + F.fileName + "'; src: url(" + F.url + ") format('" + format + "'); }";
    var getSheet = document.getElementById('RED_fontStyleSheet');

    if (getSheet) {
      getSheet.innerHTML += assembledFontRule;
    } else {
      var styleScript = document.createElement('style');
      styleScript.type = 'text/css';
      styleScript.media = 'screen';
      styleScript.id = 'RED_fontStyleSheet';
      styleScript.appendChild(document.createTextNode(assembledFontRule));
      document.getElementsByTagName('head')[0].appendChild(styleScript);
    }

    F._setTicker({
      content: ' !"\\#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~',
      css: 'position:absolute; top:-1000px; font-size:100px; font-family:san-serif; font-variant:normal; font-style:normal; font-weight:normal; letter-spacing:0; white-space:nowrap;',
      font: F.fileName
    });
  };

  _proto7._handleTickerComplete = function _handleTickerComplete(node) {
    var F = this; // added timeout to leave a rendered textfield on stage for initial textfields
    // to return proper offsetWidth values

    setTimeout(function () {
      // leave the test textfield temporarily to allow dom
      // to have a reference to rendered characters. hack?
      F._removeTickerNode(node);
    }, 300);

    F._handleComplete();
  };

  _proto7._handleComplete = function _handleComplete(event) {
    var F = this; // console.log('FontLoader "' + F.name + '" is Complete')

    F.dataRaw = F.fileName;
    F.onComplete.call(F.scope, F);
  };

  return FontLoader;
}(mix(Blank$3)["with"](LoaderBase, LoaderSource, LoaderTicker));
/**
 * @class Loader
 * @param {string|array|Loader} target
 * 	load target
 * @param {object} arg
 * 	Object with any of the following optional parameters for customizing the load routine.
 * @property {string} name
 * @property {boolean} prioritize
 * @property {boolean} cacheBuster
 * @property {object} scope
 * @property {function} onComplete
 * @property {function} onProgress
 * @property {function} onFail
 * @property {string} prepend
 * 	A file path to be added to all loader targets.
 * @property {function} platformGetUrl
 * 	A callback method to wrap the url, such as DoubleClick's <code>Enabler.getUrl</code>.
 * @property {string} fileType
 * 	Manually assign the file type, eg: <code>jpg</code>, <code>svg</code>.
 * @desc
 * This class is designed to handle all load processes: images, fonts and data, even other Loaders! Below are multiple use case scenarios.
 * <br><br>
 * <b>Single Load:</b>
 * <codeblock>
 * import { Loader } from 'ad-load'
 *
 * var singleLoader = new Loader('images/img0.jpg', { onComplete:handleLoadComplete, scope:this })
 * singleLoader.load()
 *
 * function handleLoadComplete(target) {
 * 	console.log(target.content[0].dataRaw)
 * }
 * </codeblock>
 * <br><br>
 * <b>Array of loads from one Constructor:</b>
 * <codeblock>
 * // Array load - you can pass in multiple files on creation of a Loader
 * var arrayLoader = new Loader(['font1.ttf', 'font2.ttf'], { name:'fontLoader', onComplete:handleLoadComplete, prepend:adParams.commonPath + 'fonts/' })
 * arrayLoader.load()
 *
 * function handleLoadComplete(target) {
 * 	console.log(target.content[0].dataRaw)
 * }
 * </codeblock>
 * <br><br>
 * <b>Complex Load:</b>
 * <codeblock>
 * var myLoader = new Loader('images/img0.jpg', { onComplete:handleLoadComplete, scope:this })
 *
 * // append to that loader
 * myLoader.add('images/img1.jpg')
 *
 * // append multiple
 * myLoader.add(['images/img2.jpg', 'images/img3.jpg'])
 * myLoader.load()
 *
 * function handleLoadComplete(target) {
 * 	console.log( target.content[0].dataRaw )
 * }
 * </codeblock>
 * <br><br>
 * <b>Nested Loads:</b>
 * <codeblock>
 * // Nested loads - best practice is to make a loader for one file type
 * var masterLoader = new Loader({ name:'master', onComplete:handleAllComplete, onProgress:handleAllProgress, onFail:handleLoadFail, scope:this })
 *
 * // declare a var to reference later, then add it to main loader
 * var _imgLoader = new Loader(['images/img2.jpg', 'images/img3.jpg'], { name:'load_images', prepend:'images/' })
 * masterLoader.add(_imgLoader)
 *
 * // or just add a new loader instance
 * masterLoader.add(
 * 	new Loader(['font1.ttf', 'font2.ttf' ], { name:'load_fonts', prepend: 'fonts/' })
 * )
 * masterLoader.add(
 * 	new Loader(['AdData.js', 'Align.js', 'Clamp.js'], { name:'load_js', prepend: 'utils/' })
 * )
 * masterLoader.load()
 *
 * function handleLoadComplete(target) {
 * 	console.log(target.content[0].dataRaw)
 * }
 * function handleLoadProgress(target) {
 * 	console.log(target.progress, target.rawProgress)
 * }
 * function handleLoadFail(target) {
 * 	console.log(target);
 * }
 * function handleAllComplete(target) {
 * 	var a = target.getLoader(_imgLoader)
 * 	console.log("Loader found by var:", a)
 *
 * 	var b = target.getContent('font1.ttf')
 * 	console.log("Content found by name:", b)
 *
 * 	var c = target.getLoader('load_fonts')
 * 	console.log("Loader found by url:", c)
 * }
 * </codeblock>
 */


exports.FontLoader = FontLoader;

var Blank$4 = function Blank$4() {};

var Loader =
/*#__PURE__*/
function (_mix$with5) {
  _inheritsLoose(Loader, _mix$with5);

  function Loader() {
    var _this5;

    for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }

    _this5 = _mix$with5.call.apply(_mix$with5, [this].concat(args)) || this;
    var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

    var L = _assertThisInitialized(_this5);

    L._queue = {};
    L._total = 0;
    L._active = false;
    L._startedCount = 0;
    L.prepend = arg.prepend || '';
    L.platformGetUrl = arg.platformGetUrl;
    L.fileType = arg.fileType || null;
    L.content = [];
    L.crossOrigin = arg.crossOrigin || undefined;
    L.add(arguments[0]);
    return _this5;
  }
  /* ---------------------------------------------------------------------------------------------------------------- */
  // PUBLIC

  /**
   * @memberOf Loader
   * @method add
   * @param {string|array|Loader} arg
   * 	a file, array of files, or Loader instance
   * @desc
   * 	Add to the load queue: a single or array of files or even another Loader.
   * @example
   * // Single load
   * var imgLoader = new Loader({ name:'img_loader' })
   *
   * // add to that loader
   * imgLoader.add('images/img1.jpg')
   *
   * // add multiple
   * imgLoader.add(['images/img2.jpg', 'images/img3.jpg'])
   *
   * // Nested loads - best practice is to make a loader for one file type
   * var mainLoader = new Loader({ name:'main', onComplete:handleComplete })
   *
   * mainLoader.add(imgLoader)
   *
   * // or just add a new loader instance
   * mainLoader.add(new Loader(['font1.ttf', 'font2.ttf'], { name:'load_fonts' }))
   */


  var _proto8 = Loader.prototype;

  _proto8.add = function add(arg) {
    var L = this;

    if (typeof arg === 'string') {
      // single load as first parameter
      L._addSingleLoad(arg);
    } else if (arg instanceof Array) {
      // first parameter is an Array of urls
      for (var i = 0; i < arg.length; i++) {
        L._addSingleLoad(arg[i]);
      }
    } else if (arg instanceof Loader) {
      if (arg.content && arg.content[0] && arg.content[0].fileType == 'fba') {
        L._addFbaSubLoads(arg.content[0]);
      } else {
        L._addSubLoad(arg);
      }
    }
  }
  /**
   * @memberOf Loader
   * @method load
   * @desc
   * 	Starts the load process.
   * @example
   * // Single load
   * var imgLoader = new Loader({ onComplete:handleComplete })
   * imgLoader.load()
   */
  ;

  _proto8.load = function load() {
    var L = this;
    L._active = true;

    if (L._total <= 0) {
      console.log('Loader "' + L.name + '" has NO assets to be loaded.');
    } else {
      var _has = false;
      var _output = '';

      for (var l in L._queue) {
        if (!(L._queue[l] instanceof Loader)) {
          if (!_has) {
            _has = true;
            _output += 'Loader "' + L.name + '" requesting:';
          }

          var fileName = L._queue[l].fileName;
          var extension = L._queue[l].fileType;
          var extensionIndex = fileName.indexOf('.' + extension);
          var fileAndExtension = extensionIndex > -1 ? fileName : fileName + '.' + extension;
          _output += '\n\t -> ' + (L._queue[l].prepend || '') + fileAndExtension;
        }
      }

      if (_has) {
        console.log(_output);
      }
    }

    L._startSingleLoad(0);
  }
  /**
   * @memberOf Loader
   * @method getAllContent
   * @returns {array}
   * 	An array of LoaderData Objects with relevant loading information (like an Event Object).
   * 	Access the loaded content via the property 'dataRaw': an image, raw Json, raw XML, or font name
   * @desc
   * 	Get all loaded content from the Loader and all nested Loaders
   * @example
   *  var myLoader = new Loader(['img1.jpg', 'img2.jpg', 'img3.jpg'], { onComplete:handleComplete })
   *  myLoader.load()
   *
   *  function handleComplete(target) {
   *  	var myContent = target.getAllContent()
   *  	console.log("Content found:", myContent)
   *  }
   */
  ;

  _proto8.getAllContent = function getAllContent() {
    var _found = [];

    function searchSubLoader(content) {
      for (var i = 0; i < content.length; i++) {
        //console.log( "   -> sub:", content[i] )
        if (content[i] instanceof Loader) {
          searchSubLoader(content[i].content);
        } else {
          _found.push(content[i]);
        }
      }
    }

    searchSubLoader(this.content);

    if (_found.length < 1) {
      console.log('No Content found');
    }

    return _found;
  }
  /**
   * @memberOf Loader
   * @method getAllContentRaw
   * @returns {array}
   * 	An array of only the raw data: an image, raw Json, raw XML, or font name
   * @desc
   * 	Get all raw loaded content from the Loader and all nested Loaders, no LoaderData Objects
   * @example
   * var myLoader = new Loader(['img1.jpg', 'img2.jpg', 'img3.jpg'], { onComplete:handleComplete })
   * myLoader.load()
   *
   * function handleComplete(target) {
   * 	var myContent = target.getAllContentRaw()
   * 	console.log("Content found:", myContent)
   * }
   */
  ;

  _proto8.getAllContentRaw = function getAllContentRaw() {
    var _content = this.getAllContent();

    for (var i = 0; i < _content.length; i++) {
      _content[i] = _content[i].dataRaw;
    }

    return _content;
  }
  /**
   * @memberOf Loader
   * @method getLoader
   * @param {string} id
   * 	the string optionally assigned to the 'name' property or the variable assigned to the Loader instance
   * @returns {Loader}
   * @desc
   * 	Get the Loader instance from the Loader or any nested Loader
   * @example
   * var mainLoader = new Loader({ name:'main', onComplete:handleLoadComplete })
   * mainLoader.add(
   * 	new Loader(['font1.ttf', 'font2.ttf'], { name: 'load_fonts', prepend: 'fonts/' }
   * 	)
   * )
   * mainLoader.add(
   * 	new Loader(['Ad_Data.js', 'NetUtils.js'], { name: 'load_js', prepend: 'utils/' })
   * )
   * mainLoader.load()
   *
   * function handleLoadComplete(target) {
   * 	var fontLoader = target.getLoader('load_fonts')
   * }
   */
  ;

  _proto8.getLoader = function getLoader(id) {
    var _found = null;

    function searchSubLoader(content) {
      for (var i = 0; i < content.length; i++) {
        //console.log( "   -> sub:", content[i] )
        if (content[i] instanceof Loader) {
          if (content[i] && (content[i].name === id || content[i] === id)) {
            _found = content[i];
          } else {
            searchSubLoader(content[i].content);
          }
        }
      }
    }

    searchSubLoader(this.content);

    if (!_found) {
      console.log('No Loader found of that name');
    }

    return _found;
  } // -------------------------------------------------------------------------------------------------------------
  // PRIVATE METHODS
  ;

  _proto8._addSingleLoad = function _addSingleLoad(url, fbaOverwrite) {
    // console.log('_addSingleLoad()', url, fbaOverwrite)
    var L = this; // fbaOverwrite is an array [ file name, file extension ]

    var fileType = fbaOverwrite ? fbaOverwrite[1] : L.fileType || getFileType(url);
    var loaderType; // console.log('\t fileType:', fileType)

    switch (fileType) {
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'png':
      case 'svg':
        loaderType = ImageLoader;
        break;

      case 'ttf':
      case 'woff':
        loaderType = FontLoader;
        break;

      case 'json':
      case 'fba':
      case 'bin':
      case 'binary':
      case 'svg+xml':
        loaderType = DataLoader;
        break;

      default:
        loaderType = InlineLoader;
    } // either the data as binary OR the file path and name


    var urlChoice = fbaOverwrite ? url : L.prepend + url; // console.log('\t url:', url, '| loaderType:', loaderType)

    var singleLoader = new loaderType(urlChoice, {
      scope: L,
      platformGetUrl: L.platformGetUrl,
      onComplete: L._handleSingleLoadComplete,
      onFail: L._handleFail,
      fileType: fileType,
      cacheBuster: L.cacheBuster,
      crossOrigin: L.crossOrigin
    }); // console.log('\t singleLoader:', singleLoader)
    // from fba, the files are binary, so there is
    // no file name to reference so set it here

    if (fbaOverwrite) {
      singleLoader.fileName = fbaOverwrite[0];
    }

    singleLoader.queueIndex = L._total;
    L._queue[L._total] = singleLoader;
    L._total++; // console.log(L._total, L._queue)
  };

  _proto8._addSubLoad = function _addSubLoad(loader) {
    var L = this; //console.log(L.name, '_addSubLoad()')

    loader.onComplete = L._handleSingleLoadComplete.bind(L);
    loader.onProgress = L._handleProgress.bind(L);
    loader.onFail = L._handleFail; //loader.platformGetUrl = L.platformGetUrl;

    loader.queueIndex = L._total;
    L._queue[L._total] = loader;
    L._total++;
  };

  _proto8._addFbaSubLoads = function _addFbaSubLoads(loader) {
    // console.log("_addFbaSubLoads()", loader)
    // Conversion between uint8s and uint32s.
    var uint8 = new Uint8Array(4);
    var uint32 = new Uint32Array(uint8.buffer); // start after = signature(8 bytes) + IHDR(25 bytes) + fbAc(16 bytes total, but only 11: size,type,content-1 )

    var idx = 44;
    var chunkTotal = new Uint8Array(loader.dataRaw, idx, 1)[0]; //console.log( 'number of images as chunks:', chunkTotal )
    // skip over rest of fbAc chunk: count value byte + CRC 4 bytes

    idx += 5;

    for (var i = 0; i < chunkTotal; i++) {
      // size, type, content, crc
      // get the size of next chunk as on UintArray
      var sizeOfChunk = new Uint8Array(loader.dataRaw, idx, 4); // Read the length of the current chunk, which is stored as a Uint32.
      // this one has to be a loop, as values get assigned to uint8, that changes buffer of uint32
      // also, the values must be set reversed, henced the count down loop

      var up = 4;

      for (var k = 0; k < 4; k++) {
        //console.log( k, up, sizeOfChunk[k] )
        uint8[--up] = sizeOfChunk[k];
      } // all chunk data NOT including the type


      var length = uint32[0];
      idx += 7; // Get the chunk type in ASCII, only last character really matters

      var type = String.fromCharCode.apply(String, new Uint8Array(loader.dataRaw, idx++, 1)); // console.log('\ttype:', type, '\tlength:', length)

      var fileNameLengthArray = new Uint8Array(loader.dataRaw, idx + 3, 1);
      var fileNameLength = fileNameLengthArray[0] || 0; // default to zero incase array fails? maybe unnecessary

      var nameBuffer = new Uint8Array(loader.dataRaw, idx + 4, fileNameLength);
      var fileName = String.fromCharCode.apply(String, nameBuffer); // first add to the file name length 4 bytes: file name length byte count

      fileNameLength += 4; // offset the array start and length by the file name length

      var chunkData = new Uint8Array(loader.dataRaw, idx + fileNameLength, length - fileNameLength); // NOTE: ArrayBuffer.slice() does not exist in IE10, so have to do it manually inline
      //var chunkData = new Uint8Array(chunk.buffer.slice(4))
      // skip over the content AND skip over the CRC value by incrementing by 4 bytes

      idx += length + 4;
      var fileNameSplit = fileName.split('.'); //var blobFileType = '';// 'application/octet-stream';

      var blobFileType = void 0;

      if (type === 'f') {
        blobFileType = 'application/' + (fileNameSplit[1] === 'ttf' ? 'x-font-ttf' : "font-" + fileNameSplit[1]);
      } else {
        blobFileType = 'image/' + (fileNameSplit[1] == 'svg' ? 'svg+xml' : fileNameSplit[1]);
      }

      var blob = new Blob([chunkData], {
        type: blobFileType
      });

      var _url2 = URL.createObjectURL(blob); // url will be ~ blob:32c3c7af-ef04-414f-a073-685602fe8a28
      // console.log(fileNameSplit, blobFileType, url)


      this._addSingleLoad(_url2, fileNameSplit);
    }
  };

  _proto8._startSingleLoad = function _startSingleLoad(i) {
    var L = this;
    var _inst = L._queue[i]; // console.log(L.name, '_startSingleLoad()', 'index:', i, 'total:', L._total)

    if (L._total == 0) {
      // fire a complete because there are no requests
      L._handleComplete();
    } else {
      if (i < L._total) {
        // console.log( L.name, '_startSingleLoad() ->', _inst )
        if (!(_inst instanceof Loader)) {
          //console.log( _inst.name, 'is a subloader' )
          //} else {
          if (i < L._total - 1) {
            L._startLoadTimeOut(++i);
          }
        }

        _inst.load();
      }
    }
  };

  _proto8._startLoadTimeOut = function _startLoadTimeOut(i) {
    var L = this;
    setTimeout(function () {
      L._startSingleLoad(i);
    }, 10);
  } // -------------------------------------------------------------------------------------------------------------
  // EVENT HANDLERS
  ;

  _proto8._handleSingleLoadComplete = function _handleSingleLoadComplete(target) {
    var L = this; // console.log('_handleSingleLoadComplete(), target:', target)

    L.content[target.queueIndex] = target;
    delete L._queue[target.queueIndex];

    L._handleProgress(); // is a nested Loader


    if (target.url == undefined) {
      //console.log( '"' + L.name + '" nested Loader "' + target.name + '" Complete' );
      if (target.queueIndex < L._total - 1) {
        L._startLoadTimeOut(target.queueIndex + 1);
      }
    }
  };

  _proto8._handleProgress = function _handleProgress() {
    var L = this;
    var _length = L.content.length;
    var _count = 0;

    for (var i = 0; i < _length; i++) {
      if (L.content[i]) _count++;
    } // console.log(L.name, '_handleProgress()', '_count:', _count, 'total:', L._total)


    var _consecutive = _count;
    var _subProgress = 0;

    if (_count < L._total && L._queue[_count]) {
      _subProgress = L._queue[_count].progress / L._total || 0;
    }

    L.progress = _consecutive / L._total + _subProgress;
    L.rawProgress = _count / L._total + _subProgress;
    L.onProgress.call(L.scope, L); //console.log( 'progress')

    if (_count >= L._total) {
      //console.log( 'Loader calling _handleComplete()')
      L._handleComplete();
    }
  };

  _proto8._handleComplete = function _handleComplete() {
    var L = this; // console.log('Loader "' + L.name + '" is Complete')

    L.onComplete.call(L.scope, L);
  };

  return Loader;
}(mix(Blank$4)["with"](LoaderBase));

var _default = Loader;
exports["default"] = _default;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});