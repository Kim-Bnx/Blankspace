import { useMDXComponents as getNextraComponents } from "nextra/mdx-components";
import { TOC } from "@/components/toc";
import { Callout } from "@/components/mdx/callout";
import AdminPanelHelper from "@/components/mdx/admin-panel-helper";
import GithubCodeBlock from "@/components/mdx/github-code-block";
import { Pre } from "@/components/mdx/pre";
import { Code } from "@/components/mdx/code";
import { Link } from "@/components/mdx/link";
import { Table } from "@/components/mdx/table";
import { Columns } from "@/components/mdx/columns";
import { Card } from "@/components/mdx/card";
import { LinkCard } from "@/components/mdx/link-card";
import { TypeTable } from "@/components/mdx/type-table";

import { H1, H2, H3, H4, H5, H6 } from "@/components/mdx/heading";

import { Blockquote } from "@/components/mdx/blockquote";
import { withGitHubAlert } from "@/components/mdx/hocs/with-github-alert";

import { cn } from "@/lib/cn";

const CALLOUT_TYPE = Object.freeze({
    caution: "error",
    important: "important",
    note: "info",
    tip: "default",
    warning: "warning",
});

const defaultComponents = getNextraComponents({
    wrapper({ toc, children, metadata, bottomContent, sourceCode, ...props }) {
        return (
            <div className="wrapper flex max-w-7xl w-full mx-auto gap-10">
                <div className="flex-1 px-10 ">{children}</div>
                <TOC toc={toc} />
            </div>
        );
    },
    a: Link,
    blockquote: withGitHubAlert(
        ({ type, ...props }) => (
            <Callout type={CALLOUT_TYPE[type]} {...props} />
        ),
        Blockquote,
    ),
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
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    td: Table.Td,
    th: Table.Th,
    tr: Table.Tr,
    Columns,
    Card,
    LinkCard,
    GithubCodeBlock,
    Callout,
    TypeTable,
    AdminPanelHelper,
});

export const useMDXComponents = (components) => ({
    ...defaultComponents,
    ...components,
});
