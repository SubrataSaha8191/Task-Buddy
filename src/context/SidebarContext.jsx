// src/context/SidebarContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-hide sidebar on mobile by default
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const openSidebar = () => {
    setIsOpen(true);
  };

  // Calculate dynamic margin based on sidebar state
  const getContentMargin = () => {
    if (isMobile) {
      return 'ml-0'; // No margin on mobile since sidebar overlays
    }
    return isOpen ? 'ml-64' : 'ml-20'; // ml-64 = 256px when open, ml-20 = 80px when closed
  };

  const value = {
    isOpen,
    isMobile,
    toggleSidebar,
    closeSidebar,
    openSidebar,
    getContentMargin
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};