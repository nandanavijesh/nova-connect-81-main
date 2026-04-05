import { useParams, useNavigate } from "react-router-dom";
import { STUDENTS } from "@/lib/mock-data";
import { addUserNotification } from "@/lib/user-notifications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Briefcase, ExternalLink, GraduationCap, Star, FileText, User, Code, Mail, Phone, MapPin, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const HRStudentProfileView = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const student = STUDENTS.find((s) => s.id === studentId);

  if (!student) {
    return (
      <div className="max-w-4xl mx-auto py-10 text-center">
        <p className="text-foreground">Student not found.</p>
        <Button onClick={() => navigate('/hr')} className="mt-4">Back to Repository</Button>
      </div>
    );
  }

  const handleShortlist = () => {
    addUserNotification(student.email, {
      type: 'hr',
      title: 'You have been shortlisted!',
      description: `${student.name} has been shortlisted by HR from ${student.department} department. Please check your notifications for next steps.`,
      time: new Date().toLocaleString(),
    });
    toast({ title: 'Shortlisted', description: `${student.name} has been notified.`, variant: 'default' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{student.name}</h1>
          <p className="text-muted-foreground">{student.department} • Year {student.year} • CGPA {student.cgpa}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/hr')}>
            ← Back
          </Button>
          <Button onClick={handleShortlist}>
            <Star className="h-4 w-4 mr-1" /> Shortlist
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" /> Personal Info
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Email:</span>
              <span className="font-medium">{student.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Skills:</span>
              <span className="font-medium">{student.skills.join(', ')}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Portfolio:</span>
              <a href={student.portfolio} className="font-medium text-primary hover:underline" target="_blank" rel="noreferrer">
                {student.portfolio}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Certifications:</span>
              <span className="font-medium">{student.certifications.join(', ') || 'None'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" /> Education & Internships
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">CGPA: <span className="font-medium">{student.cgpa}</span></p>
            {student.internships.length > 0 && (
              <p className="text-sm text-muted-foreground">Internships: <span className="font-medium">{student.internships.map((i) => `${i.role} at ${i.company}`).join(', ')}</span></p>
            )}
          </div>
          <a href={student.portfolio} className="inline-flex items-center gap-1 text-sm text-accent hover:underline">
            <ExternalLink className="h-4 w-4" /> View portfolio details
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default HRStudentProfileView;
