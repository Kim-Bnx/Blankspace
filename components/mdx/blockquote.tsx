import type { FC, HTMLAttributes } from "react";
import cn from "clsx";

const Blockquote: FC<HTMLAttributes<HTMLQuoteElement>> = (props) => (
    <blockquote
        className={cn(
            "not-first:mt-[1.25em] border-gray-300 italic text-gray-700 dark:border-gray-700 dark:text-gray-400",
            "border-s-2 ps-[1.5em]",
        )}
        {...props}
    />
);
export { Blockquote };
