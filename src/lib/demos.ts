import type { IconType } from "react-icons";
import {
  GiMeal,
  GiScissors,
  GiTooth,
  GiHouseKeys,
  GiCarWheel,
  GiSewingMachine,
  GiStethoscope,
  GiScales,
} from "react-icons/gi";

/**
 * Örnek çalışmalar: Tekirdağ/Çorlu'daki tipik işletmeler için hayali demo siteler.
 * Her biri /demo/{slug} adresinde canlı çalışır; ekran görüntüleri
 * public/ornekler/{slug}.png altındadır (scripts/demo-screenshots.sh ile üretilir).
 *
 * Her demo kendi giriş düzenini (hero), yazı tiplerini ve sektöre özel bölüm
 * bloklarını seçer; böylece demolar tek bir şablonun renk varyasyonu gibi durmaz.
 */

export type FontKey = "fraunces" | "playfair" | "cormorant" | "dmserif" | "manrope" | "grotesk" | "lora" | "geist";

export type HeroVariant = "split" | "center" | "cards" | "search" | "bold" | "corporate" | "profile" | "editorial";

export type Block =
  | { type: "menu"; title: string; groups: { name: string; items: { name: string; desc?: string; price: string }[] }[] }
  | { type: "pricelist"; title: string; items: { name: string; note?: string; price: string }[] }
  | { type: "cards"; title: string; intro?: string; items: { title: string; text: string; tag?: string }[] }
  | { type: "numbered"; title: string; roman?: boolean; items: { title: string; text: string }[] }
  | { type: "team"; title: string; people: { name: string; role: string; bio: string }[] }
  | { type: "listings"; title: string; items: { title: string; place: string; price: string; tag: string; specs: string[] }[] }
  | { type: "slots"; title: string; note: string; days: { day: string; times: string[]; full?: string[] }[] }
  | { type: "quote"; text: string; author: string }
  | { type: "faq"; title: string; items: { q: string; a: string }[] }
  | { type: "articles"; title: string; items: { title: string; date: string; read: string }[] }
  | { type: "chips"; title: string; items: string[] }
  | { type: "banner"; title: string; text: string; cta: string }
  | { type: "stats" }
  | { type: "gallery" };

export type Demo = {
  slug: string;
  sector: string;
  pitch: string;
  name: string;
  district: string;
  icon: IconType;
  hero: HeroVariant;
  display: FontKey;
  body: FontKey;
  /** Köşe yuvarlaklığı: hukuk keskin, kuaför yumuşak vb. */
  radius: string;
  palette: {
    bg: string;
    surface: string;
    ink: string;
    muted: string;
    accent: string;
    onAccent: string;
    hero: string;
  };
  eyebrow: string;
  heroTitle: string;
  heroText: string;
  heroPoints: string[];
  cta: string;
  nav: string[];
  stats: { value: string; label: string }[];
  gallery: string[];
  hours: string;
  blocks: Block[];
  form?: { title: string; fields: string[] };
  disclaimer?: string;
};

export const demos: Demo[] = [
  {
    slug: "kofte-restoran",
    sector: "Restoran & Köfteci",
    pitch: "Fiyatlı menü, online rezervasyon ve Google Haritalar ile masalarınızı doldurun.",
    name: "Lezzet Durağı",
    district: "Süleymanpaşa, Tekirdağ",
    icon: GiMeal,
    hero: "split",
    display: "fraunces",
    body: "geist",
    radius: "1.75rem",
    palette: {
      bg: "#fff8ef",
      surface: "#ffffff",
      ink: "#3b0d0c",
      muted: "#7c4a3a",
      accent: "#b91c1c",
      onAccent: "#ffffff",
      hero: "linear-gradient(135deg,#7f1d1d 0%,#b91c1c 55%,#f59e0b 100%)",
    },
    eyebrow: "1987'den beri · Sahil yolu",
    heroTitle: "Meşhur Tekirdağ köftesi, odun ateşinde.",
    heroText: "Aynı tarif, aynı ustalık. Sahil yolunda aileniz için sıcak bir sofra; paket servis Süleymanpaşa geneline.",
    heroPoints: ["Odun ateşi", "Günlük taze kıyma", "Çocuk menüsü"],
    cta: "Rezervasyon Yap",
    nav: ["Menü", "Hakkımızda", "Organizasyon", "İletişim"],
    stats: [
      { value: "37", label: "yıllık tarif" },
      { value: "4.8★", label: "Google puanı" },
      { value: "120", label: "kişilik salon" },
    ],
    gallery: ["Köfte tabağı", "Salon", "Ocakbaşı", "Tatlılar"],
    hours: "Her gün 11:00 – 23:00",
    blocks: [
      {
        type: "menu",
        title: "Menü",
        groups: [
          {
            name: "Ocaktan",
            items: [
              { name: "Tekirdağ Köftesi", desc: "Közde biber, piyaz, pide", price: "₺320" },
              { name: "Kaşarlı Köfte", desc: "Erimiş Trakya kaşarı ile", price: "₺360" },
              { name: "Kuzu Şiş", desc: "Sumaklı soğan, lavaş", price: "₺420" },
              { name: "Yarım Porsiyon Köfte", desc: "Çocuklar için", price: "₺190" },
            ],
          },
          {
            name: "Yanına",
            items: [
              { name: "Piyaz", desc: "Tahinli, Trakya usulü", price: "₺90" },
              { name: "Çoban Salata", price: "₺80" },
              { name: "Ayran (köpüklü)", price: "₺45" },
              { name: "Peynir Helvası", desc: "Tekirdağ'ın meşhur tatlısı", price: "₺140" },
            ],
          },
        ],
      },
      {
        type: "quote",
        text: "Tekirdağ'a her gelişimizde ilk durağımız. Köfte de piyaz da tam olması gerektiği gibi.",
        author: "Google yorumu · Ayşe K.",
      },
      { type: "gallery" },
      {
        type: "banner",
        title: "Düğün, nişan ve şirket yemekleri",
        text: "120 kişilik salonumuzda size özel menü ve kapalı organizasyon.",
        cta: "Organizasyon Teklifi Al",
      },
    ],
  },
  {
    slug: "kuafor-guzellik",
    sector: "Kuaför & Güzellik",
    pitch: "Fiyat listesi, ekip tanıtımı ve saat seçmeli online randevu ile müşteri çekin.",
    name: "Saç Atölyesi",
    district: "Çerkezköy, Tekirdağ",
    icon: GiScissors,
    hero: "center",
    display: "cormorant",
    body: "manrope",
    radius: "2.5rem",
    palette: {
      bg: "#140b12",
      surface: "#21121d",
      ink: "#fdf2f8",
      muted: "#d8b4c8",
      accent: "#f472b6",
      onAccent: "#1a0612",
      hero: "radial-gradient(circle at 30% 20%,#be185d 0%,transparent 45%),radial-gradient(circle at 80% 70%,#7c3aed 0%,transparent 45%),#140b12",
    },
    eyebrow: "Çerkezköy · Saç & Güzellik Stüdyosu",
    heroTitle: "Saçınız için en güzel gün, bugün.",
    heroText: "Kesim, renk, keratin ve gelin başı. Randevunuzu 30 saniyede alın, beklemeden koltuğa oturun.",
    heroPoints: ["Balyaj", "Keratin", "Gelin Başı", "Kaş & Kirpik"],
    cta: "Online Randevu",
    nav: ["Hizmetler", "Fiyatlar", "Ekibimiz", "Randevu"],
    stats: [
      { value: "6", label: "uzman stilist" },
      { value: "2.400+", label: "mutlu müşteri" },
      { value: "4.9★", label: "Google puanı" },
    ],
    gallery: ["Balyaj", "Gelin başı", "Kesim", "Salon"],
    hours: "Pzt – Cmt 09:00 – 20:00",
    blocks: [
      {
        type: "pricelist",
        title: "Fiyat Listesi",
        items: [
          { name: "Kadın Kesim & Fön", note: "Yıkama dahil", price: "₺650" },
          { name: "Dip Boya", note: "Tek renk", price: "₺900" },
          { name: "Balyaj", note: "Uzunluğa göre", price: "₺2.400'den" },
          { name: "Keratin Bakım", note: "3 ay kalıcı", price: "₺1.800" },
          { name: "Gelin Başı", note: "Prova dahil", price: "₺3.500" },
          { name: "Kaş & Kirpik Lifting", price: "₺750" },
        ],
      },
      {
        type: "team",
        title: "Ekibimiz",
        people: [
          { name: "Nur Demir", role: "Kurucu · Renk Uzmanı", bio: "14 yıl, İstanbul ve Milano eğitimleri." },
          { name: "Ece Yıldız", role: "Gelin Saçı", bio: "Çerkezköy'de 600'ü aşkın gelin." },
          { name: "Can Arslan", role: "Kesim Stilisti", bio: "Modern kesim ve erkek bakım." },
        ],
      },
      { type: "gallery" },
      {
        type: "slots",
        title: "Bu hafta boş saatler",
        note: "Saat seçin, onay SMS ile gelsin.",
        days: [
          { day: "Sal 12", times: ["10:00", "11:30", "15:00", "17:30"], full: ["11:30"] },
          { day: "Çar 13", times: ["09:30", "13:00", "16:00", "18:00"], full: ["09:30", "16:00"] },
          { day: "Per 14", times: ["10:00", "12:30", "14:00", "19:00"] },
          { day: "Cum 15", times: ["11:00", "13:30", "17:00", "18:30"], full: ["17:00"] },
        ],
      },
    ],
  },
  {
    slug: "dis-klinigi",
    sector: "Diş Kliniği & Sağlık",
    pitch: "Güven veren kurumsal görünüm, tedavi süreci, hekim profilleri ve randevu formu.",
    name: "Gülüş Diş Kliniği",
    district: "Çorlu, Tekirdağ",
    icon: GiTooth,
    hero: "cards",
    display: "manrope",
    body: "manrope",
    radius: "1.5rem",
    palette: {
      bg: "#f0fdfa",
      surface: "#ffffff",
      ink: "#042f2e",
      muted: "#3f6b68",
      accent: "#0d9488",
      onAccent: "#ffffff",
      hero: "linear-gradient(135deg,#99f6e4 0%,#5eead4 40%,#38bdf8 100%)",
    },
    eyebrow: "Ağız ve Diş Sağlığı Polikliniği",
    heroTitle: "Çorlu'da konforlu diş tedavisi.",
    heroText: "İmplant, ortodonti ve estetik diş hekimliği. Dijital röntgen ve sedasyon imkânıyla, randevunuz tam saatinde.",
    heroPoints: ["Dijital röntgen", "Sedasyon", "Steril ortam"],
    cta: "Randevu Al",
    nav: ["Tedaviler", "Hekimlerimiz", "Süreç", "İletişim"],
    stats: [
      { value: "12", label: "yıllık deneyim" },
      { value: "5", label: "uzman hekim" },
      { value: "%100", label: "steril ortam" },
    ],
    gallery: ["Muayene odası", "Dijital röntgen", "Bekleme salonu", "Ekip"],
    hours: "Pzt – Cmt 09:00 – 19:00",
    blocks: [
      {
        type: "cards",
        title: "Tedaviler",
        intro: "Muayene sonrası size özel tedavi planı ve net süre bilgisi.",
        items: [
          { title: "İmplant", text: "Eksik dişler için kalıcı ve doğal görünümlü çözüm.", tag: "Cerrahi" },
          { title: "Şeffaf Plak", text: "Telsiz ortodonti; gün içinde fark edilmez.", tag: "Ortodonti" },
          { title: "Diş Beyazlatma", text: "Klinik ortamında, hassasiyet kontrollü.", tag: "Estetik" },
          { title: "Çocuk Diş Hekimliği", text: "Korkutmayan, oyunla desteklenen muayene.", tag: "Pedodonti" },
          { title: "Kanal Tedavisi", text: "Mikroskop destekli, tek ya da iki seans.", tag: "Endodonti" },
          { title: "Zirkonyum Kaplama", text: "Metal desteksiz, ışık geçirgen kaplamalar.", tag: "Protez" },
        ],
      },
      {
        type: "numbered",
        title: "Tedavi süreci",
        items: [
          { title: "Muayene & röntgen", text: "Dijital panoramik röntgen ile tam değerlendirme." },
          { title: "Tedavi planı", text: "Seçenekler, süre ve seans sayısı yazılı olarak." },
          { title: "Tedavi", text: "Randevunuz saatinde, konforlu ortamda." },
          { title: "Kontrol", text: "6 ayda bir hatırlatma ve ücretsiz kontrol." },
        ],
      },
      {
        type: "team",
        title: "Hekimlerimiz",
        people: [
          { name: "Dt. Selin Koç", role: "Ortodonti", bio: "Şeffaf plak ve çocuk ortodontisi." },
          { name: "Dt. Burak Er", role: "Ağız, Diş ve Çene Cerrahisi", bio: "İmplant ve gömülü diş operasyonları." },
          { name: "Dt. Deniz Ay", role: "Pedodonti", bio: "Çocuk hastalarda koruyucu tedavi." },
        ],
      },
      {
        type: "faq",
        title: "Sık sorulanlar",
        items: [
          { q: "İlk muayene ne kadar sürer?", a: "Röntgen dahil yaklaşık 30 dakika." },
          { q: "Hafta sonu açık mısınız?", a: "Cumartesi 09:00 – 15:00 arası randevulu çalışıyoruz." },
          { q: "Taksit imkânı var mı?", a: "Tüm kredi kartlarına taksit seçeneği sunuyoruz." },
        ],
      },
    ],
    form: { title: "Randevu talebi", fields: ["Ad Soyad", "Telefon", "Tedavi seçin", "Tercih ettiğiniz gün"] },
  },
  {
    slug: "emlak",
    sector: "Emlak Ofisi",
    pitch: "Filtreli ilan arama, ilan kartları ve WhatsApp'tan hızlı iletişim.",
    name: "Sahil Emlak",
    district: "Marmaraereğlisi, Tekirdağ",
    icon: GiHouseKeys,
    hero: "search",
    display: "dmserif",
    body: "geist",
    radius: "1rem",
    palette: {
      bg: "#0b1324",
      surface: "#111c33",
      ink: "#f8fafc",
      muted: "#a5b4cf",
      accent: "#d4a24c",
      onAccent: "#0b1324",
      hero: "linear-gradient(180deg,#0b1324 0%,#1e3a5f 45%,#c2410c 85%,#d4a24c 100%)",
    },
    eyebrow: "Marmaraereğlisi · Sultanköy · Yeniçiftlik",
    heroTitle: "Denize sıfır yaşam, Trakya'nın incisinde.",
    heroText: "Satılık ve kiralık yazlık, daire ve arsalar. 20 yıllık bölge tecrübesiyle doğru yatırım.",
    heroPoints: [],
    cta: "İlanları Gör",
    nav: ["Satılık", "Kiralık", "Arsa", "İletişim"],
    stats: [
      { value: "340+", label: "aktif ilan" },
      { value: "20", label: "yıllık tecrübe" },
      { value: "1.200", label: "satılan mülk" },
    ],
    gallery: ["Deniz manzaralı villa", "Site havuzu", "3+1 daire", "Arsa"],
    hours: "Her gün 09:00 – 19:00",
    blocks: [
      {
        type: "listings",
        title: "Öne çıkan ilanlar",
        items: [
          { title: "Denize sıfır 3+1 yazlık", place: "Sultanköy", price: "₺6.950.000", tag: "Satılık", specs: ["145 m²", "3+1", "Havuzlu site"] },
          { title: "Bahçeli müstakil villa", place: "Yeniçiftlik", price: "₺12.400.000", tag: "Satılık", specs: ["260 m²", "4+1", "620 m² arsa"] },
          { title: "Eşyalı 2+1 daire", place: "Marmaraereğlisi Merkez", price: "₺22.000 / ay", tag: "Kiralık", specs: ["95 m²", "2+1", "Denize 200 m"] },
        ],
      },
      { type: "stats" },
      {
        type: "chips",
        title: "Hizmet verdiğimiz bölgeler",
        items: ["Marmaraereğlisi", "Sultanköy", "Yeniçiftlik", "Kumbağ", "Barbaros", "Süleymanpaşa", "Çorlu", "Silivri"],
      },
      {
        type: "quote",
        text: "İstanbul'dan yazlık ararken tüm süreci uzaktan, video turlarla yönettiler. Tapuya kadar yanımızdaydılar.",
        author: "Müşteri yorumu · Murat & Elif T.",
      },
    ],
  },
  {
    slug: "oto-servis",
    sector: "Oto Servis & Lastik",
    pitch: "Fiyatlı hizmet listesi, kampanya alanı ve konum ile müşteri kazanın.",
    name: "Usta Oto Servis",
    district: "Ergene, Tekirdağ",
    icon: GiCarWheel,
    hero: "bold",
    display: "grotesk",
    body: "grotesk",
    radius: "0.375rem",
    palette: {
      bg: "#0a0a0a",
      surface: "#171717",
      ink: "#fafafa",
      muted: "#a3a3a3",
      accent: "#facc15",
      onAccent: "#0a0a0a",
      hero: "repeating-linear-gradient(135deg,#facc15 0 22px,#0a0a0a 22px 44px)",
    },
    eyebrow: "Çorlu – Ergene yolu üzeri",
    heroTitle: "Aracınız emin ellerde.",
    heroText: "Periyodik bakım, mekanik, lastik ve kaporta. Tüm marka binek ve hafif ticari araçlar; çoğu işlem aynı gün teslim.",
    heroPoints: ["Renault", "Fiat", "Ford", "Volkswagen", "Toyota", "Hyundai"],
    cta: "Fiyat Teklifi Al",
    nav: ["Hizmetler", "Lastik", "Kampanyalar", "İletişim"],
    stats: [
      { value: "15", label: "yıllık usta" },
      { value: "8", label: "lift kapasitesi" },
      { value: "1 gün", label: "ortalama teslim" },
    ],
    gallery: ["Atölye", "Lastik oteli", "Diagnostik", "Müşteri salonu"],
    hours: "Pzt – Cmt 08:00 – 19:00",
    blocks: [
      {
        type: "pricelist",
        title: "Hizmetler & başlangıç fiyatları",
        items: [
          { name: "Periyodik Bakım", note: "Yağ + 3 filtre + işçilik", price: "₺2.950'den" },
          { name: "Fren Balatası", note: "Ön takım", price: "₺1.450'den" },
          { name: "Lastik Değişimi & Balans", note: "4 teker", price: "₺600" },
          { name: "Arıza Tespit", note: "Bilgisayarlı", price: "₺400" },
          { name: "Klima Gazı", note: "Kaçak kontrolü dahil", price: "₺1.100" },
          { name: "Lastik Oteli", note: "Sezonluk", price: "₺750" },
        ],
      },
      {
        type: "banner",
        title: "Kış lastiği kampanyası",
        text: "Kış lastiği alana sezonluk lastik oteli ve rot-balans bizden.",
        cta: "Kampanyayı Sor",
      },
      {
        type: "numbered",
        title: "Nasıl çalışıyoruz?",
        items: [
          { title: "Teklif", text: "WhatsApp'tan plaka ve şikâyeti yazın, fiyat gelsin." },
          { title: "Teslim alma", text: "İsterseniz aracınızı adresinizden alıyoruz." },
          { title: "Onay", text: "Ek iş çıkarsa fotoğraflı onay olmadan yapılmaz." },
          { title: "Teslim", text: "Yapılan işlemler faturalı ve garantili." },
        ],
      },
    ],
  },
  {
    slug: "tekstil-fabrika",
    sector: "Sanayi & Fabrika (OSB)",
    pitch: "Çok dilli kurumsal site: ihracat müşterilerine üretim gücünüzü ve sertifikalarınızı gösterin.",
    name: "Trakya Tekstil",
    district: "Çorlu OSB, Tekirdağ",
    icon: GiSewingMachine,
    hero: "corporate",
    display: "grotesk",
    body: "geist",
    radius: "0.75rem",
    palette: {
      bg: "#f8fafc",
      surface: "#ffffff",
      ink: "#0f172a",
      muted: "#475569",
      accent: "#2563eb",
      onAccent: "#ffffff",
      hero: "linear-gradient(135deg,#0b1e4a 0%,#1d4ed8 60%,#0891b2 100%)",
    },
    eyebrow: "1999'dan beri · Çorlu Organize Sanayi Bölgesi",
    heroTitle: "Avrupa'ya kumaş üreten Çorlu fabrikası.",
    heroText: "Örme ve dokuma kumaşta 25 yıl. Sertifikalı üretim, laboratuvar onaylı boyahane, 18 ülkeye ihracat.",
    heroPoints: ["OEKO-TEX", "ISO 9001", "GOTS", "amfori BSCI"],
    cta: "Teklif İsteyin",
    nav: ["Kurumsal", "Üretim", "Sertifikalar", "EN | DE"],
    stats: [
      { value: "25", label: "yıllık üretim" },
      { value: "18", label: "ihracat ülkesi" },
      { value: "450", label: "çalışan" },
      { value: "900 t", label: "aylık kapasite" },
    ],
    gallery: ["Örme hattı", "Boyahane", "Kalite kontrol", "Lojistik"],
    hours: "Pzt – Cuma 08:00 – 18:00",
    blocks: [
      {
        type: "cards",
        title: "Üretim kabiliyetleri",
        items: [
          { title: "Örme Kumaş", text: "Süprem, ribana, interlok, scuba — 42 yuvarlak örme makinesi.", tag: "42 makine" },
          { title: "Boyahane", text: "Reaktif ve dispers boyama, renk eşleştirme laboratuvarı.", tag: "Lab onaylı" },
          { title: "Apre & Bitim", text: "Şardon, şeker, kalandır ve fonksiyonel apreler.", tag: "Fonksiyonel" },
        ],
      },
      {
        type: "numbered",
        title: "Siparişten sevkiyata",
        items: [
          { title: "Numune", text: "5 iş gününde lab-dip ve numune." },
          { title: "Onay", text: "Renk ve test raporlarıyla birlikte." },
          { title: "Seri üretim", text: "Barkodlu takip, parti bazlı kalite kontrol." },
          { title: "Sevkiyat", text: "Gümrüklü depo, Avrupa'ya 4 günde." },
        ],
      },
      {
        type: "chips",
        title: "İhracat yaptığımız ülkeler",
        items: ["Almanya", "Hollanda", "Fransa", "İtalya", "İspanya", "Polonya", "Danimarka", "Birleşik Krallık", "İsveç", "Belçika"],
      },
    ],
    form: { title: "Teklif talebi (RFQ)", fields: ["Firma", "E-posta", "Kumaş türü", "Aylık miktar (kg)"] },
  },
  {
    slug: "doktor-muayenehane",
    sector: "Doktor Muayenehanesi",
    pitch: "Hekim profili, ilgi alanları, randevu takvimi ve sağlık yazıları — tabip reklam kurallarına uygun.",
    name: "Uzm. Dr. Elif Aydın",
    district: "Çorlu, Tekirdağ",
    icon: GiStethoscope,
    hero: "profile",
    display: "lora",
    body: "manrope",
    radius: "1.25rem",
    palette: {
      bg: "#f5f7fb",
      surface: "#ffffff",
      ink: "#14213d",
      muted: "#56627a",
      accent: "#3b5bdb",
      onAccent: "#ffffff",
      hero: "linear-gradient(160deg,#dbe4ff 0%,#c5d3ff 45%,#e7f5ff 100%)",
    },
    eyebrow: "İç Hastalıkları (Dahiliye) Uzmanı",
    heroTitle: "Uzm. Dr. Elif Aydın",
    heroText: "Diyabet, tiroid hastalıkları, hipertansiyon ve check-up. Muayenehanede randevulu hasta kabulü.",
    heroPoints: [
      "İstanbul Üniversitesi Cerrahpaşa Tıp Fakültesi",
      "İç Hastalıkları uzmanlığı · 2013",
      "Türk Endokrinoloji ve Metabolizma Derneği üyesi",
    ],
    cta: "Randevu Al",
    nav: ["Hakkımda", "İlgi Alanları", "Randevu", "Sağlık Yazıları"],
    stats: [
      { value: "12", label: "yıllık uzmanlık" },
      { value: "Pzt–Cmt", label: "randevulu kabul" },
      { value: "SGK", label: "özel sağlık sigortaları" },
    ],
    gallery: [],
    hours: "Pzt – Cuma 13:00 – 19:00 · Cmt 10:00 – 14:00",
    blocks: [
      {
        type: "cards",
        title: "İlgi alanları",
        items: [
          { title: "Diyabet", text: "Tip 2 diyabet takibi, insülin ayarı ve beslenme planlaması." },
          { title: "Tiroid Hastalıkları", text: "Hipotiroidi, hipertiroidi ve tiroid nodülü takibi." },
          { title: "Hipertansiyon", text: "Tansiyon takibi, ilaç düzenlemesi ve risk değerlendirmesi." },
          { title: "Check-up", text: "Yaşa ve risk faktörlerine göre kişiye özel tarama." },
        ],
      },
      {
        type: "slots",
        title: "Randevu takvimi",
        note: "Muayene yaklaşık 20 dakikadır. Lütfen önceki tahlillerinizi getiriniz.",
        days: [
          { day: "Pzt 11", times: ["13:00", "13:20", "14:40", "16:00", "17:20"], full: ["13:00", "13:20"] },
          { day: "Sal 12", times: ["13:40", "14:00", "15:20", "18:00"], full: ["15:20"] },
          { day: "Çar 13", times: ["13:00", "14:20", "16:40", "18:20"] },
          { day: "Per 14", times: ["13:20", "15:00", "17:00"], full: ["13:20", "17:00"] },
          { day: "Cmt 16", times: ["10:00", "10:20", "11:40", "13:00"] },
        ],
      },
      {
        type: "articles",
        title: "Sağlık yazıları",
        items: [
          { title: "HbA1c nedir, kaç olmalı?", date: "4 Kasım 2026", read: "4 dk" },
          { title: "Tiroid tahlilinde TSH yüksekliği ne anlama gelir?", date: "18 Ekim 2026", read: "6 dk" },
          { title: "Evde tansiyon nasıl doğru ölçülür?", date: "2 Ekim 2026", read: "3 dk" },
        ],
      },
      {
        type: "faq",
        title: "Hasta bilgilendirme",
        items: [
          { q: "Muayeneye gelirken aç mı olmalıyım?", a: "Tahlil yapılacaksa 8–10 saat açlık önerilir; randevu sırasında bilgilendirilirsiniz." },
          { q: "Özel sağlık sigortası geçerli mi?", a: "Anlaşmalı sigorta listesi için muayenehanemizi arayabilirsiniz." },
        ],
      },
    ],
    form: { title: "Randevu talebi", fields: ["Ad Soyad", "Telefon", "Doğum yılı", "Şikâyetiniz (kısaca)"] },
    disclaimer: "Bu sitedeki bilgiler yalnızca bilgilendirme amaçlıdır; tanı ve tedavi için hekime başvurunuz.",
  },
  {
    slug: "hukuk-burosu",
    sector: "Hukuk Bürosu",
    pitch: "Çalışma alanları, avukat profili ve hukuki bilgi notları — TBB reklam yasağına uygun sade dil.",
    name: "Kaya Hukuk Bürosu",
    district: "Süleymanpaşa, Tekirdağ",
    icon: GiScales,
    hero: "editorial",
    display: "playfair",
    body: "geist",
    radius: "0",
    palette: {
      bg: "#f6f3ec",
      surface: "#fffdf8",
      ink: "#1b1a17",
      muted: "#5f5a50",
      accent: "#1f3d2b",
      onAccent: "#f6f3ec",
      hero: "linear-gradient(135deg,#1f3d2b 0%,#2f5640 100%)",
    },
    eyebrow: "Av. Mert Kaya · Tekirdağ Barosu",
    heroTitle: "Hukuki süreçlerinizde açık, ölçülü ve zamanında.",
    heroText: "Tekirdağ Adliyesi'ne 5 dakika mesafedeki büromuzda; aile, iş, gayrimenkul ve ticaret hukuku alanlarında danışmanlık ve dava takibi.",
    heroPoints: ["Adliyeye 5 dakika", "Yüz yüze & çevrim içi görüşme", "Türkçe · English", "Randevu ile kabul"],
    cta: "Görüşme Talebi",
    nav: ["Büro", "Çalışma Alanları", "Makaleler", "İletişim"],
    stats: [],
    gallery: [],
    hours: "Pzt – Cuma 09:00 – 18:00 · randevu ile",
    blocks: [
      {
        type: "numbered",
        title: "Çalışma alanları",
        roman: true,
        items: [
          { title: "Aile Hukuku", text: "Anlaşmalı ve çekişmeli boşanma, velayet, nafaka ve mal rejimi davaları." },
          { title: "İş Hukuku", text: "Kıdem ve ihbar tazminatı, işe iade, iş kazası; işveren danışmanlığı." },
          { title: "Gayrimenkul Hukuku", text: "Tapu iptal ve tescil, ortaklığın giderilmesi, kira ve tahliye uyuşmazlıkları." },
          { title: "Ticaret Hukuku", text: "Şirket kuruluşu, sözleşmeler, alacak takibi ve icra işlemleri." },
        ],
      },
      {
        type: "team",
        title: "Büro",
        people: [
          { name: "Av. Mert Kaya", role: "Kurucu Avukat", bio: "Marmara Üniversitesi Hukuk Fakültesi · Tekirdağ Barosu, 2011." },
          { name: "Av. Zeynep Er", role: "Avukat", bio: "Galatasaray Üniversitesi Hukuk Fakültesi · İş ve aile hukuku." },
          { name: "Stj. Av. Kerem Usta", role: "Stajyer Avukat", bio: "Dava dosyası ve icra takibi." },
        ],
      },
      {
        type: "articles",
        title: "Hukuki bilgi notları",
        items: [
          { title: "Anlaşmalı boşanmada protokol nasıl hazırlanır?", date: "12 Kasım 2026", read: "7 dk" },
          { title: "Kıdem tazminatı hesaplanırken nelere dikkat edilmeli?", date: "28 Ekim 2026", read: "5 dk" },
          { title: "Ortaklığın giderilmesi davası ne kadar sürer?", date: "9 Ekim 2026", read: "6 dk" },
        ],
      },
      {
        type: "faq",
        title: "Sık sorulan sorular",
        items: [
          { q: "İlk görüşme nasıl yapılır?", a: "Randevu ile büromuzda ya da çevrim içi görüşme yapılabilir." },
          { q: "Vekâlet ücreti nasıl belirlenir?", a: "Tekirdağ Barosu tavsiye niteliğindeki ücret tarifesi esas alınarak yazılı sözleşme ile belirlenir." },
        ],
      },
    ],
    form: { title: "Görüşme talebi", fields: ["Ad Soyad", "Telefon", "Konu", "Kısa açıklama"] },
    disclaimer:
      "Bu site Avukatlık Kanunu ve Türkiye Barolar Birliği Meslek Kuralları uyarınca yalnızca bilgilendirme amaçlıdır; reklam niteliği taşımaz.",
  },
];

export const getDemo = (slug: string) => demos.find((demo) => demo.slug === slug);
