import { absoluteUrl } from "@/lib/seo/metadata";

export default function robots() {
    // Vercel preview deployments must never be indexed (duplicate content).
    if (process.env.VERCEL_ENV === "preview") {
        return { rules: [{ userAgent: "*", disallow: "/" }] };
    }
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
