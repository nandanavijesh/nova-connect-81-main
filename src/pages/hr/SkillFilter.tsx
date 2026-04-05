import { useState } from "react";
import { STUDENTS, SKILL_OPTIONS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Star, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SkillFilter = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [shortlisted, setShortlisted] = useState<string[]>([]);
  const { toast } = useToast();

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const filteredStudents = selectedSkills.length === 0
    ? STUDENTS
    : STUDENTS.filter((s) => selectedSkills.every((skill) => s.skills.includes(skill)));

  const toggleShortlist = (id: string) => {
    setShortlisted((prev) => {
      const next = prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id];
      toast({
        title: next.includes(id) ? "Student Shortlisted" : "Removed from Shortlist",
        description: STUDENTS.find((s) => s.id === id)?.name,
      });
      return next;
    });
  };

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Skill Filter</h1>
        <p className="text-muted-foreground text-sm mt-1">Filter candidates by required technical skills</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Panel */}
        <Card className="shadow-card lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Filter className="h-4 w-4 text-accent" />
              Select Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-96 overflow-y-auto">
            {SKILL_OPTIONS.map((skill) => (
              <label key={skill} className="flex items-center gap-2 cursor-pointer text-sm">
                <Checkbox
                  checked={selectedSkills.includes(skill)}
                  onCheckedChange={() => toggleSkill(skill)}
                />
                <span className="text-foreground">{skill}</span>
              </label>
            ))}
            {selectedSkills.length > 0 && (
              <Button variant="ghost" size="sm" className="w-full mt-2 text-xs" onClick={() => setSelectedSkills([])}>
                Clear All
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredStudents.length}</span> students
            </p>
            {selectedSkills.length > 0 && (
              <div className="flex gap-1">
                {selectedSkills.map((s) => (
                  <Badge key={s} className="gradient-accent text-accent-foreground border-0 text-xs">{s}</Badge>
                ))}
              </div>
            )}
          </div>

          {filteredStudents.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No students match the selected skills.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredStudents.map((s) => (
                <Card key={s.id} className="shadow-card">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-sm font-medium text-primary-foreground">
                          {s.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{s.name}</p>
                          <p className="text-xs text-muted-foreground">{s.department} • CGPA: {s.cgpa}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a href={s.portfolio} className="text-xs text-accent flex items-center gap-0.5 hover:underline">
                          Portfolio <ExternalLink className="h-3 w-3" />
                        </a>
                        <Button
                          size="sm"
                          variant={shortlisted.includes(s.id) ? "default" : "outline"}
                          onClick={() => toggleShortlist(s.id)}
                          className={shortlisted.includes(s.id) ? "gradient-accent text-accent-foreground border-0" : ""}
                        >
                          <Star className={`h-3.5 w-3.5 mr-1 ${shortlisted.includes(s.id) ? "fill-current" : ""}`} />
                          {shortlisted.includes(s.id) ? "Shortlisted" : "Shortlist"}
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {s.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant={selectedSkills.includes(skill) ? "default" : "secondary"}
                          className={`text-xs ${selectedSkills.includes(skill) ? "gradient-accent text-accent-foreground border-0" : ""}`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillFilter;
