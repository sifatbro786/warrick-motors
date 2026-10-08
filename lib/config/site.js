/**
 * Single source of truth for brand + contact info.
 * Phase "Admin": this object becomes a `SiteSettings` document in MongoDB
 * (read through lib/services/settings.service.js). Components must import
 * from here — never hardcode phone numbers / addresses in JSX.
 */
export const siteConfig = {
    name: "Warrick Motors",
    legalName: "Warrick Motors Ltd.",
    tagline: "Direct Imported Cars — Japan & Worldwide",
    description:
        "Warrick Motors imports reconditioned and brand-new cars directly from Japanese auctions and global markets. Browse ready-in-showroom stock, track incoming shipments, or place a pre-order.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    locale: "en_BD",
    currency: "BDT",

    contact: {
        hotline: "+8801700000000",
        hotlineDisplay: "+880 1700-000000",
        sales: "+8801800000000",
        salesDisplay: "+880 1800-000000",
        whatsapp: "8801700000000", // wa.me format: country code, no "+"
        email: "sales@warrickmotors.com.bd",
    },

    showrooms: [
        {
            id: "dhaka",
            city: "Dhaka",
            label: "Flagship Showroom",
            address: "Plot 12, Road 113, Gulshan-2, Dhaka 1212",
            // structured address + geo for JSON-LD / Google Business consistency
            street: "Plot 12, Road 113, Gulshan-2",
            locality: "Dhaka",
            postalCode: "1212",
            geo: { lat: 23.7925, lng: 90.4152 },
            mapUrl: "https://maps.google.com/?q=Gulshan+2+Dhaka",
            mapEmbed:
                "https://maps.google.com/maps?q=Gulshan%202%2C%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed",
            phone: "+8801700000000",
        },
        {
            id: "chittagong",
            city: "Chattogram",
            label: "Port City Yard",
            address: "CDA Avenue, GEC Circle, Chattogram 4000",
            street: "CDA Avenue, GEC Circle",
            locality: "Chattogram",
            postalCode: "4000",
            geo: { lat: 22.3589, lng: 91.8215 },
            mapUrl: "https://maps.google.com/?q=GEC+Circle+Chattogram",
            mapEmbed:
                "https://maps.google.com/maps?q=GEC%20Circle%2C%20Chattogram&t=&z=15&ie=UTF8&iwloc=&output=embed",
            phone: "+8801800000000",
        },
    ],

    hours: [
        { days: "Saturday – Thursday", time: "10:00 AM – 8:00 PM" },
        { days: "Friday", time: "3:00 PM – 8:00 PM" },
    ],
    // machine-readable version of `hours` (schema.org OpeningHoursSpecification)
    hoursSpec: [
        {
            days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
            opens: "10:00",
            closes: "20:00",
        },
        { days: ["Friday"], opens: "15:00", closes: "20:00" },
    ],
    foundingYear: 2014,
    developer: { name: "STR Solutions LTD", url: "https://strsltd.com" },

    social: [
        { label: "Facebook", href: "https://facebook.com/", icon: "facebook" },
        { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
        { label: "YouTube", href: "https://youtube.com/", icon: "youtube" },
    ],

    nav: [
        { label: "Inventory", href: "/cars" },
        { label: "Pre-Order", href: "/pre-order" },
        { label: "Showroom", href: "/showroom" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ],
};

export const telHref = (number) => `tel:${number.replace(/[^\d+]/g, "")}`;
