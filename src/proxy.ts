import { NextResponse, type NextRequest } from "next/server";

// Varsayılan dil (en) URL'de prefix'siz kalır: "/" İngilizce'dir, "/tr/..." Türkçe'dir.
// "/en/..." istekleri çift içerik oluşmaması için prefix'siz karşılığına yönlendirilir.
//
// İlk ziyaret (locale çerezi yok) Türkiye IP'sinden geliyorsa /tr'ye yönlendirilir
// (Vercel'in x-vercel-ip-country header'ı); sonrasında çerez kazanır ve kullanıcının
// dil seçimi coğrafyadan bağımsız korunur. Botlar/craawler'lar çerezsiz ve TR dışı
// IP'lerden geldiği için kanonik EN içeriği görür; TR sürümü hreflang ile keşfedilir.
const LOCALES = ["tr", "en"];
const DEFAULT_LOCALE = "en";
const LOCALE_COOKIE = "locale";
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 yıl

function rememberLocale(response: NextResponse, request: NextRequest, locale: string) {
  if (request.cookies.get(LOCALE_COOKIE)?.value !== locale) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: LOCALE_COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Varsayılan dilin prefix'li halini kanonik (prefix'siz) URL'ye yönlendir
  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  // Desteklenen dil prefix'i varsa dokunma (ör. /tr/blog); ziyaret dili hatırlanır
  const hasLocalePrefix = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocalePrefix) {
    return rememberLocale(NextResponse.next(), request, "tr");
  }

  // İlk ziyaret + Türkiye IP'si → Türkçe sürüme geçici (307) yönlendirme.
  // Çerez varsa kullanıcı bilinçli bir tercih yapmıştır; coğrafya devre dışı kalır.
  const hasLocaleCookie = request.cookies.has(LOCALE_COOKIE);
  const country = request.headers.get("x-vercel-ip-country");
  if (!hasLocaleCookie && country === "TR") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/tr" : `/tr${pathname}`;
    return rememberLocale(NextResponse.redirect(url, 307), request, "tr");
  }

  // Prefix'siz her yol varsayılan dile rewrite edilir; URL kullanıcı için değişmez
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return rememberLocale(NextResponse.rewrite(url), request, DEFAULT_LOCALE);
}

export const config = {
  // Statik dosyalar, Next iç yolları, API ve metadata rotaları dışında her şey
  matcher: ["/((?!_next|api|sitemap\\.xml|robots\\.txt|icon\\.png|favicon\\.ico|.*\\..*).*)"],
};
