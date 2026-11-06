import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  User,
  PlusCircle,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Applications", path: "/applications", icon: Briefcase },
    { name: "Add Application", path: "/applications/add", icon: PlusCircle },
    { name: "My Profile", path: "/profile", icon: User },
  ];

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
        />
      )}

      <aside className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#111114] border-r border-zinc-800 transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0 lg:h-auto lg:min-h-[calc(100vh-72px)] ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>

        <div className="flex justify-between items-center p-5 border-b border-zinc-800 lg:hidden">
          <span className="text-white font-bold">CareerTrack</span>
          <button onClick={onClose} className="text-zinc-400">
            <X size={22} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-5 px-3">
            Workspace
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/applications"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-900/30"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    }`
                  }
                >
                  <Icon size={19} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-5 left-4 right-4 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-purple-400 font-semibold text-sm">
            Career Growth
          </p>
          <p className="text-zinc-500 text-xs mt-2">
            Keep moving towards your dream job.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;