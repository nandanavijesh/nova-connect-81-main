import { useStudent } from "@/lib/student-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Briefcase, ExternalLink, GraduationCap, Star, FileText, User, Code, Mail, Phone, MapPin, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

const StudentProfileView = () => {
  const { studentId } = useParams();
  const { studentData } = useStudent();
  const navigate = useNavigate();

  // For now, we'll use mock data since we don't have a way to load specific student data
  // In a real implementation, this would fetch the student data by ID
  const currentStudent = studentData || {
    personalInfo: {
      name: "John Doe",
      email: "john.doe@university.edu",
      phone: "+1 (555) 123-4567",
      address: "123 University Ave, College Town, ST 12345",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
      portfolio: "johndoe.dev",
      summary: "Computer Science student with a passion for full-stack development and machine learning. Seeking internship opportunities to apply my skills in real-world projects."
    },
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "State University",
        year: "2022 - 2026",
        cgpa: "3.8/4.0"
      }
    ],
    experience: [
      {
        role: "Software Development Intern",
        company: "TechCorp Inc.",
        duration: "May 2024 - August 2024",
        description: "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to implement new features and improve user experience."
      }
    ],
    skills: [
      { name: "JavaScript", level: "Expert" },
      { name: "React", level: "Advanced" },
      { name: "Node.js", level: "Advanced" },
      { name: "Python", level: "Intermediate" },
      { name: "SQL", level: "Intermediate" }
    ],
    certifications: [
      { name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2024" },
      { name: "React Developer Certificate", issuer: "Meta", year: "2023" }
    ],
    hasResume: true
  };

  const handleBackToRepository = () => {
    navigate('/hr');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{currentStudent.personalInfo.name}</h1>
          <p className="text-muted-foreground">{currentStudent.personalInfo.summary}</p>
        </div>
        <Button onClick={handleBackToRepository} variant="outline">
          ← Back to Repository
        </Button>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Email:</span>
              <span className="font-medium">{currentStudent.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Phone:</span>
              <span className="font-medium">{currentStudent.personalInfo.phone}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Location:</span>
              <span className="font-medium">{currentStudent.personalInfo.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Portfolio:</span>
              <a href={currentStudent.personalInfo.portfolio} className="font-medium text-primary hover:underline">
                {currentStudent.personalInfo.portfolio}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStudent.education.map((edu, index) => (
            <div key={index} className="border-l-2 border-primary pl-4 mb-4">
              <h4 className="font-semibold">{edu.degree}</h4>
              <p className="text-sm text-muted-foreground">{edu.institution}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="text-muted-foreground">{edu.year}</span>
                <span className="font-medium">CGPA: {edu.cgpa}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Work Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStudent.experience.map((exp, index) => (
            <div key={index} className="border-l-2 border-primary pl-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{exp.role}</h4>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                </div>
                <span className="text-sm text-muted-foreground">{exp.duration}</span>
              </div>
              <p className="text-sm mt-2 text-muted-foreground">{exp.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentStudent.skills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{skill.name}</span>
                <Badge variant="secondary">{skill.level}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Certifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentStudent.certifications.map((cert, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </div>
                <span className="text-sm text-muted-foreground">{cert.year}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resume */}
      {currentStudent.hasResume && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Resume has been uploaded and is available for employers to view.</p>
            <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
              View Resume
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentProfileView;