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
    default: <Lightbulb height=".8em" className="mt-[.15rem]" />,
    error: <OctagonAlert height=".8em" className="mt-[.15rem]" />,
    info: <Info height=".8em" className="mt-[.15rem]" />,
    warning: <TriangleAlert height=".8em" className="mt-[.15rem]" />,
    important: <MessageSquareWarning height=".8em" className="mt-[.15rem]" />,
};

type CalloutType = keyof typeof TypeToEmoji;

/** Couleur de fond + bordure du conteneur */
const bgClasses: Record<CalloutType, string> = {
    default: cn(
        "bg-green-100 dark:bg-green-900/30",
        "border-green-700 dark:border-green-800",
    ),
    error: cn(
        "bg-red-100 dark:bg-red-900/30",
        "border-red-700 dark:border-red-600",
    ),
    info: "bg-[#344EA2]/15",
    warning: cn("bg-yellow-50 dark:bg-yellow-700/30", "border-yellow-700"),
    important: cn("bg-purple-100 dark:bg-purple-900/30", "border-purple-600"),
};

/** Couleur d'accent : icône + titre */
const accentClasses: Record<CalloutType, string> = {
    default: "text-green-700 dark:text-green-500",
    error: "text-red-700 dark:text-red-500",
    info: "text-[#69A0FF]",
    warning: "text-yellow-700 dark:text-yellow-500",
    important: "text-purple-600 dark:text-purple-400",
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
     * - `<Lightbulb />` for `type: 'default'`
     * - `<OctagonAlert />` for `type: 'error'`
     * - `<Info />` for `type: 'info'`
     * - `<TriangleAlert />` for `type: 'warning'`
     * - `<MessageSquareWarning />` for `type: 'important'`
     * @default Determined by `type`
     */
    emoji?: ReactNode;
    /**
     * Optional title displayed above the callout body, coloré selon le `type`.
     */
    title?: ReactNode;
};

export const Callout: FC<CalloutProps> = ({
    className,
    type = "default",
    emoji = type && TypeToEmoji[type],
    title,
    children,
    ...props
}) => {
    const accent = type ? accentClasses[type] : undefined;

    return (
        <div
            className={cn(
                "nextra-callout overflow-x-auto not-first:mt-[1.25em] flex rounded-2xl py-[.5em] pe-[1em]",
                "contrast-more:border-current!",
                type && bgClasses[type],
            )}
        >
            {/* Icône — couleur d'accent */}
            <div
                className={cn(
                    "select-none text-[1.25em] ps-[.6em] pe-[.4em]",
                    accent,
                )}
                style={style}
                data-pagefind-ignore="all"
            >
                {emoji}
            </div>

            <div
                className={cn("w-full min-w-0 text-light-800", className)}
                {...props}
            >
                {/* Titre — couleur d'accent, corps toujours neutre */}
                {title && (
                    <p className={cn("font-semibold mb-[.25em]", accent)}>
                        {title}
                    </p>
                )}
                {children}
            </div>
        </div>
    );
};

const style: CSSProperties = {
    fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};
