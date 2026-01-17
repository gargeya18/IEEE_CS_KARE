import React, { useState } from 'react';
import { ACHIEVEMENTS } from '../data';
import { Award, Trophy, Star, X, ArrowRight } from 'lucide-react';
import { Achievement } from '../types';

const Achievements: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const filtered = filter === 'All' ? ACHIEVEMENTS : ACHIEVEMENTS.filter(a => a.level === filter);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#0D0D0D] text-white font-sans">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            Hall of <span className="text-[#FFB347]">Fame</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-4">
            Celebrating the milestones, victories, and breakthroughs that define our journey.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 px-4">
          {['All', 'International', 'National', 'University'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-3 rounded-2xl text-xs md:text-sm font-bold tracking-wide transition-all duration-300 transform active:scale-95 ${
                filter === f 
                  ? 'bg-[#1F2937] text-[#FFB347] shadow-[inset_4px_4px_8px_#151c26,inset_-4px_-4px_8px_#293648] border border-[#FFB347]/20' 
                  : 'bg-[#1F2937] text-gray-500 shadow-[6px_6px_12px_#151c26,-6px_-6px_12px_#293648] hover:text-gray-300 hover:-translate-y-1'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
          {filtered.map((ach) => (
            <div 
              key={ach.id}
              onClick={() => setSelectedAchievement(ach)}
              className="group relative bg-[#1F2937] rounded-[30px] p-6 md:p-8 cursor-pointer transition-all duration-300 hover:-translate-y-2 border border-white/5 shadow-[8px_8px_16px_#0b0f19,-8px_-8px_16px_#253141]"
            >
              {/* Top Row: Icon & Badge */}
              <div className="flex justify-between items-start mb-6">
                 {/* Icon Container - Neumorphic Inset Dark */}
                 <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-[inset_4px_4px_8px_#151c26,inset_-4px_-4px_8px_#293648] ${
                    ach.category === 'Award' ? 'text-[#FFB347]' : 'text-blue-400'
                 }`}>
                    {ach.category === 'Award' ? <Trophy size={20} className="md:w-6 md:h-6" /> : ach.category === 'Competition' ? <Award size={20} className="md:w-6 md:h-6" /> : <Star size={20} className="md:w-6 md:h-6" />}
                 </div>

                 {/* Level Badge */}
                 <span className="px-3 py-1 rounded-full bg-black/30 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                    {ach.level}
                 </span>
              </div>

              {/* Content */}
              <div className="space-y-3 mb-8">
                 <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-[#FFB347] transition-colors">
                    {ach.title}
                 </h3>
                 <p className="text-xs md:text-sm text-gray-400 line-clamp-2 leading-relaxed">
                    {ach.description}
                 </p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                 <span className="text-xs font-bold text-gray-500">{ach.date}</span>
                 <span className="flex items-center gap-2 text-xs font-bold text-[#FFB347] opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                    Read More <ArrowRight size={14} />
                 </span>
              </div>
              
              {/* Hover Gradient Glow */}
              <div className="absolute inset-0 rounded-[30px] bg-gradient-to-tr from-[#FFB347]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedAchievement(null)}>
          <div 
             className="relative w-full max-w-3xl bg-[#1F2937] rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto"
             onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-[#FFB347] hover:text-black transition-colors z-20"
            >
                <X size={18} className="md:w-5 md:h-5" />
            </button>
            
            {/* Image Banner */}
            <div className="h-56 md:h-80 w-full relative shrink-0">
               <img 
                    src={selectedAchievement.image} 
                    alt={selectedAchievement.title} 
                    className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] to-transparent"></div>
            </div>
            
            {/* Content */}
            <div className="px-6 md:px-12 pb-8 md:pb-12 -mt-10 relative z-10">
               <div className="flex gap-3 mb-6 flex-wrap">
                  <span className="px-3 md:px-4 py-1.5 rounded-full bg-[#FFB347] text-black text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-lg">
                     {selectedAchievement.level}
                  </span>
                  <span className="px-3 md:px-4 py-1.5 rounded-full bg-black/40 border border-white/10 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider">
                     {selectedAchievement.date}
                  </span>
               </div>
               
               <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white leading-tight">
                  {selectedAchievement.title}
               </h2>
               
               <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="md:col-span-2">
                     <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                        {selectedAchievement.description}
                     </p>
                     <p className="text-gray-400 mt-4 leading-relaxed text-sm md:text-base">
                       This achievement highlights our dedication to technological excellence and collaborative spirit. Our team worked tirelessly to bring this vision to life.
                     </p>
                  </div>
                  
                  {/* Sidebar Info */}
                  <div className="bg-black/20 rounded-2xl p-6 border border-white/5 h-fit">
                     <div className="mb-4">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-bold block mb-1">Category</span>
                        <p className="text-white font-semibold">{selectedAchievement.category}</p>
                     </div>
                     <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-bold block mb-1">Winners</span>
                        <p className="text-[#FFB347] font-bold text-lg">{selectedAchievement.winners}</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;