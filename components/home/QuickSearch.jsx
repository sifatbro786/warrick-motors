"use client";

import { useState } from "react";
import Form from "next/form";
import { m } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { BUDGET_RANGES, STOCK_STATUS_META } from "@/lib/constants/inventory";
import { cn } from "@/lib/utils/format";

const TABS = [
    { key: "", label: "All Stock" },
    ...Object.entries(STOCK_STATUS_META).map(([status, m]) => ({
        key: m.key,
        label: m.short,
        status,
    })),
];

/**
 * Hero search. A plain GET <Form action="/cars"> → works without JS, and with
 * JS Next does a client-side navigation. Query keys match parseCarFilters().
 */
export default function QuickSearch({
    brands = [],
    modelsByBrand = {},
    statusCounts = {},
    total = 0,
}) {
    const [status, setStatus] = useState("");
    const [brand, setBrand] = useState("");
    const models = brand ? modelsByBrand[brand] || [] : [];

    return (
        <div className="anim-fade-up relative" style={{ animationDelay: "700ms" }}>
            {/* Status tabs — sit on the card's top edge (rRw reference) */}
            <div
                role="group"
                aria-label="Filter by stock status"
                className="no-scrollbar flex overflow-x-auto"
            >
                {TABS.map((t) => {
                    const active = status === t.key;
                    const count = t.status ? statusCounts[t.status] : total;
                    return (
                        <button
                            key={t.label}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setStatus(t.key)}
                            className={cn(
                                "relative shrink-0 cursor-pointer px-4 py-3 text-[13px] font-medium transition-colors sm:px-5",
                                active ? "text-ink-900" : "text-white/75 hover:text-white",
                            )}
                        >
                            {active && (
                                <m.span
                                    layoutId="qs-tab"
                                    className="absolute inset-0 rounded-t-xl bg-white"
                                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                                />
                            )}
                            <span className="relative">
                                {t.label}
                                <span
                                    className={cn(
                                        "nums ml-1.5 text-[11px]",
                                        active ? "text-gold-600" : "text-white/45",
                                    )}
                                >
                                    {count}
                                </span>
                            </span>
                        </button>
                    );
                })}
            </div>

            <Form
                action="/cars"
                className={cn(
                    "grid overflow-hidden rounded-2xl bg-white shadow-float md:grid-cols-[1fr_1fr_1fr_auto]",
                    status === "" ? "rounded-tl-none" : "",
                )}
            >
                {status && <input type="hidden" name="status" value={status} />}

                <Field label="Brand" icon="car">
                    <select
                        name="brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="peer w-full cursor-pointer appearance-none bg-transparent text-[15px] font-medium text-ink-900 outline-none"
                    >
                        <option value="">Any brand</option>
                        {brands.map((b) => (
                            <option key={b} value={b}>
                                {b}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field label="Model" icon="sliders">
                    <select
                        key={brand /* reset selection when brand changes */}
                        name="model"
                        defaultValue=""
                        disabled={!brand}
                        className="w-full cursor-pointer appearance-none bg-transparent text-[15px] font-medium text-ink-900 outline-none disabled:cursor-not-allowed disabled:text-ink-400"
                    >
                        <option value="">
                            {brand ? `Any ${brand} model` : "Select a brand first"}
                        </option>
                        {models.map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field label="Budget" icon="landmark">
                    <select
                        name="budget"
                        defaultValue=""
                        className="w-full cursor-pointer appearance-none bg-transparent text-[15px] font-medium text-ink-900 outline-none"
                    >
                        <option value="">Any budget</option>
                        {BUDGET_RANGES.map((b) => (
                            <option key={b.key} value={b.key}>
                                {b.label}
                            </option>
                        ))}
                    </select>
                </Field>

                <div className="p-3">
                    <button
                        type="submit"
                        className="group inline-flex h-full min-h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-crimson-600 px-8 text-[15px] font-semibold text-white transition-colors hover:bg-crimson-700 md:w-auto"
                    >
                        <Icon name="search" size={18} />
                        Search Cars
                    </button>
                </div>
            </Form>
        </div>
    );
}

function Field({ label, icon, children }) {
    return (
        <label className="relative flex cursor-pointer flex-col justify-center gap-1 border-b border-line px-6 py-4 focus-within:bg-paper/60 md:border-r md:border-b-0">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-ink-500 uppercase">
                <Icon name={icon} size={14} className="text-gold-500" />
                {label}
            </span>
            <span className="relative flex items-center">
                {children}
                <Icon
                    name="chevron-down"
                    size={16}
                    className="pointer-events-none absolute right-0 text-ink-400"
                />
            </span>
        </label>
    );
}
