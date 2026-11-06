
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Briefcase } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      await login(formData);

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090B] px-4 py-8 text-zinc-100">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-2xl shadow-2xl">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-purple-600 p-3 rounded-xl shadow-lg shadow-purple-900/30">
            <Briefcase className="text-white" size={28} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-white">
          Welcome Back
        </h1>

        <p className="text-center text-zinc-400 mt-2 mb-7 text-sm">
          Login to manage your job applications
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm mb-5">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl px-4 py-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl px-4 py-3 pr-12 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-purple-400 transition"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-purple-400 hover:text-purple-300 transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-purple-900/20"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-zinc-400 mt-7">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-400 font-semibold hover:text-purple-300 transition"
          >
            Register
          </Link>
        </p>

        {/* Branding */}
        <div className="border-t border-zinc-800 mt-7 pt-5 text-center">
          <p className="text-xs text-zinc-500">
            CareerTrack · Manage your career journey
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
