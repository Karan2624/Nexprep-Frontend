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

    console.log("Analytics API Response:", data);
    console.log("Radar Data:", data.radarData);
    console.log("Topics Data:", data.topicsData);
    console.log("LC Line Data:", data.lcLineData);
    console.log("CF Line Data:", data.cfLineData);
    console.log("LC Stats:", data.lcStats);
    console.log("CF Stats:", data.cfStats);
    console.log("Weakspots:", data.weakspots);

    setRadarData(data.radarData);
    setTopicsData(data.topicsData);
    setLcLineData(data.lcLineData);
    setCfLineData(data.cfLineData);
    setLcPieData(data.lcPieData);
    setCfPieData(data.cfPieData);
    setLcStats(data.lcStats);
    setCfStats(data.cfStats);
    setWeakspots(data.weakspots);
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