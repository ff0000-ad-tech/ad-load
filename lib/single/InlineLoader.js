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
import { LoaderBase } from '../mixin/LoaderBase.js'
import { LoaderSourceMixin } from '../mixin/LoaderSourceMixin.js'

export default class InlineLoader extends LoaderSourceMixin(LoaderBase) {
	constructor(...args) {
		super(...args)
	}

	/**
	 * @memberOf InlineLoader
	 * @method load
	 * @desc
	 * 	Starts the load process.
	 */
	load() {
		const I = this
		let elem
		if (I.fileType == 'css') {
			elem = I._createCssLink()
		} else if (I.fileType == 'html') {
			elem = I._createHtmlLink()
		} else {
			elem = I._createScript()
		}
		elem.charset = 'utf-8'
		elem.onload = I._handleComplete.bind(I)
		elem.onerror = I._handleFail
		I.fileType == 'css' || I.fileType == 'html' ? (elem.href = this.url) : (elem.src = I.url)

		document.getElementsByTagName('head')[0].appendChild(elem)
	}

	_createCssLink() {
		let elem = document.createElement('link')
		elem.rel = 'stylesheet'
		elem.type = 'text/css'
		return elem
	}

	_createHtmlLink() {
		let elem = document.createElement('link')
		elem.rel = 'import'
		// elem.async = ''
		return elem
	}

	_createScript() {
		let elem = document.createElement('script')
		elem.type = 'text/javascript'
		return elem
	}

	_handleComplete(event) {
		const I = this
		// console.log('InlineLoader "' + I.name + '" is Complete')
		I.dataRaw = event.target
		I.onComplete.call(I.scope, I)
	}
}
