import React from 'react';
import { CheckSquare, Check, Clock, Trash2 } from 'lucide-react';

export default function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  const getTypeStyle = (type) => {
    switch (type) {
      case 'Coding':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Academic':
        return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Project':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-600';
      case 'Medium':
        return 'bg-orange-50 text-orange-600';
      case 'Low':
        return 'bg-slate-100 text-slate-500 border border-slate-200';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-bold text-slate-900">Today's Focus</h3>
        <span className="text-xs font-semibold text-slate-500">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>

      <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto custom-scrollbar">
        {tasks.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <CheckSquare
              size={40}
              className="mx-auto mb-3 text-slate-300"
            />
            <p>No tasks scheduled for today. Take a break or add one!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`p-5 flex items-start gap-4 transition-all duration-300 hover:bg-slate-50 group ${
                task.isCompleted
                  ? 'opacity-70 bg-slate-50/50'
                  : ''
              }`}
            >
              <button
                disabled={task.isCompleted}
                onClick={() => onToggleTask(task._id)}
                className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all duration-300 mt-0.5 ${
                  task.isCompleted
                    ? 'bg-emerald-500 border-emerald-500 shadow-sm cursor-default'
                    : 'border-2 border-slate-300 hover:border-blue-400 cursor-pointer'
                }`}
              >
                {task.isCompleted && (
                  <Check
                    size={14}
                    strokeWidth={4}
                    className="text-white animate-pop-in"
                  />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-[15px] font-bold leading-tight mb-2 truncate transition-colors ${
                    task.isCompleted
                      ? 'text-slate-500 line-through'
                      : 'text-slate-900 group-hover:text-blue-700'
                  }`}
                >
                  {task.title}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider mb-3">
                  <span
                    className={`px-2 py-0.5 rounded border ${getTypeStyle(
                      task.type
                    )}`}
                  >
                    {task.type}
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded transition-colors ${getPriorityStyle(
                      task.priority
                    )}`}
                  >
                    {task.priority} Priority
                  </span>

                  {task.targetDate && (
                    <span className="text-slate-400 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(
                        task.targetDate
                      ).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        task.isCompleted
                          ? task.timeSpentMinutes <=
                            task.estimatedMinutes
                            ? 'bg-emerald-500'
                            : 'bg-rose-500'
                          : 'bg-blue-500'
                      }`}
                      style={{
                        width: `${
                          task.estimatedMinutes
                            ? Math.min(
                                100,
                                (task.timeSpentMinutes /
                                  task.estimatedMinutes) *
                                  100
                              )
                            : 0
                        }%`
                      }}
                    ></div>
                  </div>

                  <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap w-16 text-right">
                    {task.timeSpentMinutes} /{' '}
                    {task.estimatedMinutes}m
                  </span>
                </div>
              </div>

              <button
                onClick={() => onDeleteTask(task._id)}
                className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors md:opacity-0 group-hover:opacity-100 focus:opacity-100 mt-1 shrink-0"
                title="Delete Task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}