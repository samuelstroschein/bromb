import { writable } from "svelte/store";
import { router } from "./router";
import type { Metadata } from "./types/Metadata";
import type { SubmissionCategory } from "./types/SubmissionCategory";
import type { WidgetConfig } from "./types/WidgetConfig";

export const currentlySelectedCategory = writable<null | SubmissionCategory>(
  null
);

export const theme = writable<"light" | "dark">("light");

export const apiEndpoint = writable<string>(
  process.env["DEFAULT_API_ENDPOINT"]
);

export const metadata = writable<Metadata | undefined>();

export const widgetConfig = writable<null | WidgetConfig>(null);

export const isVisible = writable(false);

export const isMobile = writable(false);

export const widgetError = writable<unknown | null>(null);

export const showCollectEmail = writable(false);

/**
 * Closes the widget and re-initializes stores where appropriate.
 */
export function closeWidget() {
  isVisible.set(false);
  // closing animation collides with changing the route.
  // therefore wait before closing animation is done to goto
  // '/'
  setTimeout(() => {
    currentlySelectedCategory.set(null);
    router.goto("/");
  }, 500);
}
