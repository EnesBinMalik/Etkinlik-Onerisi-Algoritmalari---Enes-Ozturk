export type ActivityId = 'kayak' | 'sinema' | 'piknik' | 'yuzme';

export interface TraceStep {
  stepNumber: number;
  lineLabel: string;
  conditionCode: string;
  evaluation: string;
  result: boolean | 'entered' | 'skipped' | 'returned';
  comment: string;
}

export interface SolutionMethod {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  paradigm: string;
  badgeColor: string;
  efficiency: {
    comparisonsBestCase: number;
    comparisonsWorstCase: number;
    readabilityScore: string;
    maintainabilityScore: string;
  };
  summary: string;
  conceptDetail: string;
  whyUseful: string;
  potentialPitfall: string;
  execute: (t: number) => { activity: ActivityId; steps: TraceStep[] };
  codeSnippets: {
    java: string;
    csharp: string;
    python: string;
    typescript: string;
    cpp: string;
  };
}

export const SOLUTIONS: SolutionMethod[] = [
  {
    id: 'sirali-if-else',
    number: 1,
    title: 'Sıralı if - else if - else (Merdiven Yapısı)',
    subtitle: 'Küçükten Büyüğe Sıralı Kontrol Zinciri',
    paradigm: 'Imperative / Standart Prosedürel',
    badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
    efficiency: {
      comparisonsBestCase: 1,
      comparisonsWorstCase: 3,
      readabilityScore: 'Çok Yüksek (9/10)',
      maintainabilityScore: 'Yüksek (8/10)',
    },
    summary: 'En klasik ve başlangıç seviyesinde en çok öğretilen yöntemdir. Sıcaklık küçükten büyüğe kademeli test edilir.',
    conceptDetail:
      'Önceki şart (t < 5) sağlanmadığında, sonraki "else if (t <= 15)" bloğuna geçildiğinde derleyici zaten sıcaklığın 5 veya daha büyük olduğunu garanti eder. Bu nedenle "t >= 5 && t <= 15" yazmaya gerek kalmaz; fazladan "&&" yazmak gereksiz işlemci döngüsüdür.',
    whyUseful: 'Kod kısa, temiz ve minimum şart ifadesi içerir. Mantıksal akış doğrusal ve kolay anlaşılırdır.',
    potentialPitfall: 'Şartların sırası bozulursa (örneğin önce t <= 25 kontrol edilirse), mantık hatası (bug) meydana gelir.',
    execute: (t: number) => {
      const steps: TraceStep[] = [];
      let activity: ActivityId;

      steps.push({
        stepNumber: 1,
        lineLabel: 'if (sicaklik < 5)',
        conditionCode: `${t} < 5`,
        evaluation: `${t} < 5 = ${t < 5}`,
        result: t < 5,
        comment: t < 5 ? 'Şart sağlandı! Blok içerisine girildi, Kayak önerildi.' : 'Şart sağlanmadı. Bir sonraki else-if bloğuna geçiliyor.',
      });

      if (t < 5) {
        activity = 'kayak';
      } else {
        steps.push({
          stepNumber: 2,
          lineLabel: 'else if (sicaklik <= 15)',
          conditionCode: `${t} <= 15 (Önceki şarttan dolayı ${t} >= 5 olduğu biliniyor)`,
          evaluation: `${t} <= 15 = ${t <= 15}`,
          result: t <= 15,
          comment: t <= 15 ? 'Şart sağlandı! 5 ile 15 arasında olduğu için Sinema önerildi.' : 'Şart sağlanmadı, sıcaklık 15\'ten büyük. Sonraki adıma geçiliyor.',
        });

        if (t <= 15) {
          activity = 'sinema';
        } else {
          steps.push({
            stepNumber: 3,
            lineLabel: 'else if (sicaklik <= 25)',
            conditionCode: `${t} <= 25 (Zaten ${t} > 15 olduğu kesin)`,
            evaluation: `${t} <= 25 = ${t <= 25}`,
            result: t <= 25,
            comment: t <= 25 ? 'Şart sağlandı! 15 ile 25 arasında olduğu için Piknik önerildi.' : 'Şart sağlanmadı, 25\'ten de büyük olduğu kesinleşti.',
          });

          if (t <= 25) {
            activity = 'piknik';
          } else {
            steps.push({
              stepNumber: 4,
              lineLabel: 'else (sicaklik > 25)',
              conditionCode: 'Tüm önceki şartlar atlandı',
              evaluation: 'Otomatik varsayılan dal',
              result: 'entered',
              comment: 'Geriye yalnızca 25\'ten büyük olma ihtimali kaldı. Yüzme önerildi.',
            });
            activity = 'yuzme';
          }
        }
      }

      return { activity, steps };
    },
    codeSnippets: {
      java: `// Yöntem 1: Standart Sıralı if - else if Merdiveni (Java)
// Hazırlayan: Enes Öztürk
public class EtkinlikOnerisi {
    public static void main(String[] args) {
        int sicaklik = 18;

        if (sicaklik < 5) {
            System.out.println("Etkinlik: Kayak");
        } else if (sicaklik <= 15) {
            System.out.println("Etkinlik: Sinema");
        } else if (sicaklik <= 25) {
            System.out.println("Etkinlik: Piknik");
        } else {
            System.out.println("Etkinlik: Yüzme");
        }
    }
}`,
      csharp: `// Yöntem 1: C# Sıralı if-else
int sicaklik = 18;

if (sicaklik < 5)
    Console.WriteLine("Kayak");
else if (sicaklik <= 15)
    Console.WriteLine("Sinema");
else if (sicaklik <= 25)
    Console.WriteLine("Piknik");
else
    Console.WriteLine("Yüzme");`,
      python: `# Yöntem 1: Python if - elif - else
sicaklik = 18

if sicaklik < 5:
    print("Kayak")
elif sicaklik <= 15:
    print("Sinema")
elif sicaklik <= 25:
    print("Piknik")
else:
    print("Yüzme")`,
      typescript: `// Yöntem 1: TypeScript
function getEtkinlik(sicaklik: number): string {
  if (sicaklik < 5) return 'Kayak';
  else if (sicaklik <= 15) return 'Sinema';
  else if (sicaklik <= 25) return 'Piknik';
  else return 'Yüzme';
}`,
      cpp: `// Yöntem 1: C++
#include <iostream>
using namespace std;

int main() {
    int sicaklik = 18;
    if (sicaklik < 5) cout << "Kayak";
    else if (sicaklik <= 15) cout << "Sinema";
    else if (sicaklik <= 25) cout << "Piknik";
    else cout << "Yüzme";
    return 0;
}`,
    },
  },

  {
    id: 'bagimsiz-if-ve-mantiksal-ve',
    number: 2,
    title: 'Bağımsız if Blokları ve Mantıksal VE (&&)',
    subtitle: 'Sıralamadan Bağımsız Ayrık Aralık Kontrolü',
    paradigm: 'Ayrık / Bağımsız Şartlar (Independent Blocks)',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
    efficiency: {
      comparisonsBestCase: 4,
      comparisonsWorstCase: 4,
      readabilityScore: 'Yüksek (8/10)',
      maintainabilityScore: 'Orta (6/10)',
    },
    summary: 'Else kullanmadan, her bir aralığı hem alt hem üst sınırıyla "&&" (mantıksal VE) ile tek tek bağımsız if bloklarında test eder.',
    conceptDetail:
      'Her if bloğu bağımsızdır. Sıcaklık < 5 olsa bile işlemci sonraki 3 if bloğunu da değerlendirmeye devam eder. Bu yöntem sıralamaya duyarsızdır (blokların yerini değiştirseniz bile kod bozulmaz), ancak işlemci her durumda 4 ayrı şartı da kontrol etmek zorunda kalır.',
    whyUseful: 'Kod bloklarının sırası önemsizdir. Her aralık kendi sınırlarını açıkça belirtir (Explicit Ranges). Çoklu öneri verilmek istendiğinde (örn. hem sinema hem piknik) tek uygun yapıdır.',
    potentialPitfall: 'Performans kaybı oluşturur (tüm şartlar hep çalışır). Ayrıca sınır değerlerde (< vs <=) çakışma yapılırsa aynı anda iki öneri birden ekrana yazılabilir.',
    execute: (t: number) => {
      const steps: TraceStep[] = [];
      let activity: ActivityId = 'kayak';

      // 1. if
      const cond1 = t < 5;
      steps.push({
        stepNumber: 1,
        lineLabel: 'if (sicaklik < 5)',
        conditionCode: `${t} < 5`,
        evaluation: `${cond1}`,
        result: cond1,
        comment: cond1 ? 'Eşleşti! Kayak seçildi.' : 'Uymadı, geçildi.',
      });
      if (cond1) activity = 'kayak';

      // 2. if
      const cond2 = t >= 5 && t <= 15;
      steps.push({
        stepNumber: 2,
        lineLabel: 'if (sicaklik >= 5 && sicaklik <= 15)',
        conditionCode: `${t} >= 5 && ${t} <= 15`,
        evaluation: `${t >= 5} && ${t <= 15} = ${cond2}`,
        result: cond2,
        comment: cond2 ? 'Eşleşti! 5 ile 15 arasında: Sinema seçildi.' : 'Aralık dışı.',
      });
      if (cond2) activity = 'sinema';

      // 3. if
      const cond3 = t > 15 && t <= 25;
      steps.push({
        stepNumber: 3,
        lineLabel: 'if (sicaklik > 15 && sicaklik <= 25)',
        conditionCode: `${t} > 15 && ${t} <= 25`,
        evaluation: `${t > 15} && ${t <= 25} = ${cond3}`,
        result: cond3,
        comment: cond3 ? 'Eşleşti! 15 ile 25 arasında: Piknik seçildi.' : 'Aralık dışı.',
      });
      if (cond3) activity = 'piknik';

      // 4. if
      const cond4 = t > 25;
      steps.push({
        stepNumber: 4,
        lineLabel: 'if (sicaklik > 25)',
        conditionCode: `${t} > 25`,
        evaluation: `${cond4}`,
        result: cond4,
        comment: cond4 ? 'Eşleşti! 25 üzeri: Yüzme seçildi.' : 'Aralık dışı.',
      });
      if (cond4) activity = 'yuzme';

      return { activity, steps };
    },
    codeSnippets: {
      java: `// Yöntem 2: Bağımsız if Blokları ve && (Java)
// Hazırlayan: Enes Öztürk
int sicaklik = 18;

if (sicaklik < 5) {
    System.out.println("Etkinlik: Kayak");
}
if (sicaklik >= 5 && sicaklik <= 15) {
    System.out.println("Etkinlik: Sinema");
}
if (sicaklik > 15 && sicaklik <= 25) {
    System.out.println("Etkinlik: Piknik");
}
if (sicaklik > 25) {
    System.out.println("Etkinlik: Yüzme");
}`,
      csharp: `// Yöntem 2: C# Bağımsız If Blokları
int sicaklik = 18;

if (sicaklik < 5) Console.WriteLine("Kayak");
if (sicaklik >= 5 && sicaklik <= 15) Console.WriteLine("Sinema");
if (sicaklik > 15 && sicaklik <= 25) Console.WriteLine("Piknik");
if (sicaklik > 25) Console.WriteLine("Yüzme");`,
      python: `# Yöntem 2: Python Bağımsız if Blokları
sicaklik = 18

if sicaklik < 5:
    print("Kayak")
if 5 <= sicaklik <= 15: # Python zincirleme karşılaştırma
    print("Sinema")
if 15 < sicaklik <= 25:
    print("Piknik")
if sicaklik > 25:
    print("Yüzme")`,
      typescript: `// Yöntem 2: TypeScript Bağımsız if
let etkinlik = '';
if (sicaklik < 5) etkinlik = 'Kayak';
if (sicaklik >= 5 && sicaklik <= 15) etkinlik = 'Sinema';
if (sicaklik > 15 && sicaklik <= 25) etkinlik = 'Piknik';
if (sicaklik > 25) etkinlik = 'Yüzme';
return etkinlik;`,
      cpp: `// Yöntem 2: C++
if (sicaklik < 5) cout << "Kayak\\n";
if (sicaklik >= 5 && sicaklik <= 15) cout << "Sinema\\n";
if (sicaklik > 15 && sicaklik <= 25) cout << "Piknik\\n";
if (sicaklik > 25) cout << "Yüzme\\n";`,
    },
  },

  {
    id: 'ters-sirali-merdiven',
    number: 3,
    title: 'Ters Sıralı Kontrol (Büyükten Küçüğe)',
    subtitle: 'Yukarıdan Aşağıya Azalan Eşik Değeri Analizi',
    paradigm: 'Descending Threshold (Azalan Eşikler)',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
    efficiency: {
      comparisonsBestCase: 1,
      comparisonsWorstCase: 3,
      readabilityScore: 'Yüksek (8/10)',
      maintainabilityScore: 'Yüksek (8/10)',
    },
    summary: 'Küçükten büyüğe değil, en yüksek sıcaklıktan (25°C üzeri) başlayarak aşağıya doğru test edilir.',
    conceptDetail:
      'Algoritmik düşünce esnekliğini kanıtlar: "if (t > 25) Yüzme; else if (t > 15) Piknik; else if (t >= 5) Sinema; else Kayak;". En sıcak havadan başlayarak filtreleme yapılır. Önceki kontrol elendiğinde alt eşiği test etmek yeterlidir.',
    whyUseful: 'Sıcak iklim bölgelerinde sıcaklığın çoğu zaman yüksek olduğu biliniyorsa, ilk karşılaştırmada (>25) sonuca ulaşılarak işlemci tasarrufu sağlanır (Branch Prediction optimizasyonu).',
    potentialPitfall: 'Sıralama büyükten küçüğe olduğu için eşitsizlik işaretleri (< yerine > ve >=) dikkatle kurgulanmalıdır.',
    execute: (t: number) => {
      const steps: TraceStep[] = [];
      let activity: ActivityId;

      steps.push({
        stepNumber: 1,
        lineLabel: 'if (sicaklik > 25)',
        conditionCode: `${t} > 25`,
        evaluation: `${t > 25}`,
        result: t > 25,
        comment: t > 25 ? 'Şart sağlandı! 25 üzeri sıcaklık: Yüzme önerildi.' : '25\'ten büyük değil, aşağıya devam ediliyor.',
      });

      if (t > 25) {
        activity = 'yuzme';
      } else {
        steps.push({
          stepNumber: 2,
          lineLabel: 'else if (sicaklik > 15)',
          conditionCode: `${t} > 15 (Zaten ${t} <= 25 olduğu biliniyor)`,
          evaluation: `${t > 15}`,
          result: t > 15,
          comment: t > 15 ? 'Şart sağlandı! 15 ile 25 arası: Piknik önerildi.' : '15 veya daha düşük, bir sonraki eşiğe geçiliyor.',
        });

        if (t > 15) {
          activity = 'piknik';
        } else {
          steps.push({
            stepNumber: 3,
            lineLabel: 'else if (sicaklik >= 5)',
            conditionCode: `${t} >= 5 (Zaten ${t} <= 15 olduğu biliniyor)`,
            evaluation: `${t >= 5}`,
            result: t >= 5,
            comment: t >= 5 ? 'Şart sağlandı! 5 ile 15 arası: Sinema önerildi.' : '5\'ten de küçük olduğu kesinleşti.',
          });

          if (t >= 5) {
            activity = 'sinema';
          } else {
            steps.push({
              stepNumber: 4,
              lineLabel: 'else (sicaklik < 5)',
              conditionCode: 'Tüm yüksek eşikler elendi',
              evaluation: 'Doğal olarak < 5',
              result: 'entered',
              comment: 'Geriye sadece 5 dereceden soğuk olma durumu kaldı. Kayak önerildi.',
            });
            activity = 'kayak';
          }
        }
      }

      return { activity, steps };
    },
    codeSnippets: {
      java: `// Yöntem 3: Büyükten Küçüğe Ters Sıralı if-else (Java)
// Hazırlayan: Enes Öztürk
int sicaklik = 18;

if (sicaklik > 25) {
    System.out.println("Etkinlik: Yüzme");
} else if (sicaklik > 15) {
    System.out.println("Etkinlik: Piknik");
} else if (sicaklik >= 5) {
    System.out.println("Etkinlik: Sinema");
} else {
    System.out.println("Etkinlik: Kayak");
}`,
      csharp: `// Yöntem 3: C# Ters Sıralı Kontrol
int sicaklik = 18;

if (sicaklik > 25) Console.WriteLine("Yüzme");
else if (sicaklik > 15) Console.WriteLine("Piknik");
else if (sicaklik >= 5) Console.WriteLine("Sinema");
else Console.WriteLine("Kayak");`,
      python: `# Yöntem 3: Python Ters Sıralı Kontrol
sicaklik = 18

if sicaklik > 25:
    print("Yüzme")
elif sicaklik > 15:
    print("Piknik")
elif sicaklik >= 5:
    print("Sinema")
else:
    print("Kayak")`,
      typescript: `// Yöntem 3: TypeScript Ters Sıralı
if (sicaklik > 25) return 'Yüzme';
else if (sicaklik > 15) return 'Piknik';
else if (sicaklik >= 5) return 'Sinema';
else return 'Kayak';`,
      cpp: `// Yöntem 3: C++
if (sicaklik > 25) cout << "Yüzme";
else if (sicaklik > 15) cout << "Piknik";
else if (sicaklik >= 5) cout << "Sinema";
else cout << "Kayak";`,
    },
  },

  {
    id: 'erken-donus-guard-clauses',
    number: 4,
    title: 'Erken Dönüş / Guard Clause (Clean Code Standardı)',
    subtitle: 'Else Anahtar Kelimesini Tamamen Kaldıran Fonksiyonel Yaklaşım',
    paradigm: 'Clean Code / Early Return',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
    efficiency: {
      comparisonsBestCase: 1,
      comparisonsWorstCase: 3,
      readabilityScore: 'Mükemmel (10/10)',
      maintainabilityScore: 'Mükemmel (10/10)',
    },
    summary: 'Modern kurumsal yazılım mimarisinde en çok tercih edilen "Early Return" prensibi. "else" anahtar kelimeleri tamamen kaldırılır.',
    conceptDetail:
      'Fonksiyon içinde bir koşul sağlandığı anda "return" edilerek fonksiyon anında sonlandırılır. Kod iç içe geçmez (nesting seviyesi 1\'de kalır), okunabilirliği ve bilişsel yükü dramatik biçimde düşürür.',
    whyUseful: 'Büyük projelerde cyclomatic complexity (karmaşıklık derecesi) düşer. Kodu okuyan kişi "else" bloklarının sonunu takip etmek zorunda kalmaz.',
    potentialPitfall: 'Sadece fonksiyon/metot gövdesi içinde kullanılabilir; tek bir main bloğunda return kullanırken dikkat edilmelidir.',
    execute: (t: number) => {
      const steps: TraceStep[] = [];
      let activity: ActivityId;

      steps.push({
        stepNumber: 1,
        lineLabel: 'if (sicaklik < 5) return "Kayak";',
        conditionCode: `${t} < 5`,
        evaluation: `${t < 5}`,
        result: t < 5 ? 'returned' : false,
        comment: t < 5 ? 'Eşleşti! Erken dönüş ile "Kayak" döndürüldü ve fonksiyondan çıkıldı.' : 'Sağlanmadı, fonksiyon çalışmaya devam ediyor.',
      });

      if (t < 5) {
        return { activity: 'kayak', steps };
      }

      steps.push({
        stepNumber: 2,
        lineLabel: 'if (sicaklik <= 15) return "Sinema";',
        conditionCode: `${t} <= 15`,
        evaluation: `${t <= 15}`,
        result: t <= 15 ? 'returned' : false,
        comment: t <= 15 ? 'Eşleşti! "Sinema" döndürüldü ve fonksiyondan çıkıldı.' : 'Sağlanmadı, sonraki guard kontrolüne geçildi.',
      });

      if (t <= 15) {
        return { activity: 'sinema', steps };
      }

      steps.push({
        stepNumber: 3,
        lineLabel: 'if (sicaklik <= 25) return "Piknik";',
        conditionCode: `${t} <= 25`,
        evaluation: `${t <= 25}`,
        result: t <= 25 ? 'returned' : false,
        comment: t <= 25 ? 'Eşleşti! "Piknik" döndürüldü ve fonksiyondan çıkıldı.' : 'Sağlanmadı, son varsayılan dönüşe ulaşıldı.',
      });

      if (t <= 25) {
        return { activity: 'piknik', steps };
      }

      steps.push({
        stepNumber: 4,
        lineLabel: 'return "Yüzme";',
        conditionCode: 'Tüm guardlar aşıldı',
        evaluation: 'Varsayılan return',
        result: 'returned',
        comment: 'Hiçbir guard takılmadı, sıcaklık 25 üzeri. Doğrudan "Yüzme" döndürüldü.',
      });

      activity = 'yuzme';
      return { activity, steps };
    },
    codeSnippets: {
      java: `// Yöntem 4: Clean Code Guard Clauses (Java)
// Hazırlayan: Enes Öztürk
public class EtkinlikSecici {
    public static String etkinlikOner(int sicaklik) {
        // Erken dönüşler sayesinde "else" anahtar kelimesine gerek kalmaz
        if (sicaklik < 5) return "Kayak";
        if (sicaklik <= 15) return "Sinema";
        if (sicaklik <= 25) return "Piknik";
        return "Yüzme";
    }

    public static void main(String[] args) {
        System.out.println(etkinlikOner(18));
    }
}`,
      csharp: `// Yöntem 4: C# Guard Clause
public static string EtkinlikOner(int sicaklik) {
    if (sicaklik < 5) return "Kayak";
    if (sicaklik <= 15) return "Sinema";
    if (sicaklik <= 25) return "Piknik";
    return "Yüzme";
}`,
      python: `# Yöntem 4: Python Guard Clauses
def etkinlik_oner(sicaklik: int) -> str:
    if sicaklik < 5:
        return "Kayak"
    if sicaklik <= 15:
        return "Sinema"
    if sicaklik <= 25:
        return "Piknik"
    return "Yüzme"`,
      typescript: `// Yöntem 4: TypeScript Clean Code Guard
export function etkinlikOner(sicaklik: number): string {
  if (sicaklik < 5) return 'Kayak';
  if (sicaklik <= 15) return 'Sinema';
  if (sicaklik <= 25) return 'Piknik';
  return 'Yüzme';
}`,
      cpp: `// Yöntem 4: C++ Guard Clauses
string etkinlikOner(int sicaklik) {
    if (sicaklik < 5) return "Kayak";
    if (sicaklik <= 15) return "Sinema";
    if (sicaklik <= 25) return "Piknik";
    return "Yüzme";
}`,
    },
  },

  {
    id: 'ikili-karar-agaci-nested-if',
    number: 5,
    title: 'İkili Karar Ağacı / İç İçe if-else (Binary Decision Tree)',
    subtitle: 'Algoritmik Olarak Sabit 2 Karşılaştırma ile Çözüm (O(log N))',
    paradigm: 'Divide & Conquer / Karar Ağacı',
    badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
    efficiency: {
      comparisonsBestCase: 2,
      comparisonsWorstCase: 2,
      readabilityScore: 'Orta (7/10)',
      maintainabilityScore: 'Yüksek (8/10)',
    },
    summary: 'Aralığı önce tam ortasından (15°C) ikiye böler, ardından ilgili yarının kendi içinde tek bir if kontrolü yapar. En kötü durumda bile TAM 2 karşılaştırma yapar!',
    conceptDetail:
      'Normal merdiven yapısında sıcaklık > 25 olduğunda 3 veya 4 karşılaştırma yapılırken, İkili Karar Ağacı mantığında önce "t <= 15" sorulur. Eğer evetse sadece "t < 5" kontrol edilir (2 işlem). Eğer hayırsa sadece "t <= 25" kontrol edilir (yine 2 işlem). Girdi ne olursa olsun daima tam 2 karşılaştırmada sonuç bulunur.',
    whyUseful: 'Yüksek frekanslı sistemlerde veya gömülü sistemlerde işlemci dal tahminini (Branch Prediction) ve maksimum karşılaştırma sayısını dengeli (balanced) tutar.',
    potentialPitfall: 'İç içe if (nested) yapısı kullanıldığı için kod girintisi (indentation) artar.',
    execute: (t: number) => {
      const steps: TraceStep[] = [];
      let activity: ActivityId;

      steps.push({
        stepNumber: 1,
        lineLabel: 'Kök Karar: if (sicaklik <= 15)',
        conditionCode: `${t} <= 15`,
        evaluation: `${t <= 15}`,
        result: t <= 15,
        comment: t <= 15 ? 'Hava soğuk/serin bölgede (Sol Dal). Kayak ve Sinema incelenecek.' : 'Hava ılık/sıcak bölgede (Sağ Dal). Piknik ve Yüzme incelenecek.',
      });

      if (t <= 15) {
        steps.push({
          stepNumber: 2,
          lineLabel: 'Sol Dal: if (sicaklik < 5)',
          conditionCode: `${t} < 5`,
          evaluation: `${t < 5}`,
          result: t < 5,
          comment: t < 5 ? 'Kayak seçildi (Toplam 2 karşılaştırma ile kesinleşti).' : '5 ile 15 arasında: Sinema seçildi (Toplam 2 karşılaştırma).',
        });
        activity = t < 5 ? 'kayak' : 'sinema';
      } else {
        steps.push({
          stepNumber: 2,
          lineLabel: 'Sağ Dal: if (sicaklik <= 25)',
          conditionCode: `${t} <= 25`,
          evaluation: `${t <= 25}`,
          result: t <= 25,
          comment: t <= 25 ? '15 ile 25 arasında: Piknik seçildi (Toplam 2 karşılaştırma).' : '25 üzeri: Yüzme seçildi (Toplam 2 karşılaştırma).',
        });
        activity = t <= 25 ? 'piknik' : 'yuzme';
      }

      return { activity, steps };
    },
    codeSnippets: {
      java: `// Yöntem 5: İkili Karar Ağacı / İç İçe if-else (Java)
// Hazırlayan: Enes Öztürk
// Bu yöntem girdi ne olursa olsun kesinlikle 2 karşılaştırmada biter!
int sicaklik = 18;

if (sicaklik <= 15) {
    // Sol Dal: Soğuk ve Serin bölge (0-15)
    if (sicaklik < 5) {
        System.out.println("Etkinlik: Kayak");
    } else {
        System.out.println("Etkinlik: Sinema");
    }
} else {
    // Sağ Dal: Ilık ve Sıcak bölge (15+)
    if (sicaklik <= 25) {
        System.out.println("Etkinlik: Piknik");
    } else {
        System.out.println("Etkinlik: Yüzme");
    }
}`,
      csharp: `// Yöntem 5: C# İkili Karar Ağacı
int sicaklik = 18;

if (sicaklik <= 15) {
    Console.WriteLine(sicaklik < 5 ? "Kayak" : "Sinema");
} else {
    Console.WriteLine(sicaklik <= 25 ? "Piknik" : "Yüzme");
}`,
      python: `# Yöntem 5: Python İkili Karar Ağacı
sicaklik = 18

if sicaklik <= 15:
    print("Kayak" if sicaklik < 5 else "Sinema")
else:
    print("Piknik" if sicaklik <= 25 else "Yüzme")`,
      typescript: `// Yöntem 5: TypeScript Karar Ağacı
if (sicaklik <= 15) {
  return sicaklik < 5 ? 'Kayak' : 'Sinema';
} else {
  return sicaklik <= 25 ? 'Piknik' : 'Yüzme';
}`,
      cpp: `// Yöntem 5: C++ İkili Karar Ağacı
if (sicaklik <= 15) {
    cout << (sicaklik < 5 ? "Kayak" : "Sinema");
} else {
    cout << (sicaklik <= 25 ? "Piknik" : "Yüzme");
}`,
    },
  },

  {
    id: 'ternary-operator-zinciri',
    number: 6,
    title: 'Ternary (Üçlü Şart) Operatörü Zinciri',
    subtitle: 'Tek Satırda Fonksiyonel ve Değişmez (Immutable) Değer Ataması',
    paradigm: 'Functional / Expression-Based',
    badgeColor: 'border-pink-500/40 text-pink-300 bg-pink-500/10',
    efficiency: {
      comparisonsBestCase: 1,
      comparisonsWorstCase: 3,
      readabilityScore: 'Orta (6/10)',
      maintainabilityScore: 'Orta (7/10)',
    },
    summary: 'if-else deyimlerinin (statement) yerine "?" ve ":" operatörlerini (expression) zincirleyerek tek satırda sonuç üretir.',
    conceptDetail:
      'Programlamada if-else bir ifadedir (statement) ve doğrudan bir değişkene değer döndürmez. Ternary operatörü ise bir ifadedir (expression) ve doğrudan sabit bir "final" / "const" değişkene atanabilir. Böylece değişkenin sonradan yanlışlıkla değiştirilmesini engeller (Immutability).',
    whyUseful: 'React JSX içi koşullu render işlemlerinde, tek satırlık atamalarda ve değişmez (immutable) veri tanımlamalarında son derece pratiktir.',
    potentialPitfall: 'Zincirleme çok uzarsa kod okunabilirliği ("Spagetti Ternary") düşebilir.',
    execute: (t: number) => {
      const steps: TraceStep[] = [];
      const cond1 = t < 5;
      const cond2 = t <= 15;
      const cond3 = t <= 25;

      steps.push({
        stepNumber: 1,
        lineLabel: 'sicaklik < 5 ? "Kayak" :',
        conditionCode: `${t} < 5`,
        evaluation: `${cond1}`,
        result: cond1,
        comment: cond1 ? 'Ternary ilk şartı doğru! "Kayak" değeri döndürüldü.' : 'Yanlış, sonraki ternary dalına aktarıldı.',
      });

      if (!cond1) {
        steps.push({
          stepNumber: 2,
          lineLabel: 'sicaklik <= 15 ? "Sinema" :',
          conditionCode: `${t} <= 15`,
          evaluation: `${cond2}`,
          result: cond2,
          comment: cond2 ? 'Ternary ikinci şartı doğru! "Sinema" değeri döndürüldü.' : 'Yanlış, üçüncü dala geçildi.',
        });
      }

      if (!cond1 && !cond2) {
        steps.push({
          stepNumber: 3,
          lineLabel: 'sicaklik <= 25 ? "Piknik" : "Yüzme"',
          conditionCode: `${t} <= 25`,
          evaluation: `${cond3}`,
          result: cond3,
          comment: cond3 ? 'Ternary üçüncü şartı doğru! "Piknik" döndürüldü.' : 'Yanlış, varsayılan alternatif "Yüzme" döndürüldü.',
        });
      }

      const activity: ActivityId = t < 5 ? 'kayak' : t <= 15 ? 'sinema' : t <= 25 ? 'piknik' : 'yuzme';

      return { activity, steps };
    },
    codeSnippets: {
      java: `// Yöntem 6: Ternary Operatörü Zinciri (Java)
// Hazırlayan: Enes Öztürk
int sicaklik = 18;

// Tek satırda final (değişmez) atama
final String etkinlik = (sicaklik < 5) ? "Kayak"
                      : (sicaklik <= 15) ? "Sinema"
                      : (sicaklik <= 25) ? "Piknik"
                      : "Yüzme";

System.out.println("Etkinlik: " + etkinlik);`,
      csharp: `// Yöntem 6: C# Ternary Zinciri
int sicaklik = 18;
string etkinlik = sicaklik < 5 ? "Kayak"
               : sicaklik <= 15 ? "Sinema"
               : sicaklik <= 25 ? "Piknik"
               : "Yüzme";
Console.WriteLine(etkinlik);`,
      python: `# Yöntem 6: Python Tek Satır Koşul (Conditional Expression)
sicaklik = 18
etkinlik = "Kayak" if sicaklik < 5 else (
           "Sinema" if sicaklik <= 15 else (
           "Piknik" if sicaklik <= 25 else "Yüzme"))
print(etkinlik)`,
      typescript: `// Yöntem 6: TypeScript / JavaScript Ternary
const etkinlik = sicaklik < 5 ? 'Kayak'
  : sicaklik <= 15 ? 'Sinema'
  : sicaklik <= 25 ? 'Piknik'
  : 'Yüzme';`,
      cpp: `// Yöntem 6: C++ Ternary
const string etkinlik = (sicaklik < 5) ? "Kayak"
                      : (sicaklik <= 15) ? "Sinema"
                      : (sicaklik <= 25) ? "Piknik"
                      : "Yüzme";`,
    },
  },

  {
    id: 'modern-switch-pattern-matching',
    number: 7,
    title: 'Modern Switch & Pattern Matching',
    subtitle: 'Modern Dillerin İlişkisel Kalıp Eşleştirme (Relational Patterns) Gücü',
    paradigm: 'Pattern Matching / Declarative Switch',
    badgeColor: 'border-violet-500/40 text-violet-300 bg-violet-500/10',
    efficiency: {
      comparisonsBestCase: 1,
      comparisonsWorstCase: 3,
      readabilityScore: 'Çok Yüksek (9/10)',
      maintainabilityScore: 'Mükemmel (10/10)',
    },
    summary: 'C# 9+, modern Java 21+ ve JavaScript switch(true) deyimleri ile if-else yazmadan çok daha temiz bir sözdizimiyle aralık eşleştirme.',
    conceptDetail:
      'Klasik switch-case sadece eşitlik (equality) kontrol ederdi. Ancak modern C# "relational pattern matching" (t switch { < 5 => ..., <= 15 => ... }) ve JavaScript "switch(true)" kalıbı sayesinde aralık kontrolleri switch gövdesinde mükemmel bir okunabilirlikle ifade edilir.',
    whyUseful: 'Daha az parantez, daha temiz tablo benzeri görsel hizalama. Derleyici düzeyinde "exhaustiveness" (eksik durum kalmaması) denetimi sunar.',
    potentialPitfall: 'Eski Java ve C sürümlerinde bu özellik bulunmaz, dil sürümünün güncel olması şarttır.',
    execute: (t: number) => {
      const steps: TraceStep[] = [];
      let activity: ActivityId = 'kayak';

      steps.push({
        stepNumber: 1,
        lineLabel: 'switch (true)',
        conditionCode: 'Switch başlangıcı',
        evaluation: 'Her case bir boolean ifade olarak test edilir',
        result: 'entered',
        comment: 'Değerlendirici sırayla case koşullarını true ile eşleştirir.',
      });

      switch (true) {
        case t < 5:
          steps.push({
            stepNumber: 2,
            lineLabel: 'case sicaklik < 5:',
            conditionCode: `${t} < 5`,
            evaluation: 'true ile eşleşti!',
            result: true,
            comment: 'Eşleşti! Kayak seçildi ve break yapıldı.',
          });
          activity = 'kayak';
          break;

        case t <= 15:
          steps.push({
            stepNumber: 2,
            lineLabel: 'case sicaklik <= 15:',
            conditionCode: `${t} <= 15`,
            evaluation: 'true ile eşleşti!',
            result: true,
            comment: 'Eşleşti! Sinema seçildi.',
          });
          activity = 'sinema';
          break;

        case t <= 25:
          steps.push({
            stepNumber: 2,
            lineLabel: 'case sicaklik <= 25:',
            conditionCode: `${t} <= 25`,
            evaluation: 'true ile eşleşti!',
            result: true,
            comment: 'Eşleşti! Piknik seçildi.',
          });
          activity = 'piknik';
          break;

        default:
          steps.push({
            stepNumber: 2,
            lineLabel: 'default:',
            conditionCode: `${t} > 25`,
            evaluation: 'Önceki case eşleşmedi, varsayılan devreye girdi',
            result: 'entered',
            comment: 'Hiçbir case tutmadı, Yüzme seçildi.',
          });
          activity = 'yuzme';
          break;
      }

      return { activity, steps };
    },
    codeSnippets: {
      java: `// Yöntem 7: Modern Java Switch & Helper (Java 17 / 21)
// Hazırlayan: Enes Öztürk
public class SwitchEtkinlik {
    public static String oner(int sicaklik) {
        // Java 21 Guard Pattern veya Helper Metot ile Switch İfadesi
        return switch (sicaklik < 5 ? 1 : sicaklik <= 15 ? 2 : sicaklik <= 25 ? 3 : 4) {
            case 1 -> "Kayak";
            case 2 -> "Sinema";
            case 3 -> "Piknik";
            default -> "Yüzme";
        };
    }
}`,
      csharp: `// Yöntem 7: C# Modern Relational Pattern Matching (C# 9+)
// En şık ve endüstri standardı modern C# çözümü!
int sicaklik = 18;

string etkinlik = sicaklik switch {
    < 5  => "Kayak",
    <= 15 => "Sinema",
    <= 25 => "Piknik",
    _     => "Yüzme"
};

Console.WriteLine(etkinlik);`,
      python: `# Yöntem 7: Python 3.10+ Pattern Matching (match-case)
sicaklik = 18

match sicaklik:
    case t if t < 5:
        print("Kayak")
    case t if t <= 15:
        print("Sinema")
    case t if t <= 25:
        print("Piknik")
    case _:
        print("Yüzme")`,
      typescript: `// Yöntem 7: JS / TypeScript switch(true) kalıbı
switch (true) {
  case sicaklik < 5:
    return 'Kayak';
  case sicaklik <= 15:
    return 'Sinema';
  case sicaklik <= 25:
    return 'Piknik';
  default:
    return 'Yüzme';
}`,
      cpp: `// Yöntem 7: C++ constexpr veya aralık fonksiyonlu switch
enum Kategori { SOGUK, SERIN, ILIK, SICAK };
Kategori kat = (sicaklik < 5) ? SOGUK : (sicaklik <= 15) ? SERIN : (sicaklik <= 25) ? ILIK : SICAK;
switch (kat) {
    case SOGUK: cout << "Kayak"; break;
    case SERIN: cout << "Sinema"; break;
    case ILIK:  cout << "Piknik"; break;
    case SICAK: cout << "Yüzme"; break;
}`,
    },
  },

  {
    id: 'veri-odakli-kural-tablosu',
    number: 8,
    title: 'Veri Odaklı Kural Tablosu (Data-Driven / Rules Engine)',
    subtitle: 'SOLID Açık/Kapalı Prensibi (Open-Closed Principle) ile if\'siz Çözüm',
    paradigm: 'Data-Driven / Strategy Pattern',
    badgeColor: 'border-teal-500/40 text-teal-300 bg-teal-500/10',
    efficiency: {
      comparisonsBestCase: 1,
      comparisonsWorstCase: 4,
      readabilityScore: 'Mükemmel (10/10)',
      maintainabilityScore: 'Mükemmel (10/10)',
    },
    summary: 'Koşulları kod satırlarına gömmek yerine bir konfigürasyon veri dizisinde tutar. Kod if koşullarından tamamen arınır.',
    conceptDetail:
      'Gelişmiş kurumsal mimarilerde iş kuralları sık sık değişir. Sıcaklık aralığı ve etkinlik eşleşmeleri bir veri yapısı (Array / List / JSON / Database) olarak tanımlanır. Kod sadece diziyi tarar (.find()). Yarın yeni bir aralık ("10-12 arası Bowling") eklendiğinde tek bir kod satırını dahi değiştirmeden sadece konfigürasyona satır eklenir (SOLID Open-Closed Principle).',
    whyUseful: 'Genişletilebilirlik tavan yapar. Birim test yazması son derece kolaydır. Kurallar veritabanından bile dinamik olarak okunabilir.',
    potentialPitfall: 'Küçük ve statik projelerde aşırı mühendislik (over-engineering) sayılabilir.',
    execute: (t: number) => {
      const steps: TraceStep[] = [];
      const rules: Array<{ name: string; test: (temp: number) => boolean; activity: ActivityId; label: string }> = [
        { name: 'Kural 1', test: (temp) => temp < 5, activity: 'kayak', label: 't < 5' },
        { name: 'Kural 2', test: (temp) => temp <= 15, activity: 'sinema', label: 't <= 15' },
        { name: 'Kural 3', test: (temp) => temp <= 25, activity: 'piknik', label: 't <= 25' },
        { name: 'Kural 4 (Varsayılan)', test: () => true, activity: 'yuzme', label: 'Geri kalanlar (t > 25)' },
      ];

      steps.push({
        stepNumber: 1,
        lineLabel: 'rules.find(rule => rule.test(sicaklik))',
        conditionCode: 'Kural dizisi taranıyor...',
        evaluation: `${rules.length} kural tanımlı`,
        result: 'entered',
        comment: 'Dizi fonksiyonel olarak ilk eşleşen kuralı arıyor.',
      });

      let foundActivity: ActivityId = 'yuzme';

      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        const match = rule.test(t);
        steps.push({
          stepNumber: steps.length + 1,
          lineLabel: `${rule.name}: ${rule.label}`,
          conditionCode: `${rule.label} için test: ${t}`,
          evaluation: `${match}`,
          result: match,
          comment: match ? `Kural ${i + 1} eşleşti! "${rule.activity.toUpperCase()}" önerildi ve döngü durduruldu.` : 'Eşleşmedi, sonraki kurala bakılıyor.',
        });

        if (match) {
          foundActivity = rule.activity;
          break;
        }
      }

      return { activity: foundActivity, steps };
    },
    codeSnippets: {
      java: `// Yöntem 8: Veri Odaklı Kural Listesi (Java)
// Hazırlayan: Enes Öztürk
import java.util.*;
import java.util.function.*;

class Kural {
    Predicate<Integer> kosul;
    String etkinlik;
    Kural(Predicate<Integer> kosul, String etkinlik) {
        this.kosul = kosul;
        this.etkinlik = etkinlik;
    }
}

public class VeriOdakliOneri {
    public static void main(String[] args) {
        int sicaklik = 18;

        List<Kural> kurallar = List.of(
            new Kural(t -> t < 5, "Kayak"),
            new Kural(t -> t <= 15, "Sinema"),
            new Kural(t -> t <= 25, "Piknik"),
            new Kural(t -> true, "Yüzme")
        );

        String sonuc = kurallar.stream()
            .filter(k -> k.kosul.test(sicaklik))
            .findFirst()
            .get().etkinlik;

        System.out.println("Etkinlik: " + sonuc);
    }
}`,
      csharp: `// Yöntem 8: C# Veri Odaklı Kural Dizisi
var kurallar = new (Predicate<int> Test, string Etkinlik)[] {
    (t => t < 5, "Kayak"),
    (t => t <= 15, "Sinema"),
    (t => t <= 25, "Piknik"),
    (_ => true, "Yüzme")
};

int sicaklik = 18;
string etkinlik = kurallar.First(k => k.Test(sicaklik)).Etkinlik;
Console.WriteLine(etkinlik);`,
      python: `# Yöntem 8: Python Kural Listesi
kurallar = [
    (lambda t: t < 5, "Kayak"),
    (lambda t: t <= 15, "Sinema"),
    (lambda t: t <= 25, "Piknik"),
    (lambda _: True, "Yüzme")
]

sicaklik = 18
etkinlik = next(etk for kosul, etk in kurallar if kosul(sicaklik))
print(etkinlik)`,
      typescript: `// Yöntem 8: TypeScript Data-Driven Rules
interface Rule {
  match: (t: number) => boolean;
  activity: string;
}

const rules: Rule[] = [
  { match: (t) => t < 5, activity: 'Kayak' },
  { match: (t) => t <= 15, activity: 'Sinema' },
  { match: (t) => t <= 25, activity: 'Piknik' },
  { match: () => true, activity: 'Yüzme' },
];

const etkinlik = rules.find((r) => r.match(sicaklik))?.activity;`,
      cpp: `// Yöntem 8: C++ std::vector ve std::function kural listesi
#include <vector>
#include <functional>
#include <iostream>

struct Kural {
    std::function<bool(int)> test;
    std::string etkinlik;
};

std::vector<Kural> kurallar = {
    { [](int t) { return t < 5; }, "Kayak" },
    { [](int t) { return t <= 15; }, "Sinema" },
    { [](int t) { return t <= 25; }, "Piknik" },
    { [](int) { return true; }, "Yüzme" }
};`,
    },
  },
];
