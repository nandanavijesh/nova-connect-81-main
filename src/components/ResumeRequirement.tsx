import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, FilePlus, Eye, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ResumeUpload from "./ResumeUpload";

interface ResumeRequirementProps {
  onUploadSuccess: () => void;
}

const ResumeRequirement = ({ onUploadSuccess }: ResumeRequirementProps) => {
  const [showUpload, setShowUpload] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const { toast } = useToast();

  const handleUploadSuccess = () => {
    toast({
      title: "Resume Uploaded",
      description: "You can now access the student dashboard.",
    });
    onUploadSuccess();
  };

  const handleBuilderSuccess = () => {
    toast({
      title: "Resume Created",
      description: "Your resume has been generated. You can now upload it to access the student dashboard.",
    });
    setShowBuilder(false);
    setShowUpload(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Alpha Nova</h1>
          </div>
          <p className="text-white/70 text-sm">Resume Requirement</p>
        </div>

        {/* Main Card */}
        <Card className="shadow-lg border-0 bg-white/10 backdrop-blur-md hover:shadow-xl transition-all duration-300 hover:bg-white/15">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-white">Resume Required</CardTitle>
            <CardDescription className="text-white/70">
              To access the student dashboard, you need to upload your resume. You can either upload an existing resume or create a new one using our resume builder.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showUpload && !showBuilder ? (
              <div className="space-y-4">
                <div className="space-y-3">
                  <Button 
                    onClick={() => setShowUpload(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Upload Existing Resume
                  </Button>
                  
                  <Button 
                    onClick={() => setShowBuilder(true)}
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    <FilePlus className="h-4 w-4 mr-2" />
                    Create Resume with Builder
                  </Button>
                </div>
              </div>
            ) : showUpload ? (
              <ResumeUpload onSuccess={handleUploadSuccess} />
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-white font-semibold">Resume Builder</h3>
                  <p className="text-white/70 text-sm">Fill in your details to generate a professional resume</p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => {
                      // Simulate resume creation
                      toast({
                        title: "Resume Created",
                        description: "Your resume has been generated successfully!",
                      });
                      handleBuilderSuccess();
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 hover:from-green-600 hover:to-blue-600"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Generate Resume Preview
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume PDF
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-white/20">
                  <Button 
                    onClick={() => setShowBuilder(false)}
                    variant="ghost"
                    className="w-full text-white/70 hover:text-white"
                  >
                    Back to Options
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeRequirement;