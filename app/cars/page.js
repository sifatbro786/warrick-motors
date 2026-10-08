import { Suspense } from "react";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import CarFilterSidebar from "@/components/cars/CarFilterSidebar";
import InventoryResults, { InventorySkeleton } from "@/components/cars/InventoryResults";
import { getFilterOptions } from "@/lib/services/car.service";
import { STOCK_STATUS_META } from "@/lib/constants/inventory";

export const metadata = {
    title: "Car Inventory — Ready, On The Way & Pre-Order",
    description:
        "Browse imported reconditioned and brand-new cars in Dhaka and Chattogram. Filter by brand, model, year, fuel type, body style and budget in BDT.",
    alternates: { canonical: "/cars" },
};

/**
 * Static shell (header band + filter options) prerenders; the results read
 * searchParams at request time inside <Suspense>.
 */
export default async function CarsPage({ searchParams }) {
    const options = await getFilterOptions();

    return (
        <>
            <PageHeader
                crumbs={[{ label: "Inventory" }]}
                eyebrow="Car inventory"
                title={`${options.counts.total} imports, verified and priced in BDT.`}
                description="Ready cars are on our showroom floor today. Shipments on the way can be reserved before they land, and anything else we source to order."
            >
                <ul className="flex flex-wrap gap-2">
                    {Object.entries(STOCK_STATUS_META).map(([status, m]) => (
                        <li key={m.key}>
                            <Link
                                href={`/cars?status=${m.key}`}
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-white/85 transition-colors hover:border-gold-400 hover:text-white"
                            >
                                {m.short}
                                <span className="nums text-gold-300">{options.counts.byStatus[status] || 0}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </PageHeader>

            <section className="bg-paper py-10 md:py-14">
                <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-8">
                    <Suspense fallback={<div className="hidden h-[640px] animate-pulse rounded-[var(--radius-card)] bg-line lg:block" />}>
                        <CarFilterSidebar options={options} />
                    </Suspense>
                    <Suspense fallback={<InventorySkeleton />}>
                        <InventoryResults searchParams={searchParams} />
                    </Suspense>
                </div>
            </section>
        </>
    );
}
