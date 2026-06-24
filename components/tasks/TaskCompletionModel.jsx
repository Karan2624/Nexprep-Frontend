import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

export default function TaskCompletionModal({ isOpen, task, onClose, onConfirm, isSubmitting }) {
  const [actualTime, setActualTime] = useState('');

  useEffect(() => {
    if (task && isOpen) {
      setActualTime(task.estimatedMinutes.toString());
    }
  }, [task, isOpen]);

  if (!isOpen || !task) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(task._id, parseInt(actualTime) || 0);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-pop-in">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-900">Task Completed! 🎉</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors bg-white hover:bg-slate-100 p-1.5 rounded-full shadow-sm border border-slate-200">
            <X size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">How many minutes did this actually take?</label>
            <p className="text-xs text-slate-500 mb-3">Estimated time was {task.estimatedMinutes} minutes.</p>
            <input 
              type="number" min="1" required
              value={actualTime}
              onChange={(e) => setActualTime(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium text-slate-900"
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
              Cancel
            </button>
            <button disabled={isSubmitting} type="submit" className="flex items-center gap-2 px-5 py-2 rounded-lg text-[14px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transform active:scale-95 transition-all disabled:opacity-70">
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Save Progress"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}