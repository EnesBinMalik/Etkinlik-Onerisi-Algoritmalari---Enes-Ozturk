import React from 'react';
import { SolutionMethod, TraceStep } from '../data/solutions';
import { Play, Check, X, ArrowRight, CornerDownRight, Cpu, Layers } from 'lucide-react';

interface CodeTracerProps {
  temperature: number;
  solutions: SolutionMethod[];
  selectedSolutionId: string;
  onSelectSolution: (id: string) => void;
}

export const CodeTracer: React.FC<CodeTracerProps> = ({
  temperature,
  solutions,
  selectedSolutionId,
  onSelectSolution,
}) => {
  const currentSolution = solutions.find((s) => s.id === selectedSolutionId) || solutions[0];
  const execution = currentSolution.execute(temperature);
  const steps = execution.steps;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
      {/* Header and Algorithm Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              Canlı Algoritma Yürütme İzleyicisi (Live Execution Trace)
            </h3>
            <p className="text-xs text-slate-400">
              Seçili yöntemin işlemci seviyesinde adım adım nasıl çalıştığını inceleyin
            </p>
          </div>
        </div>

        {/* Method Picker Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="method-picker" className="text-xs text-slate-400 flex items-center gap-1 font-medium">
            <Layers className="w-3.5 h-3.5" />
            Yöntem:
          </label>
          <select
            id="method-picker"
            value={selectedSolutionId}
            onChange={(e) => onSelectSolution(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
          >
            {solutions.map((sol) => (
              <option key={sol.id} value={sol.id}>
                #{sol.number} - {sol.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Method Quick Summary Banner */}
      <div className="my-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div>
          <span className="font-semibold text-slate-200">
            Yöntem #{currentSolution.number}: {currentSolution.title}
          </span>
          <span className="text-slate-400 ml-2">({currentSolution.paradigm})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Bu sıcaklık için yapılan karşılaştırma:</span>
          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold">
            {steps.length} Karşılaştırma / Adım
          </span>
        </div>
      </div>

      {/* Step by step Trace Table / Cards */}
      <div className="space-y-2.5">
        {steps.map((step: TraceStep, index: number) => {
          const isFinal = index === steps.length - 1;
          const isSuccess = step.result === true || step.result === 'entered' || step.result === 'returned';

          return (
            <div
              key={index}
              className={`p-3.5 rounded-xl border transition-all ${
                isSuccess
                  ? 'bg-indigo-950/30 border-indigo-500/40 shadow-sm'
                  : 'bg-slate-950/40 border-slate-850 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 ${
                      isSuccess ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  <div>
                    <div className="font-mono text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-2">
                      <code>{step.lineLabel}</code>
                    </div>
                    <div className="text-xs font-mono text-slate-400 mt-0.5">
                      Değerlendirme: <span className="text-indigo-300">{step.conditionCode}</span> ➔{' '}
                      <span className={isSuccess ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {step.evaluation}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0">
                  {step.result === true || step.result === 'returned' || step.result === 'entered' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                      <Check className="w-3 h-3" />
                      {step.result === 'returned' ? 'Döndürüldü (Return)' : 'Koşul Sağlandı'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
                      <X className="w-3 h-3" />
                      Sağlanmadı (Atlandı)
                    </span>
                  )}
                </div>
              </div>

              {/* Step Explanatory Note */}
              <div className="mt-2 text-xs text-slate-300 flex items-center gap-2 pl-8 border-l-2 border-indigo-500/20 ml-3">
                <CornerDownRight className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                <span>{step.comment}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Execution Outcome Box */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Play className="w-3.5 h-3.5 text-emerald-400" />
          Yürütme Tamamlandı: Sıcaklık {temperature}°C için <strong>{execution.activity.toUpperCase()}</strong> kararı verildi.
        </span>
        <button
          onClick={() => {
            const nextIdx = (currentSolution.number % solutions.length);
            onSelectSolution(solutions[nextIdx].id);
          }}
          className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Sonraki Yöntemi Dene</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
