<script lang="ts">
  import type { SubmissionCategory } from "../types/submissionCategory";

  export let category: SubmissionCategory;

  export let showDescription = true;

  let classes = "";
  export { classes as class };
</script>

<div
  class="p-2 flex flex-row items-center cursor-pointer rounded space-x-3 {classes}"
  on:click
>
  <div class="rounded h-full flex items-center justify-center">
    <p class="text-center text-2xl">{category.emoji}</p>
  </div>
  <div>
    <p>{category.title}</p>
    {#if showDescription}
      <p class="text-sm text-gray-500">{category.description}</p>
    {/if}
  </div>
</div>
