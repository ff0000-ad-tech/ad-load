export const LoaderBase = superclass =>
	class extends superclass {
		constructor(...args) {
			super(...args)
			const arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {}

			const L = this

			L.onComplete = arg.onComplete || function() {}
			L.onFail = arg.onFail || function() {}
			L.onProgress = arg.onProgress || function() {}
			L.name = arg.name || ''
			L.scope = arg.scope || L
			L.dataRaw
			L.cacheBuster = arg.cacheBuster || false

			L._failCalled = false
		}

		_handleFail() {
			const L = this
			// console.log( 'LoaderBase._handleFail()' )
			if (!L._failCalled) {
				L._failCalled = true
				L.onFail.call(L.scope, L)

				console.log('Loader "' + L.name + '" Fail:', L.url)
			}
		}
	}
