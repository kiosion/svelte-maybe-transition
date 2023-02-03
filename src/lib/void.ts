import type { TransitionOptions } from './types';
import type { TransitionConfig } from 'svelte/transition';

export default (
  _node: Element,
  _options: Omit<TransitionOptions, 'enable' | 'fn'>
) =>
  ({
    delay: 0,
    duration: 0,
    easing: (t) => t,
    tick: () => {},
    css: () => ''
  } satisfies TransitionConfig);
