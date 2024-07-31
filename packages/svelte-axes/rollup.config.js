import buildHelper from "@egjs/build-helper";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import nodeResolve from "@rollup/plugin-node-resolve";

const defaultOptions = {
  tsconfig: "",
  commonjs: true,
	external: {
		svelte: "svelte",
	},
	plugins: [
		svelte({
      preprocess: sveltePreprocess(),
    }),
    nodeResolve({
      browser: true
    }),
	],
};

export default buildHelper([
	{
		...defaultOptions,
    input: "./src/svelte-axes/index.ts",
		output: "dist/axes.cjs.js",
		format: "cjs",
    exports: "named",
	},
	{
		...defaultOptions,
    input: "./src/svelte-axes/index.ts",
		output: "dist/axes.esm.js",
		format: "es",
		exports: "named",
	},
]);
