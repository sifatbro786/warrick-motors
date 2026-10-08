import Image from "@/components/ui/SmartImage";
import Link from "next/link";
import { Accent } from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import Stamp from "@/components/ui/Stamp";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * Three-column editorial block (Kraftwerk "Technology" reference):
 * statement · tall photo with customs stamp · numbered promises.
 */
export default function WhyWarrick({ points = [], image }) {
    return (
        <section className="relative overflow-x-clip bg-paper py-20 md:py-28">
            <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
                <Reveal className="lg:col-span-4">
                    <p className="eyebrow mb-4 flex items-center gap-3 text-gold-600">
                        <span className="nums">04</span>
                        <span aria-hidden="true" className="h-px w-8 bg-gold-500/50" />
                        Why Warrick Motors
                    </p>
                    <h2 className="text-[2rem] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[2.6rem]">
                        Imported <Accent>properly.</Accent> Paperwork included.
                    </h2>
                    <p className="mt-5 text-[15px] leading-relaxed text-ink-500 sm:text-base">
                        Buying an imported car in Bangladesh shouldn&apos;t mean guessing about mileage, chasing BRTA
                        or arranging a loan yourself. We do the parts most dealers leave to you.
                    </p>
                    <Link
                        href="/about"
                        className="group mt-8 inline-flex items-center gap-2 border-b border-gold-500 pb-1 text-sm font-semibold text-ink-900"
                    >
                        How our import process works
                        <Icon name="arrow-right" size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </Reveal>

                <Reveal className="relative lg:col-span-4" delay={0.1}>
                    <div className="relative aspect-4/5 overflow-hidden rounded-card bg-ink-800">
                        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink-950/60 to-transparent" />
                        <p className="absolute bottom-5 left-5 flex items-center gap-2 text-[12.5px] font-medium text-white">
                            <Icon name="ship" size={16} className="text-gold-300" />
                            Yokohama → Chattogram, every fortnight
                        </p>
                    </div>
                    <Stamp className="absolute -top-10 -right-2 h-32 w-32 sm:-right-10 sm:h-44 sm:w-44" />
                </Reveal>

                <Stagger as="ol" className="divide-y divide-line lg:col-span-4" stagger={0.1}>
                    {points.map((p, i) => (
                        <StaggerItem as="li" key={p.title} className="flex gap-5 py-6 first:pt-0 last:pb-0">
                            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white text-ink-900">
                                <Icon name={p.icon} size={21} />
                                <span className="nums absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink-900 text-[10px] font-semibold text-gold-300">
                                    {i + 1}
                                </span>
                            </span>
                            <div>
                                <h3 className="font-display text-[1.05rem] font-semibold tracking-tight">{p.title}</h3>
                                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">{p.body}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
