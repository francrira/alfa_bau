import { notFound } from "next/navigation";
import ServiceDetail from "@/components/pages/ServiceDetail";
import { services } from "@/lib/site";
import { routeMetadata } from "@/lib/routes";
export const dynamicParams = false;
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return routeMetadata("de", "leistungen/" + slug); }
export default async function GermanService({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (!services.some(service => service.slug === slug)) notFound(); return <ServiceDetail slug={slug} />; }
