"use client";
import { cn } from "../../../lib/cn";
import { type ComponentProps, useMemo } from "react";
import { useSidebar } from "fumadocs-ui/contexts/sidebar";
import { useNav } from "fumadocs-ui/contexts/layout";
import { buttonVariants } from "../../ui/button";
import { Sidebar as SidebarIcon } from "lucide-react";
import Link from "fumadocs-core/link";
import { usePathname } from "fumadocs-core/framework";
import { isTabActive } from "../../../lib/is-active";
import type { Option } from "../../root-toggle";
import { is } from "zod/v4/locales";

export function Navbar({
    mode,
    ...props
}: ComponentProps<"header"> & { mode: "top" | "auto" }) {
    const { open, collapsed } = useSidebar();
    const { isTransparent } = useNav();

    return (
        <header
            id="nd-subnav"
            {...props}
            className={cn(
                "lg:col-start-1 lg:row-start-1 lg:col-span-2 sticky top-0 px-12 py-6 flex items-center justify-between border-b z-40",
                !isTransparent && "bg-body",
                props.className
            )}
        >
            {props.children}
        </header>
    );
}

export function LayoutBody(props: ComponentProps<"main">) {
    const { collapsed } = useSidebar();

    return (
        <main
            id="nd-docs-layout"
            {...props}
            className={cn(
                "my-12 grid md:grid-cols-[280px_1fr] min-h-screen container p-0 mx-auto relative grid-rows-[auto_1fr]",
                /* !collapsed && "mx-(--fd-layout-offset)", */
                props.className
            )}
            style={{
                ...props.style,
            }}
        >
            <div className="bg-body absolute top-0 left-0 w-full h-[620px] rounded-3xl mask-b-from-10% -z-10"></div>
            {props.children}
        </main>
    );
}

export function NavbarSidebarTrigger({
    className,
    ...props
}: ComponentProps<"button">) {
    const { setOpen } = useSidebar();

    return (
        <button
            {...props}
            className={cn(
                buttonVariants({
                    color: "ghost",
                    size: "icon-sm",
                    className,
                })
            )}
            onClick={() => setOpen((prev) => !prev)}
        >
            <SidebarIcon />
        </button>
    );
}

export function LayoutTabs({
    options,
    ...props
}: ComponentProps<"div"> & {
    options: Option[];
}) {
    const pathname = usePathname();
    const selected = useMemo(() => {
        return options.findLast((option) => isTabActive(option, pathname));
    }, [options, pathname]);

    return (
        <div {...props} className={cn("flex gap-8", props.className)}>
            {options.map((option) => (
                <LayoutTab
                    key={option.url}
                    selected={selected === option}
                    option={option}
                />
            ))}
        </div>
    );
}

function LayoutTab({
    option: { title, url, unlisted, props },
    selected = false,
}: {
    option: Option;
    selected?: boolean;
}) {
    return (
        <Link
            href={url}
            {...props}
            className={cn(
                "uppercase px-2 py-1 rounded-sm font-bold hover:bg-nav-foreground",
                unlisted && !selected && "hidden",
                selected && "bg-accent text-fd-primary",
                props?.className
            )}
        >
            {title}
        </Link>
    );
}
