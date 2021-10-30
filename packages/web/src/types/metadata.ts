export type Metadata = {
  email: string | undefined;
  device: string;
  screenshot: string | undefined;
  siteUrl: string;
  triggerElementText: string;
  // user defined metadata
  [userDefined: string]: string | undefined;
};
