import { PanEvent } from "../types";
import Axes from "../Axes";
import { getAngle } from "../utils";
import { toAxis } from "./InputType";
import { PanInput, PanInputOption } from "./PanInput";

/**
 * @class eg.Axes.RotatePanInput
 * @classdesc A module that passes the angle moved by touch to Axes and uses one axis of rotation.<br>[Details](https://github.com/naver/egjs-axes/wiki/RotatePanInput)
 * @ko 터치에 의해 움직인 각도를 Axes 에 전달하며 1개의 회전축만 사용한다.<br>[상세내용](https://github.com/naver/egjs-axes/wiki/RotatePanInput-%7C-%ED%95%9C%EA%B5%AD%EC%96%B4)
 *
 * @example
 * const input = new eg.Axes.RotatePanInput("#area");
 *
 * var axes = new eg.Axes({
 *	// property name('angle') could be anything you want (eg. x, y, z...)
 * 	angle: {
 * 		range: [-180, 180] // from -180deg to 180deg
 * 	}
 * });
 *
 * axes.connect("angle", input)
 *
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.RotatePanInput module <ko>eg.Axes.RotatePanInput 모듈을 사용할 엘리먼트</ko>
 * @param {PanInputOption} [options] The option object of the eg.Axes.PanInput module<ko>eg.Axes.PanInput 모듈의 옵션 객체</ko>
 * @extends eg.Axes.PanInput
 */
export class RotatePanInput extends PanInput {
	private _rotateOrigin: number[];
	private _prevAngle: number;
	private _prevQuadrant: number = null;
	private _lastDiff = 0;
	private _coefficientForDistanceToAngle: number;

	constructor(el: string | HTMLElement, options?: PanInputOption) {
		super(el, options);
	}

	public mapAxes(axes: string[]) {
		this._direction = Axes.DIRECTION_ALL;
		this.axes = axes;
	}

	public onPanstart(event: MouseEvent) {
		if (!this.isEnabled) {
			return;
		}

		const rect = this.element.getBoundingClientRect();
		const panEvent = this.transformEvent(event);

		this._observer.hold(this, panEvent);
		this._panFlag = true;
		/**
		 * Responsive
		 */
		// TODO: how to do if element is ellipse not circle.
		this._coefficientForDistanceToAngle = 360 / (rect.width * Math.PI); // from 2*pi*r * x / 360
		// TODO: provide a way to set origin like https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
		this._rotateOrigin = [rect.left + (rect.width - 1) / 2, rect.top + (rect.height - 1) / 2];

		// init angle.
		this._prevInput = null;
		this._prevAngle = null;

		this.triggerChange(panEvent);
	}

	public onPanmove(event: MouseEvent) {
		if (!this._panFlag || !this.isEnabled) {
			return;
		}

		const panEvent = this.transformEvent(event);

		if (panEvent.srcEvent.cancelable !== false) {
			panEvent.srcEvent.preventDefault();
		}
		panEvent.srcEvent.stopPropagation();
		this.triggerChange(panEvent);
		this._prevInput = panEvent;
	}

	public onPanend(event: MouseEvent) {
		if (!this._panFlag || !this.isEnabled) {
			return;
		}

		const panEvent = this.transformEvent(event);
		this.triggerChange(panEvent);
		this.triggerAnimation(panEvent);
		this._panFlag = false;
	}

	private triggerChange(event: PanEvent) {
		const { x, y } = this.getPosFromOrigin(event.center.x, event.center.y);
		const angle = getAngle(x, y);
		const quadrant = this.getQuadrant(event.center.x, event.center.y);
		const diff = this.getDifference(this._prevAngle, angle, this._prevQuadrant, quadrant);

		this._prevAngle = angle;
		this._prevQuadrant = quadrant;

		if (diff === 0) {
			return;
		}

		this._lastDiff = diff;
		this._observer.change(this, event, toAxis(this.axes, [-diff])); // minus for clockwise
	}

	private triggerAnimation(event: PanEvent) {
		const vx = event.velocityX;
		const vy = event.velocityY;
		const velocity = Math.sqrt(vx * vx + vy * vy) * (this._lastDiff > 0 ? -1 : 1); // clockwise
		const duration = Math.abs(velocity / -this._observer.options.deceleration);
		const distance = velocity / 2 * duration;

		this._observer.release(this, event, toAxis(this.axes, [distance * this._coefficientForDistanceToAngle]));
	}

	private getDifference(prevAngle: number, angle: number, prevQuadrant: number, quadrant: number) {
		let diff: number;

		if (prevAngle === null) {
			diff = 0;
		} else if (prevQuadrant === 1 && quadrant === 4) {
			diff = -prevAngle - (360 - angle);
		} else if (prevQuadrant === 4 && quadrant === 1) {
			diff = (360 - prevAngle) + angle;
		} else {
			diff = angle - prevAngle;
		}

		return diff;
	}

	private getPosFromOrigin(posX: number, posY: number) {
		return {
			x: posX - this._rotateOrigin[0],
			y: this._rotateOrigin[1] - posY,
		};
	}

	/**
	 * Quadrant
	 *       y(+)
	 *       |
	 *   2   |    1
	 * --------------->x(+)
	 *   3   |    4
	 *       |
	 */
	private getQuadrant(posX: number, posY: number) {
		const { x, y } = this.getPosFromOrigin(posX, posY);
		let q = 0;

		if (x >= 0 && y >= 0) {
			q = 1;
		} else if (x < 0 && y >= 0) {
			q = 2;
		} else if (x < 0 && y < 0) {
			q = 3;
		} else if (x >= 0 && y < 0) {
			q = 4;
		}
		return q;
	}
}
