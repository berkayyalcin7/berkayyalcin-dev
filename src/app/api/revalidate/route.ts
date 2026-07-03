import { createHash, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Supabase'e yeni yazı eklendikten sonra ISR cache'ini anında tazelemek için:
//   curl -X POST "https://berkayyalcin.dev/api/revalidate" -H "Authorization: Bearer <REVALIDATE_SECRET>"
// veya tarayıcıdan: https://berkayyalcin.dev/api/revalidate?secret=<REVALIDATE_SECRET>

/** Uzunluk farkında da sabit zamanlı karşılaştırma için önce hash'lenir. */
function isSecretValid(provided: string, expected: string): boolean {
  const providedHash = createHash("sha256").update(provided).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(providedHash, expectedHash);
}

function handleRevalidate(request: NextRequest): NextResponse {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET tanımlı değil; endpoint devre dışı." },
      { status: 503 }
    );
  }

  const authHeader = request.headers.get("authorization");
  const provided =
    authHeader?.replace(/^Bearer\s+/i, "") ??
    request.nextUrl.searchParams.get("secret") ??
    "";

  if (!provided || !isSecretValid(provided, secret)) {
    return NextResponse.json({ error: "Geçersiz veya eksik secret." }, { status: 401 });
  }

  // Blog içeriğinin göründüğü tüm sayfalar + sitemap
  const paths = ["/", "/blog", "/sitemap.xml"];
  for (const path of paths) {
    revalidatePath(path);
  }
  // Tüm yazı detay sayfaları (dinamik segment → type zorunlu)
  revalidatePath("/blog/[slug]", "page");

  return NextResponse.json({
    revalidated: true,
    paths: [...paths, "/blog/[slug]"],
    now: new Date().toISOString(),
  });
}

export function POST(request: NextRequest) {
  return handleRevalidate(request);
}

// Tarayıcıdan pratik kullanım için GET de destekleniyor.
export function GET(request: NextRequest) {
  return handleRevalidate(request);
}
