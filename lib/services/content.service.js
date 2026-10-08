import { cacheLife, cacheTag } from "next/cache";
import * as content from "@/lib/data/content";

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
export const getWhyWarrick = async () => ({ points: await read("whyWarrick"), image: await read("whyImage") });
export const getShowroomImage = () => read("showroomImage");
export const getDeliveries = () => read("deliveries");
export const getTestimonials = () => read("testimonials");
