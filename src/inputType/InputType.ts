import { AxesOption } from "../AxesOption";
import { Axis } from "../AxisManager";

export abstract class InputType {
	axes: string[];
	abstract subscribe(observer);
	abstract unsubscribe();
	mapAxes(axes: string[]) {
		this.axes = axes;
	}
}

export interface IInputTypeObserver {
	options: AxesOption;
	hold(inputType: InputType, event);
	change(inputType: InputType, event, offset: Axis);
	release(inputType: InputType, event, offset: Axis, duration?: number);
}
