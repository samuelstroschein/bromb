<script lang="ts">
  import type { SubmissionCategory } from "../types/SubmissionCategory";

  export let category: SubmissionCategory;

  export let showDescription = true;

  // hack to pass css classes
  let classes = "";
  export { classes as class };
</script>

<div
  class="p-2 flex flex-row items-center cursor-pointer rounded space-x-3 {classes}"
  on:click
>
  <div class="rounded h-full flex items-center justify-center">
    <p class="text-center text-2xl text-base-content">{category.emoji}</p>
  </div>
  <div>
    <p class="font-semibold text-base-content">{category.title}</p>
    {#if showDescription}
      <p class="text-sm text-base-content">{category.description}</p>
    {/if}
  </div>
</div>
