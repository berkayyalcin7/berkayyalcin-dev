import type { IconType } from "react-icons";
import { GiMeal, GiScissors, GiTooth, GiHouseKeys, GiCarWheel, GiSewingMachine } from "react-icons/gi";

/**
 * Örnek çalışmalar: Tekirdağ/Çorlu'daki tipik işletmeler için hayali demo siteler.
 * Her biri /demo/{slug} adresinde canlı çalışır; ekran görüntüleri
 * public/ornekler/{slug}.png altındadır (scripts/demo-screenshots.sh ile üretilir).
 */
export type Demo = {
  slug: string;
  sector: string;
  pitch: string;
  name: string;
  district: string;
  icon: IconType;
  serif: boolean;
  layout: "split" | "center";
  palette: {
    bg: string;
    surface: string;
    ink: string;
    muted: string;
    accent: string;
    onAccent: string;
    hero: string;
  };
  heroTitle: string;
  heroText: string;
  cta: string;
  nav: string[];
  services: { title: string; text: string }[];
  stats: { value: string; label: string }[];
  gallery: string[];
  hours: string;
};

export const demos: Demo[] = [
  {
    slug: "kofte-restoran",
    sector: "Restoran & Köfteci",
    pitch: "Menü, online rezervasyon ve Google Haritalar ile masalarınızı doldurun.",
    name: "Lezzet Durağı",
    district: "Süleymanpaşa, Tekirdağ",
    icon: GiMeal,
    serif: true,
    layout: "split",
    palette: {
      bg: "#fff8ef",
      surface: "#ffffff",
      ink: "#3b0d0c",
      muted: "#7c4a3a",
      accent: "#b91c1c",
      onAccent: "#ffffff",
      hero: "linear-gradient(135deg,#7f1d1d 0%,#b91c1c 55%,#f59e0b 100%)",
    },
    heroTitle: "Meşhur Tekirdağ köftesi, odun ateşinde.",
    heroText: "1987'den beri aynı tarif, aynı ustalık. Sahil yolunda aileniz için sıcak bir sofra.",
    cta: "Rezervasyon Yap",
    nav: ["Menü", "Hakkımızda", "Galeri", "İletişim"],
    services: [
      { title: "Tekirdağ Köftesi", text: "Özel baharat karışımı, közde biber ve piyaz ile." },
      { title: "Paket Servis", text: "Süleymanpaşa geneline 30 dakikada sıcak teslim." },
      { title: "Toplu Yemek", text: "Düğün, nişan ve şirket organizasyonlarına özel menü." },
    ],
    stats: [
      { value: "37", label: "yıllık tarif" },
      { value: "4.8★", label: "Google puanı" },
      { value: "120", label: "kişilik salon" },
    ],
    gallery: ["Köfte tabağı", "Salon", "Ocakbaşı", "Tatlılar"],
    hours: "Her gün 11:00 – 23:00",
  },
  {
    slug: "kuafor-guzellik",
    sector: "Kuaför & Güzellik",
    pitch: "Online randevu, fiyat listesi ve Instagram galerisiyle müşteri çekin.",
    name: "Saç Atölyesi",
    district: "Çerkezköy, Tekirdağ",
    icon: GiScissors,
    serif: true,
    layout: "center",
    palette: {
      bg: "#140b12",
      surface: "#21121d",
      ink: "#fdf2f8",
      muted: "#d8b4c8",
      accent: "#f472b6",
      onAccent: "#1a0612",
      hero: "radial-gradient(circle at 30% 20%,#be185d 0%,transparent 45%),radial-gradient(circle at 80% 70%,#7c3aed 0%,transparent 45%),#140b12",
    },
    heroTitle: "Saçınız için en iyi gün, bugün.",
    heroText: "Kesim, boya, keratin ve gelin başı. Çerkezköy'ün merkezinde, randevunuzu 30 saniyede alın.",
    cta: "Online Randevu",
    nav: ["Hizmetler", "Fiyatlar", "Ekibimiz", "Randevu"],
    services: [
      { title: "Kesim & Fön", text: "Yüz hatlarınıza uygun modern kesimler." },
      { title: "Renk & Balyaj", text: "Saç sağlığını koruyan premium boyalar." },
      { title: "Gelin Başı", text: "Prova dahil özel gün paketleri." },
    ],
    stats: [
      { value: "6", label: "uzman stilist" },
      { value: "2.400+", label: "mutlu müşteri" },
      { value: "4.9★", label: "Google puanı" },
    ],
    gallery: ["Balyaj", "Gelin başı", "Kesim", "Salon"],
    hours: "Pzt – Cmt 09:00 – 20:00",
  },
  {
    slug: "dis-klinigi",
    sector: "Diş Kliniği & Sağlık",
    pitch: "Güven veren kurumsal görünüm, doktor profilleri ve randevu formu.",
    name: "Gülüş Diş Kliniği",
    district: "Çorlu, Tekirdağ",
    icon: GiTooth,
    serif: false,
    layout: "split",
    palette: {
      bg: "#f0fdfa",
      surface: "#ffffff",
      ink: "#042f2e",
      muted: "#3f6b68",
      accent: "#0d9488",
      onAccent: "#ffffff",
      hero: "linear-gradient(135deg,#99f6e4 0%,#5eead4 40%,#38bdf8 100%)",
    },
    heroTitle: "Çorlu'da korkusuz diş tedavisi.",
    heroText: "İmplant, ortodonti ve estetik diş hekimliği. Dijital röntgen ve sedasyon imkânıyla konforlu tedavi.",
    cta: "Randevu Al",
    nav: ["Tedaviler", "Hekimlerimiz", "Klinik", "İletişim"],
    services: [
      { title: "İmplant", text: "Tek seansta geçici diş ile ömürlük çözüm." },
      { title: "Şeffaf Plak", text: "Telsiz ortodonti, görünmez tedavi." },
      { title: "Diş Beyazlatma", text: "1 saatte 4 tona kadar beyazlık." },
    ],
    stats: [
      { value: "12", label: "yıllık deneyim" },
      { value: "5", label: "uzman hekim" },
      { value: "%100", label: "steril ortam" },
    ],
    gallery: ["Muayene odası", "Dijital röntgen", "Bekleme salonu", "Ekip"],
    hours: "Pzt – Cmt 09:00 – 19:00",
  },
  {
    slug: "emlak",
    sector: "Emlak Ofisi",
    pitch: "İlan listeleme, filtreleme ve WhatsApp'tan hızlı iletişim.",
    name: "Sahil Emlak",
    district: "Marmaraereğlisi, Tekirdağ",
    icon: GiHouseKeys,
    serif: true,
    layout: "split",
    palette: {
      bg: "#0b1324",
      surface: "#111c33",
      ink: "#f8fafc",
      muted: "#a5b4cf",
      accent: "#d4a24c",
      onAccent: "#0b1324",
      hero: "linear-gradient(160deg,#0b1324 0%,#1e3a5f 60%,#d4a24c 140%)",
    },
    heroTitle: "Denize sıfır yaşam, Trakya'nın incisinde.",
    heroText: "Satılık ve kiralık yazlık, daire ve arsalar. 20 yıllık bölge tecrübesiyle doğru yatırım.",
    cta: "İlanları Gör",
    nav: ["Satılık", "Kiralık", "Arsa", "İletişim"],
    services: [
      { title: "Satılık Yazlık", text: "Sitelerde havuzlu, denize yürüme mesafesinde." },
      { title: "Ekspertiz", text: "Ücretsiz değerleme ve tapu danışmanlığı." },
      { title: "Kiralık Yönetimi", text: "Kiracı bulma, sözleşme ve tahsilat takibi." },
    ],
    stats: [
      { value: "340+", label: "aktif ilan" },
      { value: "20", label: "yıllık tecrübe" },
      { value: "1.200", label: "satılan mülk" },
    ],
    gallery: ["Deniz manzaralı villa", "Site havuzu", "3+1 daire", "Arsa"],
    hours: "Her gün 09:00 – 19:00",
  },
  {
    slug: "oto-servis",
    sector: "Oto Servis & Lastik",
    pitch: "Hizmet listesi, anında fiyat teklifi ve konum ile müşteri kazanın.",
    name: "Usta Oto Servis",
    district: "Ergene, Tekirdağ",
    icon: GiCarWheel,
    serif: false,
    layout: "center",
    palette: {
      bg: "#0a0a0a",
      surface: "#171717",
      ink: "#fafafa",
      muted: "#a3a3a3",
      accent: "#facc15",
      onAccent: "#0a0a0a",
      hero: "repeating-linear-gradient(135deg,#171717 0 24px,#0a0a0a 24px 48px)",
    },
    heroTitle: "Aracınız emin ellerde.",
    heroText: "Periyodik bakım, mekanik, lastik ve kaporta. Çorlu – Ergene yolu üzerinde, aynı gün teslim.",
    cta: "Fiyat Teklifi Al",
    nav: ["Hizmetler", "Lastik", "Kampanyalar", "İletişim"],
    services: [
      { title: "Periyodik Bakım", text: "Tüm marka binek ve hafif ticari araçlar." },
      { title: "Lastik Oteli", text: "Mevsimlik lastik saklama ve değişim." },
      { title: "Arıza Tespit", text: "Bilgisayarlı diagnostik, şeffaf fiyat." },
    ],
    stats: [
      { value: "15", label: "yıllık usta" },
      { value: "8", label: "lift kapasitesi" },
      { value: "1 gün", label: "ortalama teslim" },
    ],
    gallery: ["Atölye", "Lastik oteli", "Diagnostik", "Müşteri salonu"],
    hours: "Pzt – Cmt 08:00 – 19:00",
  },
  {
    slug: "tekstil-fabrika",
    sector: "Sanayi & Fabrika (OSB)",
    pitch: "Çok dilli kurumsal site: ihracat müşterilerine üretim gücünüzü gösterin.",
    name: "Trakya Tekstil",
    district: "Çorlu OSB, Tekirdağ",
    icon: GiSewingMachine,
    serif: false,
    layout: "split",
    palette: {
      bg: "#f8fafc",
      surface: "#ffffff",
      ink: "#0f172a",
      muted: "#475569",
      accent: "#2563eb",
      onAccent: "#ffffff",
      hero: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 50%,#06b6d4 100%)",
    },
    heroTitle: "Avrupa'ya kumaş üreten Çorlu fabrikası.",
    heroText: "Örme ve dokuma kumaşta 25 yıl. OEKO-TEX sertifikalı üretim, 18 ülkeye ihracat.",
    cta: "Teklif İsteyin",
    nav: ["Kurumsal", "Üretim", "Sertifikalar", "EN | DE"],
    services: [
      { title: "Örme Kumaş", text: "Süprem, ribana, interlok — aylık 900 ton." },
      { title: "Boyahane", text: "Reaktif ve dispers boyama, laboratuvar onaylı." },
      { title: "Fason Üretim", text: "Markalara özel numune ve seri üretim." },
    ],
    stats: [
      { value: "25", label: "yıllık üretim" },
      { value: "18", label: "ihracat ülkesi" },
      { value: "450", label: "çalışan" },
    ],
    gallery: ["Örme hattı", "Boyahane", "Kalite kontrol", "Lojistik"],
    hours: "Pzt – Cuma 08:00 – 18:00",
  },
];

export const getDemo = (slug: string) => demos.find((demo) => demo.slug === slug);
