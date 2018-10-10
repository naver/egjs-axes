import typescript from 'rollup-plugin-typescript';
import { uglify } from "rollup-plugin-uglify";
import resolve from 'rollup-plugin-node-resolve';
import PrototypeMinify from "rollup-plugin-prototype-minify";
import replace from "rollup-plugin-replace";

const version = require("./package.json").version;
var merge = require("./config/merge");
var banner = require("./config/banner");

var uglifyCode = uglify({
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
});
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
  input: "src/index.umd.ts",
  plugins: [plugin, PrototypeMinify({ sourcemap: true }), replace({
    "#__VERSION__#": version,
    "/** @class */": "/*#__PURE__*/",
    delimiters: ["", ""],
  })],
  output: {
    banner: banner.banner,
    freeze: false,
    format: "umd",
    exports: "default",
    interop: false,
    sourcemap: true,
  }
}

var entries = [
  {
    input: "src/index.ts",
    output: {
      format: "es",
      exports: "named",
      file: "./dist/axes.esm.js",
    }
  },
  {
    external: ["@egjs/hammerjs", "@egjs/component"],
    output: {
      name: "eg.Axes",
      file: "./dist/axes.js",
      globals: {
        "@egjs/hammerjs": "Hammer",
        "@egjs/component": "eg.Component",
      },
    }
  },
  {
    external: ["@egjs/hammerjs", "@egjs/component"],
    plugins: [uglifyCode],
    output: {
      name: "eg.Axes",
      file: "./dist/axes.min.js",
      globals: {
        "@egjs/hammerjs": "Hammer",
        "@egjs/component": "eg.Component",
      },
    }
  },
  {
    plugins: [resolve()],
    output: {
      banner: banner.pkgd,
      name: "eg.Axes",
      file: "./dist/axes.pkgd.js",
    }
  },
  {
    plugins: [resolve(), uglifyCode],
    output: {
      banner: banner.pkgd,
      name: "eg.Axes",
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