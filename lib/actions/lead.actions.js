"use server";

import { validateContact, validatePreOrder } from "@/lib/validation/lead";

/**
 * Pre-order and contact Server Actions — same contract as requestShowroomVisit:
 *   { ok, message, fieldErrors?, reference? }
 * TODAY: validate + log. LATER: Lead.create(...) + sendMail(...) here only.
 */

const ref = (prefix) => `${prefix}-${Date.now().toString(36).toUpperCase().slice(-6)}`;

export async function requestPreOrder(_prev, formData) {
    const { data, fieldErrors, spam } = validatePreOrder(formData);
    if (spam) return { ok: true, message: "Thanks — we'll be in touch shortly." };
    if (!data) return { ok: false, message: "Please fix the highlighted fields.", fieldErrors };

    const reference = ref("WMP");
    // TODO(backend): persist Lead { type: "pre-order" } + email sourcing team
    console.info("[lead:pre-order]", { reference, ...data });

    return {
        ok: true,
        reference,
        message: `We've got your request for a ${data.brand === "Other" ? "" : `${data.brand} `}${data.model}. Our sourcing team will WhatsApp ${data.phone} with auction options and sheets within 48 hours.`,
    };
}

export async function sendContactMessage(_prev, formData) {
    const { data, fieldErrors, spam } = validateContact(formData);
    if (spam) return { ok: true, message: "Thanks — we'll be in touch shortly." };
    if (!data) return { ok: false, message: "Please fix the highlighted fields.", fieldErrors };

    const reference = ref("WMC");
    // TODO(backend): persist Lead { type: "contact" } + notify sales desk
    console.info("[lead:contact]", { reference, ...data });

    return {
        ok: true,
        reference,
        message: `Thanks ${data.name.split(" ")[0]} — your message about "${data.topic.toLowerCase()}" is with our team. We reply within working hours, usually the same day.`,
    };
}
