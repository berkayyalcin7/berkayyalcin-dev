import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import BlogTeaser from "@/components/BlogTeaser";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/Reveal";

export const revalidate = 1800; // Blog sayfalarıyla aynı ISR aralığı; on-demand /api/revalidate'e ek emniyet ağı

export const metadata: Metadata = {
  title: "Berkay Yalçın | Full Stack .NET Developer",
  description:
    "Berkay Yalçın'ın kişisel portfolyosu, .NET Core, mikroservis mimarileri ve yazılım geliştirme üzerine teknik blog yazıları.",
  openGraph: {
    title: "Berkay Yalçın | Full Stack .NET Developer",
    description:
      "Berkay Yalçın'ın kişisel portfolyosu, .NET Core, mikroservis mimarileri ve yazılım geliştirme üzerine teknik blog yazıları.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/icon.png`,
        width: 512,
        height: 512,
        alt: "Berkay Yalçın",
      },
    ],
  },
};

export default function Home() {
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
    "description": "Berkay Yalçın'ın kişisel portfolyosu, .NET Core, mikroservis mimarileri ve yazılım geliştirme üzerine teknik blog yazıları."
  };

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Berkay Yalçın",
      "alternateName": "berkayyalcin",
      "identifier": "berkayyalcin7",
      "description": "Bilgisayar Mühendisi & .NET Full Stack Developer",
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
      <Header />
      <main className="flex-1">
        <Hero />
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Timeline />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Projects />
        </Reveal>
        <Reveal>
          <BlogTeaser />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
