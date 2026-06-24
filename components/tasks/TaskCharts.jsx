import React from 'react';
import { Target, BarChart2 } from 'lucide-react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Cell,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer
} from 'recharts';

const TaskScatterTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const diff = data.actual - data.estimated;

    return (
      <div className="bg-white/95 backdrop-blur-md p-4 border border-slate-200 rounded-xl shadow-xl z-50">
        <p className="text-xs font-bold text-slate-900 mb-2">{data.name}</p>

        <div className="flex items-center justify-between gap-6 text-sm mb-2">
          <span className="font-medium text-slate-500">Estimated:</span>
          <span className="font-bold text-slate-900">{data.estimated}m</span>
        </div>

        <div className="flex items-center justify-between gap-6 text-sm mb-2">
          <span className="font-medium text-slate-500">Actual:</span>
          <span className="font-bold text-slate-900">{data.actual}m</span>
        </div>

        <div
          className={`text-[11px] font-bold mt-2 pt-2 border-t border-slate-100 ${
            diff > 0
              ? 'text-rose-500'
              : diff < 0
              ? 'text-emerald-500'
              : 'text-blue-500'
          }`}
        >
          {diff > 0
            ? `Took ${diff}m longer than expected`
            : diff < 0
            ? `Finished ${Math.abs(diff)}m early`
            : 'Perfectly estimated!'}
        </div>
      </div>
    );
  }

  return null;
};

export default function TaskCharts({ tasks }) {
  const completedTasksList = tasks.filter(t => t.isCompleted);

  const scatterData = completedTasksList.map(t => ({
    name: t.title,
    estimated: t.estimatedMinutes,
    actual: t.timeSpentMinutes,
    type: t.type
  }));

  const maxVal =
    scatterData.length > 0
      ? Math.max(
          ...scatterData.map(d =>
            Math.max(d.estimated, d.actual)
          ),
          100
        ) + 10
      : 100;

  const barData = ['Coding', 'Academic', 'Project']
    .map(cat => {
      const catTasks = completedTasksList.filter(
        t => t.type === cat
      );

      const est = catTasks.reduce(
        (acc, t) => acc + t.estimatedMinutes,
        0
      );

      const act = catTasks.reduce(
        (acc, t) => acc + t.timeSpentMinutes,
        0
      );

      return {
        category: cat,
        Estimated: est,
        Actual: act
      };
    })
    .filter(d => d.Estimated > 0 || d.Actual > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Target size={18} className="text-blue-600" />
              Planning Fallacy
            </h3>

            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Estimated vs Actual Time (m)
            </p>
          </div>

          <div className="flex gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase hidden sm:block">
                Coding
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase hidden sm:block">
                Acad.
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase hidden sm:block">
                Proj.
              </span>
            </div>
          </div>
        </div>

        <div className="w-full relative mt-2">
          <ResponsiveContainer width="100%" height={340}>
            <ScatterChart
              margin={{
                top: 10,
                right: 10,
                bottom: 0,
                left: -20
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />

              <XAxis
                type="number"
                dataKey="estimated"
                name="Estimated"
                unit="m"
                domain={[0, maxVal]}
                tick={{
                  fontSize: 11,
                  fill: '#94a3b8',
                  fontWeight: 600
                }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />

              <YAxis
                type="number"
                dataKey="actual"
                name="Actual"
                unit="m"
                domain={[0, maxVal]}
                tick={{
                  fontSize: 11,
                  fill: '#94a3b8',
                  fontWeight: 600
                }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />

              <RechartsTooltip
                content={props => (
                  <TaskScatterTooltip {...props} />
                )}
                cursor={{
                  strokeDasharray: '3 3',
                  stroke: '#94a3b8'
                }}
              />

              <ReferenceLine
                segment={[
                  { x: 0, y: 0 },
                  { x: maxVal, y: maxVal }
                ]}
                stroke="#cbd5e1"
                strokeWidth={2}
                strokeDasharray="4 4"
              />

              <Scatter
                name="Tasks"
                data={scatterData}
              >
                {scatterData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.type === 'Coding'
                        ? '#3b82f6'
                        : entry.type === 'Academic'
                        ? '#a855f7'
                        : '#10b981'
                    }
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
            <BarChart2
              size={18}
              className="text-blue-600"
            />
            Category Efficiency
          </h3>

          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Average accuracy per domain
          </p>
        </div>

        <div className="w-full mt-2">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={barData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />

              <XAxis
                dataKey="category"
                tick={{
                  fontSize: 11,
                  fill: '#64748b',
                  fontWeight: 600
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 11,
                  fill: '#64748b',
                  fontWeight: 600
                }}
                axisLine={false}
                tickLine={false}
              />

              <RechartsTooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow:
                    '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  padding: '12px'
                }}
                itemStyle={{
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
                labelStyle={{
                  color: '#64748b',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  marginBottom: '8px'
                }}
              />

              <Legend
                iconType="circle"
                wrapperStyle={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#64748b',
                  paddingTop: '10px'
                }}
              />

              <Bar
                dataKey="Estimated"
                fill="#cbd5e1"
                radius={[4, 4, 0, 0]}
                maxBarSize={45}
              />

              <Bar
                dataKey="Actual"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                maxBarSize={45}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}