import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Grid3X3,
  BookMarked,
  User,
  Settings,
  Info,
  LogOut,
  BookOpen,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const navItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Grid3X3, label: "Category", path: "/category" },
  { icon: BookMarked, label: "Library", path: "/library" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: Info, label: "About Us", path: "/about" },
];

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 lg:w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-4 lg:p-6 border-b border-sidebar-border">
        <Link to="/home" className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-accent shrink-0" />
          <span className="font-serif text-xl font-bold text-sidebar-foreground hidden lg:block">
            Livision
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 lg:p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary font-medium"
                  : "text-sidebar-foreground"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 lg:p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className="hidden lg:block">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
