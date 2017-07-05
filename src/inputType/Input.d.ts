import { Axis } from "./../AxisManager";

export interface IInputType {
	axes: Array<string>;
	subscribe(observer);
	unsubscribe();
	mapAxes(axes: Array<string>);
	onHold?(): Axis;
	onChange?(): Axis;
}