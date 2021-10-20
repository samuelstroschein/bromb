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
  import { parseUrl } from "./functions/parseUrl";

  const brombHtmlElement = document.querySelector("#bromb-widget");

  let lastTriggerElement;

  document.body.addEventListener("click", (event) => {
    let match;
    if (event.target?.matches("[href^='https://submission.bromb.co']")) {
      match = event.target;
    } else if (
      // in case the <a> element is wrapping another element which triggered the click
      event.target?.parentElement &&
      event.target?.parentElement.matches(
        "[href^='https://submission.bromb.co']"
      )
    ) {
      match = event.target?.parentElement;
    }
    if (match) {
      event.preventDefault();
      const parsedUrl = parseUrl({ url: new URL(match.href) });
      $metadata = parsedUrl.metadata;
      if (parsedUrl.route) {
        // if widget config contains id for the submission category,
        // set currently selected category to this id and route to form
        $currentlySelectedCategory =
          $widgetConfig?.submissionCategories.find(
            (c) => c.id === parsedUrl.route.slice(1, parsedUrl.route.length)
          ) ?? null;
        if ($currentlySelectedCategory) {
          router.goto("/form");
        }
      }
      // ({metadata: $metadata} = parseUrl({ url: new URL(match.href) });
      $isVisible = !$isVisible;
      $isMobile = window.innerWidth <= 640 ? true : false;
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
    }
  });
</script>

{#if $isVisible}
  <Layout lastTriggerElement="{lastTriggerElement}">
    {#if $widgetError}
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
</style>