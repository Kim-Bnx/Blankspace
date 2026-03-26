import type { PageMapItem } from "nextra";
import { version } from "nextra/package.json";
import type { FC, ReactNode } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export const NextraTheme: FC<{
    children: ReactNode;
    pageMap: PageMapItem[];
}> = ({ children, pageMap }) => {
    return (
        <>
            <Navbar pageMap={pageMap} />
            <div style={{ display: "flex" }}>
                <Sidebar pageMap={pageMap} />
                {children}
            </div>
            <Footer />
        </>
    );
};
