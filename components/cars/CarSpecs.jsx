import Icon from "@/components/ui/Icon";
import { SPEC_LABELS } from "@/lib/constants/inventory";
import { formatCC, formatMileage } from "@/lib/utils/format";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/Reveal";

/** Navy "at a glance" band — up to 4 headline figures (Kraftwerk spec band). */
export function PerformanceBand({ car }) {
    const s = car.specs || {};
    const figures = [
        s.power && { icon: "bolt", value: s.power, label: "Max power" },
        s.torque && { icon: "gauge", value: s.torque, label: "Torque" },
        car.engineCc ? { icon: "engine", value: formatCC(car.engineCc), label: s.engine || "Engine" } : s.battery && { icon: "bolt", value: s.battery, label: "Battery" },
        s.fuelEconomy ? { icon: "fuel", value: s.fuelEconomy, label: "Fuel economy" } : s.range && { icon: "map-pin", value: s.range, label: "Range" },
        s.drivetrain && { icon: "car", value: s.drivetrain, label: "Drivetrain" },
    ]
        .filter(Boolean)
        .slice(0, 4);

    if (!figures.length) return null;

    return (
        <section aria-label="Performance at a glance" className="bg-ink-950 py-14 text-white md:py-16">
            <div className="container-page">
                <Stagger as="dl" className="grid grid-cols-2 gap-y-10 lg:grid-cols-4" stagger={0.08}>
                    {figures.map((f, i) => (
                        <StaggerItem key={f.label} className={`px-1 sm:px-6 ${i % 2 ? "border-l border-white/10" : ""} ${i > 0 ? "lg:border-l lg:border-white/10" : ""} lg:first:pl-0`}>
                            <Icon name={f.icon} size={24} strokeWidth={1.3} className="text-gold-400" />
                            <dd className="nums mt-4 font-display text-[1.45rem] leading-tight font-semibold tracking-tight sm:text-[1.9rem]">{f.value}</dd>
                            <dt className="eyebrow mt-2 text-[10.5px] text-ink-300">{f.label}</dt>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}

/** Overview, feature list, full spec table and import paperwork details. */
export function CarDetailsBody({ car }) {
    const specRows = Object.keys(SPEC_LABELS)
        .filter((k) => car.specs?.[k])
        .map((k) => [SPEC_LABELS[k], car.specs[k]]);

    const importRows = [
        ["Condition", car.condition],
        ["Manufacturing year", car.year],
        ["Registration", car.registration],
        ["Mileage", formatMileage(car.mileage)],
        ["Auction grade", car.auctionGrade || "—"],
        ["Transmission", car.transmission],
        ["Body style", car.bodyType],
        ["Exterior colour", car.color],
        ["Location", car.location],
    ];

    return (
        <div className="space-y-12">
            <Reveal>
                <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-600">{car.description}</p>
            </Reveal>

            {car.features?.length > 0 && (
                <Reveal>
                    <h2 className="text-2xl font-bold tracking-tight">Highlights</h2>
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                        {car.features.map((f) => (
                            <li key={f} className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-[14px] text-ink-800">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-900 text-gold-300">
                                    <Icon name="check" size={13} strokeWidth={2.2} />
                                </span>
                                {f}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            )}

            <div className="grid gap-8 md:grid-cols-2">
                <SpecTable title="Specifications" rows={specRows} />
                <SpecTable title="Import & paperwork" rows={importRows} />
            </div>
        </div>
    );
}

function SpecTable({ title, rows }) {
    if (!rows.length) return null;
    return (
        <Reveal>
            <h2 className="text-xl font-bold tracking-tight">{title}</h2>
            <table className="mt-4 w-full overflow-hidden rounded-xl border border-line bg-white text-[14px]">
                <tbody>
                    {rows.map(([k, v]) => (
                        <tr key={k} className="border-b border-line last:border-0 odd:bg-paper/40">
                            <th scope="row" className="w-[45%] px-4 py-3 text-left font-medium text-ink-500">
                                {k}
                            </th>
                            <td className="nums px-4 py-3 text-ink-900">{v}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Reveal>
    );
}
