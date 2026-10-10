import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    if (!email.trim() || !password.trim()) {
      return false;
    }

    const loggedInUser = {
      name: email.split("@")[0],
      email,
      role: "user",
    };

    sessionStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);

    return true;
  };

  const signup = (name, email, password) => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return false;
    }

    const newUser = {
      name,
      email,
      role: "user",
    };

    sessionStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);

    return true;
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}