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
    triggerAnimationStart(param: AnimationParam): boolean;
    triggerAnimationEnd(isTrusted?: boolean): void;
    triggerFinish(isTrusted?: boolean): void;
    private createUserControll;
    setAnimationManager(am: AnimationManager): void;
    destroy(): void;
}
