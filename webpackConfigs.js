const path = require('path')
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin

const getBaseConfig = (override = {}, babelOptions, wrbLoaderTest) =>
	Object.assign(
		{
			entry: path.resolve(__dirname, 'index.js'),
			output: {
				path: path.resolve(__dirname, 'dist'),
				filename: 'umd.min.js',
				library: 'adLoad',
				libraryTarget: 'umd'
			},
			externals: {
				// point to window as that is where those methods will exist
				'ad-global': 'window'
			},
			module: {
				rules: [
					// Rollup + Babel loader to generate smaller bundle, use one entry point
					{
						test: wrbLoaderTest,
						use: [
							{
								loader: '@ff0000-ad-tech/webpack-rollup-babel-loader',
								options: {
									babelOptions: {
										presets: babelOptions.presets
									},
									globals: {
										'ad-global': 'window'
									},
									// here, list package names for Rollup to assume have already been loaded externally
									external: ['ad-global']
								}
							}
						]
					},
					{
						test: /\.js$/,
						use: [
							{
								loader: 'babel-loader',
								options: {
									plugins: babelOptions.plugins
								}
							}
						]
					}
				]
			}
		},
		override
	)

const isAdLoadTest = request => {
	const isAdLoadIndex = request.includes('ad-load') && request.endsWith('index.js')
	return isAdLoadIndex
}

const isInlineLoaderTest = request => {
	const isAdLoadIndex = request.includes('ad-load') && request.endsWith('InlineLoader.js')
	return isAdLoadIndex
}

const debugBabelOptions = {
	presets: [
		[
			'@babel/preset-env',
			{
				loose: true
			}
		]
	],
	plugins: ['@babel/plugin-proposal-class-properties']
}

const prodBabelOptions = {
	presets: [
		[
			'@babel/preset-env',
			{
				loose: true
			}
		]
	],
	plugins: ['@babel/plugin-proposal-class-properties', 'transform-remove-console']
}

const prodPlugins = () => [
	new UglifyJsPlugin({
		uglifyOptions: {
			compress: {
				drop_console: true
			}
		}
	})
]

const debugInlineLoaderConfig = getBaseConfig(
	{
		entry: path.resolve(__dirname, 'lib/single/InlineLoader.js'),
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'umd.inline-loader.debug.js',
			library: 'inlineLoader',
			libraryTarget: 'umd'
		}
	},
	debugBabelOptions,
	isInlineLoaderTest
)

const prodInlineLoaderConfig = getBaseConfig(
	{
		entry: path.resolve(__dirname, 'lib/single/InlineLoader.js'),
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'umd.inline-loader.min.js',
			library: 'inlineLoader',
			libraryTarget: 'umd'
		},
		plugins: prodPlugins()
	},
	prodBabelOptions,
	isInlineLoaderTest
)

const productionConfig = getBaseConfig(
	{
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'umd.min.js',
			library: 'adLoad',
			libraryTarget: 'umd'
		},
		plugins: prodPlugins()
	},
	prodBabelOptions,
	isAdLoadTest
)

const debugConfig = getBaseConfig(
	{
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'umd.debug.js',
			library: 'adLoad',
			libraryTarget: 'umd'
		}
	},
	debugBabelOptions,
	isAdLoadTest
)

module.exports = getBaseConfig
module.exports.production = productionConfig
module.exports.debug = debugConfig
module.exports.prodInlineLoader = prodInlineLoaderConfig
module.exports.debugInlineLoader = debugInlineLoaderConfig
