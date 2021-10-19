export type Metadata = {
  email: string | undefined;
  device: string;
  screenshot: string | undefined;
  page: string;
  // user defined metadata
  [userDefined: string]: string | undefined;
};
