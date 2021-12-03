export type ErrorOr<T> = Error | T;
export const isError = (maybeError: unknown): maybeError is Error =>
  maybeError instanceof Error;

export const logger = (msg: unknown): void => console.log(msg);
