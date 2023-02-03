import type {
  BlurParams,
  FadeParams,
  FlyParams,
  SlideParams,
  ScaleParams,
  DrawParams,
  EasingFunction
} from 'svelte/transition';

export type CommonAddedParams = {
  enable: boolean;
  easing?: string | EasingFunction;
};
export type OmitAddedParams<T, U = void> = Omit<
  T,
  keyof U | keyof CommonAddedParams
> &
  U &
  CommonAddedParams;
export type TransitionOption<T, S> = OmitAddedParams<T, { fn: S }>;

export type TransitionOptions =
  | TransitionOption<BlurParams, 'blur'>
  | TransitionOption<FadeParams, 'fade'>
  | TransitionOption<FlyParams, 'fly'>
  | TransitionOption<SlideParams, 'slide'>
  | TransitionOption<ScaleParams, 'scale'>
  | TransitionOption<DrawParams, 'draw'>;

export type TransitionTypes =
  | 'blur'
  | 'fade'
  | 'fly'
  | 'slide'
  | 'scale'
  | 'draw';
