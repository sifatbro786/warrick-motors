"use client";

import Image from "@/components/ui/SmartImage";
import { m } from "framer-motion";
import { cn } from "@/lib/utils/format";

/**
 * Handover photo printed as a polaroid. Lands at a slight tilt, and
 * straightens + lifts on hover — like picking a print up off the desk.
 */
export default function Polaroid({ image, alt, caption, date, tilt = -3, delay = 0, className }) {
    return (
        <m.figure
            className={cn(
                "relative bg-white p-2.5 pb-4 shadow-[0_18px_40px_-22px_rgb(10_17_30/0.45)] sm:p-3 sm:pb-5",
                className,
            )}
            initial={{ opacity: 0, y: 60, rotate: tilt * 2.4 }}
            whileInView={{ opacity: 1, y: 0, rotate: tilt }}
            whileHover={{
                rotate: 0,
                y: -8,
                scale: 1.03,
                transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay }}
        >
            <div className="relative aspect-4/5 overflow-hidden bg-ink-800">
                <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover"
                />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-2 px-0.5">
                <span className="text-[12.5px] leading-snug font-medium text-ink-700">
                    {caption}
                </span>
                <span className="nums shrink-0 font-mono text-[10.5px] text-ink-500">{date}</span>
            </figcaption>
        </m.figure>
    );
}
