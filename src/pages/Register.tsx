import { useState } from "react";
import { useAuth, UserRole } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, Briefcase, User, Mail, Lock, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [role, setRole] = useState<UserRole>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (password !== confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Registration Failed",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    const success = register(name, email, password, role);
    if (success) {
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully. Please sign in to continue.",
      });
      // Navigate to login page so user can sign in manually
      navigate("/");
    } else {
      toast({
        title: "Registration Failed",
        description: "A user with this email already exists. Please use a different email or login instead.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back to Login Link */}
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </button>
        </div>

        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Alpha Nova</h1>
          </div>
          <p className="text-white/70 text-sm">Create your account to get started</p>
        </div>

        {/* Role Selection */}
        <div className="flex gap-2 p-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <button
            onClick={() => setRole("student")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
              role === "student"
                ? "bg-white/20 backdrop-blur-sm text-white border border-white/30"
                : "text-white/60 hover:text-white"
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            Student
          </button>
          <button
            onClick={() => setRole("hr")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
              role === "hr"
                ? "bg-white/20 backdrop-blur-sm text-white border border-white/30"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Briefcase className="h-4 w-4" />
            HR Recruiter
          </button>
        </div>

        {/* Registration Form */}
        <Card className="shadow-lg border-0 bg-white/10 backdrop-blur-md hover:shadow-xl transition-all duration-300 hover:bg-white/15">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-white">
              Create {role === "student" ? "Student" : "HR"} Account
            </CardTitle>
            <CardDescription className="text-white/70">
              Fill in your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400 pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400 pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400 pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400 pl-10"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600">
                <User className="h-4 w-4 mr-2" />
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Account exists hint */}
        <Card className="border-white/20 bg-white/5 backdrop-blur-sm">
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-white/70 text-center">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/")}
                className="text-blue-300 hover:text-blue-200 font-medium underline"
              >
                Sign in here
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;