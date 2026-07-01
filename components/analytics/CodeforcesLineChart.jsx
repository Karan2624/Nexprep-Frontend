import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";

export default function CodeforcesLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data}>
        <Tooltip />
        <Line dataKey="rating" stroke="#1F8ACB" />
      </LineChart>
    </ResponsiveContainer>
  );
}