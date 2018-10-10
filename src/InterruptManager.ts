import { AxesOption } from "./Axes";
export class InterruptManager {
	private _prevented = false; //  check whether the animation event was prevented
	constructor(private options: AxesOption) { }

	isInterrupting() {
		// when interruptable is 'true', return value is always 'true'.
		return this.options.interruptable || this._prevented;
	}

	isInterrupted() {
		return !this.options.interruptable && this._prevented;
	}

	setInterrupt(prevented) {
		!this.options.interruptable && (this._prevented = prevented);
	}
}
