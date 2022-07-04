
export function withClassMethods(methods: readonly string[]) {
  return function (prototype: any, memberName: string) {
    methods.forEach((name: string) => {
      if (name in prototype) {
        return;
      }
      prototype[name] = function (...args) {
        const result = this[memberName][name](...args);

        // fix `this` type to return your own `class` instance to the instance using the decorator.
        if (result === this[memberName]) {
          return this;
        } else {
          return result;
        }
      };
    });
  };
}
