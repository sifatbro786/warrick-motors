import Link from "next/link";
import { cacheLife } from "next/cache";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import { siteConfig, telHref } from "@/lib/config/site";
import { STOCK_STATUS_META } from "@/lib/constants/inventory";

const INVENTORY_LINKS = [
    ...Object.values(STOCK_STATUS_META).map((m) => ({ label: m.short, href: `/cars?status=${m.key}` })),
    { label: "Hybrid Cars", href: "/cars?fuel=Hybrid" },
    { label: "SUVs", href: "/cars?body=SUV" },
];

const COMPANY_LINKS = [
    { label: "About Warrick", href: "/about" },
    { label: "Showroom & Services", href: "/showroom" },
    { label: "Import / Pre-Order", href: "/pre-order" },
    { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
    return (
        <footer className="relative mt-auto bg-ink-900 text-ink-300">
            {/* Gold hairline — the only ornament */}
            <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

            <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
                <div className="md:col-span-4">
                    <Logo tone="light" />
                    <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink-300">
                        Direct importers of reconditioned and brand-new cars from Japan, the UK and the UAE —
                        auction sheet verified, documents in your hand.
                    </p>
                    <ul className="mt-8 flex gap-2">
                        {siteConfig.social.map((s) => (
                            <li key={s.label}>
                                <a
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-ink-300 transition-colors hover:border-gold-400 hover:text-gold-300"
                                >
                                    <Icon name={s.icon} size={18} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <FooterColumn title="Inventory" links={INVENTORY_LINKS} className="md:col-span-2" />
                <FooterColumn title="Company" links={COMPANY_LINKS} className="md:col-span-2" />

                <div className="md:col-span-4">
                    <h2 className="eyebrow text-gold-300">Visit Us</h2>
                    <ul className="mt-5 space-y-5">
                        {siteConfig.showrooms.map((s) => (
                            <li key={s.id} className="text-[14.5px] leading-relaxed">
                                <p className="font-medium text-white">
                                    {s.city} <span className="text-ink-400">— {s.label}</span>
                                </p>
                                <p>{s.address}</p>
                                <a
                                    href={s.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 inline-flex items-center gap-1 text-[13px] text-gold-300 hover:text-gold-200"
                                >
                                    Open in Google Maps <Icon name="arrow-up-right" size={14} />
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 space-y-1.5 border-t border-white/10 pt-5 text-[14.5px]">
                        <a href={telHref(siteConfig.contact.hotline)} className="nums flex items-center gap-2 text-white hover:text-gold-200">
                            <Icon name="phone" size={16} className="text-gold-400" /> {siteConfig.contact.hotlineDisplay}
                        </a>
                        <a href={telHref(siteConfig.contact.sales)} className="nums flex items-center gap-2 hover:text-white">
                            <Icon name="phone" size={16} className="text-gold-400" /> {siteConfig.contact.salesDisplay}
                        </a>
                        <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-white">
                            <Icon name="mail" size={16} className="text-gold-400" /> {siteConfig.contact.email}
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/8">
                <div className="container-page flex flex-col gap-3 py-6 text-[13px] text-ink-400 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © <CopyrightYear /> {siteConfig.legalName}. All rights reserved.
                    </p>
                    <p>{siteConfig.hours.map((h) => `${h.days}: ${h.time}`).join("  ·  ")}</p>
                </div>
            </div>
        </footer>
    );
}

// Cache Components treats `new Date()` in render as request-time data; caching it keeps the footer static.
async function CopyrightYear() {
    "use cache";
    cacheLife("days");
    return new Date().getFullYear();
}

function FooterColumn({ title, links, className }) {
    return (
        <div className={className}>
            <h2 className="eyebrow text-gold-300">{title}</h2>
            <ul className="mt-5 space-y-3 text-[14.5px]">
                {links.map((l) => (
                    <li key={l.href}>
                        <Link href={l.href} className="transition-colors hover:text-white">
                            {l.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
