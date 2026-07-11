import { Code, Flame, Zap } from 'lucide-react';

export default function StatCards({ user, lcStats, cfStats, weakspots }) {
  const totalSolved = (lcStats?.total || 0) + (cfStats?.total || 0);
  const lcPercent = totalSolved > 0 ? Math.round((lcStats?.total / totalSolved) * 100) : 50;
  const cfPercent = totalSolved > 0 ? Math.round((cfStats?.total / totalSolved) * 100) : 50;
  
  const cardStyle = "bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-2xl p-6 transition-all duration-300 hover:bg-white/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Active Streak */}
      <div className={cardStyle}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xs font-bold text-slate-500 tracking-wider">ACTIVE STREAK</h3>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 text-white flex items-center justify-center shadow-md">
            <Flame size={20} />
          </div>
        </div>
        <div className="text-[36px] font-black text-slate-900 mb-1 mt-2 leading-none flex items-baseline gap-1.5">
          {user?.currentStreak || 0} <span className="text-lg font-bold text-slate-400">Days</span>
        </div>
        <div className="text-xs font-semibold text-slate-500 mt-2">
          Longest Record: {user?.longestStreak || 0} days
        </div>
      </div>

      {/* Total Solved */}
      <div className={cardStyle}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xs font-bold text-slate-500 tracking-wider">TOTAL SOLVED</h3>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <Code size={20} />
          </div>
        </div>
        <div className="flex items-center gap-5 mt-2">
          <div className="relative w-16 h-16 shrink-0 drop-shadow-sm">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="rgba(255,255,255,0.5)" strokeWidth="4" />
              <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#FFA116" strokeWidth="4" strokeDasharray={`${lcPercent} ${100 - lcPercent}`} strokeDashoffset="0" />
              <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#1F8ACB" strokeWidth="4" strokeDasharray={`${cfPercent} ${100 - cfPercent}`} strokeDashoffset={`-${lcPercent}`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-black text-slate-900 leading-none">{totalSolved}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFA116]"></div>
                <span className="text-[11px] font-bold text-slate-600 uppercase">LeetCode</span>
              </div>
              <span className="text-sm font-black text-slate-900">{lcStats?.total || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1F8ACB]"></div>
                <span className="text-[11px] font-bold text-slate-600 uppercase">Codeforces</span>
              </div>
              <span className="text-sm font-black text-slate-900">{cfStats?.total || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className={cardStyle + " flex flex-col"}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xs font-bold text-slate-500 tracking-wider">AI INSIGHTS</h3>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-md">
            <Zap size={20} />
          </div>
        </div>
        <div className="text-[20px] font-black text-slate-900 mt-1 leading-none tracking-tight">Weak Spots</div>
        {weakspots?.list && weakspots.list.length > 0 ? (
          <div className="flex gap-1.5 mt-auto pt-2">
            {weakspots.list.slice(0, 3).map((spot, i) => (
              <div key={i} title={spot.suggestion || "Focus on this topic"} className="bg-white/60 border border-purple-100 rounded-lg p-2 flex flex-col items-center flex-1 min-w-0 shadow-sm cursor-help hover:bg-white/90 transition-colors">
                <span className="text-[9px] font-black text-purple-600 uppercase tracking-tight text-center truncate w-full">{spot.topic}</span>
                <span className="text-[11px] font-bold text-purple-900 mt-0.5">{spot.mastery !== undefined ? `${Math.round(spot.mastery * 100)}%` : 'Review'}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[11px] font-medium text-slate-500 mt-2 bg-white/50 p-2 rounded-lg text-center">Sync metrics to compile insights.</p>
        )}
      </div>

    </div>
  );
}