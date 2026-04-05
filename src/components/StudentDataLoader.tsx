import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useStudent } from "@/lib/student-context";

/**
 * Component that automatically loads student data when a student user logs in
 * This ensures that student profile information is persisted and loaded correctly
 */
export function StudentDataLoader() {
  const { user } = useAuth();
  const { loadStudentData } = useStudent();

  useEffect(() => {
    // Load student data when user logs in
    if (user && user.role === "student" && user.id) {
      loadStudentData(user.id);
    }
  }, [user?.id, user?.role]); // Only depend on user id/role, not the function

  return null; // This component doesn't render anything
}