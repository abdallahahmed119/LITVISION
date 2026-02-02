import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "@/lib/auth";
import { Navigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Sidebar />
      <main className="ml-20 lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
