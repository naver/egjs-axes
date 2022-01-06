import { $, getAngle, getCenter, getMovement } from "../utils";
import { convertInputType, IInputType, IInputTypeObserver, toAxis, UNIQUEKEY } from "./InputType";
import { IS_IOS_SAFARI, IOS_EDGE_THRESHOLD, DIRECTION_NONE, DIRECTION_VERTICAL, DIRECTION_HORIZONTAL, DIRECTION_ALL } from "../const";
import { ActiveInput, InputEventType, PanEvent } from "..";

export interface PanInputOption {
	inputType?: string[];
	scale?: number[];
	thresholdAngle?: number;
	threshold?: number;
	iOSEdgeSwipeThreshold?: number;
	releaseOnScroll?: boolean;
}

// get user's direction
export function getDirectionByAngle(angle: number, thresholdAngle: number) {
	if (thresholdAngle < 0 || thresholdAngle > 90) {
		return DIRECTION_NONE;
	}
	const toAngle = Math.abs(angle);

	return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ?
		DIRECTION_VERTICAL : DIRECTION_HORIZONTAL;
}

export function getNextOffset(speeds: number[], deceleration: number) {
	const normalSpeed = Math.sqrt(
		speeds[0] * speeds[0] + speeds[1] * speeds[1],
	);
	const duration = Math.abs(normalSpeed / -deceleration);
	return [
		speeds[0] / 2 * duration,
		speeds[1] / 2 * duration,
	];
}

export function useDirection(
	checkType,
	direction,
	userDirection?): boolean {
	if (userDirection) {
		return !!((direction === DIRECTION_ALL) ||
			((direction & checkType) && (userDirection & checkType)));
	} else {
		return !!(direction & checkType);
	}
}

/**
 * @typedef {Object} PanInputOption The option object of the eg.Axes.PanInput module.
 * @ko eg.Axes.PanInput 모듈의 옵션 객체
 * @property {String[]} [inputType=["touch","mouse", "pointer"]] Types of input devices.<br>- touch: Touch screen<br>- mouse: Mouse <ko>입력 장치 종류.<br>- touch: 터치 입력 장치<br>- mouse: 마우스</ko>
 * @property {Number[]} [scale] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
 * @property {Number} [scale.0=1] horizontal axis scale <ko>수평축 배율</ko>
 * @property {Number} [scale.1=1] vertical axis scale <ko>수직축 배율</ko>
 * @property {Number} [thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
 * @property {Number} [threshold=0] Minimal pan distance required before recognizing <ko>사용자의 Pan 동작을 인식하기 위해산 최소한의 거리</ko>
 * @property {Number} [iOSEdgeSwipeThreshold=30] Area (px) that can go to the next page when swiping the right edge in iOS safari <ko>iOS Safari에서 오른쪽 엣지를 스와이프 하는 경우 다음 페이지로 넘어갈 수 있는 영역(px)</ko>
**/
/**
 * @class eg.Axes.PanInput
 * @classdesc A module that passes the amount of change to eg.Axes when the mouse or touchscreen is down and moved. use less than two axes.
 * @ko 마우스나 터치 스크린을 누르고 움직일때의 변화량을 eg.Axes에 전달하는 모듈. 두개 이하의 축을 사용한다.
 *
 * @example
 * const pan = new eg.Axes.PanInput("#area", {
 * 		inputType: ["touch"],
 * 		scale: [1, 1.3],
 * });
 *
 * // Connect the 'something2' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
 * // Connect the 'somethingN' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
 * axes.connect(["something2", "somethingN"], pan); // or axes.connect("something2 somethingN", pan);
 *
 * // Connect only one 'something1' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
 * axes.connect(["something1"], pan); // or axes.connect("something1", pan);
 *
 * // Connect only one 'something2' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
 * axes.connect(["", "something2"], pan); // or axes.connect(" something2", pan);
 *
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.PanInput module <ko>eg.Axes.PanInput 모듈을 사용할 엘리먼트</ko>
 * @param {PanInputOption} [options] The option object of the eg.Axes.PanInput module<ko>eg.Axes.PanInput 모듈의 옵션 객체</ko>
 */
export class PanInput implements IInputType {
	options: PanInputOption;
	axes: string[] = [];
	element: HTMLElement = null;
	protected observer: IInputTypeObserver;
	protected _direction;
	private activeInput: ActiveInput = null;
	private isEnabled = false;
	private isRightEdge = false;
	private rightEdgeTimer = 0;
	protected panFlag = false;
	protected prevInput: PanEvent = null;

	constructor(el: string | HTMLElement, options?: PanInputOption) {
		this.element = $(el);
		this.options = {
			inputType: ["touch", "mouse"],
			scale: [1, 1],
			thresholdAngle: 45,
			threshold: 0,
			iOSEdgeSwipeThreshold: IOS_EDGE_THRESHOLD,
			releaseOnScroll: false,
			...options,
		};
		this.onPanstart = this.onPanstart.bind(this);
		this.onPanmove = this.onPanmove.bind(this);
		this.onPanend = this.onPanend.bind(this);
	}

	public mapAxes(axes: string[]) {
		const useHorizontal = !!axes[0];
		const useVertical = !!axes[1];
		if (useHorizontal && useVertical) {
			this._direction = DIRECTION_ALL;
		} else if (useHorizontal) {
			this._direction = DIRECTION_HORIZONTAL;
		} else if (useVertical) {
			this._direction = DIRECTION_VERTICAL;
		} else {
			this._direction = DIRECTION_NONE;
		}
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
		this._direction = DIRECTION_NONE;
		return this;
	}

	/**
	* Destroys elements, properties, and events used in a module.
	* @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
	* @method eg.Axes.PanInput#destroy
	*/
	public destroy() {
		this.disconnect();
		delete this.element[UNIQUEKEY];
		this.element = null;
	}

	/**
	 * Enables input devices
	 * @ko 입력 장치를 사용할 수 있게 한다
	 * @method eg.Axes.PanInput#enable
	 * @return {eg.Axes.PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	public enable() {
		this.isEnabled = true;
		return this;
	}
	/**
	 * Disables input devices
	 * @ko 입력 장치를 사용할 수 없게 한다.
	 * @method eg.Axes.PanInput#disable
	 * @return {eg.Axes.PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	public disable() {
		this.isEnabled = false;
		return this;
	}
	/**
	 * Returns whether to use an input device
	 * @ko 입력 장치를 사용 여부를 반환한다.
	 * @method eg.Axes.PanInput#isEnable
	 * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
	 */
	public isEnable() {
		return this.isEnabled;
	}

	protected onPanstart(event: InputEventType) {
		if (!this.isEnable()) {
			return;
		}

		const panEvent = this.transformEvent(event);
		this.panFlag = false;

		if (panEvent.srcEvent.cancelable !== false) {
			const edgeThreshold = this.options.iOSEdgeSwipeThreshold!;

			this.observer.hold(this, panEvent);
			this.isRightEdge = IS_IOS_SAFARI && panEvent.center.x > window.innerWidth - edgeThreshold;
			this.panFlag = true;
			this.prevInput = null;
		}
	}

	protected onPanmove(event: InputEventType) {
		if (!this.panFlag || !this.isEnable()) {
			return;
		}

		const panEvent = this.transformEvent(event);
		const { iOSEdgeSwipeThreshold, releaseOnScroll } = this.options;
		const userDirection = getDirectionByAngle(
			panEvent.angle, this.options.thresholdAngle);

		if (releaseOnScroll && !panEvent.srcEvent.cancelable) {
			this.onPanend(event);
			return;
		}

		if (this.prevInput && IS_IOS_SAFARI) {
			const swipeLeftToRight = panEvent.center.x < 0;

			if (swipeLeftToRight) {
				// iOS swipe left => right
				this.release({
					...this.prevInput,
					velocityX: 0,
					velocityY: 0,
					offsetX: 0,
					offsetY: 0,
				});
				return;
			} else if (this.isRightEdge) {
				clearTimeout(this.rightEdgeTimer);

				// - is right to left
				const swipeRightToLeft = panEvent.deltaX < -iOSEdgeSwipeThreshold;

				if (swipeRightToLeft) {
					this.isRightEdge = false;
				} else {
					// iOS swipe right => left
					this.rightEdgeTimer = window.setTimeout(() => {
						this.release({
							...this.prevInput,
							velocityX: 0,
							velocityY: 0,
							offsetX: 0,
							offsetY: 0,
						});
					}, 100);
				}
			}
		}
		const offset: number[] = this.getOffset(
			[panEvent.offsetX, panEvent.offsetY],
			[
				useDirection(DIRECTION_HORIZONTAL, this._direction, userDirection),
				useDirection(DIRECTION_VERTICAL, this._direction, userDirection),
			]);
		const prevent = offset.some(v => v !== 0);

		if (prevent) {
			if (panEvent.srcEvent.cancelable !== false) {
				panEvent.srcEvent.preventDefault();
			}
			panEvent.srcEvent.stopPropagation();
		}
		panEvent.preventSystemEvent = prevent;
		prevent && this.observer.change(this, panEvent, toAxis(this.axes, offset));
		this.prevInput = panEvent;
	}

	protected onPanend(event: InputEventType) {
		if (!this.panFlag || !this.isEnable()) {
			return;
		}

		const panEvent = this.transformEvent(event);
		this.release(panEvent);
	}

	protected transformEvent(event: InputEventType): PanEvent {
		const prev = this.prevInput;
		if (event.type === "mouseup" || event.type === "touchend") {
			return prev;
		}
		const center = getCenter(event);
		const movement = getMovement(event, prev ? prev.srcEvent : null);
		const angle = prev ? getAngle(center.x - prev.center.x, center.y - prev.center.y) : 0;
		const deltaX = prev ? prev.deltaX + movement.x : movement.x;
		const deltaY = prev ? prev.deltaY + movement.y : movement.y;
		const offsetX = prev ? (deltaX - prev.deltaX) : 0;
		const offsetY = prev ? (deltaY - prev.deltaY) : 0;
		const velocityX = prev ? offsetX / (event.timeStamp - prev.srcEvent.timeStamp) : 0;
		const velocityY = prev ? offsetY / (event.timeStamp - prev.srcEvent.timeStamp) : 0;
		return {
			srcEvent: event,
			angle,
			center,
			deltaX,
			deltaY,
			offsetX,
			offsetY,
			velocityX,
			velocityY,
			preventSystemEvent: true,
		};
	}

	private release(event: PanEvent) {
		this.panFlag = false;
		clearTimeout(this.rightEdgeTimer);
		let offset: number[] = this.getOffset(
			[
				Math.abs(event.velocityX) * (event.deltaX < 0 ? -1 : 1),
				Math.abs(event.velocityY) * (event.deltaY < 0 ? -1 : 1),
			],
			[
				useDirection(DIRECTION_HORIZONTAL, this._direction),
				useDirection(DIRECTION_VERTICAL, this._direction),
			]);
		offset = getNextOffset(offset, this.observer.options.deceleration);
		this.observer.release(this, event, toAxis(this.axes, offset));
	}

	private attachEvent(observer: IInputTypeObserver) {
		this.observer = observer;
		this.isEnabled = true;
		this.activeInput = convertInputType(this.options.inputType);
		if (!this.activeInput) {
			throw new Error("Wrong inputType parameter!");
		}

		if (this.activeInput === "mouse" || this.activeInput === "touchmouse") {
			this.element.addEventListener("mousedown", this.onPanstart, false);
			window.addEventListener("mousemove", this.onPanmove, false);
			window.addEventListener("mouseup", this.onPanend, false);
		}
		if (this.activeInput === "touch" || this.activeInput === "touchmouse") {
			this.element.addEventListener("touchstart", this.onPanstart, false);
			window.addEventListener("touchmove", this.onPanmove, false);
			window.addEventListener("touchend", this.onPanend, false);
			window.addEventListener("touchcancel", this.onPanend, false);
		}
	}

	private dettachEvent() {
		if (this.activeInput === "mouse" || this.activeInput === "touchmouse") {
			this.element.removeEventListener("mousedown", this.onPanstart, false);
			window.removeEventListener("mousemove", this.onPanmove, false);
			window.removeEventListener("mouseup", this.onPanend, false);
		}
		if (this.activeInput === "touch" || this.activeInput === "touchmouse") {
			this.element.removeEventListener("touchstart", this.onPanstart, false);
			window.removeEventListener("touchmove", this.onPanmove, false);
			window.removeEventListener("touchend", this.onPanend, false);
			window.removeEventListener("touchcancel", this.onPanend, false);
		}
		this.isEnabled = false;
		this.observer = null;
	}

	private getOffset(
		properties: number[],
		direction: boolean[]): number[] {
		const offset: number[] = [0, 0];
		const scale = this.options.scale;

		if (direction[0]) {
			offset[0] = (properties[0] * scale[0]);
		}
		if (direction[1]) {
			offset[1] = (properties[1] * scale[1]);
		}
		return offset;
	}
}
