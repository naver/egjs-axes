import Component from "@egjs/component";

interface EmitterEvents<Value> {
  update: (value: Value) => void;
}

export class Observer<Value> {
  private _current: Value;
  private _emitter = new Component<EmitterEvents<Value>>();

  constructor(value?: Value) {
    this._current = value as any;
  }
  public get current() {
    return this._current as Value;
  }
  public set current(value: Value) {
    const isUpdate = value !== this._current;
    this._current = value;

    if (isUpdate) {
      this._emitter.trigger("update", value);
    }
  }
  public subscribe(callback: (value: Value) => void) {
    this._emitter.on("update", callback);
  }
  public unsubscribe(callback?: (value: Value) => void) {
    this._emitter.off("update", callback);
  }
}
