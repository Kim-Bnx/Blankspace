import { cn } from "@/lib/cn";

export function Card({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
}) {
    return (
        <div
            className={cn("rounded-2xl border border-light-200 p-4", className)}
            {...props}
        >
            {children}
        </div>
    );
}
