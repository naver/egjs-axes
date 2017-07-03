var webpack = require("webpack");
var pkg = require("./package.json");
var path = require("path");
var StringReplacePlugin = require("string-replace-webpack-plugin");

var config = {
	entry: {
		"axes": "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		library: [pkg.namespace.eg, "Axes"],
		libraryTarget: "umd",
		umdNamedDefine: true
	},
	externals: {
		"@egjs/component" : {
			commonjs: "@egjs/component",
			commonjs2: "@egjs/component",
			amd: "@egjs/component",
			root: [pkg.namespace.eg, "Component"]
		},
		"hammerjs": {
			commonjs: "hammerjs",
			commonjs2: "hammerjs",
			amd: "hammerjs",
			root: pkg.namespace.Hammer,
		},
	},
	resolve: {
    extensions: [".ts", ".js"]
  },
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		},
		{
			test: /\.ts$/,
			exclude: /node_modules/,
			loader: "awesome-typescript-loader"
		},
		{
			test: /(\.js)$/,
			loader: StringReplacePlugin.replace({
				replacements: [{
					pattern: /#__VERSION__#/ig,
					replacement: function (match, p1, offset, string) {
						return pkg.version;
					}
				}]
			})
		}]
	},
	plugins: [new StringReplacePlugin()]
};

module.exports = function (env) {
	env = env || "development";
	return require("./config/webpack.config." + env + ".js")(config);
};
