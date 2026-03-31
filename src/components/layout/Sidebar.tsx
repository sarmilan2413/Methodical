import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: "dashboard", label: "Dashboard", path: "/dashboard" },
  { icon: "assignment", label: "Tasks", path: "/tasks" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col bg-surface-container-low p-4 gap-2 z-50">
      <div className="mb-8 px-2">
        <h2 className="text-lg font-bold text-on-surface tracking-tight">Workspace</h2>
        <p className="text-xs text-on-surface-variant opacity-70">Architect Studio</p>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === "/tasks" && (location.pathname.startsWith("/tasks") || location.pathname.startsWith("/create-task") || location.pathname.startsWith("/edit-task")));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all active:scale-95 duration-200 ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-1 border-t border-outline-variant/10 pt-4">
        <Link
          to="/create-task"
          className="mb-4 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold text-sm shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Create Task
        </Link>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-all">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-sm font-medium">Settings</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-all">
          <span className="material-symbols-outlined">help_outline</span>
          <span className="text-sm font-medium">Help</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
