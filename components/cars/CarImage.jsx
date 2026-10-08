"use client";

import { useState } from "react";
import Image from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils/format";

/**
 * next/image wrapper with a branded fallback, so a dead remote photo (or a
 * missing admin upload) never shows a broken-image icon in the inventory.
 */
export default function CarImage({ src, alt, className, sizes, preload = false, fill = true, ...props }) {
    const [failedSrc, setFailedSrc] = useState(null);
    const failed = !src || failedSrc === src;

    if (failed) {
        return (
            <div
                role="img"
                aria-label={alt || "Photo coming soon"}
                className={cn("absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink-800 text-ink-400", className)}
            >
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                    <path d="M5 16H3.5v-3.5L6 8h12l2.5 4.5V16H19M3.5 12.5h17M9 16h6" />
                    <circle cx="7" cy="16.5" r="1.8" />
                    <circle cx="17" cy="16.5" r="1.8" />
                </svg>
                <span className="eyebrow text-[10px]">Photos on request</span>
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt || ""}
            fill={fill}
            sizes={sizes}
            preload={preload}
            quality={75}
            onError={() => setFailedSrc(src)}
            className={cn("object-cover", className)}
            {...props}
        />
    );
}
