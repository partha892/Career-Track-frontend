
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Send, CheckCircle } from "lucide-react";
import { forgotPassword } from "../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword(email.trim());

      setMessage(
        response.message ||
          "If the account exists, a reset email has been sent."
      );

      setEmail("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to send reset email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090B] p-4 text-zinc-100">

      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8">

        {/* Icon */}
        <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6">
          <Mail size={28} />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-white">
          Forgot Password?
        </h1>

        <p className="text-zinc-400 mt-2 mb-7 text-sm leading-6">
          Enter your registered email address. We'll send you a password
          reset link.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl px-4 py-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
              {error}
            </p>
          )}

          {/* Success */}
          {message && (
            <div className="flex gap-2 text-sm text-green-400 bg-green-500/10 border border-green-500/20 p-3 rounded-xl">
              <CheckCircle size={19} className="shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-purple-900/20"
          >
            <Send size={18} />
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        {/* Back to Login */}
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 mt-7 text-sm text-zinc-400 hover:text-purple-400 transition"
        >
          <ArrowLeft size={17} />
          Back to Login
        </Link>

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

export default ForgotPassword;
