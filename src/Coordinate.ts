import {Axis} from "./AxisManager";

const Coordinate = {
  getInsidePosition(
		destPos: number,
		range: number[],
		circular: boolean[]
		): number {
    let toDestPos = destPos;

    if (!circular[0]) {
      toDestPos = Math.max(range[0], toDestPos);
    }
    if (!circular[1]) {
      toDestPos = Math.min(range[1], toDestPos);
    }
		return Math.min(range[1], Math.max(range[0], toDestPos));
  },


	// determine outside
	isOutside(pos: number, range: number[]): boolean {
		return pos < range[0] || pos > range[1];
	},

	getDuration(distance: number, deceleration): number {
		const duration = Math.sqrt(distance / deceleration * 2);

		// when duration is under 100, then value is zero
		return duration < 100 ? 0 : duration;
	},
	isCircularable(destPos: number, range: number[], circular: boolean[]): boolean {
		return (circular[1] && destPos > range[1]) ||
				(circular[0] && destPos < range[0]);
	},
	getCirculatedPos(pos: number, range: number[], circular: boolean[]): number {
    let toPos = pos;
    const min = range[0];
    const max = range[1];
		const length = max - min;

		if (circular[1] && pos > max) { // right
			toPos = (toPos - max) % length + min;
		}
		if (circular[0] && pos < min) { // left
			toPos = (toPos - min) % length + max;
		}
		return +toPos.toFixed(5);
	},
};

export default Coordinate;
