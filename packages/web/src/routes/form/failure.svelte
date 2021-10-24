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
  <p class="w-1/3">⚠️</p>
  <p class="text-xl font-bold mt-2">
    {"Something went wrong"}
  </p>
</div>
