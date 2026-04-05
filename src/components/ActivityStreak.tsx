import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Calendar } from "lucide-react";
import { useMemo } from "react";

const generateMockActivity = () => {
  const today = new Date();
  const days: { date: Date; count: number }[] = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    // Simulate activity: higher chance of activity on recent days
    const rand = Math.random();
    const count = i < 3 ? Math.floor(Math.random() * 4) + 1 : rand > 0.3 ? Math.floor(Math.random() * 5) : 0;
    days.push({ date: d, count });
  }
  return days;
};

const getIntensityClass = (count: number) => {
  if (count === 0) return "bg-muted";
  if (count === 1) return "bg-accent/30";
  if (count === 2) return "bg-accent/50";
  if (count === 3) return "bg-accent/75";
  return "bg-accent";
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function ActivityStreak() {
  const activity = useMemo(() => generateMockActivity(), []);

  const currentStreak = useMemo(() => {
    let streak = 0;
    for (let i = activity.length - 1; i >= 0; i--) {
      if (activity[i].count > 0) streak++;
      else break;
    }
    return streak;
  }, [activity]);

  const totalActiveDays = activity.filter((d) => d.count > 0).length;

  // Group into weeks (4 columns of 7 rows)
  const weeks: { date: Date; count: number }[][] = [];
  for (let i = 0; i < activity.length; i += 7) {
    weeks.push(activity.slice(i, i + 7));
  }

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Flame className="h-4 w-4 text-accent" />
          Activity Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Streak Stats */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Flame className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{currentStreak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{totalActiveDays}</p>
              <p className="text-xs text-muted-foreground">Active Days</p>
            </div>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Last 28 days</p>
          <div className="flex gap-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className={`h-4 w-4 rounded-sm ${getIntensityClass(day.count)} transition-colors`}
                    title={`${day.date.toLocaleDateString()} — ${day.count} activities`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="h-3 w-3 rounded-sm bg-muted" />
            <div className="h-3 w-3 rounded-sm bg-accent/30" />
            <div className="h-3 w-3 rounded-sm bg-accent/50" />
            <div className="h-3 w-3 rounded-sm bg-accent/75" />
            <div className="h-3 w-3 rounded-sm bg-accent" />
            <span>More</span>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Recent Activity</p>
          <div className="space-y-1.5">
            {[
              { action: "Updated resume", time: "Today" },
              { action: "Completed React certification", time: "Yesterday" },
              { action: "Applied to TCS drive", time: "2 days ago" },
              { action: "Added new project to portfolio", time: "3 days ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 px-2 rounded bg-secondary text-sm">
                <span className="text-foreground">{item.action}</span>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
