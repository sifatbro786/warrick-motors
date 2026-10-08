"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { useCarFilters, countActiveFilters } from "@/lib/hooks/useCarFilters";
import { BUDGET_RANGES, STOCK_STATUS_META } from "@/lib/constants/inventory";
import { EASE } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils/format";

/**
 * Inventory filters. Desktop: sticky sidebar. Mobile: "Filters" button → sheet.
 * Every control writes to the URL (useCarFilters), so the server page re-renders
 * the results. `options` comes from getFilterOptions() — no hardcoded facets.
 */
export default function CarFilterSidebar({ options }) {
    const state = useCarFilters();
    const [open, setOpen] = useState(false);
    const active = countActiveFilters(state.filters);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    return (
        <>
            {/* Mobile trigger */}
            <div className="lg:hidden">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-ink-900 px-5 text-sm font-semibold text-white"
                >
                    <Icon name="sliders" size={18} />
                    Filters
                    {active > 0 && (
                        <span className="nums rounded-full bg-gold-400 px-2 py-0.5 text-[11px] text-ink-900">
                            {active}
                        </span>
                    )}
                </button>
            </div>

            {/* Desktop sidebar */}
            <aside aria-label="Filter cars" className="hidden lg:block">
                <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-card border border-line bg-white px-7 pt-6 pb-2 shadow-card no-scrollbar">
                    <FilterPanel {...state} options={options} active={active} />
                </div>
            </aside>

            {/* Mobile sheet */}
            <AnimatePresence>
                {open && (
                    <m.div
                        className="fixed inset-0 z-70 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button
                            type="button"
                            aria-label="Close filters"
                            onClick={() => setOpen(false)}
                            className="absolute inset-0 bg-ink-950/60"
                        />
                        <m.div
                            role="dialog"
                            aria-modal="true"
                            aria-label="Filter cars"
                            initial={{ y: "100%" }}
                            animate={{
                                y: 0,
                                transition: { duration: 0.5, ease: EASE },
                            }}
                            exit={{
                                y: "100%",
                                transition: { duration: 0.3, ease: "easeIn" },
                            }}
                            className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-3xl bg-white"
                        >
                            <div className="flex items-center justify-between border-b border-line px-5 py-4">
                                <span
                                    className="mx-auto h-1 w-10 rounded-full bg-line-strong"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="flex-1 overflow-y-auto px-6 pb-6">
                                <FilterPanel {...state} options={options} active={active} />
                            </div>
                            <div className="border-t border-line p-4">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-crimson-600 text-[15px] font-semibold text-white"
                                >
                                    {state.pending ? "Updating…" : "Show results"}
                                </button>
                            </div>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
}

function FilterPanel({ filters, update, toggleInList, reset, pending, options, active }) {
    const yearOptions = range(options.yearRange[0], options.yearRange[1]).reverse();
    const singleBrand = filters.brands.length === 1 ? filters.brands[0] : null;
    const models = singleBrand ? options.modelsByBrand[singleBrand] || [] : [];

    return (
        <div
            className={cn("transition-opacity", pending && "opacity-70")}
            aria-busy={pending || undefined}
        >
            <div className="flex items-center justify-between border-b border-line pt-1 pb-5">
                <p className="font-display text-lg font-semibold text-ink-900">
                    Refine
                    {pending && (
                        <span className="ml-2 align-middle text-[11px] font-medium text-ink-500">
                            updating…
                        </span>
                    )}
                </p>
                {active > 0 && (
                    <button
                        type="button"
                        onClick={reset}
                        className="cursor-pointer text-[13px] font-semibold text-crimson-600 hover:text-crimson-700"
                    >
                        Clear all ({active})
                    </button>
                )}
            </div>

            <Group legend="Availability">
                <div className="grid gap-1.5">
                    <RadioRow
                        name="status"
                        label="All stock"
                        count={options.counts.total}
                        checked={!filters.statusKey}
                        onChange={() => update({ statusKey: null })}
                    />
                    {Object.entries(STOCK_STATUS_META).map(([status, m]) => (
                        <RadioRow
                            key={m.key}
                            name="status"
                            label={m.short}
                            tone={m.tone}
                            count={options.counts.byStatus[status] || 0}
                            checked={filters.statusKey === m.key}
                            onChange={() => update({ statusKey: m.key })}
                        />
                    ))}
                </div>
            </Group>

            <Group legend="Budget">
                <div className="grid gap-1.5">
                    <RadioRow
                        name="budget"
                        label="Any budget"
                        checked={!filters.budgetKey}
                        onChange={() => update({ budgetKey: null })}
                    />
                    {BUDGET_RANGES.map((b) => (
                        <RadioRow
                            key={b.key}
                            name="budget"
                            label={b.label}
                            checked={filters.budgetKey === b.key}
                            onChange={() => update({ budgetKey: b.key })}
                        />
                    ))}
                </div>
            </Group>

            <Group legend="Brand">
                <div className="grid gap-1">
                    {options.brands.map((b) => (
                        <label
                            key={b}
                            className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-1.5 text-[14px] text-ink-700 hover:bg-paper"
                        >
                            <span className="flex items-center gap-2.5">
                                <input
                                    type="checkbox"
                                    checked={filters.brands.includes(b)}
                                    onChange={() => {
                                        // model only makes sense for a single brand — drop it when brands change
                                        const next = filters.brands.includes(b)
                                            ? filters.brands.filter((x) => x !== b)
                                            : [...filters.brands, b];
                                        update({ brands: next, model: null });
                                    }}
                                    className="h-4 w-4 cursor-pointer accent-ink-900"
                                />
                                {b}
                            </span>
                            <span className="nums text-[12px] text-ink-500">
                                {options.counts.byBrand[b]}
                            </span>
                        </label>
                    ))}
                </div>
                {singleBrand && models.length > 0 && (
                    <div className="mt-3">
                        <label
                            className="text-[11px] font-semibold tracking-[0.12em] text-ink-500 uppercase"
                            htmlFor="filter-model"
                        >
                            {singleBrand} model
                        </label>
                        <SelectBox
                            id="filter-model"
                            value={filters.model || ""}
                            onChange={(v) => update({ model: v || null })}
                        >
                            <option value="">All models</option>
                            {models.map((m) => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </SelectBox>
                    </div>
                )}
            </Group>

            <Group legend="Body style">
                <ChipSet
                    values={options.bodyTypes}
                    selected={filters.bodyTypes}
                    onToggle={(v) => toggleInList("bodyTypes", v)}
                />
            </Group>

            <Group legend="Fuel type">
                <ChipSet
                    values={options.fuelTypes}
                    selected={filters.fuelTypes}
                    onToggle={(v) => toggleInList("fuelTypes", v)}
                />
            </Group>

            <Group legend="Manufacturing year" last>
                <div className="grid grid-cols-2 gap-2">
                    <SelectBox
                        ariaLabel="Year from"
                        value={filters.yearMin || ""}
                        onChange={(v) => update({ yearMin: v ? Number(v) : null })}
                    >
                        <option value="">From</option>
                        {yearOptions.map((y) => (
                            <option
                                key={y}
                                value={y}
                                disabled={filters.yearMax && y > filters.yearMax}
                            >
                                {y}
                            </option>
                        ))}
                    </SelectBox>
                    <SelectBox
                        ariaLabel="Year to"
                        value={filters.yearMax || ""}
                        onChange={(v) => update({ yearMax: v ? Number(v) : null })}
                    >
                        <option value="">To</option>
                        {yearOptions.map((y) => (
                            <option
                                key={y}
                                value={y}
                                disabled={filters.yearMin && y < filters.yearMin}
                            >
                                {y}
                            </option>
                        ))}
                    </SelectBox>
                </div>
            </Group>
        </div>
    );
}

function Group({ legend, children, last = false }) {
    // div+role=group instead of <fieldset>/<legend>: legends ignore fieldset padding and
    // were rendering flush against the dashed divider above them.
    const id = `filter-${legend.toLowerCase().replace(/[^a-z]+/g, "-")}`;
    return (
        <div
            role="group"
            aria-labelledby={id}
            className={cn("py-6", !last && "border-b border-dashed border-line")}
        >
            <p
                id={id}
                className="mb-3.5 text-[11px] font-semibold tracking-[0.14em] text-ink-500 uppercase"
            >
                {legend}
            </p>
            {children}
        </div>
    );
}

const DOT = {
    ready: "bg-ready",
    transit: "bg-transit",
    preorder: "bg-preorder",
};

function RadioRow({ name, label, count, checked, onChange, tone }) {
    return (
        <label
            className={cn(
                "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-[14px] transition-colors",
                checked ? "bg-ink-900 text-white" : "text-ink-700 hover:bg-paper",
            )}
        >
            <span className="flex items-center gap-2.5">
                <input
                    type="radio"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="sr-only"
                />
                <span
                    aria-hidden="true"
                    className={cn(
                        "h-2 w-2 rounded-full",
                        tone ? DOT[tone] : checked ? "bg-gold-400" : "border border-line-strong",
                    )}
                />
                {label}
            </span>
            {count != null && (
                <span
                    className={cn("nums text-[12px]", checked ? "text-gold-300" : "text-ink-500")}
                >
                    {count}
                </span>
            )}
        </label>
    );
}

function ChipSet({ values, selected, onToggle }) {
    return (
        <div className="flex flex-wrap gap-2">
            {values.map((v) => {
                const on = selected.includes(v);
                return (
                    <button
                        key={v}
                        type="button"
                        aria-pressed={on}
                        onClick={() => onToggle(v)}
                        className={cn(
                            "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                            on
                                ? "border-ink-900 bg-ink-900 text-white"
                                : "border-line-strong text-ink-700 hover:border-ink-900",
                        )}
                    >
                        {on && <Icon name="check" size={13} />}
                        {v}
                    </button>
                );
            })}
        </div>
    );
}

function SelectBox({ id, value, onChange, children, ariaLabel }) {
    return (
        <div className="relative mt-1.5">
            <select
                id={id}
                aria-label={ariaLabel}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-line-strong bg-white pr-9 pl-3.5 text-[14px] text-ink-900 outline-none focus:border-ink-900"
            >
                {children}
            </select>
            <Icon
                name="chevron-down"
                size={16}
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-ink-400"
            />
        </div>
    );
}

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
