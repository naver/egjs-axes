import { InterruptManager } from "./InterruptManager";
import { IInputType, IInputTypeObserver, toAxis } from "./inputType/InputType";
import { EventManager, ChangeEventOption } from "./EventManager";
import { AxisManager, Axis } from "./AxisManager";
import { AnimationManager } from "./AnimationManager";
import { AxesOption } from "./Axes";
import { isOutside, getInsidePosition, getCirculatedPos } from "./Coordinate";
import { map, equal } from "./utils";
import { AnimationParam } from "./types";

export class InputObserver implements IInputTypeObserver {
  public options: AxesOption;
  private _itm: InterruptManager;
  private _em: EventManager;
  private _axm: AxisManager;
  private _am: AnimationManager;
  private _isOutside = false;
  private _moveDistance: Axis = null;
  private _isStopped = false;
  public constructor({
    options,
    itm,
    em,
    axm,
    am,
  }: {
    options: AxesOption;
    itm: InterruptManager;
    em: EventManager;
    axm: AxisManager;
    am: AnimationManager;
  }) {
    this.options = options;
    this._itm = itm;
    this._em = em;
    this._axm = axm;
    this._am = am;
  }

  public get(input: IInputType): Axis {
    return this._axm.get(input.axes);
  }

  public hold(input: IInputType, event) {
    if (this._itm.isInterrupted() || !input.axes.length) {
      return;
    }
    const changeOption: ChangeEventOption = {
      input,
      event,
    };
    this._isStopped = false;
    this._itm.setInterrupt(true);
    this._am.stopAnimation(input.axes, changeOption);
    if (!this._moveDistance) {
      this._em.triggerHold(this._axm.get(), changeOption);
    }
    this._isOutside = this._axm.isOutside(input.axes);
    this._moveDistance = this._axm.get(input.axes);
  }

  public change(input: IInputType, event, offset: Axis, useDuration?: boolean) {
    if (
      this._isStopped ||
      !this._itm.isInterrupting() ||
      this._axm.every(offset, (v) => v === 0)
    ) {
      return;
    }
    let depaPos: Axis = this._moveDistance || this._axm.get(input.axes);
    let destPos: Axis;

    // for outside logic
    destPos = map(depaPos, (v, k) => v + (offset[k] || 0));
    if (this._moveDistance) {
      this._moveDistance = this._axm.map(destPos, (v, { circular, range }) =>
        circular && (circular[0] || circular[1])
          ? getCirculatedPos(v, range, circular as boolean[])
          : v
      );
    }
    // from outside to inside
    if (
      this._isOutside &&
      this._axm.every(depaPos, (v, opt) => !isOutside(v, opt.range))
    ) {
      this._isOutside = false;
    }
    depaPos = this._atOutside(depaPos);
    destPos = this._atOutside(destPos);
    const changeOption: ChangeEventOption = {
      input,
      event,
    };
    if (useDuration) {
      const duration = this._am.getDuration(destPos, depaPos);
      this._am.stopAnimation(input.axes, changeOption);
      this._am.animateTo(destPos, duration, changeOption);
    } else {
      const isCanceled = !this._em.triggerChange(
        destPos,
        false,
        depaPos,
        changeOption,
        true
      );
      if (isCanceled) {
        this._isStopped = true;
        this._moveDistance = null;
        this._am.finish(false);
      }
    }
  }

  public release(
    input: IInputType,
    event,
    velocity: number[],
    inputDuration?: number
  ) {
    if (this._isStopped || !this._itm.isInterrupting() || !this._moveDistance) {
      return;
    }
    const pos: Axis = this._axm.get(input.axes);
    const depaPos: Axis = this._axm.get();
    const displacement = this._am.getDisplacement(velocity);
    const offset = toAxis(input.axes, displacement);
    let destPos: Axis = this._axm.get(
      this._axm.map(offset, (v, opt, k) => {
        if (opt.circular && (opt.circular[0] || opt.circular[1])) {
          return pos[k] + v;
        } else {
          return getInsidePosition(
            pos[k] + v,
            opt.range,
            opt.circular as boolean[],
            opt.bounce as number[]
          );
        }
      })
    );
    const duration = this._am.getDuration(destPos, pos, inputDuration);

    if (duration === 0) {
      destPos = { ...depaPos };
    }
    // prepare params
    const param: AnimationParam = {
      depaPos,
      destPos,
      duration,
      delta: this._axm.getDelta(depaPos, destPos),
      inputEvent: event,
      input,
      isTrusted: true,
    };
    this._em.triggerRelease(param);
    this._moveDistance = null;

    // to contol
    const userWish = this._am.getUserControl(param);
    const isEqual = equal(userWish.destPos, depaPos);
    const changeOption: ChangeEventOption = {
      input,
      event,
    };
    if (isEqual || userWish.duration === 0) {
      if (!isEqual) {
        this._em.triggerChange(
          userWish.destPos,
          false,
          depaPos,
          changeOption,
          true
        );
      }
      this._itm.setInterrupt(false);
      if (this._axm.isOutside()) {
        this._am.restore(changeOption);
      } else {
        this._em.triggerFinish(true);
      }
    } else {
      this._am.animateTo(userWish.destPos, userWish.duration, changeOption);
    }
  }

  // when move pointer is held in outside
  private _atOutside(pos: Axis) {
    if (this._isOutside) {
      return this._axm.map(pos, (v, opt) => {
        const tn = opt.range[0] - (opt.bounce[0] as number);
        const tx = opt.range[1] + (opt.bounce[1] as number);
        return v > tx ? tx : v < tn ? tn : v;
      });
    } else {
      return this._axm.map(pos, (v, opt) => {
        const min = opt.range[0];
        const max = opt.range[1];
        const out = opt.bounce;
        const circular = opt.circular;

        if (circular && (circular[0] || circular[1])) {
          return v;
        } else if (v < min) {
          // left
          return min - this._am.interpolate(min - v, out[0] as number);
        } else if (v > max) {
          // right
          return max + this._am.interpolate(v - max, out[1] as number);
        }
        return v;
      });
    }
  }
}
