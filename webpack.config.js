const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const babelOptions = {
	"presets": [
		[
			"env",
			{
				"loose": true,
			}
		]
	],
	"plugins": [
		"transform-class-properties"
	]
}

module.exports = {
	entry: path.resolve(__dirname, 'index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'umd.min.js',
		library: 'adLoad',
		libraryTarget: 'umd'
	},
	// copy UglifySettings
	plugins: [
		new UglifyJsPlugin({
			uglifyOptions: {
				drop_console: DM.deploy.get().output.logs ? false : true
			}
		})
	],
	module: {
		rules: [
			// Rollup + Babel loader to generate smaller bundle, use one entry point
			{
				test: (request) => {
					const isAdLoadIndex = request.includes('ad-load') && request.endsWith('index.js')
					return isAdLoadIndex
				},
				use: [{
					loader: 'webpack-rollup-babel-loader',
					options: {
						babelOptions: {
							presets: babelOptions.presets,
						},
					}
				}]
			},
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader',
					options: {
						plugins: babelOptions.plugins,
					},
				}]
			}
		]
	},
}