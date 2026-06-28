import React from 'react';
import { Users } from 'lucide-react';
import { timeAgo } from './communityUtils';

export default function CommunitySidebar({ 
  studyGroups, activeGroup, setActiveGroup, 
  groupChats, onToggleMembership, setSearchQuery 
}) {
  return (
    <div className="space-y-6 sticky top-24">

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm animate-slide-up delay-400" style={{ animationFillMode: 'forwards' }}>
        <h3 className="font-bold text-slate-900 text-[16px] mb-5">Trending Tags</h3>
        <div className="flex flex-wrap gap-2.5">
           {['SystemDesign', 'GooglePrep', 'Arrays', 'DynamicProgramming', 'RollingHash'].map(tag => (
             <span 
               key={tag}
               onClick={() => { setSearchQuery(`#${tag}`); setActiveGroup(null); }}
               className="px-3 py-1.5 bg-blue-50 text-slate-700 rounded-lg text-[13px] font-semibold hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors"
             >
               #{tag}
             </span>
           ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm animate-slide-up delay-500" style={{ animationFillMode: 'forwards' }}>
        <div className="flex items-center gap-2 mb-5">
          <Users size={18} className="text-blue-600" />
          <h3 className="font-bold text-slate-900 text-[16px]">Study Groups</h3>
        </div>
        <div className="space-y-3">
          {studyGroups.map(group => {
            const chats = groupChats[group._id] || [];
            const lastMsg = chats[chats.length - 1];
            const activeClass = activeGroup?._id === group._id ? 'ring-2 ring-blue-400 shadow-md scale-[1.02] bg-white' : '';
            
            return (
              <div 
                key={group._id} 
                onClick={() => setActiveGroup(group)}
                className={`border rounded-xl p-3.5 cursor-pointer transition-all duration-300 relative group bg-[#F4F9FF] border-blue-100/80 hover:border-blue-300 hover:shadow-sm ${activeClass}`}
              >
                <div className="flex items-center gap-3 relative">
                  <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center text-white font-black text-lg shrink-0 ${group.color} shadow-sm`}>
                    {group.initials}
                  </div>
                  
                  <div className="flex-1 min-w-0 py-0.5">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <h4 className="font-bold text-slate-900 text-[14px] leading-tight truncate group-hover:text-blue-600 transition-colors">
                        {group.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap shrink-0">
                        {lastMsg ? timeAgo(lastMsg.createdAt) : ''}
                      </span>
                    </div>
                    
                    <div className="text-[12px] text-slate-500 truncate leading-snug pr-6">
                      {lastMsg ? (
                        <>
                          <span className="font-semibold text-slate-700">{lastMsg.senderId?.name.split(' ')[0]}: </span>
                          <span>{lastMsg.content}</span>
                        </>
                      ) : (
                        <span className="italic opacity-60">{group.topic || 'General Discussion'}</span>
                      )}
                    </div>
                  </div>

                  {group.isMember && group.unreadCount > 0 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(37,99,235,0.4)] animate-pulse">
                      {group.unreadCount}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-100/80">
                  <span className="text-[11px] font-bold text-slate-400">{group.memberCount} members</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleMembership(group._id); }}
                    className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm ${
                      group.isMember 
                        ? 'bg-white border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[0_2px_10px_rgba(37,99,235,0.3)] border border-transparent'
                    }`}
                  >
                    {group.isMember ? 'Leave' : 'Join'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}