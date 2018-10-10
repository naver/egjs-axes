import { InputObserver } from "./../InputObserver";
import { $ } from "../utils";
import { UNIQUEKEY, toAxis, IInputType, IInputTypeObserver } from "./InputType";
import { Axis } from "../AxisManager";

export interface WheelInputOption {
	scale?: number;
	useNormalized?: boolean;
}

/**
 * @typedef {Object} WheelInputOption The option object of the eg.Axes.WheelInput module
 * @ko eg.Axes.WheelInput 모듈의 옵션 객체
 * @property {Number} [scale=1] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
**/

/**
 * @class eg.Axes.WheelInput
 * @classdesc A module that passes the amount of change to eg.Axes when the mouse wheel is moved. use one axis.
 * @ko 마우스 휠이 움직일때의 변화량을 eg.Axes에 전달하는 모듈. 한 개 의 축을 사용한다.
 *
 * @example
 * const wheel = new eg.Axes.WheelInput("#area", {
 * 		scale: 1
 * });
 *
 * // Connect 'something' axis when the mousewheel is moved.
 * axes.connect("something", wheel);
 *
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.WheelInput module <ko>eg.Axes.WheelInput 모듈을 사용할 엘리먼트</ko>
 * @param {WheelInputOption} [options] The option object of the eg.Axes.WheelInput module<ko>eg.Axes.WheelInput 모듈의 옵션 객체</ko>
 */
export class WheelInput implements IInputType {
	options: WheelInputOption;
	axes: string[] = [];
	element: HTMLElement = null;
	private _isEnabled = false;
	private _isHolded = false;
	private _timer = null;
	private observer: IInputTypeObserver;
	constructor(el, options?: WheelInputOption) {
		this.element = $(el);
		this.options = {
			...{
				scale: 1,
				useNormalized: true,
			}, ...options,
		};
		this.onWheel = this.onWheel.bind(this);
	}

	mapAxes(axes: string[]) {
		this.axes = axes;
	}

	connect(observer: IInputTypeObserver): IInputType {
		this.dettachEvent();
		this.attachEvent(observer);
		return this;
	}

	disconnect() {
		this.dettachEvent();
		return this;
	}

	/**
	* Destroys elements, properties, and events used in a module.
	* @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
	* @method eg.Axes.WheelInput#destroy
	*/
	destroy() {
		this.disconnect();
		this.element = null;
	}

	private onWheel(event) {
		if (!this._isEnabled) {
			return;
		}
		event.preventDefault();

		if (event.deltaY === 0) {
			return;
		}

		if (!this._isHolded) {
			this.observer.hold(this, event);
			this._isHolded = true;
		}
		const offset = (event.deltaY > 0 ? -1 : 1) * this.options.scale * (this.options.useNormalized ? 1 : Math.abs(event.deltaY));

		this.observer.change(this, event, toAxis(this.axes, [offset]));
		clearTimeout(this._timer);
		const inst = this;

		this._timer = setTimeout(() => {
			if (this._isHolded) {
				this._isHolded = false;
				this.observer.release(this, event, toAxis(this.axes, [0]));
			}
		}, 50);
	}

	private attachEvent(observer: IInputTypeObserver) {
		this.observer = observer;
		this.element.addEventListener("wheel", this.onWheel);
		this._isEnabled = true;
	}

	private dettachEvent() {
		this.element.removeEventListener("wheel", this.onWheel);
		this._isEnabled = false;
		this.observer = null;

		if (this._timer) {
			clearTimeout(this._timer);
			this._timer = null;
		}
	}

	/**
	 * Enables input devices
	 * @ko 입력 장치를 사용할 수 있게 한다
	 * @method eg.Axes.WheelInput#enable
	 * @return {eg.Axes.WheelInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	enable() {
		this._isEnabled = true;
		return this;
	}
	/**
	 * Disables input devices
	 * @ko 입력 장치를 사용할 수 없게 한다.
	 * @method eg.Axes.WheelInput#disable
	 * @return {eg.Axes.WheelInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	disable() {
		this._isEnabled = false;
		return this;
	}
	/**
	 * Returns whether to use an input device
	 * @ko 입력 장치를 사용 여부를 반환한다.
	 * @method eg.Axes.WheelInput#isEnable
	 * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
	 */
	isEnable() {
		return this._isEnabled;
	}
}
