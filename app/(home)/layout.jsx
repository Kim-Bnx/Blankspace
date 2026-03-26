import "../global.css";
import { Lexend, Nunito, Inclusive_Sans } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";

const headings = Lexend({ subsets: ["latin"] });
const body = Nunito({ subsets: ["latin"], weight: ["400", "700"] });
const mono = Inclusive_Sans({ subsets: ["latin"] });

export default function Layout({ children }) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body
                suppressHydrationWarning
                className={`${body.className} ${headings.className} ${mono.className} bg-background`}
                style={{ colorScheme: "dark" }}
            >
                <RootProvider>{children}</RootProvider>
            </body>
        </html>
    );
}
