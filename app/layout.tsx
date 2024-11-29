import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "300" });


export const metadata: Metadata = {
  title: "Tractian Test",
  description: "Tractian Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="br">
      <body
        className={`${inter.className} min-h-dvh bg-background antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
