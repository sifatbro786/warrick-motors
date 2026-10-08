import { cacheLife, cacheTag } from "next/cache";
import { pageSeo, seoDefaults } from "@/lib/data/seo";

/** SEO data access. Admin later: read SeoSettings/PageSeo from Mongo; revalidateTag(SEO_TAG) on save. */
export const SEO_TAG = "seo";

export async function getSeoDefaults() {
    "use cache";
    cacheTag(SEO_TAG);
    cacheLife("days");
    return seoDefaults;
}

export async function getPageSeo(key) {
    "use cache";
    cacheTag(SEO_TAG, `seo:${key}`);
    cacheLife("days");
    return pageSeo[key] || null;
}
