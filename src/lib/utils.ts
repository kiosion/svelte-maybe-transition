import * as easingFunctions from 'svelte/easing';
import type { EasingFunction } from 'svelte/transition';

export const findEasing = (easing: string | EasingFunction): EasingFunction => {
  if (typeof easing !== 'string') {
    return easing;
  }
  // @ts-expect-error - todo, find a better way to do this
  if (easingFunctions[easing] !== undefined) {
    // @ts-expect-error - todo, find a better way to do this
    return easingFunctions[easing] satisfies EasingFunction;
  } else {
    return ((t) => t) satisfies EasingFunction;
  }
};
