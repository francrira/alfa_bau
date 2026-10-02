"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Image from "next/image";
import Icon from "./Icon";

export default function MediaPlaceholder({ label, className = "", src, priority = false }: { label: string; className?: string; src?: string; priority?: boolean }) {
  const { locale, t, localizeHref } = useTranslation();
  // Pass a public asset URL through src when final photography is ready.
  return <div className={"media-placeholder " + className} role={src ? undefined : "img"} aria-label={src ? undefined : t("Bildplatzhalter: ") + t(label)}>
    {src ? <Image src={src} alt={t(label)} fill sizes="(max-width: 700px) 100vw, 50vw" priority={priority} /> : <><div className="media-grid" /><span className="media-label"><Icon name="image" /><span>{t(label)}<small>{t("Foto folgt")}</small></span></span></>}
  </div>;
}
