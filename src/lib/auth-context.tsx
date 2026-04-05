import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "student" | "hr";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => boolean;
  autoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS = [
  { id: "s1", name: "Arjun Mehta", email: "arjun@college.edu", password: "student123", role: "student" as UserRole },
  { id: "h1", name: "Priya Sharma", email: "priya@techcorp.com", password: "hr123", role: "hr" as UserRole },
];

// Storage keys
const STORAGE_KEYS = {
  USERS: 'nova_connect_users',
  CURRENT_USER: 'nova_connect_current_user'
};

// Helper functions for localStorage
const getStoredUsers = (): User[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USERS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Error reading stored users:', error);
  }
  return MOCK_USERS;
};

const setStoredUsers = (users: User[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  } catch (error) {
    console.warn('Error storing users:', error);
  }
};

const getStoredCurrentUser = (): User | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Error reading current user:', error);
  }
  return null;
};

const setStoredCurrentUser = (user: User | null) => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  } catch (error) {
    console.warn('Error storing current user:', error);
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(getStoredUsers());

  const login = (email: string, password: string, rememberMe: boolean = false): boolean => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      const userToLogin = { id: found.id, name: found.name, email: found.email, password: found.password, role: found.role };
      setUser(userToLogin);
      
      // Store user in localStorage if rememberMe is true
      if (rememberMe) {
        setStoredCurrentUser(userToLogin);
      }
      
      return true;
    }
    return false;
  };

  const autoLogin = () => {
    const storedUser = getStoredCurrentUser();
    if (storedUser) {
      // Verify user still exists in our user list
      const userExists = users.find(u => u.id === storedUser.id);
      if (userExists) {
        setUser(storedUser);
      } else {
        // Stored user no longer exists, clear storage
        setStoredCurrentUser(null);
      }
    }
  };

  const register = (name: string, email: string, password: string, role: UserRole): boolean => {
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return false; // User already exists
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role
    };

    // Add to users array and persist
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setStoredUsers(updatedUsers);
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setStoredCurrentUser(null);
  };

  // Auto-login on component mount
  useEffect(() => {
    autoLogin();
  }, []);

  // Sync users with localStorage when users state changes
  useEffect(() => {
    setStoredUsers(users);
  }, [users]);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, autoLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
