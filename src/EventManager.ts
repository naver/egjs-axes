import { Axis } from "./AxisManager";

export class EventManager {
  constructor(private axes) {

  }
  trigger(name, option?) {
    return this.axes.trigger(name, option);
  }

	// trigger 'change' event
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
