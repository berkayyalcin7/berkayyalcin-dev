# berkayyalcin.dev

Berkay Yalçın'ın kişisel portfolyo ve blog sitesi — [berkayyalcin.dev](https://berkayyalcin.dev)

## Teknoloji Yığını

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack, ISR)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS v4 (selector tabanlı dark mode)
- **Veritabanı:** [Supabase](https://supabase.com/) (PostgreSQL + Storage)
- **Hosting:** [Vercel](https://vercel.com/) (Analytics + Speed Insights)
- **CI:** GitHub Actions (lint, type check, build)

## Özellikler

### Blog
- Supabase'e bağlı dinamik blog sistemi (`posts` tablosu, ISR ile 30 dk'da bir yenileme)
- `/blog` sayfasında **kategori filtreleme** ve **anlık arama** (başlık/özet/etiket)
- Yazı detayında **etiketler**, **okuma süresi**, **kapak görseli** ve **gerçek zamanlı okunma sayacı** (Supabase RPC + localStorage cooldown)
- Kategori/etiket skoruna göre **İlgili Yazılar** önerisi
- Kod blokları için editör görünümlü **syntax highlighting**
- Ana sayfada öne çıkan (featured) yazı düzenli blog vitrini

### Portfolyo
- Supabase'den beslenen **Projeler** bölümü (`projects` tablosu)
- Mobil uyumlu **kariyer zaman çizelgesi**, yetenekler ve hakkımda bölümleri
- Supabase Storage üzerinden **CV indirme** butonları
- İletişim modalı ve sosyal bağlantılar

### Görsel & UX
- **Dark mode varsayılan**, toggle ile light mode (tercih localStorage'da saklanır)
- Etkileşimli particle-network canvas arka planı (imleç takibi, aurora ışık efektleri, `prefers-reduced-motion` desteği)
- Dinamik favicon

## Geliştirme

Bağımlılıkları kur:

```bash
npm install
```

`.env.local.example` dosyasını `.env.local` olarak kopyala ve Supabase
bilgilerini gir (Project Settings > API):

```bash
cp .env.local.example .env.local
```

Geliştirme sunucusunu başlat:

```bash
npm run dev
```

Site [http://localhost:3000](http://localhost:3000) adresinde açılır.

## Proje Yapısı

```
src/
  app/
    page.tsx           → Ana sayfa (tüm bölümler)
    blog/page.tsx      → Blog index (kategori filtre + arama)
    blog/[slug]/       → Yazı detayı (etiketler, ilgili yazılar)
  components/          → UI bileşenleri (BlogCard, Projects, ThemeToggle, ...)
  lib/
    site-config.ts     → Site geneli sabitler (isim, sosyal linkler, nav, deneyim)
    blog.ts            → Blog verisi + okuma süresi / ilgili yazı yardımcıları
    projects.ts        → Proje verisi
    supabase/          → Tarayıcı ve sunucu tarafı Supabase istemcileri
supabase/
  migrations/          → SQL migration dosyaları (Supabase SQL Editor'da çalıştırılır)
```

## Veritabanı

Blog kategorileri ve etiketleri için migration:
`supabase/migrations/20260702120000_add_category_tags_to_posts.sql`

Okunma sayacı, Supabase'de tanımlı `increment_post_views(post_slug)` RPC
fonksiyonunu kullanır.

## Dağıtım (Deployment)

Proje [Vercel](https://vercel.com/) üzerinde barındırılır. `main` dalına
yapılan her push otomatik olarak canlıya alınır; her PR için preview
deploy oluşur. GitHub Actions her push/PR'da lint + type check + build
çalıştırır.

Vercel proje ayarlarında aşağıdaki environment variable'ların tanımlı
olması gerekir:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (yalnızca sunucu tarafı işlemler için)

## Yol Haritası

- [x] Next.js + TypeScript + Tailwind kurulumu
- [x] Supabase client altyapısı
- [x] Blog sistemi (listeleme, detay, okunma sayacı)
- [x] Blog kategorileri, etiketler ve ilgili yazılar
- [x] Projeler bölümü (Supabase)
- [x] Kariyer zaman çizelgesi ve CV indirme
- [x] Light/Dark tema (varsayılan dark)
- [x] Mobil navigasyon menüsü
- [ ] SEO: sitemap.xml + yapılandırılmış veri (JSON-LD)
- [ ] RSS feed
- [ ] İletişim formu (Supabase)
