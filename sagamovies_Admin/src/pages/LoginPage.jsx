import { Film } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await login(formValues);
      toast.success('Login successful.');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/60 bg-white/85 shadow-soft backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative hidden bg-slate-950 p-10 text-white lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(66,107,255,0.35),_transparent_36%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.24),_transparent_28%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-brand-300">
              <Film size={30} />
            </div>
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-300">
                SagaMovies Admin
              </p>
              <h1 className="max-w-md text-4xl font-semibold leading-tight">
                Manage your movie catalog with a polished control panel.
              </h1>
              <p className="max-w-lg text-base text-slate-300">
                Secure login, fast publishing workflows, and responsive management screens for
                desktop and mobile.
              </p>
            </div>
          </div>
        </section>

        <section className="p-6 sm:p-10 lg:p-12">
          <div className="mx-auto w-full max-w-md space-y-8">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-brand-600">
                Welcome Back
              </p>
              <h2 className="text-3xl font-semibold text-slate-950">Login to continue</h2>
              <p className="text-sm text-slate-500">
                Sign in with your admin account to access the panel.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-700">Email</span>
                <input
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                  placeholder="admin@example.com"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-700">Password</span>
                <input
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                  placeholder="••••••••"
                />
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? 'Signing in...' : 'Login'}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
