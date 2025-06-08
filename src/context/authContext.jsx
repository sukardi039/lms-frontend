import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState({});
  const [currentAction, setCurrentAction] = useState(null);
  const [thisBook, setThisBook] = useState({});
  const [refresh, setRefresh] = useState(true);

  const login = (user) => {
    setIsAuthenticated(true);
    setUsername(user);
    setCurrentAction("login");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername({});
    setCurrentAction(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        currentAction,
        thisBook,
        refresh,
        login,
        logout,
        setCurrentAction,
        setThisBook,
        setUsername,
        setIsAuthenticated,
        setRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
