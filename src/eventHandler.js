import Coordinate from "./coordinate";
import { DIRECTION } from "./consts";

export default (superclass) => class extends superclass {
    constructor() {
		super();
		this._status = {
			grabOutside: false,		// check whether user's action started on outside
			currentHammer: null,		// current hammer instance
			currentOptions: {},		// current bind options
			moveDistance: null,		// a position of the first user's action
			prevented: false		//  check whether the animation event was prevented
		};
    }

    _setCurrentTarget(info) {
		this._status.currentOptions = info.options;
		this._status.currentHanmmer = info.hammer;
    }

	// panstart event handler
	_start(e) {
		if (!this._status.currentOptions.interruptable && this._status.prevented) {
			return;
		}
		let pos = this.get();
		let min = this.options.min;
		let max = this.options.max;
		this._setInterrupt(true);
		this._grab(min, max, this.options.circular);
		/**
		 * This event is fired when a user holds an element on the screen of the device.
		 * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
		 * @name eg.MovableCoord#hold
		 * @event
		 * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
		 * @param {Array} param.pos coordinate <ko>좌표 정보</ko>
		 * @param {Number} param.pos.0 The X coordinate<ko>x 좌표</ko>
		 * @param {Number} param.pos.1 The Y coordinate<ko>y 좌표</ko>
		 * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다.</ko>
		 *
		 */
		this.trigger("hold", {
			pos: pos.concat(),
			hammerEvent: e
		});

		this._status.moveDistance = pos.concat();
		this._status.grabOutside = Coordinate.isOutside(pos, min, max);
	}

	// panmove event handler
	_move(e) {
		if (!this._isInterrupting() || !this._status.moveDistance) {
			return;
		}
		let pos = this.get(true);
		let min = this.options.min;
		let max = this.options.max;
		let bounce = this.options.bounce;
		let margin = this.options.margin;
		let currentOptions = this._status.currentOptions;
		let direction = currentOptions.direction;
		let scale = currentOptions.scale;
		let userDirection = Coordinate.getDirectionByAngle(e.angle, currentOptions.thresholdAngle);
		let out = [
			margin[0] + bounce[0],
			margin[1] + bounce[1],
			margin[2] + bounce[2],
			margin[3] + bounce[3]
		];
		let prevent  = false;
		
		// not support offset properties in Hammerjs - start
		let prevInput = this._status.currentHanmmer.session.prevInput;
		if (prevInput) {
			e.offsetX = e.deltaX - prevInput.deltaX;
			e.offsetY = e.deltaY - prevInput.deltaY;
		} else {
			e.offsetX = e.offsetY = 0;
		}

		// not support offset properties in Hammerjs - end
		if (Coordinate.isHorizontal(direction, userDirection)) {
			this._status.moveDistance[0] += (e.offsetX * scale[0]);
			prevent = true;
		}
		if (Coordinate.isVertical(direction, userDirection)) {
			this._status.moveDistance[1] += (e.offsetY * scale[1]);
			prevent = true;
		}
		if (prevent) {
			e.srcEvent.preventDefault();
			e.srcEvent.stopPropagation();
		}
		e.preventSystemEvent = prevent;

		pos[0] = this._status.moveDistance[0];
		pos[1] = this._status.moveDistance[1];
		pos = Coordinate.getCircularPos(pos, min, max, this.options.circular);

		// from outside to inside
		if (this._status.grabOutside && !Coordinate.isOutside(pos, min, max)) {
			this._status.grabOutside = false;
		}
		
		// when move pointer is held in outside
		let tv;
		let tn;
		let tx;		
		if (this._status.grabOutside) {
			tn = min[0] - out[3], tx = max[0] + out[1], tv = pos[0];
			pos[0] = tv > tx ? tx : (tv < tn ? tn : tv);
			tn = min[1] - out[0], tx = max[1] + out[2], tv = pos[1];
			pos[1] = tv > tx ? tx : (tv < tn ? tn : tv);
		} else {

			// when start pointer is held in inside
			// get a initialization slope value to prevent smooth animation.
			let initSlope = this._easing(0.00001) / 0.00001;

			if (pos[1] < min[1]) { // up
				tv = (min[1] - pos[1]) / (out[0] * initSlope);
				pos[1] = min[1] - this._easing(tv) * out[0];
			} else if (pos[1] > max[1]) { // down
				tv = (pos[1] - max[1]) / (out[2] * initSlope);
				pos[1] = max[1] + this._easing(tv) * out[2];
			}
			if (pos[0] < min[0]) { // left
				tv = (min[0] - pos[0]) / (out[3] * initSlope);
				pos[0] = min[0] - this._easing(tv) * out[3];
			} else if (pos[0] > max[0]) { // right
				tv = (pos[0] - max[0]) / (out[1] * initSlope);
				pos[0] = max[0] + this._easing(tv) * out[1];
			}
		}
		this._setPosAndTriggerChange(pos, true, e);
	}

	// panend event handler
	_end(e) {
		let pos = this.get();
		if (!this._isInterrupting() || !this._status.moveDistance) {
			return;
		}

		// Abort the animating post process when "tap" occurs
		if (e.distance === 0 /*e.type === "tap"*/) {
			this._setInterrupt(false);
			this.trigger("release", {
				depaPos: pos.concat(),
				destPos: pos.concat(),
				hammerEvent: e || null
			});
		} else {
			let direction = this._status.currentOptions.direction;
			let scale = this._status.currentOptions.scale;
			let vX =  Math.abs(e.velocityX);
			let vY = Math.abs(e.velocityY);

			!(direction & Coordinate.DIRECTION_HORIZONTAL) && (vX = 0);
			!(direction & Coordinate.DIRECTION_VERTICAL) && (vY = 0);

			let offset = Coordinate.getNextOffsetPos([
				vX * (e.deltaX < 0 ? -1 : 1) * scale[0],
				vY * (e.deltaY < 0 ? -1 : 1) * scale[1]
			], this.options.deceleration);
			let destPos = [ pos[0] + offset[0], pos[1] + offset[1] ];
			destPos = Coordinate.getPointOfIntersection(pos, destPos, 
				this.options.min, this.options.max, 
				this.options.circular, this.options.bounce);
			/**
			 * This event is fired when a user release an element on the screen of the device.
			 * @ko 사용자가 기기의 화면에서 손을 뗐을 때 발생하는 이벤트
			 * @name eg.MovableCoord#release
			 * @event
			 *
			 * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
			 * @param {Array} param.depaPos The coordinates when releasing an element<ko>손을 뗐을 때의 좌표현재 </ko>
			 * @param {Number} param.depaPos.0 The X coordinate <ko> x 좌표</ko>
			 * @param {Number} param.depaPos.1 The Y coordinate <ko> y 좌표</ko>
			 * @param {Array} param.destPos The coordinates to move to after releasing an element<ko>손을 뗀 뒤에 이동할 좌표</ko>
			 * @param {Number} param.destPos.0 The X coordinate <ko>x 좌표</ko>
			 * @param {Number} param.destPos.1 The Y coordinate <ko>y 좌표</ko>
			 * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다</ko>
			 *
			 */
			this.trigger("release", {
				depaPos: pos.concat(),
				destPos: destPos,
				hammerEvent: e || null
			});

			if (pos[0] !== destPos[0] || pos[1] !== destPos[1]) {
				this._animateTo(destPos, null, e || null);
			} else {
				this._setInterrupt(false);
			}
		}
		this._status.moveDistance = null;
	}

	_isInterrupting() {
		// when interruptable is 'true', return value is always 'true'.
		return this._status.currentOptions.interruptable || this._status.prevented;
	}

    _setInterrupt(prevented) {
		!this._status.currentOptions.interruptable &&
		(this._status.prevented = prevented);
	}    
};
