import Image from "@/components/ui/SmartImage";
import Link from "next/link";
import SectionHeading, { Accent } from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import BrandMark from "@/components/ui/BrandMark";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * Tall brand tiles (rRw reference) + a slow wordmark rail of every brand we
 * import. Counts come from live inventory, so a brand with 0 cars still links
 * to a useful pre-order-friendly empty state later.
 */
export default function BrowseByBrand({ tiles = [], brands = [], counts = {} }) {
    // brands: [{ name, monogram, origin, logo }] — duplicated for a seamless loop
    const rail = [...brands, ...brands];
    return (
        <section className="relative overflow-hidden bg-paper py-20 md:py-28">
            <div className="container-page">
                <SectionHeading
                    index="01"
                    eyebrow="Browse by brand"
                    title={
                        <>
                            Shop by the <Accent>badge</Accent> you trust.
                        </>
                    }
                    description="From everyday Toyota hybrids to flagship Lexus and AMG — every badge here is imported by us, not through a middleman."
                    action={
                        <Link
                            href="/cars"
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-900"
                        >
                            All {brands.length} brands
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:border-ink-900 group-hover:bg-ink-900 group-hover:text-white">
                                <Icon name="arrow-right" size={16} />
                            </span>
                        </Link>
                    }
                />

                <Stagger
                    className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4"
                    stagger={0.09}
                >
                    {tiles.map((t, i) => (
                        <StaggerItem key={t.brand} className={i % 2 ? "lg:mt-10" : ""}>
                            <Link
                                href={`/cars?brand=${encodeURIComponent(t.brand)}`}
                                className="group relative block aspect-3/4 overflow-hidden rounded-card bg-ink-800"
                            >
                                <Image
                                    src={t.image}
                                    alt={t.alt}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, 50vw"
                                    className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.07]"
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-linear-to-b from-ink-950/75 via-ink-950/10 to-ink-950/70"
                                />
                                <div className="absolute inset-x-0 top-0 p-4 sm:p-6">
                                    <h3 className="font-display text-xl leading-tight font-semibold tracking-tight text-white sm:text-3xl">
                                        {t.brand}
                                    </h3>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-6">
                                    <p className="text-[12.5px] text-white/80">
                                        <span className="nums font-display text-2xl font-semibold text-white">
                                            {String(counts[t.brand] || 0).padStart(2, "0")}
                                        </span>{" "}
                                        in stock
                                    </p>
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-900 transition-[background-color,color,transform] duration-500 group-hover:rotate-45 group-hover:bg-crimson-600 group-hover:text-white">
                                        <Icon name="arrow-up-right" size={18} />
                                    </span>
                                </div>
                            </Link>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>

            {/* Brand rail — badge + name, never pauses (client request) */}
            <div className="relative mt-16 border-y border-line bg-paper-warm/40 py-7 md:mt-20 mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <ul
                    className="flex w-max animate-marquee items-center gap-14"
                    aria-label="Brands we import"
                >
                    {rail.map((b, i) => {
                        const clone = i >= brands.length;
                        return (
                            <li key={`${b.name}-${i}`} aria-hidden={clone || undefined}>
                                <Link
                                    href={`/cars?brand=${encodeURIComponent(b.name)}`}
                                    tabIndex={clone ? -1 : undefined}
                                    className="group flex items-center gap-3.5"
                                >
                                    <BrandMark
                                        brand={b}
                                        size={52}
                                        className="group-hover:border-gold-500"
                                    />
                                    <span className="flex flex-col leading-tight">
                                        <span className="font-display text-[15px] font-bold tracking-[-0.01em] whitespace-nowrap text-ink-700 uppercase transition-colors group-hover:text-ink-900">
                                            {b.name}
                                        </span>
                                        <span className="text-[11.5px] whitespace-nowrap text-ink-500">
                                            {b.origin} ·{" "}
                                            {String(counts[b.name] || 0).padStart(2, "0")} in stock
                                        </span>
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
