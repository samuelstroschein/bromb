<script lang="ts">
  import { onMount } from "svelte";
  import { closeWidget } from "../../store";

  onMount(() => {
    setTimeout(() => {
      closeWidget();
    }, 2000);
  });
</script>

<div class="flex flex-col items-center justify-center p-6">
  <p class="text-xl font-bold mt-2 text-base-content">
    {"Something went wrong"}
  </p>
</div>
