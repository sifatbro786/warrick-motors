import { STOCK_STATUS_META } from "@/lib/constants/inventory";
import { cn } from "@/lib/utils/format";

const TONES = {
    ready: { wrap: "bg-ready-bg text-ready", dot: "bg-ready" },
    transit: { wrap: "bg-transit-bg text-transit", dot: "bg-transit" },
    preorder: { wrap: "bg-preorder-bg text-preorder", dot: "bg-preorder" },
};

/** Status pill. Colour is never the only signal — the label is always visible. */
export default function StockBadge({ status, location, className, size = "md" }) {
    const meta = STOCK_STATUS_META[status];
    if (!meta) return null;
    const tone = TONES[meta.tone];
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full font-semibold whitespace-nowrap",
                size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-[12px]",
                tone.wrap,
                className,
            )}
        >
            <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                {meta.tone === "ready" && (
                    <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", tone.dot)} />
                )}
                <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", tone.dot)} />
            </span>
            {meta.short}
            {location && meta.tone === "ready" && <span className="font-medium opacity-75">· {location}</span>}
        </span>
    );
}
