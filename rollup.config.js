import typescript from 'rollup-plugin-typescript';
import { uglify } from "rollup-plugin-uglify";
import resolve from 'rollup-plugin-node-resolve';
import PrototypeMinify from "rollup-plugin-prototype-minify";
import replace from "rollup-plugin-replace";

const version = require("./package.json").version;
var merge = require("./config/merge");
var banner = require("./config/banner");

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
  plugins: [plugin, PrototypeMinify({ sourcemap: true }), replace({"#__VERSION__#": version, delimiters: ["", ""]})],
  output: {
    banner: banner.banner,
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
    plugins: [resolve()],
    output: {
      banner: banner.pkgd,
      format: "umd",
      name: "eg.Axes",
      exports: "default",
      file: "./dist/axes.pkgd.js",
    }
  },
  {
    input: "src/index.umd.ts",
    plugins: [resolve(), uglify({
      sourcemap: true,
      output: {
        comments: function (node, comment) {
          const text = comment.value;
          const type = comment.type;

          if (type === "comment2") {
            // multiline comment
            return /@egjs\/axes/.test(text);
          }
          return false;
        }
      }
    })],
    output: {
      banner: banner.pkgd,
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