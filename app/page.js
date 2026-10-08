import CarCard from "@/components/cars/CarCard";
import SectionHeading, { Accent } from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { getFeaturedCars } from "@/lib/services/car.service";

/**
 * PHASE 1 PLACEHOLDER — verifies tokens, fonts, layout shell, data layer and
 * CarCard end-to-end. Replaced by the full home page (components/home/*) in Phase 2.
 */
export default async function HomePage() {
    const cars = await getFeaturedCars(8);

    return (
        <section className="paper-grain py-20 md:py-28">
            <div className="container-page">
                <SectionHeading
                    index="01"
                    eyebrow="Featured Showroom Cars"
                    title={
                        <>
                            Hand-picked imports, <Accent>ready</Accent> for Dhaka roads.
                        </>
                    }
                    description="Every unit is auction-sheet verified with genuine mileage. Prices in BDT, documents in your hand."
                    action={
                        <Button href="/cars" variant="outline" iconRight="arrow-right">
                            View full inventory
                        </Button>
                    }
                />
                <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {cars.map((car, i) => (
                        <CarCard key={car.id} car={car} preload={i < 2} />
                    ))}
                </div>
            </div>
        </section>
    );
}
