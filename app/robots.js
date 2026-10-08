import { absoluteUrl } from "@/lib/seo/metadata";

export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                // /admin and /api are reserved for the dashboard phase
                disallow: ["/admin", "/api/"],
            },
        ],
        sitemap: absoluteUrl("/sitemap.xml"),
        host: absoluteUrl("/"),
    };
}
