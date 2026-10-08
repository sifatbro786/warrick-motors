import { cacheLife, cacheTag } from "next/cache";
import * as content from "@/lib/data/content";
import { brands } from "@/lib/data/brands";
import * as legal from "@/lib/data/legal";

/**
 * MARKETING CONTENT ACCESS LAYER — same pattern as car.service.js.
 * Admin later: swap these bodies for Mongo reads and call revalidateTag(CONTENT_TAG).
 */
export const CONTENT_TAG = "content";

async function read(key) {
    "use cache";
    cacheTag(CONTENT_TAG);
    cacheLife("hours");
    return content[key];
}

export const getHeroSlides = () => read("heroSlides");
export const getCompanyStats = () => read("companyStats");
export const getBrandShowcase = () => read("brandShowcase");
export const getWhyWarrick = async () => ({
    points: await read("whyWarrick"),
    image: await read("whyImage"),
});
export const getShowroomImage = () => read("showroomImage");
export const getDeliveries = () => read("deliveries");
export const getTestimonials = () => read("testimonials");
export const getFaqs = () => read("faqs");

/** Brand registry (logo/monogram/origin). `names` limits to brands present in inventory. */
export async function getBrands(names) {
    "use cache";
    cacheTag(CONTENT_TAG);
    cacheLife("hours");
    return names ? brands.filter((b) => names.includes(b.name)) : brands;
}

/** Legal pages ("terms" | "privacy"). */
export async function getLegalPage(key) {
    "use cache";
    cacheTag(CONTENT_TAG, `legal:${key}`);
    cacheLife("days");
    return legal[key] || null;
}
