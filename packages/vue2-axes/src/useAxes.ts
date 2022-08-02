import { ObjectInterface, REACTIVE_AXES, getInitialPos } from "@egjs/axes";
import { AxesOption } from "@egjs/axes/declaration/Axes";
import { AxisOption } from "@egjs/axes/declaration/AxisManager";
import { useReactive, VueReactiveAdapterResult } from "@cfcs/vue2";

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
  });
}
