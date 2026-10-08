/**
 * Brand registry. `logo` is a path under /public (e.g. "/brands/toyota.svg").
 * Drop the official SVG/PNG from the brand's press kit there and set the path —
 * until then <BrandMark> renders a neutral monogram badge.
 * Admin phase: becomes a `Brand` collection with an upload field.
 */
export const brands = [
    { name: "Toyota", monogram: "T", origin: "Japan", logo: null },
    { name: "Lexus", monogram: "Lx", origin: "Japan", logo: null },
    { name: "Honda", monogram: "H", origin: "Japan", logo: null },
    { name: "Nissan", monogram: "N", origin: "Japan", logo: null },
    { name: "Mercedes-Benz", monogram: "MB", origin: "Germany", logo: null },
    { name: "BMW", monogram: "BM", origin: "Germany", logo: null },
    { name: "Land Rover", monogram: "LR", origin: "United Kingdom", logo: null },
    { name: "Hyundai", monogram: "Hy", origin: "South Korea", logo: null },
];
