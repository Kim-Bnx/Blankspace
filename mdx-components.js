import { useMDXComponents as getNextraComponents } from "nextra/mdx-components";
import { TOC } from "@/components/toc";
import Callout from "@/components/mdx/callout";
import AdminPanelHelper from "@/components/mdx/admin-panel-helper";
import GithubCodeBlock from "@/components/mdx/github-code-block";
import { Pre } from "@/components/mdx/pre";
import { Code } from "@/components/mdx/code";
import { Link } from "@/components/mdx/link";
import { Table } from "@/components/mdx/table";
import { cn } from "@/lib/cn";

const defaultComponents = getNextraComponents({
    wrapper({ children, toc }) {
        return (
            <div className="wrapper flex max-w-7xl w-full mx-auto gap-10">
                <div className="flex-1 copy">{children}</div>
                <TOC toc={toc} />
            </div>
        );
    },
    a: Link,
    code: Code,
    pre: Pre,
    table: ({ className, ...props }) => (
        <Table
            className={cn(
                "nextra-scrollbar not-first:mt-[1.25em] p-0",
                className,
            )}
            {...props}
        />
    ),
    td: Table.Td,
    th: Table.Th,
    tr: Table.Tr,
    GithubCodeBlock,
    Callout,
    AdminPanelHelper,
});

export const useMDXComponents = (components) => ({
    ...defaultComponents,
    ...components,
});
