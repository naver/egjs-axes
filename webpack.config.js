var webpack = require("webpack");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var path = require("path");

var config = {
	entry: {
		"eg.movableCoord": "./src/index.js"
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
				loader: "babel-loader"
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname),
			verbose: true, 
			dry: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			minimize: true
		}),
		new webpack.BannerPlugin([
			"베너테스트"
		].join(""))
	]
};

module.exports = function(env) {
	env = env || {};
	if(env.mode === "production") {
		for(var p in config.entry) {
			config.entry[p + ".min"] = config.entry[p];
		}
	}

	return config;
};
