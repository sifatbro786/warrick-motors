import { getCars } from "@/lib/services/car.service";
import { absoluteUrl } from "@/lib/seo/metadata";

/** Static routes + every car. Admin later: car.updatedAt drives lastModified. */
export default async function sitemap() {
    const { items } = await getCars({ pageSize: 1000 });
    const staticRoutes = [
        { path: "/", priority: 1, changeFrequency: "daily" },
        { path: "/cars", priority: 0.9, changeFrequency: "daily" },
        { path: "/pre-order", priority: 0.7, changeFrequency: "monthly" },
        { path: "/showroom", priority: 0.7, changeFrequency: "monthly" },
        { path: "/about", priority: 0.5, changeFrequency: "yearly" },
        { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
        { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
        { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    ];

    return [
        ...staticRoutes.map((r) => ({
            url: absoluteUrl(r.path),
            changeFrequency: r.changeFrequency,
            priority: r.priority,
        })),
        ...items.map((car) => ({
            url: absoluteUrl(`/cars/${car.slug}`),
            lastModified: car.updatedAt || car.createdAt,
            changeFrequency: "weekly",
            priority: 0.8,
            images: car.images?.slice(0, 3).map((i) => i.src),
        })),
    ];
}
