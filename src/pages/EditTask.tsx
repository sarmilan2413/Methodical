import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { Button, Input } from "@/components/common";

const taskData: Record<string, { title: string; description: string; status: string; priority: string }> = {
  "1": { title: "Foundation Schematics", description: "Drafting the structural core for the North Pavilion extension. Must comply with local building codes.", status: "Completed", priority: "Medium" },
  "2": { title: "Material Selection", description: "Reviewing sustainable glass and timber options for the main atrium facade.", status: "In Progress", priority: "Medium" },
  "3": { title: "Permit Approval", description: "Immediate action required for the zoning permit application. Deadline approaching.", status: "In Progress", priority: "High Priority" },
};

const fallbackTask = {
  title: "Structural Analysis - Wing B",
  description: "Verify load-bearing capacities for the secondary support columns in the east wing. Documentation needs to follow ISO-9001 standards for architectural safety.",
  status: "In Progress",
  priority: "High Priority",
};

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const initial = id && taskData[id] ? taskData[id] : fallbackTask;

  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [status, setStatus] = useState(initial.status);
  const [priority, setPriority] = useState(initial.priority);
  const [hasChanges, setHasChanges] = useState(false);

  const markChanged = () => { if (!hasChanges) setHasChanges(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/tasks");
  };

  return (
    <LayoutWrapper>
      <div className="flex flex-col items-center justify-start px-1 sm:px-0">
        {/* Header */}
        <div className="w-full max-w-2xl mb-8 md:mb-10 flex flex-col gap-2">
          <nav className="flex items-center gap-2 text-on-surface-variant text-xs font-medium mb-2 overflow-x-auto pb-1">
            <button type="button" className="hover:text-primary transition-colors">Workspace</button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <button type="button" className="hover:text-primary transition-colors" onClick={() => navigate("/tasks")}>Tasks</button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-on-surface">Edit Task</span>
          </nav>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface">Edit Task Details</h2>
          <p className="text-on-surface-variant max-w-lg">Refine the structural requirements and timeline for this architectural deliverable.</p>
        </div>

        {/* Form */}
        <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl editorial-shadow p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-7 md:space-y-8">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Task Title</label>
              <Input
                className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface font-medium focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant outline-none"
                type="text"
                value={title}
                onChange={(e) => { setTitle(e.target.value); markChanged(); }}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Description</label>
              <textarea
                className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all resize-none outline-none"
                rows={6}
                value={description}
                onChange={(e) => { setDescription(e.target.value); markChanged(); }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Current Status</label>
                <select
                  className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none appearance-none"
                  value={status}
                  onChange={(e) => { setStatus(e.target.value); markChanged(); }}
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Priority Alert</label>
                <select
                  className={`w-full border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary transition-all outline-none appearance-none ${priority === "High Priority" ? "bg-error-container text-error" : "bg-surface-container-high text-on-surface"}`}
                  value={priority}
                  onChange={(e) => { setPriority(e.target.value); markChanged(); }}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High Priority</option>
                </select>
                {priority === "High Priority" && (
                  <p className="text-[10px] text-error font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">info</span>
                    Required for milestone "Phase 1 Completion"
                  </p>
                )}
              </div>
            </div>

            {/* Unsaved banner */}
            {hasChanges && (
              <div className="p-4 bg-tertiary-fixed rounded-lg flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary text-lg mt-0.5">warning</span>
                <div>
                  <p className="text-sm font-bold text-tertiary">Unsaved Changes</p>
                  <p className="text-xs text-tertiary/80">You have modified the status of this task. Please save to update the team dashboard.</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 md:pt-4">
              <Button
                type="button"
                onClick={() => navigate("/tasks")}
                variant="ghost"
                className="text-on-surface-variant font-semibold text-sm hover:text-on-surface transition-colors justify-center sm:justify-start"
              >
                Discard Changes
              </Button>
              <Button
                type="submit"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold text-sm hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">save</span>
                Update Task
              </Button>
            </div>
          </form>
        </div>

        {/* Meta info */}
        <div className="w-full max-w-2xl mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest">Created by</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-[10px] font-bold">SM</div>
              <span className="font-semibold text-on-surface">Sarah Mitchell</span>
            </div>
          </div>
          <div className="md:text-right">
            <span className="text-[10px] font-black uppercase tracking-widest">Last Modified</span>
            <p className="font-medium text-on-surface">October 24, 2023 • 14:32</p>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default EditTask;
