import { NextResponse, type NextRequest } from "next/server";

// Varsayılan dil (tr) URL'de prefix'siz kalır: "/" TR'dir, "/en/..." İngilizce'dir.
// "/tr/..." istekleri çift içerik oluşmaması için prefix'siz karşılığına yönlendirilir.
const LOCALES = ["tr", "en"];
const DEFAULT_LOCALE = "tr";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Varsayılan dilin prefix'li halini kanonik (prefix'siz) URL'ye yönlendir
  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  // Desteklenen dil prefix'i varsa dokunma (ör. /en/blog)
  const hasLocalePrefix = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocalePrefix) return;

  // Prefix'siz her yol varsayılan dile rewrite edilir; URL kullanıcı için değişmez
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Statik dosyalar, Next iç yolları, API ve metadata rotaları dışında her şey
  matcher: ["/((?!_next|api|sitemap\\.xml|robots\\.txt|icon\\.png|favicon\\.ico|.*\\..*).*)"],
};
