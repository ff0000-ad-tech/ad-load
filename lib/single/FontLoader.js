import { mix } from '../mixin/MixinBuilder.js'
import { LoaderBase } from '../mixin/LoaderBase.js'
import { LoaderSource } from '../mixin/LoaderSource.js'
import { LoaderTicker } from '../mixin/LoaderTicker.js'

class Blank {}

export default class FontLoader extends mix(Blank).with(LoaderBase, LoaderSource, LoaderTicker) {
	constructor(...args) {
		super(...args)
	}

	load() {
		const F = this

		// console.log('FontLoader "' + F.name + '" requesting:\n\t->', F.url)

		F.fileName = F.fileName.split('.')[0]

		let assembledFontRule = '@font-face { font-family: ' + F.fileName + '; src: url(' + F.url + ") format('truetype'); }"

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
