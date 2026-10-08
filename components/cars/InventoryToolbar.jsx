"use client";

import Icon from "@/components/ui/Icon";
import { useCarFilters } from "@/lib/hooks/useCarFilters";
import {
    BUDGET_RANGES,
    SORT_OPTIONS,
    STOCK_STATUS_META,
    STATUS_BY_KEY,
} from "@/lib/constants/inventory";
import { cn } from "@/lib/utils/format";

/** Result count, removable active-filter pills, and sort. */
export default function InventoryToolbar({ total, from, to }) {
    const { filters, update, toggleInList, pending } = useCarFilters();

    const pills = [
        filters.statusKey && {
            label: STOCK_STATUS_META[STATUS_BY_KEY[filters.statusKey]]?.short,
            clear: () => update({ statusKey: null }),
        },
        filters.budgetKey && {
            label: BUDGET_RANGES.find((b) => b.key === filters.budgetKey)?.label,
            clear: () => update({ budgetKey: null }),
        },
        ...filters.brands.map((b) => ({
            label: b,
            clear: () => update({ brands: filters.brands.filter((x) => x !== b), model: null }),
        })),
        filters.model && { label: filters.model, clear: () => update({ model: null }) },
        ...filters.bodyTypes.map((v) => ({ label: v, clear: () => toggleInList("bodyTypes", v) })),
        ...filters.fuelTypes.map((v) => ({ label: v, clear: () => toggleInList("fuelTypes", v) })),
        filters.yearMin && {
            label: `From ${filters.yearMin}`,
            clear: () => update({ yearMin: null }),
        },
        filters.yearMax && {
            label: `To ${filters.yearMax}`,
            clear: () => update({ yearMax: null }),
        },
        filters.q && { label: `“${filters.q}”`, clear: () => update({ q: null }) },
    ].filter(Boolean);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[14px] text-ink-500" aria-live="polite">
                    {total > 0 ? (
                        <>
                            Showing{" "}
                            <span className="nums font-semibold text-ink-900">
                                {from}–{to}
                            </span>{" "}
                            of <span className="nums font-semibold text-ink-900">{total}</span> cars
                        </>
                    ) : (
                        "No cars match these filters"
                    )}
                    {pending && <span className="ml-2 text-ink-500">· updating…</span>}
                </p>
                <label className="relative flex items-center gap-2 text-[13px] text-ink-500">
                    <span className="hidden sm:inline">Sort by</span>
                    <select
                        aria-label="Sort cars"
                        value={filters.sort}
                        onChange={(e) => update({ sort: e.target.value })}
                        className="h-10 cursor-pointer appearance-none rounded-full border border-line-strong bg-white pr-9 pl-4 text-[13.5px] font-medium text-ink-900 outline-none focus:border-ink-900"
                    >
                        {SORT_OPTIONS.map((o) => (
                            <option key={o.key} value={o.key}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                    <Icon
                        name="chevron-down"
                        size={15}
                        className="pointer-events-none absolute right-3.5 text-ink-400"
                    />
                </label>
            </div>

            {pills.length > 0 && (
                <ul className="flex flex-wrap gap-2" aria-label="Active filters">
                    {pills.map((p) => (
                        <li key={p.label}>
                            <button
                                type="button"
                                onClick={p.clear}
                                className={cn(
                                    "group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-ink-900/15 bg-white py-1 pr-2 pl-3 text-[12.5px] font-medium text-ink-800 transition-colors hover:border-crimson-600 hover:text-crimson-700",
                                )}
                            >
                                {p.label}
                                <Icon
                                    name="close"
                                    size={13}
                                    className="text-ink-400 group-hover:text-crimson-600"
                                />
                                <span className="sr-only">Remove filter</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
