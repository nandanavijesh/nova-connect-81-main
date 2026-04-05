import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bell, Briefcase, CheckCircle, Info } from "lucide-react";
import { getUserNotifications, markNotificationRead } from "@/lib/user-notifications";

interface Notification {
  id: string;
  type: "placement" | "info" | "success" | "hr";
  title: string;
  description: string;
  time: string;
  read: boolean;
  details?: string;
}

const iconMap = {
  placement: Briefcase,
  info: Info,
  success: CheckCircle,
  hr: Bell,
};

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    setNotifications(getUserNotifications(user.email));
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-3xl">
        <p className="text-foreground">Please log in to see your notifications.</p>
      </div>
    );
  }

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setOpenDialog(true);
    setNotifications(markNotificationRead(user.email, notification.id));
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground text-sm mt-1">Stay updated on placement activities</p>
        </div>
        <Badge variant="secondary">{notifications.filter((n) => !n.read).length} new</Badge>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Bell className="h-4 w-4 text-accent" />
            Recent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">No notifications yet.</p>
          ) : (
            notifications.map((n) => {
              const Icon = iconMap[n.type as keyof typeof iconMap] || Info;
              return (
                <button
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer hover:bg-accent/10 ${
                    n.read ? "opacity-60" : "bg-accent/5 hover:bg-accent/15"
                  }`}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    n.type === "success" ? "bg-success/10" : n.type === "placement" ? "bg-accent/10" : "bg-secondary"
                  }`}>
                    <Icon className={`h-4 w-4 ${
                      n.type === "success" ? "text-success" : n.type === "placement" ? "text-accent" : "text-muted-foreground"
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{n.title}</p>
                      {!n.read && <div className="h-1.5 w-1.5 rounded-full bg-accent" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.description}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">{n.time}</p>
                  </div>
                </button>
              );
            })
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedNotification?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{selectedNotification?.description}</p>
            {selectedNotification?.details && <p className="text-sm text-foreground">{selectedNotification.details}</p>}
            <p className="text-xs text-muted-foreground">{selectedNotification?.time}</p>
            <Button onClick={() => setOpenDialog(false)} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notifications;
