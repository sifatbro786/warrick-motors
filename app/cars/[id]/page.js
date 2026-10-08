import { notFound } from "next/navigation";
import CarGallery from "@/components/cars/CarGallery";
import PurchasePanel from "@/components/cars/PurchasePanel";
import { PerformanceBand, CarDetailsBody } from "@/components/cars/CarSpecs";
import LoanEstimator from "@/components/cars/LoanEstimator";
import CarCard from "@/components/cars/CarCard";
import StockBadge from "@/components/cars/StockBadge";
import { Breadcrumbs } from "@/components/layout/PageHeader";
import SectionHeading, { Accent } from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { getAllCarSlugs, getCarById, getRelatedCars } from "@/lib/services/car.service";
import JsonLd from "@/components/seo/JsonLd";
import { buildCarMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, carJsonLd } from "@/lib/seo/jsonld";

/** Prerender every known car; unknown ids render on first request (then cached). */
export async function generateStaticParams() {
    const slugs = await getAllCarSlugs();
    return slugs.map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const car = await getCarById(id);
    if (!car) return { title: "Car not found", robots: { index: false } };
    return buildCarMetadata(car);
}

export default async function CarDetailPage({ params }) {
    const { id } = await params;
    const car = await getCarById(id);
    if (!car) notFound();
    const related = await getRelatedCars(car, 3);

    return (
        <>
            <JsonLd
                data={[
                    carJsonLd(car),
                    breadcrumbJsonLd([
                        { name: "Inventory", path: "/cars" },
                        { name: car.brand, path: `/cars?brand=${encodeURIComponent(car.brand)}` },
                        { name: `${car.year} ${car.title}`, path: `/cars/${car.slug}` },
                    ]),
                ]}
            />
            <section className="bg-paper pt-8 pb-14 md:pb-20">
                <div className="container-page">
                    <Breadcrumbs
                        className="mb-6"
                        items={[
                            { label: "Inventory", href: "/cars" },
                            {
                                label: car.brand,
                                href: `/cars?brand=${encodeURIComponent(car.brand)}`,
                            },
                            { label: `${car.year} ${car.title}` },
                        ]}
                    />
                    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-10">
                        <CarGallery
                            images={car.images}
                            title={`${car.year} ${car.title}`}
                            badge={
                                <StockBadge
                                    status={car.stockStatus}
                                    location={car.location}
                                    className="shadow-sm"
                                />
                            }
                        />
                        <div className="lg:sticky lg:top-24 lg:self-start">
                            <PurchasePanel car={car} />
                        </div>
                    </div>
                </div>
            </section>

            <PerformanceBand car={car} />

            <section className="bg-paper py-16 md:py-20">
                <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-10">
                    <CarDetailsBody car={car} />
                    <div id="loan" className="scroll-mt-28 lg:sticky lg:top-24 lg:self-start">
                        <LoanEstimator price={car.price} />
                    </div>
                </div>
            </section>

            {related.length > 0 && (
                <section className="paper-grain bg-paper-warm py-16 md:py-24">
                    <div className="container-page">
                        <SectionHeading
                            eyebrow="You may also like"
                            title={
                                <>
                                    Similar imports in <Accent>stock</Accent>
                                </>
                            }
                            action={
                                <Button href="/cars" variant="dark" iconRight="arrow-right">
                                    Back to inventory
                                </Button>
                            }
                        />
                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((c) => (
                                <CarCard key={c.id} car={c} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
