import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";

export default function LeetCodeLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data}>
        <Tooltip />
        <Line dataKey="rating" stroke="#FFA116" />
      </LineChart>
    </ResponsiveContainer>
  );
}