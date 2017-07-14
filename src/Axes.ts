import * as Component from "@egjs/component";
import {AxesOption} from "./AxesOption";
import {AnimationManager} from "./AnimationManager";
import {EventManager} from "./EventManager";
import {InterruptManager} from "./InterruptManager";
import {AxisManager, Axis} from "./AxisManager";
import {InputObserver} from "./InputObserver";
import {HammerInput} from "./inputType/HammerInput";
import {TRANSFORM} from "./const";
import {InputType} from "./inputType/InputType";
import Coordinate from "./Coordinate";

/**
 * Copyright (c) NAVER Corp.
 * egjs-axes projects are licensed under the MIT license
 */
/**
 * A module used to change the information of user action entered by various input devices such as touch screen or mouse into logical coordinates within the virtual coordinate system. The coordinate information sorted by time events occurred is provided if animations are made by user actions.
 * @alias eg.Axes
 * @extends eg.Component
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 */
class Axes extends Component {
	static HammerInput = HammerInput;
	static TRANSFORM = TRANSFORM;

	options: AxesOption;
	private _em: EventManager;
	private _axm: AxisManager;
	private _itm: InterruptManager;
	private _am: AnimationManager;
	private _io: InputObserver;

	constructor(options: AxesOption) {
		super();
		this.options = { ...{
			easing: function easeOutCubic(x) {
				return 1 - Math.pow(1 - x, 3);
			},
			interruptable: true,
			maximumDuration: Infinity,
			deceleration: 0.0006,
			axis: {},
		}, ...options};

		this._complementOptions();
		this._em = new EventManager(this);
		this._axm = new AxisManager(this.options);
		this._itm = new InterruptManager(this.options);
		this._am = new AnimationManager(this.options, this._itm, this._em, this._axm);
		this._io = new InputObserver(this.options, this._itm, this._em, this._axm, this._am);
	}

	/**
	 * set up 'css' expression
	 * @private
	 */
	private _complementOptions() {
		Object.keys(this.options.axis).forEach(axis => {
			this.options.axis[axis] = { ...{
				range: [0, 100],
				bounce: [0, 0],
				margin: [0, 0],
				circular: [false, false]
			}, ...this.options.axis[axis]};

			["bounce", "margin", "circular"].forEach(v => {
				const axisOption = this.options.axis;
				const key = axisOption[axis][v];

				if (/string|number|boolean/.test(typeof key)) {
					axisOption[axis][v] = [key, key];
				}
			});
		});
	}

	mapInput(axes: string[] | string, inputType: InputType) {
		let mapped;
		if (typeof axes === "string") {
			mapped = [axes];
		} else {
			mapped = axes.concat();
		}
		inputType.mapAxes(mapped);
		inputType.connect(this._io);
		return this;
	}

	get(axes?: string[]) {
		return this._axm.get(axes);
	}

	setTo(pos: Axis, duration = 0) {
		this._am.setTo(pos, duration);
		return this;
	}

	isOutside(pos?: string[]) {
		return !this._axm.every(this._axm.get(pos), (v, k, opt) => !Coordinate.isOutside(v, opt.range));
	}

	destroy() {
		this._em.destroy();
	}
}

export default Axes;
