import { useState } from "react";
import { STUDENTS } from "@/lib/mock-data";
import { addUserNotification } from "@/lib/user-notifications";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const StudentRepository = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shortlisted, setShortlisted] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("nova_connect_shortlisted_students") || "[]");
    } catch {
      return [];
    }
  });

  const handleViewProfile = (studentId: string) => {
    navigate(`/hr/student/${studentId}`);
  };

  const handleShortlist = (studentId: string) => {
    if (shortlisted.includes(studentId)) {
      toast({ title: "Already shortlisted", description: "This student is already shortlisted.", variant: "default" });
      return;
    }

    const student = STUDENTS.find((s) => s.id === studentId);
    if (!student) return;

    const newShortlist = [...shortlisted, studentId];
    setShortlisted(newShortlist);
    localStorage.setItem("nova_connect_shortlisted_students", JSON.stringify(newShortlist));
    window.dispatchEvent(new Event("shortlist-updated"));

    addUserNotification(student.email, {
      type: "hr",
      title: "Congratulations! You\'ve been shortlisted",
      description: `Your profile has been shortlisted by HR from ${student.department} department. Please check your notifications for interview next steps.`,
      time: new Date().toLocaleString(),
    });

    toast({ title: "Shortlisted", description: `${student.name} has been shortlisted and notified.`, variant: "default" });
  };

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Student Repository</h1>
        <p className="text-muted-foreground text-sm mt-1">{STUDENTS.length} students registered on the platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {STUDENTS.map((s) => (
          <Card key={s.id} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="pt-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-sm font-medium text-primary-foreground flex-shrink-0">
                  {s.avatar}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.department} • Year {s.year}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-muted-foreground">CGPA: <span className="font-medium text-foreground">{s.cgpa}</span></span>
                <a href={s.portfolio} className="text-accent flex items-center gap-0.5 hover:underline">
                  Portfolio <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {s.skills.slice(0, 4).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                ))}
                {s.skills.length > 4 && (
                  <Badge variant="outline" className="text-xs">+{s.skills.length - 4}</Badge>
                )}
              </div>
              <div className="flex justify-between items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleViewProfile(s.id)}
                  className="text-xs"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View Profile
                </Button>
                <Button 
                  variant={shortlisted.includes(s.id) ? "secondary" : "default"}
                  size="sm"
                  onClick={() => handleShortlist(s.id)}
                  className="text-xs flex items-center gap-1"
                >
                  <Star className="h-3 w-3" />
                  {shortlisted.includes(s.id) ? "Shortlisted" : "Shortlist"}
                </Button>
                <span className="text-xs text-muted-foreground">ID: {s.id}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentRepository;
