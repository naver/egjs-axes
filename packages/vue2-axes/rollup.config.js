const buildHelper = require("@egjs/build-helper");

const defaultOptions = {
  sourcemap: true,
  input: "./src/index.ts",
  exports: "named",
  commonjs: true,
  external: {
    "vue": "vue",
    "@vue/composition-api": "@vue/composition-api",
    "@egjs/axes": "@egjs/axes",
  }
};
export default buildHelper([
    {
        ...defaultOptions,
        format: "es",
        output: "./dist/axes.esm.js",
    },
    {
        ...defaultOptions,
        format: "cjs",
        output: "./dist/axes.cjs.js",
    },
]);
