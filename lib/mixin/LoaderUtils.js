/**
 * @class LoaderUtils
 * @desc Various single use utilities for file names & paths, and query manipulations.
 * <codeblock>
 * import { LoaderUtils } from 'ad-load'
 * </codeblock>
 */
import { matchProtocolTo } from 'ad-global'

/**
 * @memberOf LoaderUtils
 * @method createXMLHttpRequest
 * @return {XMLHttpRequest}
 */
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

/**
 * @memberOf LoaderUtils
 * @method getFileName
 * @param {string} url
 * 		A full file path including the file name
 * @returns {string}
 * 		Strips a file path and extension to return the file name
 */
export function getFileName(url) {
	let extension = url.lastIndexOf('.')
	let directory = url.lastIndexOf('/') + 1
	if (directory > extension) extension = undefined
	return url.substring(directory, extension)
}

/**
 * @memberOf LoaderUtils
 * @method getFontName
 * @param {string} url
 * 		A full file path including the file name
 * @returns {string}
 * 		Strips a file path and extension to return the file name
 */
export function getFontName(url) {
	return url.substring(url.lastIndexOf('/') + 1, url.indexOf('.'))
}

/**
 * @memberOf LoaderUtils
 * @method getFileType
 * @param {string} url
 * 		A full file path including the file name
 * @returns {string}
 * 		Determines the file type and returns that
 */
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

/**
 * @memberOf LoaderUtils
 * @method getFullUrl
 * @param {string} prepend
 * 		The file path
 * @param {string} file
 * 		The file name with extension
 * @param {function} platformGetUrl
 * 		Optional platform specific url formatter
 * @returns {string}
 * 		Determines the full url path to a file by either matching the protocol or
 * 		utilizing a platform tool, such as DoubleClick's <code>Enabler.getUrl</code>
 */
export function getFullUrl(prepend, file, platformGetUrl) {
	const _prepend = getUrlPrepend(prepend)
	let _url = matchProtocolTo(_prepend + _file)
	if (platformGetUrl) {
		_url = platformGetUrl(_url)
	}
	return url
}

/**
 * @memberOf LoaderUtils
 * @method getUrlPrepend
 * @param {string} path
 * 		A full file path including the file name
 * @returns {string}
 * 		Removes the file name and extension to retun only the path
 */
export function getUrlPrepend(path) {
	return path ? path.replace(/\/?$/, '/') : ''
}

/**
 * @memberOf LoaderUtils
 * @method getParamsFromData
 * @param {string|object} query
 * 		A query string or object of key/value pairs
 * @returns {string}
 * 		Formats a query string and returns it
 */
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
