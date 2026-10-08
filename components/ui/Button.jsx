import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils/format";

/**
 * One button primitive for the whole site.
 *  - `href`      → renders <Link> (internal) or <a> (external / tel: / wa.me)
 *  - otherwise   → <button>; supports `pending` for form submissions
 *
 * Variants map to intent, not colour:
 *   primary  = the single "do this" action on a surface (crimson)
 *   dark     = strong secondary on light surfaces (navy)
 *   outline  = tertiary on light surfaces
 *   ghost-light / outline-light = on dark navy bands & hero imagery
 *   whatsapp = WhatsApp inquiry only
 */
const VARIANTS = {
    primary:
        "bg-crimson-600 text-white hover:bg-crimson-700 active:bg-crimson-800 shadow-[0_8px_20px_-10px_rgb(225_29_72/0.7)]",
    dark: "bg-ink-900 text-white hover:bg-ink-700",
    outline: "border border-line-strong text-ink-900 bg-white hover:border-ink-900",
    "outline-light": "border border-white/35 text-white hover:bg-white hover:text-ink-900",
    "ghost-light": "text-white/90 hover:text-white",
    whatsapp: "bg-whatsapp text-white hover:brightness-95",
    link: "text-ink-900 underline-offset-[6px] decoration-gold-500 hover:underline px-0!",
};

const SIZES = {
    sm: "h-9 px-3.5 text-[13px] gap-1.5",
    md: "h-11 px-5 text-sm gap-2",
    lg: "h-13 px-7 text-[15px] gap-2.5",
    icon: "h-10 w-10 justify-center",
};

const isExternal = (href) => /^(https?:|mailto:|tel:)/.test(href);

export default function Button({
    href,
    variant = "primary",
    size = "md",
    icon,
    iconRight,
    pending = false,
    className,
    children,
    ...props
}) {
    const classes = cn(
        "inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap select-none",
        "transition-[background-color,color,border-color,filter,transform] duration-300 ease-out",
        "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        VARIANTS[variant],
        SIZES[size],
        className,
    );

    const content = (
        <>
            {pending ? <Spinner /> : icon ? <Icon name={icon} size={size === "sm" ? 16 : 18} /> : null}
            {children}
            {iconRight && !pending ? (
                <Icon
                    name={iconRight}
                    size={size === "sm" ? 16 : 18}
                    className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
                />
            ) : null}
        </>
    );

    if (href) {
        if (isExternal(href)) {
            const newTab = href.startsWith("http");
            return (
                <a
                    href={href}
                    className={cn("group/btn", classes)}
                    {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...props}
                >
                    {content}
                </a>
            );
        }
        return (
            <Link href={href} className={cn("group/btn", classes)} {...props}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type="button"
            className={cn("group/btn", classes)}
            disabled={pending || props.disabled}
            aria-busy={pending || undefined}
            {...props}
        >
            {content}
        </button>
    );
}

function Spinner() {
    return (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".25" strokeWidth="3" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}
