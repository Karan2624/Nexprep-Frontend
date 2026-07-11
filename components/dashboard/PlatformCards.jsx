import { Link2 } from 'lucide-react';

const LeetCodeIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 5.13 5.527 5.527 0 0 0 4.062 3.162c.524.116 1.054.122 1.576.015.522-.107 1.028-.33 1.485-.658l6.4-4.526a1.374 1.374 0 0 0 .553-1.092c0-.365-.145-.714-.403-.972l-6.326-6.326a1.374 1.374 0 0 0-.972-.403h-5.26l-5.898 6.304a1.374 1.374 0 0 0 0 1.944l2.949 3.152a1.374 1.374 0 0 0 1.944 0l5.898-6.304a1.374 1.374 0 0 0 0-1.944z"/></svg>;
const CodeforcesIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><rect x="3" y="11" width="4" height="9" rx="1" /><rect x="10" y="4" width="4" height="16" rx="1" /><rect x="17" y="7" width="4" height="13" rx="1" /></svg>;

export default function PlatformCards({ lcStats, cfStats }) {
  
  // THE FIX: Ignore the global user state. Trust the fresh API data.
  // If the API returns a real handle, OR if total solved > 0, it is 100% linked.
  const isLcLinked = (lcStats?.handle && lcStats.handle !== 'Unlinked') || (lcStats?.total > 0) || (lcStats?.maxRating > 0);
  const isCfLinked = (cfStats?.handle && cfStats.handle !== 'Unlinked') || (cfStats?.total > 0) || (cfStats?.maxRating > 0);

  // Safe fallbacks to ensure data renders even if the API object is slightly mismatched
  const lcHandle = lcStats?.handle && lcStats.handle !== 'Unlinked' ? lcStats.handle : "Linked Account";
  const lcRating = lcStats?.rating || lcStats?.maxRating || 0;
  const lcRank = lcStats?.rank || 0;
  const lcSolved = lcStats?.total || lcStats?.totalSolved || 0;

  const cfHandle = cfStats?.handle && cfStats.handle !== 'Unlinked' ? cfStats.handle : "Linked Account";
  const cfRating = cfStats?.rating || cfStats?.maxRating || 0;
  const cfSolved = cfStats?.total || cfStats?.totalQuestionSolved || 0;

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/60 bg-white/40 flex items-center gap-2">
        <Link2 size={18} className="text-blue-600" />
        <h3 className="font-bold text-slate-900">Linked Profiles</h3>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
         
         {/* LeetCode Wrapper */}
         <div className={`rounded-xl p-5 flex items-center justify-between shadow-md transition-all duration-300 group ${isLcLinked ? 'bg-gradient-to-br from-[#FFA116] to-[#E58F0D]' : 'bg-slate-100 border border-slate-200'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm ${isLcLinked ? 'bg-white text-[#FFA116]' : 'bg-slate-300 text-slate-500'}`}>
                 <LeetCodeIcon />
              </div>
              <div>
                <div className={`font-bold text-sm mb-0.5 ${isLcLinked ? 'text-white' : 'text-slate-600'}`}>
                  {isLcLinked ? lcHandle : 'LeetCode Account'}
                </div>
                {isLcLinked && (
                  <div className="text-[11px] font-medium text-white/90">
                    Rating: {lcRating} | Rank: {lcRank.toLocaleString()} | Solved: {lcSolved}
                  </div>
                )}
              </div>
            </div>
         </div>
         
         {/* Codeforces Wrapper */}
         <div className={`rounded-xl p-5 flex items-center justify-between shadow-md transition-all duration-300 group ${isCfLinked ? 'bg-gradient-to-br from-[#1F8ACB] to-[#1975AE]' : 'bg-slate-100 border border-slate-200'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm ${isCfLinked ? 'bg-white text-[#1F8ACB]' : 'bg-slate-300 text-slate-500'}`}>
                 <CodeforcesIcon />
              </div>
              <div>
                <div className={`font-bold text-sm mb-0.5 ${isCfLinked ? 'text-white' : 'text-slate-600'}`}>
                  {isCfLinked ? cfHandle : 'Codeforces Account'}
                </div>
                {isCfLinked && (
                  <div className="text-[11px] font-medium text-white/90">
                    Max Rating: {cfRating} | Solved: {cfSolved}
                  </div>
                )}
              </div>
            </div>
         </div>

      </div>
    </div>
  );
}