import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Check, Send, MessageSquare } from 'lucide-react';
import { formatTime } from './communityUtils';

export default function GroupChat({ activeGroup, setActiveGroup, currentUser, groupChats, onSendMessage, onToggleMembership }) {
  const [chatInput, setChatInput] = useState('');
  
  const messagesEndRef = useRef(null);

  const chats = groupChats[activeGroup._id] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      onSendMessage(chatInput);
      setChatInput('');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-2xl border border-slate-200/80 rounded-2xl shadow-xl flex flex-col h-[75vh] overflow-hidden animate-in slide-in-from-right-4 duration-500">

      <div className="px-6 py-4 border-b border-slate-200/60 bg-white/95 backdrop-blur-md z-10 relative flex items-center gap-4">
        <button 
          onClick={() => setActiveGroup(null)} 
          className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-slate-800 active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-extrabold text-slate-900 leading-tight flex items-center gap-2">
            {activeGroup.name}
            <span className="bg-blue-50 text-blue-600 border border-blue-200/60 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Group
            </span>
          </h2>
          <p className="text-[13px] text-slate-500 font-medium mt-0.5">
            {activeGroup.memberCount} members • <span className="text-slate-400">{activeGroup.topic || 'General'}</span>
          </p>
        </div>
        {activeGroup.isMember ? (
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200/80 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <Check size={14} strokeWidth={3} /> Joined
          </span>
        ) : (
          <button 
            onClick={() => onToggleMembership(activeGroup._id)} 
            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all active:scale-95"
          >
            Join Group
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]">
        {chats.map((msg, index) => {
          const isOwn = msg.senderId?._id === currentUser?._id;
          return (
            <div 
              key={msg._id} 
              className={`flex gap-3 max-w-[82%] animate-slide-up ${isOwn ? 'ml-auto flex-row-reverse' : ''}`} 
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
            >
              <img 
                src={msg.senderId?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"} 
                alt={msg.senderId?.name} 
                className="w-9 h-9 rounded-full shadow-sm shrink-0 border-2 border-white bg-slate-100" 
              />
              <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                <div className="flex items-baseline gap-2 mb-1.5 px-1">
                  <span className="text-xs font-bold text-slate-700">{isOwn ? 'You' : msg.senderId?.name}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{formatTime(msg.createdAt)}</span>
                </div>
                
                <div className={`px-4 py-2.5 text-[14.5px] leading-relaxed shadow-sm ${
                  isOwn 
                    ? 'bg-gradient-to-tr from-blue-600 to-blue-500 text-white rounded-2xl rounded-tr-sm shadow-blue-500/25 border border-blue-400/20' 
                    : 'bg-white text-slate-800 border border-slate-200/60 rounded-2xl rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}
        

        <div ref={messagesEndRef} />

        {chats.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 pb-10 animate-in fade-in duration-700">
            <div className="w-20 h-20 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm mb-5">
              <MessageSquare size={36} className="text-blue-200" strokeWidth={1.5} />
            </div>
            <p className="font-semibold text-slate-600 text-base">
              {activeGroup.isMember ? "It's quiet in here..." : "Join this group to see messages."}
            </p>
            {activeGroup.isMember && <p className="text-sm mt-1 text-slate-400">Be the first to break the ice!</p>}
          </div>
        )}
      </div>

      <div className="p-4 bg-white/95 backdrop-blur-md border-t border-slate-200/60">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input 
            type="text" 
            value={chatInput} 
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={activeGroup.isMember ? "Type a message to the group..." : "Join group to chat..."}
            disabled={!activeGroup.isMember}
            className="flex-1 px-5 py-3.5 bg-slate-100/80 border border-slate-200/50 hover:bg-slate-100 focus:bg-white focus:border-blue-400 rounded-full text-[14.5px] focus:outline-none focus:ring-4 focus:ring-blue-600/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-400"
          />
          <button 
            type="submit" 
            disabled={!chatInput.trim() || !activeGroup.isMember}
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white flex items-center justify-center shrink-0 transition-all shadow-md shadow-blue-600/20 active:scale-90"
          >
            <Send size={18} className="-ml-0.5 mt-0.5" strokeWidth={2.5} />
          </button>
        </form>
      </div>
    </div>
  );
}