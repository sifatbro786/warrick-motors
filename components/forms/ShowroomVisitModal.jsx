"use client";

import { EASE } from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { requestShowroomVisit } from "@/lib/actions/visit.actions";
import { siteConfig } from "@/lib/config/site";
import { buildWhatsAppLink } from "@/lib/utils/contact";
import { cn } from "@/lib/utils/format";
import { TIME_SLOTS, VISIT_TYPES } from "@/lib/validation/lead";
import { AnimatePresence, m } from "framer-motion";
import { useActionState, useEffect, useRef } from "react";

const INITIAL = { ok: false, message: "", fieldErrors: {} };

/**
 * Book a showroom visit / test drive. Posts to a Server Action via
 * useActionState — pending, field errors and success are all driven by the
 * action's return value, so wiring Nodemailer/Mongo later changes nothing here.
 */
export default function ShowroomVisitModal({
    open,
    onClose,
    car = null,
    defaultType = "Showroom Visit",
}) {
    return (
        <AnimatePresence>
            {open && <ModalBody onClose={onClose} car={car} defaultType={defaultType} />}
        </AnimatePresence>
    );
}

function ModalBody({ onClose, car, defaultType }) {
    const [state, formAction, pending] = useActionState(requestShowroomVisit, INITIAL);
    const dialogRef = useRef(null);
    const errors = state.fieldErrors || {};
    // Computed on open (client only) — never during prerender.
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });

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
            // minimal focus trap
            if (e.key === "Tab" && dialogRef.current) {
                const f = dialogRef.current.querySelectorAll(
                    "button, [href], input, select, textarea",
                );
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
        dialogRef.current?.querySelector("input:not([type=hidden])")?.focus();
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, []);

    // Move focus to the first invalid field after a failed submit
    useEffect(() => {
        const first = Object.keys(state.fieldErrors || {})[0];
        if (first) dialogRef.current?.querySelector(`[name="${first}"]`)?.focus();
    }, [state]);

    return (
        <m.div
            className="fixed inset-0 z-90 flex items-end justify-center sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="absolute inset-0 cursor-default bg-ink-950/70 backdrop-blur-[2px]"
            />
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
                {/* Side panel */}
                <div className="relative hidden flex-col justify-between bg-ink-900 p-7 text-white md:flex">
                    <div>
                        <p className="eyebrow text-gold-300">Showroom visit</p>
                        <p className="mt-3 font-display text-2xl leading-tight font-semibold">
                            Tea&apos;s on us. The car will be ready.
                        </p>
                        {car && (
                            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                                <p className="text-[11px] tracking-wide text-ink-400 uppercase">
                                    Selected car
                                </p>
                                <p className="mt-1 text-[14px] font-semibold">
                                    {car.year} {car.title}
                                </p>
                                <p className="nums mt-0.5 font-mono text-[11px] text-gold-300">
                                    {car.stockNo}
                                </p>
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

                {/* Form */}
                <div className="overflow-y-auto p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2
                                id="visit-title"
                                className="font-display text-2xl font-semibold tracking-tight"
                            >
                                {state.ok ? "You're booked in" : "Book a showroom visit"}
                            </h2>
                            {!state.ok && (
                                <p className="mt-1 text-[14px] text-ink-500">
                                    We&apos;ll call to confirm within working hours.
                                </p>
                            )}
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

                    {state.ok ? (
                        <div className="mt-8" role="status">
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ready-bg text-ready">
                                <Icon name="check" size={28} strokeWidth={2} />
                            </span>
                            <p className="mt-5 text-[15px] leading-relaxed text-ink-700">
                                {state.message}
                            </p>
                            {state.reference && (
                                <p className="mt-3 text-[13px] text-ink-500">
                                    Reference{" "}
                                    <span className="nums font-mono font-semibold text-ink-900">
                                        {state.reference}
                                    </span>
                                </p>
                            )}
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Button onClick={onClose} variant="dark">
                                    Done
                                </Button>
                                <Button
                                    href={buildWhatsAppLink({ car })}
                                    variant="whatsapp"
                                    icon="whatsapp"
                                >
                                    Chat on WhatsApp
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <form
                            action={formAction}
                            noValidate
                            className="mt-6 grid gap-4 sm:grid-cols-2"
                        >
                            {car && <input type="hidden" name="carId" value={car.id} />}
                            {/* honeypot */}
                            <input
                                type="text"
                                name="company"
                                tabIndex={-1}
                                autoComplete="off"
                                className="hidden"
                                aria-hidden="true"
                            />

                            <Field
                                label="Full name"
                                name="name"
                                error={errors.name}
                                className="sm:col-span-2"
                            >
                                <input
                                    id="name"
                                    name="name"
                                    aria-invalid={!!errors.name}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                    autoComplete="name"
                                    required
                                    className={inputCls(errors.name)}
                                    placeholder="Your name"
                                />
                            </Field>
                            <Field label="Mobile number" name="phone" error={errors.phone}>
                                <input
                                    id="phone"
                                    name="phone"
                                    aria-invalid={!!errors.phone}
                                    aria-describedby={errors.phone ? "phone-error" : undefined}
                                    type="tel"
                                    inputMode="tel"
                                    autoComplete="tel"
                                    required
                                    className={inputCls(errors.phone)}
                                    placeholder="01XXX-XXXXXX"
                                />
                            </Field>
                            <Field label="Visit type" name="visitType" error={errors.visitType}>
                                <Select
                                    id="visitType"
                                    name="visitType"
                                    defaultValue={defaultType}
                                    error={errors.visitType}
                                >
                                    {VISIT_TYPES.map((t) => (
                                        <option key={t}>{t}</option>
                                    ))}
                                </Select>
                            </Field>
                            <Field label="Showroom" name="showroom" error={errors.showroom}>
                                <Select
                                    id="showroom"
                                    name="showroom"
                                    defaultValue={siteConfig.showrooms[0].id}
                                    error={errors.showroom}
                                >
                                    {siteConfig.showrooms.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.city} — {s.label}
                                        </option>
                                    ))}
                                </Select>
                            </Field>
                            <Field label="Preferred date" name="date" error={errors.date}>
                                <input
                                    id="date"
                                    name="date"
                                    aria-invalid={!!errors.date}
                                    aria-describedby={errors.date ? "date-error" : undefined}
                                    type="date"
                                    min={today}
                                    defaultValue={today}
                                    required
                                    className={inputCls(errors.date)}
                                />
                            </Field>
                            <Field
                                label="Time slot"
                                name="slot"
                                error={errors.slot}
                                className="sm:col-span-2"
                                group
                            >
                                <div
                                    className="flex flex-wrap gap-2"
                                    role="radiogroup"
                                    aria-label="Time slot"
                                >
                                    {TIME_SLOTS.map((t, i) => (
                                        <label key={t} className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="slot"
                                                value={t}
                                                defaultChecked={i === 2}
                                                className="peer sr-only"
                                            />
                                            <span className="nums inline-flex rounded-full border border-line-strong px-3.5 py-2 text-[13px] font-medium text-ink-700 transition-colors peer-checked:border-ink-900 peer-checked:bg-ink-900 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-crimson-600">
                                                {t}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </Field>
                            <Field
                                label="Anything we should prepare? (optional)"
                                name="note"
                                className="sm:col-span-2"
                            >
                                <textarea
                                    id="note"
                                    name="note"
                                    rows={3}
                                    maxLength={500}
                                    className={cn(inputCls(), "h-auto py-3")}
                                    placeholder="e.g. bring the auction sheet, compare with Harrier…"
                                />
                            </Field>

                            {state.message && !state.ok && (
                                <p
                                    role="alert"
                                    className="flex items-center gap-2 rounded-xl bg-crimson-50 px-4 py-3 text-[13.5px] text-crimson-700 sm:col-span-2"
                                >
                                    <Icon name="shield-check" size={16} /> {state.message}
                                </p>
                            )}

                            <div className="flex flex-wrap items-center gap-3 pt-2 sm:col-span-2">
                                <Button
                                    type="submit"
                                    pending={pending}
                                    size="lg"
                                    iconRight="arrow-right"
                                >
                                    {pending ? "Booking…" : "Confirm visit"}
                                </Button>
                                <p className="text-[12.5px] text-ink-500">
                                    No deposit needed to visit.
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </m.div>
        </m.div>
    );
}

const inputCls = (error) =>
    cn(
        "h-12 w-full rounded-xl border bg-white px-4 text-[15px] text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-ink-900",
        error ? "border-crimson-600" : "border-line-strong",
    );

function Select({ children, error, ...props }) {
    return (
        <div className="relative">
            <select
                {...props}
                className={cn(inputCls(error), "cursor-pointer appearance-none pr-10")}
            >
                {children}
            </select>
            <Icon
                name="chevron-down"
                size={16}
                className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-ink-400"
            />
        </div>
    );
}

function Field({ label, name, error, children, className, group = false }) {
    const Label = group ? "p" : "label";
    return (
        <div className={className}>
            <Label
                {...(group ? {} : { htmlFor: name })}
                className="mb-1.5 block text-[12.5px] font-semibold text-ink-700"
            >
                {label}
            </Label>
            {children}
            {error && (
                <p id={`${name}-error`} className="mt-1.5 text-[12.5px] text-crimson-700">
                    {error}
                </p>
            )}
        </div>
    );
}
