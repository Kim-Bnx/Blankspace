import { useMDXComponents as getNextraComponents } from "nextra/mdx-components";
import { TOC } from "@/components/toc";
import Callout from "@/components/mdx/callout";
import AdminPanelHelper from "@/components/mdx/admin-panel-helper";

import { useMDXComponents as getThemeComponents } from "nextra-theme-docs"; // nextra-theme-blog or your custom theme

// Get the default MDX components
const themeComponents = getThemeComponents();

const defaultComponents = getNextraComponents({
    wrapper({ children, toc }) {
        return (
            <div className="wrapper flex max-w-7xl w-full mx-auto flex gap-10">
                <div className="flex-1">{children}</div>
                <TOC toc={toc} />
            </div>
        );
    },
});

export const useMDXComponents = (components) => ({
    ...themeComponents,
    ...defaultComponents,
    Callout,
    AdminPanelHelper,
    ...components,
});
