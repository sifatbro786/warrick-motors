/**
 * Formatting helpers. Pure functions — safe in server & client components.
 */

const bdtFormatter = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** 4250000 -> "42,50,000" (South-Asian digit grouping) */
export const formatNumberBD = (value) => bdtFormatter.format(Number(value) || 0);

/** 4250000 -> "BDT 42,50,000" */
export const formatBDT = (value) => `BDT ${formatNumberBD(value)}`;

/** 4250000 -> "42.5 Lakh" | 12500000 -> "1.25 Crore" — for compact chips & filters */
export function formatLakh(value) {
    const n = Number(value) || 0;
    if (n >= 10_000_000) return `${trimZeros((n / 10_000_000).toFixed(2))} Crore`;
    return `${trimZeros((n / 100_000).toFixed(1))} Lakh`;
}

export const formatMileage = (km) => `${formatNumberBD(km)} km`;

export const formatCC = (cc) => (cc ? `${formatNumberBD(cc)} cc` : "EV");

function trimZeros(str) {
    return str.replace(/\.0+$|(\.\d*[1-9])0+$/, "$1");
}

/** Tiny className joiner (no dependency). Falsy values are dropped. */
export const cn = (...classes) => classes.filter(Boolean).join(" ");

export function slugify(str) {
    return String(str)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}
