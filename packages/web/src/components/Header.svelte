<script lang="ts">
  import { fade } from "svelte/transition";
  import {
    currentlySelectedCategory,
    closeWidget,
    showCollectEmail,
  } from "./../store";
  import CloseIcon from "@svicons/ionicons-outline/close.svelte";
  import ArrowBackIcon from "@svicons/ionicons-outline/arrow-back.svelte";
  import { router } from "../router";

  const headingBaseClasses = "text-xl sm:text-lg font-bold text-base-content";
</script>

<row class="flex flex-row justify-between items-center space-x-2 pb-1">
  {#if $currentlySelectedCategory === null}
    <p class="{headingBaseClasses} p-1">What's on your mind?</p>
  {:else if $showCollectEmail}
    <p class="{headingBaseClasses} p-1">📩 Do you want a reply?</p>
  {:else if $router.route === "/form/success"}
    <p class="{headingBaseClasses}">✅ Success</p>
  {:else if $router.route === "/form/failure"}
    <p class="{headingBaseClasses}">⚠️ Failure</p>
  {:else}
    <row
      class="flex flex-row items-center space-x-1 hover:bg-base-300 rounded cursor-pointer p-1 flex-grow"
      on:click="{() => {
        $currentlySelectedCategory = null;
        router.goto('/');
      }}"
    >
      <ArrowBackIcon class="text-base-content w-5 h-5 md:w-4 md:h-4" />
      <p class="{headingBaseClasses}">
        {$currentlySelectedCategory.emoji}
        {$currentlySelectedCategory.title}
      </p>
    </row>
  {/if}
  <div
    on:click="{closeWidget}"
    class="text-base-content cursor-pointer hover:bg-base-300 rounded p-1 h-full"
  >
    <CloseIcon class="w-7 h-7 md:w-5 md:h-5" />
  </div>
</row>
