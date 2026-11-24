import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesLanding from "@/components/services/ServicesLanding";
import { siteConfig, whatsappUrl } from "@/lib/site-config";
import { getDictionary, hasLocale, buildHeaderDict } from "@/lib/i18n";
import { alternatesFor, canonicalPath } from "@/lib/locale-link";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { services } = await getDictionary(lang);

  return {
    title: services.metaTitle,
    description: services.metaDescription,
    keywords: services.keywords,
    alternates: alternatesFor(lang, "/"),
    openGraph: {
      title: services.metaTitle,
      description: services.metaDescription,
      url: `${siteConfig.url}${canonicalPath(lang, "/")}`,
      siteName: siteConfig.name,
      locale: lang === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
  };
}

export default async function Home({ params }: PageParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { services } = dict;
  const pageUrl = `${siteConfig.url}${canonicalPath(lang, "/")}`;

  // Yerel SEO: Google'ın "Tekirdağ web tasarım" gibi aramalarda işletmeyi
  // tanıması için ProfessionalService + hizmet bölgeleri + SSS şeması.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#business`,
      name: `${siteConfig.name} — ${lang === "tr" ? "Web Tasarım" : "Web Design"}`,
      description: services.metaDescription,
      url: pageUrl,
      image: `${siteConfig.url}/icon.png`,
      email: siteConfig.social.emailAddress,
      priceRange: "₺₺",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Çorlu",
        addressRegion: "Tekirdağ",
        addressCountry: "TR",
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Tekirdağ" },
        ...services.area.districts.map((name) => ({ "@type": "City", name })),
        { "@type": "Country", name: "Türkiye" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["Turkish", "English"],
        url: `${siteConfig.url}${whatsappUrl()}`,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: services.offer.title,
        itemListElement: services.offer.items.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item.title, description: item.body },
        })),
      },
      founder: { "@type": "Person", name: siteConfig.name, url: `${siteConfig.url}/dev` },
      sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: services.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header
        lang={lang}
        dict={buildHeaderDict(dict)}
        nav={siteConfig.servicesNav}
        whatsapp={{ href: whatsappUrl(services.whatsappGreeting), label: services.whatsappCta }}
      />
      <main id="main-content" className="flex-1">
        <ServicesLanding lang={lang} dict={services} />
      </main>
      <Footer lang={lang} dict={dict.footer} nav={dict.nav} contact={dict.contact} services={services} />
    </>
  );
}
