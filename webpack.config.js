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
		library: "eg",
		libraryTarget: "umd"
	},
	devServer: {
		publicPath: "/dist/"
	},
	devtool: "source-map",
	module: {
		loaders: [
		  {
			test: /\.js$/,
			loader: "babel-loader",
			query: {
			  presets: ["es2015"]
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
