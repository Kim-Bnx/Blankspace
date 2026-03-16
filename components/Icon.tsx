import * as React from "react";
import * as Lucide from "lucide-react";
import type { LucideProps } from "lucide-react";

// Alias pratiques pour des noms "métiers"
const ALIASES: Record<string, keyof typeof Lucide> = {
    info: "Info",
    warning: "AlertTriangle",
    error: "XCircle", // ou "AlertCircle" selon ton goût
    success: "CheckCircle2",
    help: "CircleHelp",
    // tu peux en ajouter ici
};

// "alert-triangle" | "alert_triangle" | "alertTriangle" | "AlertTriangle" -> "AlertTriangle"
function toPascalCase(input: string) {
    if (!input) return "";
    // si déjà PascalCase exact, on renvoie tel quel
    if (/^[A-Z][A-Za-z0-9]*$/.test(input)) return input;

    // remplace camelCase par mots séparés, puis traite -, _, espaces
    const spaced = input
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/[-_]+/g, " ")
        .trim()
        .toLowerCase();

    // capitalise chaque token et recolle, en gardant les chiffres (ex. circle-2 -> Circle2)
    return spaced
        .split(/\s+/)
        .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
        .join("");
}

type IconProps = {
    name: string; // nom libre (alias, kebab, camel, Pascal…)
    className?: string;
    size?: number;
    strokeWidth?: number;
    "aria-label"?: string;
};

export function Icon({
    name,
    className,
    size = 18,
    strokeWidth = 1.75,
    "aria-label": ariaLabel,
}: IconProps) {
    // 1) alias directs (info, warning, error, success…)
    const aliasTarget = ALIASES[name.toLowerCase()];
    // 2) tentative nom brut (ex. "AlertTriangle")
    const Direct = (Lucide as any)[name as keyof typeof Lucide] as
        | React.ComponentType<LucideProps>
        | undefined;
    // 3) tentative normalisée PascalCase (ex. "alert-triangle" -> "AlertTriangle")
    const Normalized = (Lucide as any)[
        toPascalCase(name) as keyof typeof Lucide
    ] as React.ComponentType<LucideProps> | undefined;
    // 4) tentative via alias
    const Aliased = aliasTarget
        ? ((Lucide as any)[aliasTarget] as React.ComponentType<LucideProps>)
        : undefined;

    const Cmp = Direct || Normalized || Aliased || (Lucide as any).CircleHelp;

    const a11y = ariaLabel
        ? { "aria-label": ariaLabel, role: "img" }
        : { "aria-hidden": true };
    return (
        <Cmp
            className={className}
            size={size}
            strokeWidth={strokeWidth}
            {...a11y}
        />
    );
}
