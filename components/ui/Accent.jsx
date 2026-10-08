"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/format";

/**
 * Headline accent — colour + a hand-drawn marker stroke that draws itself in
 * when the heading scrolls into view. Upright type only (no italic).
 * Use once per heading.
 */
export default function Accent({ children, tone = "light", delay = 0.35, trigger = "view", className }) {
    const dark = tone === "dark";
    // "mount": animate immediately (hero, above the fold); "view": when scrolled into view.
    const play =
        trigger === "mount"
            ? { animate: { pathLength: 1, opacity: 1 } }
            : { whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, amount: 0.8 } };
    return (
        <span className={cn("relative inline-block whitespace-nowrap", dark ? "text-gold-300" : "text-gold-600", className)}>
            <span className="relative z-10">{children}</span>
            <svg
                aria-hidden="true"
                viewBox="0 0 220 16"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-[0.14em] left-[-2%] z-0 h-[0.36em] w-[104%] overflow-visible"
                fill="none"
            >
                <motion.path
                    d="M3 10.5C46 5.2 104 3.6 217 7.4"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    className={dark ? "text-gold-500/70" : "text-gold-400/70"}
                    initial={{ pathLength: 0, opacity: 0 }}
                    {...play}
                    transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay }}
                />
                <motion.path
                    d="M38 14c48-2.6 96-3 148-1.4"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    className={dark ? "text-gold-500/50" : "text-gold-400/50"}
                    initial={{ pathLength: 0, opacity: 0 }}
                    {...play}
                    transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: delay + 0.6 }}
                />
            </svg>
        </span>
    );
}
