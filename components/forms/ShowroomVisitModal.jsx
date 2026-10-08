"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, m } from "framer-motion";
import Icon from "@/components/ui/Icon";
import ShowroomVisitForm from "@/components/forms/ShowroomVisitForm";
import { siteConfig } from "@/lib/config/site";
import { EASE } from "@/components/motion/Reveal";

/** Dialog shell around <ShowroomVisitForm>: backdrop, focus trap, Esc, scroll lock. */
export default function ShowroomVisitModal({ open, onClose, car = null, defaultType = "Showroom Visit" }) {
    return <AnimatePresence>{open && <ModalBody onClose={onClose} car={car} defaultType={defaultType} />}</AnimatePresence>;
}

function ModalBody({ onClose, car, defaultType }) {
    const dialogRef = useRef(null);
    // Keep the latest onClose without re-running the mount effect (parents pass inline arrows).
    const closeRef = useRef(onClose);
    useEffect(() => {
        closeRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e) => {
            if (e.key === "Escape") closeRef.current();
            if (e.key === "Tab" && dialogRef.current) {
                const f = dialogRef.current.querySelectorAll("button, [href], input:not([tabindex='-1']), select, textarea");
                const first = f[0];
                const last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, []);

    return (
        <m.div
            className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
            <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 cursor-default bg-ink-950/70 backdrop-blur-[2px]" />
            <m.div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="visit-title"
                initial={{ y: 40, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } }}
                exit={{ y: 24, opacity: 0, transition: { duration: 0.25 } }}
                className="relative grid max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-t-3xl bg-white shadow-float sm:rounded-3xl md:grid-cols-[260px_1fr]"
            >
                <div className="relative hidden flex-col justify-between bg-ink-900 p-7 text-white md:flex">
                    <div>
                        <p className="eyebrow text-gold-300">Showroom visit</p>
                        <p className="mt-3 font-display text-2xl leading-tight font-semibold">Tea&apos;s on us. The car will be ready.</p>
                        {car && (
                            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                                <p className="text-[11px] tracking-wide text-ink-300 uppercase">Selected car</p>
                                <p className="mt-1 text-[14px] font-semibold">
                                    {car.year} {car.title}
                                </p>
                                <p className="nums mt-0.5 font-mono text-[11px] text-gold-300">{car.stockNo}</p>
                            </div>
                        )}
                    </div>
                    <ul className="space-y-3 text-[13px] text-ink-300">
                        {siteConfig.hours.map((h) => (
                            <li key={h.days} className="flex gap-2">
                                <Icon name="clock" size={16} className="shrink-0 text-gold-400" />
                                <span>
                                    {h.days}
                                    <br />
                                    <span className="text-white">{h.time}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="overflow-y-auto p-6 sm:p-8">
                    <div className="mb-6 flex items-start justify-between gap-4">
                        <div>
                            <h2 id="visit-title" className="font-display text-2xl font-semibold tracking-tight">
                                Book a showroom visit
                            </h2>
                            <p className="mt-1 text-[14px] text-ink-500">We&apos;ll call to confirm within working hours.</p>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line hover:border-ink-900"
                        >
                            <Icon name="close" size={18} />
                        </button>
                    </div>
                    <ShowroomVisitForm car={car} defaultType={defaultType} onDone={onClose} autoFocus />
                </div>
            </m.div>
        </m.div>
    );
}
