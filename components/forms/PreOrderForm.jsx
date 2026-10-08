"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { requestPreOrder } from "@/lib/actions/lead.actions";
import {
    CONDITION_PREFS,
    IMPORT_BRANDS,
    PAYMENT_MODES,
    PREORDER_TIMELINES,
} from "@/lib/validation/lead";
import { BUDGET_RANGES } from "@/lib/constants/inventory";
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
} from "@/components/forms/fields";
import { cn } from "@/lib/utils/format";

/**
 * Import request form. `initial` can prefill brand/model (from ?brand=&model=
 * or a "Request this model" link). Popular chips fill the same two fields.
 */
export default function PreOrderForm({ initial = {}, popular = [] }) {
    const [state, formAction, pending] = useActionState(requestPreOrder, INITIAL_FORM_STATE);
    const [brand, setBrand] = useState(IMPORT_BRANDS.includes(initial.brand) ? initial.brand : "");
    const [model, setModel] = useState(initial.model || "");
    const formRef = useRef(null);
    const errors = state.fieldErrors || {};
    const years = Array.from({ length: 2027 - 2012 + 1 }, (_, i) => 2027 - i);

    useEffect(() => {
        const first = Object.keys(state.fieldErrors || {})[0];
        if (first) formRef.current?.querySelector(`[name="${first}"]`)?.focus();
    }, [state]);

    if (state.ok) {
        return (
            <div className="rounded-card border border-line bg-white p-7 shadow-card sm:p-10">
                <FormSuccess title="Request received" state={state}>
                    <Button
                        href={buildWhatsAppLink({
                            message: `Hello Warrick Motors, following up on my import request ${state.reference}.`,
                        })}
                        variant="whatsapp"
                        icon="whatsapp"
                    >
                        Follow up on WhatsApp
                    </Button>
                    <Button href="/cars?status=pre-order" variant="outline">
                        See cars on order
                    </Button>
                </FormSuccess>
            </div>
        );
    }

    return (
        <form
            ref={formRef}
            action={formAction}
            noValidate
            className="rounded-card border border-line bg-white shadow-card"
        >
            <Honeypot />

            {/* 01 — the car */}
            <FormSection index="01" title="The car you want">
                {popular.length > 0 && (
                    <div className="sm:col-span-2">
                        <p className="mb-2 text-[12px] font-medium text-ink-500">
                            Popular requests — tap to fill
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {popular.map((p) => {
                                const active = brand === p.brand && model === p.model;
                                return (
                                    <button
                                        key={`${p.brand}-${p.model}`}
                                        type="button"
                                        aria-pressed={active}
                                        onClick={() => {
                                            setBrand(p.brand);
                                            setModel(p.model);
                                        }}
                                        className={cn(
                                            "cursor-pointer rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                                            active
                                                ? "border-gold-500 bg-gold-200/50 text-ink-900"
                                                : "border-dashed border-line-strong text-ink-700 hover:border-ink-900",
                                        )}
                                    >
                                        {p.brand} {p.model}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
                <Field label="Brand" name="brand" error={errors.brand} required>
                    <Select
                        {...fieldAria("brand", errors)}
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        error={errors.brand}
                    >
                        <option value="">Select a brand</option>
                        {IMPORT_BRANDS.map((b) => (
                            <option key={b}>{b}</option>
                        ))}
                    </Select>
                </Field>
                <Field label="Model" name="model" error={errors.model} required>
                    <input
                        {...fieldAria("model", errors)}
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className={inputClass(errors.model)}
                        placeholder="e.g. Harrier, Prado, Vezel"
                    />
                </Field>
                <Field
                    label="Grade / package (optional)"
                    name="grade"
                    className="sm:col-span-2"
                    hint="e.g. Z Leather, TX-L, e:HEV Z — leave blank if unsure."
                >
                    <input
                        {...fieldAria("grade", errors)}
                        className={inputClass()}
                        placeholder="Grade or package"
                    />
                </Field>
                <Field label="Year from" name="yearFrom" error={errors.yearFrom}>
                    <Select
                        {...fieldAria("yearFrom", errors)}
                        defaultValue=""
                        error={errors.yearFrom}
                    >
                        <option value="">Any</option>
                        {years.map((y) => (
                            <option key={y}>{y}</option>
                        ))}
                    </Select>
                </Field>
                <Field label="Year to" name="yearTo" error={errors.yearTo}>
                    <Select {...fieldAria("yearTo", errors)} defaultValue="" error={errors.yearTo}>
                        <option value="">Any</option>
                        {years.map((y) => (
                            <option key={y}>{y}</option>
                        ))}
                    </Select>
                </Field>
                <Field label="Condition" name="condition" error={errors.condition} group>
                    <ChoiceChips
                        name="condition"
                        options={CONDITION_PREFS}
                        defaultValue="Recondition"
                        labelledBy="condition-label"
                    />
                </Field>
                <Field label="Colour preference (optional)" name="colors">
                    <input
                        {...fieldAria("colors", errors)}
                        className={inputClass()}
                        placeholder="e.g. Pearl white or black"
                    />
                </Field>
            </FormSection>

            {/* 02 — budget & timing */}
            <FormSection index="02" title="Budget & timing">
                <Field label="Budget" name="budget">
                    <Select {...fieldAria("budget", errors)} defaultValue="">
                        <option value="">Not decided</option>
                        {BUDGET_RANGES.map((b) => (
                            <option key={b.key} value={b.key}>
                                {b.label}
                            </option>
                        ))}
                    </Select>
                </Field>
                <Field label="How will you pay?" name="payment" error={errors.payment}>
                    <Select
                        {...fieldAria("payment", errors)}
                        defaultValue={PAYMENT_MODES[0]}
                        error={errors.payment}
                    >
                        {PAYMENT_MODES.map((p) => (
                            <option key={p}>{p}</option>
                        ))}
                    </Select>
                </Field>
                <Field
                    label="When do you need it?"
                    name="timeline"
                    error={errors.timeline}
                    group
                    className="sm:col-span-2"
                >
                    <ChoiceChips
                        name="timeline"
                        options={PREORDER_TIMELINES}
                        defaultValue={PREORDER_TIMELINES[1]}
                        labelledBy="timeline-label"
                    />
                </Field>
            </FormSection>

            {/* 03 — contact */}
            <FormSection index="03" title="Your details" last>
                <Field label="Full name" name="name" error={errors.name} required>
                    <input
                        {...fieldAria("name", errors)}
                        autoComplete="name"
                        className={inputClass(errors.name)}
                        placeholder="Your name"
                    />
                </Field>
                <Field label="Mobile (WhatsApp)" name="phone" error={errors.phone} required>
                    <input
                        {...fieldAria("phone", errors)}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        className={inputClass(errors.phone)}
                        placeholder="01XXX-XXXXXX"
                    />
                </Field>
                <Field
                    label="Email (optional)"
                    name="email"
                    error={errors.email}
                    className="sm:col-span-2"
                >
                    <input
                        {...fieldAria("email", errors)}
                        type="email"
                        autoComplete="email"
                        className={inputClass(errors.email)}
                        placeholder="you@example.com"
                    />
                </Field>
                <Field label="Anything else? (optional)" name="note" className="sm:col-span-2">
                    <textarea
                        {...fieldAria("note", errors)}
                        rows={3}
                        maxLength={800}
                        className={cn(inputClass(), "h-auto py-3")}
                        placeholder="Must-have features, mileage limit, sunroof…"
                    />
                </Field>
                <div className="sm:col-span-2">
                    <FormError state={state} />
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                    <Button type="submit" pending={pending} size="lg" iconRight="arrow-right">
                        {pending ? "Sending…" : "Send import request"}
                    </Button>
                    <p className="flex items-center gap-1.5 text-[12.5px] text-ink-500">
                        <Icon name="shield-check" size={15} className="text-ready" />
                        No deposit until you approve a specific car.
                    </p>
                </div>
            </FormSection>
        </form>
    );
}

function FormSection({ index, title, last = false, children }) {
    return (
        <fieldset
            className={cn(
                "grid gap-4 p-6 sm:grid-cols-2 sm:p-8",
                !last && "border-b border-dashed border-line",
            )}
        >
            <legend className="sr-only">{title}</legend>
            <p aria-hidden="true" className="flex items-center gap-3 sm:col-span-2">
                <span className="nums flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 font-mono text-[11px] text-gold-300">
                    {index}
                </span>
                <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
                    {title}
                </span>
            </p>
            {children}
        </fieldset>
    );
}
