import Icon from "@/components/ui/Icon";
import { formatCC, formatNumberBD, cn } from "@/lib/utils/format";

/** Year · Mileage · CC · Fuel — the four numbers every BD buyer scans first. */
export default function SpecChips({ car, className, variant = "chips" }) {
    const items = [
        { icon: "calendar", label: "Model year", value: `${car.year}` },
        {
            icon: "gauge",
            label: "Mileage",
            value: car.mileage ? `${formatNumberBD(car.mileage)} km` : "0 km",
        },
        { icon: car.engineCc ? "engine" : "bolt", label: "Engine", value: formatCC(car.engineCc) },
        { icon: car.fuelType === "Electric" ? "bolt" : "fuel", label: "Fuel", value: car.fuelType },
    ];

    if (variant === "grid") {
        return (
            <dl
                className={cn(
                    "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line",
                    className,
                )}
            >
                {items.map((it) => (
                    <div key={it.label} className="bg-white px-4 py-3.5">
                        <dt className="flex items-center gap-1.5 text-[11.5px] font-medium tracking-wide text-ink-500 uppercase">
                            <Icon name={it.icon} size={14} />
                            {it.label}
                        </dt>
                        <dd className="nums mt-1 font-display text-[15px] font-semibold text-ink-900">
                            {it.value}
                        </dd>
                    </div>
                ))}
            </dl>
        );
    }

    return (
        <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Key specifications">
            {items.map((it) => (
                <li
                    key={it.label}
                    title={it.label}
                    className="nums inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-1 text-[12px] font-medium text-ink-600"
                >
                    <Icon name={it.icon} size={13} className="text-ink-400" />
                    <span className="sr-only">{it.label}: </span>
                    {it.value}
                </li>
            ))}
        </ul>
    );
}
