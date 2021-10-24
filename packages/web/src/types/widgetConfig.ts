import type { SubmissionCategory } from "./submissionCategory";

export type WidgetConfig = {
  organizationName: string;
  projectName: string;
  submissionCategories: SubmissionCategory[];
};
