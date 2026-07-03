export const siteConfig = {
  name: "Berkay Yalçın",
  title: "Berkay Yalçın - Blog",
  description:
    "Yazılım geliştirici Berkay Yalçın'ın kişisel portfolyo ve blog sitesi. Projeler, yazılar ve deneyimler.",
  url: "https://berkayyalcin.dev",
  role: "Bilgisayar Mühendisi & .NET Full Stack Developer",
  location: "Türkiye",
  social: {
    github: "https://github.com/berkayyalcin7",
    linkedin: "https://tr.linkedin.com/in/berkay-yalçın-59289b145",
    emailAddress: "berkayyalcin7@gmail.com",
    email: "mailto:berkayyalcin7@gmail.com",
  },
  cvUrl: "https://dyqriqtgitmyiytrlwyi.supabase.co/storage/v1/object/public/cv/cv.pdf",
  nav: [
    { label: "Hakkımda", href: "/#hakkimda" },
    { label: "Projeler", href: "/#projeler" },
    { label: "Araçlar", href: "/araclar" },
    { label: "Blog", href: "/#blog" },
    { label: "İletişim", href: "/#iletisim" },
  ],
  experience: [
    {
      period: `2021 - ${new Date().getFullYear()}`,
      company: "YKK Türkiye A.Ş",
      role: "Yazılım Geliştirme Uzmanı",
      points: [
        "Kurumsal ERP ve portal çözümlerinin .NET backend ve modern frontend teknolojileriyle geliştirilmesi.",
        "Mikroservis mimarileri, entegrasyonlar, web servislerinin optimizasyonu ve yönetimi.",
        "İş süreçlerinin dijitalleştirilmesi ve performans iyileştirme çalışmaları.",
      ],
    },
    {
      period: "2021 - 2021",
      company: "Metamin Mümessillik A.Ş",
      role: "Yazılım Geliştirme Uzmanı",
      points: [
        "Şirket içi operasyonel uygulamaların, servislerin ve veritabanı yapılarının tasarlanması ve kodlanması.",
        "API entegrasyonları ve iş birimlerinin raporlama taleplerinin karşılanması.",
      ],
    },
    {
      period: "2020 - 2021",
      company: "Türk Hava Kuvvetleri",
      role: "Hava Mühendis Teğmen",
      points: [
        "Bilişim altyapılarının yönetimi ve askeri bilgi işlem ihtiyaçlarına yönelik yazılımların geliştirilmesi/idame ettirilmesi.",
      ],
    },
    {
      period: "2018 - 2020",
      company: "Doğruyer Reklam Bilişim A.Ş",
      role: "Yazılım Geliştirme Uzmanı",
      points: [
        "Web tabanlı projelerin, özel otomasyon sistemlerinin ve e-ticaret altyapılarının sıfırdan geliştirilmesi.",
        "Ön yüz ve arka yüz bileşenlerinin entegre edilmesi, veri tabanı sorgu optimizasyonları.",
      ],
    },
    {
      period: "2014 - 2018",
      company: "Trakya Üniversitesi",
      role: "Bilgisayar Mühendisliği Mezunu",
      points: [
        "Temel algoritma, veri yapıları, yazılım mühendisliği metodolojileri eğitimi ve bitirme projeleri.",
      ],
    },
  ],
} as const;
