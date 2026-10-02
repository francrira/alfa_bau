import SiteDocument from "@/components/SiteDocument";
import NotFoundPage from "@/components/pages/NotFoundPage";
export const metadata = { title: "404 | ALFA66" };
export default function GlobalNotFound() {
  return <SiteDocument locale="de"><NotFoundPage /><p className="container" lang="en">Page not found. <a href="/en/">Go to the English homepage</a>.</p></SiteDocument>;
}