export interface AxisOption {
  range?: number[];
  bounce?: number[];
  circular?: boolean[];
}
export interface AxesOption {
  easing?: (x: number) => number;
  maximumDuration?: number;
  deceleration?: number;
  axis?: {
    [key: string]: AxisOption
  }
  interruptable?: boolean;
}
