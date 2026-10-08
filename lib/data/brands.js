/**
 * Brand registry. `logo` is a path under /public (e.g. "/brands/toyota.svg").
 * Drop the official SVG/PNG from the brand's press kit there and set the path —
 * until then <BrandMark> renders a neutral monogram badge.
 * Admin phase: becomes a `Brand` collection with an upload field.
 */
export const brands = [
    { name: "Toyota", monogram: "T", origin: "Japan", logo: "/brands/toyota.png" },
    { name: "Lexus", monogram: "Lx", origin: "Japan", logo: "/brands/lexus.png" },
    { name: "Honda", monogram: "H", origin: "Japan", logo: "/brands/honda.png" },
    { name: "Nissan", monogram: "N", origin: "Japan", logo: "/brands/nissan.png" },
    { name: "Mercedes-Benz", monogram: "MB", origin: "Germany", logo: "/brands/Mercedes.png" },
    { name: "BMW", monogram: "BM", origin: "Germany", logo: "/brands/BMW.png" },
    {
        name: "Land Rover",
        monogram: "LR",
        origin: "United Kingdom",
        logo: "/brands/land-rover.png",
    },
    { name: "Hyundai", monogram: "Hy", origin: "South Korea", logo: "/brands/hyundai.png" },
];
