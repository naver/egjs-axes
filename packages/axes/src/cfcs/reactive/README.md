* CFCs Reactive

The Hooks component can provide us with a value for the state by changing the state designated as a Hook by certain conditions.

The property/state used in Hooks is called **Reactive State**.


## How to use
### Vanilla for Reactive

1. Define the Component's `ReactiveState`.
2. Use `ReactiveSubscribe` interface for `ReactiveState`.
3. Use the `@ReactiveSubscribe` class decorator to use the `subscribe` method.
4. Use the `@Reactive` property decorator to use as reactive state.

```ts
import { Reactive, ReactiveSubscribe, ReactiveSubscribe } from "@cfcs/reactive";

export interface ComponentReactiveState {
  state1: boolean;
  state2: number;
}

@ReactiveSubscribe
class Component {
  @Reactive() state1!: boolean;
  @Reactive() state2!: number;

  // If you want to use it privately and export only public getters, use it as follows.
  @Reactive("state1") private _state1!: boolean;
  @Reactive("state2") private _state2!: number;
}

// if you
interface Component extends ReactiveSubscribe<ComponentReactiveState> {}

export default Component;
```


```ts
import Component from "./Component";

const component = new Component();

const state1 = component.state1;

component.subscribe("state1", nextValue => {
  console.log("subscribe state1 value", nextValue);
});
```

### Framework for Reactive

1. Define reative hooks for use in framework. There are several preparations.
  * `methods` to use in the framework. ex) `["resize", "scrollIntoView", "querySelector"]`
  * reactive `state` with default value to use as a hook in the framework. ex) `{ isReachStart: false, isReachEnd: false }`
  * `Data interface` to deliver framework data to component because the usage method is different for each framework.
  * (dynamic `props` is in preparation.)
2. Defines the life cycle that operates in the framework.
  * mounted: ...
  * start: ...
  * destroy: ...

```ts
import Component, { ComponentReactiveData } from "./Component";

export interface ComponentData {
  container: HTMLElement;
  props: ComponentOptions;
}

export const COMPONENT_HOOKS: ReactiveAdapter<Component, ComponentReactiveState, ComponentData> = {
  state: COMPONENT_REACTIVE_STATE,
  methods: CONVEYER_METHODS,
  mounted(data) {
    return new Component(data.container, data.props);
  },
  start(instance: Component) {
    instance.init();
  },
  destroy(instance: Component) {
    instance.destroy();
  },
};
```
