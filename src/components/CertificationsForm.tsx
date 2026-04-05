import { useState } from "react";
import { useStudent } from "@/lib/student-context";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Award } from "lucide-react";

export default function CertificationsForm() {
  const { studentData, addCertification, updateCertification, removeCertification } = useStudent();
  const { toast } = useToast();
  
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    year: ""
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    name: "",
    issuer: "",
    year: ""
  });

  const handleAddCertification = () => {
    if (!newCertification.name || !newCertification.issuer || !newCertification.year) {
      toast({
        title: "Validation Error",
        description: "Please fill in all certification fields",
        variant: "destructive"
      });
      return;
    }

    addCertification(newCertification);
    setNewCertification({ name: "", issuer: "", year: "" });
    toast({
      title: "Success",
      description: "Certification added successfully!"
    });
  };

  const handleEditCertification = (index: number) => {
    const certification = studentData?.certifications[index];
    if (certification) {
      setEditData(certification);
      setEditingIndex(index);
    }
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      if (!editData.name || !editData.issuer || !editData.year) {
        toast({
          title: "Validation Error",
          description: "Please fill in all certification fields",
          variant: "destructive"
        });
        return;
      }

      updateCertification(editingIndex, editData);
      setEditingIndex(null);
      toast({
        title: "Success",
        description: "Certification updated successfully!"
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditData({ name: "", issuer: "", year: "" });
  };

  const handleRemoveCertification = (index: number) => {
    removeCertification(index);
    toast({
      title: "Success",
      description: "Certification removed successfully!"
    });
  };

  return (
    <Card className="shadow-lg border-0 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-white">
          <Award className="h-4 w-4 text-blue-300" />
          Certifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Certification */}
        <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 className="text-sm font-semibold text-white/80">Add New Certification</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-white/70">Certification Name</Label>
              <Input
                value={newCertification.name}
                onChange={(e) => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="AWS Cloud Practitioner"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-white/70">Issuing Organization</Label>
              <Input
                value={newCertification.issuer}
                onChange={(e) => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="Amazon Web Services"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-white/70">Year Obtained</Label>
              <Input
                value={newCertification.year}
                onChange={(e) => setNewCertification(prev => ({ ...prev, year: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="2024"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={handleAddCertification}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600 gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Certification
            </Button>
          </div>
        </div>

        {/* Existing Certifications */}
        {studentData?.certifications.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white/80">Your Certifications</h4>
            {studentData!.certifications.map((cert, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                {editingIndex === index ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-white/70">Certification Name</Label>
                        <Input
                          value={editData.name}
                          onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white placeholder-white/50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-white/70">Issuing Organization</Label>
                        <Input
                          value={editData.issuer}
                          onChange={(e) => setEditData(prev => ({ ...prev, issuer: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white placeholder-white/50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-white/70">Year Obtained</Label>
                        <Input
                          value={editData.year}
                          onChange={(e) => setEditData(prev => ({ ...prev, year: e.target.value }))}
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
                      <h5 className="font-semibold text-white">{cert.name}</h5>
                      <p className="text-sm text-white/70">{cert.issuer}</p>
                      <p className="text-xs text-white/50">Issued: {cert.year}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleEditCertification(index)}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 text-xs"
                      >
                        Edit
                      </Button>
                      <Button 
                        onClick={() => handleRemoveCertification(index)}
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