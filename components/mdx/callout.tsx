import cn from "clsx";
import type { CSSProperties, FC, HTMLAttributes, ReactNode } from "react";
import {
    Lightbulb,
    Info,
    MessageSquareWarning,
    TriangleAlert,
    OctagonAlert,
} from "lucide-react";

const TypeToEmoji = {
    default: <Lightbulb height=".8em" className="mt-[.3em]" />,
    error: <OctagonAlert height=".8em" className="mt-[.3em]" />,
    info: <Info height=".8em" className="mt-[.3em]" />,
    warning: <TriangleAlert height=".8em" className="mt-[.3em]" />,
    important: <MessageSquareWarning height=".8em" className="mt-[.3em]" />,
};

type CalloutType = keyof typeof TypeToEmoji;

const classes: Record<CalloutType, string> = {
    default: cn(
        "bg-green-100 dark:bg-green-900/30",
        "text-green-700 dark:text-green-500",
        "border-green-700 dark:border-green-800",
    ),
    error: cn(
        "bg-red-100 dark:bg-red-900/30",
        "text-red-700 dark:text-red-500",
        "border-red-700 dark:border-red-600",
    ),
    info: cn(
        "bg-blue-100 dark:bg-blue-900/30",
        "text-blue-700 dark:text-blue-400",
        "border-blue-700 dark:border-blue-600",
    ),
    warning: cn(
        "bg-yellow-50 dark:bg-yellow-700/30",
        "text-yellow-700 dark:text-yellow-500",
        "border-yellow-700",
    ),
    important: cn(
        "bg-purple-100 dark:bg-purple-900/30",
        "text-purple-600 dark:text-purple-400",
        "border-purple-600",
    ),
};

type CalloutProps = HTMLAttributes<HTMLDivElement> & {
    /**
     * Defines the style of the callout and determines the default icon if `emoji` is not provided.
     *
     * If set to `null`, no border, background, or text styling will be applied.
     * @default 'default'
     */
    type?: CalloutType | null;
    /**
     * Icon displayed in the callout. Can be a string emoji or a custom React element.
     *
     * Default values based on `type`:
     * - `<GitHubTipIcon />` for `type: 'default'`
     * - `<GitHubCautionIcon />` for `type: 'error'`
     * - `<GitHubNoteIcon />` for `type: 'info'`
     * - `<GitHubWarningIcon />` for `type: 'warning'`
     * - `<GitHubImportantIcon />` for `type: 'important'`
     * @default Determined by `type`
     */
    emoji?: ReactNode;
};

/**
 * A built-in component to show important information to the reader.
 *
 * @example
 * <Callout>
 *   A **callout** is a short piece of text intended to attract attention.
 * </Callout>
 *
 * <Callout type="info">
 *   A **callout** is a short piece of text intended to attract attention.
 * </Callout>
 *
 * <Callout type="warning">
 *   A **callout** is a short piece of text intended to attract attention.
 * </Callout>
 *
 * <Callout type="error">
 *   A **callout** is a short piece of text intended to attract attention.
 * </Callout>
 *
 * <Callout type="important">
 *   A **callout** is a short piece of text intended to attract attention.
 * </Callout>
 *
 * @usage
 * ### Default
 *
 * <Callout>Helpful advice for doing things better or more easily.</Callout>
 *
 * ```mdx
 * import { Callout } from 'nextra/components'
 *
 * <Callout>Helpful advice for doing things better or more easily.</Callout>
 * ```
 *
 * ### Info
 *
 * <Callout type="info">
 *   Useful information that users should know, even when skimming content.
 * </Callout>
 *
 * ```mdx
 * import { Callout } from 'nextra/components'
 *
 * <Callout type="info">
 *   Useful information that users should know, even when skimming content.
 * </Callout>
 * ```
 *
 * ### Warning
 *
 * <Callout type="warning">
 *   Urgent info that needs immediate user attention to avoid problems.
 * </Callout>
 *
 * ```mdx
 * import { Callout } from 'nextra/components'
 *
 * <Callout type="warning">
 *   Urgent info that needs immediate user attention to avoid problems.
 * </Callout>
 * ```
 *
 * ### Error
 *
 * <Callout type="error">
 *   Advises about risks or negative outcomes of certain actions.
 * </Callout>
 *
 * ```mdx
 * import { Callout } from 'nextra/components'
 *
 * <Callout type="error">
 *   Advises about risks or negative outcomes of certain actions.
 * </Callout>
 * ```
 *
 * ### Important
 *
 * <Callout type="important">
 *   Key information users need to know to achieve their goal.
 * </Callout>
 *
 * ```mdx
 * import { Callout } from 'nextra/components'
 *
 * <Callout type="important">
 *   Key information users need to know to achieve their goal.
 * </Callout>
 * ```
 *
 * ### Custom icon
 *
 * <Callout type="info" emoji="⭐">Nextra has 13k stars on GitHub!</Callout>
 *
 * ```mdx
 * import { Callout } from 'nextra/components'
 *
 * <Callout type="info" emoji="⭐">Nextra has 13k stars on GitHub!</Callout>
 * ```
 */
export const Callout: FC<CalloutProps> = ({
    className,
    type = "default",
    emoji = type && TypeToEmoji[type],
    ...props
}) => {
    return (
        <div
            className={cn(
                "nextra-callout overflow-x-auto not-first:mt-[1.25em] flex rounded-lg border py-[.5em] pe-[1em]",
                "contrast-more:border-current!",
                type && classes[type],
            )}
        >
            <div
                className="select-none text-[1.25em] ps-[.6em] pe-[.4em]"
                style={style}
                data-pagefind-ignore="all"
            >
                {emoji}
            </div>
            <div className={cn("w-full min-w-0", className)} {...props} />
        </div>
    );
};

const style: CSSProperties = {
    fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};
