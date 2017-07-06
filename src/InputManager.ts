import Axes from "./Axes";
import { InterruptManager } from "./InterruptManager";
import { AxesOption } from "./Option.d";
import { IInputType } from "./inputType/Input.d";
import { EventManager } from "./EventManager";
import { AxisManager, Axis } from "./AxisManager";
import { AnimationManager } from "./AnimationManager";

export class InputManager {
  constructor(
    private options: AxesOption,
    private itm: InterruptManager,
    private em: EventManager,
    private axm: AxisManager,
    private am: AnimationManager,
  ) {
  }

  onHold(inputType: IInputType, event) {
    if (this.itm.isInterrupted() || !inputType.axes.length) {
      return;
    }
    this.itm.setInterrupt(true);
    this.am.grab(inputType.axes);

    let pos: Axis = this.axm.get(inputType.axes);
    if (inputType.onHold) {
      const offset: Axis = inputType.onHold();
      pos = this.axm.map(this.axm.get(inputType.axes), (v, k) => v + offset[k]);
    }
    // 현재 좌표정보에 offset을 반영 ????
		/**
		 * This event is fired when a user holds an element on the screen of the device.
		 * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
		 * @event eg.MovableCoord#hold
		 * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
		 * @param {Array} param.pos coordinate <ko>좌표 정보</ko>
		 * @param {Number} param.pos.0 The X coordinate<ko>x 좌표</ko>
		 * @param {Number} param.pos.1 The Y coordinate<ko>y 좌표</ko>
		 * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다.</ko>
		 *
		 */
    this.em.trigger("hold", {
      pos,
      inputEvent: event,
    });

    // this._status.grabOutside = Coordinate.isOutside(pos, min, max);
  }
  onChange(inputType, event) {
    if (!this.itm.isInterrupting()) {
      return;
    }
    const offset = inputType.onChange();

    // if (offset[0] === 0 && offset[1] === 0) {
    //   return;
    // }
    // const min = this.options.min;
    // const max = this.options.max;
    // const out = [
    //   this.options.margin[0] + this.options.bounce[0],
    //   this.options.margin[1] + this.options.bounce[1],
    //   this.options.margin[2] + this.options.bounce[2],
    //   this.options.margin[3] + this.options.bounce[3],
    // ];
    // let pos = this.get();

    // pos[0] += offset[0];
    // pos[1] += offset[1];

    // pos = Coordinate.getCircularPos(pos, min, max, this.options.circular);

    // // from outside to inside
    // if (this._status.grabOutside && !Coordinate.isOutside(pos, min, max)) {
    //   this._status.grabOutside = false;
    // }

    // // when move pointer is held in outside
    // let tv;
    // let tn;
    // let tx;

    // if (this._status.grabOutside) {
    //   tn = min[0] - out[3];
    //   tx = max[0] + out[1];
    //   tv = pos[0];
    //   /* eslint-disable no-nested-ternary */
    //   pos[0] = tv > tx ? tx : (tv < tn ? tn : tv);
    //   tn = min[1] - out[0];
    //   tx = max[1] + out[2];
    //   tv = pos[1];
    //   pos[1] = tv > tx ? tx : (tv < tn ? tn : tv);
    //   /* eslint-enable no-nested-ternary */
    // } else {
    //   // when start pointer is held in inside
    //   // get a initialization slope value to prevent smooth animation.
    //   const initSlope = this._easing(0.00001) / 0.00001;

    //   if (pos[1] < min[1]) { // up
    //     tv = (min[1] - pos[1]) / (out[0] * initSlope);
    //     pos[1] = min[1] - this._easing(tv) * out[0];
    //   } else if (pos[1] > max[1]) { // down
    //     tv = (pos[1] - max[1]) / (out[2] * initSlope);
    //     pos[1] = max[1] + this._easing(tv) * out[2];
    //   }
    //   if (pos[0] < min[0]) { // left
    //     tv = (min[0] - pos[0]) / (out[3] * initSlope);
    //     pos[0] = min[0] - this._easing(tv) * out[3];
    //   } else if (pos[0] > max[0]) { // right
    //     tv = (pos[0] - max[0]) / (out[1] * initSlope);
    //     pos[0] = max[0] + this._easing(tv) * out[1];
    //   }
    // }

    // this.em.triggerChange(pos, true, event);
  }
  onRelease(inputType, event) {
    // if (!this._isInterrupting()) {
    //   return;
    // }
    // const offset = inputType.getOffsetOnChange();
    // const pos = this.get();

    // // Abort the animating post process when "tap" occurs
    // if (offset[0] === 0 && offset[1] === 0) {
    //   this.trigger("release", {
    //     depaPos: pos.concat(),
    //     destPos: pos.concat(),
    //     inputEvent: event || null,
    //   });
    //   this.itm.setInterrupt(false);
    // } else {
    //   const nextOffset = Coordinate.getNextOffsetPos([
    //     offset[0],
    //     offset[1],
    //   ], this.options.deceleration);
    //   const destPos = Coordinate.getPointOfIntersection(
    //     pos,
    //     [
    //       pos[0] + nextOffset[0],
    //       pos[1] + nextOffset[1],
    //     ],
    //     this.options.min,
    //     this.options.max,
    //     this.options.circular,
    //     this.options.bounce
    //   );

    // 	/**
    // 	 * This event is fired when a user release an element on the screen of the device.
    // 	 * @ko 사용자가 기기의 화면에서 손을 뗐을 때 발생하는 이벤트
    // 	 * @event eg.MovableCoord#release
    // 	 *
    // 	 * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
    // 	 * @param {Array} param.depaPos The coordinates when releasing an element<ko>손을 뗐을 때의 좌표현재 </ko>
    // 	 * @param {Number} param.depaPos.0 The X coordinate <ko> x 좌표</ko>
    // 	 * @param {Number} param.depaPos.1 The Y coordinate <ko> y 좌표</ko>
    // 	 * @param {Array} param.destPos The coordinates to move to after releasing an element<ko>손을 뗀 뒤에 이동할 좌표</ko>
    // 	 * @param {Number} param.destPos.0 The X coordinate <ko>x 좌표</ko>
    // 	 * @param {Number} param.destPos.1 The Y coordinate <ko>y 좌표</ko>
    // 	 * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다</ko>
    // 	 *
    // 	 */
    //   this.trigger("release", {
    //     depaPos: pos.concat(),
    //     destPos,
    //     inputEvent: event || null,
    //   });
    //   if (pos[0] !== destPos[0] || pos[1] !== destPos[1]) {
    //     this.am.animateTo(destPos, null, event || null);
    //   } else {
    //     this.itm.setInterrupt(false);
    //   }
    // }
  }
};
