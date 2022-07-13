import Axes, { ObjectInterface, REACTIVE_AXES } from "@egjs/axes";
import { AxesOption } from "@egjs/axes/declaration/Axes";
import { Axis, AxisOption } from "@egjs/axes/declaration/AxisManager";
import { ReactReactiveAdapterResult } from "./cfcs/types";
import { useReactive } from "./cfcs/useReactive";


export interface ReactAxesResult extends ReactReactiveAdapterResult<typeof REACTIVE_AXES> { }

export function useAxes(
  axis: ObjectInterface<AxisOption>,
  options: AxesOption,
  startPos: Axis,
  onInit: (axes: Axes) => void,
): ReactAxesResult {
  return useReactive({
    data() {
      return {
        axis,
        options,
        startPos,
        onInit,
      };
    },
    ...REACTIVE_AXES,
    state: {
      ...REACTIVE_AXES.state,
      ...Object.keys(axis).reduce((result, key) => Object.assign(result, {[key]: axis[key].range![0] ?? 0}), {}),
      ...startPos,
    },
  });
}
