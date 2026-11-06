
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Eye,
  Trash2,
  Briefcase,
  MapPin,
} from "lucide-react";
import api from "../services/api";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch applications
  const fetchApplications = async () => {
    try {
      setLoading(true);

      const response = await api.get("/application/all");

      setApplications(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Delete application
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/application/delete/${id}`);

      setApplications((prev) =>
        prev.filter((app) => app._id !== id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete application."
      );
    }
  };

  // Search and filter
  const filteredApplications = applications.filter((app) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      app.companyName?.toLowerCase().includes(searchValue) ||
      app.jobPosition?.toLowerCase().includes(searchValue) ||
      app.role?.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Status badge colors
  const getStatusColor = (status) => {
    const colors = {
      Applied: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      Shortlisted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      Interview: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      Selected: "bg-green-500/10 text-green-400 border-green-500/20",
      Offer: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
    };

    return (
      colors[status] ||
      "bg-zinc-800 text-zinc-400 border-zinc-700"
    );
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-zinc-700 border-t-purple-500 rounded-full animate-spin"></div>

        <p className="text-zinc-400 text-sm">
          Loading applications...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] p-4 sm:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            My Applications
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage and track all your job applications.
          </p>
        </div>

        <Link
          to="/applications/add"
          className="flex items-center justify-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700 transition shadow-lg shadow-purple-900/20 font-semibold"
        >
          <Plus size={20} />
          Add Application
        </Link>

      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 flex items-center justify-between gap-3">
          <span>{error}</span>

          <button
            onClick={() => setError("")}
            className="text-red-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Summary */}
      <div className="bg-[#18181B] border border-zinc-800 rounded-2xl shadow-xl p-5 mb-6 flex items-center gap-4">

        <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 p-3 rounded-xl">
          <Briefcase size={25} />
        </div>

        <div>
          <p className="text-zinc-400 text-sm">
            Total Applications
          </p>

          <h2 className="text-2xl font-bold text-white mt-1">
            {applications.length}
          </h2>
        </div>

      </div>

      {/* Search and Filter */}
      <div className="bg-[#18181B] border border-zinc-800 rounded-2xl shadow-xl p-5 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Search */}
          <div className="relative">

            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company, position or role..."
              className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl py-3 pl-10 pr-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />

          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-xl p-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-[#18181B] border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">

        {/* Table Header */}
        <div className="p-5 border-b border-zinc-800">

          <h2 className="text-xl font-bold text-white">
            Application List
          </h2>

          <p className="text-sm text-zinc-500 mt-1">
            Showing {filteredApplications.length} of {applications.length} applications
          </p>

        </div>

        {/* Empty State */}
        {filteredApplications.length === 0 ? (

          <div className="p-12 text-center">

            <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase size={30} className="text-purple-400" />
            </div>

            <h3 className="text-lg font-semibold text-white">
              No applications found
            </h3>

            <p className="text-zinc-500 mt-2">
              Try changing your search or filter.
            </p>

            {applications.length === 0 && (
              <Link
                to="/applications/add"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700 transition mt-5"
              >
                <Plus size={18} />
                Add Your First Application
              </Link>
            )}

          </div>

        ) : (

          /* Table */
          <div className="overflow-x-auto">

            <table className="w-full text-left min-w-[850px]">

              <thead className="bg-zinc-950/70 text-zinc-400 text-sm">

                <tr>
                  <th className="p-4 font-semibold">Company</th>
                  <th className="p-4 font-semibold">Position</th>
                  <th className="p-4 font-semibold">Location</th>
                  <th className="p-4 font-semibold">Salary</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredApplications.map((app) => (

                  <tr
                    key={app._id}
                    className="border-t border-zinc-800 hover:bg-purple-500/[0.04] transition"
                  >

                    {/* Company */}
                    <td className="p-4 font-semibold text-zinc-200">
                      {app.companyName}
                    </td>

                    {/* Position */}
                    <td className="p-4 text-zinc-400">
                      {app.jobPosition}
                    </td>

                    {/* Location */}
                    <td className="p-4 text-zinc-400">

                      <span className="flex items-center gap-1">
                        <MapPin size={15} className="text-purple-400" />

                        {app.joinLocation || "Not specified"}
                      </span>

                    </td>

                    {/* Salary */}
                    <td className="p-4 text-zinc-400">
                      {app.salary
                        ? `₹${app.salary.toLocaleString("en-IN")}`
                        : "Not specified"}
                    </td>

                    {/* Status */}
                    <td className="p-4">

                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <Link
                          to={`/applications/${app._id}`}
                          className="text-purple-400 hover:text-purple-300 transition"
                          title="View Details"
                        >
                          <Eye size={19} />
                        </Link>

                        <button
                          onClick={() => handleDelete(app._id)}
                          className="text-red-400 hover:text-red-300 transition"
                          title="Delete Application"
                        >
                          <Trash2 size={19} />
                        </button>

                      </div>

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

export default Applications;
