import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthFormShell from "../components/AuthFormShell";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({ phoneNumber: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      await register(formData);
      setSuccess("Registration successful. You can log in now.");
      setFormData({ phoneNumber: "", email: "", password: "" });
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      setError(err.response?.data?.message ?? "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFormShell
      title="Create an account for your movie catalogue."
      subtitle="Register once, then use the same session for login, browsing, and direct download actions from each movie page."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phoneNumber" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            autoComplete="tel"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none transition focus:border-red-700"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none transition focus:border-red-700"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none transition focus:border-red-700"
            placeholder="Create a password"
          />
        </div>

        {error ? (
          <div className="border border-rose-700/40 bg-rose-950/20 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="border border-emerald-700/40 bg-emerald-950/20 px-4 py-3 text-sm text-emerald-100">
            {success}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full border border-red-700 bg-red-700 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm text-stone-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-red-400 hover:text-red-300">
            Login
          </Link>
        </p>
      </form>
    </AuthFormShell>
  );
}

export default RegisterPage;
