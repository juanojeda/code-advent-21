export type ErrorOr<T> = Error | T;
export const isError = (maybeError: unknown): maybeError is Error =>
  maybeError instanceof Error;

// eslint-disable-next-line functional/functional-parameters
export const logger = (...msg: readonly unknown[]): void => console.log(...msg);
