/**
 * @class Loader
 * @param {string|array|Loader} target
 * 	load target
 * @param {object} arg
 * 	Object with any of the following optional parameters for customizing the load routine.
 * @property {string} name
 * @property {boolean} prioritize
 * @property {boolean} cacheBuster
 * @property {object} scope
 * @property {function} onComplete
 * @property {function} onProgress
 * @property {function} onFail
 * @property {string} prepend
 * 	A file path to be added to all loader targets.
 * @property {function} platformGetUrl
 * 	A callback method to wrap the url, such as DoubleClick's <code>Enabler.getUrl</code>.
 * @property {string} fileType
 * 	Manually assign the file type, eg: <code>jpg</code>, <code>svg</code>.
 * @desc
 * This class is designed to handle all load processes: images, fonts and data, even other Loaders! Below are multiple use case scenarios.
 * <br><br>
 * <b>Single Load:</b>
 * <codeblock>
 * import { Loader } from 'ad-load'
 *
 * var singleLoader = new Loader('images/img0.jpg', { onComplete:handleLoadComplete, scope:this })
 * singleLoader.load()
 *
 * function handleLoadComplete(target) {
 * 	console.log(target.content[0].dataRaw)
 * }
 * </codeblock>
 * <br><br>
 * <b>Array of loads from one Constructor:</b>
 * <codeblock>
 * // Array load - you can pass in multiple files on creation of a Loader
 * var arrayLoader = new Loader(['font1.ttf', 'font2.ttf'], { name:'fontLoader', onComplete:handleLoadComplete, prepend:adParams.commonPath + 'fonts/' })
 * arrayLoader.load()
 *
 * function handleLoadComplete(target) {
 * 	console.log(target.content[0].dataRaw)
 * }
 * </codeblock>
 * <br><br>
 * <b>Complex Load:</b>
 * <codeblock>
 * var myLoader = new Loader('images/img0.jpg', { onComplete:handleLoadComplete, scope:this })
 *
 * // append to that loader
 * myLoader.add('images/img1.jpg')
 *
 * // append multiple
 * myLoader.add(['images/img2.jpg', 'images/img3.jpg'])
 * myLoader.load()
 *
 * function handleLoadComplete(target) {
 * 	console.log( target.content[0].dataRaw )
 * }
 * </codeblock>
 * <br><br>
 * <b>Nested Loads:</b>
 * <codeblock>
 * // Nested loads - best practice is to make a loader for one file type
 * var masterLoader = new Loader({ name:'master', onComplete:handleAllComplete, onProgress:handleAllProgress, onFail:handleLoadFail, scope:this })
 *
 * // declare a var to reference later, then add it to main loader
 * var _imgLoader = new Loader(['images/img2.jpg', 'images/img3.jpg'], { name:'load_images', prepend:'images/' })
 * masterLoader.add(_imgLoader)
 *
 * // or just add a new loader instance
 * masterLoader.add(
 * 	new Loader(['font1.ttf', 'font2.ttf' ], { name:'load_fonts', prepend: 'fonts/' })
 * )
 * masterLoader.add(
 * 	new Loader(['AdData.js', 'Align.js', 'Clamp.js'], { name:'load_js', prepend: 'utils/' })
 * )
 * masterLoader.load()
 *
 * function handleLoadComplete(target) {
 * 	console.log(target.content[0].dataRaw)
 * }
 * function handleLoadProgress(target) {
 * 	console.log(target.progress, target.rawProgress)
 * }
 * function handleLoadFail(target) {
 * 	console.log(target);
 * }
 * function handleAllComplete(target) {
 * 	var a = target.getLoader(_imgLoader)
 * 	console.log("Loader found by var:", a)
 *
 * 	var b = target.getContent('font1.ttf')
 * 	console.log("Content found by name:", b)
 *
 * 	var c = target.getLoader('load_fonts')
 * 	console.log("Loader found by url:", c)
 * }
 * </codeblock>
 */

/* TODO
	- change getAllContent() to take secret boolean so can call getAllContentRaw(true) for no extra loop
	- ? comment out progress calculations
*/

import { fbaDataToBlobs } from 'ad-global'

import { LoaderBase } from './lib/mixin/LoaderBase.js'
import * as Utils from './lib/mixin/LoaderUtils.js'
import ImageLoader from './lib/single/ImageLoader.js'
import InlineLoader from './lib/single/InlineLoader.js'
import DataLoader from './lib/single/DataLoader.js'
import FontLoader from './lib/single/FontLoader.js'
import { setTicker } from './lib/mixin/LoaderTickerMixin.js'

export { Utils as LoaderUtils, ImageLoader, InlineLoader, DataLoader, FontLoader, setTicker }

export default class Loader extends LoaderBase {
	constructor(...args) {
		super(...args)
		let arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {}

		const L = this

		L._queue = {}
		L._total = 0
		L._active = false
		L._startedCount = 0

		L.prepend = arg.prepend || ''
		L.platformGetUrl = arg.platformGetUrl
		L.fileType = arg.fileType || null
		L.content = []
		L.crossOrigin = arg.crossOrigin || undefined

		L.add(arguments[0])
	}

	/* ---------------------------------------------------------------------------------------------------------------- */
	// PUBLIC

	/**
	 * @memberOf Loader
	 * @method add
	 * @param {string|array|Loader} arg
	 * 	a file, array of files, or Loader instance
	 * @desc
	 * 	Add to the load queue: a single or array of files or even another Loader.
	 * @example
	 * // Single load
	 * var imgLoader = new Loader({ name:'img_loader' })
	 *
	 * // add to that loader
	 * imgLoader.add('images/img1.jpg')
	 *
	 * // add multiple
	 * imgLoader.add(['images/img2.jpg', 'images/img3.jpg'])
	 *
	 * // Nested loads - best practice is to make a loader for one file type
	 * var mainLoader = new Loader({ name:'main', onComplete:handleComplete })
	 *
	 * mainLoader.add(imgLoader)
	 *
	 * // or just add a new loader instance
	 * mainLoader.add(new Loader(['font1.ttf', 'font2.ttf'], { name:'load_fonts' }))
	 */
	add(arg) {
		const L = this
		if (typeof arg === 'string') {
			// single load as first parameter
			L._addSingleLoad(arg)
		} else if (arg instanceof Array) {
			// first parameter is an Array of urls
			for (var i = 0; i < arg.length; i++) {
				L._addSingleLoad(arg[i])
			}
		} else if (arg instanceof Loader) {
			if (arg.content && arg.content[0] && arg.content[0].fileType == 'fba') {
				L._addFbaSubLoads(arg.content[0])
			} else {
				L._addSubLoad(arg)
			}
		}
	}

	/**
	 * @memberOf Loader
	 * @method load
	 * @desc
	 * 	Starts the load process.
	 * @example
	 * // Single load
	 * var imgLoader = new Loader({ onComplete:handleComplete })
	 * imgLoader.load()
	 */
	load() {
		const L = this
		L._active = true
		if (L._total <= 0) {
			console.log('Loader "' + L.name + '" has NO assets to be loaded.')
		} else {
			let _has = false
			let _output = ''
			for (let l in L._queue) {
				if (!(L._queue[l] instanceof Loader)) {
					if (!_has) {
						_has = true
						_output += 'Loader "' + L.name + '" requesting:'
					}
					const fileName = L._queue[l].fileName
					const extension = L._queue[l].fileType
					const extensionIndex = fileName.indexOf('.' + extension)
					const fileAndExtension = extensionIndex > -1 ? fileName : fileName + '.' + extension
					_output += '\n\t -> ' + (L._queue[l].prepend || '') + fileAndExtension
				}
			}
			if (_has) {
				console.log(_output)
			}
		}

		L._startSingleLoad(0)
	}

	/**
	 * @memberOf Loader
	 * @method getAllContent
	 * @returns {array}
	 * 	An array of LoaderData Objects with relevant loading information (like an Event Object).
	 * 	Access the loaded content via the property 'dataRaw': an image, raw Json, raw XML, or font name
	 * @desc
	 * 	Get all loaded content from the Loader and all nested Loaders
	 * @example
	 *  var myLoader = new Loader(['img1.jpg', 'img2.jpg', 'img3.jpg'], { onComplete:handleComplete })
	 *  myLoader.load()
	 *
	 *  function handleComplete(target) {
	 *  	var myContent = target.getAllContent()
	 *  	console.log("Content found:", myContent)
	 *  }
	 */
	getAllContent() {
		let _found = []
		function searchSubLoader(content) {
			for (let i = 0; i < content.length; i++) {
				//console.log( "   -> sub:", content[i] )
				if (content[i] instanceof Loader) {
					searchSubLoader(content[i].content)
				} else {
					_found.push(content[i])
				}
			}
		}

		searchSubLoader(this.content)

		if (_found.length < 1) {
			console.log('No Content found')
		}

		return _found
	}

	/**
	 * @memberOf Loader
	 * @method getAllContentRaw
	 * @returns {array}
	 * 	An array of only the raw data: an image, raw Json, raw XML, or font name
	 * @desc
	 * 	Get all raw loaded content from the Loader and all nested Loaders, no LoaderData Objects
	 * @example
	 * var myLoader = new Loader(['img1.jpg', 'img2.jpg', 'img3.jpg'], { onComplete:handleComplete })
	 * myLoader.load()
	 *
	 * function handleComplete(target) {
	 * 	var myContent = target.getAllContentRaw()
	 * 	console.log("Content found:", myContent)
	 * }
	 */
	getAllContentRaw() {
		let _content = this.getAllContent()
		for (let i = 0; i < _content.length; i++) {
			_content[i] = _content[i].dataRaw
		}
		return _content
	}

	/**
	 * @memberOf Loader
	 * @method getLoader
	 * @param {string} id
	 * 	the string optionally assigned to the 'name' property or the variable assigned to the Loader instance
	 * @returns {Loader}
	 * @desc
	 * 	Get the Loader instance from the Loader or any nested Loader
	 * @example
	 * var mainLoader = new Loader({ name:'main', onComplete:handleLoadComplete })
	 * mainLoader.add(
	 * 	new Loader(['font1.ttf', 'font2.ttf'], { name: 'load_fonts', prepend: 'fonts/' }
	 * 	)
	 * )
	 * mainLoader.add(
	 * 	new Loader(['Ad_Data.js', 'NetUtils.js'], { name: 'load_js', prepend: 'utils/' })
	 * )
	 * mainLoader.load()
	 *
	 * function handleLoadComplete(target) {
	 * 	var fontLoader = target.getLoader('load_fonts')
	 * }
	 */
	getLoader(id) {
		let _found = null
		function searchSubLoader(content) {
			for (let i = 0; i < content.length; i++) {
				//console.log( "   -> sub:", content[i] )
				if (content[i] instanceof Loader) {
					if (content[i] && (content[i].name === id || content[i] === id)) {
						_found = content[i]
					} else {
						searchSubLoader(content[i].content)
					}
				}
			}
		}

		searchSubLoader(this.content)

		if (!_found) {
			console.log('No Loader found of that name')
		}

		return _found
	}

	// -------------------------------------------------------------------------------------------------------------
	// PRIVATE METHODS
	_addSingleLoad(url, fileName, fileTypeOverwrite) {
		const L = this

		// fileTypeOverwrite can be a string of the explicit file type
		const fileType = fileTypeOverwrite || L.fileType || Utils.getFileType(url)
		let loaderType

		switch (fileType) {
			case 'jpg':
			case 'jpeg':
			case 'gif':
			case 'png':
			case 'svg':
				loaderType = ImageLoader
				break
			case 'ttf':
			case 'woff':
				loaderType = FontLoader
				break
			case 'json':
			case 'fba':
			case 'bin':
			case 'binary':
			case 'svg+xml':
				loaderType = DataLoader
				break
			default:
				loaderType = InlineLoader
		}

		// either the data as binary OR the file path and name
		const urlChoice = fileTypeOverwrite ? url : L.prepend + url
		// console.log('\t url:', url, '| loaderType:', loaderType)

		var singleLoader = new loaderType(urlChoice, {
			scope: L,
			platformGetUrl: L.platformGetUrl,
			onComplete: L._handleSingleLoadComplete,
			onFail: L._handleFail,
			fileType: fileType,
			cacheBuster: L.cacheBuster,
			crossOrigin: L.crossOrigin
		})
		// console.log('\t singleLoader:', singleLoader)

		// from fba, the files are binary, so there is
		// no file name to reference so set it here
		if (fileName) {
			singleLoader.fileName = fileName
		}

		singleLoader.queueIndex = L._total

		L._queue[L._total] = singleLoader
		L._total++
		// console.log(L._total, L._queue)
	}

	_addSubLoad(loader) {
		const L = this
		//console.log(L.name, '_addSubLoad()')
		loader.onComplete = L._handleSingleLoadComplete.bind(L)
		loader.onProgress = L._handleProgress.bind(L)
		loader.onFail = L._handleFail
		//loader.platformGetUrl = L.platformGetUrl;
		loader.queueIndex = L._total
		L._queue[L._total] = loader
		L._total++
	}

	_addFbaSubLoads(loader) {
		const blobs = fbaDataToBlobs(loader.dataRaw)
		blobs.forEach(blob => {
			this._addSingleLoad(blob.src, blob.path, blob.fileType)
		})
	}

	_startSingleLoad(i) {
		const L = this
		const _inst = L._queue[i]
		// console.log(L.name, '_startSingleLoad()', 'index:', i, 'total:', L._total)
		if (L._total == 0) {
			// fire a complete because there are no requests
			L._handleComplete()
		} else {
			if (i < L._total) {
				// console.log( L.name, '_startSingleLoad() ->', _inst )
				if (!(_inst instanceof Loader)) {
					//console.log( _inst.name, 'is a subloader' )
					//} else {
					if (i < L._total - 1) {
						L._startLoadTimeOut(++i)
					}
				}
				_inst.load()
			}
		}
	}

	_startLoadTimeOut(i) {
		const L = this
		setTimeout(() => {
			L._startSingleLoad(i)
		}, 10)
	}

	// -------------------------------------------------------------------------------------------------------------
	// EVENT HANDLERS
	_handleSingleLoadComplete(target) {
		const L = this
		// console.log('_handleSingleLoadComplete(), target:', target)
		L.content[target.queueIndex] = target
		delete L._queue[target.queueIndex]

		L._handleProgress()

		// is a nested Loader
		if (target.url == undefined) {
			//console.log( '"' + L.name + '" nested Loader "' + target.name + '" Complete' );
			if (target.queueIndex < L._total - 1) {
				L._startLoadTimeOut(target.queueIndex + 1)
			}
		}
	}

	_handleProgress() {
		const L = this
		const _length = L.content.length
		let _count = 0
		for (let i = 0; i < _length; i++) {
			if (L.content[i]) _count++
		}
		// console.log(L.name, '_handleProgress()', '_count:', _count, 'total:', L._total)

		const _consecutive = _count
		let _subProgress = 0

		if (_count < L._total && L._queue[_count]) {
			_subProgress = L._queue[_count].progress / L._total || 0
		}

		L.progress = _consecutive / L._total + _subProgress
		L.rawProgress = _count / L._total + _subProgress

		L.onProgress.call(L.scope, L)
		//console.log( 'progress')
		if (_count >= L._total) {
			//console.log( 'Loader calling _handleComplete()')
			L._handleComplete()
		}
	}

	_handleComplete() {
		const L = this
		// console.log('Loader "' + L.name + '" is Complete')
		L.onComplete.call(L.scope, L)
	}
}
