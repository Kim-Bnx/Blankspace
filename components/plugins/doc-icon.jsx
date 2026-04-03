import { iconRegistry } from "@/components/plugins";

export default function PageIcon({ name, className = "size-5", ...props }) {
    if (!name) return null;

    const Icon = iconRegistry[name];

    if (!Icon) {
        console.warn(`[PageIcon] Aucune icône trouvée pour : "${name}"`);
        return null;
    }

    return <Icon className={className} aria-hidden="true" {...props} />;
}
