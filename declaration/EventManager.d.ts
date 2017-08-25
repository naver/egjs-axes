import { IInputType } from "./inputType/InputType";
import { Axis } from "./AxisManager";
import { AnimationParam } from "./AnimationManager";
export declare class EventManager {
    private axes;
    private axm;
    constructor(axes: any, axm: any);
    triggerHold(pos: Axis, input: IInputType, event: any): void;
    triggerRelease(param: AnimationParam): void;
    triggerChange(pos: Axis, input?: IInputType, event?: any): void;
    triggerAnimationStart(param: AnimationParam): Boolean;
    triggerAnimationEnd(): void;
    private createUserControll(pos, duration?);
    destroy(): void;
}
