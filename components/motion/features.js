// Loaded lazily after hydration by <LazyMotion> — keeps animation code out of the first-load bundle.
// domMax = animations + gestures + drag + layout (needed for layoutId pills and gallery swipe).
export { domMax as default } from "framer-motion";
