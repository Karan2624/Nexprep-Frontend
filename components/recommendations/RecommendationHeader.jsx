import { RefreshCw } from "lucide-react";

export default function RecommendationHeader({ weakSpots, onSync, loading }) {
  return (
    <header className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
      <div>
        <h1 className="text-[28px] font-bold text-slate-900 flex items-center gap-2">
          Smart Recommendations 
        </h1>
        {weakSpots.length > 0 && (
          <p className="text-slate-600 text-[15px] mt-2 flex items-center gap-1.5 flex-wrap">
            Based on your weak spots: 
            {weakSpots.map((spot, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <span className="bg-[#F1F5F9] text-slate-700 px-2 py-0.5 rounded text-[13px] font-mono border border-[#E2E8F0] shadow-sm">
                  {spot}
                </span>
                {idx < weakSpots.length - 2 && <span>,</span>}
                {idx === weakSpots.length - 2 && <span>and</span>}
              </span>
            ))}
          </p>
        )}
      </div>

      {/* Sync Button Container */}
      <div className="flex items-center gap-3 shrink-0 mt-1">
        <button 
          onClick={onSync}
          disabled={loading}
          className="bg-[#EBF3FF] text-blue-700 hover:bg-blue-100 transition-colors px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 group"
        >
          <RefreshCw 
            size={14} 
            className={loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"} 
          /> 
          {loading ? "Syncing..." : "Sync Stats"}
        </button>
      </div>
    </header>
  );
}