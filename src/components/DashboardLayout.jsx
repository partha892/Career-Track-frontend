import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100">

      {/* Navbar */}
      <Navbar
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="flex min-h-[calc(100vh-72px)]">

        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 w-full bg-[#09090B] p-4 sm:p-6 lg:p-8">

          <div className="max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>

        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;