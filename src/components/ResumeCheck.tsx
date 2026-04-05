import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import ResumeRequirement from "./ResumeRequirement";

const ResumeCheck = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!user) {
      navigate("/");
      return;
    }

    // If user is HR, redirect directly to HR dashboard
    if (user.role === "hr") {
      navigate("/hr");
      return;
    }

    // If user is student and has resume, redirect to student dashboard
    if (user.role === "student" && user.hasResume) {
      navigate("/student");
      return;
    }

    // If user is student and doesn't have resume, show resume requirement
    // This component will render the ResumeRequirement component
  }, [user, navigate]);

  // If we reach here and user is student without resume, show the requirement
  if (user && user.role === "student" && !user.hasResume) {
    return <ResumeRequirement onUploadSuccess={() => navigate("/student")} />;
  }

  // Default case - should not reach here, but return null for safety
  return null;
};

export default ResumeCheck;