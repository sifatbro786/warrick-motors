import Link from "next/link";
import CarCard from "@/components/cars/CarCard";
import StatusTabs from "@/components/home/StatusTabs";
import SectionHeading, { Accent } from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { STOCK_STATUS_META } from "@/lib/constants/inventory";

/** Server wrapper: builds one panel of CarCards per status and hands them to the client tabs. */
export default function StockStatusSection({ byStatus = {} }) {
    const tabs = Object.entries(STOCK_STATUS_META).map(([status, meta]) => {
        const { items = [], total = 0 } = byStatus[status] || {};
        return {
            key: meta.key,
            label: meta.short,
            count: total,
            sub: meta.description,
            panel: (
                <>
                    <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2 xl:grid-cols-4">
                        {items.map((car) => (
                            <CarCard
                                key={car.id}
                                car={car}
                                className="w-[84%] shrink-0 snap-start sm:w-auto"
                            />
                        ))}
                    </div>
                    <Link
                        href={`/cars?status=${meta.key}`}
                        className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 hover:text-gold-200"
                    >
                        See all {total} — {meta.short}
                        <Icon
                            name="arrow-right"
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>
                </>
            ),
        };
    });

    return (
        <section className="relative overflow-hidden bg-ink-900 py-20 text-white md:py-28">
            {/* Faint oversized wordmark — texture, not decoration noise */}
            {/* Oversized watermark drawn via CSS content — decorative, not in the accessibility tree */}
            <div
                aria-hidden="true"
                data-text="IN STOCK"
                className="pointer-events-none absolute -top-6 right-[-2%] font-display text-[18vw] leading-none font-extrabold tracking-[-0.06em] whitespace-nowrap text-white/2.5 select-none before:content-[attr(data-text)]"
            />
            <div className="container-page relative">
                <SectionHeading
                    index="03"
                    eyebrow="Live stock status"
                    tone="dark"
                    title={
                        <>
                            On the floor, on the <Accent tone="dark">water</Accent>, or on order.
                        </>
                    }
                    description="Ready cars can be test-driven today. Shipments on the way can be reserved before they land. Anything else, we source for you."
                    className="mb-10"
                />
                <StatusTabs tabs={tabs} />
            </div>
        </section>
    );
}
