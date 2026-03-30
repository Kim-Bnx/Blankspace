"use client";

import { Button as HeadlessButton } from "@headlessui/react";
import type { ButtonProps as HeadlessButtonProps } from "@headlessui/react";
import cn from "clsx";
import type { FC } from "react";
import { classes } from "@/components/mdx/pre";

export type ButtonProps = HeadlessButtonProps & {
    variant?: "outline" | "default";
};

export const Button: FC<ButtonProps> = ({
    children,
    className,
    variant = "default",
    ...props
}) => {
    return (
        <HeadlessButton
            className={(args) =>
                cn(
                    "transition cursor-pointer",
                    args.focus && "nextra-focus",
                    variant === "outline" && [
                        classes.border,
                        "rounded-md p-1.5 px-0.5",
                    ],
                    typeof className === "function"
                        ? className(args)
                        : className,
                )
            }
            {...props}
        >
            {children}
        </HeadlessButton>
    );
};
