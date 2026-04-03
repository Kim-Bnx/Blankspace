import "../global.css";

import { Poppins, Inter, Inclusive_Sans } from "next/font/google";

const headings = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const body = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const mono = Inclusive_Sans({ subsets: ["latin"] });

export default function Layout({ children }) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body
                suppressHydrationWarning
                className={`${body.className} bg-background text-light-100`}
                style={{ colorScheme: "dark" }}
            >
                {children}
            </body>
        </html>
    );
}
