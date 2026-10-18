import React from 'react';
import { Sparkles, FileText, CheckCircle2, User, BookOpen, Layers, GitCompare, Gauge, Award } from 'lucide-react';

interface HeaderProps {
  activeTab: 'simulator' | 'solutions' | 'matrix' | 'edge-cases';
  setActiveTab: (tab: 'simulator' | 'solutions' | 'matrix' | 'edge-cases') => void;
  onOpenReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenReport }) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Student Signature & Homework Badge Bar */}
        <div className="py-2.5 border-b border-slate-850 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold tracking-wide">
              <Award className="w-3.5 h-3.5" />
              Dönem Ödevi & Algoritma Analizi
            </span>
            <span className="hidden sm:inline-block text-slate-500">•</span>
            <span className="text-slate-400 hidden sm:inline-block">
              Koşullu İfadeler (if-else) ve Alternatif Çözüm Yolları
            </span>
          </div>

          {/* Student Signature Badge */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-indigo-500/30 px-3 py-1 rounded-full text-slate-200">
            <User className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">Hazırlayan:</span>
            <strong className="text-indigo-300 font-bold tracking-wide uppercase">ENES ÖZTÜRK</strong>
            <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">Öğrenci İmzası</span>
          </div>
        </div>

        {/* Main Title and Navigation Row */}
        <div className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  Hava Sıcaklığına Göre Etkinlik Önerme
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  8 Farklı Algoritmik Çözüm Paradigması • Canlı Kod İzleyici • Sınır Değer Analizi
                </p>
              </div>
            </div>
          </div>

          {/* Actions & Report Trigger */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={onOpenReport}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Ödev Raporu & Çıktı</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-2 border-t border-slate-800/60 text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>İnteraktif Simülatör & İzleyici</span>
          </button>

          <button
            onClick={() => setActiveTab('solutions')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'solutions'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>8 Farklı Çözüm Yolu (Kodlar)</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            <span>Karşılaştırma Matrisi</span>
          </button>

          <button
            onClick={() => setActiveTab('edge-cases')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'edge-cases'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Sınır Değer & Birim Testleri</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
