import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });

// Demo siteler hayali işletmelerdir; arama motorlarında listelenmemelidir.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${geistSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
