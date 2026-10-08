"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseCarFilters, serializeCarFilters } from "@/lib/filters/car-filters";

/**
 * URL-backed filter state for /cars. The URL is the single source of truth, so
 * filters are shareable, back-button friendly and readable by the server page.
 * Must be used under a <Suspense> boundary (useSearchParams + Cache Components).
 */
export function useCarFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [pending, startTransition] = useTransition();

    const filters = parseCarFilters(Object.fromEntries(searchParams.entries()));

    const apply = (next) => {
        startTransition(() => {
            router.replace(`${pathname}${serializeCarFilters(next)}`, { scroll: false });
        });
    };

    /** Merge a patch; any filter change resets to page 1. */
    const update = (patch) => apply({ ...filters, ...patch, page: 1 });

    const toggleInList = (key, value) => {
        const list = filters[key] || [];
        update({ [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] });
    };

    const reset = () => apply({ sort: filters.sort, page: 1 });

    return { filters, update, toggleInList, reset, pending };
}

/** Number of active (non-sort/page) filters — for the mobile "Filters (3)" button. */
export function countActiveFilters(f) {
    return (
        (f.brands?.length || 0) +
        (f.model ? 1 : 0) +
        (f.bodyTypes?.length || 0) +
        (f.fuelTypes?.length || 0) +
        (f.yearMin ? 1 : 0) +
        (f.yearMax ? 1 : 0) +
        (f.budgetKey ? 1 : 0) +
        (f.statusKey ? 1 : 0) +
        (f.q ? 1 : 0)
    );
}
