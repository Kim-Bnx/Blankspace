"use client";

import { type ReactNode } from "react";
import { useScrollContainer } from "@/lib/scroll-context";
import { NavbarBlob } from "./navbar-blob";
import { PageMapItem } from "nextra";

export function MainContent({
    children,
    pageMap,
}: {
    children: ReactNode;
    pageMap: PageMapItem[];
}) {
    // On enregistre ce nœud comme conteneur de scroll dans le contexte
    const scrollRef = useScrollContainer();

    return (
        <main
            ref={scrollRef}
            className="flex flex-col flex-1 bg-card rounded-tl-3xl overflow-auto min-h-0 relative"
            style={{
                scrollbarGutter: "stable",
            }}
        >
            <NavbarBlob position="top" />
            <div className="flex-1">
                <div className="pointer-events-none sticky top-0 w-full h-10 bg-gradient-to-b from-card to-transparent z-10" />
                {children}
            </div>
        </main>
    );
}
