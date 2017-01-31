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
			commonjs2: "eg.component",
			amd: "eg.component",
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
			// {
			// 	test: /(\.js)$/,
			// 	loader: "eslint-loader",
			// 	include: path.resolve(process.cwd(), 'src'),
			// 	exclude: /(node_modules)/,
			// 	enforce: "pre"
			// },
			{
				test: /(\.js)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader'
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
