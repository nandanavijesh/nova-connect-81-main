import { useState, useRef, useEffect } from "react";
import { useStudent } from "@/lib/student-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DataIsolationTest from "@/components/DataIsolationTest";

const ResumeBuilder = () => {
  const { studentData, updatePersonalInfo } = useStudent();
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    certifications: "",
    experience: "",
    education: "",
    summary: "",
  });

  // Initialize form with student data when context is available
  useEffect(() => {
    if (studentData?.personalInfo) {
      setForm({
        name: studentData.personalInfo.name,
        email: studentData.personalInfo.email,
        phone: studentData.personalInfo.phone,
        skills: studentData.skills.map(s => s.name).join(", "),
        certifications: studentData.certifications.map(c => c.name).join(", "),
        experience: studentData.experience.map(e => `${e.role} at ${e.company} (${e.duration})`).join("\n"),
        education: studentData.education.map(edu => `${edu.degree} at ${edu.institution} (${edu.year})`).join("\n"),
        summary: studentData.personalInfo.summary,
      });
    }
  }, [studentData]);

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleGenerate = () => {
    setShowPreview(true);
    toast({ title: "Resume Generated", description: "Your professional resume is ready to preview." });
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) {
      toast({ title: "Error", description: "Please generate preview first", variant: "destructive" });
      return;
    }

    try {
      toast({ title: "Generating PDF", description: "Please wait..." });
      
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${form.name.replace(/\s+/g, "_")}_Resume.pdf`);

      toast({ title: "Success", description: "Resume PDF downloaded successfully!" });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({ title: "Error", description: "Failed to generate PDF", variant: "destructive" });
    }
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Resume Builder</h1>
        <p className="text-muted-foreground text-sm mt-1">Fill in your details to generate a professional resume</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Isolation Test */}
        <div className="lg:col-span-1">
          <DataIsolationTest />
        </div>

        {/* Form */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-accent" />
              Resume Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Full Name</Label>
                <Input value={form.name} onChange={(e) => update("name", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Email</Label>
                <Input value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Phone</Label>
              <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Professional Summary</Label>
              <Textarea value={form.summary} onChange={(e) => update("summary", e.target.value)} rows={2} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Education</Label>
              <Input value={form.education} onChange={(e) => update("education", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Skills (comma-separated)</Label>
              <Input value={form.skills} onChange={(e) => update("skills", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Certifications (comma-separated)</Label>
              <Input value={form.certifications} onChange={(e) => update("certifications", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Experience</Label>
              <Textarea value={form.experience} onChange={(e) => update("experience", e.target.value)} rows={3} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleGenerate} className="gradient-accent text-accent-foreground border-0 hover:opacity-90">
                <Eye className="h-4 w-4 mr-2" />
                Generate Preview
              </Button>
              <Button variant="outline" onClick={handleDownloadPDF}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        {showPreview && (
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Resume Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div ref={previewRef} className="border rounded-lg p-6 space-y-4 bg-card text-sm">
                <div className="border-b pb-3">
                  <h2 className="text-xl font-bold text-foreground">{form.name}</h2>
                  <p className="text-xs text-muted-foreground">{form.email} • {form.phone}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">Summary</h3>
                  <p className="text-muted-foreground text-xs">{form.summary}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">Education</h3>
                  <p className="text-foreground text-xs">{form.education}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {form.skills.split(",").map((s) => (
                      <span key={s.trim()} className="px-2 py-0.5 rounded bg-secondary text-xs text-foreground">{s.trim()}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">Certifications</h3>
                  <ul className="list-disc list-inside text-xs text-foreground space-y-0.5">
                    {form.certifications.split(",").map((c) => (
                      <li key={c.trim()}>{c.trim()}</li>
                    ))}
                  </ul>
                </div>
                {form.experience && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">Experience</h3>
                    <div className="text-xs text-foreground whitespace-pre-line">{form.experience}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
