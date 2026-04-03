export const ClientWrapper = ({
    children,
    metadata,
    bottomContent,
    sourceCode,
}) => {
    return <div className="flex-1 copy">{children}</div>;
};
