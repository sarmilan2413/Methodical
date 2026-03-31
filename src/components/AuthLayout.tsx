import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="bg-surface font-body text-on-surface flex items-center justify-center min-h-screen p-6 relative overflow-hidden">
      {children}
      {/* Decorative blurs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-[60%] -right-[5%] w-[30%] h-[30%] bg-tertiary-fixed-dim/10 blur-[100px] rounded-full"></div>
      </div>
    </div>
  );
};

export default AuthLayout;
