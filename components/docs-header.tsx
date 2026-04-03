import PageIcon from "@/components/plugins/doc-icon";

interface PageHeaderProps {
    title?: string;
    description?: string;
}

export const DocsHeader = ({ metadata }: PageHeaderProps) => {
    const { title, description, icon, timestamp: date } = metadata || {};
    if (!title && !description) return null;

    return (
        <header className="pt-10 pb-6 mb-8 border-b border-border">
            <PageIcon name={icon} className="size-20 mb-4" />

            {title && <h1 className="text-4xl font-bold">{title}</h1>}
            {description && (
                <p className="mt-2 text-light-800">{description}</p>
            )}
            {date && (
                <p className="mt-2 flex justify-end text-sm text-dark-100 font-semibold uppercase">
                    Dernière édition le{" "}
                    {new Date(date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            )}
        </header>
    );
};
