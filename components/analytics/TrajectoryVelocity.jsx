import LeetCodeLineChart from "./LeetCodeLineChart";
import CodeforcesLineChart from "./CodeforcesLineChart";

export default function TrajectoryVelocity({
  lcLineData,
  cfLineData,
  lcStats,
  cfStats,
}) {
  return (
    <div className="bg-white p-6 rounded-xl lg:col-span-2">
      <h3 className="font-bold mb-6">Trajectory & Velocity</h3>

      <div className="grid grid-cols-2 gap-6">
        <LeetCodeLineChart data={lcLineData} />
        <CodeforcesLineChart data={cfLineData} />
      </div>
    </div>
  );
}