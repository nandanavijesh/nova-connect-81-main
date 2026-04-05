import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LogIn, Zap, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate(user.role === "student" ? "/student" : "/hr");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = login(email, password, rememberMe);
      if (success) {
        toast({
          title: "Welcome Back!",
          description: rememberMe ? "You'll be automatically signed in for 30 days." : "You're signed in.",
        });
        // Wait a moment for state to update, then navigate to trigger AuthRedirect
        setTimeout(() => {
          navigate("/");
        }, 100);
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Alpha Nova</h1>
          </div>
          <p className="text-white/70 text-sm">One-Stop Placement Management Platform</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-0 bg-white/10 backdrop-blur-md hover:shadow-xl transition-all duration-300 hover:bg-white/15">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-white">Welcome Back</CardTitle>
            <CardDescription className="text-white/70">
              Sign in to your account to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  className="border-white/30"
                />
                <Label htmlFor="remember-me" className="text-sm text-white/70 cursor-pointer">
                  Remember me for 30 days
                </Label>
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Register Link */}
        <Card className="border-white/20 bg-white/5 backdrop-blur-sm">
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-white/70 text-center">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-300 hover:text-blue-200 font-medium underline flex items-center gap-1 mx-auto"
              >
                <UserPlus className="h-3 w-3" />
                Register here
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
