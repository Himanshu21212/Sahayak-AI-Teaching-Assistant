import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Teacher {
  _id: string;
  name: string;
  email: string;
  school: string;
  location: string;
}

interface AuthContextType {
  teacher: Teacher | null;
  token: string | null;
  login: (token: string, teacher: Teacher) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedTeacher = localStorage.getItem('teacher');
    
    if (storedToken && storedTeacher) {
      setToken(storedToken);
      setTeacher(JSON.parse(storedTeacher));
    }
  }, []);

  const login = (newToken: string, newTeacher: Teacher) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('teacher', JSON.stringify(newTeacher));
    setToken(newToken);
    setTeacher(newTeacher);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('teacher');
    setToken(null);
    setTeacher(null);
  };

  return (
    <AuthContext.Provider value={{ 
      teacher, 
      token, 
      login, 
      logout, 
      isAuthenticated: !!token 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
