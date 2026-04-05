import { useState } from "react";
import { useStudent } from "@/lib/student-context";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, User, Mail, Phone, MapPin, Link, Github, Linkedin } from "lucide-react";

export default function PersonalInfoForm() {
  const { studentData, updatePersonalInfo } = useStudent();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState(studentData?.personalInfo || {
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.summary.trim()) newErrors.summary = "Professional summary is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      updatePersonalInfo(formData);
      toast({
        title: "Success",
        description: "Personal information saved successfully!"
      });
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-white">
          <User className="h-4 w-4 text-blue-300" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-white/70">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
          </div>
          
          <div className="space-y-1.5">
            <Label className="text-xs text-white/70">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="your.email@domain.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-white/70">Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="+91 98765 43210"
              />
            </div>
            {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
          </div>
          
          <div className="space-y-1.5">
            <Label className="text-xs text-white/70">Address *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="123 Street, City, State, Country"
              />
            </div>
            {errors.address && <p className="text-red-400 text-xs">{errors.address}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-white/70">LinkedIn Profile</Label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                value={formData.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="linkedin.com/in/yourname"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label className="text-xs text-white/70">GitHub Profile</Label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                value={formData.github}
                onChange={(e) => handleChange('github', e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="github.com/yourusername"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label className="text-xs text-white/70">Portfolio Website</Label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                value={formData.portfolio}
                onChange={(e) => handleChange('portfolio', e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
                placeholder="yourportfolio.com"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-white/70">Professional Summary *</Label>
          <Textarea
            value={formData.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder-white/50 min-h-[120px]"
            placeholder="Tell us about yourself, your career goals, and what you're looking for..."
          />
          {errors.summary && <p className="text-red-400 text-xs">{errors.summary}</p>}
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600 gap-2"
          >
            <Save className="h-4 w-4" />
            Save Personal Information
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}