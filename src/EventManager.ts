import { IInputType } from "./inputType/InputType";
import { Axis } from "./AxisManager";
import { AnimationParam, AnimationManager } from "./AnimationManager";

export interface ChangeEventOption {
	input: IInputType,
	event,
}

export class EventManager {
	public am: AnimationManager;
	constructor(private axes) {}
	/**
	 * This event is fired when a user holds an element on the screen of the device.
	 * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
	 * @name eg.Axes#hold
	 * @event
	 * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
	 * @property {Object.<string, number>} pos coordinate <ko>좌표 정보</ko>
	 * @property {Object} input The instance of inputType where the event occurred<ko>이벤트가 발생한 inputType 인스턴스</ko>
	 * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
	 * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
	 *
	 * @example
	 * const axes = new eg.Axes({
	 *   "x": {
	 *      range: [0, 100]
	 *   },
	 *   "zoom": {
	 *      range: [50, 30]
	 *   }
	 * }).on("hold", function(event) {
	 *   // event.pos
	 *   // event.input
	 *   // event.inputEvent
	 *   // isTrusted
	 * });
	 */
	triggerHold(pos: Axis, option: ChangeEventOption) {
		this.axes.trigger("hold", {
			pos,
			input: option.input || null,
			inputEvent: option.event || null,
			isTrusted: true,
		});
	}

	/** Specifies the coordinates to move after the 'change' event. It works when the holding value of the change event is true.
	 * @ko 'change' 이벤트 이후 이동할 좌표를 지정한다. change이벤트의 holding 값이 true일 경우에 동작한다
	 * @name set
   * @function
	 * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
	 * @example
	 * const axes = new eg.Axes({
	 *   "x": {
	 *      range: [0, 100]
	 *   },
	 *   "zoom": {
	 *      range: [50, 30]
	 *   }
	 * }).on("change", function(event) {
	 *   event.holding && event.set({x: 10});
	 * });
	 */
	/** Specifies the animation coordinates to move after the 'release' or 'animationStart' events.
	 * @ko 'release' 또는 'animationStart' 이벤트 이후 이동할 좌표를 지정한다.
	 * @name setTo
   * @function
	 * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
	 * @param {Number} [duration] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
	 * @example
	 * const axes = new eg.Axes({
	 *   "x": {
	 *      range: [0, 100]
	 *   },
	 *   "zoom": {
	 *      range: [50, 30]
	 *   }
	 * }).on("animationStart", function(event) {
	 *   event.setTo({x: 10}, 2000);
	 * });
	 */
	/**
	 * This event is fired when a user release an element on the screen of the device.
	 * @ko 사용자가 기기의 화면에서 손을 뗐을 때 발생하는 이벤트
	 * @name eg.Axes#release
	 * @event
	 * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
	 * @property {Object.<string, number>} depaPos The coordinates when releasing an element<ko>손을 뗐을 때의 좌표 </ko>
	 * @property {Object.<string, number>} destPos The coordinates to move to after releasing an element<ko>손을 뗀 뒤에 이동할 좌표</ko>
	 * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
	 * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
	 * @property {Object} input The instance of inputType where the event occurred<ko>이벤트가 발생한 inputType 인스턴스</ko>
	 * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
	 * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
	 *
	 * @example
	 * const axes = new eg.Axes({
	 *   "x": {
	 *      range: [0, 100]
	 *   },
	 *   "zoom": {
	 *      range: [50, 30]
	 *   }
	 * }).on("release", function(event) {
	 *   // event.depaPos
	 *   // event.destPos
	 *   // event.delta
	 *   // event.input
	 *   // event.inputEvent
	 *   // event.setTo
	 *   // event.isTrusted
	 *
	 *   // if you want to change the animation coordinates to move after the 'release' event.
	 *   event.setTo({x: 10}, 2000);
	 * });
	 */
	triggerRelease(param: AnimationParam) {
		param.setTo = this.createUserControll(param.destPos, param.duration);
		this.axes.trigger("release", param);
	}

	/**
	 * This event is fired when coordinate changes.
	 * @ko 좌표가 변경됐을 때 발생하는 이벤트
	 * @name eg.Axes#change
	 * @event
	 * @type {object} The object of data to be sent when the event is fired <ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
	 * @property {Object.<string, number>} pos  The coordinate <ko>좌표</ko>
	 * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
	 * @property {Boolean} holding Indicates whether a user holds an element on the screen of the device.<ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
	 * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>이벤트가 발생한 inputType 인스턴스. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
	 * @property {Object} inputEvent The event object received from inputType. If the value is changed by animation, it returns 'null'.<ko>inputType으로 부터 받은 이벤트 객체. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
	 * @property {set} set Specifies the coordinates to move after the event. It works when the holding value is true <ko>이벤트 이후 이동할 좌표를 지정한다. holding 값이 true일 경우에 동작한다.</ko>
	 * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
	 *
	 * @example
	 * const axes = new eg.Axes({
	 *   "x": {
	 *      range: [0, 100]
	 *   },
	 *   "zoom": {
	 *      range: [50, 30]
	 *   }
	 * }).on("change", function(event) {
	 *   // event.pos
	 *   // event.delta
	 *   // event.input
	 *   // event.inputEvent
	 *   // event.holding
	 *   // event.set
	 *   // event.isTrusted
	 *
	 *   // if you want to change the coordinates to move after the 'change' event.
	 *   // it works when the holding value of the change event is true.
	 *   event.holding && event.set({x: 10});
	 * });
	 */
	triggerChange(pos: Axis, option: ChangeEventOption = null, holding: boolean = false) {
		const eventInfo = this.am.getEventInfo();
		const moveTo = this.am.axm.moveTo(pos);
		const inputEvent = option && option.event || eventInfo && eventInfo.event || null;
		const param = {
			pos: moveTo.pos,
			delta: moveTo.delta,
			holding: holding,
			inputEvent,
			isTrusted: !!inputEvent,
			input: option && option.input || eventInfo && eventInfo.input || null,
			set: event ? this.createUserControll(moveTo.pos) : () => { },
		};
		this.axes.trigger("change", param);

		event && this.am.axm.set(param.set()["destPos"]);
	}

	/**
	 * This event is fired when animation starts.
	 * @ko 에니메이션이 시작할 때 발생한다.
	 * @name eg.Axes#animationStart
	 * @event
	 * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
	 * @property {Object.<string, number>} depaPos The coordinates when animation starts<ko>애니메이션이 시작 되었을 때의 좌표 </ko>
	 * @property {Object.<string, number>} destPos The coordinates to move to. If you change this value, you can run the animation<ko>이동할 좌표. 이값을 변경하여 애니메이션을 동작시킬수 있다</ko>
	 * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
	 * @property {Number} duration Duration of the animation (unit: ms). If you change this value, you can control the animation duration time.<ko>애니메이션 진행 시간(단위: ms). 이값을 변경하여 애니메이션의 이동시간을 조절할 수 있다.</ko>
	 * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>이벤트가 발생한 inputType 인스턴스. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
	 * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
	 * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
	 * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
	 *
	 * @example
	 * const axes = new eg.Axes({
	 *   "x": {
	 *      range: [0, 100]
	 *   },
	 *   "zoom": {
	 *      range: [50, 30]
	 *   }
	 * }).on("release", function(event) {
	 *   // event.depaPos
	 *   // event.destPos
	 *   // event.delta
	 *   // event.input
	 *   // event.inputEvent
	 *   // event.setTo
	 *   // event.isTrusted
	 *
	 *   // if you want to change the animation coordinates to move after the 'animationStart' event.
	 *   event.setTo({x: 10}, 2000);
	 * });
	 */
	triggerAnimationStart(param: AnimationParam): Boolean {
		param.setTo = this.createUserControll(param.destPos, param.duration);
		return this.axes.trigger("animationStart", param);
	}

	/**
	 * This event is fired when animation ends.
	 * @ko 에니메이션이 끝났을 때 발생한다.
	 * @name eg.Axes#animationEnd
	 * @event
	 * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
	 * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
	 *
	 * @example
	 * const axes = new eg.Axes({
	 *   "x": {
	 *      range: [0, 100]
	 *   },
	 *   "zoom": {
	 *      range: [50, 30]
	 *   }
	 * }).on("animationEnd", function(event) {
	 *   // event.isTrusted
	 * });
	 */
	triggerAnimationEnd(isTrusted: boolean = false) {
		this.axes.trigger("animationEnd", {
			isTrusted,
		});
	}

	private createUserControll(pos: Axis, duration: number = 0) {
		// to controll
		const userControl = {
			destPos: { ...pos },
			duration: duration
		};
		return function (toPos?: Axis, userDuration?: number): { destPos: Axis, duration: number } {
			toPos && (userControl.destPos = { ...toPos });
			(userDuration !== undefined) && (userControl.duration = userDuration);
			return userControl;
		};
	}

	setAnimationManager(am: AnimationManager) {
		this.am = am;
	}

	destroy() {
		this.axes.off();
	}
};
