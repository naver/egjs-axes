import { IInputType, IInputTypeObserver } from "./InputType";
export interface PinchInputOption {
    scale?: number;
    threshold?: number;
    hammerManagerOptions?: Object;
}
export declare class PinchInput implements IInputType {
    options: PinchInputOption;
    axes: string[];
    hammer: any;
    element: HTMLElement;
    private observer;
    private _base;
    private _prev;
    constructor(el: any, options?: PinchInputOption);
    mapAxes(axes: string[]): void;
    connect(observer: IInputTypeObserver): IInputType;
    disconnect(): this;
    destroy(): void;
    private onPinchStart(event);
    private onPinchMove(event);
    private onPinchEnd(event);
    private getOffset(pinchScale, prev?);
    private attachEvent(observer);
    private dettachEvent();
    enable(): this;
    disable(): this;
    isEnable(): boolean;
}
