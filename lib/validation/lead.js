/**
 * Lead/form validation — pure functions shared by Server Actions (authoritative)
 * and, optionally, client-side pre-checks. Never trust the client copy.
 */

const BD_MOBILE = /^(?:\+?88)?01[3-9]\d{8}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Trim, collapse whitespace, strip tags/control chars, cap length. */
export function clean(value, max = 200) {
    return String(value ?? "")
        .replace(/<[^>]*>/g, "")
        .replace(/[\u0000-\u001F\u007F]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, max);
}

export const normalizePhone = (v) => clean(v, 20).replace(/[\s-]/g, "");

export const isBdMobile = (v) => BD_MOBILE.test(normalizePhone(v));
export const isEmail = (v) => EMAIL.test(v);

export const VISIT_TYPES = ["Showroom Visit", "Test Drive", "Price Consultation"];
export const TIME_SLOTS = [
    "10:00 – 12:00",
    "12:00 – 14:00",
    "14:00 – 16:00",
    "16:00 – 18:00",
    "18:00 – 20:00",
];

/**
 * @param {FormData} formData
 * @param {{ showroomIds: string[], todayISO: string }} ctx
 * @returns {{ data: object|null, fieldErrors: Record<string,string> }}
 */
export function validateVisit(formData, { showroomIds, todayISO }) {
    const data = {
        name: clean(formData.get("name"), 80),
        phone: normalizePhone(formData.get("phone")),
        showroom: clean(formData.get("showroom"), 30),
        visitType: clean(formData.get("visitType"), 40),
        date: clean(formData.get("date"), 10),
        slot: clean(formData.get("slot"), 20),
        carId: clean(formData.get("carId"), 60) || null,
        note: clean(formData.get("note"), 500),
        // honeypot — real users never fill this
        company: clean(formData.get("company"), 100),
    };

    const fieldErrors = {};
    if (data.name.length < 2) fieldErrors.name = "Please enter your full name.";
    if (!isBdMobile(data.phone))
        fieldErrors.phone = "Enter a valid Bangladeshi mobile number, e.g. 01712-345678.";
    if (!showroomIds.includes(data.showroom)) fieldErrors.showroom = "Choose a showroom.";
    if (!VISIT_TYPES.includes(data.visitType)) fieldErrors.visitType = "Choose a visit type.";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || data.date < todayISO)
        fieldErrors.date = "Pick today or a later date.";
    if (!TIME_SLOTS.includes(data.slot)) fieldErrors.slot = "Choose a time slot.";

    return {
        data: Object.keys(fieldErrors).length ? null : data,
        fieldErrors,
        spam: Boolean(data.company),
    };
}
