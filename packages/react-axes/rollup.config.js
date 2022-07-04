const buildHelper = require("@egjs/build-helper");

export default buildHelper([
	{
		input: "./src/react-axes/index.tsx",
		output: "./dist/axes.cjs.js",
		format: "cjs",
		exports: "named",
	},
	{
		input: "./src/react-axes/index.tsx",
		output: "./dist/axes.esm.js",
		format: "esm",
		exports: "named",
	},
]);

