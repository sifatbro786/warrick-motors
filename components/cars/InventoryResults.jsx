import Link from "next/link";
import CarCard from "@/components/cars/CarCard";
import InventoryToolbar from "@/components/cars/InventoryToolbar";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { getCars, PAGE_SIZE } from "@/lib/services/car.service";
import { parseCarFilters, serializeCarFilters } from "@/lib/filters/car-filters";
import { cn } from "@/lib/utils/format";
import JsonLd from "@/components/seo/JsonLd";
import { itemListJsonLd } from "@/lib/seo/jsonld";

/**
 * Server component: reads the request's searchParams (runtime data → must sit
 * inside <Suspense>), queries the service, renders toolbar + grid + pagination.
 */
export default async function InventoryResults({ searchParams }) {
    const filters = parseCarFilters(await searchParams);
    const { items, total, page, pageCount } = await getCars(filters);
    const from = total ? (page - 1) * PAGE_SIZE + 1 : 0;
    const to = Math.min(page * PAGE_SIZE, total);

    return (
        <div className="flex flex-col gap-6">
            <h2 className="sr-only">Search results</h2>
            {items.length > 0 && <JsonLd data={itemListJsonLd(items, { offset: from - 1 })} />}
            <InventoryToolbar total={total} from={from} to={to} />

            {items.length ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {items.map((car, i) => (
                        <CarCard key={car.id} car={car} preload={i < 2} />
                    ))}
                </div>
            ) : (
                <EmptyState />
            )}

            {pageCount > 1 && <Pagination filters={filters} page={page} pageCount={pageCount} />}
        </div>
    );
}

function Pagination({ filters, page, pageCount }) {
    const href = (p) => `/cars${serializeCarFilters({ ...filters, page: p })}`;
    return (
        <nav aria-label="Pagination" className="mt-4 flex items-center justify-center gap-2">
            <PageLink href={href(page - 1)} disabled={page <= 1} label="Previous page">
                <Icon name="chevron-left" size={18} />
            </PageLink>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                <PageLink key={p} href={href(p)} current={p === page} label={`Page ${p}`}>
                    {p}
                </PageLink>
            ))}
            <PageLink href={href(page + 1)} disabled={page >= pageCount} label="Next page">
                <Icon name="chevron-right" size={18} />
            </PageLink>
        </nav>
    );
}

function PageLink({ href, current, disabled, label, children }) {
    const cls = cn(
        "nums inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors",
        current
            ? "bg-ink-900 text-white"
            : "border border-line-strong bg-white text-ink-800 hover:border-ink-900",
        disabled && "pointer-events-none opacity-40",
    );
    if (disabled)
        return (
            <span className={cls} aria-hidden="true">
                {children}
            </span>
        );
    return (
        <Link
            href={href}
            aria-label={label}
            aria-current={current ? "page" : undefined}
            className={cls}
            scroll
        >
            {children}
        </Link>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center rounded-card border border-dashed border-line-strong bg-white px-6 py-16 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper-warm text-ink-700">
                <Icon name="car" size={30} />
            </span>
            <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                Not in stock right now
            </h2>
            <p className="mt-2 max-w-md text-[15px] text-ink-500">
                We import to order. Tell us the model, grade and colour you want and we&apos;ll send
                auction options within 48 hours.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/pre-order" iconRight="arrow-right">
                    Request a Pre-Order
                </Button>
                <Button href="/cars" variant="outline">
                    Clear filters
                </Button>
            </div>
        </div>
    );
}

export function InventorySkeleton() {
    return (
        <div className="flex flex-col gap-6" aria-hidden="true">
            <div className="h-10 w-64 animate-pulse rounded-full bg-line" />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="overflow-hidden rounded-card border border-line bg-white"
                    >
                        <div className="aspect-4/3 animate-pulse bg-line" />
                        <div className="space-y-3 p-5">
                            <div className="h-3 w-16 animate-pulse rounded bg-line" />
                            <div className="h-5 w-3/4 animate-pulse rounded bg-line" />
                            <div className="h-8 w-1/2 animate-pulse rounded bg-line" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
