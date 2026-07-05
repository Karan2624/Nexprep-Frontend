import { ExternalLink, Target } from "lucide-react";

export default function ProblemCard({ problem }) {
  return (
    <div className="bg-linear-to-br from-[#F8FAFF] to-[#EBF2FC] border border-blue-100/60 rounded-xl p-6 shadow-sm flex flex-col transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-300/60 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition-colors duration-300 ${problem.platformBg} ${problem.platformColor}`}>
            {problem.platformIcon}
          </span>
          {problem.platform} • {problem.id}
        </div>
        <a href={problem.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors transform group-hover:rotate-45 duration-300">
          <ExternalLink size={16} />
        </a>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 transition-colors group-hover:text-blue-700">{problem.title}</h3>
      
      <div className="flex gap-2 mb-8">
        <span className="px-2.5 py-0.5 bg-white border border-blue-200 text-blue-600 rounded-full text-xs font-semibold shadow-sm">
          {problem.difficulty}
        </span>
        <span className="px-2.5 py-0.5 bg-white border border-blue-200 text-blue-600 rounded-full text-xs font-semibold shadow-sm">
          {problem.statLabel}: {problem.statValue}
        </span>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-600 text-[13px]">Mastery: {problem.masteryTopic}</span>
          <span className="font-bold text-slate-900 text-[13px]">{problem.masteryPercent}%</span>
        </div>
        <div className="w-full bg-blue-100/50 rounded-full h-1 overflow-hidden">
          <div className="bg-blue-600 h-1 rounded-full transition-all duration-1000 ease-out" style={{ width: `${problem.masteryPercent}%` }}></div>
        </div>
      </div>

      <div className="bg-[#F0F5FF] border border-blue-100/50 rounded-lg p-4 mb-6 flex gap-3 flex-1 items-start transition-colors group-hover:bg-blue-50/80">
        <Target size={16} className="text-blue-500 shrink-0 mt-0.5 animate-pulse" />
        <p className="text-[13px] text-slate-700 leading-relaxed font-mono tracking-tight">
          <span className="font-semibold text-slate-900 font-sans tracking-normal">Why Recommended:</span> {problem.whyRecommended}
        </p>
      </div>

      <a href={problem.url} target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-black hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-300 transform active:scale-95 text-[14px]">
        Solve Problem
      </a>
    </div>
  );
}