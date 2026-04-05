import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink } from "lucide-react";
import { STUDENTS } from "@/lib/mock-data";

const SHORTLIST_STORAGE_KEY = "nova_connect_shortlisted_students";

const Shortlisted = () => {
  const [shortlisted, setShortlisted] = useState<typeof STUDENTS>([]);

  const loadShortlisted = () => {
    const stored = localStorage.getItem(SHORTLIST_STORAGE_KEY);
    if (!stored) {
      setShortlisted([]);
      return;
    }

    try {
      const ids: string[] = JSON.parse(stored);
      const matches = STUDENTS.filter((student) => ids.includes(student.id));
      setShortlisted(matches);
    } catch (error) {
      setShortlisted([]);
    }
  };

  useEffect(() => {
    loadShortlisted();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === SHORTLIST_STORAGE_KEY) {
        loadShortlisted();
      }
    };

    const handleCustomEvent = () => {
      loadShortlisted();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("shortlist-updated", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("shortlist-updated", handleCustomEvent);
    };
  }, []);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Shortlisted Profiles</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {shortlisted.length} students shortlisted for interviews
        </p>
      </div>

      {shortlisted.length === 0 ? (
        <Card className="shadow-card">
          <CardContent className="py-12 text-center">
            <Star className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No profiles shortlisted yet. Use the Skill Filter to find candidates.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {shortlisted.map((s) => (
            <Card key={s.id} className="shadow-card">
              <CardContent className="py-5">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground flex-shrink-0">
                    {s.avatar}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.department} • Year {s.year} • CGPA: {s.cgpa}</p>
                      </div>
                      <a href={s.portfolio} className="text-xs text-accent flex items-center gap-0.5 hover:underline">
                        Portfolio <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {s.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                    {s.certifications.length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Certifications:</span> {s.certifications.join(", ")}
                      </div>
                    )}
                    {s.internships.length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Experience:</span>{" "}
                        {s.internships.map((i) => `${i.role} at ${i.company}`).join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shortlisted;
