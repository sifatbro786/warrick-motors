import localFont from "next/font/local";

/**
 * Self-hosted fonts (no Google Fonts request at build or runtime).
 *  - Plus Jakarta Sans  → display headings
 *  - Geist              → body / UI
 */
export const jakarta = localFont({
    src: "./fonts/PlusJakartaSans-Variable.woff2",
    variable: "--font-jakarta",
    weight: "200 800",
    display: "swap",
});

export const geist = localFont({
    src: "./fonts/Geist-Variable.woff2",
    variable: "--font-geist",
    weight: "100 900",
    display: "swap",
});
