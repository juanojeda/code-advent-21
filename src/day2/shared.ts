import { ErrorOr } from "../utils";

export enum METHOD_KEY {
  DOWN = "down",
  UP = "up",
  FORWARD = "forward"
}

export type Instruction = {
  readonly method: METHOD_KEY;
  readonly value: number;
};

export type Position = {
  readonly x: number;
  readonly y: number;
};

export interface BaseMethod<P> {
  (position: P, val: number): P;
}

export type BaseMethodStore<P> = {
  readonly [key in METHOD_KEY]: BaseMethod<P>;
};

const isMethodKey = (maybeKey: string): maybeKey is METHOD_KEY =>
  Object.values(METHOD_KEY).includes(maybeKey as METHOD_KEY);

const streamToInstructionsRx = /(\w+) (\w+)$/gm;

const matchToInstruction = (match: RegExpMatchArray): ErrorOr<Instruction> => {
  const [_, method, preVal] = match;
  const value = Number(preVal);
  return isMethodKey(method) && !isNaN(value)
    ? {
        method,
        value
      }
    : new Error(`Broken instruction: ${match}`);
};

export const readInstructions = (
  stream: string
): readonly ErrorOr<Instruction>[] =>
  Array.from(stream.matchAll(streamToInstructionsRx), matchToInstruction);
