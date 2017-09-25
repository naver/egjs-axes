import { InputObserver } from "./../InputObserver";
import { $ } from "../utils";
import { toAxis, IInputType, IInputTypeObserver } from "./InputType";
import { Axis } from "../AxisManager";

export const KEYMAP = {
	LEFT_ARROW: 37,
	A: 65,
	UP_ARROW: 38,
	W: 87,
	RIGHT_ARROW: 39,
	D: 68,
	DOWN_ARROW: 40,
	S: 83,
};

export interface MoveKeyInputOption {
	scale?: Array<Number>;
}

/**
 * @typedef {Object} MoveKeyInputOption The option object of the eg.Axes.MoveKeyInput module
 * @ko eg.Axes.MoveKeyInput 모듈의 옵션 객체
 * @property {Array<Number>} [scale] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @property {Number} [scale[0]=1] Coordinate scale for the first axis<ko>첫번째 축의 배율</ko>
 * @property {Number} [scale[1]=1] Coordinate scale for the decond axis<ko>두번째 축의 배율</ko>
**/

/**
 * @class eg.Axes.MoveKeyInput
 * @classdesc A module that passes the amount of change to eg.Axes when the move key stroke is occured. use two axis.
 * @ko 이동키 입력이 발생했을 때의 변화량을 eg.Axes에 전달하는 모듈. 두 개 의 축을 사용한다.
 *
 * @example
 * const moveKey = new eg.Axes.MoveKeyInput("#area", {
 * 		scale: [1, 1]
 * });
 *
 * // Connect 'x', 'y' axes when the moveKey is pressed.
 * axes.connect(["x", "y"], moveKey);
 *
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.MoveKeyInput module <ko>eg.Axes.MoveKeyInput 모듈을 사용할 엘리먼트</ko>
 * @param {MoveKeyInputOption} [options] The option object of the eg.Axes.MoveKeyInput module<ko>eg.Axes.MoveKeyInput 모듈의 옵션 객체</ko>
 */
export class MoveKeyInput implements IInputType {
	options: MoveKeyInputOption;
	axes: string[] = [];
  element: HTMLElement = null;
	private _isEnabled = false;
	private _isHolded = false;
  private observer: IInputTypeObserver;
	constructor(el, options?: MoveKeyInputOption) {
		this.element = $(el);
		this.options = {
			...{
				scale: [1, 1]
			}, ...options
    };
		this.onKeydown = this.onKeydown.bind(this);
	}

	mapAxes(axes: string[]) {
		this.axes = axes;
	}

	connect(observer: IInputTypeObserver): IInputType {
		this.dettachEvent();

		// add tabindex="0" to the container for making it focusable
		if (this.element.getAttribute("tabindex") !== "0") {
			this.element.setAttribute("tabindex", "0");
		}

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
	* @method eg.Axes.MoveKeyInput#destroy
	*/
	destroy() {
		this.disconnect();
		this.element = null;
	}

  private onKeydown(event) {
    if (!this._isEnabled) {
      return;
    }
    event.preventDefault();

		let isMoveKey = true;
		let offsets;
		const e = event;

		switch (e.keyCode) {
			case KEYMAP.LEFT_ARROW:
			case KEYMAP.A:
				offsets = [-this.options.scale[0], 0];
				break;
			case KEYMAP.RIGHT_ARROW:
			case KEYMAP.D:
				offsets = [this.options.scale[0], 0];
				break;
			case KEYMAP.UP_ARROW:
			case KEYMAP.W:
				offsets = [0, this.options.scale[1]];
				break;
			case KEYMAP.DOWN_ARROW:
			case KEYMAP.S:
				offsets = [0, -this.options.scale[1]];
				break;
			default:
				isMoveKey = false;
		}

		if (isMoveKey) {
			this.observer.change(this, event, toAxis(this.axes, offsets));
			// Suppress "double action" if event handled
			e.preventDefault();
		}
  }

	private attachEvent(observer: IInputTypeObserver) {
		this.observer = observer;
		this.element.addEventListener("keydown", this.onKeydown, false);
    this._isEnabled = true;
	}

	private dettachEvent() {
		this.element.removeEventListener("keydown", this.onKeydown, false);
    this._isEnabled = false;
    this.observer = null;
	}

	/**
	 * Enables input devices
	 * @ko 입력 장치를 사용할 수 있게 한다
	 * @method eg.Axes.MoveKeyInput#enable
	 * @return {eg.Axes.MoveKeyInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	enable() {
    this._isEnabled = true;
		return this;
	}
	/**
	 * Disables input devices
	 * @ko 입력 장치를 사용할 수 없게 한다.
	 * @method eg.Axes.MoveKeyInput#disable
	 * @return {eg.Axes.MoveKeyInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	disable() {
    this._isEnabled = false;
		return this;
	}
	/**
	 * Returns whether to use an input device
	 * @ko 입력 장치를 사용 여부를 반환한다.
	 * @method eg.Axes.MoveKeyInput#isEnable
	 * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
	 */
	isEnable() {
		return this._isEnabled;
  }
};
