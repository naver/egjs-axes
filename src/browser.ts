/* eslint-disable no-new-func, no-nested-ternary */

let win: any;

if (typeof window === "undefined") {
  // window is undefined in node.js
  win = {
    navigator: {
      userAgent: "",
    },
  };
} else {
  win = window;
}
/* eslint-enable no-new-func, no-nested-ternary */

export { win as window };
