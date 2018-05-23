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
	let _url = /*global.*/ matchProtocolTo(_prepend + _file)
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

export function matchProtocolTo(_url) {
	var noProtocol = _url.search(/^\/\//) > -1
	if (_url.search(/^http/) > -1 || noProtocol) {
		var _secure = window.location.href.search(/^https/) > -1 || adParams.forceHttps
		var _httpProtocol = _secure ? 'https://' : 'http://'
		if (noProtocol) {
			_url = _url.replace(/^\/\//, _httpProtocol)
		}
		if (_url.search(/.*edgecastcdn/) > -1) {
			var _edgecastContext = _secure ? 'ne1.' + _url.match(/w(a|p)c/i)[0] + '.' : _url.match(/w(a|p)c\.[a-z0-9]*\./i)[0]
			_url = _httpProtocol + _edgecastContext + 'edgecastcdn' + _url.replace(/.*edgecastcdn/, '')
		} else if (_url.search(/.*paramount\.com/) > -1) {
			var _paramountContext = _secure ? 'paramountdlds-a.akamaihd.net' : 'downloads.paramount.com'
			_url = _httpProtocol + _paramountContext + _url.replace(/.*paramount\.com/, '')
		} else if (_url.search(/espn\.go\.com/) > -1 || _url.search(/secure\.espncdn\.com/) > -1) {
			_url = 'https://secure.espncdn.com' + _url.replace(/^.*\.com/, '')
		} else {
			_url = _url.replace(/^https?\:\/\//i, _httpProtocol)
		}
	}
	return _url
}
