// components/mdx/TypeTable.jsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { ChevronDown } from "lucide-react";
import {
    useEffect,
    useRef,
    useState,
    type ComponentProps,
    type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ParameterNode {
    name: string;
    description: ReactNode;
}

export interface TypeNode {
    description?: ReactNode;
    type: ReactNode;
    typeDescription?: ReactNode;
    typeDescriptionLink?: string;
    default?: ReactNode;
    required?: boolean;
    deprecated?: boolean;
    parameters?: ParameterNode[];
    returns?: ReactNode;
}

// ─── Collapsible natif (Web Animations API) ───────────────────────────────────

function Collapsible({ open, children, className, id }) {
    const contentRef = useRef(null);
    const animRef = useRef(null);
    const isFirst = useRef(true);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        if (isFirst.current) {
            isFirst.current = false;
            // État initial sans animation
            el.style.height = open ? "auto" : "0px";
            el.style.overflow = "hidden";
            return;
        }

        animRef.current?.cancel();

        if (open) {
            el.style.height = "auto";
            const targetH = el.offsetHeight;
            el.style.height = "0px";

            animRef.current = el.animate(
                [{ height: "0px" }, { height: `${targetH}px` }],
                { duration: 200, easing: "ease", fill: "both" },
            );
            animRef.current.onfinish = () => {
                el.style.height = "auto";
            };
        } else {
            const fromH = el.offsetHeight;
            animRef.current = el.animate(
                [{ height: `${fromH}px` }, { height: "0px" }],
                { duration: 200, easing: "ease", fill: "both" },
            );
        }
    }, [open]);

    return (
        <div id={id} className={className}>
            {children[0]}
            <div ref={contentRef} style={{ overflow: "hidden" }}>
                {children[1]}
            </div>
        </div>
    );
}

// ─── Item ─────────────────────────────────────────────────────────────────────

function Item({ parentId, name, item }) {
    const {
        parameters = [],
        description,
        required = false,
        deprecated,
        typeDescription,
        default: defaultValue,
        type,
        typeDescriptionLink,
        returns,
    } = item;

    const [open, setOpen] = useState(false);
    const id = parentId ? `${parentId}-${name}` : undefined;

    useEffect(() => {
        if (!id) return;
        if (`#${id}` === window.location.hash) setOpen(true);
    }, [id]);

    const toggle = () => {
        const next = !open;
        if (next && id) window.history.replaceState(null, "", `#${id}`);
        setOpen(next);
    };

    return (
        <Collapsible
            id={id}
            open={open}
            className={cn(
                "rounded-xl border scroll-m-20 transition-colors",
                open
                    ? "shadow-sm bg-white dark:bg-zinc-900 border-light-200 dark:border-zinc-700 not-last:mb-2"
                    : "border-transparent",
            )}
        >
            {/* Trigger */}
            <button
                type="button"
                onClick={toggle}
                data-open={open || undefined}
                className="relative flex w-full items-center gap-3 px-3 py-2 text-start group hover:bg-accent rounded-xl transition-colors"
            >
                <code
                    className={cn(
                        "min-w-fit w-1/4 font-mono font-medium text-sm pe-2",
                        deprecated
                            ? "line-through text-zinc-400"
                            : "text-blue-600 dark:text-blue-400",
                    )}
                >
                    {name}
                    {!required && "?"}
                </code>
                <span className="text-sm text-light-600 dark:text-zinc-400 hidden xl:inline">
                    {typeDescriptionLink ? (
                        <Link
                            href={typeDescriptionLink}
                            className="underline underline-offset-2"
                        >
                            {type}
                        </Link>
                    ) : (
                        type
                    )}
                </span>
                <ChevronDown
                    className={cn(
                        "absolute end-2 size-4 text-light-500 transition-transform duration-200",
                        open && "rotate-180",
                    )}
                />
            </button>

            {/* Content */}
            <div className="grid grid-cols-[1fr_3fr] gap-x-3 gap-y-4 text-sm p-3 border-t border-light-200 dark:border-zinc-700 overflow-auto">
                {description && (
                    <div className="col-span-2 prose prose-sm dark:prose-invert max-w-none">
                        {description}
                    </div>
                )}
                {typeDescription && (
                    <>
                        <p className="text-light-500 dark:text-zinc-400 pe-2 my-auto">
                            Type
                        </p>
                        <p className="my-auto font-mono text-xs">
                            {typeDescription}
                        </p>
                    </>
                )}
                {defaultValue && (
                    <>
                        <p className="text-light-500 dark:text-zinc-400 pe-2 my-auto">
                            Défaut
                        </p>
                        <p className="my-auto font-mono text-xs">
                            {defaultValue}
                        </p>
                    </>
                )}
                {parameters.length > 0 && (
                    <>
                        <p className="text-light-500 dark:text-zinc-400 pe-2">
                            Paramètres
                        </p>
                        <div className="flex flex-col gap-2">
                            {parameters.map((param) => (
                                <div
                                    key={param.name}
                                    className="inline-flex flex-wrap items-center gap-1"
                                >
                                    <span className="font-medium font-mono text-xs">
                                        {param.name} –
                                    </span>
                                    <span className="prose prose-sm dark:prose-invert max-w-none">
                                        {param.description}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {returns && (
                    <>
                        <p className="text-light-500 dark:text-zinc-400 pe-2 my-auto">
                            Retourne
                        </p>
                        <div className="my-auto prose prose-sm dark:prose-invert max-w-none">
                            {returns}
                        </div>
                    </>
                )}
            </div>
        </Collapsible>
    );
}

// ─── TypeTable ────────────────────────────────────────────────────────────────

export function TypeTable({ id, type, className, ...props }) {
    return (
        <div
            id={id}
            className={cn(
                "flex flex-col p-1 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-light-200 dark:border-zinc-800 my-6 text-sm overflow-hidden",
                className,
            )}
            {...props}
        >
            <div className="flex font-medium items-center px-3 gap-3  py-1 text-light-500 dark:text-zinc-400 text-xs uppercase tracking-wide border-b">
                <p className="w-1/4">Prop</p>
                <p className="hidden xl:block">Type</p>
            </div>
            {Object.entries(type).map(([key, value]) => (
                <Item key={key} parentId={id} name={key} item={value} />
            ))}
        </div>
    );
}
