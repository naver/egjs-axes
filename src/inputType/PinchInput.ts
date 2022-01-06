import { $ } from "../utils";
import { UNIQUEKEY, toAxis, convertInputType, IInputType, IInputTypeObserver } from "./InputType";
import { ActiveInput, PinchEvent } from "..";

export interface PinchInputOption {
	scale?: number;
	threshold?: number;
	inputType?: string[];
}

/**
 * @typedef {Object} PinchInputOption The option object of the eg.Axes.PinchInput module
 * @ko eg.Axes.PinchInput 모듈의 옵션 객체
 * @property {Number} [scale=1] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @property {Number} [threshold=0] Minimal scale before recognizing <ko>사용자의 Pinch 동작을 인식하기 위해산 최소한의 배율</ko>
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
	element: HTMLElement = null;
	private observer: IInputTypeObserver;
	private activeInput: ActiveInput = null;
	private isEnabled = false;
	private pinchFlag = false;
	private baseValue: number = null;
	private firstInput: TouchEvent = null;
	private prevInput: PinchEvent = null;

	constructor(el: string | HTMLElement, options?: PinchInputOption) {
		this.element = $(el);
		this.options = {
			scale: 1,
			threshold: 0,
			inputType: ["touch"],
			...options,
		};
		this.onPinchStart = this.onPinchStart.bind(this);
		this.onPinchMove = this.onPinchMove.bind(this);
		this.onPinchEnd = this.onPinchEnd.bind(this);
	}

	public mapAxes(axes: string[]) {
		this.axes = axes;
	}

	public connect(observer: IInputTypeObserver): IInputType {
		this.dettachEvent();
		let keyValue: string = this.element[UNIQUEKEY];
		if (!keyValue) {
			keyValue = String(Math.round(Math.random() * new Date().getTime()));
		}
		this.element[UNIQUEKEY] = keyValue;
		this.attachEvent(observer);
		return this;
	}

	public disconnect() {
		this.dettachEvent();
		return this;
	}

	/**
	* Destroys elements, properties, and events used in a module.
	* @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
	* @method eg.Axes.PinchInput#destroy
	*/
	public destroy() {
		this.disconnect();
		delete this.element[UNIQUEKEY];
		this.element = null;
	}

	/**
	 * Enables input devices
	 * @ko 입력 장치를 사용할 수 있게 한다
	 * @method eg.Axes.PinchInput#enable
	 * @return {eg.Axes.PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	public enable() {
		this.isEnabled = true;
		return this;
	}
	/**
	 * Disables input devices
	 * @ko 입력 장치를 사용할 수 없게 한다.
	 * @method eg.Axes.PinchInput#disable
	 * @return {eg.Axes.PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	public disable() {
		this.isEnabled = false;
		return this;
	}

	/**
	 * Returns whether to use an input device
	 * @ko 입력 장치를 사용 여부를 반환한다.
	 * @method eg.Axes.PinchInput#isEnable
	 * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
	 */
	public isEnable() {
		return this.isEnabled;
	}

	private onPinchStart(event: TouchEvent) {
		if (!this.isEnable() || event.touches.length !== 2) {
			return;
		}

		this.baseValue = this.observer.get(this)[this.axes[0]];
		this.firstInput = event;
		this.observer.hold(this, event);
		this.pinchFlag = true;
		const pinchEvent = this.transformEvent(event);
		this.prevInput = pinchEvent;
	}

	private onPinchMove(event: TouchEvent) {
		if (!this.pinchFlag || !this.isEnable() || event.touches.length !== 2) {
			return;
		}

		const pinchEvent = this.transformEvent(event);
		const offset = this.getOffset(pinchEvent.scale, this.prevInput.scale);
		this.observer.change(this, event, toAxis(this.axes, [offset]));
		this.prevInput = pinchEvent;
	}

	private onPinchEnd(event: TouchEvent) {
		if (!this.pinchFlag || !this.isEnable() || event.touches.length > 2) {
			return;
		}

		this.observer.release(this, event, toAxis(this.axes, [0]), 0);
		this.baseValue = null;
		this.pinchFlag = false;
		this.firstInput = null;
		this.prevInput = null;
	}

	private transformEvent(event: TouchEvent): PinchEvent {
		return {
			srcEvent: event,
			scale: this.getScale(this.firstInput.touches, event.touches),
		};
	}

	private attachEvent(observer: IInputTypeObserver) {
		this.observer = observer;
		this.isEnabled = true;
		this.activeInput = convertInputType(this.options.inputType);
		if (!this.activeInput) {
			throw new Error("Wrong inputType parameter!");
		}

		this.element.addEventListener("touchstart", this.onPinchStart, false);
		this.element.addEventListener("touchmove", this.onPinchMove, false);
		this.element.addEventListener("touchend", this.onPinchEnd, false);
		this.element.addEventListener("touchcancel", this.onPinchEnd, false);
	}

	private dettachEvent() {
		this.element.removeEventListener("touchstart", this.onPinchStart, false);
		this.element.removeEventListener("touchmove", this.onPinchMove, false);
		this.element.removeEventListener("touchend", this.onPinchEnd, false);
		this.element.removeEventListener("touchcancel", this.onPinchEnd, false);
		this.isEnabled = false;
		this.observer = null;
	}

	private getOffset(pinchScale: number, prev: number = 1): number {
		return this.baseValue * (pinchScale - prev) * this.options.scale;
	}

	private getScale(start, end) {
		return this.getDistance(end[0], end[1]) / this.getDistance(start[0], start[1]);
	}

	private getDistance(p1, p2) {
		const x = p2.clientX - p1.clientX;
		const y = p2.clientY - p1.clientY;
		return Math.sqrt((x * x) + (y * y));
	}
}
