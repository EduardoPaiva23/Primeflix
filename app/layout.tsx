import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PrimeFlix",
  description: "Descubra filmes em cartaz e monte sua lista de favoritos.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${geist.className} antialiased`}>
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
