"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils/format";

/**
 * Accessible accordion (button + region, one open at a time). Collapsed answers
 * unmount, so the parent section also emits every Q&A as FAQPage JSON-LD.
 */
export default function FaqAccordion({ items = [] }) {
    const baseId = useId();
    const [open, setOpen] = useState(0);

    return (
        <ul className="divide-y divide-line border-y border-line">
            {items.map((f, i) => {
                const expanded = open === i;
                const btnId = `${baseId}-q${i}`;
                const panelId = `${baseId}-a${i}`;
                return (
                    <li key={f.q}>
                        <h3>
                            <button
                                id={btnId}
                                type="button"
                                aria-expanded={expanded}
                                aria-controls={panelId}
                                onClick={() => setOpen(expanded ? -1 : i)}
                                className="group flex w-full cursor-pointer items-start gap-5 py-6 text-left"
                            >
                                <span
                                    className={cn(
                                        "nums mt-1 font-mono text-[12px] transition-colors",
                                        expanded ? "text-crimson-600" : "text-ink-500",
                                    )}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span
                                    className={cn(
                                        "flex-1 font-display text-[1.06rem] leading-snug font-semibold tracking-tight transition-colors sm:text-[1.15rem]",
                                        expanded
                                            ? "text-ink-900"
                                            : "text-ink-700 group-hover:text-ink-900",
                                    )}
                                >
                                    {f.q}
                                </span>
                                <span
                                    aria-hidden="true"
                                    className={cn(
                                        "relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                                        expanded
                                            ? "border-ink-900 bg-ink-900 text-white"
                                            : "border-line-strong text-ink-700 group-hover:border-ink-900",
                                    )}
                                >
                                    <span className="absolute h-[1.5px] w-3 bg-current" />
                                    <span
                                        className={cn(
                                            "absolute h-3 w-[1.5px] bg-current transition-transform duration-300",
                                            expanded && "scale-y-0",
                                        )}
                                    />
                                </span>
                            </button>
                        </h3>
                        <AnimatePresence initial={false}>
                            {expanded && (
                                <m.div
                                    id={panelId}
                                    role="region"
                                    aria-labelledby={btnId}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: "auto",
                                        opacity: 1,
                                        transition: { duration: 0.45, ease: EASE },
                                    }}
                                    exit={{
                                        height: 0,
                                        opacity: 0,
                                        transition: { duration: 0.3, ease: EASE },
                                    }}
                                    className="overflow-hidden"
                                >
                                    <p className="max-w-2xl pr-12 pb-7 pl-9 text-[15px] leading-relaxed text-ink-500">
                                        {f.a}
                                    </p>
                                </m.div>
                            )}
                        </AnimatePresence>
                    </li>
                );
            })}
        </ul>
    );
}
