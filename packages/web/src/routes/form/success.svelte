<script lang="ts">
  import { onMount } from "svelte";
  import { closeWidget } from "../../store";

  onMount(() => {
    // close widget automatically
    setTimeout(closeWidget, 750);
  });
</script>

<div class="flex flex-col space-y-2">
  <div class="self-center">
    <p class="font-bold text-base-content">✅ Success</p>
  </div>
</div>
