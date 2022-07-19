
export function keys<T extends Record<string, any>>(obj: T): Array<keyof T> {
  return Object.keys(obj);
}

export function camelize(str: string) {
  return str.replace(/[\s-_]([a-z])/g, (all, letter) => letter.toUpperCase());
}
