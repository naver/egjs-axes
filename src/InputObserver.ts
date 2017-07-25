import Axes from "./Axes";
import { InterruptManager } from "./InterruptManager";
import { IInputType, IInputTypeObserver } from "./inputType/InputType";
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

  // when move pointer is held in outside
  private atOutside(pos: Axis) {
    if (this.isOutside) {
      return this.axm.map(pos, (v, k, opt) => {
        const tn = opt.range[0] - opt.bounce[0];
        const tx = opt.range[1] + opt.bounce[1];
        return v > tx ? tx : (v < tn ? tn : v);
      });
    } else {
      // when start pointer is held in inside
      // get a initialization slope value to prevent smooth animation.
      const initSlope = this.am.easing(0.00001) / 0.00001;
      return this.axm.map(pos, (v, k, opt) => {
        const min = opt.range[0];
        const max = opt.range[1];
        const out = opt.bounce;
        if (v < min) { // left
          return min - this.am.easing((min - v) / (out[0] * initSlope)) * out[0];
        } else if (v > max) { // right
          return max + this.am.easing((v - max) / (out[1] * initSlope)) * out[1];
        }
        return v;
      });
    }
  }

  hold(inputType: IInputType, event) {
    if (this.itm.isInterrupted() || !inputType.axes.length) {
      return;
    }
    this.itm.setInterrupt(true);
    this.am.grab(inputType.axes);
    const pos = this.axm.get();

    /**
     * This event is fired when a user holds an element on the screen of the device.
     * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
     * @name eg.Axes#hold
     * @event
     * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
     * @param {Object.<string, number>} param.pos coordinate <ko>좌표 정보</ko>
     * @param {Object} param.inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
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
    this.moveDistance = this.axm.map(this.moveDistance, (v, k) => v + (offset[k] || 0));
    let destPos: Axis = this.axm.map(this.moveDistance, (v, k, opt) => Coordinate.getCirculatedPos(v, opt.range, opt.circular));

    // from outside to inside
    if (this.isOutside &&
      this.axm.every(depaPos, (v, k, opt) => !Coordinate.isOutside(v, opt.range))) {
      this.isOutside = false;
    }
    destPos = this.atOutside(destPos);
    this.em.triggerChange(this.axm.moveTo(destPos), event);
  }
  release(inputType: IInputType, event, offset: Axis, inputDuration?: number) {
    if (!this.itm.isInterrupting()) {
      return;
    }
    const pos: Axis = this.axm.get(inputType.axes);
    const depaPos: Axis = this.axm.get();
    const destPos: Axis = this.axm.map(offset, (v, k, opt) => {
      return Coordinate.getInsidePosition(
        pos[k] + v,
        opt.range,
        opt.circular,
        opt.bounce,
      );
    });
    // prepare duration
    const param = {
      depaPos,
      destPos: { ...depaPos, ...destPos},
      duration: this.am.getDuration(destPos, pos, inputDuration),
      inputEvent: event
    }
    /**
     * This event is fired when a user release an element on the screen of the device.
     * @ko 사용자가 기기의 화면에서 손을 뗐을 때 발생하는 이벤트
     * @name eg.Axes#release
     * @event
     *
     * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
     * @param {Object.<string, number>} param.depaPos The coordinates when releasing an element<ko>손을 뗐을 때의 좌표 </ko>
     * @param {Object.<string, number>} param.destPos The coordinates to move to after releasing an element. You can change the destPos to run the animation.<ko>손을 뗀 뒤에 이동할 좌표. destPos를 변경하여 애니메이션을 동작시킬수 있다</ko>
     * @param {Object} param.inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
     *
     */
    this.em.trigger("release", param);
    if (this.axm.isOutside()) {
      this.am.restore(event);
    } else {
      if (AxisManager.equal(param.destPos, param.depaPos)) {
        this.itm.setInterrupt(false);
      } else {
        this.am.animateTo(param.destPos, param.duration);
      }
    }
    this.moveDistance = null;
  }
};
