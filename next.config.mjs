/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        agentFeedback: true,
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
        // Mock inventory uses Unsplash/Pexels. Admin uploads later will be served from /uploads (local) —
        // add the CDN/S3 host here when that lands.
        remotePatterns: [
            { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
            { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
        ],
    },
};

export default nextConfig;
