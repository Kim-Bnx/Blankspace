import { Icon } from "../Icon";
import { cn } from "@/lib/cn";

export default function Callout({
    className,
    children,
    title,
    type = "note",
    icon,
    ...props
}) {
    switch (type) {
        case "info":
            title = title || "Informations";
            icon = icon || "info";
            break;
        case "warning":
            title = title || "Attention";
            icon = icon || "warning";
            break;
        case "alert":
            title = title || "Alerte";
            icon = icon || "circle-alert";
            break;
        case "tip":
            title = title || "Recommandation";
            icon = icon || "square-check";
            break;
        default:
            title = title || "Note";
            icon = icon || "";
            break;
    }

    return (
        <div
            className={cn(
                "flex border p-4 rounded-xl gap-4",
                [
                    type === "info" && "border-info-400/60 bg-info-400/15",
                    type === "warning" &&
                        "border-warning-400/60 bg-warning-400/15",
                    type === "alert" && "border-danger-400/60 bg-danger-400/15",
                    type === "tip" && "border-success-400/60 bg-success-400/15",
                    type === "note" && "pill",
                ],
                className,
            )}
            {...props}
        >
            {icon && (
                <div className="shrink-0 callout-icon py-1">
                    <Icon
                        name={icon}
                        className={cn([
                            [
                                type === "info" && "stroke-info-400",
                                type === "warning" && "stroke-warning-400",
                                type === "alert" && "stroke-danger-400",
                                type === "tip" && "stroke-success-400 ",
                                type === "note" && "pill",
                            ],
                        ])}
                    />
                </div>
            )}
            <div className="flex-1 flex flex-col gap-1">
                {title && (
                    <div
                        className={cn("font-bold", [
                            type === "info" && "text-info-400",
                            type === "warning" && "text-warning-400",
                            type === "alert" && "text-danger-400",
                            type === "tip" && "text-success-400 ",
                        ])}
                    >
                        {title}
                    </div>
                )}
                <div className="text-muted-foreground">{children}</div>
            </div>
        </div>
    );
}
