import type { StarlightPlugin } from "@astrojs/starlight/types";

import { overrideStarlightComponent } from "./libs/starlight";

export default function starlightSidebarClickableGroups(): StarlightPlugin {
  return {
    name: "starlight-sidebar-clickable-groups",
    hooks: {
      "config:setup"({ logger, config: starlightConfig, updateConfig }) {
        updateConfig({
          components: {
            ...starlightConfig.components,
            ...overrideStarlightComponent(
              starlightConfig.components,
              logger,
              "Sidebar",
              "Sidebar"
            ),
          },
        });
      },
    },
  };
}
