import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Users, Calendar, Award } from 'lucide-react';
import { EVENTS, ACHIEVEMENTS } from '../data';

// Helper Component for Scroll Animation
const RevealOnScroll: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div 
            ref={ref}
            className={`transition-all duration-1000 ease-out transform will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const TypewriterText = () => {
  const words = ["Innovators", "Problem Solvers", "Future Leaders", "Developers"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, parseInt(Math.random() * 350 + "")));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-[#FFB347] inline-block min-w-[200px]">
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse text-white">|</span>
    </span>
  );
};

const Home: React.FC = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 md:pt-0">
        {/* Background Image with Dark Gradient Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat animate-in fade-in zoom-in duration-[2000ms]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 md:pt-20">
            <div className="max-w-4xl">
                <div className="inline-block px-4 py-1.5 rounded-full border border-[#FFB347]/30 bg-[#FFB347]/10 text-[#FFB347] font-medium text-xs sm:text-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    ✨ Empowering Student Innovators
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                    We Are <br/>
                    <TypewriterText />
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl leading-relaxed font-light border-l-4 border-[#FFB347] pl-4 sm:pl-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 bg-gradient-to-r from-white/5 to-transparent p-4 rounded-r-xl">
                    IEEE Computer Society Student Branch <br/>
                    <span className="text-white font-medium">Kalasalingam Academy of Research and Education</span>
                </p>
                
                <div className="flex flex-wrap gap-4 mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <Link 
                      to="/events" 
                      className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-[#FFB347] text-black font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-[#ffaa33] transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,179,71,0.4)]"
                    >
                        Explore Events
                    </Link>
                    <Link 
                      to="/contact" 
                      className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-transparent border-2 border-white text-white font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all hover:scale-105 backdrop-blur-sm"
                    >
                        Join Community
                    </Link>
                </div>

                {/* Social Proof Metrics - Floating Animation */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 border-t border-white/10 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                    <div className="flex items-center gap-4 animate-float">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 flex items-center justify-center text-[#FFB347] border border-white/10 backdrop-blur-md shrink-0">
                            <Users size={20} className="sm:w-6 sm:h-6" />
                        </div>
                        <div>
                            <div className="text-xl sm:text-2xl font-bold text-white">500+</div>
                            <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">Active Members</div>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 animate-float-delayed">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 flex items-center justify-center text-[#FFB347] border border-white/10 backdrop-blur-md shrink-0">
                             <Award size={20} className="sm:w-6 sm:h-6" />
                        </div>
                        <div>
                            <div className="text-xl sm:text-2xl font-bold text-white">IEEE</div>
                            <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">Student Branch</div>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 animate-float">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 flex items-center justify-center text-[#FFB347] border border-white/10 backdrop-blur-md shrink-0">
                             <Calendar size={20} className="sm:w-6 sm:h-6" />
                        </div>
                        <div>
                            <div className="text-xl sm:text-2xl font-bold text-white">50+</div>
                            <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">Events Annually</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 md:py-24 relative bg-[#FAFAFA] dark:bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4">
          <RevealOnScroll>
            <div className="flex justify-between items-end mb-12 md:mb-16">
                <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Upcoming Events</h2>
                <div className="h-1.5 w-24 bg-[#FFB347] rounded-full mt-4"></div>
                </div>
                <Link to="/events" className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-[#FFB347] hover:text-black transition-colors hover:rotate-45 duration-300">
                <ChevronRight size={20} className="md:w-6 md:h-6" />
                </Link>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {EVENTS.slice(0, 3).map((event, index) => (
              <RevealOnScroll key={event.id} delay={index * 150}>
                  <div className="bg-white dark:bg-gray-800 rounded-[24px] shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden border border-gray-100 dark:border-gray-700 hover:-translate-y-2 will-change-transform h-full flex flex-col">
                    <div className="relative h-48 md:h-56 overflow-hidden">
                    <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        decoding="async" 
                    />
                    <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-white bg-black/50 backdrop-blur-md border border-white/20">
                            {event.status}
                        </span>
                    </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs font-bold text-[#FFB347] uppercase tracking-wider mb-2">{event.category}</div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#FFB347] transition-colors">{event.title}</h3>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-6 gap-4">
                        <span className="flex items-center gap-2"><Calendar size={14} className="text-[#FFB347]"/> {event.date}</span>
                    </div>
                    <Link to="/events" className="mt-auto block w-full text-center py-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-bold uppercase tracking-wider hover:bg-[#FFB347] hover:text-black transition-colors group-hover:shadow-md">
                        View Details
                    </Link>
                    </div>
                  </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Spotlight (Redesigned) */}
      <section className="py-16 md:py-24 relative bg-white dark:bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4">
          <RevealOnScroll>
            {/* Changed background to Navy Blue #1F2937 for high contrast */}
            <div className="bg-[#1F2937] rounded-[24px] md:rounded-[40px] p-8 md:p-12 lg:p-20 relative overflow-hidden shadow-2xl border border-gray-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
                    <div>
                        {/* Heading Text - White */}
                        <h2 className="text-3xl md:text-5xl font-black mb-6 text-white leading-tight">
                            Hall of <span className="text-[#FFB347]">Fame</span>
                        </h2>
                        {/* Body Text - Light Gray/White */}
                        <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed font-light">
                            Our student branch has consistently been recognized for its outstanding contributions. From winning international hackathons to receiving the Best Student Branch award.
                        </p>
                        {/* Button - Orange Background, Black Text */}
                        <Link to="/achievements" className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-[#FFB347] text-black font-bold text-sm tracking-widest uppercase inline-flex items-center gap-3 hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,179,71,0.4)]">
                            View All Achievements <ArrowRight size={20} />
                        </Link>
                    </div>
                    
                    {/* Achievement Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        {ACHIEVEMENTS.slice(0,4).map((ach, i) => (
                            <div key={ach.id} className="bg-[#FAFAFA] p-6 rounded-2xl flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white group relative overflow-hidden">
                                {/* Decorative corner accent */}
                                <div className="absolute top-0 right-0 w-12 h-12 bg-[#FFB347]/10 rounded-bl-full -mr-2 -mt-2 transition-all group-hover:bg-[#FFB347] group-hover:scale-150"></div>
                                
                                <div className="text-3xl md:text-4xl mb-4 transform group-hover:scale-110 transition-transform relative z-10">🏆</div>
                                <div className="font-bold text-sm md:text-base mb-2 text-[#1F2937] line-clamp-2 leading-tight relative z-10 group-hover:text-black">{ach.title}</div>
                                <div className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold uppercase text-gray-500 tracking-wider group-hover:bg-[#1F2937] group-hover:text-white transition-colors relative z-10">{ach.level}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Decorative elements - Adjusted for visibility */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFB347] opacity-5 rounded-full filter blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#003057] opacity-20 rounded-full filter blur-[80px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
};

export default Home;