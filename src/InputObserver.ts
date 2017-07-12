import Axes from "./Axes";
import { InterruptManager } from "./InterruptManager";
import { AxesOption } from "./AxesOption";
import { InputType, IInputTypeObserver } from "./inputType/InputType";
import { EventManager } from "./EventManager";
import { AxisManager, Axis } from "./AxisManager";
import { AnimationManager } from "./AnimationManager";
import Coordinate from "./Coordinate";

export class InputObserver implements IInputTypeObserver {
  isOutside = false;
  moveDistance: Axis;
  constructor(
    public options: AxesOption,
    private itm: InterruptManager,
    private em: EventManager,
    private axm: AxisManager,
    private am: AnimationManager,
  ) {
  }

  private getDuration(destPos: Axis, pos: Axis) {
    const durations: Axis = this.axm.map(
      destPos,
      (v, k) => Coordinate.getDuration(
        Math.abs(Math.abs(v) - Math.abs(pos[k])),
        this.options.deceleration)
      );
    return Object.keys(durations).reduce((max, v) => Math.max(max, durations[v]), -Infinity);
  }

  hold(inputType: InputType, event) {
    if (this.itm.isInterrupted() || !inputType.axes.length) {
      return;
    }
    this.itm.setInterrupt(true);
    this.am.grab(inputType.axes);
    const pos = this.axm.get();

		/**
		 * This event is fired when a user holds an element on the screen of the device.
		 * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
		 * @event eg.Axes#hold
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
    this.isOutside = this.axm.isOutside(inputType.axes);
    this.moveDistance = this.axm.get(inputType.axes);
  }
  change(inputType, event, offset: Axis) {
    if (!this.itm.isInterrupting() || this.axm.every(offset, v => v === 0)) {
      return;
    }
    const depaPos: Axis = this.axm.get(inputType.axes);

    // for outside logic
    this.moveDistance = this.axm.map(this.moveDistance, (v, k) => v + offset[k]);
    let destPos: Axis = this.axm.map(this.moveDistance, (v, k, opt) => Coordinate.getCirculatedPos(v, opt.range, opt.circular));

    // from outside to inside
    if (this.isOutside &&
      this.axm.every(depaPos, (v, k, opt) => !Coordinate.isOutside(v, opt.range))) {
      this.isOutside = false;
    }
    destPos = this.atOutside(destPos);
    this.em.triggerChange(this.axm.moveTo(destPos), event);
  }

  // when move pointer is held in outside
  private atOutside(pos: Axis) {
    if (this.isOutside) {
      return this.axm.map(pos, (v, k, opt) => {
        const tn = opt.range[0] - (opt.margin[0] + opt.bounce[0]);
        const tx = opt.range[1] + (opt.margin[1] + opt.bounce[1]);
        return v > tx ? tx : (v < tn ? tn : v);
      });
    } else {
      // when start pointer is held in inside
      // get a initialization slope value to prevent smooth animation.
      const initSlope = this.am.easing(0.00001) / 0.00001;
      return this.axm.map(pos, (v, k, opt) => {
        const min = opt.range[0];
        const max = opt.range[1];
        const out = [opt.margin[0] + opt.bounce[0], opt.margin[1] + opt.bounce[1]];
        if (v < min) { // left
          return min - this.am.easing((min - v) / (out[0] * initSlope)) * out[0];
        } else if (v > max) { // right
          return max + this.am.easing((v - max) / (out[1] * initSlope)) * out[1];
        }
        return v;
      });
    }
  }
  release(inputType: InputType, event, offset: Axis, inputDuration?: number) {
    if (!this.itm.isInterrupting()) {
      return;
    }
    const pos: Axis = this.axm.get(inputType.axes);
    const depaPos: Axis = this.axm.get();
    const destPos: Axis = this.axm.map(offset, (v, k, opt) => {
      return Coordinate.getInsidePosition(
        pos[k] + v,
        opt.range,
        opt.circular
      );
    });
    let isAnimate = false;
    let duration = 0;

    if (!AxisManager.equal(destPos, pos)) {
      duration = typeof inputDuration !== "undefined" ? inputDuration : this.getDuration(destPos, pos);
      if (duration === 0) {
        // console.log("--------moveTo on release---------");
        this.em.triggerChange(this.axm.moveTo(destPos), event);
      } else {
        isAnimate = true;
      }
    }
    /**
     * This event is fired when a user release an element on the screen of the device.
     * @ko 사용자가 기기의 화면에서 손을 뗐을 때 발생하는 이벤트
     * @event eg.Axes#release
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
    const param = {
      depaPos,
      destPos: { ...depaPos, ...destPos},
      duration,
      inputEvent: event
    }
    this.em.trigger("release", param);
    this.moveDistance = null;
    if (isAnimate || param.duration > 0) {
      // console.log("--------animation---------");
      this.am.animateTo(
        param.destPos,
        this.options.maximumDuration > param.duration ? param.duration : this.options.maximumDuration);
    } else {
      this.itm.setInterrupt(false);
    }
  }
};
