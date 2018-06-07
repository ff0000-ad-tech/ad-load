import * as Utils from './LoaderUtils.js'

export const LoaderTicker = superclass =>
	class extends superclass {
		constructor(...args) {
			super(...args)
		}

		_setTicker(args) {
			const L = this
			let node = document.createElement('div')
			node.innerHTML = args.content
			node.style.cssText = args.css || ''

			document.body.appendChild(node)

			const width = args.width != undefined ? args.width : node.offsetWidth

			node.style.fontFamily = args.font || ''

			let _timeOut = setTimeout(() => {
				clearInterval(_interval)
				L._handleFail()
			}, 5000)

			let _interval = setInterval(() => {
				if (node.offsetWidth != width) {
					clearTimeout(_timeOut)
					clearInterval(_interval)

					L._handleTickerComplete(node)
				}
			}, 10)
		}

		_removeTickerNode(node) {
			node.parentNode.removeChild(node)
		}
	}
