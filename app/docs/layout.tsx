import type { Metadata } from "next";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import type { FC, ReactNode } from "react";
import { NextraTheme } from "@/components/nextra-theme";
import "../global.css";
import { Lexend, Nunito, Inclusive_Sans } from "next/font/google";

const headings = Lexend({ subsets: ["latin"] });
const body = Nunito({ subsets: ["latin"], weight: ["400", "700"] });
const mono = Inclusive_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        absolute: "",
        template: "%s - Blank",
    },
};

const RootLayout: FC<{ children: ReactNode }> = async ({ children }) => {
    const pageMap = await getPageMap("/docs");
    return (
        <html
            lang="fr"
            dir="ltr"
            suppressHydrationWarning
            className="h-full dark bg-background text-light-100 overflow-hidden"
        >
            <Head faviconGlyph="✦" />
            <body
                suppressHydrationWarning
                className={`${body.className} ${headings.className} ${mono.className} h-full bg-background text-light-100`}
                style={{ colorScheme: "dark" }}
            >
                <NextraTheme pageMap={pageMap}>{children}</NextraTheme>
            </body>
        </html>
    );
};

export default RootLayout;
