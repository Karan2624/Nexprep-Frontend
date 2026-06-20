"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; 
import { useAuthStore } from '../../store/useAuthStore';
import { 
  LayoutDashboard, 
  Target, 
  Activity, 
  MessageSquare, 
  CheckSquare, 
  Building2, 
  LogOut 
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, href, isActive }) => (
  <Link 
    href={href}
    className={`w-full flex items-center gap-4 px-5 py-3.5 mb-1.5 transition-all duration-300 text-[15px] font-medium ${
      isActive 
        ? 'bg-blue-600 text-white rounded-xl shadow-md scale-100' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl hover:translate-x-1'
    }`}
  >
    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'animate-bounce-subtle' : ''} />
    <span>{label}</span>
  </Link>
);

export function Sidebar() {
  const pathname = usePathname();

  const router = useRouter(); 
  const { logout } = useAuthStore();

  const handleLogout = async () => {

    router.push("/");


    setTimeout(async () => {
      await logout();
      router.refresh(); 
    }, 150);
  };

  return (
    <aside className="w-[300px] bg-white/80 backdrop-blur-xl border-r border-slate-200 flex flex-col hidden md:flex h-screen sticky top-0 shrink-0 z-20">

      <div className="px-6 py-8 flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-900 text-white flex items-center justify-center font-bold text-xl rounded-lg shadow-md animate-pop-in">
          N
        </div>
        <div className="flex flex-col animate-slide-up">
          <span className="font-bold text-[20px] leading-tight text-black">NexPrep</span>
          <span className="text-[12px] text-slate-400 font-mono tracking-wide">Mastery Platform</span>
        </div>
      </div>

      <nav className="flex-1 px-5 space-y-1 overflow-y-auto mt-2 custom-scrollbar">
        <SidebarItem 
           icon={LayoutDashboard} label="Dashboard" 
           href="/dashboard" isActive={pathname === '/dashboard'} 
        />
        <SidebarItem 
           icon={Target} label="Recommendations" 
           href="/recommendations" isActive={pathname === '/recommendations'} 
        />
        <SidebarItem 
           icon={Activity} label="Analytics" 
           href="/analytics" isActive={pathname === '/analytics'} 
        />
        <SidebarItem 
           icon={MessageSquare} label="Community" 
           href="/community" isActive={pathname === '/community'} 
        />
        <SidebarItem 
           icon={CheckSquare} label="Tasks" 
           href="/tasks" isActive={pathname === '/tasks'} 
        />
        <SidebarItem 
           icon={Building2} label="Company PYQs" 
           href="/company-pyqs" isActive={pathname === '/company-pyqs'} 
        />
      </nav>

      <div className="p-5 space-y-2 mb-2 flex flex-col mt-auto border-t border-slate-100">

        <button 
          onClick={handleLogout} 
          className="w-full flex items-center gap-4 px-5 py-3.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 hover:translate-x-1 font-medium text-[15px] transition-all duration-300 rounded-xl cursor-pointer"
        >
          <LogOut size={20} /> Log Out
        </button>
      </div>
    </aside>
  );
}