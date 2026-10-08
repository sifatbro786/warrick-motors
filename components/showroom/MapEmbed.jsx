"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils/format";

/**
 * Click-to-load Google Map. The iframe (~500KB of third-party JS) only loads
 * when the visitor asks for it — keeps the page fast and avoids Google cookies
 * until there's intent.
 */
export default function MapEmbed({ src, title, address, mapUrl, className }) {
    const [load, setLoad] = useState(false);
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-card bg-ink-800",
                className,
            )}
        >
            {load ? (
                <iframe
                    src={src}
                    title={title}
                    className="absolute inset-0 h-full w-full border-0 grayscale-[0.3]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                />
            ) : (
                <button
                    type="button"
                    onClick={() => setLoad(true)}
                    className="group absolute inset-0 flex w-full cursor-pointer flex-col items-center justify-center gap-3 text-white"
                    aria-label={`Load interactive map for ${title}`}
                >
                    {/* hand-drawn street grid — reads as a map without loading one */}
                    <svg
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full text-white/[0.07]"
                        preserveAspectRatio="none"
                        viewBox="0 0 400 300"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path d="M-10 60 C80 70 160 40 260 70 S380 60 420 50" strokeWidth="10" />
                        <path
                            d="M-10 190 C100 170 200 210 300 180 S390 200 420 190"
                            strokeWidth="14"
                        />
                        <path d="M90 -10 C100 80 70 160 110 310" strokeWidth="8" />
                        <path d="M260 -10 C240 100 290 200 250 310" strokeWidth="12" />
                        <path
                            d="M0 120 L400 135 M0 250 L400 240 M180 0 L170 300 M330 0 L345 300"
                            strokeWidth="3"
                        />
                    </svg>
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-crimson-600 shadow-float transition-transform duration-500 group-hover:-translate-y-1">
                        <Icon name="map-pin" size={26} />
                    </span>
                    <span className="relative text-center">
                        <span className="block font-display text-lg font-semibold">{title}</span>
                        <span className="block text-[13px] text-ink-300">{address}</span>
                    </span>
                    <span className="relative mt-1 inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-2 text-[12.5px] font-medium transition-colors group-hover:bg-white group-hover:text-ink-900">
                        Show interactive map
                    </span>
                </button>
            )}
            {mapUrl && (
                <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 bottom-3 z-10 inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-2 text-[12.5px] font-semibold text-ink-900 shadow-md hover:bg-gold-200"
                >
                    Directions <Icon name="arrow-up-right" size={14} />
                </a>
            )}
        </div>
    );
}
