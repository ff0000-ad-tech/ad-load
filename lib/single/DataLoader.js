import { mix } from '../mixin/MixinBuilder.js'
import { LoaderBase } from '../mixin/LoaderBase.js'
import { LoaderSource } from '../mixin/LoaderSource.js'
import * as Utils from '../mixin/LoaderUtils.js'

class Blank {}

export default class DataLoader extends mix(Blank).with(LoaderBase, LoaderSource) {
	constructor(...args) {
		super(...args)
		let arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {}

		const D = this
		D.method = (arg.method || 'get').toLowerCase()
		D.query = arg.query || null
		D.responseType = arg.responseType || null
	}

	load() {
		const D = this
		// console.log('DataLoader "' + D.name + '" requesting:\n\t->', D.url)

		let queryString = null
		const isPost = D.method === 'post'

		D.req = Utils.createXMLHttpRequest()

		if (D.responseType != undefined) D.req.responseType = D.responseType

		let url = D.url

		if (D.query) {
			queryString = Utils.getParamsFromData(D.query)
			encodeURIComponent(queryString)
			if (!isPost) {
				url += '?' + queryString
				queryString = null
			}
		}

		if (D.cacheBuster) {
			url += D.query && !isPost ? '&' : '?'
			url += 'cb=' + new Date().getTime()
		}

		D.req.onreadystatechange = D._handleStateChange.bind(D)
		D.req.open(D.method, url, true)

		// Set Mime Type
		// NOTE: responseType has to be set AFTER the XmlHttpRequest.open() is called because IE is terrible
		switch (D.fileType) {
			case 'xml':
				if (D.req.overrideMimeType) D.req.overrideMimeType('text/xml')
				break
			case 'json':
				if (D.req.overrideMimeType) D.req.overrideMimeType('application/json')
				break
			case 'fba':
			case 'bin':
			case 'binary':
				D.responseType = D.req.responseType = 'arraybuffer'
				//D.req.overrideMimeType( 'text/plain charset=x-user-defined' )
				break
		}

		if (D.method === 'post') {
			D.req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		}

		D.req.send(queryString)
	}

	_handleStateChange(target) {
		const D = this
		switch (D.req.readyState) {
			case 3:
				if (this.req.status == 200) {
					D.dataRaw = D.responseType ? D.req.response : D.req.responseText
					D._handleProgress(D)
				}
				break
			case 4:
				if (D.req.status == 200) {
					D.dataRaw = D.responseType ? D.req.response : D.req.responseText
					D._handleComplete(D)
				} else {
					D._handleFail({
						target: target
					})
				}
				break
		}
	}

	_handleProgress() {
		const D = this
		D.onProgress.call(D.scope, D)
	}

	_handleComplete() {
		const D = this
		// console.log('DataLoader "' + D.name + '" is Complete')
		D.onComplete.call(D.scope, D)
	}
}
