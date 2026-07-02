"use client";

import { useState } from "react";
import { Filter, Target, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";
import LeetCodePieChart from "./LeetCodePieChart";
import CodeforcesPieChart from "./CodeforcesPieChart";

export default function ComfortZone({
  lcPieData,
  cfPieData,
  lcStats,
  cfStats,
}) {
  const [distTab, setDistTab] = useState("LeetCode");

  const getLcInsight = () => {
    const ratio = lcStats.hard_to_medium_ratio || lcStats.hardMedRatio || 0;
    const target = lcStats.recommended_difficulty || lcStats.recTarget || 'HARD';
    
    if (ratio < 0.15) {
      return {
        title: "Stuck in Mediums",
        desc: `Your Hard-to-Medium ratio is exceptionally low (${ratio}x). To break past ${lcStats.maxRating || 0} rating, your recommended difficulty is now `,
        target: target,
        bg: "bg-[#FFF5F5]",
        border: "border-rose-100",
        textMain: "text-rose-900",
        textTitle: "text-rose-800",
        icon: <Target size={18} className="text-rose-500 mt-0.5 shrink-0" />,
        statusIcon: <AlertCircle size={10} />,
        statusText: "Too Low",
        statusColor: "text-rose-600",
        ratioColor: "text-rose-700"
      };
    } else if (ratio < 0.3) {
      return {
        title: "Balanced Progression",
        desc: `Your Hard-to-Medium ratio is healthy (${ratio}x). Keep maintaining this balance. Recommended difficulty is `,
        target: target,
        bg: "bg-[#EFF6FF]",
        border: "border-blue-100",
        textMain: "text-blue-900",
        textTitle: "text-blue-800",
        icon: <CheckCircle2 size={18} className="text-blue-500 mt-0.5 shrink-0" />,
        statusIcon: <CheckCircle2 size={10} />,
        statusText: "Healthy",
        statusColor: "text-blue-600",
        ratioColor: "text-blue-700"
      };
    } else {
      return {
        title: "Pushing Limits",
        desc: `Your Hard-to-Medium ratio is very high (${ratio}x). You are actively challenging yourself. Recommended difficulty is `,
        target: target,
        bg: "bg-[#F0FDF4]",
        border: "border-emerald-100",
        textMain: "text-emerald-900",
        textTitle: "text-emerald-800",
        icon: <TrendingUp size={18} className="text-emerald-500 mt-0.5 shrink-0" />,
        statusIcon: <TrendingUp size={10} />,
        statusText: "Strong",
        statusColor: "text-emerald-600",
        ratioColor: "text-emerald-700"
      };
    }
  };

  const getCfInsight = () => {
    const velocity = cfStats.velocity || cfStats.growth_velocity || 0;
    
    if (velocity > 0.6) {
      return {
        title: "Rapid Ascent",
        desc: `Your growth velocity is high (${velocity}x). You are solving well above your rating. Focus on Div2 C/D problems.`,
        bg: "bg-[#F0FDF4]",
        border: "border-emerald-100",
        textMain: "text-emerald-900",
        textTitle: "text-emerald-800",
        icon: <TrendingUp size={18} className="text-emerald-500 mt-0.5 shrink-0" />
      };
    } else if (velocity > 0) {
      return {
        title: "Steady Distribution",
        desc: `You are consistently solving around your rating level. Focus on slightly harder problems to push forward.`,
        bg: "bg-[#EFF6FF]",
        border: "border-blue-100",
        textMain: "text-blue-900",
        textTitle: "text-blue-800",
        icon: <Target size={18} className="text-blue-500 mt-0.5 shrink-0" />
      };
    } else {
      return {
        title: "Plateau Reached",
        desc: `Your rating velocity has stagnated. It is highly recommended to start upsolving your missed contest problems.`,
        bg: "bg-[#FFF7ED]",
        border: "border-orange-100",
        textMain: "text-orange-900",
        textTitle: "text-orange-800",
        icon: <AlertCircle size={18} className="text-orange-500 mt-0.5 shrink-0" />
      };
    }
  };

  const lcInsight = getLcInsight();
  const cfInsight = getCfInsight();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-blue-600" />
          <h3 className="font-bold text-slate-900 text-lg">Comfort Zone</h3>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setDistTab('LeetCode')} 
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all duration-300 ${distTab === 'LeetCode' ? 'bg-white shadow-sm text-[#FFA116]' : 'text-slate-500 hover:text-slate-700'}`}
          >
            LC
          </button>
          <button 
            onClick={() => setDistTab('Codeforces')} 
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all duration-300 ${distTab === 'Codeforces' ? 'bg-white shadow-sm text-[#1F8ACB]' : 'text-slate-500 hover:text-slate-700'}`}
          >
            CF
          </button>
        </div>
      </div>

      {distTab === 'LeetCode' ? (
        <div className="flex-1 flex flex-col">
          <div className={`${lcInsight.bg} border ${lcInsight.border} rounded-lg p-3 mb-6 flex items-start gap-3 shadow-sm`}>
            {lcInsight.icon}
            <div className={`text-[13px] ${lcInsight.textMain} leading-tight`}>
              <strong className={`${lcInsight.textTitle} font-bold`}>Insight: {lcInsight.title}</strong>
              <p className="mt-1 opacity-90">{lcInsight.desc}<span className="font-black bg-white/50 px-1 rounded uppercase">{lcInsight.target}</span>.</p>
            </div>
          </div>

          <div className="mb-6 mt-auto">
            <div className="h-40 w-full relative">
              <LeetCodePieChart data={lcPieData} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-900 leading-none">{lcStats.totalSolved || lcStats.total || 0}</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase mt-1 tracking-wider">Solved</span>
              </div>
            </div>
            <div className="flex justify-center gap-4 text-[11px] font-bold text-slate-500 mt-4 uppercase tracking-wider">
              <span className="text-emerald-600 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Easy</span>
              <span className="text-orange-500 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Medium</span>
              <span className="text-rose-500 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Hard</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center transition-colors hover:bg-slate-100">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Med : Easy</p>
              <p className="text-xl font-black text-slate-900">{lcStats.medium_to_easy_ratio || lcStats.medEasyRatio || 0}<span className="text-sm text-slate-400">x</span></p>
              <p className="text-[10px] font-medium text-emerald-600 mt-1 flex justify-center items-center gap-1"><CheckCircle2 size={10}/> Healthy Ratio</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center transition-colors hover:bg-slate-100">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Hard : Med</p>
              <p className={`text-xl font-black ${lcInsight.ratioColor}`}>{lcStats.hard_to_medium_ratio || lcStats.hardMedRatio || 0}<span className="text-sm opacity-50">x</span></p>
              <p className={`text-[10px] font-medium ${lcInsight.statusColor} mt-1 flex justify-center items-center gap-1`}>{lcInsight.statusIcon} {lcInsight.statusText}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className={`${cfInsight.bg} border ${cfInsight.border} rounded-lg p-3 mb-6 flex items-start gap-3 shadow-sm`}>
            {cfInsight.icon}
            <div className={`text-[13px] ${cfInsight.textMain} leading-tight`}>
              <strong className={`${cfInsight.textTitle} font-bold`}>Insight: {cfInsight.title}</strong>
              <p className="mt-1 opacity-90">{cfInsight.desc}</p>
            </div>
          </div>

          <div className="mb-6 mt-auto">
            <div className="h-40 w-full relative">
              <CodeforcesPieChart data={cfPieData} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-900 leading-none">{cfStats.totalSolved || cfStats.total || 0}</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase mt-1 tracking-wider">Solved</span>
              </div>
            </div>
            <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 text-[10px] font-bold text-slate-500 mt-4 uppercase tracking-wider">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#94a3b8]"></div> &lt;1200</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#10b981]"></div> 12-1400</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#06b6d4]"></div> 14-1600</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div> 1600+</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center transition-colors hover:bg-slate-100">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Target Match</p>
              <p className="text-xl font-black text-slate-900">1400+</p>
              <p className="text-[10px] font-medium text-emerald-600 mt-1">On Track</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center transition-colors hover:bg-slate-100">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total CF Solved</p>
              <p className="text-xl font-black text-[#1F8ACB]">{cfStats.totalSolved || cfStats.total || 0}</p>
              <p className="text-[10px] font-medium text-slate-500 mt-1 capitalize">{cfStats.rank || "Current Rank"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}