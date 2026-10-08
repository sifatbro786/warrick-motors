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
export const TIME_SLOTS = ["10:00 – 12:00", "12:00 – 14:00", "14:00 – 16:00", "16:00 – 18:00", "18:00 – 20:00"];

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
    if (!isBdMobile(data.phone)) fieldErrors.phone = "Enter a valid Bangladeshi mobile number, e.g. 01712-345678.";
    if (!showroomIds.includes(data.showroom)) fieldErrors.showroom = "Choose a showroom.";
    if (!VISIT_TYPES.includes(data.visitType)) fieldErrors.visitType = "Choose a visit type.";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || data.date < todayISO) fieldErrors.date = "Pick today or a later date.";
    if (!TIME_SLOTS.includes(data.slot)) fieldErrors.slot = "Choose a time slot.";

    return { data: Object.keys(fieldErrors).length ? null : data, fieldErrors, spam: Boolean(data.company) };
}

/* ---------------------------------------------------------------------------
   Pre-order / import request
   ------------------------------------------------------------------------ */
export const IMPORT_BRANDS = [
    "Toyota", "Lexus", "Honda", "Nissan", "Mitsubishi", "Mazda", "Subaru", "Suzuki",
    "Mercedes-Benz", "BMW", "Audi", "Land Rover", "Porsche", "Hyundai", "Kia", "Other",
];
export const PREORDER_TIMELINES = ["As soon as possible", "Within 2 months", "Within 3–6 months", "Just exploring"];
export const PAYMENT_MODES = ["Full payment", "Bank loan", "Exchange my car + pay balance"];
export const CONDITION_PREFS = ["Recondition", "Brand New", "Either"];

export function validatePreOrder(formData) {
    const n = (k) => {
        const v = Number.parseInt(clean(formData.get(k), 6), 10);
        return Number.isFinite(v) ? v : null;
    };
    const data = {
        brand: clean(formData.get("brand"), 40),
        model: clean(formData.get("model"), 60),
        grade: clean(formData.get("grade"), 80),
        yearFrom: n("yearFrom"),
        yearTo: n("yearTo"),
        condition: clean(formData.get("condition"), 20),
        colors: clean(formData.get("colors"), 80),
        budget: clean(formData.get("budget"), 20),
        timeline: clean(formData.get("timeline"), 40),
        payment: clean(formData.get("payment"), 40),
        name: clean(formData.get("name"), 80),
        phone: normalizePhone(formData.get("phone")),
        email: clean(formData.get("email"), 120).toLowerCase(),
        note: clean(formData.get("note"), 800),
        company: clean(formData.get("company"), 100),
    };
    const year = new Date().getFullYear() + 1;
    const fieldErrors = {};
    if (!IMPORT_BRANDS.includes(data.brand)) fieldErrors.brand = "Choose a brand (or Other).";
    if (data.model.length < 2) fieldErrors.model = "Tell us the model, e.g. Harrier, Prado, Vezel.";
    if (data.yearFrom && (data.yearFrom < 2005 || data.yearFrom > year)) fieldErrors.yearFrom = "Enter a year between 2005 and " + year + ".";
    if (data.yearTo && (data.yearTo < 2005 || data.yearTo > year)) fieldErrors.yearTo = "Enter a year between 2005 and " + year + ".";
    if (data.yearFrom && data.yearTo && data.yearFrom > data.yearTo) fieldErrors.yearTo = "'To' year must be after 'From' year.";
    if (!CONDITION_PREFS.includes(data.condition)) fieldErrors.condition = "Choose a condition.";
    if (!PREORDER_TIMELINES.includes(data.timeline)) fieldErrors.timeline = "Choose when you need the car.";
    if (!PAYMENT_MODES.includes(data.payment)) fieldErrors.payment = "Choose how you plan to pay.";
    if (data.name.length < 2) fieldErrors.name = "Please enter your full name.";
    if (!isBdMobile(data.phone)) fieldErrors.phone = "Enter a valid Bangladeshi mobile number, e.g. 01712-345678.";
    if (data.email && !isEmail(data.email)) fieldErrors.email = "Enter a valid email or leave it empty.";

    return { data: Object.keys(fieldErrors).length ? null : data, fieldErrors, spam: Boolean(data.company) };
}

/* ---------------------------------------------------------------------------
   Contact
   ------------------------------------------------------------------------ */
export const CONTACT_TOPICS = ["Buying a car", "Pre-order / import", "Sell or exchange my car", "Bank loan", "After-sales & service", "Something else"];

export function validateContact(formData) {
    const data = {
        name: clean(formData.get("name"), 80),
        phone: normalizePhone(formData.get("phone")),
        email: clean(formData.get("email"), 120).toLowerCase(),
        topic: clean(formData.get("topic"), 40),
        message: String(formData.get("message") ?? "").replace(/<[^>]*>/g, "").trim().slice(0, 1500),
        company: clean(formData.get("company"), 100),
    };
    const fieldErrors = {};
    if (data.name.length < 2) fieldErrors.name = "Please enter your full name.";
    if (!isBdMobile(data.phone)) fieldErrors.phone = "Enter a valid Bangladeshi mobile number, e.g. 01712-345678.";
    if (data.email && !isEmail(data.email)) fieldErrors.email = "Enter a valid email or leave it empty.";
    if (!CONTACT_TOPICS.includes(data.topic)) fieldErrors.topic = "Choose a topic.";
    if (data.message.length < 10) fieldErrors.message = "Please write a little more (at least 10 characters).";
    return { data: Object.keys(fieldErrors).length ? null : data, fieldErrors, spam: Boolean(data.company) };
}
