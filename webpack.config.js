const { production, debug, debugInlineLoader, prodInlineLoader } = require('./webpackConfigs.js')

module.exports = [production, debug, debugInlineLoader, prodInlineLoader]
