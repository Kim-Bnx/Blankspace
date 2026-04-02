"use client";

import { cn } from "@/lib/cn";
import ArrowIcon from "@/components/arrow-icon";
import { Anchor } from "nextra/components";
import { ReactNode } from "react";

interface LinkCardProps {
    icon?: ReactNode;
    title: string;
    description: string;
    href: string;
    variant?: "border" | "accent";
    className?: string;
}

export function LinkCard({
    icon,
    title,
    description,
    href,
    variant = "border",
    className,
}: LinkCardProps) {
    const isAccent = variant === "accent";

    return (
        <div
            className={cn(
                "rounded-4xl p-6 flex flex-col gap-2 group",
                isAccent ? "bg-accent text-dark-500" : "border",
                className,
            )}
        >
            {icon && <div className="mb-1">{icon}</div>}
            <h3 className="font-medium text-lg mt-0">{title}</h3>
            <p className="text-sm leading-relaxed">{description}</p>
            <div className="mt-auto ml-auto">
                <Anchor
                    href={href}
                    className={cn(
                        "aspect-square w-10 inline-flex items-center justify-center rounded-full transition-opacity opacity-70 group-hover:opacity-100",
                        isAccent ? "bg-accent-600" : "bg-dark-450 border",
                    )}
                >
                    <ArrowIcon />
                </Anchor>
            </div>
        </div>
    );
}
