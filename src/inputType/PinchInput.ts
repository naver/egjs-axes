import { $, getTouches, setCssProps } from "../utils";
import { toAxis, convertInputType, IInputType, IInputTypeObserver } from "./InputType";
import { ActiveInput, InputEventType, PinchEvent } from "../types";
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
	private _isEnabled = false;
	private _originalCssProps: { [key: string]: string; };
	private _activeInput: ActiveInput = null;
	private _baseValue: number;
	private _firstTouch: TouchEvent;
	private _firstPointers: PointerEvent[] = [];
	private _eventCache: PointerEvent[] = [];
	private _prevInput: PinchEvent;

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
		this._isEnabled = true;
		return this;
	}
	/**
	 * Disables input devices
	 * @ko 입력 장치를 사용할 수 없게 한다.
	 * @method eg.Axes.PinchInput#disable
	 * @return {eg.Axes.PinchInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	public disable() {
		this._isEnabled = false;
		return this;
	}

	/**
	 * Returns whether to use an input device
	 * @ko 입력 장치를 사용 여부를 반환한다.
	 * @method eg.Axes.PinchInput#isEnable
	 * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
	 */
	public isEnabled() {
		return this._isEnabled;
	}

	private onPinchStart(event: InputEventType) {
		if (event instanceof PointerEvent) {
			this.addPointerEvent(event);
		}
		if (!this._isEnabled || getTouches(event, this._eventCache) !== 2) {
			return;
		}

		this._baseValue = this._observer.get(this)[this.axes[0]];
		this._firstTouch = event instanceof TouchEvent ? event : null;
		this._observer.hold(this, event);
		this._pinchFlag = true;
		const pinchEvent = this.transformEvent(event);
		this._prevInput = pinchEvent;
	}

	private onPinchMove(event: InputEventType) {
		if (event instanceof PointerEvent) {
			this.addPointerEvent(event);
		}
		if (!this._pinchFlag || !this._isEnabled || getTouches(event, this._eventCache) !== 2) {
			return;
		}

		const pinchEvent = this.transformEvent(event);
		const offset = this.getOffset(pinchEvent.scale, this._prevInput.scale);
		this._observer.change(this, event, toAxis(this.axes, [offset]));
		this._prevInput = pinchEvent;
	}

	private onPinchEnd(event: InputEventType) {
		if (event instanceof PointerEvent) {
			this.removePointerEvent(event);
		}
		if (!this._pinchFlag || !this._isEnabled || getTouches(event, this._eventCache) > 2) {
			return;
		}

		this._observer.release(this, event, toAxis(this.axes, [0]), 0);
		this._baseValue = null;
		this._pinchFlag = false;
		this._firstTouch = null;
		this._prevInput = null;
	}

	private transformEvent(event: InputEventType): PinchEvent {
		if (event instanceof PointerEvent) {
			return {
				srcEvent: event,
				scale: this.getScaleFromPointers(),
			};
		} else if (event instanceof TouchEvent) {
			return {
				srcEvent: event,
				scale: this.getScaleFromTouch(this._firstTouch.touches, event.touches),
			};
		}
	}

	private attachEvent(observer: IInputTypeObserver) {
		const activeInput = convertInputType(this.options.inputType);
		this._observer = observer;
		this._isEnabled = true;
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
		this._isEnabled = false;
		this._observer = null;
	}

	private getOffset(pinchScale: number, prev: number = 1): number {
		return this._baseValue * (pinchScale - prev) * this.options.scale;
	}

	private getScaleFromPointers() {
		return this.getDistanceFromTouch(this._eventCache[0], this._eventCache[1]) / this.getDistanceFromTouch(this._firstPointers[0], this._firstPointers[1]);
	}

	private getScaleFromTouch(start: TouchList, end: TouchList) {
		return this.getDistanceFromTouch(end[0], end[1]) / this.getDistanceFromTouch(start[0], start[1]);
	}

	private getDistanceFromTouch(p1: Touch | PointerEvent, p2: Touch | PointerEvent) {
		const x = p2.clientX - p1.clientX;
		const y = p2.clientY - p1.clientY;
		return Math.sqrt((x * x) + (y * y));
	}

	private addPointerEvent(event: PointerEvent) {
		let addFlag = false;
		this._eventCache.forEach((e, i) => {
			if (e.pointerId === event.pointerId) {
				addFlag = true;
				this._eventCache[i] = event;
			}
		});
		if (!addFlag) {
			this._firstPointers.push(event);
			this._eventCache.push(event);
		}
	}

	private removePointerEvent(event: PointerEvent) {
		this._firstPointers = this._firstPointers.filter(x => x.pointerId !== event.pointerId);
		this._eventCache = this._eventCache.filter(x => x.pointerId !== event.pointerId);
	}
}
