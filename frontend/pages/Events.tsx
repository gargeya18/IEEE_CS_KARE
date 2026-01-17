import React, { useState, useMemo } from 'react';
import { EVENTS } from '../data';
import { Search, Calendar, MapPin, Filter, X } from 'lucide-react';
import { Event } from '../types';

const Events: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'All' | 'Upcoming' | 'Ongoing' | 'Completed'>('Upcoming');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const categories = ['Workshop', 'Hackathon', 'Webinar', 'Social'];
  const domains = ['Web Development', 'AI/ML', 'Hardware/IoT', 'Cybersecurity'];
  const statuses = ['LIVE', 'OPEN', 'CLOSING', 'FULL', 'COMPLETED'];

  const toggleFilter = (item: string, current: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
      if (current.includes(item)) {
          setter(current.filter(i => i !== item));
      } else {
          setter([...current, item]);
      }
  };

  const filteredEvents = useMemo(() => {
    return EVENTS.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory.length === 0 || selectedCategory.includes(event.category);
      const matchesDomain = selectedDomain.length === 0 || selectedDomain.includes(event.domain);
      const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(event.status);
      
      let matchesTab = true;
      if (activeTab === 'All') matchesTab = true;
      else if (activeTab === 'Upcoming') matchesTab = event.status === 'OPEN' || event.status === 'CLOSING';
      else if (activeTab === 'Ongoing') matchesTab = event.status === 'LIVE';
      else if (activeTab === 'Completed') matchesTab = event.status === 'COMPLETED' || event.status === 'FULL';

      return matchesSearch && matchesCategory && matchesDomain && matchesTab && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedDomain, selectedStatus, activeTab]);

  const StatusBadge = ({ status }: { status: Event['status'] }) => {
    const styles = {
      LIVE: 'bg-red-500 text-white animate-pulse',
      OPEN: 'bg-green-500 text-white',
      CLOSING: 'bg-yellow-500 text-white',
      FULL: 'bg-gray-400 text-white',
      COMPLETED: 'bg-blue-500 text-white',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}>
        {status === 'LIVE' ? '🔴 LIVE NOW' : status}
      </span>
    );
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filter */}
          <aside className={`md:w-72 flex-shrink-0 transition-all duration-300 ${showMobileFilters ? 'fixed inset-0 z-[60] bg-white p-6 overflow-y-auto animate-in slide-in-from-bottom-10' : 'hidden md:block'}`}>
            <div className="space-y-8 sticky top-28">
                <div className="flex justify-between items-center md:hidden mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                    <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-gray-100 rounded-full"><X size={24} /></button>
                </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#FFB347] focus:ring-2 focus:ring-[#FFB347]/20 transition-all"
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-bold text-xs uppercase text-gray-500 mb-3 tracking-widest">Event Type</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedCategory.includes(cat)}
                            onChange={() => toggleFilter(cat, selectedCategory, setSelectedCategory)}
                            className="peer h-4 w-4 rounded border-gray-300 text-[#FFB347] focus:ring-[#FFB347]"
                        />
                      </div>
                      <span className="text-sm text-gray-700 group-hover:text-[#FFB347] transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

               {/* Domains */}
               <div>
                <h3 className="font-bold text-xs uppercase text-gray-500 mb-3 tracking-widest">Domain</h3>
                <div className="space-y-2">
                  {domains.map((dom) => (
                    <label key={dom} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedDomain.includes(dom)}
                        onChange={() => toggleFilter(dom, selectedDomain, setSelectedDomain)}
                        className="rounded text-[#FFB347] focus:ring-[#FFB347]"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-[#FFB347] transition-colors">{dom}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <h3 className="font-bold text-xs uppercase text-gray-500 mb-3 tracking-widest">Status</h3>
                <div className="space-y-2">
                  {statuses.map((status) => (
                    <label key={status} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedStatus.includes(status)}
                        onChange={() => toggleFilter(status, selectedStatus, setSelectedStatus)}
                        className="rounded text-[#FFB347] focus:ring-[#FFB347]"
                      />
                      <span className="text-sm text-gray-700 capitalize group-hover:text-[#FFB347] transition-colors">{status.toLowerCase()}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {setSelectedCategory([]); setSelectedDomain([]); setSelectedStatus([]); setSearchTerm(''); setShowMobileFilters(false);}}
                className="w-full py-3 text-sm text-white bg-red-500 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-md"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">What's Happening at <br/><span className="text-[#FFB347]">IEEE CS KARE</span></h1>
              <button onClick={() => setShowMobileFilters(true)} className="md:hidden flex items-center gap-2 px-4 py-2 bg-[#1F2937] text-white rounded-lg text-sm font-bold shadow-md active:scale-95 transition-transform">
                <Filter size={18} /> Filters
              </button>
            </div>

            {/* Tabs */}
            <div className="flex justify-start space-x-2 md:space-x-4 mb-8 w-full border-b border-gray-200 pb-1 overflow-x-auto hide-scrollbar">
                {['All', 'Ongoing', 'Upcoming', 'Completed'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-3 md:px-4 py-2 text-sm font-bold transition-all duration-300 relative whitespace-nowrap ${
                            activeTab === tab 
                                ? 'text-[#003057]' 
                                : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-[-5px] left-0 right-0 h-1 bg-[#003057] rounded-t-full"></div>
                        )}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {filteredEvents.map((event) => (
                <article key={event.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col cursor-default will-change-transform h-full">
                  <div className="relative h-48 sm:h-56 bg-gray-200 overflow-hidden shrink-0">
                    <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        decoding="async" 
                    />
                    <div className="absolute top-3 right-3">
                      <StatusBadge status={event.status} />
                    </div>
                  </div>
                  
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFB347] bg-yellow-50 px-2 py-0.5 rounded border border-yellow-100">{event.category}</span>
                        <span className="text-[10px] text-gray-300 hidden sm:inline">•</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{event.domain}</span>
                    </div>
                    
                    <h2 className="text-lg md:text-xl font-bold mb-3 text-gray-900 leading-tight group-hover:text-[#003057] transition-colors">{event.title}</h2>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2">{event.description}</p>
                    
                    <div className="mt-auto space-y-2 text-sm text-gray-600 border-t border-gray-50 pt-4">
                      <div className="flex items-center gap-3"><Calendar size={16} className="text-[#FFB347] shrink-0"/> <span className="truncate">{event.date} • {event.time}</span></div>
                      <div className="flex items-center gap-3"><MapPin size={16} className="text-[#FFB347] shrink-0"/> <span className="truncate">{event.venue}</span></div>
                    </div>

                    <div className="mt-6 flex gap-3">
                       <button 
                            onClick={() => setSelectedEvent(event)}
                            className="flex-1 bg-[#003057] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#FFB347] hover:text-black transition-all shadow-md hover:shadow-lg transform active:scale-[0.98] duration-200"
                       >
                         {event.status === 'COMPLETED' ? 'View Recap' : 'View Details'}
                       </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">No events found in this category.</p>
                <button 
                    onClick={() => {setSelectedCategory([]); setSelectedDomain([]); setSelectedStatus([]); setSearchTerm(''); setActiveTab('All')}}
                    className="mt-4 text-[#FFB347] font-bold text-sm hover:underline"
                >
                    Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                <div 
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
                    onClick={() => setSelectedEvent(null)} 
                />
                <div className="relative bg-white rounded-2xl md:rounded-3xl w-full max-w-2xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col">
                    <div className="relative h-48 md:h-64 shrink-0">
                         <img 
                            src={selectedEvent.image} 
                            alt={selectedEvent.title} 
                            className="w-full h-full object-cover" 
                            loading="eager"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                         <button 
                            onClick={() => setSelectedEvent(null)}
                            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors z-10"
                         >
                            <X size={20} />
                         </button>
                         <div className="absolute bottom-6 left-6 right-6">
                             <div className="flex gap-2 mb-2">
                                <StatusBadge status={selectedEvent.status} />
                                <span className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wide border border-white/10">
                                    {selectedEvent.category}
                                </span>
                             </div>
                             <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight shadow-sm">
                                {selectedEvent.title}
                             </h2>
                         </div>
                    </div>
                    
                    <div className="p-5 md:p-8 space-y-6 md:space-y-8">
                        {/* Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6 bg-gray-50 rounded-2xl border border-gray-100">
                             <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#FFB347] border border-gray-100 shrink-0">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-1">Date & Time</p>
                                    <p className="font-semibold text-gray-900">{selectedEvent.date}</p>
                                    <p className="text-sm text-gray-500">{selectedEvent.time}</p>
                                </div>
                             </div>
                             
                             <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#FFB347] border border-gray-100 shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-1">Location</p>
                                    <p className="font-semibold text-gray-900">{selectedEvent.venue}</p>
                                    <p className="text-sm text-gray-500">Campus Map</p>
                                </div>
                             </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                About the Event
                                <div className="h-px flex-1 bg-gray-200"></div>
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-justify whitespace-pre-line text-sm md:text-base">
                                {selectedEvent.description} 
                            </p>
                        </div>
                        
                        {/* Speaker Section */}
                        {selectedEvent.speaker && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    Guest Speaker
                                    <div className="h-px flex-1 bg-gray-200"></div>
                                </h3>
                                <div className="flex items-center gap-4">
                                     <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                         <img 
                                            src={`https://ui-avatars.com/api/?name=${selectedEvent.speaker}&background=random`} 
                                            alt={selectedEvent.speaker}
                                            className="w-full h-full object-cover"
                                            loading="lazy" 
                                         />
                                     </div>
                                     <div>
                                         <h4 className="font-bold text-lg text-gray-900">{selectedEvent.speaker}</h4>
                                         <p className="text-sm text-gray-500">Industry Expert</p>
                                     </div>
                                </div>
                            </div>
                        )}

                        {/* Footer Action */}
                        <div className="flex gap-4 pt-4 mt-auto">
                            <button 
                                onClick={() => setSelectedEvent(null)}
                                className="flex-1 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Close
                            </button>
                            <button className="flex-1 py-3 rounded-xl bg-[#003057] font-bold text-white hover:bg-[#FFB347] hover:text-black transition-colors shadow-lg shadow-blue-900/20">
                                {selectedEvent.status === 'OPEN' ? 'Register Now' : 'Event Page'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
      )}
    </div>
  );
};

export default Events;