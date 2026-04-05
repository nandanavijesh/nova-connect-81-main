import { useStudent } from "@/lib/student-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Github, ExternalLink, Code, Award, Briefcase, Edit } from "lucide-react";

const Portfolio = () => {
  const { studentData } = useStudent();
  
  // Map student context data to portfolio format
  const portfolioData = {
    name: studentData?.personalInfo.name || "Student Name",
    department: "Computer Science", // This could be added to personalInfo if needed
    year: 4, // This could be added to personalInfo if needed
    skills: studentData?.skills.map(s => s.name) || [],
    certifications: studentData?.certifications.map(c => c.name) || [],
    internships: studentData?.experience.map(e => ({
      company: e.company,
      role: e.role,
      duration: e.duration
    })) || [],
    avatar: studentData?.personalInfo.name ? studentData.personalInfo.name.split(' ').map(n => n[0]).join('').toUpperCase() : "S",
    github: studentData?.personalInfo.github || "",
    portfolio: studentData?.personalInfo.portfolio || ""
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 p-6">
      <div className="max-w-4xl mx-auto space-y-8 pb-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-white/20 text-white backdrop-blur-sm">
              <Globe className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-bold text-white">Portfolio</h1>
          </div>
          <p className="text-white/70 ml-15">Showcasing projects and achievements</p>
        </div>

        {/* Profile Hero */}
        <Card className="shadow-lg border-0 overflow-hidden bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all">
          <CardContent className="pt-8 pb-8">
            <div className="flex justify-between items-start mb-4">
              <div className="text-center space-y-4 flex-1">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center mx-auto">
                  <span className="text-3xl font-bold text-white">{portfolioData.avatar}</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{portfolioData.name}</h2>
                  <p className="text-lg text-blue-300 mt-2">{portfolioData.department} • {portfolioData.year}th Year</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 gap-2 hover:from-blue-600 hover:to-purple-600">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2">
                <Globe className="h-4 w-4" />
                Website
              </Button>
            </div>
          </CardContent>
        </Card>


        {/* Internships */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-300" />
            <h3 className="text-2xl font-bold text-white">Experience</h3>
          </div>
          {portfolioData.internships.map((intern, i) => (
            <Card key={i} className="shadow-lg border-0 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-white">{intern.role}</h4>
                    <p className="text-blue-300 font-semibold mt-1">{intern.company}</p>
                    <p className="text-white/60 text-sm mt-2">{intern.duration}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-300" />
                <h3 className="text-2xl font-bold text-white">Skills</h3>
              </div>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2">
                <Edit className="h-4 w-4" />
                Edit Skills
              </Button>
            </div>
            <Card className="shadow-lg border-0 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all">
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {portfolioData.skills.map((skill) => (
                    <Badge key={skill} className="text-sm bg-gradient-to-r from-blue-500/50 to-purple-500/50 text-white hover:from-blue-600/70 hover:to-purple-600/70 border border-white/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-300" />
                <h3 className="text-2xl font-bold text-white">Certifications</h3>
              </div>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2">
                <Edit className="h-4 w-4" />
                Edit Certs
              </Button>
            </div>
            <Card className="shadow-lg border-0 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {portfolioData.certifications.map((cert, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                      <Award className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                      <span className="text-white font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="shadow-lg border-0 bg-white/10 backdrop-blur-md">
            <CardContent className="pt-6 pb-6 text-center">
              <p className="text-3xl font-bold text-white">{portfolioData.skills.length}</p>
              <p className="text-white/60 text-sm mt-1">Skills</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white/10 backdrop-blur-md">
            <CardContent className="pt-6 pb-6 text-center">
              <p className="text-3xl font-bold text-white">{portfolioData.internships.length}</p>
              <p className="text-white/60 text-sm mt-1">Internships</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white/10 backdrop-blur-md">
            <CardContent className="pt-6 pb-6 text-center">
              <p className="text-3xl font-bold text-white">{portfolioData.certifications.length}</p>
              <p className="text-white/60 text-sm mt-1">Certs</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
