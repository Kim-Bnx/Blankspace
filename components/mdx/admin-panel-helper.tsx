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
                "flex border flex-col p-1 rounded-2xl gap-1 p-2",
                className,
            )}
            {...props}
        >
            {breadcrumbs && breadcrumbs.split(",").length > 0 && (
                <div className="p-1 flex items-center gap-1">
                    {icon && (
                        <span className="bg-[#2A282E]/50 p-1 rounded-md mr-1">
                            <Icon name={icon} className="w-5" />
                        </span>
                    )}
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

            <div className="grid grid-cols-[minmax(min-content,1fr)_1fr] gap-y-1">
                {actions &&
                    actions.length > 0 &&
                    actions.map((action, index) => (
                        <div
                            key={index}
                            className={cn(
                                "col-span-2 grid grid-cols-subgrid py-2 gap-4 rounded-md bg-[#2A282E]/50 pl-8",
                            )}
                        >
                            <span className="text-primary-foreground font-semibold">
                                {action[0] + (action.length > 1 ? " :" : "")}
                            </span>
                            {action[1] && (
                                <span className="flex gap-4">
                                    {action[1] === "Oui" ||
                                    action[1] === "Non" ? (
                                        <>
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
                                        </>
                                    ) : (
                                        <span
                                            className={cn(
                                                "flex gap-1 text-accent-alt",
                                            )}
                                        >
                                            <SquareCheck className="w-5" />
                                            {action[1]}
                                        </span>
                                    )}
                                </span>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
}
