import { formatNumberBD, formatLakh, cn } from "@/lib/utils/format";

/**
 * BDT price block.
 *   ASKING PRICE · NEGOTIABLE
 *   BDT 42,50,000            ≈ 42.5 Lakh
 */
export default function PriceTag({ price, negotiable, size = "md", tone = "light", className }) {
    const dark = tone === "dark";
    return (
        <div className={cn("flex flex-col", className)}>
            <span
                className={cn(
                    "text-[10.5px] font-semibold tracking-[0.14em] uppercase",
                    dark ? "text-ink-300" : "text-ink-500",
                )}
            >
                Asking Price
                {negotiable ? <span className="text-gold-600"> · Negotiable</span> : null}
            </span>
            <span className="mt-0.5 flex items-baseline gap-2">
                <span
                    className={cn(
                        "nums font-display font-bold tracking-tight",
                        size === "lg"
                            ? "text-[2rem] leading-none sm:text-[2.4rem]"
                            : "text-[1.3rem] leading-tight",
                        dark ? "text-white" : "text-ink-900",
                    )}
                >
                    <span
                        className={cn(
                            "mr-1 font-sans font-semibold",
                            size === "lg" ? "text-base" : "text-[12px]",
                            dark ? "text-ink-300" : "text-ink-500",
                        )}
                    >
                        BDT
                    </span>
                    {formatNumberBD(price)}
                </span>
                {size === "lg" && (
                    <span className="nums text-sm text-ink-500">≈ {formatLakh(price)}</span>
                )}
            </span>
        </div>
    );
}
