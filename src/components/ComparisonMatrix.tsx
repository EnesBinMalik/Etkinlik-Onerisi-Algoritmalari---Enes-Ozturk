import React from 'react';
import { SOLUTIONS } from '../data/solutions';
import { GitCompare, Award, HelpCircle, Check, X, ShieldAlert, Sparkles } from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            <GitCompare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              8 Farklı Çözüm Yolunun Karşılaştırma Matrisi
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Enes Öztürk Ödev Raporu: Karmaşıklık, İşlemci Sayısı ve Mimari Değerlendirme Tablosu
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-300 font-semibold tracking-wider uppercase text-[11px]">
                <th className="py-3.5 px-4">Yöntem No & Adı</th>
                <th className="py-3.5 px-3">Mimari Paradigma</th>
                <th className="py-3.5 px-3 text-center">Min / Max Karşılaştırma</th>
                <th className="py-3.5 px-3 text-center">Sıralamaya Duyarlı mı?</th>
                <th className="py-3.5 px-3 text-center">Okunabilirlik</th>
                <th className="py-3.5 px-3">İdeal Kullanım Alanı</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {SOLUTIONS.map((sol) => (
                <tr key={sol.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-mono text-[11px]">
                        {sol.number}
                      </span>
                      <span>{sol.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 pl-7">{sol.subtitle}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                      {sol.paradigm}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono">
                    <span className="text-emerald-400 font-semibold">{sol.efficiency.comparisonsBestCase}</span>
                    <span className="text-slate-500 mx-1">/</span>
                    <span className="text-amber-400 font-semibold">{sol.efficiency.comparisonsWorstCase}</span>
                    <span className="text-slate-400 ml-1">adet</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    {sol.id === 'bagimsiz-if-ve-mantiksal-ve' ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                        <Check className="w-3.5 h-3.5" /> Hayır (Sıra Bağımsız)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
                        <X className="w-3.5 h-3.5" /> Evet (Sıra Önemli)
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-slate-200">
                    {sol.efficiency.readabilityScore}
                  </td>
                  <td className="py-3 px-3 text-slate-300 max-w-xs">
                    {sol.id === 'sirali-if-else' && 'Algoritmaya giriş, basit scriptler'}
                    {sol.id === 'bagimsiz-if-ve-mantiksal-ve' && 'Çoklu öneri (Multi-label) durumları'}
                    {sol.id === 'ters-sirali-merdiven' && 'Genellikle yüksek sıcaklık olan bölgeler'}
                    {sol.id === 'erken-donus-guard-clauses' && 'Büyük kurumsal projeler, Clean Code'}
                    {sol.id === 'ikili-karar-agaci-nested-if' && 'Sabit işlemci süresi (O(1) / O(log N))'}
                    {sol.id === 'ternary-operator-zinciri' && 'React JSX ve değişmez (const) atamalar'}
                    {sol.id === 'modern-switch-pattern-matching' && 'Modern C# 9+ ve Java 21 kalıp eşleme'}
                    {sol.id === 'veri-odakli-kural-tablosu' && 'SOLID / Dinamik konfigürasyon motorları'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Critical Homework Deep-Dive: Sınır Değerler Analizi (Boundary Analysis) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Kritik Soru: Sınır Değerler (5°C, 15°C, 25°C) Çakışması
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed space-y-2">
            Ödev metninde verilen ifadeler:
            <br />
            • <code className="text-indigo-300">Sıcaklık 5'ten küçük ise: Kayak</code>
            <br />
            • <code className="text-indigo-300">Sıcaklık 5 ve 15 arasında ise: Sinema</code>
            <br />
            • <code className="text-indigo-300">Sıcaklık 15 ve 25 arasında ise: Piknik</code>
            <br />
            • <code className="text-indigo-300">Sıcaklık 25'ten büyük ise: Yüzme</code>
          </p>
          <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
            <strong className="text-amber-400 block mb-1">Enes Öztürk'ün Matematiksel Tespiti:</strong>
            "Tam olarak 15°C olduğunda hem '5-15 arası' hem de '15-25 arası' ifadeleri çakışabilir.
            Matematikte bu aralıklar yarı-açık küme olarak [5, 15] ve (15, 25] şeklinde ayrıştırılmalıdır.
            Merdiven (if-else if) yapısında ilk eşleşen çalışırken, bağımsız if bloklarında operatörlerin
            dikkatli seçilmesi (&lt; vs &lt;=) çift çıktı vermeyi önler."
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              En İyi Çözüm Hangisi? (Akademik Karar)
            </h3>
          </div>
          <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20">
              <strong className="text-indigo-300">1. Temiz Kod (Clean Code) İçin:</strong>
              <p>Yöntem 4 (Guard Clauses / Erken Dönüş) en iyisidir çünkü "else" dallarını kaldırarak kod okunabilirliğini maksimize eder.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20">
              <strong className="text-cyan-300">2. Algoritmik Verimlilik İçin:</strong>
              <p>Yöntem 5 (İkili Karar Ağacı) en iyisidir çünkü en kötü durumda bile sabit 2 işlemde sonuca ulaşır ($O(1)$).</p>
            </div>
            <div className="p-2.5 rounded-lg bg-teal-950/30 border border-teal-500/20">
              <strong className="text-teal-300">3. Kurumsal Mimari (Enterprise) İçin:</strong>
              <p>Yöntem 8 (Veri Odaklı Tablo) en iyisidir çünkü SOLID Open-Closed prensibine tam uyar.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
