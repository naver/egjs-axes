import { IInputType } from "./inputType/InputType";
import { Axis, AxisManager } from "./AxisManager";
import { InterruptManager } from "./InterruptManager";
import { EventManager, ChangeEventOption } from "./EventManager";
export interface AnimationParam {
    depaPos: Axis;
    destPos: Axis;
    duration: number;
    delta: Axis;
    isTrusted?: boolean;
    setTo?: (destPos?: Axis, duration?: number) => {
        destPos: Axis;
        duration: number;
    };
    done?: () => void;
    startTime?: number;
    inputEvent?: any;
    input?: IInputType;
}
export declare class AnimationManager {
    private _raf;
    private _animateParam;
    private options;
    itm: InterruptManager;
    em: EventManager;
    axm: AxisManager;
    static getDuration(duration: number, min: number, max: number): number;
    constructor({options, itm, em, axm}: {
        options: any;
        itm: any;
        em: any;
        axm: any;
    });
    getDuration(depaPos: Axis, destPos: Axis, wishDuration?: number): number;
    private createAnimationParam(pos, duration, option?);
    grab(axes: string[], option?: ChangeEventOption): void;
    getEventInfo(): ChangeEventOption;
    restore(option: ChangeEventOption): void;
    animationEnd(): void;
    private animateLoop(param, complete);
    getUserControll(param: AnimationParam): {
        destPos: Axis;
        duration: number;
    };
    animateTo(destPos: Axis, duration: number, option?: ChangeEventOption): void;
    private frame(param);
    easing(p: any): number;
    setTo(pos: Axis, duration?: number): this;
    setBy(pos: Axis, duration?: number): this;
}
