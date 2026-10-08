import Icon from "@/components/ui/Icon";
import { buildWhatsAppLink } from "@/lib/utils/contact";

/** Fixed WhatsApp chat launcher. Pure link — no client JS. */
export default function FloatingWhatsApp() {
    return (
        <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Warrick Motors on WhatsApp"
            className="group fixed right-4 bottom-4 z-50 flex items-center gap-0 rounded-full bg-whatsapp p-3.5 text-white shadow-float transition-[gap,padding] duration-500 ease-out-expo hover:gap-2.5 hover:pr-5 sm:right-6 sm:bottom-6"
        >
            <Icon name="whatsapp" size={26} />
            <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-[max-width] duration-500 ease-out-expo group-hover:max-w-40">
                Chat with Sales
            </span>
        </a>
    );
}
