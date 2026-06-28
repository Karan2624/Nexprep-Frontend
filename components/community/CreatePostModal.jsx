import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function CreatePostModal({ isOpen, onClose, onSubmit }) {
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newPost);
    setNewPost({ title: '', content: '', tags: '' });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-pop-in">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900">Create New Discussion</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors bg-white hover:bg-slate-100 p-1.5 rounded-full shadow-sm border border-slate-200">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Title</label>
            <input 
              type="text" 
              required
              placeholder="Summarize your question or topic..." 
              value={newPost.title}
              onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-medium text-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Content Details</label>
            <textarea 
              required
              placeholder="Provide details, code snippets, or context here..." 
              rows={5}
              value={newPost.content}
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all resize-none text-slate-800"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Tags (comma separated)</label>
            <input 
              type="text" 
              placeholder="e.g. DP, Google, SystemDesign" 
              value={newPost.tags}
              onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            />
          </div>
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transform active:scale-95 transition-all">
              Post Discussion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}