import { IInputType, IInputTypeObserver } from "./InputType";
export declare const KEY_LEFT_ARROW = 37;
export declare const KEY_A = 65;
export declare const KEY_UP_ARROW = 38;
export declare const KEY_W = 87;
export declare const KEY_RIGHT_ARROW = 39;
export declare const KEY_D = 68;
export declare const KEY_DOWN_ARROW = 40;
export declare const KEY_S = 83;
export interface MoveKeyInputOption {
    scale?: number[];
}
export declare class MoveKeyInput implements IInputType {
    options: MoveKeyInputOption;
    axes: string[];
    element: HTMLElement;
    private _isEnabled;
    private _isHolded;
    private _timer;
    private observer;
    constructor(el: any, options?: MoveKeyInputOption);
    mapAxes(axes: string[]): void;
    connect(observer: IInputTypeObserver): IInputType;
    disconnect(): this;
    destroy(): void;
    private onKeydown;
    private onKeyup;
    private attachEvent;
    private dettachEvent;
    enable(): this;
    disable(): this;
    isEnable(): boolean;
}
