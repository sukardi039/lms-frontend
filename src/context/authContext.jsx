import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState({});
  const [currentAction, setCurrentAction] = useState(null);
  const [thisBook, setThisBook] = useState({});
  const [refresh, setRefresh] = useState(true);
  const [param, setParam] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

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

  useEffect(() => {
    let url = "http://localhost:8080/api/params";
    axios
      .get(url)
      .then((response) => {
        // console.log(response);
        let data = response.data;
        // console.log("data", data);
        let par = [];
        for (let i = 0; i < data.length; i++) {
          par[data[i].param_key] = data[i].value_string;
          if (data[i].value_long) {
            par[data[i].param_key] = data[i].value_long;
          } else if (data[i].value_decimal) {
            par[data[i].param_key] = data[i].value_decimal;
          }
        }
        setParam(par);
        // console.log("data", data, param);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        currentAction,
        thisBook,
        refresh,
        param,
        login,
        logout,
        setCurrentAction,
        setThisBook,
        setUsername,
        setIsAuthenticated,
        setRefresh,
        setParam,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
