"use client";

import { MotionConfig } from "framer-motion";

/** Global motion defaults. `reducedMotion="user"` honours the OS setting site-wide. */
export default function MotionProvider({ children }) {
    return (
        <MotionConfig reducedMotion="user" transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </MotionConfig>
    );
}
