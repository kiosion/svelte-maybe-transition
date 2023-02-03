import type {
  BlurParams,
  FadeParams,
  FlyParams,
  SlideParams,
  ScaleParams,
  DrawParams,
  CrossfadeParams,
  TransitionConfig,
  EasingFunction
} from 'svelte/transition';

import { blur, fade, fly, slide, scale, draw, crossfade } from 'svelte/transition';

import * as easingFunctions from 'svelte/easing';

type CommonAddedParams = { enable: boolean; easing?: string | EasingFunction };
type OmitAddedParams<T, U = void> = Omit<T, keyof U | keyof CommonAddedParams> & U & CommonAddedParams;
type TransitionOption<T, S> = OmitAddedParams<T, { fn: S }>;

export type TransitionOptions =
  | TransitionOption<BlurParams, 'blur'>
  | TransitionOption<FadeParams, 'fade'>
  | TransitionOption<FlyParams, 'fly'>
  | TransitionOption<SlideParams, 'slide'>
  | TransitionOption<ScaleParams, 'scale'>
  | TransitionOption<DrawParams, 'draw'>;

export type TransitionTypes = 'blur' | 'fade' | 'fly' | 'slide' | 'scale' | 'draw';

const voidAnim = (
  _node: Element,
  _options: Omit<TransitionOptions, 'enable' | 'fn'>
) => ({
  delay: 0,
  duration: 0,
  easing: (t) => t,
  tick: () => {},
  css: () => ''
}) satisfies TransitionConfig;

const findEasing = (easing: string | EasingFunction): EasingFunction => {
  if (typeof easing !== 'string') {
    return easing;
  }
  // @ts-expect-error - todo, find a better way to do this
  if (easingFunctions[easing] !== undefined) {
    // @ts-expect-error - todo, find a better way to do this
    return (easingFunctions[easing]) satisfies EasingFunction;
  } else {
    return ((t) => t) satisfies EasingFunction
  }
};

const maybeTransition = (node: Element, options: TransitionOptions) => {
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
        return draw(node as SVGElement & { getTotalLength(): number }, rest as DrawParams);
    }
  }

  return voidAnim(node, rest);
};

const maybeCrossfade = (node: Element, options: Omit<TransitionOption<CrossfadeParams, 'crossfade'>, 'fn'>) => {
  const { enable, ...rest } = options;

  if (rest.easing !== undefined) {
    rest.easing = findEasing(rest.easing);
  }

  if (enable) {
    const { fallback, ...defaults } = rest as CrossfadeParams & {
      fallback?: (node: Element, params: CrossfadeParams, intro: boolean) => TransitionConfig;
    };
    

    return crossfade({ fallback, ...defaults });
  }

  return [voidAnim(node, {} as CrossfadeParams & { key: any }), voidAnim(node, {} as CrossfadeParams & { key: any })];
};

export { maybeTransition as maybe, maybeCrossfade };
