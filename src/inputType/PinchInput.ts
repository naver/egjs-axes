import { Manager, Pinch } from "@egjs/hammerjs";
import { $ } from "../utils";
import { UNIQUEKEY, toAxis, convertInputType, createHammer, IInputType, IInputTypeObserver } from "./InputType";
import { ObjectInterface } from "../types";

export interface PinchInputOption {
	scale?: number;
	threshold?: number;
	inputType?: string[];
	hammerManagerOptions?: ObjectInterface;
}

/**
 * @typedef {Object} PinchInputOption The option object of the eg.Axes.PinchInput module
 * @ko eg.Axes.PinchInput 모듈의 옵션 객체
 * @property {Number} [scale=1] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @property {Number} [threshold=0] Minimal scale before recognizing <ko>사용자의 Pinch 동작을 인식하기 위해산 최소한의 배율</ko>
 * @property {Object} [hammerManagerOptions={cssProps: {userSelect: "none",touchSelect: "none",touchCallout: "none",userDrag: "none"}] Options of Hammer.Manager <ko>Hammer.Manager의 옵션</ko>
**/

/**
 * @class eg.Axes.PinchInput
 * @classdesc A module that passes the amount of change to eg.Axes when two pointers are moving toward (zoom-in) or away from each other (zoom-out). use one axis.
 * @ko 2개의 pointer를 이용하여 zoom-in하거나 zoom-out 하는 동작의 변화량을 eg.Axes에 전달하는 모듈. 한 개 의 축을 사용한다.
 * @example
 * const pinch = new eg.Axes.PinchInput("#area", {
 * 		scale: 1
 * });
 *
 * // Connect 'something' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * axes.connect("something", pinch);
 *
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.PinchInput module <ko>eg.Axes.PinchInput 모듈을 사용할 엘리먼트</ko>
 * @param {PinchInputOption} [options] The option object of the eg.Axes.PinchInput module<ko>eg.Axes.PinchInput 모듈의 옵션 객체</ko>
 */
export class PinchInput implements IInputType {

	options: PinchInputOption;
	axes: string[] = [];
	hammer = null;
	element: HTMLElement = null;

	private observer: IInputTypeObserver;
	private _base: number = null;
	private _prev: number = null;
	private pinchRecognizer = null;

	constructor(el, options?: PinchInputOption) {
		/**
		 * Hammer helps you add support for touch gestures to your page
		 *
		 * @external Hammer
		 * @see {@link http://hammerjs.github.io|Hammer.JS}
		 * @see {@link http://hammerjs.github.io/jsdoc/Hammer.html|Hammer.JS API documents}
		 * @see Hammer.JS applies specific CSS properties by {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html|default} when creating an instance. The eg.Axes module removes all default CSS properties provided by Hammer.JS
		 */
		if (typeof Manager === "undefined") {
			throw new Error(`The Hammerjs must be loaded before eg.Axes.PinchInput.\nhttp://hammerjs.github.io/`);
		}
		this.element = $(el);
		this.options = {
			...{
				scale: 1,
				threshold: 0,
				inputType: ["touch", "pointer"],
				hammerManagerOptions: {
					// css properties were removed due to usablility issue
					// http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
					cssProps: {
						userSelect: "none",
						touchSelect: "none",
						touchCallout: "none",
						userDrag: "none",
					},
				},
			},
			...options,
		};
		this.onPinchStart = this.onPinchStart.bind(this);
		this.onPinchMove = this.onPinchMove.bind(this);
		this.onPinchEnd = this.onPinchEnd.bind(this);
	}

	mapAxes(axes: string[]) {
		this.axes = axes;
	}

	connect(observer: IInputTypeObserver): IInputType {
		const hammerOption = { threshold: this.options.threshold };

		if (this.hammer) { // for sharing hammer instance.
			// hammer remove previous PinchRecognizer.
			this.removeRecognizer();
			this.dettachEvent();
		} else {
			let keyValue: string = this.element[UNIQUEKEY];
			if (!keyValue) {
				keyValue = String(Math.round(Math.random() * new Date().getTime()));
			}
			const inputClass = convertInputType(this.options.inputType);
			if (!inputClass) {
				throw new Error("Wrong inputType parameter!");
			}
			this.hammer = createHammer(
				this.element,
				{
					...{
						inputClass,
					}, ...this.options.hammerManagerOptions,
				},
			);
			this.element[UNIQUEKEY] = keyValue;
		}
		this.pinchRecognizer = new Pinch(hammerOption);
		this.hammer.add(this.pinchRecognizer);
		this.attachEvent(observer);
		return this;
	}

	disconnect() {
		this.removeRecognizer();
		if (this.hammer) {
			this.hammer.remove(this.pinchRecognizer);
			this.pinchRecognizer = null;
			this.dettachEvent();
		}
		return this;
	}

	/**
	* Destroys elements, properties, and events used in a module.
	* @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
	* @method eg.Axes.PinchInput#destroy
	*/
	destroy() {
		this.disconnect();
		if (this.hammer && this.hammer.recognizers.length === 0) {
			this.hammer.destroy();
		}
		delete this.element[UNIQUEKEY];
		this.element = null;
		this.hammer = null;
	}

	private removeRecognizer() {
		if (this.hammer && this.pinchRecognizer) {
			this.hammer.remove(this.pinchRecognizer);
			this.pinchRecognizer = null;
		}
	}

	private onPinchStart(event) {
		this._base = this.observer.get(this)[this.axes[0]];
		const offset = this.getOffset(event.scale);
		this.observer.hold(this, event);
		this.observer.change(this, event, toAxis(this.axes, [offset]));
		this._prev = event.scale;
	}
	private onPinchMove(event) {
		const offset = this.getOffset(event.scale, this._prev);
		this.observer.change(this, event, toAxis(this.axes, [offset]));
		this._prev = event.scale;
	}
	private onPinchEnd(event) {
		const offset = this.getOffset(event.scale, this._prev);
		this.observer.change(this, event, toAxis(this.axes, [offset]));
		this.observer.release(this, event, toAxis(this.axes, [0]), 0);
		this._base = null;
		this._prev = null;
	}
	private getOffset(pinchScale: number, prev: number = 1): number {
		return this._base * (pinchScale - prev) * this.options.scale;
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

	/**
	 * Enables input devices
	 * @ko 입력 장치를 사용할 수 있게 한다
	 * @method eg.Axes.PinchInput#enable
	 * @return {eg.Axes.PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	enable() {
		this.hammer && (this.hammer.get("pinch").options.enable = true);
		return this;
	}
	/**
	 * Disables input devices
	 * @ko 입력 장치를 사용할 수 없게 한다.
	 * @method eg.Axes.PinchInput#disable
	 * @return {eg.Axes.PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	disable() {
		this.hammer && (this.hammer.get("pinch").options.enable = false);
		return this;
	}
	/**
	 * Returns whether to use an input device
	 * @ko 입력 장치를 사용 여부를 반환한다.
	 * @method eg.Axes.PinchInput#isEnable
	 * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
	 */
	isEnable() {
		return !!(this.hammer && this.hammer.get("pinch").options.enable);
	}
}
