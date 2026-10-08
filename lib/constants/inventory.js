/**
 * Inventory enums. These mirror the future Mongoose schema enums
 * (models/Car.js) — keep both in sync. UI reads labels/tones from here,
 * so adding a status in the admin later is a one-file change.
 */

export const STOCK_STATUS = Object.freeze({
    READY: "Ready in Showroom",
    ON_THE_WAY: "On The Way",
    PRE_ORDER: "Pre-Order",
});

export const STOCK_STATUS_META = {
    [STOCK_STATUS.READY]: {
        key: "ready",
        short: "In Showroom",
        description: "Physically on our floor — book a test drive today.",
        tone: "ready",
    },
    [STOCK_STATUS.ON_THE_WAY]: {
        key: "shipment",
        short: "Shipment On The Way",
        description: "Shipped from Japan — reserve now before it lands.",
        tone: "transit",
    },
    [STOCK_STATUS.PRE_ORDER]: {
        key: "pre-order",
        short: "Pre-Order",
        description: "Sourced to order from auction / overseas dealers.",
        tone: "preorder",
    },
};

/** URL-safe key <-> status value (used in ?status= query params) */
export const STATUS_BY_KEY = Object.fromEntries(
    Object.entries(STOCK_STATUS_META).map(([value, meta]) => [meta.key, value]),
);

export const FUEL_TYPES = ["Hybrid", "Plug-in Hybrid", "Octane", "Diesel", "Electric"];

export const BODY_TYPES = ["SUV", "Sedan", "Crossover", "Microbus", "Hatchback", "Coupe"];

export const TRANSMISSIONS = ["Automatic", "CVT", "Manual"];

export const CONDITIONS = ["Recondition", "Brand New", "Pre-Owned"];

export const LOCATIONS = ["Dhaka", "Chattogram"];

/** Budget presets in BDT (Lakh-based, how BD buyers actually think about price) */
export const BUDGET_RANGES = [
    { key: "u30", label: "Under 30 Lakh", min: 0, max: 3_000_000 },
    { key: "30-60", label: "30 – 60 Lakh", min: 3_000_000, max: 6_000_000 },
    { key: "60-100", label: "60 Lakh – 1 Crore", min: 6_000_000, max: 10_000_000 },
    { key: "100-200", label: "1 – 2 Crore", min: 10_000_000, max: 20_000_000 },
    { key: "200p", label: "2 Crore +", min: 20_000_000, max: Infinity },
];

export const SORT_OPTIONS = [
    { key: "newest", label: "Newest Arrivals" },
    { key: "price-asc", label: "Price: Low to High" },
    { key: "price-desc", label: "Price: High to Low" },
    { key: "year-desc", label: "Model Year: Newest" },
    { key: "mileage-asc", label: "Mileage: Lowest" },
];

/** Human labels for the flat `car.specs` object (detail page spec table). Order = display order. */
export const SPEC_LABELS = {
    engine: "Engine",
    power: "Max Power",
    torque: "Max Torque",
    drivetrain: "Drivetrain",
    fuelEconomy: "Fuel Economy",
    battery: "Battery",
    range: "Range",
    seats: "Seating",
    length: "Length",
    groundClearance: "Ground Clearance",
    wheels: "Wheels",
};
