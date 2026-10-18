import React from 'react';
import { Snowflake, Film, Trees, Waves, Compass, CheckCircle, Info, Sparkles } from 'lucide-react';
import { ACTIVITIES, ActivityInfo } from '../data/activities';
import { ActivityId } from '../data/solutions';

interface ActivityCardProps {
  activityId: ActivityId;
  temperature: number;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activityId, temperature }) => {
  const activity: ActivityInfo = ACTIVITIES[activityId] || ACTIVITIES['kayak'];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Snowflake':
        return <Snowflake className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />;
      case 'Film':
        return <Film className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />;
      case 'Trees':
        return <Trees className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />;
      case 'Waves':
        return <Waves className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />;
      default:
        return <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400" />;
    }
  };

  return (
    <div
      className={`rounded-2xl border p-6 bg-gradient-to-br ${activity.colorScheme.bgGradient} ${activity.colorScheme.cardBorder} ${activity.colorScheme.glow} transition-all duration-300 relative overflow-hidden`}
    >
      {/* Decorative top pattern */}
      <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
        {getIcon(activity.iconName)}
      </div>

      {/* Top Tag & Condition Match */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Önerilen Etkinlik
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${activity.colorScheme.badgeBg}`}>
            {activity.category}
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-slate-300">
          <span className="text-slate-400">Koşul Kuralı:</span>
          <strong className="text-white font-bold">{activity.conditionFormula}</strong>
        </div>
      </div>

      {/* Title & Icon Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex-shrink-0">
          {getIcon(activity.iconName)}
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            {activity.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2 leading-relaxed">
            {activity.description}
          </p>
        </div>
      </div>

      {/* Vibe Quote Banner */}
      <div className="mb-5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 italic flex items-center gap-2">
        <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 not-italic" />
        <span>"{activity.vibeText}"</span>
      </div>

      {/* Equipment and Tips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-xs">
        <div>
          <h4 className="font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
            Gereken Ekipman & Hazırlık:
          </h4>
          <ul className="space-y-1 text-slate-300">
            {activity.equipment.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            Önerilen Tavsiyeler:
          </h4>
          <ul className="space-y-1 text-slate-300">
            {activity.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
