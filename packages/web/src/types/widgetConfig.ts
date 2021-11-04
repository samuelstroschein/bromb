import type { SubmissionCategory } from "./SubmissionCategory";

export type WidgetConfig = {
  submissionEndpoint: string;
  categories: SubmissionCategory[];
};
