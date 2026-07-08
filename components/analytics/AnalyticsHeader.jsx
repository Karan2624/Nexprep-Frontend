import { RefreshCw } from "lucide-react";
import PlatformLinker from "../layout/PlatformLinker";

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
        <PlatformLinker onSync={onSync} />

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