import ShowroomHero from "@/components/home/ShowroomHero";
import StatsBand from "@/components/home/StatsBand";
import BrowseByBrand from "@/components/home/BrowseByBrand";
import FeaturedCars from "@/components/home/FeaturedCars";
import StockStatusSection from "@/components/home/StockStatusSection";
import WhyWarrick from "@/components/home/WhyWarrick";
import ShowroomExperience from "@/components/home/ShowroomExperience";
import DeliveriesTestimonials from "@/components/home/DeliveriesTestimonials";
import PreOrderCTA from "@/components/home/PreOrderCTA";
import FaqSection from "@/components/home/FaqSection";
import { buildMetadata } from "@/lib/seo/metadata";
import { getFeaturedCars, getCarsByStatus, getFilterOptions } from "@/lib/services/car.service";
import {
    getHeroSlides,
    getCompanyStats,
    getBrandShowcase,
    getWhyWarrick,
    getShowroomImage,
    getDeliveries,
    getTestimonials,
    getBrands,
    getFaqs,
} from "@/lib/services/content.service";
import { siteConfig } from "@/lib/config/site";

export const generateMetadata = () => buildMetadata({ key: "home", path: "/" });

/**
 * Section rhythm (never all-white):
 * hero(ink) → search+facts(ink-950) → brands(stone) → featured(sand) → status(ink)
 * → why(stone) → showroom(ink-950) → deliveries(sand) → faq(stone) → pre-order(crimson) → footer(ink)
 */
export default async function HomePage() {
    const [
        slides,
        stats,
        filterOptions,
        brandTiles,
        featured,
        byStatus,
        why,
        showroomImage,
        deliveries,
        testimonials,
    ] = await Promise.all([
        getHeroSlides(),
        getCompanyStats(),
        getFilterOptions(),
        getBrandShowcase(),
        getFeaturedCars(4),
        getCarsByStatus(4),
        getWhyWarrick(),
        getShowroomImage(),
        getDeliveries(),
        getTestimonials(),
    ]);
    const [brands, faqs] = await Promise.all([getBrands(filterOptions.brands), getFaqs()]);

    return (
        <>
            <ShowroomHero slides={slides} />
            <StatsBand stats={stats} filterOptions={filterOptions} />
            <BrowseByBrand
                tiles={brandTiles}
                brands={brands}
                counts={filterOptions.counts.byBrand}
            />
            <FeaturedCars cars={featured} />
            <StockStatusSection byStatus={byStatus} />
            <WhyWarrick points={why.points} image={why.image} />
            <ShowroomExperience
                image={showroomImage}
                showrooms={siteConfig.showrooms}
                hours={siteConfig.hours}
            />
            <DeliveriesTestimonials deliveries={deliveries} testimonials={testimonials} />
            <FaqSection faqs={faqs} />
            <PreOrderCTA />
        </>
    );
}
