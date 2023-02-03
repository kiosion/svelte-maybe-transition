import { findEasing } from './utils';
import voidTransition from './void';
import { crossfade } from 'svelte/transition';
import type { TransitionOption } from './types';
import type { CrossfadeParams, TransitionConfig } from 'svelte/transition';

export default (
  node: Element,
  options: Omit<TransitionOption<CrossfadeParams, 'crossfade'>, 'fn'>
) => {
  const { enable, ...rest } = options;

  if (rest.easing !== undefined) {
    rest.easing = findEasing(rest.easing);
  }

  if (enable) {
    const { fallback, ...defaults } = rest as CrossfadeParams & {
      fallback?: (
        node: Element,
        params: CrossfadeParams,
        intro: boolean
      ) => TransitionConfig;
    };

    return crossfade({ fallback, ...defaults });
  }

  return [
    voidTransition(node, {} as CrossfadeParams & { key: any }),
    voidTransition(node, {} as CrossfadeParams & { key: any })
  ];
};
