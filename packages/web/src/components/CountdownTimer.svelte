<script lang="ts">
  import { onDestroy } from "svelte";
  import { tweened } from "svelte/motion";

  export let seconds: number;

  export let onFinished: () => unknown;

  let progress = tweened(0, {
    duration: 1000,
  });

  export let countdownValue = seconds;

  const interval = setInterval(step, 1000);

  function step() {
    if (countdownValue > 0) {
      countdownValue = countdownValue - 1;
      progress.set(seconds - countdownValue);
    } else {
      clearInterval(interval);
      onFinished();
    }
  }

  // do the first step when the component is mounted
  // (setInterval is triggered after 1 second)
  step();

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<column class="w-full items-center">
  <progress
    class="progress progress-primary"
    value="{$progress}"
    max="{seconds}"
  >
  </progress>
  <p class="text-primary font-medium pt-1">
    sending without email in {countdownValue}s
  </p>
</column>
