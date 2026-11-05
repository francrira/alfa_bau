import { ImpressumPage } from "@/components/pages/LegalPages";
import { routeMetadata } from "@/lib/routes";
export const metadata = routeMetadata("de", "impressum");
export default function GermanPage() { return <ImpressumPage />; }
