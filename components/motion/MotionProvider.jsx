"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * Global motion setup.
 * - LazyMotion + `m.*` components: ~5KB up front, the feature bundle loads async.
 *   `strict` throws if anyone imports the full `motion` component by mistake.
 * - reducedMotion="user" honours the OS "reduce motion" setting site-wide.
 */
export default function MotionProvider({ children }) {
    return (
        <LazyMotion features={loadFeatures} strict>
            <MotionConfig
                reducedMotion="user"
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </MotionConfig>
        </LazyMotion>
    );
}
