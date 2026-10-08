/**
 * Remote-image loaders: let the photo CDN resize/encode the image itself
 * instead of routing it through our /_next/image optimizer. The optimizer had
 * to download multi-MB originals from Unsplash and timed out (504 after 7s)
 * on slower connections; the CDN serves the exact width directly and fast.
 * Local files (admin uploads under /public or /uploads) still use Next's optimizer.
 */

const UNSPLASH = "https://images.unsplash.com/";
const PEXELS = "https://images.pexels.com/";

export function unsplashLoader({ src, width, quality }) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality || 75));
    url.searchParams.set("auto", "format"); // AVIF/WebP when the browser supports it
    if (!url.searchParams.has("fit")) url.searchParams.set("fit", "crop");
    return url.toString();
}

export function pexelsLoader({ src, width }) {
    const url = new URL(src);
    url.searchParams.set("auto", "compress");
    url.searchParams.set("cs", "tinysrgb");
    url.searchParams.set("w", String(width));
    return url.toString();
}

/** Pick a loader for a src, or undefined → default Next.js optimizer. */
export function loaderFor(src) {
    if (typeof src !== "string") return undefined;
    if (src.startsWith(UNSPLASH)) return unsplashLoader;
    if (src.startsWith(PEXELS)) return pexelsLoader;
    return undefined;
}
