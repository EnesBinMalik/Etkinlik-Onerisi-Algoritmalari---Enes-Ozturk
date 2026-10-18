import React, { useState } from 'react';
import { X, Copy, Check, Printer, FileText, User, Award, CheckCircle2 } from 'lucide-react';
import { SOLUTIONS } from '../data/solutions';

interface HomeworkReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HomeworkReportModal: React.FC<HomeworkReportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const homeworkMarkdownText = `========================================================================
ALGORİTMALAR VE PROGRAMLAMA DÖNEM ÖDEVİ RAPORU
HAZIRLAYAN: ENES ÖZTÜRK
TARİH: 2026-10-18
KONU: Hava Sıcaklığına Göre Etkinlik Önerme & Koşul Yapılarının Alternatif Tasarım Modelleri
========================================================================

1. ÖDEVİN AMACI VE PROBLEM TANIMI
Bu ödevin amacı; verilen hava sıcaklığı değerine göre kullanıcıya en uygun etkinliği
önerecek bir karar mekanizması tasarlamak ve aynı problemin if-else koşulları üzerinden
başka hangi farklı yollarla çözülebileceğini algoritmik ve mimari açıdan incelemektir.

Verilen Koşullar:
- Sıcaklık < 5°C   => "Kayak" etkinliğini öner.
- Sıcaklık 5°C ile 15°C arasında ise => "Sinema" etkinliğini öner.
- Sıcaklık 15°C ile 25°C arasında ise => "Piknik" etkinliğini öner.
- Sıcaklık > 25°C  => "Yüzme" etkinliğini öner.

------------------------------------------------------------------------
2. ARAŞTIRMA SORUSU VE FARKLI ÇÖZÜM YOLLARI
Soru: "Aynı örnek üzerinden if koşulları başka hangi şekilde oluşturulabilirdi?"

Yapılan çalışma neticesinde 8 farklı çözüm yolu tespit edilmiş ve modellenmiştir:

YÖNTEM 1: Sıralı if - else if - else Merdiveni (Standart Küçükten Büyüğe)
Mantık: Önceki şart elendiğinde alt sınır otomatik garanti edilir; gereksiz '&&' kullanılmaz.

YÖNTEM 2: Bağımsız if Blokları ve Mantıksal VE (&&) Operatörü
Mantık: Else kullanılmaz, her aralık alt ve üst sınırıyla bağımsız test edilir.
Sıralamaya duyarsızdır ancak CPU her 4 şartı da kontrol eder.

YÖNTEM 3: Büyükten Küçüğe Ters Sıralı Merdiven (Descending Thresholds)
Mantık: > 25 ile başlar, sıcak iklimlerde ilk adımda sonuca ulaşarak branch prediction optimizasyonu sağlar.

YÖNTEM 4: Erken Dönüş / Guard Clause (Clean Code Standardı)
Mantık: Fonksiyonel erken dönüş (return) ile 'else' anahtar kelimesi tamamen elenir, iç içe girinti önlenir.

YÖNTEM 5: İkili Karar Ağacı / İç İçe if-else (Binary Decision Tree)
Mantık: Önce t <= 15 ile problem ikiye bölünür. Girdi ne olursa olsun daima SABİT 2 karşılaştırmada sonuç bulunur (O(1)).

YÖNTEM 6: Ternary (Üçlü Şart) Operatör Zinciri
Mantık: Tek satırda değişmez (immutable/final) değer üretir, fonksiyonel paradigmalara uygundur.

YÖNTEM 7: Modern Switch & Pattern Matching (C# 9+ / Java 21)
Mantık: Kalıp eşleme ile deklaratif ve hatasız aralık denetimi sunar.

YÖNTEM 8: Veri Odaklı Kural Tablosu (SOLID / Strategy Pattern)
Mantık: Kurallar koddan ayrı bir veri dizisinde tutulur; yeni etkinlikler koda dokunmadan eklenebilir.

------------------------------------------------------------------------
3. SINIR DEĞERLER (5°C, 15°C, 25°C) ANALİZİ
Matematiksel olarak [5, 15] ve (15, 25] şeklinde yarı-açık küme kuralı belirlenmelidir.
Tam 15°C olduğunda sistem tek bir karara (Sinema) varmalı, çakışma yaşanmamalıdır.

------------------------------------------------------------------------
4. SONUÇ VE DEĞERLENDİRME
Klasik öğretimde Yöntem 1 kullanılırken; modern kurumsal projelerde Yöntem 4 (Clean Code Guard Clause)
ve performans kritik sistemlerde Yöntem 5 (İkili Karar Ağacı) en uygun mimariyi sunmaktadır.

Öğrenci İmzası: ENES ÖZTÜRK
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(homeworkMarkdownText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Resmi Ödev Raporu & Teslim Belgesi
              </h2>
              <p className="text-xs text-slate-400">
                Hazırlayan: <strong className="text-indigo-300">ENES ÖZTÜRK</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Ödevi Kopyala</span>
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Yazdır / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Printable Academic Paper */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-200 text-xs sm:text-sm leading-relaxed font-sans bg-slate-900">
          {/* Formal Letterhead */}
          <div className="border-b-2 border-indigo-500/40 pb-6 text-center space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-widest text-indigo-400">
              BİLGİSAYAR MÜHENDİSLİĞİ / YAZILIM GELİŞTİRME ÖDEVİ
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Hava Sıcaklığına Göre Etkinlik Önerme Algoritmaları & Alternatif Koşul Yapıları Raporu
            </h1>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                Öğrenci: <strong className="text-white">ENES ÖZTÜRK</strong>
              </span>
              <span>•</span>
              <span>Dönem Ödevi</span>
              <span>•</span>
              <span className="font-mono">Tarih: 2026-10-18</span>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-2">
            <h3 className="font-bold text-white text-sm uppercase tracking-wide border-l-2 border-indigo-500 pl-2">
              1. Ödev Konusu ve Problem Tanımı
            </h3>
            <p className="text-slate-300">
              Bu ödev çalışmasında, kullanıcı tarafından girilen hava sıcaklığına göre uygun bir aktivite tavsiyesi
              oluşturulmuştur. Problemde tanımlanan kurallar şu şekildedir:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs my-2">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-cyan-400 font-bold">Sıcaklık &lt; 5°C</span> ➔ Kayak Etkinliği
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-purple-400 font-bold">5°C ≤ Sıcaklık ≤ 15°C</span> ➔ Sinema Etkinliği
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-emerald-400 font-bold">15°C &lt; Sıcaklık ≤ 25°C</span> ➔ Piknik Etkinliği
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-amber-400 font-bold">Sıcaklık &gt; 25°C</span> ➔ Yüzme Etkinliği
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h3 className="font-bold text-white text-sm uppercase tracking-wide border-l-2 border-indigo-500 pl-2">
              2. "Aynı Örnek Üzerinden if Koşulları Başka Hangi Şekilde Oluşturulabilirdi?" Sorusunun Çözümü
            </h3>
            <p className="text-slate-300">
              Yazılım mühendisliği prensipleri gereğince, tek bir problemi çözmenin birden fazla yolu vardır.
              Bu ödev kapsamında tarafımca <strong>8 farklı çözüm yolu</strong> incelenmiştir:
            </p>

            <div className="space-y-3 mt-3">
              {SOLUTIONS.map((sol) => (
                <div key={sol.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-indigo-300">
                      Yöntem #{sol.number}: {sol.title}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {sol.paradigm}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{sol.conceptDetail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h3 className="font-bold text-white text-sm uppercase tracking-wide border-l-2 border-indigo-500 pl-2">
              3. Karşılaştırmalı Analiz ve Enes Öztürk'ün Değerlendirmesi
            </h3>
            <p className="text-slate-300">
              Yapılan incelemede; Yöntem 1 başlangıç seviyesi için uygun olsa da, endüstride Clean Code prensipleri
              doğrultusunda <strong>Yöntem 4 (Guard Clauses / Erken Dönüş)</strong> en yüksek okunabilirliği sağlamaktadır.
              Öte yandan algoritmik verimlilik ve $O(1)$ sabit zaman karmaşıklığı açısından <strong>Yöntem 5 (İkili Karar Ağacı)</strong>
              en az sayıda işlemci karşılaştırması gerçekleştiren yöntem olmuştur.
            </p>
          </div>

          {/* Formal Signature Box */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs">
            <div>
              <div className="text-slate-400">Rapor Tarihi: 18 Ekim 2026</div>
              <div className="text-slate-400">Ödev Durumu: Eksiksiz Hazırlandı</div>
            </div>
            <div className="text-right">
              <div className="text-slate-400">Öğrenci & Geliştirici:</div>
              <div className="text-base font-bold text-white tracking-wide">ENES ÖZTÜRK</div>
              <div className="text-[10px] text-indigo-400 font-mono">İMZALANMIŞTIR ✓</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
