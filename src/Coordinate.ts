import { Axis } from "./AxisManager";
import {DIRECTION} from "./const"

const Coordinate = {
	// get user's direction
	// getDirectionByAngle(angle, thresholdAngle) {
	// 	if (thresholdAngle < 0 || thresholdAngle > 90) {
	// 		return DIRECTION.DIRECTION_NONE;
	// 	}
	// 	const toAngle = Math.abs(angle);

	// 	return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ?
	// 			DIRECTION.DIRECTION_VERTICAL : DIRECTION.DIRECTION_HORIZONTAL;
	// },


	isHorizontal(direction: DIRECTION, userDirection: DIRECTION): boolean {
		return !!(direction === DIRECTION.DIRECTION_ALL ||
			(direction & DIRECTION.DIRECTION_HORIZONTAL &&
			userDirection & DIRECTION.DIRECTION_HORIZONTAL));
	},
	isVertical(direction: DIRECTION, userDirection: DIRECTION): boolean {
		return !!(direction === DIRECTION.DIRECTION_ALL ||
			(direction & DIRECTION.DIRECTION_VERTICAL &&
			userDirection & DIRECTION.DIRECTION_VERTICAL));
	},

  getInsidePosition(depaPos: number, destPos: number, range: Array<number>, bounce: Array<number>, circular: Array<boolean>): number {
    const bouncedRange = [range[0] - bounce[0], range[1] + bounce[1]];
    // const distance = destPos - depaPos;
    let toDestPos = destPos;

    if (!circular[0]) {
      toDestPos = Math.max(bouncedRange[0], toDestPos);
    }
    if (!circular[1]) {
      toDestPos = Math.min(bouncedRange[1], toDestPos);
    }
    return Math.min(range[1], Math.max(range[0], toDestPos));
  },


	// determine outside
	isOutside(pos: number, range: Array<number>): boolean {
		return pos < range[0] || pos > range[1];
	},


	// from outside to outside
	// isOutToOut(pos, destPos, min, max) {
	// 	return (pos[0] < min[0] || pos[0] > max[0] ||
	// 		pos[1] < min[1] || pos[1] > max[1]) &&
	// 		(destPos[0] < min[0] || destPos[0] > max[0] ||
	// 		destPos[1] < min[1] || destPos[1] > max[1]);
	// },
  // getNextOffsetPos(speeds, deceleration) {
	// 	const normalSpeed = Math.sqrt(
	// 		speeds[0] * speeds[0] + speeds[1] * speeds[1]
	// 	);
	// 	const duration = Math.abs(normalSpeed / -deceleration);

	// 	return [
	// 		speeds[0] / 2 * duration,
	// 		speeds[1] / 2 * duration,
	// 	];
	// },
	getDuration(pos: number, deceleration): number {
		return Math.sqrt(pos / deceleration * 2);
	},
	isCircular(destPos: number, range: Array<number>, circular: Array<boolean>): boolean {
		return (circular[1] && destPos > range[1]) ||
				(circular[0] && destPos < range[0]);
	},
	getCirculatedPos(pos: number, range: Array<number>, circular: Array<boolean>): number {
    let toPos = pos;
    const min = range[0];
    const max = range[1];
		const length = max - min;

		if (circular[1] && pos > max) { // right
			toPos = (pos - max) % length + min;
		}
		if (circular[0] && pos < min) { // left
			toPos = (pos - min) % length + max;
		}
		return +toPos.toFixed(5);
	},
};

export default Coordinate;
