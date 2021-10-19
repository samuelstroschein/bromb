<script lang="ts">
  import { currentlySelectedCategory, resetWidget } from "./../store";
  import CloseIcon from "@svicons/ionicons-outline/close.svelte";
  import ArrowBackIcon from "@svicons/ionicons-outline/arrow-back.svelte";
  import { router } from "../router";
</script>

<row class="flex flex-row justify-between items-center space-x-2">
  {#if $currentlySelectedCategory === null}
    <p class="text-xl sm:text-lg font-bold text-neutral p-1">
      What's on your mind?
    </p>
  {:else}
    <row
      class="flex flex-row items-center space-x-1 hover:bg-base-300 rounded cursor-pointer p-1 flex-grow"
      on:click="{() => {
        $currentlySelectedCategory = null;
        router.goto('/');
      }}"
    >
      <ArrowBackIcon class="text-neutral w-5 h-5 md:w-4 md:h-4" />
      <p class="text-neutral text-xl sm:text-lg font-bold pt-0.5">
        {$currentlySelectedCategory.emoji}
        {$currentlySelectedCategory.title}
      </p>
    </row>
  {/if}
  <div
    on:click="{resetWidget}"
    class="text-neutral cursor-pointer hover:bg-base-300 rounded p-1 h-full"
  >
    <CloseIcon class="w-7 h-7 md:w-5 md:h-5" />
  </div>
</row>
