"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { buildWhatsAppLink } from "@/lib/utils/contact";

/**
 * Route-level error boundary. Shows a calm fallback with a retry, and keeps
 * the WhatsApp path open so a lead is never lost to a bug.
 * Backend phase: send `error` + `error.digest` to your logger here.
 */
export default function RouteError({ error, reset }) {
    useEffect(() => {
        console.error("[route-error]", error?.digest || "", error);
    }, [error]);

    return (
        <section className="bg-paper py-24 md:py-32">
            <div className="container-page flex max-w-2xl flex-col items-start">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-crimson-50 text-crimson-700">
                    <Icon name="wrench" size={26} />
                </span>
                <p className="eyebrow mt-8 text-gold-600">Something went wrong</p>
                <h1 className="mt-3 text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                    This page hit a bump in the road.
                </h1>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink-500">
                    Please try again. If it keeps happening, message us on WhatsApp and our team
                    will help straight away.
                </p>
                {error?.digest && (
                    <p className="nums mt-3 font-mono text-[12px] text-ink-500">
                        Ref: {error.digest}
                    </p>
                )}
                <div className="mt-8 flex flex-wrap gap-3">
                    <Button onClick={() => reset()} icon="arrow-left">
                        Try again
                    </Button>
                    <Button
                        href={buildWhatsAppLink({
                            message: "Hello Warrick Motors, the website showed an error. ",
                        })}
                        variant="whatsapp"
                        icon="whatsapp"
                    >
                        WhatsApp us
                    </Button>
                </div>
            </div>
        </section>
    );
}
