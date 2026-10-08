import { cn } from "@/lib/utils/format";

export { default as Accent } from "@/components/ui/Accent";

/**
 * Editorial section header:
 *   01 ——— INVENTORY
 *   Ready to drive, [today] ← <Accent>: gold colour + drawn underline
 *
 * `title` accepts a node so one word can be wrapped in <Accent>.
 */
export default function SectionHeading({
    index,
    eyebrow,
    title,
    description,
    align = "left",
    tone = "light",
    action,
    as: Tag = "h2",
    className,
}) {
    const dark = tone === "dark";
    return (
        <div
            className={cn(
                "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
                align === "center" && "items-center text-center md:flex-col md:items-center",
                className,
            )}
        >
            <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
                {(eyebrow || index) && (
                    <p
                        className={cn(
                            "eyebrow mb-4 flex items-center gap-3",
                            align === "center" && "justify-center",
                            dark ? "text-gold-300" : "text-gold-600",
                        )}
                    >
                        {index && <span className="nums">{index}</span>}
                        {index && <span aria-hidden="true" className={cn("h-px w-8", dark ? "bg-gold-300/50" : "bg-gold-500/50")} />}
                        {eyebrow}
                    </p>
                )}
                <Tag
                    className={cn(
                        "text-[2rem] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[2.6rem]",
                        dark ? "text-white" : "text-ink-900",
                    )}
                >
                    {title}
                </Tag>
                {description && (
                    <p className={cn("mt-4 text-[15px] leading-relaxed sm:text-base", dark ? "text-ink-300" : "text-ink-500")}>
                        {description}
                    </p>
                )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}
