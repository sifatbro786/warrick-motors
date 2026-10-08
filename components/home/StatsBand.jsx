import QuickSearch from "@/components/home/QuickSearch";
import Icon from "@/components/ui/Icon";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * Dark band under the hero: search card overlaps upward, then plain-number
 * facts with hairline dividers (Kraftwerk spec band). Numbers are static on
 * purpose — no count-up gimmicks.
 */
export default function StatsBand({ stats = [], filterOptions }) {
    return (
        <section aria-label="Search and key facts" className="relative bg-ink-950 pb-16 text-white md:pb-20">
            <div className="container-page relative z-20 -mt-[92px] md:-mt-[104px]">
                <QuickSearch
                    brands={filterOptions.brands}
                    modelsByBrand={filterOptions.modelsByBrand}
                    statusCounts={filterOptions.counts.byStatus}
                    total={filterOptions.counts.total}
                />
            </div>

            <div className="container-page">
                <Stagger
                    as="dl"
                    className="mt-14 grid grid-cols-2 gap-y-10 border-t border-white/10 pt-12 md:mt-16 lg:grid-cols-4"
                    stagger={0.1}
                >
                    {stats.map((s, i) => (
                        <StaggerItem
                            key={s.label}
                            className={`flex flex-col px-1 sm:px-6 ${i % 2 ? "border-l border-white/10" : ""} ${i > 0 ? "lg:border-l lg:border-white/10" : ""} lg:first:pl-0`}
                        >
                            <Icon name={s.icon} size={26} strokeWidth={1.3} className="text-gold-400" />
                            <dd className="nums mt-5 font-display text-[2.1rem] leading-none font-semibold tracking-tight sm:text-[2.6rem]">
                                {s.value}
                                {s.unit && <span className="ml-1.5 text-base font-medium text-ink-300">{s.unit}</span>}
                            </dd>
                            <dt className="eyebrow mt-3 text-[11px] text-white/85">{s.label}</dt>
                            <p className="mt-2 text-[13px] text-ink-400">{s.note}</p>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
