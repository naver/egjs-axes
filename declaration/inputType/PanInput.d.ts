import { IInputType, IInputTypeObserver } from "./InputType";
import { ObjectInterface } from "../const";
export interface PanInputOption {
    inputType?: string[];
    scale?: number[];
    thresholdAngle?: number;
    threshold?: number;
    hammerManagerOptions?: ObjectInterface;
}
export declare function getDirectionByAngle(angle: number, thresholdAngle: number): number;
export declare function getNextOffset(speeds: number[], deceleration: number): number[];
export declare function useDirection(checkType: any, direction: any, userDirection?: any): boolean;
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
