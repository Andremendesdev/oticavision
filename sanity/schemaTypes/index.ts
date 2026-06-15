import { type SchemaTypeDefinition } from "sanity";
import siteSettings from "./siteSettings";
import service from "./service";
import galleryPhoto from "./galleryPhoto";
import canalhaPhoto from "./canalhaPhoto";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, service, galleryPhoto, canalhaPhoto],
};
