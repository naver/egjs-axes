import Component from "@egjs/component";
import { AnimationManager } from "./AnimationManager";
import { EventManager } from "./EventManager";
import { InterruptManager } from "./InterruptManager";
import { AxisManager, AxisOption, Axis } from "./AxisManager";
import { InputObserver } from "./InputObserver";
import { IInputType } from "./inputType/InputType";
export interface AxesOption {
    easing?: (x: number) => number;
    maximumDuration?: number;
    minimumDuration?: number;
    deceleration?: number;
    interruptable?: boolean;
}
export default class Axes extends Component {
    axis: {
        [key: string]: AxisOption;
    };
    static VERSION: string;
    static PanInput: any;
    static PinchInput: any;
    static WheelInput: any;
    static MoveKeyInput: any;
    static TRANSFORM: string;
    static DIRECTION_NONE: any;
    static DIRECTION_LEFT: any;
    static DIRECTION_RIGHT: any;
    static DIRECTION_UP: any;
    static DIRECTION_DOWN: any;
    static DIRECTION_HORIZONTAL: any;
    static DIRECTION_VERTICAL: any;
    static DIRECTION_ALL: any;
    options: AxesOption;
    em: EventManager;
    axm: AxisManager;
    itm: InterruptManager;
    am: AnimationManager;
    io: InputObserver;
    private _inputs;
    constructor(axis: {
        [key: string]: AxisOption;
    }, options: AxesOption, startPos?: Axis);
    connect(axes: string[] | string, inputType: IInputType): this;
    disconnect(inputType?: IInputType): this;
    get(axes?: string[]): Axis;
    setTo(pos: Axis, duration?: number): this;
    setBy(pos: Axis, duration?: number): this;
    isBounceArea(axes?: string[]): boolean;
    destroy(): void;
}
