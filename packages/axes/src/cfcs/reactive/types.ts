import { ComponentEvent } from "@egjs/component";

import { ReactiveSubscribe } from "./utils";

type AnyFunction = (...args: any[]) => any;
type NoArguments = undefined | null | void | never;
type EventKey<T extends Record<string, any>> = string & keyof T;
type UnknwonToAnyArray<Arr> = unknown[] extends Arr ? any[] : Arr;

export type ReactiveEventCallback<
  T extends Record<string, any>,
  K extends EventKey<T>>
  = T[K] extends NoArguments
  ? () => any : T[K] extends AnyFunction
  ? T[K]
  : T[K] extends ComponentEvent<infer PROPS>
  ? (event: ComponentEvent<PROPS, K>) => any
  : (event: T[K]) => any;

export type ReactiveEventParameters<
  Events extends Record<string, any>,
  EventName extends EventKey<Events>> = UnknwonToAnyArray<Parameters<ReactiveEventCallback<Events, EventName>>>;

export type ReactiveMethods<Instance, Names extends keyof Instance> = {
  [key in Names]: Instance[key];
};

export type ReactiveAdapter<
  Instance extends ReactiveSubscribe<Record<string, any>>,
  State extends Record<string, any> = {},
  Methods extends keyof Partial<Instance> = never,
  Data = any,
  Events extends Record<string, any> = {},
> = {
    state: State;
    data?: () => Data;
    instance: (data: Data) => Instance;
    methods: readonly Methods[];
    events: readonly (keyof Events)[];
    destroy: (instance: Instance, data: Data) => void;
    on?: <EventName extends EventKey<Events>>(
      instance: Instance, eventName: EventName, listener: ReactiveEventCallback<Events, EventName>) => void;
    off?: <EventName extends EventKey<Events>>(
      instance: Instance, eventName: EventName, listener: ReactiveEventCallback<Events, EventName>) => void;
  };
