import Link from "next/link";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export const metadata = { title: "Page not found", robots: { index: false } };

const SUGGESTIONS = [
    { label: "Ready in showroom", href: "/cars?status=ready", icon: "car" },
    { label: "Shipments on the way", href: "/cars?status=shipment", icon: "ship" },
    { label: "Import a car to order", href: "/pre-order", icon: "file-check" },
    { label: "Showroom & directions", href: "/showroom", icon: "map-pin" },
];

/** Root 404 — a wrong turn, not a dead end. */
export default function NotFound() {
    return (
        <section className="paper-grain relative overflow-hidden bg-paper py-20 md:py-28">
            <div
                aria-hidden="true"
                data-text="404"
                className="pointer-events-none absolute top-1/2 right-[-4%] -translate-y-1/2 font-display text-[38vw] leading-none font-extrabold tracking-[-0.08em] text-ink-900/4 select-none before:content-[attr(data-text)] lg:text-[26vw]"
            />
            <div className="container-page relative max-w-3xl">
                <p className="eyebrow text-gold-600">Error 404 · Wrong turn</p>
                <h1 className="mt-4 text-[2.4rem] leading-[1.04] font-bold tracking-[-0.035em] sm:text-6xl">
                    This road doesn&apos;t lead to a showroom.
                </h1>
                <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-500">
                    The page may have moved, or the car you were looking at has already found its
                    owner. Here&apos;s where people usually head next:
                </p>
                <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                    {SUGGESTIONS.map((s) => (
                        <li key={s.href}>
                            <Link
                                href={s.href}
                                className="group flex items-center gap-4 rounded-card border border-line bg-white p-4 shadow-card transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-ink-900"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 text-gold-300">
                                    <Icon name={s.icon} size={19} />
                                </span>
                                <span className="flex-1 font-display text-[15.5px] font-semibold text-ink-900">
                                    {s.label}
                                </span>
                                <Icon
                                    name="arrow-right"
                                    size={18}
                                    className="text-ink-400 transition-transform group-hover:translate-x-1"
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="mt-10">
                    <Button href="/" variant="dark" icon="arrow-left">
                        Back to home
                    </Button>
                </div>
            </div>
        </section>
    );
}
