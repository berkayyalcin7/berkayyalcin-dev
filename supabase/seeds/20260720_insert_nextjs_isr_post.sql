-- Yeni blog yazısı: Next.js ISR (TR + EN)
-- Çalıştırıldı: Supabase MCP execute_sql — berkayyalcin-dev (dyqriqtgitmyiytrlwyi)
-- Kapak: /images/blog/nextjs-isr-cover.png

INSERT INTO public.posts (
  title,
  slug,
  excerpt,
  content,
  cover_image,
  published,
  category,
  tags,
  title_en,
  excerpt_en,
  content_en
) VALUES (
  'Next.js ISR: Statik Hız, Dinamik İçerik',
  'nextjs-isr-statik-hiz-dinamik-icerik',
  'Bu sitede blog yazıları 30 dakikada bir yenileniyor. ISR (Incremental Static Regeneration) ile hem CDN hızını hem de güncel içeriği nasıl bir arada tuttuğumu kısaca anlatıyorum.',
  $tr$
Statik site hızlıdır ama içerik değişince yeniden build ister. Tam dinamik sayfa günceldir ama her istekte sunucuya biner. **ISR (Incremental Static Regeneration)** ikisinin ortasını tutar: sayfayı önceden üretirsiniz, belli bir süre sonra arka planda tazeleyebilirsiniz.

Bu yazıda teoriyi uzatmadan, doğrudan bu blogun kullandığı `revalidate` ayarı üzerinden ISR'yi özetliyorum.

---

# ISR Kısaca Nedir?

- Sayfa **build zamanında** (veya ilk istekte) HTML olarak üretilir.
- CDN / edge üzerinde **cache'lenir** — ziyaretçi hızlı görür.
- `revalidate` süresi dolunca bir sonraki istek **arka planda** yeni sürümü üretir; sonraki ziyaretçiler taze içeriği alır.

Kısacası: `statik hız` + `kontrollü tazelik`.

---

# Bu Sitede Nasıl Çalışıyor?

Blog detay sayfasında ISR şöyle ayarlı:

```ts
export const revalidate = 1800; // 30 dakika
```

Yani bir yazıyı Supabase'de güncellediğinizde site anında değişmeyebilir; en geç ~30 dakika içinde yeni içerik yayına yansır. Acil güncelleme için on-demand revalidation (ör. `/api/revalidate`) da kullanılabilir.

---

# Ne Zaman İşinize Yarar?

1. **Blog / portföy:** İçerik sık değişmez ama sıfırdan build beklemek istemezsiniz.
2. **Ürün listeleri:** Dakikada değil, dakikalar–saatler mertebesinde güncellenir.
3. **SEO + performans:** HTML hazır gelir; crawler ve kullanıcı aynı hızlı sayfayı görür.

ISR, her satırın anlık değişmesi gereken paneller için değildir — orada SSR veya client fetch daha doğru olur.

---

# Kısa Sonuç

ISR, "her şeyi dinamik yap" ile "her şeyi statik yap" arasında pratik bir köprü. Bu site de blogunu bu köprü üzerinden sunuyor: hızlı yüklenir, içerik kontrollü şekilde tazelenir.
$tr$,
  '/images/blog/nextjs-isr-cover.png',
  true,
  'Frontend',
  ARRAY['Next.js', 'ISR', 'Caching', 'Performance', 'Vercel'],
  'Next.js ISR: Static Speed, Dynamic Content',
  'This blog revalidates every 30 minutes. A short walkthrough of how Incremental Static Regeneration keeps CDN speed and fresh content in the same page.',
  $en$
Static sites are fast, but content changes usually mean a full rebuild. Fully dynamic pages stay fresh, but every request hits the server. **ISR (Incremental Static Regeneration)** sits in the middle: you pre-render the page, then refresh it in the background after a set interval.

Instead of dragging out the theory, I'll summarize ISR through the `revalidate` setting this very blog uses.

---

# ISR in a Nutshell

- The page is generated as HTML at **build time** (or on the first request).
- It is **cached** on a CDN / edge — visitors get a fast response.
- After the `revalidate` window, the next request **regenerates in the background**; later visitors see the fresh version.

In short: `static speed` + `controlled freshness`.

---

# How It Works on This Site

The blog post page sets ISR like this:

```ts
export const revalidate = 1800; // 30 minutes
```

So when you update a post in Supabase, the site may not change instantly — within ~30 minutes the new content is live. For urgent updates, on-demand revalidation (e.g. `/api/revalidate`) is also an option.

---

# When It Pays Off

1. **Blog / portfolio:** Content doesn't change every minute, but you don't want a full rebuild for every edit.
2. **Product listings:** Updated on a minutes-to-hours cadence, not every second.
3. **SEO + performance:** HTML is ready; crawlers and users both get a fast page.

ISR is not for dashboards where every row must be live — use SSR or client fetch there.

---

# Quick Takeaway

ISR is a practical bridge between "make everything dynamic" and "make everything static." This site serves its blog across that bridge: loads fast, refreshes content on a controlled schedule.
$en$
)
ON CONFLICT (slug) DO NOTHING;
