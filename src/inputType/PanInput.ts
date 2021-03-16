import { DIRECTION_ALL, DIRECTION_HORIZONTAL, DIRECTION_NONE, DIRECTION_VERTICAL, Manager, Pan } from "@egjs/hammerjs";
import { $ } from "../utils";
import { convertInputType, createHammer, IInputType, IInputTypeObserver, toAxis, UNIQUEKEY } from "./InputType";
import { IS_IOS_SAFARI, IOS_EDGE_THRESHOLD } from "../const";
import { ObjectInterface } from "../types";

export interface PanInputOption {
	inputType?: string[];
	scale?: number[];
	thresholdAngle?: number;
	threshold?: number;
	hammerManagerOptions?: ObjectInterface;
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
 * @property {Object} [hammerManagerOptions={cssProps: {userSelect: "none",touchSelect: "none",touchCallout: "none",userDrag: "none"}] Options of Hammer.Manager <ko>Hammer.Manager의 옵션</ko>
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
	hammer = null;
	element: HTMLElement = null;
	protected observer: IInputTypeObserver;
	protected _direction;
	private panRecognizer = null;
	private isRightEdge = false;
	private rightEdgeTimer = 0;
	private panFlag = false;

	constructor(el: string | HTMLElement, options?: PanInputOption) {
		/**
		 * Hammer helps you add support for touch gestures to your page
		 *
		 * @external Hammer
		 * @see {@link http://hammerjs.github.io|Hammer.JS}
		 * @see {@link http://hammerjs.github.io/jsdoc/Hammer.html|Hammer.JS API documents}
		 * @see Hammer.JS applies specific CSS properties by {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html|default} when creating an instance. The eg.Axes module removes all default CSS properties provided by Hammer.JS
		 */
		if (typeof Manager === "undefined") {
			throw new Error(`The Hammerjs must be loaded before eg.Axes.PanInput.\nhttp://hammerjs.github.io/`);
		}
		this.element = $(el);

		this.options = {
			inputType: ["touch", "mouse", "pointer"],
			scale: [1, 1],
			thresholdAngle: 45,
			threshold: 0,
			iOSEdgeSwipeThreshold: IOS_EDGE_THRESHOLD,
			releaseOnScroll: false,
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
			...options,
		};
		this.onHammerInput = this.onHammerInput.bind(this);
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
		const hammerOption = {
			direction: this._direction,
			threshold: this.options.threshold,
		};
		if (this.hammer) { // for sharing hammer instance.
			// hammer remove previous PanRecognizer.
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
			this.hammer = createHammer(this.element, {
				...{
					inputClass,
				}, ... this.options.hammerManagerOptions,
			});
			this.element[UNIQUEKEY] = keyValue;
		}
		this.panRecognizer = new Pan(hammerOption);

		this.hammer.add(this.panRecognizer);
		this.attachEvent(observer);
		return this;
	}

	public disconnect() {
		this.removeRecognizer();
		if (this.hammer) {
			this.dettachEvent();
		}
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
		if (this.hammer && this.hammer.recognizers.length === 0) {
			this.hammer.destroy();
		}
		delete this.element[UNIQUEKEY];
		this.element = null;
		this.hammer = null;
	}

	/**
	 * Enables input devices
	 * @ko 입력 장치를 사용할 수 있게 한다
	 * @method eg.Axes.PanInput#enable
	 * @return {eg.Axes.PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	public enable() {
		this.hammer && (this.hammer.get("pan").options.enable = true);
		return this;
	}
	/**
	 * Disables input devices
	 * @ko 입력 장치를 사용할 수 없게 한다.
	 * @method eg.Axes.PanInput#disable
	 * @return {eg.Axes.PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	public disable() {
		this.hammer && (this.hammer.get("pan").options.enable = false);
		return this;
	}
	/**
	 * Returns whether to use an input device
	 * @ko 입력 장치를 사용 여부를 반환한다.
	 * @method eg.Axes.PanInput#isEnable
	 * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
	 */
	public isEnable() {
		return !!(this.hammer && this.hammer.get("pan").options.enable);
	}

	private removeRecognizer() {
		if (this.hammer && this.panRecognizer) {
			this.hammer.remove(this.panRecognizer);
			this.panRecognizer = null;
		}
	}

	protected onHammerInput(event) {
		if (this.isEnable()) {
			if (event.isFirst) {
				this.panFlag = false;

				if (event.srcEvent.cancelable !== false) {
					const edgeThreshold = this.options.iOSEdgeSwipeThreshold!;

					this.observer.hold(this, event);
					this.isRightEdge = IS_IOS_SAFARI && event.center.x > window.innerWidth - edgeThreshold;
					this.panFlag = true;
				}
			} else if (event.isFinal) {
				this.onPanend(event);
			}
		}
	}

	protected onPanmove(event) {
		if (!this.panFlag) {
			return;
		}

		const { iOSEdgeSwipeThreshold, releaseOnScroll } = this.options;
		const userDirection = getDirectionByAngle(
			event.angle, this.options.thresholdAngle);

		// not support offset properties in Hammerjs - start
		const prevInput = this.hammer.session.prevInput;

		if (releaseOnScroll && !event.srcEvent.cancelable) {
			this.onPanend({
				...event,
				velocityX: 0,
				velocityY: 0,
				offsetX: 0,
				offsetY: 0,
			});
			return;
		}

		if (prevInput && IS_IOS_SAFARI) {
			const swipeLeftToRight = event.center.x < 0;

			if (swipeLeftToRight) {
				// iOS swipe left => right
				this.onPanend({
					...prevInput,
					velocityX: 0,
					velocityY: 0,
					offsetX: 0,
					offsetY: 0,
				});
				return;
			} else if (this.isRightEdge) {
				clearTimeout(this.rightEdgeTimer);

				// - is right to left
				const swipeRightToLeft = event.deltaX < -iOSEdgeSwipeThreshold;

				if (swipeRightToLeft) {
					this.isRightEdge = false;
				} else {
					// iOS swipe right => left
					this.rightEdgeTimer = window.setTimeout(() => {
						this.onPanend({
							...prevInput,
							velocityX: 0,
							velocityY: 0,
							offsetX: 0,
							offsetY: 0,
						});
					}, 100);
				}
			}
		}
		/* eslint-disable no-param-reassign */
		if (prevInput) {
			event.offsetX = event.deltaX - prevInput.deltaX;
			event.offsetY = event.deltaY - prevInput.deltaY;
		} else {
			event.offsetX = 0;
			event.offsetY = 0;
		}
		const offset: number[] = this.getOffset(
			[event.offsetX, event.offsetY],
			[
				useDirection(DIRECTION_HORIZONTAL, this._direction, userDirection),
				useDirection(DIRECTION_VERTICAL, this._direction, userDirection),
			]);
		const prevent = offset.some(v => v !== 0);

		if (prevent) {
			const srcEvent = event.srcEvent;

			if (srcEvent.cancelable !== false) {
				srcEvent.preventDefault();
			}
			srcEvent.stopPropagation();
		}
		event.preventSystemEvent = prevent;
		prevent && this.observer.change(this, event, toAxis(this.axes, offset));
	}

	protected onPanend(event) {
		if (!this.panFlag) {
			return;
		}
		clearTimeout(this.rightEdgeTimer);
		this.panFlag = false;
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
		this.hammer.on("hammer.input", this.onHammerInput)
			.on("panstart panmove", this.onPanmove);
	}

	private dettachEvent() {
		this.hammer.off("hammer.input", this.onHammerInput)
			.off("panstart panmove", this.onPanmove);
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
