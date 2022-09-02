/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Axes, * as modules from "./index";

for (const name in modules) {
  (Axes as any)[name] = (modules as any)[name];
}

declare const module: any;
module.exports = Axes;
export default Axes;
export * from "./index";
