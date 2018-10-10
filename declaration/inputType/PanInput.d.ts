import { IInputType, IInputTypeObserver } from "./InputType";
import { ObjectInterface } from "../const";
export interface PanInputOption {
    inputType?: string[];
    scale?: number[];
    thresholdAngle?: number;
    threshold?: number;
    hammerManagerOptions?: ObjectInterface;
}
export declare class PanInput implements IInputType {
    options: PanInputOption;
    axes: string[];
    hammer: any;
    element: HTMLElement;
    private observer;
    private _direction;
    private panRecognizer;
    constructor(el: string | HTMLElement, options?: PanInputOption);
    mapAxes(axes: string[]): void;
    connect(observer: IInputTypeObserver): IInputType;
    disconnect(): this;
    destroy(): void;
    enable(): this;
    disable(): this;
    isEnable(): boolean;
    private removeRecognizer;
    private onHammerInput;
    private onPanmove;
    private onPanend;
    private attachEvent;
    private dettachEvent;
    private getOffset;
}
