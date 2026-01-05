import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname, hash } = useLocation();

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (hash) {
        smoothScrollTo(hash.replace('#', ''));
      } else {
        // Smooth scroll to top when navigating to a new page without a hash
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Small timeout ensures DOM is fully rendered/mounted before scrolling
    const timeoutId = setTimeout(handleScroll, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, hash]);

  // Handle generic anchor clicks for smooth scrolling within the same page
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      try {
        const url = new URL(target.href);
        const isSamePage = 
          url.pathname === window.location.pathname && 
          url.search === window.location.search;

        if (isSamePage && url.hash) {
          const targetId = url.hash.replace('#', '');
          
          // Case 1: Standard anchor tag (not handled by React Router)
          if (!e.defaultPrevented) {
            e.preventDefault();
            window.history.pushState(null, '', url.hash);
            smoothScrollTo(targetId);
          } 
          // Case 2: React Router Link (already handled navigation, but won't trigger useEffect if hash is same)
          else if (url.hash === window.location.hash) {
            smoothScrollTo(targetId);
          }
        }
      } catch (error) {
        // Ignore invalid URLs
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;