import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

const safeParseUser = (value) => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch (_error) {
    localStorage.removeItem("user");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    // try to get user data from storage on init
    const saved = localStorage.getItem("user");
    return safeParseUser(saved);
  });

  const login = (nextToken, nextUser) => {
    // update storage first
    localStorage.setItem("token", nextToken);
    localStorage.setItem("user", JSON.stringify(nextUser));

    // then update state
    setToken(nextToken);
    setUser(nextUser);
  };

  const logout = () => {
    console.log("performing user logout...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  };

  const value = useMemo(() => {
    return { token, user, login, logout };
  }, [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
