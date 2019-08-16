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
    round?: number;
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
    static RotatePanInput: any;
    static TRANSFORM: string;
    static DIRECTION_NONE: number;
    static DIRECTION_LEFT: number;
    static DIRECTION_RIGHT: number;
    static DIRECTION_UP: number;
    static DIRECTION_DOWN: number;
    static DIRECTION_HORIZONTAL: number;
    static DIRECTION_VERTICAL: number;
    static DIRECTION_ALL: number;
    options: AxesOption;
    em: EventManager;
    axm: AxisManager;
    itm: InterruptManager;
    am: AnimationManager;
    io: InputObserver;
    private _inputs;
    constructor(axis?: {
        [key: string]: AxisOption;
    }, options?: AxesOption, startPos?: Axis);
    connect(axes: string[] | string, inputType: IInputType): this;
    disconnect(inputType?: IInputType): this;
    get(axes?: string[]): Axis;
    setTo(pos: Axis, duration?: number): this;
    setBy(pos: Axis, duration?: number): this;
    isBounceArea(axes?: string[]): boolean;
    destroy(): void;
}
