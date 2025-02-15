
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

const Navbar = ({ showSidebar, setShowSidebar }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 px-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSidebar(!showSidebar)}
          className="shrink-0"
        >
          {showSidebar ? <X size={20} /> : <Menu size={20} />}
        </Button>
        <h1 className="text-xl font-semibold text-slate-800">TaskSpire</h1>
      </div>
    </nav>
  );
};

export default Navbar;
