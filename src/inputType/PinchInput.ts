import { $, getTouches, setCssProps } from "../utils";
import { UNIQUEKEY, toAxis, convertInputType, IInputType, IInputTypeObserver } from "./InputType";
import { ActiveInput, InputEventType, PinchEvent } from "../types";
import { cssProps } from "../const";

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
	private originalCssProps: { [key: string]: string; };
	private observer: IInputTypeObserver;
	private activeInput: ActiveInput;
	private isEnabled = false;
	private pinchFlag = false;
	private baseValue: number;
	private firstTouch: TouchEvent;
	private firstPointers: PointerEvent[] = [];
	private eventCache: PointerEvent[] = [];
	private prevInput: PinchEvent;

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
		this.dettachEvent();
		let keyValue: string = this.element[UNIQUEKEY];
		if (!keyValue) {
			keyValue = String(Math.round(Math.random() * new Date().getTime()));
		}
		this.element[UNIQUEKEY] = keyValue;
		this.attachEvent(observer);
		this.originalCssProps = setCssProps(this.element);
		return this;
	}

	public disconnect() {
		this.dettachEvent();
		if (this.originalCssProps !== cssProps) {
			setCssProps(this.element, this.originalCssProps);
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

	private onPinchStart(event: InputEventType) {
		if (event instanceof PointerEvent) {
			this.addPointerEvent(event);
		}
		if (!this.isEnabled || getTouches(event, this.eventCache) !== 2) {
			return;
		}

		this.baseValue = this.observer.get(this)[this.axes[0]];
		this.firstTouch = event instanceof TouchEvent ? event : null;
		this.observer.hold(this, event);
		this.pinchFlag = true;
		const pinchEvent = this.transformEvent(event);
		this.prevInput = pinchEvent;
	}

	private onPinchMove(event: InputEventType) {
		if (event instanceof PointerEvent) {
			this.addPointerEvent(event);
		}
		if (!this.pinchFlag || !this.isEnabled || getTouches(event, this.eventCache) !== 2) {
			return;
		}

		const pinchEvent = this.transformEvent(event);
		const offset = this.getOffset(pinchEvent.scale, this.prevInput.scale);
		this.observer.change(this, event, toAxis(this.axes, [offset]));
		this.prevInput = pinchEvent;
	}

	private onPinchEnd(event: InputEventType) {
		if (event instanceof PointerEvent) {
			this.removePointerEvent(event);
		}
		if (!this.pinchFlag || !this.isEnabled || getTouches(event, this.eventCache) > 2) {
			return;
		}

		this.observer.release(this, event, toAxis(this.axes, [0]), 0);
		this.baseValue = null;
		this.pinchFlag = false;
		this.firstTouch = null;
		this.prevInput = null;
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
				scale: this.getScaleFromTouch(this.firstTouch.touches, event.touches),
			};
		}
	}

	private attachEvent(observer: IInputTypeObserver) {
		this.observer = observer;
		this.isEnabled = true;
		this.activeInput = convertInputType(this.options.inputType);
		this.activeInput.start.forEach(event => {
			this.element.addEventListener(event, this.onPinchStart, false);
		});
		this.activeInput.move.forEach(event => {
			this.element.addEventListener(event, this.onPinchMove, false);
		});
		this.activeInput.end.forEach(event => {
			this.element.addEventListener(event, this.onPinchEnd, false);
		});
	}

	private dettachEvent() {
		this.activeInput.start.forEach(event => {
			this.element.removeEventListener(event, this.onPinchStart, false);
		});
		this.activeInput.move.forEach(event => {
			this.element.removeEventListener(event, this.onPinchMove, false);
		});
		this.activeInput.end.forEach(event => {
			this.element.removeEventListener(event, this.onPinchEnd, false);
		});
		this.isEnabled = false;
		this.observer = null;
	}

	private getOffset(pinchScale: number, prev: number = 1): number {
		return this.baseValue * (pinchScale - prev) * this.options.scale;
	}

	private getScaleFromPointers() {
		return this.getDistanceFromTouch(this.eventCache[0], this.eventCache[1]) / this.getDistanceFromTouch(this.firstPointers[0], this.firstPointers[1]);
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
		this.eventCache.forEach((e, i) => {
			if (e.pointerId === event.pointerId) {
				addFlag = true;
				this.eventCache[i] = event;
			}
		});
		if (!addFlag) {
			this.firstPointers.push(event);
			this.eventCache.push(event);
		}
	}

	private removePointerEvent(event: PointerEvent) {
		this.firstPointers = this.firstPointers.filter(x => x.pointerId !== event.pointerId);
		this.eventCache = this.eventCache.filter(x => x.pointerId !== event.pointerId);
	}
}
