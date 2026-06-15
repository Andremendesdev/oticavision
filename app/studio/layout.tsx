import type { Metadata, Viewport } from "next";
import {
  NextStudioLayout,
  metadata as studioMetadata,
  viewport as studioViewport,
} from "next-sanity/studio";
import { siteName } from "@/lib/site/env";

export const metadata: Metadata = {
  ...studioMetadata,
  title: `${siteName} Studio`,
};

export const viewport: Viewport = studioViewport;

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextStudioLayout>{children}</NextStudioLayout>;
}
