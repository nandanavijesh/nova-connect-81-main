import { useState, useCallback } from "react";
import { useStudent } from "@/lib/student-context";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GraduationCap } from "lucide-react";

export default function EducationForm() {
  const { studentData, addEducation, updateEducation, removeEducation } = useStudent();
  const { toast } = useToast();
  
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    year: "",
    cgpa: ""
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    degree: "",
    institution: "",
    year: "",
    cgpa: ""
  });

  // Memoize handlers to prevent re-renders
  const handleNewEducationChange = useCallback((field: keyof typeof newEducation, value: string) => {
    setNewEducation(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleEditDataChange = useCallback((field: keyof typeof editData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleAddEducation = () => {
    if (!newEducation.degree || !newEducation.institution || !newEducation.year || !newEducation.cgpa) {
      toast({
        title: "Validation Error",
        description: "Please fill in all education fields",
        variant: "destructive"
      });
      return;
    }

    addEducation(newEducation);
    setNewEducation({ degree: "", institution: "", year: "", cgpa: "" });
    toast({
      title: "Success",
      description: "Education added successfully!"
    });
  };

  const handleEditEducation = (index: number) => {
    const education = studentData?.education[index];
    if (education) {
      setEditData(education);
      setEditingIndex(index);
    }
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      if (!editData.degree || !editData.institution || !editData.year || !editData.cgpa) {
        toast({
          title: "Validation Error",
          description: "Please fill in all education fields",
          variant: "destructive"
        });
        return;
      }

      updateEducation(editingIndex, editData);
      setEditingIndex(null);
      toast({
        title: "Success",
        description: "Education updated successfully!"
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditData({ degree: "", institution: "", year: "", cgpa: "" });
  };

  const handleRemoveEducation = (index: number) => {
    removeEducation(index);
    toast({
      title: "Success",
      description: "Education removed successfully!"
    });
  };

  return (
    <Card className="shadow-lg border-0 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-white">
          <GraduationCap className="h-4 w-4 text-blue-300" />
          Education
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Education */}
        <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 className="text-sm font-semibold text-white/80">Add New Education</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-white/70">Degree/Program</Label>
              <Input
                value={newEducation.degree}
                onChange={(e) => handleNewEducationChange('degree', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="B.Tech Computer Science"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-white/70">Institution</Label>
              <Input
                value={newEducation.institution}
                onChange={(e) => handleNewEducationChange('institution', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="University Name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-white/70">Year of Completion</Label>
              <Input
                value={newEducation.year}
                onChange={(e) => handleNewEducationChange('year', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="2024"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-white/70">CGPA/Percentage</Label>
              <Input
                value={newEducation.cgpa}
                onChange={(e) => handleNewEducationChange('cgpa', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="8.5"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={handleAddEducation}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600 gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Education
            </Button>
          </div>
        </div>

        {/* Existing Education */}
        {studentData?.education.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white/80">Your Education</h4>
            {studentData!.education.map((edu, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                {editingIndex === index ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-white/70">Degree/Program</Label>
                        <Input
                          value={editData.degree}
                          onChange={(e) => handleEditDataChange('degree', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-white/50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-white/70">Institution</Label>
                        <Input
                          value={editData.institution}
                          onChange={(e) => handleEditDataChange('institution', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-white/50"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-white/70">Year of Completion</Label>
                        <Input
                          value={editData.year}
                          onChange={(e) => handleEditDataChange('year', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-white/50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-white/70">CGPA/Percentage</Label>
                        <Input
                          value={editData.cgpa}
                          onChange={(e) => handleEditDataChange('cgpa', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-white/50"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSaveEdit}
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 hover:from-green-600 hover:to-blue-600"
                      >
                        Save
                      </Button>
                      <Button 
                        onClick={handleCancelEdit}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-white">{edu.degree}</h5>
                      <p className="text-sm text-white/70">{edu.institution}</p>
                      <p className="text-xs text-white/50">Completed: {edu.year} • CGPA: {edu.cgpa}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleEditEducation(index)}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 text-xs"
                      >
                        Edit
                      </Button>
                      <Button 
                        onClick={() => handleRemoveEducation(index)}
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}