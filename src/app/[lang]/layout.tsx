import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import BackgroundLoader from "@/components/BackgroundLoader";
import BackToTop from "@/components/BackToTop";
import ThemeSync from "@/components/ThemeSync";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Varsayılan tema dark; light yalnızca kullanıcı toggle ile seçtiyse uygulanır.
// Boyamadan önce çalışıp açık temada FOUC'u önler. Diller arası geçiş tam sayfa
// yüklemesi olduğu için (Header'daki <a>) bu script client'ta asla re-render olmaz.
const THEME_INIT_CODE = `
  try {
    if (localStorage.theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  } catch (_) {
    document.documentElement.classList.add('dark');
  }
`;

type LayoutParams = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(siteConfig.url),
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
    alternates: {
      languages: { tr: "/", en: "/en" },
    },
    openGraph: {
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: lang === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutParams & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${geistSans.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_CODE }} />
      </head>
      <body className="flex min-h-full flex-col bg-slate-50 text-zinc-900 dark:bg-black dark:text-white transition-colors duration-300">
        <ThemeSync />
        <BackgroundLoader />
        {children}
        <BackToTop ariaLabel={dict.backToTop.aria} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
