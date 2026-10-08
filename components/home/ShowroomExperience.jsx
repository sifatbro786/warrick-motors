"use client";

import { useRef } from "react";
import Image from "@/components/ui/SmartImage";
import { m, useScroll, useTransform } from "framer-motion";
import Accent from "@/components/ui/Accent";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Dark split section (Kraftwerk "Sculpted" reference). The photo drifts
 * against scroll for depth; content stays still and readable.
 */
export default function ShowroomExperience({ image, showrooms = [], hours = [] }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const badgeY = useTransform(scrollYProgress, [0, 1], [40, -40]);

    return (
        <section ref={ref} className="relative overflow-hidden bg-ink-950 text-white">
            <div className="grid lg:min-h-[720px] lg:grid-cols-12">
                {/* Photo */}
                <div className="relative h-[380px] overflow-hidden sm:h-[480px] lg:order-2 lg:col-span-7 lg:h-auto">
                    <m.div style={{ y }} className="absolute inset-[-12%_0]">
                        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
                    </m.div>
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-ink-950 lg:via-ink-950/20" />

                    <m.div
                        style={{ y: badgeY }}
                        className="absolute right-5 bottom-8 hidden rounded-2xl border border-white/15 bg-ink-950/75 px-5 py-4 backdrop-blur-md sm:block lg:right-10 lg:bottom-auto lg:top-1/3"
                    >
                        <p className="flex items-center gap-2 text-[12px] font-semibold tracking-wide text-gold-300 uppercase">
                            <span className="h-1.5 w-1.5 rounded-full bg-ready" /> Open today
                        </p>
                        <p className="nums mt-1 font-display text-lg font-semibold">{hours[0]?.time}</p>
                        <p className="text-[12.5px] text-ink-300">Free tea, no sales pressure.</p>
                    </m.div>
                </div>

                {/* Copy */}
                <div className="relative flex items-center lg:order-1 lg:col-span-5">
                    <Reveal className="w-full px-4 py-16 sm:px-6 md:py-20 lg:py-24 lg:pr-10 lg:pl-[max(2rem,calc((100vw-1320px)/2+2rem))]">
                        <p className="eyebrow mb-4 flex items-center gap-3 text-gold-300">
                            <span className="nums">05</span>
                            <span aria-hidden="true" className="h-px w-8 bg-gold-300/50" />
                            Showroom experience
                        </p>
                        <h2 className="text-[2rem] leading-[1.05] font-bold tracking-[-0.03em] text-white sm:text-[2.8rem]">
                            Walk the floor. Sit inside. <Accent tone="dark">Drive it.</Accent>
                        </h2>
                        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-300 sm:text-base">
                            Photos only tell half the story. Book a slot and a consultant will have the car charged, cleaned
                            and ready for a test drive on Gulshan Avenue.
                        </p>

                        <ul className="mt-8 space-y-4 border-t border-white/10 pt-6">
                            {showrooms.map((s) => (
                                <li key={s.id} className="flex gap-3 text-[14px]">
                                    <Icon name="map-pin" size={18} className="mt-0.5 shrink-0 text-gold-400" />
                                    <span>
                                        <span className="font-semibold text-white">{s.city}</span>
                                        <span className="text-ink-300"> — {s.address}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <Button href="/showroom#visit" size="lg" iconRight="arrow-right">
                                Schedule Showroom Visit
                            </Button>
                            <Button href={showrooms[0]?.mapUrl} variant="outline-light" size="lg" icon="map-pin">
                                Get Directions
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
