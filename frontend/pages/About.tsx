import React, { useState, useEffect, useRef } from 'react';
import { ANNOUNCEMENTS, SOCIETIES, ASSETS } from '../data';
import { MoreHorizontal } from 'lucide-react';
import { Announcement, Society } from '../types';

const CountUp = ({ end, duration = 1000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOut = (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };

      setCount(Math.floor(easeOut(percentage) * end));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, isVisible]);

  return <span ref={ref}>{count}</span>;
};

const About: React.FC = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [selectedSociety, setSelectedSociety] = useState<Society | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideshowImages = [
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2070", 
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  return (
    <div className="pt-20 md:pt-0 min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* 1. Header Section (Slideshow) */}
      <div className="bg-black text-white h-[240px] md:h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
         {/* Background Slideshow */}
         {slideshowImages.map((img, index) => (
            <div 
                key={index}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-40' : 'opacity-0'}`}
                style={{ backgroundImage: `url('${img}')` }}
            />
         ))}
         {/* Dark Overlay for text readability */}
         <div className="absolute inset-0 bg-black/40"></div>
         
         <div className="relative z-10 text-center flex flex-col items-center gap-3 md:gap-4 animate-in fade-in zoom-in duration-1000 px-4">
             <h2 className="text-[9px] md:text-[10px] font-medium uppercase tracking-[0.2em] text-gray-300 drop-shadow-md">Slideshow of Images</h2>
             
             {/* Center Logo Group */}
             <div className="flex items-center gap-3 md:gap-4">
                 {/* Yellow Logo Circle */}
                 <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#FFB347] flex items-center justify-center shadow-lg border-2 border-white/10 shrink-0">
                    <span className="text-black text-2xl md:text-3xl font-bold">Φ</span>
                 </div>
                 
                 <div className="text-left border-l border-gray-400 pl-3 md:pl-4">
                     <span className="block text-lg md:text-xl font-bold leading-none drop-shadow-sm">IEEE</span>
                     <span className="block text-lg md:text-xl font-bold leading-none drop-shadow-sm">COMPUTER</span>
                     <span className="block text-xs md:text-sm font-medium tracking-wider text-[#FFB347] drop-shadow-sm">SOCIETY KARE</span>
                 </div>
             </div>
         </div>
      </div>

      {/* 2. Stats Bar */}
      <div className="bg-[#FFC83C] w-full">
        <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 py-6 sm:py-4">
                <div className="text-center sm:border-r border-black/10 pb-4 sm:pb-0 border-b sm:border-b-0">
                    <span className="block text-2xl font-black text-[#0D0D0D] leading-tight"><CountUp end={10} /></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0D0D0D] opacity-80">NO OF EVENTS</span>
                </div>
                <div className="text-center sm:border-r border-black/10 pb-4 sm:pb-0 border-b sm:border-b-0">
                    <span className="block text-2xl font-black text-[#0D0D0D] leading-tight"><CountUp end={30} /></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0D0D0D] opacity-80">NO OF PUBLICATIONS</span>
                </div>
                <div className="text-center">
                    <span className="block text-2xl font-black text-[#0D0D0D] leading-tight"><CountUp end={40} /></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0D0D0D] opacity-80">NO OF PROJECTS</span>
                </div>
            </div>
        </div>
      </div>

      {/* 3. Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 space-y-12">
        
        {/* Page Title */}
        <div className="flex justify-center items-center relative mb-6">
            <h1 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-black text-center">ABOUT US</h1>
        </div>

        {/* Card 1: About IEEE CS */}
        <div className="bg-white rounded-[24px] md:rounded-[30px] border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 relative">
             <div className="absolute top-6 right-6 text-gray-300 cursor-pointer hover:text-gray-500">
                <MoreHorizontal size={24} />
             </div>

             <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                 {/* Logo Left */}
                 <div className="w-full md:w-1/3 flex items-center justify-center md:justify-start pt-4">
                     <img 
                        src={ASSETS.IEEE_CS_LOGO} 
                        alt="IEEE CS Logo" 
                        className="w-32 md:w-40 h-auto object-contain" 
                        loading="lazy"
                        decoding="async"
                     />
                 </div>
                 
                 {/* Text Right */}
                 <div className="flex-1">
                    <h3 className="font-bold text-black text-lg mb-3 text-center md:text-left">About IEEE CS :</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed text-left md:text-justify">
                        The KARE IEEE Computer Society Student Branch Chapter is a dynamic student-led community that promotes learning and innovation in computing. It conducts hands-on workshops, seminars, and events in areas like AI, Quantum Computing, Cybersecurity, and Software Development. These activities help students gain valuable practical skills beyond the classroom. The chapter also connects members with industry professionals, researchers, and global IEEE CS initiatives. By bridging academics with emerging technologies, it encourages collaboration and innovation. Overall, it empowers students to grow as future-ready computing professionals.
                    </p>
                 </div>
             </div>
        </div>

        {/* Card 2: Announcements */}
        <div>
            <h2 className="text-sm font-bold text-black uppercase mb-3 tracking-wide ml-2">ANNOUNCEMENTS</h2>
            <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden">
                {ANNOUNCEMENTS.map((item, idx) => (
                    <div 
                        key={item.id} 
                        onClick={() => setSelectedAnnouncement(item)}
                        className={`p-5 flex flex-col relative cursor-pointer hover:bg-gray-50 transition-all duration-200 group ${idx !== ANNOUNCEMENTS.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                        <span className="text-[10px] text-gray-500 font-medium mb-1 underline decoration-gray-300 underline-offset-2">Date: {item.date}</span>
                        <span className="text-sm font-semibold text-gray-800 group-hover:text-[#FFB347] transition-colors">{item.event}</span>
                        <div className="absolute top-5 right-5 text-gray-300 group-hover:text-gray-600 transition-colors">
                             <MoreHorizontal size={16} />
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Card 3: Societies Row */}
        <div>
            <h2 className="text-sm font-bold text-black uppercase mb-3 tracking-wide ml-2">SOCIETIES</h2>
            <div className="bg-white rounded-[24px] border border-gray-200 p-6 shadow-sm">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 items-stretch">
                    {SOCIETIES.map((soc) => (
                        <div 
                            key={soc.id}
                            onClick={() => setSelectedSociety(soc)}
                            className={`cursor-pointer group flex flex-col items-center justify-between p-3 rounded-2xl transition-all duration-300 hover:scale-105 border ${
                                soc.name.includes('Signal Processing') ? 'bg-[#76B900] border-transparent' : // Signal Processing Green
                                soc.name === 'IEEE' ? 'bg-[#00629B] border-transparent' : // IEEE Blue
                                'bg-white border-gray-100 hover:border-gray-300 hover:shadow-md'
                            }`}
                        >
                            <div className={`w-full aspect-square flex items-center justify-center mb-2 rounded-xl overflow-hidden p-2 ${
                                (soc.name.includes('Signal Processing') || soc.name === 'IEEE') ? 'bg-white/10' : 'bg-transparent'
                            }`}>
                                <img 
                                    src={soc.logo} 
                                    alt={soc.name} 
                                    className={`w-full h-full object-contain ${
                                        (soc.name.includes('Signal Processing') || soc.name === 'IEEE') ? 'brightness-0 invert' : ''
                                    }`} 
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            
                            <span className={`text-[9px] font-bold uppercase tracking-wider text-center leading-tight line-clamp-2 ${
                                (soc.name.includes('Signal Processing') || soc.name === 'IEEE') ? 'text-white' : 'text-gray-500 group-hover:text-[#003057]'
                            }`}>
                                {soc.name === 'IEEE' ? 'IEEE' : soc.name.replace('IEEE ', '')}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Modal Pop-up for Announcement Details */}
        {selectedAnnouncement && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]" onClick={() => setSelectedAnnouncement(null)}>
                <div 
                    className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 max-w-4xl w-full relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-200 mx-auto max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button Mobile */}
                    <button onClick={() => setSelectedAnnouncement(null)} className="absolute top-4 right-4 md:hidden text-gray-500 p-2"><MoreHorizontal size={24} className="rotate-90"/></button>

                    {/* Decorative Pin */}
                    <div className="hidden md:flex absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-b from-gray-700 to-black border-[3px] border-white shadow-lg items-center justify-center z-10">
                        <div className="w-3 h-3 rounded-full bg-gray-400 shadow-inner opacity-50"></div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                        {/* Left: Image (Flyer) */}
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-[200px] sm:h-[300px] md:h-[400px]">
                            <img 
                                src={selectedAnnouncement.image || ASSETS.IEEE_CS_LOGO} 
                                alt={selectedAnnouncement.title || selectedAnnouncement.event} 
                                className="w-full h-full object-cover"
                                loading="eager"
                            />
                        </div>

                        {/* Right: Details */}
                        <div className="flex flex-col justify-center space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Event Name:</p>
                                    <h3 className="text-xl md:text-2xl font-black text-black leading-tight">
                                        {selectedAnnouncement.title || selectedAnnouncement.event}
                                    </h3>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Dates:</p>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {selectedAnnouncement.fullDate || selectedAnnouncement.date}
                                    </p>
                                </div>

                                {selectedAnnouncement.prizes && (
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Prizes:</p>
                                        <p className="text-sm font-semibold text-[#FFB347]">
                                            {selectedAnnouncement.prizes}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Registration Link:</p>
                                <a 
                                    href={selectedAnnouncement.link || "#"} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block text-[#003057] text-sm font-bold hover:underline break-all p-3 bg-blue-50 rounded-lg border border-blue-100"
                                >
                                    {selectedAnnouncement.link || "Link not available"}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Modal Pop-up for Society Details */}
        {selectedSociety && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]" onClick={() => setSelectedSociety(null)}>
                <div 
                    className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 max-w-2xl w-full relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-200 mx-auto max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button Mobile */}
                    <button onClick={() => setSelectedSociety(null)} className="absolute top-4 right-4 md:hidden text-gray-500 p-2"><MoreHorizontal size={24} className="rotate-90"/></button>

                    {/* Decorative Pin */}
                    <div className="hidden md:flex absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-b from-gray-700 to-black border-[3px] border-white shadow-lg items-center justify-center z-10">
                        <div className="w-3 h-3 rounded-full bg-gray-400 shadow-inner opacity-50"></div>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-black mb-6 mt-4 text-center md:text-left">{selectedSociety.name}</h2>

                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                        {/* Logo Container */}
                        <div className={`w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-3xl flex items-center justify-center p-6 shadow-inner ${
                             selectedSociety.name.includes('Signal Processing') ? 'bg-[#76B900]' :
                             selectedSociety.name === 'IEEE' ? 'bg-[#00629B]' :
                             'bg-white border border-gray-100 shadow-md'
                        }`}>
                            <img 
                                src={selectedSociety.logo} 
                                alt={selectedSociety.name} 
                                className={`w-full h-full object-contain ${
                                    (selectedSociety.name.includes('Signal Processing') || selectedSociety.name === 'IEEE') ? 'brightness-0 invert' : ''
                                }`}
                                loading="eager"
                            />
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 space-y-6">
                             <p className="text-sm text-gray-600 leading-relaxed text-justify">
                                {selectedSociety.description || "Information regarding this society will be updated soon."}
                             </p>
                             
                             <div>
                                 <p className="text-xs font-bold text-gray-900 mb-1">
                                    To know more about the {selectedSociety.name} visit to this link :
                                 </p>
                                 <a 
                                    href={selectedSociety.link || "#"} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[#003057] text-sm font-medium hover:text-[#FFB347] transition-colors break-all"
                                 >
                                    ({selectedSociety.link || "Link not available"})
                                 </a>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default About;