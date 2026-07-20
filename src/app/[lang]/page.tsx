import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import FeaturedPackages from "@/components/FeaturedPackages";
import Projects from "@/components/Projects";
import BlogTeaser from "@/components/BlogTeaser";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";
import { getDictionary, hasLocale, buildHeaderDict } from "@/lib/i18n";
import { canonicalPath } from "@/lib/locale-link";

export const revalidate = 1800; // Blog sayfalarıyla aynı ISR aralığı; on-demand /api/revalidate'e ek emniyet ağı

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    alternates: {
      canonical: canonicalPath(lang, "/"),
      languages: { en: "/", tr: "/tr", "x-default": "/" },
    },
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: lang === "tr" ? "tr_TR" : "en_US",
      type: "website",
      // images bilinçli olarak yok: opengraph-image.tsx dosya konvansiyonu
      // 1200x630 kartı üretir. Burada images vermek onu ezer.
    },
  };
}

export default async function Home({ params }: PageParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const headerDict = buildHeaderDict(dict);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Berkay Yalçın",
    "jobTitle": "Full Stack .NET Developer",
    "url": "https://berkayyalcin.dev",
    "sameAs": [
      "https://github.com/berkayyalcin7",
      "https://tr.linkedin.com/in/berkay-yalçın-59289b145"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "YKK Türkiye A.Ş"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TR",
      "addressLocality": "Tekirdağ / Çorlu"
    },
    "description": dict.meta.homeDescription
  };

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Berkay Yalçın",
      "alternateName": "berkayyalcin",
      "identifier": "berkayyalcin7",
      "description": dict.profile.role,
      "image": "https://berkayyalcin.dev/icon.png"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <Header lang={lang} dict={headerDict} />
      <main id="main-content" className="flex-1">
        <Hero lang={lang} dict={dict.hero} profile={dict.profile} />
        <Reveal>
          <Stats dict={dict.stats} />
        </Reveal>
        <Reveal>
          <About dict={dict.about} />
        </Reveal>
        <Reveal>
          <Timeline dict={dict.timeline} />
        </Reveal>
        <Reveal>
          <Skills dict={dict.skills} />
        </Reveal>
        <Reveal>
          <FeaturedPackages
            lang={lang}
            dict={dict.featuredPackages}
            packageTexts={{ trkit: dict.trkit, locakit: dict.locakit, utilkit: dict.utilkit }}
          />
        </Reveal>
        <Reveal>
          <Projects lang={lang} dict={dict.projects} />
        </Reveal>
        <Reveal>
          <BlogTeaser lang={lang} dict={dict.blogTeaser} cardDict={dict.blogCard} />
        </Reveal>
        <Reveal>
          <Contact dict={dict.contact} modalDict={dict.contactModal} />
        </Reveal>
      </main>
      <Footer lang={lang} dict={dict.footer} nav={dict.nav} contact={dict.contact} />
    </>
  );
}
