# berkayyalcin.dev

Berkay Yalçın'ın kişisel portfolyo ve blog sitesi.

## Teknoloji Yığını

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS v4
- **Veritabanı:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Hosting:** [Vercel](https://vercel.com/)

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
  app/            → Sayfalar ve layout (App Router)
  components/     → UI bileşenleri
  lib/
    site-config.ts     → Site geneli sabitler (isim, sosyal linkler, nav)
    supabase/
      client.ts        → Tarayıcı tarafı Supabase istemcisi
      server.ts         → Sunucu tarafı (Server Component) Supabase istemcisi
```

## Dağıtım (Deployment)

Proje [Vercel](https://vercel.com/) üzerinde barındırılır. `main` dalına
yapılan her push otomatik olarak canlıya alınır.

Vercel proje ayarlarında aşağıdaki environment variable'ların tanımlı
olması gerekir:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (yalnızca sunucu tarafı işlemler için)

## Yol Haritası

- [x] Next.js + TypeScript + Tailwind kurulumu
- [x] Supabase client altyapısı
- [x] İlk index (landing) sayfası
- [ ] Blog yazıları için Supabase şeması (`posts` tablosu)
- [ ] Blog listeleme ve detay sayfaları
- [ ] Projeler sayfası
- [ ] İletişim formu
