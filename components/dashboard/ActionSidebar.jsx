import { CheckSquare, Check, Bell, MessageCircle, Clock } from 'lucide-react';

const getPriorityStyle = (p) => {
  switch (p?.toLowerCase()) {
    case 'high': return 'bg-red-50 text-red-600 border-red-100';
    case 'medium': return 'bg-orange-50 text-orange-600 border-orange-100';
    default: return 'bg-slate-50 text-slate-600 border-slate-200';
  }
};

export default function ActionSidebar({ tasks, updates, handleToggleTask }) {
  return (
    <div className="space-y-6">
      
      {/* TASKS */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col max-h-[420px]">
        <div className="px-6 py-5 border-b border-white/60 bg-white/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <CheckSquare size={16} strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-slate-900">Today's Tasks</h3>
          </div>
        </div>
        <div className="p-4 space-y-2 overflow-y-auto custom-scrollbar flex-1">
           {tasks.length > 0 ? tasks.map((task) => (
             <div key={task._id} onClick={() => handleToggleTask(task._id)} className={`flex gap-3 items-center group p-3 rounded-xl cursor-pointer border border-transparent hover:border-white/80 hover:shadow-sm ${task.isCompleted ? 'opacity-60 bg-white/40' : 'bg-white/50'}`}>
                <div className={`w-5 h-5 rounded-[6px] border-2 shrink-0 flex items-center justify-center ${task.isCompleted ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 group-hover:border-blue-400'}`}>
                  {task.isCompleted && <Check size={14} strokeWidth={4} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] font-bold leading-tight mb-1.5 truncate ${task.isCompleted ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{task.title}</p>
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase">
                     <span className={`px-2 py-0.5 rounded-full border ${getPriorityStyle(task.priority)}`}>{task.isCompleted ? 'DONE' : (task.priority || 'MEDIUM')}</span>
                  </div>
                </div>
             </div>
           )) : (
             <p className="text-sm font-medium text-slate-500 text-center py-6">You're completely clear!</p>
           )}
        </div>
      </div>

      {/* UPDATES */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col max-h-[420px]">
        <div className="px-6 py-5 border-b border-white/60 bg-white/40 flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Bell size={16} strokeWidth={2.5} />
          </div>
          <h3 className="font-bold text-slate-900">Recent Updates</h3>
        </div>
        <div className="p-4 space-y-2 overflow-y-auto custom-scrollbar flex-1">
           {updates.length > 0 ? updates.map((update, idx) => (
             <div key={update._id || idx} className="flex gap-4 items-start p-3 bg-white/50 hover:bg-white/80 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  {update.type === 'task' ? <Clock size={14} /> : <MessageCircle size={14} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 leading-tight mb-1">{update.title || update.type || 'System Event'}</p>
                  <p className="text-[12px] font-medium text-slate-500 line-clamp-2 leading-tight">{update.message || update.content}</p>
                </div>
             </div>
           )) : (
             <p className="text-sm font-medium text-slate-500 text-center py-6 bg-white/50 rounded-xl">No system notifications.</p>
           )}
        </div>
      </div>

    </div>
  );
}