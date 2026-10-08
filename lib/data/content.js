/**
 * MOCK MARKETING CONTENT (home page and later /about, /showroom).
 * Admin phase: each export becomes a collection/document editable from the
 * dashboard (HeroSlide, Testimonial, Delivery, SiteStat). Read only through
 * lib/services/content.service.js.
 *
 * ⚠️ PLACEHOLDER testimonials & delivery stories — replace with real, consented
 * customer stories and photos before launch.
 */

const img = (id, w = 2000) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Hero slides — each one points at a real inventory unit (carSlug) */
export const heroSlides = [
    {
        id: "hero-rr",
        image: img("1725815761064-b84c3f4f9b94", 2400),
        alt: "White Range Rover Sport parked outside",
        kicker: "Arriving December · UK import",
        caption: "2022 Range Rover Sport P400",
        carSlug: "range-rover-sport-p400-2022",
    },
    {
        id: "hero-prado",
        image: img("1709620435533-56483034bdd4", 2400),
        alt: "White Toyota Land Cruiser on the beach",
        kicker: "In the Gulshan showroom",
        caption: "2022 Land Cruiser Prado TX-L",
        carSlug: "toyota-land-cruiser-prado-tx-l-2022",
    },
    {
        id: "hero-g63",
        image: img("1609184166822-bd1f1b991a06", 2400),
        alt: "Black Mercedes-AMG G 63 on an open road",
        kicker: "Pre-order · sourced to your spec",
        caption: "2022 Mercedes-AMG G 63",
        carSlug: "mercedes-amg-g63-2022",
    },
];

/** Static facts — shown as plain numbers, never animated counters */
export const companyStats = [
    {
        icon: "key",
        value: "1,240+",
        label: "Cars handed over",
        note: "Since 2014, Dhaka & Chattogram",
    },
    {
        icon: "file-check",
        value: "Grade 4+",
        label: "Auction sheet minimum",
        note: "Sheet shared before you pay",
    },
    {
        icon: "ship",
        value: "35–45",
        unit: "days",
        label: "Japan → Chattogram",
        note: "Typical door-to-showroom",
    },
    {
        icon: "landmark",
        value: "9",
        label: "Partner banks",
        note: "Car loan up to 50%",
    },
];

/** Brand tiles (Browse by brand) — counts come from live inventory */
export const brandShowcase = [
    {
        brand: "Toyota",
        image: img("1554841649-de947c4b954a", 1000),
        alt: "Toyota Land Cruiser",
    },
    {
        brand: "Lexus",
        image: img("1577496549804-8b05f1f67338", 1000),
        alt: "Black Lexus sedan",
    },
    {
        brand: "Mercedes-Benz",
        image: img("1609184166822-bd1f1b991a06", 1000),
        alt: "Mercedes-AMG G 63",
    },
    {
        brand: "BMW",
        image: img("1731988666894-482242ceae2f", 1000),
        alt: "Black BMW X5",
    },
];

export const whyWarrick = [
    {
        icon: "ship",
        title: "Direct Import Guarantee",
        body: "We bid at Japanese auctions and buy from UK/UAE dealers ourselves — no middle importer, no hidden margin.",
    },
    {
        icon: "gauge",
        title: "100% Genuine Mileage",
        body: "Original auction sheet and export certificate with every car. If the odometer is wrong, we buy it back.",
    },
    {
        icon: "file-check",
        title: "BRTA Registration Support",
        body: "Our team handles BRTA paperwork, tax token and fitness — you collect the number plate, not the queue.",
    },
    {
        icon: "landmark",
        title: "Bank Loan Assistance",
        body: "Pre-approved car loans with 9 partner banks. We prepare the quotation and file the papers for you.",
    },
];

export const whyImage = {
    src: img("1621697944804-d0a393f7e01a", 1400),
    alt: "Cargo ship docked at port at night",
};

export const showroomImage = {
    src: img("1692406069831-0bb7ea297645", 2200),
    alt: "Cars lined up on a showroom floor",
};

export const deliveries = [
    {
        id: "d1",
        image: img("1727893512947-8bdc773ceb02", 900),
        alt: "Car keys handed to a customer",
        caption: "Harrier Z · handed over in Gulshan",
        date: "Sep 2026",
    },
    {
        id: "d2",
        image: img("1643792801605-1f8081811439", 900),
        alt: "Customer holding a car key beside a silver car",
        caption: "C-HR G-LED · first car for the family",
        date: "Aug 2026",
    },
    {
        id: "d3",
        image: img("1761014586544-53fe5e1f1e25", 900),
        alt: "Hands exchanging a car key",
        caption: "Premio F-EX · Chattogram yard",
        date: "Aug 2026",
    },
    {
        id: "d4",
        image: img("1533558701576-23c65e0272fb", 900),
        alt: "Mercedes-Benz key fob in hand",
        caption: "C200 · straight from the port",
        date: "Jul 2026",
    },
];

export const testimonials = [
    {
        id: "t1",
        name: "Tanvir Ahmed",
        role: "Business owner, Banani",
        car: "2021 Toyota Harrier Hybrid",
        quote: "They sent me the auction sheet on WhatsApp before I paid a single taka. The car arrived exactly as described — even the small scratch they had mentioned.",
        rating: 5,
    },
    {
        id: "t2",
        name: "Nusrat Jahan",
        role: "Doctor, Chattogram",
        car: "2020 Toyota C-HR",
        quote: "Registration and the bank loan were sorted by their team. I only went to the showroom twice — once for the test drive, once to collect the keys.",
        rating: 5,
    },
    {
        id: "t3",
        name: "Rafiq Chowdhury",
        role: "Corporate fleet, Gulshan",
        car: "2× Lexus ES 300h",
        quote: "We have bought four cars from Warrick for our office. Straight answers on price, no drama on delivery dates.",
        rating: 5,
    },
];

/** Home page FAQ — also emitted as FAQPage JSON-LD. Keep answers factual and short. */
export const faqs = [
    {
        q: "Do you share the Japanese auction sheet before I pay?",
        a: "Yes. Every reconditioned car comes with its original auction sheet and export certificate. We send both on WhatsApp before you place any booking money, and you can verify the chassis number yourself.",
    },
    {
        q: "How do I know the mileage is genuine?",
        a: "We match the odometer against the auction sheet and the export certificate issued in Japan. If a car's mileage ever turns out to be tampered with, we buy the car back.",
    },
    {
        q: "How long does a pre-order or import request take?",
        a: "Usually 6–9 weeks from confirming the car to receiving it in Dhaka: around 1–2 weeks to find and win the right car at auction, 3–4 weeks of shipping to Chattogram port, and 1–2 weeks for customs clearance and delivery.",
    },
    {
        q: "Is the advertised price final, and what is not included?",
        a: "Prices are in BDT and include import duty and customs clearance. BRTA registration fees, tax token, fitness and insurance are paid separately at government rates; our team gives you an exact breakdown before you book.",
    },
    {
        q: "Can you arrange a bank car loan?",
        a: "Yes. We work with partner banks that finance up to 50% of the car's price for up to 5 years. Our finance desk prepares the quotation and files the paperwork with the bank you choose.",
    },
    {
        q: "Will you handle BRTA registration?",
        a: "Yes. We prepare and submit the BRTA documents, follow up on biometrics and the number plate, and hand you the registered car — you only attend where your presence is legally required.",
    },
    {
        q: "Can I test drive a car before buying?",
        a: "Any car marked 'In Showroom' can be test driven at our Gulshan or Chattogram showroom. Book a slot online or on WhatsApp and bring a valid driving licence.",
    },
    {
        q: "Do you accept trade-ins or exchange of my current car?",
        a: "Yes, we evaluate exchange cars at the showroom. Bring the registration papers and we will give you a written offer that you can adjust against your new car.",
    },
];

/* ===========================================================================
   PHASE 4 PAGES — pre-order, showroom, about, contact
   ======================================================================== */

/** /pre-order — how a request becomes a car */
export const preOrderSteps = [
    {
        title: "Tell us the car",
        body: "Model, grade, year range, colour and budget. Two minutes on this form or WhatsApp.",
        time: "Day 0",
    },
    {
        title: "Auction options",
        body: "We shortlist grade 4+ cars from Japanese auctions and send photos with auction sheets.",
        time: "Within 48 hrs",
    },
    {
        title: "Approve & deposit",
        body: "You pick a car and we bid. Deposit is only taken once you approve a specific chassis.",
        time: "Week 1–2",
    },
    {
        title: "Shipping",
        body: "Roll-on/roll-off vessel from Yokohama or Nagoya to Chattogram, with tracking updates.",
        time: "Week 3–6",
    },
    {
        title: "Customs & handover",
        body: "We clear customs, register with BRTA and hand you the keys at the showroom.",
        time: "Week 7–9",
    },
];

/** quick-fill chips on the pre-order form (most requested) */
export const popularRequests = [
    { brand: "Toyota", model: "Harrier" },
    { brand: "Toyota", model: "Land Cruiser Prado" },
    { brand: "Toyota", model: "Corolla Cross" },
    { brand: "Honda", model: "Vezel" },
    { brand: "Toyota", model: "Noah" },
    { brand: "Lexus", model: "LX 600" },
];

/** /about — import process timeline */
export const importProcess = [
    {
        icon: "search",
        title: "Sourcing",
        body: "Our buyers in Japan inspect auction listings daily — USS, TAA, CAA — and reject anything below grade 4 or with a repaired frame.",
    },
    {
        icon: "file-check",
        title: "Verification",
        body: "Auction sheet translated, chassis number checked against export records, mileage history cross-checked before we bid.",
    },
    {
        icon: "ship",
        title: "Shipping",
        body: "Cars are consolidated in Yokohama and shipped roll-on/roll-off to Chattogram. You get the bill of lading and vessel name.",
    },
    {
        icon: "landmark",
        title: "Customs",
        body: "Duty paid at the official assessed value. You receive the customs papers — no under-invoicing, no surprises at registration.",
    },
    {
        icon: "wrench",
        title: "Preparation",
        body: "Workshop check, fluids, battery and detailing in our yard. Any issue found is fixed or disclosed before sale.",
    },
    {
        icon: "key",
        title: "Handover",
        body: "BRTA registration, insurance and a full document file handed over with the keys at the showroom.",
    },
];

export const aboutStory = {
    since: 2014,
    // Owner portrait lives in /public. `name` left null until the client confirms how it should appear.
    founder: {
        name: null,
        role: "Founder & Managing Director",
        image: "/warrick.jpeg",
        imageAlt: "Founder of Warrick Motors",
        quote: "I started importing cars because I was tired of buyers being told half the story. Every car we sell comes with the full file — the same file I would want if I were buying it for my own family.",
    },
    image: img("1720545044233-d2ac77fa6030", 1600),
    imageAlt: "Cars lined up inside the showroom",
    paragraphs: [
        "Warrick Motors started in 2014 with a small yard near GEC Circle in Chattogram, importing a handful of reconditioned sedans a month for friends and family who were tired of guessing about mileage.",
        "The rule we started with still runs the business: every buyer sees the auction sheet, the export certificate and the customs papers before paying. A decade later we import for families, doctors, business owners and corporate fleets from our Gulshan flagship and the Chattogram port yard.",
    ],
};

/** What we hand every buyer — the transparency promise */
export const documentsYouGet = [
    "Original Japanese auction sheet (with English translation)",
    "Export certificate showing chassis number and mileage",
    "Bill of lading and vessel details",
    "Customs assessment and duty payment receipt",
    "BRTA registration papers and tax token",
    "Workshop inspection report from our yard",
];

/** /showroom — services */
export const services = [
    {
        icon: "key",
        title: "Test drives",
        body: "Any car marked In Showroom can be driven on the day. Bring a valid licence.",
    },
    {
        icon: "file-check",
        title: "BRTA registration",
        body: "Documents, biometrics follow-up and number plate — handled end to end.",
    },
    {
        icon: "landmark",
        title: "Bank loan assistance",
        body: "Quotations and paperwork with partner banks; up to 50% finance, 5 years.",
    },
    {
        icon: "shield-check",
        title: "Insurance",
        body: "Comprehensive or third-party cover arranged before handover.",
    },
    {
        icon: "car",
        title: "Exchange & trade-in",
        body: "Written offer for your current car, adjusted against the new one.",
    },
    {
        icon: "wrench",
        title: "After-sales service",
        body: "First service, inspection and parts sourcing through our partner workshop.",
    },
];

export const showroomGallery = [
    {
        src: img("1692406069831-0bb7ea297645", 1600),
        alt: "Cars on the showroom floor",
        span: "lg:col-span-2 lg:row-span-2",
    },
    {
        src: img("1643142314913-0cf633d9bbb5", 900),
        alt: "Red car displayed in the showroom",
        span: "",
    },
    {
        src: img("1647200527435-cc6b0e91e120", 900),
        alt: "Car on a lit display stage",
        span: "",
    },
    {
        src: img("1727893119356-1702fe921cf9", 900),
        alt: "Workshop technicians preparing cars",
        span: "",
    },
    {
        src: img("1625047509248-ec889cbff17f", 900),
        alt: "Engine inspection in the workshop",
        span: "",
    },
];
