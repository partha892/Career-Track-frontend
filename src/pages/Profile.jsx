
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  ShieldCheck,
  LogOut,
  ArrowLeft,
  Briefcase,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle logout
  const handleLogout = async () => {
    try {
      setLoading(true);
      setError("");

      await logout();

      navigate("/login", { replace: true });
    } catch (err) {
      setError("Unable to logout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-purple-400 mb-6 transition"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            My Profile
          </h1>

          <p className="text-zinc-400 mt-2 text-sm">
            Manage your account information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">

          {/* Profile Header */}
          <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 p-8 text-center">
            <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User size={45} className="text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white">
              {user?.name || "User"}
            </h2>

            <p className="text-purple-100 mt-2 text-sm">
              CareerTrack Member
            </p>
          </div>

          {/* Account Information */}
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white mb-6">
              Account Information
            </h3>

            <div className="space-y-5">

              {/* Name */}
              <div className="flex items-center gap-4 border-b border-zinc-800 pb-5">
                <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 p-3 rounded-xl">
                  <User size={22} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-zinc-500">
                    Full Name
                  </p>

                  <p className="font-semibold text-zinc-200 mt-1 break-words">
                    {user?.name || "Not available"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 border-b border-zinc-800 pb-5">
                <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-3 rounded-xl">
                  <Mail size={22} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-zinc-500">
                    Email Address
                  </p>

                  <p className="font-semibold text-zinc-200 mt-1 break-all">
                    {user?.email || "Not available"}
                  </p>
                </div>
              </div>

              {/* Account Status */}
              <div className="flex items-center gap-4 border-b border-zinc-800 pb-5">
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-xl">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <p className="text-sm text-zinc-500">
                    Account Status
                  </p>

                  <p className="font-semibold text-green-400 mt-1">
                    Active
                  </p>
                </div>
              </div>

              {/* Application Tracker */}
              <div className="flex items-center gap-4">
                <div className="bg-orange-500/10 border border-orange-500/20 text-orange-400 p-3 rounded-xl">
                  <Briefcase size={22} />
                </div>

                <div>
                  <p className="text-sm text-zinc-500">
                    Service
                  </p>

                  <p className="font-semibold text-zinc-200 mt-1">
                    Job Application Tracker
                  </p>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm mt-6">
                {error}
              </div>
            )}

            {/* Logout */}
            <div className="mt-8 pt-6 border-t border-zinc-800">
              <button
                onClick={handleLogout}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <LogOut size={19} />
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-600 mt-6">
          CareerTrack · Your career journey starts here.
        </p>
      </div>
    </div>
  );
};

export default Profile;
