import { Link2, RefreshCw } from "lucide-react";

export default function AnalyticsHeader({ lastSynced, onSync }) {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
      
      
      <div className="max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
          Performance Analytics
        </h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">
          Deep dive into your competitive programming mastery.
        </p>
      </div>

      
      <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
        
        {/* Link badges */}
        <div className="flex flex-wrap gap-3">
          <div className="bg-[#FFA116] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm">
            <Link2 size={14} />
            LeetCode Linked
          </div>

          <div className="bg-[#1F8ACB] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm">
            <Link2 size={14} />
            Codeforces Linked
          </div>
        </div>

        {/* Sync button */}
        <button
          onClick={onSync}
          className="bg-blue-100 px-4 py-2 rounded-lg flex items-center gap-2 w-fit"
        >
          <RefreshCw size={16} />
          Sync Stats
        </button>
      </div>
    </div>
  );
}