import { mix } from '../mixin/MixinBuilder.js'
import { LoaderBase } from '../mixin/LoaderBase.js'
import { LoaderSource } from '../mixin/LoaderSource.js'

class Blank {}

export default class InlineLoader extends mix(Blank).with(LoaderBase, LoaderSource) {
	constructor(...args) {
		super(...args)
	}

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
