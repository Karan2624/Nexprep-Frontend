import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Activity, X, Calendar } from 'lucide-react';

export default function ActivityHeatmap({ user }) {
  // Ref for the tooltip positioning
  const containerRef = useRef(null);
  // THE FIX 1: New Ref specifically for the scrollable area
  const scrollContainerRef = useRef(null);
  
  const [tooltip, setTooltip] = useState({ isHovering: false, x: 0, y: 0, content: null });
  const [selectedDate, setSelectedDate] = useState(null);

  const renderedData = useMemo(() => {
    const columns = [];
    const labels = [];
    let prevMonth = -1;
    let colIndex = 0; 
    
    const executionPivot = new Date();
    
    // THE FIX 2: Reverted back to standard chronological order (51 down to 0)
    for (let w = 51; w >= 0; w--) {
      const singleWeek = [];
      
      const startOfWeek = new Date(executionPivot);
      startOfWeek.setDate(startOfWeek.getDate() - (w * 7 + 6));
      const currentMonth = startOfWeek.getMonth();
      
      if (prevMonth !== -1 && currentMonth !== prevMonth) {
        columns.push({ isGap: true });
        colIndex++;
      }
      
      if (prevMonth === -1 || currentMonth !== prevMonth) {
        labels.push({ 
          label: startOfWeek.toLocaleString('default', { month: 'short' }), 
          colIndex: colIndex 
        });
      }

      for (let d = 6; d >= 0; d--) {
        const targetingDate = new Date(executionPivot);
        targetingDate.setDate(targetingDate.getDate() - (w * 7 + d));
        const computedKey = targetingDate.toISOString().split('T')[0];
        
        const activeNode = user?.activityHeatmap?.[computedKey];
        const submissionScore = activeNode?.total || 0;
        
        let colorProfile = 'bg-slate-200/60'; 
        if (submissionScore > 0 && submissionScore <= 2) colorProfile = 'bg-blue-300';
        else if (submissionScore > 2 && submissionScore <= 5) colorProfile = 'bg-blue-400';
        else if (submissionScore > 5 && submissionScore <= 8) colorProfile = 'bg-blue-500';
        else if (submissionScore > 8) colorProfile = 'bg-blue-700';

        singleWeek.push({ 
          date: computedKey, 
          colorProfile, 
          submissionScore,
          rawDate: targetingDate 
        });
      }
      
      columns.push({ isGap: false, days: singleWeek });
      colIndex++;
      prevMonth = currentMonth;
    }
    
    return { columns, labels };
  }, [user?.activityHeatmap]);

  // THE FIX 3: Auto-scroll to the far right on initial load
  useEffect(() => {
    if (scrollContainerRef.current) {
      // A tiny timeout ensures the browser has finished painting the width before scrolling
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
      }, 10);
    }
  }, [renderedData]); // Re-runs safely if data ever updates

  const handleMouseEnter = (e, day) => {
    if (!containerRef.current) return;
    
    const boxRect = e.target.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    setTooltip({
      isHovering: true,
      x: boxRect.left - containerRect.left + (boxRect.width / 2),
      y: boxRect.top - containerRect.top - 8,
      content: day
    });
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, isHovering: false }));
  };

  return (
    <div ref={containerRef} className="relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-shadow duration-300">
      <div className="flex justify-between items-center mb-6">
         <h3 className="font-bold text-slate-900">Activity Intensity (Last Year)</h3>
      </div>
      
      {/* THE FIX 4: Attached the scrollContainerRef here */}
      <div ref={scrollContainerRef} className="overflow-x-auto pb-2 custom-scrollbar relative scroll-smooth">
        <div className="relative w-max">
          
          <div className="flex gap-[3px]">
            {renderedData.columns.map((col, i) => (
              col.isGap ? (
                <div key={`gap-${i}`} className="w-[12px] opacity-0 pointer-events-none"></div>
              ) : (
                <div key={`col-${i}`} className="flex flex-col gap-[3px]">
                  {col.days.map((day, j) => (
                    <div 
                      key={j} 
                      onMouseEnter={(e) => handleMouseEnter(e, day)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => setSelectedDate(day)}
                      className={`w-[12px] h-[12px] rounded-[3px] ${day.colorProfile} transition-opacity duration-200 cursor-pointer 
                        ${selectedDate?.date === day.date 
                          ? 'ring-2 ring-offset-1 ring-blue-600 z-20 opacity-100' 
                          : 'hover:opacity-75'
                        }`}
                    ></div>
                  ))}
                </div>
              )
            ))}
          </div>

          <div className="relative h-6 mt-3 w-full border-t border-slate-200/50 pt-1">
            {renderedData.labels.map((m, i) => (
              <span 
                key={i} 
                className="absolute text-[10px] font-bold text-slate-400 tracking-wide uppercase"
                style={{ left: `${m.colIndex * 15}px` }} 
              >
                {m.label}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* CLICK UI */}
      {selectedDate && (
        <div className="mt-5 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-100/50 p-4 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-200 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${selectedDate.colorProfile}`}>
              {selectedDate.submissionScore > 0 ? (
                <Activity size={20} className="text-white mix-blend-luminosity opacity-90" />
              ) : (
                <Calendar size={20} className="text-slate-400" />
              )}
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-[15px]">
                {selectedDate.rawDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h4>
              <p className="text-sm font-medium text-slate-500 mt-0.5">
                {selectedDate.submissionScore > 0 
                  ? <><strong className="text-blue-600">{selectedDate.submissionScore} operations</strong> recorded on this day.</>
                  : 'No mastery activity recorded.'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setSelectedDate(null)} 
            className="w-8 h-8 rounded-full bg-white/60 hover:bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors shadow-sm"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* HOVER UI */}
      <div 
        className={`absolute z-[100] pointer-events-none bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl transform -translate-x-1/2 -translate-y-full transition-opacity duration-150 ${
          tooltip.isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ left: tooltip.x, top: tooltip.y }}
      >
        {tooltip.content && (
          <>
            <div className="font-bold mb-0.5 whitespace-nowrap">
              {tooltip.content.rawDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="text-slate-300 font-medium whitespace-nowrap">
              <span className={tooltip.content.submissionScore > 0 ? 'text-blue-400 font-bold' : ''}>
                {tooltip.content.submissionScore}
              </span> operations
            </div>
            <div className="absolute w-2 h-2 bg-slate-900 rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
          </>
        )}
      </div>
    </div>
  );
}