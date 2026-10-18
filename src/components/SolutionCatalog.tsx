import React, { useState } from 'react';
import { SolutionMethod } from '../data/solutions';
import { Code2, Check, Copy, CheckCircle2, AlertTriangle, Lightbulb, GraduationCap } from 'lucide-react';

interface SolutionCatalogProps {
  solutions: SolutionMethod[];
  onSelectSolutionForSimulator?: (id: string) => void;
}

type SupportedLanguage = 'java' | 'csharp' | 'python' | 'typescript' | 'cpp';

const LANGUAGE_LABELS: Record<SupportedLanguage, { label: string; icon: string }> = {
  java: { label: 'Java (Ödev Formatı)', icon: '☕' },
  csharp: { label: 'C# (.NET)', icon: '🔷' },
  python: { label: 'Python', icon: '🐍' },
  typescript: { label: 'TypeScript / JS', icon: '⚡' },
  cpp: { label: 'C++', icon: '⚙️' },
};

export const SolutionCatalog: React.FC<SolutionCatalogProps> = ({
  solutions,
  onSelectSolutionForSimulator,
}) => {
  const [activeLanguage, setActiveLanguage] = useState<SupportedLanguage>('java');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSolutions = solutions.filter((sol) => {
    if (filter === 'all') return true;
    if (filter === 'clean-code') return sol.id.includes('guard') || sol.id.includes('pattern') || sol.id.includes('veri');
    if (filter === 'classic') return sol.id.includes('sirali') || sol.id.includes('bagimsiz');
    if (filter === 'advanced') return sol.id.includes('agaci') || sol.id.includes('ternary') || sol.id.includes('veri');
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner introducing the Homework Question */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-purple-950/70 border border-indigo-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              Ödev Sorusunun Çözüm Analizi • Enes Öztürk
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Aynı Örnek Üzerinden 8 Farklı Koşul & Algoritma Tasarımı
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Programlamada aynı mantıksal problem tek bir yöntemle çözülmek zorunda değildir.
              Aşağıda aynı sıcaklık-etkinlik kuralı; standart merdivenden ikili karar ağacına,
              Guard Clauses mimarisinden SOLID veri odaklı kural motorlarına kadar 8 farklı yaklaşımla kodlanmıştır.
            </p>
          </div>

          {/* Global Language Selector */}
          <div className="flex flex-col items-start md:items-end gap-1.5 flex-shrink-0">
            <span className="text-xs text-slate-400 font-medium">Kodlama Dili Seçin:</span>
            <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-700/80 p-1 rounded-xl">
              {(Object.keys(LANGUAGE_LABELS) as SupportedLanguage[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeLanguage === lang
                      ? 'bg-indigo-600 text-white shadow-md font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="mr-1">{LANGUAGE_LABELS[lang].icon}</span>
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 mr-1 font-medium">Yaklaşım Filtresi:</span>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-all ${
              filter === 'all'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            Tüm 8 Yöntem
          </button>
          <button
            onClick={() => setFilter('classic')}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-all ${
              filter === 'classic'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            Klasik if / else
          </button>
          <button
            onClick={() => setFilter('clean-code')}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-all ${
              filter === 'clean-code'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            Clean Code & Guard Clause
          </button>
          <button
            onClick={() => setFilter('advanced')}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-all ${
              filter === 'advanced'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            Karar Ağacı & Veri Odaklı
          </button>
        </div>
      </div>

      {/* Solutions Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredSolutions.map((solution) => {
          const code = solution.codeSnippets[activeLanguage];
          const isCopied = copiedId === solution.id;

          return (
            <div
              key={solution.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-slate-700 transition-all"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-slate-800/80 bg-slate-950/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 font-mono font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    #{solution.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {solution.title}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${solution.badgeColor}`}>
                        {solution.paradigm}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{solution.subtitle}</p>
                  </div>
                </div>

                {/* Efficiency metrics badges */}
                <div className="flex items-center gap-2 self-start md:self-auto text-xs font-mono">
                  <span className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                    İşlem: {solution.efficiency.comparisonsBestCase}-{solution.efficiency.comparisonsWorstCase} Karşılaştırma
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-emerald-400">
                    Okunabilirlik: {solution.efficiency.readabilityScore}
                  </span>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left Column: Pedagogical Details & Concept */}
                <div className="lg:col-span-6 space-y-4 text-xs">
                  {/* Summary */}
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-400">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      Mantıksal Temel ve Çalışma İlkesi:
                    </h4>
                    <p className="text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-xl border border-slate-850">
                      {solution.conceptDetail}
                    </p>
                  </div>

                  {/* Pros and Cons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                      <div className="font-semibold text-emerald-300 flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Avantajları:
                      </div>
                      <p className="text-slate-300 leading-relaxed">{solution.whyUseful}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20">
                      <div className="font-semibold text-rose-300 flex items-center gap-1.5 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        Dikkat Edilmesi Gereken:
                      </div>
                      <p className="text-slate-300 leading-relaxed">{solution.potentialPitfall}</p>
                    </div>
                  </div>

                  {/* Enes Öztürk's Academic Note */}
                  <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                      EÖ
                    </div>
                    <div>
                      <span className="font-semibold text-indigo-300 block">Enes Öztürk'ün Ödev İnceleme Notu:</span>
                      <p className="text-slate-300 mt-0.5 leading-relaxed">
                        {solution.id === 'ikili-karar-agaci-nested-if'
                          ? 'Algoritma analizi derslerinde öğrendiğimiz O(log N) ikili arama mantığını if koşullarına uyguladığımızda, ortadan bölerek (t <= 15) her zaman tam 2 işlemde sonuca varıyoruz.'
                          : solution.id === 'erken-donus-guard-clauses'
                          ? 'Clean Code ve SOLID standartlarında "else" kullanmaktan kaçınarak fonksiyon içinde erken dönüş (return) yapmak, kodun iç içe girintilenmesini engeller.'
                          : solution.id === 'veri-odakli-kural-tablosu'
                          ? 'Mühendislik açısından en sürdürülebilir yöntemdir. Yeni kurallar (örneğin 28°C için Dondurma) koda dokunmadan kural tablosuna eklenir.'
                          : solution.id === 'bagimsiz-if-ve-mantiksal-ve'
                          ? 'Bağımsız if blokları sıralamaya duyarsız olsa da CPU gereksiz 4 işlem yapar. Ancak çoklu öneri sistemi (hem sinema hem kahve gibi) tasarlanacaksa şarttır.'
                          : 'Temel programlamaya giriş derslerinde en çok başvurulan yöntemdir; koşul merdiveni sıralı değerlendirme kuralına dayanır.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Code Snippet */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-inner flex flex-col h-full">
                    {/* Code Header Bar */}
                    <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="font-mono text-slate-300 font-medium">
                          {LANGUAGE_LABELS[activeLanguage].label}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(solution.id, code)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs font-mono cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Kopyalandı!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Kodu Kopyala</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Code Body */}
                    <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-slate-300 flex-1 bg-slate-950/90 selection:bg-indigo-500/30">
                      <pre className="whitespace-pre">{code}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
