import * as Utils from './LoaderUtils.js'

export const LoaderTicker = superclass =>
	class extends superclass {
		constructor(...args) {
			super(...args)
		}

		_setTicker(args) {
			const L = this
			setTicker({
				content: args.content,
				css: args.css,
				width: args.width,
				font: args.font,
				handleFail: L._handleFail.bind(L),
				handleTickerComplete: L._handleTickerComplete.bind(L)
			})
		}

		_removeTickerNode(node) {
			node.parentNode.removeChild(node)
		}
	}

export function setTicker({ content, css, width, font, handleFail, handleTickerComplete } = {}) {
	let node = document.createElement('div')
	node.innerHTML = content
	node.style.cssText = css || ''

	document.body.appendChild(node)

	const _width = width != undefined ? width : node.offsetWidth

	node.style.fontFamily = font || ''

	let _timeOut = setTimeout(() => {
		clearInterval(_interval)
		handleFail && handleFail()
	}, 5000)

	let _interval = setInterval(() => {
		if (node.offsetWidth != _width) {
			clearTimeout(_timeOut)
			clearInterval(_interval)

			handleTickerComplete && handleTickerComplete(node)
		}
	}, 10)
}
