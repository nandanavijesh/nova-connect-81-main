import { useState, useRef } from "react";
import { useStudent } from "@/lib/student-context";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, Download, FileCheck, AlertCircle } from "lucide-react";

export default function ResumeUpload() {
  const { studentData, uploadResume, setHasResume } = useStudent();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf') && !file.type.includes('doc') && !file.type.includes('docx')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF, DOC, or DOCX file",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      await uploadResume(file);
      setHasResume(true);
      toast({
        title: "Success",
        description: "Resume uploaded successfully!"
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCreateResume = () => {
    navigate('/student/resume');
  };

  const handleDownloadResume = () => {
    if (studentData?.resumeUrl) {
      const link = document.createElement('a');
      link.href = studentData.resumeUrl;
      link.download = 'resume.pdf';
      link.click();
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-white">
          <FileText className="h-4 w-4 text-blue-300" />
          Resume Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Resume Status */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {studentData?.hasResume ? (
                <FileCheck className="h-6 w-6 text-green-400" />
              ) : (
                <AlertCircle className="h-6 w-6 text-yellow-400" />
              )}
              <div>
                <h4 className="font-semibold text-white">
                  {studentData?.hasResume ? "Resume Uploaded" : "No Resume Uploaded"}
                </h4>
                <p className="text-xs text-white/70">
                  {studentData?.hasResume 
                    ? "Your resume is ready for employers to view" 
                    : "Upload your resume or create one using our builder"}
                </p>
              </div>
            </div>
            {studentData?.hasResume && (
              <Button 
                onClick={handleDownloadResume}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            )}
          </div>
        </div>

        {/* Upload Section */}
        {!studentData?.hasResume && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-white/70">Upload Resume</Label>
                <div className="border-2 border-dashed border-white/30 rounded-lg p-4 text-center hover:border-white/50 transition-colors">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label 
                    htmlFor="resume-upload"
                    className="cursor-pointer flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    <Upload className="h-8 w-8" />
                    <span className="text-sm">Click to upload or drag and drop</span>
                    <span className="text-xs text-white/50">PDF, DOC, DOCX (max 5MB)</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-white/70">Create Resume</Label>
                <div className="border border-white/20 rounded-lg p-4 bg-white/5 hover:bg-white/10 transition-colors h-full">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-300" />
                    <div>
                      <h5 className="font-semibold text-white">Resume Builder</h5>
                      <p className="text-xs text-white/70">Create a professional resume using your profile information</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button 
                      onClick={handleCreateResume}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600"
                    >
                      Create Resume
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-white/60">
              <p><strong>Note:</strong> A resume is required to save your personal information. You can either upload an existing resume or create a new one using our resume builder.</p>
            </div>
          </div>
        )}

        {/* Requirements */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <h5 className="text-sm font-semibold text-blue-300 mb-2">Resume Requirements</h5>
          <ul className="text-xs text-white/70 space-y-1">
            <li>• File format: PDF, DOC, or DOCX</li>
            <li>• Maximum file size: 5MB</li>
            <li>• Must be professional and up-to-date</li>
            <li>• Required for saving personal information</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}