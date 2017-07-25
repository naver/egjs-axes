import { Axis } from "./AxisManager";

export class EventManager {
  constructor(private axes) {

  }
  trigger(name, option?) {
    return this.axes.trigger(name, option);
  }

	/**
	 * This event is fired when coordinate changes.
	 * @ko 좌표가 변경됐을 때 발생하는 이벤트
	 * @name eg.Axes#change
	 * @event
	 *
	 * @param {Object} param The object of data to be sent when the event is fired <ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
	 * @param {Object.<string, number>} param.pos  departure coordinate <ko>좌표</ko>
	 * @param {Boolean} param.holding Indicates whether a user holds an element on the screen of the device.<ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
	 * @param {Object} param.inputEvent The event object received from inputType. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>inputType으로 부터 받은 이벤트 객체. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다.</ko>
	 *
	 */
	triggerChange(pos: Axis, event = null) {
		this.trigger("change", {
			pos,
			holding: event !== null,
			inputEvent: event,
		});
	}

	destroy() {
		this.axes.off();
	}
};
