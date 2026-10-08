import { getPageSeo, getSeoDefaults } from "@/lib/services/seo.service";
import { siteConfig } from "@/lib/config/site";
import { formatBDT, formatNumberBD } from "@/lib/utils/format";

/**
 * Build a Next.js Metadata object from the SEO registry.
 *   export const generateMetadata = () => buildMetadata({ key: "cars", path: "/cars" });
 * `overrides` wins over registry values (used for per-car SEO).
 */
export async function buildMetadata({ key, path = "/", overrides = {} } = {}) {
    const [defaults, page] = await Promise.all([getSeoDefaults(), key ? getPageSeo(key) : null]);
    const seo = { ...page, ...stripEmpty(overrides) };

    const title = seo.title || defaults.defaultTitle;
    const description = seo.description || defaults.description;
    const keywords = [...new Set([...(seo.keywords || []), ...defaults.keywords])];
    const images = seo.image ? [{ url: seo.image, alt: seo.imageAlt || title }] : undefined; // undefined → falls back to app/opengraph-image

    return {
        title: seo.absoluteTitle ? { absolute: title } : title,
        description,
        keywords,
        alternates: { canonical: path },
        robots: seo.noindex
            ? { index: false, follow: true }
            : { index: true, follow: true, "max-image-preview": "large" },
        openGraph: {
            type: seo.ogType || "website",
            url: path,
            siteName: defaults.siteName,
            locale: defaults.locale,
            title,
            description,
            ...(images ? { images } : {}),
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            ...(defaults.twitterHandle ? { site: defaults.twitterHandle } : {}),
            ...(images ? { images: images.map((i) => i.url) } : {}),
        },
    };
}

/** Per-car metadata: `car.seo` (admin-editable) → generated fallback. */
export function buildCarMetadata(car) {
    const generatedTitle = `${car.year} ${car.title} — ${formatBDT(car.price)}`;
    const generatedDescription =
        `${car.stockStatus} in ${car.location}. ${formatNumberBD(car.mileage)} km, ${
            car.engineCc ? `${car.engineCc} cc` : "electric"
        } ${car.fuelType.toLowerCase()}, ${car.transmission}. ${car.description}`.slice(0, 158);

    return buildMetadata({
        path: `/cars/${car.slug}`,
        overrides: {
            title: car.seo?.title || generatedTitle,
            description: car.seo?.description || generatedDescription,
            keywords: car.seo?.keywords || [
                `${car.brand} ${car.model} price in Bangladesh`,
                `${car.year} ${car.brand} ${car.model}`,
                `${car.model} ${car.fuelType.toLowerCase()} Dhaka`,
            ],
            image: car.images?.[0]?.src,
            imageAlt: car.images?.[0]?.alt,
            ogType: "website",
        },
    });
}

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString();

function stripEmpty(obj) {
    return Object.fromEntries(
        Object.entries(obj).filter(
            ([, v]) => v != null && v !== "" && !(Array.isArray(v) && !v.length),
        ),
    );
}
