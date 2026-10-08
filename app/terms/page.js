import LegalPage from "@/components/legal/LegalPage";
import { getLegalPage } from "@/lib/services/content.service";
import { buildMetadata } from "@/lib/seo/metadata";

export const generateMetadata = () => buildMetadata({ key: "terms", path: "/terms" });

export default async function Page() {
    const doc = await getLegalPage("terms");
    return <LegalPage doc={doc} path="/terms" />;
}
