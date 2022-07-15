import Axes, { AxesOption } from "./Axes";
import { AXES_EVENTS, AXES_METHODS } from "./const";
import { ReactiveAdapter } from "./cfcs";
import {
  AxesEvents,
  AxesMethods,
  AxesReactiveState,
  ObjectInterface,
} from "./types";
import { AxisOption } from "./AxisManager";

export interface AxesData {
  axis: ObjectInterface<AxisOption>;
  options: AxesOption;
  onInit?: (axes: Axes) => void;
}

export const REACTIVE_AXES: ReactiveAdapter<
  Axes,
  AxesReactiveState,
  keyof AxesMethods,
  AxesData,
  AxesEvents
> = {
  state: {},
  methods: AXES_METHODS,
  events: AXES_EVENTS,
  instance(data) {
    return new Axes(data.axis, data.options);
  },
  init(instance, data) {
    data.onInit && data.onInit(instance);
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
