import { NextResponse, type NextRequest } from "next/server";

// Numara yalnızca burada, sunucuda yaşar: HTML'e ve client JS'e hiç girmez,
// böylece sayfayı tarayan spam botları onu toplayamaz.
const WHATSAPP_NUMBER = "905385282234";
const MAX_TEXT_LENGTH = 500;

export function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get("text")?.slice(0, MAX_TEXT_LENGTH);
  const target = new URL(`https://wa.me/${WHATSAPP_NUMBER}`);
  if (text) target.searchParams.set("text", text);

  const response = NextResponse.redirect(target, 302);
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
