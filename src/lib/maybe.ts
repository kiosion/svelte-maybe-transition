import voidTransition from './void';
import { findEasing } from './utils';
import { blur, fade, fly, slide, scale, draw } from 'svelte/transition';
import type { TransitionOptions } from './types';
import type {
  BlurParams,
  FadeParams,
  FlyParams,
  SlideParams,
  ScaleParams,
  DrawParams
} from 'svelte/transition';

export default (node: Element, options: TransitionOptions) => {
  const { enable, fn, ...rest } = options;

  if (rest.easing !== undefined) {
    rest.easing = findEasing(rest.easing);
  }

  if (enable) {
    switch (fn) {
      case 'blur':
        return blur(node, rest as BlurParams);
      case 'fade':
        return fade(node, rest as FadeParams);
      case 'fly':
        return fly(node, rest as FlyParams);
      case 'slide':
        return slide(node, rest as SlideParams);
      case 'scale':
        return scale(node, rest as ScaleParams);
      case 'draw':
        return draw(
          node as SVGElement & { getTotalLength(): number },
          rest as DrawParams
        );
    }
  }

  return voidTransition(node, rest);
};
