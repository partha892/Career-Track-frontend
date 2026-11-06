import { Bell, BriefcaseBusiness, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="h-[72px] bg-[#111114] border-b border-zinc-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">

      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden text-zinc-300">
          <Menu size={23} />
        </button>

        <Link to="/dashboard" className="flex items-center gap-2">
  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-md shadow-purple-200 overflow-hidden">
    <img
      src="/favicon.jpeg"
      alt="CareerTrack Logo"
      className="w-7 h-7 object-contain rounded-lg"
    />
  </div>

  <span className="text-xl font-bold tracking-tight text-white-900">
    Career<span className="text-purple-600">Track</span>
  </span>
</Link>


      </div>

      <div className="flex items-center gap-4">
       

        <Link to="/profile" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 flex items-center justify-center font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <span className="hidden sm:block text-sm font-medium text-zinc-200">
            {user?.name || "User"}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;