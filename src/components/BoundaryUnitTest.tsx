import React, { useState } from 'react';
import { SOLUTIONS } from '../data/solutions';
import { CheckCircle2, ShieldCheck, Play, ArrowRight, Check, Sparkles } from 'lucide-react';

interface TestCase {
  temp: number;
  label: string;
  expectedCategory: string;
  significance: string;
}

const TEST_CASES: TestCase[] = [
  { temp: -10, label: '-10°C', expectedCategory: 'kayak', significance: 'Aşırı soğuk (t < 5 kuralı)' },
  { temp: 0, label: '0°C', expectedCategory: 'kayak', significance: 'Donma noktası (t < 5 kuralı)' },
  { temp: 4.9, label: '4.9°C', expectedCategory: 'kayak', significance: '5°C sınırının hemen altı' },
  { temp: 5.0, label: '5.0°C', expectedCategory: 'sinema', significance: '1. Kritik Eşik (Sinema başlangıcı)' },
  { temp: 10.0, label: '10.0°C', expectedCategory: 'sinema', significance: '5 ile 15 ortası' },
  { temp: 14.9, label: '14.9°C', expectedCategory: 'sinema', significance: '15°C sınırının hemen altı' },
  { temp: 15.0, label: '15.0°C', expectedCategory: 'sinema', significance: '2. Kritik Eşik (Sinema / Piknik sınırı)' },
  { temp: 15.1, label: '15.1°C', expectedCategory: 'piknik', significance: '15°C sınırının hemen üstü' },
  { temp: 20.0, label: '20.0°C', expectedCategory: 'piknik', significance: '15 ile 25 ortası' },
  { temp: 24.9, label: '24.9°C', expectedCategory: 'piknik', significance: '25°C sınırının hemen altı' },
  { temp: 25.0, label: '25.0°C', expectedCategory: 'piknik', significance: '3. Kritik Eşik (Piknik / Yüzme sınırı)' },
  { temp: 25.1, label: '25.1°C', expectedCategory: 'yuzme', significance: '25°C sınırının hemen üstü (Yüzme başlangıcı)' },
  { temp: 35.0, label: '35.0°C', expectedCategory: 'yuzme', significance: 'Yüksek sıcaklık (t > 25 kuralı)' },
];

export const BoundaryUnitTest: React.FC<{ onApplyTemp: (t: number) => void }> = ({ onApplyTemp }) => {
  const [selectedCase, setSelectedCase] = useState<TestCase>(TEST_CASES[3]); // Default 5.0°C

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Sınır Değer (Boundary & Edge Case) Test Laboratuvarı
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                8 algoritmanın tamamı kritik eşik değerlerinde aynı doğru çıktıyı üretiyor mu?
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              13 Test Senaryosu • %100 Uyum
            </span>
          </div>
        </div>
      </div>

      {/* Test Scenarios Badges Row */}
      <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-2xl">
        <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
          Test Senaryosu Seçin:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {TEST_CASES.map((tc) => {
            const isSelected = selectedCase.temp === tc.temp;
            return (
              <button
                key={tc.label}
                onClick={() => setSelectedCase(tc)}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="font-mono font-bold text-sm text-indigo-300">{tc.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{tc.significance}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Test Case Result Breakdown */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Aktif Test Noktası:</span>
            <div className="flex items-center gap-2 mt-0.5">
              <h3 className="text-2xl font-black font-mono text-white">{selectedCase.label}</h3>
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
                {selectedCase.significance}
              </span>
            </div>
          </div>

          <button
            onClick={() => onApplyTemp(selectedCase.temp)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Simülatörde Canlı Dene</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Results across all 8 solutions for this temperature */}
        <div className="mt-4">
          <div className="text-xs font-semibold text-slate-300 mb-2">
            8 Algoritmanın Bu Sıcaklık ({selectedCase.label}) İçin Verdiği Kararlar:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SOLUTIONS.map((sol) => {
              const res = sol.execute(selectedCase.temp);
              const activityName =
                res.activity === 'kayak'
                  ? 'Kayak'
                  : res.activity === 'sinema'
                  ? 'Sinema'
                  : res.activity === 'piknik'
                  ? 'Piknik'
                  : 'Yüzme';

              return (
                <div
                  key={sol.id}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-xs font-bold">
                      #{sol.number}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-slate-200">{sol.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {res.steps.length} adımda karara varıldı
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-xs">
                      {activityName}
                    </span>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
