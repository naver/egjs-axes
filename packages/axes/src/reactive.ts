import Axes, { AxesOption } from "./Axes";
import { AXES_EVENTS, AXES_METHODS } from "./const";
import { ReactiveAdapter } from "./cfcs";
import { AxesEvents, AxesMethods, ObjectInterface } from "./types";
import { Axis, AxisOption } from "./AxisManager";

export interface AxesData {
  axis: ObjectInterface<AxisOption>;
  options: AxesOption;
  startPos: Axis;
}

export const REACTIVE_AXES: ReactiveAdapter<
  Axes,
  {},
  keyof AxesMethods,
  AxesData,
  AxesEvents
> = {
  state: {},
  methods: AXES_METHODS,
  events: AXES_EVENTS,
  instance(data) {
    return new Axes(data.axis, data.options, data.startPos);
  },
  on(instance, name, callback) {
    instance.on(name, callback);
  },
  off(instance, name, callback) {
    instance.off(name, callback);
  },
  destroy(instance) {
    instance.destroy();
  },
};
