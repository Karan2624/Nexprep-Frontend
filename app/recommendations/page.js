"use client";

import useRecommendations from "@/hooks/useRecommendations";
import RecommendationHeader from "@/components/recommendations/RecommendationHeader";
import FiltersBox from "@/components/recommendations/FiltersBox";
import CalibrationBox from "@/components/recommendations/CalibrationBox";
import ProblemCard from "@/components/recommendations/ProblemCard";

export default function RecommendationsPage() {
  const {
    loading,
    activeTab,
    setActiveTab,
    activeDifficulty,
    setActiveDifficulty,
    lcCalibration,
    displayedProblems,
    weakSpots,
    fetchRecommendations 
  } = useRecommendations();

  
  return (
    <div className="space-y-6">
      <RecommendationHeader 
        weakSpots={weakSpots} 
        onSync={fetchRecommendations} 
        loading={loading} 
      />

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:w-[280px] shrink-0 space-y-6">
          <FiltersBox 
            activeDifficulty={activeDifficulty} 
            setActiveDifficulty={setActiveDifficulty} 
          />
          <CalibrationBox calibration={lcCalibration} />
        </div>

        <div className="flex-1 w-full min-w-0">
          <div className="flex gap-4 mb-6 overflow-x-auto pb-2 custom-scrollbar">
             {/* ... Your existing Tabs code ... */}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Optional: Show a subtle loading state for the cards area 
               if loading is true and there are no displayed problems yet 
            */}
            {loading && displayedProblems.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-500 bg-white border border-slate-200 rounded-xl animate-pulse">
                Fetching latest recommendations...
              </div>
            ) : displayedProblems.length > 0 ? (
              displayedProblems.map((problem) => (
                <ProblemCard 
                  key={`${problem.platform}-${problem.title}`} 
                  problem={problem} 
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500 bg-white border border-slate-200 rounded-xl">
                No {activeDifficulty} problems found for {activeTab}.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}