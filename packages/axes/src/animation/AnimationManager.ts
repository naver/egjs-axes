import {
  getInsidePosition,
  isCircularable,
  getCirculatedPos,
  getDuration,
} from "../Coordinate";
import { Axis, AxisManager } from "../AxisManager";
import { InterruptManager } from "../InterruptManager";
import { EventManager, ChangeEventOption } from "../EventManager";
import {
  requestAnimationFrame,
  cancelAnimationFrame,
  map,
  every,
  filter,
  equal,
  roundNumber,
  getDecimalPlace,
  inversePow,
} from "../utils";
import { AxesOption } from "../Axes";
import {
  AnimationParam,
  ObjectInterface,
  UpdateAnimationOption,
} from "../types";

export interface AnimationState {
  pos: Axis;
  easingPer: number;
  finished: boolean;
}

const clamp = (value: number, min: number, max: number): number => {
  return Math.max(Math.min(value, max), min);
};

export abstract class AnimationManager {
  public interruptManager: InterruptManager;
  public eventManager: EventManager;
  public axisManager: AxisManager;
  protected _options: AxesOption;
  protected _animateParam: AnimationParam;
  private _raf: number;

  public constructor({
    options,
    interruptManager,
    eventManager,
    axisManager,
  }: {
    options: AxesOption;
    interruptManager: InterruptManager;
    eventManager: EventManager;
    axisManager: AxisManager;
  }) {
    this._options = options;
    this.interruptManager = interruptManager;
    this.eventManager = eventManager;
    this.axisManager = axisManager;
    this.animationEnd = this.animationEnd.bind(this);
  }

  public abstract interpolate(displacement: number, threshold: number): number;

  public abstract updateAnimation(options: UpdateAnimationOption): void;

  protected abstract _initState(info: AnimationParam): AnimationState;

  protected abstract _getNextState(prevState: AnimationState): AnimationState;

  public getDuration(
    depaPos: Axis,
    destPos: Axis,
    wishDuration?: number
  ): number {
    let duration: number;
    if (typeof wishDuration !== "undefined") {
      duration = wishDuration;
    } else {
      const durations: Axis = map(destPos, (v, k) =>
        getDuration(Math.abs(v - depaPos[k]), this._options.deceleration)
      );
      duration = Object.keys(durations).reduce(
        (max, v) => Math.max(max, durations[v]),
        -Infinity
      );
    }
    return clamp(
      duration,
      this._options.minimumDuration,
      this._options.maximumDuration
    );
  }

  public getDisplacement(velocity: number[]): number[] {
    const totalVelocity = Math.pow(
      velocity.reduce((total, v) => total + v * v, 0),
      1 / velocity.length
    );
    const duration = Math.abs(totalVelocity / -this._options.deceleration);
    return velocity.map((v) => (v / 2) * duration);
  }

  public stopAnimation(option?: ChangeEventOption): void {
    if (this._animateParam) {
      const orgPos: Axis = this.axisManager.get();
      const pos: Axis = this.axisManager.map(orgPos, (v, opt) =>
        getCirculatedPos(v, opt.range, opt.circular as boolean[])
      );
      if (!every(pos, (v, k) => orgPos[k] === v)) {
        this.eventManager.triggerChange(pos, orgPos, option, !!option);
      }
      this._animateParam = null;
      if (this._raf) {
        cancelAnimationFrame(this._raf);
      }
      this._raf = null;
      this.eventManager.triggerAnimationEnd(!!option?.event);
    }
  }

  public getEventInfo(): ChangeEventOption {
    if (
      this._animateParam &&
      this._animateParam.input &&
      this._animateParam.inputEvent
    ) {
      return {
        input: this._animateParam.input,
        event: this._animateParam.inputEvent,
      };
    } else {
      return null;
    }
  }

  public restore(option: ChangeEventOption): void {
    const pos: Axis = this.axisManager.get();
    const destPos: Axis = this.axisManager.map(pos, (v, opt) =>
      Math.min(opt.range[1], Math.max(opt.range[0], v))
    );
    this.stopAnimation();
    this.animateTo(destPos, this.getDuration(pos, destPos), option);
  }

  public animationEnd(): void {
    const beforeParam: ChangeEventOption = this.getEventInfo();
    this._animateParam = null;

    // for Circular
    const circularTargets = this.axisManager.filter(
      this.axisManager.get(),
      (v, opt) => isCircularable(v, opt.range, opt.circular as boolean[])
    );
    if (Object.keys(circularTargets).length > 0) {
      this.setTo(
        this.axisManager.map(circularTargets, (v, opt) =>
          getCirculatedPos(v, opt.range, opt.circular as boolean[])
        )
      );
    }
    this.interruptManager.setInterrupt(false);
    this.eventManager.triggerAnimationEnd(!!beforeParam);
    if (this.axisManager.isOutside()) {
      this.restore(beforeParam);
    } else {
      this.finish(!!beforeParam);
    }
  }

  public finish(isTrusted: boolean): void {
    this._animateParam = null;
    this.interruptManager.setInterrupt(false);
    this.eventManager.triggerFinish(isTrusted);
  }

  public getUserControl(param: AnimationParam): {
    destPos: Axis;
    duration: number;
  } {
    const userWish = param.setTo();
    userWish.destPos = this.axisManager.get(userWish.destPos);
    userWish.duration = clamp(
      userWish.duration,
      this._options.minimumDuration,
      this._options.maximumDuration
    );
    return userWish;
  }

  public animateTo(
    destPos: Axis,
    duration: number,
    option?: ChangeEventOption
  ): void {
    this.stopAnimation();
    const param: AnimationParam = this._createAnimationParam(
      destPos,
      duration,
      option
    );
    const depaPos = { ...param.depaPos };
    const retTrigger = this.eventManager.triggerAnimationStart(param);

    // to control
    const userWish = this.getUserControl(param);

    // You can't stop the 'animationStart' event when 'circular' is true.
    if (
      !retTrigger &&
      this.axisManager.every(userWish.destPos, (v, opt) =>
        isCircularable(v, opt.range, opt.circular as boolean[])
      )
    ) {
      console.warn(
        "You can't stop the 'animation' event when 'circular' is true."
      );
    }

    if (retTrigger && !equal(userWish.destPos, depaPos)) {
      const inputEvent = option?.event || null;
      this._animateLoop(
        {
          depaPos,
          destPos: userWish.destPos,
          duration: userWish.duration,
          delta: this.axisManager.getDelta(depaPos, userWish.destPos),
          isTrusted: !!inputEvent,
          inputEvent,
          input: option?.input || null,
        },
        () => this.animationEnd()
      );
    }
  }

  public setTo(pos: Axis, duration: number = 0) {
    const axes: string[] = Object.keys(pos);
    const orgPos: Axis = this.axisManager.get(axes);

    if (equal(pos, orgPos)) {
      return this;
    }
    this.interruptManager.setInterrupt(true);
    let movedPos = filter(pos, (v, k) => orgPos[k] !== v);
    if (!Object.keys(movedPos).length) {
      return this;
    }

    movedPos = this.axisManager.map(movedPos, (v, opt) => {
      const { range, circular } = opt;

      if (circular && (circular[0] || circular[1])) {
        return v;
      } else {
        return getInsidePosition(v, range, circular as boolean[]);
      }
    });

    if (equal(movedPos, orgPos)) {
      return this;
    }

    if (duration > 0) {
      this.animateTo(movedPos, duration);
    } else {
      this.stopAnimation();
      this.eventManager.triggerChange(movedPos);
      this.finish(false);
    }

    return this;
  }

  public setBy(pos: Axis, duration = 0) {
    return this.setTo(
      map(this.axisManager.get(Object.keys(pos)), (v, k) => v + pos[k]),
      duration
    );
  }

  public setOptions(options: AxesOption) {
    this._options = {
      ...this._options,
      ...options,
    };
  }

  private _createAnimationParam(
    pos: Axis,
    duration: number,
    option?: ChangeEventOption
  ): AnimationParam {
    const depaPos: Axis = this.axisManager.get();
    const destPos: Axis = pos;
    const inputEvent = option?.event || null;
    return {
      depaPos,
      destPos,
      duration: clamp(
        duration,
        this._options.minimumDuration,
        this._options.maximumDuration
      ),
      delta: this.axisManager.getDelta(depaPos, destPos),
      inputEvent,
      input: option?.input || null,
      isTrusted: !!inputEvent,
      done: this.animationEnd,
    };
  }

  private _animateLoop(param: AnimationParam, complete: () => void): void {
    if (param.duration) {
      this._animateParam = {
        ...param,
        startTime: new Date().getTime(),
      };
      const originalIntendedPos = map(param.destPos, (v) => v);
      let state = this._initState(this._animateParam);

      const loop = () => {
        this._raf = null;
        const animateParam = this._animateParam;
        const nextState = this._getNextState(state);
        const isCanceled = !this.eventManager.triggerChange(
          nextState.pos,
          state.pos
        );

        state = nextState;

        if (nextState.finished) {
          animateParam.destPos = this._getFinalPos(
            animateParam.destPos,
            originalIntendedPos
          );
          if (
            !equal(
              animateParam.destPos,
              this.axisManager.get(Object.keys(animateParam.destPos))
            )
          ) {
            this.eventManager.triggerChange(
              animateParam.destPos,
              nextState.pos
            );
          }
          complete();
          return;
        } else if (isCanceled) {
          this.finish(false);
        } else {
          this._raf = requestAnimationFrame(loop);
        }
      };
      loop();
    } else {
      this.eventManager.triggerChange(param.destPos);
      complete();
    }
  }

  /**
   * Get estimated final value.
   *
   * If destPos is within the 'error range' of the original intended position, the initial intended position is returned.
   *   - eg. original intended pos: 100, destPos: 100.0000000004 ==> return 100;
   * If dest Pos is outside the 'range of error' compared to the originally intended pos, it is returned rounded based on the originally intended pos.
   *   - eg. original intended pos: 100.123 destPos: 50.12345 => return 50.123
   * @param originalIntendedPos
   * @param destPos
   */
  private _getFinalPos(
    destPos: ObjectInterface<number>,
    originalIntendedPos: ObjectInterface<number>
  ): Axis {
    // compare destPos and originalIntendedPos
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const ERROR_LIMIT = 0.000001;
    const finalPos = map(destPos, (value, key) => {
      if (
        value >= originalIntendedPos[key] - ERROR_LIMIT &&
        value <= originalIntendedPos[key] + ERROR_LIMIT
      ) {
        // In error range, return original intended
        return originalIntendedPos[key];
      } else {
        // Out of error range, return rounded pos.
        const roundUnit = this._getRoundUnit(value, key);
        const result = roundNumber(value, roundUnit);
        return result;
      }
    });
    return finalPos;
  }

  private _getRoundUnit(val: number, key: string): number {
    const roundUnit = this._options.round; // manual mode
    let minRoundUnit = null; // auto mode

    // auto mode
    if (!roundUnit) {
      // Get minimum round unit
      const options = this.axisManager.getAxisOptions(key);
      minRoundUnit = inversePow(
        Math.max(
          getDecimalPlace(options.range[0]),
          getDecimalPlace(options.range[1]),
          getDecimalPlace(val)
        )
      );
    }

    return minRoundUnit || roundUnit;
  }
}
