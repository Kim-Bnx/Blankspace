"use client";

import TinyLogo from "@/app/tiny-logo";
import { cn } from "@/lib/cn";
import { usePathname } from "next/navigation";
import type { PageMapItem } from "nextra";
import { Anchor } from "nextra/components";
import { normalizePages } from "nextra/normalize-pages";
import { useState, type FC } from "react";

type DirectoryItem = ReturnType<
    typeof normalizePages
>["docsDirectories"][number];

const FolderItem: FC<{
    item: DirectoryItem;
    renderItem: (item: DirectoryItem) => React.ReactNode;
}> = ({ item, renderItem }) => {
    const [open, setOpen] = useState(true);

    return (
        <li>
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full py-2 px-4 flex items-center justify-between rounded-xl text-light-800 hover:text-light-100 transition-colors"
            >
                <span>{item.title}</span>
                <svg
                    className={cn(
                        "size-4 transition-transform",
                        open ? "rotate-180" : "",
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            {open && (
                <ul className="flex flex-col ml-4 border-l border-border">
                    {"children" in item &&
                        item.children.map((child) => renderItem(child))}
                </ul>
            )}
        </li>
    );
};

export const Sidebar: FC<{ pageMap: PageMapItem[] }> = ({ pageMap }) => {
    const pathname = usePathname();
    const { docsDirectories } = normalizePages({
        list: pageMap,
        route: pathname,
    });

    type Group = { separator: DirectoryItem | null; items: DirectoryItem[] };

    const groups = docsDirectories.reduce<Group[]>((acc, item) => {
        if (item.type === "separator") {
            acc.push({ separator: item, items: [] });
        } else {
            if (acc.length === 0) acc.push({ separator: null, items: [] });
            acc[acc.length - 1].items.push(item);
        }
        return acc;
    }, []);

    function renderItem(item: DirectoryItem): React.ReactNode {
        const route =
            item.route || ("href" in item ? (item.href as string) : "");
        const { title } = item;

        if ("children" in item) {
            return (
                <FolderItem key={route} item={item} renderItem={renderItem} />
            );
        }

        return (
            <li key={route}>
                <Anchor
                    href={route}
                    className={cn(
                        "py-2 px-4 flex items-center gap-2 rounded-xl hover:text-light-100 transition-colors hover:bg-card",
                        pathname === route
                            ? "font-semibold text-accent-600"
                            : "text-light-800",
                    )}
                >
                    {title}
                </Anchor>
            </li>
        );
    }

    return (
        <div className="min-w-2xs">
            <div className="pl-12 pr-6 flex flex-col gap-4">
                <div className="flex items-center h-15 text-accent">
                    <TinyLogo size={24} />
                </div>
                {groups.map((group, i) => (
                    <ul
                        key={
                            group.separator
                                ? `${group.separator.name}-${i}`
                                : `group-${i}`
                        }
                        className="flex flex-col my-4"
                    >
                        {group.separator && (
                            <li className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-100">
                                {group.separator.title}
                            </li>
                        )}
                        {group.items.map(renderItem)}
                    </ul>
                ))}
            </div>
        </div>
    );
};
