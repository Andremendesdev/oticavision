import createImageUrlBuilder from "@sanity/image-url";
import { dataset, isSanityConfigured, requireSanityProjectId } from "../env";

export const urlForImage = (source: unknown) => {
  if (!isSanityConfigured || !source) return null;

  const imageBuilder = createImageUrlBuilder({
    projectId: requireSanityProjectId(),
    dataset,
  });

  return imageBuilder.image(source).auto("format").fit("max");
};
