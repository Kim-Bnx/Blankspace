import type { Metadata } from "next";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import type { FC, ReactNode } from "react";
import { NextraTheme } from "@/app/_components/nextra-theme";

export const metadata: Metadata = {
    title: {
        absolute: "",
        template: "%s - Nextra",
    },
};

const RootLayout: FC<{ children: ReactNode }> = async ({ children }) => {
    const pageMap = await getPageMap("/docs");
    return (
        <html lang="fr" dir="ltr">
            <Head faviconGlyph="✦" />
            <body style={{ margin: 0 }}>
                <NextraTheme pageMap={pageMap}>{children}</NextraTheme>
            </body>
        </html>
    );
};

export default RootLayout;
