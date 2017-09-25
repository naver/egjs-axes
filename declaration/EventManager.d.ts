import { IInputType } from "./inputType/InputType";
import { Axis } from "./AxisManager";
import { AnimationParam, AnimationManager } from "./AnimationManager";
export interface ChangeEventOption {
    input: IInputType;
    event: any;
}
export declare class EventManager {
    private axes;
    am: AnimationManager;
    constructor(axes: any);
    triggerHold(pos: Axis, option: ChangeEventOption): void;
    triggerRelease(param: AnimationParam): void;
    triggerChange(pos: Axis, option?: ChangeEventOption, holding?: boolean): void;
    triggerAnimationStart(param: AnimationParam): Boolean;
    triggerAnimationEnd(isTrusted?: boolean): void;
    private createUserControll(pos, duration?);
    setAnimationManager(am: AnimationManager): void;
    destroy(): void;
}
