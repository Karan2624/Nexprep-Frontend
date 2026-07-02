import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";

export default function RadarSkillChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart 
        cx="50%" 
        cy="50%" 
        outerRadius="75%" 
        data={data} 
        margin={{ top: 15, right: 30, bottom: 15, left: 30 }}
      >
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} 
        />
        <Radar 
          name="Skill" 
          dataKey="A" 
          stroke="#3b82f6" 
          strokeWidth={2.5} 
          fill="#3b82f6" 
          fillOpacity={0.15} 
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          itemStyle={{ fontWeight: 'bold' }}
          labelStyle={{ color: '#64748b', marginBottom: '4px' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}