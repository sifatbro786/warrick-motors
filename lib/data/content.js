/**
 * MOCK MARKETING CONTENT (home page and later /about, /showroom).
 * Admin phase: each export becomes a collection/document editable from the
 * dashboard (HeroSlide, Testimonial, Delivery, SiteStat). Read only through
 * lib/services/content.service.js.
 *
 * ⚠️ PLACEHOLDER testimonials & delivery stories — replace with real, consented
 * customer stories and photos before launch.
 */

const img = (id, w = 2000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

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
    { icon: "key", value: "1,240+", label: "Cars handed over", note: "Since 2014, Dhaka & Chattogram" },
    { icon: "file-check", value: "Grade 4+", label: "Auction sheet minimum", note: "Sheet shared before you pay" },
    { icon: "ship", value: "35–45", unit: "days", label: "Japan → Chattogram", note: "Typical door-to-showroom" },
    { icon: "landmark", value: "9", label: "Partner banks", note: "Car loan up to 50%" },
];

/** Brand tiles (Browse by brand) — counts come from live inventory */
export const brandShowcase = [
    { brand: "Toyota", image: img("1554841649-de947c4b954a", 1000), alt: "Toyota Land Cruiser" },
    { brand: "Lexus", image: img("1577496549804-8b05f1f67338", 1000), alt: "Black Lexus sedan" },
    { brand: "Mercedes-Benz", image: img("1609184166822-bd1f1b991a06", 1000), alt: "Mercedes-AMG G 63" },
    { brand: "BMW", image: img("1731988666894-482242ceae2f", 1000), alt: "Black BMW X5" },
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
