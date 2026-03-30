"use client";

import { useEffect, useRef } from "react";
import { useScrollContainer } from "@/lib/scroll-context";
import { cn } from "@/lib/cn";

export function NavbarBlob({
    position,
    mode,
}: {
    position: "top" | "bottom";
    mode?: "home";
}) {
    const scrollContainer = useScrollContainer();
    const blobRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const blob = blobRef.current;
        if (!blob) return;
        if (position === "top" && mode !== "home") return;

        // Si aucun ScrollContextProvider n'est présent (homepage = Server Component),
        // scrollContainer.current est null → on écoute window à la place.
        const container = scrollContainer.current;

        const onScroll = () => {
            const scrollTop = container ? container.scrollTop : window.scrollY;

            if (position === "bottom") {
                // Blob sous la navbar : monte au rythme du scroll
                blob.style.transform = `translateY(calc(50% - ${scrollTop}px))`;
            } else {
                // Blob hero (top + home) : parallaxe, monte plus lentement
                blob.style.transform = `translateY(calc(-50% - ${scrollTop * 0.4}px))`;
            }
        };

        if (container) {
            container.addEventListener("scroll", onScroll, { passive: true });
        } else {
            window.addEventListener("scroll", onScroll, { passive: true });
        }

        onScroll(); // sync initial

        return () => {
            if (container) {
                container.removeEventListener("scroll", onScroll);
            } else {
                window.removeEventListener("scroll", onScroll);
            }
        };
    }, [scrollContainer, position, mode]);

    return (
        <div
            ref={blobRef}
            className={cn(
                `absolute pointer-events-none ${position}-0 right-0 bg-accent/10 rounded-full w-5xl aspect-video blur-[200px] z-20`,
            )}
            style={{
                transform: `translateY(${position === "top" ? "-50%" : "50%"})`,
            }}
        />
    );
}
