import { TrendingUp } from 'lucide-react';

export default function WelcomeBanner({ user }) {
  return (
    <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-2xl p-8 flex justify-between items-center relative overflow-hidden h-40">
      <div className="relative z-10">
        <h1 className="text-[32px] font-black text-slate-900 mb-2 tracking-tight">
          Hello, {user?.name?.split(' ')[0] || 'Student'}!
        </h1>
        <p className="text-slate-700 font-medium flex items-center gap-2">
          {user?.currentStreak > 0 ? (
            <>You're handling a live <span className="bg-white/80 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded font-bold text-sm shadow-sm animate-pulse">{user.currentStreak}-day streak</span>. Phenomenal work!</>
          ) : (
            <>Start your target milestones today to kick off an active learning streak!</>
          )}
        </p>
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-40 h-32 bg-white/40 backdrop-blur-md rounded-xl flex items-center justify-center rotate-[15deg] transition-transform duration-700 hover:rotate-12 hover:scale-105 border border-white/60">
        <div className="w-28 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex flex-col items-center justify-center -rotate-[15deg] shadow-lg gap-2 text-white">
          <TrendingUp size={32} className="animate-bounce-subtle" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}