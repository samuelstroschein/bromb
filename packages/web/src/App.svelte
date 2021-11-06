<script>
  import { router } from "./router.ts";
  import {
    currentlySelectedCategory,
    widgetConfig,
    widgetError,
  } from "./store";
  import { isVisible, isMobile, metadata } from "./store";
  import Layout from "./components/Layout.svelte";
  import { createPopper } from "@popperjs/core/dist/esm";
  import { parseUrlAndMetadata } from "./functions/parseUrlAndMetadata";
  import { getConfig } from "./functions/getConfig";
  import CategorySkeleton from "./components/CategorySkeleton.svelte";

  const brombHtmlElement = document.querySelector("#bromb-widget");

  let lastTriggerElement;

  let isLoading = false;

  document.body.addEventListener("click", async (event) => {
    if (event.target === null) {
      return;
    }
    let match;
    if (event.target.matches("[href^='https://submission.bromb.co']")) {
      match = event.target;
    } else if (
      // in case the <a> element is wrapping another element which triggered the click
      event.target.parentElement &&
      event.target.parentElement.matches(
        "[href^='https://submission.bromb.co']"
      )
    ) {
      match = event.target.parentElement;
    }
    if (match) {
      event.preventDefault();
      isLoading = true;
      $isMobile = window.innerWidth <= 640 ? true : false;
      $isVisible = !$isVisible;
      lastTriggerElement = event.target;
      if ($isMobile === false) {
        // on desktop, popup is created
        createPopper(event.target, brombHtmlElement, {
          placement: "auto",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 10],
              },
            },
          ],
        });
      }
      const parsedUrl = parseUrlAndMetadata({
        url: new URL(match.href),
        triggerElementText: event.target.textContent,
      });
      if (parsedUrl.error) {
        $widgetError = parsedUrl.error;
      } else {
        $metadata = parsedUrl.data.metadata;
        if (
          $widgetConfig === null ||
          (parsedUrl.data.organizationName !== $widgetConfig.organizationName &&
            parsedUrl.data.projectName !== $widgetConfig.projectName)
        ) {
          console.log("conf undefined???");
          const config = await getConfig({
            organizationName: parsedUrl.data.organizationName,
            projectName: parsedUrl.data.projectName,
          });
          if (config.error) {
            $widgetError = config.error;
          } else {
            $widgetConfig = config.data;
          }
        }
        if (parsedUrl.data.route) {
          // if widget config contains id for the submission category,
          // set currently selected category to this id and route to form
          $currentlySelectedCategory =
            $widgetConfig?.submissionCategories.find(
              (c) => c.id === parsedUrl.data.route
            ) ?? null;
          if ($currentlySelectedCategory) {
            router.goto("/form");
          }
        }
      }
      isLoading = false;
    }
  });
</script>

{#if $isVisible}
  <Layout lastTriggerElement="{lastTriggerElement}">
    {#if isLoading}
      <CategorySkeleton />
      <br />
      <CategorySkeleton />
    {:else if $widgetError}
      <p>Something went wrong: {$widgetError}</p>
    {:else}
      <svelte:component this="{$router}" />
    {/if}
  </Layout>
{/if}

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    column {
      @apply flex;
      @apply flex-col;
    }
    row {
      @apply flex;
      @apply flex-row;
    }
    grid {
      @apply grid;
    }
  }
</style>
