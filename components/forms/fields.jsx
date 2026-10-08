import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils/format";

/**
 * Shared form primitives. Every form uses the same contract with its Server
 * Action: state = { ok, message, fieldErrors?, reference? }.
 *
 * Two visual variants:
 *   "box"       — bordered inputs (modal, pre-order)
 *   "underline" — editorial hairline inputs (contact page, Kraftwerk reference)
 */

export const INITIAL_FORM_STATE = { ok: false, message: "", fieldErrors: {} };

export function inputClass(error, variant = "box") {
    if (variant === "underline") {
        return cn(
            "h-12 w-full border-0 border-b bg-transparent px-0 text-[15.5px] text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-ink-900",
            error ? "border-crimson-600" : "border-line-strong",
        );
    }
    return cn(
        "h-12 w-full rounded-xl border bg-white px-4 text-[15px] text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-ink-900",
        error ? "border-crimson-600" : "border-line-strong",
    );
}

/** Label + control + error. Pass `group` for radio/chip groups (renders <p> instead of <label>). */
export function Field({ label, name, error, hint, required, group = false, className, children }) {
    const Label = group ? "p" : "label";
    return (
        <div className={className}>
            <Label
                {...(group ? { id: `${name}-label` } : { htmlFor: name })}
                className="mb-1.5 block text-[12.5px] font-semibold text-ink-700"
            >
                {label}
                {required && <span className="text-crimson-600"> *</span>}
            </Label>
            {children}
            {hint && !error && <p className="mt-1.5 text-[12.5px] text-ink-500">{hint}</p>}
            {error && (
                <p id={`${name}-error`} className="mt-1.5 text-[12.5px] text-crimson-700">
                    {error}
                </p>
            )}
        </div>
    );
}

/** aria wiring for a control inside <Field>. */
export const fieldAria = (name, errors) => ({
    id: name,
    name,
    "aria-invalid": errors?.[name] ? true : undefined,
    "aria-describedby": errors?.[name] ? `${name}-error` : undefined,
});

export function Select({ error, variant = "box", children, className, ...props }) {
    return (
        <div className="relative">
            <select
                {...props}
                className={cn(
                    inputClass(error, variant),
                    "cursor-pointer appearance-none pr-10",
                    className,
                )}
            >
                {children}
            </select>
            <Icon
                name="chevron-down"
                size={16}
                className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-ink-400"
            />
        </div>
    );
}

/** Chip-style radio group. */
export function ChoiceChips({ name, options, defaultValue, labelledBy }) {
    return (
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby={labelledBy}>
            {options.map((o) => {
                const value = typeof o === "string" ? o : o.value;
                const label = typeof o === "string" ? o : o.label;
                return (
                    <label key={value} className="cursor-pointer">
                        <input
                            type="radio"
                            name={name}
                            value={value}
                            defaultChecked={value === defaultValue}
                            className="peer sr-only"
                        />
                        <span className="nums inline-flex rounded-full border border-line-strong bg-white px-3.5 py-2 text-[13px] font-medium text-ink-700 transition-colors peer-checked:border-ink-900 peer-checked:bg-ink-900 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-crimson-600">
                            {label}
                        </span>
                    </label>
                );
            })}
        </div>
    );
}

/** Invisible honeypot — bots fill it, people never see it. */
export function Honeypot() {
    return (
        <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
        />
    );
}

export function FormError({ state }) {
    if (!state?.message || state.ok) return null;
    return (
        <p
            role="alert"
            className="flex items-center gap-2 rounded-xl bg-crimson-50 px-4 py-3 text-[13.5px] text-crimson-700"
        >
            <Icon name="shield-check" size={16} /> {state.message}
        </p>
    );
}

export function FormSuccess({ title = "Thank you", state, children }) {
    return (
        <div role="status" className="py-2">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ready-bg text-ready">
                <Icon name="check" size={28} strokeWidth={2} />
            </span>
            <p className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink-900">
                {title}
            </p>
            <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-ink-600">
                {state.message}
            </p>
            {state.reference && (
                <p className="mt-3 text-[13px] text-ink-500">
                    Reference{" "}
                    <span className="nums font-mono font-semibold text-ink-900">
                        {state.reference}
                    </span>
                </p>
            )}
            {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
        </div>
    );
}

/** Today's date in Dhaka, computed on demand (never during prerender). */
export const todayInDhaka = () =>
    new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });
