/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { TemperatureController } from './components/TemperatureController';
import { ActivityCard } from './components/ActivityCard';
import { CodeTracer } from './components/CodeTracer';
import { SolutionCatalog } from './components/SolutionCatalog';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { BoundaryUnitTest } from './components/BoundaryUnitTest';
import { HomeworkReportModal } from './components/HomeworkReportModal';
import { SOLUTIONS, ActivityId } from './data/solutions';
import { User, Sparkles, BookOpen, Layers, Terminal, ArrowRight } from 'lucide-react';

export default function App() {
  const [temperature, setTemperature] = useState<number>(18);
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>('sirali-if-else');
  const [activeTab, setActiveTab] = useState<'simulator' | 'solutions' | 'matrix' | 'edge-cases'>('simulator');
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  // Compute active activity for current temperature using current solution
  const currentSolution = SOLUTIONS.find((s) => s.id === selectedSolutionId) || SOLUTIONS[0];
  const activeActivity: ActivityId = currentSolution.execute(temperature).activity;

  const handleApplyTempFromEdgeCases = (temp: number) => {
    setTemperature(temp);
    setActiveTab('simulator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            {/* Quick Hero Banner with Homework Context */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-purple-950/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Ödev Laboratuvarı & İnteraktif Deney Alanı
                </span>
                <p className="text-xs sm:text-sm text-slate-300">
                  Sıcaklık derecesini değiştirerek hangi etkinliğin seçildiğini ve algoritmanın işlemci seviyesinde hangi adımları izlediğini anlık olarak gözlemleyin.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('solutions')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>8 Farklı Çözümü İncele</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Grid: Left Column (Controller + Activity Card) & Right Column (Live Tracer) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-5 space-y-6">
                <TemperatureController
                  temperature={temperature}
                  setTemperature={setTemperature}
                />
                <ActivityCard
                  activityId={activeActivity}
                  temperature={temperature}
                />
              </div>

              {/* Right Column: Code Execution Tracer */}
              <div className="lg:col-span-7">
                <CodeTracer
                  temperature={temperature}
                  solutions={SOLUTIONS}
                  selectedSolutionId={selectedSolutionId}
                  onSelectSolution={setSelectedSolutionId}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'solutions' && (
          <SolutionCatalog
            solutions={SOLUTIONS}
            onSelectSolutionForSimulator={(id) => {
              setSelectedSolutionId(id);
              setActiveTab('simulator');
            }}
          />
        )}

        {activeTab === 'matrix' && <ComparisonMatrix />}

        {activeTab === 'edge-cases' && (
          <BoundaryUnitTest onApplyTemp={handleApplyTempFromEdgeCases} />
        )}
      </main>

      {/* Homework Report Modal */}
      <HomeworkReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-xs">
              EÖ
            </div>
            <span>
              Algoritmalar ve Programlama Dersi Ödev Çalışması • <strong>ENES ÖZTÜRK</strong> İmzasıyla
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>8 Farklı Algoritma Tasarımı</span>
            <span>•</span>
            <button
              onClick={() => setIsReportOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 cursor-pointer font-medium"
            >
              Ödev Teslim Metnini Görüntüle
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
