import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  summary: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  cgpa: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface StudentData {
  id: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  certifications: Certification[];
  resumeUrl?: string;
  hasResume: boolean;
}

interface StudentContextType {
  studentData: StudentData | null;
  updatePersonalInfo: (data: PersonalInfo) => void;
  addEducation: (data: Education) => void;
  updateEducation: (index: number, data: Education) => void;
  removeEducation: (index: number) => void;
  addExperience: (data: Experience) => void;
  updateExperience: (index: number, data: Experience) => void;
  removeExperience: (index: number) => void;
  addSkill: (data: Skill) => void;
  updateSkill: (index: number, data: Skill) => void;
  removeSkill: (index: number) => void;
  addCertification: (data: Certification) => void;
  updateCertification: (index: number, data: Certification) => void;
  removeCertification: (index: number) => void;
  uploadResume: (file: File) => Promise<void>;
  setHasResume: (hasResume: boolean) => void;
  loadStudentData: (userId: string) => void;
  clearStudentData: () => void;
}

const StudentContext = createContext<StudentContextType | null>(null);

// Storage key
const STORAGE_KEYS = {
  STUDENT_DATA: 'nova_connect_student_data'
};

// Helper functions for localStorage
const getStoredStudentData = (userId: string): StudentData | null => {
  try {
    const stored = localStorage.getItem(`${STORAGE_KEYS.STUDENT_DATA}_${userId}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Error reading stored student data:', error);
  }
  return null;
};

const setStoredStudentData = (userId: string, data: StudentData) => {
  try {
    localStorage.setItem(`${STORAGE_KEYS.STUDENT_DATA}_${userId}`, JSON.stringify(data));
  } catch (error) {
    console.warn('Error storing student data:', error);
  }
};

const clearStoredStudentData = (userId: string) => {
  try {
    localStorage.removeItem(`${STORAGE_KEYS.STUDENT_DATA}_${userId}`);
  } catch (error) {
    console.warn('Error clearing student data:', error);
  }
};

// Empty initial data template
const createEmptyStudentData = (userId: string): StudentData => ({
  id: userId,
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    address: "",
    summary: ""
  },
  education: [],
  experience: [],
  skills: [],
  certifications: [],
  hasResume: false
});

export function StudentProvider({ children }: { children: ReactNode }) {
  // Initialize with empty student data to avoid null reference errors
  const [studentData, setStudentData] = useState<StudentData | null>(() => {
    // Try to get current user id from auth context if available
    return null; // Will be loaded immediately by StudentDataLoader
  });

  const updatePersonalInfo = (data: PersonalInfo) => {
    setStudentData(prev => {
      if (!prev) return { ...createEmptyStudentData("temp"), personalInfo: data };
      return { ...prev, personalInfo: data };
    });
  };

  const addEducation = (data: Education) => {
    setStudentData(prev => {
      if (!prev) return createEmptyStudentData("temp");
      return { ...prev, education: [...prev.education, data] };
    });
  };

  const updateEducation = (index: number, data: Education) => {
    setStudentData(prev => {
      if (!prev) return prev;
      const newEducation = [...prev.education];
      newEducation[index] = data;
      return { ...prev, education: newEducation };
    });
  };

  const removeEducation = (index: number) => {
    setStudentData(prev => {
      if (!prev) return prev;
      const newEducation = prev.education.filter((_, i) => i !== index);
      return { ...prev, education: newEducation };
    });
  };

  const addExperience = (data: Experience) => {
    setStudentData(prev => {
      if (!prev) return createEmptyStudentData("temp");
      return { ...prev, experience: [...prev.experience, data] };
    });
  };

  const updateExperience = (index: number, data: Experience) => {
    setStudentData(prev => {
      if (!prev) return prev;
      const newExperience = [...prev.experience];
      newExperience[index] = data;
      return { ...prev, experience: newExperience };
    });
  };

  const removeExperience = (index: number) => {
    setStudentData(prev => {
      if (!prev) return prev;
      const newExperience = prev.experience.filter((_, i) => i !== index);
      return { ...prev, experience: newExperience };
    });
  };

  const addSkill = (data: Skill) => {
    setStudentData(prev => {
      if (!prev) return createEmptyStudentData("temp");
      return { ...prev, skills: [...prev.skills, data] };
    });
  };

  const updateSkill = (index: number, data: Skill) => {
    setStudentData(prev => {
      if (!prev) return prev;
      const newSkills = [...prev.skills];
      newSkills[index] = data;
      return { ...prev, skills: newSkills };
    });
  };

  const removeSkill = (index: number) => {
    setStudentData(prev => {
      if (!prev) return prev;
      const newSkills = prev.skills.filter((_, i) => i !== index);
      return { ...prev, skills: newSkills };
    });
  };

  const addCertification = (data: Certification) => {
    setStudentData(prev => {
      if (!prev) return createEmptyStudentData("temp");
      return { ...prev, certifications: [...prev.certifications, data] };
    });
  };

  const updateCertification = (index: number, data: Certification) => {
    setStudentData(prev => {
      if (!prev) return prev;
      const newCertifications = [...prev.certifications];
      newCertifications[index] = data;
      return { ...prev, certifications: newCertifications };
    });
  };

  const removeCertification = (index: number) => {
    setStudentData(prev => {
      if (!prev) return prev;
      const newCertifications = prev.certifications.filter((_, i) => i !== index);
      return { ...prev, certifications: newCertifications };
    });
  };

  const uploadResume = async (file: File) => {
    // Simulate file upload
    const fileUrl = URL.createObjectURL(file);
    setStudentData(prev => {
      if (!prev) return createEmptyStudentData("temp");
      return { ...prev, resumeUrl: fileUrl, hasResume: true };
    });
  };

  const setHasResume = (hasResume: boolean) => {
    setStudentData(prev => {
      if (!prev) return createEmptyStudentData("temp");
      return { ...prev, hasResume };
    });
  };

  const loadStudentData = (userId: string) => {
    const storedData = getStoredStudentData(userId);
    if (storedData) {
      setStudentData(storedData);
    } else {
      // Create new empty data for this user
      const newData = createEmptyStudentData(userId);
      setStudentData(newData);
    }
  };

  const clearStudentData = () => {
    if (studentData) {
      clearStoredStudentData(studentData.id);
      setStudentData(null);
    }
  };

  // Auto-save student data to localStorage when it changes
  useEffect(() => {
    if (studentData) {
      setStoredStudentData(studentData.id, studentData);
    }
  }, [studentData]);

  return (
    <StudentContext.Provider value={{
      studentData,
      updatePersonalInfo,
      addEducation,
      updateEducation,
      removeEducation,
      addExperience,
      updateExperience,
      removeExperience,
      addSkill,
      updateSkill,
      removeSkill,
      addCertification,
      updateCertification,
      removeCertification,
      uploadResume,
      setHasResume,
      loadStudentData,
      clearStudentData
    }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudent must be used within StudentProvider");
  return ctx;
}