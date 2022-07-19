import { OBSERVERS_PATH } from "./const";
import { Observer } from "./Observer";
import { ReactiveMethods } from "./types";
import { keys, Ref } from "../core";

export function withReactiveMethods<
  Instance,
  Names extends keyof Partial<Instance>,
  Return extends ReactiveMethods<Instance, Names>
>(ref: Ref<Instance>, methods: readonly Names[]): Return {
  const obj: Record<any, any> = {};

  methods.forEach(name => {
    obj[name] = function (...args: any[]) {
      const current: any = ref.current || ref.value;

      return current[name](...args);
    };
  });
  return obj as Return;
}


export function getObservers(instance: any): Record<string, Observer<any>> {
  if (!instance[OBSERVERS_PATH]) {
    instance[OBSERVERS_PATH] = {};
  }
  return instance[OBSERVERS_PATH];
}

export function getObserver(instance: any, name: string, defaultValue?: any): Observer<any> {
  const observers = getObservers(instance);

  if (!observers[name]) {
    observers[name] = new Observer(defaultValue);
  }
  return observers[name];
}

export function ReactiveSubscribe(Constructor: any) {
  const prototype = Constructor.prototype;

  prototype["subscribe"] = function (name: string, callback: (value: any) => void) {
    getObserver(this, name).subscribe(callback);
  };
  prototype["unsubscribe"] = function (name?: string, callback?: (value: any) => void) {
    if (!name) {
      keys(getObservers(this)).forEach((observerName) => {
        this.unsubscribe(observerName);
      });
      return;
    }
    if (!(name in this)) {
      return;
    }
    getObserver(this, name).unsubscribe(callback);
  };
}

export interface ReactiveSubscribe<Properties extends Record<string, any>> {
  subscribe<Name extends keyof Properties = keyof Properties>(
    name: Name, callback: (value: Properties[Name]) => void): void;
  unsubscribe<Name extends keyof Properties = keyof Properties>(
    name?: Name, callback?: (value: Properties[Name]) => void): void;
}
