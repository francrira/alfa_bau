import { notFound } from "next/navigation";
import { pageRegistry } from "@/components/pages/PageRegistry";
import ServiceDetail from "@/components/pages/ServiceDetail";
import { services } from "@/lib/site";
import { routeMetadata } from "@/lib/routes";
export const dynamicParams = false;
export function generateStaticParams() { return [...Object.keys(pageRegistry).map(route => ({ path: route ? route.split("/") : [] })), ...services.map(service => ({ path: ["leistungen", service.slug] }))]; }
export async function generateMetadata({ params }: { params: Promise<{ path?: string[] }> }) { const { path = [] } = await params; return routeMetadata("en", path.join("/")); }
export default async function EnglishPage({ params }: { params: Promise<{ path?: string[] }> }) { const { path = [] } = await params; const route = path.join("/"); const Page = pageRegistry[route as keyof typeof pageRegistry]; if (Page) return <Page />; if (path.length === 2 && path[0] === "leistungen" && services.some(service => service.slug === path[1])) return <ServiceDetail slug={path[1]} />; notFound(); }
