import { cn } from "@/lib/cn";

const COLS_MAP = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
};

export function Columns({ children, cols = 2, className, ...props }) {
    return (
        <div
            className={cn(
                "not-first:mt-[1.25em] grid gap-4",
                COLS_MAP[cols] ?? "grid-cols-2",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
