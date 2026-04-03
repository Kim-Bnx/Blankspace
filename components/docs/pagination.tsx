// components/pagination.tsx
"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNormalizedPages } from "@/hooks/page-map-context";
import { cn } from "@/lib/cn";

export const Pagination = () => {
    const { flatDocsDirectories, activeIndex } = useNormalizedPages();

    let prev = flatDocsDirectories[activeIndex - 1] ?? null;
    let next = flatDocsDirectories[activeIndex + 1] ?? null;

    if (prev?.isUnderCurrentDocsTree === false) prev = null;
    if (next?.isUnderCurrentDocsTree === false) next = null;

    if (!prev && !next) return null;

    return (
        <nav className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-light-200 p-2 print:hidden">
            {prev ? (
                <PaginationLink
                    href={prev.route}
                    direction="prev"
                    title={prev.title}
                />
            ) : (
                <div />
            )}
            {next ? (
                <PaginationLink
                    href={next.route}
                    direction="next"
                    title={next.title}
                />
            ) : (
                <div />
            )}
        </nav>
    );
};

const PaginationLink = ({ href, direction, title }) => {
    const isPrev = direction === "prev";
    return (
        <Link
            href={href}
            prefetch={false}
            className={cn(
                "group flex items-center gap-2.5 py-2.5 px-5 h-16",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 hover:bg-background/30 rounded-lg",
                isPrev ? "flex-row col-start-1 col-end-2" : "flex-row-reverse",
            )}
        >
            {/* Chevron */}
            {isPrev ? (
                <ChevronLeft
                    size={16}
                    className="shrink-0 text-light-800 transition-transform group-hover:-translate-x-0.5"
                />
            ) : (
                <ChevronRight
                    size={16}
                    className="shrink-0 text-light-800 transition-transform group-hover:translate-x-0.5"
                />
            )}

            {/* Title */}
            <span className="text-sm font-semibold text-light-900 transition-colors [word-break:break-word] group-hover:text-accent-alt inline-flex gap-2 items-center [&_svg]:size-4 text-light-100">
                {title}
            </span>
        </Link>
    );
};
