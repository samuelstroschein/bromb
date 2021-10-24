// @ts-ignore
import App from "./App.svelte";

class BrombWebComponent extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "closed" });
    new App({
      // @ts-ignore
      target: shadow,
    });
  }
}

async function main(): Promise<void> {
  window.customElements.define("bromb-widget", BrombWebComponent);
  const bromb = document.createElement("bromb-widget");
  bromb.setAttribute("id", "bromb-widget");
  // ignore bromb from screenshot
  bromb.setAttribute("data-html2canvas-ignore", "");
  // setting the zIndex to the maximum:
  // the bromb widegt should always be on top of all other layers.
  bromb.style.zIndex = "2147483647";
  document.body.appendChild(bromb);
}

try {
  main();
} catch (e) {
  console.error(e);
}
