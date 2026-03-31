import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button, Card, CardContent, Input } from "@/components/common";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordStrength = password.length >= 8 ? (password.length >= 12 ? 3 : 2) : password.length > 0 ? 1 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[440px] flex flex-col gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground editorial-shadow">
            <span className="material-symbols-outlined filled">architecture</span>
          </div>
          <h1 className="text-2xl font-black text-primary tracking-tighter uppercase">Methodical</h1>
        </div>

        {/* Card */}
        <Card className="bg-surface-container-lowest rounded-xl editorial-shadow border-none shadow-none">
          <CardContent className="p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight text-on-surface">Create your workspace</h2>
            <p className="text-sm text-on-surface-variant">Start building with editorial precision.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider ml-1">Full Name</label>
              <Input
                className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/50 outline-none"
                placeholder="Arne Jacobsen"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider ml-1">Email Address</label>
              <Input
                className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/50 outline-none"
                placeholder="architect@methodical.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <Input
                  className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline/50 outline-none pr-10"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant cursor-pointer hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>

              {/* Strength meter */}
              <div className="mt-2 flex flex-col gap-2">
                <div className="flex gap-1 h-1 w-full overflow-hidden">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full ${i <= passwordStrength ? "bg-primary" : "bg-surface-container-highest"}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[0.7rem] text-on-surface-variant">
                  <span className={`material-symbols-outlined text-[14px] ${password.length >= 8 ? "text-primary filled" : "text-outline"}`}>
                    check_circle
                  </span>
                  <span>Minimum 8 characters</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="mt-4 w-full bg-gradient-to-r from-primary to-primary-container text-primary-foreground py-3.5 rounded-lg font-bold text-sm tracking-wide editorial-shadow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 py-2">
            <div className="h-px flex-grow bg-outline-variant/20"></div>
            <span className="text-[0.7rem] font-bold text-outline uppercase tracking-widest">or</span>
            <div className="h-px flex-grow bg-outline-variant/20"></div>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 bg-surface-container-low hover:bg-surface-container-high rounded-lg transition-colors border border-outline-variant/10">
              <span className="text-xs font-bold text-on-surface">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 bg-surface-container-low hover:bg-surface-container-high rounded-lg transition-colors border border-outline-variant/10">
              <span className="material-symbols-outlined text-[18px] text-on-surface filled">terminal</span>
              <span className="text-xs font-bold text-on-surface">GitHub</span>
            </button>
          </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-on-surface-variant">
          Already have an account?{" "}
          <Link className="text-primary font-bold hover:underline ml-1" to="/">Log in</Link>
        </p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 opacity-40">
          <span className="text-[0.65rem] font-medium tracking-tight">Terms of Service</span>
          <span className="text-[0.65rem] font-medium tracking-tight">Privacy Policy</span>
          <span className="text-[0.65rem] font-medium tracking-tight">System Status</span>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
