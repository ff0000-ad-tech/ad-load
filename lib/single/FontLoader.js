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
import { mix } from '../mixin/MixinBuilder.js'
import { LoaderBase } from '../mixin/LoaderBase.js'
import { LoaderSourceMixin } from '../mixin/LoaderSourceMixin.js'
import { LoaderTickerMixin } from '../mixin/LoaderTickerMixin.js'

export default class FontLoader extends mix(LoaderBase).with(LoaderSourceMixin, LoaderTickerMixin) {
	constructor(...args) {
		super(...args)
	}

	/**
	 * @memberOf FontLoader
	 * @method load
	 * @desc
	 * 	Starts the load process.
	 */
	load() {
		const F = this

		// console.log('FontLoader "' + F.name + '" requesting:\n\t->', F.url)

		F.fileName = F.fileName.split('.')[0]

		let format = 'truetype'
		if (F.fileType.match(/woff/)) {
			format = F.fileType
		}
		const assembledFontRule = "@font-face { font-family: '" + F.fileName + "'; src: url(" + F.url + ") format('" + format + "'); }"

		let getSheet = document.getElementById('RED_fontStyleSheet')
		if (getSheet) {
			getSheet.innerHTML += assembledFontRule
		} else {
			let styleScript = document.createElement('style')
			styleScript.type = 'text/css'
			styleScript.media = 'screen'
			styleScript.id = 'RED_fontStyleSheet'
			styleScript.appendChild(document.createTextNode(assembledFontRule))
			document.getElementsByTagName('head')[0].appendChild(styleScript)
		}

		F._setTicker({
			content: ' !"\\#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~',
			css:
				'position:absolute; top:-1000px; font-size:100px; font-family:san-serif; font-variant:normal; font-style:normal; font-weight:normal; letter-spacing:0; white-space:nowrap;',
			font: F.fileName
		})
	}

	_handleTickerComplete(node) {
		const F = this
		// added timeout to leave a rendered textfield on stage for initial textfields
		// to return proper offsetWidth values
		setTimeout(function() {
			// leave the test textfield temporarily to allow dom
			// to have a reference to rendered characters. hack?
			F._removeTickerNode(node)
		}, 300)

		F._handleComplete()
	}

	_handleComplete(event) {
		const F = this
		// console.log('FontLoader "' + F.name + '" is Complete')
		F.dataRaw = F.fileName
		F.onComplete.call(F.scope, F)
	}
}
