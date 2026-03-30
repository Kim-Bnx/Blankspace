"use client";

import type { FC, HTMLAttributes, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/use-copy";
import { Copy, Check } from "lucide-react";

export const CopyToClipboard: FC<HTMLAttributes<HTMLButtonElement>> = (
    props,
) => {
    const { copy, isCopied } = useCopy();

    const handleClick = async (event: MouseEvent) => {
        const container = event.currentTarget.parentNode!.parentNode!;
        const content = container.querySelector("pre code")?.textContent || "";
        copy(content);
    };

    const IconToUse = isCopied ? Check : Copy;

    return (
        <Button
            onClick={handleClick}
            title="Copy code"
            variant="outline"
            {...props}
        >
            <IconToUse height="1em" className="nextra-copy-icon" />
        </Button>
    );
};
