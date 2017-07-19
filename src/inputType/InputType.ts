import { AxesOption } from "../AxesOption";
import { Axis } from "../AxisManager";

export abstract class InputType {
	axes: string[];
	abstract connect(observer: IInputTypeObserver): InputType;
	abstract disconnect();
	abstract enable?();
	abstract disable?();
	abstract isEnable?(): boolean;
	mapAxes(axes: string[]) {
		this.axes = axes;
	}
}

export interface IInputTypeObserver {
	options: AxesOption;
	change(inputType: InputType, event, offset: Axis);
	hold(inputType: InputType, event);
	release(inputType: InputType, event, offset: Axis, duration?: number);
}
