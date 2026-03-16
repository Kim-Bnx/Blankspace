import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";

export default function Layout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        // required styles
        className="flex flex-col min-h-screen"
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
