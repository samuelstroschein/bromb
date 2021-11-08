import type { SubmissionCategory } from "./SubmissionCategory";

export type WidgetConfig = {
  organizationName: string;
  projectName: string;
  submissionCategories: SubmissionCategory[];
};
