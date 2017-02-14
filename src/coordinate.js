import {DIRECTION} from "./consts";

const Coordinate = {
	// get user's direction
	getDirectionByAngle(angle, thresholdAngle) {
		if (thresholdAngle < 0 || thresholdAngle > 90) {
			return DIRECTION.DIRECTION_NONE;
		}
		const toAngle = Math.abs(angle);

		return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ?
				DIRECTION.DIRECTION_VERTICAL : DIRECTION.DIRECTION_HORIZONTAL;
	},
	isHorizontal(direction, userDirection) {
		return direction === DIRECTION.DIRECTION_ALL ||
			(direction & DIRECTION.DIRECTION_HORIZONTAL &&
			userDirection & DIRECTION.DIRECTION_HORIZONTAL);
	},
	isVertical(direction, userDirection) {
		return direction === DIRECTION.DIRECTION_ALL ||
			(direction & DIRECTION.DIRECTION_VERTICAL &&
			userDirection & DIRECTION.DIRECTION_VERTICAL);
	},
	getPointOfIntersection(depaPos, destPos, min, max, circular, bounce) {
		const boxLT = [min[0] - bounce[3], min[1] - bounce[0]];
		const boxRB = [max[0] + bounce[1], max[1] + bounce[2]];
		const toDestPos = destPos.concat();

		const xd = destPos[0] - depaPos[0];
		const yd = destPos[1] - depaPos[1];

		if (!circular[3]) {
			toDestPos[0] = Math.max(boxLT[0], toDestPos[0]);
		} // left
		if (!circular[1]) {
			toDestPos[0] = Math.min(boxRB[0], toDestPos[0]);
		} // right
		toDestPos[1] = xd ? depaPos[1] + yd / xd * (toDestPos[0] - depaPos[0]) :
						toDestPos[1];

		if (!circular[0]) {
			toDestPos[1] = Math.max(boxLT[1], toDestPos[1]);
		} // up
		if (!circular[2]) {
			toDestPos[1] = Math.min(boxRB[1], toDestPos[1]);
		} // down
		toDestPos[0] = yd ? depaPos[0] + xd / yd * (toDestPos[1] - depaPos[1]) :
						toDestPos[0];
		return [
			Math.min(max[0], Math.max(min[0], toDestPos[0])),
			Math.min(max[1], Math.max(min[1], toDestPos[1]))
		];
	},
	// determine outside
	isOutside(pos, min, max) {
		return pos[0] < min[0] || pos[1] < min[1] ||
			pos[0] > max[0] || pos[1] > max[1];
	},
	// from outside to outside
	isOutToOut(pos, destPos, min, max) {
		return (pos[0] < min[0] || pos[0] > max[0] ||
			pos[1] < min[1] || pos[1] > max[1]) &&
			(destPos[0] < min[0] || destPos[0] > max[0] ||
			destPos[1] < min[1] || destPos[1] > max[1]);
	},
	getNextOffsetPos(speeds, deceleration) {
		const normalSpeed = Math.sqrt(
			speeds[0] * speeds[0] + speeds[1] * speeds[1]
		);
		const duration = Math.abs(normalSpeed / -deceleration);

		return [
			speeds[0] / 2 * duration,
			speeds[1] / 2 * duration
		];
	},
	getDurationFromPos(pos, deceleration) {
		const normalPos = Math.sqrt(pos[0] * pos[0] + pos[1] * pos[1]);
		const duration = Math.sqrt(
			normalPos / deceleration * 2
		);

		// when duration is under 100, then value is zero
		return duration < 100 ? 0 : duration;
	},
	isCircular(destPos, min, max, circular) {
		return (circular[0] && destPos[1] < min[1]) ||
				(circular[1] && destPos[0] > max[0]) ||
				(circular[2] && destPos[1] > max[1]) ||
				(circular[3] && destPos[0] < min[0]);
	},
	getCircularPos(pos, min, max, circular) {
		const toPos = pos.concat();

		if (circular[0] && toPos[1] < min[1]) { // up
			toPos[1] = (toPos[1] - min[1]) % (max[1] - min[1] + 1) + max[1];
		}
		if (circular[1] && toPos[0] > max[0]) { // right
			toPos[0] = (toPos[0] - min[0]) % (max[0] - min[0] + 1) + min[0];
		}
		if (circular[2] && toPos[1] > max[1]) { // down
			toPos[1] = (toPos[1] - min[1]) % (max[1] - min[1] + 1) + min[1];
		}
		if (circular[3] && toPos[0] < min[0]) { // left
			toPos[0] = (toPos[0] - min[0]) % (max[0] - min[0] + 1) + max[0];
		}
		toPos[0] = +pos[0].toFixed(5);
		toPos[1] = +pos[1].toFixed(5);
		return toPos;
	}
};

export default Coordinate;
