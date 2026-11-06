import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Plus, X } from "lucide-react";
import api from "../services/api";

const AddApplication = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    companyLink: "",
    jobPosition: "",
    jobCriteria: "",
    role: "",
    skills: [],
    jobDescription: "",
    salary: "",
    joinLocation: "",
    selectionProcess: "",
    status: "Applied",
  });

  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add skill
  const handleAddSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    const alreadyExists = formData.skills.some(
      (item) => item.toLowerCase() === skill.toLowerCase()
    );

    if (alreadyExists) {
      setError("This skill is already added.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));

    setSkillInput("");
    setError("");
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.companyName.trim() ||
      !formData.jobPosition.trim() ||
      !formData.role.trim() ||
      !formData.jobDescription.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.skills.length === 0) {
      setError("Please add at least one skill.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        salary: formData.salary ? Number(formData.salary) : undefined,
      };

      await api.post("/application/add", payload);

      navigate("/applications");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to add application. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-[#09090B] p-4 sm:p-6">

    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <div className="mb-6">

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition mb-4"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-white">
          Add New Application
        </h1>

        <p className="text-zinc-400 mt-2">
          Enter the company and job details below.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#18181B] border border-zinc-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-8"
      >

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Company Information */}
        <section>

          <h2 className="text-xl font-semibold text-white mb-5">
            Company Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Company Name *
              </label>

              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. TCS"
                required
                className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl p-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Company Website
              </label>

              <input
                type="url"
                name="companyLink"
                value={formData.companyLink}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl p-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Company Description
              </label>

              <textarea
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleChange}
                rows="3"
                placeholder="About the company..."
                className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl p-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
              />
            </div>

          </div>
        </section>

        <hr className="border-zinc-800" />

        {/* Job Information */}
        <section>

          <h2 className="text-xl font-semibold text-white mb-5">
            Job Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Job Position *
              </label>

              <input
                type="text"
                name="jobPosition"
                value={formData.jobPosition}
                onChange={handleChange}
                placeholder="e.g. Software Developer"
                required
                className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl p-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Job Role *
              </label>

              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Full Stack Developer"
                required
                className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl p-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Job Criteria
              </label>

              <input
                type="text"
                name="jobCriteria"
                value={formData.jobCriteria}
                onChange={handleChange}
                placeholder="e.g. Fresher / 0-2 years"
                className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl p-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Salary (Annual)
              </label>

              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                min="0"
                placeholder="e.g. 400000"
                className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl p-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Job Location
              </label>

              <input
                type="text"
                name="joinLocation"
                value={formData.joinLocation}
                onChange={handleChange}
                placeholder="e.g. Kolkata / Remote"
                className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl p-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Application Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-xl p-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              >
                <option value="Applied">Applied</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
                <option value="Offer">Offer</option>
              </select>
            </div>

          </div>
        </section>

        <hr className="border-zinc-800" />

        {/* Skills */}
        <section>

          <h2 className="text-xl font-semibold text-white mb-5">
            Required Skills *
          </h2>

          <div className="flex gap-2">

            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              placeholder="e.g. React, Node.js, Java"
              className="flex-1 min-w-0 bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl p-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />

            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-purple-600 text-white px-5 rounded-xl hover:bg-purple-700 transition shadow-lg shadow-purple-900/20"
            >
              <Plus size={20} />
            </button>

          </div>

          <div className="flex flex-wrap gap-2 mt-4">

            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 px-3 py-2 rounded-lg text-sm"
              >
                {skill}

                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-purple-300 hover:text-red-400 transition"
                >
                  <X size={15} />
                </button>
              </span>
            ))}

          </div>

        </section>

        <hr className="border-zinc-800" />

        {/* Job Description */}
        <section>

          <h2 className="text-xl font-semibold text-white mb-5">
            Job Description *
          </h2>

          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            rows="5"
            required
            placeholder="Enter job responsibilities and requirements..."
            className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl p-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
          />

        </section>

        <hr className="border-zinc-800" />

        {/* Selection Process */}
        <section>

          <h2 className="text-xl font-semibold text-white mb-5">
            Selection Process
          </h2>

          <textarea
            name="selectionProcess"
            value={formData.selectionProcess}
            onChange={handleChange}
            rows="3"
            placeholder="e.g. Aptitude Test, Technical Interview, HR Interview"
            className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl p-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
          />

        </section>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-5 border-t border-zinc-800">

          <button
            type="button"
            onClick={() => navigate("/applications")}
            className="border border-zinc-700 text-zinc-300 px-6 py-3 rounded-xl hover:bg-zinc-800 hover:text-white transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg shadow-purple-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Application"}
          </button>

        </div>

      </form>

    </div>
  </div>
);
};

export default AddApplication;