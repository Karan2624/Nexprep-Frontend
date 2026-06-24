"use client";

import { Bell, Menu } from 'lucide-react';

export function Topbar({ setIsMobileMenuOpen }) {
  return (
    <header className="h-[72px] flex items-center justify-between px-4 md:px-8 sticky top-0 z-[60] bg-[#F8FAFC] border-b border-slate-200/60 shadow-sm w-full">

      <div className="flex items-center">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden flex items-center justify-center w-10 h-10 text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors rounded-xl"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center gap-2 md:gap-4 text-slate-600">
        <button className="relative flex items-center justify-center w-10 h-10 text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors rounded-full">
          <Bell size={22} />

          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-tr from-blue-600 to-indigo-600 overflow-hidden shadow-sm flex items-center justify-center text-white font-bold text-sm cursor-pointer ml-1 md:ml-2 hover:scale-105 transition-transform">

          US
        </div>
      </div>
      
    </header>
  );
}