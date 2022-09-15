import { AxesOption } from "../Axes";
import { Axis } from "../AxisManager";
import { getCirculatedPos } from "../Coordinate";
import { AnimationParam, UpdateAnimationOption } from "../types";
import { map } from "../utils";

import { AnimationManager, AnimationState } from "./AnimationManager";

export class EasingManager extends AnimationManager {
  protected _useDuration = true;
  protected _options: AxesOption;
  private _durationOffset: number;
  private _initialEasingPer: number;
  private _prevEasingPer: number;

  public interpolate(displacement: number, threshold: number): number {
    const initSlope = this._easing(0.00001) / 0.00001;
    return this._easing(displacement / (threshold * initSlope)) * threshold;
  }

  public updateAnimation(options: UpdateAnimationOption): void {
    const animateParam = this._animateParam;
    if (!animateParam) {
      return;
    }

    const diffTime = new Date().getTime() - animateParam.startTime;
    const pos = options?.destPos || animateParam.destPos;
    const duration = options?.duration ?? animateParam.duration;
    if (options?.restart || duration <= diffTime) {
      this.setTo(pos, duration - diffTime);
      return;
    }
    if (options?.destPos) {
      const currentPos = this.axisManager.get();
      // When destination is changed, new delta should be calculated as remaining percent.
      // For example, moving x:0, y:0 to x:200, y:200 and it has current easing percent of 92%. coordinate is x:184 and y:184
      // If destination changes to x:300, y:300. xdelta:200, ydelta:200 changes to xdelta:116, ydelta:116 and use remaining easingPer as 100%, not 8% as previous.
      // Therefore, original easingPer by time is kept. And divided by (1 - self._initialEasingPer) which means new total easing percent. Like calculating 8% as 100%.
      this._initialEasingPer = this._prevEasingPer;
      animateParam.delta = this.axisManager.getDelta(currentPos, pos);
      animateParam.destPos = pos;
    }
    if (options?.duration) {
      const ratio = (diffTime + this._durationOffset) / animateParam.duration;
      // Use durationOffset for keeping animation ratio after duration is changed.
      // newRatio = (diffTime + newDurationOffset) / newDuration = oldRatio
      // newDurationOffset = oldRatio * newDuration - diffTime
      this._durationOffset = ratio * duration - diffTime;
      animateParam.duration = duration;
    }
  }

  protected _initState(info: AnimationParam): AnimationState {
    this._initialEasingPer = 0;
    this._prevEasingPer = 0;
    this._durationOffset = 0;
    return {
      pos: info.depaPos,
      easingPer: 0,
      finished: false,
    };
  }

  protected _getNextState(prevState: AnimationState): AnimationState {
    const animateParam = this._animateParam;
    const prevPos = prevState.pos;
    const destPos = animateParam.destPos;
    const directions = map(prevPos, (value, key) => {
      return value <= destPos[key] ? 1 : -1;
    });
    const diffTime = new Date().getTime() - animateParam.startTime;
    const ratio = (diffTime + this._durationOffset) / animateParam.duration;
    const easingPer = this._easing(ratio);

    const toPos: Axis = this.axisManager.map(prevPos, (pos, options, key) => {
      const nextPos =
        ratio >= 1
          ? destPos[key]
          : pos +
            (animateParam.delta[key] * (easingPer - this._prevEasingPer)) /
              (1 - this._initialEasingPer);

      // Subtract distance from distance already moved.
      // Recalculate the remaining distance.
      // Fix the bouncing phenomenon by changing the range.
      const circulatedPos = getCirculatedPos(
        nextPos,
        options.range,
        options.circular as boolean[]
      );
      if (nextPos !== circulatedPos) {
        // circular
        const rangeOffset =
          directions[key] * (options.range[1] - options.range[0]);

        destPos[key] -= rangeOffset;
        prevPos[key] -= rangeOffset;
      }
      return circulatedPos;
    });
    this._prevEasingPer = easingPer;
    return {
      pos: toPos,
      easingPer,
      finished: easingPer >= 1,
    };
  }

  private _easing(p: number): number {
    return p > 1 ? 1 : this._options.easing(p);
  }
}
