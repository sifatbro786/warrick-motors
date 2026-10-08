import MapEmbed from "@/components/showroom/MapEmbed";
import Icon from "@/components/ui/Icon";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { siteConfig, telHref } from "@/lib/config/site";

/** Both showrooms side by side: map facade, address, phone, hours. Used on /showroom and /contact. */
export default function LocationCards({
    showrooms = siteConfig.showrooms,
    hours = siteConfig.hours,
}) {
    return (
        <Stagger className="grid gap-6 lg:grid-cols-2" stagger={0.1}>
            {showrooms.map((s) => (
                <StaggerItem
                    key={s.id}
                    as="article"
                    className="overflow-hidden rounded-card border border-line bg-white shadow-card"
                >
                    <MapEmbed
                        src={s.mapEmbed}
                        title={`${s.city} — ${s.label}`}
                        address={s.address}
                        mapUrl={s.mapUrl}
                        className="aspect-video rounded-none!"
                    />
                    <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-7">
                        <div>
                            <p className="eyebrow text-gold-600">{s.label}</p>
                            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                                {s.city}
                            </h3>
                            <p className="mt-2 flex gap-2 text-[14px] text-ink-600">
                                <Icon
                                    name="map-pin"
                                    size={17}
                                    className="mt-0.5 shrink-0 text-ink-400"
                                />
                                {s.address}
                            </p>
                            <a
                                href={telHref(s.phone)}
                                className="nums mt-2 flex items-center gap-2 text-[14px] font-medium text-ink-900 hover:text-crimson-700"
                            >
                                <Icon name="phone" size={17} className="text-ink-400" />
                                {s.phone.replace("+880", "0").replace(/(\d{5})(\d{6})/, "$1-$2")}
                            </a>
                        </div>
                        <ul className="space-y-2 border-t border-dashed border-line pt-4 text-[13.5px] sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
                            {hours.map((h) => (
                                <li key={h.days}>
                                    <span className="block text-ink-500">{h.days}</span>
                                    <span className="nums font-semibold text-ink-900">
                                        {h.time}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </StaggerItem>
            ))}
        </Stagger>
    );
}
