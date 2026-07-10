import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { canonicalPath } from "@/lib/locale-link";
import SiteBackground from "@/components/SiteBackground";
import BackToTop from "@/components/BackToTop";
import ThemeSync from "@/components/ThemeSync";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Kod blokları, terminal mockup'ları ve paket adları mono font kullanır.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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

// Adres çubuğu / tarayıcı arayüzü rengi her iki temada da gövde arka planıyla eşleşir.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(siteConfig.url),
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    alternates: {
      canonical: canonicalPath(lang, "/"),
      languages: { en: "/", tr: "/tr", "x-default": "/" },
    },
    openGraph: {
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: lang === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
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
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_CODE }} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={dict.meta.siteTitle}
          href="/feed.xml"
        />
      </head>
      <body className="flex min-h-full flex-col bg-slate-50 text-zinc-900 dark:bg-black dark:text-white transition-colors duration-300">
        <ThemeSync />
        <a
          href="#main-content"
          className="skip-link rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg"
        >
          {dict.skipToContent}
        </a>
        <SiteBackground />
        {children}
        <BackToTop ariaLabel={dict.backToTop.aria} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
