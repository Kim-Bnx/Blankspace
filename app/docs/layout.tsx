import type { Metadata } from "next";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import type { FC, ReactNode } from "react";
import { NextraTheme } from "@/components/nextra-theme";
import "../global.css";
import { Poppins, Inter, Inclusive_Sans } from "next/font/google";

const headings = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const body = Inter({ subsets: ["latin"], weight: ["400", "700"] });
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
                className={`${body.className} h-full bg-background text-light-100`}
                style={{ colorScheme: "dark" }}
            >
                <NextraTheme pageMap={pageMap}>{children}</NextraTheme>
            </body>
        </html>
    );
};

export default RootLayout;
