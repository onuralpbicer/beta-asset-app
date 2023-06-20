/**
 * https://stackoverflow.com/a/50693866
 *  */
export type ArrayTypeof<T extends any[]> = T extends (infer U)[] ? U : never
