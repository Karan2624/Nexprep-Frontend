import { List, AlertCircle } from "lucide-react";

export default function TopicMastery({ topicsData, weakspots }) {
  return (
  
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm h-95 flex flex-col lg:col-span-3 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <List size={20} className="text-blue-600" />
          <h3 className="font-bold text-slate-900 text-lg">Topic Mastery</h3>
        </div>
        
      </div>
      
      {weakspots.insight && (
        <div className="bg-[#FFF5F5] border border-rose-100 rounded-lg p-3 mb-4 flex items-start gap-3 shadow-sm">
          <AlertCircle size={16} className="text-rose-500 mt-0.5 shrink-0" />
          <p className="text-[13px] text-rose-900 leading-tight">
            <strong className="text-rose-700 font-bold">AI Insight:</strong> {weakspots.insight}
          </p>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="grid grid-cols-12 gap-4 pb-2 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider pr-2">
          <div className="col-span-4">Topic</div>
          <div className="col-span-3">Mastery</div>
          <div className="col-span-3">Progress</div>
          <div className="col-span-2 text-right">Rec Target</div>
        </div>
        
        <div className="flex-1 flex flex-col justify-start py-2 overflow-y-auto pr-2 custom-scrollbar">
          {topicsData.map((item, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-4 items-center py-2.5 border-b border-dashed border-slate-100 last:border-0 hover:bg-slate-50/50 px-2 -mx-2 rounded transition-colors group">
              <div className="col-span-4 font-semibold text-slate-900 text-[13px] pr-2 group-hover:text-blue-700 transition-colors truncate" title={item.topic}>{item.topic}</div>
              <div className={`col-span-3 text-[11px] font-bold ${item.levelColor}`}>{item.level}</div>
              <div className="col-span-3">
                <div className="w-full rounded-full h-1.5 overflow-hidden flex bg-slate-100">
                  <div className={`h-full rounded-full ${item.progressColor}`} style={{ width: `${item.progress}%` }}></div>
                  <div className={`h-full flex-1 ${item.trackColor}`}></div>
                </div>
              </div>
              <div className="col-span-2 text-right text-[11px] text-slate-600 font-medium group-hover:text-slate-900">{item.next}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}