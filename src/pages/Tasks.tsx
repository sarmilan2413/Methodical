import { useState } from "react";
import { Link } from "react-router-dom";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import StatusBadge from "@/components/StatusBadge";

interface Task {
  id: string;
  icon: string;
  title: string;
  description: string;
  status: "success" | "warning" | "error";
  statusLabel: string;
}

const allTasks: Task[] = [
  { id: "1", icon: "architecture", title: "Foundation Schematics", description: "Drafting the structural core for the North Pavili...", status: "success", statusLabel: "Success" },
  { id: "2", icon: "lightbulb", title: "Material Selection", description: "Reviewing sustainable glass and timber option...", status: "warning", statusLabel: "Warning" },
  { id: "3", icon: "warning", title: "Permit Approval", description: "Immediate action required for the zoning permi...", status: "error", statusLabel: "Error" },
  { id: "4", icon: "draw", title: "Interior Layout Design", description: "Planning the open-concept workspace for floor 3...", status: "success", statusLabel: "Success" },
  { id: "5", icon: "engineering", title: "HVAC System Review", description: "Evaluating energy-efficient cooling solutions...", status: "warning", statusLabel: "Warning" },
  { id: "6", icon: "landscape", title: "Landscape Integration", description: "Green roof design coordination with the city...", status: "success", statusLabel: "Success" },
  { id: "7", icon: "electric_bolt", title: "Electrical Grid Plan", description: "Mapping power distribution for east wing...", status: "error", statusLabel: "Error" },
  { id: "8", icon: "water_drop", title: "Plumbing Assessment", description: "Water recycling system feasibility study...", status: "warning", statusLabel: "Warning" },
  { id: "9", icon: "security", title: "Fire Safety Compliance", description: "Reviewing fire escape routes and sprinkler...", status: "success", statusLabel: "Success" },
  { id: "10", icon: "palette", title: "Color Palette Finalization", description: "Finalizing exterior and interior paint specs...", status: "success", statusLabel: "Success" },
  { id: "11", icon: "construction", title: "Scaffolding Logistics", description: "Coordinating scaffolding for Phase 2 elevation...", status: "warning", statusLabel: "Warning" },
  { id: "12", icon: "eco", title: "Sustainability Audit", description: "LEED certification document preparation...", status: "success", statusLabel: "Success" },
];

const ITEMS_PER_PAGE = 3;

const Tasks = () => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const filtered = allTasks.filter(
    (t) =>
      t.title.toLowerCase().includes(filter.toLowerCase()) ||
      t.description.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = (id: string) => {
    // In real app, would remove from state/API
    alert(`Delete task ${id}`);
  };

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl font-black text-on-surface tracking-tighter mb-2">Project Tasks</h2>
            <p className="text-on-surface-variant font-medium flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              {filtered.length} active items across 3 project boards
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-surface-container-high rounded-xl p-1">
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  viewMode === "table" ? "bg-surface-container-lowest text-on-surface" : "text-on-surface-variant"
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  viewMode === "card" ? "bg-surface-container-lowest text-on-surface" : "text-on-surface-variant"
                }`}
              >
                Card
              </button>
            </div>
            <div className="relative group">
              <span className="absolute inset-y-0 left-3 flex items-center text-on-surface-variant group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">search</span>
              </span>
              <input
                className="pl-10 pr-4 py-2.5 bg-surface-container-high border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="Filter tasks..."
                value={filter}
                onChange={(e) => { setFilter(e.target.value); setPage(1); }}
              />
            </div>
            <Link
              to="/create-task"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add Task
            </Link>
          </div>
        </div>

        {/* Table */}
        {viewMode === "table" && (
        <div className="bg-surface-container-lowest rounded-2xl editorial-shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/50 border-b border-outline-variant/10">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Task Title</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hidden md:table-cell">Description</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((task) => (
                <tr key={task.id} className="border-b border-outline-variant/5 hover:bg-surface-container-low/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-lg">{task.icon}</span>
                      <span className="text-sm font-semibold text-on-surface">{task.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant hidden md:table-cell">{task.description}</td>
                  <td className="px-6 py-5">
                    <StatusBadge status={task.status} label={task.statusLabel} />
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/edit-task/${task.id}`}
                        className="p-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-primary rounded-lg transition-all"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="p-2 bg-error-container hover:bg-error/20 text-error rounded-lg transition-all"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-outline-variant/10">
            <p className="text-xs text-on-surface-variant font-medium">
              Showing {paginated.length} of {filtered.length} tasks
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container-high disabled:opacity-30 transition-all"
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container-high disabled:opacity-30 transition-all"
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
        )}

        {/* Card View */}
        {viewMode === "card" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {paginated.map((task) => (
              <div key={task.id} className="bg-surface-container-lowest rounded-xl p-5 editorial-shadow border border-outline-variant/10">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">{task.icon}</span>
                    <p className="text-sm font-semibold text-on-surface">{task.title}</p>
                  </div>
                  <StatusBadge status={task.status} label={task.statusLabel} />
                </div>
                <p className="text-sm text-on-surface-variant mb-4">{task.description}</p>
                <div className="flex items-center justify-end gap-2">
                  <Link
                    to={`/edit-task/${task.id}`}
                    className="px-3 py-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-primary text-xs font-semibold transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-3 py-2 rounded-lg bg-error-container text-error text-xs font-semibold hover:bg-error/20 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="bg-surface-container-lowest rounded-xl p-6 editorial-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-primary">trending_up</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Velocity</span>
            </div>
            <h3 className="text-3xl font-bold text-on-surface tracking-tight">+12.5%</h3>
            <p className="text-xs text-on-surface-variant mt-1">Task completion rate increase this week</p>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-6 editorial-shadow flex items-center gap-4">
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Project Progress</p>
              <h3 className="text-xl font-bold text-on-surface tracking-tight mb-3">Metropolitan Museum Redesign</h3>
              <div className="h-2 bg-surface-container-high rounded-full overflow-hidden mb-2">
                <div className="h-full bg-primary rounded-full" style={{ width: "67%" }}></div>
              </div>
              <p className="text-xs text-on-surface-variant">67% complete • Due in 14 days</p>
            </div>
            <div className="w-24 h-24 rounded-lg bg-surface-container-high flex-shrink-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant text-3xl">apartment</span>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Tasks;
