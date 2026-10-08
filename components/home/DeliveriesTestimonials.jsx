import Polaroid from "@/components/home/Polaroid";
import SectionHeading, { Accent } from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const TILTS = [-4, 3, -2, 5];

const initials = (name) =>
    name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("");

export default function DeliveriesTestimonials({ deliveries = [], testimonials = [] }) {
    return (
        <section className="paper-grain relative overflow-hidden bg-paper-warm py-20 md:py-28">
            <div className="container-page">
                <SectionHeading
                    index="06"
                    eyebrow="Customer deliveries"
                    title={
                        <>
                            Keys handed over, <Accent>every week</Accent>.
                        </>
                    }
                    description="A few of the families and businesses who drove home from our showroom floor."
                />

                {/* Pinned handover prints */}
                <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
                    {deliveries.map((d, i) => (
                        <Polaroid
                            key={d.id}
                            image={d.image}
                            alt={d.alt}
                            caption={d.caption}
                            date={d.date}
                            tilt={TILTS[i % TILTS.length]}
                            delay={i * 0.08}
                            className={i % 2 ? "lg:mt-12" : ""}
                        />
                    ))}
                </div>

                {/* Testimonials */}
                <Stagger className="mt-20 grid gap-5 md:grid-cols-3" stagger={0.1}>
                    {testimonials.map((t) => (
                        <StaggerItem
                            as="figure"
                            key={t.id}
                            className="relative flex flex-col rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-card"
                        >
                            <Icon name="quote" size={44} strokeWidth={0} className="absolute top-5 right-5 fill-gold-200 text-gold-200" />
                            <div className="flex gap-0.5 text-gold-500" aria-label={`${t.rating} out of 5 stars`} role="img">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <Icon key={i} name="star" size={15} strokeWidth={0} className="fill-current" />
                                ))}
                            </div>
                            <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-ink-700">“{t.quote}”</blockquote>
                            <figcaption className="mt-7 flex items-center gap-3 border-t border-dashed border-line pt-5">
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 font-display text-sm font-semibold text-gold-300">
                                    {initials(t.name)}
                                </span>
                                <span className="min-w-0">
                                    <span className="block text-[14.5px] font-semibold text-ink-900">{t.name}</span>
                                    <span className="block truncate text-[12.5px] text-ink-500">
                                        {t.role} · <span className="text-ink-700">{t.car}</span>
                                    </span>
                                </span>
                            </figcaption>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
