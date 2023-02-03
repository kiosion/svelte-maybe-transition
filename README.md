# svelte-maybe-transition

A super-simple Svelte transitions utility that allows on-the-fly enabling and modification of element transitions.

**_Why?_**
Although you could achieve this with if/else blocks, that would require duplicating markup and logic. This util allows for stock Svelte transitions syntax, but with added 'enable' and 'fn' params that can be changed on the fly. I needed something for my own project that allowed changing transition functions programmatically, and this seemed like the best way to do it.

## Installation

Using NPM:

```bash
npm install --save-dev svelte-maybe-transition
```

Using Yarn:

```bash
yarn add -D svelte-maybe-transition
```

## Basic usage

```html
<script>
  import { maybe } from 'svelte-maybe-transition';

  // Let's assume that your PageLoad data has a boolean 'transitions' property
  export let data;

  $: enableTransitions = data?.transitions;
</script>

<div
  transition:maybe={{
    enable: enableTransitions,
    fn: 'fly',
    y: -100,
    duration: 1000
  }}
>
  Look at me!
</div>
```

## API

### maybe()

Accepts `fn` parameter of `'blur'` | `'fade'` | `'fly'` | `'slide'` | `'scale'` | `'draw'`, and an `enable` boolean.
Other than those two, the parameters required vary by which transition function is specified - if in doubt, check out Svelte's [transition documentation](https://svelte.dev/docs#run-time-svelte-transition)!

### maybeCrossfade()

Since Svelte's `crossfade` transition is a bit special it's split into its own function. It accepts normal animation params, plus the aforementioned `enable` boolean, and returns an array of two unnamed functions: `send` and `receive`.

#### Usage

```html
<script>
  import { maybe, maybeCrossfade } from 'svelte-maybe-transition';

  const enable = true,
    commonParams = {
      enable,
      duration: 500,
      delay: 250
    };

  // Since 'crossfade' requires a fallback transition if there is no element to send
  // or no element to receive, we construct a fallback 'maybe' fade transition here
  const fallback = maybe({
    fn: 'fade',
    ...commonParams
  });

  $: [send, receive] = maybeCrossfade({
    fallback,
    ...commonParams
  });
</script>

{#if condition}
<h1 in:send="{{key}}" out:receive="{{key}}">BIG ELEM</h1>
{:else}
<small in:send="{{key}}" out:receive="{{key}}">small elem</small>
{/if}
```

## Contributing

Pull requests are welcome. For major changes, or any issues, please open an issue first.

## Building

Building the package is done with `yarn build`, which outputs built files to `./package`.

Building the demo app is done with `yarn build:app`, which outputs static HTML to `./.svelte-kit/build`.

## License

See [LICENSE.md](LICENSE.md)
