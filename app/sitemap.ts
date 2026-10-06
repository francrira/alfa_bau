import type { MetadataRoute } from "next";
import { canonicalRoutes } from "@/lib/routes";
import { siteUrl } from "@/lib/site";
import { localizedHref } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return canonicalRoutes.flatMap(route => {
    const path = route ? "/" + route + "/" : "/";
    const languages = { de: siteUrl + path, en: siteUrl + localizedHref("en", path) };
    return (["de", "en"] as const).map(locale => ({ url: languages[locale], alternates: { languages } }));
  });
}
