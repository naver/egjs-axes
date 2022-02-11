import { $, setCssProps } from "../utils";
import { toAxis, convertInputType, IInputType, IInputTypeObserver } from "./InputType";
import { ActiveInput, InputEventType } from "../types";
import { PREVENT_SCROLL_CSSPROPS } from "../const";

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
	public options: PinchInputOption;
	public axes: string[] = [];
	public element: HTMLElement = null;
	private _observer: IInputTypeObserver;
	private _pinchFlag = false;
	private _enabled = false;
	private _originalCssProps: { [key: string]: string; };
	private _activeInput: ActiveInput = null;
	private _baseValue: number;

	constructor(el: string | HTMLElement, options?: PinchInputOption) {
		this.element = $(el);
		this.options = {
			scale: 1,
			threshold: 0,
			inputType: ["touch", "pointer"],
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
		if (this._activeInput) {
			this.detachEvent();
		}
		this.attachEvent(observer);
		this._originalCssProps = setCssProps(this.element);
		return this;
	}

	public disconnect() {
		this.detachEvent();
		if (this._originalCssProps !== PREVENT_SCROLL_CSSPROPS) {
			setCssProps(this.element, this._originalCssProps);
		}
		return this;
	}

	/**
	* Destroys elements, properties, and events used in a module.
	* @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
	* @method eg.Axes.PinchInput#destroy
	*/
	public destroy() {
		this.disconnect();
		this.element = null;
	}

	/**
	 * Enables input devices
	 * @ko 입력 장치를 사용할 수 있게 한다
	 * @method eg.Axes.PinchInput#enable
	 * @return {eg.Axes.PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	public enable() {
		this._enabled = true;
		return this;
	}
	/**
	 * Disables input devices
	 * @ko 입력 장치를 사용할 수 없게 한다.
	 * @method eg.Axes.PinchInput#disable
	 * @return {eg.Axes.PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	public disable() {
		this._enabled = false;
		return this;
	}

	/**
	 * Returns whether to use an input device
	 * @ko 입력 장치를 사용 여부를 반환한다.
	 * @method eg.Axes.PinchInput#isEnable
	 * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
	 */
	public isEnabled() {
		return this._enabled;
	}

	private onPinchStart(event: InputEventType) {
		this._activeInput.onEventStart(event);
		if (!this._enabled || this._activeInput.getTouches(event) !== 2) {
			return;
		}

		this._baseValue = this._observer.get(this)[this.axes[0]];
		this._observer.hold(this, event);
		this._pinchFlag = true;
		const pinchEvent = this._activeInput.extendEvent(event);
		this._activeInput.prevEvent = pinchEvent;
	}

	private onPinchMove(event: InputEventType) {
		this._activeInput.onEventMove(event);
		if (!this._pinchFlag || !this._enabled || this._activeInput.getTouches(event) !== 2) {
			return;
		}

		const pinchEvent = this._activeInput.extendEvent(event);
		const offset = this.getOffset(pinchEvent.scale, this._activeInput.prevEvent.scale);
		this._observer.change(this, event, toAxis(this.axes, [offset]));
		this._activeInput.prevEvent = pinchEvent;
	}

	private onPinchEnd(event: InputEventType) {
		this._activeInput.onEventEnd(event);
		if (!this._pinchFlag || !this._enabled || this._activeInput.getTouches(event) > 2) {
			return;
		}

		this._observer.release(this, event, [0], 0);
		this._baseValue = null;
		this._pinchFlag = false;
		this._activeInput.prevEvent = null;
	}

	private attachEvent(observer: IInputTypeObserver) {
		const activeInput = convertInputType(this.options.inputType);
		this._observer = observer;
		this._enabled = true;
		this._activeInput = activeInput;
		activeInput.start.forEach(event => {
			this.element.addEventListener(event, this.onPinchStart, false);
		});
		activeInput.move.forEach(event => {
			this.element.addEventListener(event, this.onPinchMove, false);
		});
		activeInput.end.forEach(event => {
			this.element.addEventListener(event, this.onPinchEnd, false);
		});
	}

	private detachEvent() {
		const activeInput = this._activeInput;
		activeInput.start.forEach(event => {
			this.element.removeEventListener(event, this.onPinchStart, false);
		});
		activeInput.move.forEach(event => {
			this.element.removeEventListener(event, this.onPinchMove, false);
		});
		activeInput.end.forEach(event => {
			this.element.removeEventListener(event, this.onPinchEnd, false);
		});
		this._enabled = false;
		this._observer = null;
	}

	private getOffset(pinchScale: number, prev: number = 1): number {
		return this._baseValue * (pinchScale - prev) * this.options.scale;
	}
}
