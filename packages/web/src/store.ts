import { writable } from "svelte/store";
import { router } from "./router";
import type { Metadata } from "./types/metadata";
import type { SubmissionCategory } from "./types/submissionCategory";
import type { WidgetConfig } from "./types/widgetConfig";

export const submissionId = writable<string | null>(null);

export const currentlySelectedCategory = writable<null | SubmissionCategory>(
  null
);

export const theme = writable<"light" | "dark">("light");

export const metadata = writable<Metadata | undefined>();

export const widgetConfig = writable<null | WidgetConfig>(null);

export const isVisible = writable(false);

export const isMobile = writable(false);

export const endpoint = "https://app.bromb.co";
// export const endpoint = "http://localhost:3000";

export const widgetError = writable<unknown | null>(null);

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
