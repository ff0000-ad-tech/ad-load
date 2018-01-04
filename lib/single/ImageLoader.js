import { mix } from '../mixin/MixinBuilder.js'
import { LoaderBase } from '../mixin/LoaderBase.js'
import { LoaderSource } from '../mixin/LoaderSource.js'
import { LoaderTicker } from '../mixin/LoaderTicker.js'

class Blank {}

export default class ImageLoader extends mix(Blank).with(LoaderBase, LoaderSource, LoaderTicker) {
	constructor(...args) {
		super(...args)
		let arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {}

		// used when only needing to render, such as writing into the DOM as markup <svg>
		this.renderOnly = !!arg.renderOnly
		this.crossOrigin = arg.crossOrigin
	}

	load() {
		const I = this
		if (I.renderOnly) {
			I._setTicker({
				content: I.url,
				width: 0
			})
		} else {
			let img = new Image()
			img.id = I.fileName
			img.crossOrigin = I.crossOrigin
			img.onload = I._handleComplete.bind(I)
			img.onerror = I._handleFail
			img.src = I.url
		}
	}

	_handleComplete(event) {
		const I = this
		// console.log('ImageLoader "' + I.name + '" is Complete')
		I.dataRaw = event.target
		I.onComplete.call(I.scope, I)
	}
}
