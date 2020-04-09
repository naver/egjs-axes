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
    protected observer: IInputTypeObserver;
    protected _direction: any;
    private panRecognizer;
    private isRightEdge;
    private rightEdgeTimer;
    private panFlag;
    constructor(el: string | HTMLElement, options?: PanInputOption);
    mapAxes(axes: string[]): void;
    connect(observer: IInputTypeObserver): IInputType;
    disconnect(): this;
    destroy(): void;
    enable(): this;
    disable(): this;
    isEnable(): boolean;
    private removeRecognizer;
    protected onHammerInput(event: any): void;
    protected onPanmove(event: any): void;
    protected onPanend(event: any): void;
    private attachEvent;
    private dettachEvent;
    private getOffset;
}
