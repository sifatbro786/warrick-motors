import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { buildWhatsAppLink } from "@/lib/utils/contact";

/** Closing crimson band — the one place crimson floods a surface. */
export default function PreOrderCTA() {
    return (
        <section className="relative overflow-hidden bg-crimson-700 text-white">
            {/* Fine diagonal pinstripe, like a car-cover weave */}
            <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(135deg,#fff_0_1px,transparent_1px_14px)]"
            />
            <div className="container-page relative grid items-center gap-10 py-16 md:py-20 lg:grid-cols-12">
                <Reveal className="lg:col-span-8">
                    <p className="eyebrow mb-4 text-crimson-50/80">Import on request</p>
                    <h2 className="text-[2rem] leading-[1.05] font-bold tracking-[-0.03em] text-white sm:text-[2.8rem]">
                        Not in stock? Tell us the model, grade and colour — we&apos;ll import it.
                    </h2>
                    <p className="mt-4 max-w-xl text-[15px] text-crimson-50/85">
                        We search Japanese auctions weekly and share options with auction sheets before you commit.
                        Typical delivery: 6–9 weeks.
                    </p>
                </Reveal>
                <Reveal className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end" delay={0.15}>
                    <Link
                        href="/pre-order"
                        className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-white px-7 text-[15px] font-semibold text-crimson-700 transition-colors hover:bg-ink-900 hover:text-white"
                    >
                        Request a Pre-Order
                        <Icon name="arrow-right" size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a
                        href={buildWhatsAppLink({ message: "Hello Warrick Motors, I'd like to pre-order a car. Model: " })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-13 items-center gap-2.5 rounded-full border border-white/40 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
                    >
                        <Icon name="whatsapp" size={19} />
                        WhatsApp us
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
