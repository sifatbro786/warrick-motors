import { siteConfig } from "@/lib/config/site";

export default function manifest() {
    return {
        name: siteConfig.name,
        short_name: "Warrick",
        description: siteConfig.tagline,
        start_url: "/",
        display: "standalone",
        background_color: "#f1eee8",
        theme_color: "#0a111e",
        icons: [{ src: "/logo.png", sizes: "464x479", type: "image/png", purpose: "any" }],
    };
}
