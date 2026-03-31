import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/StatCard";
import { Link } from "react-router-dom";

const projectStreams = [
  {
    category: "BRANDING",
    title: "Modernist Identity System Re-design",
    updated: "2h ago",
    avatars: 2,
  },
  {
    category: "DEVELOPMENT",
    title: "Core Component Library Migration",
    updated: "5h ago",
    avatars: 1,
  },
];

const deadlines = [
  { month: "OCT", day: 14, title: "Final Render Submission", subtitle: "Residential Tower Project" },
  { month: "OCT", day: 19, title: "Material Selection Workshop", subtitle: "Client: Novo Urban" },
];

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Headline */}
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">Dashboard Overview</h1>
          <p className="text-on-surface-variant font-medium">Welcome back, Alex. Here is the current project status.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard icon="task" label="Total Active Tasks" value={142} badge="+12%" />
          <StatCard icon="check_circle" label="Completed This Week" value={98} badge="84%" />
          <StatCard icon="hourglass_top" label="Pending Review" value={44} badge="High Priority" badgeColor="text-error bg-error-container" />
        </div>

        {/* Projects + Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Streams */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-on-surface">Active Project Streams</h2>
              <Link to="/tasks" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="space-y-4">
              {projectStreams.map((p) => (
                <div key={p.title} className="bg-surface-container-lowest rounded-xl p-5 editorial-shadow flex items-center gap-4 hover:editorial-shadow-hover transition-all border border-transparent hover:border-primary-fixed">
                  <div className="w-16 h-16 rounded-lg bg-surface-container-high flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-2xl">image</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">{p.category}</span>
                      <span className="text-[10px] text-on-surface-variant">• Updated {p.updated}</span>
                    </div>
                    <p className="text-sm font-semibold text-on-surface truncate">{p.title}</p>
                  </div>
                  <div className="flex -space-x-2">
                    {Array.from({ length: p.avatars }).map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-surface-container-lowest flex items-center justify-center text-xs font-bold text-on-surface-variant">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Deadlines */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Upcoming Deadlines</h3>
              {deadlines.map((d) => (
                <div key={d.title} className="flex items-start gap-4">
                  <div className="text-center flex-shrink-0">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">{d.month}</p>
                    <p className="text-2xl font-bold text-on-surface">{d.day}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">{d.title}</p>
                    <p className="text-xs text-on-surface-variant">{d.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips Card */}
            <div className="bg-primary rounded-xl p-6 text-primary-foreground">
              <h4 className="font-bold mb-2">Master Your Flow</h4>
              <p className="text-sm opacity-80 mb-3">Press ⌘K to open the architect's toolkit from anywhere.</p>
              <a href="#" className="text-sm font-bold underline underline-offset-4">Quick Start Guide</a>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
