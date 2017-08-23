
export type PlainObject<T> = {
  [index: string]: T
}

export type AnyPlainObject = PlainObject<any>
export type StringPlainObject = PlainObject<string>

/** Utility function to create a K:V from a list of strings */
export function createEnum<T extends string>(o: Array<T>): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}
