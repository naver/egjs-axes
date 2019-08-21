import { ObjectInterface } from "./const";
export interface Axis {
    [key: string]: number;
}
export interface AxisOption {
    range?: number[];
    bounce?: number | number[];
    circular?: boolean | boolean[];
}
export declare class AxisManager {
    private axis;
    private options;
    private _pos;
    constructor(axis: ObjectInterface<AxisOption>, options: any);
    private _complementOptions;
    getDelta(depaPos: Axis, destPos: Axis): Axis;
    get(axes?: string[] | Axis): Axis;
    moveTo(pos: Axis, depaPos?: Axis): {
        [key: string]: Axis;
    };
    set(pos: Axis): void;
    every(pos: Axis, callback: (value: number, options: AxisOption, key: string) => boolean): boolean;
    filter(pos: Axis, callback: (value: number, options: AxisOption, key: string) => boolean): Axis;
    map<U>(pos: Axis, callback: (value: number, options: AxisOption, key: string) => U): ObjectInterface<U>;
    isOutside(axes?: string[]): boolean;
    getAxisOptions(key: string): AxisOption;
}
