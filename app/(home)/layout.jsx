import "../global.css";
import { Lexend, Nunito, Inclusive_Sans } from "next/font/google";

const headings = Lexend({ subsets: ["latin"] });
const body = Nunito({ subsets: ["latin"], weight: ["400", "700"] });
const mono = Inclusive_Sans({ subsets: ["latin"] });

export default function Layout({ children }) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body
                suppressHydrationWarning
                className={`${body.className} ${headings.className} ${mono.className} bg-background text-light-100`}
                style={{ colorScheme: "dark" }}
            >
                {children}
            </body>
        </html>
    );
}
