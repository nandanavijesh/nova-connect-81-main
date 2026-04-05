import { useState } from "react";
import { useStudent } from "@/lib/student-context";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Briefcase } from "lucide-react";

export default function ExperienceForm() {
  const { studentData, addExperience, updateExperience, removeExperience } = useStudent();
  const { toast } = useToast();
  
  const [newExperience, setNewExperience] = useState({
    role: "",
    company: "",
    duration: "",
    description: ""
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    role: "",
    company: "",
    duration: "",
    description: ""
  });

  const handleAddExperience = () => {
    if (!newExperience.role || !newExperience.company || !newExperience.duration || !newExperience.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all experience fields",
        variant: "destructive"
      });
      return;
    }

    addExperience(newExperience);
    setNewExperience({ role: "", company: "", duration: "", description: "" });
    toast({
      title: "Success",
      description: "Experience added successfully!"
    });
  };

  const handleEditExperience = (index: number) => {
    const experience = studentData?.experience[index];
    if (experience) {
      setEditData(experience);
      setEditingIndex(index);
    }
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      if (!editData.role || !editData.company || !editData.duration || !editData.description) {
        toast({
          title: "Validation Error",
          description: "Please fill in all experience fields",
          variant: "destructive"
        });
        return;
      }

      updateExperience(editingIndex, editData);
      setEditingIndex(null);
      toast({
        title: "Success",
        description: "Experience updated successfully!"
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditData({ role: "", company: "", duration: "", description: "" });
  };

  const handleRemoveExperience = (index: number) => {
    removeExperience(index);
    toast({
      title: "Success",
      description: "Experience removed successfully!"
    });
  };

  return (
    <Card className="shadow-lg border-0 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-white">
          <Briefcase className="h-4 w-4 text-blue-300" />
          Work Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Experience */}
        <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 className="text-sm font-semibold text-white/80">Add New Experience</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-white/70">Job Title/Role</Label>
              <Input
                value={newExperience.role}
                onChange={(e) => setNewExperience(prev => ({ ...prev, role: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="Frontend Developer Intern"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-white/70">Company Name</Label>
              <Input
                value={newExperience.company}
                onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="TechCorp India"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-white/70">Duration</Label>
            <Input
              value={newExperience.duration}
              onChange={(e) => setNewExperience(prev => ({ ...prev, duration: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
              placeholder="Jun 2025 - Aug 2025"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-white/70">Description</Label>
            <Textarea
              value={newExperience.description}
              onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder-white/50 min-h-[100px]"
              placeholder="Describe your responsibilities, achievements, and key projects..."
            />
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={handleAddExperience}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600 gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </div>
        </div>

        {/* Existing Experience */}
        {studentData?.experience.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white/80">Your Experience</h4>
            {studentData!.experience.map((exp, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                {editingIndex === index ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-white/70">Job Title/Role</Label>
                        <Input
                          value={editData.role}
                          onChange={(e) => setEditData(prev => ({ ...prev, role: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white placeholder-white/50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-white/70">Company Name</Label>
                        <Input
                          value={editData.company}
                          onChange={(e) => setEditData(prev => ({ ...prev, company: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white placeholder-white/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/70">Duration</Label>
                      <Input
                        value={editData.duration}
                        onChange={(e) => setEditData(prev => ({ ...prev, duration: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white placeholder-white/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/70">Description</Label>
                      <Textarea
                        value={editData.description}
                        onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 min-h-[100px]"
                      />
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-white">{exp.role}</h5>
                        <p className="text-sm text-white/70">{exp.company}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleEditExperience(index)}
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 text-xs"
                        >
                          Edit
                        </Button>
                        <Button 
                          onClick={() => handleRemoveExperience(index)}
                          variant="outline"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-white/50">{exp.duration}</p>
                    <p className="text-sm text-white/80">{exp.description}</p>
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