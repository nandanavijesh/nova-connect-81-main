import { Outlet, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Users, Filter, Star, LogOut, Zap } from "lucide-react";

const navItems = [
  { title: "Student Repository", url: "/hr", icon: Users },
  { title: "Skill Filter", url: "/hr/filter", icon: Filter },
  { title: "Shortlisted", url: "/hr/shortlisted", icon: Star },
];

const HRLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="h-14 border-b bg-card flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-accent flex items-center justify-center">
              <Zap className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="font-bold text-foreground tracking-tight">Alpha Nova</span>
            <span className="text-xs text-muted-foreground ml-1">HR Dashboard</span>
          </div>
          <nav className="flex gap-1">
            {navItems.map((item) => (
              <RouterNavLink
                key={item.url}
                to={item.url}
                end={item.url === "/hr"}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`
                }
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.title}
              </RouterNavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{user?.name}</span>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default HRLayout;
