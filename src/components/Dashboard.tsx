
import { useState } from "react";
import { Calendar, CheckSquare, Clock, LineChart, BookOpen } from "lucide-react";
import KanbanBoard from "./KanbanBoard";
import Pomodoro from "./Pomodoro";
import Notebook from "./Notebook";
import Analytics from "./Analytics";
import MoodTracker from "./MoodTracker";

interface DashboardProps {
  showSidebar: boolean;
}

const Dashboard = ({ showSidebar }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("tasks");

  const tabs = [
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "pomodoro", label: "Pomodoro", icon: Clock },
    { id: "notebook", label: "Notebook", icon: BookOpen },
    { id: "analytics", label: "Analytics", icon: LineChart },
    { id: "mood", label: "Mood", icon: Calendar },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "tasks":
        return <KanbanBoard />;
      case "pomodoro":
        return <Pomodoro />;
      case "notebook":
        return <Notebook />;
      case "analytics":
        return <Analytics />;
      case "mood":
        return <MoodTracker />;
      default:
        return <KanbanBoard />;
    }
  };

  return (
    <div className="pt-16 flex">
      {showSidebar && (
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-slate-200 p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>
      )}
      <main
        className={`flex-1 p-6 transition-all ${
          showSidebar ? "ml-64" : "ml-0"
        }`}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
