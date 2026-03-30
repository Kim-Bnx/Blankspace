import cn from "clsx";
import type { FC, HTMLAttributes, ReactNode } from "react";
import { TextWrap } from "lucide-react";
import { CopyToClipboard } from "./copy-to-clipboard";
import { ToggleWordWrapButton } from "./toggle-word-wrap-button";

export const classes = {
    border: cn("border"),
};

export type PreProps = HTMLAttributes<HTMLPreElement> & {
    "data-filename"?: string;
    "data-copy"?: "";
    "data-language"?: string;
    "data-word-wrap"?: "";
    "data-pagefind-ignore"?: string;
    icon?: ReactNode;
};

export const Pre: FC<PreProps> = ({
    children,
    className,
    "data-filename": filename,
    "data-copy": copy,
    "data-language": _language,
    "data-word-wrap": hasWordWrap,
    "data-pagefind-ignore": pagefindIgnore,
    icon,
    ...props
}) => {
    const copyButton = copy === "" && (
        <CopyToClipboard className={filename ? "ms-auto text-sm" : ""} />
    );

    // split file name and extension for better styling

    const lastDotIndex = filename?.lastIndexOf(".");
    const name = filename?.substring(0, lastDotIndex);
    const extension = filename?.substring(lastDotIndex + 1);

    return (
        <div
            data-pagefind-ignore={pagefindIgnore}
            className="relative not-first:mt-[1.25em]"
        >
            {filename && (
                <div
                    className={cn(
                        "sticky z-10 top-0 px-2 text-sm text-gray-700 dark:text-gray-200 bg-gradient-to-b from-card to-transparent",
                        "flex items-center h-12 gap-2 rounded-t-2xl",
                        classes.border,
                        "border-b-0",
                    )}
                >
                    {icon}
                    <span className="truncate flex items-center gap-2">
                        <span className="bg-dark-200/50 text-accent-alt py-1 px-2 rounded-lg">
                            {name}
                        </span>
                        <span className="bg-dark-200/50 text-light-800 rounded-lg py-1 px-3">
                            {extension}
                        </span>
                    </span>
                    {copyButton}
                </div>
            )}
            <pre
                className={cn(
                    "group",
                    "focus-visible:nextra-focus",
                    "overflow-x-auto subpixel-antialiased text-[.9em]",
                    "border",
                    filename && "pt-0 border-t-0",
                    "py-4",
                    filename ? "rounded-b-2xl" : "rounded-2xl",
                    "not-prose", // for nextra-theme-blog
                    className,
                )}
                {...props}
            >
                <div
                    className={cn(
                        "group-hover:opacity-100",
                        "group-focus:opacity-100",
                        "opacity-0 transition focus-within:opacity-100",
                        "flex gap-1 absolute right-4",
                        filename ? "top-14" : "top-2",
                    )}
                >
                    {hasWordWrap === "" && (
                        <ToggleWordWrapButton>
                            <TextWrap height="1em" />
                        </ToggleWordWrapButton>
                    )}
                    {!filename && copyButton}
                </div>
                {children}
            </pre>
        </div>
    );
};
