"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";
import { AnimatedBackground } from "../components/ui/AnimatedBackground";
import "./globals.css";

export default function RootLayout({ children }) {
  const user = useAuthStore((state) => state.user);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-transparent font-sans flex text-slate-900 selection:bg-blue-100 relative overflow-x-hidden">
        
        <AnimatedBackground />

        {isCheckingAuth ? (
          <div className="flex items-center justify-center min-h-screen w-full z-10 relative">
            <div className="w-12 h-12 border-4 border-white/60 border-t-blue-600 rounded-full animate-spin shadow-lg backdrop-blur-sm"></div>
          </div>
        ) 
        
        : user ? (
          <>

            {isMobileMenuOpen && (
              <div 
                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}

            <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
            
            <main className="flex-1 flex flex-col min-h-screen relative z-10 w-full md:w-[calc(100%-300px)]">

              <Topbar setIsMobileMenuOpen={setIsMobileMenuOpen} />

              <div className="px-4 md:px-8 pb-8 flex-1 overflow-y-auto custom-scrollbar">
                <div className="w-full max-w-[1600px] mx-auto pt-4 md:pt-6">
                  {children} 
                </div>
              </div>
            </main>
          </>
        ) 
        
        : (
          <main className="flex-1 flex flex-col min-h-screen relative z-10 w-full">
             {children}
          </main>
        )}
      </body>
    </html>
  );
}