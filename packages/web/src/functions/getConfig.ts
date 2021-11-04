import type { WidgetConfig } from "../types/WidgetConfig";

export async function getConfig(args: {
  projectName: string;
  organizationName: string;
}): Promise<{ data: WidgetConfig | null; error: unknown | null }> {
  try {
    const response = await fetch(process.env.CONFIG_ENDPOINT as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });
    if (response.ok !== true) {
      return {
        data: null,
        error: "Requesting config file failed.",
      };
    }
    const config: WidgetConfig = await response.json();
    return { data: config, error: null };
  } catch (e) {
    return { data: null, error: e };
  }
}
