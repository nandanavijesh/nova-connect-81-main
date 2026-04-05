import { STUDENTS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Briefcase, CheckCircle } from "lucide-react";

const Awards = () => {
  const student = STUDENTS[0];

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Awards & Certifications</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your certifications and internship experiences</p>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-4 w-4 text-accent" />
            Certifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {student.certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{cert}</p>
                  <p className="text-xs text-muted-foreground">Verified</p>
                </div>
                <Badge variant="secondary" className="text-xs">Completed</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-accent" />
            Internship Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          {student.internships.length > 0 ? (
            <div className="space-y-3">
              {student.internships.map((intern, i) => (
                <div key={i} className="p-4 rounded-lg border bg-card">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm text-foreground">{intern.role}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{intern.company}</p>
                    </div>
                    <Badge className="gradient-accent text-accent-foreground border-0 text-xs">{intern.duration}</Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No internships tracked yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Awards;
