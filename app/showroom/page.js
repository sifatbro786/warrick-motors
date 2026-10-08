import PageHeader from "@/components/layout/PageHeader";
import LocationCards from "@/components/showroom/LocationCards";
import ShowroomVisitForm from "@/components/forms/ShowroomVisitForm";
import SectionHeading, { Accent } from "@/components/ui/SectionHeading";
import Image from "@/components/ui/SmartImage";
import Icon from "@/components/ui/Icon";
import JsonLd from "@/components/seo/JsonLd";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { getServices, getShowroomGallery } from "@/lib/services/content.service";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/format";

export const generateMetadata = () => buildMetadata({ key: "showroom", path: "/showroom" });

const VISIT_PERKS = [
    "Car cleaned, charged and parked out front before you arrive",
    "Auction sheet and export papers printed for you",
    "Test drive on a fixed route with a consultant",
    "Loan & registration cost breakdown on the spot",
];

export default async function ShowroomPage() {
    const [gallery, services] = await Promise.all([getShowroomGallery(), getServices()]);

    return (
        <>
            <JsonLd data={breadcrumbJsonLd([{ name: "Showroom & Services", path: "/showroom" }])} />
            <PageHeader
                crumbs={[{ label: "Showroom & Services" }]}
                eyebrow="Showroom & services"
                title="Two showrooms. One standard for every car."
                description="Our Gulshan flagship holds the ready stock; the Chattogram yard receives cars straight off the vessel. Both run the same inspection, the same paperwork and the same prices."
            />

            {/* Gallery mosaic */}
            <section className="bg-paper py-14 md:py-20">
                <div className="container-page">
                    <Stagger
                        className="grid auto-rows-45 grid-cols-2 gap-3 sm:auto-rows-55 sm:gap-4 lg:grid-cols-4"
                        stagger={0.07}
                    >
                        {gallery.map((g, i) => (
                            <StaggerItem
                                key={g.src}
                                className={cn(
                                    "group relative overflow-hidden rounded-card bg-ink-800",
                                    g.span,
                                    i === 0 && "col-span-2 row-span-2",
                                )}
                            >
                                <Image
                                    src={g.src}
                                    alt={g.alt}
                                    fill
                                    sizes={
                                        i === 0
                                            ? "(min-width: 1024px) 50vw, 100vw"
                                            : "(min-width: 1024px) 25vw, 50vw"
                                    }
                                    preload={i === 0}
                                    className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
                                />
                                <span className="absolute bottom-3 left-3 rounded-full bg-ink-950/70 px-3 py-1 text-[11.5px] font-medium text-white backdrop-blur-sm">
                                    {g.alt}
                                </span>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* Services */}
            <section className="relative bg-ink-900 py-16 text-white md:py-24">
                <div className="container-page">
                    <SectionHeading
                        tone="dark"
                        index="01"
                        eyebrow="Under one roof"
                        title={
                            <>
                                Everything after you <Accent tone="dark">choose</Accent> the car.
                            </>
                        }
                        description="Registration, loans, insurance and service are where most imports get stressful. We handle them in-house."
                    />
                    <Stagger
                        className="mt-12 grid gap-px overflow-hidden rounded-card border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3"
                        stagger={0.06}
                    >
                        {services.map((s) => (
                            <StaggerItem
                                key={s.title}
                                className="group bg-ink-900 p-7 transition-colors hover:bg-ink-800"
                            >
                                <Icon
                                    name={s.icon}
                                    size={26}
                                    strokeWidth={1.3}
                                    className="text-gold-400 transition-transform duration-500 group-hover:-translate-y-0.5"
                                />
                                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-white">
                                    {s.title}
                                </h3>
                                <p className="mt-2 text-[14px] leading-relaxed text-ink-300">
                                    {s.body}
                                </p>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* Locations */}
            <section className="bg-paper py-16 md:py-24">
                <div className="container-page">
                    <SectionHeading
                        index="02"
                        eyebrow="Find us"
                        title={
                            <>
                                Gulshan &amp; <Accent>Chattogram</Accent>
                            </>
                        }
                        description={`Open ${siteConfig.hours.map((h) => `${h.days}, ${h.time}`).join(" · ")}`}
                        className="mb-10"
                    />
                    <LocationCards />
                </div>
            </section>

            {/* Book a visit */}
            <section id="visit" className="paper-grain scroll-mt-20 bg-paper-warm py-16 md:py-24">
                <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
                    <Reveal className="lg:col-span-5">
                        <p className="eyebrow mb-4 flex items-center gap-3 text-gold-700">
                            <span className="nums">03</span>
                            <span aria-hidden="true" className="h-px w-8 bg-gold-500/50" />
                            Book a visit
                        </p>
                        <h2 className="text-[2rem] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[2.6rem]">
                            Pick a slot. We&apos;ll have the car <Accent>ready.</Accent>
                        </h2>
                        <ul className="mt-8 space-y-4">
                            {VISIT_PERKS.map((p) => (
                                <li key={p} className="flex gap-3 text-[15px] text-ink-700">
                                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-900 text-gold-300">
                                        <Icon name="check" size={13} strokeWidth={2.2} />
                                    </span>
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                    <Reveal className="lg:col-span-7" delay={0.1}>
                        <div className="rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
                            <h3 className="font-display text-xl font-semibold tracking-tight">
                                Showroom visit or test drive
                            </h3>
                            <p className="mt-1 mb-6 text-[14px] text-ink-500">
                                A consultant calls to confirm within working hours.
                            </p>
                            <ShowroomVisitForm />
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
