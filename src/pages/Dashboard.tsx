import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/dashboard/Sidebar';
import { TopBar } from '../components/dashboard/TopBar';
import { DashboardContent } from '../components/dashboard/DashboardContent';
import { Footer } from '../components/dashboard/Footer';

export const Dashboard = () => {
  const [activeItem, setActiveItem] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' && window.innerWidth >= 768
  );

 
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      if (desktop) {
        setSidebarOpen(false); 
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="d-flex vh-100 m-0" style={{ backgroundColor: '#f8f9fc', overflow: 'hidden' }}>
      {/* Mobile Overlay */}
      {!isDesktop && sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {isDesktop ? (
     
        <div
          style={{
            width: '280px',
            height: '100%',
            backgroundColor: '#1f2937',
            position: 'relative',
            flexShrink: 0
          }}
        >
          <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
        </div>
      ) : (
     
        <div
          className="position-fixed top-0 start-0"
          style={{
            width: '280px',
            height: '100%',
            backgroundColor: '#1f2937',
            zIndex: 1050,
            transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease-in-out'
          }}
        >
          <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
        </div>
      )}

      {/* Content Area */}
      <div
        className="flex-fill d-flex flex-column overflow-hidden"
        style={{
          backgroundColor: '#f8f9fc',
          minHeight: '100vh'
        }}
      >
        <TopBar onToggleSidebar={toggleSidebar} />
        <main className="flex-fill overflow-auto p-3" style={{ backgroundColor: '#f8f9fc' }}>
          <DashboardContent activeItem={activeItem} />
        </main>
        <Footer />
      </div>
    </div>
  );
};
