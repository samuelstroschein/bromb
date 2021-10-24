import { widgetError } from "../store";
import type { Metadata } from "../types/metadata";

export function parseUrl(args: { url: URL }): {
  error: null | string;
  data: null | {
    organizationName: string;
    projectName: string;
    metadata: Metadata;
    route?: string;
  };
} {
  const metadata: Metadata = {
    device: window.navigator.userAgent,
    page: window.location.href,
    email: undefined,
    screenshot: undefined,
  };
  for (const [name, value] of args.url.searchParams) {
    metadata[name] = value;
  }
  const paths = args.url.pathname.split("/").filter((path) => path !== "");
  if (paths.length < 2) {
    return {
      data: null,
      error:
        'Bromb has been triggered without the required "https://submission.bromb.co/organization/project" path.',
    };
  }
  return {
    error: null,
    data: {
      organizationName: paths[0],
      projectName: paths[1],
      metadata: metadata,
      route: args.url.pathname[2],
    },
  };
}
