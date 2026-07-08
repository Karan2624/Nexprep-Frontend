"use client";

import { Menu } from 'lucide-react';
import NotificationBell from './NotificationBell';
import ProfileMenu from './ProfileMenu';

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
        
        <NotificationBell />
       
        <ProfileMenu />
        
      </div>
      
    </header>
  );
}