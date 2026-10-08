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
        icons: [
            { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
            { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
            {
                src: "/icon-maskable-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
    };
}
