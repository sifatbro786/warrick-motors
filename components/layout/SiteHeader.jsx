"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { siteConfig, telHref } from "@/lib/config/site";
import { buildWhatsAppLink } from "@/lib/utils/contact";
import { cn } from "@/lib/utils/format";

/**
 * Routes whose first section is a dark full-bleed hero → header starts transparent.
 * The hero must pull itself under the header (ShowroomHero uses -mt-[72px]).
 */
const OVERLAY_ROUTES = new Set(["/"]);

export default function SiteHeader() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [openPath, setOpenPath] = useState(null);
    // Menu auto-closes on navigation: it is "open" only for the path it was opened on.
    const open = openPath === pathname;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Lock body scroll + Esc to close while the mobile sheet is open
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e) => e.key === "Escape" && setOpenPath(null);
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const overlay = OVERLAY_ROUTES.has(pathname) && !scrolled && !open;
    const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

    return (
        <>
            {/* Utility strip — what a real dealership shows: where, when, who to call */}
            <div className="hidden bg-ink-950 text-[12.5px] text-ink-300 md:block">
                <div className="container-page flex h-9 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1.5">
                            <Icon name="map-pin" size={14} className="text-gold-400" />
                            {siteConfig.showrooms.map((s) => s.city).join(" · ")} Showrooms
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Icon name="clock" size={14} className="text-gold-400" />
                            {siteConfig.hours[0].days}, {siteConfig.hours[0].time}
                        </span>
                    </div>
                    <a
                        href={telHref(siteConfig.contact.hotline)}
                        className="nums flex items-center gap-1.5 hover:text-white"
                    >
                        <Icon name="phone" size={14} className="text-gold-400" />
                        Hotline {siteConfig.contact.hotlineDisplay}
                    </a>
                </div>
            </div>

            <header
                className={cn(
                    "sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-500",
                    overlay
                        ? "border-b border-white/10 bg-transparent"
                        : "border-b border-line bg-white/95 shadow-[0_1px_0_rgb(10_17_30/0.02)] backdrop-blur-md",
                )}
            >
                <div className="container-page flex h-18 items-center justify-between gap-6">
                    <Logo tone={overlay ? "light" : "dark"} priority />

                    <nav aria-label="Primary" className="hidden lg:block">
                        <ul className="flex items-center gap-1">
                            {siteConfig.nav.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        aria-current={isActive(item.href) ? "page" : undefined}
                                        className={cn(
                                            "relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors",
                                            overlay
                                                ? "text-white/85 hover:text-white"
                                                : "text-ink-600 hover:text-ink-900",
                                            isActive(item.href) &&
                                                (overlay ? "text-white" : "text-ink-900"),
                                        )}
                                    >
                                        {item.label}
                                        {isActive(item.href) && (
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-crimson-600"
                                            />
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-2">
                        <a
                            href={buildWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "hidden h-10 items-center gap-2 rounded-full px-3.5 text-[13.5px] font-medium transition-colors sm:inline-flex",
                                overlay
                                    ? "text-white hover:bg-white/10"
                                    : "text-ink-800 hover:bg-paper",
                            )}
                        >
                            <Icon name="whatsapp" size={18} className="text-whatsapp" />
                            WhatsApp
                        </a>
                        <span className="hidden sm:block">
                            <Button
                                href="/showroom#visit"
                                size="sm"
                                className="h-10 px-4"
                                iconRight="arrow-right"
                            >
                                Book a Visit
                            </Button>
                        </span>
                        <button
                            type="button"
                            onClick={() => setOpenPath(open ? null : pathname)}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            aria-label={open ? "Close menu" : "Open menu"}
                            className={cn(
                                "inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden",
                                overlay
                                    ? "text-white hover:bg-white/10"
                                    : "text-ink-900 hover:bg-paper",
                            )}
                        >
                            <Icon name={open ? "close" : "menu"} size={22} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile sheet */}
            <div
                id="mobile-menu"
                hidden={!open}
                className="fixed inset-x-0 top-18 bottom-0 z-30 overflow-y-auto bg-white lg:hidden"
            >
                <nav aria-label="Mobile" className="container-page py-6">
                    <ul className="divide-y divide-line border-y border-line">
                        {siteConfig.nav.map((item, i) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="flex items-center justify-between py-4 font-display text-2xl font-semibold tracking-tight text-ink-900"
                                >
                                    <span>
                                        <span className="nums mr-3 align-middle text-xs font-medium text-gold-600">
                                            0{i + 1}
                                        </span>
                                        {item.label}
                                    </span>
                                    <Icon
                                        name="arrow-up-right"
                                        size={20}
                                        className="text-ink-400"
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 grid gap-3">
                        <Button href="/showroom#visit" size="lg" iconRight="arrow-right">
                            Book a Showroom Visit
                        </Button>
                        <Button
                            href={buildWhatsAppLink()}
                            variant="whatsapp"
                            size="lg"
                            icon="whatsapp"
                        >
                            WhatsApp Inquiry
                        </Button>
                        <Button
                            href={telHref(siteConfig.contact.hotline)}
                            variant="outline"
                            size="lg"
                            icon="phone"
                        >
                            {siteConfig.contact.hotlineDisplay}
                        </Button>
                    </div>
                    <p className="mt-8 text-sm text-ink-500">
                        {siteConfig.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")}
                    </p>
                </nav>
            </div>
        </>
    );
}
