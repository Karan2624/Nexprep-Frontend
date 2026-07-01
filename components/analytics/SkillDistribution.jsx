import RadarSkillChart from "./RadarSkillChart";

export default function SkillDistribution({ radarData }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="font-bold mb-4">Skill Distribution</h3>
      <RadarSkillChart data={radarData} />
    </div>
  );
}