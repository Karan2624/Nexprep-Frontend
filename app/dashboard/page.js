"use client";

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { api } from '../../lib/axios'; 
import { useAuthStore } from '../../store/useAuthStore';
import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import StatCards from '../../components/dashboard/StatCards';
import PlatformCards from '../../components/dashboard/PlatformCards';
import ActionSidebar from '../../components/dashboard/ActionSidebar';
import ActivityHeatmap from '../../components/dashboard/ActivityHeatmap';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [lcStats, setLcStats] = useState(null);
  const [cfStats, setCfStats] = useState(null);
  const [weakspots, setWeakspots] = useState({ list: [], insight: "" });

  useEffect(() => {
    loadDashboardContent();
  }, []);

  const loadDashboardContent = async () => {
    try {
      setIsLoading(true);
      const todayDate = new Date().toISOString().split("T")[0];
      const [lcRes, cfRes, weakspotsRes, tasksRes, notifRes] = await Promise.allSettled([
        api.get('/leetcodeStat'),
        api.get('/codeforcesStat/me'),
        api.get('/recommendations/leetcode/weakspots'),
        api.get('/dailyTask/list',{
          params :{
            date : todayDate
          }
        }),
        api.get('/notification/get-notifications')
      ]);

      if (lcRes.status === 'fulfilled' && lcRes.value.data.data) {
        const d = lcRes.value.data.data;
        setLcStats({ handle: d.username, rating: Math.round(d.contestRating), rank: d.ranking, total: d.totalSolved });
      }
      if (cfRes.status === 'fulfilled' && cfRes.value.data.data) {
        const d = cfRes.value.data.data;
        setCfStats({ handle: d.handle, rating: d.rating, maxRating: d.maxRating, total: d.totalQuestionSolved });
      }
      if (weakspotsRes.status === 'fulfilled' && weakspotsRes.value.data.data) {
        const d = weakspotsRes.value.data.data;
        setWeakspots({ list: (d.weak_spots || []).map(s => ({ topic: s.topic || s, mastery: s.mastery || 0 })), insight: d.insight || "" });
      }
      if (tasksRes.status === 'fulfilled') setTasks(tasksRes.value.data.data || []);
      if (notifRes.status === 'fulfilled') setUpdates((notifRes.value.data.data || []).slice(0, 3));
    } catch (e) { console.error(e); } finally { setIsLoading(false); }
  };

  const handleToggleTask = async (taskId) => {
    setTasks(tasks.map(t => t._id === taskId ? { ...t, isCompleted: !t.isCompleted } : t));
    try { await api.patch(`/daily-task/complete-task/${taskId}`, { timeTaken: 30 }); } 
    catch { setTasks(tasks.map(t => t._id === taskId ? { ...t, isCompleted: !t.isCompleted } : t)); }
  };

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 size={40} className="animate-spin text-blue-600" /></div>;

  return (
    <div className="space-y-6">
      <WelcomeBanner user={user} />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <StatCards user={user} lcStats={lcStats} cfStats={cfStats} weakspots={weakspots} />
          <PlatformCards user={user} lcStats={lcStats} cfStats={cfStats} />
          <ActivityHeatmap user={user} />
        </div>
        <ActionSidebar tasks={tasks} updates={updates} handleToggleTask={handleToggleTask} />
      </div>
    </div>
  );
}