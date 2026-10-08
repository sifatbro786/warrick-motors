/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        agentFeedback: true,
        // inlineCss tested and left OFF: it duplicates the CSS into the RSC payload (+13KB gzip per page)
        // and loses cross-page CSS caching. A single cached ~12KB CSS file is the better trade.
    },
    poweredByHeader: false,
    cacheComponents: true,
    partialPrefetching: true,
    reactCompiler: true,
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },
    images: {
        // Next 16: `qualities` is required. Keep the list short — every value is a cache variant.
        qualities: [60, 75, 85],
        formats: ["image/avif", "image/webp"],
        // Optimised images are cached 30 days (stock photos rarely change; admin uploads get new filenames).
        minimumCacheTTL: 60 * 60 * 24 * 30,
        // Mock inventory uses Unsplash/Pexels. Admin uploads later will be served from /uploads (local) —
        // add the CDN/S3 host here when that lands.
        remotePatterns: [
            { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
            { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
        ],
    },
};

export default nextConfig;
