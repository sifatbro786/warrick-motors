"use client";

import Image from "next/image";
import { loaderFor } from "@/lib/utils/image-loader";

/**
 * Drop-in replacement for next/image. Remote stock photos (Unsplash/Pexels)
 * are resized by their own CDN; everything else goes through Next's optimizer.
 * Client component because a loader function can't cross the server→client boundary.
 */
export default function SmartImage({ alt = "", ...props }) {
    return <Image alt={alt} {...props} loader={loaderFor(props.src)} />;
}
