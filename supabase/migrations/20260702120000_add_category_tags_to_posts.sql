-- Blog yazılarına kategori ve etiket desteği.
-- Supabase Dashboard > SQL Editor'da çalıştırın (veya `supabase db push`).
-- Kod tarafı bu kolonlar yokken de çalışır; kolonlar eklendiğinde
-- kategori rozetleri, etiketler ve ilgili yazılar otomatik görünür.

alter table public.posts
  add column if not exists category text,
  add column if not exists tags text[] not null default '{}';

-- Yayınlanmış yazılarda kategoriye göre filtreleme için
create index if not exists posts_category_idx
  on public.posts (category)
  where published = true;

-- Etiket kesişimi sorguları için GIN index
create index if not exists posts_tags_idx
  on public.posts using gin (tags);

-- Örnek güncelleme (kendi yazılarınıza göre uyarlayın):
-- update public.posts
--   set category = 'Backend',
--       tags = array['.NET', 'C#', 'Mikroservis']
--   where slug = 'ornek-yazi-slug';