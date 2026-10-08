"use client";

import { useId, useState } from "react";
import { formatBDT, formatNumberBD } from "@/lib/utils/format";

/**
 * Indicative EMI calculator. Bangladesh Bank caps car loans at 50% of the
 * vehicle price (5-year max tenure), so down payment starts at 50%.
 * Defaults live in props so the admin can tune them per bank later.
 */
export default function LoanEstimator({
    price,
    defaultRate = 10.5,
    minDownPct = 50,
    maxYears = 5,
}) {
    const id = useId();
    const [downPct, setDownPct] = useState(minDownPct);
    const [years, setYears] = useState(maxYears);
    const [rate, setRate] = useState(defaultRate);

    const loan = Math.round(price * (1 - downPct / 100));
    const n = years * 12;
    const r = rate / 12 / 100;
    const emi =
        loan > 0 ? (r === 0 ? loan / n : (loan * r * (1 + r) ** n) / ((1 + r) ** n - 1)) : 0;
    const totalInterest = Math.max(0, emi * n - loan);

    return (
        <div className="rounded-card border border-sand-300 bg-paper-warm p-6 sm:p-7">
            <p className="eyebrow text-gold-700">Bank loan estimate</p>
            <p className="mt-3 text-[13px] text-ink-500">Monthly installment</p>
            <p
                className="nums font-display text-[2.2rem] leading-none font-bold tracking-tight text-ink-900"
                aria-live="polite"
            >
                <span className="mr-1 font-sans text-base font-semibold text-ink-500">BDT</span>
                {formatNumberBD(Math.round(emi))}
                <span className="ml-1 font-sans text-sm font-medium text-ink-500">/ month</span>
            </p>

            <div className="mt-7 space-y-6">
                <Slider
                    id={`${id}-down`}
                    label="Down payment"
                    value={downPct}
                    min={minDownPct}
                    max={90}
                    step={5}
                    onChange={setDownPct}
                    display={`${downPct}% · ${formatBDT(Math.round((price * downPct) / 100))}`}
                />
                <Slider
                    id={`${id}-years`}
                    label="Tenure"
                    value={years}
                    min={1}
                    max={maxYears}
                    step={1}
                    onChange={setYears}
                    display={`${years} year${years > 1 ? "s" : ""}`}
                />
                <Slider
                    id={`${id}-rate`}
                    label="Interest rate"
                    value={rate}
                    min={8}
                    max={14}
                    step={0.25}
                    onChange={setRate}
                    display={`${rate.toFixed(2)}% p.a.`}
                />
            </div>

            <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-sand-300 bg-sand-300 text-[13px]">
                <div className="bg-white px-4 py-3">
                    <dt className="text-ink-500">Loan amount</dt>
                    <dd className="nums mt-0.5 font-semibold text-ink-900">{formatBDT(loan)}</dd>
                </div>
                <div className="bg-white px-4 py-3">
                    <dt className="text-ink-500">Total interest</dt>
                    <dd className="nums mt-0.5 font-semibold text-ink-900">
                        {formatBDT(Math.round(totalInterest))}
                    </dd>
                </div>
            </dl>
            <p className="mt-4 text-[12px] leading-relaxed text-ink-500">
                Indicative only. Final rate, fees and approval are set by the bank. Our finance desk
                prepares the quotation and files the papers for you.
            </p>
        </div>
    );
}

function Slider({ id, label, value, min, max, step, onChange, display }) {
    const pct = ((value - min) / (max - min)) * 100;
    return (
        <div>
            <div className="mb-2 flex items-baseline justify-between gap-3">
                <label htmlFor={id} className="text-[13px] font-semibold text-ink-700">
                    {label}
                </label>
                <span className="nums text-[13px] text-ink-900">{display}</span>
            </div>
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full accent-ink-900"
                style={{
                    background: `linear-gradient(to right, var(--color-ink-900) ${pct}%, var(--color-sand-300) ${pct}%)`,
                }}
            />
        </div>
    );
}
