import { Goal } from "lucide-react";
import RadarSkillChart from "./RadarSkillChart";

export default function SkillDistribution({ radarData }) {
  const checkeredBg = {
    backgroundImage: 'conic-gradient(#f8fafc 90deg, #ffffff 90deg 180deg, #f8fafc 180deg 270deg, #ffffff 270deg)',
    backgroundSize: '24px 24px'
  };

  return (
  
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col h-95 lg:col-span-2 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Goal size={20} className="text-blue-600" />
        <h3 className="font-bold text-slate-900 text-lg">Skill Distribution</h3>
      </div>
      <div className="flex-1 relative rounded-xl border border-slate-100 overflow-hidden" style={checkeredBg}>
        <div className="absolute inset-0 pb-4">
          <RadarSkillChart data={radarData} />
        </div>
      </div>
    </div>
  );
}