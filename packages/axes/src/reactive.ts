/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Axes, { AxesOption } from "./Axes";
import { AXES_EVENTS, AXES_METHODS } from "./const";
import { ReactiveAdapter } from "@cfcs/core";
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
}

export const REACTIVE_AXES: ReactiveAdapter<
  Axes,
  AxesReactiveState,
  keyof AxesMethods,
  AxesData,
  AxesEvents
> = {
  methods: AXES_METHODS,
  events: AXES_EVENTS,
  created(data) {
    return new Axes(data.axis, data.options);
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
