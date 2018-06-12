import * as Utils from './LoaderUtils.js'
import { matchProtocolTo } from 'ad-global'

export const LoaderSource = superclass =>
	class extends superclass {
		constructor(...args) {
			super(...args)
			const arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {}

			const L = this

			L.url = matchProtocolTo(arguments[0] || '')

			if (arg.platformGetUrl) {
				L.platformGetUrl = arg.platformGetUrl
				L.url = arg.platformGetUrl(L.url)
			}

			L.fileName = arg.id === undefined ? Utils.getFileName(L.url) : arg.id
			L.fileType = arg.fileType || Utils.getFileType(L.url)
		}
	}
