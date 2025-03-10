import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check user from localStorage
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (isLoggedIn && storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
      localStorage.setItem("isLoggedIn", "false");
    }
    setLoading(false);
  }, []);

  // Check data from localStorage
  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      setUser(storedUser);
      localStorage.setItem("isLoggedIn", "true");
      return true;
    }
    return false;
  };

  // Register User to localStorage
  const register = (email, password) => {
    const newUser = { email, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    localStorage.setItem("isLoggedIn", "true");
    return true;
  };

  // Logout from localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedIn");
    localStorage.setItem("isLoggedIn", "false");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
