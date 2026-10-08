import Link from "next/link";
import CarImage from "@/components/cars/CarImage";
import StockBadge from "@/components/cars/StockBadge";
import SpecChips from "@/components/cars/SpecChips";
import PriceTag from "@/components/cars/PriceTag";
import Icon from "@/components/ui/Icon";
import { siteConfig, telHref } from "@/lib/config/site";
import { buildWhatsAppLink } from "@/lib/utils/contact";
import { cn } from "@/lib/utils/format";

/**
 * Inventory card — server component. Receives a plain car object (from the
 * service layer), so it renders identically from mock data or MongoDB.
 *
 * Whole-card click target goes to details (stretched link), while Call /
 * WhatsApp stay independently clickable above it (z-10).
 */
export default function CarCard({ car, preload = false, className }) {
    const href = `/cars/${car.slug}`;
    const cover = car.images?.[0];

    return (
        <article
            className={cn(
                "group relative flex flex-col overflow-hidden rounded-card border border-line bg-card shadow-card",
                "transition-[box-shadow,transform,border-color] duration-500 ease-out-expo",
                "hover:-translate-y-1 hover:border-line-strong hover:shadow-card-hover",
                className,
            )}
        >
            {/* Media */}
            <div className="relative aspect-4/3 overflow-hidden bg-ink-800">
                <CarImage
                    src={cover?.src}
                    alt={cover?.alt || car.title}
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 45vw, 100vw"
                    preload={preload}
                    className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink-950/45 to-transparent"
                />
                <div className="absolute top-3 left-3">
                    <StockBadge
                        status={car.stockStatus}
                        location={car.location}
                        size="sm"
                        className="shadow-sm"
                    />
                </div>
                <span className="nums absolute top-3 right-3 rounded-md bg-ink-950/70 px-2 py-1 font-mono text-[10.5px] tracking-wider text-white/85 backdrop-blur-sm">
                    {car.stockNo}
                </span>
                {car.auctionGrade && (
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-[11.5px] font-medium text-white">
                        <Icon name="file-check" size={14} className="text-gold-300" />
                        Auction Grade {car.auctionGrade}
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-5">
                <p className="eyebrow text-[10.5px] text-gold-600">{car.brand}</p>
                <h3 className="mt-1.5 font-display text-[1.12rem] leading-snug font-semibold tracking-[-0.01em] text-ink-900">
                    <Link
                        href={href}
                        className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                    >
                        {car.year} {car.title.replace(`${car.brand} `, "")}
                    </Link>
                </h3>
                <p className="mt-1 line-clamp-1 text-[13px] text-ink-500">{car.grade}</p>

                <SpecChips car={car} className="mt-4" />

                <div className="mt-5 flex items-end justify-between gap-3 border-t border-dashed border-line pt-4">
                    <PriceTag price={car.price} negotiable={car.negotiable} />
                </div>

                {/* Actions — sit above the stretched link */}
                <div className="relative z-10 mt-4 grid grid-cols-[1fr_auto_auto] gap-2">
                    <Link
                        href={href}
                        className="group/btn inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-ink-900 px-4 text-[13px] font-medium text-white transition-colors hover:bg-ink-700"
                    >
                        View Details
                        <Icon
                            name="arrow-right"
                            size={16}
                            className="transition-transform group-hover/btn:translate-x-0.5"
                        />
                    </Link>
                    <a
                        href={telHref(siteConfig.contact.hotline)}
                        aria-label={`Call about ${car.title}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
                    >
                        <Icon name="phone" size={17} />
                    </a>
                    <a
                        href={buildWhatsAppLink({ car })}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp inquiry about ${car.title}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp/10 text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
                    >
                        <Icon name="whatsapp" size={19} />
                    </a>
                </div>
            </div>
        </article>
    );
}
