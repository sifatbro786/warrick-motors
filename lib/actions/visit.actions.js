"use server";

import { siteConfig } from "@/lib/config/site";
import { validateVisit } from "@/lib/validation/lead";
import { getCarById } from "@/lib/services/car.service";

/**
 * Showroom visit / test-drive request.
 * Contract (used by every form in the app):
 *   returns { ok: boolean, message: string, fieldErrors?: Record<string,string>, reference?: string }
 *
 * TODAY: validates and logs.
 * LATER (Phase "Backend"): await Lead.create({...}) + await sendMail(visitTemplate(data))
 * — the form UI does not change.
 */
export async function requestShowroomVisit(_prevState, formData) {
    const todayISO = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });
    const { data, fieldErrors, spam } = validateVisit(formData, {
        showroomIds: siteConfig.showrooms.map((s) => s.id),
        todayISO,
    });

    // Silently accept bot submissions so they get no signal.
    if (spam) return { ok: true, message: "Thanks — we'll be in touch shortly." };

    if (!data) {
        return { ok: false, message: "Please fix the highlighted fields.", fieldErrors };
    }

    const car = data.carId ? await getCarById(data.carId) : null;
    const reference = `WMV-${Date.now().toString(36).toUpperCase().slice(-6)}`;

    // TODO(backend): persist + notify sales desk (Nodemailer / WhatsApp Business API)
    console.info("[lead:visit]", { reference, ...data, car: car?.stockNo || null });

    const showroom = siteConfig.showrooms.find((s) => s.id === data.showroom);
    return {
        ok: true,
        reference,
        message: `Booked for ${data.date}, ${data.slot} at our ${showroom.city} showroom. A consultant will call ${data.phone} to confirm.`,
    };
}
