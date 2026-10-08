import PageHeader from "@/components/layout/PageHeader";
import ProcessTimeline from "@/components/about/ProcessTimeline";
import DeliveriesTestimonials from "@/components/home/DeliveriesTestimonials";
import PreOrderCTA from "@/components/home/PreOrderCTA";
import { Accent } from "@/components/ui/SectionHeading";
import Image from "@/components/ui/SmartImage";
import Icon from "@/components/ui/Icon";
import Stamp from "@/components/ui/Stamp";
import JsonLd from "@/components/seo/JsonLd";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import {
    getAboutStory,
    getCompanyStats,
    getDeliveries,
    getDocumentsYouGet,
    getImportProcess,
    getTestimonials,
} from "@/lib/services/content.service";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/config/site";

export const generateMetadata = () => buildMetadata({ key: "about", path: "/about" });

export default async function AboutPage() {
    const [story, stats, process, documents, deliveries, testimonials] = await Promise.all([
        getAboutStory(),
        getCompanyStats(),
        getImportProcess(),
        getDocumentsYouGet(),
        getDeliveries(),
        getTestimonials(),
    ]);

    return (
        <>
            <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about" }])} />
            <PageHeader
                crumbs={[{ label: "About" }]}
                eyebrow={`Since ${story.since}`}
                title="A decade of importing cars the honest way."
                description="Direct from Japanese auctions and global dealers to your driveway — with every document on the table."
            />

            {/* Story */}
            <section className="overflow-x-clip bg-paper py-16 md:py-24">
                <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                    <Reveal className="relative lg:col-span-6">
                        <div className="relative aspect-5/4 overflow-hidden rounded-card bg-ink-800">
                            <Image
                                src={story.image}
                                alt={story.imageAlt}
                                fill
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                        <Stamp
                            ring="EST. 2014 · CHATTOGRAM · WARRICK MOTORS · "
                            center="SINCE"
                            sub={String(story.since)}
                            className="absolute -right-2 -bottom-10 h-32 w-32 sm:-right-8 sm:h-40 sm:w-40"
                        />
                    </Reveal>
                    <Reveal className="lg:col-span-6" delay={0.1}>
                        <p className="eyebrow mb-4 flex items-center gap-3 text-gold-600">
                            <span className="nums">01</span>
                            <span aria-hidden="true" className="h-px w-8 bg-gold-500/50" />
                            Our story
                        </p>
                        <h2 className="text-[2rem] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[2.6rem]">
                            Started in a port-side yard, built on <Accent>paperwork.</Accent>
                        </h2>
                        <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-ink-600">
                            {story.paragraphs.map((p) => (
                                <p key={p.slice(0, 20)}>{p}</p>
                            ))}
                        </div>
                    </Reveal>
                </div>

                <div className="container-page mt-16 md:mt-20">
                    <Stagger
                        as="ul"
                        className="grid grid-cols-2 gap-y-8 border-y border-line py-10 lg:grid-cols-4"
                        stagger={0.08}
                    >
                        {stats.map((s, i) => (
                            <StaggerItem
                                as="li"
                                key={s.label}
                                className={`px-1 sm:px-6 ${i % 2 ? "border-l border-line" : ""} ${i > 0 ? "lg:border-l lg:border-line" : ""} lg:first:pl-0`}
                            >
                                <p className="nums font-display text-[2rem] leading-none font-semibold tracking-tight text-ink-900 sm:text-[2.4rem]">
                                    {s.value}
                                    {s.unit && (
                                        <span className="ml-1 text-base font-medium text-ink-500">
                                            {s.unit}
                                        </span>
                                    )}
                                </p>
                                <p className="eyebrow mt-3 text-[11px] text-gold-700">{s.label}</p>
                                <p className="mt-1.5 text-[13px] text-ink-500">{s.note}</p>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* Founder */}
            {story.founder && (
                <section className="relative overflow-hidden bg-paper-warm py-16 md:py-24">
                    <div className="paper-grain absolute inset-0" aria-hidden="true" />
                    <div className="container-page relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        <Reveal className="relative mx-auto w-full max-w-sm lg:col-span-4 lg:max-w-none">
                            <figure className="relative -rotate-2 bg-white p-3 pb-5 shadow-[0_24px_50px_-28px_rgb(10_17_30/0.5)]">
                                <div className="relative aspect-4/5 overflow-hidden bg-ink-800">
                                    <Image
                                        src={story.founder.image}
                                        alt={story.founder.imageAlt}
                                        fill
                                        sizes="(min-width: 1024px) 30vw, 90vw"
                                        className="scale-[1.1] object-cover object-[50%_25%]"
                                    />
                                </div>
                                <figcaption className="mt-3 px-1 text-[12.5px] font-medium text-ink-700">
                                    {story.founder.name ? `${story.founder.name} · ` : ""}
                                    {story.founder.role}
                                </figcaption>
                            </figure>
                        </Reveal>
                        <Reveal className="lg:col-span-8" delay={0.1}>
                            <p className="eyebrow mb-5 flex items-center gap-3 text-gold-700">
                                <span aria-hidden="true" className="h-px w-8 bg-gold-500/50" />A
                                note from the founder
                            </p>
                            <blockquote className="relative">
                                <Icon
                                    name="quote"
                                    size={56}
                                    strokeWidth={0}
                                    className="absolute -top-6 -left-2 fill-gold-300/60 text-gold-300/60"
                                />
                                <p className="relative font-display text-[1.6rem] leading-[1.3] font-semibold tracking-[-0.02em] text-ink-900 sm:text-[2rem]">
                                    {story.founder.quote}
                                </p>
                            </blockquote>
                            <p className="mt-6 text-[14px] text-ink-600">
                                {story.founder.name && (
                                    <span className="font-semibold text-ink-900">
                                        {story.founder.name}
                                    </span>
                                )}
                                {story.founder.name && " — "}
                                {story.founder.role}, {siteConfig.legalName.replace(/\.$/, "")}
                            </p>
                        </Reveal>
                    </div>
                </section>
            )}

            {/* Process */}
            <section className="bg-ink-900 py-16 text-white md:py-24">
                <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <Reveal className="lg:col-span-5">
                        <div className="lg:sticky lg:top-28">
                            <p className="eyebrow mb-4 flex items-center gap-3 text-gold-300">
                                <span className="nums">02</span>
                                <span aria-hidden="true" className="h-px w-8 bg-gold-300/50" />
                                How we import
                            </p>
                            <h2 className="text-[2rem] leading-[1.05] font-bold tracking-[-0.03em] text-white sm:text-[2.6rem]">
                                From auction lane to your <Accent tone="dark">driveway.</Accent>
                            </h2>
                            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-300">
                                Six steps, no middle importer. You can ask for the paperwork at any
                                one of them.
                            </p>
                        </div>
                    </Reveal>
                    <div className="lg:col-span-7">
                        <ProcessTimeline steps={process} tone="dark" />
                    </div>
                </div>
            </section>

            {/* Documents — manila folder (stone, so it alternates with the sand sections around it) */}
            <section className="bg-paper py-16 md:py-24">
                <div className="container-page grid items-center gap-12 lg:grid-cols-12">
                    <Reveal className="lg:col-span-5">
                        <p className="eyebrow mb-4 flex items-center gap-3 text-gold-700">
                            <span className="nums">03</span>
                            <span aria-hidden="true" className="h-px w-8 bg-gold-500/50" />
                            Transparency
                        </p>
                        <h2 className="text-[2rem] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[2.6rem]">
                            The file you take <Accent>home.</Accent>
                        </h2>
                        <p className="mt-5 text-[15px] leading-relaxed text-ink-600">
                            Every car leaves with a physical document folder. If a dealer can&apos;t
                            show you these, ask why.
                        </p>
                    </Reveal>
                    <Reveal className="lg:col-span-7" delay={0.1}>
                        <div className="relative pt-7">
                            {/* folder tab */}
                            <span
                                aria-hidden="true"
                                className="absolute top-0 left-8 h-8 w-44 rounded-t-xl bg-[#d9c79c]"
                            />
                            <div className="relative rounded-2xl rounded-tl-none bg-[#e6d6ae] p-3 shadow-[0_24px_50px_-28px_rgb(10_17_30/0.45)]">
                                <div className="rotate-[-0.6deg] rounded-xl bg-white p-6 sm:p-8">
                                    <p className="nums font-mono text-[11px] tracking-wider text-ink-500">
                                        WARRICK MOTORS · VEHICLE FILE · STOCK # WM-XXXX
                                    </p>
                                    <ul className="mt-5 divide-y divide-dashed divide-line">
                                        {documents.map((d) => (
                                            <li
                                                key={d}
                                                className="flex items-center gap-3 py-3 text-[15px] text-ink-800"
                                            >
                                                <Icon
                                                    name="file-check"
                                                    size={18}
                                                    className="shrink-0 text-ready"
                                                />
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <DeliveriesTestimonials deliveries={deliveries} testimonials={testimonials} />
            <PreOrderCTA />
        </>
    );
}
