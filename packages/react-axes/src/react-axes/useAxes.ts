import { ObjectInterface, REACTIVE_AXES, getInitialPos } from "@egjs/axes";
import { AxesOption } from "@egjs/axes/declaration/Axes";
import { AxisOption } from "@egjs/axes/declaration/AxisManager";
import { ReactReactiveAdapterResult } from "./cfcs/types";
import { useReactive } from "./cfcs/useReactive";


export function useAxes(
  axis: ObjectInterface<AxisOption>,
  options: AxesOption = {},
): ReactReactiveAdapterResult<typeof REACTIVE_AXES> {
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
