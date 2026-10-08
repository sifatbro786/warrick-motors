import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/forms/ContactForm";
import LocationCards from "@/components/showroom/LocationCards";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import JsonLd from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { siteConfig, telHref } from "@/lib/config/site";
import { buildWhatsAppLink } from "@/lib/utils/contact";

export const generateMetadata = () => buildMetadata({ key: "contact", path: "/contact" });

const CHANNELS = [
    {
        icon: "phone",
        label: "Hotline",
        value: siteConfig.contact.hotlineDisplay,
        href: telHref(siteConfig.contact.hotline),
        note: "Sales & general",
    },
    {
        icon: "whatsapp",
        label: "WhatsApp",
        value: "Chat with sales",
        href: buildWhatsAppLink(),
        note: "Photos, sheets, quick quotes",
        external: true,
    },
    {
        icon: "phone",
        label: "Chattogram yard",
        value: siteConfig.contact.salesDisplay,
        href: telHref(siteConfig.contact.sales),
        note: "Port arrivals & pickups",
    },
    {
        icon: "mail",
        label: "Email",
        value: siteConfig.contact.email,
        href: `mailto:${siteConfig.contact.email}`,
        note: "Documents & corporate",
    },
];

export default function ContactPage() {
    return (
        <>
            <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
            <PageHeader
                crumbs={[{ label: "Contact" }]}
                eyebrow="Contact & directions"
                title="Talk to a person, not a call centre."
                description="Call, WhatsApp or drop by. Every message goes to the same sales desk that handles the cars."
            />

            <section className="bg-paper py-14 md:py-20">
                <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-14">
                    <Reveal className="lg:col-span-5">
                        <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-1">
                            {CHANNELS.map((c) => (
                                <li key={c.label}>
                                    <a
                                        href={c.href}
                                        {...(c.external
                                            ? { target: "_blank", rel: "noopener noreferrer" }
                                            : {})}
                                        className="group flex h-full items-start gap-4 bg-white p-5 transition-colors hover:bg-paper"
                                    >
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-900 text-gold-300 transition-colors group-hover:bg-crimson-600 group-hover:text-white">
                                            <Icon name={c.icon} size={19} />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="eyebrow block text-[10.5px] text-ink-500">
                                                {c.label}
                                            </span>
                                            <span className="nums mt-1 block truncate font-display text-[1.05rem] font-semibold text-ink-900">
                                                {c.value}
                                            </span>
                                            <span className="mt-0.5 block text-[13px] text-ink-500">
                                                {c.note}
                                            </span>
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 rounded-card bg-ink-900 p-6 text-white">
                            <p className="eyebrow text-gold-300">Opening hours</p>
                            <ul className="mt-4 space-y-2 text-[14.5px]">
                                {siteConfig.hours.map((h) => (
                                    <li
                                        key={h.days}
                                        className="flex justify-between gap-4 border-b border-white/10 pb-2 last:border-0"
                                    >
                                        <span className="text-ink-300">{h.days}</span>
                                        <span className="nums font-semibold">{h.time}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    <Reveal className="lg:col-span-7" delay={0.1}>
                        <div className="rounded-card border border-line bg-white p-6 shadow-card sm:p-10">
                            <h2 className="font-display text-[1.9rem] leading-tight font-bold tracking-tight">
                                Begin your Warrick journey.
                            </h2>
                            <p className="mt-2 mb-8 max-w-md text-[15px] text-ink-500">
                                Tell us what you&apos;re looking for. A consultant replies with
                                options, prices and the next step.
                            </p>
                            <ContactForm />
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="paper-grain bg-paper-warm py-16 md:py-20">
                <div className="container-page">
                    <SectionHeading eyebrow="Visit" title="Our showrooms" className="mb-10" />
                    <LocationCards />
                </div>
            </section>
        </>
    );
}
