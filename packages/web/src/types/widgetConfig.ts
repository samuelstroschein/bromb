import type { SubmissionCategory } from "./SubmissionCategory";

export type WidgetConfig = {
  organizationName: string;
  projectName: string;
  submissionEndpoint: string;
  submissionCategories: SubmissionCategory[];
};
