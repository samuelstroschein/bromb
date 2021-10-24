<script>
  import { isMobile, closeWidget } from "../store";
  import { fade, slide } from "svelte/transition";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";

  const brombHtmlElement = document.querySelector("#bromb-widget");
  export let lastTriggerElement;

  // checking if mouse has been clicked outside of brombHtmlElement
  function clickOutside(element, callbackFunction) {
    function onClick(event) {
      if (
        event.target !== brombHtmlElement &&
        // if event.target is contained in the bombHtmlElement (it is part of the widget)
        // then the click happened outside of the widget
        brombHtmlElement?.contains(event.target) === false &&
        lastTriggerElement?.contains(event.target) === false
      ) {
        callbackFunction();
      }
    }

    document.body.addEventListener("click", onClick);

    // when the using component is destroyed, the event listener is removed
    return {
      update(newCallbackFunction) {
        callbackFunction = newCallbackFunction;
      },
      destroy() {
        document.body.removeEventListener("click", onClick);
      },
    };
  }
</script>

<div transition:fade="{{ duration: 100 }}" data-theme="light">
  {#if $isMobile}
    <div
      id="bromb-mobile-overlay"
      class="w-screen h-screen bg-black fixed top-0 left-0 opacity-25 -z-top-2"
      on:click="{closeWidget}"
    ></div>
    <div
      transition:slide
      class="w-screen rounded-t-xl p-2 fixed bottom-0 left-0 bg-primary-content -z-top-1"
    >
      <Header />
      <slot />
      <Footer />
    </div>
  {:else}
    <div
      class="rounded-xl p-2 shadow-desktop bg-primary-content -z-top-1 w-72"
      use:clickOutside="{closeWidget}"
    >
      <Header />
      <slot />
      <Footer />
    </div>
  {/if}
</div>
