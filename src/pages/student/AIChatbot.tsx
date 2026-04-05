import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Bot, User, Code, Briefcase, BookOpen } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  type?: "text" | "role-guide";
}

const MOCK_RESPONSES: Record<string, any> = {
  "data science": {
    role: "Data Scientist",
    skills: ["Python", "R", "SQL", "Statistics", "Machine Learning", "Data Visualization", "Pandas", "NumPy", "Scikit-learn", "TensorFlow"],
    requirements: [
      "Bachelor's in Computer Science, Statistics, or Mathematics",
      "2+ years of experience with data analysis",
      "Portfolio with 3+ real-world projects",
      "Strong statistical knowledge",
      "Experience with large datasets"
    ],
    courses: [
      "Google Advanced Data Analytics Certificate",
      "IBM Data Science Professional Certificate",
      "Andrew Ng's Machine Learning Specialization (Coursera)",
      "Statistics for Data Analysis",
      "Python for Data Science"
    ]
  },
  "frontend": {
    role: "Frontend Developer",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript", "Tailwind CSS", "Git", "REST APIs", "Testing", "Responsive Design"],
    requirements: [
      "Strong understanding of HTML/CSS/JavaScript",
      "Experience with modern frameworks (React/Vue/Angular)",
      "Portfolio with 2+ projects",
      "Understanding of UI/UX principles",
      "Git and version control knowledge"
    ],
    courses: [
      "Meta Front-End Developer Certificate",
      "React - The Complete Guide (Udemy)",
      "Frontend Masters",
      "The Complete JavaScript Course (Udemy)",
      "CSS Mastery Course"
    ]
  },
  "backend": {
    role: "Backend Developer",
    skills: ["Node.js/Express", "Python/Django", "Java", "PostgreSQL", "MongoDB", "REST APIs", "Docker", "Git", "Linux", "AWS"],
    requirements: [
      "Proficiency in at least one backend language",
      "Experience with databases (SQL and NoSQL)",
      "Understanding of API design",
      "Experience with version control",
      "Knowledge of security practices"
    ],
    courses: [
      "AWS Solutions Architect Associate",
      "Docker Certified Associate",
      "The Complete Node.js Course (Udemy)",
      "Django for Beginners",
      "Database Design Fundamentals"
    ]
  },
  "machine learning": {
    role: "ML Engineer",
    skills: ["Python", "TensorFlow", "PyTorch", "Linear Algebra", "Statistics", "Deep Learning", "NLP", "Computer Vision", "MLOps", "SQL"],
    requirements: [
      "Strong math foundation (Calculus, Linear Algebra)",
      "2+ years with ML frameworks",
      "Experience deploying models",
      "GitHub portfolio with ML projects",
      "Understanding of neural networks"
    ],
    courses: [
      "TensorFlow Developer Certificate",
      "Deep Learning Specialization (Andrew Ng)",
      "Fast.ai - Practical Deep Learning",
      "Natural Language Processing Specialization",
      "Computer Vision Masterclass"
    ]
  }
};

function getResponse(input: string): Message {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(MOCK_RESPONSES)) {
    if (lower.includes(key)) {
      return {
        role: "assistant",
        content: value,
        type: "role-guide"
      };
    }
  }
  return {
    role: "assistant",
    content: "I can help you with skills needed for various roles! Try asking:\n\n• \"What skills are needed for Data Science?\"\n• \"What skills do I need for Frontend development?\"\n• \"Tell me about Backend engineering skills\"\n• \"What's required for Machine Learning?\"",
    type: "text"
  };
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi! I'm the **AN Platform Chatbot**. I can help you discover skills needed, job requirements, and courses for different tech roles. What role are you interested in?",
      type: "text"
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim(), type: "text" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(userMsg.content);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 p-6">
      <div className="max-w-3xl mx-auto h-full flex flex-col">
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-white/20 text-white backdrop-blur-sm">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-white">AI Chatbot</h1>
          </div>
          <p className="text-white/70 text-sm">Ask about skills, job requirements, and recommended courses</p>
        </div>

        <Card className="shadow-lg border-0 flex-1 flex flex-col overflow-hidden bg-white/10 backdrop-blur-md flex-shrink-0" style={{ height: "calc(100vh - 200px)" }}>
          <CardHeader className="pb-2 border-b border-white/10">
            <CardTitle className="text-sm flex items-center gap-2 text-white">
              <Bot className="h-4 w-4 text-blue-300" />
              Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
                {msg.type === "role-guide" && typeof msg.content === "object" ? (
                  <div className="max-w-[90%] space-y-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-blue-300" />
                        {msg.content.role}
                      </h3>
                      
                      <div className="space-y-3">
                        {/* Skills */}
                        <div>
                          <h4 className="text-sm font-semibold text-blue-200 flex items-center gap-2 mb-2">
                            <Code className="h-4 w-4" />
                            Skills Needed
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {msg.content.skills.map((skill: string, j: number) => (
                              <span key={j} className="bg-white/20 border border-white/30 text-white text-xs px-3 py-1 rounded-full hover:bg-white/30 transition-colors">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Job Requirements */}
                        <div>
                          <h4 className="text-sm font-semibold text-blue-200 flex items-center gap-2 mb-2">
                            <Briefcase className="h-4 w-4" />
                            Job Requirements
                          </h4>
                          <ul className="space-y-1">
                            {msg.content.requirements.map((req: string, j: number) => (
                              <li key={j} className="text-white text-sm flex items-start gap-2">
                                <span className="text-blue-300 mt-0.5">✓</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Recommended Courses */}
                        <div>
                          <h4 className="text-sm font-semibold text-blue-200 flex items-center gap-2 mb-2">
                            <BookOpen className="h-4 w-4" />
                            Recommended Courses
                          </h4>
                          <ul className="space-y-2">
                            {msg.content.courses.map((course: string, j: number) => (
                              <li key={j} className="bg-white/10 rounded-lg p-2 text-white text-sm border-l-2 border-blue-400">
                                📚 {course}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-white/20 backdrop-blur-sm text-white border border-white/20"
                    }`}
                  >
                    {msg.content.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                      part.startsWith("**") && part.endsWith("**") ? (
                        <strong key={j} className="text-blue-200">{part.slice(2, -2)}</strong>
                      ) : (
                        <span key={j}>{part}</span>
                      )
                    )}
                  </div>
                )}
                {msg.role === "user" && (
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-white/70 border border-white/20">
                  Typing...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </CardContent>

          <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. What skills are needed for Data Science?"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400"
              />
              <Button type="submit" size="icon" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIChatbot;
