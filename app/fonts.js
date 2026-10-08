import localFont from "next/font/local";

/**
 * Self-hosted fonts (no Google Fonts request at build or runtime).
 *  - Plus Jakarta Sans  → display headings
 *  - Geist              → body / UI
 *  - Instrument Serif   → the single editorial accent word per section
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

export const instrument = localFont({
    src: [
        { path: "./fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
        { path: "./fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
    ],
    variable: "--font-instrument",
    display: "swap",
});
