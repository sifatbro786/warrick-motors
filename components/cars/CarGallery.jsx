"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import CarImage from "@/components/cars/CarImage";
import { EASE } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils/format";

const SWIPE = 60;

/**
 * Detail-page gallery: crossfade/slide main image, swipe on touch, arrow
 * buttons + keyboard, thumbnail strip, and a fullscreen lightbox.
 */
export default function CarGallery({ images = [], title, badge }) {
    const [[index, dir], setState] = useState([0, 0]);
    const [lightbox, setLightbox] = useState(false);
    const count = images.length;
    const go = (d) => setState(([i]) => [(i + d + count) % count, d]);
    const jump = (i) => setState(([cur]) => [i, i > cur ? 1 : -1]);

    useEffect(() => {
        if (!lightbox) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e) => {
            if (e.key === "Escape") setLightbox(false);
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lightbox]);

    if (!count) {
        return (
            <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)]">
                <CarImage src={null} alt={title} />
            </div>
        );
    }

    const current = images[index];

    return (
        <div>
            <div
                className="group relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-ink-800"
                role="group"
                aria-roledescription="carousel"
                aria-label={`${title} photos`}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "ArrowRight") go(1);
                    if (e.key === "ArrowLeft") go(-1);
                }}
            >
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                    <motion.div
                        key={index}
                        custom={dir}
                        className="absolute inset-0 cursor-grab active:cursor-grabbing"
                        variants={{
                            enter: (d) => ({ x: d > 0 ? "8%" : d < 0 ? "-8%" : 0, opacity: 0 }),
                            center: { x: 0, opacity: 1 },
                            exit: (d) => ({ x: d > 0 ? "-8%" : "8%", opacity: 0 }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.6, ease: EASE }}
                        drag={count > 1 ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.18}
                        onDragEnd={(_, info) => {
                            if (info.offset.x < -SWIPE) go(1);
                            else if (info.offset.x > SWIPE) go(-1);
                        }}
                    >
                        <CarImage
                            src={current.src}
                            alt={current.alt || title}
                            sizes="(min-width: 1024px) 60vw, 100vw"
                            preload={index === 0}
                            draggable={false}
                        />
                    </motion.div>
                </AnimatePresence>

                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-950/50 to-transparent" />
                {badge && <div className="absolute top-4 left-4 z-10">{badge}</div>}

                <button
                    type="button"
                    onClick={() => setLightbox(true)}
                    className="absolute top-4 right-4 z-10 inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-ink-950/65 px-4 text-[12.5px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-ink-950"
                >
                    <Icon name="arrow-up-right" size={15} />
                    View fullscreen
                </button>

                {count > 1 && (
                    <>
                        <NavButton side="left" onClick={() => go(-1)} />
                        <NavButton side="right" onClick={() => go(1)} />
                        <span className="nums absolute right-4 bottom-4 z-10 rounded-full bg-ink-950/65 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
                            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                        </span>
                    </>
                )}
                <p className="sr-only" aria-live="polite">
                    Photo {index + 1} of {count}: {current.alt}
                </p>
            </div>

            {count > 1 && (
                <ul className="no-scrollbar mt-3 flex gap-3 overflow-x-auto">
                    {images.map((img, i) => (
                        <li key={img.src} className="shrink-0">
                            <button
                                type="button"
                                onClick={() => jump(i)}
                                aria-label={`Show photo ${i + 1}`}
                                aria-current={i === index ? "true" : undefined}
                                className={cn(
                                    "relative block h-[72px] w-[108px] cursor-pointer overflow-hidden rounded-lg bg-ink-800 transition-[opacity,box-shadow] sm:h-20 sm:w-[124px]",
                                    i === index ? "ring-2 ring-crimson-600 ring-offset-2 ring-offset-paper" : "opacity-60 hover:opacity-100",
                                )}
                            >
                                <Image src={img.src} alt="" fill sizes="124px" quality={60} className="object-cover" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${title} — fullscreen photos`}
                        className="fixed inset-0 z-[80] flex flex-col bg-ink-950/96"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="flex items-center justify-between px-4 py-4 text-white sm:px-8">
                            <p className="text-sm font-medium">
                                {title} <span className="nums ml-2 text-ink-400">{index + 1} / {count}</span>
                            </p>
                            <button
                                type="button"
                                autoFocus
                                onClick={() => setLightbox(false)}
                                aria-label="Close fullscreen"
                                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-ink-900"
                            >
                                <Icon name="close" size={20} />
                            </button>
                        </div>
                        <div className="relative flex-1">
                            <AnimatePresence initial={false} mode="popLayout">
                                <motion.div
                                    key={index}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.45, ease: EASE }}
                                >
                                    <Image src={current.src} alt={current.alt || title} fill sizes="100vw" quality={85} className="object-contain" />
                                </motion.div>
                            </AnimatePresence>
                            {count > 1 && (
                                <>
                                    <NavButton side="left" onClick={() => go(-1)} always />
                                    <NavButton side="right" onClick={() => go(1)} always />
                                </>
                            )}
                        </div>
                        <p className="px-4 py-4 text-center text-[13px] text-ink-400">{current.alt}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function NavButton({ side, onClick, always = false }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={side === "left" ? "Previous photo" : "Next photo"}
            className={cn(
                "absolute top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-md transition-[opacity,background-color] hover:bg-white",
                side === "left" ? "left-4" : "right-4",
                !always && "opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100",
            )}
        >
            <Icon name={side === "left" ? "chevron-left" : "chevron-right"} size={20} />
        </button>
    );
}
