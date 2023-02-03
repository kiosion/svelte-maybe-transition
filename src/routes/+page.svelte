<script lang="ts">
  import { maybe } from '$lib';
  import type { TransitionTypes } from '$lib';

  let transition = {
    enable: true,
    // Unfortunately crossfade is a bitch to demo in this way so for now it's just not demo-ed
    fn: 'fade' as Omit<TransitionTypes, 'crossfade'> as TransitionTypes,
    duration: 400,
    easing: 'linear',
    invert: false,
    flyX: 0,
    flyY: 0,
    x: 0 as number | undefined,
    y: 0 as number | undefined
  };

  let previewBlock: HTMLElement,
    c = 0;

  const setTransition = () => {
    if (transition.fn !== 'fly') {
      transition.x = undefined;
      transition.y = undefined;
    } else {
      transition.x = transition.flyX;
      transition.y = transition.flyY;
    }
  };

  $: transition && setTransition();
  $: previewHeight = previewBlock?.clientHeight;
  $: console.log('previewHeight for elem:', previewHeight, previewBlock);
</script>

<svelte:head>
  <title>svelte-maybe-transition</title>
  <meta
    name="description"
    content="Svelte transitions utility that allows on-the-fly enabling/disabling and customizing of element transitions."
  />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  />
</svelte:head>

<div class="layout-container">
  <div class="title">
    <h1>svelte-maybe-transition</h1>
    <p>
      This page is fully static! Test out the options below to see the util in
      action
    </p>
  </div>

  <div class="options">
    <h2>Transition options</h2>
    <div>
      <label for="transition-enable">Enable transition</label>
      <input
        id="transition-enable"
        type="checkbox"
        bind:checked={transition.enable}
      />
    </div>
    <div>
      <label for="transition-type">Transition type</label>
      <select id="transition-type" bind:value={transition.fn}>
        <option value="blur">blur</option>
        <option value="fade">fade</option>
        <option value="fly">fly</option>
        <option value="slide">slide</option>
        <option value="scale">scale</option>
      </select>
    </div>
    {#if transition.fn === 'fly'}
      <div>
        <label for="transition-fly-direction">Fly to +/- x</label>
        <input
          id="transition-fly-direction"
          type="number"
          bind:value={transition.flyX}
        />
      </div>
      <div>
        <label for="transition-fly-y">Fly to +/- y</label>
        <input
          id="transition-fly-y"
          type="number"
          bind:value={transition.flyY}
        />
      </div>
    {/if}
    <div>
      <label for="transition-duration">Transition duration</label>
      <input
        id="transition-duration"
        type="number"
        bind:value={transition.duration}
      />
    </div>
    <div>
      <label for="transition-easing">Transition easing</label>
      <select id="transition-easing" bind:value={transition.easing}>
        <option value="linear">linear</option>
        <option value="quadInOut">quad</option>
        <option value="cubicInOut">cubic</option>
        <option value="quartInOut">quart</option>
        <option value="quintInOut">quint</option>
        <option value="sinInOut">sin</option>
        <option value="expInOut">exp</option>
        <option value="circleInOut">circle</option>
        <option value="backInOut">back</option>
        <option value="bounceInOut">bounce</option>
        <option value="elasticInOut">elastic</option>
      </select>
    </div>
  </div>

  <div
    class="preview"
    role="button"
    tabindex={0}
    style={`height: ${previewHeight}px`}
    on:click={() => c++}
    on:keyup={() => c++}
  >
    {#key c}
      <span
        class="preview-value"
        bind:this={previewBlock}
        in:maybe={{
          enable: transition.enable,
          fn: transition.fn,
          duration: transition.duration,
          easing: transition.easing,
          delay: transition.duration,
          x: transition.x,
          y: transition.y
        }}
        out:maybe={{
          enable: transition.enable,
          fn: transition.fn,
          duration: transition.duration,
          easing: transition.easing,
          x: transition.x,
          y: transition.y
        }}
      >
        Click me to play the transition
      </span>
    {/key}
  </div>
</div>

<style lang="scss">
  $unit: 1rem;

  :global(body, div, p, span, h1, h2, h3) {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }

  .layout-container {
    display: flex;
    flex-direction: column;
    gap: $unit * 2;
    margin: $unit * 2 auto;
    padding: $unit $unit * 2;
    max-width: $unit * 35;
    width: calc(100% - $unit * 4);
    background-color: #f5f5f5;
    border-radius: 1rem;
    overflow: hidden;
  }

  .title {
    display: flex;
    flex-direction: column;
    gap: $unit * 0.5;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .preview {
    position: relative;
    margin: 0;
    padding: 0;
    font-size: $unit * 1.5;
    font-weight: 600;
    cursor: pointer;

    &-value {
      position: absolute;
    }
  }
</style>
