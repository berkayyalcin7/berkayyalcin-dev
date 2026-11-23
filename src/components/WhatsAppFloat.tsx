import { FaWhatsapp } from "react-icons/fa";
import { whatsappUrl } from "@/lib/site-config";

/** Tüm sayfalarda sol altta sabit WhatsApp butonu (sağ alt BackToTop'a ait). */
export default function WhatsAppFloat({ label, greeting }: { label: string; greeting: string }) {
  return (
    <a
      href={whatsappUrl(greeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-110 hover:shadow-xl sm:bottom-6 sm:left-6"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-ping [animation-duration:2.5s]"
      />
      <FaWhatsapp className="relative h-7 w-7" />
    </a>
  );
}
