"use client";

import { useRef } from "react";
import type { FC } from "react";

export const HeadingAnchor: FC<{ id: string }> = ({ id }) => {
    const anchorRef = useRef<HTMLAnchorElement>(null!);

    return (
        <a
            href={`#${id}`}
            className="focus-visible:nextra-focus subheading-anchor"
            aria-label="Permalink for this section"
            ref={anchorRef}
        />
    );
};
