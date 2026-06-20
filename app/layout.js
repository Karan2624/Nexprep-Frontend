
"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";
import { AnimatedBackground } from "../components/ui/AnimatedBackground";
import "./globals.css";

export default function RootLayout({ children }) {
  const { user, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <html lang="en">
        <body className="min-h-screen bg-transparent font-sans text-slate-900 relative">

           <AnimatedBackground /> 
           
           <div className="flex items-center justify-center min-h-screen w-full z-10 relative">
             <div className="w-12 h-12 border-4 border-white/60 border-t-blue-600 rounded-full animate-spin shadow-lg backdrop-blur-sm"></div>
           </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-transparent font-sans flex text-slate-900 selection:bg-blue-100 relative">
        

        <AnimatedBackground />

        {user ? (
          <>
            <Sidebar />
            <main className="flex-1 flex flex-col min-h-screen relative z-10 w-full">
              <Topbar />
              <div className="px-8 pb-8 flex-1 overflow-y-auto custom-scrollbar">
                <div className="max-w-6xl mx-auto pt-6">
                  {children} 
                </div>
              </div>
            </main>
          </>
        ) : (
          <main className="flex-1 flex flex-col min-h-screen relative z-10 w-full">
             {children}
          </main>
        )}
      </body>
    </html>
  );
}