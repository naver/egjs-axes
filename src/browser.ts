// tslint:disable-next-line:max-line-length
const win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
// tslint:enable-next-line:max-line-length

export {win as window};
export const document = win.document;
