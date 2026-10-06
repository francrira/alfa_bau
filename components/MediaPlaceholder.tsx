"use client";
import { useTranslation } from "@/components/LanguageProvider";
import Image from "next/image";
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
    {imageSrc ? <picture>
      {photo && <source type="image/webp" srcSet={photo.smallSrc + " 640w, " + photo.src + " 1280w"} sizes={sizes} />}
      <Image src={imageSrc} alt={decorative ? "" : t(photo?.alt ?? label)} fill sizes={sizes} priority={priority} style={{ objectPosition: photo?.position ?? "50% 50%" }} />
    </picture> : <><div className="media-grid" /><span className="media-label"><Icon name="image" /><span>{t(label)}<small>{t("Foto folgt")}</small></span></span></>}
    {photo?.generated && <span className="media-disclosure">{t("KI-generiertes Symbolbild")}</span>}
  </div>;
}
