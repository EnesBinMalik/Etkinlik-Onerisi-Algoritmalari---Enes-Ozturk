export interface ActivityInfo {
  id: 'kayak' | 'sinema' | 'piknik' | 'yuzme';
  title: string;
  conditionFormula: string;
  rangeDisplay: string;
  minTemp?: number;
  maxTemp?: number;
  description: string;
  iconName: string;
  category: string;
  colorScheme: {
    bgGradient: string;
    cardBorder: string;
    badgeBg: string;
    badgeText: string;
    accent: string;
    glow: string;
  };
  tips: string[];
  equipment: string[];
  vibeText: string;
}

export const ACTIVITIES: Record<string, ActivityInfo> = {
  kayak: {
    id: 'kayak',
    title: 'Kayak Yapmak',
    conditionFormula: 'Sıcaklık < 5°C',
    rangeDisplay: '-∞ ile 4.9°C arası',
    maxTemp: 4.99,
    description: 'Hava oldukça soğuk ve karlı zemin koşulları için ideal! Uludağ, Palandöken veya Erciyes pistlerine çıkıp karın ve kayak sporunun tadını çıkarma vakti.',
    iconName: 'Snowflake',
    category: 'Kış & Doğa Sporu',
    colorScheme: {
      bgGradient: 'from-cyan-950/60 via-slate-900 to-blue-950/50',
      cardBorder: 'border-cyan-500/30 hover:border-cyan-400',
      badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
      badgeText: 'text-cyan-300',
      accent: 'cyan',
      glow: 'shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    },
    tips: [
      'Termal içlik, rüzgar geçirmez kayak montu ve eldiven kullanın.',
      'Soğuk rüzgara karşı kayak gözlüğü ve güneş koruyucu sürün.',
      'Pist molalarında sıcak çikolata veya sahlep içerek vücut ısınızı koruyun.',
    ],
    equipment: ['Kayak Takımı / Snowboard', 'Termal Kar Kıyafeti', 'Kask & Kar Gözlüğü', 'Kar Eldiveni'],
    vibeText: 'Bembeyaz kar tepeleri, tertemiz dağ havası ve yüksek adrenalin.',
  },
  sinema: {
    id: 'sinema',
    title: 'Sinemaya Gitmek',
    conditionFormula: '5°C ≤ Sıcaklık ≤ 15°C',
    rangeDisplay: '5°C ile 15°C arası',
    minTemp: 5,
    maxTemp: 15,
    description: 'Hava serin ve genellikle kapalı ya da yağmurlu. Dışarıda uzun süre kalmak yerine sıcacık bir sinema salonunda patlamış mısır eşliğinde vizyondaki harika filmleri izlemek en keyifli tercih.',
    iconName: 'Film',
    category: 'Kültür, Sanat & Eğlence',
    colorScheme: {
      bgGradient: 'from-purple-950/60 via-slate-900 to-indigo-950/50',
      cardBorder: 'border-purple-500/30 hover:border-purple-400',
      badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
      badgeText: 'text-purple-300',
      accent: 'purple',
      glow: 'shadow-[0_0_30px_rgba(168,85,247,0.15)]',
    },
    tips: [
      'Serin hava için hafif bir trençkot veya hırka tercih edin.',
      'Vizyondaki popüler filmler için önceden bilet ayırtın.',
      'Film sonrası sıcak bir kahve sohbetiyle günü taçlandırın.',
    ],
    equipment: ['Sinema Bileti', 'Patlamış Mısır & İçecek', 'Mevsimlik Ceket / Hırka', 'Sevdiklerinizle Sohbet'],
    vibeText: 'Karanlık salon, dev perde, büyüleyici ses sistemi ve taze patlamış mısır kokusu.',
  },
  piknik: {
    id: 'piknik',
    title: 'Piknik Yapmak',
    conditionFormula: '15°C < Sıcaklık ≤ 25°C',
    rangeDisplay: '15.1°C ile 25°C arası',
    minTemp: 15.01,
    maxTemp: 25,
    description: 'Hava ne üşütecek kadar soğuk ne de bunaltacak kadar sıcak; tam bahar ılıklığı! Doğanın uyanışını yeşil çimler üzerinde bir piknik örtüsü, lezzetli atıştırmalıklar ve açık hava oyunlarıyla kutlayın.',
    iconName: 'Trees',
    category: 'Açık Hava & Sosyal Etkinlik',
    colorScheme: {
      bgGradient: 'from-emerald-950/60 via-slate-900 to-teal-950/50',
      cardBorder: 'border-emerald-500/30 hover:border-emerald-400',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
      badgeText: 'text-emerald-300',
      accent: 'emerald',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    },
    tips: [
      'Su geçirmez tabanlı bir piknik örtüsü yanınıza alın.',
      'Güneş ışığına karşı şapka veya hafif güneş gözlüğü bulundurun.',
      'Frizbi, voleybol topu veya kutu oyunları ile keyifli vakit geçirin.',
    ],
    equipment: ['Piknik Sepeti & Termos', 'Piknik Örtüsü', 'Frizbi / Top', 'Müzik Çalar & Kitap'],
    vibeText: 'Ilık esen bahar rüzgarı, kuş cıvıltıları, yemyeşil doğa ve hafif serin gölgeler.',
  },
  yuzme: {
    id: 'yuzme',
    title: 'Yüzmeye Gitmek',
    conditionFormula: 'Sıcaklık > 25°C',
    rangeDisplay: '25.1°C ve üzeri',
    minTemp: 25.01,
    description: 'Hava harika bir yaz sıcaklığı sunuyor! Güneşin tadını çıkarmak, ferahlamak ve serin sulara atlamak için plaja, koya veya yüzme havuzuna koşma vakti.',
    iconName: 'Waves',
    category: 'Yaz Sporu & Deniz/Havuz',
    colorScheme: {
      bgGradient: 'from-amber-950/60 via-slate-900 to-orange-950/50',
      cardBorder: 'border-amber-500/30 hover:border-amber-400',
      badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
      badgeText: 'text-amber-300',
      accent: 'amber',
      glow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    },
    tips: [
      'Yüksek faktörlü güneş koruyucu kreminizi 2 saatte bir yenileyin.',
      'Güneş çarpmasına karşı bol soğuk su tüketin ve şapka takın.',
      'Günün en dik güneş saatlerinde (12:00 - 15:00) gölgede dinlenin.',
    ],
    equipment: ['Mayo & Plaj Havlusu', 'Yüzme Gözlüğü / Şnorkel', 'Güneş Kremi (SPF 50+)', 'Güneş Gözlüğü & Şapka'],
    vibeText: 'Turkuaz berrak deniz, sıcak kumsal, buz gibi limonata ve serinletici dalgalar.',
  },
};
