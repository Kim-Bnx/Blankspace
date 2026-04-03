import type { PageMapItem } from "nextra";
import type { FC, ReactNode } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { MainContent } from "./main-content";
import { ScrollProvider } from "@/lib/scroll-context";
import { PageMapProvider } from "@/hooks/page-map-context";

export const NextraTheme: FC<{
    children: ReactNode;
    pageMap: PageMapItem[];
}> = ({ children, pageMap }) => {
    return (
        <section className="h-full flex flex-col py-2">
            <div className="flex flex-1 min-h-0">
                <Sidebar pageMap={pageMap} />
                <PageMapProvider pageMap={pageMap}>
                    <ScrollProvider>
                        <section className="flex flex-col flex-1 min-h-0 gap-2">
                            <Navbar pageMap={pageMap} mode="docs" />
                            <MainContent pageMap={pageMap}>
                                {children}
                            </MainContent>
                        </section>
                    </ScrollProvider>
                </PageMapProvider>
            </div>
        </section>
    );
};
