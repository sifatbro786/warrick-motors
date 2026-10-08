// Headers live here (not in vercel.json) so they behave the same on Vercel and on a VPS.
const securityHeaders = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
    },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

// Un-hashed files in /public: cache a week, then revalidate in the background.
// (Replacing a logo keeps working; a new filename busts it immediately.)
const publicAssetCache = [
    { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        agentFeedback: true,
        // inlineCss tested and left OFF: it duplicates the CSS into the RSC payload (+13KB gzip per page)
        // and loses cross-page CSS caching. A single cached ~12KB CSS file is the better trade.
    },
    poweredByHeader: false,
    async headers() {
        return [
            { source: "/:path*", headers: securityHeaders },
            { source: "/brands/:file*", headers: publicAssetCache },
            {
                source: "/:file(icon-192.png|icon-512.png|icon-maskable-512.png|logo.png|warrick.jpeg)",
                headers: publicAssetCache,
            },
        ];
    },
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
