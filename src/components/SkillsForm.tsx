import { useState } from "react";
import { useStudent } from "@/lib/student-context";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Code } from "lucide-react";

export default function SkillsForm() {
  const { studentData, addSkill, updateSkill, removeSkill } = useStudent();
  const { toast } = useToast();
  
  const [newSkill, setNewSkill] = useState({
    name: "",
    level: "Beginner" as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    name: "",
    level: "Beginner" as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  });

  const skillLevels = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    { value: "Expert", label: "Expert" }
  ];

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a skill name",
        variant: "destructive"
      });
      return;
    }

    addSkill(newSkill);
    setNewSkill({ name: "", level: "Beginner" });
    toast({
      title: "Success",
      description: "Skill added successfully!"
    });
  };

  const handleEditSkill = (index: number) => {
    const skill = studentData?.skills[index];
    if (skill) {
      setEditData(skill);
      setEditingIndex(index);
    }
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      if (!editData.name.trim()) {
        toast({
          title: "Validation Error",
          description: "Please enter a skill name",
          variant: "destructive"
        });
        return;
      }

      updateSkill(editingIndex, editData);
      setEditingIndex(null);
      toast({
        title: "Success",
        description: "Skill updated successfully!"
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditData({ name: "", level: "Beginner" });
  };

  const handleRemoveSkill = (index: number) => {
    removeSkill(index);
    toast({
      title: "Success",
      description: "Skill removed successfully!"
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-red-500/20 border-red-500/30 text-red-400";
      case "Intermediate": return "bg-yellow-500/20 border-yellow-500/30 text-yellow-400";
      case "Advanced": return "bg-blue-500/20 border-blue-500/30 text-blue-400";
      case "Expert": return "bg-green-500/20 border-green-500/30 text-green-400";
      default: return "bg-white/20 border-white/30 text-white";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Beginner": return "🔴";
      case "Intermediate": return "🟡";
      case "Advanced": return "🔵";
      case "Expert": return "🟢";
      default: return "⚪";
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-white">
          <Code className="h-4 w-4 text-blue-300" />
          Skills & Expertise
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Skill */}
        <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 className="text-sm font-semibold text-white/80">Add New Skill</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-white/70">Skill Name</Label>
              <Input
                value={newSkill.name}
                onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="e.g., React, Python, Machine Learning"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-white/70">Proficiency Level</Label>
              <Select
                value={newSkill.level}
                onValueChange={(value) => setNewSkill(prev => ({ ...prev, level: value as any }))}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 text-black">
                  {skillLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {getLevelIcon(level.value)} {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={handleAddSkill}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600 gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Skill
            </Button>
          </div>
        </div>

        {/* Existing Skills */}
        {studentData?.skills.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white/80">Your Skills</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {studentData!.skills.map((skill, index) => (
                <div key={index} className="p-3 bg-white/5 rounded-lg border border-white/10">
                  {editingIndex === index ? (
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-white/70">Skill Name</Label>
                        <Input
                          value={editData.name}
                          onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white placeholder-white/50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-white/70">Proficiency Level</Label>
                        <Select
                          value={editData.level}
                          onValueChange={(value) => setEditData(prev => ({ ...prev, level: value as any }))}
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/90 text-black">
                            {skillLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {getLevelIcon(level.value)} {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleSaveEdit}
                          className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 hover:from-green-600 hover:to-blue-600 text-xs"
                        >
                          Save
                        </Button>
                        <Button 
                          onClick={handleCancelEdit}
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 text-xs"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-white">{skill.name}</h5>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleEditSkill(index)}
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10 text-xs"
                          >
                            Edit
                          </Button>
                          <Button 
                            onClick={() => handleRemoveSkill(index)}
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full border ${getLevelColor(skill.level)} text-xs`}>
                        <span>{getLevelIcon(skill.level)}</span>
                        <span className="font-medium">{skill.level}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}