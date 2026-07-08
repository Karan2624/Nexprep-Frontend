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
        <div className="w-full lg:w-70 shrink-0 space-y-6">
          <FiltersBox 
            activeDifficulty={activeDifficulty} 
            setActiveDifficulty={setActiveDifficulty} 
          />
          <CalibrationBox calibration={lcCalibration} />
        </div>

        <div className="flex-1 w-full min-w-0">
          
          
          <div className="flex gap-4 mb-6 overflow-x-auto pb-2 custom-scrollbar">
            <button 
              onClick={() => setActiveTab('LeetCode')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-300 border whitespace-nowrap shrink-0 ${
                activeTab === 'LeetCode' 
                  ? 'border-orange-200 text-[#FFA116] bg-white shadow-md scale-105' 
                  : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:-translate-y-1'
              }`}
            >
              <span className="font-bold text-xs bg-orange-100 text-[#FFA116] px-1 rounded flex items-center justify-center h-4 w-5">&lt;&gt;</span> LeetCode
            </button>
            <button 
              onClick={() => setActiveTab('Codeforces')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-300 border whitespace-nowrap shrink-0 ${
                activeTab === 'Codeforces' 
                  ? 'border-slate-300 text-black bg-white shadow-md scale-105' 
                  : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:-translate-y-1'
              }`}
            >
              <span className="font-bold text-[10px] border border-slate-300 text-slate-500 px-1 rounded flex items-center justify-center h-4 w-5">CF</span> Codeforces
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
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