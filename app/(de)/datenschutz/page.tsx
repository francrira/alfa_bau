import { PrivacyPage } from "@/components/pages/LegalPages";
import { routeMetadata } from "@/lib/routes";
export const metadata = routeMetadata("de", "datenschutz");
export default function GermanPage() { return <PrivacyPage />; }
