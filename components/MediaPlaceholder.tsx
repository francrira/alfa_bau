"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Icon from "./Icon";
import type { SitePhoto } from "@/lib/photos";

type Props = {
  label: string;
  className?: string;
  src?: string;
  photo?: SitePhoto;
  priority?: boolean;
  decorative?: boolean;
  sizes?: string;
};

export default function MediaPlaceholder({ label, className = "", src, photo, priority = false, decorative = false, sizes = "(max-width: 650px) 100vw, 50vw" }: Props) {
  const { t } = useTranslation();
  const imageSrc = photo?.src ?? src;
  return <div className={"media-placeholder " + (imageSrc ? "has-photo " : "") + className} role={imageSrc ? undefined : "img"} aria-label={imageSrc ? undefined : t("Bildplatzhalter: ") + t(label)}>
    {imageSrc ? <img src={imageSrc} srcSet={photo ? photo.smallSrc + " 640w, " + photo.src + " 1280w" : undefined}
      alt={decorative ? "" : t(photo?.alt ?? label)} sizes={sizes} loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"} decoding="async" style={{ objectPosition: photo?.position ?? "50% 50%" }} />
      : <><div className="media-grid" /><span className="media-label"><Icon name="image" /><span>{t(label)}<small>{t("Foto folgt")}</small></span></span></>}
    {photo?.generated && <span className="media-disclosure">{t("KI-generiertes Symbolbild")}</span>}
  </div>;
}
