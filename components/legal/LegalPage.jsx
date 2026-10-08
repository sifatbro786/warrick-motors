import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

/** Shared layout for /terms and /privacy: navy header, sticky contents list, readable article. */
export default function LegalPage({ doc, path }) {
    return (
        <>
            <JsonLd data={breadcrumbJsonLd([{ name: doc.title, path }])} />
            <PageHeader
                crumbs={[{ label: doc.title }]}
                eyebrow={`Last updated · ${doc.updated}`}
                title={doc.title}
                description={doc.intro}
            />

            <section className="bg-paper py-14 md:py-20">
                <div className="container-page grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
                    <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
                        <p className="eyebrow mb-4 text-gold-600">On this page</p>
                        <ol className="space-y-1 border-l border-line">
                            {doc.sections.map((s, i) => (
                                <li key={s.id}>
                                    <a
                                        href={`#${s.id}`}
                                        className="-ml-px flex gap-3 border-l-2 border-transparent py-1.5 pl-4 text-[14px] text-ink-500 transition-colors hover:border-gold-500 hover:text-ink-900"
                                    >
                                        <span className="nums font-mono text-[11px] text-ink-500">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        {s.title}
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <article className="max-w-3xl rounded-card border border-line bg-white p-6 shadow-card sm:p-10">
                        {doc.sections.map((s, i) => (
                            <section
                                key={s.id}
                                id={s.id}
                                className="scroll-mt-28 border-b border-dashed border-line py-8 first:pt-0 last:border-0 last:pb-0"
                            >
                                <h2 className="flex items-baseline gap-3 text-xl font-bold tracking-tight sm:text-2xl">
                                    <span className="nums font-mono text-[13px] font-medium text-gold-600">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    {s.title}
                                </h2>
                                <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-ink-600">
                                    {s.body.map((b, j) =>
                                        typeof b === "string" ? (
                                            <p key={j}>{b}</p>
                                        ) : (
                                            <ul key={j} className="space-y-2.5">
                                                {b.list.map((li) => (
                                                    <li key={li} className="flex gap-3">
                                                        <span
                                                            aria-hidden="true"
                                                            className="mt-2.25 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500"
                                                        />
                                                        {li}
                                                    </li>
                                                ))}
                                            </ul>
                                        ),
                                    )}
                                </div>
                            </section>
                        ))}
                    </article>
                </div>
            </section>
        </>
    );
}
