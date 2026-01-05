import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../data';
import { Linkedin, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { TeamMember } from '../types';

const Team: React.FC = () => {
  const [expandedDomain, setExpandedDomain] = useState<string | null>('Web Development');

  const faculty = TEAM_MEMBERS.filter(m => m.role.includes('Advisor'));
  const excom = TEAM_MEMBERS.filter(m => !m.role.includes('Advisor') && !m.domain);
  const domains = ['Web Development', 'AI/ML', 'Hardware/IoT', 'Design'];

  const toggleDomain = (domain: string) => {
    setExpandedDomain(expandedDomain === domain ? null : domain);
  };

  const PortraitCard = ({ member, size = 'large' }: { member: TeamMember, size?: 'large' | 'small' }) => (
    <div className="relative group overflow-hidden rounded-[20px] shadow-lg bg-white transform transition-transform duration-300 hover:scale-[1.02] w-full h-full will-change-transform">
        <div className={`w-full ${size === 'large' ? 'aspect-[3/4]' : 'aspect-[4/5]'} overflow-hidden relative`}>
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async" 
            />
            {/* Subtle Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 md:p-4 rounded-xl shadow-lg text-center transition-all duration-300 group-hover:-translate-y-1 z-10">
            <h3 className="font-bold text-gray-900 text-sm truncate">{member.name}</h3>
            <p className="text-[10px] md:text-xs text-gray-500 font-medium uppercase tracking-wider truncate">{member.role}</p>
             
             {/* Expandable Details Section */}
             <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                <div className="overflow-hidden">
                    <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                         {member.domain && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase tracking-wider border border-gray-200">
                                {member.domain}
                            </span>
                         )}
                         <div className="flex justify-center gap-4 mt-1">
                            <a 
                                href={member.linkedin || '#'} 
                                className="text-gray-500 hover:text-[#0077b5] transition-all duration-200 hover:scale-125 transform p-1.5 hover:bg-blue-50 rounded-full"
                                aria-label="LinkedIn Profile"
                            >
                                <Linkedin size={18} strokeWidth={2.5} />
                            </a>
                            <a 
                                href={`mailto:${member.email || '#'}`} 
                                className="text-gray-500 hover:text-[#EA4335] transition-all duration-200 hover:scale-125 transform p-1.5 hover:bg-red-50 rounded-full"
                                aria-label="Email Contact"
                            >
                                <Mail size={18} strokeWidth={2.5} />
                            </a>
                         </div>
                    </div>
                </div>
             </div>
        </div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-3xl md:text-4xl font-black mb-4 text-black uppercase tracking-tight">Meet the Minds Behind the Magic</h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base px-4">A diverse team of creators, coders, designers, and innovators working together to bring ideas to life</p>
        </div>

        {/* Faculty */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-lg md:text-xl font-bold mb-8 md:mb-10 text-center text-[#FFB347] uppercase border-b-2 border-[#FFB347] inline-block pb-2 mx-auto">Faculty Coordinators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 justify-items-center">
            {faculty.map(member => (
                <div key={member.id} className="w-full max-w-[280px]">
                    <PortraitCard member={member} size="large" />
                </div>
            ))}
          </div>
        </div>

        {/* ExCom */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-lg md:text-xl font-bold mb-8 md:mb-10 text-center text-black uppercase border-b-2 border-black inline-block pb-2 mx-auto">
            Executive Committee
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 justify-items-center">
            {excom.map(member => (
              <div key={member.id} className="w-full max-w-[240px]">
                  <PortraitCard member={member} size="small" />
                  <p className="text-center text-[10px] md:text-xs font-bold mt-3 text-gray-400 uppercase tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Domains Accordion */}
        <div className="max-w-4xl mx-auto mb-16 space-y-4">
            {domains.map((domain) => {
                 const members = TEAM_MEMBERS.filter(m => m.domain === domain);
                 const isOpen = expandedDomain === domain;
                 
                 return (
                    <div key={domain} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <button 
                            onClick={() => toggleDomain(domain)}
                            className={`w-full flex items-center justify-between p-4 md:p-6 transition-colors ${isOpen ? 'bg-[#1F2937] text-white' : 'bg-white text-black hover:bg-gray-50'}`}
                        >
                            <span className="font-bold text-base md:text-lg uppercase tracking-wide text-left">{domain} Team</span>
                            {isOpen ? <ChevronUp size={20} color="#FFB347" className="shrink-0" /> : <ChevronDown size={20} className="shrink-0" />}
                        </button>
                        
                        {isOpen && (
                            <div className="p-6 md:p-8 bg-gray-50 animate-in slide-in-from-top-4 duration-300">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 justify-items-center">
                                    {members.length > 0 ? members.map(member => (
                                        <div key={member.id} className="w-full max-w-[200px]">
                                            <PortraitCard member={member} size="small" />
                                            {member.isLead && <p className="text-center text-[10px] font-bold mt-2 text-[#FFB347] uppercase tracking-widest">Team Lead</p>}
                                        </div>
                                    )) : (
                                        <p className="text-gray-500 italic col-span-full">Members joining soon...</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                 )
            })}
        </div>
      </div>
    </div>
  );
};

export default Team;