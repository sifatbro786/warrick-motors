import StockBadge from "@/components/cars/StockBadge";
import PriceTag from "@/components/cars/PriceTag";
import SpecChips from "@/components/cars/SpecChips";
import ShowroomVisitButton from "@/components/forms/ShowroomVisitButton";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { STOCK_STATUS } from "@/lib/constants/inventory";
import { siteConfig, telHref } from "@/lib/config/site";
import { buildWhatsAppLink } from "@/lib/utils/contact";

/** Sticky buy box on /cars/[id]. Primary CTA wording follows stock status. */
export default function PurchasePanel({ car }) {
    const ready = car.stockStatus === STOCK_STATUS.READY;
    const cta = ready
        ? { label: "Book a Test Drive", type: "Test Drive" }
        : { label: car.stockStatus === STOCK_STATUS.PRE_ORDER ? "Book a Pre-Order Consultation" : "Reserve — Book a Consultation", type: "Price Consultation" };

    return (
        <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-card sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <StockBadge status={car.stockStatus} location={car.location} />
                <span className="nums font-mono text-[11.5px] tracking-wider text-ink-400">Stock # {car.stockNo}</span>
            </div>

            <p className="eyebrow mt-6 text-gold-600">{car.brand}</p>
            <h1 className="mt-2 text-[1.75rem] leading-[1.1] font-bold tracking-[-0.025em] sm:text-[2rem]">
                {car.year} {car.title.replace(`${car.brand} `, "")}
            </h1>
            <p className="mt-1.5 text-[14px] text-ink-500">
                {car.grade} · {car.color}
            </p>

            {car.eta && (
                <p className="mt-5 flex items-start gap-2.5 rounded-xl bg-transit-bg px-4 py-3 text-[13.5px] text-transit">
                    <Icon name={car.stockStatus === STOCK_STATUS.PRE_ORDER ? "calendar" : "ship"} size={18} className="mt-0.5 shrink-0" />
                    {car.eta}
                </p>
            )}

            <div className="mt-6 border-t border-dashed border-line pt-6">
                <PriceTag price={car.price} negotiable={car.negotiable} size="lg" />
                <a href="#loan" className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-ink-600 underline decoration-gold-500 underline-offset-4 hover:text-ink-900">
                    Estimate bank loan EMI
                    <Icon name="arrow-right" size={14} />
                </a>
            </div>

            <SpecChips car={car} variant="grid" className="mt-6" />

            <div className="mt-6 grid gap-2.5">
                <ShowroomVisitButton car={car} defaultType={cta.type} size="lg" iconRight="arrow-right" className="w-full">
                    {cta.label}
                </ShowroomVisitButton>
                <div className="grid grid-cols-2 gap-2.5">
                    <Button href={buildWhatsAppLink({ car })} variant="whatsapp" icon="whatsapp" className="w-full">
                        WhatsApp
                    </Button>
                    <Button href={telHref(siteConfig.contact.hotline)} variant="outline" icon="phone" className="w-full">
                        Call Sales
                    </Button>
                </div>
            </div>

            <ul className="mt-6 grid gap-2.5 border-t border-line pt-5 text-[13px] text-ink-600">
                {[
                    car.auctionGrade ? `Auction sheet grade ${car.auctionGrade} — shared on request` : "Full import documents shared before payment",
                    "Mileage verified against export certificate",
                    "BRTA registration & bank loan handled by us",
                ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                        <Icon name="shield-check" size={16} className="mt-0.5 shrink-0 text-ready" />
                        {t}
                    </li>
                ))}
            </ul>
        </div>
    );
}
