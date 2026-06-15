import { createClient } from "next-sanity";
import {
  apiVersion,
  dataset,
  requireSanityProjectId,
  useCdn,
} from "../env";

export function getSanityClient() {
  return createClient({
    apiVersion,
    dataset,
    projectId: requireSanityProjectId(),
    useCdn,
  });
}
