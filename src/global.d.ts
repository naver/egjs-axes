
declare var jQuery: any;
declare var window: any;
declare var console: any;
declare var document: any;

declare module Component {
  function on(name: string, options: { [key: string]: any });
  function on(options: { [key: string]: any });
  function off(name: string, fn: (e) => void);
  function off();
}