var merge = require("webpack-merge");
var webpack = require("webpack");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var uglifyConfig = require("./uglify");
var banner = require("./banner");

var config = {
	entry: {
		"axes.pkgd": "./src/index.ts",
		"axes.pkgd.min": "./src/index.ts"
	},
	externals: [],
	plugins: [
		new UglifyJSPlugin(uglifyConfig),
		new webpack.BannerPlugin([banner.common, "", banner.pkgd].join("\r\n"))
	]
};

module.exports = function (common) {
	return merge.strategy({
		entry: "replace",
		externals: "replace",
		plugins: "append"
	})(common, config);
};
