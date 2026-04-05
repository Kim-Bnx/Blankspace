import PageIcon from "@/components/plugins/doc-icon";
import { Calendar } from "lucide-react";
import GithubIcon from "./github-icon";

interface PageHeaderProps {
    title?: string;
    icon?: string;
    timestamp: string;
    description?: string;
    release_date?: string;
    source?: string;
}

export const DocsHeader = ({ metadata }: PageHeaderProps) => {
    const {
        title,
        description,
        icon,
        timestamp: date,
        release_date,
        source,
    } = metadata || {};
    if (!title && !description) return null;

    return (
        <header className="pt-10 pb-8 mb-8 border-b border-border">
            <PageIcon name={icon} className="size-20 mb-4" />

            {title && <h1 className="text-4xl font-semibold">{title}</h1>}
            {description && (
                <p className="mt-2 text-light-300 text-lg">{description}</p>
            )}
            <div className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-light-800 text-sm mt-6">
                {release_date &&
                    (() => {
                        const isMonthYear = /^\d{2}\/\d{4}$/.test(release_date);
                        const date = isMonthYear
                            ? new Date(
                                  `${release_date.slice(3)}-${release_date.slice(0, 2)}-01`,
                              )
                            : new Date(release_date);

                        return (
                            <>
                                <div>Publication</div>
                                <div>
                                    <Calendar
                                        size={12}
                                        className="inline-block mr-2 -mt-px"
                                    />

                                    {date.toLocaleDateString("fr-FR", {
                                        year: "numeric",
                                        month: "long",
                                        ...(isMonthYear
                                            ? {}
                                            : { day: "numeric" }),
                                    })}
                                </div>
                            </>
                        );
                    })()}
                {date && (
                    <>
                        <div>Dernière édition</div>
                        <div className="">
                            <Calendar
                                size={12}
                                className="inline-block mr-2 -mt-px"
                            />
                            {new Date(date).toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </div>
                    </>
                )}
                {source && (
                    <>
                        <div>Source</div>
                        <div className="">
                            <a
                                href={source}
                                target="_blank"
                                className="inline-flex items-center"
                                rel="noopener noreferrer"
                            >
                                <GithubIcon
                                    size={12}
                                    className=" inline-block mr-2 -mt-px"
                                />
                                Voir le code source
                            </a>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};
