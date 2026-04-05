import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { StudentProvider, useStudent } from "@/lib/student-context";
import { StudentDataLoader } from "@/components/StudentDataLoader";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentLayout from "./pages/student/StudentLayout";
import StudentProfile from "./pages/student/StudentProfile";
import StudentProfileView from "./pages/student/StudentProfileView";
import ResumeBuilder from "./pages/student/ResumeBuilder";
import Posts from "./pages/student/Posts";
import Portfolio from "./pages/student/Portfolio";
import AIChatbot from "./pages/student/AIChatbot";
import Awards from "./pages/student/Awards";
import Notifications from "./pages/student/Notifications";
import HRLayout from "./pages/hr/HRLayout";
import StudentRepository from "./pages/hr/StudentRepository";
import HRStudentProfileView from "./pages/hr/HRStudentProfileView";
import SkillFilter from "./pages/hr/SkillFilter";
import Shortlisted from "./pages/hr/Shortlisted";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, role }: { children: React.ReactNode; role: "student" | "hr" }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (user.role !== role) return <Navigate to={user.role === "student" ? "/student" : "/hr"} replace />;
  return <>{children}</>;
}

function AuthRedirect() {
  const { user } = useAuth();
  if (user) return <Navigate to={user.role === "student" ? "/student" : "/hr"} replace />;
  return <Login />;
}

function LoginRedirect({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (user) return <Navigate to={user.role === "student" ? "/student" : "/hr"} replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthRedirect />} />
            <Route path="/register" element={<LoginRedirect><Register /></LoginRedirect>} />

            <Route path="/student" element={<ProtectedRoute role="student"><StudentProvider><StudentDataLoader /><StudentLayout /></StudentProvider></ProtectedRoute>}>
              <Route index element={<StudentProfile />} />
              <Route path="resume" element={<ResumeBuilder />} />
              <Route path="posts" element={<Posts />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="chatbot" element={<AIChatbot />} />
              <Route path="awards" element={<Awards />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile/:studentId" element={<StudentProfileView />} />
            </Route>

            <Route path="/hr" element={<ProtectedRoute role="hr"><HRLayout /></ProtectedRoute>}>
              <Route index element={<StudentRepository />} />
              <Route path="student/:studentId" element={<HRStudentProfileView />} />
              <Route path="filter" element={<SkillFilter />} />
              <Route path="shortlisted" element={<Shortlisted />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
