/**
 * Bromb-js requires a special router that *doesn't route*.
 *
 * This is a tiny custom router that is typesafe and does not mingle around
 * with the hosts routing. Which all other routers that I @samuelstroschein
 * have tested do.
 *
 */

import type { SvelteComponent } from "svelte";
import { writable } from "svelte/store";
import Index from "./routes/index.svelte";
import Form from "./routes/form/index.svelte";
import FormSuccess from "./routes/form/success.svelte";
import FormFailure from "./routes/form/failure.svelte";

const routes = {
  "/": Index,
  "/form": Form,
  "/form/success": FormSuccess,
  "/form/failure": FormFailure,
} as const;

function createRouter() {
  const { subscribe, set } = writable<typeof SvelteComponent>(Index);

  return {
    subscribe,
    goto: (route: keyof typeof routes) => {
      set(routes[route]);
    },
  };
}

export const router = createRouter();
