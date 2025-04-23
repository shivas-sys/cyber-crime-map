import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [location] = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "ri-dashboard-line" },
    { path: "/map", label: "Crime Map", icon: "ri-map-pin-line" },
    { path: "/analytics", label: "Analytics", icon: "ri-line-chart-line" },
    { path: "/behavioral", label: "Behavioral Analysis", icon: "ri-psychology-line" },
    { path: "/import", label: "Data Import", icon: "ri-file-upload-line" },
    { path: "/reports", label: "Reports", icon: "ri-file-chart-line" },
    { path: "/settings", label: "Settings", icon: "ri-settings-line" },
  ];

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (showSidebar) {
      setShowSidebar(false);
    }
  }, [location, showSidebar]);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebar(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button 
          className="p-2 rounded-md bg-white shadow-md"
          onClick={() => setShowSidebar(true)}
        >
          <i className="ri-menu-line text-xl"></i>
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-gray-200 transition-all duration-300 z-20",
          showSidebar ? "fixed inset-0 block" : "hidden lg:block lg:w-64"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <i className="ri-radar-line text-white text-xl"></i>
            </div>
            <span className="text-lg font-semibold">CrimeMapper</span>
          </div>
          <button 
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setShowSidebar(false)}
          >
            <i className="ri-close-line"></i>
          </button>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1 custom-scrollbar overflow-y-auto">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                location === item.path 
                  ? "bg-primary/10 border-l-2 border-primary text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <i className={cn(item.icon, "mr-3 text-lg")}></i>
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <i className="ri-user-line"></i>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Officer Johnson
              </p>
              <p className="text-xs text-gray-500 truncate">
                Precinct #42
              </p>
            </div>
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
              <i className="ri-logout-box-line"></i>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
