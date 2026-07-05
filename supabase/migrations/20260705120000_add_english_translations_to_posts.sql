-- Blog yazılarına İngilizce çeviri desteği.
-- Supabase Dashboard > SQL Editor'da çalıştırın (veya `supabase db push`).
--
-- Model: mevcut title/excerpt/content kolonları Türkçe kaynak metindir.
-- *_en kolonları doluysa yazının İngilizce çevirisi vardır; boşsa (null)
-- İngilizce ziyaretçiye Türkçe orijinal, "çeviri yok" notuyla gösterilir.
-- Slug her iki dilde ortaktır; kod tarafı kolonlar yokken de çalışır.

alter table public.posts
  add column if not exists title_en text,
  add column if not exists excerpt_en text,
  add column if not exists content_en text;

-- İçeriği "çevrilmiş" saymak için üç alan da dolu olmalı; yarım çeviri
-- yayına sızmasın diye ya hepsi null ya hepsi dolu olmalı.
alter table public.posts
  drop constraint if exists posts_en_translation_complete;
alter table public.posts
  add constraint posts_en_translation_complete check (
    (title_en is null and excerpt_en is null and content_en is null)
    or (title_en is not null and excerpt_en is not null and content_en is not null)
  );

-- "Yalnızca İngilizcesi olan yayınlanmış yazılar" sorguları için hafif index
create index if not exists posts_has_en_idx
  on public.posts ((content_en is not null))
  where published = true;

-- Örnek: bir yazıya İngilizce çeviri eklemek
-- update public.posts
--   set title_en   = 'English title here',
--       excerpt_en = 'English excerpt here',
--       content_en = 'English markdown content here...'
--   where slug = 'ornek-yazi-slug';

-- Örnek: bir yazının çevirisini geri çekmek (TR fallback'e döner)
-- update public.posts
--   set title_en = null, excerpt_en = null, content_en = null
--   where slug = 'ornek-yazi-slug';
