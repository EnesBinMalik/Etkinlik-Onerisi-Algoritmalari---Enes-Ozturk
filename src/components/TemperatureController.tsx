import React from 'react';
import { Thermometer, Minus, Plus, Zap } from 'lucide-react';

interface TemperatureControllerProps {
  temperature: number;
  setTemperature: (temp: number) => void;
}

const PRESETS = [
  { temp: -5, label: '-5°C (Uludağ)', hint: 'Kayak', icon: '❄️', color: 'hover:border-cyan-400 hover:bg-cyan-500/10' },
  { temp: 4.9, label: '4.9°C (Sınır Altı)', hint: 'Kayak', icon: '⛷️', color: 'hover:border-cyan-400 hover:bg-cyan-500/10' },
  { temp: 10, label: '10°C (Serin)', hint: 'Sinema', icon: '🍿', color: 'hover:border-purple-400 hover:bg-purple-500/10' },
  { temp: 15, label: '15°C (Kritik Sınır)', hint: 'Sinema / Sınır', icon: '⚖️', color: 'hover:border-purple-400 hover:bg-purple-500/10' },
  { temp: 20, label: '20°C (Ilık Bahar)', hint: 'Piknik', icon: '🧺', color: 'hover:border-emerald-400 hover:bg-emerald-500/10' },
  { temp: 25, label: '25°C (Kritik Sınır)', hint: 'Piknik / Sınır', icon: '⚖️', color: 'hover:border-emerald-400 hover:bg-emerald-500/10' },
  { temp: 32, label: '32°C (Yaz Sıcağı)', hint: 'Yüzme', icon: '🌊', color: 'hover:border-amber-400 hover:bg-amber-500/10' },
];

export const TemperatureController: React.FC<TemperatureControllerProps> = ({
  temperature,
  setTemperature,
}) => {
  // Determine gradient color depending on temperature
  const getTempColor = (t: number) => {
    if (t < 5) return 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10';
    if (t <= 15) return 'text-purple-400 border-purple-500/40 bg-purple-500/10';
    if (t <= 25) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
  };

  const getSliderTrackGradient = (t: number) => {
    // Percentage from -15 to 45 (span = 60)
    const percentage = Math.min(100, Math.max(0, ((t + 15) / 60) * 100));
    return `linear-gradient(to right, #06b6d4 0%, #a855f7 33%, #10b981 66%, #f59e0b 100%)`;
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden backdrop-blur-sm">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header of Controller */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-slate-800 text-indigo-400">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Hava Sıcaklığı Girişi</h2>
            <p className="text-xs text-slate-400">Kaydırıcıyı hareket ettirin veya hızlı önayarları seçin</p>
          </div>
        </div>

        {/* Current Value Display Badge */}
        <div className={`px-4 py-2 rounded-xl border flex items-baseline gap-1 shadow-inner ${getTempColor(temperature)}`}>
          <span className="text-2xl sm:text-3xl font-black tracking-tight font-mono">{temperature}</span>
          <span className="text-sm sm:text-base font-semibold">°C</span>
        </div>
      </div>

      {/* Main Slider & Stepper Controls */}
      <div className="space-y-4">
        {/* Slider */}
        <div className="relative pt-1 pb-1">
          <input
            type="range"
            min="-15"
            max="45"
            step="0.5"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            style={{
              background: getSliderTrackGradient(temperature),
            }}
          />

          {/* Scale labels */}
          <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono px-1">
            <span>-15°C (Kutup)</span>
            <span className="text-cyan-400 font-bold">5°C (Kayak)</span>
            <span className="text-purple-400 font-bold">15°C (Sinema)</span>
            <span className="text-emerald-400 font-bold">25°C (Piknik)</span>
            <span className="text-amber-400 font-bold">45°C (Yüzme)</span>
          </div>
        </div>

        {/* Increment / Decrement Steppers & Manual Input */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setTemperature(Math.max(-15, Math.round((temperature - 5) * 10) / 10))}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
              title="5 Derece Azalt"
            >
              -5°C
            </button>
            <button
              onClick={() => setTemperature(Math.max(-15, Math.round((temperature - 1) * 10) / 10))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="1 Derece Azalt"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTemperature(Math.min(45, Math.round((temperature + 1) * 10) / 10))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="1 Derece Arttır"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTemperature(Math.min(45, Math.round((temperature + 5) * 10) / 10))}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
              title="5 Derece Arttır"
            >
              +5°C
            </button>
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Senaryolar:
            </span>
            {PRESETS.map((preset) => {
              const isSelected = Math.abs(temperature - preset.temp) < 0.1;
              return (
                <button
                  key={preset.label}
                  onClick={() => setTemperature(preset.temp)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200 shadow-sm'
                      : `bg-slate-800/80 border-slate-700/60 text-slate-300 ${preset.color}`
                  }`}
                >
                  <span className="mr-1">{preset.icon}</span>
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
