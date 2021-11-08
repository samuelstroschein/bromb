import { apiEndpoint } from "../store";
import type { WidgetConfig } from "../types/WidgetConfig";

export async function getConfig(args: {
  projectName: string;
  organizationName: string;
  apiEndpoint: string;
}): Promise<{ data: WidgetConfig | null; error: unknown | null }> {
  try {
    const response = await fetch(
      args.apiEndpoint + `/config/${args.organizationName}/${args.projectName}`,
      {
        method: "GET",
      }
    );
    if (response.ok !== true) {
      return {
        data: null,
        error: "Requesting config file failed.",
      };
    }
    const config: WidgetConfig = await response.json();
    console.log({ config });
    return { data: config, error: null };
  } catch (e) {
    return { data: null, error: e };
  }
}
