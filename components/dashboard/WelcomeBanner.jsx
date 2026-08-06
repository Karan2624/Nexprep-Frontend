import { TrendingUp } from 'lucide-react';

export default function WelcomeBanner({ user }) {
  return (
    <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-2xl p-6 sm:p-8 flex items-center relative overflow-hidden min-h-[140px] sm:min-h-[160px]">
      <div className="relative z-10 w-full pr-20 sm:pr-48">
        <h1 className="text-2xl sm:text-[32px] font-black text-slate-900 mb-2 sm:mb-3 tracking-tight">
          Hello, {user?.name?.split(' ')[0] || 'Student'}!
        </h1>
        <p className="text-slate-700 font-medium leading-relaxed text-sm sm:text-base">
          {user?.currentStreak > 0 ? (
            <>
              You're handling a live{' '}
              <span className="inline-block align-middle bg-white/80 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold text-[13px] sm:text-sm shadow-sm animate-pulse mx-1 mb-0.5">
                {user.currentStreak}-day streak
              </span>
              . Phenomenal work!
            </>
          ) : (
            <>Start your target milestones today to kick off an active learning streak!</>
          )}
        </p>
      </div>
      <div className="absolute -right-4 sm:right-8 top-1/2 -translate-y-1/2 w-24 h-20 sm:w-40 sm:h-32 bg-white/40 backdrop-blur-md rounded-xl flex items-center justify-center rotate-[15deg] transition-transform duration-700 hover:rotate-12 hover:scale-105 border border-white/60 pointer-events-none sm:pointer-events-auto z-0">
        <div className="w-16 h-12 sm:w-28 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex flex-col items-center justify-center -rotate-[15deg] shadow-lg gap-2 text-white">
          <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce-subtle" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}