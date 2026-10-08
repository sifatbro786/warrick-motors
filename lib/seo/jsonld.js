import { siteConfig } from "@/lib/config/site";
import { STOCK_STATUS } from "@/lib/constants/inventory";
import { absoluteUrl } from "@/lib/seo/metadata";

/**
 * schema.org builders. Pure functions → plain objects, rendered by <JsonLd>.
 * Validate with https://search.google.com/test/rich-results
 */

const ORG_ID = () => absoluteUrl("/#organization");

/** AutoDealer (a LocalBusiness subtype) with one department per showroom. */
export function organizationJsonLd() {
    const hours = siteConfig.hoursSpec.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
        opens: h.opens,
        closes: h.closes,
    }));
    const place = (s) => ({
        "@type": "AutoDealer",
        "@id": absoluteUrl(`/#showroom-${s.id}`),
        name: `${siteConfig.name} — ${s.city} ${s.label}`,
        telephone: s.phone,
        url: absoluteUrl("/showroom"),
        image: absoluteUrl("/opengraph-image.png"),
        priceRange: "BDT 30,00,000 – 6,00,00,000",
        address: {
            "@type": "PostalAddress",
            streetAddress: s.street,
            addressLocality: s.locality,
            postalCode: s.postalCode,
            addressCountry: "BD",
        },
        geo: { "@type": "GeoCoordinates", latitude: s.geo.lat, longitude: s.geo.lng },
        hasMap: s.mapUrl,
        openingHoursSpecification: hours,
    });
    const [main, ...rest] = siteConfig.showrooms;

    return {
        "@context": "https://schema.org",
        ...place(main),
        "@id": ORG_ID(),
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        description: siteConfig.description,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/logo.png"),
        email: siteConfig.contact.email,
        foundingDate: String(siteConfig.foundingYear),
        sameAs: siteConfig.social.map((s) => s.href),
        contactPoint: [
            {
                "@type": "ContactPoint",
                telephone: siteConfig.contact.hotline,
                contactType: "sales",
                areaServed: "BD",
                availableLanguage: ["en", "bn"],
            },
        ],
        department: rest.map(place),
    };
}

/** WebSite + sitelinks search box → /cars?q= */
export function websiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: siteConfig.name,
        publisher: { "@id": ORG_ID() },
        inLanguage: "en-BD",
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${absoluteUrl("/cars")}?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };
}

/** items: [{ name, path }] — Home is prepended automatically. */
export function breadcrumbJsonLd(items = []) {
    const all = [{ name: "Home", path: "/" }, ...items];
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: absoluteUrl(c.path),
        })),
    };
}

const AVAILABILITY = {
    [STOCK_STATUS.READY]: "https://schema.org/InStock",
    [STOCK_STATUS.ON_THE_WAY]: "https://schema.org/PreOrder",
    [STOCK_STATUS.PRE_ORDER]: "https://schema.org/PreOrder",
};

const FUEL = {
    Octane: "Gasoline",
    Diesel: "Diesel",
    Electric: "Electric",
    Hybrid: "Hybrid",
    "Plug-in Hybrid": "Plug-in Hybrid",
};

/** schema.org/Car with an Offer in BDT */
export function carJsonLd(car) {
    const url = absoluteUrl(`/cars/${car.slug}`);
    return {
        "@context": "https://schema.org",
        "@type": "Car",
        "@id": `${url}#vehicle`,
        name: `${car.year} ${car.title}`,
        description: car.description,
        url,
        image: car.images?.map((i) => i.src),
        sku: car.stockNo,
        brand: { "@type": "Brand", name: car.brand },
        model: car.model,
        vehicleModelDate: String(car.year),
        bodyType: car.bodyType,
        color: car.color,
        fuelType: FUEL[car.fuelType] || car.fuelType,
        vehicleTransmission: car.transmission,
        itemCondition:
            car.condition === "Brand New"
                ? "https://schema.org/NewCondition"
                : "https://schema.org/UsedCondition",
        mileageFromOdometer: { "@type": "QuantitativeValue", value: car.mileage, unitCode: "KMT" },
        ...(car.engineCc
            ? {
                  vehicleEngine: {
                      "@type": "EngineSpecification",
                      engineDisplacement: {
                          "@type": "QuantitativeValue",
                          value: car.engineCc,
                          unitCode: "CMQ",
                      },
                  },
              }
            : {}),
        ...(car.specs?.seats ? { seatingCapacity: car.specs.seats } : {}),
        offers: {
            "@type": "Offer",
            price: car.price,
            priceCurrency: "BDT",
            availability: AVAILABILITY[car.stockStatus],
            url,
            seller: { "@id": ORG_ID() },
            areaServed: "BD",
        },
    };
}

/** ItemList for inventory pages (cars currently shown). */
export function itemListJsonLd(cars = [], { offset = 0 } = {}) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        numberOfItems: cars.length,
        itemListElement: cars.map((c, i) => ({
            "@type": "ListItem",
            position: offset + i + 1,
            url: absoluteUrl(`/cars/${c.slug}`),
            name: `${c.year} ${c.title}`,
        })),
    };
}

export function faqJsonLd(faqs = []) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };
}
