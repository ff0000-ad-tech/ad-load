const path = require("path");
const UglifyJsPlugin = require("webpack").optimize.UglifyJsPlugin;

// prettier-ignore
const babelOptions = {
	"presets": [
		[
			"@babel/preset-env",
			{
				"loose": true,
			}
		]
	],
	"plugins": [
		"@babel/plugin-proposal-class-properties",
		"transform-remove-console"
	]
}

const getConfig = (override = {}) =>
  Object.assign(
    {
      entry: path.resolve(__dirname, "index.js"),
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "umd.min.js",
        library: "adLoad",
        libraryTarget: "umd"
      },
      externals: {
        // point to window as that is where those methods will exist
        "ad-global": "window"
      },
      module: {
        rules: [
          // Rollup + Babel loader to generate smaller bundle, use one entry point
          {
            test: request => {
              const isAdLoadIndex =
                request.includes("ad-load") && request.endsWith("index.js");
              return isAdLoadIndex;
            },
            use: [
              {
                loader: "@ff0000-ad-tech/webpack-rollup-babel-loader",
                options: {
                  babelOptions: {
                    presets: babelOptions.presets
                  },
                  globals: {
                    "ad-global": "window"
                  },
                  // here, list package names for Rollup to assume have already been loaded externally
                  external: ["ad-global"]
                }
              }
            ]
          },
          {
            test: /\.js$/,
            use: [
              {
                loader: "babel-loader",
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
  );

module.exports = [
  // production
  getConfig({
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "umd.min.js",
      library: "adLoad",
      libraryTarget: "umd"
    },
    plugins: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }),
  // debug
  getConfig({
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "umd.debug.js",
      library: "adLoad",
      libraryTarget: "umd"
    }
  })
];
