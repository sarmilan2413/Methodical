import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
    // Dummy login — navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-8">
        {/* Brand */}
        <header className="text-center space-y-2">
          <div className="flex justify-center mb-6">
            <div className="h-12 w-12 bg-primary flex items-center justify-center rounded-xl shadow-lg">
              <span className="material-symbols-outlined filled text-primary-foreground text-3xl">architecture</span>
            </div>
          </div>
          <h1 className="text-3xl font-black text-on-surface tracking-tighter font-headline">Methodical</h1>
          <p className="text-on-surface-variant font-medium text-sm">Design with precision. Manage with intent.</p>
        </header>

        {/* Form Card */}
        <main className="bg-surface-container-lowest rounded-xl p-8 editorial-shadow">
          {showError && (
            <div className="mb-6 p-3 bg-error-container/40 rounded-lg flex items-start gap-3 border border-error/10">
              <span className="material-symbols-outlined text-error text-lg mt-0.5">error</span>
              <p className="text-error text-xs font-medium leading-relaxed">
                Invalid credentials. Please verify your email and password and try again.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold tracking-wider text-on-surface-variant uppercase" htmlFor="email">
                Email Address
              </label>
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg group-focus-within:text-primary transition-colors">mail</span>
                <input
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-high border-none rounded-lg text-sm text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none"
                  id="email"
                  type="email"
                  placeholder="name@architect-studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold tracking-wider text-on-surface-variant uppercase" htmlFor="password">
                  Password
                </label>
                <a className="text-[10px] font-bold text-primary hover:text-primary-container transition-colors uppercase tracking-widest" href="#">
                  Forgot?
                </a>
              </div>
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg group-focus-within:text-primary transition-colors">lock</span>
                <input
                  className={`w-full pl-10 pr-4 py-3 bg-surface-container-high rounded-lg text-sm text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none ${passwordError ? "border-b-2 border-error/30" : "border-none"}`}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
                />
              </div>
              {passwordError && (
                <p className="text-[10px] text-error font-medium pl-1">Password is required</p>
              )}
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2 py-1">
              <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" id="remember" type="checkbox" />
              <label className="text-xs font-medium text-on-surface-variant" htmlFor="remember">Keep me signed in for 30 days</label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-primary-foreground font-bold rounded-lg shadow-md active:scale-95 hover:shadow-lg transition-all text-sm tracking-tight flex items-center justify-center gap-2"
            >
              Sign Into Workspace
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 pt-6 border-t border-outline-variant/10">
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold text-outline/40 mb-6">
              <span className="bg-surface-container-lowest px-4 z-10">Or connect via</span>
              <div className="absolute top-1/2 w-full h-px bg-outline-variant/20"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-surface rounded-lg border border-outline-variant/20 hover:bg-surface-container-high transition-colors">
                <span className="text-xs font-bold text-on-surface">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-surface rounded-lg border border-outline-variant/20 hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-lg">terminal</span>
                <span className="text-xs font-bold text-on-surface">SSO</span>
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-sm text-on-surface-variant font-medium">
            Don't have an account?{" "}
            <Link className="text-primary font-bold hover:underline decoration-2 underline-offset-4" to="/register">
              Register
            </Link>
          </p>
          <div className="mt-8 flex justify-center gap-6 opacity-40">
            <a className="text-[10px] font-bold uppercase tracking-widest hover:opacity-100 transition-opacity" href="#">Privacy</a>
            <a className="text-[10px] font-bold uppercase tracking-widest hover:opacity-100 transition-opacity" href="#">Terms</a>
            <a className="text-[10px] font-bold uppercase tracking-widest hover:opacity-100 transition-opacity" href="#">Security</a>
          </div>
        </footer>
      </div>
    </AuthLayout>
  );
};

export default Login;
