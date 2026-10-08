"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Vertical import timeline. A gold line fills as you scroll through it —
 * the journey from auction to handover, step by step.
 */
export default function ProcessTimeline({ steps = [], tone = "dark" }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
    const dark = tone === "dark";

    return (
        <ol ref={ref} className="relative">
            <span
                aria-hidden="true"
                className={`absolute top-2 bottom-2 left-5.75 w-px ${dark ? "bg-white/12" : "bg-line-strong"}`}
            />
            <m.span
                aria-hidden="true"
                style={{ scaleY }}
                className="absolute top-2 bottom-2 left-5.75 w-px origin-top bg-gold-400"
            />
            {steps.map((s, i) => (
                <li
                    key={s.title}
                    className="relative grid grid-cols-[48px_1fr] gap-5 pb-10 last:pb-0"
                >
                    <span
                        className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border ${
                            dark
                                ? "border-white/15 bg-ink-900 text-gold-300"
                                : "border-line-strong bg-white text-ink-900"
                        }`}
                    >
                        <Icon name={s.icon || "check"} size={20} />
                    </span>
                    <Reveal y={16}>
                        <p
                            className={`nums font-mono text-[11px] tracking-wider ${dark ? "text-gold-300" : "text-gold-600"}`}
                        >
                            {s.time || `STEP ${String(i + 1).padStart(2, "0")}`}
                        </p>
                        <h3
                            className={`mt-1 font-display text-xl font-semibold tracking-tight ${dark ? "text-white" : "text-ink-900"}`}
                        >
                            {s.title}
                        </h3>
                        <p
                            className={`mt-1.5 max-w-xl text-[14.5px] leading-relaxed ${dark ? "text-ink-300" : "text-ink-500"}`}
                        >
                            {s.body}
                        </p>
                    </Reveal>
                </li>
            ))}
        </ol>
    );
}
