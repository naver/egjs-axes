import { isOutside, getCirculatedPos } from "./Coordinate";
import { map, filter, every } from "./utils";
import { ObjectInterface } from "./types";

export interface Axis {
	[key: string]: number;
}

export interface AxisOption {
	range?: number[];
	bounce?: number | number[];
	circular?: boolean | boolean[];
}

export class AxisManager {
	private _pos: Axis;
	constructor(private axis: ObjectInterface<AxisOption>, private options) {
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
		return map(this.get(destPos), (v, k) => v - fullDepaPos[k]);
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
	moveTo(pos: Axis, depaPos: Axis = this._pos): { [key: string]: Axis } {
		const delta = map(this._pos, (v, key) => {
			return key in pos && key in depaPos ? pos[key] - depaPos[key] : 0;
		});

		this.set(this.map(pos, (v, opt) => opt ? getCirculatedPos(v, opt.range, opt.circular as boolean[]) : 0));
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
		callback: (value: number, options: AxisOption, key: string) => boolean): boolean {
		const axisOptions = this.axis;

		return every(pos, (value, key) => callback(value, axisOptions[key], key));
	}
	filter(
		pos: Axis,
		callback: (value: number, options: AxisOption, key: string) => boolean): Axis {

		const axisOptions = this.axis;

		return filter(pos, (value, key) => callback(value, axisOptions[key], key));
	}
	map<U>(
		pos: Axis,
		callback: (value: number, options: AxisOption, key: string) => U) {
		const axisOptions = this.axis;

		return map<number, U>(pos, (value, key) => callback(value, axisOptions[key], key));
	}
	isOutside(axes?: string[]) {
		return !this.every(
			axes ? this.get(axes) : this._pos,
			(v, opt) => !isOutside(v, opt.range),
		);
	}
	getAxisOptions(key: string) {
		return this.axis[key];
	}
}
