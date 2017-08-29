var webpack = require("webpack");
var pkg = require("./package.json");
var path = require("path");
var StringReplacePlugin = require("string-replace-webpack-plugin");

var config = {
	entry: {
		"axes": "./src/index.ts"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		library: [pkg.namespace.eg, "Axes"],
		libraryTarget: "umd",
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
	devtool: "cheap-source-map",
	resolve: {
    extensions: [".ts", ".js"]
  },
	module: {
		rules: [
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
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new StringReplacePlugin()
	]
};

module.exports = function (env) {
	env = env || "development";
	return require("./config/webpack.config." + env + ".js")(config);
};
