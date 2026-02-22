import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage on mount for persistent login
  useEffect(() => {
    const storedUser = localStorage.getItem("eduTrackUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = () => {
    const userData = {
      name: "Dr. John Smith",
      email: "john.smith@edutrack.edu",
      department: "Computer Science",
      role: "faculty",
    };
    setUser(userData);
    localStorage.setItem("eduTrackUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eduTrackUser");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
