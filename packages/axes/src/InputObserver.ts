/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { InterruptManager } from "./InterruptManager";
import { InputType, InputTypeObserver, toAxis } from "./inputType/InputType";
import { EventManager, ChangeEventOption } from "./EventManager";
import { AxisManager, Axis } from "./AxisManager";
import { AxesOption } from "./Axes";
import {
  isOutside,
  getInsidePosition,
  getCirculatedPos,
  isEndofBounce,
} from "./Coordinate";
import { map, equal } from "./utils";
import { AnimationParam } from "./types";
import { AnimationManager } from "./animation/AnimationManager";

export class InputObserver implements InputTypeObserver {
  public options: AxesOption;
  private _interruptManager: InterruptManager;
  private _eventManager: EventManager;
  private _axisManager: AxisManager;
  private _animationManager: AnimationManager;
  private _isOutside = false;
  private _moveDistance: Axis = null;
  private _isStopped = false;
  public constructor({
    options,
    interruptManager,
    eventManager,
    axisManager,
    animationManager,
  }: {
    options: AxesOption;
    interruptManager: InterruptManager;
    eventManager: EventManager;
    axisManager: AxisManager;
    animationManager: AnimationManager;
  }) {
    this.options = options;
    this._interruptManager = interruptManager;
    this._eventManager = eventManager;
    this._axisManager = axisManager;
    this._animationManager = animationManager;
  }

  public get(input: InputType): Axis {
    return this._axisManager.get(input.axes);
  }

  public hold(input: InputType, event) {
    if (this._interruptManager.isInterrupted() || !input.axes.length) {
      return;
    }
    const changeOption: ChangeEventOption = {
      input,
      event,
    };
    this._isStopped = false;
    this._interruptManager.setInterrupt(true);
    this._animationManager.stopAnimation(changeOption);
    ++this._eventManager.holdingCount;
    if (!this._moveDistance) {
      this._eventManager.hold(this._axisManager.get(), changeOption);
    }
    this._isOutside = this._axisManager.isOutside(input.axes);
    this._moveDistance = this._axisManager.get(input.axes);
  }

  public change(input: InputType, event, offset: Axis, useAnimation?: boolean) {
    if (
      this._isStopped ||
      !this._interruptManager.isInterrupting() ||
      this._axisManager.every(offset, (v) => v === 0)
    ) {
      return;
    }
    const nativeEvent = event.srcEvent ? event.srcEvent : event;
    if (nativeEvent.__childrenAxesAlreadyChanged) {
      return;
    }
    let depaPos: Axis = this._moveDistance || this._axisManager.get(input.axes);
    let destPos: Axis;

    // for outside logic
    destPos = map(depaPos, (v, k) => v + (offset[k] || 0));
    if (this._moveDistance) {
      this._moveDistance = this._axisManager.map(
        destPos,
        (v, { circular, range }) =>
          circular && (circular[0] || circular[1])
            ? getCirculatedPos(v, range, circular as boolean[])
            : v
      );
    }
    // from outside to inside
    if (
      this._isOutside &&
      this._axisManager.every(depaPos, (v, opt) => !isOutside(v, opt.range))
    ) {
      this._isOutside = false;
    }
    depaPos = this._atOutside(depaPos);
    destPos = this._atOutside(destPos);

    if (!this.options.nested || !this._isEndofAxis(offset, depaPos, destPos)) {
      nativeEvent.__childrenAxesAlreadyChanged = true;
    }

    const changeOption: ChangeEventOption = {
      input,
      event,
    };
    if (useAnimation) {
      const duration = this._animationManager.getDuration(destPos, depaPos);
      this._animationManager.animateTo(destPos, duration, changeOption);
    } else {
      const isCanceled = !this._eventManager.triggerChange(
        destPos,
        depaPos,
        changeOption,
        true
      );
      if (isCanceled) {
        this._isStopped = true;
        this._moveDistance = null;
        this._animationManager.finish(false);
      }
    }
  }

  public release(
    input: InputType,
    event,
    velocity: number[],
    inputDuration?: number
  ) {
    if (
      this._isStopped ||
      !this._interruptManager.isInterrupting() ||
      !this._moveDistance
    ) {
      return;
    }
    const nativeEvent = event.srcEvent ? event.srcEvent : event;
    if (nativeEvent.__childrenAxesAlreadyReleased) {
      velocity = velocity.map(() => 0);
    }
    const pos: Axis = this._axisManager.get(input.axes);
    const depaPos: Axis = this._axisManager.get();
    const displacement = this._animationManager.getDisplacement(velocity);
    const offset = toAxis(input.axes, displacement);
    let destPos: Axis = this._axisManager.get(
      this._axisManager.map(offset, (v, opt, k) => {
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
    nativeEvent.__childrenAxesAlreadyReleased = true;
    const duration = this._animationManager.getDuration(
      destPos,
      pos,
      inputDuration
    );

    if (duration === 0) {
      destPos = { ...depaPos };
    }
    // prepare params
    const param: AnimationParam = {
      depaPos,
      destPos,
      duration,
      delta: this._axisManager.getDelta(depaPos, destPos),
      inputEvent: event,
      input,
      isTrusted: true,
    };
    --this._eventManager.holdingCount;
    this._eventManager.triggerRelease(param);
    if (this._eventManager.holdingCount === 0) {
      this._moveDistance = null;
    }

    // to contol
    const userWish = this._animationManager.getUserControl(param);
    const isEqual = equal(userWish.destPos, depaPos);
    const changeOption: ChangeEventOption = {
      input,
      event,
    };
    if (isEqual || userWish.duration === 0) {
      if (!isEqual) {
        this._eventManager.triggerChange(
          userWish.destPos,
          depaPos,
          changeOption,
          true
        );
      }
      this._interruptManager.setInterrupt(false);
      if (this._axisManager.isOutside()) {
        this._animationManager.restore(changeOption);
      } else {
        this._eventManager.triggerFinish(true);
      }
    } else {
      this._animationManager.animateTo(
        userWish.destPos,
        userWish.duration,
        changeOption
      );
    }
  }

  // when move pointer is held in outside
  private _atOutside(pos: Axis) {
    if (this._isOutside) {
      return this._axisManager.map(pos, (v, opt) => {
        const tn = opt.range[0] - (opt.bounce[0] as number);
        const tx = opt.range[1] + (opt.bounce[1] as number);
        return v > tx ? tx : v < tn ? tn : v;
      });
    } else {
      return this._axisManager.map(pos, (v, opt) => {
        const min = opt.range[0];
        const max = opt.range[1];
        const out = opt.bounce;
        const circular = opt.circular;

        if ((circular[0] && v < min) || (circular[1] && v > max)) {
          return v;
        } else if (v < min) {
          // left
          return (
            min - this._animationManager.interpolate(min - v, out[0] as number)
          );
        } else if (v > max) {
          // right
          return (
            max + this._animationManager.interpolate(v - max, out[1] as number)
          );
        }
        return v;
      });
    }
  }

  private _isEndofAxis(offset: Axis, depaPos: Axis, destPos: Axis) {
    return this._axisManager.every(
      depaPos,
      (value, option, key) =>
        offset[key] === 0 ||
        (depaPos[key] === destPos[key] &&
          isEndofBounce(
            value,
            option.range,
            option.bounce as number[],
            option.circular as boolean[]
          ))
    );
  }
}
