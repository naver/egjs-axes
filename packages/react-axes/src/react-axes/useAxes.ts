import { ObjectInterface, REACTIVE_AXES } from "@egjs/axes";
import { AxesOption } from "@egjs/axes/declaration/Axes";
import { Axis, AxisOption } from "@egjs/axes/declaration/AxisManager";
import { ReactReactiveAdapterResult } from "./cfcs/types";
import { useReactive } from "./cfcs/useReactive";


export interface ReactAxesResult extends ReactReactiveAdapterResult<typeof REACTIVE_AXES> { }

export function useAxes(axis: ObjectInterface<AxisOption>, options: AxesOption, startPos: Axis = {}): ReactAxesResult {
  return useReactive({
    data() {
      return {
        axis,
        options,
				startPos,
      };
    },
    ...REACTIVE_AXES,
  });
}
