import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { cn } from "@/lib/utils/format";

/** Crown mark + typographic wordmark. `tone` flips text colour for dark bands. */
export default function Logo({ tone = "dark", className, priority = false }) {
    const light = tone === "light";
    return (
        <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)}>
            <Image
                src={logo}
                alt=""
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
                preload={priority}
            />
            <span className="flex flex-col leading-none">
                <span
                    className={cn(
                        "font-display text-[17px] font-extrabold tracking-[0.14em] uppercase",
                        light ? "text-white" : "text-ink-900",
                    )}
                >
                    Warrick
                </span>
                <span
                    className={cn(
                        "mt-1 text-[9.5px] font-semibold tracking-[0.42em] uppercase",
                        light ? "text-gold-300" : "text-gold-600",
                    )}
                >
                    Motors
                </span>
                <span className="sr-only"> — home</span>
            </span>
        </Link>
    );
}
