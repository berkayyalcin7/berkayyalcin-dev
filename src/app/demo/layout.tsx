import type { Metadata } from "next";
import {
  Geist,
  Fraunces,
  Playfair_Display,
  Cormorant_Garamond,
  DM_Serif_Display,
  Manrope,
  Space_Grotesk,
  Lora,
} from "next/font/google";
import "../globals.css";

// Her demo kendi yazı tipi eşleşmesini seçer (bkz. lib/demos.ts → display/body).
// preload kapalı: tarayıcı yalnızca sayfada gerçekten kullanılan fontu indirir.
const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin", "latin-ext"], display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin", "latin-ext"], display: "swap", preload: false });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin", "latin-ext"], display: "swap", preload: false });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});
const dmserif = DM_Serif_Display({ variable: "--font-dmserif", subsets: ["latin", "latin-ext"], weight: "400", display: "swap", preload: false });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin", "latin-ext"], display: "swap", preload: false });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin", "latin-ext"], display: "swap", preload: false });
const lora = Lora({ variable: "--font-lora", subsets: ["latin", "latin-ext"], display: "swap", preload: false });

const fontVars = [geist, fraunces, playfair, cormorant, dmserif, manrope, grotesk, lora]
  .map((font) => font.variable)
  .join(" ");

// Demo siteler hayali işletmelerdir; arama motorlarında listelenmemelidir.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${fontVars} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
