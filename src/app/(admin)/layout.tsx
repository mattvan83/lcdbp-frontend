import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css"; // Ensure styles are shared
import dynamic from "next/dynamic";
import BootstrapClient from "@/components/BootstrapClient";

const ReduxProvider = dynamic(() => import("@/lib/ReduxProvider"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Administration panel for managing site content",
};

const locales = ["en", "fr"];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ReduxProvider>
          <div id="admin-root">{children}</div>
          <BootstrapClient />
        </ReduxProvider>
      </body>
    </html>
  );
}
