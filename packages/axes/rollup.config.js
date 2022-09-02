const buildHelper = require("@egjs/build-helper");

const external = {
  "@egjs/agent": "eg.agent",
  "@egjs/component": "Component",
};
const name = "eg.Axes";
const fileName = "axes";

export default buildHelper([
  {
    name,
    input: "./src/index.umd.ts",
    output: `./dist/${fileName}.js`,
    format: "umd",
    external
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: `./dist/${fileName}.min.js`,
    format: "umd",
    uglify: true,
    external
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: `./dist/${fileName}.pkgd.js`,
    format: "umd",
    resolve: true
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: `./dist/${fileName}.pkgd.min.js`,
    format: "umd",
    resolve: true,
    uglify: true
  },
  {
    input: "./src/index.cjs.ts",
    output: `./dist/${fileName}.cjs.js`,
    format: "cjs",
    exports: "named",
  },
  {
    input: "./src/index.ts",
    output: `./dist/${fileName}.esm.js`,
    format: "esm",
    external,
    exports: "named"
  }
]);
