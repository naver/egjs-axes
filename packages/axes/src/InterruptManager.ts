/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { AxesOption } from "./Axes";
export class InterruptManager {
  private _prevented = false; //  check whether the animation event was prevented
  public constructor(private _options: AxesOption) {}

  public isInterrupting() {
    // when interruptable is 'true', return value is always 'true'.
    return this._options.interruptable || this._prevented;
  }

  public isInterrupted() {
    return !this._options.interruptable && this._prevented;
  }

  public setInterrupt(prevented) {
    if (!this._options.interruptable) {
      this._prevented = prevented;
    }
  }
}
