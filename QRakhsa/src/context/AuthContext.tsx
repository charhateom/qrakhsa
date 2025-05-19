import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  userId: string | null;
  authToken: string | null;
  isAuthenticated: boolean;
  login: (id: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId"));
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem("authToken"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("userId")); // Initialize based on stored userId

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("userId");
      setIsAuthenticated(false);
    }

    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [userId, authToken]);

  const login = (id: string, token: string) => {
    setUserId(id);
    setAuthToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUserId(null);
    setAuthToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ userId, authToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};