import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-surface-container-low shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between px-6 h-16 w-full">
        <div className="flex items-center gap-4">
          <span className="text-xl font-black text-primary tracking-tighter">Methodical</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors active:scale-95 relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface-container-low"></span>
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors active:scale-95">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="h-8 w-px bg-outline-variant/20 mx-1"></div>
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-on-surface leading-none">{user?.name || "User"}</p>
              <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">Authenticated</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-sm ring-2 ring-surface-container-lowest shadow-sm">
              {(user?.name || "U").slice(0, 2).toUpperCase()}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="text-on-surface-variant hover:text-primary text-sm font-medium transition-colors ml-1"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;