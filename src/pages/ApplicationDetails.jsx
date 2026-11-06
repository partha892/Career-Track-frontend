
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Briefcase,
  MapPin,
  IndianRupee,
  ExternalLink,
  Calendar,
  Pencil,
  Trash2,
  Code,
} from "lucide-react";
import api from "../services/api";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch application details
  const fetchApplication = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/application/get/${id}`);

      setApplication(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load application details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [id]);

  // Delete application
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/application/delete/${id}`);
      navigate("/applications");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete application."
      );
    }
  };

  // Status color
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
          Loading application details...
        </p>
      </div>
    );
  }

  // Error
  if (error || !application) {
    return (
      <div className="min-h-screen bg-[#09090B] p-4 sm:p-6">
        <div className="max-w-4xl mx-auto bg-[#18181B] border border-zinc-800 rounded-2xl p-8">
          <p className="text-red-400 mb-4">
            {error || "Application not found."}
          </p>

          <Link
            to="/applications"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
          >
            <ArrowLeft size={17} />
            Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] p-4 sm:p-6">

      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <Link
          to="/applications"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition mb-6"
        >
          <ArrowLeft size={18} />
          Back to Applications
        </Link>

        {/* Main Header */}
        <div className="bg-[#18181B] border border-zinc-800 rounded-2xl shadow-xl p-6 mb-6">

          <div className="flex flex-col md:flex-row justify-between gap-5">

            <div className="min-w-0">

              <div className="flex items-center gap-3 mb-3">

                <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 p-3 rounded-xl">
                  <Building2 size={28} />
                </div>

                <div className="min-w-0">
                  <h1 className="text-2xl font-bold text-white break-words">
                    {application.companyName}
                  </h1>

                  <p className="text-zinc-400 text-sm mt-1">
                    {application.companyDescription ||
                      "No company description"}
                  </p>
                </div>

              </div>

              <h2 className="text-xl font-semibold text-zinc-100 mt-5">
                {application.jobPosition}
              </h2>

              <p className="text-purple-400 mt-1">
                {application.role}
              </p>

              <div className="flex flex-wrap gap-4 mt-4 text-sm text-zinc-400">

                <span className="flex items-center gap-1">
                  <MapPin size={16} className="text-purple-400" />
                  {application.joinLocation || "Location not specified"}
                </span>

                <span className="flex items-center gap-1">
                  <IndianRupee size={16} className="text-purple-400" />
                  {application.salary
                    ? application.salary.toLocaleString("en-IN")
                    : "Salary not specified"}
                </span>

              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 md:min-w-40">

              <span
                className={`text-center px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                  application.status
                )}`}
              >
                {application.status}
              </span>

              <Link
                to={`/applications/edit/${application._id}`}
                className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-xl hover:bg-purple-700 transition shadow-lg shadow-purple-900/20"
              >
                <Pencil size={17} />
                Edit
              </Link>

              <button
                onClick={handleDelete}
                className="flex items-center justify-center gap-2 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl hover:bg-red-500/10 transition"
              >
                <Trash2 size={17} />
                Delete
              </button>

            </div>

          </div>

          {/* Company Website */}
          {application.companyLink && (
            <a
              href={application.companyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-400 text-sm mt-5 hover:text-purple-300 transition"
            >
              Visit Company Website
              <ExternalLink size={15} />
            </a>
          )}

        </div>

        {/* Job Information */}
        <div className="bg-[#18181B] border border-zinc-800 rounded-2xl shadow-xl p-6 mb-6">

          <h2 className="text-xl font-bold text-white mb-5">
            Job Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <InfoItem
              icon={<Briefcase size={20} />}
              label="Job Position"
              value={application.jobPosition}
            />

            <InfoItem
              icon={<Building2 size={20} />}
              label="Job Role"
              value={application.role}
            />

            <InfoItem
              icon={<MapPin size={20} />}
              label="Job Location"
              value={application.joinLocation}
            />

            <InfoItem
              icon={<IndianRupee size={20} />}
              label="Annual Salary"
              value={
                application.salary
                  ? `₹${application.salary.toLocaleString("en-IN")}`
                  : ""
              }
            />

            <InfoItem
              icon={<Calendar size={20} />}
              label="Experience / Criteria"
              value={application.jobCriteria}
            />

            <InfoItem
              icon={<Calendar size={20} />}
              label="Created On"
              value={
                application.createdAt
                  ? new Date(application.createdAt).toLocaleDateString("en-IN")
                  : ""
              }
            />

          </div>
        </div>

        {/* Required Skills */}
        <div className="bg-[#18181B] border border-zinc-800 rounded-2xl shadow-xl p-6 mb-6">

          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Code size={21} className="text-purple-400" />
            Required Skills
          </h2>

          <div className="flex flex-wrap gap-2">

            {application.skills?.length > 0 ? (
              application.skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="bg-purple-500/10 border border-purple-500/20 text-purple-300 px-4 py-2 rounded-lg text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-zinc-500">
                No skills specified.
              </p>
            )}

          </div>
        </div>

        {/* Job Description */}
        <div className="bg-[#18181B] border border-zinc-800 rounded-2xl shadow-xl p-6 mb-6">

          <h2 className="text-xl font-bold text-white mb-4">
            Job Description
          </h2>

          <p className="text-zinc-400 whitespace-pre-wrap leading-7">
            {application.jobDescription}
          </p>

        </div>

        {/* Selection Process */}
        <div className="bg-[#18181B] border border-zinc-800 rounded-2xl shadow-xl p-6 mb-6">

          <h2 className="text-xl font-bold text-white mb-4">
            Selection Process
          </h2>

          <p className="text-zinc-400 whitespace-pre-wrap leading-7">
            {application.selectionProcess || "Not specified"}
          </p>

        </div>

      </div>
    </div>
  );
};

// Reusable information component
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">

    <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 p-2 rounded-lg">
      {icon}
    </div>

    <div>
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="font-semibold text-zinc-200 mt-1">
        {value || "Not specified"}
      </p>
    </div>

  </div>
);

export default ApplicationDetails;
