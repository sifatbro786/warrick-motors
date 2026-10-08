"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils/format";

/**
 * Accessible tabs that swap server-rendered panels.
 * `tabs` = [{ key, label, sub, count, panel: ReactNode }] — panels (CarCards)
 * are rendered on the server and handed in, so this file ships only tab logic.
 */
export default function StatusTabs({ tabs = [], idPrefix = "status" }) {
    const [active, setActive] = useState(tabs[0]?.key);
    const current = tabs.find((t) => t.key === active) || tabs[0];

    const onKeyDown = (e) => {
        const i = tabs.findIndex((t) => t.key === active);
        const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!dir) return;
        e.preventDefault();
        const next = tabs[(i + dir + tabs.length) % tabs.length];
        setActive(next.key);
        document.getElementById(`${idPrefix}-tab-${next.key}`)?.focus();
    };

    return (
        <div>
            <div
                role="tablist"
                aria-label="Stock status"
                onKeyDown={onKeyDown}
                className="no-scrollbar flex gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/4 p-1.5 sm:inline-flex"
            >
                {tabs.map((t) => {
                    const selected = t.key === active;
                    return (
                        <button
                            key={t.key}
                            id={`${idPrefix}-tab-${t.key}`}
                            role="tab"
                            type="button"
                            aria-selected={selected}
                            aria-controls={`${idPrefix}-panel-${t.key}`}
                            tabIndex={selected ? 0 : -1}
                            onClick={() => setActive(t.key)}
                            className={cn(
                                "relative flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full px-5 py-3 text-left transition-colors",
                                selected ? "text-ink-900" : "text-white/70 hover:text-white",
                            )}
                        >
                            {selected && (
                                <m.span
                                    layoutId={`${idPrefix}-pill`}
                                    className="absolute inset-0 rounded-full bg-white"
                                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                                />
                            )}
                            <span className="relative text-[14px] font-semibold whitespace-nowrap">
                                {t.label}
                            </span>
                            <span
                                className={cn(
                                    "nums relative rounded-full px-2 py-0.5 text-[11px] font-semibold",
                                    selected
                                        ? "bg-ink-900 text-gold-300"
                                        : "bg-white/10 text-white/70",
                                )}
                            >
                                {t.count}
                            </span>
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait" initial={false}>
                <m.div
                    key={current.key}
                    id={`${idPrefix}-panel-${current.key}`}
                    role="tabpanel"
                    aria-labelledby={`${idPrefix}-tab-${current.key}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }}
                    exit={{ opacity: 0, y: -12, transition: { duration: 0.25, ease: "easeIn" } }}
                    className="mt-10"
                >
                    {current.sub && <p className="mb-6 text-[15px] text-ink-300">{current.sub}</p>}
                    {current.panel}
                </m.div>
            </AnimatePresence>
        </div>
    );
}
