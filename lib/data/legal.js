import { siteConfig } from "@/lib/config/site";

/**
 * Legal page content (Terms, Privacy). Admin phase: editable rich-text pages.
 * ⚠️ Template wording for a Bangladeshi car dealership — have the client's
 * lawyer review before launch. Body items: string = paragraph, { list: [] } = bullets.
 */

export const terms = {
    key: "terms",
    title: "Terms & Conditions",
    updated: "8 October 2026",
    intro: "These terms apply when you use the Warrick Motors website, contact us through WhatsApp or phone, reserve a vehicle, or place a pre-order. By using our website or services you agree to them.",
    sections: [
        {
            id: "about",
            title: "Who we are",
            body: [
                'Warrick Motors Ltd. ("Warrick Motors", "we", "us") is a vehicle importer and dealer with showrooms in Gulshan-2, Dhaka and GEC Circle, Chattogram, Bangladesh.',
            ],
        },
        {
            id: "listings",
            title: "Vehicle listings and information",
            body: [
                "We make every effort to keep listings accurate, including year, mileage, grade, specifications and photographs. Some photographs are representative of the model and may differ from the exact unit; the auction sheet, export certificate and physical inspection take precedence over website content.",
                "A vehicle shown on the website may already be reserved or sold. Availability is confirmed only when our sales team confirms it in writing.",
            ],
        },
        {
            id: "pricing",
            title: "Prices",
            body: [
                "All prices are in Bangladeshi Taka (BDT). Unless stated otherwise, advertised prices include import duty and customs clearance and exclude BRTA registration fees, tax token, fitness certificate, insurance and any government charges, which are payable at prevailing government rates.",
                'Prices marked "Negotiable" are asking prices. Prices for vehicles on the way or on pre-order are indicative and may change with exchange rates, freight costs or government duty changes until a sales agreement is signed.',
            ],
        },
        {
            id: "reservations",
            title: "Reservations and booking money",
            body: [
                "A vehicle is reserved for you only after booking money is received and a written booking confirmation is issued. The confirmation states the amount, the balance due date and the refund terms that apply to that vehicle.",
                {
                    list: [
                        "If we cannot deliver the reserved vehicle, booking money is refunded in full.",
                        "If you cancel, refund of booking money is subject to the terms in your booking confirmation.",
                        "If the balance is not paid by the agreed date, we may release the vehicle after notifying you.",
                    ],
                },
            ],
        },
        {
            id: "pre-orders",
            title: "Pre-orders and import requests",
            body: [
                "For pre-orders we search auctions and overseas dealers based on your specification and share options with auction sheets before purchase. Once you approve a vehicle and we win or buy it on your behalf, the deposit becomes non-refundable because the purchase cannot be reversed.",
                "Delivery timelines are estimates based on typical auction, shipping and customs durations. Delays caused by shipping lines, port congestion, customs or government processes are outside our control.",
            ],
        },
        {
            id: "payments",
            title: "Payments",
            body: [
                "Payments are accepted by bank transfer, pay order or other methods confirmed by our accounts team. Always pay to a Warrick Motors Ltd. company account and request a money receipt — never to a personal account.",
            ],
        },
        {
            id: "delivery",
            title: "Delivery, registration and loans",
            body: [
                "Ownership transfers when the full price is paid and the vehicle is handed over with its documents. Where we provide BRTA registration support or bank loan assistance, we act as a facilitator; approval decisions rest with BRTA and the lending bank.",
            ],
        },
        {
            id: "warranty",
            title: "Condition and warranty",
            body: [
                "Reconditioned and pre-owned vehicles are sold in the condition described by their auction sheet and our inspection, and as seen on handover. Any warranty or after-sales commitment applies only if it is written on your invoice or a separate warranty document.",
            ],
        },
        {
            id: "test-drives",
            title: "Test drives",
            body: [
                "Test drives require a valid Bangladeshi driving licence and are accompanied by our staff. You are responsible for any loss or damage caused by negligent driving during a test drive.",
            ],
        },
        {
            id: "website",
            title: "Use of this website",
            body: [
                "Website content, photographs and branding belong to Warrick Motors or their respective owners and may not be copied for commercial use without permission. Brand names and logos of vehicle manufacturers belong to their owners and are used only to identify the vehicles we sell.",
                "We are not liable for losses arising from reliance on website information that has not been confirmed in writing, or from temporary unavailability of the website.",
            ],
        },
        {
            id: "law",
            title: "Governing law",
            body: [
                "These terms are governed by the laws of Bangladesh, and the courts of Dhaka have jurisdiction over any dispute.",
            ],
        },
        {
            id: "changes",
            title: "Changes to these terms",
            body: [
                "We may update these terms from time to time. The date at the top of this page shows when they were last changed.",
            ],
        },
    ],
};

export const privacy = {
    key: "privacy",
    title: "Privacy Policy",
    updated: "8 October 2026",
    intro: "This policy explains what personal information Warrick Motors collects when you use our website, message us or visit a showroom, how we use it, and the choices you have.",
    sections: [
        {
            id: "collect",
            title: "Information we collect",
            body: [
                {
                    list: [
                        "Contact details you give us: name, mobile number, email address.",
                        "Enquiry details: the car you are interested in, budget, preferred showroom, visit date and messages.",
                        "Purchase and registration details needed to complete a sale, such as national ID and address — collected at the showroom, not through this website.",
                        "Technical data: pages visited, device and browser type, collected through cookies or analytics if enabled.",
                    ],
                },
            ],
        },
        {
            id: "use",
            title: "How we use it",
            body: [
                {
                    list: [
                        "To reply to enquiries, confirm showroom visits and test drives, and prepare quotations.",
                        "To source vehicles for pre-orders and keep you updated on shipment status.",
                        "To complete sales, registration and loan applications you ask us to help with.",
                        "To improve our website and services.",
                    ],
                },
                "We do not sell your personal information.",
            ],
        },
        {
            id: "share",
            title: "When we share information",
            body: [
                "Only when needed to serve you: with banks you choose for a car loan, with BRTA and other authorities for registration, with insurers, and with logistics partners for delivery — or when required by law.",
            ],
        },
        {
            id: "messaging",
            title: "WhatsApp and phone",
            body: [
                "If you contact us on WhatsApp, your messages are also handled under WhatsApp's own privacy policy. We use these conversations only for your enquiry and related follow-up.",
            ],
        },
        {
            id: "cookies",
            title: "Cookies and analytics",
            body: [
                "The website uses essential cookies to function. If we enable analytics, it is used to understand how visitors use the site in aggregate.",
            ],
        },
        {
            id: "retention",
            title: "How long we keep it",
            body: [
                "Enquiry data is kept for as long as it is useful to serve you, and sales records for as long as required by law and tax rules.",
            ],
        },
        {
            id: "security",
            title: "Security",
            body: [
                "We use reasonable technical and organisational measures to protect your information. No online service can be guaranteed completely secure.",
            ],
        },
        {
            id: "rights",
            title: "Your choices",
            body: [
                "You can ask us to show, correct or delete the personal information we hold about you, or to stop sending you updates, by contacting us using the details below.",
            ],
        },
        {
            id: "contact",
            title: "Contact",
            body: [
                `Questions about this policy: ${siteConfig.contact.email} or ${siteConfig.contact.hotlineDisplay}, or visit our ${siteConfig.showrooms[0].locality} showroom.`,
            ],
        },
    ],
};
