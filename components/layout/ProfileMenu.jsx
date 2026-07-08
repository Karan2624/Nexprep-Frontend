"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Loader2, LogOut, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { api } from '../../lib/axios'; 

export default function ProfileMenu() {
  const router = useRouter();
  const { user, checkAuth, logout } = useAuthStore();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : "US";
  };

  const handleAvatarUpdateClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("avatar", file);

      await api.patch('/users/update-avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      await checkAuth();
    } catch (error) {
      console.error("Failed to update avatar:", error);
    } finally {
      setIsUploading(false);
      setIsOpen(false); 
    }
  };

  const handleLogout = async () => {
    setIsOpen(false);
    router.push("/");
    setTimeout(async () => {
      await logout();
      router.refresh(); 
    }, 150);
  };

  return (
    <div className="relative z-[80]">
      {/* Clickable Profile Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-10 h-10 rounded-full border-2 overflow-hidden flex items-center justify-center text-white font-bold text-sm cursor-pointer transition-all duration-200 focus:outline-none ${
          isOpen 
            ? 'border-blue-400 shadow-[0_0_0_4px_rgba(96,165,250,0.15)] scale-105' 
            : 'border-white shadow-sm hover:scale-105 hover:shadow-md'
        } bg-gradient-to-tr from-blue-500 to-indigo-500`}
      >
        {isUploading ? (
          <Loader2 size={18} className="animate-spin text-white" />
        ) : user?.avatar ? (
          <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          getInitials(user?.name)
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[90]" 
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className="absolute top-14 right-0 w-[280px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden z-[100] animate-in slide-in-from-top-2 fade-in zoom-in-95 duration-200 origin-top-right">
            
            {/* PASTEL HEADER SECTION */}
            <div className="relative p-6 pt-8 flex flex-col items-center overflow-hidden border-b border-slate-100/50">
              
              {/* Premium Pastel Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-blue-50/50 to-purple-50/80 z-0"></div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200/40 rounded-full blur-2xl z-0 pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-200/40 rounded-full blur-2xl z-0 pointer-events-none"></div>
              
              {/* Avatar Ring */}
              <div className="w-20 h-20 rounded-full border-4 border-white bg-gradient-to-tr from-blue-500 to-indigo-500 overflow-hidden shadow-sm flex items-center justify-center text-white font-bold text-2xl mb-3 relative group z-10">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  getInitials(user?.name)
                )}
                
                {/* Hover Overlay */}
                <div 
                  onClick={handleAvatarUpdateClick}
                  className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
                  title="Change Avatar"
                >
                  <Camera size={20} className="text-white mb-1" />
                  <span className="text-[9px] font-semibold text-white/90 tracking-wider">UPDATE</span>
                </div>
              </div>
              
              <h3 className="font-bold text-[18px] text-slate-800 leading-tight z-10">
                {user?.name || "Student"}
              </h3>
              <p className="text-slate-500 text-[13px] font-medium mt-0.5 z-10">
                @{user?.username || "username"}
              </p>
              
              <div className="mt-3 px-3 py-1 bg-white/60 backdrop-blur-sm border border-white/80 text-indigo-600 text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wider rounded-full shadow-sm z-10">
                <Sparkles size={12} className="text-indigo-500" /> Member
              </div>
            </div>
            
            {/* STREAMLINED MENU LIST */}
            <div className="p-2 space-y-1 bg-white/95">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              
              <button 
                onClick={handleAvatarUpdateClick}
                disabled={isUploading}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/80 transition-colors rounded-xl text-[14px] font-medium group disabled:opacity-50"
              >
                {isUploading ? (
                  <Loader2 size={18} className="animate-spin text-indigo-500" />
                ) : (
                  <ImageIcon size={18} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                )}
                {isUploading ? "Uploading..." : "Change Avatar"}
              </button>

              <div className="h-px bg-slate-100 my-1 mx-2"></div>

              <button 
                onClick={handleLogout} 
                className="w-full flex items-center gap-3 px-3 py-2.5 text-rose-600 hover:bg-rose-50 transition-colors rounded-xl text-[14px] font-medium group"
              >
                <LogOut size={18} className="text-rose-400 group-hover:text-rose-600 transition-colors" />
                Sign Out
              </button>

            </div>
          </div>
        </>
      )}
    </div>
  );
}