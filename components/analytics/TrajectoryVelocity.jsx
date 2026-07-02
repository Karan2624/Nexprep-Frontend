import { TrendingUp, Activity } from "lucide-react";
import LeetCodeLineChart from "./LeetCodeLineChart";
import CodeforcesLineChart from "./CodeforcesLineChart";

const checkeredBg = {
  backgroundImage: 'conic-gradient(#f8fafc 90deg, #ffffff 90deg 180deg, #f8fafc 180deg 270deg, #ffffff 270deg)',
  backgroundSize: '24px 24px'
};

export default function TrajectoryVelocity({
  lcLineData,
  cfLineData,
  lcStats,
  cfStats,
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={20} className="text-blue-600" />
            <h3 className="font-bold text-slate-900 text-lg">Trajectory & Velocity</h3>
          </div>
          <p className="text-slate-500 text-sm font-mono tracking-tight">LeetCode & Codeforces Rating Trends</p>
        </div>
      </div>

      <div className="bg-[#F0FDF4] border border-emerald-200 rounded-lg p-3 mb-6 flex items-start gap-3 shadow-sm">
        <Activity size={18} className="text-emerald-600 mt-0.5 shrink-0" />
        <div className="text-[13px] text-emerald-900 leading-tight">
          <strong className="text-emerald-800 font-bold">
            Velocity Status: {cfStats.status || 'Improving'} ({cfStats.velocity || 0}x)
          </strong>
          <p className="mt-1 text-emerald-700/90">Your rating trajectory is highly positive. If growth begins to plateau, shift focus from problem quantity to learning advanced algorithms.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 flex-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFA116] shadow-sm"></div>
            <h4 className="font-bold text-slate-700 text-sm">LeetCode</h4>
          </div>
          <div className="h-45 w-full relative rounded-xl border border-slate-100 overflow-hidden" style={checkeredBg}>
            <div className="absolute inset-0 pt-4 pr-4">
              <LeetCodeLineChart data={lcLineData} />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rotate-45 bg-[#1F8ACB] shadow-sm"></div>
            <h4 className="font-bold text-slate-700 text-sm">Codeforces</h4>
          </div>
          <div className="h-45 w-full relative rounded-xl border border-slate-100 overflow-hidden" style={checkeredBg}>
            <div className="absolute inset-0 pt-4 pr-4">
              <CodeforcesLineChart data={cfLineData} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-4 pt-4 border-t border-slate-100 mt-auto">
        <div className="hover:-translate-y-1 transition-transform">
          <p className="text-[10px] text-slate-500 font-bold mb-1 leading-tight uppercase tracking-wider">LC Highest Rating</p>
          <p className="text-[18px] font-black text-slate-900">{lcStats.maxRating || 0}</p>
        </div>
        <div className="hover:-translate-y-1 transition-transform">
          <p className="text-[10px] text-slate-500 font-bold mb-1 leading-tight uppercase tracking-wider">CF Highest Rating</p>
          <p className="text-[18px] font-black text-slate-900">{cfStats.maxRating || 0}</p>
        </div>
        <div className="hover:-translate-y-1 transition-transform">
          <p className="text-[10px] text-slate-500 font-bold mb-1 leading-tight uppercase tracking-wider">CF Growth Velocity</p>
          <p className="text-[18px] font-black text-emerald-600 flex items-center gap-1">
            <TrendingUp size={16} strokeWidth={3} /> {cfStats.velocity || 0}x
          </p>
        </div>
        <div className="hover:-translate-y-1 transition-transform">
          <p className="text-[10px] text-slate-500 font-bold mb-1 leading-tight uppercase tracking-wider">Overall Status</p>
          <p className="text-[18px] font-black text-emerald-600 capitalize">{cfStats.status || 'N/A'}</p>
        </div>
        <div></div>
        {/* <div className="hover:-translate-y-1 transition-transform">
          <p className="text-[10px] text-slate-500 font-bold mb-1 leading-tight uppercase tracking-wider">AI Confidence</p>
          <p className="text-[18px] font-black text-blue-600">
            {cfStats.aiConfidence ? `${cfStats.aiConfidence}%` : '0%'}
          </p>
        </div> */}
        <div className="hover:-translate-y-1 transition-transform bg-rose-50 border border-rose-100 rounded-lg p-2 -mx-2 -mt-2">
          <p className="text-[10px] text-rose-500 font-bold mb-1 leading-tight uppercase tracking-wider">Rec. Target Diff</p>
          <p className="text-[18px] font-black text-rose-600 tracking-tight uppercase">{cfStats.recTarget || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}