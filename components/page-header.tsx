interface PageHeaderProps {
    title?: string;
    description?: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
    if (!title && !description) return null;

    return (
        <header className="pt-10 pb-6 mb-8 border-b border-border">
            {title && <h1 className="text-4xl font-bold">{title}</h1>}
            {description && (
                <p className="mt-2 text-light-800">{description}</p>
            )}
        </header>
    );
};
