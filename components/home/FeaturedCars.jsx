import CarCard from "@/components/cars/CarCard";
import SectionHeading, { Accent } from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export default function FeaturedCars({ cars = [] }) {
    return (
        <section className="paper-grain relative bg-paper-warm py-20 md:py-28">
            <div className="container-page">
                <SectionHeading
                    index="02"
                    eyebrow="Featured showroom cars"
                    title={
                        <>
                            Hand-picked imports, ready for <Accent>Dhaka</Accent> roads.
                        </>
                    }
                    description="Auction-sheet verified, genuine mileage, priced in BDT. Tap WhatsApp on any car and our sales desk replies with photos and the sheet."
                    action={
                        <Button href="/cars" variant="dark" iconRight="arrow-right">
                            View full inventory
                        </Button>
                    }
                />
                <Stagger
                    className="mt-12 -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2 xl:grid-cols-4"
                    stagger={0.07}
                >
                    {cars.map((car) => (
                        <StaggerItem
                            key={car.id}
                            className="w-[84%] shrink-0 snap-start sm:w-auto h-auto"
                        >
                            <CarCard car={car} className="h-full" />
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
