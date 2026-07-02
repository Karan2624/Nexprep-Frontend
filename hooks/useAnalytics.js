import { useState, useEffect } from "react";
import { fetchAnalyticsData } from "@/lib/analyticsApi";

export default function useAnalytics() {
  const [loading, setLoading] = useState(true);
  const [radarData, setRadarData] = useState([]);
  const [topicsData, setTopicsData] = useState([]);
  const [lcLineData, setLcLineData] = useState([]);
  const [cfLineData, setCfLineData] = useState([]);
  const [lcPieData, setLcPieData] = useState([]);
  const [cfPieData, setCfPieData] = useState([]);
  const [lastSynced, setLastSynced] = useState("Just now");
  const [lcStats, setLcStats] = useState({});
  const [cfStats, setCfStats] = useState({});
  const [weakspots, setWeakspots] = useState({ list: [], insight: "" });

  const fetchAnalytics = async () => {
    setLoading(true);
    const data = await fetchAnalyticsData();

    setRadarData(data.radarData || []);
    setTopicsData(data.topicsData || []);
    setLcLineData(data.lcLineData || []);
    setCfLineData(data.cfLineData || []);
    setLcPieData(data.lcPieData || []);
    setCfPieData(data.cfPieData || []);
    setLcStats(data.lcStats || {});
    setCfStats(data.cfStats || {});
    setWeakspots(data.weakspots || { list: [], insight: "" });
    setLastSynced("Just now");

    setLoading(false);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    loading,
    radarData,
    topicsData,
    lcLineData,
    cfLineData,
    lcPieData,
    cfPieData,
    lcStats,
    cfStats,
    weakspots,
    lastSynced,
    fetchAnalytics,
  };
}