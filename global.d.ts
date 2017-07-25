declare module Component {
  function on(name: string, options: { [key: string]: any });
  function on(options: { [key: string]: any });
  function off(name: string, fn: (e) => void);
  function off();
}

declare interface AxisOption {
  range?: number[];
  bounce?: number[];
  circular?: boolean[];
}
declare interface AxesOption {
  easing?: (x: number) => number;
  maximumDuration?: number;
  deceleration?: number;
  axis?: {
    [key: string]: AxisOption
  }
  interruptable?: boolean;
}