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
import { mix } from '../mixin/MixinBuilder.js'
import { LoaderBase } from '../mixin/LoaderBase.js'
import { LoaderSourceMixin } from '../mixin/LoaderSourceMixin.js'
import { LoaderTickerMixin } from '../mixin/LoaderTickerMixin.js'

export default class ImageLoader extends mix(LoaderBase).with(LoaderSourceMixin, LoaderTickerMixin) {
	constructor(...args) {
		super(...args)
		let arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {}

		// used when only needing to render, such as writing into the DOM as markup <svg>
		this.renderOnly = !!arg.renderOnly
		this.crossOrigin = arg.crossOrigin
	}

	/**
	 * @memberOf ImageLoader
	 * @method load
	 * @desc
	 * 	Starts the load process.
	 */
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
