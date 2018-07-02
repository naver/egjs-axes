import { IInputType, IInputTypeObserver } from "./InputType";
export interface WheelInputOption {
    scale?: number;
    useNormalized?: boolean;
}
export declare class WheelInput implements IInputType {
    options: WheelInputOption;
    axes: string[];
    element: HTMLElement;
    private _isEnabled;
    private _isHolded;
    private _timer;
    private observer;
    constructor(el: any, options?: WheelInputOption);
    mapAxes(axes: string[]): void;
    connect(observer: IInputTypeObserver): IInputType;
    disconnect(): this;
    destroy(): void;
    private onWheel;
    private attachEvent;
    private dettachEvent;
    enable(): this;
    disable(): this;
    isEnable(): boolean;
}
