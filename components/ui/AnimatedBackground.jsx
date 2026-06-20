
"use client";

import React from 'react';
import { Code2, Activity, Target, Award } from 'lucide-react';

export function AnimatedBackground() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] bg-[#F4F7FF]">

        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-blue-300/40 to-purple-300/40 blur-[100px] mix-blend-multiply animate-orb-float animate-fade-in-slow"></div>
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-cyan-300/40 to-emerald-300/40 blur-[120px] mix-blend-multiply animate-orb-float-reverse animate-fade-in-slow" 
          style={{ animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-pink-300/30 to-orange-300/30 blur-[90px] mix-blend-multiply animate-orb-float animate-fade-in-slow" 
          style={{ animationDelay: '4s' }}
        ></div>

        <div 
          className="absolute inset-0 opacity-[0.7] animate-fade-in-slow" 
          style={{ 
            backgroundImage: 'radial-gradient(#cbd5e1 2px, transparent 2px)', 
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)'
          }}
        ></div>

        <div className="absolute top-[15%] left-[8%] w-32 h-32 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] animate-float-slow animate-fade-in-slow flex items-center justify-center">
           <Code2 size={40} className="text-blue-500/20" />
        </div>
        <div className="absolute bottom-[20%] right-[12%] w-40 h-40 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] animate-float-medium animate-fade-in-slow flex items-center justify-center">
           <Activity size={48} className="text-emerald-500/20" />
        </div>
        <div className="absolute top-[40%] right-[8%] w-20 h-20 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] animate-float-fast animate-fade-in-slow flex items-center justify-center">
           <Target size={24} className="text-pink-500/20" />
        </div>
        <div className="absolute bottom-[10%] left-[20%] w-24 h-24 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] animate-float-slow animate-fade-in-slow flex items-center justify-center">
           <Award size={28} className="text-orange-500/20" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-slow {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 1.5s ease-out forwards;
        }

        @keyframes orb-float {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(30px, -50px, 0) scale(1.1); }
          66% { transform: translate3d(-20px, 20px, 0) scale(0.9); }
        }
        @keyframes orb-float-reverse {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(-30px, 50px, 0) scale(1.1); }
          66% { transform: translate3d(20px, -20px, 0) scale(0.9); }
        }
        .animate-orb-float { animation: orb-float 15s ease-in-out infinite; }
        .animate-orb-float-reverse { animation: orb-float-reverse 18s ease-in-out infinite; }

        @keyframes float-slow {
          0%, 100% { transform: translate3d(0, 0px, 0) rotate(0deg); }
          50% { transform: translate3d(0, -20px, 0) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translate3d(0, 0px, 0) rotate(12deg); }
          50% { transform: translate3d(0, -25px, 0) rotate(18deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translate3d(0, 0px, 0) rotate(45deg); }
          50% { transform: translate3d(0, -15px, 0) rotate(35deg); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
      `}} />
    </>
  );
}