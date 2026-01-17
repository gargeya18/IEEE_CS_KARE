import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { ASSETS } from '../data';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Team', path: '/team' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  
  // Pages where the navbar should be transparent initially (dark backgrounds)
  const isTransparentPage = ['/', '/about', '/achievements'].includes(location.pathname);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || !isTransparentPage
          ? 'h-20 bg-[#0E0E0E]/95 backdrop-blur-md border-b border-white/10 shadow-lg' 
          : 'h-24 bg-[#0E0E0E] md:bg-transparent border-b border-white/5 md:border-transparent'
      } flex items-center px-4 md:px-8 lg:px-12 gap-4`}
    >
      {/* Left: Logo Group */}
      <Link to="/" className="flex items-center gap-3 group select-none shrink-0">
           {/* Logo in White Box */}
           <div className="bg-white px-2 py-1 md:px-3 md:py-1.5 rounded-lg shadow-md flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
               <img src={ASSETS.IEEE_CS_LOGO} alt="IEEE CS" className="h-8 md:h-9 w-auto object-contain" /> 
          </div>
          
          {/* Text - Branch Identifier (Visible on larger screens to clarify branch) */}
          <div className="hidden lg:flex flex-col justify-center border-l border-white/10 pl-3 h-8">
              <span className="text-white font-bold text-sm leading-none group-hover:text-[#FFB347] transition-colors tracking-wide">Student Branch</span>
              <span className="text-gray-400 text-[10px] font-medium tracking-[0.2em] uppercase group-hover:text-white transition-colors">KARE</span>
          </div>
      </Link>

      {/* Center: Nav Links - Scrollable on mobile */}
      <div className="flex-1 flex items-center justify-start md:justify-center overflow-x-auto gap-6 md:gap-8 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {navLinks.map((link) => (
              <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-all duration-300 relative py-1 flex items-center gap-1.5 whitespace-nowrap ${
                      isActive(link.path)
                          ? 'text-[#FFB347]'
                          : 'text-gray-300 hover:text-white'
                  }`}
              >
                  {link.name}
                  {isActive(link.path) && (
                      <span className="absolute -bottom-1.5 left-0 w-full h-[3px] bg-[#FFB347] rounded-full shadow-[0_0_8px_#FFB347]"></span>
                  )}
              </Link>
          ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 shrink-0">
          <button 
              onClick={toggleTheme}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
              aria-label="Toggle Theme"
          >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link to="#" className="hidden sm:flex px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-[#050505] border border-gray-800 hover:border-[#E6007E] hover:bg-[#E6007E]/5 transition-all shadow-md items-center justify-center group whitespace-nowrap">
              <span className="text-[#E6007E] font-serif font-bold text-xs md:text-sm tracking-[0.15em] group-hover:text-[#ff7cbd] transition-colors">WIE KARE</span>
          </Link>
      </div>
    </nav>
  );
};

export default Navbar;