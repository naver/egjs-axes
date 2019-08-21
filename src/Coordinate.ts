export function getInsidePosition(
	destPos: number,
	range: number[],
	circular: boolean[],
	bounce?: number[],
): number {
	let toDestPos: number = destPos;
	const targetRange: number[] = [
		circular[0] ? range[0] : (bounce ? range[0] - bounce[0] : range[0]),
		circular[1] ? range[1] : (bounce ? range[1] + bounce[1] : range[1]),
	];

	toDestPos = Math.max(targetRange[0], toDestPos);
	toDestPos = Math.min(targetRange[1], toDestPos);

	return toDestPos;
}

// determine outside
export function isOutside(pos: number, range: number[]): boolean {
	return pos < range[0] || pos > range[1];
}

export function getDuration(distance: number, deceleration): number {
	const duration = Math.sqrt(distance / deceleration * 2);

	// when duration is under 100, then value is zero
	return duration < 100 ? 0 : duration;
}
export function isCircularable(destPos: number, range: number[], circular: boolean[]): boolean {
	return (circular[1] && destPos > range[1]) ||
		(circular[0] && destPos < range[0]);
}
export function getCirculatedPos(pos: number, range: number[], circular: boolean[]): number {
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
	return toPos;
}
