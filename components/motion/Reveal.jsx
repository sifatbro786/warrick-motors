"use client";

import { m } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/**
 * Scroll-reveal wrappers. Server components pass children through, so only the
 * wrapper ships JS — the content stays server-rendered.
 */
export function Reveal({
    children,
    as = "div",
    delay = 0,
    y = 28,
    className,
    once = true,
    amount = 0.2,
}) {
    const Tag = m[as];
    return (
        <Tag
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount }}
            transition={{ duration: 0.9, ease: EASE, delay }}
        >
            {children}
        </Tag>
    );
}

const groupVariants = {
    hidden: {},
    show: (stagger = 0.08) => ({ transition: { staggerChildren: stagger, delayChildren: 0.05 } }),
};

const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

/** Parent that staggers its <StaggerItem> children into view. */
export function Stagger({ children, as = "div", stagger = 0.08, className, amount = 0.15 }) {
    const Tag = m[as];
    return (
        <Tag
            className={className}
            variants={groupVariants}
            custom={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount }}
        >
            {children}
        </Tag>
    );
}

export function StaggerItem({ children, as = "div", className }) {
    const Tag = m[as];
    return (
        <Tag className={className} variants={itemVariants}>
            {children}
        </Tag>
    );
}
