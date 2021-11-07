import type { Metadata } from "../types/Metadata";

/**
 *
 * @param url Url
 * @param triggerElementText string
 */
export function parseUrlAndMetadata(args: {
  url: URL;
  triggerElementText: string;
}): {
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
    siteUrl: window.location.href,
    email: undefined,
    triggerElementText: args.triggerElementText,
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
        'Incorrect trigger link which did not adhere to the "https://submission.bromb.co/organization/project" schema.',
    };
  }
  console.log({ metadata });
  return {
    error: null,
    data: {
      organizationName: paths[0],
      projectName: paths[1],
      metadata: metadata,
      route: paths[2],
    },
  };
}
