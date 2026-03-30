import { useMDXComponents as getNextraComponents } from "nextra/mdx-components";
import { TOC } from "@/components/toc";
import Callout from "@/components/mdx/callout";
import AdminPanelHelper from "@/components/mdx/admin-panel-helper";
import { Pre } from "@/components/mdx/pre";
import { Code } from "@/components/mdx/code";
import { Link } from "@/components/mdx/link";

const defaultComponents = getNextraComponents({
    wrapper({ children, toc }) {
        return (
            <div className="wrapper flex max-w-7xl w-full mx-auto gap-10">
                <div className="flex-1">{children}</div>
                <TOC toc={toc} />
            </div>
        );
    },
    a: Link,
    code: Code,
    pre: Pre,
    Callout,
    AdminPanelHelper,
});

export const useMDXComponents = (components) => ({
    ...defaultComponents,
    ...components,
});
