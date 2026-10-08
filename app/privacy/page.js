import LegalPage from "@/components/legal/LegalPage";
import { getLegalPage } from "@/lib/services/content.service";
import { buildMetadata } from "@/lib/seo/metadata";

export const generateMetadata = () => buildMetadata({ key: "privacy", path: "/privacy" });

export default async function Page() {
    const doc = await getLegalPage("privacy");
    return <LegalPage doc={doc} path="/privacy" />;
}
