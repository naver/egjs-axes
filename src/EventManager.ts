import { Axis } from "./AxisManager";

export class EventManager {
  constructor(private axes) {

  }
  trigger(name, option?) {
    return this.axes.trigger(name, option);
  }

	// trigger 'change' event
	triggerChange(pos: Axis, holding = false, event = null) {
		/**
		 * This event is fired when coordinate changes.
		 * @ko 좌표가 변경됐을 때 발생하는 이벤트
		 * @name eg.MovableCoord#change
		 * @event
		 *
		 * @param {Object} param The object of data to be sent when the event is fired <ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
		 * @param {Array} param.position departure coordinate  <ko>좌표</ko>
		 * @param {Number} param.position.0 The X coordinate <ko>x 좌표</ko>
		 * @param {Number} param.pos.1 The Y coordinate <ko>y 좌표</ko>
		 * @param {Boolean} param.holding Indicates whether a user holds an element on the screen of the device.<ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
		 * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다.</ko>
		 *
		 */
		this.trigger("change", {
			pos,
			holding,
			inputEvent: event,
		});
	}

  // trigger(option) {
  //   this.axes.trigger("hold", {
  //     pos: pos,
  //     // hammerEvent: e,
  //     inputEvent: event,
  //   });
  // }
};
