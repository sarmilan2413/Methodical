import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

const CreateTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would POST to API
    navigate("/tasks");
  };

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-start">
        {/* Header */}
        <div className="w-full max-w-2xl mb-10 flex flex-col gap-2">
          <nav className="flex items-center gap-2 text-on-surface-variant text-xs font-medium mb-2">
            <a className="hover:text-primary" href="#">Workspace</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <a className="hover:text-primary cursor-pointer" onClick={() => navigate("/tasks")}>Tasks</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-on-surface">Create Task</span>
          </nav>
          <h2 className="text-4xl font-extrabold tracking-tight text-on-surface">Create New Task</h2>
          <p className="text-on-surface-variant max-w-lg">Define the structural requirements and timeline for this architectural deliverable.</p>
        </div>

        {/* Form */}
        <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl editorial-shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="task-title">Task Title</label>
              <input
                className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface font-medium focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant outline-none"
                id="task-title"
                type="text"
                placeholder="e.g. Initial Site Survey"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="task-desc">Description</label>
              <textarea
                className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all resize-none outline-none"
                id="task-desc"
                rows={5}
                placeholder="Provide detailed technical specifications..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Status</label>
                <select
                  className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none appearance-none"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Priority</label>
                <select
                  className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary transition-all outline-none appearance-none"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High Priority</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate("/tasks")}
                className="text-on-surface-variant font-semibold text-sm hover:text-on-surface transition-colors"
              >
                Discard Changes
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold text-sm hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">save</span>
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateTask;
