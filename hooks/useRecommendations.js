import { useState, useEffect, useMemo } from "react";
import { fetchRecommendationsData } from "@/lib/recommendationApi";

export default function useRecommendations() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("LeetCode");
  const [activeDifficulty, setActiveDifficulty] = useState("Medium");
  
  const [lcCalibration, setLcCalibration] = useState({});
  const [lcProblems, setLcProblems] = useState([]);
  const [cfProblems, setCfProblems] = useState([]);
  const [weakSpots, setWeakSpots] = useState([]);

  const formatTopicName = (topic) => {
    if (!topic) return "General";
    return topic.split('_').join('-').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    const data = await fetchRecommendationsData();

    if (data.leetcode && Array.isArray(data.leetcode.recommendations)) {
      setLcCalibration(data.leetcode.calibration || {});
      
      const formattedLc = data.leetcode.recommendations.map((rec, index) => {
        const topWeakTopic = Object.keys(rec.your_mastery_in_topic || {})[0] || "General";
        const masteryVal = (rec.your_mastery_in_topic || {})[topWeakTopic] || 0;
        
        return {
          platform: 'LeetCode',
          platformIcon: 'LC',
          id: `#${index + 1}`,
          title: rec.title || "LeetCode Problem",
          difficulty: rec.difficulty || "Medium", 
          statLabel: 'AC Rate',
          statValue: rec.acRate ? `${Math.round(rec.acRate)}%` : "N/A",
          masteryTopic: formatTopicName(topWeakTopic),
          masteryPercent: Math.round(masteryVal * 100),
          whyRecommended: rec.why_recommended || "Recommended based on your history",
          platformColor: 'text-[#FFA116]',
          platformBg: 'bg-[#FFA116]/10 border-[#FFA116]/20',
          url: rec.url || "#"
        };
      });
      setLcProblems(formattedLc);

      const extractedSpots = new Set();
      data.leetcode.recommendations.forEach(rec => {
        Object.keys(rec.your_mastery_in_topic || {}).slice(0, 2).forEach(topic => {
          extractedSpots.add(formatTopicName(topic));
        });
      });
      setWeakSpots(Array.from(extractedSpots).slice(0, 3));
    }

    if (data.codeforces && Array.isArray(data.codeforces.recommendations)) {
      const formattedCf = data.codeforces.recommendations.map((rec) => {
        const topWeakTopic = Object.keys(rec.your_mastery_in_topic || {})[0] || "General";
        const masteryVal = (rec.your_mastery_in_topic || {})[topWeakTopic] || 0;
        
        return {
          platform: 'Codeforces',
          platformIcon: 'CF',
          id: `Rating ${rec.cf_rating || "N/A"}`,
          title: rec.title || "Codeforces Problem",
          difficulty: rec.difficulty || "Medium", 
          statLabel: 'Rating',
          statValue: rec.cf_rating ? rec.cf_rating.toString() : "N/A", 
          masteryTopic: formatTopicName(topWeakTopic),
          masteryPercent: Math.round(masteryVal * 100),
          whyRecommended: rec.why_recommended || "Recommended based on your history",
          platformColor: 'text-[#1F8ACB]',
          platformBg: 'bg-[#1F8ACB]/10 border-[#1F8ACB]/20',
          url: rec.url || "#"
        };
      });
      setCfProblems(formattedCf);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const displayedProblems = useMemo(() => {
    const list = activeTab === "LeetCode" ? lcProblems : cfProblems;
    return list.filter(p => {
      const diff = p.difficulty || "Medium";
      return diff.toLowerCase() === activeDifficulty.toLowerCase();
    });
  }, [activeTab, activeDifficulty, lcProblems, cfProblems]);

  return {
    loading,
    activeTab,
    setActiveTab,
    activeDifficulty,
    setActiveDifficulty,
    lcCalibration,
    displayedProblems,
    weakSpots,
    fetchRecommendations
  };
}