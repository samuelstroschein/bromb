// @ts-ignore
import App from "./App.svelte";
import { theme } from "./store";

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
  // setting the zIndex to the maximum:
  // the bromb widegt should always be on top of all other layers.
  bromb.style.zIndex = "2147483647";
  const themeAttribute = document.currentScript?.getAttribute("data-theme");
  if (themeAttribute) {
    if (themeAttribute === "light" || themeAttribute === "dark") {
      theme.set(themeAttribute);
    } else {
      console.warn(
        `Bromb: Only 'light' and 'dark' are allowed in the data-theme attribute but you specified ${themeAttribute}`
      );
    }
  } else {
    console.warn(
      `Bromb: You have not specified a theme in the data-theme attribute. Light mode is chosen as fallback.`
    );
  }
  // @ts-ignore
  if (window.CustomBrombWidgetConfig) {
    // @ts-ignore
    console.log(window.CustomBrombWidgetConfig);
  }
  document.body.appendChild(bromb);
}

try {
  main();
} catch (e) {
  console.error(e);
}
