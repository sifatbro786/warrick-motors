/**
 * Renders one or more schema.org objects. `<` is escaped so user/admin-entered
 * strings can never break out of the script tag (Next.js JSON-LD guidance).
 */
export default function JsonLd({ data }) {
    const list = (Array.isArray(data) ? data : [data]).filter(Boolean);
    return list.map((obj, i) => (
        <script
            key={obj["@id"] || `${obj["@type"]}-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(obj).replace(/</g, "\\u003c") }}
        />
    ));
}
