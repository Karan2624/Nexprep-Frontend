"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, MessageCircle, Clock, Zap } from 'lucide-react';
import { api } from '../../lib/axios'; 

const timeAgo = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " mins ago";
  return Math.floor(seconds) > 10 ? Math.floor(seconds) + " seconds ago" : "Just now";
};

export default function NotificationBell() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);


  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notification/get-notifications');
      setNotifications(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
const handleNotificationClick = async (notif) => {

    if (!notif.isRead) {
      setNotifications(notifications.map(n => 
        n._id === notif._id ? { ...n, isRead: true } : n
      ));
      
      try {
        await api.patch(`/notification/read/${notif._id}`);
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    }

    setIsNotificationOpen(false);
  
    if (notif.type === 'task') {
      router.push('/tasks');
    } else {
      router.push('/community'); 
    }
  };

  const handleMarkAllAsRead = async () => {

    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    
    try {
      await api.patch('/notification/read-all');
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  return (
    <div className="relative">
      

      <button 
        aria-label="Notifications"
        onClick={() => setIsNotificationOpen(!isNotificationOpen)} 
        className="flex items-center justify-center w-10 h-10 text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 relative cursor-pointer z-[80]"
      >
        <Bell size={22} className="pointer-events-none" />

        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#F8FAFC] pointer-events-none"></span>
        )}
      </button>

      {isNotificationOpen && (
        <>
          <div 
            className="fixed inset-0 z-[90]" 
            onClick={() => setIsNotificationOpen(false)}
          ></div>
          
          <div className="fixed sm:absolute top-16 sm:top-14 right-4 sm:right-0 w-[calc(100vw-2rem)] sm:w-[320px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-slate-200 overflow-hidden z-[100] animate-in slide-in-from-top-2 fade-in duration-200">
            
            <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-900 text-[14px]">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={handleMarkAllAsRead} 
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors relative z-10"
                >
                  Mark all as read
                </button>
              )}
            </div>
            
            <div className="max-h-[60vh] sm:max-h-[350px] overflow-y-auto custom-scrollbar divide-y divide-slate-50">
              {notifications.length === 0 ? (
                 <div className="p-8 text-center text-slate-500 flex flex-col items-center">
                   <Bell size={32} className="mb-2 text-slate-300 opacity-50" />
                   <span className="text-sm font-semibold text-slate-600">All caught up!</span>
                   <span className="text-xs mt-1">No new notifications.</span>
                 </div>
              ) : (
                notifications.map(notif => (
                  <div 
                    key={notif._id} 
                    onClick={() => handleNotificationClick(notif)}
                    className={`p-4 flex gap-3 hover:bg-slate-50 transition-colors cursor-pointer ${
                      notif.isRead ? 'opacity-70' : 'bg-blue-50/40'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                      (notif.type === 'comment' || notif.type === 'reply') ? 'bg-blue-100 text-blue-600 border border-blue-200' : 
                      notif.type === 'task' ? 'bg-rose-100 text-rose-600 border border-rose-200' : 
                      'bg-emerald-100 text-emerald-600 border border-emerald-200'
                    }`}>
                       {(notif.type === 'comment' || notif.type === 'reply') ? <MessageCircle size={14}/> : 
                        notif.type === 'task' ? <Clock size={14}/> : 
                        <Zap size={14}/>}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-[13px] leading-snug mb-1 truncate whitespace-normal line-clamp-2 ${
                        notif.isRead ? 'text-slate-600' : 'text-slate-900 font-semibold'
                      }`}>
                        {notif.message}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400">
                        {timeAgo(notif.createdAt)}
                      </p>
                    </div>

                    {!notif.isRead && (
                      <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(37,99,235,0.6)] animate-pulse"></div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}