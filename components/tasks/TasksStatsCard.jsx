import React from 'react';

export default function TaskStatsCards({ tasks }) {
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

  const progressPercent = tasks.length
    ? Math.round(
        (completedCount / tasks.length) * 100
      )
    : 0;

  const getCategoryStats = (category) => {
    const catTasks = tasks.filter(
      t => t.type === category
    );

    const done = catTasks.filter(
      t => t.isCompleted
    ).length;

    return {
      total: catTasks.length,
      done,
      percent: catTasks.length
        ? Math.round(
            (done / catTasks.length) * 100
          )
        : 0
    };
  };

  const codingStats = getCategoryStats('Coding');
  const academicStats = getCategoryStats('Academic');

  const completedTasksList = tasks.filter(
    t => t.isCompleted
  );

  const totalCompletedEstimated =
    completedTasksList.reduce(
      (acc, t) => acc + t.estimatedMinutes,
      0
    );

  const totalCompletedSpent =
    completedTasksList.reduce(
      (acc, t) => acc + t.timeSpentMinutes,
      0
    );

  const percentUsed = totalCompletedEstimated
    ? Math.round(
        (totalCompletedSpent /
          totalCompletedEstimated) *
          100
      )
    : 0;

  const timeDiff =
    totalCompletedEstimated -
    totalCompletedSpent;

  const isFaster = timeDiff >= 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col justify-between">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
          Overall Progress
        </p>

        <div>
          <div className="flex items-end gap-2 mb-2.5">
            <span className="text-3xl font-black text-slate-900 leading-none">
              {progressPercent}%
            </span>

            <span className="text-sm font-semibold text-slate-400 leading-none mb-1">
              {completedCount}/{tasks.length} Done
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPercent}%`
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col justify-between">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
          Coding
        </p>

        <div>
          <div className="flex items-end gap-2 mb-2.5">
            <span className="text-3xl font-black text-slate-900 leading-none">
              {codingStats.done}
            </span>

            <span className="text-sm font-semibold text-slate-400 leading-none mb-1">
              / {codingStats.total} Tasks
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-400 h-full rounded-full transition-all duration-500"
              style={{
                width: `${codingStats.percent}%`
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col justify-between">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
          Academic & Projects
        </p>

        <div>
          <div className="flex items-end gap-2 mb-2.5">
            <span className="text-3xl font-black text-slate-900 leading-none">
              {academicStats.done}
            </span>

            <span className="text-sm font-semibold text-slate-400 leading-none mb-1">
              / {academicStats.total} Tasks
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-full transition-all duration-500"
              style={{
                width: `${academicStats.percent}%`
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col justify-between">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
          Est. vs Actual
        </p>

        <div>
          <div className="flex items-end gap-2 mb-2.5">
            <span
              className={`text-3xl font-black leading-none ${
                completedTasksList.length === 0
                  ? 'text-slate-900'
                  : isFaster
                  ? 'text-emerald-500'
                  : 'text-rose-500'
              }`}
            >
              {completedTasksList.length > 0
                ? `${percentUsed}%`
                : 'N/A'}
            </span>

            <span className="text-sm font-semibold text-slate-400 leading-none mb-1">
              {completedTasksList.length === 0
                ? 'of est. time'
                : isFaster
                ? `Saved ${timeDiff}m`
                : `Over by ${Math.abs(
                    timeDiff
                  )}m`}
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFaster
                  ? 'bg-emerald-500'
                  : 'bg-rose-500'
              }`}
              style={{
                width: `${Math.min(
                  100,
                  percentUsed
                )}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}