import { ForwardedRef, MutableRefObject } from "react";

export function clamp(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max));
}

export const mergedRef = <T extends HTMLElement = HTMLElement>(
  forwardedRef: ForwardedRef<T>,
  localRef: MutableRefObject<T | null>,
) => {
  return (node: T) => {
    localRef.current = node;
    if (typeof forwardedRef === "function") {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  };
};

export function createRemap(
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  return function reMapper(x: number) {
    return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };
}
