import { ObjectInterface, REACTIVE_AXES } from "@egjs/axes";
import { AxesOption } from "@egjs/axes/declaration/Axes";
import { AxisOption } from "@egjs/axes/declaration/AxisManager";
import { useReactive, VueReactiveAdapterResult } from "@cfcs/vue3";

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
