import Axes, { ObjectInterface, REACTIVE_AXES, getInitialPos } from "@egjs/axes";
import { AxesOption } from "@egjs/axes/declaration/Axes";
import { AxisOption } from "@egjs/axes/declaration/AxisManager";
import { ReactReactiveAdapterResult } from "./cfcs/types";
import { useReactive } from "./cfcs/useReactive";


export interface ReactAxesResult extends ReactReactiveAdapterResult<typeof REACTIVE_AXES> { }

export function useAxes(
  axis: ObjectInterface<AxisOption>,
  options: AxesOption,
  onInit?: (axes: Axes) => void,
): ReactAxesResult {
  return useReactive({
    data() {
      return {
        axis,
        options,
        onInit,
      };
    },
    ...REACTIVE_AXES,
    state: {
      ...REACTIVE_AXES.state,
      ...getInitialPos(axis, {}),
    },
  });
}
