import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthFormShell from "../components/AuthFormShell";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(formData);
      navigate(location.state?.from?.pathname || "/");
    } catch (err) {
      setError(err.response?.data?.message ?? "Login failed. Please verify your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFormShell
      title="Sign in to continue downloading and browsing titles."
      subtitle="Use your account to access the movie catalogue, open detail pages, and trigger download actions from the redesigned interface."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
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
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none transition focus:border-red-700"
            placeholder="Enter your password"
          />
        </div>

        {error ? (
          <div className="border border-rose-700/40 bg-rose-950/20 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full border border-red-700 bg-red-700 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>

        <p className="text-sm text-stone-400">
          Don&apos;t have an account? {" "}
          <Link to="/register" className="font-medium text-red-400 hover:text-red-300">
            Register
          </Link>
        </p>
      </form>
    </AuthFormShell>
  );
}

export default LoginPage;
