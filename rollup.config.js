import typescript from 'rollup-plugin-typescript';
import { uglify } from "rollup-plugin-uglify";
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import PrototypeMinify from "rollup-plugin-prototype-minify";
var merge = require("./config/merge");

var plugin = typescript({
  "module": "es2015",
  "target": "es3",
  "lib": ["es2015", "dom"],
  "exclude": [],
  "sourceMap": true,
  "skipLibCheck": true,
  "moduleResolution": "node",
});
var defaultConfig = {
  plugins: [plugin, PrototypeMinify({sourcemap: true})],
  output: {
    format: "es",
    freeze: false,
    exports: "named",
    interop: false,
    sourcemap: true,
  }
}

var entries = [
  {
    input: "src/index.ts",
    output: {
      file: "./dist/axes.esm.js",
    }
  },
  {
    input: "src/index.ts",
    output: {
      format: "cjs",
      file: "./dist/axes.common.js",
    }
  },
  {
    input: "src/index.umd.ts",
    plugins: [resolve(), commonjs()],
    output: {
      format: "umd",
      name: "eg.Axes",
      exports: "default",
      file: "./dist/axes.pkgd.js",
    }
  },
  {
    input: "src/index.umd.ts",
    plugins: [resolve(), commonjs(), uglify({ sourcemap: true })],
    output: {
      format: "umd",
      name: "eg.Axes",
      exports: "default",
      file: "./dist/axes.pkgd.min.js",
    }
  },
];

export default entries.map(entry => {
  return merge(defaultConfig, entry, {
    plugins: "append",
    output: "append",
  });
});