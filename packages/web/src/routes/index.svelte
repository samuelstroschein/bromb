<script lang="ts">
  import Category from "../components/Category.svelte";
  import { router } from "../router";
  import { currentlySelectedCategory, widgetConfig } from "../store";
</script>

{#each $widgetConfig?.submissionCategories.filter((c) => c.isPublic) ?? [] as category}
  <Category
    class="hover:bg-base-300"
    category="{category}"
    on:click="{() => {
      $currentlySelectedCategory = category;
      router.goto('/form');
    }}"
  />
{/each}
