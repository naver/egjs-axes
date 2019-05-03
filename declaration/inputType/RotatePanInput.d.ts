import { PanInput, PanInputOption } from "./PanInput";
export declare class RotatePanInput extends PanInput {
    private rotateOrigin;
    private prevAngle;
    private prevQuadrant;
    private lastDiff;
    private coefficientForDistanceToAngle;
    constructor(el: string | HTMLElement, options?: PanInputOption);
    mapAxes(axes: string[]): void;
    onHammerInput(event: any): void;
    onPanstart(event: any): void;
    onPanmove(event: any): void;
    onPanend(event: any): void;
    private triggerChange;
    private triggerAnimation;
    private getDifference;
    private getPosFromOrigin;
    private getAngle;
    private getQuadrant;
}
