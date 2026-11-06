
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";

import {
  CheckCircle,
  XCircle,
  LoaderCircle,
  Mail,
  Briefcase,
  ArrowLeft,
} from "lucide-react";

import api from "../services/api";

const VerifyEmail = () => {
  const { token } = useParams();

  const [status, setStatus] = useState("loading");

  const [message, setMessage] = useState(
    "Verifying your email address..."
  );

  // Prevent duplicate API requests
  const verificationStarted = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing.");
        return;
      }

      // Prevent duplicate requests
      if (verificationStarted.current) return;

      verificationStarted.current = true;

      try {
        console.log("Verifying token:", token);

        const response = await api.get(
          `/user/verify/${token}`
        );

        console.log("Verification response:", response.data);

        setStatus("success");

        setMessage(
          response.data.message ||
            "Your email has been verified successfully."
        );

      } catch (error) {
        console.error(
          "Verification error:",
          error.response?.data || error.message
        );

        setStatus("error");

        setMessage(
          error.response?.data?.message ||
            "Verification link is invalid or expired."
        );
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-4 py-8">

      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-7">
          <div className="bg-purple-600 p-3 rounded-xl shadow-lg shadow-purple-600/20">
            <Briefcase
              size={27}
              className="text-white"
            />
          </div>
        </div>

        {/* Loading State */}
        {status === "loading" && (
          <>
            <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <LoaderCircle
                size={45}
                className="text-purple-400 animate-spin"
              />
            </div>

            <h1 className="text-2xl font-bold text-white">
              Verifying Email
            </h1>

            <p className="text-zinc-400 text-sm mt-2">
              Please wait while we verify your account.
            </p>
          </>
        )}

        {/* Success State */}
        {status === "success" && (
          <>
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle
                size={48}
                className="text-green-400"
              />
            </div>

            <h1 className="text-2xl font-bold text-white">
              Email Verified!
            </h1>

            <p className="text-green-400 text-sm mt-2">
              Your account is now verified.
            </p>
          </>
        )}

        {/* Error State */}
        {status === "error" && (
          <>
            <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <XCircle
                size={48}
                className="text-red-400"
              />
            </div>

            <h1 className="text-2xl font-bold text-white">
              Verification Failed
            </h1>

            <p className="text-red-400 text-sm mt-2">
              Please check your verification link.
            </p>
          </>
        )}

        {/* Backend Message */}
        <p className="text-zinc-400 text-sm leading-relaxed mt-4 mb-7">
          {message}
        </p>

        {/* Success Button */}
        {status === "success" && (
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition duration-200"
          >
            Continue to Login
            <ArrowLeft
              size={18}
              className="rotate-180"
            />
          </Link>
        )}

        {/* Error Button */}
        {status === "error" && (
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white py-3 rounded-xl font-semibold transition duration-200"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>
        )}

        {/* Loading Message */}
        {status === "loading" && (
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
            <Mail
              size={17}
              className="text-purple-400"
            />
            Please wait...
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-zinc-600 mt-7">
          CareerTrack · Your career journey starts here.
        </p>

      </div>
    </div>
  );
};

export default VerifyEmail;
