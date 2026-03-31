import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-body">
      <Sidebar />
      <main className="md:ml-64 flex flex-col min-h-screen">
        <TopNav />
        <section className="flex-1 p-6 md:p-8">
          {children}
        </section>
      </main>
    </div>
  );
};

export default AppLayout;
