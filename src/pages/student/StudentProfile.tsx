import { STUDENTS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Briefcase, ExternalLink, GraduationCap, Star, AlertCircle, FileText, User, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ActivityStreak } from "@/components/ActivityStreak";
import { useStudent } from "@/lib/student-context";
import { useToast } from "@/hooks/use-toast";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import EducationForm from "@/components/EducationForm";
import ExperienceForm from "@/components/ExperienceForm";
import SkillsForm from "@/components/SkillsForm";
import CertificationsForm from "@/components/CertificationsForm";
import ResumeUpload from "@/components/ResumeUpload";

const StudentProfile = () => {
  const { studentData } = useStudent();
  const { toast } = useToast();

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Complete Your Profile</h1>
        <p className="text-white/70 text-sm mt-1">Fill in all sections to create a complete profile for employers</p>
      </div>

      {/* Resume Requirement Alert */}
      {!studentData?.hasResume && (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
            <div>
              <h4 className="font-semibold text-white">Resume Required</h4>
              <p className="text-xs text-white/70">You must upload or create a resume before you can save your personal information.</p>
            </div>
          </div>
        </div>
      )}

      {/* Resume Upload Section */}
      <ResumeUpload />

      {/* Profile Sections */}
      {studentData?.hasResume && (
        <div className="space-y-6">
          {/* Personal Information */}
          <PersonalInfoForm />

          {/* Education */}
          <EducationForm />

          {/* Work Experience */}
          <ExperienceForm />

          {/* Skills */}
          <SkillsForm />

          {/* Certifications */}
          <CertificationsForm />
        </div>
      )}

      {/* Progress Summary */}
      {studentData?.hasResume && (
        <Card className="shadow-lg border-0 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-white">
              <GraduationCap className="h-4 w-4 text-blue-300" />
              Profile Completion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
              <div className="space-y-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center mx-auto">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Resume</p>
                  <p className="text-xs text-white/60">Uploaded</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center mx-auto ${
                  studentData!.personalInfo.name ? 'bg-gradient-to-br from-green-400 to-blue-400' : 'bg-white/20'
                }`}>
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Personal Info</p>
                  <p className="text-xs text-white/60">{studentData!.personalInfo.name ? 'Complete' : 'Incomplete'}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center mx-auto ${
                  studentData!.education.length > 0 ? 'bg-gradient-to-br from-green-400 to-blue-400' : 'bg-white/20'
                }`}>
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Education</p>
                  <p className="text-xs text-white/60">{studentData!.education.length > 0 ? 'Complete' : 'Incomplete'}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center mx-auto ${
                  studentData!.experience.length > 0 ? 'bg-gradient-to-br from-green-400 to-blue-400' : 'bg-white/20'
                }`}>
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Experience</p>
                  <p className="text-xs text-white/60">{studentData!.experience.length > 0 ? 'Complete' : 'Incomplete'}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center mx-auto ${
                  studentData!.skills.length > 0 ? 'bg-gradient-to-br from-green-400 to-blue-400' : 'bg-white/20'
                }`}>
                  <Code className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Skills</p>
                  <p className="text-xs text-white/60">{studentData!.skills.length > 0 ? 'Complete' : 'Incomplete'}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={() => toast({
                  title: "Profile Complete!",
                  description: "Your profile is ready for employers to view."
                })}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 hover:from-green-600 hover:to-blue-600"
                disabled={!studentData!.personalInfo.name || studentData!.education.length === 0 || studentData!.skills.length === 0}
              >
                Complete Profile Setup
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentProfile;
