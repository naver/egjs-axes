import { Axis } from "./AxisManager";
import { AnimationParam } from "./AnimationManager";

export class EventManager {
  constructor(private axes) {
	}
	/**
	 * This event is fired when a user holds an element on the screen of the device.
	 * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
	 * @name eg.Axes#hold
	 * @event
	 * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
	 * @param {Object.<string, number>} param.pos coordinate <ko>좌표 정보</ko>
	 * @param {Object} param.inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
	 *
	 */
	triggerHold(pos: Axis, event) {
		this.axes.trigger("hold", {
			pos,
			inputEvent: event,
		});
	}

	/** Specifies the coordinates to move after the 'change' event. It works when the holding value of the change event is true.
	 * @ko 'change' 이벤트 이후 이동할 좌표를 지정한다. change이벤트의 holding 값이 true일 경우에 동작한다
	 * @name set
   * @function
	 * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
	 * @example
	 * const axes = new eg.Axes({
	 *   axis: {
	 *     "x": {
	 *        range: [0, 100]
	 *     },
	 * 		 "zoom": {
	 *        range: [50, 30]
	 *     }
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
	 *   axis: {
	 *     "x": {
	 *        range: [0, 100]
	 *     },
	 * 		 "zoom": {
	 *        range: [50, 30]
	 *     }
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
	 *
	 * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
	 * @param {Object.<string, number>} param.depaPos The coordinates when releasing an element<ko>손을 뗐을 때의 좌표 </ko>
	 * @param {Object.<string, number>} param.destPos The coordinates to move to after releasing an element<ko>손을 뗀 뒤에 이동할 좌표</ko>
	 * @param {Object.<string, number>} param.deta  The movement variation of coordinate <ko>좌표의 변화량</ko>
	 * @param {Object} param.inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
	 * @param {setTo} param.setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
	 *
	 */
	triggerRelease(param: AnimationParam, event = null) {
		param.setTo = this.createUserControll(param.destPos, param.duration);
		this.axes.trigger("release", param);
	}

	/**
	 * This event is fired when coordinate changes.
	 * @ko 좌표가 변경됐을 때 발생하는 이벤트
	 * @name eg.Axes#change
	 * @event
	 *
	 * @param {Object} param The object of data to be sent when the event is fired <ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
	 * @param {Object.<string, number>} param.pos  The coordinate <ko>좌표</ko>
	 * @param {Object.<string, number>} param.deta  The movement variation of coordinate <ko>좌표의 변화량</ko>
	 * @param {Boolean} param.holding Indicates whether a user holds an element on the screen of the device.<ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
	 * @param {Object} param.inputEvent The event object received from inputType. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>inputType으로 부터 받은 이벤트 객체. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다.</ko>
	 * @param {set} param.set Specifies the coordinates to move after the event. It works when the holding value is true <ko>이벤트 이후 이동할 좌표를 지정한다. holding 값이 true일 경우에 동작한다.</ko>
	 *
	 */
	triggerChange(moveTo: { [key: string]: Axis }, event = null) {
		const param = {
			pos: moveTo.pos,
			delta: moveTo.delta,
			holding: event !== null,
			inputEvent: event,
			set: event ? this.createUserControll(moveTo.pos) : () => {},
		};
		this.axes.trigger("change", param);

		// @todo refactoring
		event && this.axes._axm.set(param.set()["destPos"]);
	}

	/**
	 * This event is fired when animation starts.
	 * @ko 에니메이션이 시작할 때 발생한다.
	 * @name eg.Axes#animationStart
	 * @event
	 *
	 * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
	 * @param {Object.<string, number>} param.depaPos The coordinates when animation starts<ko>애니메이션이 시작 되었을 때의 좌표 </ko>
		* @param {Object.<string, number>} param.destPos The coordinates to move to. If you change this value, you can run the animation<ko>이동할 좌표. 이값을 변경하여 애니메이션을 동작시킬수 있다</ko>
		* @param {Object.<string, number>} param.deta  The movement variation of coordinate <ko>좌표의 변화량</ko>
		* @param {Number} duration Duration of the animation (unit: ms). If you change this value, you can control the animation duration time.<ko>애니메이션 진행 시간(단위: ms). 이값을 변경하여 애니메이션의 이동시간을 조절할 수 있다.</ko>
		* @param {Object} param.inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
	  * @param {setTo} param.setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
		*/
	triggerAnimationStart(param: AnimationParam): Boolean  {
		param.setTo = this.createUserControll(param.destPos, param.duration);
		return this.axes.trigger("animationStart", param);
	}

	/**
	 * This event is fired when animation ends.
	 * @ko 에니메이션이 끝났을 때 발생한다.
	 * @name eg.Axes#animationEnd
	 * @event
	 */
	triggerAnimationEnd() {
		this.axes.trigger("animationEnd");
	}

	private createUserControll(pos: Axis, duration: number = 0) {
		// to controll
		const userControl = {
			destPos: {...pos},
			duration : duration
		};
		return function(toPos?: Axis, userDuration?: number): { destPos: Axis, duration: number } {
			toPos && (userControl.destPos = { ...toPos });
			(userDuration !== undefined) && (userControl.duration = userDuration);
			return userControl;
		};
	}

	destroy() {
		this.axes.off();
	}
};
