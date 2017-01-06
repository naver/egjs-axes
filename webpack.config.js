var webpack = require("webpack");
var path = require("path");

module.exports = {
	entry: {
		"eg.movableCoord": "./src/index.js",
		"eg.movableCoord.min": "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		library:  ["eg", "MovableCoord" ],
		libraryTarget: "umd",
	},
	externals: [{
		"eg.component": {
			commonjs: "eg.component",
			amd: "eg.Component",
			root: ["eg", "Component"]
		},
		"hammerjs": "Hammer"
	}],
	devServer: {
		publicPath: "/dist/"
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /(\.js)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				options: {
					"presets": [ 
						"es2015-native-modules"
					]
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
		  include: /\.min\.js$/,
		  minimize: true
		})
	]
};
