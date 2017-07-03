export class InterruptManager {
  private _prevented = false; //  check whether the animation event was prevented

  constructor(private core) {
  }
  isInterrupting() {
    // when interruptable is 'true', return value is always 'true'.
    return this.core.options.interruptable || this._prevented;
  }

  isInterrupted() {
    return !this.core.options.interruptable && this._prevented;
  }

  setInterrupt(prevented) {
    !this.core.options.interruptable && (this._prevented = prevented);
  }
};

