export type Locale = "de" | "en";
import english from "./translations/en.json";

export function translate(locale: Locale, text: string): string {
  if (locale === "de") return text;
  const key = text.trim().replace(/\s+/g, " ");
  const translated = (english as Record<string, string>)[key];
  return translated === undefined ? text : text.replace(text.trim(), translated);
}
export function stripLocale(path: string) {
  return path.replace(/^\/en(?=\/|$|[?#])/, "") || "/";
}
export function localizedHref(locale: Locale, path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const base = stripLocale(path);
  return locale === "en" ? "/en" + (base.startsWith("/") ? base : "/" + base) : base;
}
