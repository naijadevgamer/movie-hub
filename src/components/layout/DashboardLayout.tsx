import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import { useState, useCallback } from "react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("now_playing");

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onCategoryChange={handleCategoryChange}
        activeCategory={activeCategory}
      />

      <div className="lg:pl-65">
        <main className="min-h-screen">
          <Outlet
            context={{
              onMenuClick: () => setIsSidebarOpen(true),
              activeCategory,
              onCategoryChange: handleCategoryChange,
              showSidebar: true,
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
