import Image from "next/image";
import { cn } from "@/lib/utils/format";

/**
 * Round brand badge. Shows the official logo file when `brand.logo` is set,
 * otherwise a monogram in the same footprint so layouts never shift when
 * real logos are added.
 */
export default function BrandMark({ brand, size = 56, className }) {
    return (
        <span
            className={cn(
                "relative inline-flex shrink-0 items-center justify-center rounded-full border border-line-strong bg-white transition-colors",
                className,
            )}
            style={{ width: size, height: size }}
        >
            {brand.logo ? (
                <Image
                    src={brand.logo}
                    alt=""
                    width={size}
                    height={size}
                    className="h-[62%] w-[62%] object-contain"
                />
            ) : (
                <span
                    className="font-display font-extrabold tracking-[-0.04em] text-ink-700"
                    style={{ fontSize: size * (brand.monogram.length > 1 ? 0.34 : 0.42) }}
                >
                    {brand.monogram}
                </span>
            )}
            {/* inner hairline ring — reads like a badge, not a placeholder */}
            <span
                aria-hidden="true"
                className="absolute inset-0.75 rounded-full border border-line"
            />
        </span>
    );
}
