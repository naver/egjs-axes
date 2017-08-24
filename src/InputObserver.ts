import Axes from "./Axes";
import { InterruptManager } from "./InterruptManager";
import { IInputType, IInputTypeObserver } from "./inputType/InputType";
import { EventManager } from "./EventManager";
import { AxisManager, Axis } from "./AxisManager";
import { AnimationParam, AnimationManager } from "./AnimationManager";
import { AxesOption } from "./Axes";
import Coordinate from "./Coordinate";

export class InputObserver implements IInputTypeObserver {
  isOutside = false;
  moveDistance: Axis = null;
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
    this.am.grab(inputType.axes, event);
    if (!this.moveDistance) {
      this.em.triggerHold(this.axm.get(), event);
    }
    this.isOutside = this.axm.isOutside(inputType.axes);
    this.moveDistance = this.axm.get(inputType.axes);
  }
  change(inputType, event, offset: Axis) {
    if (!this.itm.isInterrupting() || this.axm.every(offset, v => v === 0)) {
      return;
    }
    const depaPos: Axis = this.axm.get(inputType.axes);
    let destPos: Axis;

    // for outside logic
    destPos = this.axm.map(this.moveDistance || depaPos, (v, k) => v + (offset[k] || 0));
    this.moveDistance && (this.moveDistance = destPos);
    destPos = this.axm.map(destPos, (v, k, opt) => Coordinate.getCirculatedPos(v, opt.range, opt.circular as boolean[]));

    // from outside to inside
    if (this.isOutside &&
      this.axm.every(depaPos, (v, k, opt) => !Coordinate.isOutside(v, opt.range))) {
      this.isOutside = false;
    }
    destPos = this.atOutside(destPos);

    this.em.triggerChange(destPos, event);
  }
  release(inputType: IInputType, event, offset: Axis, inputDuration?: number) {
    if (!this.itm.isInterrupting()) {
      return;
    }
    if (!this.moveDistance) {
      return;
    }
    const pos: Axis = this.axm.get(inputType.axes);
    const depaPos: Axis = this.axm.get();
    const destPos: Axis = this.axm.get(this.axm.map(offset, (v, k, opt) => {
      return Coordinate.getInsidePosition(
        pos[k] + v,
        opt.range,
        opt.circular as boolean[],
        opt.bounce as number[],
      );
    }));
    // prepare params
    const param: AnimationParam = {
      depaPos,
      destPos,
      duration: this.am.getDuration(destPos, pos, inputDuration),
      delta: this.axm.getDelta(depaPos, destPos),
      inputEvent: event,
    };
    this.em.triggerRelease(param);
    this.moveDistance = null;

    // to contol
    const userWish = this.am.getUserControll(param);
    const isEqual = AxisManager.equal(userWish.destPos, depaPos);
    if (isEqual || userWish.duration === 0) {
      !isEqual && this.em.triggerChange(userWish.destPos, event);
      this.itm.setInterrupt(false);
      this.axm.isOutside() && this.am.restore(event);
    } else {
      this.am.animateTo(userWish.destPos, userWish.duration, event);
    }
  }
};
