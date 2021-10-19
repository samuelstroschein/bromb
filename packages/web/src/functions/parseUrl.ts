import type { Metadata } from "../types/metadata";

export function parseUrl(args: { url: URL }): {
  metadata: Metadata;
  route?: string;
} {
  const metadata: Metadata = {
    device: window.navigator.userAgent,
    page: window.location.href,
    email: undefined,
    screenshot: undefined,
  };
  for (const param of args.url.searchParams) {
    metadata[param[0]] = param[1];
  }
  return {
    metadata: metadata,
    route: args.url.pathname,
  };
}
