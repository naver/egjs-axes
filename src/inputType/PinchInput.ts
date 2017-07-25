import { InputObserver } from "./../InputObserver";
import * as Hammer from "hammerjs";
import { $ } from "../utils";
import { UNIQUEKEY, toAxis, convertInputType, createHammer, IInputType, IInputTypeObserver } from "./InputType";
import { Axis } from "../AxisManager";

export interface PinchInputOption {
	scale?: number;
	threshold?: number;
}

export class PinchInput implements IInputType {
	options: PinchInputOption;
	axes: string[] = [];
	hammer = null;
  element: HTMLElement = null;
  private observer: IInputTypeObserver;
  private _prev: number = null;
	constructor(el, options: PinchInputOption) {
		/**
		 * Hammer helps you add support for touch gestures to your page
		 *
		 * @external Hammer
		 * @see {@link http://hammerjs.github.io|Hammer.JS}
		 * @see {@link http://hammerjs.github.io/jsdoc/Hammer.html|Hammer.JS API documents}
		 * @see Hammer.JS applies specific CSS properties by {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html|default} when creating an instance. The eg.Axes module removes all default CSS properties provided by Hammer.JS
		 */
		if (typeof Hammer === "undefined") {
			throw new Error(`The Hammerjs must be loaded before eg.Axes.PinchInput.\nhttp://hammerjs.github.io/`);
		}
		this.element = $(el);
		this.options = {
			...{
				scale: 1,
				threshold: 0
			}, ...options
    };
		this.onPinchStart = this.onPinchStart.bind(this);
		this.onPinchMove = this.onPinchMove.bind(this);
		this.onPinchEnd = this.onPinchEnd.bind(this);
	}

	mapAxes(axes: string[]) {
		this.axes = axes;
	}

	connect(observer: IInputTypeObserver): IInputType {
    const hammerOption = {
			threshold: this.options.threshold,
		};
    if (this.hammer) { // for sharing hammer instance.
      this.dettachEvent();
			// hammer remove previous PinchRecognizer.
			this.hammer.add(new Hammer.Pinch(hammerOption));
    } else {
      let keyValue: string = this.element[UNIQUEKEY];
			if (keyValue) {
				this.hammer.destroy();
			} else {
				keyValue = String(Math.round(Math.random() * new Date().getTime()));
			}
      this.hammer = createHammer(this.element,
        [Hammer.Pinch, hammerOption],
        Hammer.TouchInput);
			this.element[UNIQUEKEY] = keyValue;
		}
		this.attachEvent(observer);
		return this;
	}

  disconnect() {
		if (this.hammer) {
			this.dettachEvent();
		}
		return this;
	}

	destroy() {
		this.disconnect();
		if (this.hammer) {
			this.hammer.destroy();
		}
		delete this.element[UNIQUEKEY];
		this.element = null;
		this.hammer = null;
	}

  private onPinchStart(event) {
    this._prev = event.scale;
    this.observer.hold(this, event);
  }
  private onPinchMove(event) {
    const offset = (event.scale - this._prev) * this.options.scale;
    this.observer.change(this, event, toAxis(this.axes, [offset]));
    this._prev = event.scale;
  }
  private onPinchEnd(event) {
    this.observer.release(this, event, toAxis(this.axes, [0]), 0);
    this._prev = null;
  }

	private attachEvent(observer: IInputTypeObserver) {
    this.observer = observer;
    this.hammer.on("pinchstart", this.onPinchStart)
      .on("pinchmove", this.onPinchMove)
      .on("pinchend", this.onPinchEnd);
	}

	private dettachEvent() {
    this.hammer.off("pinchstart", this.onPinchStart)
      .off("pinchmove", this.onPinchMove)
      .off("pinchend", this.onPinchEnd);
    this.observer = null;
    this._prev = null;
	}

	enable() {
		this.hammer && (this.hammer.get("pinch").options.enable = true);
	}
	disable() {
		this.hammer && (this.hammer.get("pinch").options.enable = false);
	}
	isEnable() {
		return !!(this.hammer && this.hammer.get("pinch").options.enable);
	}
}

