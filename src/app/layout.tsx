import type { Metadata } from "next";
import { Providers } from "./providers";
import Layout from "~/components/layout";
import { Toaster } from "~/components/ui/sonner";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "DFDS Voyage Management",
  description: "Manage voyages, vessels, and unit types",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Layout>{children}</Layout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
