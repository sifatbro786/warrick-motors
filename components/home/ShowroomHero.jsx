"use client";

import { useState } from "react";
import Image from "@/components/ui/SmartImage";
import Link from "next/link";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { EASE } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils/format";

const SLIDE_MS = 6500;


/**
 * Full-bleed hero. Slides crossfade with a slow push-in; the gold progress bar
 * *is* the timer (CSS animation → onAnimationEnd advances), so pausing the bar
 * pauses the carousel with no interval bookkeeping.
 */
export default function ShowroomHero({ slides = [] }) {
    const [index, setIndex] = useState(0);
    const [hoverPaused, setHoverPaused] = useState(false);
    const [userPaused, setUserPaused] = useState(false);
    // Reduced motion → no autoplay (WCAG 2.2.2); users still navigate with the bars.
    const reduceMotion = useReducedMotion();
    const paused = hoverPaused || userPaused || reduceMotion;
    const slide = slides[index];
    const next = () => setIndex((i) => (i + 1) % slides.length);

    if (!slide) return null;

    return (
        <section
            aria-roledescription="carousel"
            aria-label="Featured imports"
            className="relative -mt-[72px] flex min-h-[600px] flex-col overflow-hidden bg-ink-950 text-white h-[100svh] max-h-[840px]"
        >
            {/* Slides */}
            <AnimatePresence initial={false}>
                <m.div
                    key={slide.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.12 }}
                    animate={{ opacity: 1, scale: 1.02, transition: { opacity: { duration: 1.4, ease: "easeOut" }, scale: { duration: 8, ease: "linear" } } }}
                    exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeIn" } }}
                >
                    <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        sizes="100vw"
                        quality={85}
                        preload={index === 0}
                        className="object-cover"
                    />
                </m.div>
            </AnimatePresence>

            {/* Legibility layers: left-weighted wash + bottom fade into the stats band */}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/55 to-ink-950/10" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-950/70 to-transparent" />

            <div className="container-page relative z-10 flex flex-1 flex-col justify-end pt-[120px] pb-36 md:pb-44">
                <p className="eyebrow anim-fade-up mb-6 flex items-center gap-3 text-gold-300">
                    <span className="h-px w-10 bg-gold-400/60" aria-hidden="true" />
                    Japan · UK · UAE — Direct to Dhaka
                </p>

                <h1 className="max-w-3xl font-display text-[2.35rem] leading-[1.04] font-bold tracking-[-0.035em] text-white sm:text-[3.3rem] lg:text-[4.15rem]">
                    {[
                        <>Premium &amp;</>,
                        <span key="a" className="text-gold-300">Direct Imported</span>,
                        <>Cars in Bangladesh</>,
                    ].map((line, i) => (
                        <span key={i} className="block overflow-hidden pb-[0.06em]">
                            <span className="anim-rise block" style={{ animationDelay: `${150 + i * 120}ms` }}>
                                {line}
                            </span>
                        </span>
                    ))}
                </h1>

                <div className="anim-fade-up mt-6 flex max-w-xl flex-col gap-8" style={{ animationDelay: "550ms" }}>
                    <p className="text-base leading-relaxed text-white/80 sm:text-lg">
                        Original imports from Japan and the world&apos;s top marques. See them in person at our
                        showroom and take a test drive.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Button href="/cars" size="lg" iconRight="arrow-right">
                            Explore Inventory
                        </Button>
                        <Button href="/showroom#visit" variant="outline-light" size="lg" icon="key">
                            Schedule Test Drive
                        </Button>
                    </div>
                </div>
            </div>

            {/* Slide meta + controls (desktop: bottom-right; mobile: compact) */}
            <div
                className="absolute right-0 bottom-28 z-10 hidden w-[360px] pr-8 lg:block xl:pr-[max(2rem,calc((100vw-1320px)/2+2rem))]"
                onMouseEnter={() => setHoverPaused(true)}
                onMouseLeave={() => setHoverPaused(false)}
                onFocus={() => setHoverPaused(true)}
                onBlur={() => setHoverPaused(false)}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <m.div
                        key={slide.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="mb-4"
                    >
                        <p className="text-[12.5px] text-gold-300">{slide.kicker}</p>
                        <Link
                            href={`/cars/${slide.carSlug}`}
                            className="group mt-1 inline-flex items-center gap-2 font-display text-lg font-semibold text-white"
                        >
                            {slide.caption}
                            <Icon name="arrow-up-right" size={18} className="text-gold-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </m.div>
                </AnimatePresence>
                <SlideControls
                    slides={slides}
                    index={index}
                    paused={paused}
                    userPaused={userPaused}
                    onSelect={setIndex}
                    onEnd={next}
                    onTogglePause={() => setUserPaused((p) => !p)}
                />
            </div>

            <div className="absolute inset-x-0 bottom-24 z-10 lg:hidden">
                <div className="container-page">
                    <SlideControls
                        slides={slides}
                        index={index}
                        paused={paused}
                        userPaused={userPaused}
                        onSelect={setIndex}
                        onEnd={next}
                        onTogglePause={() => setUserPaused((p) => !p)}
                        compact
                    />
                </div>
            </div>

            <p className="sr-only" aria-live="polite">
                Slide {index + 1} of {slides.length}: {slide.caption}
            </p>
        </section>
    );
}

function SlideControls({ slides, index, paused, userPaused, onSelect, onEnd, onTogglePause, compact = false }) {
    return (
        <div className="flex items-center gap-4">
            <span className="nums font-display text-sm font-semibold text-white">
                {String(index + 1).padStart(2, "0")}
                <span className="text-white/40"> / {String(slides.length).padStart(2, "0")}</span>
            </span>
            <div className="flex flex-1 gap-2">
                {slides.map((s, i) => (
                    <button
                        key={s.id}
                        type="button"
                        onClick={() => onSelect(i)}
                        aria-label={`Show slide ${i + 1}: ${s.caption}`}
                        aria-current={i === index ? "true" : undefined}
                        className="group relative flex h-6 flex-1 cursor-pointer items-center"
                    >
                        <span className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/20 group-hover:bg-white/35">
                            {i < index && <span className="absolute inset-0 bg-white/70" />}
                            {i === index && (
                                <span
                                    key={`${s.id}-${index}`}
                                    onAnimationEnd={onEnd}
                                    className={cn("absolute inset-0 origin-left bg-gold-400", paused && "[animation-play-state:paused]")}
                                    style={{ animation: `progress ${SLIDE_MS}ms linear forwards` }}
                                />
                            )}
                        </span>
                    </button>
                ))}
            </div>
            <button
                type="button"
                onClick={onTogglePause}
                aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                className={cn(
                    "inline-flex shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-ink-900",
                    compact ? "h-9 w-9" : "h-10 w-10",
                )}
            >
                {userPaused ? (
                    <Icon name="play" size={15} />
                ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <rect x="6" y="5" width="4" height="14" rx="1" />
                        <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                )}
            </button>
        </div>
    );
}
