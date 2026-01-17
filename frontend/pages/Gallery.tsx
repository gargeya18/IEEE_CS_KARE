import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ROBOTICS_GALLERY, EVENT2_GALLERY, GALLERY_ITEMS } from '../data';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { GalleryItem } from '../types';

// Optimized LazyImage with loading transition
const LazyImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [inView, setInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (imgRef.current) observer.unobserve(imgRef.current);
          }
        });
      },
      { rootMargin: '100px', threshold: 0.01 }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden bg-gray-200 ${className}`}>
      {inView && (
        <img
          src={src}
          alt={alt}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-lg'
          }`}
        />
      )}
    </div>
  );
};

// Reusable Carousel Component
const GalleryCarousel = ({ 
    title, 
    items, 
    onImageClick 
}: { 
    title: string, 
    items: GalleryItem[], 
    onImageClick: (item: GalleryItem) => void 
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Scroll to specific index
    const scrollToIndex = (index: number) => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const children = Array.from(container.children) as HTMLElement[];
        
        // Clamp target index
        const targetIndex = Math.max(0, Math.min(children.length - 1, index));
        const targetChild = children[targetIndex];
        
        if (targetChild) {
            // Calculate center position
            const newScrollLeft = targetChild.offsetLeft - (container.clientWidth / 2) + (targetChild.offsetWidth / 2);
            container.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    // Calculate current centered index based on scroll position
    const getCurrentIndex = () => {
        if (!scrollRef.current) return 0;
        const container = scrollRef.current;
        
        // Edge case: Start of scroll
        if (container.scrollLeft < 20) return 0;
        
        // Edge case: End of scroll
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 20) {
            return container.children.length - 1;
        }

        const containerCenter = container.scrollLeft + (container.clientWidth / 2);
        const children = Array.from(container.children) as HTMLElement[];
        
        let closestIndex = 0;
        let minDistance = Number.MAX_VALUE;
        
        children.forEach((child, index) => {
             // Calculate child center relative to the scroll container's content coordinates
             const childCenter = child.offsetLeft + (child.offsetWidth / 2);
             const distance = Math.abs(containerCenter - childCenter);
             
             if (distance < minDistance) {
                 minDistance = distance;
                 closestIndex = index;
             }
        });
        return closestIndex;
    };

    // Scroll Handler for Buttons
    const scroll = (direction: 'left' | 'right') => {
        const currentIndex = getCurrentIndex();
        const targetIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
        scrollToIndex(targetIndex);
    };

    // Active Index Observer (Visual State only)
    // Using a scroll listener for more precise updates than IntersectionObserver on large screens
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            const index = getCurrentIndex();
            setActiveIndex(index);
        };

        // Attach scroll listener
        container.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        handleScroll();

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [items]);

    // Auto-scroll
    useEffect(() => {
        if (isHovered || items.length === 0) return;
        
        const interval = setInterval(() => {
            const currentIndex = getCurrentIndex();
            let nextIndex = currentIndex + 1;
            
            // Loop back to start if at end
            if (nextIndex >= items.length) {
                nextIndex = 0;
            }
            
            scrollToIndex(nextIndex);
        }, 4000);

        return () => clearInterval(interval);
    }, [isHovered, items.length]);

    if (items.length === 0) return null;

    return (
        <div 
            className="py-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end px-4 md:px-8 mb-8 gap-4">
                <div className="relative">
                    <h2 className="text-2xl md:text-4xl font-black text-[#1F2937] uppercase tracking-wider relative z-10">
                        {title}
                    </h2>
                    <div className="absolute -bottom-2 left-0 w-2/3 h-3 bg-[#FFB347]/40 -skew-x-12 -z-0"></div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-3">
                    <button 
                        onClick={() => scroll('left')} 
                        className="w-12 h-12 rounded-full border-2 border-[#1F2937] flex items-center justify-center text-[#1F2937] hover:bg-[#1F2937] hover:text-white transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <button 
                        onClick={() => scroll('right')} 
                        className="w-12 h-12 rounded-full border-2 border-[#1F2937] flex items-center justify-center text-[#1F2937] hover:bg-[#1F2937] hover:text-white transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg"
                        aria-label="Next image"
                    >
                        <ChevronRight size={24} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* Carousel Container */}
            <div 
                ref={scrollRef}
                className="relative flex gap-6 overflow-x-auto px-4 md:px-8 py-10 snap-x snap-mandatory hide-scrollbar scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <div 
                            key={item.id}
                            data-index={index}
                            className={`
                                relative flex-shrink-0 w-[85vw] sm:w-[400px] aspect-[4/3] rounded-3xl overflow-hidden snap-center cursor-pointer group
                                transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                                ${isActive 
                                    ? 'scale-100 opacity-100 shadow-[0_20px_40px_-10px_rgba(31,41,55,0.4)] z-20 ring-4 ring-[#FFB347] ring-offset-4 ring-offset-white' 
                                    : 'scale-90 opacity-60 hover:opacity-100 hover:scale-95 grayscale-[50%] hover:grayscale-0'
                                }
                            `}
                            onClick={() => onImageClick(item)}
                        >
                            {/* Image */}
                            <LazyImage src={item.src} alt={item.caption} className="w-full h-full" />
                            
                            {/* Overlay Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-[#1F2937]/90 via-transparent to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-500">
                                <span className={`inline-block px-3 py-1 bg-[#FFB347] text-[#1F2937] text-[10px] font-bold uppercase tracking-widest rounded-full mb-3 shadow-lg transform transition-all duration-500 delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>
                                    {item.category}
                                </span>
                                <h3 className={`text-white text-xl font-bold leading-tight transform transition-all duration-500 delay-200 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>
                                    {item.caption}
                                </h3>
                            </div>

                            {/* Hover Icon */}
                            <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/30">
                                <ZoomIn size={18} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<{src: string, caption: string} | null>(null);

  // Combine categories from filters and dataset to ensure matches
  const filters = ['All', 'Workshop', 'Event', 'Hackathon', 'Social'];

  // Data Filtering Logic
  const filteredRobotics = useMemo(() => 
    ROBOTICS_GALLERY.filter(item => filter === 'All' || item.category.toLowerCase().includes(filter.toLowerCase())),
  [filter]);

  const filteredEvents = useMemo(() => 
    EVENT2_GALLERY.filter(item => filter === 'All' || item.category.toLowerCase().includes(filter.toLowerCase())),
  [filter]);

  const filteredMisc = useMemo(() => 
    GALLERY_ITEMS.filter(item => filter === 'All' || item.category.toLowerCase().includes(filter.toLowerCase())),
  [filter]);

  return (
    <div className="min-h-screen bg-white font-sans pt-32 pb-20 overflow-x-hidden selection:bg-[#FFB347] selection:text-[#1F2937]">
      
      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-4xl md:text-6xl font-black text-[#1F2937] mb-6 uppercase tracking-tight">
            Our <span className="text-[#FFB347] underline decoration-4 underline-offset-4 decoration-[#1F2937]">Gallery</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Capturing moments of innovation, collaboration, and success across our journey.
        </p>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`
                    px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 transform
                    ${filter === f
                        ? 'bg-[#FFB347] text-[#1F2937] shadow-[0_10px_25px_-5px_rgba(255,179,71,0.5)] scale-110 -translate-y-1'
                        : 'bg-white text-gray-500 border border-gray-200 hover:border-[#FFB347] hover:text-[#FFB347] hover:shadow-md'
                    }
                `}
              >
                {f}
              </button>
            ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Sections */}
        {filteredRobotics.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                <GalleryCarousel 
                    title="Robotics & Innovation" 
                    items={filteredRobotics} 
                    onImageClick={setLightboxImage} 
                />
            </div>
        )}

        {filteredEvents.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                <GalleryCarousel 
                    title="Events & Highlights" 
                    items={filteredEvents} 
                    onImageClick={setLightboxImage} 
                />
            </div>
        )}

        {/* Fallback for mixed items if needed or separate section */}
         {filteredMisc.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                <GalleryCarousel 
                    title="Community Moments" 
                    items={filteredMisc} 
                    onImageClick={setLightboxImage} 
                />
            </div>
        )}

        {(filteredRobotics.length === 0 && filteredEvents.length === 0 && filteredMisc.length === 0) && (
            <div className="text-center py-20">
                <p className="text-gray-400 text-xl font-medium">No images found for this category.</p>
                <button onClick={() => setFilter('All')} className="text-[#FFB347] font-bold mt-4 hover:underline">View All Photos</button>
            </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
            className="fixed inset-0 z-[100] bg-[#1F2937]/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300" 
            onClick={() => setLightboxImage(null)}
        >
            <button 
                className="absolute top-6 right-6 text-white/70 hover:text-white hover:rotate-90 transition-all duration-300 p-2 bg-white/10 rounded-full z-50"
            >
                <X size={32} />
            </button>

            <div 
                className="relative max-w-7xl max-h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <img 
                        src={lightboxImage.src} 
                        alt={lightboxImage.caption} 
                        className="max-w-full max-h-[80vh] object-contain" 
                    />
                </div>
                
                <div className="mt-6 text-center animate-in slide-in-from-bottom-4 duration-500 delay-100">
                    <h3 className="text-white text-2xl font-bold tracking-wide mb-2">{lightboxImage.caption}</h3>
                    <div className="h-1 w-20 bg-[#FFB347] mx-auto rounded-full"></div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;