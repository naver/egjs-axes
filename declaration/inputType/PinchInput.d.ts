import { IInputType, IInputTypeObserver } from "./InputType";
export interface PinchInputOption {
    scale?: number;
    threshold?: number;
    inputType?: string[];
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
    private pinchRecognizer;
    constructor(el: any, options?: PinchInputOption);
    mapAxes(axes: string[]): void;
    connect(observer: IInputTypeObserver): IInputType;
    disconnect(): this;
    destroy(): void;
    private removeRecognizer;
    private onPinchStart;
    private onPinchMove;
    private onPinchEnd;
    private getOffset;
    private attachEvent;
    private dettachEvent;
    enable(): this;
    disable(): this;
    isEnable(): boolean;
}
