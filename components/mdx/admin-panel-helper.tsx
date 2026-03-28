import { Icon } from "../Icon";
import { ChevronRight, Square, SquareCheck } from "lucide-react";
import { cn } from "@/lib/cn";

export default function AdminPanelHelper({
    className,
    children,
    icon,
    breadcrumbs,
    actions,
    ...props
}) {
    return (
        <div
            className={cn(
                "flex border flex-col p-1 rounded-xl gap-1 p-2",
                className,
            )}
            {...props}
        >
            {breadcrumbs && breadcrumbs.split(",").length > 0 && (
                <div className="p-1 flex items-center gap-1">
                    {icon && <Icon name={icon} className="w-5 mr-1" />}
                    {breadcrumbs.split(",").map((crumb, index, arr) => (
                        <span
                            key={index}
                            className={cn(
                                "inline-flex gap-1",
                                index == arr.length - 1 &&
                                    "text-accent-alt font-semibold",
                            )}
                        >
                            {crumb}
                            {index < arr.length - 1 && (
                                <ChevronRight className="w-4" />
                            )}
                        </span>
                    ))}
                </div>
            )}

            {actions &&
                actions.length > 0 &&
                actions.map((action, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex gap-4 py-2 rounded-md bg-[#2A282E]/50 pl-8",
                        )}
                    >
                        <span className="text-primary-foreground font-semibold">
                            {action[0] + (action.length > 1 ? " :" : "")}
                        </span>
                        {action[1] && (
                            <span className="flex gap-4">
                                <span
                                    className={cn(
                                        "flex gap-1",
                                        action[1] === "Oui" &&
                                            "text-accent-alt",
                                    )}
                                >
                                    {action[1] === "Oui" ? (
                                        <SquareCheck className="w-5" />
                                    ) : (
                                        <Square className="w-5" />
                                    )}{" "}
                                    Oui
                                </span>
                                <span
                                    className={cn(
                                        "flex gap-1",
                                        action[1] === "Non" &&
                                            "text-accent-alt",
                                    )}
                                >
                                    {action[1] === "Non" ? (
                                        <SquareCheck className="w-5" />
                                    ) : (
                                        <Square className="w-5" />
                                    )}{" "}
                                    Non
                                </span>
                            </span>
                        )}
                    </div>
                ))}
        </div>
    );
}
