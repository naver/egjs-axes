import { ReactiveAdapter, ReactiveEventParameters } from "@egjs/axes";

export type ReactReactiveEvents<
  Events extends Record<string, any>
  > = {
    [key in keyof Events as `on${Capitalize<string & key>}`]: (effect: ((...args: ReactiveEventParameters<Events, key & string>) => void), deps?: readonly any[]) => void;
  };

export type ReactReactiveResult<
  Instance,
  State extends Record<string, any> = {},
  Methods extends keyof Partial<Instance> = any,
  Events extends Record<string, any> = {},
  > = State & { [key in Methods]: Instance[key] } & ReactReactiveEvents<Events>;

export type ReactReactiveAdapterResult<
  Adapter extends ReactiveAdapter<any, any, any, any, any>,
  >
  = Adapter extends ReactiveAdapter<infer Instance, infer State, infer Methods, any, infer Events>
  ? ReactReactiveResult<Instance, State, Methods, Events> : {};
