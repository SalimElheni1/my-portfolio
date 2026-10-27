import type { MetadataRoute } from "next";
import { sitePaths, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePaths.map((path) => ({ url: new URL(path, siteUrl).toString() }));
}
