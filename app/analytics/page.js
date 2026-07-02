"use client";

import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import SkillDistribution from "@/components/analytics/SkillDistribution";
import TopicMastery from "@/components/analytics/TopicMastery";
import TrajectoryVelocity from "@/components/analytics/TrajectoryVelocity";
import ComfortZone from "@/components/analytics/ComfortZone";
import useAnalytics from "@/hooks/useAnalytics";
import { RefreshCw } from "lucide-react";

export default function AnalyticsPage() {
  const analytics = useAnalytics();

  if (analytics.loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <RefreshCw className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnalyticsHeader
        lastSynced={analytics.lastSynced}
        onSync={analytics.fetchAnalytics}
      />

      {/* CHANGED: lg:grid-cols-3 is now lg:grid-cols-5 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <SkillDistribution radarData={analytics.radarData} />
        <TopicMastery
          topicsData={analytics.topicsData}
          weakspots={analytics.weakspots}
        />
      </div>

      {/* Leave the second row as is (or adjust similarly if you want ComfortZone to be smaller) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TrajectoryVelocity
          lcLineData={analytics.lcLineData}
          cfLineData={analytics.cfLineData}
          lcStats={analytics.lcStats}
          cfStats={analytics.cfStats}
        />

        <ComfortZone
          lcPieData={analytics.lcPieData}
          cfPieData={analytics.cfPieData}
          lcStats={analytics.lcStats}
          cfStats={analytics.cfStats}
        />
      </div>
    </div>
  );
}