import { Link2, RefreshCw } from "lucide-react";

export default function AnalyticsHeader({ lastSynced, onSync }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold">Performance Analytics</h1>
        <p className="text-slate-600">
          Deep dive into your competitive programming mastery.
        </p>
      </div>

      <div className="flex flex-col items-end gap-3">
        <div className="flex gap-3">
          <div className="bg-[#FFA116] text-white px-4 py-2 rounded-full flex gap-2">
            <Link2 size={14} /> LeetCode Linked
          </div>

          <div className="bg-[#1F8ACB] text-white px-4 py-2 rounded-full flex gap-2">
            <Link2 size={14} /> Codeforces Linked
          </div>
        </div>

        <button
          onClick={onSync}
          className="bg-blue-100 px-4 py-2 rounded-lg flex gap-2"
        >
          <RefreshCw size={16} /> Sync Stats
        </button>
      </div>
    </div>
  );
}