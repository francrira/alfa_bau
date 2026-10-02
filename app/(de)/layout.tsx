import type { ReactNode } from "react";
import SiteDocument from "@/components/SiteDocument";
import { layoutMetadata } from "@/lib/routes";
export const metadata = layoutMetadata("de");
export default function Layout({ children }: { children: ReactNode }) { return <SiteDocument locale="de">{children}</SiteDocument>; }
