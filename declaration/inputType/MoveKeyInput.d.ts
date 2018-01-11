import { IInputType, IInputTypeObserver } from "./InputType";
export declare const KEYMAP: {
    LEFT_ARROW: number;
    A: number;
    UP_ARROW: number;
    W: number;
    RIGHT_ARROW: number;
    D: number;
    DOWN_ARROW: number;
    S: number;
};
export interface MoveKeyInputOption {
    scale?: Array<Number>;
}
export declare class MoveKeyInput implements IInputType {
    options: MoveKeyInputOption;
    axes: string[];
    element: HTMLElement;
    private _isEnabled;
    private _isHolded;
    private _timer;
    private _offsets;
    private observer;
    constructor(el: any, options?: MoveKeyInputOption);
    mapAxes(axes: string[]): void;
    connect(observer: IInputTypeObserver): IInputType;
    disconnect(): this;
    destroy(): void;
    private onKeydown(event);
    private onKeyup(e);
    private attachEvent(observer);
    private dettachEvent();
    enable(): this;
    disable(): this;
    isEnable(): boolean;
}
