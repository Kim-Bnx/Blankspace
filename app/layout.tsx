import "./global.css";
import { Lexend, Nunito, Inconsolata } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";

const headings = Lexend({ subsets: ["latin"] });
const body = Nunito({ subsets: ["latin"], weight: ["400", "700"] });

export default function Layout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${body.className}`}
        style={{ colorScheme: "dark" }}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
