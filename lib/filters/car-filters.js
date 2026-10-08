import { BUDGET_RANGES, STATUS_BY_KEY, SORT_OPTIONS } from "@/lib/constants/inventory";

/**
 * URL <-> filter object contract for /cars.
 * Pure + framework-free so the same parser can validate input in a future
 * `app/api/cars/route.js` or Server Action (treat every param as untrusted).
 *
 * Query params:
 *   brand=Toyota,Lexus  model=Harrier  body=SUV,Sedan  fuel=Hybrid
 *   yearMin=2020 yearMax=2023  budget=30-60 | priceMin= priceMax=
 *   status=ready|shipment|pre-order  q=free text  sort=price-asc  page=1
 */

const MAX_LIST = 10;
const MAX_TEXT = 60;

const toList = (v) =>
    String(v ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, MAX_LIST);

const toInt = (v) => {
    const n = Number.parseInt(v, 10);
    return Number.isFinite(n) && n >= 0 ? n : null;
};

const first = (v) => (Array.isArray(v) ? v[0] : v);

export function parseCarFilters(searchParams = {}) {
    const get = (k) => first(searchParams[k]);

    const budget = BUDGET_RANGES.find((b) => b.key === get("budget")) || null;
    const statusKey = get("status");
    const sort = SORT_OPTIONS.some((s) => s.key === get("sort")) ? get("sort") : "newest";

    return {
        brands: toList(get("brand")),
        model: (get("model") || "").slice(0, MAX_TEXT).trim() || null,
        bodyTypes: toList(get("body")),
        fuelTypes: toList(get("fuel")),
        yearMin: toInt(get("yearMin")),
        yearMax: toInt(get("yearMax")),
        priceMin: budget ? budget.min : toInt(get("priceMin")),
        priceMax: budget ? (Number.isFinite(budget.max) ? budget.max : null) : toInt(get("priceMax")),
        budgetKey: budget?.key || null,
        status: STATUS_BY_KEY[statusKey] || null,
        statusKey: STATUS_BY_KEY[statusKey] ? statusKey : null,
        q: (get("q") || "").slice(0, MAX_TEXT).trim() || null,
        sort,
        page: Math.max(1, toInt(get("page")) || 1),
    };
}

/** Inverse of parseCarFilters — produces a clean query string (omits defaults). */
export function serializeCarFilters(filters) {
    const p = new URLSearchParams();
    if (filters.brands?.length) p.set("brand", filters.brands.join(","));
    if (filters.model) p.set("model", filters.model);
    if (filters.bodyTypes?.length) p.set("body", filters.bodyTypes.join(","));
    if (filters.fuelTypes?.length) p.set("fuel", filters.fuelTypes.join(","));
    if (filters.yearMin) p.set("yearMin", String(filters.yearMin));
    if (filters.yearMax) p.set("yearMax", String(filters.yearMax));
    if (filters.budgetKey) p.set("budget", filters.budgetKey);
    if (filters.statusKey) p.set("status", filters.statusKey);
    if (filters.q) p.set("q", filters.q);
    if (filters.sort && filters.sort !== "newest") p.set("sort", filters.sort);
    if (filters.page > 1) p.set("page", String(filters.page));
    const qs = p.toString();
    return qs ? `?${qs}` : "";
}
