
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, X } from "lucide-react";
import api from "../services/api";

const EditApplication = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing application
  const fetchApplication = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/application/get/${id}`);
      const app = response.data.data;

      setFormData({
        companyName: app.companyName || "",
        companyDescription: app.companyDescription || "",
        companyLink: app.companyLink || "",
        jobPosition: app.jobPosition || "",
        jobCriteria: app.jobCriteria || "",
        role: app.role || "",
        skills: app.skills || [],
        jobDescription: app.jobDescription || "",
        salary: app.salary ?? "",
        joinLocation: app.joinLocation || "",
        selectionProcess: app.selectionProcess || "",
        status: app.status || "Applied",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load application."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [id]);

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

    const exists = formData.skills.some(
      (item) => item.toLowerCase() === skill.toLowerCase()
    );

    if (exists) {
      setError("This skill already exists.");
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
      skills: prev.skills.filter(
        (skill) => skill !== skillToRemove
      ),
    }));
  };

  // Update application
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
      setSaving(true);

      const payload = {
        ...formData,
        salary:
          formData.salary === "" ? undefined : Number(formData.salary),
      };

      await api.put(`/application/update/${id}`, payload);

      navigate(`/applications/${id}`);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update application."
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#09090B]">
        <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />

        <p className="text-zinc-400 text-sm">
          Loading application...
        </p>
      </div>
    );
  }

  // Error state
  if (error && !formData.companyName) {
    return (
      <div className="min-h-screen bg-[#09090B] p-6">
        <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <p className="text-red-400 mb-4">{error}</p>

          <Link
            to="/applications"
            className="text-purple-400 hover:text-purple-300"
          >
            Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <Link
          to={`/applications/${id}`}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-purple-400 mb-5 transition"
        >
          <ArrowLeft size={18} />
          Back to Details
        </Link>

        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Edit Application
          </h1>

          <p className="text-zinc-400 mt-2 text-sm">
            Update your company and job information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 p-5 sm:p-8 rounded-2xl shadow-xl space-y-7"
        >
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Company Information */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-5">
              Company Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Company Name *"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Company Website"
                name="companyLink"
                type="url"
                value={formData.companyLink}
                onChange={handleChange}
              />

              <div className="md:col-span-2">
                <FormTextarea
                  label="Company Description"
                  name="companyDescription"
                  value={formData.companyDescription}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* Job Information */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-5">
              Job Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Job Position *"
                name="jobPosition"
                value={formData.jobPosition}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Job Role *"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Job Criteria"
                name="jobCriteria"
                value={formData.jobCriteria}
                onChange={handleChange}
              />

              <FormInput
                label="Annual Salary"
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                min="0"
              />

              <FormInput
                label="Job Location"
                name="joinLocation"
                value={formData.joinLocation}
                onChange={handleChange}
              />

              {/* Application Status */}
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-2">
                  Application Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-xl p-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition"
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
            <h2 className="text-lg font-semibold text-white mb-4">
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
                placeholder="Enter a skill (e.g. React, Node.js)"
                className="flex-1 min-w-0 bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl p-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition"
              />

              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-xl transition"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Skill List */}
            <div className="flex flex-wrap gap-2 mt-4">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 px-3 py-2 rounded-lg text-sm"
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
            <h2 className="text-lg font-semibold text-white mb-4">
              Job Description *
            </h2>

            <FormTextarea
              label=""
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              required
            />
          </section>

          {/* Selection Process */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-4">
              Selection Process
            </h2>

            <FormTextarea
              label=""
              name="selectionProcess"
              value={formData.selectionProcess}
              onChange={handleChange}
            />
          </section>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-5 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => navigate(`/applications/${id}`)}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-6 py-3 rounded-xl transition font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition font-semibold disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-purple-900/20"
            >
              {saving ? "Updating..." : "Update Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable input component
const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  min,
}) => (
  <div>
    <label className="block text-sm font-semibold text-zinc-300 mb-2">
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl p-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition"
    />
  </div>
);

// Reusable textarea component
const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  required = false,
}) => (
  <div>
    {label && (
      <label className="block text-sm font-semibold text-zinc-300 mb-2">
        {label}
      </label>
    )}

    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows="4"
      className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl p-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition resize-y"
    />
  </div>
);

export default EditApplication;
