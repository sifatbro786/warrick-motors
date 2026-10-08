import { siteConfig } from "@/lib/config/site";
import { formatBDT } from "@/lib/utils/format";

/**
 * Build a wa.me deep link with a pre-filled, car-specific message so sales
 * staff instantly know which unit the customer is asking about.
 */
export function buildWhatsAppLink({ car, message } = {}) {
    const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
    const text =
        message ||
        (car
            ? `Hello Warrick Motors, I'm interested in the ${car.year} ${car.title} (Stock #${car.stockNo}, ${formatBDT(car.price)}). Is it available?`
            : "Hello Warrick Motors, I'd like to know more about your available cars.");
    return `${base}?text=${encodeURIComponent(text)}`;
}

export const hotlineHref = () => `tel:${siteConfig.contact.hotline}`;
