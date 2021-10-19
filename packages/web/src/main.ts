// @ts-ignore
import App from "./App.svelte";
import { widgetConfig, endpoint, projectId, widgetError } from "./store";
import type { WidgetConfig } from "./types/widgetConfig";

class BrombWebComponent extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "closed" });
    new App({
      // @ts-ignore
      target: shadow,
    });
  }
}
async function getConfig(args: {
  projectId: string;
}): Promise<{ data: WidgetConfig | null; error: unknown | null }> {
  try {
    const response = await fetch(endpoint + "/api/config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });
    if (response.ok !== true) {
      return {
        data: null,
        error: "Requesting config file failed.",
      };
    }
    const config: WidgetConfig = await response.json();
    return { data: config, error: null };
  } catch (e) {
    return { data: null, error: e };
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
  const projectIdAttribute =
    document.currentScript?.getAttribute("data-projectId");
  if (!projectIdAttribute) {
    widgetError.set("The bromb project id is not defined.");
    return;
  }
  projectId.set(projectIdAttribute);
  const configResult = await getConfig({
    projectId: projectIdAttribute,
  });
  if (configResult.error) {
    widgetError.set(configResult.error);
    return;
  }
  widgetConfig.set(configResult.data);
}

try {
  main();
} catch (e) {
  console.error(e);
}
