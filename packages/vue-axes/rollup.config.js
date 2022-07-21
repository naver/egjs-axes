const commonjs = require("rollup-plugin-commonjs");
const buildHelper = require("@egjs/build-helper");

export default buildHelper([
	{
		input: "./src/vue-axes/index.ts",
		output: "./dist/axes.cjs.js",
		format: "cjs",
		exports: "named",
		external: {
			"vue": "vue",
			"@egjs/axes": "@egjs/axes",
		}
	},
	{
		input: "./src/vue-axes/index.ts",
		output: "./dist/axes.esm.js",
		format: "esm",
		exports: "named",
		external: {
			"vue": "vue",
			"@egjs/axes": "@egjs/axes",
		}
	},
]);

