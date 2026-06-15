import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./sanity/schemaTypes";
import { dataset, projectId } from "./sanity/env";
import { siteName } from "./lib/site/env";

export default defineConfig({
  basePath: "/studio",
  projectId: projectId || "configure-me",
  dataset,
  title: siteName,
  plugins: [structureTool()],
  schema,
});
