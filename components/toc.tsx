"use client";

import type { Heading } from "nextra";
import { TextQuote } from "lucide-react";
import { type FC, useEffect, useRef, useState } from "react";

export const TOC: FC<{ toc: Heading[] }> = ({ toc }) => {
    const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
    const listRef = useRef<HTMLUListElement>(null);
    const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
    const [indicator, setIndicator] = useState({ top: 0, height: 0 });

    useEffect(() => {
        if (toc.length === 0) return;

        // Track all intersection states independently
        const visibilityMap = new Map<string, boolean>();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    visibilityMap.set(entry.target.id, entry.isIntersecting);
                }

                const next = new Set<string>(
                    [...visibilityMap.entries()]
                        .filter(([, visible]) => visible)
                        .map(([id]) => id),
                );

                setActiveIds(next);
            },
            { threshold: 0 },
        );

        const elements = toc
            .map(({ id }) => document.querySelector(`[id="${CSS.escape(id)}"]`))
            .filter(Boolean) as Element[];

        // Initialize map so removals work from the start
        for (const el of elements) {
            visibilityMap.set(el.id, false);
            observer.observe(el);
        }

        return () => observer.disconnect();
    }, [toc]);

    // Recompute indicator position whenever activeIds changes
    useEffect(() => {
        if (activeIds.size === 0 || !listRef.current) return;

        const listTop = listRef.current.getBoundingClientRect().top;
        let minTop = Infinity;
        let maxBottom = -Infinity;

        for (const id of activeIds) {
            const li = itemRefs.current.get(id);
            if (!li) continue;
            const { top, bottom } = li.getBoundingClientRect();
            if (top < minTop) minTop = top;
            if (bottom > maxBottom) maxBottom = bottom;
        }

        if (minTop === Infinity) return;

        setIndicator({
            top: minTop - listTop,
            height: maxBottom - minTop,
        });
    }, [activeIds]);

    const getIndent = (depth: number) => {
        const indentMap: Record<number, string> = {
            2: "pl-0",
            3: "pl-4",
            4: "pl-8",
            5: "pl-12",
            6: "pl-16",
        };
        return indentMap[depth] ?? "pl-0";
    };

    return (
        <div className="self-start sticky top-8 max-w-2xs w-full shrink-0">
            <h3 className="flex items-center gap-2 text-dark-100 font-semibold text-sm uppercase mb-3">
                <TextQuote size={16} /> Sur cette page
            </h3>

            <div className="relative">
                {/* Static background line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

                {/* Active indicator line */}
                <div
                    className="absolute left-0 w-px bg-accent transition-all duration-300"
                    style={{
                        top: indicator.top,
                        height: indicator.height,
                        opacity: activeIds.size > 0 ? 1 : 0,
                    }}
                />

                <ul ref={listRef}>
                    {toc.map((heading) => {
                        const isActive = activeIds.has(heading.id);
                        return (
                            <li
                                key={heading.id}
                                ref={(el) => {
                                    if (el)
                                        itemRefs.current.set(heading.id, el);
                                    else itemRefs.current.delete(heading.id);
                                }}
                                className={getIndent(heading.depth)}
                            >
                                <a
                                    href={`#${heading.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .querySelector(
                                                `[id="${CSS.escape(heading.id)}"]`,
                                            )
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }}
                                    className={[
                                        "block py-1 px-3 text-sm transition-colors duration-150 truncate",
                                        isActive
                                            ? "text-accent font-medium"
                                            : "text-white/50 hover:text-white/80",
                                    ].join(" ")}
                                >
                                    {heading.value}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
