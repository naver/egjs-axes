import { ReactiveAdapter, ReactiveEventParameters } from "@egjs/axes";
import { Ref } from "@vue/composition-api";

export type VueReactiveEvents<
  Events extends Record<string, any>
  > = {
    [K in keyof Events as `on${Capitalize<string & K>}`]: (callback: ((...args: ReactiveEventParameters<Events, K & string>) => void)) => void;
  };

export type VueReactiveResult<
  Instance,
  State extends Record<string, any> = {},
  Methods extends keyof Partial<Instance> = any,
  Events extends Record<string, any> = {},
  > = {
    [key in keyof State]: Ref<State[key]>
  } & {
    [key in Methods]: Instance[key]
  } & VueReactiveEvents<Events>;

export type VueReactiveAdapterResult<
  Adapter extends ReactiveAdapter<any, any, any, any, any>,
  >
  = Adapter extends ReactiveAdapter<infer Instance, infer State, infer Methods, any, infer Events>
  ? VueReactiveResult<Instance, State, Methods, Events> : {};
