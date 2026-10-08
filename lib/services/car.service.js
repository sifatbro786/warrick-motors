import { cacheLife, cacheTag } from "next/cache";
import { cars as mockCars } from "@/lib/data/cars";
import { STOCK_STATUS, FUEL_TYPES, BODY_TYPES } from "@/lib/constants/inventory";

/**
 * CAR DATA ACCESS LAYER
 * ---------------------------------------------------------------------------
 * The ONLY module that knows where car data comes from. Pages/components call
 * these async functions and never import lib/data/* directly.
 *
 * MongoDB migration = replace the body of `source()` + the query helpers with
 * Mongoose calls (Car.find(query).sort().lean()), keep the signatures. Admin
 * mutations then call `revalidateTag(CARS_TAG)` / `updateTag(CARS_TAG)` and
 * every cached read below refreshes automatically.
 */

export const CARS_TAG = "cars";
export const PAGE_SIZE = 12;

async function source() {
    // Mongo later: await connectDB(); return Car.find({ isPublished: true }).lean()
    return mockCars;
}

const SORTERS = {
    newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    "year-desc": (a, b) => b.year - a.year || b.createdAt.localeCompare(a.createdAt),
    "mileage-asc": (a, b) => a.mileage - b.mileage,
};

function matches(car, f) {
    if (f.brands?.length && !f.brands.includes(car.brand)) return false;
    if (f.model && car.model.toLowerCase() !== f.model.toLowerCase()) return false;
    if (f.bodyTypes?.length && !f.bodyTypes.includes(car.bodyType)) return false;
    if (f.fuelTypes?.length && !f.fuelTypes.includes(car.fuelType)) return false;
    if (f.yearMin && car.year < f.yearMin) return false;
    if (f.yearMax && car.year > f.yearMax) return false;
    if (f.priceMin != null && car.price < f.priceMin) return false;
    if (f.priceMax != null && car.price > f.priceMax) return false;
    if (f.status && car.stockStatus !== f.status) return false;
    if (f.q) {
        const hay =
            `${car.title} ${car.brand} ${car.model} ${car.grade} ${car.stockNo}`.toLowerCase();
        if (
            !f.q
                .toLowerCase()
                .split(/\s+/)
                .every((t) => hay.includes(t))
        )
            return false;
    }
    return true;
}

/**
 * Filtered + sorted + paginated listing.
 * @param {ReturnType<import('@/lib/filters/car-filters').parseCarFilters>} filters
 * @returns {Promise<{ items: object[], total: number, page: number, pageCount: number }>}
 */
export async function getCars(filters = {}) {
    "use cache";
    cacheTag(CARS_TAG);
    cacheLife("hours");

    const all = await source();
    const list = all
        .filter((c) => matches(c, filters))
        .sort(SORTERS[filters.sort] || SORTERS.newest);
    const pageSize = filters.pageSize || PAGE_SIZE;
    const pageCount = Math.max(1, Math.ceil(list.length / pageSize));
    const page = Math.min(Math.max(1, filters.page || 1), pageCount);

    return {
        items: list.slice((page - 1) * pageSize, page * pageSize),
        total: list.length,
        page,
        pageCount,
    };
}

/** Resolve by slug (canonical URL) or by id/stock number (legacy links, admin). */
export async function getCarById(idOrSlug) {
    "use cache";
    cacheTag(CARS_TAG, `car:${idOrSlug}`);
    cacheLife("hours");

    const key = String(idOrSlug || "").toLowerCase();
    const all = await source();
    return (
        all.find((c) => c.slug === key || c.id === key || c.stockNo.toLowerCase() === key) || null
    );
}

export async function getFeaturedCars(limit = 8) {
    "use cache";
    cacheTag(CARS_TAG);
    cacheLife("hours");

    const all = await source();
    return all
        .filter((c) => c.isFeatured)
        .sort(SORTERS.newest)
        .slice(0, limit);
}

/** Cars grouped by stock status — powers the home page status tabs. */
export async function getCarsByStatus(limitPerStatus = 4) {
    "use cache";
    cacheTag(CARS_TAG);
    cacheLife("hours");

    const all = (await source()).slice().sort(SORTERS.newest);
    return Object.values(STOCK_STATUS).reduce((acc, status) => {
        const list = all.filter((c) => c.stockStatus === status);
        acc[status] = { items: list.slice(0, limitPerStatus), total: list.length };
        return acc;
    }, {});
}

export async function getRelatedCars(car, limit = 3) {
    "use cache";
    cacheTag(CARS_TAG);
    cacheLife("hours");

    if (!car) return [];
    const all = await source();
    const score = (c) =>
        (c.brand === car.brand ? 2 : 0) +
        (c.bodyType === car.bodyType ? 2 : 0) +
        (Math.abs(c.price - car.price) < car.price * 0.35 ? 1 : 0);
    return all
        .filter((c) => c.id !== car.id)
        .map((c) => ({ c, s: score(c) }))
        .sort((a, b) => b.s - a.s)
        .slice(0, limit)
        .map(({ c }) => c);
}

/** Facets for filter UIs — derived from live inventory so empty options never show. */
export async function getFilterOptions() {
    "use cache";
    cacheTag(CARS_TAG);
    cacheLife("hours");

    const all = await source();
    const uniq = (arr) => [...new Set(arr)];
    const brands = uniq(all.map((c) => c.brand)).sort();
    const modelsByBrand = Object.fromEntries(
        brands.map((b) => [b, uniq(all.filter((c) => c.brand === b).map((c) => c.model)).sort()]),
    );
    const years = all.map((c) => c.year);
    const prices = all.map((c) => c.price);

    return {
        brands,
        modelsByBrand,
        bodyTypes: BODY_TYPES.filter((t) => all.some((c) => c.bodyType === t)),
        fuelTypes: FUEL_TYPES.filter((t) => all.some((c) => c.fuelType === t)),
        yearRange: [Math.min(...years), Math.max(...years)],
        priceRange: [Math.min(...prices), Math.max(...prices)],
        counts: {
            total: all.length,
            byStatus: Object.fromEntries(
                Object.values(STOCK_STATUS).map((s) => [
                    s,
                    all.filter((c) => c.stockStatus === s).length,
                ]),
            ),
            byBrand: Object.fromEntries(
                brands.map((b) => [b, all.filter((c) => c.brand === b).length]),
            ),
        },
    };
}

/** For generateStaticParams on /cars/[id] */
export async function getAllCarSlugs() {
    "use cache";
    cacheTag(CARS_TAG);
    const all = await source();
    return all.map((c) => c.slug);
}
