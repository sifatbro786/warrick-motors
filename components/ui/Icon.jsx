/**
 * Inline SVG icon set (stroke 1.6, 24px grid) — zero dependencies, tree-shaken
 * by name lookup. Decorative by default (aria-hidden); pass `label` when the
 * icon is the only content of a control.
 */
const PATHS = {
    "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
    "arrow-left": <path d="M19 12H5M11 18l-6-6 6-6" />,
    "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
    "chevron-down": <path d="m6 9 6 6 6-6" />,
    "chevron-left": <path d="m15 18-6-6 6-6" />,
    "chevron-right": <path d="m9 18 6-6-6-6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h10" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    search: (
        <>
            <circle cx="11" cy="11" r="6.5" />
            <path d="m20 20-4-4" />
        </>
    ),
    phone: (
        <path d="M5 4h3.2l1.6 4-2 1.3a11 11 0 0 0 5 5l1.3-2 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
    ),
    mail: (
        <>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
        </>
    ),
    "map-pin": (
        <>
            <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.5" />
        </>
    ),
    clock: (
        <>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5V12l3 2" />
        </>
    ),
    calendar: (
        <>
            <rect x="3.5" y="5" width="17" height="15" rx="2" />
            <path d="M3.5 10h17M8 3v4M16 3v4" />
        </>
    ),
    gauge: (
        <>
            <path d="M4.5 17a8.5 8.5 0 1 1 15 0" />
            <path d="m12 13 4-4" />
            <circle cx="12" cy="13" r="1" />
        </>
    ),
    fuel: (
        <>
            <path d="M5 20V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v15M3.5 20h12M5 10h9" />
            <path d="M14 8h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V9l-3-3" />
        </>
    ),
    engine: (
        <>
            <path d="M7 8h7l2 2h2v3h2v-2.5M20 16v-2.5M7 8V6h4M7 8v8h2l2 2h7v-5" />
            <path d="M4 10v5M4 12.5h3" />
        </>
    ),
    bolt: <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7z" />,
    "shield-check": (
        <>
            <path d="M12 3 5 6v5.5c0 4.3 3 7.8 7 9.5 4-1.7 7-5.2 7-9.5V6l-7-3z" />
            <path d="m9 12 2 2 4-4" />
        </>
    ),
    "file-check": (
        <>
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
            <path d="M14 3v5h5M9 14l2 2 4-4" />
        </>
    ),
    landmark: <path d="M3 21h18M5 21V10M19 21V10M9.5 21V10M14.5 21V10M2.5 10 12 4l9.5 6z" />,
    ship: (
        <>
            <path d="M3 17c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0" />
            <path d="M5 14 4 10h16l-1.5 4M7 10V6h6l2 4M9 6V3" />
        </>
    ),
    key: (
        <>
            <circle cx="8" cy="15" r="4" />
            <path d="m11 12 9-9M17 6l2 2M15 8l2 2" />
        </>
    ),
    car: (
        <>
            <path d="M5 16H3.5v-3.5L6 8h12l2.5 4.5V16H19" />
            <path d="M3.5 12.5h17M9 16h6" />
            <circle cx="7" cy="16.5" r="1.8" />
            <circle cx="17" cy="16.5" r="1.8" />
        </>
    ),
    wrench: (
        <path d="M14.5 6.5a4 4 0 0 0 5 5l-8.5 8.5a2.1 2.1 0 0 1-3-3L16.5 8.5a4 4 0 0 0-2-2zM14.5 6.5 17 4" />
    ),
    sliders: <path d="M4 7h10M18 7h2M4 17h4M12 17h8M14 4v6M8 14v6" />,
    check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
    star: <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z" />,
    quote: <path d="M9.5 7C6.5 8 5 10.5 5 14v3h5v-5H7.5c0-2 .8-3.3 2.5-4zm9 0c-3 1-4.5 3.5-4.5 7v3h5v-5h-2.5c0-2 .8-3.3 2.5-4z" />,
    play: <path d="M8 5.5v13l10-6.5z" />,
    facebook: <path d="M14 8.5V7c0-.8.3-1.3 1.4-1.3H17V3h-2.5C11.8 3 11 4.7 11 6.8v1.7H9V11h2v10h3V11h2.5L17 8.5z" />,
    instagram: (
        <>
            <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
        </>
    ),
    youtube: (
        <>
            <rect x="2.5" y="6" width="19" height="12.5" rx="3.5" />
            <path d="m10.5 9.5 4.5 2.75-4.5 2.75z" fill="currentColor" />
        </>
    ),
};

// WhatsApp glyph needs fill, not stroke
const WHATSAPP = (
    <path
        fill="currentColor"
        stroke="none"
        d="M12.04 2.5a9.45 9.45 0 0 0-8.12 14.3L2.5 21.5l4.83-1.38A9.45 9.45 0 1 0 12.04 2.5zm0 17.2a7.74 7.74 0 0 1-3.95-1.08l-.28-.17-2.87.82.84-2.8-.18-.29a7.75 7.75 0 1 1 6.44 3.52zm4.25-5.8c-.23-.12-1.37-.68-1.58-.75-.21-.08-.37-.12-.52.11-.16.24-.6.76-.73.91-.14.16-.27.18-.5.06a6.33 6.33 0 0 1-3.13-2.73c-.24-.41.24-.38.68-1.27a.43.43 0 0 0-.02-.41c-.06-.12-.52-1.26-.72-1.72-.19-.45-.38-.39-.52-.4h-.45a.86.86 0 0 0-.62.3 2.6 2.6 0 0 0-.82 1.94 4.5 4.5 0 0 0 .95 2.4 10.36 10.36 0 0 0 3.97 3.5c1.48.64 2.06.7 2.8.59.45-.07 1.37-.56 1.57-1.1.19-.54.19-1 .13-1.1-.06-.1-.21-.16-.44-.28z"
    />
);

export default function Icon({ name, size = 20, className, label, strokeWidth = 1.6 }) {
    const content = name === "whatsapp" ? WHATSAPP : PATHS[name];
    if (!content) return null;
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            role={label ? "img" : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
            focusable="false"
        >
            {content}
        </svg>
    );
}
