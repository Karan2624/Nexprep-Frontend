import React, { useState } from 'react';
import { Plus, Loader2, CheckCircle } from 'lucide-react';

export default function TaskForm({ onCreateTask, isSubmitting }) {
  const today = new Date().toISOString().split('T')[0];

  const [newTask, setNewTask] = useState({
    title: '',
    type: 'Coding',
    priority: 'Medium',
    estimatedMinutes: 60,
    targetDate: today
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) return;

    const isSuccess = await onCreateTask(newTask);

    if (isSuccess) {
      setNewTask({
        title: '',
        type: 'Coding',
        priority: 'Medium',
        estimatedMinutes: 60,
        targetDate: today
      });

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Plus size={18} className="text-blue-600" />
        Add New Task
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
            Task Title
          </label>

          <input
            type="text"
            required
            placeholder="e.g. Solve 2 Hard Graphs"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                title: e.target.value
              })
            }
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Type
            </label>

            <select
              value={newTask.type}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  type: e.target.value
                })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            >
              <option value="Coding">Coding</option>
              <option value="Academic">Academic</option>
              <option value="Project">Project</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Priority
            </label>

            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  priority: e.target.value
                })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Est. Minutes
            </label>

            <input
              type="number"
              min="1"
              required
              value={newTask.estimatedMinutes}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  estimatedMinutes: e.target.value
                })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Target Date
            </label>

            <input
              type="date"
              required
              value={newTask.targetDate}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  targetDate: e.target.value
                })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-slate-700"
            />
          </div>
        </div>

        <button
          disabled={isSubmitting || showSuccess}
          type="submit"
          className={`w-full flex justify-center items-center gap-2 font-semibold py-2.5 rounded-lg shadow-sm transition-all duration-300 transform active:scale-95 text-sm mt-2 disabled:opacity-90 ${
            showSuccess
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white cursor-default'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Creating...</span>
            </>
          ) : showSuccess ? (
            <>
              <CheckCircle size={18} className="animate-pop-in" />
              <span>Task Created!</span>
            </>
          ) : (
            'Create Task'
          )}
        </button>
      </form>
    </div>
  );
}