import { DIRECTION } from "./consts";

let Direction = {
	// get user's direction
	getByAngle(angle, thresholdAngle) {
		if (thresholdAngle < 0 || thresholdAngle > 90) {
			return DIRECTION.DIRECTION_NONE;
		}
		angle = Math.abs(angle);
		return angle > thresholdAngle && angle < 180 - thresholdAngle ?
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
	}
};

export default Direction;