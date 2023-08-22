export type RequiredKey<T, K extends keyof T> = Pick<Required<T>, K> &
  Omit<T, K>;

export type OptionalKey<T, K extends keyof T> = Pick<Partial<T>, K> &
  Omit<T, K>;
