"use client";

import { useEffect, useRef } from "react";
import { useScrollContainer } from "@/lib/scroll-context";

export function NavbarBlob({
    position,
    mode,
}: {
    position: "top" | "bottom";
    mode?: "home";
}) {
    const scrollContainer = useScrollContainer();
    const blobRef = useRef<HTMLDivElement>(null);

    if (position === "bottom") {
        useEffect(() => {
            const main = scrollContainer.current;
            const blob = blobRef.current;
            if (!main || !blob) return;

            const onScroll = () => {
                // Part à translateY(50%) — à moitié visible sous la navbar.
                // Monte au rythme du scroll jusqu'à disparaître.
                blob.style.transform = `translateY(calc(50% - ${main.scrollTop}px))`;
            };

            main.addEventListener("scroll", onScroll, { passive: true });
            // Sync initial au cas où la page se recharge avec du scroll
            onScroll();

            return () => main.removeEventListener("scroll", onScroll);
        }, [scrollContainer]);
    }

    return (
        <div
            ref={blobRef}
            className={`absolute pointer-events-none ${position}-0 right-0 bg-accent/10 rounded-full w-5xl aspect-video blur-[200px] z-20`}
            style={{
                transform: `translateY(${position === "top" ? "-50%" : "50%"})`,
            }}
        />
    );
}
