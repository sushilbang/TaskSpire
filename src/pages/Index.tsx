
import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const Index = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-center" />
      <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Dashboard showSidebar={showSidebar} />
    </div>
  );
};

export default Index;
