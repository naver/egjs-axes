import Axes from "./Axes";
import { PanInput } from "./inputType/PanInput";
import { RotatePanInput } from "./inputType/RotatePanInput";
import { PinchInput } from "./inputType/PinchInput";
import { WheelInput } from "./inputType/WheelInput";
import { MoveKeyInput } from "./inputType/MoveKeyInput";

Axes.PanInput = PanInput;
Axes.RotatePanInput = RotatePanInput;
Axes.PinchInput = PinchInput;
Axes.WheelInput = WheelInput;
Axes.MoveKeyInput = MoveKeyInput;

export default Axes;
