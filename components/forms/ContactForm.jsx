"use client";

import { useActionState, useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import { sendContactMessage } from "@/lib/actions/lead.actions";
import { CONTACT_TOPICS } from "@/lib/validation/lead";
import { buildWhatsAppLink } from "@/lib/utils/contact";
import {
    INITIAL_FORM_STATE,
    Field,
    Select,
    Honeypot,
    FormError,
    FormSuccess,
    fieldAria,
    inputClass,
} from "@/components/forms/fields";
import { cn } from "@/lib/utils/format";

/** Editorial "underline" contact form (Kraftwerk inquiry reference). */
export default function ContactForm({ defaultTopic = CONTACT_TOPICS[0] }) {
    const [state, formAction, pending] = useActionState(sendContactMessage, INITIAL_FORM_STATE);
    const formRef = useRef(null);
    const errors = state.fieldErrors || {};
    const u = (name) => inputClass(errors[name], "underline");

    useEffect(() => {
        const first = Object.keys(state.fieldErrors || {})[0];
        if (first) formRef.current?.querySelector(`[name="${first}"]`)?.focus();
    }, [state]);

    if (state.ok) {
        return (
            <FormSuccess title="Message sent" state={state}>
                <Button href={buildWhatsAppLink()} variant="whatsapp" icon="whatsapp">
                    Need it faster? WhatsApp us
                </Button>
            </FormSuccess>
        );
    }

    return (
        <form
            ref={formRef}
            action={formAction}
            noValidate
            className="grid gap-x-8 gap-y-6 sm:grid-cols-2"
        >
            <Honeypot />
            <Field label="Full name" name="name" error={errors.name} required>
                <input {...fieldAria("name", errors)} autoComplete="name" className={u("name")} />
            </Field>
            <Field label="Mobile number" name="phone" error={errors.phone} required>
                <input
                    {...fieldAria("phone", errors)}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    className={u("phone")}
                    placeholder="01XXX-XXXXXX"
                />
            </Field>
            <Field label="Email (optional)" name="email" error={errors.email}>
                <input
                    {...fieldAria("email", errors)}
                    type="email"
                    autoComplete="email"
                    className={u("email")}
                />
            </Field>
            <Field label="Topic" name="topic" error={errors.topic}>
                <Select
                    {...fieldAria("topic", errors)}
                    defaultValue={defaultTopic}
                    error={errors.topic}
                    variant="underline"
                >
                    {CONTACT_TOPICS.map((t) => (
                        <option key={t}>{t}</option>
                    ))}
                </Select>
            </Field>
            <Field
                label="Message"
                name="message"
                error={errors.message}
                required
                className="sm:col-span-2"
            >
                <textarea
                    {...fieldAria("message", errors)}
                    rows={4}
                    maxLength={1500}
                    className={cn(u("message"), "h-auto resize-y py-3")}
                    placeholder="Which car, your budget, questions…"
                />
            </Field>
            <div className="sm:col-span-2">
                <FormError state={state} />
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <Button
                    type="submit"
                    pending={pending}
                    size="lg"
                    iconRight="arrow-right"
                    className="rounded-none! px-9 tracking-wide uppercase"
                >
                    {pending ? "Sending…" : "Submit inquiry"}
                </Button>
                <p className="text-[12.5px] text-ink-500">
                    We reply within working hours, usually the same day.
                </p>
            </div>
        </form>
    );
}
