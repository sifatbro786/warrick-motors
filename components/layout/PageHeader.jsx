import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils/format";

/**
 * Navy page intro band used by every inner page (inventory, showroom, about…).
 * `crumbs` = [{ label, href? }] — last item is the current page.
 */
export default function PageHeader({
    eyebrow,
    title,
    description,
    crumbs = [],
    children,
    className,
}) {
    return (
        <section className={cn("relative overflow-hidden bg-ink-900 text-white", className)}>
            <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(90deg,#fff_0_1px,transparent_1px_120px)]"
            />
            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold-500/50 to-transparent"
            />
            <div className="container-page relative py-12 md:py-16">
                {crumbs.length > 0 && <Breadcrumbs items={crumbs} tone="dark" />}
                {eyebrow && <p className="eyebrow mt-8 text-gold-300">{eyebrow}</p>}
                <h1 className="mt-3 max-w-3xl text-[2.2rem] leading-[1.05] font-bold tracking-[-0.03em] text-white sm:text-5xl">
                    {title}
                </h1>
                {description && (
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-300 sm:text-base">
                        {description}
                    </p>
                )}
                {children && <div className="mt-8">{children}</div>}
            </div>
        </section>
    );
}

export function Breadcrumbs({ items = [], tone = "light", className }) {
    const dark = tone === "dark";
    return (
        <nav aria-label="Breadcrumb" className={className}>
            <ol
                className={cn(
                    "flex flex-wrap items-center gap-1.5 text-[13px]",
                    dark ? "text-ink-300" : "text-ink-500",
                )}
            >
                <li>
                    <Link
                        href="/"
                        className={cn(
                            "transition-colors",
                            dark ? "hover:text-white" : "hover:text-ink-900",
                        )}
                    >
                        Home
                    </Link>
                </li>
                {items.map((c, i) => {
                    const last = i === items.length - 1;
                    return (
                        <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
                            <Icon name="chevron-right" size={14} className="opacity-50" />
                            {last || !c.href ? (
                                <span
                                    aria-current={last ? "page" : undefined}
                                    className={cn(
                                        "line-clamp-1",
                                        dark ? "text-white" : "text-ink-900",
                                    )}
                                >
                                    {c.label}
                                </span>
                            ) : (
                                <Link
                                    href={c.href}
                                    className={cn(
                                        "transition-colors",
                                        dark ? "hover:text-white" : "hover:text-ink-900",
                                    )}
                                >
                                    {c.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
