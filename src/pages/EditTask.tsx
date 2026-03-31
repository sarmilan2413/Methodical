import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { Button, Input } from "@/components/common";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";
import { getTaskById, updateTask, type TaskStatus } from "@/lib/tasks";

const EditTask = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const { id } = useParams();
  const taskId = useMemo(() => Number(id), [id]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("TODO");
  const [priority, setPriority] = useState("Medium");
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const markChanged = () => { if (!hasChanges) setHasChanges(true); };

  useEffect(() => {
    const loadTask = async () => {
      if (!token) {
        logout();
        return;
      }

      if (!taskId || Number.isNaN(taskId)) {
        navigate("/tasks");
        return;
      }

      try {
        setIsLoading(true);
        const task = await getTaskById(taskId, token);
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          logout();
          return;
        }
        setErrorMessage("Unable to load task details.");
      } finally {
        setIsLoading(false);
      }
    };

    loadTask();
  }, [taskId, token, logout, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !taskId || Number.isNaN(taskId)) {
      logout();
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage("");
      await updateTask(taskId, { title, description, status }, token);
      navigate("/tasks");
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        logout();
        return;
      }
      setErrorMessage("Failed to update task.");
    } finally {
      setIsSaving(false);
    }
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
          {isLoading && (
            <div className="mb-5 rounded-lg bg-surface-container-high px-4 py-3 text-sm text-on-surface-variant">
              Loading task...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7 md:space-y-8">
            {errorMessage && (
              <div className="rounded-lg border border-error/20 bg-error-container/40 px-4 py-3 text-sm text-error">
                {errorMessage}
              </div>
            )}

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
                  onChange={(e) => { setStatus(e.target.value as TaskStatus); markChanged(); }}
                >
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Completed</option>
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
                disabled={isSaving || isLoading}
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold text-sm hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">save</span>
                {isSaving ? "Saving..." : "Update Task"}
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
