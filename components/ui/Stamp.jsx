"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/format";

/**
 * Customs-style rubber stamp with circular text. "Thumps" into place when it
 * scrolls into view. Purely decorative — hidden from assistive tech.
 */
export default function Stamp({ ring = "CLEARED · CHATTOGRAM PORT · WARRICK MOTORS · ", center = "IMPORTED", sub = "DIRECT", className }) {
    const id = useId().replace(/:/g, "");
    return (
        <motion.div
            aria-hidden="true"
            className={cn("pointer-events-none select-none", className)}
            initial={{ opacity: 0, scale: 1.6, rotate: -2 }}
            whileInView={{ opacity: 0.92, scale: 1, rotate: -11 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 520, damping: 18, mass: 0.8, delay: 0.3 }}
        >
            <svg viewBox="0 0 200 200" className="h-full w-full text-crimson-600">
                <defs>
                    <path id={`ring-${id}`} d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
                    {/* Ink texture: speckles knock out bits of the stamp */}
                    <filter id={`ink-${id}`}>
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
                        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.3" />
                        <feComposite in="SourceGraphic" operator="in" />
                    </filter>
                </defs>
                <g filter={`url(#ink-${id})`} fill="currentColor" stroke="currentColor">
                    <circle cx="100" cy="100" r="94" fill="none" strokeWidth="5" />
                    <circle cx="100" cy="100" r="86" fill="none" strokeWidth="1.5" />
                    <circle cx="100" cy="100" r="56" fill="none" strokeWidth="1.5" />
                    <text fontSize="12.5" fontWeight="700" letterSpacing="1.8" stroke="none" style={{ fontFamily: "var(--font-display)" }}>
                        <textPath href={`#ring-${id}`}>{ring}</textPath>
                    </text>
                    <text x="100" y="98" textAnchor="middle" fontSize="18" fontWeight="800" letterSpacing="1" stroke="none" style={{ fontFamily: "var(--font-display)" }}>
                        {center}
                    </text>
                    <text x="100" y="118" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="4" stroke="none" style={{ fontFamily: "var(--font-display)" }}>
                        {sub}
                    </text>
                    <path d="M62 128h76" strokeWidth="1.5" />
                </g>
            </svg>
        </motion.div>
    );
}
