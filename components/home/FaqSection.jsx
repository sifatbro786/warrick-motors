import FaqAccordion from "@/components/home/FaqAccordion";
import { Accent } from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import JsonLd from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { siteConfig, telHref } from "@/lib/config/site";
import { buildWhatsAppLink } from "@/lib/utils/contact";

export default function FaqSection({ faqs = [] }) {
    return (
        <section className="relative bg-paper py-20 md:py-28" aria-labelledby="faq-title">
            <JsonLd data={faqJsonLd(faqs)} />
            <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
                <Reveal className="lg:col-span-4">
                    <div className="lg:sticky lg:top-28">
                        <p className="eyebrow mb-4 flex items-center gap-3 text-gold-600">
                            <span className="nums">07</span>
                            <span aria-hidden="true" className="h-px w-8 bg-gold-500/50" />
                            Questions buyers ask
                        </p>
                        <h2
                            id="faq-title"
                            className="text-[2rem] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[2.6rem]"
                        >
                            Straight <Accent>answers,</Accent> before you visit.
                        </h2>
                        <p className="mt-5 text-[15px] leading-relaxed text-ink-500">
                            Importing a car raises fair questions about mileage, paperwork and
                            timelines. Here is how we handle each one.
                        </p>

                        <div className="mt-8 rounded-card bg-ink-900 p-6 text-white">
                            <p className="font-display text-lg font-semibold">
                                Still unsure about something?
                            </p>
                            <p className="mt-1 text-[14px] text-ink-300">
                                Our sales desk replies on WhatsApp within working hours.
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2.5">
                                <Button
                                    href={buildWhatsAppLink({
                                        message: "Hello Warrick Motors, I have a question: ",
                                    })}
                                    variant="whatsapp"
                                    icon="whatsapp"
                                    size="sm"
                                >
                                    Ask on WhatsApp
                                </Button>
                                <a
                                    href={telHref(siteConfig.contact.hotline)}
                                    className="nums inline-flex h-9 items-center gap-1.5 rounded-full border border-white/25 px-3.5 text-[13px] font-medium hover:bg-white hover:text-ink-900"
                                >
                                    <Icon name="phone" size={15} />{" "}
                                    {siteConfig.contact.hotlineDisplay}
                                </a>
                            </div>
                        </div>
                    </div>
                </Reveal>
                <Reveal className="lg:col-span-8" delay={0.1}>
                    <FaqAccordion items={faqs} />
                </Reveal>
            </div>
        </section>
    );
}
