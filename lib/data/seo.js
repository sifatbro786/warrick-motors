/**
 * SEO REGISTRY — the single place meta titles/descriptions/keywords live.
 * Admin phase: this becomes a `SeoSettings` document (defaults) + `PageSeo`
 * collection keyed by `key`, edited from the dashboard. Pages never hardcode
 * meta strings; they call buildMetadata({ key }) which reads through
 * lib/services/seo.service.js. Cars can override via `car.seo`.
 *
 * Guidelines: title ≤ 60 chars, description 140–160 chars.
 * Default share image: app/opengraph-image.png (pages can override with `image`).
 */

export const seoDefaults = {
    siteName: "Warrick Motors",
    titleTemplate: "%s | Warrick Motors",
    defaultTitle: "Warrick Motors — Premium & Direct Imported Cars in Bangladesh",
    description:
        "Direct importer of reconditioned and brand-new cars from Japan, UK and UAE. Auction-sheet verified, genuine mileage, BDT prices. Showrooms in Dhaka & Chattogram.",
    keywords: [
        "reconditioned cars Bangladesh",
        "car import Bangladesh",
        "Japanese cars Dhaka",
        "car showroom Gulshan",
        "Toyota Harrier price in Bangladesh",
        "Land Cruiser Prado price BD",
        "hybrid cars Bangladesh",
        "car loan Bangladesh",
    ],
    twitterHandle: null,
    locale: "en_BD",
};

export const pageSeo = {
    home: {
        title: "Warrick Motors — Premium & Direct Imported Cars in Bangladesh",
        absoluteTitle: true,
        description:
            "Browse auction-verified Japanese and European imports in Dhaka & Chattogram. Ready stock, shipments on the way and pre-orders — priced in BDT with bank loan help.",
        keywords: [
            "imported cars Bangladesh",
            "reconditioned car showroom Dhaka",
            "Warrick Motors",
        ],
    },
    cars: {
        title: "Car Inventory — Ready, On The Way & Pre-Order",
        description:
            "Search imported reconditioned and brand-new cars by brand, model, year, fuel type, body style and BDT budget. Updated stock in Dhaka and Chattogram.",
        keywords: ["used car price Bangladesh", "reconditioned car list", "hybrid SUV Dhaka"],
    },
    preOrder: {
        title: "Pre-Order & Import Request",
        description:
            "Tell us the model, grade and colour you want. We source from Japanese auctions and global dealers and share auction sheets before you commit.",
        keywords: ["import car from Japan Bangladesh", "car pre-order Dhaka"],
    },
    showroom: {
        title: "Showroom & Services — Test Drive, BRTA, Bank Loan",
        description:
            "Visit our Gulshan and Chattogram showrooms. Test drives, BRTA registration support, bank loan assistance and after-sales service under one roof.",
        keywords: ["car showroom Dhaka", "BRTA registration help", "car loan assistance"],
    },
    about: {
        title: "About Warrick Motors — Direct Import, Transparent Process",
        description:
            "How we import: auction bidding, inspection, shipping to Chattogram, customs and delivery. A decade of transparent car imports in Bangladesh.",
        keywords: ["car importer Bangladesh", "about Warrick Motors"],
    },
    contact: {
        title: "Contact & Directions",
        description:
            "Call, WhatsApp or visit Warrick Motors in Gulshan-2, Dhaka and GEC Circle, Chattogram. Opening hours, map and inquiry form.",
        keywords: ["Warrick Motors contact", "car showroom Gulshan address"],
    },
    terms: {
        title: "Terms & Conditions",
        description:
            "Terms covering vehicle listings, pricing, reservations, pre-orders, payments, delivery and use of the Warrick Motors website.",
    },
    privacy: {
        title: "Privacy Policy",
        description:
            "How Warrick Motors collects, uses and protects the personal information you share through our website, WhatsApp and showrooms.",
    },
};
