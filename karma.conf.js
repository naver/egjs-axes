
module.exports = function (config) {
	var karmaConfig = {
		frameworks: ["mocha", "chai", "sinon"],

		// list of files / patterns to load in the browser
		files: [
			"./node_modules/lite-fixture/index.js",
			"./node_modules/hammer-simulator/index.js",
      "./test/hammer-simulator.run.js",
			"./test/unit/**/*.spec.js"
		],

		client: {
			mocha: {
				opts: "./mocha.opts"
			}
		},

		webpack: {
			devtool: "inline-source-map",
			resolve: {
				extensions: [".ts", ".js"]
			},
			module: {
				rules: [{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: "babel-loader",
					},
					{
						test: /\.ts$/,
						exclude: /node_modules/,
						loader: "awesome-typescript-loader"
					}
				]
			}
		},

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			"./test/**/*.spec.js": config.coverage ? ["webpack"] : ["webpack",
				"sourcemap"
			]
		},

		browsers: [],

		reporters: ["mocha"],
		webpackMiddleware: {
			noInfo: true
		}
	};

	karmaConfig.browsers.push(config.chrome ? "Chrome" : "ChromeHeadless");

	if (config.coverage) {
		karmaConfig.reporters.push("coverage-istanbul");
		karmaConfig.coverageIstanbulReporter = {
			reports: ["text-summary", "html", "lcovonly"],
			dir: "./coverage"
		};
		karmaConfig.webpack.module.rules.unshift({
			test: /\.js$/,
			exclude: /(node_modules|test)/,
			loader: "istanbul-instrumenter-loader"
		});
		karmaConfig.singleRun = true;
	}

	config.set(karmaConfig);
};
