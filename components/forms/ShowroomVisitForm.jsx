"use client";

import { useActionState, useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import { requestShowroomVisit } from "@/lib/actions/visit.actions";
import { TIME_SLOTS, VISIT_TYPES } from "@/lib/validation/lead";
import { siteConfig } from "@/lib/config/site";
import { buildWhatsAppLink } from "@/lib/utils/contact";
import {
    INITIAL_FORM_STATE,
    Field,
    Select,
    ChoiceChips,
    Honeypot,
    FormError,
    FormSuccess,
    fieldAria,
    inputClass,
    todayInDhaka,
} from "@/components/forms/fields";
import { cn } from "@/lib/utils/format";

/**
 * Showroom visit / test-drive booking. Used inline on /showroom#visit and
 * inside ShowroomVisitModal. Server Action decides validity; this only renders state.
 */
export default function ShowroomVisitForm({
    car = null,
    defaultType = "Showroom Visit",
    onDone,
    autoFocus = false,
    className,
}) {
    const [state, formAction, pending] = useActionState(requestShowroomVisit, INITIAL_FORM_STATE);
    const formRef = useRef(null);
    const errors = state.fieldErrors || {};

    useEffect(() => {
        if (autoFocus)
            formRef.current?.querySelector("input:not([type=hidden]):not([name=company])")?.focus();
    }, [autoFocus]);

    // After a failed submit, focus the first invalid field
    useEffect(() => {
        const first = Object.keys(state.fieldErrors || {})[0];
        if (first) formRef.current?.querySelector(`[name="${first}"]`)?.focus();
    }, [state]);

    if (state.ok) {
        return (
            <FormSuccess title="You're booked in" state={state}>
                {onDone && (
                    <Button onClick={onDone} variant="dark">
                        Done
                    </Button>
                )}
                <Button href={buildWhatsAppLink({ car })} variant="whatsapp" icon="whatsapp">
                    Chat on WhatsApp
                </Button>
            </FormSuccess>
        );
    }

    return (
        <form
            ref={formRef}
            action={formAction}
            noValidate
            className={cn("grid gap-4 sm:grid-cols-2", className)}
        >
            {car && <input type="hidden" name="carId" value={car.id} />}
            <Honeypot />

            <Field
                label="Full name"
                name="name"
                error={errors.name}
                required
                className="sm:col-span-2"
            >
                <input
                    {...fieldAria("name", errors)}
                    autoComplete="name"
                    className={inputClass(errors.name)}
                    placeholder="Your name"
                />
            </Field>
            <Field label="Mobile number" name="phone" error={errors.phone} required>
                <input
                    {...fieldAria("phone", errors)}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    className={inputClass(errors.phone)}
                    placeholder="01XXX-XXXXXX"
                />
            </Field>
            <Field label="Visit type" name="visitType" error={errors.visitType}>
                <Select
                    {...fieldAria("visitType", errors)}
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
                    {...fieldAria("showroom", errors)}
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
            <Field label="Preferred date" name="date" error={errors.date} required>
                <input
                    {...fieldAria("date", errors)}
                    type="date"
                    className={inputClass(errors.date)}
                    // min is set on interaction so no Date() runs during prerender
                    onFocus={(e) => (e.currentTarget.min = todayInDhaka())}
                />
            </Field>
            <Field
                label="Time slot"
                name="slot"
                error={errors.slot}
                group
                className="sm:col-span-2"
            >
                <ChoiceChips
                    name="slot"
                    options={TIME_SLOTS}
                    defaultValue={TIME_SLOTS[2]}
                    labelledBy="slot-label"
                />
            </Field>
            <Field
                label="Anything we should prepare? (optional)"
                name="note"
                className="sm:col-span-2"
            >
                <textarea
                    {...fieldAria("note", errors)}
                    rows={3}
                    maxLength={500}
                    className={cn(inputClass(), "h-auto py-3")}
                    placeholder="e.g. bring the auction sheet, compare with a Harrier…"
                />
            </Field>

            <div className="sm:col-span-2">
                <FormError state={state} />
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
                <Button type="submit" pending={pending} size="lg" iconRight="arrow-right">
                    {pending ? "Booking…" : "Confirm visit"}
                </Button>
                <p className="text-[12.5px] text-ink-500">No deposit needed to visit.</p>
            </div>
        </form>
    );
}
