import { ObjectInterface, REACTIVE_AXES, getInitialPos } from "@egjs/axes";
import { AxesOption } from "@egjs/axes/declaration/Axes";
import { AxisOption } from "@egjs/axes/declaration/AxisManager";
import { useReactive } from "./cfcs/useReactive";
import { VueReactiveAdapterResult } from "./cfcs/types";

export function useAxes(
  axis: ObjectInterface<AxisOption>,
  options: AxesOption = {}
): VueReactiveAdapterResult<typeof REACTIVE_AXES> {
  return useReactive({
    data() {
      return {
        axis,
        options,
      };
    },
    ...REACTIVE_AXES,
    state: {
      ...REACTIVE_AXES.state,
      ...getInitialPos(axis, {}),
    },
  });
}
