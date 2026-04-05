import { useAuth } from "@/lib/auth-context";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { User, FileText, Award, Bell, MessageSquare, LogOut, Zap, Share2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Profile", url: "/student", icon: User },
  { title: "Resume Builder", url: "/student/resume", icon: FileText },
  { title: "Posts", url: "/student/posts", icon: Share2 },
  { title: "Portfolio", url: "/student/portfolio", icon: Globe },
  { title: "AI Chatbot", url: "/student/chatbot", icon: MessageSquare },
  { title: "Awards & Certs", url: "/student/awards", icon: Award },
  { title: "Notifications", url: "/student/notifications", icon: Bell },
];

export function StudentSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg gradient-accent flex items-center justify-center flex-shrink-0">
            <Zap className="h-4 w-4 text-accent-foreground" />
          </div>
          {!collapsed && (
            <span className="text-sm font-bold text-sidebar-foreground tracking-tight">Alpha Nova</span>
          )}
        </div>
      </div>

      <SidebarContent>
        {!collapsed && user && (
          <div className="p-4 border-b border-sidebar-border">
            <div className="h-10 w-10 rounded-full bg-sidebar-accent flex items-center justify-center text-sm font-medium text-sidebar-foreground mb-2">
              {user.name.split(" ").map(n => n[0]).join("")}
            </div>
            <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
            <p className="text-xs text-sidebar-foreground/60">{user.email}</p>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/student"}
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {!collapsed && "Logout"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
