<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { closeWidget } from "../../store";

  onMount(() => {
    // close widget automatically
    setTimeout(closeWidget, 1500);
  });
</script>

<column class="space-y-2" in:fade>
  <p class="text-base-content">Thank's for the submission! :)</p>
</column>
