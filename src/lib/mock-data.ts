export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  department: string;
  year: number;
  cgpa: number;
  skills: string[];
  certifications: string[];
  internships: { company: string; role: string; duration: string }[];
  portfolio: string;
  avatar: string;
}

export const STUDENTS: StudentProfile[] = [
  {
    id: "s1",
    name: "Arjun Mehta",
    email: "arjun@college.edu",
    department: "Computer Science",
    year: 4,
    cgpa: 8.7,
    skills: ["React", "Python", "Machine Learning", "SQL", "TypeScript"],
    certifications: ["AWS Cloud Practitioner", "Google Data Analytics"],
    internships: [
      { company: "TechCorp India", role: "Frontend Intern", duration: "Jun 2025 - Aug 2025" },
    ],
    portfolio: "https://arjun.dev",
    avatar: "AM",
  },
  {
    id: "s2",
    name: "Sneha Reddy",
    email: "sneha@college.edu",
    department: "Information Technology",
    year: 3,
    cgpa: 9.1,
    skills: ["Java", "Spring Boot", "Docker", "Kubernetes", "MongoDB"],
    certifications: ["Oracle Java SE", "Docker Certified Associate"],
    internships: [
      { company: "Infosys", role: "Backend Dev Intern", duration: "Jan 2025 - Apr 2025" },
    ],
    portfolio: "https://sneha-reddy.com",
    avatar: "SR",
  },
  {
    id: "s3",
    name: "Rahul Verma",
    email: "rahul@college.edu",
    department: "Data Science",
    year: 4,
    cgpa: 8.3,
    skills: ["Python", "TensorFlow", "NLP", "Pandas", "SQL"],
    certifications: ["TensorFlow Developer Certificate", "IBM Data Science"],
    internships: [
      { company: "Analytics Vidhya", role: "Data Science Intern", duration: "May 2025 - Jul 2025" },
    ],
    portfolio: "https://rahulv.ml",
    avatar: "RV",
  },
  {
    id: "s4",
    name: "Kavya Nair",
    email: "kavya@college.edu",
    department: "Computer Science",
    year: 3,
    cgpa: 9.4,
    skills: ["React", "Node.js", "GraphQL", "PostgreSQL", "Figma"],
    certifications: ["Meta Front-End Developer", "UI/UX Design Specialization"],
    internships: [],
    portfolio: "https://kavya.design",
    avatar: "KN",
  },
  {
    id: "s5",
    name: "Vikram Singh",
    email: "vikram@college.edu",
    department: "Electronics & Communication",
    year: 4,
    cgpa: 7.8,
    skills: ["C++", "Embedded Systems", "IoT", "MATLAB", "Python"],
    certifications: ["ARM Cortex-M Certification"],
    internships: [
      { company: "Bosch India", role: "Embedded Systems Intern", duration: "Jun 2025 - Sep 2025" },
    ],
    portfolio: "https://vikram-ece.in",
    avatar: "VS",
  },
  {
    id: "s6",
    name: "Ananya Gupta",
    email: "ananya@college.edu",
    department: "Computer Science",
    year: 4,
    cgpa: 8.9,
    skills: ["Python", "React", "AWS", "Machine Learning", "SQL", "Docker"],
    certifications: ["AWS Solutions Architect Associate", "Google ML Engineer"],
    internships: [
      { company: "Amazon", role: "SDE Intern", duration: "May 2025 - Aug 2025" },
    ],
    portfolio: "https://ananya-g.dev",
    avatar: "AG",
  },
];

export const SKILL_OPTIONS = [
  "React", "Python", "Java", "Machine Learning", "SQL", "TypeScript",
  "Node.js", "Docker", "Kubernetes", "AWS", "TensorFlow", "NLP",
  "GraphQL", "MongoDB", "PostgreSQL", "Spring Boot", "C++", "Figma",
  "IoT", "Embedded Systems", "Pandas", "MATLAB",
];
