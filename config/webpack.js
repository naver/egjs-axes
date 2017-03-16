var webpack = require("webpack");
var pkg = require("../package.json");
var path = require("path");
var StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {
	entry: {
		"movablecoord": "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "[name].js",
		library: ["eg", "MovableCoord"],
		libraryTarget: "umd"
	},
	externals: [{
		"@egjs/component": {
			commonjs: "@egjs/component",
			commonjs2: "@egjs/component",
			amd: "@egjs/component",
			root: ["eg", "Component"]
		},
		"hammerjs": {
			commonjs: "hammerjs",
			commonjs2: "hammerjs",
			amd: "hammerjs",
			root: "Hammer"
		}
	}],
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /(\.js)$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				options: {
					"presets": [ 
						[
							"es2015",
							{
								"loose": true,
								"modules": false
							}
						]
					],
					"plugins": [
						"add-module-exports"
					]
				}
			},
			{
				test: /(\.js)$/,
				loader: StringReplacePlugin.replace({
					replacements: [
						{
							pattern: /#__VERSION__#/ig,
							replacement: function (match, p1, offset, string) {
								return pkg.version;
							}
						}
					]}
				)
            }
		]
	},
	plugins: [new StringReplacePlugin()]
};
