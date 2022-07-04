import { withReactiveMethods, ReactiveSubscribe, ReactiveAdapter, keys, camelize } from "@egjs/axes";
import { useEffect, useRef, useState } from "react";
import { ReactReactiveResult } from "./types";


export function useReactive<
  Instance extends ReactiveSubscribe<Record<string, any>>,
  State extends Record<string, any> = {},
  Methods extends keyof Partial<Instance> = any,
  Data = any,
  Events extends Record<string, any> = {},
  >(reactiveProps: ReactiveAdapter<Instance, State, Methods, Data, Events>): ReactReactiveResult<Instance, State, Methods, Events> {
  const reactiveState = reactiveProps.state as any;
  const names = keys<Record<string, any>>(reactiveState);
  const [states] = useState<Record<string, {
    getter: boolean,
    value: any,
    set: (value: any) => void,
  }>>({});
  for (const name in reactiveState) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const state = useState(reactiveState[name]);
    states[name] = {
      getter: false,
      set: state[1],
      value: state[0],
    };
  }
  const instanceRef = useRef<Instance>();
  const [methods] = useState(() => withReactiveMethods(instanceRef, reactiveProps.methods || []));

  useEffect(() => {
    const data = reactiveProps.data ? reactiveProps.data() : {} as any;
    const inst = reactiveProps.instance(data);

    instanceRef.current = inst;
    names.forEach((name) => {
      (inst as any).subscribe(name, (value: any) => {
        if (states[name].getter) {
          states[name].set(value);
        }
      });
    });

    return () => {
      const data = reactiveProps.data ? reactiveProps.data() : {} as any;

      reactiveProps.destroy(inst, data);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const result = names.reduce<any>((result, name) => {
    Object.defineProperty(result, name, {
      enumerable: true,
      get() {
        states[name].getter = true;
        return states[name].value;
      },
    });
    return result;
  }, {});

  const reactiveEvents = (reactiveProps.events || []);

  reactiveEvents.forEach(name => {
    result[camelize(`on ${name as string}`)] = (callback: (e: any) => void, dependencies?: readonly any[]) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        reactiveProps.on && reactiveProps.on(instanceRef.current!, name as any, callback as any);
        return () => {
          reactiveProps.off && reactiveProps.off(instanceRef.current!, name as any, callback as any);
        };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, dependencies);
    };
  });

  keys(methods).forEach(name => {
    result[name] = methods[name];
  });
  return result;
}
