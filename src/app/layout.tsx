import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import dynamic from "next/dynamic";
import BootstrapClient from "@/components/BootstrapClient";
import Header from "../components/Header";
import Footer from "@/components/Footer";
// import StoreProvider from "./StoreProvider";

const ReduxProvider = dynamic(() => import("@/app/ReduxProvider"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Le Choeur du Bon Pays",
  description: "Site vitrine du choeur d'hommes de Cousance (Jura - 39)",
  icons: [
    {
      rel: "icon",
      type: "image/jpeg",
      sizes: "16x16, 32x32, 64x64, 128x128",
      url: "/favicon.jpg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div id="root">
            <Header />
            {children}
            <Footer />
          </div>
          <BootstrapClient />
        </ReduxProvider>
      </body>
    </html>
  );
}
