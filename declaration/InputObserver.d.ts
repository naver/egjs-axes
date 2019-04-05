import { IInputType, IInputTypeObserver } from "./inputType/InputType";
import { Axis } from "./AxisManager";
import { AxesOption } from "./Axes";
export declare class InputObserver implements IInputTypeObserver {
    options: AxesOption;
    private itm;
    private em;
    private axm;
    private am;
    private isOutside;
    private moveDistance;
    private isStopped;
    constructor({ options, itm, em, axm, am }: {
        options: any;
        itm: any;
        em: any;
        axm: any;
        am: any;
    });
    private atOutside;
    get(input: IInputType): Axis;
    hold(input: IInputType, event: any): void;
    change(input: IInputType, event: any, offset: Axis): void;
    release(input: IInputType, event: any, offset: Axis, inputDuration?: number): void;
}
