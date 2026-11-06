
import { useEffect, useState } from "react";
import {
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all applications
  const fetchApplications = async () => {
    try {
      setLoading(true);

      const response = await api.get("/application/all");

      setApplications(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Calculate statistics
  const totalApplications = applications.length;

  const applied = applications.filter(
    (app) => app.status === "Applied"
  ).length;

  const shortlisted = applications.filter(
    (app) => app.status === "Shortlisted"
  ).length;

  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const selected = applications.filter(
    (app) => app.status === "Selected" || app.status === "Offer"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
      icon: Briefcase,
      color: "bg-purple-500/10 text-purple-400",
    },
    {
      title: "Applied",
      value: applied,
      icon: Clock,
      color: "bg-blue-500/10 text-blue-400",
    },
    {
      title: "Interviews",
      value: interviews,
      icon: TrendingUp,
      color: "bg-purple-500/10 text-purple-400",
    },
    {
      title: "Selected / Offers",
      value: selected,
      icon: CheckCircle,
      color: "bg-green-500/10 text-green-400",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: XCircle,
      color: "bg-red-500/10 text-red-400",
    },
  ];

  const statusColors = {
    Applied: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Shortlisted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Interview: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    Selected: "bg-green-500/10 text-green-400 border-green-500/20",
    Offer: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#09090B]">
        <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
        <p className="text-zinc-400 text-sm">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Dashboard
          </h1>

          <p className="text-zinc-400 mt-2 text-sm">
            Track your job application progress.
          </p>
        </div>

        <Link
          to="/applications/add"
          className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700 transition duration-200 font-semibold shadow-lg shadow-purple-900/20"
        >
          <Plus size={20} />
          Add Application
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-8">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl hover:border-purple-500/30 transition duration-200"
            >
              <div className="flex justify-between items-center gap-3">
                <div>
                  <p className="text-sm text-zinc-400">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-3 text-white">
                    {item.value}
                  </h2>
                </div>

                <div className={`p-3 rounded-xl ${item.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Application Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* Application Overview */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-6">
            Application Overview
          </h2>

          {totalApplications === 0 ? (
            <div className="text-center py-8">
              <Briefcase
                size={36}
                className="mx-auto text-zinc-600 mb-3"
              />

              <p className="text-zinc-400 text-sm">
                No applications yet.
              </p>

              <Link
                to="/applications/add"
                className="inline-flex items-center gap-2 mt-4 text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                Add your first application
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {[
                {
                  label: "Applied",
                  value: applied,
                  color: "bg-blue-500",
                },
                {
                  label: "Shortlisted",
                  value: shortlisted,
                  color: "bg-yellow-500",
                },
                {
                  label: "Interviews",
                  value: interviews,
                  color: "bg-purple-500",
                },
                {
                  label: "Selected / Offers",
                  value: selected,
                  color: "bg-green-500",
                },
                {
                  label: "Rejected",
                  value: rejected,
                  color: "bg-red-500",
                },
              ].map((item) => {
                const percentage =
                  (item.value / totalApplications) * 100;

                return (
                  <div key={item.label}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-zinc-400">
                        {item.label}
                      </span>

                      <span className="font-semibold text-zinc-200">
                        {item.value} ({percentage.toFixed(1)}%)
                      </span>
                    </div>

                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`${item.color} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Summary */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-6">
            Quick Summary
          </h2>

          <div className="space-y-5">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <span className="text-zinc-400 text-sm">
                Total Applications
              </span>

              <strong className="text-white">
                {totalApplications}
              </strong>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <span className="text-zinc-400 text-sm">
                Shortlisted
              </span>

              <strong className="text-yellow-400">
                {shortlisted}
              </strong>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <span className="text-zinc-400 text-sm">
                Interviews
              </span>

              <strong className="text-purple-400">
                {interviews}
              </strong>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-sm">
                Selection / Offer Rate
              </span>

              <strong className="text-green-400">
                {totalApplications
                  ? `${((selected / totalApplications) * 100).toFixed(1)}%`
                  : "0%"}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">
              Recent Applications
            </h2>

            <p className="text-zinc-500 text-sm mt-1">
              Your latest job applications.
            </p>
          </div>

          <Link
            to="/applications"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-semibold transition"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-10">
            <Briefcase
              size={40}
              className="mx-auto text-zinc-600 mb-3"
            />

            <p className="text-zinc-400 text-sm">
              No applications found.
            </p>

            <Link
              to="/applications/add"
              className="inline-flex items-center gap-2 mt-4 text-purple-400 hover:text-purple-300 text-sm font-medium"
            >
              <Plus size={16} />
              Add Application
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[650px]">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 text-xs uppercase tracking-wider">
                  <th className="py-4 px-3 font-semibold">
                    Company
                  </th>

                  <th className="py-4 px-3 font-semibold">
                    Position
                  </th>

                  <th className="py-4 px-3 font-semibold">
                    Location
                  </th>

                  <th className="py-4 px-3 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {applications.slice(0, 5).map((app) => (
                  <tr
                    key={app._id}
                    className="border-b border-zinc-800/70 last:border-0 hover:bg-zinc-800/30 transition"
                  >
                    <td className="py-4 px-3">
                      <span className="font-semibold text-zinc-200">
                        {app.companyName}
                      </span>
                    </td>

                    <td className="py-4 px-3 text-zinc-400 text-sm">
                      {app.jobPosition}
                    </td>

                    <td className="py-4 px-3 text-zinc-400 text-sm">
                      {app.joinLocation || "Not specified"}
                    </td>

                    <td className="py-4 px-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                          statusColors[app.status] ||
                          "bg-zinc-800 text-zinc-300 border-zinc-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
