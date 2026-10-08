import { Suspense } from "react";
import PageHeader from "@/components/layout/PageHeader";
import PreOrderForm from "@/components/forms/PreOrderForm";
import ProcessTimeline from "@/components/about/ProcessTimeline";
import CarCard from "@/components/cars/CarCard";
import SectionHeading, { Accent } from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import JsonLd from "@/components/seo/JsonLd";
import { getCars } from "@/lib/services/car.service";
import { getPopularRequests, getPreOrderSteps } from "@/lib/services/content.service";
import { STOCK_STATUS } from "@/lib/constants/inventory";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { buildWhatsAppLink } from "@/lib/utils/contact";

export const generateMetadata = () => buildMetadata({ key: "preOrder", path: "/pre-order" });

const FACTS = [
    { icon: "file-check", text: "Grade 4+ auction cars only" },
    { icon: "clock", text: "Options with sheets in 48 hrs" },
    { icon: "ship", text: "6–9 weeks to Dhaka" },
];

export default async function PreOrderPage({ searchParams }) {
    const [steps, popular, onOrder] = await Promise.all([
        getPreOrderSteps(),
        getPopularRequests(),
        getCars({ status: STOCK_STATUS.PRE_ORDER, pageSize: 4 }),
    ]);

    return (
        <>
            <JsonLd data={breadcrumbJsonLd([{ name: "Pre-Order", path: "/pre-order" }])} />
            <PageHeader
                crumbs={[{ label: "Pre-Order & Import" }]}
                eyebrow="Pre-order & import request"
                title="Import the exact car you want — auction sheet first."
                description="Tell us the model, grade and colour. We search Japanese auctions and overseas dealers, send you real options with their sheets, and only take a deposit once you approve a specific car."
            >
                <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[14px] text-white/85">
                    {FACTS.map((f) => (
                        <li key={f.text} className="flex items-center gap-2">
                            <Icon name={f.icon} size={18} className="text-gold-300" />
                            {f.text}
                        </li>
                    ))}
                </ul>
            </PageHeader>

            <section className="bg-paper py-12 md:py-16">
                <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
                    {/* Prefill from ?brand=&model= (runtime URL data → inside Suspense) */}
                    <Suspense fallback={<PreOrderForm popular={popular} />}>
                        <PrefilledForm searchParams={searchParams} popular={popular} />
                    </Suspense>

                    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                        <div className="rounded-[var(--radius-card)] border border-sand-300 bg-paper-warm p-6 sm:p-7">
                            <h2 className="eyebrow mb-6 font-sans text-gold-700">
                                How a pre-order works
                            </h2>
                            <ProcessTimeline
                                steps={steps.map((s, i) => ({
                                    ...s,
                                    icon: ["car", "file-check", "check", "ship", "key"][i],
                                }))}
                                tone="light"
                            />
                        </div>
                        <div className="rounded-[var(--radius-card)] bg-ink-900 p-6 text-white">
                            <p className="font-display text-lg font-semibold">
                                Prefer to talk it through?
                            </p>
                            <p className="mt-1 text-[14px] text-ink-300">
                                Send a screenshot of the car you like — we&apos;ll find it.
                            </p>
                            <Button
                                href={buildWhatsAppLink({
                                    message: "Hello Warrick Motors, I'd like to import this car: ",
                                })}
                                variant="whatsapp"
                                icon="whatsapp"
                                size="sm"
                                className="mt-4"
                            >
                                WhatsApp the sourcing team
                            </Button>
                        </div>
                    </aside>
                </div>
            </section>

            {onOrder.items.length > 0 && (
                <section className="bg-ink-900 py-16 text-white md:py-24">
                    <div className="container-page">
                        <SectionHeading
                            tone="dark"
                            eyebrow="Being sourced right now"
                            title={
                                <>
                                    Already on <Accent tone="dark">order</Accent> for other buyers
                                </>
                            }
                            description="Same model? Join the next batch — shared shipping keeps the timeline short."
                            action={
                                <Button
                                    href="/cars?status=pre-order"
                                    variant="outline-light"
                                    iconRight="arrow-right"
                                >
                                    All pre-order cars
                                </Button>
                            }
                        />
                        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                            {onOrder.items.map((car) => (
                                <CarCard key={car.id} car={car} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

async function PrefilledForm({ searchParams, popular }) {
    const sp = await searchParams;
    const first = (v) => (Array.isArray(v) ? v[0] : v) || "";
    return (
        <PreOrderForm
            popular={popular}
            initial={{ brand: first(sp.brand).slice(0, 40), model: first(sp.model).slice(0, 60) }}
        />
    );
}
