"use client";

import { Bell } from 'lucide-react';

export function Topbar() {
  return (
    <header className="h-[72px] flex items-center justify-end px-8 sticky top-0 z-[60] bg-[#F8FAFC] border-b border-slate-200/60 shadow-sm w-full">
      <div className="flex items-center gap-4 text-slate-600">
        <button className="flex items-center justify-center w-10 h-10 text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors rounded-full">
          <Bell size={22} />
        </button>
        <div className="w-10 h-10 rounded-full border-2 border-slate-200 bg-slate-200 overflow-hidden ml-2 shadow-sm">
          {/* Avatar goes here later */}
        </div>
      </div>
    </header>
  );
}