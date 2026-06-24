"use client";

import React, { useState, useEffect } from 'react';
import { api } from "../../lib/axios";
import TaskStatsCards from '../../components/tasks/TasksStatsCard';
import TaskCharts from '../../components/tasks/TaskCharts';
import TaskForm from '../../components/tasks/TaskForm';
import TaskList from '../../components/tasks/TaskList';
import { Loader2 } from 'lucide-react';
import TaskCompletionModal from '../../components/tasks/TaskCompletionModel';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completionModal, setCompletionModal] = useState({ isOpen: false, task: null });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await api.get(`/dailyTask/list?date=${today}`);
      setTasks(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (newTaskData) => {
    setIsSubmitting(true);

    try {
      const response = await api.post("/dailyTask/create-task", {
        ...newTaskData,
        estimatedMinutes: parseInt(newTaskData.estimatedMinutes)
      });

      const today = new Date().toISOString().split('T')[0];

      if (newTaskData.targetDate === today) {
        setTasks(prev => [...prev, response.data.data]);
      }

      return true;
    } catch (error) {
      console.error("Failed to create task", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const previousTasks = [...tasks];

    setTasks(tasks.filter(task => task._id !== taskId));

    try {
      await api.delete(`/dailyTask/delete-task/${taskId}`);
    } catch (error) {
      console.error("Failed to delete task", error);
      setTasks(previousTasks);
    }
  };

  const handleToggleTask = (taskId) => {
    const task = tasks.find(t => t._id === taskId);

    if (!task || task.isCompleted) return;

    setCompletionModal({
      isOpen: true,
      task
    });
  };

  const confirmTaskCompletion = async (taskId, timeTaken) => {
    setIsSubmitting(true);

    try {
      await api.patch(`/dailyTask/complete-task/${taskId}`, {
        timeTaken
      });

      setTasks(
        tasks.map(t =>
          t._id === taskId
            ? {
                ...t,
                isCompleted: true,
                timeSpentMinutes: timeTaken
              }
            : t
        )
      );

      setCompletionModal({
        isOpen: false,
        task: null
      });
    } catch (error) {
      console.error("Failed to complete task", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={40} className="animate-spin text-blue-600 mb-4" />
        <p className="text-slate-500 font-medium">
          Loading your tasks...
        </p>
      </div>
    );
  }

  const totalEstimated = tasks.reduce(
    (acc, t) => acc + t.estimatedMinutes,
    0
  );

  const totalSpent = tasks.reduce(
    (acc, t) => acc + t.timeSpentMinutes,
    0
  );

  const completedCount = tasks.filter(
    t => t.isCompleted
  ).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-[32px] font-bold text-slate-900 mb-2">
            Daily Tasks
          </h1>
          <p className="text-slate-600 text-[15px]">
            Manage your coding practice, academics, and projects.
          </p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm shadow-sm flex flex-col flex-1 md:flex-auto items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Progress
            </span>
            <span className="font-bold text-slate-900">
              {completedCount} / {tasks.length} Done
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm shadow-sm flex flex-col flex-1 md:flex-auto items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Time
            </span>
            <span className="font-bold text-slate-900">
              {totalSpent} / {totalEstimated} mins
            </span>
          </div>
        </div>
      </div>

      <TaskStatsCards tasks={tasks} />

      <TaskCharts tasks={tasks} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <TaskForm
            onCreateTask={handleCreateTask}
            isSubmitting={isSubmitting}
          />
        </div>

        <div className="xl:col-span-2">
          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>

      <TaskCompletionModal
        isOpen={completionModal.isOpen}
        task={completionModal.task}
        onClose={() =>
          setCompletionModal({
            isOpen: false,
            task: null
          })
        }
        onConfirm={confirmTaskCompletion}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}