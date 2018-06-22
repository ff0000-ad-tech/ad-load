import { matchProtocolTo } from 'ad-global'

export function createXMLHttpRequest() {
	try {
		return new XMLHttpRequest()
	} catch (e) {}
	try {
		return new ActiveXObject('Msxml2.XMLHTTP')
	} catch (e) {}
	console.warn('XMLHttpRequest not supported')
	return null
}

export function getFileName(url) {
	let extension = url.lastIndexOf('.')
	let directory = url.lastIndexOf('/') + 1
	if (directory > extension) extension = undefined
	return url.substring(directory, extension)
}

export function getFontName(url) {
	return url.substring(url.lastIndexOf('/') + 1, url.indexOf('.'))
}

export function getFileType(url) {
	url = url || ''
	const _index = url.indexOf('?')
	if (_index > -1) {
		url = url.substr(0, _index)
	}
	const _split = url.match(/[^\\]*\.(\w+)$/)
	const _base64 = url.match(/image\/(jpeg|jpg|png)/)
	const _type = _split ? _split[1] : _base64 ? _base64[1] : 'unknown'

	return _type
}

export function getFullUrl(prepend, file, platformGetUrl) {
	const _prepend = getUrlPrepend(prepend)
	let _url = matchProtocolTo(_prepend + _file)
	if (platformGetUrl) {
		_url = platformGetUrl(_url)
	}
	return url
}

export function getUrlPrepend(path) {
	return path ? path.replace(/\/?$/, '/') : ''
}

export function getParamsFromData(query) {
	if (typeof query === 'string') {
		/*
		 * TODO - check the string is formatted correctly?
		 */
		return query
	} else {
		let queryString = ''
		for (let prop in query) {
			console.log('      prop =', prop)
			queryString += prop + '=' + query[prop] + '&'
		}

		return queryString.substr(0, queryString.length - 1)
	}
}
