import { isOutside } from "./Coordinate";
import { AxesOption } from "./Axes";

export interface Axis {
	[key: string]: number;
}

export function equal(target: Axis, base: Axis): boolean {
	for (const k in target) {
		if (target[k] !== base[k]) {
			return false;
		}
	}
	return true;
}

export interface AxisOption {
	range?: number[];
	bounce?: number | number[];
	circular?: boolean | boolean[];
}

export class AxisManager {
	private _pos: Axis;
	constructor(private axis, private options: AxesOption) {
		this._complementOptions();
		this._pos = Object.keys(this.axis).reduce((acc, v) => {
			acc[v] = this.axis[v].range[0];
			return acc;
		}, {});
	}
	/**
	   * set up 'css' expression
	   * @private
	   */
	private _complementOptions() {
		Object.keys(this.axis).forEach(axis => {
			this.axis[axis] = {
				...{
					range: [0, 100],
					bounce: [0, 0],
					circular: [false, false],
				}, ...this.axis[axis],
			};

			["bounce", "circular"].forEach(v => {
				const axisOption = this.axis;
				const key = axisOption[axis][v];

				if (/string|number|boolean/.test(typeof key)) {
					axisOption[axis][v] = [key, key];
				}
			});
		});
	}
	getDelta(depaPos: Axis, destPos: Axis): Axis {
		const fullDepaPos = this.get(depaPos);
		return this.map(this.get(destPos), (v, k) => v - fullDepaPos[k]);
	}
	get(axes?: string[] | Axis): Axis {
		if (axes && Array.isArray(axes)) {
			return axes.reduce((acc, v) => {
				if (v && (v in this._pos)) {
					acc[v] = this._pos[v];
				}
				return acc;
			}, {});
		} else {
			return { ...this._pos, ...((axes || {}) as Axis) };
		}
	}
	moveTo(pos: Axis): { [key: string]: Axis } {
		const delta = this.map(this._pos, (v, key) => {
			return pos[key] ? pos[key] - this._pos[key] : 0;
		});

		this.set(pos);
		return {
			pos: { ...this._pos },
			delta,
		};
	}
	set(pos: Axis) {
		for (const k in pos) {
			if (k && (k in this._pos)) {
				this._pos[k] = pos[k];
			}
		}
	}
	every(
		pos: Axis,
		callback: (value: number, key: string, options: AxisOption) => boolean): boolean {
		const axisOptions = this.axis;
		for (const k in pos) {
			if (k) {
				if (!callback(pos[k], k, axisOptions[k])) {
					return false;
				}
			}
		}
		return true;
	}
	filter(
		pos: Axis,
		callback: (value: number, key: string, options: AxisOption) => boolean): Axis {
		const filtered: Axis = {};
		const axisOptions = this.axis;
		for (const k in pos) {
			if (k) {
				callback(pos[k], k, axisOptions[k]) && (filtered[k] = pos[k]);
			}
		}
		return filtered;
	}
	map(
		pos: Axis,
		callback: (value: number, key: string, options: AxisOption) => number): Axis {
		const tranformed: Axis = {};
		const axisOptions = this.axis;
		for (const k in pos) {
			if (k) {
				tranformed[k] = callback(pos[k], k, axisOptions[k]);
			}
		}
		return tranformed;
	}
	isOutside(axes?: string[]) {
		return !this.every(
			axes ? this.get(axes) : this._pos,
			(v, k, opt) => !isOutside(v, opt.range),
		);
	}
}
