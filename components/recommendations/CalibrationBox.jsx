import { SlidersHorizontal } from "lucide-react";

export default function CalibrationBox({ calibration }) {
  return (
    <div className="bg-linear-to-br from-[#F8FAFF] to-[#EBF2FC] border border-blue-100/50 rounded-xl p-6 relative overflow-hidden shadow-sm group hover:shadow-md transition-shadow duration-300">
      <div className="absolute right-4 top-6 text-blue-300 transition-transform duration-500 group-hover:rotate-180">
         <SlidersHorizontal size={36} strokeWidth={1} />
      </div>
      <div className="relative z-10">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Calibration</h2>
        <p className="text-sm text-slate-600 mb-8">Targeting your 'stretch' zone.</p>
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Recommended Diff</div>
          <div className="text-2xl font-black text-black tracking-tight">
            {calibration.recommended_difficulty || "MIXED"}
          </div>
        </div>
      </div>
    </div>
  );
}